# vkCmdSetDepthClampRangeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthClampRangeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthClampRangeEXT - Set the viewport depth clamp range dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the viewport depth clamp
range parameters, call:

// Provided by VK_EXT_depth_clamp_control, VK_EXT_depth_clamp_control with VK_EXT_shader_object
void vkCmdSetDepthClampRangeEXT(
    VkCommandBuffer                             commandBuffer,
    VkDepthClampModeEXT                         depthClampMode,
    const VkDepthClampRangeEXT*                 pDepthClampRange);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthClampMode` determines how the clamp range is determined for
each viewport.

* 
`pDepthClampRange` sets the depth clamp range for all viewports if
`depthClampMode` is
[VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](VkDepthClampModeEXT.html).

This command sets the viewport depth clamp range for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html)::`depthClampMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-pDepthClampRange-09647) VUID-vkCmdSetDepthClampRangeEXT-pDepthClampRange-09647

If `depthClampMode` is
[VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](VkDepthClampModeEXT.html), then
`pDepthClampRange` must be a valid pointer to a valid
`VkDepthClampRangeEXT` structure

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-depthClampMode-parameter) VUID-vkCmdSetDepthClampRangeEXT-depthClampMode-parameter

 `depthClampMode` **must** be a valid [VkDepthClampModeEXT](VkDepthClampModeEXT.html) value

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-pDepthClampRange-parameter) VUID-vkCmdSetDepthClampRangeEXT-pDepthClampRange-parameter

 If `pDepthClampRange` is not `NULL`, `pDepthClampRange` **must** be a valid pointer to a valid [VkDepthClampRangeEXT](VkDepthClampRangeEXT.html) structure

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-recording) VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClampRangeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthClampRangeEXT-videocoding) VUID-vkCmdSetDepthClampRangeEXT-videocoding

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

vkCmdSetDepthClampRangeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_depth_clamp_control](VK_EXT_depth_clamp_control.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDepthClampModeEXT](VkDepthClampModeEXT.html), [VkDepthClampRangeEXT](VkDepthClampRangeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDepthClampRangeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
