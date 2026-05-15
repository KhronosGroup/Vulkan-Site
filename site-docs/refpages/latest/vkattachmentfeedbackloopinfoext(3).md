# VkAttachmentFeedbackLoopInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentFeedbackLoopInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentFeedbackLoopInfoEXT - Structure specifying whether feedback loop is enabled for an attachment

To [enable feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) for an attachment, the
`VkAttachmentFeedbackLoopInfoEXT` structure **can** be added to the
`pNext` chain of [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html).

The `VkAttachmentFeedbackLoopInfoEXT` structure is defined as:

// Provided by VK_KHR_unified_image_layouts with VK_EXT_attachment_feedback_loop_layout and (VK_VERSION_1_3 or VK_KHR_dynamic_rendering)
typedef struct VkAttachmentFeedbackLoopInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           feedbackLoopEnable;
} VkAttachmentFeedbackLoopInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`feedbackLoopEnable` specifies that
[feedback loop is enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) for the attachment
identified by [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)::`imageView`.

Valid Usage

* 
[](#VUID-VkAttachmentFeedbackLoopInfoEXT-unifiedImageLayouts-10782) VUID-VkAttachmentFeedbackLoopInfoEXT-unifiedImageLayouts-10782

If the [`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts)
feature is not enabled, `feedbackLoopEnable` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentFeedbackLoopInfoEXT-sType-sType) VUID-VkAttachmentFeedbackLoopInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_FEEDBACK_LOOP_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

[VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_KHR_unified_image_layouts](VK_KHR_unified_image_layouts.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentFeedbackLoopInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
