# VkColorBlendAdvancedEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkColorBlendAdvancedEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkColorBlendAdvancedEXT - Structure specifying the advanced blend operation parameters for an attachment

The `VkColorBlendAdvancedEXT` structure is defined as:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
typedef struct VkColorBlendAdvancedEXT {
    VkBlendOp            advancedBlendOp;
    VkBool32             srcPremultiplied;
    VkBool32             dstPremultiplied;
    VkBlendOverlapEXT    blendOverlap;
    VkBool32             clampResults;
} VkColorBlendAdvancedEXT;

* 
`advancedBlendOp` selects which blend operation is used to calculate
the RGB values to write to the color attachment.

* 
`srcPremultiplied` specifies whether the source color of the blend
operation is treated as premultiplied.

* 
`dstPremultiplied` specifies whether the destination color of the
blend operation is treated as premultiplied.

* 
`blendOverlap` is a [VkBlendOverlapEXT](VkBlendOverlapEXT.html) value specifying how the
source and destination sample’s coverage is correlated.

* 
`clampResults` specifies that results **must** be clamped to the [0,1]
range before writing to the attachment, which is useful when the
attachment format is not normalized fixed-point.

Valid Usage

* 
[](#VUID-VkColorBlendAdvancedEXT-srcPremultiplied-07505) VUID-VkColorBlendAdvancedEXT-srcPremultiplied-07505

If the [non-premultiplied    source color](../../../../spec/latest/chapters/limits.html#limits-advancedBlendNonPremultipliedSrcColor) property is not supported, `srcPremultiplied` **must**
be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkColorBlendAdvancedEXT-dstPremultiplied-07506) VUID-VkColorBlendAdvancedEXT-dstPremultiplied-07506

If the [non-premultiplied    destination color](../../../../spec/latest/chapters/limits.html#limits-advancedBlendNonPremultipliedDstColor) property is not supported, `dstPremultiplied`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkColorBlendAdvancedEXT-blendOverlap-07507) VUID-VkColorBlendAdvancedEXT-blendOverlap-07507

If the [correlated overlap](../../../../spec/latest/chapters/limits.html#limits-advancedBlendCorrelatedOverlap)
property is not supported, `blendOverlap` **must** be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](VkBlendOverlapEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkColorBlendAdvancedEXT-advancedBlendOp-parameter) VUID-VkColorBlendAdvancedEXT-advancedBlendOp-parameter

 `advancedBlendOp` **must** be a valid [VkBlendOp](VkBlendOp.html) value

* 
[](#VUID-VkColorBlendAdvancedEXT-blendOverlap-parameter) VUID-VkColorBlendAdvancedEXT-blendOverlap-parameter

 `blendOverlap` **must** be a valid [VkBlendOverlapEXT](VkBlendOverlapEXT.html) value

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkBlendOp](VkBlendOp.html), [VkBlendOverlapEXT](VkBlendOverlapEXT.html), `VkBool32`, [vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkColorBlendAdvancedEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
