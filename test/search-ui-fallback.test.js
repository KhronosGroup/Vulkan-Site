// Copyright 2026 The Khronos Group Inc.
// SPDX-License-Identifier: MPL-2.0
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const lunr = require('lunr')

// Like search-ui.test.js, but the "In this component" facet checkbox is present and
// checked, as it is by default in the browser. search-ui.js reads that checkbox at
// load time, so it has to be stubbed before the module is required.
const facet = { checked: true, dataset: { facetFilter: 'component:spec' }, parentElement: { addEventListener: () => {} }, addEventListener: () => {} }
global.document = {
  getElementById: () => ({ dataset: {}, parentNode: { appendChild: () => {} } }),
  createElement: () => ({ classList: { add: () => {} } }),
  querySelector: (selector) => (selector.includes('data-facet-filter') ? facet : null),
}
globalThis.lunr = lunr

const { findResults, buildFilteredIndex, search, orderByManifestOrder, searchWithUnderscoreFallback } = require('../src/static/js/search-ui.js')

delete global.document

const documents = {
  1: { id: 1, component: 'spec', name: 'initialization', title: 'Initialization', text: 'To create an instance call vkCreateInstance.', keyword: '', titles: [{ text: 'vkCreateInstance', hash: 'vkCreateInstance', id: 1, kind: 'listing' }] },
  2: { id: 2, component: 'spec', name: 'devsandqueues', title: 'Devices and Queues', text: 'Queues are created with the device. An instance is needed first.', keyword: '', titles: [] },
  3: { id: 3, component: 'guide', name: 'layers', title: 'Layers', text: 'A layer can intercept vkCreateInstance.', keyword: '', titles: [] },
}

// Same shape as the generated index: one entry per page, plus one per section title.
function buildFullIndex () {
  return lunr(function () {
    this.ref('id')
    this.field('name', { boost: 15 })
    this.field('title', { boost: 10 })
    this.field('text')
    this.field('component')
    this.field('keyword', { boost: 5 })
    Object.values(documents).forEach((doc) => {
      doc.titles.forEach((t) => this.add({ id: `${doc.id}-${t.id}`, title: t.text }))
      this.add(doc)
    })
  })
}

const noTrieMatch = { searchWithLevenshteinWithData: () => null }
const trieMatching = (...ids) => ({ searchWithLevenshteinWithData: () => [{ data: ids }] })

describe('findResults (fallback search path)', () => {
  it('searches the full index when the trie has no match', () => {
    const results = findResults(buildFullIndex(), noTrieMatch, { documents }, 'vkCreateInstance')
    assert.equal(results[0].ref, '1-1')
  })

  it('does not throw with the facet filter on when the trie narrows the search', () => {
    // Regression: search() was handed an array of documents, so the facet filter's
    // documents[id] lookup returned undefined and threw.
    const results = findResults(buildFullIndex(), trieMatching(1, 3), { documents }, 'vkCreateInstance')
    assert.ok(results.length > 0)
  })

  it('ranks the anchored declaration block first in the trie-narrowed search', () => {
    const results = findResults(buildFullIndex(), trieMatching(1, 3), { documents }, 'vkCreateInstance')
    assert.equal(results[0].ref, '1-1')
  })

  it('applies the component facet to the trie-narrowed search', () => {
    const results = findResults(buildFullIndex(), trieMatching(1, 3), { documents }, 'vkCreateInstance')
    assert.ok(results.every((r) => documents[r.ref.split('-')[0]].component === 'spec'))
    assert.ok(!results.some((r) => r.ref === '3'))
  })

  it('falls back to the full index when the trie ids are not in the store', () => {
    const results = findResults(buildFullIndex(), trieMatching(99), { documents }, 'vkCreateInstance')
    assert.equal(results[0].ref, '1-1')
  })

  it('applies the component facet to a plain search too', () => {
    const results = search(buildFilteredIndex(Object.values(documents)), documents, 'vkCreateInstance')
    assert.ok(results.every((r) => documents[r.ref.split('-')[0]].component === 'spec'))
  })
})

