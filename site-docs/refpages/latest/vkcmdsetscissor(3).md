# vkCmdSetScissor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetScissor.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetScissor - Set scissor rectangles dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the scissor rectangles,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetScissor(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstScissor,
    uint32_t                                    scissorCount,
    const VkRect2D*                             pScissors);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstScissor` is the index of the first scissor whose state is
updated by the command.

* 
`scissorCount` is the number of scissors whose rectangles are
updated by the command.

* 
`pScissors` is a pointer to an array of [VkRect2D](VkRect2D.html) structures
defining scissor rectangles.

The scissor rectangles taken from element i of `pScissors` replace
the current state for the scissor index `firstScissor` +  i,
for i in [0, `scissorCount`).

This command sets the scissor rectangles for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)::`pScissors` values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetScissor-firstScissor-00592) VUID-vkCmdSetScissor-firstScissor-00592

The sum of `firstScissor` and `scissorCount` **must** be between
`1` and `VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetScissor-firstScissor-00593) VUID-vkCmdSetScissor-firstScissor-00593

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `firstScissor` **must** be `0`

* 
[](#VUID-vkCmdSetScissor-scissorCount-00594) VUID-vkCmdSetScissor-scissorCount-00594

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `scissorCount` **must** be `1`

* 
[](#VUID-vkCmdSetScissor-x-00595) VUID-vkCmdSetScissor-x-00595

The `x` and `y` members of `offset` member of any element of
`pScissors` **must** be greater than or equal to `0`

* 
[](#VUID-vkCmdSetScissor-offset-00596) VUID-vkCmdSetScissor-offset-00596

Evaluation of (`offset.x` +  `extent.width`) **must** not
cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-vkCmdSetScissor-offset-00597) VUID-vkCmdSetScissor-offset-00597

Evaluation of (`offset.y` +  `extent.height`) **must**
not cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-vkCmdSetScissor-viewportScissor2D-04789) VUID-vkCmdSetScissor-viewportScissor2D-04789

If this command is recorded in a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled, then this function **must** not be called

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetScissor-commandBuffer-parameter) VUID-vkCmdSetScissor-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetScissor-pScissors-parameter) VUID-vkCmdSetScissor-pScissors-parameter

 `pScissors` **must** be a valid pointer to an array of `scissorCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-vkCmdSetScissor-commandBuffer-recording) VUID-vkCmdSetScissor-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetScissor-commandBuffer-cmdpool) VUID-vkCmdSetScissor-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetScissor-videocoding) VUID-vkCmdSetScissor-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetScissor-scissorCount-arraylength) VUID-vkCmdSetScissor-scissorCount-arraylength

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

vkCmdSetScissor is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRect2D](VkRect2D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetScissor).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
