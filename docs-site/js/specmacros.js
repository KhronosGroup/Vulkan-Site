// Copyright 2022-2023 The Khronos Group Inc.
// SPDX-License-Identifier: Apache-2.0

// The dictionaries of API entities
const apiNames = require('./apimap.cjs')

// The dictionary mapping anchors -> (page anchor, title)
const xrefMap = require('./xrefMap.cjs')

// The dictionary mapping page anchor -> page path
const pageMap = require('./pageMap.cjs')

normalAttribs = { 'attributes' : { 'subs' : 'normal' } }

// MACROS: Normative - can: cannot: may: must: optional: optionally:
// required: should:
// These normative terms are all given the same distinguishing style.
function normativeInlineMacro () {
    this.named('@normative')
    this.match(/(can|cannot|may|must|optional|optionally|required|should):/)

        //@ Need to make this actually return that style (<strong class="purple"> in HTML)
    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `*${target}*`, normalAttribs)
    })
}

// MACROS: Miscellaneous - undefined:
function undefinedInlineMacro () {
    this.named('undefined')
    this.match(/undefined:/)
    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', '*undefined*', normalAttribs)
    })
}

// MACROS: API names - basetype: fname: sname: dname: tname:
// Each is followed by an API name that is not linked to, or verified in the
// apiNames dictionary (though it could be)
//
// Unfortunately, there seems to be a problem using the capture group name
// '?<target>' in Javascript REs to identify the sub-expression to be passed
// to process(), so collapsing these by combining the regexps is not viable.

