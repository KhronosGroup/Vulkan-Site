# vkCmdSetLineWidth(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetLineWidth.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetLineWidth - Set line width dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the line width, call:

// Provided by VK_VERSION_1_0
void vkCmdSetLineWidth(
    VkCommandBuffer                             commandBuffer,
    float                                       lineWidth);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineWidth` is the width of rasterized line segments.

This command sets the line width for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_LINE_WIDTH](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`lineWidth` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineWidth-lineWidth-00788) VUID-vkCmdSetLineWidth-lineWidth-00788

If the [`wideLines`](../../../../spec/latest/chapters/features.html#features-wideLines) feature is not enabled,
`lineWidth` **must** be `1.0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-parameter) VUID-vkCmdSetLineWidth-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-recording) VUID-vkCmdSetLineWidth-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-cmdpool) VUID-vkCmdSetLineWidth-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetLineWidth-videocoding) VUID-vkCmdSetLineWidth-videocoding

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

vkCmdSetLineWidth is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetLineWidth).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
