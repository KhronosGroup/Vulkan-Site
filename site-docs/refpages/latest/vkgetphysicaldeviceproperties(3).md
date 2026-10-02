# vkGetPhysicalDeviceProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceProperties - Returns properties of a physical device

To query general properties of physical devices once enumerated, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceProperties2](../../../../spec/latest/chapters/devsandqueues.html#vkGetPhysicalDeviceProperties2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceProperties(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties*                 pProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pProperties` is a pointer to a [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)
structure in which properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceProperties-pProperties-parameter) VUID-vkGetPhysicalDeviceProperties-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkGetPhysicalDeviceProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
