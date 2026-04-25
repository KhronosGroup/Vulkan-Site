# VkFramebufferAttachmentsCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFramebufferAttachmentsCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFramebufferAttachmentsCreateInfo - Structure specifying parameters of images that will be used with a framebuffer

The `VkFramebufferAttachmentsCreateInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkFramebufferAttachmentsCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   attachmentImageInfoCount;
    const VkFramebufferAttachmentImageInfo*    pAttachmentImageInfos;
} VkFramebufferAttachmentsCreateInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkFramebufferAttachmentsCreateInfo
typedef VkFramebufferAttachmentsCreateInfo VkFramebufferAttachmentsCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentImageInfoCount` is the number of attachments being
described.

* 
`pAttachmentImageInfos` is a pointer to an array of
[VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html) structures, each structure
describing a number of parameters of the corresponding attachment in a
render pass instance.

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferAttachmentsCreateInfo-sType-sType) VUID-VkFramebufferAttachmentsCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkFramebufferAttachmentsCreateInfo-pAttachmentImageInfos-parameter) VUID-VkFramebufferAttachmentsCreateInfo-pAttachmentImageInfos-parameter

 If `attachmentImageInfoCount` is not `0`, `pAttachmentImageInfos` **must** be a valid pointer to an array of `attachmentImageInfoCount` valid [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)

[VK_KHR_imageless_framebuffer](VK_KHR_imageless_framebuffer.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkFramebufferAttachmentsCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
