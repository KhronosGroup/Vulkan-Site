// Copyright 2022-2023 The Khronos Group Inc.
// SPDX-License-Identifier: Apache-2.0

// Translated from config/vuid-expander.rb
// Find VUID anchors in VU blocks and add VUID-styled text and line break

function treeProcessor() {
    var self = this

    self.process(visitDoc)

    function visitDoc(doc) {
        doc.findBy({'context': 'sidebar'}).forEach((sidebar) => {
            // Get the un-substituted form of the title to avoid complaints
            // about missing attributes on lines like '.{externsynctitle}'.
            if (sidebar.hasTitle() && sidebar.title.startsWith('Valid Usage')) {
                sidebar.findBy({'context': 'list_item'}).forEach((item) => {
                    item.text = item.text.replace(/(\[\[(VUID-[^\]]*)\]\])/, "$1 [vuid]#$2# +\n")
                })
            }
        })
    }
}

module.exports.register = function register (registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.treeProcessor(treeProcessor)
        })
    } else if (typeof registry.block === 'function') {
        registry.treeProcessor(treeProcessor)
    }
    return registry
}
