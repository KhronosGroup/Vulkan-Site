// Copyright 2026 Holochip Inc.
// SPDX-License-Identifier: Apache-2.0
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { findNavBlock, cleanNav, buildNavJs, buildReplacement, MARKER, SHARED_NAV_NAME } = require('../lib/index.js')

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
// buildNavJs
// ---------------------------------------------------------------------------

describe('buildNavJs', () => {
  it('produces a self-invoking function string', () => {
    const js = buildNavJs('<div id="split-0">nav</div>')
    assert.ok(js.startsWith('(function(){'))
    assert.ok(js.endsWith('})();\n'))
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
})

// ---------------------------------------------------------------------------
// buildReplacement
// ---------------------------------------------------------------------------

describe('buildReplacement', () => {
  it('starts with the marker comment', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html')
    assert.ok(r.startsWith(MARKER))
  })

  it('includes a script tag loading the shared nav JS', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html')
    assert.ok(r.includes('<script src="../_static_nav.js">'))
  })

  it('includes an inline script referencing the page filename', () => {
    const r = buildReplacement('../_static_nav.js', 'vkFoo.html')
    assert.ok(r.includes('"vkFoo.html"'))
    assert.ok(r.includes('is-current-page'))
  })

  it('uses the navRel path verbatim in the src attribute', () => {
    const r = buildReplacement('../../spec/latest/_static_nav.js', 'index.html')
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
