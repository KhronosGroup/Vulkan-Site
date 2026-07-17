# VkSamplerMipmapMode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerMipmapMode.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerMipmapMode - Specify mipmap mode used for texture lookups

Possible values of the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`mipmapMode`,
specifying the mipmap mode used for texture lookups, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerMipmapMode {
    VK_SAMPLER_MIPMAP_MODE_NEAREST = 0,
    VK_SAMPLER_MIPMAP_MODE_LINEAR = 1,
} VkSamplerMipmapMode;

* 
[VK_SAMPLER_MIPMAP_MODE_NEAREST](#) specifies nearest filtering.

* 
[VK_SAMPLER_MIPMAP_MODE_LINEAR](#) specifies linear filtering.

These modes are described in detail in [Texel Filtering](../../../../spec/latest/chapters/textures.html#textures-texel-filtering).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerMipmapMode).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
