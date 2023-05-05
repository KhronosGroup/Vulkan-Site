'use strict'

// const Opal = require('asciidoctor-opal-runtime').Opal
const mathjax = require('mathjax-full/js/mathjax.js').mathjax
const AsciiMath = require('mathjax-full/js/input/asciimath.js').AsciiMath
const AmsConfiguration = require('mathjax-full/js/input/tex/ams/AmsConfiguration.js').AmsConfiguration
const Tex = require('mathjax-full/js/input/tex.js').TeX
const SVG = require('mathjax-full/js/output/svg.js').SVG
const liteAdaptor = require('mathjax-full/js/adaptors/liteAdaptor.js').liteAdaptor
const RegisterHTMLHandler = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler

const LineFeed = '\n'
const Break = '\n<br/>\n'
const StemInlineMacroRx = /\\?(stem|asciimath|latexmath):([a-z,]*)\[(.*?[^\\])\]/g
const EscBracketRx = /\\]/g

// The logic of the tree processor is heavily modified from the ruby asciidoctor-mathematical.
// Here we visit the tree once in order, collecting the current attribute values.

module.exports.register = function (registry, config = {}) {
  const createMathSrc = makeCreateMathSrc()
  function treeProcessor () {
    var self = this
    self.createMathSrc = createMathSrc

    self.process(visitDoc)

    function visitDoc (doc) {
      doc.blocks.forEach((block) => visit(self, doc, block))
      doc.$restore_attributes()
    }
    function visit (processor, doc, block) {
      combineAttributes(block, doc)
      if (block.context === 'stem') {
        processStemBlock(processor, doc, block)
      } else if ((block.content_model === 'simple' &&
        block.subs.indexOf('macro') &&
        block.context !== 'table_cell') ||
      block.context === 'list_item') {
        processProseBlock(processor, doc, block)
      } else if (block.context === 'table') {
        [block.rows.head, block.rows.body, block.rows.foot]
          .forEach((rows) => rows.forEach((row) => {
            row.forEach((cell) => {
              if (cell.style === 'asciidoc') {
                visitDoc(cell.$inner_document())
              } else if (cell.style !== 'literal') {
                processNonAsciidocTableCell(processor, doc, cell)
              }
            })
          }))
      } else if (block.context === 'section') {
        processSectionBlock(processor, doc, block)
      }
      if (block.context === 'dlist') {
        block.blocks && block.blocks.forEach(([terms, description]) => {
          description && visit(processor, doc, description)
          terms.forEach((term) => visit(processor, doc, term))
        })
      } else {
        block.blocks && block.blocks.forEach((sub) => visit(processor, doc, sub))
      }
    }

    function combineAttributes (block, doc) {
      block.attributes && doc.$playback_attributes(block.attributes)
    }
  }

  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.treeProcessor(treeProcessor)
    })
  } else if (typeof registry.treeProcessor === 'function') {
    registry.treeProcessor(treeProcessor)
  }
  return registry
}

function processStemBlock (processor, doc, stem) {
  // console.log('stem.style', stem.style)
  const typeset = stem.style === 'asciimath'
    ? stem.lines.map((line) => processor.createMathSrc(line, stem.style, true)).join(Break)
    : processor.createMathSrc(stem.lines.join('\n'), stem.style, true)
  const parent = stem.parent
  const stemBlock = processor.$create_pass_block(
    parent,
    `<div class="stemblock">
  <div class="content halign-center valign-middle" style="padding-top: 1rem">
${typeset}
  </div>
</div>`,
    // eslint-disable-next-line no-undef
    Opal.hash({})
  )
  parent.blocks[parent.blocks.indexOf(stem)] = stemBlock
}

function processProseBlock (processor, doc, prose) {
  const text = prose.context === 'list_item' ? prose.text : prose.lines.join(LineFeed)
  const { mathText, sourceModified } = processInlineStem(processor, prose, text)
  if (sourceModified) {
    if (prose.context === 'list_item') {
      prose.text = mathText
    } else {
      prose.lines = mathText.split(LineFeed)
    }
  }
}

function processNonAsciidocTableCell (processor, doc, cell) {
  const text = cell.text
  const { mathText, sourceModified } = processInlineStem(processor, cell, text)
  if (sourceModified) {
    cell.text = mathText
  }
}

//TODO section headers may not get working anchors?
function processSectionBlock (processor, doc, section) {
  const text = section.title
  const { mathText, sourceModified } = processInlineStem(processor, section, text)
  if (sourceModified) {
    section.title = mathText
    delete section.converted_title
  }
}

function processInlineStem (processor, node, text) {
  const docStemStyle = node.getDocument().getAttribute('stem') === 'latexmath' ? 'latexmath' : 'asciimath'
  // console.log(`docStemStyle ${docStemStyle} doc.getAttribute('stem')`, doc.getDocument().getAttribute('stem'))
  var sourceModified = false
  const mathText = !(text && text.replace)
    ? null
    : text.replace(StemInlineMacroRx, (match, g0, g1, g2, index, string) => {
      // console.log(`match ${match}, g0 ${g0}, g1 ${g1}, g2 ${g2}, index ${index}, string ${string}`)
      if (match.startsWith('\\')) {
        return match.slice(1)
      }

      const stemStyle = g0 === 'stem' ? docStemStyle : g0
      var eqData = g2.trimRight()
      if (eqData.length === 0) {
        return ''
      } else {
        sourceModified = true
      }

      eqData = eqData.replace(EscBracketRx, ']')
      const subs = g1 && g1.length ? (node.$resolve_pass_subs(g1)) : []// (to_html ? [:specialcharacters] : [])
      if (subs.length) {
        eqData = node.$apply_subs(eqData, subs)
      }
      return `pass:[<span class="steminline"> ${processor.createMathSrc(eqData, stemStyle, false)} </span>]`
    })
  // console.log('mathtext', mathText)
  return { mathText, sourceModified }
}

function makeCreateMathSrc () {
  const adaptor = liteAdaptor()
  RegisterHTMLHandler(adaptor)
  const svg = new SVG({ fontCache: 'none' })
  //this might be premature optimization. It might be useful for equation numbers.
  const inputs = { asciimath: undefined, latexmath: undefined }
  return (math, style, display) => {
    var input = inputs[style]
    if (!input) {
      if (style === 'asciimath') {
        const asciimath = new AsciiMath({})
        input = mathjax.document('', { InputJax: asciimath, OutputJax: svg })
        inputs.asciimath = input
      } else if (style === 'latexmath') {
        const latexmath = new Tex({ packages: ['base', 'ams'] })
        input = mathjax.document('', { InputJax: latexmath, OutputJax: svg })
        inputs.latexmath = input
      } else {
        throw new Error(`unrecognized stem style '${style}'`)
      }
    }
    const node = input.convert(math, {
      display,
      em: 16,
      ex: 8,
      containerWidth: 80 * 16,
    }).children[0]
    adaptor.setStyle(node, 'overflow', 'visible')
    return adaptor.outerHTML(node)
  }
}
