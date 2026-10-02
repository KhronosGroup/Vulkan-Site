# vkCmdBeginDebugUtilsLabelEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginDebugUtilsLabelEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginDebugUtilsLabelEXT - Open a command buffer debug label region

A command buffer debug label region can be opened by calling:

// Provided by VK_EXT_debug_utils
void vkCmdBeginDebugUtilsLabelEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structure
specifying parameters of the label region to open.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-parameter) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkCmdBeginDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structure

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-recording) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-cmdpool) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-cmdpool

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

vkCmdBeginDebugUtilsLabelEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCmdBeginDebugUtilsLabelEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
