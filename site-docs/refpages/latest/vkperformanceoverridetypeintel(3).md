# VkPerformanceOverrideTypeINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceOverrideTypeINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceOverrideTypeINTEL - Performance override type

Possible values of [VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html)::`type`,
specifying performance override types, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceOverrideTypeINTEL {
    VK_PERFORMANCE_OVERRIDE_TYPE_NULL_HARDWARE_INTEL = 0,
    VK_PERFORMANCE_OVERRIDE_TYPE_FLUSH_GPU_CACHES_INTEL = 1,
} VkPerformanceOverrideTypeINTEL;

* 
[VK_PERFORMANCE_OVERRIDE_TYPE_NULL_HARDWARE_INTEL](#) turns all
rendering operations into noop.

* 
[VK_PERFORMANCE_OVERRIDE_TYPE_FLUSH_GPU_CACHES_INTEL](#) stalls the
stream of commands until all previously emitted commands have completed
and all caches been flushed and invalidated.

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceOverrideTypeINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
