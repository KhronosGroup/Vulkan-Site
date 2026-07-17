# vkCmdCopyBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyBuffer - Copy data between buffer regions

To copy data between buffer objects, call:

// Provided by VK_VERSION_1_0
void vkCmdCopyBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    srcBuffer,
    VkBuffer                                    dstBuffer,
    uint32_t                                    regionCount,
    const VkBufferCopy*                         pRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcBuffer` is the source buffer.

* 
`dstBuffer` is the destination buffer.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkBufferCopy](VkBufferCopy.html) structures
specifying the regions to copy.

Each source region specified by `pRegions` is copied from the source
buffer to the destination region of the destination buffer.
If any of the specified regions in `srcBuffer` overlaps in memory with
any of the specified regions in `dstBuffer`, values read from those
overlapping regions are **undefined**.

Valid Usage

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-01822) VUID-vkCmdCopyBuffer-commandBuffer-01822

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-01823) VUID-vkCmdCopyBuffer-commandBuffer-01823

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-01824) VUID-vkCmdCopyBuffer-commandBuffer-01824

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

* 
[](#VUID-vkCmdCopyBuffer-srcOffset-00113) VUID-vkCmdCopyBuffer-srcOffset-00113

The `srcOffset` member of each element of `pRegions` **must** be
less than the size of `srcBuffer`

* 
[](#VUID-vkCmdCopyBuffer-dstOffset-00114) VUID-vkCmdCopyBuffer-dstOffset-00114

The `dstOffset` member of each element of `pRegions` **must** be
less than the size of `dstBuffer`

* 
[](#VUID-vkCmdCopyBuffer-size-00115) VUID-vkCmdCopyBuffer-size-00115

The `size` member of each element of `pRegions` **must** be less
than or equal to the size of `srcBuffer` minus `srcOffset`

* 
[](#VUID-vkCmdCopyBuffer-size-00116) VUID-vkCmdCopyBuffer-size-00116

The `size` member of each element of `pRegions` **must** be less
than or equal to the size of `dstBuffer` minus `dstOffset`

* 
[](#VUID-vkCmdCopyBuffer-pRegions-00117) VUID-vkCmdCopyBuffer-pRegions-00117

The union of the source regions, and the union of the destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-vkCmdCopyBuffer-srcBuffer-00118) VUID-vkCmdCopyBuffer-srcBuffer-00118

`srcBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyBuffer-srcBuffer-00119) VUID-vkCmdCopyBuffer-srcBuffer-00119

If `srcBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyBuffer-dstBuffer-00120) VUID-vkCmdCopyBuffer-dstBuffer-00120

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyBuffer-dstBuffer-00121) VUID-vkCmdCopyBuffer-dstBuffer-00121

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-parameter) VUID-vkCmdCopyBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyBuffer-srcBuffer-parameter) VUID-vkCmdCopyBuffer-srcBuffer-parameter

 `srcBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdCopyBuffer-dstBuffer-parameter) VUID-vkCmdCopyBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdCopyBuffer-pRegions-parameter) VUID-vkCmdCopyBuffer-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkBufferCopy](VkBufferCopy.html) structures

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-recording) VUID-vkCmdCopyBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyBuffer-commandBuffer-cmdpool) VUID-vkCmdCopyBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyBuffer-renderpass) VUID-vkCmdCopyBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyBuffer-suspended) VUID-vkCmdCopyBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyBuffer-videocoding) VUID-vkCmdCopyBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyBuffer-regionCount-arraylength) VUID-vkCmdCopyBuffer-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdCopyBuffer-commonparent) VUID-vkCmdCopyBuffer-commonparent

 Each of `commandBuffer`, `dstBuffer`, and `srcBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdCopyBuffer is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkBufferCopy](VkBufferCopy.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
