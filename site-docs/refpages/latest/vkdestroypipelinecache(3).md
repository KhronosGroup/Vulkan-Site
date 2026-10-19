# vkDestroyPipelineCache(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyPipelineCache.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyPipelineCache - Destroy a pipeline cache object

To destroy a pipeline cache, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipelineCache(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline cache
object.

* 
`pipelineCache` is the handle of the pipeline cache to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-00771) VUID-vkDestroyPipelineCache-pipelineCache-00771

If `VkAllocationCallbacks` were provided when `pipelineCache`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-00772) VUID-vkDestroyPipelineCache-pipelineCache-00772

If no `VkAllocationCallbacks` were provided when `pipelineCache`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineCache-device-parameter) VUID-vkDestroyPipelineCache-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-parameter) VUID-vkDestroyPipelineCache-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkDestroyPipelineCache-pAllocator-parameter) VUID-vkDestroyPipelineCache-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-parent) VUID-vkDestroyPipelineCache-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineCache` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineCache](VkPipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkDestroyPipelineCache).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
