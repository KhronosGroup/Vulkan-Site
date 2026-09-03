# vkCmdBeginGpaSessionAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginGpaSessionAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginGpaSessionAMD - Begin a GPA session

To begin a GPA session, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCmdBeginGpaSessionAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session to begin.

Valid Usage

* 
[](#VUID-vkCmdBeginGpaSessionAMD-gpaSession-12409) VUID-vkCmdBeginGpaSessionAMD-gpaSession-12409

If `gpaSession` has been used previously to begin and end a session,
[vkResetGpaSessionAMD](vkResetGpaSessionAMD.html) **must** have first been called

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-12410) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-12410

If another GPA session has been started with
`vkCmdBeginGpaSessionAMD` in `commandBuffer`, it **must** have been
ended using [vkCmdEndGpaSessionAMD](vkCmdEndGpaSessionAMD.html) before this call

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-parameter) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginGpaSessionAMD-gpaSession-parameter) VUID-vkCmdBeginGpaSessionAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-recording) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-cmdpool) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginGpaSessionAMD-suspended) VUID-vkCmdBeginGpaSessionAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginGpaSessionAMD-videocoding) VUID-vkCmdBeginGpaSessionAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commonparent) VUID-vkCmdBeginGpaSessionAMD-commonparent

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

vkCmdBeginGpaSessionAMD is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkCommandBuffer](VkCommandBuffer.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkCmdBeginGpaSessionAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
