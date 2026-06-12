# vkGetPhysicalDeviceFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceFeatures - Reports capabilities of a physical device

To query supported features, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceFeatures2](../../../../spec/latest/chapters/features.html#vkGetPhysicalDeviceFeatures2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceFeatures(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures*                   pFeatures);

* 
`physicalDevice` is the physical device from which to query the
supported features.

* 
`pFeatures` is a pointer to a [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html)
structure in which the physical device features are returned.
For each feature, a value of [VK_TRUE](VK_TRUE.html) specifies that the feature is
supported on this physical device, and [VK_FALSE](VK_FALSE.html) specifies that the
feature is not supported.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFeatures-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFeatures-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceFeatures-pFeatures-parameter) VUID-vkGetPhysicalDeviceFeatures-pFeatures-parameter

 `pFeatures` **must** be a valid pointer to a [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#vkGetPhysicalDeviceFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
