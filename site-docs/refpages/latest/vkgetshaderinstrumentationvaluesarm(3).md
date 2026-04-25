# vkGetShaderInstrumentationValuesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetShaderInstrumentationValuesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetShaderInstrumentationValuesARM - Retrieve shader instrumentation data

Data **can** be retrieved from an instrumentation object in units of metric
blocks.
The size of each metric block in bytes is
`sizeof`([VkShaderInstrumentationMetricDataHeaderARM](VkShaderInstrumentationMetricDataHeaderARM.html)) + 
`sizeof`(uint64_t) ×
`VkPhysicalDeviceShaderInstrumentationPropertiesARM`::`numMetrics`.

To retrieve metric blocks from an instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkGetShaderInstrumentationValuesARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation,
    uint32_t*                                   pMetricBlockCount,
    void*                                       pMetricValues,
    VkShaderInstrumentationValuesFlagsARM       flags);

* 
`device` is the logical device that was used to capture shader
instrumentation data.

* 
`instrumentation` is the shader instrumentation object to retrieve
values from

* 
`pMetricBlockCount` is a pointer to an integer related to the number
of metric blocks available or queried.

* 
`pMetricValues` is either `NULL` or a pointer to an
application-allocated buffer where the results will be written.

* 
`flags` is reserved for future use.

If `pMetricValues` is `NULL`, then the number of metric blocks available
is returned in `pMetricBlockCount`.
Otherwise, `pMetricBlockCount` **must** point to a variable set by the
application to the number of elements in the `pMetricValues` array, and
on return the variable is overwritten with the number of metric blocks
actually written to `pMetricValues`.
If `pMetricBlockCount` is less than the number of metric blocks
available, at most `pMetricBlockCount` elements will be written, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available metric blocks were returned.

Metrics are written to `pMetricValues` as a tightly packed array of
metric blocks, where each block consists of a
`VkShaderInstrumentationMetricDataHeaderARM` header followed by
`VkPhysicalDeviceShaderInstrumentationPropertiesARM`::`numMetrics`
unsigned 64-bit values.
The order of the metrics matches the order in which they are enumerated by
[vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM](vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-device-parameter) VUID-vkGetShaderInstrumentationValuesARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parameter) VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html) handle

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-pMetricBlockCount-parameter) VUID-vkGetShaderInstrumentationValuesARM-pMetricBlockCount-parameter

 `pMetricBlockCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-pMetricValues-parameter) VUID-vkGetShaderInstrumentationValuesARM-pMetricValues-parameter

 `pMetricValues` **must** be a pointer value

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-flags-zerobitmask) VUID-vkGetShaderInstrumentationValuesARM-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parent) VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parent

 `instrumentation` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkDevice](VkDevice.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html), [VkShaderInstrumentationValuesFlagsARM](VkShaderInstrumentationValuesFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetShaderInstrumentationValuesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
