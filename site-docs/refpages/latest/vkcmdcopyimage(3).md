# vkCmdCopyImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyImage - Copy data between images

To copy data between image objects, call:

// Provided by VK_VERSION_1_0
void vkCmdCopyImage(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     srcImage,
    VkImageLayout                               srcImageLayout,
    VkImage                                     dstImage,
    VkImageLayout                               dstImageLayout,
    uint32_t                                    regionCount,
    const VkImageCopy*                          pRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcImage` is the source image.

* 
`srcImageLayout` is the current layout of the source image
subresource.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the current layout of the destination image
subresource.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkImageCopy](VkImageCopy.html) structures
specifying the regions to copy.

Each source region specified by `pRegions` is copied from the source
image to the destination region of the destination image.
If any of the specified regions in `srcImage` overlaps in memory with
any of the specified regions in `dstImage`, values read from those
overlapping regions are **undefined**.
If any region accesses a depth aspect in `dstImage`
and the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not enabled,
values copied from `srcImage` outside of the range [0,1] will be
written as **undefined** values to the destination image.

[Multi-planar images](../../../../spec/latest/chapters/formats.html#formats-multiplanar) **can** only be copied on a
per-plane basis, and the subresources used in each region when copying to or
from such images **must** specify only one plane, though different regions **can**
specify different planes.
When copying planes of multi-planar images, the format considered is the
[compatible format for that plane](../../../../spec/latest/chapters/formats.html#formats-compatible-planes), rather than
the format of the multi-planar image.

If the format of the destination image has a different
[block extent](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) than the source image (e.g.
one is a compressed format), the offset and extent for each of the regions
specified is [scaled according to the block extents of each format](../../../../spec/latest/chapters/formats.html#formats-size-compatibility) to match in size.
Copy regions for each image **must** be aligned to a multiple of the texel
block extent in each dimension, except at the edges of the image, where
region extents **must** match the edge of the image.

Image data **can** be copied between images with different image types.
If one image is [VK_IMAGE_TYPE_3D](VkImageType.html) and the other image is
[VK_IMAGE_TYPE_2D](VkImageType.html) with multiple layers, then each slice is copied to or
from a different layer; `depth` slices in the 3D image correspond to
`layerCount` layers in the 2D image, with an effective `depth` of
`1` used for the 2D image.
If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is enabled, all
other combinations are allowed and function as if 1D images are 2D images
with a height of 1.
Otherwise, other combinations of image types are disallowed.

Valid Usage

* 
[](#VUID-vkCmdCopyImage-commandBuffer-01825) VUID-vkCmdCopyImage-commandBuffer-01825

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyImage-commandBuffer-01826) VUID-vkCmdCopyImage-commandBuffer-01826

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyImage-commandBuffer-01827) VUID-vkCmdCopyImage-commandBuffer-01827

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdCopyImage-commandBuffer-10217) VUID-vkCmdCopyImage-commandBuffer-10217

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pRegions`, where the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), the
`aspectMask` of `dstSubresource` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11782) VUID-vkCmdCopyImage-commandBuffer-11782

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `dstSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11783) VUID-vkCmdCopyImage-commandBuffer-11783

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `srcSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`dstSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11784) VUID-vkCmdCopyImage-commandBuffer-11784

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `dstSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11785) VUID-vkCmdCopyImage-commandBuffer-11785

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `srcSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`dstSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-10218) VUID-vkCmdCopyImage-commandBuffer-10218

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pRegions`, where the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) then the
`aspectMask` of `srcSubresource` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11786) VUID-vkCmdCopyImage-commandBuffer-11786

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `srcSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11787) VUID-vkCmdCopyImage-commandBuffer-11787

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `dstSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`srcSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11788) VUID-vkCmdCopyImage-commandBuffer-11788

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `srcSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-11789) VUID-vkCmdCopyImage-commandBuffer-11789

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `dstSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`srcSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage-pRegions-00124) VUID-vkCmdCopyImage-pRegions-00124

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-vkCmdCopyImage-srcImage-01995) VUID-vkCmdCopyImage-srcImage-01995

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-srcImageLayout-00128) VUID-vkCmdCopyImage-srcImageLayout-00128

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdCopyImage-srcImageLayout-01917) VUID-vkCmdCopyImage-srcImageLayout-01917

`srcImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyImage-srcImage-09460) VUID-vkCmdCopyImage-srcImage-09460

