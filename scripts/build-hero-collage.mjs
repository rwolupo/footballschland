#!/usr/bin/env node
// Baut aus den Trikot-Bildern (Seite 1 jeder playerCard) eines Blockblog-Posts
// eine Hero-Collage im Footballschland-Look, lädt sie als Sanity-Asset hoch und
// setzt sie als heroImage im selben Dokument.
//
// Aufruf per GitHub Action (siehe .github/workflows/build-hero-collage.yml) oder
// lokal: SANITY_AUTH_TOKEN=... node scripts/build-hero-collage.mjs \
//   --docId=drafts.3c646d11-8708-437c-8c1d-13c5e53984f7 \
//   --title="Deutsche Talente D1 2026" \
//   --subtitle="29 in der FBS · 28 in der FCS · 57 gesamt"
//
// Layout:
//   - Breite fix 2400px, Höhe ergibt sich aus Grid und Slot-Seitenverhältnis 4:5
//     (die Canva-Trikots sind 1080×1350, also portrait — das Grid folgt dem,
//     statt die Bilder auf quadratisch zu beschneiden).
//   - Grid COLS × ROWS, Bilder in Roster-Reihenfolge (alphabetisch nach Nachname).
//   - Unten rechts ein Titel-Panel über PANEL_COLS × PANEL_ROWS Slots: schwarze
//     Fläche mit Rot-/Gold-Kante und Weiß/Gold-Text.
//   - Es passen COLS*ROWS - PANEL_COLS*PANEL_ROWS Bilder hinein. Sind es mehr,
//     bricht das Skript ab, statt still Spieler wegzulassen.
//
// Standard-Grid 13×5 mit 4×2-Panel = 57 Bildslots (Saison 2026).
// Für andere Kaderstärken --cols/--rows/--panelCols/--panelRows setzen.
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
const subtitle = args.subtitle || '29 in der FBS · 28 in der FCS · 57 gesamt'
const filename = args.filename || 'hero-d1-2026-collage.jpg'

const COLS = Number(args.cols || 13)
const ROWS = Number(args.rows || 5)
const PANEL_COLS = Number(args.panelCols || 4)
const PANEL_ROWS = Number(args.panelRows || 2)

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
  // Damit auch drafts.*-Dokumente sichtbar sind. Ohne das antwortet der Client
  // aus der published-Perspektive und liefert für Draft-IDs keine Daten.
  perspective: 'raw',
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

// --- Geometrie ---------------------------------------------------------------
const CANVAS_W = 2400
const GAP = 12
const SLOT_W = Math.floor((CANVAS_W - GAP * (COLS + 1)) / COLS)
const SLOT_H = Math.round(SLOT_W * 1.25) // 4:5 wie die Canva-Seiten
const CANVAS_H = GAP * (ROWS + 1) + ROWS * SLOT_H
const BORDER_COL = '#1a1a1a'

const imageSlots = COLS * ROWS - PANEL_COLS * PANEL_ROWS
if (sorted.length > imageSlots) {
  console.error(
    `FEHLER: ${sorted.length} Bilder, aber nur ${imageSlots} Slots ` +
      `(${COLS}×${ROWS} minus ${PANEL_COLS}×${PANEL_ROWS} Panel). ` +
      `Grid über --cols/--rows vergrößern.`
  )
  process.exit(1)
}
if (sorted.length < imageSlots) {
  console.log(
    `      Hinweis: ${imageSlots - sorted.length} Slot(s) bleiben leer ` +
      `(dunkler Hintergrund).`
  )
}

