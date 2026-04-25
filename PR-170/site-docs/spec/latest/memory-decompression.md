# Memory Decompression

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/memory_decompression.html

## Content

Commands that **can** be used to decompress memory between one or more memory
regions are [vkCmdDecompressMemoryEXT](#vkCmdDecompressMemoryEXT),
[vkCmdDecompressMemoryNV](#vkCmdDecompressMemoryNV), [vkCmdDecompressMemoryIndirectCountNV](#vkCmdDecompressMemoryIndirectCountNV),
and [vkCmdDecompressMemoryIndirectCountEXT](#vkCmdDecompressMemoryIndirectCountEXT).

To decompress memory containing compressed data, call:

// Provided by VK_EXT_memory_decompression
void vkCmdDecompressMemoryEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDecompressMemoryInfoEXT*            pDecompressMemoryInfoEXT);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDecompressMemoryInfoEXT` is a pointer to a
[VkDecompressMemoryInfoEXT](#VkDecompressMemoryInfoEXT) structure describing the decompression
parameters.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryEXT-memoryDecompression-11761) VUID-vkCmdDecompressMemoryEXT-memoryDecompression-11761

The [`memoryDecompression`](features.html#features-memoryDecompression) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-parameter) VUID-vkCmdDecompressMemoryEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDecompressMemoryEXT-pDecompressMemoryInfoEXT-parameter) VUID-vkCmdDecompressMemoryEXT-pDecompressMemoryInfoEXT-parameter

 `pDecompressMemoryInfoEXT` **must** be a valid pointer to a valid [VkDecompressMemoryInfoEXT](#VkDecompressMemoryInfoEXT) structure

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-recording) VUID-vkCmdDecompressMemoryEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryEXT-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDecompressMemoryEXT-renderpass) VUID-vkCmdDecompressMemoryEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryEXT-suspended) VUID-vkCmdDecompressMemoryEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryEXT-videocoding) VUID-vkCmdDecompressMemoryEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDecompressMemoryInfoEXT` structure is defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkDecompressMemoryInfoEXT {
    VkStructureType                        sType;
    const void*                            pNext;
    VkMemoryDecompressionMethodFlagsEXT    decompressionMethod;
    uint32_t                               regionCount;
    const VkDecompressMemoryRegionEXT*     pRegions;
} VkDecompressMemoryInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decompressionMethod` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsEXT](#VkMemoryDecompressionMethodFlagBitsEXT) with a single bit set
specifying the method used to decompress data.

* 
`regionCount` is the number of regions to decompress.

* 
`pRegions` is a pointer to an array of
[VkDecompressMemoryRegionEXT](#VkDecompressMemoryRegionEXT) structures specifying the regions to
decompress.

Each memory region specified in `pRegions` is decompressed from the
source to the destination address based on the decompression method
specified in `decompressionMethod`.
If any of the specified source and destination regions overlap in memory,
then the results of decompression are **undefined**.

Valid Usage

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-07690) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-07690

The `decompressionMethod` **must** have a single bit set

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11762) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11762

If `decompressionMethod` is
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](#VkMemoryDecompressionMethodFlagBitsNV), then for each
element of `pRegions`, `decompressedSize` **must** be less than or
equal to 65536 bytes

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11763) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11763

`decompressionMethod` **must** be a valid bit specified in
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`decompressionMethods`

Valid Usage (Implicit)

* 
[](#VUID-VkDecompressMemoryInfoEXT-sType-sType) VUID-VkDecompressMemoryInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DECOMPRESS_MEMORY_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDecompressMemoryInfoEXT-pNext-pNext) VUID-VkDecompressMemoryInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-parameter) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-parameter

 `decompressionMethod` **must** be a valid combination of [VkMemoryDecompressionMethodFlagBitsEXT](#VkMemoryDecompressionMethodFlagBitsEXT) values

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-requiredbitmask) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-requiredbitmask

 `decompressionMethod` **must** not be `0`

* 
[](#VUID-VkDecompressMemoryInfoEXT-pRegions-parameter) VUID-VkDecompressMemoryInfoEXT-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` [VkDecompressMemoryRegionEXT](#VkDecompressMemoryRegionEXT) structures

* 
[](#VUID-VkDecompressMemoryInfoEXT-regionCount-arraylength) VUID-VkDecompressMemoryInfoEXT-regionCount-arraylength

 `regionCount` **must** be greater than `0`

The `VkDecompressMemoryRegionEXT` structure is defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkDecompressMemoryRegionEXT {
    VkDeviceAddress    srcAddress;
    VkDeviceAddress    dstAddress;
    VkDeviceSize       compressedSize;
    VkDeviceSize       decompressedSize;
} VkDecompressMemoryRegionEXT;

* 
`srcAddress` is the address where compressed data is stored.

* 
`dstAddress` is the destination address where decompressed data will
be written.

* 
`compressedSize` is the size of compressed data in bytes.

* 
`decompressedSize` is the size of decompressed data in bytes.

Accesses to compressed and decompressed data specified in `srcAddress`
and `dstAddress` **must** be [synchronized](synchronization.html#synchronization-dependencies)
with the [VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) with
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR).

Valid Usage

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-07685) VUID-VkDecompressMemoryRegionEXT-srcAddress-07685

`srcAddress` **must** be 4 byte aligned

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-07686) VUID-VkDecompressMemoryRegionEXT-srcAddress-07686

The memory range defined by `srcAddress` and `compressedSize`
**must** be contained within the size of the buffer bound to
`srcAddress`, minus the offset of `srcAddress` from the base
address of that buffer

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-07687) VUID-VkDecompressMemoryRegionEXT-dstAddress-07687

`dstAddress` **must** be 4 byte aligned

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-07688) VUID-VkDecompressMemoryRegionEXT-dstAddress-07688

