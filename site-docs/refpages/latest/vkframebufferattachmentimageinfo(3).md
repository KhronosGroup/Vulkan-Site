# VkFramebufferAttachmentImageInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFramebufferAttachmentImageInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFramebufferAttachmentImageInfo - Structure specifying parameters of an image that will be used with a framebuffer

The `VkFramebufferAttachmentImageInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkFramebufferAttachmentImageInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkImageCreateFlags    flags;
    VkImageUsageFlags     usage;
    uint32_t              width;
    uint32_t              height;
    uint32_t              layerCount;
    uint32_t              viewFormatCount;
    const VkFormat*       pViewFormats;
} VkFramebufferAttachmentImageInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkFramebufferAttachmentImageInfo
typedef VkFramebufferAttachmentImageInfo VkFramebufferAttachmentImageInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](VkImageCreateFlagBits.html), matching the
value of [VkImageCreateInfo](VkImageCreateInfo.html)::`flags` used to create an image
that will be used with this framebuffer.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html), matching the
value of [VkImageCreateInfo](VkImageCreateInfo.html)::`usage` used to create an image
used with this framebuffer.

* 
`width` is the width of the image view used for rendering.

* 
`height` is the height of the image view used for rendering.

* 
`layerCount` is the number of array layers of the image view used
for rendering.

* 
`viewFormatCount` is the number of entries in the `pViewFormats`
array, matching the value of
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` used to create
an image used with this framebuffer.

* 
`pViewFormats` is a pointer to an array of [VkFormat](VkFormat.html) values
specifying all of the formats which **can** be used when creating views of
the image, matching the value of
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats` used to create an
image used with this framebuffer.

Images that **can** be used with the framebuffer when beginning a render pass,
as specified by [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html), **must** be created with
parameters that are identical to those specified here.

Valid Usage

* 
[](#VUID-VkFramebufferAttachmentImageInfo-viewFormatCount-09536) VUID-VkFramebufferAttachmentImageInfo-viewFormatCount-09536

If `viewFormatCount` is not 0,
and the render pass is not being used with an external format resolve
attachment,
each element of `pViewFormats` **must** not be
[VK_FORMAT_UNDEFINED](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferAttachmentImageInfo-sType-sType) VUID-VkFramebufferAttachmentImageInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO](VkStructureType.html)

* 
[](#VUID-VkFramebufferAttachmentImageInfo-pNext-pNext) VUID-VkFramebufferAttachmentImageInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFramebufferAttachmentImageInfo-flags-parameter) VUID-VkFramebufferAttachmentImageInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) values

* 
[](#VUID-VkFramebufferAttachmentImageInfo-usage-parameter) VUID-VkFramebufferAttachmentImageInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkFramebufferAttachmentImageInfo-usage-requiredbitmask) VUID-VkFramebufferAttachmentImageInfo-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkFramebufferAttachmentImageInfo-pViewFormats-parameter) VUID-VkFramebufferAttachmentImageInfo-pViewFormats-parameter

 If `viewFormatCount` is not `0`, `pViewFormats` **must** be a valid pointer to an array of `viewFormatCount` valid [VkFormat](VkFormat.html) values

[VK_KHR_imageless_framebuffer](VK_KHR_imageless_framebuffer.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkFormat](VkFormat.html), [VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkFramebufferAttachmentImageInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
