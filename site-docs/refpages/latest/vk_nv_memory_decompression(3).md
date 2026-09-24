# VK_NV_memory_decompression(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_memory_decompression.html

## Table of Contents

- [Name](#_name)
- [VK_NV_memory_decompression](#VK_NV_memory_decompression)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_memory_decompression - device extension

**Name String**

`VK_NV_memory_decompression`

**Extension Type**

Device extension

**Registered Extension Number**

428

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html)
extension

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_memory_decompression] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_NV_memory_decompression extension*)

**Last Modified Date**

2022-01-31

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Piers Daniell, NVIDIA

This extension adds support for performing memory to memory decompression.

* 
[vkCmdDecompressMemoryIndirectCountNV](vkCmdDecompressMemoryIndirectCountNV.html)

* 
[vkCmdDecompressMemoryNV](vkCmdDecompressMemoryNV.html)

* 
[VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMemoryDecompressionFeaturesNV](VkPhysicalDeviceMemoryDecompressionFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMemoryDecompressionPropertiesNV](VkPhysicalDeviceMemoryDecompressionPropertiesEXT.html)

* 
[VkMemoryDecompressionMethodFlagBitsNV](VkMemoryDecompressionMethodFlagBitsEXT.html)

* 
[VkMemoryDecompressionMethodFlagsNV](VkMemoryDecompressionMethodFlagsEXT.html)

* 
`VK_NV_MEMORY_DECOMPRESSION_EXTENSION_NAME`

* 
`VK_NV_MEMORY_DECOMPRESSION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_NV](VkStructureType.html)

* 
Revision 1, 2022-01-31 (Vikram Kushwaha)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_memory_decompression).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
