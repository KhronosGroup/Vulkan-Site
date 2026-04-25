# vkCmdUpdateMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdUpdateMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdUpdateMemoryKHR - Update the content of device memory from host memory

To update device memory inline in a command buffer, call:

// Provided by VK_KHR_device_address_commands
void vkCmdUpdateMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    VkDeviceSize                                dataSize,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDstRange` is a pointer to the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
selecting the memory range to be updated.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
copy flags for the destination address range.

* 
`dataSize` is the number of bytes to update, and **must** be a multiple
of 4.

* 
`pData` is a pointer to the source data for the buffer update, and
**must** be at least `dataSize` bytes in size.

The source data is copied from `pData` to the command buffer when the
command is called, and then copied to `dstRange` when the command is
executed on a device.

|  | Due to the data being copied into command buffers, [memory range copies](../../../../spec/latest/chapters/copies.html#copies-memory-ranges) are recommended for larger data transfers, to avoid
| --- | --- |
excessive memory consumption. |

Valid Usage

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13097) VUID-vkCmdUpdateMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13098) VUID-vkCmdUpdateMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13099) VUID-vkCmdUpdateMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-13100) VUID-vkCmdUpdateMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13122) VUID-vkCmdUpdateMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13123) VUID-vkCmdUpdateMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-13101) VUID-vkCmdUpdateMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13124) VUID-vkCmdUpdateMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13125) VUID-vkCmdUpdateMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstRange-13005) VUID-vkCmdUpdateMemoryKHR-dstRange-13005

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13006) VUID-vkCmdUpdateMemoryKHR-pDstRange-13006

`pDstRange->address` **must** be a multiple of 4

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13007) VUID-vkCmdUpdateMemoryKHR-pDstRange-13007

`pDstRange->size` **must** be less than or equal to 65536

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-13008) VUID-vkCmdUpdateMemoryKHR-dataSize-13008

`dataSize` **must** be less than or equal to `pDstRange->size`

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-13009) VUID-vkCmdUpdateMemoryKHR-dataSize-13009

`dataSize` **must** be a multiple of 4

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-13010) VUID-vkCmdUpdateMemoryKHR-commandBuffer-13010

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-13011) VUID-vkCmdUpdateMemoryKHR-commandBuffer-13011

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include [VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-parameter) VUID-vkCmdUpdateMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-parameter) VUID-vkCmdUpdateMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-parameter) VUID-vkCmdUpdateMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-vkCmdUpdateMemoryKHR-pData-parameter) VUID-vkCmdUpdateMemoryKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-recording) VUID-vkCmdUpdateMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdUpdateMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdUpdateMemoryKHR-renderpass) VUID-vkCmdUpdateMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdateMemoryKHR-suspended) VUID-vkCmdUpdateMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdateMemoryKHR-videocoding) VUID-vkCmdUpdateMemoryKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-arraylength) VUID-vkCmdUpdateMemoryKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

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

vkCmdUpdateMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdUpdateMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
