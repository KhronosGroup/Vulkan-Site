# VkImageCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCreateFlagBits - Bitmask specifying additional parameters of an image

Bits which **can** be set in [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`, specifying
additional parameters of an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageCreateFlagBits {
    VK_IMAGE_CREATE_SPARSE_BINDING_BIT = 0x00000001,
    VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT = 0x00000002,
    VK_IMAGE_CREATE_SPARSE_ALIASED_BIT = 0x00000004,
    VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT = 0x00000008,
    VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_ALIAS_BIT = 0x00000400,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT = 0x00000040,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT = 0x00000020,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT = 0x00000080,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_EXTENDED_USAGE_BIT = 0x00000100,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_PROTECTED_BIT = 0x00000800,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_DISJOINT_BIT = 0x00000200,
  // Provided by VK_NV_corner_sampled_image
    VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV = 0x00002000,
  // Provided by VK_EXT_descriptor_heap
    VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT = 0x00010000,
  // Provided by VK_EXT_sample_locations
    VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT = 0x00001000,
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT = 0x00004000,
  // Provided by VK_EXT_multisampled_render_to_single_sampled
    VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT = 0x00040000,
  // Provided by VK_EXT_image_2d_view_of_3d
    VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT = 0x00020000,
  // Provided by VK_KHR_video_maintenance1
    VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR = 0x00100000,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT = 0x00008000,
  // Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
    VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR = VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT,
  // Provided by VK_KHR_maintenance1
    VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT_KHR = VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT_KHR = VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR = VK_IMAGE_CREATE_EXTENDED_USAGE_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_CREATE_DISJOINT_BIT_KHR = VK_IMAGE_CREATE_DISJOINT_BIT,
  // Provided by VK_KHR_bind_memory2
    VK_IMAGE_CREATE_ALIAS_BIT_KHR = VK_IMAGE_CREATE_ALIAS_BIT,
  // Provided by VK_EXT_descriptor_buffer
    VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT,
  // Provided by VK_QCOM_fragment_density_map_offset
    VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_QCOM = VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT,
} VkImageCreateFlagBits;

* 
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#) specifies that the image will
be backed using sparse memory binding.

* 
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#) specifies that the image **can**
be partially backed using sparse memory binding.
Images created with this flag **must** also be created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#) flag.

* 
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#) specifies that the image will
be backed using sparse memory binding with memory ranges that might also
simultaneously be backing another image (or another portion of the same
image).
Images created with this flag **must** also be created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#) flag.

* 
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#) specifies that the image **can**
be used to create a `VkImageView` with a different format from the
image.
For [multi-planar formats](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#) specifies that a
`VkImageView` can be created of a *plane* of the image.

* 
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#) specifies that the image **can**
be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html).

* 
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#) specifies that the image
**can** be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html).

* 
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#) specifies that the
image **can** be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html).

* 
[VK_IMAGE_CREATE_PROTECTED_BIT](#) specifies that the image is a
protected image.

* 
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#) specifies that the
image **can** be used with a non-zero value of the
`splitInstanceBindRegionCount` member of a
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html) structure passed into
[vkBindImageMemory2](vkBindImageMemory2.html).
This flag also has the effect of making the image use the standard
sparse image block dimensions.

* 
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#) specifies that the
image having a compressed format **can** be used to create a
`VkImageView` with an uncompressed format where each texel in the
image view corresponds to a compressed texel block of the image.

* 
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](#) specifies that the image **can**
be created with usage flags that are not supported for the format the
image is created with but are supported for at least one format a
`VkImageView` created from the image **can** have.

* 
[VK_IMAGE_CREATE_DISJOINT_BIT](#) specifies that an image with a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) **must** have each plane
separately bound to memory, rather than having a single memory binding
for the whole image; the presence of this bit distinguishes a *disjoint
image* from an image without this bit set.

* 
[VK_IMAGE_CREATE_ALIAS_BIT](#) specifies that two images created with
    the same creation parameters and aliased to the same memory **can**
    interpret the contents of the memory consistently with each other,
    subject to the rules described in the [Memory    Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) section.
    This flag further specifies that each plane of a *disjoint* image **can**
    share an in-memory non-linear representation with single-plane images,
    and that a single-plane image **can** share an in-memory non-linear
    representation with a plane of a multi-planar disjoint image, according
    to the rules in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes).
    If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)
or
[VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html)
    structure whose `handleTypes` member is not `0`, it is as if
    [VK_IMAGE_CREATE_ALIAS_BIT](#) is set.

* 
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#)
specifies that an image with a depth or depth/stencil format **can** be
used with custom sample locations when used as a depth/stencil
attachment.

* 
[VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#) specifies that the image is
a [corner-sampled image](../../../../spec/latest/chapters/resources.html#resources-images-corner-sampled).

* 
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#) specifies that an image **can** be
in a subsampled format which **may** be more optimal when written as an
attachment by a render pass that has a fragment density map attachment.
Accessing a subsampled image has additional considerations:

Image data read as an image sampler will have **undefined** values if the
sampler was not created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html) or was not sampled through
a combined [embedded sampler and     image mapping](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT) if using descriptor heaps, or
the use of a combined image sampler with an immutable sampler in
`VkDescriptorSetLayoutBinding`.

* 
Image data read with an input attachment will have **undefined** values if
the contents were not written as an attachment in an earlier subpass of
the same render pass.

* 
Image data read as an image sampler in the fragment shader will be
additionally be read by the device during
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](VkPipelineStageFlagBits.html) if
[     `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`subsampledCoarseReconstructionEarlyAccess`](../../../../spec/latest/chapters/limits.html#limits-subsampledCoarseReconstructionEarlyAccess)
is [VK_TRUE](VK_TRUE.html) and the sampler was created with `flags`
containing
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](VkSamplerCreateFlagBits.html).

