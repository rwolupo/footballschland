#!/usr/bin/env node
// Einmalig: konvertiert das Cowork-Markdown zu Sanity-Portable-Text-JSON.
// Quellfile: content/blockblog/ai-mock-draft-2026-part1.md
// Zielfile:  content/blockblog/ai-mock-draft-2026-part1.json

import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'content/blockblog/ai-mock-draft-2026-part1.md'
const DST = 'content/blockblog/ai-mock-draft-2026-part1.json'
const DOC_ID = 'acbfa120-94d0-4321-bf29-9862f0f848e3'
const SLUG = 'ki-vs-footballschland-nfl-mock-draft-2026'
const TITLE = 'KI vs. Footballschland – Mock Drafts für den NFL Draft 2026'

const md = readFileSync(SRC, 'utf8')

let keyCounter = 0
const k = () => `k${++keyCounter}`

// Inline-Parser: **bold**, *italic*, `code`
function parseInline(text) {
  const spans = []
  let i = 0
  let buf = ''
  const marks = new Set()
  const flush = () => {
    if (buf) {
      spans.push({ _type: 'span', _key: k(), text: buf, marks: [...marks] })
      buf = ''
    }
  }
  while (i < text.length) {
    if (text.startsWith('**', i)) {
      flush()
      if (marks.has('strong')) marks.delete('strong'); else marks.add('strong')
      i += 2
    } else if (text[i] === '*' && text[i+1] !== '*' && (i === 0 || text[i-1] !== '\\')) {
      flush()
      if (marks.has('em')) marks.delete('em'); else marks.add('em')
      i += 1
    } else {
      buf += text[i]
      i++
    }
  }
  flush()
  if (spans.length === 0) spans.push({ _type: 'span', _key: k(), text, marks: [] })
  return spans
}

const para = (text, style = 'normal', extra = {}) => ({
  _type: 'block', _key: k(), style, markDefs: [], children: parseInline(text), ...extra,
})
const h2 = (text) => para(text, 'h2')
const h3 = (text) => para(text, 'h3')
const li = (text) => para(text, 'normal', { listItem: 'bullet', level: 1 })

// Parse markdown into blocks + aiMocks
const lines = md.split('\n')
const bodyBefore = []   // blocks vor dem mockDraftComparison
const bodyAfter = []    // blocks danach
let target = bodyBefore
const aiMocks = []

// Expected AI blocks in order
const AI_META = [
  { name: 'Gemini 2.5', slug: 'gemini', marker: 'Gemini 2.5' },
  { name: 'Perplexity (Grok 4.1)', slug: 'perplexity', marker: 'Perplexity' },
  { name: 'ChatGPT GPT-5', slug: 'chatgpt', marker: 'ChatGPT' },
  { name: 'Claude Opus 4.7', slug: 'claude', marker: 'Claude' },
  { name: 'Footballschland-Redaktion', slug: 'footballschland', marker: 'Footballschland' },
]

let i = 0
let currentAi = null       // { name, slug, prompt, picks, fazit[] }
let inDetails = false
let detailsBuf = []
let inTable = false
let tableRows = []
let tableHeader = null
let inCodeBlock = false
let codeBuf = []

function flushCurrentAi() {
  if (!currentAi) return
  aiMocks.push({
    _type: 'aiMock', _key: k(),
    aiName: currentAi.name, aiSlug: currentAi.slug,
    prompt: currentAi.prompt || '',
    picks: currentAi.picks || [],
    fazit: currentAi.fazit || [],
  })
  currentAi = null
}

function flushTable() {
  if (!tableRows.length) { inTable = false; tableHeader = null; tableRows = []; return }
  // Heuristik: 5-Spalten-Tabelle (Pick|Team|Spieler|Pos|College) = AI picks
  if (tableHeader && tableHeader.length === 5 && /pick/i.test(tableHeader[0]) && currentAi) {
    currentAi.picks = tableRows.map((row, idx) => {
      const [pickStr, team, player, pos, college] = row
      return {
        _key: `p${idx + 1}`,
        pickNumber: parseInt(pickStr.replace(/[^\d]/g, ''), 10) || (idx + 1),
        team: team || '',
        playerName: (player || '').replace(/\s*🇩🇪/g, '').trim(),
        position: pos || '',
        college: college || '',
      }
    })
  } else {
    // Andere Tabellen (z.B. Gesamtvergleichstabelle): als Text-Absatz dumpen
    // Wir skippen sie, weil der mockDraftComparison-Block eine eigene Summary rendert.
  }
  inTable = false
  tableHeader = null
  tableRows = []
}

