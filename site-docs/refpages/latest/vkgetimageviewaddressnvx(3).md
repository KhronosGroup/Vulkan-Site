# vkGetImageViewAddressNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageViewAddressNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageViewAddressNVX - Get the device address of an image view

To get the device address for an image view, call:

// Provided by VK_NVX_image_view_handle
VkResult vkGetImageViewAddressNVX(
    VkDevice                                    device,
    VkImageView                                 imageView,
    VkImageViewAddressPropertiesNVX*            pProperties);

* 
`device` is the logical device that owns the image view.

* 
`imageView` is a handle to the image view.

* 
`pProperties` contains the device address and size when the call
returns.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewAddressNVX-device-parameter) VUID-vkGetImageViewAddressNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageViewAddressNVX-imageView-parameter) VUID-vkGetImageViewAddressNVX-imageView-parameter

 `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkGetImageViewAddressNVX-pProperties-parameter) VUID-vkGetImageViewAddressNVX-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkImageViewAddressPropertiesNVX](VkImageViewAddressPropertiesNVX.html) structure

* 
[](#VUID-vkGetImageViewAddressNVX-imageView-parent) VUID-vkGetImageViewAddressNVX-imageView-parent

 `imageView` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NVX_image_view_handle](VK_NVX_image_view_handle.html), [VkDevice](VkDevice.html), [VkImageView](VkImageView.html), [VkImageViewAddressPropertiesNVX](VkImageViewAddressPropertiesNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageViewAddressNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
