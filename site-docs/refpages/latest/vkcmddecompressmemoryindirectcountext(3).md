# vkCmdDecompressMemoryIndirectCountEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDecompressMemoryIndirectCountEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDecompressMemoryIndirectCountEXT - Indirect decompress data between memory regions

To decompress data between one or more memory regions by specifying
decompression parameters indirectly in a buffer, call:

// Provided by VK_EXT_memory_decompression
void vkCmdDecompressMemoryIndirectCountEXT(
    VkCommandBuffer                             commandBuffer,
    VkMemoryDecompressionMethodFlagsEXT         decompressionMethod,
    VkDeviceAddress                             indirectCommandsAddress,
    VkDeviceAddress                             indirectCommandsCountAddress,
    uint32_t                                    maxDecompressionCount,
    uint32_t                                    stride);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`decompressionMethod` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html) with a single bit set
specifying the method used to decompress data.

* 
`indirectCommandsAddress` is the device address containing
decompression parameters laid out as an array of
[VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html) structures.

* 
`indirectCommandsCountAddress` is the device address containing a
32-bit integer value specifying the decompression count.

* 
`maxDecompressionCount` is maximum number of decompressions that
will be executed.
The actual number of executed decompressions is the minimum of the count
specified in `indirectCommandsCountAddress` and
`maxDecompressionCount`.

* 
`stride` is the byte stride between successive sets of decompression
parameters located starting from `indirectCommandsAddress`.

Each region specified in `indirectCommandsAddress` is decompressed from
the source to destination region based on the specified
`decompressionMethod`.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-None-07692) VUID-vkCmdDecompressMemoryIndirectCountEXT-None-07692

The [`memoryDecompression`](../../../../spec/latest/chapters/features.html#features-memoryDecompression) feature
**must** be enabled

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07694) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07694

`indirectCommandsAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07695) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07695

`indirectCommandsAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07697) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07697

`indirectCommandsCountAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07698) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07698

`indirectCommandsCountAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07699) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07699

The count stored in `indirectCommandsCountAddress` **must** be less
than or equal to
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`maxDecompressionIndirectCount`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-11794) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-11794

All device addresses between `indirectCommandsAddress` and
`indirectCommandsAddress` +  (`stride` × (count
stored in `indirectCommandsCountAddress`)) - 1 **must** be in the
buffer device address range of the same buffer

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-07690) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-07690

The `decompressionMethod` **must** have a single bit set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-stride-11767) VUID-vkCmdDecompressMemoryIndirectCountEXT-stride-11767

`stride` **must** be a multiple of `4` and **must** be greater than or
equal to sizeof([VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html))

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-maxDecompressionCount-11768) VUID-vkCmdDecompressMemoryIndirectCountEXT-maxDecompressionCount-11768

`maxDecompressionCount` **must** be less than or equal to
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`maxDecompressionIndirectCount`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11769) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11769

If `decompressionMethod` is
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](VkMemoryDecompressionMethodFlagBitsEXT.html), then all
values in [VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html)::`decompressedSize`
**must** be less than or equal to 65536 bytes

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11810) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11810

`decompressionMethod` **must** be a valid bit specified in
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`decompressionMethods`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-parameter

 `decompressionMethod` **must** be a valid combination of [VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html) values

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-requiredbitmask) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-requiredbitmask

 `decompressionMethod` **must** not be `0`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-parameter

 `indirectCommandsAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-parameter

 `indirectCommandsCountAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-recording) VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-renderpass) VUID-vkCmdDecompressMemoryIndirectCountEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-suspended) VUID-vkCmdDecompressMemoryIndirectCountEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-videocoding) VUID-vkCmdDecompressMemoryIndirectCountEXT-videocoding

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

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryIndirectCountEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceAddress`, [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
