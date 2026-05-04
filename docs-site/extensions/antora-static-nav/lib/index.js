// Copyright 2026 Holochip Inc.
// SPDX-License-Identifier: Apache-2.0
//
// antora-static-nav — Antora site generator extension
//
// Extracts the repeated navigation sidebar from built HTML pages into a single
// shared <component>/<version>/_static_nav.js file and replaces each page's
// embedded copy with a synchronous <script> loader (~300 bytes).
//
// Because the loader is a synchronous parser-blocking script (no defer/async),
// the nav DOM is present before site.js runs, so split-pane resizing, mobile
// toggle, and all other Antora UI interactions continue to work correctly.
//
// Registration (antora-playbook.yml):
//
//   antora:
//     extensions:
//       - require: ./js/antora-static-nav/lib/index.js
//         threshold: 50000   # bytes; skip components whose nav is smaller
//
// The extension fires on `pagesComposed` — after every page is fully rendered
// with its Handlebars layout (nav included) but before files are written.
//
// NOTE: The register function intentionally omits the outer default (`= {}`) so
// that Function.length === 1. Antora inspects .length to decide the calling
// convention: length 0 → register.call(this) with no args; length ≥ 1 with a
// named (non-destructured) param → register(this); length ≥ 1 with a
// destructured param → register.call(this, { config, ...vars }).
// The last form is what we want so that `config` (containing `threshold`) is
// passed in correctly.

'use strict'

const path = require('path')

const MARKER = '<!-- antora-static-nav -->'
const SHARED_NAV_NAME = '_static_nav.js'

// ---------------------------------------------------------------------------
// Nav HTML extraction (depth-counting, no external HTML parser)
// ---------------------------------------------------------------------------

/**
 * Find the id="split-0" nav-container div and return its text + byte offsets.
 * Returns null if not found.
 */
function findNavBlock (html) {
  const startRx = /<div\b[^>]*\bid=["']split-0["'][^>]*>/
  const m = startRx.exec(html)
  if (!m) return null

  const start = m.index
  let depth = 0
  let pos = start

  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos)
    const nextClose = html.indexOf('</div', pos)

    if (nextClose < 0) return null

    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++
      pos = nextOpen + 4
    } else {
      depth--
      if (depth === 0) {
        const closeTag = html.indexOf('>', nextClose)
        if (closeTag < 0) return null
        const end = closeTag + 1
        return { text: html.slice(start, end), start, end }
      }
      pos = nextClose + 5
    }
  }
  return null
}

/**
 * Strip per-page active-state classes so the shared nav is page-neutral.
 * Preserves `is-active` on panel <div>s (controls which panel is visible).
 */
