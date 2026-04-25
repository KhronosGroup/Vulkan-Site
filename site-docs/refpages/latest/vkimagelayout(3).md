# VkImageLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageLayout - Layout of image and image subresources

The set of image layouts consists of:

// Provided by VK_VERSION_1_0
typedef enum VkImageLayout {
    VK_IMAGE_LAYOUT_UNDEFINED = 0,
    VK_IMAGE_LAYOUT_GENERAL = 1,
    VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL = 2,
    VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL = 3,
    VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL = 4,
    VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL = 5,
    VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL = 6,
    VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL = 7,
    VK_IMAGE_LAYOUT_PREINITIALIZED = 8,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL = 1000117000,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL = 1000117001,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL = 1000241000,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL = 1000241001,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL = 1000241002,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL = 1000241003,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL = 1000314000,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL = 1000314001,
  // Provided by VK_VERSION_1_4
    VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ = 1000232000,
  // Provided by VK_KHR_swapchain
    VK_IMAGE_LAYOUT_PRESENT_SRC_KHR = 1000001002,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR = 1000024000,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR = 1000024001,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR = 1000024002,
  // Provided by VK_KHR_shared_presentable_image
    VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR = 1000111000,
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT = 1000218000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR = 1000164003,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR = 1000299000,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR = 1000299001,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR = 1000299002,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT = 1000339000,
  // Provided by VK_ARM_tensors
    VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM = 1000460000,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR = 1000553000,
  // Provided by VK_EXT_zero_initialize_device_memory
    VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT = 1000620000,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL,
  // Provided by VK_NV_shading_rate_image
    VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV = VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR,
  // Provided by VK_KHR_dynamic_rendering_local_read
    VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR = VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_synchronization2
    VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_synchronization2
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
} VkImageLayout;

The type(s) of device access supported by each layout are:

