# vkCmdDebugMarkerBeginEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDebugMarkerBeginEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDebugMarkerBeginEXT - Open a command buffer marker region

A marker region can be opened by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerBeginEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugMarkerMarkerInfoEXT*           pMarkerInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pMarkerInfo` is a pointer to a [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html)
structure specifying the parameters of the marker region to open.

Valid Usage

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-None-10614) VUID-vkCmdDebugMarkerBeginEXT-None-10614

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-pMarkerInfo-parameter) VUID-vkCmdDebugMarkerBeginEXT-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html) structure

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-cmdpool

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

vkCmdDebugMarkerBeginEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCmdDebugMarkerBeginEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
