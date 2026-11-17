;(function () {
  'use strict'

  var CMD_RX = /^\$ (\S[^\\\n]*(\\\n(?!\$ )[^\\\n]*)*)(?=\n|$)/gm
  var LINE_CONTINUATION_RX = /( ) *\\\n *|\\\n( ?) */g
  var TRAILING_SPACE_RX = / +$/gm
  var CLIPPY_PATH = [
    'M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3',
    'a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298',
    'A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5',
    'a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25',
    'h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z',
  ].join('')

  var supportsCopy = window.navigator.clipboard

  ;[].slice.call(document.querySelectorAll('.doc pre.highlight, .doc .literalblock pre')).forEach(function (pre) {
    var code, language, lang, copy, toast, toolbox, status
    if (pre.classList.contains('highlight')) {
      code = pre.querySelector('code')
      if ((language = code.dataset.lang) && language !== 'console') {
        ;(lang = document.createElement('span')).className = 'source-lang'
        lang.appendChild(document.createTextNode(language))
      }
    } else if (pre.innerText.startsWith('$ ')) {
      var block = pre.parentNode.parentNode
      block.classList.remove('literalblock')
      block.classList.add('listingblock')
      pre.classList.add('highlightjs', 'highlight')
      ;(code = document.createElement('code')).className = 'language-console hljs'
      code.dataset.lang = 'console'
      code.appendChild(pre.firstChild)
      pre.appendChild(code)
    } else {
      return
    }
    ;(toolbox = document.createElement('div')).className = 'source-toolbox'
    if (lang) toolbox.appendChild(lang)
    if (supportsCopy) {
      ;(copy = document.createElement('button')).className = 'copy-button'
      copy.setAttribute('type', 'button')
      copy.setAttribute('title', 'Copy to clipboard')
      var langName = language && language !== 'console' ? language.toUpperCase() + ' ' : ''
      copy.setAttribute('aria-label', 'Copy ' + langName + 'code to clipboard')
      // Draw the icon inline (octicon "clippy") instead of loading it from the
      // UI bundle, so the button cannot end up blank if the image is missing.
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('class', 'copy-icon')
      svg.setAttribute('viewBox', '0 0 16 16')
      svg.setAttribute('aria-hidden', 'true')
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('fill-rule', 'evenodd')
      path.setAttribute('d', CLIPPY_PATH)
      svg.appendChild(path)
      copy.appendChild(svg)
      ;(toast = document.createElement('span')).className = 'copy-toast'
      toast.appendChild(document.createTextNode('Copied!'))
      toast.setAttribute('aria-hidden', 'true')
      copy.appendChild(toast)
      toolbox.appendChild(copy)
      ;(status = document.createElement('span')).className = 'sr-only'
      status.setAttribute('role', 'status')
      toolbox.insertBefore(status, toolbox.firstChild) // keeps the copy button last so no separator follows it
    }
    pre.parentNode.appendChild(toolbox)
    if (copy) copy.addEventListener('click', writeToClipboard.bind(copy, code, status))
  })

  function extractCommands (text) {
    var cmds = []
    var m
    while ((m = CMD_RX.exec(text))) cmds.push(m[1].replace(LINE_CONTINUATION_RX, '$1$2'))
    return cmds.join(' && ')
  }

  function writeToClipboard (code, status) {
    var text = code.innerText.replace(TRAILING_SPACE_RX, '')
    if (code.dataset.lang === 'console' && text.startsWith('$ ')) text = extractCommands(text)
    window.navigator.clipboard.writeText(text).then(
      function () {
        this.classList.add('clicked')
        this.offsetHeight // eslint-disable-line no-unused-expressions
        this.classList.remove('clicked')
        status.textContent = 'Copied!'
        setTimeout(function () { status.textContent = '' }, 2000)
      }.bind(this),
      function () {}
    )
  }
})()