* 
Image data read with load operations are resampled to the fragment
density of the render pass if [     `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`subsampledLoads`](../../../../spec/latest/chapters/limits.html#limits-subsampledLoads)
is [VK_TRUE](VK_TRUE.html).
Otherwise, values of image data are **undefined**.

* 
Image contents outside of the render area take on **undefined** values if
the image is stored as a render pass attachment.

[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](#) specifies that
an image **can** be used in a render pass with non-zero
[fragment density map offsets](../../../../spec/latest/chapters/renderpass.html#renderpass-fragmentdensitymapoffsets).
In a render pass with non-zero offsets, fragment density map
attachments, input attachments, color attachments, depth/stencil
attachment, resolve attachments, and preserve attachments **must** be
created with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](#).

[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#) specifies
that the image **can** be used with descriptor buffers when capturing and
replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) for more detail.

[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](#)
specifies that an image **can** be used with
[multisampled rendering as a    single-sampled framebuffer attachment](../../../../spec/latest/chapters/renderpass.html#multisampled-render-to-single-sampled)

[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#) specifies that
the image **can** be used in [video coding operations](../../../../spec/latest/chapters/videocoding.html#video-coding)
without having to specify at image creation time the set of video
profiles the image will be used with, except for images used only as
[DPB](../../../../spec/latest/chapters/videocoding.html#dpb) pictures, as long as the image is otherwise
[compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile in
question.

|  | This enables exchanging video picture data without additional copies or
| --- | --- |
conversions when used as:

* 
[Decode output pictures](../../../../spec/latest/chapters/videocoding.html#decode-output-picture), regardless of the
video profile used to produce them.

* 
[Encode input pictures](../../../../spec/latest/chapters/videocoding.html#encode-input-picture), regardless of the video
profile used to consume them.

This includes images created with both
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) and
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html), which is necessary to use the
same video picture as the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture)
and [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture) in a video decode
operation on implementations supporting
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_COINCIDE_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html).

However, images with only DPB usage remain tied to the video profiles the
image was created with, as the data layout of such DPB-only images **may** be
implementation- and codec-dependent.

If an application would like to share or reuse the device memory backing
such images (e.g. for the purposes of temporal aliasing), then it **should**
create separate image objects for each video profile and bind them to the
same underlying device memory range, similar to how memory resources **can** be
shared across separate video sessions or any other memory-backed resource. |

See [Sparse Resource Features](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseresourcefeatures) and
[Sparse Physical Device Features](../../../../spec/latest/chapters/sparsemem.html#sparsememory-physicalfeatures) for more
details.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageCreateFlags](VkImageCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
