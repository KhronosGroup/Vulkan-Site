# vkCmdSetBlendConstants(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetBlendConstants.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetBlendConstants - Set the values of blend constants

To [dynamically set and change](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the blend
constants, call:

// Provided by VK_VERSION_1_0
void vkCmdSetBlendConstants(
    VkCommandBuffer                             commandBuffer,
    const float                                 blendConstants[4]);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`blendConstants` is a pointer to an array of four values specifying
the Rc, Gc, Bc, and Ac components of the
blend constant color used in blending, depending on the
[blend factor](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blendfactors).

This command sets blend constants for subsequent drawing commands when
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
the graphics pipeline is created with [VK_DYNAMIC_STATE_BLEND_CONSTANTS](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)::`blendConstants` values used
to create the currently active pipeline.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-parameter) VUID-vkCmdSetBlendConstants-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-recording) VUID-vkCmdSetBlendConstants-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-cmdpool) VUID-vkCmdSetBlendConstants-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetBlendConstants-videocoding) VUID-vkCmdSetBlendConstants-videocoding

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

vkCmdSetBlendConstants is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetBlendConstants).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
