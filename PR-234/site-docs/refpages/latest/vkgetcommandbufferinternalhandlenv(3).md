# vkGetCommandBufferInternalHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetCommandBufferInternalHandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [Valid Usage (Implicit)](#undefined)
- [Valid_Usage_(Implicit)](#undefined)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetCommandBufferInternalHandleNV - Get an internal handle for a command buffer

To obtain an internal handle for a command buffer, call:

// Provided by VK_NV_internal_handle
void vkGetCommandBufferInternalHandleNV(
    VkCommandBuffer                             commandBuffer,
    VkInternalHandleNV*                         pHandle);

* 
`commandBuffer` is the command buffer to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

Both primary and secondary command buffers **can** be queried.
A command buffer **can** be queried in any state, including:

* 
The [initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) (after allocation or
reset)

* 
The [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) (between
[vkBeginCommandBuffer](vkBeginCommandBuffer.html) and [vkEndCommandBuffer](vkEndCommandBuffer.html))

* 
The [executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) (after recording has
completed)

* 
The [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) (after submission)

* 
[](#VUID-vkGetCommandBufferInternalHandleNV-commandBuffer-parameter) VUID-vkGetCommandBufferInternalHandleNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkGetCommandBufferInternalHandleNV-pHandle-parameter) VUID-vkGetCommandBufferInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

[VK_NV_internal_handle](VK_NV_internal_handle.html), [VkCommandBuffer](VkCommandBuffer.html), `VkInternalHandleNV`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#vkGetCommandBufferInternalHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
