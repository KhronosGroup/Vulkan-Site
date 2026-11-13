# vkDestroyPipelineLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyPipelineLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyPipelineLayout - Destroy a pipeline layout object

To destroy a pipeline layout, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipelineLayout(
    VkDevice                                    device,
    VkPipelineLayout                            pipelineLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline layout.

* 
`pipelineLayout` is the pipeline layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-00299) VUID-vkDestroyPipelineLayout-pipelineLayout-00299

If `VkAllocationCallbacks` were provided when `pipelineLayout`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-00300) VUID-vkDestroyPipelineLayout-pipelineLayout-00300

If no `VkAllocationCallbacks` were provided when
`pipelineLayout` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineLayout-device-parameter) VUID-vkDestroyPipelineLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-parameter) VUID-vkDestroyPipelineLayout-pipelineLayout-parameter

 If `pipelineLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineLayout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkDestroyPipelineLayout-pAllocator-parameter) VUID-vkDestroyPipelineLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-parent) VUID-vkDestroyPipelineLayout-pipelineLayout-parent

 If `pipelineLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineLayout` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineLayout](VkPipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkDestroyPipelineLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
