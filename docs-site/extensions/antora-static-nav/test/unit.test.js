// Copyright 2026 Holochip Inc.
// SPDX-License-Identifier: Apache-2.0
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const {
  findNavBlock,
  cleanNav,
  rebaseNav,
  rebaseUrl,
  buildNavJs,
  buildReplacement,
  MARKER,
  SHARED_NAV_NAME,
} = require('../lib/index.js')

// ---------------------------------------------------------------------------
// findNavBlock
// ---------------------------------------------------------------------------

describe('findNavBlock', () => {
  it('returns null when id="split-0" is absent', () => {
    assert.equal(findNavBlock('<html><body><div id="content"></div></body></html>'), null)
  })

  it('finds a flat nav block', () => {
    const html = '<body><div id="split-0"><ul><li>Item</li></ul></div></body>'
    const result = findNavBlock(html)
    assert.ok(result)
    assert.equal(result.text, '<div id="split-0"><ul><li>Item</li></ul></div>')
    assert.equal(result.start, 6)
    assert.equal(result.end, 6 + result.text.length)
  })

  it('handles deeply nested divs inside the nav block', () => {
    const html = 'A<div id="split-0"><div><div>deep</div></div></div>B'
    const result = findNavBlock(html)
    assert.ok(result)
    assert.equal(result.text, '<div id="split-0"><div><div>deep</div></div></div>')
    assert.equal(html.slice(result.end), 'B')
  })

  it('handles content before and after the nav block', () => {
    const pre = '<header>foo</header>'
    const nav = '<div id="split-0"><nav>links</nav></div>'
    const post = '<main>content</main>'
    const html = pre + nav + post
    const result = findNavBlock(html)
    assert.ok(result)
    assert.equal(result.text, nav)
    assert.equal(result.start, pre.length)
    assert.equal(result.end, pre.length + nav.length)
  })

  it('returns null when closing div is missing', () => {
    const html = '<div id="split-0"><div>unclosed'
    assert.equal(findNavBlock(html), null)
  })

  it('uses single-quoted id attribute', () => {
    const html = "<div id='split-0'><span>x</span></div>"
    const result = findNavBlock(html)
    assert.ok(result)
    assert.equal(result.text, html)
  })
})

// ---------------------------------------------------------------------------
// cleanNav
// ---------------------------------------------------------------------------

describe('cleanNav', () => {
  it('strips is-current-page from li elements', () => {
    const nav = '<li class="nav-item is-current-page"><a>Page</a></li>'
    assert.ok(!cleanNav(nav).includes('is-current-page'))
  })

  it('strips is-current-path from elements', () => {
    const nav = '<li class="nav-item is-current-path"><a>Page</a></li>'
    assert.ok(!cleanNav(nav).includes('is-current-path'))
  })

  it('strips is-active from nav-item li elements', () => {
    const nav = '<li class="nav-item is-active"><a>Active</a></li>'
    const cleaned = cleanNav(nav)
    assert.ok(!cleaned.includes('nav-item is-active'))
  })

  it('preserves is-active on panel divs', () => {
    const nav = '<div class="nav-panel-menu is-active"><ul></ul></div>'
    assert.ok(cleanNav(nav).includes('is-active'))
  })

  it('handles nav with multiple active states', () => {
    const nav =
      '<div class="nav-panel is-active">' +
      '<li class="nav-item is-current-page is-current-path is-active"><a>X</a></li>' +
      '</div>'
    const cleaned = cleanNav(nav)
    assert.ok(cleaned.includes('nav-panel is-active'), 'panel is-active preserved')
    assert.ok(!cleaned.includes('is-current-page'), 'is-current-page stripped')
    assert.ok(!cleaned.includes('is-current-path'), 'is-current-path stripped')
    assert.ok(!cleaned.includes('nav-item is-active'), 'li is-active stripped')
  })
})

// ---------------------------------------------------------------------------
// rebaseUrl
// ---------------------------------------------------------------------------

describe('rebaseUrl', () => {
  it('returns absolute URLs unchanged', () => {
    assert.equal(rebaseUrl('https://example.com/x', 'source'), 'https://example.com/x')
    assert.equal(rebaseUrl('//cdn/x', 'source'), '//cdn/x')
    assert.equal(rebaseUrl('/already/absolute.html', 'source'), '/already/absolute.html')
    assert.equal(rebaseUrl('mailto:a@b.c', 'source'), 'mailto:a@b.c')
    assert.equal(rebaseUrl('data:image/png;base64,xx', 'source'), 'data:image/png;base64,xx')
  })

  it('returns fragment-only URLs unchanged', () => {
    assert.equal(rebaseUrl('#section', 'source'), '#section')
  })

  it('returns the value unchanged when sample is at the component root', () => {
    assert.equal(rebaseUrl('source/foo.html', ''), 'source/foo.html')
    assert.equal(rebaseUrl('source/foo.html', '.'), 'source/foo.html')
  })

  it('prefixes a sibling-relative href with the sample directory', () => {
    // Sample lives in source/, href is sibling — rebased value points into source/.
    assert.equal(rebaseUrl('VK_AMDX_dense_geometry_format.html', 'source'),
      'source/VK_AMDX_dense_geometry_format.html')
  })

  it('resolves leading ../ against the sample directory', () => {
    assert.equal(rebaseUrl('../proposals/foo.html', 'source'), 'proposals/foo.html')
  })

  it('handles deeper sample directories', () => {
    assert.equal(rebaseUrl('foo.html', 'module/sub'), 'module/sub/foo.html')
    assert.equal(rebaseUrl('../bar.html', 'module/sub'), 'module/bar.html')
    assert.equal(rebaseUrl('../../top.html', 'module/sub'), 'top.html')
  })
})

