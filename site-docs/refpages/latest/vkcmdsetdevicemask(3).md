# vkCmdSetDeviceMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDeviceMask.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDeviceMask - Modify device mask of a command buffer

To update the current device mask of a command buffer, call:

// Provided by VK_VERSION_1_1
void vkCmdSetDeviceMask(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    deviceMask);

// Provided by VK_KHR_device_group
// Equivalent to vkCmdSetDeviceMask
void vkCmdSetDeviceMaskKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    deviceMask);

* 
`commandBuffer` is command buffer whose current device mask is
modified.

* 
`deviceMask` is the new value of the current device mask.

`deviceMask` is used to filter out subsequent commands from executing on
all physical devices whose bit indices are not set in the mask, except
commands beginning a render pass instance, commands transitioning to the
next subpass in the render pass instance, and commands ending a render pass
instance, which always execute on the set of physical devices whose bit
indices are included in the `deviceMask` member of the
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) structure passed to the command
beginning the corresponding render pass instance.

Valid Usage

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00108) VUID-vkCmdSetDeviceMask-deviceMask-00108

`deviceMask` **must** be a valid device mask value

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00109) VUID-vkCmdSetDeviceMask-deviceMask-00109

`deviceMask` **must** not be zero

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00110) VUID-vkCmdSetDeviceMask-deviceMask-00110

`deviceMask` **must** not include any set bits that were not in the
[VkDeviceGroupCommandBufferBeginInfo](VkDeviceGroupCommandBufferBeginInfo.html)::`deviceMask` value when
the command buffer began recording

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00111) VUID-vkCmdSetDeviceMask-deviceMask-00111

If `vkCmdSetDeviceMask` is called inside a render pass instance,
`deviceMask` **must** not include any set bits that were not in the
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)::`deviceMask` value when the
render pass instance began recording

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-parameter) VUID-vkCmdSetDeviceMask-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-recording) VUID-vkCmdSetDeviceMask-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-cmdpool) VUID-vkCmdSetDeviceMask-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | State |

Conditional Rendering

vkCmdSetDeviceMask is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkCmdSetDeviceMask).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
