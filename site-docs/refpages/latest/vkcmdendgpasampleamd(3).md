# vkCmdEndGpaSampleAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndGpaSampleAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndGpaSampleAMD - Ending a sample

To end a GPA sample, call:

// Provided by VK_AMD_gpa_interface
void vkCmdEndGpaSampleAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession,
    uint32_t                                    sampleID);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session that is recording the
sample.

* 
`sampleID` is a unique sample ID returned by a previous call to
[vkCmdBeginGpaSampleAMD](vkCmdBeginGpaSampleAMD.html).

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-parameter) VUID-vkCmdEndGpaSampleAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndGpaSampleAMD-gpaSession-parameter) VUID-vkCmdEndGpaSampleAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-recording) VUID-vkCmdEndGpaSampleAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-cmdpool) VUID-vkCmdEndGpaSampleAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndGpaSampleAMD-suspended) VUID-vkCmdEndGpaSampleAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndGpaSampleAMD-videocoding) VUID-vkCmdEndGpaSampleAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndGpaSampleAMD-commonparent) VUID-vkCmdEndGpaSampleAMD-commonparent

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

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndGpaSampleAMD is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkCommandBuffer](VkCommandBuffer.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkCmdEndGpaSampleAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
