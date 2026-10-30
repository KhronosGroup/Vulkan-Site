# VkPerformanceCounterARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterARM - Structure providing information about a counter

The `VkPerformanceCounterARM` structure is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPerformanceCounterARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           counterID;
} VkPerformanceCounterARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterID` is an identifier for the counter of the physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterARM-sType-sType) VUID-VkPerformanceCounterARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_ARM](VkStructureType.html)

* 
[](#VUID-VkPerformanceCounterARM-pNext-pNext) VUID-VkPerformanceCounterARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_performance_counters_by_region](VK_ARM_performance_counters_by_region.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM](vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
