# vkCmdSetRasterizationStreamEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetRasterizationStreamEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetRasterizationStreamEXT - Specify the rasterization stream dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`rasterizationStream` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_transform_feedback, VK_EXT_shader_object with VK_EXT_transform_feedback
void vkCmdSetRasterizationStreamEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    rasterizationStream);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`rasterizationStream` specifies the `rasterizationStream` state.

This command sets the `rasterizationStream` state for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html)::`rasterizationStream`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-None-09423) VUID-vkCmdSetRasterizationStreamEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3RasterizationStream`](#features-extendedDynamicState3RasterizationStream) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetRasterizationStreamEXT-transformFeedback-07411) VUID-vkCmdSetRasterizationStreamEXT-transformFeedback-07411

The [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
**must** be enabled

[](#VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07412) VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07412

`rasterizationStream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackStreams`

[](#VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07413) VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07413

`rasterizationStream` **must** be zero if
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackRasterizationStreamSelect`
is [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-parameter) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-recording) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-cmdpool) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-videocoding) VUID-vkCmdSetRasterizationStreamEXT-videocoding

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

vkCmdSetRasterizationStreamEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetRasterizationStreamEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
