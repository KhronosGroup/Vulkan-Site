# vkUninitializePerformanceApiINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUninitializePerformanceApiINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUninitializePerformanceApiINTEL - Uninitialize a device for performance queries

Once performance query operations have completed, uninitialize the device
for performance queries with the call:

// Provided by VK_INTEL_performance_query
void vkUninitializePerformanceApiINTEL(
    VkDevice                                    device);

* 
`device` is the logical device used for the queries.

Valid Usage (Implicit)

* 
[](#VUID-vkUninitializePerformanceApiINTEL-device-parameter) VUID-vkUninitializePerformanceApiINTEL-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkUninitializePerformanceApiINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