The memory range defined by `dstAddress` and `decompressedSize`
**must** be contained within the size of the buffer bound to
`dstAddress`, minus the offset of `dstAddress` from the base
address of that buffer

* 
[](#VUID-VkDecompressMemoryRegionEXT-decompressedSize-07689) VUID-VkDecompressMemoryRegionEXT-decompressedSize-07689

`decompressedSize` **must** be large enough to hold the decompressed
data based on the `decompressionMethod`

* 
[](#VUID-VkDecompressMemoryRegionEXT-compressedSize-11795) VUID-VkDecompressMemoryRegionEXT-compressedSize-11795

`compressedSize` **must** not be zero

* 
[](#VUID-VkDecompressMemoryRegionEXT-decompressedSize-11796) VUID-VkDecompressMemoryRegionEXT-decompressedSize-11796

`decompressedSize` **must** not be zero

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-07691) VUID-VkDecompressMemoryRegionEXT-srcAddress-07691

The memory range defined by `srcAddress` and `compressedSize`
**must** not overlap the memory range defined by `dstAddress` and
`decompressedSize`

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-11764) VUID-VkDecompressMemoryRegionEXT-srcAddress-11764

`srcAddress` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](resources.html#VkBufferUsageFlagBits2KHR) usage flag set

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-11765) VUID-VkDecompressMemoryRegionEXT-dstAddress-11765