* 
[VK_IMAGE_LAYOUT_UNDEFINED](#) specifies that the layout is unknown.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](VkImageCreateInfo.html).
This layout **can** be used in place of the current image layout in a
layout transition, but doing so will cause the contents of the image’s
memory to be **undefined**.

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#) specifies that an image’s memory is
in a defined layout and **can** be populated by data, but that it has not
yet been initialized by the driver.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](VkImageCreateInfo.html).
This layout is intended to be used as the initial layout for an image
whose contents are written by the host, and hence the data **can** be
written to memory immediately, without first executing a layout
transition.
Currently, [VK_IMAGE_LAYOUT_PREINITIALIZED](#) is only useful with
[linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource) images because there is not a
standard layout defined for [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html) images.

* 
[VK_IMAGE_LAYOUT_GENERAL](#) supports all types of device access,
unless specified otherwise.

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#) specifies that an image’s
memory is in a defined layout and is zeroed, but that it has not yet
been initialized by the driver.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](VkImageCreateInfo.html).
This layout is intended to be used as the initial layout for an image
whose contents are already zeroed, either from being explicitly set to
zero by an application or from being allocated with
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](VkMemoryAllocateFlagBits.html).

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](#) specifies a layout that **must**
only be used with attachment accesses in the graphics pipeline.

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](#) specifies a layout allowing read
only access as an attachment, or in shaders as a sampled image, combined
image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](#) **must** only be used as a
color or resolve attachment in a `VkFramebuffer`.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](#) specifies a
layout for both the depth and stencil aspects of a depth/stencil format
image allowing read and write access as a depth/stencil attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#) and
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#).

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](#) specifies a layout
for both the depth and stencil aspects of a depth/stencil format image
allowing read only access as a depth/stencil attachment or in shaders as
a sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#) and
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#).

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](#)
specifies a layout for depth/stencil format images allowing read and
write access to the stencil aspect as a stencil attachment, and read
only access to the depth aspect as a depth attachment or in shaders as a
sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#) and
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#).

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](#)
specifies a layout for depth/stencil format images allowing read and
write access to the depth aspect as a depth attachment, and read only
access to the stencil aspect as a stencil attachment or in shaders as a
sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#) and
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#).

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#) specifies a layout for
the depth aspect of a depth/stencil format image allowing read and write
access as a depth attachment.

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#) specifies a layout for the
depth aspect of a depth/stencil format image allowing read-only access
as a depth attachment or in shaders as a sampled image, combined
image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#) specifies a layout for
the stencil aspect of a depth/stencil format image allowing read and
write access as a stencil attachment.

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#) specifies a layout for
the stencil aspect of a depth/stencil format image allowing read-only
access as a stencil attachment or in shaders as a sampled image,
combined image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](#) specifies a layout
allowing read-only access in a shader as a sampled image, combined
image/sampler, or input attachment.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage bits enabled.

* 
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](#) **must** only be used as a
source image of a transfer command (see the definition of
[](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html)).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](#) **must** only be used as a
destination image of a transfer command.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](#) **must** only be used for presenting
a presentable image for display.

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](#) is valid only for shared
presentable images, and **must** be used for any usage the image supports.

* 
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](#) **must**
    only be used as a
    [fragment shading rate    attachment](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](../../../../spec/latest/chapters/primsrast.html#primsrast-shading-rate-image).
    This layout is valid only for image subresources of images created with
    the [VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html) usage
    flag set.

* 
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](#) **must** only be
used as a fragment density map attachment in a `VkRenderPass`.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](#) **must** only be used as a
[decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture) in a
[video decode operation](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](#) is reserved for future use.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](#) **must** only be used as an
output [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input
[reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in a [    video decode operation](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](#) is reserved for future use.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](#) **must** only be used as an
[encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](#) **must** only be used as an
output [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or an input
[reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) in a [    video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html) usage flag set.

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](#) **must** only be
used as either a color attachment or depth/stencil attachment and/or
read-only access in a shader as a sampled image, combined image/sampler,
or input attachment.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html) usage flag
set, and either the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set, and
either the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](#) **must** only be used as either
a storage image, or a color or depth/stencil attachment and an input
attachment.
This layout is valid only for image subresources of images created with
either the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag set, or both the
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) and either of the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](#) **must** only be
used as a [quantization map](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map) in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage flags set.

* 
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#) specifies the layout that an
image created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html) **must** be in, if the
[`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts) feature is
disabled, or **may** be in if it is enabled, for it and a tensor bound to
the same aliased range of memory to consistently interpret the data in
memory.
See [Memory Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](VkImageUsageFlagBits.html) usage flag set.

The layout of each image subresource is not a state of the image subresource
itself, but is rather a property of how the data in memory is organized, and
thus for each mechanism of accessing an image in the API the application
**must** specify a parameter or structure member that indicates which image
layout the image subresource(s) are considered to be in when the image will
be accessed.
For transfer commands, this is a parameter to the command (see [Clear Commands](../../../../spec/latest/chapters/clears.html#clears)
and [Copy Commands](../../../../spec/latest/chapters/copies.html#copies)).
For use as a framebuffer attachment, this is a member in the substructures
of the [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) (see [Render Pass](../../../../spec/latest/chapters/renderpass.html#renderpass)).
For use in a descriptor set, this is a member in the
`VkDescriptorImageInfo` structure (see [Descriptor Set Updates](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets-updates)).

If the [`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts) feature
is enabled, the [VK_IMAGE_LAYOUT_GENERAL](#) image layout **may** be used in
place of the other layouts where allowed with no loss of performance.

|  | [VK_IMAGE_LAYOUT_GENERAL](#) can be a useful catch-all image layout, but
| --- | --- |
there are situations where a dedicated image layout must be used instead.
Some examples include:

* 
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](#)

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](#)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](#),
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](#), and
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](#)
without the
[`unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo)
feature

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](#),
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](#), and
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](#)
without the
[`unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo)
feature

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](#)
without the
[`unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo)
feature |

|  | While [VK_IMAGE_LAYOUT_GENERAL](#) suggests that all types of device access
| --- | --- |
is possible, it does not mean that all patterns of memory accesses are safe
in all situations.
[Common Render Pass Data Races](../../../../spec/latest/chapters/renderpass.html#common-render-pass-data-races) outlines
some situations where data races are unavoidable.
For example, when a subresource is used as both an attachment and a sampled
image (i.e., not an input attachment), [enabling feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) adds extra guarantees which [VK_IMAGE_LAYOUT_GENERAL](#)
alone does not. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html), [VkAttachmentReference](VkAttachmentReference.html), [VkAttachmentReference2](VkAttachmentReference2.html), [VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html), [VkBlitImageInfo2](VkBlitImageInfo2.html), [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html), [VkCopyImageInfo2](VkCopyImageInfo2.html), [VkCopyImageToBufferInfo2](VkCopyImageToBufferInfo2.html), [VkCopyImageToImageInfo](VkCopyImageToImageInfo.html), [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html), [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html), [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html), [VkDataGraphPipelineResourceInfoImageLayoutARM](VkDataGraphPipelineResourceInfoImageLayoutARM.html), [VkDescriptorImageInfo](VkDescriptorImageInfo.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html), [VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html), [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html), [VkPhysicalDeviceVulkan14Properties](VkPhysicalDeviceVulkan14Properties.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html), [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html), [VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html), [VkResolveImageInfo2](VkResolveImageInfo2.html), [vkBindOpticalFlowSessionImageNV](vkBindOpticalFlowSessionImageNV.html), [vkCmdBindInvocationMaskHUAWEI](vkCmdBindInvocationMaskHUAWEI.html), [vkCmdBindShadingRateImageNV](vkCmdBindShadingRateImageNV.html), [vkCmdBlitImage](vkCmdBlitImage.html), [vkCmdClearColorImage](vkCmdClearColorImage.html), [vkCmdClearDepthStencilImage](vkCmdClearDepthStencilImage.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), [vkCmdCopyImage](vkCmdCopyImage.html), [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html), [vkCmdCopyMemoryToImageIndirectNV](vkCmdCopyMemoryToImageIndirectNV.html), [vkCmdResolveImage](vkCmdResolveImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
