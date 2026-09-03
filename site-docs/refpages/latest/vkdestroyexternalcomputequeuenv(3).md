# vkDestroyExternalComputeQueueNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyExternalComputeQueueNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyExternalComputeQueueNV - Destroys an external queue.

To destroy a previously created external compute queue call:

// Provided by VK_NV_external_compute_queue
void vkDestroyExternalComputeQueueNV(
    VkDevice                                    device,
    VkExternalComputeQueueNV                    externalQueue,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the external queue.

* 
`externalQueue` is the [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html) to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyExternalComputeQueueNV-device-parameter) VUID-vkDestroyExternalComputeQueueNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyExternalComputeQueueNV-externalQueue-parameter) VUID-vkDestroyExternalComputeQueueNV-externalQueue-parameter

 `externalQueue` **must** be a valid [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html) handle

* 
[](#VUID-vkDestroyExternalComputeQueueNV-pAllocator-parameter) VUID-vkDestroyExternalComputeQueueNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyExternalComputeQueueNV-externalQueue-parent) VUID-vkDestroyExternalComputeQueueNV-externalQueue-parent

 `externalQueue` **must** have been created, allocated, or retrieved from `device`

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#vkDestroyExternalComputeQueueNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
