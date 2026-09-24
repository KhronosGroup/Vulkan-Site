# VK_EXT_texture_compression_astc_hdr(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_texture_compression_astc_hdr.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_texture_compression_astc_hdr](#VK_EXT_texture_compression_astc_hdr)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_texture_compression_astc_hdr - device extension

**Name String**

`VK_EXT_texture_compression_astc_hdr`

**Extension Type**

Device extension

**Registered Extension Number**

67

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_texture_compression_astc_hdr] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_texture_compression_astc_hdr extension*)

**Last Modified Date**

2019-05-28

**IP Status**

No known issues.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

This extension adds support for textures compressed using the Adaptive
Scalable Texture Compression (ASTC) High Dynamic Range (HDR) profile.

When this extension is enabled, the HDR profile is supported for all ASTC
formats listed in [ASTC Compressed Image Formats](../../../../spec/latest/appendices/compressedtex.html#appendix-compressedtex-astc).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTextureCompressionASTCHDRFeaturesEXT](VkPhysicalDeviceTextureCompressionASTCHDRFeatures.html)

* 
`VK_EXT_TEXTURE_COMPRESSION_ASTC_HDR_EXTENSION_NAME`

* 
`VK_EXT_TEXTURE_COMPRESSION_ASTC_HDR_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT](VkFormat.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
However, the feature is made optional in Vulkan 1.3.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

1) Should we add a feature or limit for this functionality?

Yes.
It is consistent with the ASTC LDR support to add a feature like
textureCompressionASTC_HDR.

The feature is strictly speaking redundant as long as this is just an
extension; it would be sufficient to just enable the extension.
But adding the feature is more forward-looking if wanted to make this an
optional core feature in the future.

2) Should we introduce new format enums for HDR?

Yes.
Vulkan 1.0 describes the ASTC format enums as UNORM, e.g.
[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](VkFormat.html), so it is confusing to make these
contain HDR data.
Note that the OpenGL (ES) extensions did not make this distinction because a
single ASTC HDR texture may contain both unorm and float blocks.
Implementations **may** not be able to distinguish between LDR and HDR ASTC
textures internally and just treat them as the same format, i.e. if this
extension is supported then sampling from a
[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](VkFormat.html) image format **may** return HDR results.
Applications **can** get predictable results by using the appropriate image
format.

* 
Revision 1, 2019-05-28 (Jan-Harald Fredriksen)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_texture_compression_astc_hdr).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