If `srcImage` and `dstImage` are the same, and any elements of
`pRegions` contains the `srcSubresource` and
`dstSubresource` with matching `mipLevel` and overlapping array
layers, then the `srcImageLayout` and `dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyImage-dstImage-01996) VUID-vkCmdCopyImage-dstImage-01996

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-dstImageLayout-00133) VUID-vkCmdCopyImage-dstImageLayout-00133

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdCopyImage-dstImageLayout-01395) VUID-vkCmdCopyImage-dstImageLayout-01395

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyImage-srcImage-01548) VUID-vkCmdCopyImage-srcImage-01548

If the [VkFormat](VkFormat.html) of each of `srcImage` and `dstImage` is
not a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), the
[VkFormat](VkFormat.html) of each of `srcImage` and `dstImage` **must** be
[size-compatible](../../../../spec/latest/chapters/formats.html#formats-size-compatibility)

* 
[](#VUID-vkCmdCopyImage-None-01549) VUID-vkCmdCopyImage-None-01549

 In a copy to or from a plane of a
[multi-planar image](../../../../spec/latest/chapters/formats.html#formats-multiplanar), the [VkFormat](VkFormat.html) of the
image and plane **must** be compatible according to
[the description of compatible planes](../../../../spec/latest/chapters/formats.html#formats-compatible-planes) for
the plane being copied

* 
[](#VUID-vkCmdCopyImage-srcImage-09247) VUID-vkCmdCopyImage-srcImage-09247

If the [VkFormat](VkFormat.html) of each of `srcImage` and `dstImage` is a
[compressed image format](../../../../spec/latest/appendices/compressedtex.html#compressed_image_formats), the formats **must**
have the same texel block extent

* 
[](#VUID-vkCmdCopyImage-srcImage-00136) VUID-vkCmdCopyImage-srcImage-00136

The sample count of `srcImage` and `dstImage` **must** match

* 
[](#VUID-vkCmdCopyImage-srcOffset-01783) VUID-vkCmdCopyImage-srcOffset-01783

The `srcOffset` and `extent` members of each element of
`pRegions` **must** respect the image transfer granularity requirements
of `commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyImage-dstOffset-01784) VUID-vkCmdCopyImage-dstOffset-01784

