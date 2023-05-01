// Copyright 2023 The Khronos Group Inc.
// SPDX-License-Identifier: Apache-2.0

// open_listing_block - allows a listing block to masquerade as an open
// block:
//
// [open]
// ----
// (block content)
// ----
//
// This allows nesting arbitrary open blocks inside 'refpage' open blocks.

console.log('In refpage.js')

function blockProcessor() {
    // console.log('In blockProcessor')

    var self = this
    self.named('open')
    self.onContext('listing')

    // console.log('In blockProcessor, calling process(visit)')

    self.process(visit)

    function visit(parent, reader, attrs) {
        // console.log('In blockProcessor.visit()')
        var wrapper = self.createOpenBlock(parent)
        self.parseContent(wrapper, reader)
        return wrapper
    }
}

module.exports.register = function register (registry) {
    // console.log('module.exports.register: typeof registry.register =', typeof registry.register)
    // console.log('module.exports.register: typeof this =', typeof this)
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.block(blockProcessor)
        })
    } else if (typeof registry.block === 'function') {
        registry.block(blockProcessor)
    }
    return registry
}
