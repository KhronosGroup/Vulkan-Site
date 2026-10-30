# VkHostImageLayoutTransitionInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHostImageLayoutTransitionInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHostImageLayoutTransitionInfo - Structure specifying the parameters of a host-side image layout transition

The `VkHostImageLayoutTransitionInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkHostImageLayoutTransitionInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkImage                    image;
    VkImageLayout              oldLayout;
    VkImageLayout              newLayout;
    VkImageSubresourceRange    subresourceRange;
} VkHostImageLayoutTransitionInfo;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkHostImageLayoutTransitionInfo
typedef VkHostImageLayoutTransitionInfo VkHostImageLayoutTransitionInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is a handle to the image affected by this layout transition.

* 
`oldLayout` is the old layout in an
[image layout transition](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

* 
`newLayout` is the new layout in an
[image layout transition](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

* 
`subresourceRange` describes the [image    subresource range](../../../../spec/latest/chapters/resources.html#resources-image-views) within `image` that is affected by this layout
transition.

`vkTransitionImageLayout` does not check whether the device memory
associated with an image is currently in use before performing the layout
transition.
The application **must** guarantee that any previously submitted command that
reads from or writes to this subresource has completed before the host
performs the layout transition.
The memory of `image` is accessed by the host as if [coherent](../../../../spec/latest/chapters/memory.html#memory-coherent).

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) and the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled, the
`baseArrayLayer` and `layerCount` members of `subresourceRange`
specify the subset of slices of the 3D image affected by the memory barrier,
including the layout transition.
Any slices of a 3D image not included in `subresourceRange` are not
affected by the memory barrier and remain in their existing layout.

|  | Image layout transitions performed on the host do not require queue family
| --- | --- |
ownership transfers as the physical layout of the image will not vary
between queue families for the layouts supported by this function. |

|  | If the device has written to the image memory, it is not automatically made
| --- | --- |
available to the host.
Before this command can be called, a memory barrier for this image **must**
have been issued on the device with the second
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) including
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html) and [VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html).

Because queue submissions [automatically make host memory visible to the device](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-host-writes), there would not be a
need for a memory barrier before using the results of this layout transition
on the device. |

Valid Usage

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09055) VUID-VkHostImageLayoutTransitionInfo-image-09055

`image` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01486) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01486

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01724) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01724

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01488) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01488

If `image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, or the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not enabled,
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10798) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10798

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set,
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10799) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10799

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set and either
`subresourceRange.baseArrayLayer` is not equal to 0 or
`subresourceRange.layerCount` is not equal to
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `subresourceRange.levelCount` **must**
be 1

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01725) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01725

If
`image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, or the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not enabled,
and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10800) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10800

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled,
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), and `image` is a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set,
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-01932) VUID-VkHostImageLayoutTransitionInfo-image-01932

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09241) VUID-VkHostImageLayoutTransitionInfo-image-09241

If `image` has a color format
that is single-plane,
then the `aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09242) VUID-VkHostImageLayoutTransitionInfo-image-09242

If `image` has a color format and is not *disjoint*, then the
`aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-01672) VUID-VkHostImageLayoutTransitionInfo-image-01672

If `image` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
the image is *disjoint*, then the `aspectMask` member of
`subresourceRange` **must** include at least one
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit or
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-03320) VUID-VkHostImageLayoutTransitionInfo-image-03320

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled,
then the `aspectMask` member of `subresourceRange` **must** include
both [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-03319) VUID-VkHostImageLayoutTransitionInfo-image-03319

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is enabled, then the
`aspectMask` member of `subresourceRange` **must** include either
or both [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-10749) VUID-VkHostImageLayoutTransitionInfo-image-10749

If `image` has a depth-only format then the `aspectMask` member
of `subresourceRange` **must** be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-10750) VUID-VkHostImageLayoutTransitionInfo-image-10750

If `image` has a stencil-only format then the `aspectMask`
member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-aspectMask-08702) VUID-VkHostImageLayoutTransitionInfo-aspectMask-08702

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-aspectMask-08703) VUID-VkHostImageLayoutTransitionInfo-aspectMask-08703

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-09601) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-09601

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01208) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01208

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01209) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01209

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01210) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01210

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01211) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01211

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01212) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01212

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01213) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01213

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-10767) VUID-VkHostImageLayoutTransitionInfo-oldLayout-10767

If the [    zeroInitializeDeviceMemory](../../../../spec/latest/chapters/features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `oldLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-10768) VUID-VkHostImageLayoutTransitionInfo-oldLayout-10768

If `oldLayout` is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html), then
all subresources **must** be included in the barrier

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01658) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01658

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01659) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01659

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04065) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04065

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04066) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04066

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04067) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04067

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04068) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04068

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-synchronization2-07793) VUID-VkHostImageLayoutTransitionInfo-synchronization2-07793

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `oldLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-synchronization2-07794) VUID-VkHostImageLayoutTransitionInfo-synchronization2-07794

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03938) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03938

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](VkImageLayout.html), `image` **must** have been
created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03939) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03939

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](VkImageLayout.html), `image` **must** have been
created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-02088) VUID-VkHostImageLayoutTransitionInfo-oldLayout-02088

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07120) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07120

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07121) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07121

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07122) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07122

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07123) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07123

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07124) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07124

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07125) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07125

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-10287) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-10287

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07006) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07006

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) then
`image` **must** have been created with either the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set, and
the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flags set, and the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-attachmentFeedbackLoopLayout-07313) VUID-VkHostImageLayoutTransitionInfo-attachmentFeedbackLoopLayout-07313

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-09550) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-09550

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html) then `image` **must** have
been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag
set, or with both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage
flag and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09551) VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09551

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`oldLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09552) VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09552

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`newLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-09229) VUID-VkHostImageLayoutTransitionInfo-oldLayout-09229

`oldLayout` **must** be either [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or the
current layout of the image subresources as specified in
`subresourceRange`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-09230) VUID-VkHostImageLayoutTransitionInfo-oldLayout-09230

    If `oldLayout` is not [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html),
    or [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html), it **must** be one of the layouts
    in [VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`pCopySrcLayouts`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-newLayout-09057) VUID-VkHostImageLayoutTransitionInfo-newLayout-09057

`newLayout` **must** be one of the layouts in
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`pCopyDstLayouts`

Valid Usage (Implicit)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-sType-sType) VUID-VkHostImageLayoutTransitionInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO](VkStructureType.html)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-pNext-pNext) VUID-VkHostImageLayoutTransitionInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-parameter) VUID-VkHostImageLayoutTransitionInfo-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-parameter) VUID-VkHostImageLayoutTransitionInfo-oldLayout-parameter

 `oldLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkHostImageLayoutTransitionInfo-newLayout-parameter) VUID-VkHostImageLayoutTransitionInfo-newLayout-parameter

 `newLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-parameter) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](VkImageSubresourceRange.html) structure

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceRange](VkImageSubresourceRange.html), [VkStructureType](VkStructureType.html), [vkTransitionImageLayout](vkTransitionImageLayout.html), [vkTransitionImageLayout](vkTransitionImageLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkHostImageLayoutTransitionInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
