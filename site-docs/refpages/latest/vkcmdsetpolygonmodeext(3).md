# vkCmdSetPolygonModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPolygonModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPolygonModeEXT - Specify polygon mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the polygon mode, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetPolygonModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkPolygonMode                               polygonMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`polygonMode` specifies polygon mode.

This command sets the polygon mode for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`polygonMode` value used
to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetPolygonModeEXT-None-09423) VUID-vkCmdSetPolygonModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3PolygonMode`](#features-extendedDynamicState3PolygonMode) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetPolygonModeEXT-fillModeNonSolid-07424) VUID-vkCmdSetPolygonModeEXT-fillModeNonSolid-07424

    If the [`fillModeNonSolid`](../../../../spec/latest/chapters/features.html#features-fillModeNonSolid) feature is
    not enabled, `polygonMode` **must** be [VK_POLYGON_MODE_FILL](VkPolygonMode.html)
or [VK_POLYGON_MODE_FILL_RECTANGLE_NV](VkPolygonMode.html)

[](#VUID-vkCmdSetPolygonModeEXT-polygonMode-07425) VUID-vkCmdSetPolygonModeEXT-polygonMode-07425

If the `[VK_NV_fill_rectangle](VK_NV_fill_rectangle.html)` extension is not enabled,
`polygonMode` **must** not be [VK_POLYGON_MODE_FILL_RECTANGLE_NV](VkPolygonMode.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-parameter) VUID-vkCmdSetPolygonModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPolygonModeEXT-polygonMode-parameter) VUID-vkCmdSetPolygonModeEXT-polygonMode-parameter

 `polygonMode` **must** be a valid [VkPolygonMode](VkPolygonMode.html) value

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-recording) VUID-vkCmdSetPolygonModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetPolygonModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPolygonModeEXT-videocoding) VUID-vkCmdSetPolygonModeEXT-videocoding

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

vkCmdSetPolygonModeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPolygonMode](VkPolygonMode.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetPolygonModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
