# vkCmdSetExclusiveScissorNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetExclusiveScissorNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetExclusiveScissorNV - Set exclusive scissor rectangles dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the exclusive scissor
rectangles, call:

// Provided by VK_NV_scissor_exclusive
void vkCmdSetExclusiveScissorNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstExclusiveScissor,
    uint32_t                                    exclusiveScissorCount,
    const VkRect2D*                             pExclusiveScissors);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstExclusiveScissor` is the index of the first exclusive scissor
rectangle whose state is updated by the command.

* 
`exclusiveScissorCount` is the number of exclusive scissor
rectangles updated by the command.

* 
`pExclusiveScissors` is a pointer to an array of [VkRect2D](VkRect2D.html)
structures defining exclusive scissor rectangles.

The scissor rectangles taken from element i of
`pExclusiveScissors` replace the current state for the scissor index
`firstExclusiveScissor` +  i, for i in [0,
`exclusiveScissorCount`).

This command sets the exclusive scissor rectangles for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html)::`pExclusiveScissors`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetExclusiveScissorNV-None-02031) VUID-vkCmdSetExclusiveScissorNV-None-02031

The [`exclusiveScissor`](../../../../spec/latest/chapters/features.html#features-exclusiveScissor) feature **must**
be enabled

* 
[](#VUID-vkCmdSetExclusiveScissorNV-firstExclusiveScissor-02034) VUID-vkCmdSetExclusiveScissorNV-firstExclusiveScissor-02034

The sum of `firstExclusiveScissor` and `exclusiveScissorCount`
**must** be between `1` and
`VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetExclusiveScissorNV-firstExclusiveScissor-02035) VUID-vkCmdSetExclusiveScissorNV-firstExclusiveScissor-02035

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `firstExclusiveScissor` **must** be `0`

* 
[](#VUID-vkCmdSetExclusiveScissorNV-exclusiveScissorCount-02036) VUID-vkCmdSetExclusiveScissorNV-exclusiveScissorCount-02036

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `exclusiveScissorCount` **must** be `1`

* 
[](#VUID-vkCmdSetExclusiveScissorNV-x-02037) VUID-vkCmdSetExclusiveScissorNV-x-02037

The `x` and `y` members of `offset` in each member of
`pExclusiveScissors` **must** be greater than or equal to `0`

* 
[](#VUID-vkCmdSetExclusiveScissorNV-offset-02038) VUID-vkCmdSetExclusiveScissorNV-offset-02038

Evaluation of (`offset.x` +  `extent.width`) for each
member of `pExclusiveScissors` **must** not cause a signed integer
addition overflow

* 
[](#VUID-vkCmdSetExclusiveScissorNV-offset-02039) VUID-vkCmdSetExclusiveScissorNV-offset-02039

Evaluation of (`offset.y` +  `extent.height`) for each
member of `pExclusiveScissors` **must** not cause a signed integer
addition overflow

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetExclusiveScissorNV-commandBuffer-parameter) VUID-vkCmdSetExclusiveScissorNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetExclusiveScissorNV-pExclusiveScissors-parameter) VUID-vkCmdSetExclusiveScissorNV-pExclusiveScissors-parameter

 `pExclusiveScissors` **must** be a valid pointer to an array of `exclusiveScissorCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-vkCmdSetExclusiveScissorNV-commandBuffer-recording) VUID-vkCmdSetExclusiveScissorNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetExclusiveScissorNV-commandBuffer-cmdpool) VUID-vkCmdSetExclusiveScissorNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetExclusiveScissorNV-videocoding) VUID-vkCmdSetExclusiveScissorNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetExclusiveScissorNV-exclusiveScissorCount-arraylength) VUID-vkCmdSetExclusiveScissorNV-exclusiveScissorCount-arraylength

 `exclusiveScissorCount` **must** be greater than `0`

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

vkCmdSetExclusiveScissorNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRect2D](VkRect2D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetExclusiveScissorNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
