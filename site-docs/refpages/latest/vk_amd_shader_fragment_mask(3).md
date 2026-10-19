# VK_AMD_shader_fragment_mask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_shader_fragment_mask.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_shader_fragment_mask](#VK_AMD_shader_fragment_mask)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_shader_fragment_mask - device extension

**Name String**

`VK_AMD_shader_fragment_mask`

**Extension Type**

Device extension

**Registered Extension Number**

138

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_AMD_shader_fragment_mask](https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_shader_fragment_mask.html)

**Contact**

* 
Aaron Hagan [AaronHaganAMD](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_shader_fragment_mask] @AaronHaganAMD%0A*Here describe the issue or question you have about the VK_AMD_shader_fragment_mask extension*)

**Last Modified Date**

2017-08-16

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_AMD_shader_fragment_mask`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/amd/GL_AMD_shader_fragment_mask.txt)

**Contributors**

* 
Aaron Hagan, AMD

* 
Daniel Rakos, AMD

* 
Timothy Lottes, AMD

This extension provides efficient read access to the fragment mask in
compressed multisampled color surfaces.
The fragment mask is a lookup table that associates color samples with color
fragment values.

From a shader, the fragment mask can be fetched with a call to
`fragmentMaskFetchAMD`, which returns a single `uint` where each
subsequent four bits specify the color fragment index corresponding to the
color sample, starting from the least significant bit.
For example, when eight color samples are used, the color fragment index for
color sample 0 will be in bits 0-3 of the fragment mask, for color sample 7
the index will be in bits 28-31.

The color fragment for a particular color sample may then be fetched with
the corresponding fragment mask value using the `fragmentFetchAMD` shader
function.

* 
`VK_AMD_SHADER_FRAGMENT_MASK_EXTENSION_NAME`

* 
`VK_AMD_SHADER_FRAGMENT_MASK_SPEC_VERSION`

* 
[`FragmentMaskAMD`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentMaskAMD)

This example shows a shader that queries the fragment mask from a
multisampled compressed surface and uses it to query fragment values.

#version 450 core

#extension GL_AMD_shader_fragment_mask: enable

layout(binding = 0) uniform sampler2DMS       s2DMS;
layout(binding = 1) uniform isampler2DMSArray is2DMSArray;

layout(binding = 2, input_attachment_index = 0) uniform usubpassInputMS usubpassMS;

layout(location = 0) out vec4 fragColor;

void main()
{
    vec4 fragOne = vec4(0.0);

    uint fragMask = fragmentMaskFetchAMD(s2DMS, ivec2(2, 3));
    uint fragIndex = (fragMask & 0xF0) >> 4;
    fragOne += fragmentFetchAMD(s2DMS, ivec2(2, 3), 1);

    fragMask = fragmentMaskFetchAMD(is2DMSArray, ivec3(2, 3, 1));
    fragIndex = (fragMask & 0xF0) >> 4;
    fragOne += fragmentFetchAMD(is2DMSArray, ivec3(2, 3, 1), fragIndex);

    fragMask = fragmentMaskFetchAMD(usubpassMS);
    fragIndex = (fragMask & 0xF0) >> 4;
    fragOne += fragmentFetchAMD(usubpassMS, fragIndex);

    fragColor = fragOne;
}

* 
Revision 1, 2017-08-16 (Aaron Hagan)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_shader_fragment_mask).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
