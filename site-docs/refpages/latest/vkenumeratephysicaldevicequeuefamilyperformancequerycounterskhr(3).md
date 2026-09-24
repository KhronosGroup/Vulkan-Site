# vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR - Reports properties of the performance query counters available on a queue family of a device

To enumerate the performance query counters available on a queue family of a
physical device, call:

// Provided by VK_KHR_performance_query
VkResult vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    uint32_t*                                   pCounterCount,
    VkPerformanceCounterKHR*                    pCounters,
    VkPerformanceCounterDescriptionKHR*         pCounterDescriptions);

* 
`physicalDevice` is the handle to the physical device whose queue
family performance query counter properties will be queried.

* 
`queueFamilyIndex` is the index into the queue family of the
physical device we want to get properties for.

* 
`pCounterCount` is a pointer to an integer related to the number of
counters available or queried, as described below.

* 
`pCounters` is either `NULL` or a pointer to an array of
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html) structures.

* 
`pCounterDescriptions` is either `NULL` or a pointer to an array of
[VkPerformanceCounterDescriptionKHR](VkPerformanceCounterDescriptionKHR.html) structures.

If `pCounters` is `NULL` and `pCounterDescriptions` is `NULL`, then
the number of counters available is returned in `pCounterCount`.
Otherwise, `pCounterCount` **must** point to a variable set by the
application to the number of elements in the `pCounters`,
`pCounterDescriptions`, or both arrays and on return the variable is
overwritten with the number of structures actually written out.
If `pCounterCount` is less than the number of counters available, at
most `pCounterCount` structures will be written, and [VK_INCOMPLETE](VkResult.html)
will be returned instead of [VK_SUCCESS](VkResult.html), to indicate that not all the
available counters were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-physicalDevice-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterCount-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterCount-parameter

 `pCounterCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounters-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounters-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounters` is not `NULL`, `pCounters` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterKHR](VkPerformanceCounterKHR.html) structures

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterDescriptions-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterDescriptions-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounterDescriptions` is not `NULL`, `pCounterDescriptions` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterDescriptionKHR](VkPerformanceCounterDescriptionKHR.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterDescriptionKHR](VkPerformanceCounterDescriptionKHR.html), [VkPerformanceCounterKHR](VkPerformanceCounterKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