`dstAddress` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](resources.html#VkBufferUsageFlagBits2KHR) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-parameter) VUID-VkDecompressMemoryRegionEXT-srcAddress-parameter

 `srcAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-parameter) VUID-VkDecompressMemoryRegionEXT-dstAddress-parameter

 `dstAddress` **must** be a valid `VkDeviceAddress` value

To decompress memory containing compressed data, call:

// Provided by VK_NV_memory_decompression
void vkCmdDecompressMemoryNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    decompressRegionCount,
    const VkDecompressMemoryRegionNV*           pDecompressMemoryRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`decompressRegionCount` is the number of memory regions to
decompress.

* 
`pDecompressMemoryRegions` is a pointer to an array of
`decompressRegionCount` [VkDecompressMemoryRegionNV](#VkDecompressMemoryRegionNV) structures
specifying decompression parameters.

Each region specified in `pDecompressMemoryRegions` is decompressed from
the compressed to decompressed region based on the decompression method
specified in [VkDecompressMemoryRegionNV](#VkDecompressMemoryRegionNV)::`decompressionMethod`.
If the regions containing compressed and decompressed data overlap, the
decompression behavior is **undefined**.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryNV-None-07684) VUID-vkCmdDecompressMemoryNV-None-07684

The [`memoryDecompression`](features.html#features-memoryDecompression) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-parameter) VUID-vkCmdDecompressMemoryNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDecompressMemoryNV-pDecompressMemoryRegions-parameter) VUID-vkCmdDecompressMemoryNV-pDecompressMemoryRegions-parameter

 `pDecompressMemoryRegions` **must** be a valid pointer to an array of `decompressRegionCount` valid [VkDecompressMemoryRegionNV](#VkDecompressMemoryRegionNV) structures

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-recording) VUID-vkCmdDecompressMemoryNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryNV-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDecompressMemoryNV-renderpass) VUID-vkCmdDecompressMemoryNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryNV-suspended) VUID-vkCmdDecompressMemoryNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryNV-videocoding) VUID-vkCmdDecompressMemoryNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDecompressMemoryNV-decompressRegionCount-arraylength) VUID-vkCmdDecompressMemoryNV-decompressRegionCount-arraylength

 `decompressRegionCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDecompressMemoryRegionNV` structure is defined as:

// Provided by VK_NV_memory_decompression
typedef struct VkDecompressMemoryRegionNV {
    VkDeviceAddress                       srcAddress;
    VkDeviceAddress                       dstAddress;
    VkDeviceSize                          compressedSize;
    VkDeviceSize                          decompressedSize;
    VkMemoryDecompressionMethodFlagsNV    decompressionMethod;
} VkDecompressMemoryRegionNV;

* 
`srcAddress` is the address where compressed data is stored.

* 
`dstAddress` is the destination address where decompressed data will
be written.

* 
`compressedSize` is the size of compressed data in bytes.

* 
`decompressedSize` is the size of decompressed data in bytes.

* 
`decompressionMethod` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsNV](#VkMemoryDecompressionMethodFlagBitsNV) with a single bit set
specifying the method used to decompress data.

Valid Usage

* 
[](#VUID-VkDecompressMemoryRegionNV-decompressionMethod-07690) VUID-VkDecompressMemoryRegionNV-decompressionMethod-07690

The `decompressionMethod` **must** have a single bit set

* 
[](#VUID-VkDecompressMemoryRegionNV-srcAddress-07685) VUID-VkDecompressMemoryRegionNV-srcAddress-07685

`srcAddress` **must** be 4 byte aligned

* 
[](#VUID-VkDecompressMemoryRegionNV-srcAddress-07686) VUID-VkDecompressMemoryRegionNV-srcAddress-07686

The memory range defined by `srcAddress` and `compressedSize`
**must** be contained within the size of the buffer bound to
`srcAddress`, minus the offset of `srcAddress` from the base
address of that buffer

* 
[](#VUID-VkDecompressMemoryRegionNV-dstAddress-07687) VUID-VkDecompressMemoryRegionNV-dstAddress-07687

`dstAddress` **must** be 4 byte aligned

* 
[](#VUID-VkDecompressMemoryRegionNV-dstAddress-07688) VUID-VkDecompressMemoryRegionNV-dstAddress-07688

The memory range defined by `dstAddress` and `decompressedSize`
**must** be contained within the size of the buffer bound to
`dstAddress`, minus the offset of `dstAddress` from the base
address of that buffer

* 
[](#VUID-VkDecompressMemoryRegionNV-decompressedSize-07689) VUID-VkDecompressMemoryRegionNV-decompressedSize-07689

`decompressedSize` **must** be large enough to hold the decompressed
data based on the `decompressionMethod`

* 
[](#VUID-VkDecompressMemoryRegionNV-compressedSize-11795) VUID-VkDecompressMemoryRegionNV-compressedSize-11795

`compressedSize` **must** not be zero

* 
[](#VUID-VkDecompressMemoryRegionNV-decompressedSize-11796) VUID-VkDecompressMemoryRegionNV-decompressedSize-11796

`decompressedSize` **must** not be zero

* 
[](#VUID-VkDecompressMemoryRegionNV-srcAddress-07691) VUID-VkDecompressMemoryRegionNV-srcAddress-07691

The memory range defined by `srcAddress` and `compressedSize`
**must** not overlap the memory range defined by `dstAddress` and
`decompressedSize`

* 
[](#VUID-VkDecompressMemoryRegionNV-decompressionMethod-09395) VUID-VkDecompressMemoryRegionNV-decompressionMethod-09395

If `decompressionMethod` is
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](#VkMemoryDecompressionMethodFlagBitsNV), then
`decompressedSize` **must** be less than or equal to 65536 bytes

* 
[](#VUID-vkCmdDecompressMemoryNV-memoryDecompression-11766) VUID-vkCmdDecompressMemoryNV-memoryDecompression-11766

The [`memoryDecompression`](features.html#features-memoryDecompression) feature
**must** be enabled

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
[VkMemoryDecompressionMethodFlagBitsEXT](#VkMemoryDecompressionMethodFlagBitsEXT) with a single bit set
specifying the method used to decompress data.

* 
`indirectCommandsAddress` is the device address containing
decompression parameters laid out as an array of
[VkDecompressMemoryRegionEXT](#VkDecompressMemoryRegionEXT) structures.

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

The [`memoryDecompression`](features.html#features-memoryDecompression) feature
**must** be enabled

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07694) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07694

`indirectCommandsAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07695) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsAddress-07695

`indirectCommandsAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07697) VUID-vkCmdDecompressMemoryIndirectCountEXT-indirectCommandsCountAddress-07697

`indirectCommandsCountAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

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
equal to sizeof([VkDecompressMemoryRegionEXT](#VkDecompressMemoryRegionEXT))

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-maxDecompressionCount-11768) VUID-vkCmdDecompressMemoryIndirectCountEXT-maxDecompressionCount-11768

`maxDecompressionCount` **must** be less than or equal to
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`maxDecompressionIndirectCount`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11769) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11769

