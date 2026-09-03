# vkCmdBindIndexBuffer3KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindIndexBuffer3KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindIndexBuffer3KHR - Bind an address range as an index buffer to a command buffer

To bind an address range as an index buffer to a command buffer, call:

// Provided by VK_KHR_device_address_commands
void vkCmdBindIndexBuffer3KHR(
    VkCommandBuffer                             commandBuffer,
    const VkBindIndexBuffer3InfoKHR*            pInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pInfo` is a pointer to a [VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html) structure
defining parameters of this command.

The [bound index buffer range](../../../../spec/latest/chapters/drawing.html#index-buffer-range) is set to the range of
memory indicated by `pInfo->addressRange`.

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
`pInfo->addressRange.size` and `pInfo->addressRange.address` **can** be 0.
When the size and address are 0, every index read from this binding will
return a value of zero.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-parameter) VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindIndexBuffer3KHR-pInfo-parameter) VUID-vkCmdBindIndexBuffer3KHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html) structure

* 
[](#VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-recording) VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-cmdpool) VUID-vkCmdBindIndexBuffer3KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindIndexBuffer3KHR-videocoding) VUID-vkCmdBindIndexBuffer3KHR-videocoding

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

vkCmdBindIndexBuffer3KHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdBindIndexBuffer3KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
