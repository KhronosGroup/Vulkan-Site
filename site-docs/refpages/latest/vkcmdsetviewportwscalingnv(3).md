# vkCmdSetViewportWScalingNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetViewportWScalingNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetViewportWScalingNV - Set the viewport W scaling dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the viewport **W** scaling
parameters, call:

// Provided by VK_NV_clip_space_w_scaling
void vkCmdSetViewportWScalingNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewportWScalingNV*                 pViewportWScalings);

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
`pViewportWScalings` is a pointer to an array of
[VkViewportWScalingNV](VkViewportWScalingNV.html) structures specifying viewport parameters.

The viewport parameters taken from element i of
`pViewportWScalings` replace the current state for the viewport index
`firstViewport` +  i, for i in [0,
`viewportCount`).

This command sets the viewport **W** scaling for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html)::`pViewportWScalings`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportWScalingNV-firstViewport-01324) VUID-vkCmdSetViewportWScalingNV-firstViewport-01324

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxViewports`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-parameter) VUID-vkCmdSetViewportWScalingNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetViewportWScalingNV-pViewportWScalings-parameter) VUID-vkCmdSetViewportWScalingNV-pViewportWScalings-parameter

 `pViewportWScalings` **must** be a valid pointer to an array of `viewportCount` [VkViewportWScalingNV](VkViewportWScalingNV.html) structures

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-recording) VUID-vkCmdSetViewportWScalingNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportWScalingNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetViewportWScalingNV-videocoding) VUID-vkCmdSetViewportWScalingNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportWScalingNV-viewportCount-arraylength) VUID-vkCmdSetViewportWScalingNV-viewportCount-arraylength

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

vkCmdSetViewportWScalingNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html), [VkCommandBuffer](VkCommandBuffer.html), [VkViewportWScalingNV](VkViewportWScalingNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetViewportWScalingNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
