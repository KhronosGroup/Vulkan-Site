# vkCmdCopyTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyTensorARM - Copy data between tensors

To copy data between tensor objects, call:

// Provided by VK_ARM_tensors
void vkCmdCopyTensorARM(
    VkCommandBuffer                             commandBuffer,
    const VkCopyTensorInfoARM*                  pCopyTensorInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyTensorInfo` is a pointer to [VkCopyTensorInfoARM](VkCopyTensorInfoARM.html)
structure describing the copy parameters.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyTensorARM-commandBuffer-parameter) VUID-vkCmdCopyTensorARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyTensorARM-pCopyTensorInfo-parameter) VUID-vkCmdCopyTensorARM-pCopyTensorInfo-parameter

 `pCopyTensorInfo` **must** be a valid pointer to a valid [VkCopyTensorInfoARM](VkCopyTensorInfoARM.html) structure

* 
[](#VUID-vkCmdCopyTensorARM-commandBuffer-recording) VUID-vkCmdCopyTensorARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyTensorARM-commandBuffer-cmdpool) VUID-vkCmdCopyTensorARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyTensorARM-renderpass) VUID-vkCmdCopyTensorARM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyTensorARM-suspended) VUID-vkCmdCopyTensorARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyTensorARM-videocoding) VUID-vkCmdCopyTensorARM-videocoding

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

vkCmdCopyTensorARM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyTensorInfoARM](VkCopyTensorInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
