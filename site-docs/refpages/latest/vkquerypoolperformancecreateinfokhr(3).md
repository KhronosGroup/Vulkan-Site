# VkQueryPoolPerformanceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolPerformanceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolPerformanceCreateInfoKHR - Structure specifying parameters of a newly created performance query pool

The `VkQueryPoolPerformanceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkQueryPoolPerformanceCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           queueFamilyIndex;
    uint32_t           counterIndexCount;
    const uint32_t*    pCounterIndices;
} VkQueryPoolPerformanceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyIndex` is the queue family index to create this
performance query pool for.

* 
`counterIndexCount` is the length of the `pCounterIndices`
array.

* 
`pCounterIndices` is a pointer to an array of indices into the
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR.html)::`pCounters`
to enable in this performance query pool.

Valid Usage

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-queueFamilyIndex-03236) VUID-VkQueryPoolPerformanceCreateInfoKHR-queueFamilyIndex-03236

`queueFamilyIndex` **must** be a valid queue family index of the device

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-performanceCounterQueryPools-03237) VUID-VkQueryPoolPerformanceCreateInfoKHR-performanceCounterQueryPools-03237

The [    `performanceCounterQueryPools`](../../../../spec/latest/chapters/features.html#features-performanceCounterQueryPools) feature **must** be enabled

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-03321) VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-03321

Each element of `pCounterIndices` **must** be in the range of counters
reported by
`vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR`
for the queue family specified in `queueFamilyIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-sType-sType) VUID-VkQueryPoolPerformanceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-parameter) VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-parameter

 `pCounterIndices` **must** be a valid pointer to an array of `counterIndexCount` `uint32_t` values

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-counterIndexCount-arraylength) VUID-VkQueryPoolPerformanceCreateInfoKHR-counterIndexCount-arraylength

 `counterIndexCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolPerformanceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