describe('orderByManifestOrder', () => {
  const group = (component, order) => ({ mod: { info: { component, order } }, result: [] })
  const components = (groups) => groups.map((g) => g.mod.info.component)

  it('orders groups by the order in their manifest entries, whatever the manifest position', () => {
    const manifest = [group('guide', 2), group('glsl', 4), group('spec', 0), group('refpages', 1), group('samples', 3)]
    assert.deepEqual(components(orderByManifestOrder(manifest)), ['spec', 'refpages', 'guide', 'samples', 'glsl'])
  })

  it('does not reorder a manifest that has no order', () => {
    const manifest = [group('guide'), group('glsl'), group('spec')]
    assert.deepEqual(components(orderByManifestOrder(manifest)), ['guide', 'glsl', 'spec'])
  })

  it('puts groups without an order after groups with one, in their given order', () => {
    const manifest = [group('a'), group('guide', 1), group('b'), group('spec', 0)]
    assert.deepEqual(components(orderByManifestOrder(manifest)), ['spec', 'guide', 'a', 'b'])
  })

  it('keeps the given order for equal order values', () => {
    const manifest = [group('glsl', 2), group('samples', 2), group('spec', 0)]
    assert.deepEqual(components(orderByManifestOrder(manifest)), ['spec', 'glsl', 'samples'])
  })

  it('does not modify the array it is given', () => {
    const input = [group('guide', 1), group('spec', 0)]
    orderByManifestOrder(input)
    assert.deepEqual(components(input), ['guide', 'spec'])
  })

  it('handles an empty list and groups without module info', () => {
    assert.deepEqual(orderByManifestOrder([]), [])
    assert.equal(orderByManifestOrder([{ result: [] }, group('spec', 0)]).length, 2)
  })
})

describe('multi-word queries', () => {
  // As in the generated index, a heading is indexed as its words and as an
  // underscore-joined token ("Render_Pass") in a separate entry.
  const docs = {
    1: { id: 1, component: 'spec', name: 'renderpass', title: 'Render Pass', text: 'A render pass describes attachments and subpasses.', keyword: '', titles: [{ text: 'Render Pass Objects', hash: 'rp-objects', id: 1 }, { text: 'Render_Pass_Objects', hash: 'rp-objects', id: 2 }] },
    2: { id: 2, component: 'spec', name: 'misc', title: 'Misc', text: 'Nothing relevant here.', keyword: '', titles: [] },
  }
  const index = lunr(function () {
    this.ref('id')
    this.field('title', { boost: 10 })
    this.field('name', { boost: 15 })
    this.field('text')
    this.field('component')
    this.field('keyword', { boost: 5 })
    Object.values(docs).forEach((doc) => {
      doc.titles.forEach((t) => this.add({ id: `${doc.id}-${t.id}`, title: t.text }))
      this.add(doc)
    })
  })

  it('keeps the plain results when the plain search finds something', () => {
    const results = searchWithUnderscoreFallback(index, docs, 'render pass')
    assert.ok(results.length > 1, 'plain results must not be replaced by the underscore search')
    assert.ok(results.some((r) => r.ref === '1'), 'the page itself is found by its words')
  })

  it('findResults keeps the plain results when the trie has no match', () => {
    const results = findResults(index, noTrieMatch, { documents: docs }, 'render pass')
    assert.ok(results.some((r) => r.ref === '1'))
  })

  it('returns no results, without throwing, when neither form matches', () => {
    assert.equal(searchWithUnderscoreFallback(index, docs, 'zzz qqq').length, 0)
  })

  it('does not retry for a single-word query', () => {
    assert.equal(searchWithUnderscoreFallback(index, docs, 'nonexistentterm').length, 0)
  })
})
