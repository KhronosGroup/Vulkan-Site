# vkCmdCopyMemoryIndirectNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryIndirectNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryIndirectNV - Copy data between memory regions

To copy data between two memory regions by specifying copy parameters
indirectly in memory, call:

// Provided by VK_NV_copy_memory_indirect
void vkCmdCopyMemoryIndirectNV(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             copyBufferAddress,
    uint32_t                                    copyCount,
    uint32_t                                    stride);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`copyBufferAddress` is the memory address specifying the copy
parameters.
It is laid out as an array of [VkCopyMemoryIndirectCommandNV](VkCopyMemoryIndirectCommandKHR.html)
structures.

* 
`copyCount` is the number of copies to execute, and **can** be zero.

* 
`stride` is the stride in bytes between successive sets of copy
parameters.

Each region read from `copyBufferAddress` is copied from the source
region to the specified destination region.
The results are **undefined** if any of the source and destination regions
overlap in memory.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-None-07653) VUID-vkCmdCopyMemoryIndirectNV-None-07653

The [`indirectCopy`](../../../../spec/latest/chapters/features.html#features-indirectCopy) feature **must** be
enabled

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-07654) VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-07654

`copyBufferAddress` **must** be 4 byte aligned

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-stride-07655) VUID-vkCmdCopyMemoryIndirectNV-stride-07655

`stride` **must** be a multiple of `4` and **must** be greater than or
equal to sizeof([VkCopyMemoryIndirectCommandNV](VkCopyMemoryIndirectCommandKHR.html))

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-07656) VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-07656

The [VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from
**must** support at least one of the queue types specified in
[VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)::`supportedQueues`

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-10946) VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-10946

Any of the source or destination memory regions specified in
`copyBufferAddress` **must** not overlap with any of the specified
destination memory regions

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-parameter) VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-parameter) VUID-vkCmdCopyMemoryIndirectNV-copyBufferAddress-parameter

 `copyBufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-recording) VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryIndirectNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-renderpass) VUID-vkCmdCopyMemoryIndirectNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-suspended) VUID-vkCmdCopyMemoryIndirectNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryIndirectNV-videocoding) VUID-vkCmdCopyMemoryIndirectNV-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyMemoryIndirectNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_copy_memory_indirect](VK_NV_copy_memory_indirect.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyMemoryIndirectNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
