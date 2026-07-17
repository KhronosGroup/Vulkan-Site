# VkPerformanceCounterStorageKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterStorageKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterStorageKHR - Supported counter storage types

Performance counters have an associated storage.
This storage describes the payload of a counter result.

The performance counter storage types which **may** be returned in
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)::`storage` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterStorageKHR {
    VK_PERFORMANCE_COUNTER_STORAGE_INT32_KHR = 0,
    VK_PERFORMANCE_COUNTER_STORAGE_INT64_KHR = 1,
    VK_PERFORMANCE_COUNTER_STORAGE_UINT32_KHR = 2,
    VK_PERFORMANCE_COUNTER_STORAGE_UINT64_KHR = 3,
    VK_PERFORMANCE_COUNTER_STORAGE_FLOAT32_KHR = 4,
    VK_PERFORMANCE_COUNTER_STORAGE_FLOAT64_KHR = 5,
} VkPerformanceCounterStorageKHR;

* 
[VK_PERFORMANCE_COUNTER_STORAGE_INT32_KHR](#) - the performance counter
storage is a 32-bit signed integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_INT64_KHR](#) - the performance counter
storage is a 64-bit signed integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_UINT32_KHR](#) - the performance
counter storage is a 32-bit unsigned integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_UINT64_KHR](#) - the performance
counter storage is a 64-bit unsigned integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_FLOAT32_KHR](#) - the performance
counter storage is a 32-bit floating-point.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_FLOAT64_KHR](#) - the performance
counter storage is a 64-bit floating-point.

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterStorageKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
