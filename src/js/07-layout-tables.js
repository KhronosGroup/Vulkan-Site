;(function () {
  'use strict'

  // Asciidoctor renders admonition blocks, callout lists and horizontal
  // description lists with table markup used only for layout. Mark them as
  // presentational so assistive technology does not announce a data table.
  var selector = '.doc .admonitionblock table, .doc .colist table, .doc .hdlist table'
  ;[].slice.call(document.querySelectorAll(selector)).forEach(function (table) {
    table.setAttribute('role', 'presentation')
  })
})()

;(function () {
  'use strict'

  // Horizontally scrollable code blocks must be reachable by keyboard so that
  // keyboard-only users can scroll them.
  var selector = '.doc pre.highlight > code, .doc .listingblock pre:not(.highlight), .doc .literalblock pre'
  var blocks = [].slice.call(document.querySelectorAll(selector))

  function update () {
    blocks.forEach(function (block, index) {
      if (block.scrollWidth > block.clientWidth || block.scrollHeight > block.clientHeight) {
        block.setAttribute('tabindex', '0')
        block.setAttribute('role', 'region')
        block.setAttribute('aria-label', 'Code sample ' + (index + 1) + ' (scrollable)')
      } else {
        block.removeAttribute('tabindex')
        block.removeAttribute('role')
        block.removeAttribute('aria-label')
      }
    })
  }

  // Block widths change when web fonts load and when the window is resized,
  // so re-check on each of those rather than only once.
  window.addEventListener('load', update)
  window.addEventListener('resize', update)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update)
  if (window.ResizeObserver) {
    var observer = new window.ResizeObserver(update)
    blocks.forEach(function (block) { observer.observe(block) })
  }
})()
