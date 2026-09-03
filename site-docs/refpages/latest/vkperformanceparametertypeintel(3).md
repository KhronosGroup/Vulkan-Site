# VkPerformanceParameterTypeINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceParameterTypeINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceParameterTypeINTEL - Parameters that can be queried

Possible values of [vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html)::`parameter`,
specifying a performance query feature, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceParameterTypeINTEL {
    VK_PERFORMANCE_PARAMETER_TYPE_HW_COUNTERS_SUPPORTED_INTEL = 0,
    VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL = 1,
} VkPerformanceParameterTypeINTEL;

* 
[VK_PERFORMANCE_PARAMETER_TYPE_HW_COUNTERS_SUPPORTED_INTEL](#) has a
boolean result which tells whether hardware counters can be captured.

* 
[VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL](#) has a
32 bits integer result which tells how many bits can be written into the
`VkPerformanceValueINTEL` value.

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceParameterTypeINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
