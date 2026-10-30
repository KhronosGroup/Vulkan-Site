# VK_EXT_memory_decompression(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_memory_decompression.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_memory_decompression](#VK_EXT_memory_decompression)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_memory_decompression - device extension

**Name String**

`VK_EXT_memory_decompression`

**Extension Type**

Device extension

**Registered Extension Number**

551

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

and

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_memory_decompression] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_EXT_memory_decompression extension*)

**Extension Proposal**

[VK_EXT_memory_decompression](../../../../features/latest/features/proposals/VK_EXT_memory_decompression.html)

**Last Modified Date**

2025-01-23

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Spencer Fricke, LunarG

This extension adds support for performing memory to memory decompression.

* 
[vkCmdDecompressMemoryEXT](vkCmdDecompressMemoryEXT.html)

* 
[vkCmdDecompressMemoryIndirectCountEXT](vkCmdDecompressMemoryIndirectCountEXT.html)

* 
[VkDecompressMemoryInfoEXT](VkDecompressMemoryInfoEXT.html)

* 
[VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMemoryDecompressionFeaturesEXT](VkPhysicalDeviceMemoryDecompressionFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMemoryDecompressionPropertiesEXT](VkPhysicalDeviceMemoryDecompressionPropertiesEXT.html)

* 
[VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html)

* 
[VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html)

* 
`VK_EXT_MEMORY_DECOMPRESSION_EXTENSION_NAME`

* 
`VK_EXT_MEMORY_DECOMPRESSION_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DECOMPRESS_MEMORY_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_EXT](VkStructureType.html)

1) How does an app know the minimum size that `decompressedSize` should
be set to?

**RESOLVED**: When decompressing, data is typically processed in chunks.
For example, with GDeflate 1.0, data is streamed in 64 KB blocks, but the
final block may be smaller.
The exact size of this last block depends on the compression method and
original data size and so it must be stored in the compressed bitstream so
that the decompressor can set `decompressedSize` correctly.
It is still ok for the last block to take up all 64 KB, but setting it too
low will cause issues and is undefined behavior.
It is a known limitation that the validation layers will not be able to
detect the minimum size of `decompressedSize` unless it decides to
implement each decompression method specification.

* 
Revision 1, 2025-01-23 (Daniel Koch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_memory_decompression).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
