# VkPhysicalDevicePerformanceCountersByRegionPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePerformanceCountersByRegionPropertiesARM - Structure describing per region performance counter properties for a physical device

The `VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure
is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPhysicalDevicePerformanceCountersByRegionPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPerRegionPerformanceCounters;
    VkExtent2D         performanceCounterRegionSize;
    uint32_t           rowStrideAlignment;
    uint32_t           regionAlignment;
    VkBool32           identityTransformOrder;
} VkPhysicalDevicePerformanceCountersByRegionPropertiesARM;

The members of the
`VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure
describe the following:

* 
`maxPerRegionPerformanceCounters` is the maximum number of
performance counters that **can** be captured per region.

* 
`performanceCounterRegionSize` is the width and height of each
region for which performance counters **can** be captured.

* 
`rowStrideAlignment` indicates the minimum row alignment for by
region counters.

* 
`regionAlignment` indicates the alignment between each region’s
counter values.

* 
`identityTransformOrder` is a boolean value indicating whether per
region counters are output in framebuffer-space order.

If the `VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerformanceCountersByRegionPropertiesARM-sType-sType) VUID-VkPhysicalDevicePerformanceCountersByRegionPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_performance_counters_by_region](VK_ARM_performance_counters_by_region.html), `VkBool32`, [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
