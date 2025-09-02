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
  const envKeys = ['ANTORA_LUNR_IO_WORKERS', 'ANTORA_SOURCES_PARALLEL_WORKERS', 'ANTORA_CONCURRENCY', 'ANTORA_FETCH_CONCURRENCY']
  for (const k of envKeys) {
    const v = process.env[k]
    if (v && +v > 0) return +v
  }
  // Default to ultra-conservative IO concurrency to minimize memory pressure
  return 1
}

function getMaxCharsPerPage () {
  const v = process.env.ANTORA_LUNR_MAX_CHARS
  if (v && +v > 0) return +v
  // Tighter upper bound to avoid pathological pages blowing memory
  return 60000
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

function toSiteUrl (siteDir, filePath) {
  // Convert absolute file path back to site-relative URL
  const rel = path.relative(siteDir, filePath)
  let url = rel.replace(/\\/g, '/')
  // Ensure it starts with a slash for UI expectations
  if (!url.startsWith('/')) url = '/' + url
  return url
}

async function buildIndex (siteDir) {
  let files = await listHtmlFiles(siteDir)
  // Index latest-only by default if such pages exist
  const hasLatest = files.some((f) => f.includes(`${path.sep}latest${path.sep}`) || f.includes('/latest/'))
  if (hasLatest) {
    files = files.filter((f) => f.includes(`${path.sep}latest${path.sep}`) || f.includes('/latest/'))
  }
  const ioWorkers = getWorkers()
  const maxChars = getMaxCharsPerPage()

  // Minimal doc metadata to ship with the index
  const docMeta = []

  // Prepare a Lunr builder so we can add docs incrementally (low memory)
  const builder = new lunr.Builder()
  builder.ref('id')
  builder.field('title', { boost: 10 })
  builder.field('text')

  // Optional simplified pipeline to reduce memory/CPU
  const simplePipeline = (process.env.ANTORA_LUNR_SIMPLE_PIPELINE || '1') === '1'
  if (simplePipeline) {
    // Remove heavy stemming/stopword filters; keep minimal trimmer
    builder.pipeline.reset()
    builder.searchPipeline.reset()
    if (lunr.trimmer) {
      builder.pipeline.add(lunr.trimmer)
      builder.searchPipeline.add(lunr.trimmer)
    }
  }

  // Process files in small concurrent batches for IO, but add to index immediately
  let idxNext = 0
  let inFlight = 0
  await new Promise((resolve, reject) => {
    const next = () => {
      while (inFlight < ioWorkers && idxNext < files.length) {
        const file = files[idxNext++]
        inFlight++
        ;(async () => {
          const html = await readFileSafe(file)
          const url = toSiteUrl(siteDir, file)
          const title = extractTitle(html, path.basename(file, '.html'))
          let text = stripHtml(html)
          if (maxChars && text.length > maxChars) text = text.slice(0, maxChars)
          // Add to index and discard text immediately
          builder.add({ id: url, title, text })
          docMeta.push({ id: url, title, url })
        })()
          .then(() => {
            inFlight--
            if (idxNext >= files.length && inFlight === 0) resolve()
            else next()
          })
          .catch((e) => reject(e))
      }
      if (idxNext >= files.length && inFlight === 0) resolve()
    }
    next()
  })

  const index = builder.build()
  return { docs: docMeta, index: index.toJSON() }
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
  const t0 = Date.now()
  const payload = await buildIndex(siteDir)
  await writeOutputs(siteDir, payload)
  const dt = ((Date.now() - t0) / 1000).toFixed(2)
  console.log(`[lunr-fast] Wrote search-index.json and search-index.js in ${dt}s`)
}

main().catch((e) => {
  console.error('[lunr-fast] fatal:', e && e.message ? e.message : e)
  process.exit(1)
})
