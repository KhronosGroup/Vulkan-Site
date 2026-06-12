# vkCreateQueryPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateQueryPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateQueryPool - Create a new query pool object

To create a query pool, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateQueryPool(
    VkDevice                                    device,
    const VkQueryPoolCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkQueryPool*                                pQueryPool);

* 
`device` is the logical device that creates the query pool.

* 
`pCreateInfo` is a pointer to a [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)
structure containing the number and type of queries to be managed by the
pool.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pQueryPool` is a pointer to a [VkQueryPool](VkQueryPool.html) handle in which the
resulting query pool object is returned.

Valid Usage

* 
[](#VUID-vkCreateQueryPool-device-09663) VUID-vkCreateQueryPool-device-09663

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

Valid Usage (Implicit)

* 
[](#VUID-vkCreateQueryPool-device-parameter) VUID-vkCreateQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateQueryPool-pCreateInfo-parameter) VUID-vkCreateQueryPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) structure

* 
[](#VUID-vkCreateQueryPool-pAllocator-parameter) VUID-vkCreateQueryPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateQueryPool-pQueryPool-parameter) VUID-vkCreateQueryPool-pQueryPool-parameter

 `pQueryPool` **must** be a valid pointer to a [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCreateQueryPool-device-queuecount) VUID-vkCreateQueryPool-device-queuecount

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkQueryPool](VkQueryPool.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCreateQueryPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
