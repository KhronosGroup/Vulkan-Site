# VkPipelineViewportExclusiveScissorStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportExclusiveScissorStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportExclusiveScissorStateCreateInfoNV - Structure specifying parameters controlling exclusive scissor testing

The `VkPipelineViewportExclusiveScissorStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_scissor_exclusive
typedef struct VkPipelineViewportExclusiveScissorStateCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           exclusiveScissorCount;
    const VkRect2D*    pExclusiveScissors;
} VkPipelineViewportExclusiveScissorStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`exclusiveScissorCount` is the number of exclusive scissor
rectangles.

* 
`pExclusiveScissors` is a pointer to an array of [VkRect2D](VkRect2D.html)
structures defining exclusive scissor rectangles.

If the [VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](VkDynamicState.html) dynamic state is enabled
for a pipeline, the `pExclusiveScissors` member is ignored.

When this structure is included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it defines parameters of the exclusive
scissor test.
If this structure is not included in the `pNext` chain, it is equivalent
to specifying this structure with an `exclusiveScissorCount` of `0`.

Valid Usage

* 
[](#VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02027) VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02027

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `exclusiveScissorCount` **must** be `0` or `1`

* 
[](#VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02028) VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02028

`exclusiveScissorCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02029) VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-exclusiveScissorCount-02029

`exclusiveScissorCount` **must** be `0` or greater than or equal to the
`viewportCount` member of [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportExclusiveScissorStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_EXCLUSIVE_SCISSOR_STATE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
