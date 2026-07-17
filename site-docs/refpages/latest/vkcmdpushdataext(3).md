# vkCmdPushDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushDataEXT - Update the values of push data

To update push data when using descriptor heaps, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdPushDataEXT(
    VkCommandBuffer                             commandBuffer,
    const VkPushDataInfoEXT*                    pPushDataInfo);

* 
`commandBuffer` is the command buffer in which the push data update
will be recorded.

* 
`pPushDataInfo` is a pointer to a [VkPushDataInfoEXT](VkPushDataInfoEXT.html) structure.

When `vkCmdPushDataEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

All push data is available to all shaders using the existing
`PushConstant` `Storage` `Class`.

|  | Device addresses in push data are intended as the fast path for
| --- | --- |
shader-constant data that does not fit into push data directly.
In order to maximize performance of constant data inputs, addresses should
be aligned to [`minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment), and decorated with `Alignment`
and `NonWritable` in the shader when using physical pointers. |

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-parameter) VUID-vkCmdPushDataEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushDataEXT-pPushDataInfo-parameter) VUID-vkCmdPushDataEXT-pPushDataInfo-parameter

 `pPushDataInfo` **must** be a valid pointer to a valid [VkPushDataInfoEXT](VkPushDataInfoEXT.html) structure

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-recording) VUID-vkCmdPushDataEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-cmdpool) VUID-vkCmdPushDataEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushDataEXT-videocoding) VUID-vkCmdPushDataEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDataEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPushDataInfoEXT](VkPushDataInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkCmdPushDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
