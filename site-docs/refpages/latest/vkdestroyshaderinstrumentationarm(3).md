# vkDestroyShaderInstrumentationARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyShaderInstrumentationARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyShaderInstrumentationARM - Destroy a shader instrumentation object

To destroy a shader instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
void vkDestroyShaderInstrumentationARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader
instrumentation.

* 
`instrumentation` is the handle of the shader instrumentation to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-12374) VUID-vkDestroyShaderInstrumentationARM-instrumentation-12374

All submitted commands that refer to `instrumentation` **must** have
completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderInstrumentationARM-device-parameter) VUID-vkDestroyShaderInstrumentationARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-parameter) VUID-vkDestroyShaderInstrumentationARM-instrumentation-parameter

 If `instrumentation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `instrumentation` **must** be a valid [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html) handle

* 
[](#VUID-vkDestroyShaderInstrumentationARM-pAllocator-parameter) VUID-vkDestroyShaderInstrumentationARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-parent) VUID-vkDestroyShaderInstrumentationARM-instrumentation-parent

 If `instrumentation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `instrumentation` **must** be externally synchronized

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyShaderInstrumentationARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
