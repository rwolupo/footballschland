#!/usr/bin/env node
// Konvertiert den Part-2-Markdown in ein Sanity-Portable-Text-Dokument.
// Tabellen werden – da das Schema keinen Tabellen-Block hat – zeilenweise als
// formatierte Absätze ausgegeben, mit Fett-/Italic-Marks für die Lesbarkeit.
//
// Quelle: content/blockblog/ai-mock-draft-2026-part2.md
// Ziel:   content/blockblog/ai-mock-draft-2026-part2.json

import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'content/blockblog/ai-mock-draft-2026-part2.md'
const DST = 'content/blockblog/ai-mock-draft-2026-part2.json'
const DOC_ID = 'b3c1e95a-3f2d-4a8f-9c1d-ab92c2e4a7f2'
const SLUG = 'ki-vs-footballschland-nfl-mock-draft-2026-part-2'
const TITLE = 'Das Scoring ist da: Die Menschen haben die Maschinen geschlagen'
const DESCRIPTION = 'Teil 2 des KI-Mock-Draft-Vergleichs: Daniel Jeremiah gewinnt vor Björn Werner und ChatGPT. Plus Top-10-Auswertung mit klarem Rollentausch: Claude überholt die Menschen, Perplexity rehabilitiert sich.'

const md = readFileSync(SRC, 'utf8')
let keyCounter = 0
const k = () => `k${++keyCounter}`

// --- Inline-Parser: **bold**, *italic*, [text](href), `code`
function parseInline(text) {
  const markDefs = []
  const spans = []
  const marks = new Set()
  let buf = ''
  let i = 0
  const flush = () => {
    if (buf) {
      spans.push({ _type: 'span', _key: k(), text: buf, marks: [...marks] })
      buf = ''
    }
  }
  while (i < text.length) {
    // Link [text](href)
    if (text[i] === '[') {
      const close = text.indexOf(']', i + 1)
      if (close > -1 && text[close + 1] === '(') {
        const paren = text.indexOf(')', close + 2)
        if (paren > -1) {
          flush()
          const label = text.slice(i + 1, close)
          const href = text.slice(close + 2, paren)
          const linkKey = k()
          markDefs.push({ _type: 'link', _key: linkKey, href })
          spans.push({ _type: 'span', _key: k(), text: label, marks: [...marks, linkKey] })
          i = paren + 1
          continue
        }
      }
    }
    if (text.startsWith('**', i)) {
      flush()
      if (marks.has('strong')) marks.delete('strong'); else marks.add('strong')
      i += 2
      continue
    }
    if (text[i] === '*' && text[i + 1] !== '*' && (i === 0 || text[i - 1] !== '\\')) {
      flush()
      if (marks.has('em')) marks.delete('em'); else marks.add('em')
      i += 1
      continue
    }
    if (text[i] === '`') {
      flush()
      if (marks.has('code')) marks.delete('code'); else marks.add('code')
      i += 1
      continue
    }
    buf += text[i]
    i++
  }
  flush()
  if (spans.length === 0) spans.push({ _type: 'span', _key: k(), text, marks: [] })
  return { spans, markDefs }
}

const block = (text, style = 'normal', extra = {}) => {
  const { spans, markDefs } = parseInline(text)
  return { _type: 'block', _key: k(), style, markDefs, children: spans, ...extra }
}
const h2 = (text) => block(text, 'h2')
const h3 = (text) => block(text, 'h3')
const li = (text) => block(text, 'normal', { listItem: 'bullet', level: 1 })
const para = (text) => block(text, 'normal')

// --- Tabellen-Zeile → Absatz-Text
// Wir formen jede Datenzeile in einen Fett-/Italic-Absatz um.
// Für die Scoring-Tabellen: "**Rang · Board · Total Pkt** — R1 X · R2 X · R3 X · R4 X"
function scoringRowToText(cells) {
  // Erwartet: [Rang, Board, Gesamt, R1, R2, R3, R4]
  const [rank, board, total, r1, r2, r3, r4] = cells
  const cleanTotal = (total || '').replace(/\*\*/g, '')
  return `**${rank.trim()} · ${board.trim()} · ${cleanTotal.trim()} Pkt** — R1 Slot ${r1} · R2 PosRank ${r2} · R3 Team+Pos ${r3} · R4 Team+Spieler ${r4}`
}
function buggyRowToText(cells) {
  // Erwartet: [Board, Buggy, Final]
  const [board, buggy, final] = cells
  return `**${board.trim()}** — vorher ${buggy.trim()} Pkt · jetzt **${final.trim()} Pkt**`
}

