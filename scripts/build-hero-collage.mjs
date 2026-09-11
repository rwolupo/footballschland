#!/usr/bin/env node
// Baut aus den Trikot-Bildern (Seite 1 jeder playerCard) einer Blockblog-Post-Draft
// eine Hero-Collage im Footballschland-Look, lädt sie als Sanity-Asset hoch und
// setzt sie als heroImage im Draft-Dokument.
//
// Aufruf per GitHub Action (siehe .github/workflows/build-hero-collage.yml) oder
// lokal: SANITY_AUTH_TOKEN=... node scripts/build-hero-collage.mjs \
//   --docId=drafts.3c646d11-8708-437c-8c1d-13c5e53984f7 \
//   --title="Deutsche Talente D1 2026" \
//   --subtitle="29 in FBS · 29 in FCS · 58 gesamt"
//
// Layout:
//   - Canvas 2400×1500 (16:10), Hintergrund #0D0D0D (Footballschland-Dunkel)
//   - 8 × 4 Grid mit 12px Gap, Bildslot 296×371 (Portrait 4:5 wie die Originale)
//   - Bilder in Roster-Reihenfolge (alphabetisch nach Nachname)
//   - Letzte 3 Slots unten rechts als „Titel-Panel“: schwarze Fläche mit
//     Rot-Border und Weiß/Gold-Text
//
// Der Sanity-Token braucht Editor-Rolle im Projekt (nicht Organisation).

import { createClient } from '@sanity/client'
import sharp from 'sharp'

// --- CLI-Parameter -----------------------------------------------------------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=')
    return [k, v.join('=')]
  })
)
const docId = args.docId || 'drafts.3c646d11-8708-437c-8c1d-13c5e53984f7'
const title = args.title || 'Deutsche Talente D1 2026'
const subtitle = args.subtitle || '29 in FBS · 29 in FCS · 58 gesamt'
const filename = args.filename || 'hero-d1-2026-collage.jpg'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('FEHLER: SANITY_AUTH_TOKEN fehlt (Editor-Rolle im Projekt).')
  process.exit(1)
}

const client = createClient({
  projectId: 'k31tvjv8',
  dataset: 'production',
  apiVersion: '2026-03-28',
  token,
  useCdn: false,
})

// --- Bilder aus Sanity holen -------------------------------------------------
console.log(`[1/4] Hole Trikot-Bilder aus ${docId}…`)
const cards = await client.fetch(
  `*[_id == $id][0]{
    "list": body[_type == "playerCard"]{
      playerName,
      "url": images[0].asset->url
    }
  }.list`,
  { id: docId }
)
if (!Array.isArray(cards) || cards.length === 0) {
  console.error('FEHLER: Keine playerCards mit Bildern im Dokument gefunden.')
  process.exit(1)
}
// Alphabetisch nach Nachname
const sorted = cards
  .filter((c) => c.url)
  .sort((a, b) => {
    const la = a.playerName.split(' ').slice(-1)[0]
    const lb = b.playerName.split(' ').slice(-1)[0]
    return la.localeCompare(lb, 'de')
  })
console.log(`      ${sorted.length} Trikot-Bilder gefunden.`)

