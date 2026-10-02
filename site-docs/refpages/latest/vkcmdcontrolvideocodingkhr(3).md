# vkCmdControlVideoCodingKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdControlVideoCodingKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdControlVideoCodingKHR - Control video coding parameters

To apply dynamic controls to the bound video session object, call:

// Provided by VK_KHR_video_queue
void vkCmdControlVideoCodingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoCodingControlInfoKHR*          pCodingControlInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pCodingControlInfo` is a pointer to a
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) structure specifying the control
parameters.

The control parameters provided in this call are applied to the video
session at the time the command executes on the device and are in effect
until a subsequent call to this command with the same video session bound
changes the corresponding control parameters.

A newly created video session **must** be reset before performing video coding
operations using it by including [VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html)
in `pCodingControlInfo->flags`.
The reset operation also returns all DPB slots of the video session to the
[inactive state](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states).
Correspondingly, any DPB slot index associated with the
[bound reference picture resources](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources) is
removed.

For encode sessions, the reset operation returns [rate control](../../../../spec/latest/chapters/videocoding.html#encode-rate-control) configuration to implementation default settings and sets the
[video encode quality level](../../../../spec/latest/chapters/videocoding.html#encode-quality-level) to zero.

After video coding operations are performed using a video session, the reset
operation **can** be used to return the video session to the same *initial*
state as after the reset of a newly created video session.
This **can** be used, for example, when different video sequences are needed to
be processed with the same video session object.

If `pCodingControlInfo->flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), then the command
replaces the [rate control](../../../../spec/latest/chapters/videocoding.html#encode-rate-control) configuration maintained
by the video session with the configuration specified in the
[VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure included in the
`pCodingControlInfo->pNext` chain.

If `pCodingControlInfo->flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), then the command
changes the current [video encode quality level](../../../../spec/latest/chapters/videocoding.html#encode-quality-level) to
the value specified in the `qualityLevel` member of the
[VkVideoEncodeQualityLevelInfoKHR](VkVideoEncodeQualityLevelInfoKHR.html) structure included in the
`pCodingControlInfo->pNext` chain.

Valid Usage

* 
[](#VUID-vkCmdControlVideoCodingKHR-flags-07017) VUID-vkCmdControlVideoCodingKHR-flags-07017

If `pCodingControlInfo->flags` does not include
[VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), then the bound video
session **must** not be in [uninitialized](../../../../spec/latest/chapters/videocoding.html#video-session-uninitialized)
state at the time the command is executed on the device

* 
[](#VUID-vkCmdControlVideoCodingKHR-pCodingControlInfo-08243) VUID-vkCmdControlVideoCodingKHR-pCodingControlInfo-08243

If the bound video session was not created with an encode operation,
then `pCodingControlInfo->flags` **must** not include
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html) or
[VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdControlVideoCodingKHR-commandBuffer-parameter) VUID-vkCmdControlVideoCodingKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdControlVideoCodingKHR-pCodingControlInfo-parameter) VUID-vkCmdControlVideoCodingKHR-pCodingControlInfo-parameter

 `pCodingControlInfo` **must** be a valid pointer to a valid [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) structure

* 
[](#VUID-vkCmdControlVideoCodingKHR-commandBuffer-recording) VUID-vkCmdControlVideoCodingKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdControlVideoCodingKHR-commandBuffer-cmdpool) VUID-vkCmdControlVideoCodingKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdControlVideoCodingKHR-renderpass) VUID-vkCmdControlVideoCodingKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdControlVideoCodingKHR-suspended) VUID-vkCmdControlVideoCodingKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdControlVideoCodingKHR-videocoding) VUID-vkCmdControlVideoCodingKHR-videocoding

 This command **must** only be called inside of a video coding scope

* 
[](#VUID-vkCmdControlVideoCodingKHR-bufferlevel) VUID-vkCmdControlVideoCodingKHR-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Inside | VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdControlVideoCodingKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCmdControlVideoCodingKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
