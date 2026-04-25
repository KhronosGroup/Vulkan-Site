# VkAttachmentReference(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentReference.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentReference - Structure specifying an attachment reference

The `VkAttachmentReference` structure is defined as:

|  | This functionality is superseded by [VkAttachmentReference2](../../../../spec/latest/chapters/renderpass.html#VkAttachmentReference2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkAttachmentReference {
    uint32_t         attachment;
    VkImageLayout    layout;
} VkAttachmentReference;

* 
`attachment` is either an integer value identifying an attachment at
the corresponding index in
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)::`pAttachments`, or
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) to signify that this attachment is not used.

* 
`layout` is a [VkImageLayout](VkImageLayout.html) value specifying the layout the
attachment uses during the subpass.

Valid Usage

* 
[](#VUID-VkAttachmentReference-layout-03077) VUID-VkAttachmentReference-layout-03077

    If `attachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `layout`
    **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html), or
    [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference-separateDepthStencilLayouts-03313) VUID-VkAttachmentReference-separateDepthStencilLayouts-03313

If the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled, and
`attachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), `layout` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),

* 
[](#VUID-VkAttachmentReference-synchronization2-06910) VUID-VkAttachmentReference-synchronization2-06910

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference-attachmentFeedbackLoopLayout-07311) VUID-VkAttachmentReference-attachmentFeedbackLoopLayout-07311

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkAttachmentReference-dynamicRenderingLocalRead-09546) VUID-VkAttachmentReference-dynamicRenderingLocalRead-09546

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, `layout`
**must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReference-layout-parameter) VUID-VkAttachmentReference-layout-parameter

 `layout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageLayout](VkImageLayout.html), [VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html), [VkSubpassDescription](VkSubpassDescription.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentReference).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
