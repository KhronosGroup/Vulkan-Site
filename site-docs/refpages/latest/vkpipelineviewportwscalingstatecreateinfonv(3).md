# VkPipelineViewportWScalingStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportWScalingStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportWScalingStateCreateInfoNV - Structure specifying parameters of a newly created pipeline viewport W scaling state

The `VkPipelineViewportWScalingStateCreateInfoNV` structure is defined
as:

// Provided by VK_NV_clip_space_w_scaling
typedef struct VkPipelineViewportWScalingStateCreateInfoNV {
    VkStructureType                sType;
    const void*                    pNext;
    VkBool32                       viewportWScalingEnable;
    uint32_t                       viewportCount;
    const VkViewportWScalingNV*    pViewportWScalings;
} VkPipelineViewportWScalingStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewportWScalingEnable` controls whether viewport **W** scaling is
enabled.

* 
`viewportCount` is the number of viewports used by **W** scaling, and
**must** match the number of viewports in the pipeline if viewport **W**
scaling is enabled.

* 
`pViewportWScalings` is a pointer to an array of
[VkViewportWScalingNV](VkViewportWScalingNV.html) structures defining the **W** scaling
parameters for the corresponding viewports.
If the viewport **W** scaling state is dynamic, this member is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportWScalingStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportWScalingStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_W_SCALING_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineViewportWScalingStateCreateInfoNV-viewportCount-arraylength) VUID-VkPipelineViewportWScalingStateCreateInfoNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkViewportWScalingNV](VkViewportWScalingNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
