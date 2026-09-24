# VkSamplerCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCreateFlagBits - Bitmask specifying additional parameters of sampler

Bits which **can** be set in [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`flags`, specifying
additional parameters of a sampler, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerCreateFlagBits {
  // Provided by VK_EXT_fragment_density_map
    VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT = 0x00000001,
  // Provided by VK_EXT_fragment_density_map
    VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT = 0x00000002,
  // Provided by VK_EXT_descriptor_buffer
    VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000008,
  // Provided by VK_EXT_non_seamless_cube_map
    VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT = 0x00000004,
  // Provided by VK_QCOM_image_processing
    VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM = 0x00000010,
} VkSamplerCreateFlagBits;

* 
 [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#)
specifies that the sampler will read from an image created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html).

* 
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](#)
specifies that the implementation **may** use approximations when
reconstructing a full color value for texture access from a subsampled
image.

* 
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](#) specifies that
[cube map edge handling](../../../../spec/latest/chapters/textures.html#textures-cubemapedge) is not performed.

* 

[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#) specifies that the
sampler will read from images using only `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM`.

|  | The approximations used when
| --- | --- |
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](#) is
specified are implementation defined.
Some implementations **may** interpolate between fragment density levels in a
subsampled image.
In that case, this bit **may** be used to decide whether the interpolation
factors are calculated per fragment or at a coarser granularity. |

* 
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#)
specifies that the sampler **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) for more detail.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSamplerCreateFlags](VkSamplerCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
