# VkCommandBufferInheritanceRenderingInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceRenderingInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceRenderingInfo - Structure specifying command buffer inheritance info for dynamic render pass instances

The `VkCommandBufferInheritanceRenderingInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCommandBufferInheritanceRenderingInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkRenderingFlags         flags;
    uint32_t                 viewMask;
    uint32_t                 colorAttachmentCount;
    const VkFormat*          pColorAttachmentFormats;
    VkFormat                 depthAttachmentFormat;
    VkFormat                 stencilAttachmentFormat;
    VkSampleCountFlagBits    rasterizationSamples;
} VkCommandBufferInheritanceRenderingInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkCommandBufferInheritanceRenderingInfo
typedef VkCommandBufferInheritanceRenderingInfo VkCommandBufferInheritanceRenderingInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`flags` is a bitmask of [VkRenderingFlagBits](VkRenderingFlagBits.html) used by the render
pass instance.

* 
`viewMask` is the view mask used for rendering.

* 
`colorAttachmentCount` is the number of color attachments specified
in the render pass instance.

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](VkFormat.html)
values defining the format of color attachments.

* 
`depthAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the depth attachment.

* 
`stencilAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the stencil attachment.

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) specifying
the number of samples used in rasterization.

If the `pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
`VkCommandBufferInheritanceRenderingInfo` structure, then that structure
controls parameters of dynamic render pass instances that the
[VkCommandBuffer](VkCommandBuffer.html) **can** be executed within.
If [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::`renderPass` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) is not specified in
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`flags`, parameters of this structure
are ignored.

If `colorAttachmentCount` is `0` and the
[`variableMultisampleRate`](../../../../spec/latest/chapters/features.html#features-variableMultisampleRate) feature
is enabled, `rasterizationSamples` is ignored.

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](VkFormat.html), it
indicates that the corresponding attachment is unused within the render pass
and writes to those attachments are discarded.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-colorAttachmentCount-06004) VUID-VkCommandBufferInheritanceRenderingInfo-colorAttachmentCount-06004

If `colorAttachmentCount` is not `0`, `rasterizationSamples`
**must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-variableMultisampleRate-06005) VUID-VkCommandBufferInheritanceRenderingInfo-variableMultisampleRate-06005

If the [    `variableMultisampleRate`](../../../../spec/latest/chapters/features.html#features-variableMultisampleRate) feature is not enabled,
`rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html)
value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06540) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06540

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format that includes a depth component

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06007) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06007

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format with [potential format    features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-06492) VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-06492

If any element of `pColorAttachmentFormats` is not
[VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format with
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
, or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html) if the
[`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment) feature
is enabled

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06541) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06541

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format that includes a stencil aspect

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06199) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06199

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format with [potential format    features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06200) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06200

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html) and
`stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html),
`depthAttachmentFormat` **must** equal `stencilAttachmentFormat`

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-multiview-06008) VUID-VkCommandBufferInheritanceRenderingInfo-multiview-06008

If the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-viewMask-06009) VUID-VkCommandBufferInheritanceRenderingInfo-viewMask-06009

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxMultiviewViewCount)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-sType-sType) VUID-VkCommandBufferInheritanceRenderingInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-flags-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingFlagBits](VkRenderingFlagBits.html) values

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachmentFormats` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkFormat](VkFormat.html) values

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-parameter

 `depthAttachmentFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-parameter

 `stencilAttachmentFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-rasterizationSamples-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-rasterizationSamples-parameter

 If `rasterizationSamples` is not `0`, `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkFormat](VkFormat.html), [VkRenderingFlags](VkRenderingFlags.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
