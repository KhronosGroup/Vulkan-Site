# vkCmdCopyMemoryIndirectKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryIndirectKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryIndirectKHR - Copy data between memory regions

To copy data between two memory regions by specifying copy parameters
indirectly in memory, call:

// Provided by VK_KHR_copy_memory_indirect
void vkCmdCopyMemoryIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryIndirectInfoKHR*          pCopyMemoryIndirectInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyMemoryIndirectInfo` is a pointer to a
[VkCopyMemoryIndirectInfoKHR](VkCopyMemoryIndirectInfoKHR.html) structure containing the copy
parameters, including the number of copies to execute and a strided
array of [VkCopyMemoryIndirectCommandKHR](VkCopyMemoryIndirectCommandKHR.html) structures.

Each region specified in the memory referenced by
`pCopyMemoryIndirectInfo->copyAddressRange` is copied from the source
region to the specified destination region.
The results are **undefined** if any of the source and destination regions
overlap in memory.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-indirectMemoryCopy-10935) VUID-vkCmdCopyMemoryIndirectKHR-indirectMemoryCopy-10935

The [`indirectMemoryCopy`](../../../../spec/latest/chapters/features.html#features-indirectMemoryCopy) feature
**must** be enabled

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-10936) VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-10936

The [VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from
**must** support at least one of the queue types specified in
[VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)::`supportedQueues`

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-10937) VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-10937

`commandBuffer` must not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-parameter) VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-pCopyMemoryIndirectInfo-parameter) VUID-vkCmdCopyMemoryIndirectKHR-pCopyMemoryIndirectInfo-parameter

 `pCopyMemoryIndirectInfo` **must** be a valid pointer to a valid [VkCopyMemoryIndirectInfoKHR](VkCopyMemoryIndirectInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-recording) VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryIndirectKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-renderpass) VUID-vkCmdCopyMemoryIndirectKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-suspended) VUID-vkCmdCopyMemoryIndirectKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryIndirectKHR-videocoding) VUID-vkCmdCopyMemoryIndirectKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyMemoryIndirectKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMemoryIndirectInfoKHR](VkCopyMemoryIndirectInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyMemoryIndirectKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
