# vkCmdSetDispatchParametersARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDispatchParametersARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDispatchParametersARM - Set parameters that affect dispatch commands

To set parameters that affect dispatch commands, call:

// Provided by VK_ARM_scheduling_controls
void vkCmdSetDispatchParametersARM(
    VkCommandBuffer                             commandBuffer,
    const VkDispatchParametersARM*              pDispatchParameters);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDispatchParameters` is a pointer to a
[VkDispatchParametersARM](VkDispatchParametersARM.html) structure specifying the dispatch
parameters to be set.

Parameters set using `vkCmdSetDispatchParametersARM` affect the
following dispatch commands:

* 
[vkCmdDispatch](vkCmdDispatch.html)

* 
[vkCmdDispatchBase](vkCmdDispatchBase.html)

* 
[vkCmdDispatchIndirect](vkCmdDispatchIndirect.html)

Valid Usage

* 
[](#VUID-vkCmdSetDispatchParametersARM-schedulingControlsFlags-12391) VUID-vkCmdSetDispatchParametersARM-schedulingControlsFlags-12391

[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsFlags`
**must** contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_ARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDispatchParametersARM-commandBuffer-parameter) VUID-vkCmdSetDispatchParametersARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDispatchParametersARM-pDispatchParameters-parameter) VUID-vkCmdSetDispatchParametersARM-pDispatchParameters-parameter

 `pDispatchParameters` **must** be a valid pointer to a valid [VkDispatchParametersARM](VkDispatchParametersARM.html) structure

* 
[](#VUID-vkCmdSetDispatchParametersARM-commandBuffer-recording) VUID-vkCmdSetDispatchParametersARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDispatchParametersARM-commandBuffer-cmdpool) VUID-vkCmdSetDispatchParametersARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDispatchParametersARM-renderpass) VUID-vkCmdSetDispatchParametersARM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetDispatchParametersARM-videocoding) VUID-vkCmdSetDispatchParametersARM-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdSetDispatchParametersARM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDispatchParametersARM](VkDispatchParametersARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#vkCmdSetDispatchParametersARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
