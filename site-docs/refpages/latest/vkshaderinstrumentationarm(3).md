# VkShaderInstrumentationARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderInstrumentationARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderInstrumentationARM - Opaque handle to a shader instrumentation object

Shader instrumentation metrics are captured via instrumentation objects.

Shader instrumentation objects are represented by
`VkShaderInstrumentationARM` handles:

// Provided by VK_ARM_shader_instrumentation
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderInstrumentationARM)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [vkClearShaderInstrumentationMetricsARM](vkClearShaderInstrumentationMetricsARM.html), [vkCmdBeginShaderInstrumentationARM](vkCmdBeginShaderInstrumentationARM.html), [vkCreateShaderInstrumentationARM](vkCreateShaderInstrumentationARM.html), [vkDestroyShaderInstrumentationARM](vkDestroyShaderInstrumentationARM.html), [vkGetShaderInstrumentationValuesARM](vkGetShaderInstrumentationValuesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderInstrumentationARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
