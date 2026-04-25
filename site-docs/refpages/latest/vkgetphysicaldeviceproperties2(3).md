# vkGetPhysicalDeviceProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceProperties2 - Returns properties of a physical device

To query general properties of physical devices once enumerated, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties2*                pProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceProperties2
void vkGetPhysicalDeviceProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties2*                pProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pProperties` is a pointer to a [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)
structure in which properties are returned.

Each structure in `pProperties` and its `pNext` chain contains
members corresponding to implementation-dependent properties, behaviors, or
limits.
`vkGetPhysicalDeviceProperties2` fills in each member to specify the
corresponding value for the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceProperties2-pProperties-parameter) VUID-vkGetPhysicalDeviceProperties2-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkGetPhysicalDeviceProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
