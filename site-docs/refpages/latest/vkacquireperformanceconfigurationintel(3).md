# vkAcquirePerformanceConfigurationINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquirePerformanceConfigurationINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquirePerformanceConfigurationINTEL - Acquire the performance query capability

To acquire a device performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkAcquirePerformanceConfigurationINTEL(
    VkDevice                                    device,
    const VkPerformanceConfigurationAcquireInfoINTEL* pAcquireInfo,
    VkPerformanceConfigurationINTEL*            pConfiguration);

* 
`device` is the logical device that the performance query commands
will be submitted to.

* 
`pAcquireInfo` is a pointer to a
[VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html) structure, specifying
the performance configuration to acquire.

* 
`pConfiguration` is a pointer to a
`VkPerformanceConfigurationINTEL` handle in which the resulting
configuration object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-device-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-pAcquireInfo-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-pAcquireInfo-parameter

 `pAcquireInfo` **must** be a valid pointer to a valid [VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html) structure

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-pConfiguration-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-pConfiguration-parameter

 `pConfiguration` **must** be a valid pointer to a [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html) handle

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkDevice](VkDevice.html), [VkPerformanceConfigurationAcquireInfoINTEL](VkPerformanceConfigurationAcquireInfoINTEL.html), [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkAcquirePerformanceConfigurationINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
