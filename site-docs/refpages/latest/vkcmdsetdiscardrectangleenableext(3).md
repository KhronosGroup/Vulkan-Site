# vkCmdSetDiscardRectangleEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDiscardRectangleEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDiscardRectangleEnableEXT - Enable discard rectangles dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) whether discard rectangles
are enabled, call:

// Provided by VK_EXT_discard_rectangles
void vkCmdSetDiscardRectangleEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    discardRectangleEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`discardRectangleEnable` specifies whether discard rectangles are
enabled or not.

This command sets the discard rectangle enable for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is implied by the
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)::`discardRectangleCount`
value used to create the currently active pipeline, where a non-zero
`discardRectangleCount` implicitly enables discard rectangles, otherwise
they are disabled.

Valid Usage

* 
[](#VUID-vkCmdSetDiscardRectangleEnableEXT-specVersion-07851) VUID-vkCmdSetDiscardRectangleEnableEXT-specVersion-07851

The `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` extension **must** be enabled, and
the implementation **must** support at least `specVersion` `2` of this
extension

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-parameter) VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-recording) VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetDiscardRectangleEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDiscardRectangleEnableEXT-videocoding) VUID-vkCmdSetDiscardRectangleEnableEXT-videocoding

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

vkCmdSetDiscardRectangleEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDiscardRectangleEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
