# vkGetPhysicalDeviceMemoryProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceMemoryProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceMemoryProperties2 - Reports memory information for the specified physical device

To query memory properties, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceMemoryProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties2*          pMemoryProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceMemoryProperties2
void vkGetPhysicalDeviceMemoryProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties2*          pMemoryProperties);

* 
`physicalDevice` is the handle to the device to query.

* 
`pMemoryProperties` is a pointer to a
[VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html) structure in which the
properties are returned.

`vkGetPhysicalDeviceMemoryProperties2` behaves similarly to
[vkGetPhysicalDeviceMemoryProperties](vkGetPhysicalDeviceMemoryProperties.html), with the ability to return
extended information in a `pNext` chain of output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMemoryProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties2-pMemoryProperties-parameter) VUID-vkGetPhysicalDeviceMemoryProperties2-pMemoryProperties-parameter

 `pMemoryProperties` **must** be a valid pointer to a [VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html) structure

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetPhysicalDeviceMemoryProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
