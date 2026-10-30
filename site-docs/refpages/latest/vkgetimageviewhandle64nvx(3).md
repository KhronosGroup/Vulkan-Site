# vkGetImageViewHandle64NVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageViewHandle64NVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageViewHandle64NVX - Get the 64-bit handle for an image view for a specific descriptor type

To get the 64-bit handle for an image view, call:

// Provided by VK_NVX_image_view_handle
uint64_t vkGetImageViewHandle64NVX(
    VkDevice                                    device,
    const VkImageViewHandleInfoNVX*             pInfo);

* 
`device` is the logical device that owns the image view.

* 
`pInfo` describes the image view to query and type of handle.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewHandle64NVX-device-parameter) VUID-vkGetImageViewHandle64NVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageViewHandle64NVX-pInfo-parameter) VUID-vkGetImageViewHandle64NVX-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewHandleInfoNVX](VkImageViewHandleInfoNVX.html) structure

[VK_NVX_image_view_handle](VK_NVX_image_view_handle.html), [VkDevice](VkDevice.html), [VkImageViewHandleInfoNVX](VkImageViewHandleInfoNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageViewHandle64NVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
