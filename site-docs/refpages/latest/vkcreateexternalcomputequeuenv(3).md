# vkCreateExternalComputeQueueNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateExternalComputeQueueNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateExternalComputeQueueNV - Create an external compute queue for use by a compatible external API.

To create an external compute queue for use by compatible external APIs
call:

// Provided by VK_NV_external_compute_queue
VkResult vkCreateExternalComputeQueueNV(
    VkDevice                                    device,
    const VkExternalComputeQueueCreateInfoNV*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkExternalComputeQueueNV*                   pExternalQueue);

* 
`device` is the VkDevice that the external queue will be a part of.

* 
`pCreateInfo` is a pointer to a
[VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html) structure specifying
configuration info for creating the external queue.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pExternalQueue` is a pointer to a [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html)
object that will be filled with the handle for the created external
queue.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateExternalComputeQueueNV-device-parameter) VUID-vkCreateExternalComputeQueueNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateExternalComputeQueueNV-pCreateInfo-parameter) VUID-vkCreateExternalComputeQueueNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html) structure

* 
[](#VUID-vkCreateExternalComputeQueueNV-pAllocator-parameter) VUID-vkCreateExternalComputeQueueNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateExternalComputeQueueNV-pExternalQueue-parameter) VUID-vkCreateExternalComputeQueueNV-pExternalQueue-parameter

 `pExternalQueue` **must** be a valid pointer to a [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html) handle

* 
[](#VUID-vkCreateExternalComputeQueueNV-device-queuecount) VUID-vkCreateExternalComputeQueueNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html), [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#vkCreateExternalComputeQueueNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
