# vkInitializePerformanceApiINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkInitializePerformanceApiINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkInitializePerformanceApiINTEL - Initialize a device for performance queries

Prior to creating a performance query pool, initialize the device for
performance queries with the call:

// Provided by VK_INTEL_performance_query
VkResult vkInitializePerformanceApiINTEL(
    VkDevice                                    device,
    const VkInitializePerformanceApiInfoINTEL*  pInitializeInfo);

* 
`device` is the logical device used for the queries.

* 
`pInitializeInfo` is a pointer to a
[VkInitializePerformanceApiInfoINTEL](VkInitializePerformanceApiInfoINTEL.html) structure specifying
initialization parameters.

Valid Usage (Implicit)

* 
[](#VUID-vkInitializePerformanceApiINTEL-device-parameter) VUID-vkInitializePerformanceApiINTEL-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkInitializePerformanceApiINTEL-pInitializeInfo-parameter) VUID-vkInitializePerformanceApiINTEL-pInitializeInfo-parameter

 `pInitializeInfo` **must** be a valid pointer to a valid [VkInitializePerformanceApiInfoINTEL](VkInitializePerformanceApiInfoINTEL.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkDevice](VkDevice.html), [VkInitializePerformanceApiInfoINTEL](VkInitializePerformanceApiInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkInitializePerformanceApiINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
