# VkPipelineViewportDepthClampControlCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportDepthClampControlCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportDepthClampControlCreateInfoEXT - Structure specifying parameters of a newly created pipeline depth clamp control state

The `VkPipelineViewportDepthClampControlCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_depth_clamp_control
typedef struct VkPipelineViewportDepthClampControlCreateInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkDepthClampModeEXT            depthClampMode;
    const VkDepthClampRangeEXT*    pDepthClampRange;
} VkPipelineViewportDepthClampControlCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthClampMode` determines how the clamp range is determined for
each viewport.

* 
`pDepthClampRange` sets the depth clamp range for all viewports if
`depthClampMode` is
[VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](VkDepthClampModeEXT.html).

This structure extends `VkPipelineViewportStateCreateInfo` and specifies
the depth clamp range used in the pipeline.
If this structure is not provided in the next chain then
`depthClampMode` defaults to
[VK_DEPTH_CLAMP_MODE_VIEWPORT_RANGE_EXT](VkDepthClampModeEXT.html).

Valid Usage

* 
[](#VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-pDepthClampRange-09646) VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-pDepthClampRange-09646

If `depthClampMode` is
[VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](VkDepthClampModeEXT.html), and the pipeline is
not created with [VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](VkDynamicState.html), then
`pDepthClampRange` **must** be a valid pointer to a valid
`VkDepthClampRangeEXT` structure

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-sType-sType) VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLAMP_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-depthClampMode-parameter) VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-depthClampMode-parameter

 `depthClampMode` **must** be a valid [VkDepthClampModeEXT](VkDepthClampModeEXT.html) value

* 
[](#VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-pDepthClampRange-parameter) VUID-VkPipelineViewportDepthClampControlCreateInfoEXT-pDepthClampRange-parameter

 If `pDepthClampRange` is not `NULL`, `pDepthClampRange` **must** be a valid pointer to a valid [VkDepthClampRangeEXT](VkDepthClampRangeEXT.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_EXT_depth_clamp_control](VK_EXT_depth_clamp_control.html), [VkDepthClampModeEXT](VkDepthClampModeEXT.html), [VkDepthClampRangeEXT](VkDepthClampRangeEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineViewportDepthClampControlCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
