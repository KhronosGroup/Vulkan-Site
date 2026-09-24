# vkDestroyShaderEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyShaderEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyShaderEXT - Destroy a shader object

To destroy a shader object, call:

// Provided by VK_EXT_shader_object
void vkDestroyShaderEXT(
    VkDevice                                    device,
    VkShaderEXT                                 shader,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader object.

* 
`shader` is the handle of the shader object to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Destroying a shader object used by one or more command buffers in the
[recording or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) causes those
command buffers to move into the *invalid state*.

Valid Usage

* 
[](#VUID-vkDestroyShaderEXT-None-08481) VUID-vkDestroyShaderEXT-None-08481

The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkDestroyShaderEXT-shader-08482) VUID-vkDestroyShaderEXT-shader-08482

All submitted commands that refer to `shader` **must** have completed
execution

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-08483) VUID-vkDestroyShaderEXT-pAllocator-08483

If `VkAllocationCallbacks` were provided when `shader` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-08484) VUID-vkDestroyShaderEXT-pAllocator-08484

If no `VkAllocationCallbacks` were provided when `shader` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderEXT-device-parameter) VUID-vkDestroyShaderEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyShaderEXT-shader-parameter) VUID-vkDestroyShaderEXT-shader-parameter

 If `shader` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `shader` **must** be a valid [VkShaderEXT](VkShaderEXT.html) handle

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-parameter) VUID-vkDestroyShaderEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyShaderEXT-shader-parent) VUID-vkDestroyShaderEXT-shader-parent

 If `shader` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `shader` **must** be externally synchronized

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkShaderEXT](VkShaderEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyShaderEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
