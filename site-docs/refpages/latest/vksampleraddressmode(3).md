# VkSamplerAddressMode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerAddressMode.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerAddressMode - Specify behavior of sampling with texture coordinates outside an image

Possible values of the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`addressMode*`
parameters, corresponding to different [wrapping operations](../../../../spec/latest/chapters/textures.html#textures-wrapping-operation) used during sampling, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerAddressMode {
    VK_SAMPLER_ADDRESS_MODE_REPEAT = 0,
    VK_SAMPLER_ADDRESS_MODE_MIRRORED_REPEAT = 1,
    VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE = 2,
    VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER = 3,
  // Provided by VK_VERSION_1_2, VK_KHR_sampler_mirror_clamp_to_edge
    VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE = 4,
  // Provided by VK_KHR_sampler_mirror_clamp_to_edge
  // VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE_KHR is a legacy alias
    VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE_KHR = VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE,
} VkSamplerAddressMode;

* 
[VK_SAMPLER_ADDRESS_MODE_REPEAT](#) specifies that the repeat wrap mode
will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_MIRRORED_REPEAT](#) specifies that the
mirrored repeat wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#) specifies that the clamp to
edge wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#) specifies that the clamp
to border wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](#) specifies that the
    mirror clamp to edge wrap mode will be used.
    This is only valid if
the [`samplerMirrorClampToEdge`](../../../../spec/latest/chapters/features.html#features-samplerMirrorClampToEdge) feature is enabled, or if
    the `[VK_KHR_sampler_mirror_clamp_to_edge](VK_KHR_sampler_mirror_clamp_to_edge.html)` extension is enabled.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerAddressMode).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
