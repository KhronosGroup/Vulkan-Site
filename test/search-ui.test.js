// Copyright 2026 The Khronos Group Inc.
// SPDX-License-Identifier: MPL-2.0
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const lunr = require('lunr')

// search-ui.js is a browser <script> file (not run through browserify - see
// gulp.d/tasks/build.js, which only bundles *.bundle.js), so it has real
// top-level code that touches `document` immediately when the file loads
// (grabbing the search input, appending the results dropdown, etc.), and its
// query functions reach for `globalThis.lunr` instead of requiring it. That
// top-level code never actually runs anything in these tests - we only
// exercise the pure functions exported below - but requiring the file still
// executes it, so a minimal stand-in for `document` is needed just to get
// past module load without a full DOM/jsdom dependency.
global.document = {
  getElementById: () => ({ dataset: {}, parentNode: { appendChild: () => {} } }),
  createElement: () => ({ classList: { add: () => {} } }),
  querySelector: () => null,
}
globalThis.lunr = lunr

const {
  buildHighlightedText,
  getTermPosition,
  findTermPosition,
  search,
  highlightHit,
} = require('../src/static/js/search-ui.js')

delete global.document

// ---------------------------------------------------------------------------
// findTermPosition
// ---------------------------------------------------------------------------

describe('findTermPosition', () => {
  it('finds a term and extends to the end of its token', () => {
    const text = 'This chapter covers SPIR-V Extensions in detail.'
    const pos = findTermPosition(null, 'spir', text, text.toLowerCase())
    assert.equal(text.slice(pos.start, pos.start + pos.length), 'SPIR-V')
  })

  it('returns a zero-length position when the term is absent', () => {
    const pos = findTermPosition(null, 'nonexistent', 'some text', 'some text')
    assert.equal(pos.length, 0)
  })

  it('stops the token at whitespace, period, and comma', () => {
    const text = 'format, layout. done'
    assert.equal(findTermPosition(null, 'format', text, text).length, 'format,'.length - 1)
    assert.equal(findTermPosition(null, 'layout', text, text).length, 'layout.'.length - 1)
  })
})

// ---------------------------------------------------------------------------
// buildHighlightedText
// ---------------------------------------------------------------------------
//
// Regression coverage for https://github.com/KhronosGroup/Vulkan-Site/issues/174 -
// searching "spir-v" matched both a "spir" term and an overlapping "v" term, and
// each was rendered as its own highlight, duplicating text ("SPIR-V" + "V" =
// "SPIR-VV" in the rendered search result). See the "search index integration"
// suite below for the same regression reproduced through the real lunr pipeline
// instead of hand-built positions.

describe('buildHighlightedText', () => {
  it('does not duplicate text when two term matches overlap (SPIR-VV regression)', () => {
    const text = 'This chapter is about the SPIR-V Extensions and how they work.'
    const positions = [
      { start: 26, length: 6 }, // "SPIR-V"
      { start: 31, length: 1 }, // overlapping "V" from a second term match
    ]
    const nodes = buildHighlightedText(text, positions, 100)
    const rendered = nodes.map((n) => n.text).join('')
    assert.equal(rendered, text)
  })

  it('merges adjacent (touching, non-overlapping) positions into one mark', () => {
    const text = 'the quick brown fox'
    const positions = [
      { start: 4, length: 5 }, // "quick"
      { start: 9, length: 1 }, // " " (adjacent, touches "quick"'s end)
      { start: 10, length: 5 }, // "brown"
    ]
    const nodes = buildHighlightedText(text, positions, 100)
    const marks = nodes.filter((n) => n.type === 'mark')
    assert.equal(marks.length, 1)
    assert.equal(marks[0].text, 'quick brown')
  })

  it('renders non-overlapping positions as separate marks in order', () => {
    const text = 'the quick brown fox jumps'
    const positions = [
      { start: 16, length: 3 }, // "fox"
      { start: 4, length: 5 }, // "quick"
    ]
    const nodes = buildHighlightedText(text, positions, 100)
    const marks = nodes.filter((n) => n.type === 'mark').map((n) => n.text)
    assert.deepEqual(marks, ['quick', 'fox'])
  })

  it('falls back to a plain snippet when no position is valid', () => {
    const text = 'no matches here'
    const nodes = buildHighlightedText(text, [], 100)
    assert.deepEqual(nodes, [{ type: 'text', text: 'no matches here' }])
  })
})

// ---------------------------------------------------------------------------
// getTermPosition
// ---------------------------------------------------------------------------

describe('getTermPosition', () => {
  it('returns positions sorted by start, deduplicating repeated terms', () => {
    const text = 'format follows function, and format matters'
    const positions = getTermPosition(text, ['format', 'format', 'function'])
    assert.equal(positions.length, 2)
    assert.ok(positions[0].start < positions[1].start)
  })

  it('returns an empty array for an empty term list', () => {
    assert.deepEqual(getTermPosition('some text', []), [])
  })
})

