# vkCmdSetDepthClipNegativeOneToOneEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthClipNegativeOneToOneEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthClipNegativeOneToOneEXT - Specify the negative one to one depth clip mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) `negativeOneToOne`,
call:

// Provided by VK_EXT_depth_clip_control with VK_EXT_extended_dynamic_state3, VK_EXT_depth_clip_control with VK_EXT_shader_object
void vkCmdSetDepthClipNegativeOneToOneEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    negativeOneToOne);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`negativeOneToOne` specifies the `negativeOneToOne` state.

This command sets the `negativeOneToOne` state for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html)::`negativeOneToOne`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-None-09423) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClipNegativeOneToOne`](#features-extendedDynamicState3DepthClipNegativeOneToOne) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-depthClipControl-07453) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-depthClipControl-07453

The [`depthClipControl`](../../../../spec/latest/chapters/features.html#features-depthClipControl) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-recording) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-videocoding) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-videocoding

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

vkCmdSetDepthClipNegativeOneToOneEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_depth_clip_control](VK_EXT_depth_clip_control.html), [VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
