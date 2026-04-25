# vkCmdSetDiscardRectangleModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDiscardRectangleModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDiscardRectangleModeEXT - Sets the discard rectangle mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the discard rectangle mode,
call:

// Provided by VK_EXT_discard_rectangles
void vkCmdSetDiscardRectangleModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkDiscardRectangleModeEXT                   discardRectangleMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`discardRectangleMode` specifies the discard rectangle mode for all
discard rectangles, either inclusive or exclusive.

This command sets the discard rectangle mode for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)::`discardRectangleMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-specVersion-07852) VUID-vkCmdSetDiscardRectangleModeEXT-specVersion-07852

The `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension **must** be enabled, and
the implementation **must** support at least `specVersion` `2` of this
extension

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-parameter) VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-discardRectangleMode-parameter) VUID-vkCmdSetDiscardRectangleModeEXT-discardRectangleMode-parameter

 `discardRectangleMode` **must** be a valid [VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html) value

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-recording) VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetDiscardRectangleModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDiscardRectangleModeEXT-videocoding) VUID-vkCmdSetDiscardRectangleModeEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDiscardRectangleModeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDiscardRectangleModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
