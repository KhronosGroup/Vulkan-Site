# vkCreateCommandPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateCommandPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateCommandPool - Create a new command pool object

To create a command pool, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateCommandPool(
    VkDevice                                    device,
    const VkCommandPoolCreateInfo*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCommandPool*                              pCommandPool);

* 
`device` is the logical device that creates the command pool.

* 
`pCreateInfo` is a pointer to a [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
structure specifying the state of the command pool object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pCommandPool` is a pointer to a [VkCommandPool](VkCommandPool.html) handle in which
the created pool is returned.

Valid Usage

* 
[](#VUID-vkCreateCommandPool-queueFamilyIndex-01937) VUID-vkCreateCommandPool-queueFamilyIndex-01937

`pCreateInfo->queueFamilyIndex` **must** be the index of a queue family
available in the logical device `device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCommandPool-device-parameter) VUID-vkCreateCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateCommandPool-pCreateInfo-parameter) VUID-vkCreateCommandPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) structure

* 
[](#VUID-vkCreateCommandPool-pAllocator-parameter) VUID-vkCreateCommandPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateCommandPool-pCommandPool-parameter) VUID-vkCreateCommandPool-pCommandPool-parameter

 `pCommandPool` **must** be a valid pointer to a [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-vkCreateCommandPool-device-queuecount) VUID-vkCreateCommandPool-device-queuecount

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCommandPool](VkCommandPool.html), [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkCreateCommandPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
