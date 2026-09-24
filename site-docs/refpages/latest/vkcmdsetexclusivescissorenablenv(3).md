# vkCmdSetExclusiveScissorEnableNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetExclusiveScissorEnableNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetExclusiveScissorEnableNV - Dynamically enable each exclusive scissor for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) whether an exclusive scissor
is enabled or not, call:

// Provided by VK_NV_scissor_exclusive
void vkCmdSetExclusiveScissorEnableNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstExclusiveScissor,
    uint32_t                                    exclusiveScissorCount,
    const VkBool32*                             pExclusiveScissorEnables);

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
`pExclusiveScissorEnables` is a pointer to an array of
`VkBool32` values defining whether the exclusive scissor is
enabled.

The exclusive scissor enables taken from element i of
`pExclusiveScissorEnables` replace the current state for the scissor
index `firstExclusiveScissor` +  i, for i in [0,
`exclusiveScissorCount`).

This command sets the exclusive scissor enable for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is implied by the
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html)::`exclusiveScissorCount`
value used to create the currently active pipeline, where all
`exclusiveScissorCount` exclusive scissors are implicitly enabled and
the remainder up to `VkPhysicalDeviceLimits`::`maxViewports` are
implicitly disabled.

Valid Usage

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-exclusiveScissor-07853) VUID-vkCmdSetExclusiveScissorEnableNV-exclusiveScissor-07853

The [`exclusiveScissor`](../../../../spec/latest/chapters/features.html#features-exclusiveScissor) feature **must**
be enabled, and the implementation **must** support at least
`specVersion` `2` of the `[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html)` extension

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-parameter) VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-pExclusiveScissorEnables-parameter) VUID-vkCmdSetExclusiveScissorEnableNV-pExclusiveScissorEnables-parameter

 `pExclusiveScissorEnables` **must** be a valid pointer to an array of `exclusiveScissorCount` `VkBool32` values

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-recording) VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-cmdpool) VUID-vkCmdSetExclusiveScissorEnableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-videocoding) VUID-vkCmdSetExclusiveScissorEnableNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetExclusiveScissorEnableNV-exclusiveScissorCount-arraylength) VUID-vkCmdSetExclusiveScissorEnableNV-exclusiveScissorCount-arraylength

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

vkCmdSetExclusiveScissorEnableNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetExclusiveScissorEnableNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
