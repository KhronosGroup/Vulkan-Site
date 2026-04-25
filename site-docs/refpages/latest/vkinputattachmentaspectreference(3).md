# VkInputAttachmentAspectReference(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInputAttachmentAspectReference.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInputAttachmentAspectReference - Structure specifying a subpass/input attachment pair and an aspect mask that **can** be read.

The `VkInputAttachmentAspectReference` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_1
typedef struct VkInputAttachmentAspectReference {
    uint32_t              subpass;
    uint32_t              inputAttachmentIndex;
    VkImageAspectFlags    aspectMask;
} VkInputAttachmentAspectReference;

// Provided by VK_KHR_maintenance2
// Equivalent to VkInputAttachmentAspectReference
typedef VkInputAttachmentAspectReference VkInputAttachmentAspectReferenceKHR;

* 
`subpass` is an index into the `pSubpasses` array of the parent
`VkRenderPassCreateInfo` structure.

* 
`inputAttachmentIndex` is an index into the `pInputAttachments`
of the specified subpass.

* 
`aspectMask` is a mask of which aspect(s) **can** be accessed within
the specified subpass.

This structure specifies an aspect mask for a specific input attachment of a
specific subpass in the render pass.

`subpass` and `inputAttachmentIndex` index into the render pass as:

pCreateInfo->pSubpasses[subpass].pInputAttachments[inputAttachmentIndex]

Valid Usage

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-01964) VUID-VkInputAttachmentAspectReference-aspectMask-01964

`aspectMask` **must** not include [VK_IMAGE_ASPECT_METADATA_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-02250) VUID-VkInputAttachmentAspectReference-aspectMask-02250

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

Valid Usage (Implicit)

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-parameter) VUID-VkInputAttachmentAspectReference-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html) values

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-requiredbitmask) VUID-VkInputAttachmentAspectReference-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkInputAttachmentAspectReference).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
