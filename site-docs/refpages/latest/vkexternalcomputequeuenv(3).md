# VkExternalComputeQueueNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalComputeQueueNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalComputeQueueNV - Opaque handle to an external compute queue

External compute queues are used to join compatible external APIs to a
`VkDevice`, allowing workloads submitted through these external APIs to
be executed simultaneously to workloads submitted through Vulkan.

External compute queues are represented by `VkExternalComputeQueueNV`
handles:

// Provided by VK_NV_external_compute_queue
VK_DEFINE_HANDLE(VkExternalComputeQueueNV)

[VK_DEFINE_HANDLE](VK_DEFINE_HANDLE.html), [VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html), [vkDestroyExternalComputeQueueNV](vkDestroyExternalComputeQueueNV.html), [vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkExternalComputeQueueNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
