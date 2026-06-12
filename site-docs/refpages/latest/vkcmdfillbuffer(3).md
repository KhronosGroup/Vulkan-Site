# vkCmdFillBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdFillBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdFillBuffer - Fill a region of a buffer with a fixed value

To clear buffer data, call:

// Provided by VK_VERSION_1_0
void vkCmdFillBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    VkDeviceSize                                size,
    uint32_t                                    data);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dstBuffer` is the buffer to be filled.

* 
`dstOffset` is the byte offset into the buffer at which to start
filling, and **must** be a multiple of 4.

* 
`size` is the number of bytes to fill, and **must** be either a
multiple of 4, or [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to fill the range from
`offset` to the end of the buffer.
If [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) is used and the remaining size of the buffer is
not a multiple of 4, then the nearest smaller multiple is used.

* 
`data` is the 4-byte word written repeatedly to the buffer to fill
`size` bytes of data.
The data word is written to memory according to the host endianness.

`vkCmdFillBuffer` is treated as a “transfer” operation for the
purposes of synchronization barriers.
It is only compatible with buffers created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set.

Valid Usage

* 
[](#VUID-vkCmdFillBuffer-dstOffset-00024) VUID-vkCmdFillBuffer-dstOffset-00024

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdFillBuffer-dstOffset-00025) VUID-vkCmdFillBuffer-dstOffset-00025

`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdFillBuffer-size-00026) VUID-vkCmdFillBuffer-size-00026

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
greater than `0`

* 
[](#VUID-vkCmdFillBuffer-size-00027) VUID-vkCmdFillBuffer-size-00027

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
less than or equal to the size of `dstBuffer` minus `dstOffset`

* 
[](#VUID-vkCmdFillBuffer-size-00028) VUID-vkCmdFillBuffer-size-00028

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be a
multiple of `4`

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-00029) VUID-vkCmdFillBuffer-dstBuffer-00029

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdFillBuffer-apiVersion-07894) VUID-vkCmdFillBuffer-apiVersion-07894

If the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled and
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
1.1, the
[VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from **must**
support graphics or compute operations

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-00031) VUID-vkCmdFillBuffer-dstBuffer-00031

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-01811) VUID-vkCmdFillBuffer-commandBuffer-01811

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-01812) VUID-vkCmdFillBuffer-commandBuffer-01812

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-parameter) VUID-vkCmdFillBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-parameter) VUID-vkCmdFillBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-recording) VUID-vkCmdFillBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-cmdpool) VUID-vkCmdFillBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdFillBuffer-renderpass) VUID-vkCmdFillBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdFillBuffer-suspended) VUID-vkCmdFillBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdFillBuffer-videocoding) VUID-vkCmdFillBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdFillBuffer-commonparent) VUID-vkCmdFillBuffer-commonparent

 Both of `commandBuffer`, and `dstBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdFillBuffer is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdFillBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
