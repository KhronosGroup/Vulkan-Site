# vkFreeCommandBuffers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkFreeCommandBuffers.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkFreeCommandBuffers - Free command buffers

To free command buffers, call:

// Provided by VK_VERSION_1_0
void vkFreeCommandBuffers(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    uint32_t                                    commandBufferCount,
    const VkCommandBuffer*                      pCommandBuffers);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool from which the command buffers
were allocated.

* 
`commandBufferCount` is the length of the `pCommandBuffers`
array.

* 
`pCommandBuffers` is a pointer to an array of handles of command
buffers to free.

Any primary command buffer that is in the [recording or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) and has any element of `pCommandBuffers`
recorded into it, becomes [invalid](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-00047) VUID-vkFreeCommandBuffers-pCommandBuffers-00047

All elements of `pCommandBuffers` **must** not be in the
[pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-00048) VUID-vkFreeCommandBuffers-pCommandBuffers-00048

`pCommandBuffers` **must** be a valid pointer to an array of
`commandBufferCount` `VkCommandBuffer` handles, each element of
which **must** either be a valid handle or `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkFreeCommandBuffers-device-parameter) VUID-vkFreeCommandBuffers-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkFreeCommandBuffers-commandPool-parameter) VUID-vkFreeCommandBuffers-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-vkFreeCommandBuffers-commandBufferCount-arraylength) VUID-vkFreeCommandBuffers-commandBufferCount-arraylength

 `commandBufferCount` **must** be greater than `0`

* 
[](#VUID-vkFreeCommandBuffers-commandPool-parent) VUID-vkFreeCommandBuffers-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-parent) VUID-vkFreeCommandBuffers-pCommandBuffers-parent

 Each element of `pCommandBuffers` that is a valid handle **must** have been created, allocated, or retrieved from `commandPool`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

* 
Host access to each member of `pCommandBuffers` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCommandPool](VkCommandPool.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkFreeCommandBuffers).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
