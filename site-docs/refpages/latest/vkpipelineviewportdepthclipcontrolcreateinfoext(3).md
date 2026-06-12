# VkPipelineViewportDepthClipControlCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportDepthClipControlCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportDepthClipControlCreateInfoEXT - Structure specifying parameters of a newly created pipeline depth clip control state

The `VkPipelineViewportDepthClipControlCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_depth_clip_control
typedef struct VkPipelineViewportDepthClipControlCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           negativeOneToOne;
} VkPipelineViewportDepthClipControlCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`negativeOneToOne` sets the zm in the *view volume* to
-wc

Valid Usage

* 
[](#VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-negativeOneToOne-06470) VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-negativeOneToOne-06470

If the [`depthClipControl`](../../../../spec/latest/chapters/features.html#features-depthClipControl) feature is
not enabled, `negativeOneToOne` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-sType-sType) VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLIP_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_EXT_depth_clip_control](VK_EXT_depth_clip_control.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPipelineViewportDepthClipControlCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
