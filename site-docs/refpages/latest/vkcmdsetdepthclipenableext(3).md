# vkCmdSetDepthClipEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthClipEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthClipEnableEXT - Specify dynamically whether depth clipping is enabled in the command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) enable or disable depth
clipping, call:

// Provided by VK_EXT_depth_clip_enable with VK_EXT_extended_dynamic_state3, VK_EXT_depth_clip_enable with VK_EXT_shader_object
void vkCmdSetDepthClipEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthClipEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthClipEnable` specifies whether depth clipping is enabled.

This command sets whether depth clipping is enabled or disabled for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html)::`depthClipEnable`
value used to create the currently active pipeline, or by the inverse of
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`depthClampEnable` if
`VkPipelineRasterizationDepthClipStateCreateInfoEXT` is not specified.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-None-09423) VUID-vkCmdSetDepthClipEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClipEnable`](#features-extendedDynamicState3DepthClipEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClipEnableEXT-depthClipEnable-07451) VUID-vkCmdSetDepthClipEnableEXT-depthClipEnable-07451

The [`depthClipEnable`](../../../../spec/latest/chapters/features.html#features-depthClipEnable) feature **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-recording) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-videocoding) VUID-vkCmdSetDepthClipEnableEXT-videocoding

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

vkCmdSetDepthClipEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_depth_clip_enable](VK_EXT_depth_clip_enable.html), [VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetDepthClipEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
