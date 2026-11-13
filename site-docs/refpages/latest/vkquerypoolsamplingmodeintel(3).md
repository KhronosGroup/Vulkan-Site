# VkQueryPoolSamplingModeINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolSamplingModeINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolSamplingModeINTEL - Enum specifying how performance queries should be captured

Possible values of
[VkQueryPoolPerformanceQueryCreateInfoINTEL](VkQueryPoolPerformanceQueryCreateInfoINTEL.html)::`performanceCountersSampling`
are:

// Provided by VK_INTEL_performance_query
typedef enum VkQueryPoolSamplingModeINTEL {
    VK_QUERY_POOL_SAMPLING_MODE_MANUAL_INTEL = 0,
} VkQueryPoolSamplingModeINTEL;

* 
[VK_QUERY_POOL_SAMPLING_MODE_MANUAL_INTEL](#) is the default mode in
which the application calls [vkCmdBeginQuery](vkCmdBeginQuery.html) and
[vkCmdEndQuery](vkCmdEndQuery.html) to record performance data.

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkQueryPoolPerformanceQueryCreateInfoINTEL](VkQueryPoolPerformanceQueryCreateInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolSamplingModeINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
