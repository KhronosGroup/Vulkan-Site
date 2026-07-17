# VkMemoryDecompressionMethodFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryDecompressionMethodFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryDecompressionMethodFlagBitsEXT - List the supported memory decompression methods

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
[VK_MEMORY_DECOMPRESSION_METHOD_GDEFLATE_1_0_BIT_EXT](#) specifies that
the GDeflate 1.0 algorithm is used to decompress data.

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VK_NV_memory_decompression](VK_NV_memory_decompression.html), [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory_decompression.html#VkMemoryDecompressionMethodFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