The `dstOffset` and `extent` members of each element of
`pRegions` **must** respect the image transfer granularity requirements
of `commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyImage-srcImage-01551) VUID-vkCmdCopyImage-srcImage-01551

    If neither `srcImage` nor `dstImage` has a
    [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar)
and the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not enabled
    then for each element of `pRegions`, `srcSubresource.aspectMask`
    and `dstSubresource.aspectMask` **must** match

* 
[](#VUID-vkCmdCopyImage-pRegions-12201) VUID-vkCmdCopyImage-pRegions-12201

For each element of `pRegions` where `srcSubresource.aspectMask`
and `dstSubresource.aspectMask` each contain at least one of
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html),
`srcSubresource.aspectMask` and `dstSubresource.aspectMask`
**must** match

* 
[](#VUID-vkCmdCopyImage-srcSubresource-10214) VUID-vkCmdCopyImage-srcSubresource-10214

If `srcSubresource.aspectMask` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html),
then `dstSubresource.aspectMask` **must** not contain both
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-dstSubresource-10215) VUID-vkCmdCopyImage-dstSubresource-10215

If `dstSubresource.aspectMask` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html),
then `srcSubresource.aspectMask` **must** not contain both
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-srcImage-08713) VUID-vkCmdCopyImage-srcImage-08713

If `srcImage` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `srcSubresource.aspectMask`
**must** be a single valid [multi-planar    aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkCmdCopyImage-dstImage-08714) VUID-vkCmdCopyImage-dstImage-08714

If `dstImage` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `dstSubresource.aspectMask`
**must** be a single valid [multi-planar    aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkCmdCopyImage-srcImage-01556) VUID-vkCmdCopyImage-srcImage-01556

If `srcImage` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
the `dstImage` does not have a multi-planar image format, then for
each element of `pRegions`, `dstSubresource.aspectMask` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-dstImage-01557) VUID-vkCmdCopyImage-dstImage-01557

If `dstImage` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
the `srcImage` does not have a multi-planar image format, then for
each element of `pRegions`, `srcSubresource.aspectMask` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-srcSubresource-10211) VUID-vkCmdCopyImage-srcSubresource-10211

If `srcSubresource.aspectMask` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)
and `dstSubresource.aspectMask` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)
or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the [VkFormat](VkFormat.html) values of
`srcImage` and `dstImage` **must** be compatible according to
[the list of compatible depth-stencil and    color formats](../../../../spec/latest/chapters/formats.html#formats-compatible-zs-color)

* 
[](#VUID-vkCmdCopyImage-srcSubresource-10212) VUID-vkCmdCopyImage-srcSubresource-10212

If `srcSubresource.aspectMask` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) and `dstSubresource.aspectMask` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), then the [VkFormat](VkFormat.html) values of
`srcImage` and `dstImage` **must** be compatible according to
[the list of compatible depth-stencil and    color formats](../../../../spec/latest/chapters/formats.html#formats-compatible-zs-color)

* 
[](#VUID-vkCmdCopyImage-apiVersion-07932) VUID-vkCmdCopyImage-apiVersion-07932

    If
    the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled,
or
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
and
    either `srcImage` or `dstImage` is of type
    [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of `pRegions`,
    `srcSubresource.baseArrayLayer` and
    `dstSubresource.baseArrayLayer` **must** both be `0`, and
    `srcSubresource.layerCount` and `dstSubresource.layerCount`
    **must** both be `1`

* 
[](#VUID-vkCmdCopyImage-srcImage-04443) VUID-vkCmdCopyImage-srcImage-04443

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `srcSubresource.baseArrayLayer` **must** be
`0` and `srcSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-dstImage-04444) VUID-vkCmdCopyImage-dstImage-04444

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `dstSubresource.baseArrayLayer` **must** be
`0` and `dstSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-aspectMask-00142) VUID-vkCmdCopyImage-aspectMask-00142

For each element of `pRegions`, `srcSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-vkCmdCopyImage-aspectMask-00143) VUID-vkCmdCopyImage-aspectMask-00143

For each element of `pRegions`, `dstSubresource.aspectMask`
**must** specify aspects present in `dstImage`