function cleanNav (nav) {
  return nav
    .replace(/\s+is-current-page\b/g, '')
    .replace(/\s+is-current-path\b/g, '')
    .replace(/(<li\b[^>]+class=["'][^"']*?)\s+is-active\b/g, '$1')
}

// ---------------------------------------------------------------------------
// Output builders
// ---------------------------------------------------------------------------

/**
 * Build the content of _static_nav.js.
 *
 * Injects the nav synchronously via currentScript.parentNode.insertBefore —
 * no document.write(), no fetch(). JSON.stringify handles all HTML escaping.
 */
function buildNavJs (navHtml) {
  const navJson = JSON.stringify(navHtml)
  return (
    '(function(){' +
    'var s=document.currentScript||document.scripts[document.scripts.length-1];' +
    'var t=document.createElement("div");' +
    `t.innerHTML=${navJson};` +
    'var n=t.firstChild;' +
    'if(n)s.parentNode.insertBefore(n,s);' +
    '})();\n'
  )
}

/**
 * Build the HTML fragment that replaces a page's embedded nav block.
 *
 * Two <script> elements:
 *   1. Synchronous loader — injects _static_nav.js before site.js runs
 *   2. Tiny inline — re-applies is-current-page to this page's nav entry
 */
function buildReplacement (navRel, pageBasename) {
  const fileJson = JSON.stringify(pageBasename)
  const currentPageJs =
    `!function(){var f=${fileJson},` +
    "ls=document.querySelectorAll('.nav-link[href]');" +
    'for(var i=0;i<ls.length;i++){' +
    "if(ls[i].getAttribute('href').split('/').pop()===f){" +
    "var li=ls[i].closest('li');" +
    "if(li){li.classList.add('is-current-page');break;}" +
    '}}}();'
  return `${MARKER}<script src="${navRel}"></script><script>${currentPageJs}</script>`
}

// ---------------------------------------------------------------------------
// Extension entry point
// ---------------------------------------------------------------------------

module.exports = { findNavBlock, cleanNav, buildNavJs, buildReplacement, MARKER, SHARED_NAV_NAME }

module.exports.register = function register ({ config = {} }) {
  const threshold = config.threshold ?? 50_000

  this.on('pagesComposed', ({ siteCatalog, contentCatalog }) => {
    // Acquire the logger inside the handler so it resolves after the playbook
    // has configured Antora's logger (avoids a crash in pino's asChindings
    // when the root logger is still in its unconfigured default state).
    const logger = this.getLogger('static-nav')

    try {
    const allPages = contentCatalog.getPages((page) => page.out)

    // Group by component@version so each component gets its own shared nav.
    const groups = new Map()
    for (const page of allPages) {
      const key = `${page.src.component}@${page.src.version}`
      const bucket = groups.get(key)
      if (bucket) bucket.push(page)
      else groups.set(key, [page])
    }

    let totalSaved = 0

    for (const [key, pages] of groups) {
      // Sample up to 10 pages to find the first one with a large-enough nav.
      let navHtml = null
      for (const page of pages.slice(0, 10)) {
        const html = page.contents.toString('utf8')
        const block = findNavBlock(html)
        if (block && block.text.length >= threshold) {
          navHtml = cleanNav(block.text)
          break
        }
      }

      if (!navHtml) continue

      const navBytes = Buffer.byteLength(navHtml, 'utf8')
      logger.info(
        { component: key, pages: pages.length, navBytes },
        'static-nav: extracting shared nav'
      )

      const { component, version } = pages[0].src
      const navJsOutPath = path.join(component, version, SHARED_NAV_NAME).replace(/\\/g, '/')

      const navJsContent = buildNavJs(navHtml)
      siteCatalog.addFile({
        contents: Buffer.from(navJsContent, 'utf8'),
        out: { path: navJsOutPath },
        pub: {
          url: `/${navJsOutPath}`,
          rootPath: path.relative(path.dirname(navJsOutPath), '').replace(/\\/g, '/') || '.',
        },
        mediaType: 'application/javascript',
      })

      // Rewrite each page: replace the embedded nav block with the loader.
      let rewritten = 0
      let skipped = 0
      for (const page of pages) {
        const html = page.contents.toString('utf8')
        if (html.includes(MARKER)) {
          skipped++
          continue
        }
        const block = findNavBlock(html)
        if (!block) {
          skipped++
          continue
        }

        const navRel = path
          .relative(page.out.dirname, navJsOutPath)
          .replace(/\\/g, '/')

        const replacement = buildReplacement(navRel, page.out.basename)
        const newHtml = html.slice(0, block.start) + replacement + html.slice(block.end)
        page.contents = Buffer.from(newHtml, 'utf8')

        totalSaved += block.text.length - replacement.length
        rewritten++
      }

      logger.info(
        { component: key, rewritten, skipped },
        'static-nav: pages rewritten'
      )
    }

    if (totalSaved > 0) {
      const savedMB = (totalSaved / 1024 / 1024).toFixed(1)
      logger.info({ savedMB }, `static-nav: total nav HTML removed from output: ~${savedMB} MB`)
    }
    } catch (err) {
      logger.error({ err }, 'static-nav: unexpected error during nav extraction; pages left unmodified')
    }
  })
}
