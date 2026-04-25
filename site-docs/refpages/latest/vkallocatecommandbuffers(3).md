# vkAllocateCommandBuffers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAllocateCommandBuffers.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAllocateCommandBuffers - Allocate command buffers from an existing command pool

To allocate command buffers, call:

// Provided by VK_VERSION_1_0
VkResult vkAllocateCommandBuffers(
    VkDevice                                    device,
    const VkCommandBufferAllocateInfo*          pAllocateInfo,
    VkCommandBuffer*                            pCommandBuffers);

* 
`device` is the logical device that owns the command pool.

* 
`pAllocateInfo` is a pointer to a [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html)
structure describing parameters of the allocation.
`commandPool` **may** be accessed any time one of the resulting command
buffers is accessed.

* 
`pCommandBuffers` is a pointer to an array of [VkCommandBuffer](VkCommandBuffer.html)
handles in which the resulting command buffer objects are returned.
The array **must** be at least the length specified by the
`commandBufferCount` member of `pAllocateInfo`.
Each allocated command buffer begins in the initial state.

`vkAllocateCommandBuffers` **can** be used to allocate multiple command
buffers.
If the allocation of any of those command buffers fails, the implementation
**must** free all successfully allocated command buffer objects from this
command, set all entries of the `pCommandBuffers` array to `NULL` and
return the error.

|  | Filling `pCommandBuffers` with `NULL` values on failure is an exception
| --- | --- |
to the default error behavior that output parameters will have **undefined**
contents. |

When command buffers are first allocated, they are in the
[initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

Valid Usage (Implicit)

* 
[](#VUID-vkAllocateCommandBuffers-device-parameter) VUID-vkAllocateCommandBuffers-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAllocateCommandBuffers-pAllocateInfo-parameter) VUID-vkAllocateCommandBuffers-pAllocateInfo-parameter

 `pAllocateInfo` **must** be a valid pointer to a valid [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html) structure

* 
[](#VUID-vkAllocateCommandBuffers-pCommandBuffers-parameter) VUID-vkAllocateCommandBuffers-pCommandBuffers-parameter

 `pCommandBuffers` **must** be a valid pointer to an array of `pAllocateInfo->commandBufferCount` [VkCommandBuffer](VkCommandBuffer.html) handles

* 
[](#VUID-vkAllocateCommandBuffers-device-queuecount) VUID-vkAllocateCommandBuffers-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkAllocateCommandBuffers-pAllocateInfo::commandBufferCount-arraylength) VUID-vkAllocateCommandBuffers-pAllocateInfo::commandBufferCount-arraylength

 `pAllocateInfo->commandBufferCount` **must** be greater than `0`

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkAllocateCommandBuffers).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
