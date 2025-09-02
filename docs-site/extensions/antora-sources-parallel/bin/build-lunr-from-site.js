#!/usr/bin/env node
/*
 * Fast Lunr indexer: builds a global search index directly from the merged Antora site HTML.
 *
 * Usage:
 *   node build-lunr-from-site.js <siteDir>
 *
 * Output:
 *   <siteDir>/search-index.json
 *   <siteDir>/search-index.js  (assigns window.searchIndex = { ... })
 */

const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const os = require('os')
const lunr = require('lunr')

function cpuWorkers (min = 3) {
  const cores = Array.isArray(os.cpus()) ? os.cpus().length : 1
  return Math.max(min, cores || 1)
}

function getWorkers () {
  const envKeys = ['ANTORA_SOURCES_PARALLEL_WORKERS', 'ANTORA_CONCURRENCY', 'ANTORA_FETCH_CONCURRENCY']
  for (const k of envKeys) {
    const v = process.env[k]
    if (v && +v > 0) return +v
  }
  return cpuWorkers(3)
}

function stripHtml (html) {
  // Remove script/style contents
  html = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  // Replace tags with spaces
  html = html.replace(/<[^>]+>/g, ' ')
  // Decode a few common entities
  html = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  // Collapse whitespace
  return html.replace(/\s+/g, ' ').trim()
}

async function readFileSafe (file) {
  try {
    return await fsp.readFile(file, 'utf8')
  } catch (e) {
    return ''
  }
}

function extractTitle (html, fallback) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1 && h1[1]) return stripHtml(h1[1])
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (title && title[1]) return stripHtml(title[1])
  return fallback || ''
}

async function listHtmlFiles (dir) {
  const out = []
  async function walk (d) {
    const entries = await fsp.readdir(d, { withFileTypes: true })
    for (const ent of entries) {
      const p = path.join(d, ent.name)
      if (ent.isDirectory()) {
        // skip some known non-page dirs if present
        if (ent.name === '_') continue
        await walk(p)
      } else if (ent.isFile()) {
        if (p.endsWith('.html')) out.push(p)
      }
    }
  }
  await walk(dir)
  return out
}

async function withPool (items, limit, worker) {
  const results = new Array(items.length)
  let i = 0
  let inFlight = 0
  let rejectFn
  return await new Promise((resolve, reject) => {
    rejectFn = reject
    const next = () => {
      while (inFlight < limit && i < items.length) {
        const idx = i++
        inFlight++
        Promise.resolve(worker(items[idx], idx))
          .then((r) => {
            results[idx] = r
            inFlight--
            if (i >= items.length && inFlight === 0) resolve(results)
            else next()
          })
          .catch((e) => rejectFn(e))
      }
      if (i >= items.length && inFlight === 0) resolve(results)
    }
    next()
  })
}

function toSiteUrl (siteDir, filePath) {
  // Convert absolute file path back to site-relative URL
  const rel = path.relative(siteDir, filePath)
  let url = rel.replace(/\\/g, '/')
  // Ensure it starts with a slash for UI expectations
  if (!url.startsWith('/')) url = '/' + url
  return url
}

async function buildIndex (siteDir) {
  const files = await listHtmlFiles(siteDir)
  const workers = getWorkers()
  const docs = []

  await withPool(files, workers, async (file) => {
    const html = await readFileSafe(file)
    if (!html) return
    const url = toSiteUrl(siteDir, file)
    const title = extractTitle(html, path.basename(file, '.html'))
    const text = stripHtml(html)
    docs.push({ id: url, title, url, text })
  })

  // Build Lunr index
  const idx = lunr(function () {
    this.ref('id')
    this.field('title', { boost: 10 })
    this.field('text')
    for (const d of docs) this.add(d)
  })

  return { docs: docs.map(({ id, title, url }) => ({ id, title, url })), index: idx.toJSON() }
}

async function writeOutputs (siteDir, payload) {
  const jsonPath = path.join(siteDir, 'search-index.json')
  const jsPath = path.join(siteDir, 'search-index.js')
  const json = JSON.stringify(payload)
  await fsp.writeFile(jsonPath, json, 'utf8')
  const js = `window.searchIndex=${json};\n`
  await fsp.writeFile(jsPath, js, 'utf8')
}

async function main () {
  const siteDir = path.resolve(process.argv[2] || path.join(process.cwd(), 'build', 'site'))
  console.log(`[lunr-fast] Indexing site at: ${siteDir}`)
  const payload = await buildIndex(siteDir)
  await writeOutputs(siteDir, payload)
  console.log('[lunr-fast] Wrote search-index.json and search-index.js')
}

main().catch((e) => {
  console.error('[lunr-fast] fatal:', e && e.message ? e.message : e)
  process.exit(1)
})
