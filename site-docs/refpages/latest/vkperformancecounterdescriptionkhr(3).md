# VkPerformanceCounterDescriptionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterDescriptionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterDescriptionKHR - Structure providing more detailed information about a counter

The `VkPerformanceCounterDescriptionKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceCounterDescriptionKHR {
    VkStructureType                            sType;
    void*                                      pNext;
    VkPerformanceCounterDescriptionFlagsKHR    flags;
    char                                       name[VK_MAX_DESCRIPTION_SIZE];
    char                                       category[VK_MAX_DESCRIPTION_SIZE];
    char                                       description[VK_MAX_DESCRIPTION_SIZE];
} VkPerformanceCounterDescriptionKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkPerformanceCounterDescriptionFlagBitsKHR](VkPerformanceCounterDescriptionFlagBitsKHR.html) indicating the usage
behavior for the counter.

* 
`name` is an array of size [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html), containing
a null-terminated UTF-8 string specifying the name of the counter.

* 
`category` is an array of size [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html),
containing a null-terminated UTF-8 string specifying the category of the
counter.

* 
`description` is an array of size [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html),
containing a null-terminated UTF-8 string specifying the description of
the counter.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterDescriptionKHR-sType-sType) VUID-VkPerformanceCounterDescriptionKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_KHR](VkStructureType.html)

* 
[](#VUID-VkPerformanceCounterDescriptionKHR-pNext-pNext) VUID-VkPerformanceCounterDescriptionKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterDescriptionFlagsKHR](VkPerformanceCounterDescriptionFlagsKHR.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterDescriptionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
