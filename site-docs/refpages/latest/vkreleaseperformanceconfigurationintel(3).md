# vkReleasePerformanceConfigurationINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkReleasePerformanceConfigurationINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkReleasePerformanceConfigurationINTEL - Release a configuration to capture performance data

To release a device performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkReleasePerformanceConfigurationINTEL(
    VkDevice                                    device,
    VkPerformanceConfigurationINTEL             configuration);

* 
`device` is the device associated to the configuration object to
release.

* 
`configuration` is the configuration object to release.

Valid Usage

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-02737) VUID-vkReleasePerformanceConfigurationINTEL-configuration-02737

`configuration` **must** not be released before all command buffers
submitted while the configuration was set are in
[pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-device-parameter) VUID-vkReleasePerformanceConfigurationINTEL-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-parameter) VUID-vkReleasePerformanceConfigurationINTEL-configuration-parameter

 If `configuration` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `configuration` **must** be a valid [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html) handle

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-parent) VUID-vkReleasePerformanceConfigurationINTEL-configuration-parent

 If `configuration` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `configuration` **must** be externally synchronized

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkDevice](VkDevice.html), [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkReleasePerformanceConfigurationINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
