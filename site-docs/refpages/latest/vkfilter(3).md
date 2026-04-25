# VkFilter(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFilter.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFilter - Specify filters used for texture lookups

Possible values of the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`magFilter` and
`minFilter` parameters, specifying filters used for texture lookups,
are:

// Provided by VK_VERSION_1_0
typedef enum VkFilter {
    VK_FILTER_NEAREST = 0,
    VK_FILTER_LINEAR = 1,
  // Provided by VK_EXT_filter_cubic
    VK_FILTER_CUBIC_EXT = 1000015000,
  // Provided by VK_IMG_filter_cubic
    VK_FILTER_CUBIC_IMG = VK_FILTER_CUBIC_EXT,
} VkFilter;

* 
[VK_FILTER_NEAREST](#) specifies nearest filtering.

* 
[VK_FILTER_LINEAR](#) specifies linear filtering.

* 
[VK_FILTER_CUBIC_EXT](#) specifies cubic filtering.

These filters are described in detail in [Texel Filtering](../../../../spec/latest/chapters/textures.html#textures-texel-filtering).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBlitImageInfo2](VkBlitImageInfo2.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [vkCmdBlitImage](vkCmdBlitImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkFilter).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
