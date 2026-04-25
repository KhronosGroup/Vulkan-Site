# VkDecompressMemoryRegionEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDecompressMemoryRegionEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDecompressMemoryRegionEXT - Structure specifying decompression region

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
and `dstAddress` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies)
with the [VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) with
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html).

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
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkBufferUsageFlagBits2.html) usage flag set

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-11765) VUID-VkDecompressMemoryRegionEXT-dstAddress-11765

`dstAddress` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkBufferUsageFlagBits2.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkDecompressMemoryRegionEXT-srcAddress-parameter) VUID-VkDecompressMemoryRegionEXT-srcAddress-parameter

 `srcAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDecompressMemoryRegionEXT-dstAddress-parameter) VUID-VkDecompressMemoryRegionEXT-dstAddress-parameter

 `dstAddress` **must** be a valid `VkDeviceAddress` value

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VkDecompressMemoryInfoEXT](VkDecompressMemoryInfoEXT.html), `VkDeviceAddress`, `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#VkDecompressMemoryRegionEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
