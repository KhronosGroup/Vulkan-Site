# vkDestroyFence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyFence.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyFence - Destroy a fence object

To destroy a fence, call:

// Provided by VK_VERSION_1_0
void vkDestroyFence(
    VkDevice                                    device,
    VkFence                                     fence,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the fence.

* 
`fence` is the handle of the fence to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyFence-fence-01120) VUID-vkDestroyFence-fence-01120

All [queue submission](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) commands that refer
to `fence` **must** have completed execution

* 
[](#VUID-vkDestroyFence-fence-01121) VUID-vkDestroyFence-fence-01121

If `VkAllocationCallbacks` were provided when `fence` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyFence-fence-01122) VUID-vkDestroyFence-fence-01122

If no `VkAllocationCallbacks` were provided when `fence` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyFence-device-parameter) VUID-vkDestroyFence-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyFence-fence-parameter) VUID-vkDestroyFence-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-vkDestroyFence-pAllocator-parameter) VUID-vkDestroyFence-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyFence-fence-parent) VUID-vkDestroyFence-fence-parent

 If `fence` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `fence` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkDestroyFence).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