// --- Bilder herunterladen ----------------------------------------------------
console.log(`[2/4] Lade ${sorted.length} Bilder…`)
const imageBuffers = await Promise.all(
  sorted.map(async (c, i) => {
    const res = await fetch(c.url)
    if (!res.ok) throw new Error(`Bild ${c.playerName} ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    process.stdout.write('.')
    return { name: c.playerName, buf }
  })
)
process.stdout.write('\n')

// --- Collage-Layout ----------------------------------------------------------
const CANVAS_W = 2400
const CANVAS_H = 1500
const GAP = 12
const COLS = 8
const ROWS = 4
const SLOT_W = Math.floor((CANVAS_W - GAP * (COLS + 1)) / COLS) // 293
const SLOT_H = Math.floor((CANVAS_H - GAP * (ROWS + 1)) / ROWS) // 360
const BORDER_COL = '#1a1a1a'

console.log(`[3/4] Baue Collage ${CANVAS_W}×${CANVAS_H}, Slot ${SLOT_W}×${SLOT_H}…`)

// Resize jedes Bild auf den Slot (cover, um Portrait auf 4:5-ish zu halten)
const resized = await Promise.all(
  imageBuffers.map((it) =>
    sharp(it.buf)
      .resize(SLOT_W, SLOT_H, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 88 })
      .toBuffer()
      .then((buf) => ({ ...it, buf }))
  )
)

// Grid-Positionen berechnen; letzte 3 Slots (COLS*ROWS - 3 = 29) freilassen.
// Bei 32 Slots (8×4) und 29 Bildern: Slots 29, 30, 31 (letzte Reihe rechts, 3 Slots) bleiben leer.
const totalSlots = COLS * ROWS
const filledSlots = Math.min(resized.length, totalSlots - 3)
const composites = []
for (let i = 0; i < filledSlots; i++) {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const left = GAP + col * (SLOT_W + GAP)
  const top = GAP + row * (SLOT_H + GAP)
  composites.push({ input: resized[i].buf, left, top })
}

// Titel-Panel: die letzten 3 Slots unten rechts als eine große schwarze Fläche
// mit Rot-Border und Text-Overlay. Breite = 3 Slots + 2 Gaps, Höhe = 1 Slot.
const panelStartCol = COLS - 3
const panelStartRow = ROWS - 1
const panelLeft = GAP + panelStartCol * (SLOT_W + GAP)
const panelTop = GAP + panelStartRow * (SLOT_H + GAP)
const panelW = 3 * SLOT_W + 2 * GAP
const panelH = SLOT_H
const panelSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${panelW}" height="${panelH}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#231f20"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${panelW}" height="${panelH}" fill="url(#g)" />
  <rect x="0" y="0" width="${panelW}" height="8" fill="#e31837" />
  <rect x="0" y="${panelH - 8}" width="${panelW}" height="8" fill="#ffb81c" />
  <text x="40" y="130" font-family="'Antonio', 'Impact', 'Arial Black', sans-serif"
        font-size="88" font-weight="900" fill="#ffffff" letter-spacing="1">
    ${escapeXml(title)}
  </text>
  <text x="40" y="210" font-family="'Poppins', 'Helvetica', 'Arial', sans-serif"
        font-size="34" font-weight="500" fill="#ffb81c">
    ${escapeXml(subtitle)}
  </text>
  <text x="40" y="${panelH - 40}" font-family="'Poppins', 'Helvetica', 'Arial', sans-serif"
        font-size="24" font-weight="400" fill="rgba(255,255,255,0.55)">
    footballschland.de · american football MADE IN GERMANY
  </text>
</svg>
`)
composites.push({ input: panelSvg, left: panelLeft, top: panelTop })

// Subtile 1px-Border pro Bildslot (optional, macht das Grid sichtbarer)
const borderSvg = (w, h) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <rect x="0" y="0" width="${w}" height="${h}" fill="none"
             stroke="${BORDER_COL}" stroke-width="2"/>
     </svg>`
  )
for (let i = 0; i < filledSlots; i++) {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const left = GAP + col * (SLOT_W + GAP)
  const top = GAP + row * (SLOT_H + GAP)
  composites.push({ input: borderSvg(SLOT_W, SLOT_H), left, top })
}

const collage = await sharp({
  create: {
    width: CANVAS_W,
    height: CANVAS_H,
    channels: 3,
    background: '#0d0d0d',
  },
})
  .composite(composites)
  .jpeg({ quality: 90, mozjpeg: true })
  .toBuffer()

console.log(`      Collage-Buffer ${(collage.length / 1024).toFixed(1)} KB`)

// --- Upload zu Sanity + heroImage patchen -----------------------------------
console.log(`[4/4] Upload nach Sanity und heroImage-Patch…`)
const asset = await client.assets.upload('image', collage, {
  filename,
  contentType: 'image/jpeg',
})
console.log(`      Asset-ID: ${asset._id}`)
console.log(`      Asset-URL: ${asset.url}`)

const patchResult = await client
  .patch(docId)
  .set({
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    },
  })
  .commit()
console.log(`      Draft _rev nach heroImage-Patch: ${patchResult._rev}`)
console.log('Fertig. Post im Studio öffnen und Hero prüfen, dann veröffentlichen.')

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
