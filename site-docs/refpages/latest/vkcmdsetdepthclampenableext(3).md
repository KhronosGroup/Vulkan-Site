# vkCmdSetDepthClampEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthClampEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthClampEnableEXT - Specify dynamically whether depth clamping is enabled in the command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) enable or disable depth
clamping, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetDepthClampEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthClampEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthClampEnable` specifies whether depth clamping is enabled.

This command sets whether depth clamping is enabled or disabled for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`depthClampEnable` value
used to create the currently active pipeline.

If the depth clamping state is changed dynamically, and the pipeline was not
created with [VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html) enabled, then
depth clipping is enabled when depth clamping is disabled and vice versa.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-None-09423) VUID-vkCmdSetDepthClampEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClampEnable`](#features-extendedDynamicState3DepthClampEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClampEnableEXT-depthClamp-07449) VUID-vkCmdSetDepthClampEnableEXT-depthClamp-07449

If the [`depthClamp`](../../../../spec/latest/chapters/features.html#features-depthClamp) feature is not enabled,
`depthClampEnable` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-recording) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-videocoding) VUID-vkCmdSetDepthClampEnableEXT-videocoding

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

vkCmdSetDepthClampEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetDepthClampEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
