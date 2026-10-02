# vkCreateDeferredOperationKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDeferredOperationKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDeferredOperationKHR - Create a deferred operation handle

To construct the tracking object for a deferred command, call:

// Provided by VK_KHR_deferred_host_operations
VkResult vkCreateDeferredOperationKHR(
    VkDevice                                    device,
    const VkAllocationCallbacks*                pAllocator,
    VkDeferredOperationKHR*                     pDeferredOperation);

* 
`device` is the device which owns `operation`.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pDeferredOperation` is a pointer to a handle in which the created
[VkDeferredOperationKHR](VkDeferredOperationKHR.html) is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDeferredOperationKHR-device-parameter) VUID-vkCreateDeferredOperationKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDeferredOperationKHR-pAllocator-parameter) VUID-vkCreateDeferredOperationKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDeferredOperationKHR-pDeferredOperation-parameter) VUID-vkCreateDeferredOperationKHR-pDeferredOperation-parameter

 `pDeferredOperation` **must** be a valid pointer to a [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCreateDeferredOperationKHR-device-queuecount) VUID-vkCreateDeferredOperationKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#vkCreateDeferredOperationKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