function basetypeInlineMacro () {
    this.named('basetype')
    this.match(/basetype:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function fnameInlineMacro () {
    this.named('fname')
    this.match(/fname:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function snameInlineMacro () {
    this.named('sname')
    this.match(/sname:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function dnameInlineMacro () {
    this.named('dname')
    this.match(/dname:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function tnameInlineMacro () {
    this.named('tname')
    this.match(/tname:(\w+)/)

    // Can factor this much, but trying to lift this outside
    // tnameInlineMacro gets dispatching error to createInline
    //
    //function tnameHook (parent, target, attrs) {
    //        target = target.replace('&#8594;', '-&gt;')
    //    return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    //}
    //
    //this.process(tnameHook)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

// MACROS: API-like text strings - etext: ftext: stext: ptext:

function etextInlineMacro () {
    this.named('etext')
    this.match(/etext:([\w\*]+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function ftextInlineMacro () {
    this.named('ftext')
    this.match(/ftext:([\w\*]+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

function stextInlineMacro () {
    this.named('stext')
    this.match(/stext:([\w\*]+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

// ptext: matches more complex patterns than the [efs]text: macros
function ptextInlineMacro () {
    this.named('ptext')
    this.match(/ptext:([\w\*]+((\.|&#8594;)[\w\*]+)*)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}


// I get how this would work with different macro names - but it doesn't seem to
// function registerNameMacro (name) {
//     this.inlineMacro(function () {
//         this.named(name)
//         //pat = `${name}:(\\w+)`
//         pat = 'tmod:(\\w+)'
//         console.log(`registerNameMacro(${name}): pat = ${pat}`)
//         this.match = new RegExp(pat)
//         this.process((parent, target, attrs) => {
//             console.log(`process() for ${name} -> ${target}`)
//         return this.createInline(parent, 'quoted', `*${name}* : ${target}`)
//     })
//     })
// }

// MACROS: XML names - tag: attr: (only in style guide)

// Probably want to render as 'strong' rather than 'code' style, like Ruby macro
function tagInlineMacro () {
    this.named('tag')
    this.match(/tag:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

// Probably want to render as 'strong' rather than 'code' style, like Ruby macro
function attrInlineMacro () {
    this.named('attr')
    this.match(/attr:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}


// MACROS: API parameter names - pname:
// This doesn't validate the parameter names, but does allow nested and
// indirect member/parameter expressions
function pnameInlineMacro () {
    this.named('pname')
    this.match(/pname:(\w+((\.|&#8594;)\w+)*)/)

    this.process((parent, target, attrs) => {
        target = target.replace('&#8594;', '-&gt;')
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}


// MACROS: API tokens / names (validated) - ename:

// apiext: - link to an API extension appendix / refpage
///@ Lookup in apiNames.features dictionary
function apiextInlineMacro () {
    this.named('apiext')
    this.match(/apiext:(\w+)/)

    this.process((parent, target, attrs) => {
        //@ Insert link here
        return makeAPIlink(this, parent, target, attrs,
            (name) => { return apiNames.features.hasOwnProperty(name) },
            apiNames.alias, apiNames.nonexistent)
    })
}

// ename: - API enums - does not *currently* link though it could
//@ Lookup in apiNames.consts dictionary (if we need to lookup - we could
// just to validate the target but allchecks should do that).
function enameInlineMacro () {
    this.named('ename')
    this.match(/ename:(\w+)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

// Make a link to an API entity
// If the API entity isn't supported, just make an inline text span
//  - context - the 'this' value of the calling inline.
//  - parent, target, attrs - as passed to the inline;
//    in particular 'target' is the API name.
//  - supported - a function taking the 'target' and returning whether it
//    is supported.
//  - nonexistent - if 'target' is in this object's properties, the target
//    does not exist for this build.
//    Try to use the API in the corresponding property value, instead.
//  - alias - if not supported, lookup 'target' in this object's
//    properties.
//    If found, the property value is an alias which *is* supported.
function makeAPIlink(context, parent, target, attrs, supported, alias, nonexistent) {
    // unused
    macroname = '??'
    // Label text for the link, whether or not it's rewritten
    label = target
    // Is this a refpage?
    isRefpage = parent.getDocument().getAttribute('cross-file-links')

    breaktarget = 'VK_ENABLE_BETA_EXTENSIONS'
    breakpoint = (target == breaktarget)

    if (breakpoint) {
        parent.getLogger().warn(`makeAPIlink: target = VkScopeNV supported = ${supported(target)}`)
        parent.getLogger().warn(`makeAPIlink: nonexistent = ${nonexistent.hasOwnProperty(target)}`)
        parent.getLogger().warn(`makeAPIlink: alias = ${alias.hasOwnProperty(target)}`)

        //debugger
    }
    if (!supported(target)) {
        // If the macro target is nonexistent in this build, but something
        //  aliased to it is not, substitute that as the target.
        // Otherwise, turn the (attempted) link into text, and complain.
        if (nonexistent.hasOwnProperty(target)) {
            target = nonexistent[target]

            if (breakpoint) {
                msg = `Rewriting nonexistent link macro target ${label} to ${target}`
                parent.getLogger().info(msg)
            }
        }
    }

    // If the macro target has an alias, use that alias as the link target.
    // This is only done for refpages, so a target which is aliased will
    // arrive at the alias refpage.
    // Otherwise, a link to 'vkFooEXT' aliasing 'vkFoo' would arrive at a
    //  slightly different place in the specification document.
    if (alias.hasOwnProperty(target) && isRefpage) {
        target = alias[target]

        if (breakpoint) {
            msg = `Rewriting aliased link macro target ${label} to ${target}`
            parent.getLogger().info(msg)
        }
    }

    // If the (possibly aliased) target is still not supported, this is
    // probably a build error.
    // For now, replace the target with a text span.
    if (!supported(target)) {
        // Suppress warnings for apiext: macros as this is such a common case
        if (macroname != 'apiext') {
            msg = `Textifying link macro target: ${target} (target is unsupported and has no aliases)`
            parent.getLogger().warn(msg)
        }
        return context.createInline(parent, 'quoted', `<code>${label}</code>`)
    }

    // Having resolved the target, create a link
    //@ Needs to figure out how to do the following for all link macros, then extend to Antora outputs as well
    //      if parent.document.attributes['cross-file-links']
    //        return Inline.new(parent, :anchor, target, :type => :link, :target => (target + '.html'))
    //      else
    //        return Inline.new(parent, :anchor, target, :type => :xref, :target => ('#' + target), :attributes => {'fragment' => target, 'refid' => target})
    //      end
    //@ This is how to create an inline xref (rather than an inline with xref *markup*)
    // function mklink(context, parent, target, attrs) {
    //     return context.createInline(parent, 'anchor', target, { type: 'link', target: target + '.html' })
    // }

    if (xrefMap.xrefMap.hasOwnProperty(target)) {
        const [xreflabel, title] = xrefMap.xrefMap[target]
        const page = pageMap.pageMap[xreflabel]
        //return context.createInline(parent, 'quoted', `${target} -> ${xreflabel} -> ${page}`)

        if (breakpoint) {
            msg = `makeAPIlink: ${target} is in xrefMap -> page ${page}`
            parent.getLogger().warn(msg)
        }

        if (isRefpage) {
            // Generate an Antora xref to another refpage.
            if (breakpoint) {
                msg = `makeAPIlink: rewriting ${target} -> xref:source/${target}.adoc[${label}]`
                parent.getLogger().warn(msg)
            }

            return context.createInline(parent, 'quoted', `xref:source/${target}.adoc[${label}]`, normalAttribs)
        } else {
            return context.createInline(parent, 'quoted', `xref:${page}#${target}[${label}]`, normalAttribs)
        }
    } else {
        // The target doesn't exist in the xrefMap, so we don't know where to
        // direct it. Just return a text span.

        //msg = `Textifying link macro target ${target} (cannot rewrite xref for target)`
        //parent.getLogger().warn(msg)

        return context.createInline(parent, 'quoted', `(ERROR: UNRESOLVED LINK: ${target})`, normalAttribs)
    }
}

// reflink: - link to any entity with an anchor / refpage
// This doesn't (can't) validate the entity name
function reflinkInlineMacro () {
    this.named('reflink')
    this.match(/reflink:([-\w]+)/)
    this.parseContentAs('text')

    this.process((parent, target, attrs) => {
        // parent.getLogger().warn('log message from reflink:')
        if (parent.getDocument().getAttribute('cross-file-links')) {
            // This attribute is only set for independent refpages, so the
            // link macros are to other refpages instead of to chapters
            // of the specification.
            return this.createInline(parent, 'quoted', `xref:source/${target}.adoc[${target}]`, normalAttribs)
        } else {
            return this.createInline(parent, 'quoted', `xref:${target}.html[${target}]`, normalAttribs)
        }
    })
}

// dlink: - link to an API #define
///@ Lookup in apiNames.defines dictionary
function dlinkInlineMacro () {
    this.named('dlink')
    this.match(/dlink:(\w+)/)

    this.process((parent, target, attrs) => {
        return makeAPIlink(this, parent, target, attrs,
            (name) => { return apiNames.defines.hasOwnProperty(name) },
            apiNames.alias, apiNames.nonexistent)
    })
}

// elink: - link to an API enumerated type
///@ Lookup in apiNames.enums dictionary
function elinkInlineMacro () {
    this.named('elink')
    this.match(/elink:(\w+)/)

    this.process((parent, target, attrs) => {
        return makeAPIlink(this, parent, target, attrs,
            (name) => { return apiNames.enums.hasOwnProperty(name) },
            apiNames.alias, apiNames.nonexistent)
    })
}

// flink: - link to an API command
///@ Lookup in apiNames.protos dictionary
function flinkInlineMacro () {
    this.named('flink')
    this.match(/flink:(\w+)/)

    this.process((parent, target, attrs) => {
        return makeAPIlink(this, parent, target, attrs,
            (name) => { return apiNames.protos.hasOwnProperty(name) },
            apiNames.alias, apiNames.nonexistent)
    })
}

// slink: - link to an API structure
///@ Lookup in apiNames.structs or apiNames.handles dictionaries
function slinkInlineMacro () {
    this.named('slink')
    this.match(/slink:(\w+)/)

    this.process((parent, target, attrs) => {
        return makeAPIlink(this, parent, target, attrs,
            (name) => {
                return apiNames.structs.hasOwnProperty(name) ||
                       apiNames.handles.hasOwnProperty(name)
            },
            apiNames.alias, apiNames.nonexistent)
    })
}

// tlink: - link to an API function pointer or flag type
///@ Lookup in apiNames.flags, apiNames.funcpointers, apiNames.defines dictionary
function tlinkInlineMacro () {
    this.named('tlink')
    this.match(/tlink:(\w+)/)

    this.process((parent, target, attrs) => {
        return makeAPIlink(this, parent, target, attrs,
            (name) => {
                return apiNames.flags.hasOwnProperty(name) ||
                       apiNames.funcpointers.hasOwnProperty(name) ||
                       apiNames.defines.hasOwnProperty(name)
            },
            apiNames.alias, apiNames.nonexistent)
    })
}

// MACROS: code-like expressions - code:
// code: - format a bit of (non-API) code. Followed by a code-like
// expression (mostly used for SPIR-V keywords).
// This does not include all possible code-like expressions, of course.
// It allows imbedded periods (field separators) and wildcards if followed
// by another word, and an ending wildcard.
function codeInlineMacro () {
    this.named('code')
    this.match(/code:(\w+([.*]\w+)*\**)/)

    this.process((parent, target, attrs) => {
        return this.createInline(parent, 'quoted', `<code>${target}</code>`)
    })
}

module.exports.register = function register (registry) {
//module.exports.register = function register (registry, { file }) {
    //console.log('file component: ', file.src.component)   // demo
    //console.log('file module: ', file.src.module)         // ROOT
    //console.log('file version: ', file.src.version)       // latest
    //console.log('file family: ', file.src.family)         // page
    //console.log('file relative: ', file.src.relative)     // index.adoc

    const extensions = [
        // Normative macros
        normativeInlineMacro,
        // Miscellaneous macros
        undefinedInlineMacro,
        // API text macros
        etextInlineMacro,
        ftextInlineMacro,
        stextInlineMacro,
        ptextInlineMacro,
        // API name macros
        basetypeInlineMacro,
        dnameInlineMacro,
        fnameInlineMacro,
        snameInlineMacro,
        tnameInlineMacro,
        // XML tag macros
        tagInlineMacro,
        attrInlineMacro,
        // Parameter name macros
        pnameInlineMacro,
        // API token macros
        apiextInlineMacro,
        enameInlineMacro,
        reflinkInlineMacro,
        dlinkInlineMacro,
        elinkInlineMacro,
        flinkInlineMacro,
        slinkInlineMacro,
        tlinkInlineMacro,
        // Code-like expression macros
        codeInlineMacro,
    ]

    if (typeof registry.register === 'function') {
        registry.register(function () {
            for (const element of extensions) {
                this.inlineMacro(element)
            }

            //for (name of [ 'tmod' ]) {
            //    registerNameMacro.call(this, name)
            //}

            //this.inlineMacro(normativeInlineMacro)
    })
    } else if (typeof registry.block === 'function') {
        for (const element of extensions) {
            registry.inlineMacro(element)
        }

        //registry.inlineMacro(normativeInlineMacro)
        //for (name of [ 'tmod' ]) {
        //    registerNameMacro.call(registry, name)
        //}

    }
    return registry
}

// require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
// include ::Asciidoctor
//
// # This is the generated map of API interfaces in this spec build
// require 'apimap.rb'
// $apiNames = APInames.new
//
// class LinkInlineMacroBase < SpecInlineMacroBase
//     # Check if a link macro target exists - overridden by specific macros
//     # Default assumption is that it does exist
//     def exists? target
//       return true
//     end
//
//     def process parent, target, attributes
//       if not exists? target
//         # If the macro target is not in this build, but has an alias,
//         # substitute that alias as the argument.
//         # Otherwise, turn the (attempted) link into text, and complain.
//         if $apiNames.nonexistent.has_key? target
//           oldtarget = target
//           target = $apiNames.nonexistent[oldtarget]
//           msg = 'Rewriting nonexistent link macro target: ' + @name.to_s + ':' + oldtarget + ' to ' + target
//           Asciidoctor::LoggerManager.logger.info msg
//           # Fall through
//         else
//           # Suppress warnings for apiext: macros as this is such a common case
//           if @name.to_s != 'apiext'
//             msg = 'Textifying unknown link macro target: ' + @name.to_s + ':' + target
//             Asciidoctor::LoggerManager.logger.warn msg
//           end
//           return create_inline parent, :quoted, '<code>' + target + '</code>'
//         end
//       end
//
//       if parent.document.attributes['cross-file-links']
//         return Inline.new(parent, :anchor, target, :type => :link, :target => (target + '.html'))
//       else
//         return Inline.new(parent, :anchor, target, :type => :xref, :target => ('#' + target), :attributes => {'fragment' => target, 'refid' => target})
//       end
//     end
// end
//
// class CodeInlineMacroBase < SpecInlineMacroBase
//     def process parent, target, attributes
//         create_inline parent, :quoted, '<code>' + target.gsub('&#8594;', '-&gt;') + '</code>'
//     end
// end
//
// class ParamInlineMacroBase < SpecInlineMacroBase
//     def process parent, target, attributes
//          create_inline parent, :quoted, '<code>' + target.gsub('&#8594;', '-&gt;') + '</code>'
//     end
// end
