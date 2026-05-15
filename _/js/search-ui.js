(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.antoraSearch = {}));
})(this, (function (exports) { 'use strict';

  /**
   * Splitting the text by the given positions.
   * The text within the positions getting the type "mark", all other text gets the type "text".
   * @param {string} text
   * @param {Object[]} positions
   * @param {number} positions.start
   * @param {number} positions.length
   * @param {number} snippetLength Maximum text length for text in the result.
   * @returns {[{text: string, type: string}]}
   */
  function buildHighlightedText (text, positions, snippetLength) {
    const textLength = text.length;
    const validPositions = positions
      .filter((position) => position.length > 0 && position.start + position.length <= textLength);

    if (validPositions.length === 0) {
      return [
        {
          type: 'text',
          text: text.slice(0, snippetLength >= textLength ? textLength : snippetLength) + (snippetLength < textLength ? '...' : ''),
        },
      ]
    }

    const orderedPositions = validPositions.sort((p1, p2) => p1.start - p2.start);
    const range = {
      start: 0,
      end: textLength,
    };
    const firstPosition = orderedPositions[0];
    if (snippetLength && text.length > snippetLength) {
      const firstPositionStart = firstPosition.start;
      const firstPositionLength = firstPosition.length;
      const firstPositionEnd = firstPositionStart + firstPositionLength;

      range.start = firstPositionStart - snippetLength < 0 ? 0 : firstPositionStart - snippetLength;
      range.end = firstPositionEnd + snippetLength > textLength ? textLength : firstPositionEnd + snippetLength;
    }
    const nodes = [];
    if (firstPosition.start > 0) {
      nodes.push({
        type: 'text',
        text: (range.start > 0 ? '...' : '') + text.slice(range.start, firstPosition.start),
      });
    }
    let lastEndPosition = 0;
    const positionsWithinRange = orderedPositions
      .filter((position) => position.start >= range.start && position.start + position.length <= range.end);

    for (const position of positionsWithinRange) {
      const start = position.start;
      const length = position.length;
      const end = start + length;
      if (lastEndPosition > 0) {
        // create text Node from the last end position to the start of the current position
        nodes.push({
          type: 'text',
          text: text.slice(lastEndPosition, start),
        });
      }
      nodes.push({
        type: 'mark',
        text: text.slice(start, end),
      });
      lastEndPosition = end;
    }
    if (lastEndPosition < range.end) {
      nodes.push({
        type: 'text',
        text: text.slice(lastEndPosition, range.end) + (range.end < textLength ? '...' : ''),
      });
    }

    return nodes
  }

  /**
   * Taken and adapted from: https://github.com/olivernn/lunr.js/blob/aa5a878f62a6bba1e8e5b95714899e17e8150b38/lib/tokenizer.js#L24-L67
   * @param lunr
   * @param text
   * @param term
   * @return {{start: number, length: number}}
   */
  function findTermPosition (lunr, term, text, textLower) {
    // Use provided pre-lowercased text when available to avoid repeated allocations
    const str = textLower || text.toLowerCase();
    const t = typeof term === 'string' ? term.toLowerCase() : String(term);
    const index = str.indexOf(t);
    if (index === -1) return { start: 0, length: 0 }
    // Extend to the end of the token (stop at '.', ',' or whitespace) without regex
    let end = index + t.length;
    const n = str.length;
    while (end < n) {
      const ch = str.charCodeAt(end);
      // stop on period (.) 46, comma (,) 44 or any whitespace
      if (ch === 46 || ch === 44 || ch === 32 || ch === 9 || ch === 10 || ch === 13 || ch === 160) break
      end++;
    }
    return { start: index, length: end - index }
  }

  class TrieNode {
    constructor () {
      this.children = new Map();
      this.isEndOfWord = false;
      this.data = []; // Store associated data (e.g., document IDs, URLs)
    }
  }

  class LevenshteinTrieUser {
    constructor () {
      this.root = new TrieNode();
    }

    insert (word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char);
      }
      node.isEndOfWord = true;
    }

    searchWithLevenshtein (word, maxDistance) {
      const results = [];
      this._searchRecursive(this.root, '', word, 0, maxDistance, results);
      return results
    }

    _searchRecursive (node, currentWord, targetWord, currentIndex, maxDistance, results) {
      if (currentIndex > targetWord.length && node.isEndOfWord) {
        results.push(currentWord);
        return
      }
      if (maxDistance < 0) {
        return
      }

      if (node.isEndOfWord && this.levenshteinDistance(currentWord, targetWord) <= maxDistance) {
        results.push(currentWord);
      }

      for (const [char, childNode] of node.children) {
        let newDistance = maxDistance;
        if (currentIndex < targetWord.length) {
          if (char === targetWord[currentIndex]) {
            this._searchRecursive(childNode, currentWord + char, targetWord, currentIndex + 1, newDistance, results);
          } else {
            newDistance = maxDistance - 1; //substitution
            this._searchRecursive(childNode, currentWord + char, targetWord, currentIndex + 1, newDistance, results);
            this._searchRecursive(node, currentWord, targetWord, currentIndex + 1, newDistance, results); //insertion
            this._searchRecursive(
              childNode,
              currentWord + char,
              targetWord,
              currentIndex,
              newDistance,
              results
            ); // deletion
          }
        } else {
          this._searchRecursive(childNode, currentWord + char, targetWord, currentIndex, newDistance - 1, results);
        }
      }
    }

    levenshteinDistance (a, b) {
      if (a.length === 0) return b.length
      if (b.length === 0) return a.length

      const matrix = [];

      // increment along the first column of each row
      let i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      let j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1) // deletion
            );
          }
        }
      }

      return matrix[b.length][a.length]
    }

    // Save the Trie to a JSON string
    save () {
      return JSON.stringify(this.root, (key, value) => {
        if (value instanceof Map) {
          return Array.from(value.entries()) // Convert Map to array of entries
        }
        return value
      })
    }

    // Load the Trie from a JSON string
    load (jsonString) {
      this.root = jsonString;
      // this.root = JSON.parse(jsonString, (key, value) => {
      //   if (Array.isArray(value)) {
      //     return new Map(value) // Convert array of entries back to Map
      //   }
      //   return value
      // })
    }

    insertWithData (word, data) {
      let node = this.root;
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char);
      }
      node.isEndOfWord = true;
      node.data.push(data); // Store the associated data
    }

    searchWithLevenshteinWithData (word, maxDistance) {
      const results = [];
      this._searchRecursiveWithData(this.root, '', word, 0, maxDistance, results);
      return results
    }

    _searchRecursiveWithData (node, currentWord, targetWord, currentIndex, maxDistance, results) {
      if (currentIndex > targetWord.length && node.isEndOfWord) {
        results.push({ word: currentWord, data: node.data });
        return
      }
      if (maxDistance < 0) {
        return
      }

      if (node.isEndOfWord && this.levenshteinDistance(currentWord, targetWord) <= maxDistance) {
        results.push({ word: currentWord, data: node.data });
      }

      for (const [char, childNode] of node.children) {
        let newDistance = maxDistance;
        if (currentIndex < targetWord.length) {
          if (char === targetWord[currentIndex]) {
            this._searchRecursiveWithData(
              childNode,
              currentWord + char,
              targetWord,
              currentIndex + 1,
              newDistance,
              results
            );
          } else {
            newDistance = maxDistance - 1; //substitution
            this._searchRecursiveWithData(
              childNode,
              currentWord + char,
              targetWord,
              currentIndex + 1,
              newDistance,
              results
            );
            this._searchRecursiveWithData(
              node,
              currentWord,
              targetWord,
              currentIndex + 1,
              newDistance,
              results
            ); //insertion
            this._searchRecursiveWithData(
              childNode,
              currentWord + char,
              targetWord,
              currentIndex,
              newDistance,
              results
            ); // deletion
          }
        } else {
          this._searchRecursiveWithData(childNode, currentWord + char, targetWord, currentIndex, newDistance - 1, results);
        }
      }
    }
  }

  /* global CustomEvent, globalThis */

  const config = document.getElementById('search-ui-script').dataset;
  const snippetLength = parseInt(config.snippetLength || 100, 10);
  const siteRootPath = config.siteRootPath || '';
  appendStylesheet(config.stylesheet);
  const searchInput = document.getElementById('search-input');
  const searchResultContainer = document.createElement('div');
  searchResultContainer.classList.add('search-result-dropdown-menu');
  searchInput.parentNode.appendChild(searchResultContainer);
  const facetFilterInput = document.querySelector('#search-field input[type=checkbox][data-facet-filter]');

  function appendStylesheet (href) {
    if (!href) return
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function highlightPageTitle (title, terms) {
    const positions = getTermPosition(title, terms);
    return buildHighlightedText(title, positions, snippetLength)
  }

  function highlightSectionTitle (sectionTitle, terms) {
    if (sectionTitle) {
      const text = sectionTitle.text;
      const positions = getTermPosition(text, terms);
      return buildHighlightedText(text, positions, snippetLength)
    }
    return []
  }

  function highlightKeyword (doc, terms) {
    const keyword = doc.keyword;
    if (keyword) {
      const positions = getTermPosition(keyword, terms);
      return buildHighlightedText(keyword, positions, snippetLength)
    }
    return []
  }

  function highlightText (doc, terms) {
    const text = doc.text;
    const positions = getTermPosition(text, terms);
    return buildHighlightedText(text, positions, snippetLength)
  }

  function getTermPosition (text, terms) {
    if (!terms || terms.length === 0) return []
    const textLower = text.toLowerCase();
    const seen = new Set();
    const positions = [];
    for (const term of terms) {
      if (term == null) continue
      const t = String(term).toLowerCase();
      if (seen.has(t)) continue
      seen.add(t);
      const pos = findTermPosition(globalThis.lunr, t, text, textLower);
      if (pos.length > 0) positions.push(pos);
    }
    positions.sort((p1, p2) => p1.start - p2.start);
    return positions.length === 0 ? [] : positions
  }

  function highlightHit (searchMetadata, sectionTitle, doc) {
    const terms = {};
    for (const term in searchMetadata) {
      const fields = searchMetadata[term];
      for (const field in fields) {
        terms[field] = [...(terms[field] || []), term];
      }
    }
    return {
      pageTitleNodes: highlightPageTitle(doc.title, terms.title || []),
      sectionTitleNodes: highlightSectionTitle(sectionTitle, terms.title || []),
      pageContentNodes: highlightText(doc, terms.text || []),
      pageKeywordNodes: highlightKeyword(doc, terms.keyword || []),
    }
  }

  function createSearchResult (result, store, searchResultDataset) {
    // Batch DOM updates using a DocumentFragment and cap the number of rendered items
    const MAX_RESULTS_PER_DATASET = 200;
    const frag = document.createDocumentFragment();
    let currentComponent;
    const total = result.length;
    const limit = total > MAX_RESULTS_PER_DATASET ? MAX_RESULTS_PER_DATASET : total;
    for (let i = 0; i < limit; i++) {
      const item = result[i];
      const ids = item.ref.split('-');
      const docId = ids[0];
      const doc = store.documents[docId];
      let sectionTitle;
      if (ids.length > 1) {
        const titleId = ids[1];
        sectionTitle = doc.titles.filter(function (item) {
          return String(item.id) === titleId
        })[0];
      }
      const metadata = item.matchData.metadata;
      const highlightingResult = highlightHit(metadata, sectionTitle, doc);
      const componentVersion = store.componentVersions[`${doc.component}/${doc.version}`];
      if (componentVersion !== undefined && currentComponent !== componentVersion) {
        const searchResultComponentHeader = document.createElement('div');
        searchResultComponentHeader.classList.add('search-result-component-header');
        const { title, displayVersion } = componentVersion;
        const componentVersionText = `${title}${doc.version && displayVersion ? ` ${displayVersion}` : ''}`;
        searchResultComponentHeader.appendChild(document.createTextNode(componentVersionText));
        frag.appendChild(searchResultComponentHeader);
        currentComponent = componentVersion;
      }
      frag.appendChild(createSearchResultItem(doc, sectionTitle, item, highlightingResult));
    }
    // Append a note if results were truncated
    if (total > limit) {
      const note = document.createElement('div');
      note.classList.add('search-result-more');
      note.textContent = `Showing top ${limit} of ${total} results. Refine your search to narrow results.`;
      frag.appendChild(note);
    }
    searchResultDataset.appendChild(frag);
  }

  function createSearchResultItem (doc, sectionTitle, item, highlightingResult) {
    const documentTitle = document.createElement('div');
    documentTitle.classList.add('search-result-document-title');
    highlightingResult.pageTitleNodes.forEach(function (node) {
      let element;
      if (node.type === 'text') {
        element = document.createTextNode(node.text);
      } else {
        element = document.createElement('span');
        element.classList.add('search-result-highlight');
        element.innerText = node.text;
      }
      documentTitle.appendChild(element);
    });
    const documentHit = document.createElement('div');
    documentHit.classList.add('search-result-document-hit');
    const documentHitLink = document.createElement('a');
    documentHitLink.href = siteRootPath + doc.url + (sectionTitle ? '#' + sectionTitle.hash : '');
    documentHit.appendChild(documentHitLink);
    if (highlightingResult.sectionTitleNodes.length > 0) {
      const documentSectionTitle = document.createElement('div');
      documentSectionTitle.classList.add('search-result-section-title');
      documentHitLink.appendChild(documentSectionTitle);
      highlightingResult.sectionTitleNodes.forEach((node) => createHighlightedText(node, documentSectionTitle));
    }
    highlightingResult.pageContentNodes.forEach((node) => createHighlightedText(node, documentHitLink));

    // only show keyword when we got a hit on them
    if (doc.keyword && highlightingResult.pageKeywordNodes.length > 1) {
      const documentKeywords = document.createElement('div');
      documentKeywords.classList.add('search-result-keywords');
      const documentKeywordsFieldLabel = document.createElement('span');
      documentKeywordsFieldLabel.classList.add('search-result-keywords-field-label');
      documentKeywordsFieldLabel.innerText = 'keywords: ';
      const documentKeywordsList = document.createElement('span');
      documentKeywordsList.classList.add('search-result-keywords-list');
      highlightingResult.pageKeywordNodes.forEach((node) => createHighlightedText(node, documentKeywordsList));
      documentKeywords.appendChild(documentKeywordsFieldLabel);
      documentKeywords.appendChild(documentKeywordsList);
      documentHitLink.appendChild(documentKeywords);
    }
    const searchResultItem = document.createElement('div');
    searchResultItem.classList.add('search-result-item');
    searchResultItem.appendChild(documentTitle);
    searchResultItem.appendChild(documentHit);
    searchResultItem.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });
    return searchResultItem
  }

  /**
   * Creates an element from a highlightingResultNode and add it to the targetNode.
   * @param {Object} highlightingResultNode
   * @param {String} highlightingResultNode.type - type of the node
   * @param {String} highlightingResultNode.text
   * @param {Node} targetNode
   */
  function createHighlightedText (highlightingResultNode, targetNode) {
    let element;
    if (highlightingResultNode.type === 'text') {
      element = document.createTextNode(highlightingResultNode.text);
    } else {
      element = document.createElement('span');
      element.classList.add('search-result-highlight');
      element.innerText = highlightingResultNode.text;
    }
    targetNode.appendChild(element);
  }

  function createNoResult (text) {
    const searchResultItem = document.createElement('div');
    searchResultItem.classList.add('search-result-item');
    const documentHit = document.createElement('div');
    documentHit.classList.add('search-result-document-hit');
    const message = document.createElement('strong');
    message.innerText = 'No results found for query "' + text + '"';
    documentHit.appendChild(message);
    searchResultItem.appendChild(documentHit);
    return searchResultItem
  }

  function clearSearchResults (reset) {
    if (reset === true) searchInput.value = '';
    searchResultContainer.innerHTML = '';
  }

  function filter (result, documents) {
    const facetFilter = facetFilterInput && facetFilterInput.checked && facetFilterInput.dataset.facetFilter;
    if (facetFilter) {
      const [field, value] = facetFilter.split(':');
      return result.filter((item) => {
        const ids = item.ref.split('-');
        const docId = ids[0];
        const doc = documents[docId];
        return field in doc && doc[field] === value
      })
    }
    return result
  }

  function search (index, documents, queryString) {
    // execute an exact match search
    let query;
    let result = filter(
      index.query(function (lunrQuery) {
        const parser = new globalThis.lunr.QueryParser(queryString, lunrQuery);
        parser.parse();
        query = lunrQuery;
      }),
      documents
    );
    if (result.length > 0) {
      return result
    }
    // no result, use a begins with search
    result = filter(
      index.query(function (lunrQuery) {
        lunrQuery.clauses = query.clauses.map((clause) => {
          if (clause.presence !== globalThis.lunr.Query.presence.PROHIBITED) {
            clause.term = clause.term + '*';
            clause.wildcard = globalThis.lunr.Query.wildcard.TRAILING;
            clause.usePipeline = false;
          }
          return clause
        });
      }),
      documents
    );
    if (result.length > 0) {
      return result
    }
    // no result, use a contains search
    result = filter(
      index.query(function (lunrQuery) {
        lunrQuery.clauses = query.clauses.map((clause) => {
          if (clause.presence !== globalThis.lunr.Query.presence.PROHIBITED) {
            clause.term = '*' + clause.term + '*';
            clause.wildcard = globalThis.lunr.Query.wildcard.LEADING | globalThis.lunr.Query.wildcard.TRAILING;
            clause.usePipeline = false;
          }
          return clause
        });
      }),
      documents
    );
    return result
  }

  function searchIndex (index, trie, store, text) {
    clearSearchResults(false);
    if (text.trim() === '') {
      return
    }
    const maxLevenshteinDistance = 3;
    const trieResults = trie
      .searchWithLevenshteinWithData(text.toLowerCase(), maxLevenshteinDistance);
    let result;
    const recheck = /\s/.test(text);
    if (!trieResults) {
      result = search(index, store.documents, text);
      if (recheck) {
        result = search(index, store.documents, text.replace(/\s/g, '_'));
      }
    } else {
      // Extract unique document IDs from Trie results
      const trieDocIds = new Set();
      trieResults.forEach((r) => r.data.forEach((d) => trieDocIds.add(d)));

      let lunrResults = [];
      if (trieDocIds.size > 0) {
        // Filter documents for Lunr search
        const filteredDocuments = [];
        trieDocIds.forEach((id) => {
          filteredDocuments.push(store.documents[id]);
        });
        if (filteredDocuments.length > 0) {
          // Rebuild a temporary index only with the filtered documents
          const tempLunrIndex = globalThis.lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('name');
            this.field('text');
            this.field('component');
            this.field('keyword', { boost: 5 });
            filteredDocuments.forEach((doc) => this.add(doc));
          });
          lunrResults = search(tempLunrIndex, filteredDocuments, text);
          if (recheck) {
            result = search(index, store.documents, text.replace(/\s/g, '_'));
          }
        } else {
          lunrResults = search(index, store.documents, text);
          if (recheck) {
            result = search(index, store.documents, text.replace(/\s/g, '_'));
          }
        }
      } else {
        lunrResults = search(index, store.documents, text);
        if (recheck) {
          result = search(index, store.documents, text.replace(/\s/g, '_'));
        }
      }
      result = lunrResults;
    }
    const searchResultDataset = document.createElement('div');
    searchResultDataset.classList.add('search-result-dataset');
    searchResultContainer.appendChild(searchResultDataset);
    if (result.length > 0) {
      createSearchResult(result, store, searchResultDataset);
    } else {
      searchResultDataset.appendChild(createNoResult(text));
    }
  }

  function confineEvent (e) {
    e.stopPropagation();
  }

  function debounce (func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  function enableSearchInput (enabled) {
    if (facetFilterInput) {
      facetFilterInput.disabled = !enabled;
    }
    searchInput.disabled = !enabled;
    searchInput.title = enabled ? '' : 'Loading index...';
  }

  function isClosed () {
    return searchResultContainer.childElementCount === 0
  }

  function executeSearch (index) {
    const debug = 'URLSearchParams' in globalThis && new URLSearchParams(globalThis.location.search).has('lunr-debug');
    const query = searchInput.value;
    try {
      if (!query) return clearSearchResults()
      searchIndex(index.index, index.trie, index.store, query);
    } catch (err) {
      if (err instanceof globalThis.lunr.QueryParseError) {
        if (debug) {
          console.debug('Invalid search query: ' + query + ' (' + err.message + ')');
        }
      } else {
        console.error('Something went wrong while searching', err);
      }
    }
  }

  function toggleFilter (e, index) {
    searchInput.focus();
    if (!isClosed()) {
      executeSearch(index);
    }
  }

  function base64ToBytesArr (str) {
    // Fast path using native atob when available
    if (typeof globalThis.atob === 'function') {
      try {
        const binary = globalThis.atob(str);
        const len = binary.length;
        const out = new Uint8Array(len);
        for (let i = 0; i < len; i++) out[i] = binary.charCodeAt(i);
        return out
      } catch (e) {
        // fall back to manual decoder on any error
      }
    }
    // Fallback: manual decoder without large intermediate arrays/strings
    const lookup = new Uint8Array(256);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (let i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
    // Compute output length
    let padding = 0;
    if (str.endsWith('==')) padding = 2;
    else if (str.endsWith('=')) padding = 1;
    const groups = Math.floor((str.length + 3) / 4);
    const outLen = groups * 3 - padding;
    const out = new Uint8Array(outLen);
    let outIndex = 0;
    let i = 0;
    while (i < str.length) {
      const c1 = str.charCodeAt(i++); const c2 = str.charCodeAt(i++);
      const c3 = str.charCodeAt(i++); const c4 = str.charCodeAt(i++);
      const b1 = lookup[c1]; const b2 = lookup[c2];
      const b3 = c3 === 61 ? 0 : lookup[c3]; // '=' -> 61
      const b4 = c4 === 61 ? 0 : lookup[c4];
      const triple = (b1 << 18) | (b2 << 12) | (b3 << 6) | b4;
      if (outIndex < outLen) out[outIndex++] = (triple >> 16) & 0xff;
      if (outIndex < outLen) out[outIndex++] = (triple >> 8) & 0xff;
      if (outIndex < outLen) out[outIndex++] = triple & 0xff;
    }
    return out
  }

  function initSearch (lunr, data, trieData) {
    const start = performance.now();
    let loadedIndex = null;
    let loadingPromise = null;

    // Simple fast non-crypto string hash (djb2) to key caches
    function hashString (s) {
      let h = 5381;
      for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
      return (h >>> 0).toString(16)
    }

    const ensureLoaded = async () => {
      if (loadedIndex) return loadedIndex
      if (!loadingPromise) {
        loadingPromise = new Promise((resolve) => {
          const doLoad = async () => {
            try {
              const cacheKey = 'monolith:' + hashString(String(data)) + ':' + hashString(String(trieData));
              // Try IndexedDB cache first (uses helper functions defined below)
              let lunrJSON, trieDataJSON;
              try {
                const cached = await (typeof idbGet === 'function' ? idbGet(cacheKey) : null);
                if (cached && cached.lunrJSON && cached.trieJSON) {
                  lunrJSON = cached.lunrJSON;
                  trieDataJSON = cached.trieJSON;
                }
              } catch (_) {}
              if (!lunrJSON || !trieDataJSON) {
                const dataBytes = base64ToBytesArr(data);
                lunrJSON = window.pako.inflate(dataBytes, { to: 'string' });
                const trieBytes = base64ToBytesArr(trieData);
                trieDataJSON = window.pako.inflate(trieBytes, { to: 'string' });
                // Store decompressed payloads for next page load
                try {
                  if (typeof idbSet === 'function') await idbSet({ key: cacheKey, type: 'monolith', lunrJSON, trieJSON: trieDataJSON });
                } catch (_) {}
              }
              const lunrdata = JSON.parse(lunrJSON);
              const idx = {
                index: lunr.Index.load(lunrdata.index),
                store: lunrdata.store,
                trie: new LevenshteinTrieUser(),
              };
              idx.trie.load(JSON.parse(trieDataJSON));
              loadedIndex = idx;
              // announce load completion
              searchInput.dispatchEvent(new CustomEvent('loadedindex', { detail: { took: performance.now() - start } }));
              resolve(idx);
            } catch (e) {
              console.error('Failed to initialize search index', e);
              resolve(null);
            }
          };
          if ('requestIdleCallback' in globalThis) {
            globalThis.requestIdleCallback(doLoad, { timeout: 1000 });
          } else {
            setTimeout(doLoad, 0);
          }
        });
      }
      return loadingPromise
    };

    // Enable UI immediately; load index on first interaction or idle time
    enableSearchInput(true);

    // Preload on first focus, once
    const preloadOnce = () => { ensureLoaded().then(() => {}); };
    searchInput.addEventListener('focus', preloadOnce, { once: true });

    searchInput.addEventListener(
      'keydown',
      debounce(async function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') return clearSearchResults(true)
        const idx = await ensureLoaded();
        if (idx) executeSearch(idx);
      }, 200)
    );
    searchInput.addEventListener('click', confineEvent);
    searchResultContainer.addEventListener('click', confineEvent);
    if (facetFilterInput) {
      facetFilterInput.parentElement.addEventListener('click', confineEvent);
      facetFilterInput.addEventListener('change', async (e) => {
        const idx = await ensureLoaded();
        if (idx) toggleFilter(e, idx);
      });
      facetFilterInput.addEventListener('focus', preloadOnce, { once: true });
    }
    document.documentElement.addEventListener('click', clearSearchResults);
  }

  // Modular loading with IndexedDB cache of expanded indexes
  const DB_NAME = 'antora-search-index';
  const DB_STORE = 'modules';
  const DB_VERSION = 1;
  function openDB () {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in globalThis)) return resolve(null)
      const req = globalThis.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: 'key' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    })
  }
  async function idbGet (key) {
    const db = await openDB();
    if (!db) return null
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    })
  }
  async function idbSet (record) {
    const db = await openDB();
    if (!db) return false
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      const store = tx.objectStore(DB_STORE);
      store.put(record);
    })
  }

  const loadedModules = [];
  let siteRootPrefix = '';

  async function loadModuleEntry (lunr, entry) {
    const cacheKey = entry.id + ':' + entry.hash;
    const cached = await idbGet(cacheKey);
    let lunrJSON;
    let trieJSON;
    if (cached && cached.lunrJSON && cached.trieJSON) {
      lunrJSON = cached.lunrJSON;
      trieJSON = cached.trieJSON;
    } else {
      const fetchUrl = entry.url && entry.url.startsWith('/') ? siteRootPrefix + entry.url : entry.url;
      const res = await fetch(fetchUrl);
      const json = await res.json();
      const dataBytes = base64ToBytesArr(json.lunrData);
      lunrJSON = globalThis.pako.inflate(dataBytes, { to: 'string' });
      const trieBytes = base64ToBytesArr(json.trieData);
      trieJSON = globalThis.pako.inflate(trieBytes, { to: 'string' });
      idbSet({ key: cacheKey, id: entry.id, hash: entry.hash, lunrJSON, trieJSON });
    }
    const lunrdata = JSON.parse(lunrJSON);
    const idx = {
      index: lunr.Index.load(lunrdata.index),
      store: lunrdata.store,
      trie: new LevenshteinTrieUser(),
    };
    idx.trie.load(JSON.parse(trieJSON));
    loadedModules.push({ id: entry.id, info: entry, index: idx.index, store: idx.store, trie: idx.trie });
    return idx
  }

  function multiExecuteSearch () {
    const query = searchInput.value;
    if (!query) return clearSearchResults()
    clearSearchResults(false);
    let any = false;
    const frag = document.createDocumentFragment();
    for (const mod of loadedModules) {
      let result = search(mod.index, mod.store.documents, query);
      if (result.length === 0 && /\s/.test(query)) {
        result = search(mod.index, mod.store.documents, query.replace(/\s/g, '_'));
      }
      const dataset = document.createElement('div');
      dataset.classList.add('search-result-dataset');
      if (result.length > 0) {
        any = true;
        createSearchResult(result, mod.store, dataset);
      }
      frag.appendChild(dataset);
    }
    if (!any) {
      const dataset = document.createElement('div');
      dataset.classList.add('search-result-dataset');
      dataset.appendChild(createNoResult(query));
      frag.appendChild(dataset);
    }
    searchResultContainer.appendChild(frag);
  }

  async function bootstrap (lunr, manifest, siteRootPath) {
    const start = performance.now();
    try {
      siteRootPrefix = siteRootPath || '';
      // Allow manifest to be either object or URL string
      let manifestObj = manifest;
      if (typeof manifest === 'string') {
        const url = manifest;
        // Try IndexedDB cache first
        try {
          const cached = await idbGet('manifest:' + url);
          if (cached && cached.data) manifestObj = cached.data;
        } catch (e) {}
        // Fetch latest manifest in background and update cache
        fetch(url)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error('manifest not found'))))
          .then((fresh) => { idbSet({ key: 'manifest:' + url, data: fresh }); })
          .catch(() => {});
        // If no cached manifest yet, block until fetched
        if (manifestObj == null) {
          const r = await fetch(url);
          if (!r.ok) return
          manifestObj = await r.json();
          idbSet({ key: 'manifest:' + url, data: manifestObj });
        }
      }

      const first = manifestObj.modules[0];
      if (!first) return
      await loadModuleEntry(lunr, first);
      enableSearchInput(true);
      searchInput.dispatchEvent(new CustomEvent('loadedindex', { detail: { took: performance.now() - start } }));

      const startBackgroundOnce = (() => {
        let started = false;
        const rest = manifestObj.modules.slice(1);
        const loadNext = async (i) => {
          if (i >= rest.length) return
          try { await loadModuleEntry(lunr, rest[i]); } catch (e) {}
          setTimeout(() => loadNext(i + 1), 50);
        };
        return () => {
          if (started) return
          started = true;
          setTimeout(() => loadNext(0), 0);
        }
      })();

      searchInput.addEventListener('keydown', debounce(function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') return clearSearchResults(true)
        startBackgroundOnce();
        multiExecuteSearch();
      }, 200));
      searchInput.addEventListener('focus', startBackgroundOnce, { once: true });
      searchInput.addEventListener('click', confineEvent);
      searchResultContainer.addEventListener('click', confineEvent);
      if (facetFilterInput) {
        facetFilterInput.parentElement.addEventListener('click', confineEvent);
        facetFilterInput.addEventListener('change', () => multiExecuteSearch());
        facetFilterInput.addEventListener('focus', startBackgroundOnce, { once: true });
      }
      document.documentElement.addEventListener('click', clearSearchResults);
    } catch (e) {
      console.error('Failed to bootstrap modular search', e);
      enableSearchInput(false);
    }
  }

  // disable the search input until the index is loaded
  enableSearchInput(false);

  exports.bootstrap = bootstrap;
  exports.initSearch = initSearch;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
