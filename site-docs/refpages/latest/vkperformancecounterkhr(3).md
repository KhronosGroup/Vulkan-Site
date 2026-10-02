# VkPerformanceCounterKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterKHR - Structure providing information about a counter

The `VkPerformanceCounterKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceCounterKHR {
    VkStructureType                   sType;
    void*                             pNext;
    VkPerformanceCounterUnitKHR       unit;
    VkPerformanceCounterScopeKHR      scope;
    VkPerformanceCounterStorageKHR    storage;
    uint8_t                           uuid[VK_UUID_SIZE];
} VkPerformanceCounterKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`unit` is a [VkPerformanceCounterUnitKHR](VkPerformanceCounterUnitKHR.html) specifying the unit
that the counter data will record.

* 
`scope` is a [VkPerformanceCounterScopeKHR](VkPerformanceCounterScopeKHR.html) specifying the scope
that the counter belongs to.

* 
`storage` is a [VkPerformanceCounterStorageKHR](VkPerformanceCounterStorageKHR.html) specifying the
storage type that the counter’s data uses.

* 
`uuid` is an array of size [VK_UUID_SIZE](VK_UUID_SIZE.html), containing 8-bit
values that represent a universally unique identifier for the counter of
the physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterKHR-sType-sType) VUID-VkPerformanceCounterKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_KHR](VkStructureType.html)

* 
[](#VUID-VkPerformanceCounterKHR-pNext-pNext) VUID-VkPerformanceCounterKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterScopeKHR](VkPerformanceCounterScopeKHR.html), [VkPerformanceCounterStorageKHR](VkPerformanceCounterStorageKHR.html), [VkPerformanceCounterUnitKHR](VkPerformanceCounterUnitKHR.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