* 
[](#VUID-vkCmdCopyImage-srcOffset-00144) VUID-vkCmdCopyImage-srcOffset-00144

For each element of `pRegions`, `srcOffset.x` and
(`extent.width` +  `srcOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImage-srcOffset-00145) VUID-vkCmdCopyImage-srcOffset-00145

For each element of `pRegions`, `srcOffset.y` and
(`extent.height` +  `srcOffset.y`) **must** both be
greater than or equal to `0` and less than or equal to the height of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImage-srcImage-00146) VUID-vkCmdCopyImage-srcImage-00146

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-srcOffset-00147) VUID-vkCmdCopyImage-srcOffset-00147

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.z` and
(`extent.depth` +  `srcOffset.z`) **must** both be
greater than or equal to `0` and less than or equal to the depth of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImage-srcImage-01785) VUID-vkCmdCopyImage-srcImage-01785

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.z` **must** be `0` and
`extent.depth` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-dstImage-01786) VUID-vkCmdCopyImage-dstImage-01786

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.z` **must** be `0`

* 
[](#VUID-vkCmdCopyImage-srcImage-10907) VUID-vkCmdCopyImage-srcImage-10907

If either the [VkFormat](VkFormat.html) of each of `srcImage` and
`dstImage` is not a [compressed image    format](../../../../spec/latest/appendices/compressedtex.html#compressed_image_formats), and `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for
each element of `pRegions`, `extent.depth` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-srcImage-01787) VUID-vkCmdCopyImage-srcImage-01787

If `srcImage` is of type [VK_IMAGE_TYPE_2D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.z` **must** be `0`

* 
[](#VUID-vkCmdCopyImage-dstImage-01788) VUID-vkCmdCopyImage-dstImage-01788

If `dstImage` is of type [VK_IMAGE_TYPE_2D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.z` **must** be `0`

* 
[](#VUID-vkCmdCopyImage-apiVersion-07933) VUID-vkCmdCopyImage-apiVersion-07933

    If
    the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
    `srcImage` and `dstImage` **must** have the same [VkImageType](VkImageType.html)

* 
[](#VUID-vkCmdCopyImage-apiVersion-08969) VUID-vkCmdCopyImage-apiVersion-08969

    If
    the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
    `srcImage` or `dstImage` is of type [VK_IMAGE_TYPE_2D](VkImageType.html), then
    for each element of `pRegions`, `extent.depth` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-srcImage-07743) VUID-vkCmdCopyImage-srcImage-07743

If `srcImage` and `dstImage` have a different [VkImageType](VkImageType.html),
and the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled,
one **must** be [VK_IMAGE_TYPE_3D](VkImageType.html) and the other **must** be
[VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-vkCmdCopyImage-srcImage-08793) VUID-vkCmdCopyImage-srcImage-08793

If `srcImage` and `dstImage` have the same [VkImageType](VkImageType.html),
for each element of `pRegions`,
if neither of the `layerCount` members of `srcSubresource` or
`dstSubresource` are [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
the `layerCount` members of `srcSubresource` or
`dstSubresource` **must** match

* 
[](#VUID-vkCmdCopyImage-srcImage-08794) VUID-vkCmdCopyImage-srcImage-08794

If `srcImage` and `dstImage` have the same [VkImageType](VkImageType.html),
and one of the `layerCount` members of `srcSubresource` or
`dstSubresource` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the other
member **must** be either [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) or equal to the
`arrayLayers` member of the [VkImageCreateInfo](VkImageCreateInfo.html) used to create
the image minus `baseArrayLayer`

* 
[](#VUID-vkCmdCopyImage-srcImage-01790) VUID-vkCmdCopyImage-srcImage-01790

If `srcImage` and `dstImage` are both of type
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`extent.depth` **must** be `1`

* 
[](#VUID-vkCmdCopyImage-srcImage-01791) VUID-vkCmdCopyImage-srcImage-01791

If `srcImage` is of type [VK_IMAGE_TYPE_2D](VkImageType.html), and `dstImage`
is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of
`pRegions`, `extent.depth` **must** equal
`srcSubresource.layerCount`

* 
[](#VUID-vkCmdCopyImage-dstImage-01792) VUID-vkCmdCopyImage-dstImage-01792

If `dstImage` is of type [VK_IMAGE_TYPE_2D](VkImageType.html), and `srcImage`
is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of
`pRegions`, `extent.depth` **must** equal
`dstSubresource.layerCount`

* 
[](#VUID-vkCmdCopyImage-dstOffset-00150) VUID-vkCmdCopyImage-dstOffset-00150

For each element of `pRegions`, `dstOffset.x` and
(`extent.width` +  `dstOffset.x`), where `extent`
is [adjusted for size-compatibility](../../../../spec/latest/chapters/formats.html#formats-size-compatibility),
**must** both be greater than or equal to `0` and less than or equal to the
width of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyImage-dstOffset-00151) VUID-vkCmdCopyImage-dstOffset-00151

For each element of `pRegions`, `dstOffset.y` and
(`extent.height` +  `dstOffset.y`), where `extent`
is [adjusted for size-compatibility](../../../../spec/latest/chapters/formats.html#formats-size-compatibility),
**must** both be greater than or equal to `0` and less than or equal to the
height of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyImage-dstImage-00152) VUID-vkCmdCopyImage-dstImage-00152

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.y` **must** be `0`

* 
[](#VUID-vkCmdCopyImage-srcImage-10908) VUID-vkCmdCopyImage-srcImage-10908

If either the [VkFormat](VkFormat.html) of each of `srcImage` and
`dstImage` is not a [compressed image    format](../../../../spec/latest/appendices/compressedtex.html#compressed_image_formats), and `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for
each element of `pRegions`, `extent.height` **must** be `1`, where
`extent` is [adjusted for    size-compatibility](../../../../spec/latest/chapters/formats.html#formats-size-compatibility)

* 
[](#VUID-vkCmdCopyImage-dstOffset-00153) VUID-vkCmdCopyImage-dstOffset-00153

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.z` and
(`extent.depth` +  `dstOffset.z`), where `extent`
is [adjusted for size-compatibility](../../../../spec/latest/chapters/formats.html#formats-size-compatibility),
**must** both be greater than or equal to `0` and less than or equal to the
depth of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07278) VUID-vkCmdCopyImage-pRegions-07278

For each element of `pRegions`, `srcOffset.x` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07279) VUID-vkCmdCopyImage-pRegions-07279

For each element of `pRegions`, `srcOffset.y` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07280) VUID-vkCmdCopyImage-pRegions-07280

For each element of `pRegions`, `srcOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07281) VUID-vkCmdCopyImage-pRegions-07281

For each element of `pRegions`, `dstOffset.x` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07282) VUID-vkCmdCopyImage-pRegions-07282

For each element of `pRegions`, `dstOffset.y` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyImage-pRegions-07283) VUID-vkCmdCopyImage-pRegions-07283

For each element of `pRegions`, `dstOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyImage-srcImage-01728) VUID-vkCmdCopyImage-srcImage-01728

For each element of `pRegions`, if the sum of `srcOffset.x` and
`extent.width` does not equal the width of the subresource specified
by `srcSubresource`, `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-srcImage-01729) VUID-vkCmdCopyImage-srcImage-01729

For each element of `pRegions`, if the sum of `srcOffset.y` and
`extent.height` does not equal the height of the subresource
specified by `srcSubresource`, `extent.height` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-srcImage-01730) VUID-vkCmdCopyImage-srcImage-01730

For each element of `pRegions`, if the sum of `srcOffset.z` and
`extent.depth` does not equal the depth of the subresource specified
by `srcSubresource`, `extent.depth` **must** be a multiple of the
[texel block extent depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImage-aspect-06662) VUID-vkCmdCopyImage-aspect-06662

If the `aspect` member of any element of `pRegions` includes any
flag other than [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) or `srcImage` was
not created with [separate stencil    usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyImage-aspect-06663) VUID-vkCmdCopyImage-aspect-06663

If the `aspect` member of any element of `pRegions` includes any
flag other than [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) or `dstImage` was
not created with [separate stencil    usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyImage-aspect-06664) VUID-vkCmdCopyImage-aspect-06664

If the `aspect` member of any element of `pRegions` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), and `srcImage` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo), `srcImage`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdCopyImage-aspect-06665) VUID-vkCmdCopyImage-aspect-06665

If the `aspect` member of any element of `pRegions` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), and `dstImage` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo), `srcImage`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdCopyImage-srcImage-07966) VUID-vkCmdCopyImage-srcImage-07966

If `srcImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyImage-srcSubresource-07967) VUID-vkCmdCopyImage-srcSubresource-07967

The `srcSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdCopyImage-srcSubresource-07968) VUID-vkCmdCopyImage-srcSubresource-07968

