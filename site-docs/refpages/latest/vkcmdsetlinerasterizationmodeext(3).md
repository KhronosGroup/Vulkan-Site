# vkCmdSetLineRasterizationModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetLineRasterizationModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetLineRasterizationModeEXT - Specify the line rasterization mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`lineRasterizationMode` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization, VK_EXT_line_rasterization with VK_EXT_shader_object
void vkCmdSetLineRasterizationModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkLineRasterizationModeEXT                  lineRasterizationMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineRasterizationMode` specifies the `lineRasterizationMode`
state.

This command sets the `lineRasterizationMode` state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html)::`lineRasterizationMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-None-09423) VUID-vkCmdSetLineRasterizationModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3LineRasterizationMode`](#features-extendedDynamicState3LineRasterizationMode) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07418) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07418

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html), then the
[`rectangularLines`](../../../../spec/latest/chapters/features.html#features-rectangularLines) feature **must** be
enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07419) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07419

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html), then the
[`bresenhamLines`](../../../../spec/latest/chapters/features.html#features-bresenhamLines) feature **must** be
enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07420) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07420

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the
[`smoothLines`](../../../../spec/latest/chapters/features.html#features-smoothLines) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-parameter) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-parameter) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-parameter

 `lineRasterizationMode` **must** be a valid [VkLineRasterizationModeEXT](VkLineRasterizationMode.html) value

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-recording) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-videocoding) VUID-vkCmdSetLineRasterizationModeEXT-videocoding

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

vkCmdSetLineRasterizationModeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkLineRasterizationMode](VkLineRasterizationMode.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetLineRasterizationModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
