# VkImageUsageFlagBits2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageUsageFlagBits2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageUsageFlagBits2KHR - Bitmask specifying intended use of an image

Bits which **can** be set in
[VkImageUsageFlags2CreateInfoKHR](VkImageUsageFlags2CreateInfoKHR.html)::`usage`, specifying intended
usage of an image, are:

// Provided by VK_KHR_extended_flags
// Flag bits for VkImageUsageFlagBits2KHR
typedef VkFlags64 VkImageUsageFlagBits2KHR;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_TRANSFER_SRC_BIT_KHR = 0x00000001ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_TRANSFER_DST_BIT_KHR = 0x00000002ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_SAMPLED_BIT_KHR = 0x00000004ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_STORAGE_BIT_KHR = 0x00000008ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_COLOR_ATTACHMENT_BIT_KHR = 0x00000010ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_DEPTH_STENCIL_ATTACHMENT_BIT_KHR = 0x00000020ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_TRANSIENT_ATTACHMENT_BIT_KHR = 0x00000040ULL;
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_INPUT_ATTACHMENT_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_fragment_shading_rate
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_extended_flags with VK_EXT_fragment_density_map
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_FRAGMENT_DENSITY_MAP_BIT_EXT = 0x00000200ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_decode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_DECODE_DST_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_decode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_decode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_DECODE_DPB_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_encode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_encode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_encode_queue
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_ENCODE_DPB_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_extended_flags with VK_HUAWEI_invocation_mask
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_INVOCATION_MASK_BIT_HUAWEI = 0x00040000ULL;
// Provided by VK_KHR_extended_flags with VK_EXT_attachment_feedback_loop_layout
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x00080000ULL;
// Provided by VK_KHR_extended_flags with VK_QCOM_image_processing
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_SAMPLE_WEIGHT_BIT_QCOM = 0x00100000ULL;
// Provided by VK_KHR_extended_flags with VK_QCOM_image_processing
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_SAMPLE_BLOCK_MATCH_BIT_QCOM = 0x00200000ULL;
// Provided by VK_VERSION_1_4 with VK_KHR_extended_flags
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_HOST_TRANSFER_BIT_KHR = 0x00400000ULL;
// Provided by VK_KHR_extended_flags with VK_ARM_tensors
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_TENSOR_ALIASING_BIT_ARM = 0x00800000ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_encode_quantization_map
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x02000000ULL;
// Provided by VK_KHR_extended_flags with VK_KHR_video_encode_quantization_map
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR = 0x04000000ULL;
// Provided by VK_KHR_extended_flags with VK_QCOM_tile_memory_heap
static const VkImageUsageFlagBits2KHR VK_IMAGE_USAGE_2_TILE_MEMORY_BIT_QCOM = 0x08000000ULL;

* 
[VK_IMAGE_USAGE_2_TRANSFER_SRC_BIT_KHR](#) specifies that the image
**can** be used as the source of a transfer command.

* 
[VK_IMAGE_USAGE_2_TRANSFER_DST_BIT_KHR](#) specifies that the image
**can** be used as the destination of a transfer command.

* 
[VK_IMAGE_USAGE_2_SAMPLED_BIT_KHR](#) specifies that the image **can** be
used to create a `VkImageView` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), and be sampled by a
shader.

* 
[VK_IMAGE_USAGE_2_STORAGE_BIT_KHR](#) specifies that the image **can** be
used to create a `VkImageView` suitable for occupying a
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html).

* 
[VK_IMAGE_USAGE_2_COLOR_ATTACHMENT_BIT_KHR](#) specifies that the image
**can** be used to create a `VkImageView` suitable for use as a color
or resolve attachment in a `VkFramebuffer`.

* 
[VK_IMAGE_USAGE_2_DEPTH_STENCIL_ATTACHMENT_BIT_KHR](#) specifies that
the image **can** be used to create a `VkImageView` suitable for use as
a depth/stencil
or depth/stencil resolve
attachment in a `VkFramebuffer`.

* 
[VK_IMAGE_USAGE_2_TRANSIENT_ATTACHMENT_BIT_KHR](#) specifies that
implementations **may** support using [memory allocations](../../../../spec/latest/chapters/memory.html#memory) with
the [VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](VkMemoryPropertyFlagBits.html) to back an image with
this usage.
This bit **can** be set for any image that **can** be used to create a
`VkImageView` suitable for use as a color, resolve, depth/stencil,
or input attachment.

* 
[VK_IMAGE_USAGE_2_INPUT_ATTACHMENT_BIT_KHR](#) specifies that the image
**can** be used to create a `VkImageView` suitable for occupying
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html); be read from a shader as an
input attachment; and be used as an input attachment in a framebuffer.

* 
[VK_IMAGE_USAGE_2_FRAGMENT_DENSITY_MAP_BIT_EXT](#) specifies that the
image **can** be used to create a `VkImageView` suitable for use as a
[fragment density map image](../../../../spec/latest/chapters/fragmentdensitymapops.html#fragmentdensitymapops).

* 
[VK_IMAGE_USAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)
    specifies that the image **can** be used to create a `VkImageView`
    suitable for use as a
    [fragment shading rate    attachment](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](../../../../spec/latest/chapters/primsrast.html#primsrast-shading-rate-image)

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](#) specifies that the image
**can** be used as a [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture) in a
[video decode operation](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](#) is reserved for future
use.

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_DPB_BIT_KHR](#) specifies that the image
**can** be used as an output [reconstructed    picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input [reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in a
[video decode operation](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](#) is reserved for future
use.

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](#) specifies that the image
**can** be used as an [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_DPB_BIT_KHR](#) specifies that the image
**can** be used as an output [reconstructed    picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input [reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_2_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#) specifies that
the image **can** be used as a color or depth/stencil attachment with
[feedback loop enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop).

* 
[VK_IMAGE_USAGE_2_TILE_MEMORY_BIT_QCOM](#) specifies that the image
**can** be bound to `VkDeviceMemory` allocated from a
[VkMemoryHeap](VkMemoryHeap.html) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html)
property.

* 
[VK_IMAGE_USAGE_2_HOST_TRANSFER_BIT_KHR](#) specifies that the image
**can** be used with host copy commands and host layout transitions.

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#)
specifies that the image **can** be used as a
[quantization delta map](../../../../spec/latest/chapters/videocoding.html#encode-quantization-delta-map) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#) specifies that
the image **can** be used as an [emphasis map](../../../../spec/latest/chapters/videocoding.html#encode-emphasis-map) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_2_TENSOR_ALIASING_BIT_ARM](#) specifies that the image
**can** be transitioned to the [VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](VkImageLayout.html)
layout.
See [Memory Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageUsageFlagBits2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
