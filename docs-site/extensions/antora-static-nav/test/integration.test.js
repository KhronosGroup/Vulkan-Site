// Copyright 2026 Holochip Inc.
// SPDX-License-Identifier: Apache-2.0
//
// Integration test: exercises the register() function with a mock Antora
// context to verify the full page-rewrite pipeline without running a real
// Antora build.
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const path = require('path')

const { register } = require('../lib/index.js')
const { MARKER, SHARED_NAV_NAME } = require('../lib/index.js')

// ---------------------------------------------------------------------------
// Mock Antora context helpers
// ---------------------------------------------------------------------------

function makeNav (size = 60_000) {
  // Produce a nav block of approximately `size` bytes.
  const filler = 'x'.repeat(size - 100)
  return `<div id="split-0"><ul class="nav-list"><li class="nav-item is-current-page"><a class="nav-link" href="page.html">Item</a></li><li>${filler}</li></ul></div>`
}

function makePage (component, version, moduleName, basename, navHtml) {
  const html =
    `<!DOCTYPE html><html><body>` +
    navHtml +
    `<div id="split-1"><main>content</main></div>` +
    `</body></html>`
  // Compute output path like Antora does: component/version/[module/]page
  const dirname = moduleName === 'ROOT'
    ? path.join(component, version)
    : path.join(component, version, moduleName)
  return {
    src: { component, version, module: moduleName },
    out: {
      path: path.join(dirname, basename).replace(/\\/g, '/'),
      dirname: dirname.replace(/\\/g, '/'),
      basename,
    },
    contents: Buffer.from(html, 'utf8'),
  }
}

function makeContext (pages, config = {}) {
  const addedFiles = []
  const listeners = {}

  const context = {
    getLogger: () => ({
      info: () => {},
      warn: () => {},
    }),
    on (event, listener) {
      listeners[event] = listener
    },
    // Simulate notify('pagesComposed')
    fire (event) {
      const listener = listeners[event]
      if (!listener) return
      const siteCatalog = { addFile: (f) => addedFiles.push(f) }
      const contentCatalog = { getPages: (filter) => (filter ? pages.filter(filter) : pages) }
      listener({ siteCatalog, contentCatalog })
    },
    _addedFiles: addedFiles,
  }

  // Call register with context as `this` and config arg (as Antora does)
  register.call(context, { config })

  return context
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('register integration', () => {
  it('extracts nav and adds _static_nav.js to site catalog', () => {
    const nav = makeNav(60_000)
    const page1 = makePage('refpages', 'latest', 'ROOT', 'vkFoo.html', nav)
    const page2 = makePage('refpages', 'latest', 'ROOT', 'vkBar.html', nav)

    const ctx = makeContext([page1, page2])
    ctx.fire('pagesComposed')

    assert.equal(ctx._addedFiles.length, 1, 'exactly one shared nav JS file added')
    const navFile = ctx._addedFiles[0]
    assert.equal(navFile.out.path, `refpages/latest/${SHARED_NAV_NAME}`)
  })

  it('rewrites page contents to replace nav block with script loader', () => {
    const nav = makeNav(60_000)
    const page = makePage('refpages', 'latest', 'ROOT', 'vkFoo.html', nav)
    const ctx = makeContext([page])
    ctx.fire('pagesComposed')

    const rewritten = page.contents.toString('utf8')
    assert.ok(rewritten.includes(MARKER), 'marker present')
    assert.ok(rewritten.includes(`<script src=`), 'script loader present')
    assert.ok(!rewritten.includes('id="split-0"'), 'original nav block removed')
  })

  it('relative script path is correct for pages in subdirectories', () => {
    const nav = makeNav(60_000)
    // Page in component/version/subdir/page.html — nav JS is at component/version/_static_nav.js
    const page = makePage('refpages', 'latest', 'man', 'vkFoo.html', nav)
    const ctx = makeContext([page])
    ctx.fire('pagesComposed')

    const rewritten = page.contents.toString('utf8')
    // From refpages/latest/man/vkFoo.html, relative path to refpages/latest/_static_nav.js is "../_static_nav.js"
    assert.ok(rewritten.includes(`src="../${SHARED_NAV_NAME}"`), `expected relative path, got: ${rewritten.match(/src="[^"]+"/)}`)
  })

  it('skips components whose nav is below the threshold', () => {
    const nav = makeNav(1_000) // tiny nav
    const page = makePage('guide', 'latest', 'ROOT', 'index.html', nav)

    const ctx = makeContext([page], { threshold: 50_000 })
    ctx.fire('pagesComposed')

    assert.equal(ctx._addedFiles.length, 0, 'no file added for small nav')
    // Page contents unchanged
    assert.ok(!page.contents.toString('utf8').includes(MARKER))
  })

  it('is idempotent: already-processed pages are skipped', () => {
    const nav = makeNav(60_000)
    const page = makePage('refpages', 'latest', 'ROOT', 'vkFoo.html', nav)

    const ctx = makeContext([page])
    // Fire twice
    ctx.fire('pagesComposed')
    const afterFirst = page.contents.toString('utf8')
    ctx.fire('pagesComposed')
    const afterSecond = page.contents.toString('utf8')

    assert.equal(afterFirst, afterSecond, 'second run did not change page')
  })

  it('handles separate navs per component@version group', () => {
    const nav = makeNav(60_000)
    const page1 = makePage('refpages', 'latest', 'ROOT', 'vkFoo.html', nav)
    const page2 = makePage('spec', 'latest', 'ROOT', 'index.html', nav)

    const ctx = makeContext([page1, page2])
    ctx.fire('pagesComposed')

    assert.equal(ctx._addedFiles.length, 2, 'one shared nav JS per component')
    const paths = ctx._addedFiles.map((f) => f.out.path).sort()
    assert.deepEqual(paths, [
      `refpages/latest/${SHARED_NAV_NAME}`,
      `spec/latest/${SHARED_NAV_NAME}`,
    ])
  })

  it('inline script marks the correct current page by filename', () => {
    const nav = makeNav(60_000)
    const page = makePage('refpages', 'latest', 'ROOT', 'vkSpecialFn.html', nav)
    const ctx = makeContext([page])
    ctx.fire('pagesComposed')

    const rewritten = page.contents.toString('utf8')
    assert.ok(rewritten.includes('"vkSpecialFn.html"'), 'page filename in inline script')
  })
})