If `decompressionMethod` is
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](#VkMemoryDecompressionMethodFlagBitsNV), then all
values in [VkDecompressMemoryRegionEXT](#VkDecompressMemoryRegionEXT)::`decompressedSize`
**must** be less than or equal to 65536 bytes

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11810) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-11810

`decompressionMethod` **must** be a valid bit specified in
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`decompressionMethods`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-parameter) VUID-vkCmdDecompressMemoryIndirectCountEXT-decompressionMethod-parameter

 `decompressionMethod` **must** be a valid combination of [VkMemoryDecompressionMethodFlagBitsEXT](#VkMemoryDecompressionMethodFlagBitsEXT) values

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

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryIndirectCountEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

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
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryIndirectCountEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To decompress data between one or more memory regions by specifying
decompression parameters indirectly in a buffer, call:

// Provided by VK_NV_memory_decompression
void vkCmdDecompressMemoryIndirectCountNV(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             indirectCommandsAddress,
    VkDeviceAddress                             indirectCommandsCountAddress,
    uint32_t                                    stride);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`indirectCommandsAddress` is the device address containing
decompression parameters laid out as an array of
[VkDecompressMemoryRegionNV](#VkDecompressMemoryRegionNV) structures.

* 
`indirectCommandsCountAddress` is the device address containing a
32-bit integer value specifying the decompression count.

* 
`stride` is the byte stride between successive sets of decompression
parameters located starting from `indirectCommandsAddress`.

Each region specified in `indirectCommandsAddress` is decompressed from
the source to destination region based on the specified
`decompressionMethod`.

Valid Usage

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-None-07692) VUID-vkCmdDecompressMemoryIndirectCountNV-None-07692

The [`memoryDecompression`](features.html#features-memoryDecompression) feature
**must** be enabled

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-07694) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-07694

`indirectCommandsAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-07695) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-07695

`indirectCommandsAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07697) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07697

`indirectCommandsCountAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07698) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07698

`indirectCommandsCountAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07699) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-07699

The count stored in `indirectCommandsCountAddress` **must** be less
than or equal to
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`maxDecompressionIndirectCount`

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-11794) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-11794

All device addresses between `indirectCommandsAddress` and
`indirectCommandsAddress` +  (`stride` × (count
stored in `indirectCommandsCountAddress`)) - 1 **must** be in the
buffer device address range of the same buffer

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-stride-11770) VUID-vkCmdDecompressMemoryIndirectCountNV-stride-11770

`stride` **must** be a multiple of `4` and **must** be greater than or
equal to sizeof([VkDecompressMemoryRegionNV](#VkDecompressMemoryRegionNV))

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-parameter) VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-parameter) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsAddress-parameter

 `indirectCommandsAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-parameter) VUID-vkCmdDecompressMemoryIndirectCountNV-indirectCommandsCountAddress-parameter

 `indirectCommandsCountAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-recording) VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-cmdpool) VUID-vkCmdDecompressMemoryIndirectCountNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-renderpass) VUID-vkCmdDecompressMemoryIndirectCountNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-suspended) VUID-vkCmdDecompressMemoryIndirectCountNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecompressMemoryIndirectCountNV-videocoding) VUID-vkCmdDecompressMemoryIndirectCountNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDecompressMemoryIndirectCountNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Bits which **can** be set in
`VkDecompressMemoryRegionEXT`::`decompressionMethod`
or `VkDecompressMemoryRegionNV`::`decompressionMethod`
specifying the decompression method to select, or returned in
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`decompressionMethods`
specifying the available decompression methods are:

// Provided by VK_EXT_memory_decompression
// Flag bits for VkMemoryDecompressionMethodFlagBitsEXT
typedef VkFlags64 VkMemoryDecompressionMethodFlagBitsEXT;
static const VkMemoryDecompressionMethodFlagBitsEXT VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT = 0x00000001ULL;
static const VkMemoryDecompressionMethodFlagBitsEXT VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_NV = 0x00000001ULL;

// Provided by VK_NV_memory_decompression
// Equivalent to VkMemoryDecompressionMethodFlagBitsEXT
typedef VkMemoryDecompressionMethodFlagBitsEXT VkMemoryDecompressionMethodFlagBitsNV;

* 
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](#VkMemoryDecompressionMethodFlagBitsNV) specifies that
the GDeflate 1.0 algorithm is used to decompress data.

// Provided by VK_EXT_memory_decompression
typedef VkFlags64 VkMemoryDecompressionMethodFlagsEXT;

// Provided by VK_NV_memory_decompression
// Equivalent to VkMemoryDecompressionMethodFlagsEXT
typedef VkMemoryDecompressionMethodFlagsEXT VkMemoryDecompressionMethodFlagsNV;

`VkMemoryDecompressionMethodFlagsEXT` is a bitmask type for specifying a
mask of one or more [VkMemoryDecompressionMethodFlagBitsEXT](#VkMemoryDecompressionMethodFlagBitsEXT).
