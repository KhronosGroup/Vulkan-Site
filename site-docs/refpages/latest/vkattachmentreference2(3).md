# VkAttachmentReference2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentReference2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentReference2 - Structure specifying an attachment reference

The `VkAttachmentReference2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentReference2 {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              attachment;
    VkImageLayout         layout;
    VkImageAspectFlags    aspectMask;
} VkAttachmentReference2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkAttachmentReference2
typedef VkAttachmentReference2 VkAttachmentReference2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachment` is either an integer value identifying an attachment at
the corresponding index in
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)::`pAttachments`, or
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) to signify that this attachment is not used.

* 
`layout` is a [VkImageLayout](VkImageLayout.html) value specifying the layout the
attachment uses during the subpass.

* 
`aspectMask` is a mask of which aspect(s) **can** be accessed within
the specified subpass as an input attachment.

Parameters defined by this structure with the same name as those in
[VkAttachmentReference](VkAttachmentReference.html) have the identical effect to those parameters.

`aspectMask` is ignored when this structure is used to describe anything
other than an input attachment reference.

If the [`separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is enabled, and `attachment`
has a depth/stencil format, `layout` **can** be set to a layout that only
specifies the layout of the depth aspect.

If `layout` only specifies the layout of the depth aspect of the
attachment, the layout of the stencil aspect is specified by the
`stencilLayout` member of a [VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html)
structure included in the `pNext` chain.
Otherwise, `layout` describes the layout for all relevant image aspects.

Valid Usage

* 
[](#VUID-VkAttachmentReference2-layout-03077) VUID-VkAttachmentReference2-layout-03077

    If `attachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `layout`
    **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html), or
    [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference2-separateDepthStencilLayouts-03313) VUID-VkAttachmentReference2-separateDepthStencilLayouts-03313

If the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled, and
`attachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `layout` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),

* 
[](#VUID-VkAttachmentReference2-synchronization2-06910) VUID-VkAttachmentReference2-synchronization2-06910

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference2-attachmentFeedbackLoopLayout-07311) VUID-VkAttachmentReference2-attachmentFeedbackLoopLayout-07311

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference2-dynamicRenderingLocalRead-09546) VUID-VkAttachmentReference2-dynamicRenderingLocalRead-09546

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, `layout`
**must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReference2-sType-sType) VUID-VkAttachmentReference2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2](VkStructureType.html)

* 
[](#VUID-VkAttachmentReference2-pNext-pNext) VUID-VkAttachmentReference2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html)

* 
[](#VUID-VkAttachmentReference2-sType-unique) VUID-VkAttachmentReference2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAttachmentReference2-layout-parameter) VUID-VkAttachmentReference2-layout-parameter

 `layout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html), [VkSubpassDescription2](VkSubpassDescription2.html), [VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentReference2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
