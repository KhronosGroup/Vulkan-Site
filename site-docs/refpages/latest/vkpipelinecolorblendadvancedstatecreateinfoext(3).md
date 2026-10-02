# VkPipelineColorBlendAdvancedStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineColorBlendAdvancedStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineColorBlendAdvancedStateCreateInfoEXT - Structure specifying parameters that affect advanced blend operations

If the `pNext` chain of [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)
includes a `VkPipelineColorBlendAdvancedStateCreateInfoEXT` structure,
then that structure includes parameters that affect advanced blend
operations.

The `VkPipelineColorBlendAdvancedStateCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPipelineColorBlendAdvancedStateCreateInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkBool32             srcPremultiplied;
    VkBool32             dstPremultiplied;
    VkBlendOverlapEXT    blendOverlap;
} VkPipelineColorBlendAdvancedStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcPremultiplied` specifies whether the source color of the blend
operation is treated as premultiplied.

* 
`dstPremultiplied` specifies whether the destination color of the
blend operation is treated as premultiplied.

* 
`blendOverlap` is a [VkBlendOverlapEXT](VkBlendOverlapEXT.html) value specifying how the
source and destination sample’s coverage is correlated.

If this structure is not present, `srcPremultiplied` and
`dstPremultiplied` are both considered to be [VK_TRUE](VK_TRUE.html), and
`blendOverlap` is considered to be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](VkBlendOverlapEXT.html).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-srcPremultiplied-01424) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-srcPremultiplied-01424

If the [non-premultiplied    source color](../../../../spec/latest/chapters/limits.html#limits-advancedBlendNonPremultipliedSrcColor) property is not supported, `srcPremultiplied` **must**
be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-dstPremultiplied-01425) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-dstPremultiplied-01425

If the [non-premultiplied    destination color](../../../../spec/latest/chapters/limits.html#limits-advancedBlendNonPremultipliedDstColor) property is not supported, `dstPremultiplied`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-01426) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-01426

If the [correlated overlap](../../../../spec/latest/chapters/limits.html#limits-advancedBlendCorrelatedOverlap)
property is not supported, `blendOverlap` **must** be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](VkBlendOverlapEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-sType-sType) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_ADVANCED_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-parameter) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-parameter

 `blendOverlap` **must** be a valid [VkBlendOverlapEXT](VkBlendOverlapEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)

[VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html), [VkBlendOverlapEXT](VkBlendOverlapEXT.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkPipelineColorBlendAdvancedStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
