# VK_KHR_imageless_framebuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_imageless_framebuffer.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_imageless_framebuffer](#VK_KHR_imageless_framebuffer)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_imageless_framebuffer - device extension

**Name String**

`VK_KHR_imageless_framebuffer`

**Extension Type**

Device extension

**Registered Extension Number**

109

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

             [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

             and

             [VK_KHR_maintenance2](VK_KHR_maintenance2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_image_format_list](VK_KHR_image_format_list.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Tobias Hector [tobias](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_imageless_framebuffer] @tobias%0A*Here describe the issue or question you have about the VK_KHR_imageless_framebuffer extension*)

**Last Modified Date**

2018-12-14

**Contributors**

* 
Tobias Hector

* 
Graham Wihlidal

This extension allows framebuffers to be created without the need for
creating images first, allowing more flexibility in how they are used, and
avoiding the need for many of the confusing compatibility rules.

Framebuffers are now created with a small amount of additional metadata
about the image views that will be used in
[VkFramebufferAttachmentsCreateInfoKHR](VkFramebufferAttachmentsCreateInfo.html), and the actual image views are
provided at render pass begin time via
[VkRenderPassAttachmentBeginInfoKHR](VkRenderPassAttachmentBeginInfo.html).

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[VkFramebufferAttachmentImageInfoKHR](VkFramebufferAttachmentImageInfo.html)

* 
Extending [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html):

[VkFramebufferAttachmentsCreateInfoKHR](VkFramebufferAttachmentsCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImagelessFramebufferFeaturesKHR](VkPhysicalDeviceImagelessFramebufferFeatures.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html):

* 
[VkRenderPassAttachmentBeginInfoKHR](VkRenderPassAttachmentBeginInfo.html)

* 
`VK_KHR_IMAGELESS_FRAMEBUFFER_EXTENSION_NAME`

* 
`VK_KHR_IMAGELESS_FRAMEBUFFER_SPEC_VERSION`

* 
Extending [VkFramebufferCreateFlagBits](VkFramebufferCreateFlagBits.html):

[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT_KHR](VkFramebufferCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2018-12-14 (Tobias Hector)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_imageless_framebuffer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
