# vkCreateShaderInstrumentationARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateShaderInstrumentationARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateShaderInstrumentationARM - Create a new shader instrumentation object

To create a shader instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkCreateShaderInstrumentationARM(
    VkDevice                                    device,
    const VkShaderInstrumentationCreateInfoARM* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkShaderInstrumentationARM*                 pInstrumentation);

* 
`device` is the logical device that creates the shader
instrumentation object.

* 
`pCreateInfo` is a pointer to a
[VkShaderInstrumentationCreateInfoARM](VkShaderInstrumentationCreateInfoARM.html) structure containing
information about how the shader instrumentation object is to be
created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pInstrumentation` is a pointer to a handle in which the resulting
shader instrumentation object is returned.

Valid Usage

Valid Usage (Implicit)

* 
[](#VUID-vkCreateShaderInstrumentationARM-device-parameter) VUID-vkCreateShaderInstrumentationARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateShaderInstrumentationARM-pCreateInfo-parameter) VUID-vkCreateShaderInstrumentationARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderInstrumentationCreateInfoARM](VkShaderInstrumentationCreateInfoARM.html) structure

* 
[](#VUID-vkCreateShaderInstrumentationARM-pAllocator-parameter) VUID-vkCreateShaderInstrumentationARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateShaderInstrumentationARM-pInstrumentation-parameter) VUID-vkCreateShaderInstrumentationARM-pInstrumentation-parameter

 `pInstrumentation` **must** be a valid pointer to a [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html) handle

* 
[](#VUID-vkCreateShaderInstrumentationARM-device-queuecount) VUID-vkCreateShaderInstrumentationARM-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html), [VkShaderInstrumentationCreateInfoARM](VkShaderInstrumentationCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCreateShaderInstrumentationARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
