# vkCmdFillMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdFillMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdFillMemoryKHR - Fill a memory range with a fixed 4-byte bit pattern

To fill a memory range with a fixed 4-byte bit pattern, call:

// Provided by VK_KHR_device_address_commands
void vkCmdFillMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    uint32_t                                    data);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDstRange` is a pointer to the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
selecting the memory range to be filled.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
copy flags for the destination address range.

* 
`data` is the 4-byte word written repeatedly to the destination
range to fill `size` bytes of data.

|  | The bit pattern of `data` is determined by the host endianness.
| --- | --- |
For example, an unsigned integer value of `1` will result in a different bit
pattern on a little endian machine compared to a big endian machine. |

Valid Usage

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13097) VUID-vkCmdFillMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13098) VUID-vkCmdFillMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13099) VUID-vkCmdFillMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-13100) VUID-vkCmdFillMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13122) VUID-vkCmdFillMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13123) VUID-vkCmdFillMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-13101) VUID-vkCmdFillMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13124) VUID-vkCmdFillMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13125) VUID-vkCmdFillMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-dstRange-13000) VUID-vkCmdFillMemoryKHR-dstRange-13000

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13001) VUID-vkCmdFillMemoryKHR-pDstRange-13001

`pDstRange->address` **must** be a multiple of 4

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13002) VUID-vkCmdFillMemoryKHR-pDstRange-13002

`pDstRange->size` **must** be a multiple of 4

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-13003) VUID-vkCmdFillMemoryKHR-commandBuffer-13003

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-13004) VUID-vkCmdFillMemoryKHR-commandBuffer-13004

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include [VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-parameter) VUID-vkCmdFillMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-parameter) VUID-vkCmdFillMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-parameter) VUID-vkCmdFillMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-recording) VUID-vkCmdFillMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdFillMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdFillMemoryKHR-renderpass) VUID-vkCmdFillMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdFillMemoryKHR-suspended) VUID-vkCmdFillMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdFillMemoryKHR-videocoding) VUID-vkCmdFillMemoryKHR-videocoding

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

vkCmdFillMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdFillMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
