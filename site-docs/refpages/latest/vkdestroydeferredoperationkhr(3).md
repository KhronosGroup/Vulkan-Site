# vkDestroyDeferredOperationKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDeferredOperationKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDeferredOperationKHR - Destroy a deferred operation handle

When a deferred operation is completed, the application **can** destroy the
tracking object by calling:

// Provided by VK_KHR_deferred_host_operations
void vkDestroyDeferredOperationKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the device which owns `operation`.

* 
`operation` is the completed operation to be destroyed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03434) VUID-vkDestroyDeferredOperationKHR-operation-03434

If `VkAllocationCallbacks` were provided when `operation` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03435) VUID-vkDestroyDeferredOperationKHR-operation-03435

If no `VkAllocationCallbacks` were provided when `operation` was
created, `pAllocator` **must** be `NULL`

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03436) VUID-vkDestroyDeferredOperationKHR-operation-03436

`operation` **must** be completed

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDeferredOperationKHR-device-parameter) VUID-vkDestroyDeferredOperationKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-parameter) VUID-vkDestroyDeferredOperationKHR-operation-parameter

 If `operation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `operation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkDestroyDeferredOperationKHR-pAllocator-parameter) VUID-vkDestroyDeferredOperationKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-parent) VUID-vkDestroyDeferredOperationKHR-operation-parent

 If `operation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `operation` **must** be externally synchronized

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#vkDestroyDeferredOperationKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
