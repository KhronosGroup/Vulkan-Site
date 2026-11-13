# VkPerformanceCounterScopeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterScopeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterScopeKHR - Supported counter scope types

Performance counters have an associated scope.
This scope describes the granularity of a performance counter.

The performance counter scope types which **may** be returned in
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)::`scope` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterScopeKHR {
    VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR = 0,
    VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR = 1,
    VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR = 2,
  // VK_QUERY_SCOPE_COMMAND_BUFFER_KHR is a legacy alias
    VK_QUERY_SCOPE_COMMAND_BUFFER_KHR = VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR,
  // VK_QUERY_SCOPE_RENDER_PASS_KHR is a legacy alias
    VK_QUERY_SCOPE_RENDER_PASS_KHR = VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR,
  // VK_QUERY_SCOPE_COMMAND_KHR is a legacy alias
    VK_QUERY_SCOPE_COMMAND_KHR = VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR,
} VkPerformanceCounterScopeKHR;

* 
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](#) - the performance
counter scope is a single complete command buffer.

* 
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](#) - the performance
counter scope is zero or more complete render passes.
The performance query containing the performance counter **must** begin and
end outside a render pass instance.

* 
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR](#) - the performance counter
scope is zero or more commands.

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPerformanceCounterScopeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
