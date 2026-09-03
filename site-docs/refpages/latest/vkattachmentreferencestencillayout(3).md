# VkAttachmentReferenceStencilLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentReferenceStencilLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentReferenceStencilLayout - Structure specifying an attachment description

The `VkAttachmentReferenceStencilLayout` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentReferenceStencilLayout {
    VkStructureType    sType;
    void*              pNext;
    VkImageLayout      stencilLayout;
} VkAttachmentReferenceStencilLayout;

// Provided by VK_KHR_separate_depth_stencil_layouts
// Equivalent to VkAttachmentReferenceStencilLayout
typedef VkAttachmentReferenceStencilLayout VkAttachmentReferenceStencilLayoutKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilLayout` is a [VkImageLayout](VkImageLayout.html) value specifying the layout
the stencil aspect of the attachment uses during the subpass.

Valid Usage

* 
[](#VUID-VkAttachmentReferenceStencilLayout-stencilLayout-03318) VUID-VkAttachmentReferenceStencilLayout-stencilLayout-03318

`stencilLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
[VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html),
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReferenceStencilLayout-sType-sType) VUID-VkAttachmentReferenceStencilLayout-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT](VkStructureType.html)

* 
[](#VUID-VkAttachmentReferenceStencilLayout-stencilLayout-parameter) VUID-VkAttachmentReferenceStencilLayout-stencilLayout-parameter

 `stencilLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentReference2](VkAttachmentReference2.html)

[VK_KHR_separate_depth_stencil_layouts](VK_KHR_separate_depth_stencil_layouts.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentReferenceStencilLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
