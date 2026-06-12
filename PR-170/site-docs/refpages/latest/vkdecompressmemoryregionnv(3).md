# VkDecompressMemoryRegionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDecompressMemoryRegionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDecompressMemoryRegionNV - Structure specifying decompression region parameters

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
[VkMemoryDecompressionMethodFlagBitsNV](VkMemoryDecompressionMethodFlagBitsEXT.html) with a single bit set
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
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](VkMemoryDecompressionMethodFlagBitsEXT.html), then
`decompressedSize` **must** be less than or equal to 65536 bytes

* 
[](#VUID-vkCmdDecompressMemoryNV-memoryDecompression-11766) VUID-vkCmdDecompressMemoryNV-memoryDecompression-11766

The [`memoryDecompression`](../../../../spec/latest/chapters/features.html#features-memoryDecompression) feature
**must** be enabled

[VK_NV_memory_decompression](VK_NV_memory_decompression.html), `VkDeviceAddress`, `VkDeviceSize`, [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html), [vkCmdDecompressMemoryNV](vkCmdDecompressMemoryNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#VkDecompressMemoryRegionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
