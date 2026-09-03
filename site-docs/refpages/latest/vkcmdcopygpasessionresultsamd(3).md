# vkCmdCopyGpaSessionResultsAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyGpaSessionResultsAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyGpaSessionResultsAMD - Copying GPA session results

To copy the results of a GPA session into another, call:

// Provided by VK_AMD_gpa_interface
void vkCmdCopyGpaSessionResultsAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session that is the
destination of the copy.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-parameter) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-gpaSession-parameter) VUID-vkCmdCopyGpaSessionResultsAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-recording) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-cmdpool) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-suspended) VUID-vkCmdCopyGpaSessionResultsAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-videocoding) VUID-vkCmdCopyGpaSessionResultsAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commonparent) VUID-vkCmdCopyGpaSessionResultsAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action

State |

Conditional Rendering

vkCmdCopyGpaSessionResultsAMD is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkCommandBuffer](VkCommandBuffer.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkCmdCopyGpaSessionResultsAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
