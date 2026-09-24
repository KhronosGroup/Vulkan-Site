# VkAttachmentDescriptionFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentDescriptionFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentDescriptionFlagBits - Bitmask specifying additional properties of an attachment

Bits which **can** be set in [VkAttachmentDescription](VkAttachmentDescription.html)::`flags`,
describing additional properties of the attachment, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentDescriptionFlagBits {
    VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT = 0x00000001,
  // Provided by VK_KHR_maintenance10
    VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_maintenance10
    VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR = 0x00000004,
} VkAttachmentDescriptionFlagBits;

* 
[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#) specifies that the
attachment aliases the same device memory as other attachments.

* 
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#)
specifies that resolve operations happening to an sRGB encoded
attachment **must** not convert samples from nonlinear to linear before
averaging.

* 
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#)
specifies that resolve operations happening to an sRGB encoded
attachment **must** convert samples from nonlinear to linear before
averaging.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescriptionFlags](VkAttachmentDescriptionFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentDescriptionFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
