# VK_EXT_texture_compression_astc_3d(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_texture_compression_astc_3d.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_texture_compression_astc_3d](#VK_EXT_texture_compression_astc_3d)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_texture_compression_astc_3d - device extension

**Name String**

`VK_EXT_texture_compression_astc_3d`

**Extension Type**

Device extension

**Registered Extension Number**

289

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_texture_compression_astc_3d] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_texture_compression_astc_3d extension*)

**Extension Proposal**

[VK_EXT_texture_compression_astc_3d](../../../../features/latest/features/proposals/VK_EXT_texture_compression_astc_3d.html)

**Last Modified Date**

2025-06-09

**IP Status**

No known issues.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

This extension adds support for 3D textures compressed using the Adaptive
Scalable Texture Compression (ASTC) format.

These formats are compressed in 3D.
As such, each slice will contain data for a Width x Height x Depth block of
the texture.
All transfer operations are done at the granularity of block dimensions.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT](VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT.html)

* 
`VK_EXT_TEXTURE_COMPRESSION_ASTC_3D_EXTENSION_NAME`

* 
`VK_EXT_TEXTURE_COMPRESSION_ASTC_3D_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](VkFormat.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_3D_FEATURES_EXT](VkStructureType.html)

None.

* 
Revision 1, 2025-06-09 (Jan-Harald Fredriksen)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_texture_compression_astc_3d).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
