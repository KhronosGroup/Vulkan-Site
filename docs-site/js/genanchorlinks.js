// Copyright 2022-2023 The Khronos Group Inc.
// SPDX-License-Identifier: Apache-2.0

// Add href attribute to VUID anchors so the anchor can be selected

function postprocessor() {
    var self = this

    self.process(visitDoc)

    function visitDoc(document, output) {
        output = output.replace(/<a id="(VUID\-[\w\-:]+)">/g, '<a id="$1" href="#$1">')
        return output
    }
}

module.exports.register = function register (registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.postprocessor(postprocessor)
        })
    } else if (typeof registry.block === 'function') {
        registry.postprocessor(postprocessor)
    }
    return registry
}
