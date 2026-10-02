# vkClearShaderInstrumentationMetricsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkClearShaderInstrumentationMetricsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkClearShaderInstrumentationMetricsARM - Clear shader instrumentation metrics to zero

To clear the value of all metric blocks in an instrumentation object to
zero, call:

// Provided by VK_ARM_shader_instrumentation
void vkClearShaderInstrumentationMetricsARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation);

* 
`device` is the logical device that owns the shader instrumentation
object.

* 
`instrumentation` is the shader instrumentation object to clear.

Valid Usage (Implicit)

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-device-parameter) VUID-vkClearShaderInstrumentationMetricsARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parameter) VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html) handle

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parent) VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parent

 `instrumentation` **must** have been created, allocated, or retrieved from `device`

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkDevice](VkDevice.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkClearShaderInstrumentationMetricsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
