# VkPerformanceQuerySubmitInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceQuerySubmitInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceQuerySubmitInfoKHR - Structure indicating which counter pass index is active for performance queries

The `VkPerformanceQuerySubmitInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceQuerySubmitInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           counterPassIndex;
} VkPerformanceQuerySubmitInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterPassIndex` specifies which counter pass index is active.

If the `VkSubmitInfo`::`pNext` chain does not include this
structure, the batch defaults to use counter pass index 0.

Valid Usage

* 
[](#VUID-VkPerformanceQuerySubmitInfoKHR-counterPassIndex-03221) VUID-VkPerformanceQuerySubmitInfoKHR-counterPassIndex-03221

`counterPassIndex` **must** be less than the number of counter passes
required by any queries within the batch.
The required number of counter passes for a performance query is
obtained by calling
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceQuerySubmitInfoKHR-sType-sType) VUID-VkPerformanceQuerySubmitInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_QUERY_SUBMIT_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkPerformanceQuerySubmitInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
