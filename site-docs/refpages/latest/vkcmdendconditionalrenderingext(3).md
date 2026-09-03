# vkCmdEndConditionalRenderingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndConditionalRenderingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndConditionalRenderingEXT - Define the end of a conditional rendering block

To end conditional rendering, call:

// Provided by VK_EXT_conditional_rendering
void vkCmdEndConditionalRenderingEXT(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

Once ended, conditional rendering becomes inactive.

Valid Usage

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-None-01985) VUID-vkCmdEndConditionalRenderingEXT-None-01985

Conditional rendering **must** be [active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering)

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-None-01986) VUID-vkCmdEndConditionalRenderingEXT-None-01986

If conditional rendering was made
[active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering) outside of a render pass
instance, it **must** not be ended inside a render pass instance

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-None-01987) VUID-vkCmdEndConditionalRenderingEXT-None-01987

If conditional rendering was made
[active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering) within a subpass it **must** be
ended in the same subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-parameter) VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-recording) VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-cmdpool) VUID-vkCmdEndConditionalRenderingEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-suspended) VUID-vkCmdEndConditionalRenderingEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndConditionalRenderingEXT-videocoding) VUID-vkCmdEndConditionalRenderingEXT-videocoding

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

vkCmdEndConditionalRenderingEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdEndConditionalRenderingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
