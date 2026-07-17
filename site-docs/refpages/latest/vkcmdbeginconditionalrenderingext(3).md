# vkCmdBeginConditionalRenderingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginConditionalRenderingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginConditionalRenderingEXT - Define the beginning of a conditional rendering block

To begin conditional rendering, call:

|  | This functionality is superseded by [vkCmdBeginConditionalRendering2EXT](../../../../spec/latest/chapters/drawing.html#vkCmdBeginConditionalRendering2EXT). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_conditional_rendering
void vkCmdBeginConditionalRenderingEXT(
    VkCommandBuffer                             commandBuffer,
    const VkConditionalRenderingBeginInfoEXT*   pConditionalRenderingBegin);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`pConditionalRenderingBegin` is a pointer to a
[VkConditionalRenderingBeginInfoEXT](VkConditionalRenderingBeginInfoEXT.html) structure specifying parameters
of conditional rendering.

Valid Usage

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-None-01980) VUID-vkCmdBeginConditionalRenderingEXT-None-01980

Conditional rendering **must** not already be
[active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-parameter) VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-pConditionalRenderingBegin-parameter) VUID-vkCmdBeginConditionalRenderingEXT-pConditionalRenderingBegin-parameter

 `pConditionalRenderingBegin` **must** be a valid pointer to a valid [VkConditionalRenderingBeginInfoEXT](VkConditionalRenderingBeginInfoEXT.html) structure

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-recording) VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-cmdpool) VUID-vkCmdBeginConditionalRenderingEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-suspended) VUID-vkCmdBeginConditionalRenderingEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginConditionalRenderingEXT-videocoding) VUID-vkCmdBeginConditionalRenderingEXT-videocoding

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

vkCmdBeginConditionalRenderingEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VkCommandBuffer](VkCommandBuffer.html), [VkConditionalRenderingBeginInfoEXT](VkConditionalRenderingBeginInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdBeginConditionalRenderingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
