# vkGetDeviceImageSubresourceLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceImageSubresourceLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceImageSubresourceLayout - Retrieve information about an image subresource without an image object

To query the memory layout of an image subresource, without an image object,
call:

// Provided by VK_VERSION_1_4
void vkGetDeviceImageSubresourceLayout(
    VkDevice                                    device,
    const VkDeviceImageSubresourceInfo*         pInfo,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetDeviceImageSubresourceLayout
void vkGetDeviceImageSubresourceLayoutKHR(
    VkDevice                                    device,
    const VkDeviceImageSubresourceInfo*         pInfo,
    VkSubresourceLayout2*                       pLayout);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html)
structure containing parameters required for the subresource layout
query.

* 
`pLayout` is a pointer to a [VkSubresourceLayout2](VkSubresourceLayout2.html) structure in
which the layout is returned.

`vkGetDeviceImageSubresourceLayout` behaves similarly to
[vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), but uses a [VkImageCreateInfo](VkImageCreateInfo.html)
structure to specify the image rather than a [VkImage](VkImage.html) object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-device-parameter) VUID-vkGetDeviceImageSubresourceLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-pInfo-parameter) VUID-vkGetDeviceImageSubresourceLayout-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html) structure

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-pLayout-parameter) VUID-vkGetDeviceImageSubresourceLayout-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout2](VkSubresourceLayout2.html) structure

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html), [VkSubresourceLayout2](VkSubresourceLayout2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetDeviceImageSubresourceLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
