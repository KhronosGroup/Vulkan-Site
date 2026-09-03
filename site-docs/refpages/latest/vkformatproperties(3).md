# VkFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormatProperties - Structure specifying image format properties

The `VkFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkFormatProperties {
    VkFormatFeatureFlags    linearTilingFeatures;
    VkFormatFeatureFlags    optimalTilingFeatures;
    VkFormatFeatureFlags    bufferFeatures;
} VkFormatProperties;

* 
`linearTilingFeatures` is a bitmask of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html)
specifying features supported by images created with a `tiling`
parameter of [VK_IMAGE_TILING_LINEAR](VkImageTiling.html).

* 
`optimalTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).

* 
`bufferFeatures` is a bitmask of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html)
specifying features supported by buffers.

|  | If no format feature flags are supported, the format itself is not
| --- | --- |
supported, and images of that format cannot be created. |

If `format` is block-compressed,
[requires sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion),
or is a depth/stencil format then `bufferFeatures` **must** not support any
features for the format.

If `format` is not a multi-plane format then `linearTilingFeatures`
and `optimalTilingFeatures` **must** not contain
[VK_FORMAT_FEATURE_DISJOINT_BIT](VkFormatFeatureFlagBits.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkFormatProperties2](VkFormatProperties2.html), [vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
