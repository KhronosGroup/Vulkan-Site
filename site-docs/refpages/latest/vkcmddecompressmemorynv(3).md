# vkCmdDecompressMemoryNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDecompressMemoryNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDecompressMemoryNV - Decompress memory containing compressed data

To decompress memory containing compressed data, call:

// Provided by VK_NV_memory_decompression
void vkCmdDecompressMemoryNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    decompressRegionCount,
    const VkDecompressMemoryRegionNV*           pDecompressMemoryRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`decompressRegionCount` is the number of memory regions to
decompress.

* 
`pDecompressMemoryRegions` is a pointer to an array of
`decompressRegionCount` [VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html) structures
specifying decompression parameters.

Each region specified in `pDecompressMemoryRegions` is decompressed from
the compressed to decompressed region based on the decompression method
specified in [VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html)::`decompressionMethod`.
If the regions containing compressed and decompressed data overlap, the
decompression behavior is **undefined**.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryNV-None-07684) VUID-vkCmdDecompressMemoryNV-None-07684

The [`memoryDecompression`](../../../../spec/latest/chapters/features.html#features-memoryDecompression) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-parameter) VUID-vkCmdDecompressMemoryNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDecompressMemoryNV-pDecompressMemoryRegions-parameter) VUID-vkCmdDecompressMemoryNV-pDecompressMemoryRegions-parameter

 `pDecompressMemoryRegions` **must** be a valid pointer to an array of `decompressRegionCount` valid [VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html) structures

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-recording) VUID-vkCmdDecompressMemoryNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDecompressMemoryNV-renderpass) VUID-vkCmdDecompressMemoryNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryNV-suspended) VUID-vkCmdDecompressMemoryNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryNV-videocoding) VUID-vkCmdDecompressMemoryNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDecompressMemoryNV-decompressRegionCount-arraylength) VUID-vkCmdDecompressMemoryNV-decompressRegionCount-arraylength

 `decompressRegionCount` **must** be greater than `0`

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

vkCmdDecompressMemoryNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_memory_decompression](VK_NV_memory_decompression.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#vkCmdDecompressMemoryNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
