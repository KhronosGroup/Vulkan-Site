# vkCmdBindTileMemoryQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindTileMemoryQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindTileMemoryQCOM - Bind tile memory to a command buffer

To bind a range of tile memory to the command buffer, call:

// Provided by VK_QCOM_tile_memory_heap
void vkCmdBindTileMemoryQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkTileMemoryBindInfoQCOM*             pTileMemoryBindInfo);

* 
`commandBuffer` is the command buffer that the tile memory will be
bound to.

* 
`pTileMemoryBindInfo` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a pointer to a
[VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html) structure defining how tile memory is
bound.

Calling [vkCmdBindTileMemoryQCOM](#) when `pTileMemoryBindInfo` is
`NULL` is equivalent to binding no tile memory to the command buffer.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-parameter) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindTileMemoryQCOM-pTileMemoryBindInfo-parameter) VUID-vkCmdBindTileMemoryQCOM-pTileMemoryBindInfo-parameter

 If `pTileMemoryBindInfo` is not `NULL`, `pTileMemoryBindInfo` **must** be a valid pointer to a valid [VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html) structure

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-recording) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-cmdpool) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindTileMemoryQCOM-renderpass) VUID-vkCmdBindTileMemoryQCOM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBindTileMemoryQCOM-videocoding) VUID-vkCmdBindTileMemoryQCOM-videocoding

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

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindTileMemoryQCOM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkCmdBindTileMemoryQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
