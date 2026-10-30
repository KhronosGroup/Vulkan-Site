# vkDestroyPipelineBinaryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyPipelineBinaryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyPipelineBinaryKHR - Destroy a pipeline binary

To destroy a [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html), call:

// Provided by VK_KHR_pipeline_binary
void vkDestroyPipelineBinaryKHR(
    VkDevice                                    device,
    VkPipelineBinaryKHR                         pipelineBinary,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that created the pipeline binary
object.

* 
`pipelineBinary` is the handle of the pipeline binary object to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09614) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09614

If `VkAllocationCallbacks` were provided when `pipelineBinary`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09615) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09615

If no [VkAllocationCallbacks](VkAllocationCallbacks.html) were provided when
`pipelineBinary` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineBinaryKHR-device-parameter) VUID-vkDestroyPipelineBinaryKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parameter) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parameter

 If `pipelineBinary` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineBinary` **must** be a valid [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handle

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pAllocator-parameter) VUID-vkDestroyPipelineBinaryKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parent) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parent

 If `pipelineBinary` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineBinary` **must** be externally synchronized

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkDestroyPipelineBinaryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
