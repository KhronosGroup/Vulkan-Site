/* eslint-env browser */
(function () {
  'use strict'

  function parseMultilang (text) {
    const startRe = /^\s*\/\/\s*START\s+([A-Za-z0-9_-]+)/i
    const endRe = /^\s*\/\/\s*END\s+([A-Za-z0-9_-]+)/i
    const lines = text.replace(/\r\n?/g, '\n').split('\n')
    const blocks = {}
    const order = []
    let curr = null
    let buf = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const mStart = line.match(startRe)
      if (mStart) {
        // flush any stray buffer (ignored)
        if (curr && buf.length) {
          blocks[curr] = (blocks[curr] || '') + (blocks[curr] ? '\n' : '') + buf.join('\n')
          buf = []
        }
        curr = mStart[1]
        if (!Object.prototype.hasOwnProperty.call(blocks, curr)) order.push(curr)
        // reset buffer for this lang
        buf = []
        continue
      }
      const mEnd = line.match(endRe)
      if (mEnd) {
        if (curr && mEnd[1].toLowerCase() === curr.toLowerCase()) {
          // commit buffer
          blocks[curr] = (blocks[curr] || '') + (blocks[curr] ? '\n' : '') + buf.join('\n')
          buf = []
          curr = null
          continue
        }
      }
      if (curr) buf.push(line)
    }

    // finalize if ended without END (graceful)
    if (curr && buf.length) {
      blocks[curr] = (blocks[curr] || '') + (blocks[curr] ? '\n' : '') + buf.join('\n')
    }

    const langs = order.filter((l) => blocks[l] && blocks[l].trim().length > 0)
    if (!langs.length) return null
    return { langs, blocks }
  }

  function getPreferredLang (langs) {
    try {
      const stored = localStorage.getItem('preferredCodeLang')
      if (stored && langs.includes(stored)) return stored
    } catch (_) {}
    // prefer common languages if present
    const preferred = ['javascript', 'js', 'ts', 'typescript', 'python', 'py', 'java', 'c', 'cpp', 'csharp', 'ruby']
    for (const p of preferred) if (langs.includes(p)) return p
    return langs[0]
  }

  function setPreferredLang (lang) {
    try {
      localStorage.setItem('preferredCodeLang', lang)
    } catch (_) {}
  }

  function enhanceMultilangBlock (pre, code) {
    const original = code.textContent || ''
    const parsed = parseMultilang(original)
    if (!parsed) return false

    // mark as multilang and capture languages
    pre.classList.add('multilang')

    let declared = []
    // support data-languages on pre or code if present
    const dl = (pre.dataset && pre.dataset.languages) || (code.dataset && code.dataset.languages)
    if (dl) declared = dl.split(',').map((s) => s.trim()).filter(Boolean)

    let langs
    if (declared.length) {
      const declaredInParsed = declared.filter((l) => parsed.langs.includes(l))
      const rest = parsed.langs.filter((l) => !declared.includes(l))
      langs = declaredInParsed.concat(rest)
    } else {
      langs = parsed.langs
    }
    pre.dataset.languages = langs.join(',')

    // build selector
    const selector = document.createElement('select')
    selector.className = 'code-lang-selector'
    for (const lang of langs) {
      const opt = document.createElement('option')
      opt.value = lang
      opt.textContent = lang
      selector.appendChild(opt)
    }

    // insert selector before pre
    if (pre.parentNode) pre.parentNode.insertBefore(selector, pre)

    // replace single code node with multiple
    const parent = code.parentNode
    // remove original code node
    parent.removeChild(code)

    const codeNodes = new Map()
    for (const lang of langs) {
      const c = document.createElement('code')
      c.className = 'hljs language-' + lang
      c.setAttribute('data-lang', lang)
      c.textContent = parsed.blocks[lang] || ''
      parent.appendChild(c)
      codeNodes.set(lang, c)
    }

    function show (lang) {
      codeNodes.forEach((node, l) => {
        if (l === lang) {
          node.classList.add('is-active')
          node.style.display = ''
          if (window.hljs && typeof window.hljs.highlightBlock === 'function') {
            try { window.hljs.highlightBlock(node) } catch (_) {}
          }
        } else {
          node.classList.remove('is-active')
          node.style.display = 'none'
        }
      })
      selector.value = lang
    }

    const initial = getPreferredLang(langs)
    show(initial)

    selector.addEventListener('change', function (e) {
      const lang = e.target.value
      show(lang)
      setPreferredLang(lang)
    })

    return true
  }

  function init () {
    var blocks = document.querySelectorAll('pre > code')
    blocks.forEach(function (code) {
      var pre = code.parentNode
      // only process if language is marked as multilang or content contains markers
      var isMulti = (code.getAttribute('data-lang') || '').toLowerCase() === 'multilang' ||
        /\n\s*\/\/\s*START\s+[A-Za-z0-9_-]+/i.test(code.textContent)
      if (!isMulti) return
      try { enhanceMultilangBlock(pre, code) } catch (e) { /* fail-safe */ }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
