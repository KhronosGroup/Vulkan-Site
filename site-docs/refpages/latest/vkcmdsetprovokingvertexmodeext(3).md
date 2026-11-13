# vkCmdSetProvokingVertexModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetProvokingVertexModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetProvokingVertexModeEXT - Specify the provoking vertex mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`provokingVertexMode` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_provoking_vertex, VK_EXT_provoking_vertex with VK_EXT_shader_object
void vkCmdSetProvokingVertexModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkProvokingVertexModeEXT                    provokingVertexMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`provokingVertexMode` specifies the `provokingVertexMode` state.

This command sets the `provokingVertexMode` state for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html)::`provokingVertexMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-None-09423) VUID-vkCmdSetProvokingVertexModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ProvokingVertexMode`](#features-extendedDynamicState3ProvokingVertexMode) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-07447) VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-07447

If `provokingVertexMode` is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](VkProvokingVertexModeEXT.html), then the
[`provokingVertexLast`](../../../../spec/latest/chapters/features.html#features-provokingVertexLast) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-parameter) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-parameter) VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-parameter

 `provokingVertexMode` **must** be a valid [VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html) value

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-recording) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-videocoding) VUID-vkCmdSetProvokingVertexModeEXT-videocoding

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

vkCmdSetProvokingVertexModeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetProvokingVertexModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