// ---------------------------------------------------------------------------
// rebaseNav
// ---------------------------------------------------------------------------

describe('rebaseNav', () => {
  it('rewrites href values to be component-root-relative', () => {
    const nav = '<a href="VK_AMDX_dense_geometry_format.html">x</a>'
    const out = rebaseNav(nav, 'source')
    assert.ok(out.includes('href="source/VK_AMDX_dense_geometry_format.html"'))
  })

  it('rewrites src values too', () => {
    const nav = '<img src="icon.png">'
    assert.ok(rebaseNav(nav, 'source').includes('src="source/icon.png"'))
  })

  it('leaves nav unchanged when sample is at the component root', () => {
    const nav = '<a href="source/foo.html">f</a><a href="bar.html">b</a>'
    assert.equal(rebaseNav(nav, ''), nav)
  })

  it('preserves absolute and fragment URLs', () => {
    const nav = '<a href="https://x/y">x</a><a href="#anchor">y</a><a href="/abs.html">z</a>'
    assert.equal(rebaseNav(nav, 'source'), nav)
  })

  it('handles multiple links in one nav', () => {
    const nav = '<a href="a.html">A</a><a href="b.html">B</a>'
    const out = rebaseNav(nav, 'source')
    assert.ok(out.includes('href="source/a.html"'))
    assert.ok(out.includes('href="source/b.html"'))
  })
})

// ---------------------------------------------------------------------------
// buildNavJs
// ---------------------------------------------------------------------------

describe('buildNavJs', () => {
  it('exposes a global function instead of running immediately', () => {
    const js = buildNavJs('<div id="split-0">nav</div>')
    assert.ok(js.startsWith('window.__antoraStaticNav=function(prefix){'))
    assert.ok(js.endsWith('};\n'))
  })

  it('JSON-encodes the nav HTML inside the JS', () => {
    const navHtml = '<div id="split-0"><a href="/foo">Bar & Baz</a></div>'
    const js = buildNavJs(navHtml)
    assert.ok(js.includes(JSON.stringify(navHtml)))
  })

  it('uses insertBefore instead of document.write', () => {
    const js = buildNavJs('<div></div>')
    assert.ok(js.includes('insertBefore'))
    assert.ok(!js.includes('document.write'))
  })

  it('contains runtime href-prefix logic', () => {
    const js = buildNavJs('<div></div>')
    assert.ok(js.includes('prefix'))
    // The runtime regex should match the same attributes the build-time one does.
    assert.ok(js.includes('href|src'))
  })
})

// ---------------------------------------------------------------------------
// buildReplacement
// ---------------------------------------------------------------------------

describe('buildReplacement', () => {
  it('starts with the marker comment', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html', '../')
    assert.ok(r.startsWith(MARKER))
  })

  it('includes a script tag loading the shared nav JS', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html', '../')
    assert.ok(r.includes('<script src="../_static_nav.js">'))
  })

  it('invokes the static-nav global with the per-page prefix', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html', '../')
    assert.ok(r.includes('window.__antoraStaticNav'))
    assert.ok(r.includes('"../"'))
  })

  it('passes an empty prefix for pages at the component root', () => {
    const r = buildReplacement('_static_nav.js', 'index.html', '')
    assert.ok(r.includes('window.__antoraStaticNav&&window.__antoraStaticNav("")'))
  })

  it('includes an inline script referencing the page filename', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html', '../')
    assert.ok(r.includes('"vkFoo.html"'))
    assert.ok(r.includes('is-current-page'))
  })

  it('uses the navRel path verbatim in the src attribute', () => {
    const r = buildReplacement('../../spec/latest/_static_nav.js', 'index.html', '../../')
    assert.ok(r.includes('src="../../spec/latest/_static_nav.js"'))
  })
})

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

describe('constants', () => {
  it('MARKER is a unique HTML comment', () => {
    assert.equal(MARKER, '<!-- antora-static-nav -->')
  })

  it('SHARED_NAV_NAME is the expected filename', () => {
    assert.equal(SHARED_NAV_NAME, '_static_nav.js')
  })
})
