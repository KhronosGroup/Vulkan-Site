# VkPhysicalDeviceTextureCompressionASTCHDRFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTextureCompressionASTCHDRFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTextureCompressionASTCHDRFeatures - Structure describing ASTC HDR features that can be supported by an implementation

The `VkPhysicalDeviceTextureCompressionASTCHDRFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceTextureCompressionASTCHDRFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureCompressionASTC_HDR;
} VkPhysicalDeviceTextureCompressionASTCHDRFeatures;

// Provided by VK_EXT_texture_compression_astc_hdr
// Equivalent to VkPhysicalDeviceTextureCompressionASTCHDRFeatures
typedef VkPhysicalDeviceTextureCompressionASTCHDRFeatures VkPhysicalDeviceTextureCompressionASTCHDRFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`textureCompressionASTC_HDR` indicates whether all of the ASTC HDR
compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](VkFormat.html)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats as normal.

If the `VkPhysicalDeviceTextureCompressionASTCHDRFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceTextureCompressionASTCHDRFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTextureCompressionASTCHDRFeatures-sType-sType) VUID-VkPhysicalDeviceTextureCompressionASTCHDRFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_texture_compression_astc_hdr](VK_EXT_texture_compression_astc_hdr.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceTextureCompressionASTCHDRFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
