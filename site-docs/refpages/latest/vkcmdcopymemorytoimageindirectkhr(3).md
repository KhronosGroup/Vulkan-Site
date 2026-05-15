# vkCmdCopyMemoryToImageIndirectKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryToImageIndirectKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryToImageIndirectKHR - Copy data from a memory region to an image object

To copy data from a memory region to an image object by specifying copy
parameters in memory, call:

// Provided by VK_KHR_copy_memory_indirect
void vkCmdCopyMemoryToImageIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToImageIndirectInfoKHR*   pCopyMemoryToImageIndirectInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyMemoryToImageIndirectInfo` is a pointer to a
[VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html) structure which contains the
copy parameters, including the number of copies to execute and a strided
array of [VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html) structures.

Each region specified in the memory referenced by
`pCopyMemoryToImageIndirectInfo->copyAddressRange` is copied from the
source region to an image region in the destination image.
If the destination image is of type [VK_IMAGE_TYPE_3D](VkImageType.html), the starting
slice and number of slices to copy are specified in
`pImageSubresources->baseArrayLayer` and
`pImageSubresources->layerCount` respectively as `imageOffset` and
`imageExtent` from [VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html) are only
available at device execution time.
The results are **undefined** if any of the source and destination regions
overlap in memory.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-indirectMemoryToImageCopy-10947) VUID-vkCmdCopyMemoryToImageIndirectKHR-indirectMemoryToImageCopy-10947

The [    `indirectMemoryToImageCopy`](../../../../spec/latest/chapters/features.html#features-indirectMemoryToImageCopy) feature **must** be enabled

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-10948) VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-10948

The [VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from
**must** support at least one of the queue types specified in
[VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)::`supportedQueues`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-10949) VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-10949

`commandBuffer` must not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-parameter) VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-pCopyMemoryToImageIndirectInfo-parameter) VUID-vkCmdCopyMemoryToImageIndirectKHR-pCopyMemoryToImageIndirectInfo-parameter

 `pCopyMemoryToImageIndirectInfo` **must** be a valid pointer to a valid [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-recording) VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToImageIndirectKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-renderpass) VUID-vkCmdCopyMemoryToImageIndirectKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-suspended) VUID-vkCmdCopyMemoryToImageIndirectKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectKHR-videocoding) VUID-vkCmdCopyMemoryToImageIndirectKHR-videocoding

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

vkCmdCopyMemoryToImageIndirectKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyMemoryToImageIndirectKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
