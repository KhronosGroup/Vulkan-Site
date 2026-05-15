# vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM - Returns properties describing what shader instrumentation metrics are supported

To enumerate the available shader instrumentation metrics, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pDescriptionCount,
    VkShaderInstrumentationMetricDescriptionARM* pDescriptions);

* 
`physicalDevice` is the physical device.

* 
`pDescriptionCount` is a pointer to an integer related to the number
of shader instrumentation metrics available or queried.

* 
`pDescriptions` is either `NULL` or a pointer to an array of
[VkShaderInstrumentationMetricDescriptionARM](VkShaderInstrumentationMetricDescriptionARM.html) structures.

If `pDescriptions` is `NULL`, then the number of shader instrumentation
metrics available is returned in `pDescriptionCount`.
Otherwise, `pDescriptionCount` **must** point to a variable set by the
application to the number of elements in the `pDescriptions` array, and
on return the variable is overwritten with the number of structures actually
written to `pDescriptions`.
If `pDescriptionCount` is less than the number shader instrumentation
metrics available, at most `pDescriptionCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available shader
instrumentation metrics were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-physicalDevice-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptionCount-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptionCount-parameter

 `pDescriptionCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptions-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptions-parameter

 If the value referenced by `pDescriptionCount` is not `0`, and `pDescriptions` is not `NULL`, `pDescriptions` **must** be a valid pointer to an array of `pDescriptionCount` [VkShaderInstrumentationMetricDescriptionARM](VkShaderInstrumentationMetricDescriptionARM.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkShaderInstrumentationMetricDescriptionARM](VkShaderInstrumentationMetricDescriptionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