// --- Bilder herunterladen ----------------------------------------------------
console.log(`[2/4] Lade ${sorted.length} Bilder…`)
const imageBuffers = await Promise.all(
  sorted.map(async (c) => {
    const res = await fetch(c.url)
    if (!res.ok) throw new Error(`Bild ${c.playerName} ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    process.stdout.write('.')
    return { name: c.playerName, buf }
  })
)
process.stdout.write('\n')

console.log(
  `[3/4] Baue Collage ${CANVAS_W}×${CANVAS_H}, Grid ${COLS}×${ROWS}, ` +
    `Slot ${SLOT_W}×${SLOT_H}…`
)

const resized = await Promise.all(
  imageBuffers.map((it) =>
    sharp(it.buf)
      .resize(SLOT_W, SLOT_H, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 88 })
      .toBuffer()
      .then((buf) => ({ ...it, buf }))
  )
)

// Alle Zellen durchlaufen, die Panel-Zellen unten rechts überspringen.
const panelStartCol = COLS - PANEL_COLS
const panelStartRow = ROWS - PANEL_ROWS
const cellLeft = (col) => GAP + col * (SLOT_W + GAP)
const cellTop = (row) => GAP + row * (SLOT_H + GAP)

const placed = []
let next = 0
for (let row = 0; row < ROWS && next < resized.length; row++) {
  for (let col = 0; col < COLS && next < resized.length; col++) {
    if (col >= panelStartCol && row >= panelStartRow) continue // Panel
    placed.push({ buf: resized[next].buf, left: cellLeft(col), top: cellTop(row) })
    next++
  }
}

const composites = placed.map((p) => ({ input: p.buf, left: p.left, top: p.top }))

// --- Titel-Panel -------------------------------------------------------------
const panelLeft = cellLeft(panelStartCol)
const panelTop = cellTop(panelStartRow)
const panelW = PANEL_COLS * SLOT_W + (PANEL_COLS - 1) * GAP
const panelH = PANEL_ROWS * SLOT_H + (PANEL_ROWS - 1) * GAP

// Titel auf maximal zwei Zeilen umbrechen, damit er auch in ein schmaleres
// Panel passt als das 8×4-Layout von 2025 es hatte.
const titleLines = wrapTwoLines(title)
const titleSize = 76
const lineGap = 84

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
  ${titleLines
    .map(
      (line, i) => `<text x="36" y="${118 + i * lineGap}"
        font-family="'Antonio', 'Impact', 'Arial Black', sans-serif"
        font-size="${titleSize}" font-weight="900" fill="#ffffff" letter-spacing="1">
    ${escapeXml(line)}
  </text>`
    )
    .join('\n  ')}
  <text x="36" y="${118 + titleLines.length * lineGap}"
        font-family="'Poppins', 'Helvetica', 'Arial', sans-serif"
        font-size="30" font-weight="500" fill="#ffb81c">
    ${escapeXml(subtitle)}
  </text>
  <text x="36" y="${panelH - 34}" font-family="'Poppins', 'Helvetica', 'Arial', sans-serif"
        font-size="21" font-weight="400" fill="rgba(255,255,255,0.55)">
    footballschland.de · american football MADE IN GERMANY
  </text>
</svg>
`)
composites.push({ input: panelSvg, left: panelLeft, top: panelTop })

// Subtile Border pro Bildslot, macht das Grid sichtbarer
const borderSvg = (w, h) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <rect x="0" y="0" width="${w}" height="${h}" fill="none"
             stroke="${BORDER_COL}" stroke-width="2"/>
     </svg>`
  )
for (const p of placed) {
  composites.push({ input: borderSvg(SLOT_W, SLOT_H), left: p.left, top: p.top })
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
console.log(`      _rev nach heroImage-Patch: ${patchResult._rev}`)
console.log('Fertig.')

// --- Helfer ------------------------------------------------------------------
function wrapTwoLines(s) {
  const words = String(s).trim().split(/\s+/)
  if (words.length < 2) return [s]
  // Bruch an der Wortgrenze, die der Mitte der Zeichenkette am nächsten liegt
  const mid = s.length / 2
  let best = 1
  let bestDist = Infinity
  for (let i = 1; i < words.length; i++) {
    const len = words.slice(0, i).join(' ').length
    const dist = Math.abs(len - mid)
    if (dist < bestDist) {
      bestDist = dist
      best = i
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
