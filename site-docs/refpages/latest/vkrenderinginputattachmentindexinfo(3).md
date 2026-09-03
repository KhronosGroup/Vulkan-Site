# VkRenderingInputAttachmentIndexInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingInputAttachmentIndexInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingInputAttachmentIndexInfo - Structure specifying input attachment indices

The `VkRenderingInputAttachmentIndexInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingInputAttachmentIndexInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorAttachmentCount;
    const uint32_t*    pColorAttachmentInputIndices;
    const uint32_t*    pDepthInputAttachmentIndex;
    const uint32_t*    pStencilInputAttachmentIndex;
} VkRenderingInputAttachmentIndexInfo;

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to VkRenderingInputAttachmentIndexInfo
typedef VkRenderingInputAttachmentIndexInfo VkRenderingInputAttachmentIndexInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachmentInputIndices`.

* 
`pColorAttachmentInputIndices` is a pointer to an array of
`colorAttachmentCount` `uint32_t` values defining indices for
color attachments to be used as input attachments.

* 
`pDepthInputAttachmentIndex` is either `NULL`, or a pointer to a
`uint32_t` value defining the index for the depth attachment to be
used as an input attachment.

* 
`pStencilInputAttachmentIndex` is either `NULL`, or a pointer to a
`uint32_t` value defining the index for the stencil attachment to be
used as an input attachment.

This structure allows applications to remap attachments to different input
attachment indices.

Each element of `pColorAttachmentInputIndices` set to a value of
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) indicates that the corresponding attachment will
not be used as an input attachment in this pipeline.
Any other value in each of those elements will map the corresponding
attachment to a `InputAttachmentIndex` value defined in shader code.

If `pColorAttachmentInputIndices` is `NULL`, it is equivalent to setting
each element to its index within the array.

If `pDepthInputAttachmentIndex` or `pStencilInputAttachmentIndex`
are set to `NULL`, they map to input attachments without a
`InputAttachmentIndex` decoration.
If they point to a value of [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), it indicates that
the corresponding attachment will not be used as an input attachment in this
pipeline.
If they point to any other value it maps the corresponding attachment to a
`InputAttachmentIndex` value defined in shader code.

This structure **can** be included in the `pNext` chain of a
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) structure to set this state for a
pipeline.
If this structure is not included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`.

* 
`pColorAttachmentInputIndices` set to `NULL`.

* 
`pDepthInputAttachmentIndex` set to `NULL`.

* 
`pStencilInputAttachmentIndex` set to `NULL`.

This structure **can** be included in the `pNext` chain of a
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) structure to specify inherited state
from the primary command buffer.
If this structure is not included in the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`colorAttachmentCount`.

* 
`pColorAttachmentInputIndices` set to `NULL`.

* 
`pDepthInputAttachmentIndex` set to `NULL`.

* 
`pStencilInputAttachmentIndex` set to `NULL`.

Valid Usage

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09519) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09519

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`pColorAttachmentInputIndices` is not `NULL`, each element **must** be
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09520) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09520

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`pDepthInputAttachmentIndex` **must** be a valid pointer to a value of
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09521) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09521

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`pStencilInputAttachmentIndex` **must** be a valid pointer to a value
of [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09522) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09522

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** each be unique

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09523) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09523

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** not take the same value as the content
of `pDepthInputAttachmentIndex`

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09524) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09524

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** not take the same value as the content
of `pStencilInputAttachmentIndex`

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-colorAttachmentCount-09525) VUID-VkRenderingInputAttachmentIndexInfo-colorAttachmentCount-09525

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-12274) VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-12274

Elements of `pDepthInputAttachmentIndex`,
`pStencilInputAttachmentIndex`, and
`pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** be less than
[    `maxPerStageDescriptorInputAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxPerStageDescriptorInputAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-sType-sType) VUID-VkRenderingInputAttachmentIndexInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-parameter

 If `colorAttachmentCount` is not `0`, and `pColorAttachmentInputIndices` is not `NULL`, `pColorAttachmentInputIndices` **must** be a valid pointer to an array of `colorAttachmentCount` `uint32_t` values

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-parameter

 If `pDepthInputAttachmentIndex` is not `NULL`, `pDepthInputAttachmentIndex` **must** be a valid pointer to a valid `uint32_t` value

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pStencilInputAttachmentIndex-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pStencilInputAttachmentIndex-parameter

 If `pStencilInputAttachmentIndex` is not `NULL`, `pStencilInputAttachmentIndex` **must** be a valid pointer to a valid `uint32_t` value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html), [vkCmdSetRenderingInputAttachmentIndices](vkCmdSetRenderingInputAttachmentIndices.html), [vkCmdSetRenderingInputAttachmentIndices](vkCmdSetRenderingInputAttachmentIndices.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/interfaces.html#VkRenderingInputAttachmentIndexInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
