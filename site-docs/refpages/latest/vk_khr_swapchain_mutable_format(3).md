# VK_KHR_swapchain_mutable_format(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_swapchain_mutable_format.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_swapchain_mutable_format](#VK_KHR_swapchain_mutable_format)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_swapchain_mutable_format - device extension

**Name String**

`VK_KHR_swapchain_mutable_format`

**Extension Type**

Device extension

**Registered Extension Number**

201

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

     [VK_KHR_maintenance2](VK_KHR_maintenance2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

     [VK_KHR_image_format_list](VK_KHR_image_format_list.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_swapchain_mutable_format] @drakos-amd%0A*Here describe the issue or question you have about the VK_KHR_swapchain_mutable_format extension*)

**Last Modified Date**

2018-03-28

**IP Status**

No known IP claims.

**Contributors**

* 
Faith Ekstrand, Intel

* 
Jan-Harald Fredriksen, ARM

* 
Jesse Hall, Google

* 
Daniel Rakos, AMD

* 
Ray Smith, ARM

This extension allows processing of swapchain images as different formats to
that used by the window system, which is particularly useful for switching
between sRGB and linear RGB formats.

It adds a new swapchain creation flag that enables creating image views from
presentable images with a different format than the one used to create the
swapchain.

* 
`VK_KHR_SWAPCHAIN_MUTABLE_FORMAT_EXTENSION_NAME`

* 
`VK_KHR_SWAPCHAIN_MUTABLE_FORMAT_SPEC_VERSION`

* 
Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

1) Are there any new capabilities needed?

**RESOLVED**: No.
It is expected that all implementations exposing this extension support
swapchain image format mutability.

2) Do we need a separate `VK_SWAPCHAIN_CREATE_EXTENDED_USAGE_BIT_KHR`?

**RESOLVED**: No.
This extension requires `VK_KHR_maintenance2` and presentable images of
swapchains created with [VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) are
created internally in a way equivalent to specifying both
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) and
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR](VkImageCreateFlagBits.html).

3) Do we need a separate structure to allow specifying an image format list
for swapchains?

**RESOLVED**: No.
We simply use the same [VkImageFormatListCreateInfoKHR](VkImageFormatListCreateInfo.html) structure
introduced by `VK_KHR_image_format_list`.
The structure is required to be included in the `pNext` chain of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) for swapchains created with
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html).

* 
Revision 1, 2018-03-28 (Daniel Rakos)

Internal revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_swapchain_mutable_format).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
