# vkCmdDebugMarkerEndEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDebugMarkerEndEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDebugMarkerEndEXT - Close a command buffer marker region

A marker region can be closed by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerEndEXT(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

An application **may** open a marker region in one command buffer and close it
in another, or otherwise split marker regions across multiple command
buffers or multiple queue submissions.
When viewed from the linear series of submissions to a single queue, the
calls to `vkCmdDebugMarkerBeginEXT` and `vkCmdDebugMarkerEndEXT`
**must** be matched and balanced.

Valid Usage

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01239) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01239

There **must** be an outstanding [vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html) command
prior to the `vkCmdDebugMarkerEndEXT` on the queue that
`commandBuffer` is submitted to

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01240) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01240

If `commandBuffer` is a secondary command buffer, there **must** be an
outstanding [vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdDebugMarkerEndEXT](#)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-None-10615) VUID-vkCmdDebugMarkerEndEXT-None-10615

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html), [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdDebugMarkerEndEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCmdDebugMarkerEndEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
