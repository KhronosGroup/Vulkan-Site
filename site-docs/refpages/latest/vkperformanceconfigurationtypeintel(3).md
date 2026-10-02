# VkPerformanceConfigurationTypeINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceConfigurationTypeINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceConfigurationTypeINTEL - Type of performance configuration

Possible values of
[VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html)::`type`, specifying
performance configuration types, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceConfigurationTypeINTEL {
    VK_PERFORMANCE_CONFIGURATION_TYPE_COMMAND_QUEUE_METRICS_DISCOVERY_ACTIVATED_INTEL = 0,
} VkPerformanceConfigurationTypeINTEL;

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceConfigurationTypeINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
