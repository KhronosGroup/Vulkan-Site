# VkPipelineViewportSwizzleStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportSwizzleStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportSwizzleStateCreateInfoNV - Structure specifying swizzle applied to primitive clip coordinates

Each primitive sent to a given viewport has a swizzle and **optional** negation
applied to its clip coordinates.
The swizzle that is applied depends on the viewport index, and is controlled
by the `VkPipelineViewportSwizzleStateCreateInfoNV` pipeline state:

// Provided by VK_NV_viewport_swizzle
typedef struct VkPipelineViewportSwizzleStateCreateInfoNV {
    VkStructureType                                sType;
    const void*                                    pNext;
    VkPipelineViewportSwizzleStateCreateFlagsNV    flags;
    uint32_t                                       viewportCount;
    const VkViewportSwizzleNV*                     pViewportSwizzles;
} VkPipelineViewportSwizzleStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`viewportCount` is the number of viewport swizzles used by the
pipeline.

* 
`pViewportSwizzles` is a pointer to an array of
[VkViewportSwizzleNV](VkViewportSwizzleNV.html) structures, defining the viewport swizzles.

Valid Usage

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-01215) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-01215

`viewportCount` **must** be greater than or equal to the
`viewportCount` set in `VkPipelineViewportStateCreateInfo`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SWIZZLE_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-flags-zerobitmask) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-pViewportSwizzles-parameter) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-pViewportSwizzles-parameter

 `pViewportSwizzles` **must** be a valid pointer to an array of `viewportCount` valid [VkViewportSwizzleNV](VkViewportSwizzleNV.html) structures

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-arraylength) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html), [VkPipelineViewportSwizzleStateCreateFlagsNV](VkPipelineViewportSwizzleStateCreateFlagsNV.html), [VkStructureType](VkStructureType.html), [VkViewportSwizzleNV](VkViewportSwizzleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
