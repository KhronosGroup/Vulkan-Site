# vkCmdDebugMarkerInsertEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDebugMarkerInsertEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDebugMarkerInsertEXT - Insert a marker label into a command buffer

A single marker label can be inserted into a command buffer by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerInsertEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugMarkerMarkerInfoEXT*           pMarkerInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pMarkerInfo` is a pointer to a [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html)
structure specifying the parameters of the marker to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-pMarkerInfo-parameter) VUID-vkCmdDebugMarkerInsertEXT-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html) structure

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-cmdpool

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

vkCmdDebugMarkerInsertEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCmdDebugMarkerInsertEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
