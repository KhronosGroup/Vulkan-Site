# vkCmdEndPerTileExecutionQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndPerTileExecutionQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndPerTileExecutionQCOM - End per-tile execution mode

To disable per-tile execution model, call:

// Provided by VK_QCOM_tile_shading
void vkCmdEndPerTileExecutionQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkPerTileEndInfoQCOM*                 pPerTileEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pPerTileEndInfo` is a pointer to a [VkPerTileEndInfoQCOM](VkPerTileEndInfoQCOM.html)
structure containing information about how the *per-tile execution
model* is ended.

This command disables *per-tile execution model*.

Valid Usage

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-None-10666) VUID-vkCmdEndPerTileExecutionQCOM-None-10666

The *per-tile execution model* **must** have been enabled in the current
render pass

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-None-10667) VUID-vkCmdEndPerTileExecutionQCOM-None-10667

The current render pass **must** be a [tile    shading render pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-parameter) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-pPerTileEndInfo-parameter) VUID-vkCmdEndPerTileExecutionQCOM-pPerTileEndInfo-parameter

 `pPerTileEndInfo` **must** be a valid pointer to a valid [VkPerTileEndInfoQCOM](VkPerTileEndInfoQCOM.html) structure

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-recording) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-cmdpool) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-renderpass) VUID-vkCmdEndPerTileExecutionQCOM-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-videocoding) VUID-vkCmdEndPerTileExecutionQCOM-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdEndPerTileExecutionQCOM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPerTileEndInfoQCOM](VkPerTileEndInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdEndPerTileExecutionQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
