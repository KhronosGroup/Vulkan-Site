# vkGetPhysicalDeviceMemoryProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceMemoryProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceMemoryProperties - Reports memory information for the specified physical device

To query memory properties, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceMemoryProperties2](../../../../spec/latest/chapters/memory.html#vkGetPhysicalDeviceMemoryProperties2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceMemoryProperties(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties*           pMemoryProperties);

* 
`physicalDevice` is the handle to the device to query.

* 
`pMemoryProperties` is a pointer to a
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html) structure in which the properties
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMemoryProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties-pMemoryProperties-parameter) VUID-vkGetPhysicalDeviceMemoryProperties-pMemoryProperties-parameter

 `pMemoryProperties` **must** be a valid pointer to a [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetPhysicalDeviceMemoryProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
