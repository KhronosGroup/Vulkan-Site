# vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR - Reports the number of passes require for a performance query pool type

To query the number of passes required to query a performance query pool on
a physical device, call:

// Provided by VK_KHR_performance_query
void vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkQueryPoolPerformanceCreateInfoKHR*  pPerformanceQueryCreateInfo,
    uint32_t*                                   pNumPasses);

* 
`physicalDevice` is the handle to the physical device whose queue
family performance query counter properties will be queried.

* 
`pPerformanceQueryCreateInfo` is a pointer to a
`VkQueryPoolPerformanceCreateInfoKHR` of the performance query that
is to be created.

* 
`pNumPasses` is a pointer to an integer related to the number of
passes required to query the performance query pool, as described below.

The `pPerformanceQueryCreateInfo` member
`VkQueryPoolPerformanceCreateInfoKHR`::`queueFamilyIndex` **must** be a
queue family of `physicalDevice`.
The number of passes required to capture the counters specified in the
`pPerformanceQueryCreateInfo` member
`VkQueryPoolPerformanceCreateInfoKHR`::`pCounters` is returned in
`pNumPasses`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pPerformanceQueryCreateInfo-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pPerformanceQueryCreateInfo-parameter

 `pPerformanceQueryCreateInfo` **must** be a valid pointer to a valid [VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pNumPasses-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pNumPasses-parameter

 `pNumPasses` **must** be a valid pointer to a `uint32_t` value

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
