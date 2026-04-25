# VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT - Structure describing ASTC 3D features that can be supported by an implementation

The `VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_texture_compression_astc_3d
typedef struct VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureCompressionASTC_3D;
} VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `textureCompressionASTC_3D`
indicates whether all of the ASTC 3D compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

[VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](VkFormat.html)

If the `VkPhysicalDeviceTextureCompressionASTC3DFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceTextureCompressionASTC3DFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_3D_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_texture_compression_astc_3d](VK_EXT_texture_compression_astc_3d.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