// ---------------------------------------------------------------------------
// search index integration
// ---------------------------------------------------------------------------
//
// Builds a real lunr index using the same field schema production uses (see
// the tempLunrIndex construction in searchIndex() in search-ui.js: ref 'id',
// fields title/name/text/component/keyword with the same boosts) and runs
// real queries through the exported `search()` function - the same 3-tier
// exact -> prefix-wildcard -> contains-wildcard fallback the site uses. This
// is what https://github.com/KhronosGroup/Vulkan-Site/issues/211 asks for: a
// harness that catches "a common query returns nothing" regressions, not by
// re-testing the highlighting logic but by exercising the actual query path
// against representative content.

function buildFixtureIndex () {
  const documents = [
    {
      id: 'spirv-doc',
      title: 'SPIR-V Extensions',
      name: 'spirv',
      text: 'This chapter is about the SPIR-V Extensions and how they work.',
      component: 'spec',
      keyword: 'spirv extensions',
    },
    {
      id: 'format-doc',
      title: 'Image Formats',
      name: 'formats',
      text: 'The image format determines pixel layout. Choosing the right format is important.',
      component: 'spec',
      keyword: 'format image',
    },
    {
      id: 'sync-doc',
      title: 'Synchronization',
      name: 'sync',
      text: 'Synchronization primitives coordinate GPU work across queues.',
      component: 'spec',
      keyword: 'synchronization',
    },
    {
      id: 'guide-format-doc',
      title: 'Data Format Guide',
      name: 'kdf',
      text: 'A guide to the Khronos Data Format Specification and its usage.',
      component: 'guide',
      keyword: 'khronos data format specification',
    },
  ]
  const documentsById = Object.fromEntries(documents.map((doc) => [doc.id, doc]))
  const index = lunr(function () {
    this.ref('id')
    this.field('title', { boost: 10 })
    this.field('name')
    this.field('text')
    this.field('component')
    this.field('keyword', { boost: 5 })
    documents.forEach((doc) => this.add(doc))
  })
  return { index, documentsById }
}

describe('search index integration', () => {
  it('returns non-empty results for a common single-word query (issue #146 class)', () => {
    const { index, documentsById } = buildFixtureIndex()
    const result = search(index, documentsById, 'format')
    assert.ok(result.length > 0, 'expected at least one result for a word that appears in the fixture')
  })

  it('falls back to a prefix-wildcard match when no exact token matches', () => {
    const { index, documentsById } = buildFixtureIndex()
    // "chapt" is not a real token (the fixture only has "chapter"); an exact
    // match must fail here, so this only passes if the wildcard fallback tiers
    // in search() actually run.
    const result = search(index, documentsById, 'chapt')
    assert.deepEqual(result.map((r) => r.ref), ['spirv-doc'])
  })

  it('returns an empty result set for a query matching nothing, rather than everything', () => {
    const { index, documentsById } = buildFixtureIndex()
    const result = search(index, documentsById, 'zzznonexistentxyz')
    assert.deepEqual(result, [])
  })

  it('returns non-empty results for a multi-word phrase query (issue #97 class)', () => {
    const { index, documentsById } = buildFixtureIndex()
    const result = search(index, documentsById, 'khronos data format specification')
    assert.ok(result.length > 0, 'expected at least one result for a phrase built from words in the fixture')
  })

  it.todo(
    'ranks the exact phrase match above documents that only share individual words (issue #97 - not fixed yet)',
    () => {
      // Once #97 adds real phrase-query support, this should assert that
      // 'guide-format-doc' (the document actually containing the phrase
      // "Khronos Data Format Specification") outranks 'format-doc' (which only
      // shares the word "format"), rather than just checking non-empty above.
    }
  )

  it('reproduces the SPIR-VV highlighting bug through the real search pipeline (issue #174 regression)', () => {
    const { index, documentsById } = buildFixtureIndex()
    const result = search(index, documentsById, 'spir-v')
    assert.ok(result.length > 0, 'expected the SPIR-V document to match')

    const item = result[0]
    const doc = documentsById[item.ref]
    // Confirms the actual root cause is still present in lunr's matching (two
    // separate term matches, "spir" and "v", landing in the same field) - if
    // this ever stops being true the regression this test guards against may
    // no longer be reachable the same way.
    assert.ok('spir' in item.matchData.metadata, 'expected lunr to match the stemmed "spir" term')
    assert.ok('v' in item.matchData.metadata, 'expected lunr to separately match the "v" term')

    const highlighted = highlightHit(item.matchData.metadata, undefined, doc)
    const rendered = highlighted.pageContentNodes.map((n) => n.text).join('')
    assert.equal(rendered, doc.text)
    assert.ok(!rendered.includes('SPIR-VV'), 'rendered highlight text must not duplicate "SPIR-V" into "SPIR-VV"')
  })
})
