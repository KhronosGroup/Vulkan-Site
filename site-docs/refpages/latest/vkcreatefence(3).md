# vkCreateFence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateFence.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateFence - Create a new fence object

To create a fence, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateFence(
    VkDevice                                    device,
    const VkFenceCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is the logical device that creates the fence.

* 
`pCreateInfo` is a pointer to a [VkFenceCreateInfo](VkFenceCreateInfo.html) structure
containing information about how the fence is to be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateFence-device-parameter) VUID-vkCreateFence-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateFence-pCreateInfo-parameter) VUID-vkCreateFence-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkFenceCreateInfo](VkFenceCreateInfo.html) structure

* 
[](#VUID-vkCreateFence-pAllocator-parameter) VUID-vkCreateFence-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateFence-pFence-parameter) VUID-vkCreateFence-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](VkFence.html) handle

* 
[](#VUID-vkCreateFence-device-queuecount) VUID-vkCreateFence-device-queuecount

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkFence](VkFence.html), [VkFenceCreateInfo](VkFenceCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCreateFence).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
