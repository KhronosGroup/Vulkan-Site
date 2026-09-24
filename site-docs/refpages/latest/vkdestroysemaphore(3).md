# vkDestroySemaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroySemaphore.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroySemaphore - Destroy a semaphore object

To destroy a semaphore, call:

// Provided by VK_VERSION_1_0
void vkDestroySemaphore(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the semaphore.

* 
`semaphore` is the handle of the semaphore to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroySemaphore-semaphore-05149) VUID-vkDestroySemaphore-semaphore-05149

All
    submitted batches that refer to `semaphore` **must** have completed
    execution

* 
[](#VUID-vkDestroySemaphore-semaphore-01138) VUID-vkDestroySemaphore-semaphore-01138

If `VkAllocationCallbacks` were provided when `semaphore` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySemaphore-semaphore-01139) VUID-vkDestroySemaphore-semaphore-01139

If no `VkAllocationCallbacks` were provided when `semaphore` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySemaphore-device-parameter) VUID-vkDestroySemaphore-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroySemaphore-semaphore-parameter) VUID-vkDestroySemaphore-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-vkDestroySemaphore-pAllocator-parameter) VUID-vkDestroySemaphore-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroySemaphore-semaphore-parent) VUID-vkDestroySemaphore-semaphore-parent

 If `semaphore` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSemaphore](VkSemaphore.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkDestroySemaphore).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
