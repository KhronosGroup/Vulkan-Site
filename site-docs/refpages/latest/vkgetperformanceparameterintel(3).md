# vkGetPerformanceParameterINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPerformanceParameterINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPerformanceParameterINTEL - Query performance capabilities of the device

Some performance query features of a device can be discovered with the call:

// Provided by VK_INTEL_performance_query
VkResult vkGetPerformanceParameterINTEL(
    VkDevice                                    device,
    VkPerformanceParameterTypeINTEL             parameter,
    VkPerformanceValueINTEL*                    pValue);

* 
`device` is the logical device to query.

* 
`parameter` is the parameter to query.

* 
`pValue` is a pointer to a [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html) structure
in which the type and value of the parameter are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPerformanceParameterINTEL-device-parameter) VUID-vkGetPerformanceParameterINTEL-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPerformanceParameterINTEL-parameter-parameter) VUID-vkGetPerformanceParameterINTEL-parameter-parameter

 `parameter` **must** be a valid [VkPerformanceParameterTypeINTEL](VkPerformanceParameterTypeINTEL.html) value

* 
[](#VUID-vkGetPerformanceParameterINTEL-pValue-parameter) VUID-vkGetPerformanceParameterINTEL-pValue-parameter

 `pValue` **must** be a valid pointer to a [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html) structure

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkDevice](VkDevice.html), [VkPerformanceParameterTypeINTEL](VkPerformanceParameterTypeINTEL.html), [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkGetPerformanceParameterINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
