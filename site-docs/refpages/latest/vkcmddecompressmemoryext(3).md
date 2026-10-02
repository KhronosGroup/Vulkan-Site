# vkCmdDecompressMemoryEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDecompressMemoryEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDecompressMemoryEXT - Decompress data between memory regions

To decompress memory containing compressed data, call:

// Provided by VK_EXT_memory_decompression
void vkCmdDecompressMemoryEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDecompressMemoryInfoEXT*            pDecompressMemoryInfoEXT);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDecompressMemoryInfoEXT` is a pointer to a
[VkDecompressMemoryInfoEXT](VkDecompressMemoryInfoEXT.html) structure describing the decompression
parameters.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryEXT-memoryDecompression-11761) VUID-vkCmdDecompressMemoryEXT-memoryDecompression-11761

The [`memoryDecompression`](../../../../spec/latest/chapters/features.html#features-memoryDecompression) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-parameter) VUID-vkCmdDecompressMemoryEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDecompressMemoryEXT-pDecompressMemoryInfoEXT-parameter) VUID-vkCmdDecompressMemoryEXT-pDecompressMemoryInfoEXT-parameter

 `pDecompressMemoryInfoEXT` **must** be a valid pointer to a valid [VkDecompressMemoryInfoEXT](VkDecompressMemoryInfoEXT.html) structure

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-recording) VUID-vkCmdDecompressMemoryEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDecompressMemoryEXT-renderpass) VUID-vkCmdDecompressMemoryEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryEXT-suspended) VUID-vkCmdDecompressMemoryEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryEXT-videocoding) VUID-vkCmdDecompressMemoryEXT-videocoding

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

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDecompressMemoryInfoEXT](VkDecompressMemoryInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#vkCmdDecompressMemoryEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
