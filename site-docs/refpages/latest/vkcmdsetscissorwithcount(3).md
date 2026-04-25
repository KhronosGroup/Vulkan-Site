# vkCmdSetScissorWithCount(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetScissorWithCount.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetScissorWithCount - Set the scissor count and scissor rectangular bounds dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the scissor count and
scissor rectangular bounds, call:

// Provided by VK_VERSION_1_3
void vkCmdSetScissorWithCount(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    scissorCount,
    const VkRect2D*                             pScissors);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetScissorWithCount
void vkCmdSetScissorWithCountEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    scissorCount,
    const VkRect2D*                             pScissors);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`scissorCount` specifies the scissor count.

* 
`pScissors` specifies the scissors to use for drawing.

This command sets the scissor count and scissor rectangular bounds state for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)::`scissorCount` and
`pScissors` values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetScissorWithCount-None-08971) VUID-vkCmdSetScissorWithCount-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
the [VkInstance](VkInstance.html) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdSetScissorWithCount-scissorCount-03397) VUID-vkCmdSetScissorWithCount-scissorCount-03397

`scissorCount` **must** be between `1` and
`VkPhysicalDeviceLimits`::`maxViewports`, inclusive

[](#VUID-vkCmdSetScissorWithCount-scissorCount-03398) VUID-vkCmdSetScissorWithCount-scissorCount-03398

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `scissorCount` **must** be `1`

[](#VUID-vkCmdSetScissorWithCount-x-03399) VUID-vkCmdSetScissorWithCount-x-03399

The `x` and `y` members of `offset` member of any element of
`pScissors` **must** be greater than or equal to `0`

[](#VUID-vkCmdSetScissorWithCount-offset-03400) VUID-vkCmdSetScissorWithCount-offset-03400

Evaluation of (`offset.x` +  `extent.width`) **must** not
cause a signed integer addition overflow for any element of
`pScissors`

[](#VUID-vkCmdSetScissorWithCount-offset-03401) VUID-vkCmdSetScissorWithCount-offset-03401

Evaluation of (`offset.y` +  `extent.height`) **must**
not cause a signed integer addition overflow for any element of
`pScissors`

[](#VUID-vkCmdSetScissorWithCount-commandBuffer-04820) VUID-vkCmdSetScissorWithCount-commandBuffer-04820

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-parameter) VUID-vkCmdSetScissorWithCount-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetScissorWithCount-pScissors-parameter) VUID-vkCmdSetScissorWithCount-pScissors-parameter

 `pScissors` **must** be a valid pointer to an array of `scissorCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-recording) VUID-vkCmdSetScissorWithCount-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-cmdpool) VUID-vkCmdSetScissorWithCount-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetScissorWithCount-videocoding) VUID-vkCmdSetScissorWithCount-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetScissorWithCount-scissorCount-arraylength) VUID-vkCmdSetScissorWithCount-scissorCount-arraylength

 `scissorCount` **must** be greater than `0`

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

vkCmdSetScissorWithCount is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRect2D](VkRect2D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetScissorWithCount).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
