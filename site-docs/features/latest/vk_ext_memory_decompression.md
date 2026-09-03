# VK_EXT_memory_decompression

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_memory_decompression.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)
[5. Issues](#_issues)

This document details the VK_EXT_memory_decompression extension which adds support
for decompressing compressed assets on the GPU.

Compressed game assets which could be a very large amount of data, are usually
decompressed on the CPU before uploading to the GPU. This takes away CPU utilization
which can be used for other tasks if the decompression is moved to the GPU.

To make decompression more efficient on the GPU, we need a compression format
that is GPU friendly in terms of decompression. Gdeflate is a high-performance,
scalable, GPU-optimized data compression scheme that can help applications make
use of the large amount of data throughput available on modern NVMe devices and
parallelism of a GPU. It makes streaming decompression practical by eliminating
CPU bottlenecks from the overall I/O pipeline.

This extension proposes a GPU-efficient compression format and Vulkan commands
to decompress memory using that format.

The following commands can be used to perform GPU decompression:

void vkCmdDecompressMemoryEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDecompressMemoryInfoEXT*            pDecompressMemoryInfoEXT);

where `pDecompressMemoryInfoEXT` is a structure describing the decompression info parameter:

typedef struct VkDecompressMemoryInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkMemoryDecompressionMethodFlagsEXT decompressionMethod,
    uint32_t                            regionCount;
    const VkDecompressMemoryRegionEXT*  pRegions;
} VkDecompressMemoryInfoEXT;

`VkMemoryDecompressionMethodFlagsEXT` describes the format of the compressed data which could be
`VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT`.
`pRegions` is an array of `VkDecompressMemoryRegionEXT` structures containing the
decompression parameters:

typedef struct VkDecompressMemoryRegionEXT {
    VkDeviceAddress                       srcAddress;
    VkDeviceAddress                       dstAddress;
    VkDeviceSize                          compressedSize;
    VkDeviceSize                          decompressedSize;
} VkDecompressMemoryRegionEXT;

It is also possible to perform the decompression indirectly by specifying decompression
parameters in a GPU memory using:

void vkCmdDecompressMemoryIndirectCountEXT(
    VkCommandBuffer                             commandBuffer,
    VkMemoryDecompressionMethodFlagsEXT         decompressionMethod,
    VkDeviceAddress                             indirectCommandsAddress,
    VkDeviceAddress                             indirectCommandsCountAddress,
    uint32_t                                    maxDecompressionCount,
    uint32_t                                    stride);

where `indirectCommandsAddress` is a GPU address with a stride value of `stride` containing
an array of `VkDecompressMemoryRegionEXT` structures describing decompression parameters.
The number of decompressions performed is the mininimum of the count specified in
`indirectCommandsCountAddress` and `maxDecompressionCount`.

None
