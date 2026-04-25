# vkCmdSetAttachmentFeedbackLoopEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetAttachmentFeedbackLoopEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetAttachmentFeedbackLoopEnableEXT - Specify whether attachment feedback loops are enabled dynamically on a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) whether a pipeline **can**
access a resource as a non-attachment while it is also used as an attachment
that is written to, call:

// Provided by VK_EXT_attachment_feedback_loop_dynamic_state
void vkCmdSetAttachmentFeedbackLoopEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkImageAspectFlags                          aspectMask);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`aspectMask` specifies the types of attachments for which feedback
loops will be enabled.
Attachment types whose aspects are not included in `aspectMask` will
have feedback loops disabled.

For attachments that are written to in a render pass, only attachments with
the aspects specified in `aspectMask` **can** be accessed as
non-attachments by subsequent [drawing commands](../../../../spec/latest/chapters/drawing.html#drawing).

Valid Usage

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopDynamicState-08862) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopDynamicState-08862

The [    `attachmentFeedbackLoopDynamicState`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopDynamicState) feature **must** be enabled

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-08863) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-08863

`aspectMask` **must** only include [VK_IMAGE_ASPECT_NONE](VkImageAspectFlagBits.html),
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), and
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopLayout-08864) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopLayout-08864

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`aspectMask` **must** be [VK_IMAGE_ASPECT_NONE](VkImageAspectFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-parameter) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-parameter) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html) values

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-recording) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-videocoding) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-videocoding

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

vkCmdSetAttachmentFeedbackLoopEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_attachment_feedback_loop_dynamic_state](VK_EXT_attachment_feedback_loop_dynamic_state.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImageAspectFlags](VkImageAspectFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
