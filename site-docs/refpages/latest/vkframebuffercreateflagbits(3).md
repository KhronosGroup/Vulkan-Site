# VkFramebufferCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFramebufferCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFramebufferCreateFlagBits - Bitmask specifying framebuffer properties

Bits which **can** be set in [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags`,
specifying options for framebuffers, are:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkFramebufferCreateFlagBits {
  // Provided by VK_VERSION_1_2
    VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT = 0x00000001,
  // Provided by VK_KHR_imageless_framebuffer
    VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT_KHR = VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT,
} VkFramebufferCreateFlagBits;

* 
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#) specifies that image views are
not specified, and only attachment compatibility information will be
provided via a [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html) structure.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFramebufferCreateFlags](VkFramebufferCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkFramebufferCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
