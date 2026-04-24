#!/usr/bin/env node
// Scoring für den Mock-Draft-Vergleich nach FantasyPros-Schema (4 Regeln, max 10 Pkt pro Pick).
//
// Usage:
//   node scripts/score-mock-drafts.mjs
//
// Input:
//   - content/blockblog/ai-mock-draft-2026-part1.json  (die 5 vorhergesagten Boards)
//   - scripts/nfl-draft-2026-actual-r1.json            (echte R1, wird nach dem Draft befüllt)
//
// Output:
//   - console: Rangliste + Breakdown je Board
//   - scripts/scoring-results.md                       (Markdown-Tabelle für Part 2)
//
// FantasyPros-Regeln (kopiert aus Part-1-Artikel):
//   Regel 1 - Slot Accuracy (max 4): 4 exakt · 3 bei ±1 · 2 bei ±2 · 1 bei ±5
//   Regel 2 - Positional Rank (max 3, nur bei Draft in R1): 3 exakt · 2 ±1 · 1 ±2
//   Regel 3 - Team + Position (2): Team zieht diese Position in R1, egal welcher Pick
//   Regel 4 - Team + Spieler (1): Spieler geht zu vorhergesagtem Team, egal welcher Pick

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const ARTICLE_JSON = 'content/blockblog/ai-mock-draft-2026-part1.json'
const ACTUAL_JSON = 'scripts/nfl-draft-2026-actual-r1.json'
const ANALYST_JSON = 'scripts/analyst-mocks.json'   // optionale, nicht-KI-Boards
const OUTPUT_MD = 'scripts/scoring-results.md'

if (!existsSync(ACTUAL_JSON)) {
  console.error(`FEHLER: ${ACTUAL_JSON} fehlt.`)
  console.error(`Lege eine JSON-Datei mit 32 Pick-Objekten an, jeweils:`)
  console.error(`  [{ "pickNumber": 1, "team": "...", "playerName": "...", "position": "..." }, ...]`)
  process.exit(1)
}

const article = JSON.parse(readFileSync(ARTICLE_JSON, 'utf8'))
const mock = article.body.find(b => b._type === 'mockDraftComparison')
if (!mock) {
  console.error('FEHLER: mockDraftComparison-Block im Artikel nicht gefunden.')
  process.exit(1)
}
const boards = [...mock.aiMocks]
if (existsSync(ANALYST_JSON)) {
  const analysts = JSON.parse(readFileSync(ANALYST_JSON, 'utf8'))
  boards.push(...analysts)
}

const actual = JSON.parse(readFileSync(ACTUAL_JSON, 'utf8'))
if (!Array.isArray(actual) || actual.length === 0) {
  console.error('FEHLER: echte R1-Daten leer oder ungültig.')
  process.exit(1)
}

// Normalize positions: "EDGE/LB" -> primary "EDGE", ignore case
const primaryPos = (pos) => (pos || '').split(/[\/\s]/)[0].trim().toUpperCase()
// Team normalisieren: " via X" wird entfernt (z.B. "Giants via CIN" -> "giants"),
// dann auf alphanumerische Kleinbuchstaben reduziert.
const normTeam = (t) => (t || '').toLowerCase().replace(/\s+via\s+.+$/i, '').replace(/[^a-z0-9]/g, '')
const normPlayer = (n) => (n || '').toLowerCase().replace(/[^a-z0-9]/g, '')

function computePositionalRanks(picks) {
  const ranks = new Map()
  const counters = new Map()
  for (const p of picks) {
    const pos = primaryPos(p.position)
    const count = (counters.get(pos) || 0) + 1
    counters.set(pos, count)
    ranks.set(normPlayer(p.playerName), { pos, rank: count })
  }
  return ranks
}

