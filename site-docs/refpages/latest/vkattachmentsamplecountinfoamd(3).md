# VkAttachmentSampleCountInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentSampleCountInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentSampleCountInfoAMD - Structure specifying command buffer inheritance info for dynamic render pass instances

The
`VkAttachmentSampleCountInfoAMD`
or
`VkAttachmentSampleCountInfoNV`
structure is defined as:

// Provided by VK_AMD_mixed_attachment_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkAttachmentSampleCountInfoAMD {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        colorAttachmentCount;
    const VkSampleCountFlagBits*    pColorAttachmentSamples;
    VkSampleCountFlagBits           depthStencilAttachmentSamples;
} VkAttachmentSampleCountInfoAMD;

// Provided by VK_NV_framebuffer_mixed_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
// Equivalent to VkAttachmentSampleCountInfoAMD
typedef VkAttachmentSampleCountInfoAMD VkAttachmentSampleCountInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`colorAttachmentCount` is the number of color attachments specified
in a render pass instance.

* 
`pColorAttachmentSamples` is a pointer to an array of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) values defining the sample count of color
attachments.

* 
`depthStencilAttachmentSamples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html)
value defining the sample count of a depth/stencil attachment.

If [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::`renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)
is specified in [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`flags`, and the
`pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes
`VkAttachmentSampleCountInfoAMD`, then this structure defines the sample
counts of each attachment within the render pass instance.
If `VkAttachmentSampleCountInfoAMD` is not included, the value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples` is
used as the sample count for each attachment.
If [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::`renderPass` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) is not specified in
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`flags`, parameters of this structure
are ignored.

`VkAttachmentSampleCountInfoAMD` **can** also be included in the
`pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html).
When a graphics pipeline is created without a [VkRenderPass](VkRenderPass.html), if this
structure is included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it specifies the sample count of
attachments used for rendering.
If this structure is not specified, and the pipeline does not include a
[VkRenderPass](VkRenderPass.html), the value of
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples` is
used as the sample count for each attachment.
If a graphics pipeline is created with a valid [VkRenderPass](VkRenderPass.html),
parameters of this structure are ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentSampleCountInfoAMD-sType-sType) VUID-VkAttachmentSampleCountInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_AMD](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkAttachmentSampleCountInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
