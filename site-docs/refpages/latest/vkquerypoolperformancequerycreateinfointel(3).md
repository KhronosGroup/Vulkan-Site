# VkQueryPoolPerformanceQueryCreateInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolPerformanceQueryCreateInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolPerformanceQueryCreateInfoINTEL - Structure specifying parameters to create a pool of performance queries

The `VkQueryPoolPerformanceQueryCreateInfoINTEL` structure is defined
as:

// Provided by VK_INTEL_performance_query
typedef struct VkQueryPoolPerformanceQueryCreateInfoINTEL {
    VkStructureType                 sType;
    const void*                     pNext;
    VkQueryPoolSamplingModeINTEL    performanceCountersSampling;
} VkQueryPoolPerformanceQueryCreateInfoINTEL;

// Provided by VK_INTEL_performance_query
// Equivalent to VkQueryPoolPerformanceQueryCreateInfoINTEL
typedef VkQueryPoolPerformanceQueryCreateInfoINTEL VkQueryPoolCreateInfoINTEL;

To create a pool for Intel performance queries, set
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)::`queryType` to
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](VkQueryType.html) and add a
`VkQueryPoolPerformanceQueryCreateInfoINTEL` structure to the
`pNext` chain of the [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) structure.

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`performanceCountersSampling` describe how performance queries
should be captured.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-sType-sType) VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_QUERY_CREATE_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-performanceCountersSampling-parameter) VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-performanceCountersSampling-parameter

 `performanceCountersSampling` **must** be a valid [VkQueryPoolSamplingModeINTEL](VkQueryPoolSamplingModeINTEL.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkQueryPoolSamplingModeINTEL](VkQueryPoolSamplingModeINTEL.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolPerformanceQueryCreateInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
