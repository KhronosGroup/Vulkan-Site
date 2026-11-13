# vkCmdEndDebugUtilsLabelEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndDebugUtilsLabelEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndDebugUtilsLabelEXT - Close a command buffer label region

A command buffer label region can be closed by calling:

// Provided by VK_EXT_debug_utils
void vkCmdEndDebugUtilsLabelEXT(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

An application **may** open a debug label region in one command buffer and
close it in another, or otherwise split debug label regions across multiple
command buffers or multiple queue submissions.
When viewed from the linear series of submissions to a single queue, the
calls to [vkCmdBeginDebugUtilsLabelEXT](vkCmdBeginDebugUtilsLabelEXT.html) and
[vkCmdEndDebugUtilsLabelEXT](#) **must** be matched and balanced.

There **can** be problems reporting command buffer debug labels during the
recording process because command buffers **may** be recorded out of sequence
with the resulting execution order.
Since the recording order **may** be different, a solitary command buffer **may**
have an inconsistent view of the debug label regions by itself.
Therefore, if an issue occurs during the recording of a command buffer, and
the environment requires returning debug labels, the implementation **may**
return only those labels it is aware of.
This is true even if the implementation is aware of only the debug labels
within the command buffer being actively recorded.

Valid Usage

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01912) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01912

There **must** be an outstanding `vkCmdBeginDebugUtilsLabelEXT` command
prior to the `vkCmdEndDebugUtilsLabelEXT` on the queue that
`commandBuffer` is submitted to

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01913) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01913

If `commandBuffer` is a secondary command buffer, there **must** be an
outstanding `vkCmdBeginDebugUtilsLabelEXT` command recorded to
`commandBuffer` that has not previously been ended by a call to
`vkCmdEndDebugUtilsLabelEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-parameter) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-recording) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-cmdpool) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-cmdpool

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

vkCmdEndDebugUtilsLabelEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCmdEndDebugUtilsLabelEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
