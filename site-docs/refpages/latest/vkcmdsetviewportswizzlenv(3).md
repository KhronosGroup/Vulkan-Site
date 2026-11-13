# vkCmdSetViewportSwizzleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetViewportSwizzleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetViewportSwizzleNV - Specify the viewport swizzle state dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the viewport swizzle state,
call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_viewport_swizzle, VK_EXT_shader_object with VK_NV_viewport_swizzle
void vkCmdSetViewportSwizzleNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewportSwizzleNV*                  pViewportSwizzles);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose parameters
are updated by the command.

* 
`viewportCount` is the number of viewports whose parameters are
updated by the command.

* 
`pViewportSwizzles` is a pointer to an array of
[VkViewportSwizzleNV](VkViewportSwizzleNV.html) structures specifying viewport swizzles.

This command sets the viewport swizzle state for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html)::`viewportCount`, and
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html)::`pViewportSwizzles`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportSwizzleNV-None-09423) VUID-vkCmdSetViewportSwizzleNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ViewportSwizzle`](#features-extendedDynamicState3ViewportSwizzle) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-parameter) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetViewportSwizzleNV-pViewportSwizzles-parameter) VUID-vkCmdSetViewportSwizzleNV-pViewportSwizzles-parameter

 `pViewportSwizzles` **must** be a valid pointer to an array of `viewportCount` valid [VkViewportSwizzleNV](VkViewportSwizzleNV.html) structures

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-recording) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetViewportSwizzleNV-videocoding) VUID-vkCmdSetViewportSwizzleNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportSwizzleNV-viewportCount-arraylength) VUID-vkCmdSetViewportSwizzleNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

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

vkCmdSetViewportSwizzleNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html), [VkCommandBuffer](VkCommandBuffer.html), [VkViewportSwizzleNV](VkViewportSwizzleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetViewportSwizzleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
