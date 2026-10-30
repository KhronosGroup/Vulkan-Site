# vkDestroyPipeline(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyPipeline.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyPipeline - Destroy a pipeline object

To destroy a pipeline, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipeline(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline.

* 
`pipeline` is the handle of the pipeline to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipeline-pipeline-00765) VUID-vkDestroyPipeline-pipeline-00765

All submitted commands that refer to `pipeline` **must** have completed
execution

* 
[](#VUID-vkDestroyPipeline-pipeline-00766) VUID-vkDestroyPipeline-pipeline-00766

If `VkAllocationCallbacks` were provided when `pipeline` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipeline-pipeline-00767) VUID-vkDestroyPipeline-pipeline-00767

If no `VkAllocationCallbacks` were provided when `pipeline` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipeline-device-parameter) VUID-vkDestroyPipeline-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyPipeline-pipeline-parameter) VUID-vkDestroyPipeline-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkDestroyPipeline-pAllocator-parameter) VUID-vkDestroyPipeline-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyPipeline-pipeline-parent) VUID-vkDestroyPipeline-pipeline-parent

 If `pipeline` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipeline` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkDestroyPipeline).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
