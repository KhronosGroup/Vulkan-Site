# VkFormatProperties3(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormatProperties3.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormatProperties3 - Structure specifying image format properties

To query supported format extended features which are properties of the
physical device, add [VkFormatProperties3](#) structure to the `pNext`
chain of [VkFormatProperties2](VkFormatProperties2.html).

The [VkFormatProperties3](#) structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkFormatProperties3 {
    VkStructureType          sType;
    void*                    pNext;
    VkFormatFeatureFlags2    linearTilingFeatures;
    VkFormatFeatureFlags2    optimalTilingFeatures;
    VkFormatFeatureFlags2    bufferFeatures;
} VkFormatProperties3;

// Provided by VK_KHR_format_feature_flags2
// Equivalent to VkFormatProperties3
typedef VkFormatProperties3 VkFormatProperties3KHR;

* 
`linearTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_LINEAR](VkImageTiling.html).

* 
`optimalTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).

* 
`bufferFeatures` is a bitmask of [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html)
specifying features supported by buffers.

The bits reported in `linearTilingFeatures`, `optimalTilingFeatures`
and `bufferFeatures` **must** include the bits reported in the
corresponding fields of `VkFormatProperties2`::`formatProperties`.

Valid Usage (Implicit)

* 
[](#VUID-VkFormatProperties3-sType-sType) VUID-VkFormatProperties3-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormatProperties3).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
