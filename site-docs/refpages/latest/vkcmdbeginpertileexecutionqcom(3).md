# vkCmdBeginPerTileExecutionQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginPerTileExecutionQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginPerTileExecutionQCOM - Begin per-tile execution mode

To enable the per-tile execution model, call:

// Provided by VK_QCOM_tile_shading
void vkCmdBeginPerTileExecutionQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkPerTileBeginInfoQCOM*               pPerTileBeginInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pPerTileBeginInfo` is a pointer to a [VkPerTileBeginInfoQCOM](VkPerTileBeginInfoQCOM.html)
structure containing information about how the *per-tile execution
model* is started.

When *per-tile execution model* is enabled, recorded `vkCmdDraw*` or
`vkCmdDispatch*` commands are invoked per tile.
That is, the recorded draw or dispatch is invoked exactly once for each
*covered tile*.
The set of *covered tiles* for a given render pass instance consists of the
set of render pass tiles, which **can** be queried with
`[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html)`, that are completely or partially covered
by the `renderArea` for the render pass instance.
The draw or dispatch commands **may** be invoked for uncovered tiles.

Each per-tile command invocation is associated with a single tile, the
*active tile*.
These per-tile invocations are not specified to execute in any particular
order, but the size and offset of the *active tile* is available via shader
built-ins.

When *per-tile execution model* is enabled, the following restrictions
apply:

* 
Transform feedback commands such as
[vkCmdBeginTransformFeedbackEXT](vkCmdBeginTransformFeedbackEXT.html),
[vkCmdEndTransformFeedbackEXT](vkCmdEndTransformFeedbackEXT.html), [vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html), and
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html), **must** not be recorded.

* 
Query commands such as [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html),
[vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html), [vkCmdDebugMarkerEndEXT](vkCmdDebugMarkerEndEXT.html),
[vkCmdDebugMarkerInsertEXT](vkCmdDebugMarkerInsertEXT.html),
[vkCmdBeginQuery](vkCmdBeginQuery.html), and [vkCmdEndQuery](vkCmdEndQuery.html), **must** not be recorded.

* 
Event commands such as
[vkCmdWaitEvents2](vkCmdWaitEvents2.html) and
    [vkCmdWaitEvents](vkCmdWaitEvents.html) **must** not be recorded.

* 
Render pass clears like [vkCmdClearAttachments](vkCmdClearAttachments.html) **must** not be
recorded

* 
Access of an attachment with layout
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) as provided
by `[VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html)` is disallowed

* 
Any commands that would cause a invocations of one of the following
shader stages are not allowed

tessellation

* 
geometry

* 
ray tracing

* 
mesh shading

Valid Usage

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-None-10664) VUID-vkCmdBeginPerTileExecutionQCOM-None-10664

The current render pass **must** be a [tile    shading render pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-None-10665) VUID-vkCmdBeginPerTileExecutionQCOM-None-10665

The [tileShadingPerTileDispatch](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDispatch)
or [tileShadingPerTileDraw](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDraw) feature
must be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-parameter) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-pPerTileBeginInfo-parameter) VUID-vkCmdBeginPerTileExecutionQCOM-pPerTileBeginInfo-parameter

 `pPerTileBeginInfo` **must** be a valid pointer to a valid [VkPerTileBeginInfoQCOM](VkPerTileBeginInfoQCOM.html) structure

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-recording) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-cmdpool) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-renderpass) VUID-vkCmdBeginPerTileExecutionQCOM-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-videocoding) VUID-vkCmdBeginPerTileExecutionQCOM-videocoding

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

vkCmdBeginPerTileExecutionQCOM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPerTileBeginInfoQCOM](VkPerTileBeginInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginPerTileExecutionQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