while (i < lines.length) {
  const line = lines[i]
  const raw = line

  // --- Horizontal rule — reset state if needed
  if (raw.trim() === '---') {
    flushTable()
    i++
    continue
  }

  // --- H1 = Titel: wird separat gesetzt, im Body ignorieren
  if (raw.startsWith('# ') && !raw.startsWith('## ')) {
    i++
    continue
  }

  // --- Code block start/end
  if (raw.startsWith('```')) {
    if (inCodeBlock) {
      // Ende: Code-Inhalt dem prompt zuweisen, falls im details-Block
      if (inDetails && currentAi && !currentAi.prompt) {
        currentAi.prompt = codeBuf.join('\n')
      }
      codeBuf = []
      inCodeBlock = false
    } else {
      inCodeBlock = true
    }
    i++
    continue
  }
  if (inCodeBlock) {
    codeBuf.push(raw)
    i++
    continue
  }

  // --- details / summary — für die Prompts
  if (raw.includes('<details>')) { inDetails = true; i++; continue }
  if (raw.includes('</details>')) { inDetails = false; i++; continue }
  if (raw.includes('<summary>')) { i++; continue }
  if (inDetails) { i++; continue }

  // --- Table detection
  if (raw.includes('|') && !raw.trim().startsWith('#')) {
    const cells = raw.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1 || arr[0] === '' || arr[arr.length-1] === '')
    // safer: split and trim, drop leading/trailing empty
    const cells2 = raw.split('|').map(s => s.trim())
    if (cells2[0] === '') cells2.shift()
    if (cells2[cells2.length - 1] === '') cells2.pop()

    // Separator row: |---|---|---|
    if (cells2.every(c => /^:?-+:?$/.test(c))) {
      i++
      continue
    }

    if (!inTable) {
      inTable = true
      tableHeader = cells2
    } else {
      tableRows.push(cells2)
    }
    i++
    continue
  } else if (inTable) {
    flushTable()
  }

  // --- Headings
  if (raw.startsWith('## ')) {
    const title = raw.substring(3).trim()

    // Check if this is an AI block
    const matched = AI_META.find(m => title.includes(m.marker))
    if (matched) {
      flushCurrentAi()
      currentAi = { name: matched.name, slug: matched.slug, prompt: '', picks: [], fazit: [] }
      // switch target: mock block wird später eingefügt, weitere Blöcke kommen nach
      target = bodyAfter  // After this first AI, anything not an AI block goes to bodyAfter temporarily
      i++
      continue
    }
    // Not an AI block: flush any current AI and continue accumulating into target
    if (currentAi) {
      flushCurrentAi()
      target = bodyAfter
    }
    target.push(h2(title))
    i++
    continue
  }

  if (raw.startsWith('### ')) {
    const title = raw.substring(4).trim()
    if (currentAi) {
      currentAi.fazit.push(h3(title))
    } else {
      target.push(h3(title))
    }
    i++
    continue
  }

  // --- Bullet list
  if (raw.startsWith('- ')) {
    const item = raw.substring(2)
    if (currentAi) {
      currentAi.fazit.push(li(item))
    } else {
      target.push(li(item))
    }
    i++
    continue
  }

  // --- Paragraphs: accumulate lines until blank
  if (raw.trim() === '') {
    i++
    continue
  }

  // Start a paragraph — collect until blank line, heading, list, table, rule, or details
  let pBuf = [raw]
  let j = i + 1
  while (j < lines.length) {
    const next = lines[j]
    if (next.trim() === '') break
    if (next.startsWith('#')) break
    if (next.startsWith('- ')) break
    if (next.startsWith('---')) break
    if (next.startsWith('```')) break
    if (next.includes('<details>') || next.includes('</details>')) break
    if (next.includes('|')) break
    pBuf.push(next)
    j++
  }
  const pText = pBuf.join(' ')
  if (currentAi) {
    currentAi.fazit.push(para(pText))
  } else {
    target.push(para(pText))
  }
  i = j
}

flushTable()
flushCurrentAi()

// --- Build mockDraftComparison block
const mockBlock = {
  _type: 'mockDraftComparison',
  _key: k(),
  year: 2026,
  aiMocks,
}

// --- Assemble final body
// bodyBefore = alles vor dem ersten "## Block 1 – Gemini" (Intro, Scoring, Methodik)
// mockBlock  = alle 5 AI Mocks zusammengefasst
// bodyAfter  = "Was jetzt", "Disclaimer"
const body = [...bodyBefore, mockBlock, ...bodyAfter]

const doc = {
  _type: 'blockblogPost',
  _id: DOC_ID,
  title: TITLE,
  slug: { _type: 'slug', current: SLUG },
  description: 'Fünf Mock Drafts für die erste Runde des NFL Draft 2026: Gemini, ChatGPT, Perplexity, Claude und die Footballschland-Redaktion. Teil 1 vor dem Draft, Scoring in Teil 2.',
  pubDate: '2026-04-21',
  author: 'Daniel Düngel',
  category: 'NFL Draft',
  readTime: '15 Min. Lesezeit',
  body,
}

writeFileSync(DST, JSON.stringify(doc, null, 2))
console.log(`OK: wrote ${DST}`)
console.log(`  ${aiMocks.length} AI Mocks`)
console.log(`  ${body.length} body blocks (inkl. mockDraftComparison)`)
for (const m of aiMocks) {
  console.log(`  - ${m.aiName}: ${m.picks.length} picks, ${m.fazit.length} fazit blocks, prompt=${m.prompt ? 'yes' : 'no'}`)
}
