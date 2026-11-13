# VkAttachmentDescriptionStencilLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentDescriptionStencilLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentDescriptionStencilLayout - Structure specifying an attachment description

The `VkAttachmentDescriptionStencilLayout` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentDescriptionStencilLayout {
    VkStructureType    sType;
    void*              pNext;
    VkImageLayout      stencilInitialLayout;
    VkImageLayout      stencilFinalLayout;
} VkAttachmentDescriptionStencilLayout;

// Provided by VK_KHR_separate_depth_stencil_layouts
// Equivalent to VkAttachmentDescriptionStencilLayout
typedef VkAttachmentDescriptionStencilLayout VkAttachmentDescriptionStencilLayoutKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilInitialLayout` is the layout the stencil aspect of the
attachment image subresource will be in when a render pass instance
begins.

* 
`stencilFinalLayout` is the layout the stencil aspect of the
attachment image subresource will be transitioned to when a render pass
instance ends.

Valid Usage

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-03308) VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-03308

`stencilInitialLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03309) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03309

`stencilFinalLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03310) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03310

    `stencilFinalLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-sType-sType) VUID-VkAttachmentDescriptionStencilLayout-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT](VkStructureType.html)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-parameter) VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-parameter

 `stencilInitialLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-parameter) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-parameter

 `stencilFinalLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentDescription2](VkAttachmentDescription2.html)

[VK_KHR_separate_depth_stencil_layouts](VK_KHR_separate_depth_stencil_layouts.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentDescriptionStencilLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
