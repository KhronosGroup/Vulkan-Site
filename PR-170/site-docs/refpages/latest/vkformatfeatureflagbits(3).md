# VkFormatFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormatFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormatFeatureFlagBits - Bitmask specifying features supported by a buffer

Bits which **can** be set in the [VkFormatProperties](VkFormatProperties.html) features
`linearTilingFeatures`, `optimalTilingFeatures`,
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierTilingFeatures`,
and `bufferFeatures` are:

|  | This functionality is superseded by [VkFormatFeatureFlagBits2](../../../../spec/latest/chapters/formats.html#VkFormatFeatureFlagBits2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkFormatFeatureFlagBits {
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT = 0x00000001,
    VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT = 0x00000002,
    VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT = 0x00000004,
    VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT = 0x00000008,
    VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT = 0x00000010,
    VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT = 0x00000020,
    VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT = 0x00000040,
    VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT = 0x00000080,
    VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT = 0x00000100,
    VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT = 0x00000200,
    VK_FORMAT_FEATURE_BLIT_SRC_BIT = 0x00000400,
    VK_FORMAT_FEATURE_BLIT_DST_BIT = 0x00000800,
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT = 0x00001000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_TRANSFER_SRC_BIT = 0x00004000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_TRANSFER_DST_BIT = 0x00008000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT = 0x00020000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT = 0x00040000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT = 0x00080000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT = 0x00100000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT = 0x00200000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_DISJOINT_BIT = 0x00400000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT = 0x00800000,
  // Provided by VK_VERSION_1_2
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT = 0x00010000,
  // Provided by VK_KHR_video_decode_queue
    VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR = 0x02000000,
  // Provided by VK_KHR_video_decode_queue
    VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR = 0x04000000,
  // Provided by VK_KHR_acceleration_structure
    VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR = 0x20000000,
  // Provided by VK_EXT_filter_cubic
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT = 0x00002000,
  // Provided by VK_EXT_fragment_density_map
    VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT = 0x01000000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x40000000,
  // Provided by VK_KHR_video_encode_queue
    VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR = 0x08000000,
  // Provided by VK_KHR_video_encode_queue
    VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR = 0x10000000,
  // Provided by VK_IMG_filter_cubic
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_IMG = VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT,
  // Provided by VK_KHR_maintenance1
    VK_FORMAT_FEATURE_TRANSFER_SRC_BIT_KHR = VK_FORMAT_FEATURE_TRANSFER_SRC_BIT,
  // Provided by VK_KHR_maintenance1
    VK_FORMAT_FEATURE_TRANSFER_DST_BIT_KHR = VK_FORMAT_FEATURE_TRANSFER_DST_BIT,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT_EXT = VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT_KHR = VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_DISJOINT_BIT_KHR = VK_FORMAT_FEATURE_DISJOINT_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT_KHR = VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT,
} VkFormatFeatureFlagBits;

These values
all have the same meaning as the equivalently named values for
[VkFormatFeatureFlags2](VkFormatFeatureFlags2.html) and
**may** be set in
`linearTilingFeatures`, `optimalTilingFeatures`, and
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierTilingFeatures`,
specifying that the features are supported by [images](../../../../spec/latest/chapters/resources.html#VkImage) or
[image views](../../../../spec/latest/chapters/resources.html#VkImageView)
or [sampler Y′CBCR conversion objects](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrConversion)
created with the queried
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html)::`format`:

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#) specifies that an image view
**can** be [sampled from](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sampledimage).

* 
[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#) specifies that an image view
**can** be used as a [storage image](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storageimage).

* 
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#) specifies that an image
view **can** be used as storage image that supports atomic operations.

* 
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#) specifies that an image
view **can** be used as a framebuffer color attachment and as an input
attachment.

* 
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#) specifies that an
image view **can** be used as a framebuffer color attachment that supports
blending.

* 
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#) specifies that an
image view **can** be used as a framebuffer depth/stencil attachment and as
an input attachment.

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#) specifies that an image **can** be
used as `srcImage` for the
`vkCmdBlitImage2` and `vkCmdBlitImage` commands.

* 
[VK_FORMAT_FEATURE_BLIT_DST_BIT](#) specifies that an image **can** be
used as `dstImage` for the
`vkCmdBlitImage2` and `vkCmdBlitImage` commands.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#) specifies that
if [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#) is also set, an image view
**can** be used with a sampler that has either of `magFilter` or
`minFilter` set to [VK_FILTER_LINEAR](VkFilter.html), or `mipmapMode` set
to [VK_SAMPLER_MIPMAP_MODE_LINEAR](VkSamplerMipmapMode.html).
If [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#) is also set, an image can be
used as the `srcImage` to
`vkCmdBlitImage2` and `vkCmdBlitImage`
with a `filter` of [VK_FILTER_LINEAR](VkFilter.html).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#) or
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#).

If the format being queried is a depth/stencil format, this bit only
specifies that the depth aspect (not the stencil aspect) of an image of this
format supports linear filtering, and that linear filtering of the depth
aspect is supported whether depth compare is enabled in the sampler or not.
Where depth comparison is supported it **may** be linear filtered whether this
bit is present or not, but where this bit is not present the filtered value
**may** be computed in an implementation-dependent manner which differs from
the normal rules of linear filtering.
The resulting value **must** be in the range [0,1] and **should** be
proportional to, or a weighted average of, the number of comparison passes
or failures.

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#) specifies that an image **can** be
used as a source image for [copy commands](../../../../spec/latest/chapters/copies.html#copies).
If the application `apiVersion` is Vulkan 1.0 and
`[VK_KHR_maintenance1](VK_KHR_maintenance1.html)` is not supported,
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#) is implied to be set when the
format feature flag is not 0.

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#) specifies that an image **can** be
used as a destination image for [copy commands](../../../../spec/latest/chapters/copies.html#copies) and [    clear commands](../../../../spec/latest/chapters/clears.html#clears).
If the application `apiVersion` is Vulkan 1.0 and
`[VK_KHR_maintenance1](VK_KHR_maintenance1.html)` is not supported,
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#) is implied to be set when the
format feature flag is not 0.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](#) specifies
`VkImage` **can** be used as a sampled image with a min or max
[VkSamplerReductionMode](VkSamplerReductionMode.html).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#).

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](#) specifies
that `VkImage` **can** be used with a sampler that has either of
`magFilter` or `minFilter` set to [VK_FILTER_CUBIC_EXT](VkFilter.html), or
be the source image for a blit with `filter` set to
[VK_FILTER_CUBIC_EXT](VkFilter.html).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#).
If the format being queried is a depth/stencil format, this only
specifies that the depth aspect is cubic filterable.

* 
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#) specifies that an
application **can** define a [sampler Y′CBCR    conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_MIDPOINT](VkChromaLocation.html).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_COSITED_EVEN](VkChromaLocation.html).
If a format does not incorporate chroma downsampling (it is not a
“422” or “420” format) but the implementation supports sampler
Y′CBCR conversion for this format, the implementation **must** set
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#).

* 
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](#) specifies that an
application **can** define a [sampler Y′CBCR    conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_COSITED_EVEN](VkChromaLocation.html).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_MIDPOINT](VkChromaLocation.html).
If neither [VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](#) nor
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#) is set, the
application **must** not define a [sampler    Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) using this format as a source.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](#)
specifies that an application **can** define a
[sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) using this
format as a source with `chromaFilter` set to
[VK_FILTER_LINEAR](VkFilter.html).

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](#)
specifies that the format can have different chroma, min, and mag
filters.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#)
specifies that reconstruction is explicit, as described in
[Chroma Reconstruction](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction).
If this bit is not present, reconstruction is implicit by default.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#)
specifies that reconstruction **can** be forcibly made explicit by setting
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)::`forceExplicitReconstruction`
to [VK_TRUE](VK_TRUE.html).
If the format being queried supports
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#)
it **must** also support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#).

* 
[VK_FORMAT_FEATURE_DISJOINT_BIT](#) specifies that a multi-planar image
**can** have the [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set during image
creation.
An implementation **must** not set [VK_FORMAT_FEATURE_DISJOINT_BIT](#) for
*single-plane formats*.

* 
[VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT](#) specifies that an
image view **can** be used as a
[fragment density map    attachment](../../../../spec/latest/chapters/renderpass.html#renderpass-fragmentdensitymapattachment).

* 
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)
specifies that an image view **can** be used as a
[fragment shading rate    attachment](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment).
An implementation **must** not set this feature for formats with a
[numeric format](../../../../spec/latest/chapters/formats.html#formats-numericformat) other than `UINT`, or set
it as a buffer feature.

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](#) specifies that an
image view with this format **can** be used as a [    decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture) in [video decode    operations](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](#) specifies that an image
view with this format **can** be used as an output [    reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input [reference    picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in [video decode operations](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](#) specifies that an
image view with this format **can** be used as an [    encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) in [video encode    operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](#) specifies that an image
view with this format **can** be used as an output [    reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input [reference    picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in [video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

|  | Specific [video profiles](../../../../spec/latest/chapters/videocoding.html#video-profiles) **may** have additional restrictions
| --- | --- |
on the format and other image creation parameters corresponding to image
views used by video coding operations that **can** be enumerated using the
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) command. |

The following bits **may** be set in `bufferFeatures`, specifying that the
features are supported by [buffers](../../../../spec/latest/chapters/resources.html#VkBuffer) or [buffer views](../../../../spec/latest/chapters/resources.html#VkBufferView) created with the queried
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html)::`format`:

* 
[VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) descriptor.

* 
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor.

* 
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#) specifies that
atomic operations are supported on
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) with this format.

* 
[VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#) specifies that the format **can**
be used as a vertex attribute format
(`VkVertexInputAttributeDescription`::`format`).

* 
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](#)
specifies that the format **can** be used as the vertex format when
creating an [acceleration structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure)
(`VkAccelerationStructureGeometryTrianglesDataKHR`::`vertexFormat`).
This format **can** also be used as the vertex format in host memory when
doing [host acceleration structure](../../../../spec/latest/chapters/accelstructures.html#host-acceleration-structure)
builds.

|  | [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#) and
| --- | --- |
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#) are only intended to
be advertised for single-component formats, since SPIR-V atomic operations
require a scalar type. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormatFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
