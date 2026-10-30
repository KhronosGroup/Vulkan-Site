# vkCmdBeginConditionalRendering2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginConditionalRendering2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginConditionalRendering2EXT - Define the beginning of a conditional rendering block

To begin conditional rendering, call:

// Provided by VK_KHR_device_address_commands with VK_EXT_conditional_rendering
void vkCmdBeginConditionalRendering2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkConditionalRenderingBeginInfo2EXT*  pConditionalRenderingBegin);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`pConditionalRenderingBegin` is a pointer to a
[VkConditionalRenderingBeginInfo2EXT](VkConditionalRenderingBeginInfo2EXT.html) structure specifying
parameters of conditional rendering.

Valid Usage

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-None-13063) VUID-vkCmdBeginConditionalRendering2EXT-None-13063

Conditional rendering **must** not already be
[active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-parameter) VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-pConditionalRenderingBegin-parameter) VUID-vkCmdBeginConditionalRendering2EXT-pConditionalRenderingBegin-parameter

 `pConditionalRenderingBegin` **must** be a valid pointer to a valid [VkConditionalRenderingBeginInfo2EXT](VkConditionalRenderingBeginInfo2EXT.html) structure

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-recording) VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-cmdpool) VUID-vkCmdBeginConditionalRendering2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-suspended) VUID-vkCmdBeginConditionalRendering2EXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginConditionalRendering2EXT-videocoding) VUID-vkCmdBeginConditionalRendering2EXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginConditionalRendering2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkConditionalRenderingBeginInfo2EXT](VkConditionalRenderingBeginInfo2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdBeginConditionalRendering2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
