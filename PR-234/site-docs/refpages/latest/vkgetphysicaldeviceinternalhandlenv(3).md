# vkGetPhysicalDeviceInternalHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceInternalHandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [Valid Usage (Implicit)](#undefined)
- [Valid_Usage_(Implicit)](#undefined)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceInternalHandleNV - Get an internal handle for a physical device

To obtain an internal handle for a physical device, call:

// Provided by VK_NV_internal_handle
void vkGetPhysicalDeviceInternalHandleNV(
    VkPhysicalDevice                            physicalDevice,
    VkInternalHandleNV*                         pHandle);

* 
`physicalDevice` is the physical device to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

* 
[](#VUID-vkGetPhysicalDeviceInternalHandleNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceInternalHandleNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceInternalHandleNV-pHandle-parameter) VUID-vkGetPhysicalDeviceInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

[VK_NV_internal_handle](VK_NV_internal_handle.html), `VkInternalHandleNV`, [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#vkGetPhysicalDeviceInternalHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
