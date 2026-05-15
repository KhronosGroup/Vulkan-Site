# vkCmdUpdateBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdUpdateBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdUpdateBuffer - Update a buffer’s contents from host memory

To update buffer data inline in a command buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdUpdateBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    VkDeviceSize                                dataSize,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dstBuffer` is a handle to the buffer to be updated.

* 
`dstOffset` is the byte offset into the buffer to start updating,
and **must** be a multiple of 4.

* 
`dataSize` is the number of bytes to update, and **must** be a multiple
of 4.

* 
`pData` is a pointer to the source data for the buffer update, and
**must** be at least `dataSize` bytes in size.

`dataSize` **must** be less than or equal to 65536 bytes.
For larger updates, applications **can** use buffer to buffer
[copies](../../../../spec/latest/chapters/copies.html#copies-buffers).

|  | Buffer updates performed with `vkCmdUpdateBuffer` first copy the data
| --- | --- |
into command buffer memory when the command is recorded (which requires
additional storage and may incur an additional allocation), and then copy
the data from the command buffer into `dstBuffer` when the command is
executed on a device.

The additional cost of this functionality compared to [buffer to buffer copies](../../../../spec/latest/chapters/copies.html#copies-buffers) means it should only be used for very small
amounts of data, and is why it is limited to at most 65536 bytes.
Applications **can** work around this restriction by issuing multiple
`vkCmdUpdateBuffer` commands to different ranges of the same buffer, but
doing so is not recommended. |

The source data is copied from `pData` to the command buffer when the
command is called.

`vkCmdUpdateBuffer` is only allowed outside of a render pass.
This command is treated as a “transfer” operation for the purposes of
synchronization barriers.
The [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) **must** be specified in `usage`
of [VkBufferCreateInfo](VkBufferCreateInfo.html) in order for the buffer to be compatible with
`vkCmdUpdateBuffer`.

Valid Usage

* 
[](#VUID-vkCmdUpdateBuffer-dstOffset-00032) VUID-vkCmdUpdateBuffer-dstOffset-00032

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00033) VUID-vkCmdUpdateBuffer-dataSize-00033

`dataSize` **must** be less than or equal to the size of
`dstBuffer` minus `dstOffset`

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-00034) VUID-vkCmdUpdateBuffer-dstBuffer-00034

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-00035) VUID-vkCmdUpdateBuffer-dstBuffer-00035

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdUpdateBuffer-dstOffset-00036) VUID-vkCmdUpdateBuffer-dstOffset-00036

`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00037) VUID-vkCmdUpdateBuffer-dataSize-00037

`dataSize` **must** be less than or equal to `65536`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00038) VUID-vkCmdUpdateBuffer-dataSize-00038

`dataSize` **must** be a multiple of `4`

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-01813) VUID-vkCmdUpdateBuffer-commandBuffer-01813

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-01814) VUID-vkCmdUpdateBuffer-commandBuffer-01814

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-parameter) VUID-vkCmdUpdateBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-parameter) VUID-vkCmdUpdateBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdUpdateBuffer-pData-parameter) VUID-vkCmdUpdateBuffer-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-recording) VUID-vkCmdUpdateBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-cmdpool) VUID-vkCmdUpdateBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdUpdateBuffer-renderpass) VUID-vkCmdUpdateBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdateBuffer-suspended) VUID-vkCmdUpdateBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdateBuffer-videocoding) VUID-vkCmdUpdateBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-arraylength) VUID-vkCmdUpdateBuffer-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkCmdUpdateBuffer-commonparent) VUID-vkCmdUpdateBuffer-commonparent

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

vkCmdUpdateBuffer is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdUpdateBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
