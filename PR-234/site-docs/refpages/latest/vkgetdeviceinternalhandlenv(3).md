# vkGetDeviceInternalHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceInternalHandleNV.html

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

vkGetDeviceInternalHandleNV - Get an internal handle for a device

To obtain an internal handle for a logical device, call:

// Provided by VK_NV_internal_handle
void vkGetDeviceInternalHandleNV(
    VkDevice                                    device,
    VkInternalHandleNV*                         pHandle);

* 
`device` is the logical device to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

* 
[](#VUID-vkGetDeviceInternalHandleNV-device-parameter) VUID-vkGetDeviceInternalHandleNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceInternalHandleNV-pHandle-parameter) VUID-vkGetDeviceInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

[VK_NV_internal_handle](VK_NV_internal_handle.html), [VkDevice](VkDevice.html), `VkInternalHandleNV`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#vkGetDeviceInternalHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
