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

  it('inline script marks the correct current page by full path', () => {
    const nav = makeNav(60_000)
    const page = makePage('refpages', 'latest', 'ROOT', 'vkSpecialFn.html', nav)
    const ctx = makeContext([page])
    ctx.fire('pagesComposed')

    const rewritten = page.contents.toString('utf8')
    assert.ok(rewritten.includes('"vkSpecialFn.html"'), 'page path in inline script')
  })

  // Regression for the "duplicate filename" bug: two pages named the same
  // thing in different directories must each highlight their own nav entry,
  // not whichever same-named page happens to come first in the DOM.
  it('distinguishes pages with the same basename in different directories', () => {
    const navWithDupeLinks =
      '<div id="split-0"><ul class="nav-list">' +
      '<li class="nav-item"><a class="nav-link" href="chapterA/introduction.html">Intro A</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="chapterB/introduction.html">Intro B</a></li>' +
      '<li>' + 'x'.repeat(60_000) + '</li>' +
      '</ul></div>'

    const pageA = makePage('tutorial', 'latest', 'ROOT', 'introduction.html', navWithDupeLinks)
    pageA.out.dirname = 'tutorial/latest/chapterA'
    pageA.out.path = 'tutorial/latest/chapterA/introduction.html'

    const pageB = makePage('tutorial', 'latest', 'ROOT', 'introduction.html', navWithDupeLinks)
    pageB.out.dirname = 'tutorial/latest/chapterB'
    pageB.out.path = 'tutorial/latest/chapterB/introduction.html'

    const ctx = makeContext([pageA, pageB])
    ctx.fire('pagesComposed')

    const htmlA = pageA.contents.toString('utf8')
    const htmlB = pageB.contents.toString('utf8')

    // Each page's inline script must key off its own full component-root-
    // relative href, not the shared basename "introduction.html".
    assert.ok(htmlA.includes('"../chapterA/introduction.html"'), 'page A matches its own href')
    assert.ok(!htmlA.includes('"../chapterB/introduction.html"'), 'page A does not match chapter B')

    assert.ok(htmlB.includes('"../chapterB/introduction.html"'), 'page B matches its own href')
    assert.ok(!htmlB.includes('"../chapterA/introduction.html"'), 'page B does not match chapter A')
  })

  // Regression for the /source/source/ duplication bug. When the nav is
  // sampled from one page and reused on pages at a different depth, the
  // shared nav HTML must use component-root-relative URLs and each page's
  // loader call must pass the right back-to-root prefix so the browser
  // resolves the link against the page correctly.
  it('serves correct links across pages at different depths', () => {
    // Build a realistic nav with hrefs pointing into source/.
    const navWithRealLinks =
      '<div id="split-0"><ul class="nav-list">' +
      '<li class="nav-item"><a class="nav-link" href="source/VK_AMDX_dense_geometry_format.html">Ext</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>' +
      '<li>' + 'x'.repeat(60_000) + '</li>' +
      '</ul></div>'

    // Two pages: one at component root, one nested under source/.
    const rootPage = makePage('spec', 'latest', 'ROOT', 'index.html', navWithRealLinks)
    const sourcePage = makePage('spec', 'latest', 'ROOT', 'VK_AMDX_other.html', navWithRealLinks)
    // Hack: rewrite the source page's out path so it lives in source/.
    sourcePage.out.dirname = 'spec/latest/source'
    sourcePage.out.path = 'spec/latest/source/VK_AMDX_other.html'

    const ctx = makeContext([rootPage, sourcePage])
    ctx.fire('pagesComposed')

    const navFile = ctx._addedFiles[0]
    const navJs = navFile.contents.toString('utf8')

    // The root page samples first (Map iteration is insertion order). Sample
    // dir is "" so the nav HTML is preserved; the link to source/ext stays
    // "source/VK_AMDX_dense_geometry_format.html" in the shared nav.
    assert.ok(
      navJs.includes('source/VK_AMDX_dense_geometry_format.html'),
      'shared nav contains the component-root-relative link'
    )

    // The root page should call the global with an empty prefix; resolving
    // "source/foo.html" from spec/latest/index.html yields the correct URL.
    const rootHtml = rootPage.contents.toString('utf8')
    assert.ok(
      rootHtml.includes('window.__antoraStaticNav&&window.__antoraStaticNav("")'),
      `root page expected empty prefix, got: ${rootHtml.match(/__antoraStaticNav\([^)]*\)/g)}`
    )

    // The source page must call with prefix "../" so the browser resolves
    // "../source/VK_AMDX_dense_geometry_format.html" relative to
    // spec/latest/source/ → spec/latest/source/VK_AMDX_dense_geometry_format.html
    // — NOT spec/latest/source/source/VK_AMDX_dense_geometry_format.html.
    const sourceHtml = sourcePage.contents.toString('utf8')
    assert.ok(
      sourceHtml.includes('window.__antoraStaticNav&&window.__antoraStaticNav("../")'),
      `source page expected "../" prefix, got: ${sourceHtml.match(/__antoraStaticNav\([^)]*\)/g)}`
    )
  })

  // Same scenario, but the sample is taken from a nested page first. The
  // captured nav has page-relative hrefs; rebasing must promote them to
  // component-root-relative so the empty-prefix root page still works.
  it('rebases captured nav when the sample page is nested', () => {
    const navWithRealLinks =
      '<div id="split-0"><ul class="nav-list">' +
      // From a page in source/, a sibling extension is just a basename.
      '<li class="nav-item"><a class="nav-link" href="VK_AMDX_dense_geometry_format.html">Ext</a></li>' +
      // From a page in source/, the component root index is "../index.html".
      '<li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>' +
      '<li>' + 'x'.repeat(60_000) + '</li>' +
      '</ul></div>'

    const sourcePage = makePage('spec', 'latest', 'ROOT', 'VK_AMDX_other.html', navWithRealLinks)
    sourcePage.out.dirname = 'spec/latest/source'
    sourcePage.out.path = 'spec/latest/source/VK_AMDX_other.html'
    const rootPage = makePage('spec', 'latest', 'ROOT', 'index.html', navWithRealLinks)

    // Insert source page first so it's the sample.
    const ctx = makeContext([sourcePage, rootPage])
    ctx.fire('pagesComposed')

    const navJs = ctx._addedFiles[0].contents.toString('utf8')
    // After rebasing from sample dir "source": the basename href becomes
    // "source/VK_AMDX_..." and "../index.html" becomes "index.html".
    // Hrefs live inside a JSON-encoded HTML string, so the surrounding
    // quotes are escaped (\").
    assert.ok(navJs.includes('source/VK_AMDX_dense_geometry_format.html'),
      'sibling href was rebased into source/')
    assert.ok(navJs.includes('href=\\"index.html\\"'),
      'parent-relative href was collapsed to component-root index.html')
    assert.ok(!navJs.includes('href=\\"../index.html\\"'),
      'rebased nav must not retain the original ../index.html')
  })
})
