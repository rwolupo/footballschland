#!/usr/bin/env node
// Sync JSON-Dokumente aus content/ nach Sanity.
// Idempotent: createOrReplace auf deterministischer _id.
// Quelle der Wahrheit bei aktivem Sync ist Git – Studio-Edits an denselben
// Dokumenten werden beim nächsten Sync überschrieben.

import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const contentRoot = join(repoRoot, 'content')

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('FEHLER: SANITY_AUTH_TOKEN fehlt.')
  process.exit(1)
}

const client = createClient({
  projectId: 'k31tvjv8',
  dataset: 'production',
  apiVersion: '2026-03-28',
  token,
  useCdn: false,
})

function collectJsonFiles(dir) {
  const out = []
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      out.push(...collectJsonFiles(full))
    } else if (entry.endsWith('.json')) {
      out.push(full)
    }
  }
  return out
}

const files = collectJsonFiles(contentRoot)

if (files.length === 0) {
  console.log('Keine Content-Dateien in content/ gefunden – nichts zu tun.')
  process.exit(0)
}

let ok = 0
let errors = 0

// Lokale-Datei-Marker (z.B. heroImage als { _type: 'localFile', path: 'public/...' })
// werden vor dem createOrReplace zu Sanity-Asset-Referenzen aufgelöst. Die Asset-Upload
// API dedupliziert per Content-Hash, sodass wiederholte Syncs dasselbe Asset wiederverwenden.
async function resolveLocalFiles(node, ctx) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) node[i] = await resolveLocalFiles(node[i], ctx)
    return node
  }
  if (node && typeof node === 'object') {
    if (node._type === 'localFile' && typeof node.path === 'string') {
      const absPath = join(repoRoot, node.path)
      if (!existsSync(absPath)) {
        throw new Error(`localFile-Marker zeigt auf nicht existierende Datei: ${node.path}`)
      }
      const buf = readFileSync(absPath)
      const filename = node.path.split('/').pop()
      const asset = await client.assets.upload('image', buf, { filename })
      ctx.uploaded.push({ path: node.path, assetId: asset._id })
      return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }
    for (const k of Object.keys(node)) {
      node[k] = await resolveLocalFiles(node[k], ctx)
    }
  }
  return node
}

for (const path of files) {
  const rel = relative(repoRoot, path)
  let doc
  try {
    doc = JSON.parse(readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(`[${rel}] JSON-Parse-Fehler: ${err.message}`)
    errors++
    continue
  }

  if (!doc._type) {
    console.error(`[${rel}] fehlt: _type`)
    errors++
    continue
  }
  if (!doc._id) {
    if (doc.slug?.current) {
      doc._id = `${doc._type}-${doc.slug.current}`
    } else {
      console.error(`[${rel}] fehlt: _id oder slug.current (für deterministische ID)`)
      errors++
      continue
    }
  }

  const ctx = { uploaded: [] }
  try {
    doc = await resolveLocalFiles(doc, ctx)
  } catch (err) {
    console.error(`[${rel}] Asset-Upload-Fehler: ${err.message}`)
    errors++
    continue
  }
  for (const u of ctx.uploaded) {
    console.log(`[${rel}] hochgeladen: ${u.path} → ${u.assetId}`)
  }

  try {
    const res = await client.createOrReplace(doc)
    console.log(`[${rel}] → ${res._id}`)
    ok++
  } catch (err) {
    console.error(`[${rel}] Sanity-Fehler: ${err.message}`)
    errors++
  }
}

console.log(`Fertig. ${ok} synced, ${errors} Fehler.`)
process.exit(errors > 0 ? 1 : 0)
