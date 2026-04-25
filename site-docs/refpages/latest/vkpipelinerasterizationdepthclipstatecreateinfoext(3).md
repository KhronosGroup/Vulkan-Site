# VkPipelineRasterizationDepthClipStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationDepthClipStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationDepthClipStateCreateInfoEXT - Structure specifying depth clipping state

If the `pNext` chain of [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)
includes a `VkPipelineRasterizationDepthClipStateCreateInfoEXT`
structure, then that structure controls whether depth clipping is enabled or
disabled.

The `VkPipelineRasterizationDepthClipStateCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_depth_clip_enable
typedef struct VkPipelineRasterizationDepthClipStateCreateInfoEXT {
    VkStructureType                                        sType;
    const void*                                            pNext;
    VkPipelineRasterizationDepthClipStateCreateFlagsEXT    flags;
    VkBool32                                               depthClipEnable;
} VkPipelineRasterizationDepthClipStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`depthClipEnable` controls whether depth clipping is enabled as
described in [Primitive Clipping](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-clipping).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_DEPTH_CLIP_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_depth_clip_enable](VK_EXT_depth_clip_enable.html), `VkBool32`, [VkPipelineRasterizationDepthClipStateCreateFlagsEXT](VkPipelineRasterizationDepthClipStateCreateFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
