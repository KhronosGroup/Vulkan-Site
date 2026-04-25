# vkDestroyShaderModule(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyShaderModule.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyShaderModule - Destroy a shader module

To destroy a shader module, call:

// Provided by VK_VERSION_1_0
void vkDestroyShaderModule(
    VkDevice                                    device,
    VkShaderModule                              shaderModule,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader module.

* 
`shaderModule` is the handle of the shader module to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

A shader module **can** be destroyed while pipelines created using its shaders
are still in use.

Valid Usage

* 
[](#VUID-vkDestroyShaderModule-shaderModule-01092) VUID-vkDestroyShaderModule-shaderModule-01092

If `VkAllocationCallbacks` were provided when `shaderModule` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyShaderModule-shaderModule-01093) VUID-vkDestroyShaderModule-shaderModule-01093

If no `VkAllocationCallbacks` were provided when `shaderModule`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderModule-device-parameter) VUID-vkDestroyShaderModule-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyShaderModule-shaderModule-parameter) VUID-vkDestroyShaderModule-shaderModule-parameter

 If `shaderModule` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `shaderModule` **must** be a valid [VkShaderModule](VkShaderModule.html) handle

* 
[](#VUID-vkDestroyShaderModule-pAllocator-parameter) VUID-vkDestroyShaderModule-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyShaderModule-shaderModule-parent) VUID-vkDestroyShaderModule-shaderModule-parent

 If `shaderModule` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `shaderModule` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkShaderModule](VkShaderModule.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyShaderModule).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