function scoreBoard(board, actual) {
  const actualByPlayer = new Map(actual.map(p => [normPlayer(p.playerName), p]))
  const actualPicksByTeam = new Map()
  for (const p of actual) {
    const t = normTeam(p.team)
    if (!actualPicksByTeam.has(t)) actualPicksByTeam.set(t, [])
    actualPicksByTeam.get(t).push(p)
  }

  const predRanks = computePositionalRanks(board.picks)
  const actualRanks = computePositionalRanks(actual)

  const rows = []
  let totals = { r1: 0, r2: 0, r3: 0, r4: 0, total: 0 }

  for (const pick of board.picks) {
    const row = {
      pickNumber: pick.pickNumber,
      predTeam: pick.team,
      predPlayer: pick.playerName,
      predPos: pick.position,
      r1: 0, r2: 0, r3: 0, r4: 0, total: 0,
      note: '',
    }

    const key = normPlayer(pick.playerName)
    const actualPick = actualByPlayer.get(key)

    // Regel 1 — Slot Accuracy
    if (actualPick) {
      const delta = Math.abs(pick.pickNumber - actualPick.pickNumber)
      if (delta === 0) row.r1 = 4
      else if (delta === 1) row.r1 = 3
      else if (delta === 2) row.r1 = 2
      else if (delta <= 5) row.r1 = 1
    }

    // Regel 2 — Positional Rank
    const pr = predRanks.get(key)
    const ar = actualRanks.get(key)
    if (pr && ar && pr.pos === ar.pos) {
      const delta = Math.abs(pr.rank - ar.rank)
      if (delta === 0) row.r2 = 3
      else if (delta === 1) row.r2 = 2
      else if (delta === 2) row.r2 = 1
    }

    // Regel 3 — Team + Position
    const predTeamActualPicks = actualPicksByTeam.get(normTeam(pick.team)) || []
    const predPrimary = primaryPos(pick.position)
    if (predTeamActualPicks.some(p => primaryPos(p.position) === predPrimary)) {
      row.r3 = 2
    }

    // Regel 4 — Team + Spieler
    if (predTeamActualPicks.some(p => normPlayer(p.playerName) === key)) {
      row.r4 = 1
    }

    row.total = row.r1 + row.r2 + row.r3 + row.r4
    totals.r1 += row.r1
    totals.r2 += row.r2
    totals.r3 += row.r3
    totals.r4 += row.r4
    totals.total += row.total
    rows.push(row)
  }

  return { board: board.aiName, slug: board.aiSlug, totals, rows }
}

const results = boards.map(b => scoreBoard(b, actual))
results.sort((a, b) => b.totals.total - a.totals.total)

// Console-Output
console.log('=== SCORING (gesamt) ===')
console.log('')
for (const r of results) {
  console.log(`${r.board.padEnd(30)} ${String(r.totals.total).padStart(4)} Pkt  ` +
    `(R1 ${r.totals.r1} / R2 ${r.totals.r2} / R3 ${r.totals.r3} / R4 ${r.totals.r4})`)
}
console.log('')

// Markdown-Output für Part 2
const md = []
md.push('## Ergebnistabelle\n')
md.push('| Rang | Board | Gesamt | R1 (Slot) | R2 (PosRank) | R3 (Team+Pos) | R4 (Team+Spieler) |')
md.push('|---:|---|---:|---:|---:|---:|---:|')
results.forEach((r, i) => {
  md.push(`| ${i + 1} | ${r.board} | **${r.totals.total}** | ${r.totals.r1} | ${r.totals.r2} | ${r.totals.r3} | ${r.totals.r4} |`)
})
md.push('')
md.push('Maximal möglich pro Board: 320 Punkte (10 × 32 Picks).\n')

md.push('## Detail-Breakdown pro Board\n')
for (const r of results) {
  md.push(`### ${r.board} — ${r.totals.total} Punkte\n`)
  md.push('| Pick | Team (pred) | Spieler (pred) | Pos | R1 | R2 | R3 | R4 | Pkt |')
  md.push('|---:|---|---|---|---:|---:|---:|---:|---:|')
  for (const row of r.rows) {
    md.push(`| ${row.pickNumber} | ${row.predTeam} | ${row.predPlayer} | ${row.predPos} | ${row.r1} | ${row.r2} | ${row.r3} | ${row.r4} | **${row.total}** |`)
  }
  md.push('')
}

writeFileSync(OUTPUT_MD, md.join('\n'))
console.log(`Geschrieben: ${OUTPUT_MD}`)
