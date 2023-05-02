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

function blockProcessor() {
    var self = this

    // Filter only on appropriately tagged listing blocks
    self.named('open')
    self.onContext('listing')

    self.process(visit)

    function visit(parent, reader, attrs) {
        // Repurpose contents of this block as an open block
        var wrapper = self.createOpenBlock(parent)
        self.parseContent(wrapper, reader)
        return wrapper
    }
}

module.exports.register = function register (registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.block(blockProcessor)
        })
    } else if (typeof registry.block === 'function') {
        registry.block(blockProcessor)
    }
    return registry
}