If `srcSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`srcSubresource.baseArrayLayer` + 
`srcSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdCopyImage-srcImage-07969) VUID-vkCmdCopyImage-srcImage-07969

`srcImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdCopyImage-dstImage-07966) VUID-vkCmdCopyImage-dstImage-07966

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyImage-dstSubresource-07967) VUID-vkCmdCopyImage-dstSubresource-07967

The `dstSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyImage-dstSubresource-07968) VUID-vkCmdCopyImage-dstSubresource-07968

If `dstSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`dstSubresource.baseArrayLayer` + 
`dstSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyImage-dstImage-07969) VUID-vkCmdCopyImage-dstImage-07969

`dstImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-parameter) VUID-vkCmdCopyImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyImage-srcImage-parameter) VUID-vkCmdCopyImage-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdCopyImage-srcImageLayout-parameter) VUID-vkCmdCopyImage-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdCopyImage-dstImage-parameter) VUID-vkCmdCopyImage-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdCopyImage-dstImageLayout-parameter) VUID-vkCmdCopyImage-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdCopyImage-pRegions-parameter) VUID-vkCmdCopyImage-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageCopy](VkImageCopy.html) structures

* 
[](#VUID-vkCmdCopyImage-commandBuffer-recording) VUID-vkCmdCopyImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyImage-commandBuffer-cmdpool) VUID-vkCmdCopyImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyImage-renderpass) VUID-vkCmdCopyImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyImage-suspended) VUID-vkCmdCopyImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyImage-videocoding) VUID-vkCmdCopyImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyImage-regionCount-arraylength) VUID-vkCmdCopyImage-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdCopyImage-commonparent) VUID-vkCmdCopyImage-commonparent

 Each of `commandBuffer`, `dstImage`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageCopy](VkImageCopy.html), [VkImageLayout](VkImageLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