// --- Markdown parsen
const lines = md.split('\n')
const body = []
let i = 0
let inTable = false
let tableHeader = null
let tableRows = []
let lastHeading = ''

function flushTable() {
  if (!tableRows.length) { inTable = false; tableHeader = null; tableRows = []; return }
  // Scoring-Tabelle?
  const isScoring = tableHeader && /Rang/i.test(tableHeader[0]) && /Board/i.test(tableHeader[1] || '')
  const isBuggy = tableHeader && /Board/i.test(tableHeader[0]) && /Buggy/i.test(tableHeader[1] || '')

  if (isScoring) {
    for (const row of tableRows) body.push(li(scoringRowToText(row)))
  } else if (isBuggy) {
    for (const row of tableRows) body.push(li(buggyRowToText(row)))
  } else {
    // Fallback: einfache Key-Value-Absätze
    for (const row of tableRows) {
      body.push(li(row.map((c, idx) => (tableHeader?.[idx] ? `**${tableHeader[idx].trim()}:** ${c}` : c)).join(' · ')))
    }
  }
  inTable = false
  tableHeader = null
  tableRows = []
}

while (i < lines.length) {
  const raw = lines[i]

  // Tabellen
  if (raw.includes('|')) {
    const cells = raw.split('|').map(s => s.trim())
    if (cells[0] === '') cells.shift()
    if (cells[cells.length - 1] === '') cells.pop()
    if (cells.every(c => /^:?-+:?$/.test(c))) { i++; continue } // separator
    if (!inTable) {
      inTable = true
      tableHeader = cells
    } else {
      tableRows.push(cells)
    }
    i++
    continue
  } else if (inTable) {
    flushTable()
  }

  // Trennlinie
  if (raw.trim() === '---') { i++; continue }

  // H1 = Titel, separat gesetzt
  if (raw.startsWith('# ') && !raw.startsWith('## ')) { i++; continue }

  if (raw.startsWith('## ')) {
    lastHeading = raw.substring(3).trim()
    body.push(h2(lastHeading))
    i++; continue
  }
  if (raw.startsWith('### ')) {
    body.push(h3(raw.substring(4).trim()))
    i++; continue
  }

  // Bulletpunkt
  if (raw.startsWith('- ')) {
    body.push(li(raw.substring(2)))
    i++; continue
  }
  // Nummerierter Listen-Punkt (1. 2. 3.)
  const numMatch = raw.match(/^(\d+)\.\s+(.+)$/)
  if (numMatch) {
    body.push(block(numMatch[2], 'normal', { listItem: 'number', level: 1 }))
    i++; continue
  }

  // Leerzeile
  if (raw.trim() === '') { i++; continue }

  // Italic-Intro-Zeile (z.B. "*Part 2 – …*") als em-Absatz
  if (raw.trim().startsWith('*') && raw.trim().endsWith('*') && !raw.trim().startsWith('**')) {
    body.push(para(raw.trim()))
    i++; continue
  }

  // Normalparagraph: bis zur nächsten Leerzeile/Heading/Liste/Tabelle
  const pBuf = [raw]
  let j = i + 1
  while (j < lines.length) {
    const next = lines[j]
    if (next.trim() === '') break
    if (next.startsWith('#')) break
    if (next.startsWith('- ')) break
    if (/^\d+\.\s+/.test(next)) break
    if (next.includes('|')) break
    if (next.trim() === '---') break
    pBuf.push(next)
    j++
  }
  body.push(para(pBuf.join(' ')))
  i = j
}

flushTable()

const doc = {
  _type: 'blockblogPost',
  _id: DOC_ID,
  title: TITLE,
  slug: { _type: 'slug', current: SLUG },
  description: DESCRIPTION,
  pubDate: '2026-04-26',
  author: 'Daniel Düngel',
  category: 'NFL Draft',
  readTime: '12 Min. Lesezeit',
  // Hero-Bild teilen wir uns mit Part 1 (gleiches Motiv, Wiedererkennungswert).
  // Der Sync-Workflow lädt die SVG bei jedem Run hoch; Sanity dedupliziert per Content-Hash.
  heroImage: {
    _type: 'localFile',
    path: 'public/assets/blog/ki-vs-footballschland-2026.svg',
  },
  body,
}

writeFileSync(DST, JSON.stringify(doc, null, 2))
console.log(`OK: wrote ${DST}`)
console.log(`  ${body.length} body blocks`)
