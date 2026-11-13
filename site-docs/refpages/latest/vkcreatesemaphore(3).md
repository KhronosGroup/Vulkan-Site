# vkCreateSemaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSemaphore.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSemaphore - Create a new queue semaphore object

To create a semaphore, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateSemaphore(
    VkDevice                                    device,
    const VkSemaphoreCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSemaphore*                                pSemaphore);

* 
`device` is the logical device that creates the semaphore.

* 
`pCreateInfo` is a pointer to a [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)
structure containing information about how the semaphore is to be
created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pSemaphore` is a pointer to a handle in which the resulting
semaphore object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSemaphore-device-parameter) VUID-vkCreateSemaphore-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateSemaphore-pCreateInfo-parameter) VUID-vkCreateSemaphore-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html) structure

* 
[](#VUID-vkCreateSemaphore-pAllocator-parameter) VUID-vkCreateSemaphore-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSemaphore-pSemaphore-parameter) VUID-vkCreateSemaphore-pSemaphore-parameter

 `pSemaphore` **must** be a valid pointer to a [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-vkCreateSemaphore-device-queuecount) VUID-vkCreateSemaphore-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSemaphore](VkSemaphore.html), [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCreateSemaphore).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
