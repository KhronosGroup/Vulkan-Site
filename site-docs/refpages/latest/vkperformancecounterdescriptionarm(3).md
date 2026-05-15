# VkPerformanceCounterDescriptionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterDescriptionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterDescriptionARM - Structure providing more detailed information about a counter

The `VkPerformanceCounterDescriptionARM` structure is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPerformanceCounterDescriptionARM {
    VkStructureType                            sType;
    void*                                      pNext;
    VkPerformanceCounterDescriptionFlagsARM    flags;
    char                                       name[VK_MAX_DESCRIPTION_SIZE];
} VkPerformanceCounterDescriptionARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`name` is an array of size [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html), containing
a null-terminated UTF-8 string specifying the name of the counter.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterDescriptionARM-sType-sType) VUID-VkPerformanceCounterDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_ARM](VkStructureType.html)

* 
[](#VUID-VkPerformanceCounterDescriptionARM-pNext-pNext) VUID-VkPerformanceCounterDescriptionARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_performance_counters_by_region](VK_ARM_performance_counters_by_region.html), [VkPerformanceCounterDescriptionFlagsARM](VkPerformanceCounterDescriptionFlagsARM.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM](vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterDescriptionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
