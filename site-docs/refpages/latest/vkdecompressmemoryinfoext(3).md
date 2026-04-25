# VkDecompressMemoryInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDecompressMemoryInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDecompressMemoryInfoEXT - Structure specifying decompression memory info

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decompressionMethod` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html) with a single bit set
specifying the method used to decompress data.

* 
`regionCount` is the number of regions to decompress.

* 
`pRegions` is a pointer to an array of
[VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html) structures specifying the regions to
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
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](VkMemoryDecompressionMethodFlagBitsEXT.html), then for each
element of `pRegions`, `decompressedSize` **must** be less than or
equal to 65536 bytes

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11763) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-11763

`decompressionMethod` **must** be a valid bit specified in
`VkPhysicalDeviceMemoryDecompressionPropertiesEXT`::`decompressionMethods`

Valid Usage (Implicit)

* 
[](#VUID-VkDecompressMemoryInfoEXT-sType-sType) VUID-VkDecompressMemoryInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DECOMPRESS_MEMORY_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDecompressMemoryInfoEXT-pNext-pNext) VUID-VkDecompressMemoryInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-parameter) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-parameter

 `decompressionMethod` **must** be a valid combination of [VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html) values

* 
[](#VUID-VkDecompressMemoryInfoEXT-decompressionMethod-requiredbitmask) VUID-VkDecompressMemoryInfoEXT-decompressionMethod-requiredbitmask

 `decompressionMethod` **must** not be `0`

* 
[](#VUID-VkDecompressMemoryInfoEXT-pRegions-parameter) VUID-VkDecompressMemoryInfoEXT-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` [VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html) structures

* 
[](#VUID-VkDecompressMemoryInfoEXT-regionCount-arraylength) VUID-VkDecompressMemoryInfoEXT-regionCount-arraylength

 `regionCount` **must** be greater than `0`

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html), [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCmdDecompressMemoryEXT](vkCmdDecompressMemoryEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#VkDecompressMemoryInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
