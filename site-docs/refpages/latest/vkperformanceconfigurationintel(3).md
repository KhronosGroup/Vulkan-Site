# VkPerformanceConfigurationINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceConfigurationINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceConfigurationINTEL - Device configuration for performance queries

Before submitting command buffers containing performance queries commands to
a device queue, the application **must** acquire and set a performance query
configuration.
The configuration can be released once all command buffers containing
performance query commands are not in a pending state.

// Provided by VK_INTEL_performance_query
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPerformanceConfigurationINTEL)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_INTEL_performance_query](VK_INTEL_performance_query.html), [vkAcquirePerformanceConfigurationINTEL](vkAcquirePerformanceConfigurationINTEL.html), [vkQueueSetPerformanceConfigurationINTEL](vkQueueSetPerformanceConfigurationINTEL.html), [vkReleasePerformanceConfigurationINTEL](vkReleasePerformanceConfigurationINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceConfigurationINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
