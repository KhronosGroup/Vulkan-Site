# VkPipelineViewportStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportStateCreateInfo - Structure specifying parameters of a newly created pipeline viewport state

The `VkPipelineViewportStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineViewportStateCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkPipelineViewportStateCreateFlags    flags;
    uint32_t                              viewportCount;
    const VkViewport*                     pViewports;
    uint32_t                              scissorCount;
    const VkRect2D*                       pScissors;
} VkPipelineViewportStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`viewportCount` is the number of viewports used by the pipeline.

* 
`pViewports` is a pointer to an array of [VkViewport](VkViewport.html)
structures, defining the viewport transforms.
If the viewport state is dynamic, this member is ignored.

* 
`scissorCount` is the number of [scissors](../../../../spec/latest/chapters/fragops.html#fragops-scissor) and
**must** match the number of viewports.

* 
`pScissors` is a pointer to an array of [VkRect2D](VkRect2D.html) structures
defining the rectangular bounds of the scissor for the corresponding
viewport.
If the scissor state is dynamic, this member is ignored.

Valid Usage

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-01216) VUID-VkPipelineViewportStateCreateInfo-viewportCount-01216

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** not be greater than `1`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-01217) VUID-VkPipelineViewportStateCreateInfo-scissorCount-01217

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `scissorCount` **must** not be greater than `1`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-01218) VUID-VkPipelineViewportStateCreateInfo-viewportCount-01218

`viewportCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-01219) VUID-VkPipelineViewportStateCreateInfo-scissorCount-01219

`scissorCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-x-02821) VUID-VkPipelineViewportStateCreateInfo-x-02821

The `x` and `y` members of `offset` member of any element of
`pScissors` **must** be greater than or equal to `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-offset-02822) VUID-VkPipelineViewportStateCreateInfo-offset-02822

Evaluation of (`offset.x` +  `extent.width`) **must** not
cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-offset-02823) VUID-VkPipelineViewportStateCreateInfo-offset-02823

Evaluation of (`offset.y` +  `extent.height`) **must**
not cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-04134) VUID-VkPipelineViewportStateCreateInfo-scissorCount-04134

If `scissorCount` and `viewportCount` are both not dynamic, then
`scissorCount` and `viewportCount` **must** be identical

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-04135) VUID-VkPipelineViewportStateCreateInfo-viewportCount-04135

If the graphics pipeline is being created with
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) set then `viewportCount`
**must** be `0`, otherwise
`viewportCount` **must** be greater than `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-04136) VUID-VkPipelineViewportStateCreateInfo-scissorCount-04136

If the graphics pipeline is being created with
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) set then `scissorCount`
**must** be `0`, otherwise
`scissorCount` **must** be greater than `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportWScalingEnable-01726) VUID-VkPipelineViewportStateCreateInfo-viewportWScalingEnable-01726

If the `viewportWScalingEnable` member of a
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) structure included in
the `pNext` chain is [VK_TRUE](VK_TRUE.html), the `viewportCount` member
of the [VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) structure **must**
be greater than or equal to
[VkPipelineViewportStateCreateInfo](#)::`viewportCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-sType-sType) VUID-VkPipelineViewportStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-pNext-pNext) VUID-VkPipelineViewportStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html), [VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html), [VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html), [VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html), [VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html), [VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html), or [VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-sType-unique) VUID-VkPipelineViewportStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineViewportStateCreateInfo-flags-zerobitmask) VUID-VkPipelineViewportStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineViewportStateCreateFlags](VkPipelineViewportStateCreateFlags.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html), [VkViewport](VkViewport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPipelineViewportStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
