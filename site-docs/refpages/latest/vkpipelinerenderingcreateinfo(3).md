# VkPipelineRenderingCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRenderingCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRenderingCreateInfo - Structure specifying attachment formats

The `VkPipelineRenderingCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineRenderingCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewMask;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkPipelineRenderingCreateInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkPipelineRenderingCreateInfo
typedef VkPipelineRenderingCreateInfo VkPipelineRenderingCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewMask` is a bitfield of view indices describing which views are
active during rendering.
It **must** match [VkRenderingInfo](VkRenderingInfo.html)::`viewMask` when rendering.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](VkFormat.html)
values defining the format of color attachments used in this pipeline.

* 
`depthAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the depth attachment used in this pipeline.

* 
`stencilAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the stencil attachment used in this pipeline.

When a pipeline is created without a [VkRenderPass](VkRenderPass.html), if the `pNext`
chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) includes this structure, it
specifies the view mask and format of attachments used for rendering.
If this structure is not specified, and the pipeline does not include a
[VkRenderPass](VkRenderPass.html), `viewMask` and `colorAttachmentCount` are `0`,
and `depthAttachmentFormat` and `stencilAttachmentFormat` are
[VK_FORMAT_UNDEFINED](VkFormat.html).
If a graphics pipeline is created with a valid [VkRenderPass](VkRenderPass.html),
parameters of this structure are ignored.

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](VkFormat.html), it
indicates that the corresponding attachment is unused within the render
pass.
Valid formats indicate that an attachment **can** be used - but it is still
valid to set the attachment to `NULL` when beginning rendering.

If the render pass is going to be used with an external format resolve
attachment, a [VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure **must** also be included
in the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), defining the
external format of the resolve attachment that will be used.

Valid Usage

* 
[](#VUID-VkPipelineRenderingCreateInfo-colorAttachmentCount-09533) VUID-VkPipelineRenderingCreateInfo-colorAttachmentCount-09533

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRenderingCreateInfo-sType-sType) VUID-VkPipelineRenderingCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineRenderingCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
