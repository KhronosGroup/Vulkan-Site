# vkCmdCopyImageToMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyImageToMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyImageToMemoryKHR - Copy data from an image to memory ranges

To copy data from an image to memory ranges, call:

// Provided by VK_KHR_device_address_commands
void vkCmdCopyImageToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyDeviceMemoryImageInfoKHR*       pCopyMemoryInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyMemoryInfo` a pointer to a
[VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html) structure describing the copies to
perform.

Valid Usage

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13102) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13102

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `addressCopyFlags` member of all elements of
`pCopyMemoryInfo->pRegions` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13103) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13103

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`pCopyMemoryInfo->image` **must** not have been created with
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13104) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13104

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), the
`addressRange.pname`:address member of any element of
`pCopyMemoryInfo->pRegions` **must** be a multiple of 4

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-imageOffset-13105) VUID-vkCmdCopyImageToMemoryKHR-imageOffset-13105

The `imageOffset` and `imageExtent` members of each element of
`pCopyMemoryInfo->pRegions` **must** respect the image transfer
granularity requirements of `commandBuffer`’s command pool’s queue
family, as described in [VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13106) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13106

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), for each element of
`pCopyMemoryInfo->pRegions`, the `aspectMask` member of
`imageSubresource` **must** not be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-imageLayout-13023) VUID-vkCmdCopyImageToMemoryKHR-imageLayout-13023

The `imageLayout` member of each element of
`pCopyMemoryInfo->pRegions` **must** be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
or [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-pCopyMemoryInfo-13024) VUID-vkCmdCopyImageToMemoryKHR-pCopyMemoryInfo-13024

`pCopyMemoryInfo->image` **must** have been created with
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13025) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-13025

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `addressCopyFlags` member of all elements of
`pCopyMemoryInfo->pRegions` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-addressRange-13129) VUID-vkCmdCopyImageToMemoryKHR-addressRange-13129

At least one buffer containing the total address range specified by the
`addressRange` member of each element of
`pCopyMemoryInfo->pRegions` **must** have been created with
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-pCopyMemoryInfo-parameter) VUID-vkCmdCopyImageToMemoryKHR-pCopyMemoryInfo-parameter

 If `pCopyMemoryInfo` is not `NULL`, `pCopyMemoryInfo` **must** be a valid pointer to a valid [VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyImageToMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-renderpass) VUID-vkCmdCopyImageToMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-suspended) VUID-vkCmdCopyImageToMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyImageToMemoryKHR-videocoding) VUID-vkCmdCopyImageToMemoryKHR-videocoding

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

vkCmdCopyImageToMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyImageToMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
