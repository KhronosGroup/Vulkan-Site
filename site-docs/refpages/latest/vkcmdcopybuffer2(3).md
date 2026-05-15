# vkCmdCopyBuffer2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyBuffer2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyBuffer2 - Copy data between buffer regions

To copy data between buffer objects, call:

// Provided by VK_VERSION_1_3
void vkCmdCopyBuffer2(
    VkCommandBuffer                             commandBuffer,
    const VkCopyBufferInfo2*                    pCopyBufferInfo);

// Provided by VK_KHR_copy_commands2
// Equivalent to vkCmdCopyBuffer2
void vkCmdCopyBuffer2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyBufferInfo2*                    pCopyBufferInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyBufferInfo` is a pointer to a [VkCopyBufferInfo2](VkCopyBufferInfo2.html)
structure describing the copy parameters.

Each source region specified by `pCopyBufferInfo->pRegions` is copied
from the source buffer to the destination region of the destination buffer.
If any of the specified regions in `pCopyBufferInfo->srcBuffer` overlaps
in memory with any of the specified regions in
`pCopyBufferInfo->dstBuffer`, values read from those overlapping regions
are **undefined**.

Valid Usage

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-01822) VUID-vkCmdCopyBuffer2-commandBuffer-01822

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-01823) VUID-vkCmdCopyBuffer2-commandBuffer-01823

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-01824) VUID-vkCmdCopyBuffer2-commandBuffer-01824

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-parameter) VUID-vkCmdCopyBuffer2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyBuffer2-pCopyBufferInfo-parameter) VUID-vkCmdCopyBuffer2-pCopyBufferInfo-parameter

 `pCopyBufferInfo` **must** be a valid pointer to a valid [VkCopyBufferInfo2](VkCopyBufferInfo2.html) structure

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-recording) VUID-vkCmdCopyBuffer2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyBuffer2-commandBuffer-cmdpool) VUID-vkCmdCopyBuffer2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyBuffer2-renderpass) VUID-vkCmdCopyBuffer2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyBuffer2-suspended) VUID-vkCmdCopyBuffer2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyBuffer2-videocoding) VUID-vkCmdCopyBuffer2-videocoding

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

vkCmdCopyBuffer2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyBufferInfo2](VkCopyBufferInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyBuffer2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
