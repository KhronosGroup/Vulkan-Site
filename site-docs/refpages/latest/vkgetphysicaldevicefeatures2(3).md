# vkGetPhysicalDeviceFeatures2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceFeatures2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceFeatures2 - Reports capabilities of a physical device

To query supported features defined by the core or extensions, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceFeatures2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures2*                  pFeatures);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceFeatures2
void vkGetPhysicalDeviceFeatures2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures2*                  pFeatures);

* 
`physicalDevice` is the physical device from which to query the
supported features.

* 
`pFeatures` is a pointer to a [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)
structure in which the physical device features are returned.

Each structure in `pFeatures` and its `pNext` chain contains members
corresponding to fine-grained features.
Each structure in `pFeatures` and its `pNext` chain contains
`VkBool32` members corresponding to fine-grained features.
Each such member is returned with a [VK_TRUE](VK_TRUE.html) value indicating that
feature is supported on this physical device, or a [VK_FALSE](VK_FALSE.html) value
indicating it is unsupported.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFeatures2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFeatures2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceFeatures2-pFeatures-parameter) VUID-vkGetPhysicalDeviceFeatures2-pFeatures-parameter

 `pFeatures` **must** be a valid pointer to a [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#vkGetPhysicalDeviceFeatures2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
