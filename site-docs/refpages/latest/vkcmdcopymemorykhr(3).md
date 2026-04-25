# vkCmdCopyMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryKHR - Copy data between memory ranges

To copy data between memory ranges, call:

// Provided by VK_KHR_device_address_commands
void vkCmdCopyMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyDeviceMemoryInfoKHR*            pCopyMemoryInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyMemoryInfo` a pointer to a [VkCopyDeviceMemoryInfoKHR](VkCopyDeviceMemoryInfoKHR.html)
structure describing the copies to perform.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-13012) VUID-vkCmdCopyMemoryKHR-commandBuffer-13012

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `srcCopyFlags` member of all elements of
`pCopyMemoryInfo->pRegions` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-13013) VUID-vkCmdCopyMemoryKHR-commandBuffer-13013

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `dstCopyFlags` member of all elements of
`pCopyMemoryInfo->pRegions` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-13014) VUID-vkCmdCopyMemoryKHR-commandBuffer-13014

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `dstCopyFlags` member of all elements of
`pCopyMemoryInfo->pRegions` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryKHR-pCopyMemoryInfo-parameter) VUID-vkCmdCopyMemoryKHR-pCopyMemoryInfo-parameter

 If `pCopyMemoryInfo` is not `NULL`, `pCopyMemoryInfo` **must** be a valid pointer to a valid [VkCopyDeviceMemoryInfoKHR](VkCopyDeviceMemoryInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryKHR-renderpass) VUID-vkCmdCopyMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryKHR-suspended) VUID-vkCmdCopyMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryKHR-videocoding) VUID-vkCmdCopyMemoryKHR-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyDeviceMemoryInfoKHR](VkCopyDeviceMemoryInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
