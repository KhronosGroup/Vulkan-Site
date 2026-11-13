# vkCmdEndVideoCodingKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndVideoCodingKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndVideoCodingKHR - End video coding scope

To end a video coding scope, call:

// Provided by VK_KHR_video_queue
void vkCmdEndVideoCodingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoEndCodingInfoKHR*              pEndCodingInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pEndCodingInfo` is a pointer to a [VkVideoEndCodingInfoKHR](VkVideoEndCodingInfoKHR.html)
structure specifying the parameters for ending the video coding scope.

After ending a video coding scope, the video session object, the optional
video session parameters object, and all
[reference picture resources](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources)
previously bound by the corresponding [vkCmdBeginVideoCodingKHR](vkCmdBeginVideoCodingKHR.html) command
are *unbound*.

Valid Usage

* 
[](#VUID-vkCmdEndVideoCodingKHR-None-07251) VUID-vkCmdEndVideoCodingKHR-None-07251

There **must** be no [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) queries

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndVideoCodingKHR-commandBuffer-parameter) VUID-vkCmdEndVideoCodingKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndVideoCodingKHR-pEndCodingInfo-parameter) VUID-vkCmdEndVideoCodingKHR-pEndCodingInfo-parameter

 `pEndCodingInfo` **must** be a valid pointer to a valid [VkVideoEndCodingInfoKHR](VkVideoEndCodingInfoKHR.html) structure

* 
[](#VUID-vkCmdEndVideoCodingKHR-commandBuffer-recording) VUID-vkCmdEndVideoCodingKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndVideoCodingKHR-commandBuffer-cmdpool) VUID-vkCmdEndVideoCodingKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndVideoCodingKHR-renderpass) VUID-vkCmdEndVideoCodingKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdEndVideoCodingKHR-suspended) VUID-vkCmdEndVideoCodingKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndVideoCodingKHR-videocoding) VUID-vkCmdEndVideoCodingKHR-videocoding

 This command **must** only be called inside of a video coding scope

* 
[](#VUID-vkCmdEndVideoCodingKHR-bufferlevel) VUID-vkCmdEndVideoCodingKHR-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Inside | VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdEndVideoCodingKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkVideoEndCodingInfoKHR](VkVideoEndCodingInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCmdEndVideoCodingKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
