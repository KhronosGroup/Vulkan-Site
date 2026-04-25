# vkCmdCopyBufferToImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyBufferToImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyBufferToImage - Copy data from a buffer into an image

To copy data from a buffer object to an image object, call:

// Provided by VK_VERSION_1_0
void vkCmdCopyBufferToImage(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    srcBuffer,
    VkImage                                     dstImage,
    VkImageLayout                               dstImageLayout,
    uint32_t                                    regionCount,
    const VkBufferImageCopy*                    pRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcBuffer` is the source buffer.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the copy.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkBufferImageCopy](VkBufferImageCopy.html)
structures specifying the regions to copy.

Each source region specified by `pRegions` is copied from the source
buffer to the destination region of the destination image according to the
[addressing calculations](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing) for each
resource.
If any of the specified regions in `srcBuffer` overlaps in memory with
any of the specified regions in `dstImage`, values read from those
overlapping regions are **undefined**.
If any region accesses a depth aspect in `dstImage`
and the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not enabled,
values copied from `srcBuffer` outside of the range [0,1] will be
written as **undefined** values to the destination image.

Copy regions for the image **must** be aligned to a multiple of the texel block
extent in each dimension, except at the edges of the image, where region
extents **must** match the edge of the image.

Valid Usage

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07966) VUID-vkCmdCopyBufferToImage-dstImage-07966

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyBufferToImage-imageSubresource-07967) VUID-vkCmdCopyBufferToImage-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyBufferToImage-imageSubresource-07968) VUID-vkCmdCopyBufferToImage-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07969) VUID-vkCmdCopyBufferToImage-dstImage-07969

`dstImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdCopyBufferToImage-imageSubresource-07971) VUID-vkCmdCopyBufferToImage-imageSubresource-07971

For each element of `pRegions`, `imageOffset.x` and
(`imageExtent.width` +  `imageOffset.x`) **must**
both be greater than or equal to `0` and less than or equal to the width
of the specified `imageSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageSubresource-07972) VUID-vkCmdCopyBufferToImage-imageSubresource-07972

For each element of `pRegions`, `imageOffset.y` and
(`imageExtent.height` +  `imageOffset.y`) **must**
both be greater than or equal to `0` and less than or equal to the
height of the specified `imageSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07973) VUID-vkCmdCopyBufferToImage-dstImage-07973

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-01828) VUID-vkCmdCopyBufferToImage-commandBuffer-01828

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-01829) VUID-vkCmdCopyBufferToImage-commandBuffer-01829

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-01830) VUID-vkCmdCopyBufferToImage-commandBuffer-01830

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-07737) VUID-vkCmdCopyBufferToImage-commandBuffer-07737

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), the
`bufferOffset` member of any element of `pRegions` **must** be a
multiple of `4`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-07738) VUID-vkCmdCopyBufferToImage-imageOffset-07738

The `imageOffset` and `imageExtent` members of each element of
`pRegions` **must** respect the image transfer granularity requirements
of `commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-07739) VUID-vkCmdCopyBufferToImage-commandBuffer-07739

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pRegions`, the `aspectMask` member of
`imageSubresource` **must** not be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-11778) VUID-vkCmdCopyBufferToImage-commandBuffer-11778

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-11779) VUID-vkCmdCopyBufferToImage-commandBuffer-11779

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-11780) VUID-vkCmdCopyBufferToImage-commandBuffer-11780

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-11781) VUID-vkCmdCopyBufferToImage-commandBuffer-11781

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage-pRegions-00171) VUID-vkCmdCopyBufferToImage-pRegions-00171

`srcBuffer` **must** be large enough to contain all buffer locations
that are accessed according to [Buffer    and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for each element of `pRegions`

* 
[](#VUID-vkCmdCopyBufferToImage-pRegions-00173) VUID-vkCmdCopyBufferToImage-pRegions-00173

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-vkCmdCopyBufferToImage-srcBuffer-00174) VUID-vkCmdCopyBufferToImage-srcBuffer-00174

`srcBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-01997) VUID-vkCmdCopyBufferToImage-dstImage-01997

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdCopyBufferToImage-srcBuffer-00176) VUID-vkCmdCopyBufferToImage-srcBuffer-00176

If `srcBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-00177) VUID-vkCmdCopyBufferToImage-dstImage-00177

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyBufferToImage-dstImageLayout-00180) VUID-vkCmdCopyBufferToImage-dstImageLayout-00180

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImageLayout-01396) VUID-vkCmdCopyBufferToImage-dstImageLayout-01396

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyBufferToImage-pRegions-07931) VUID-vkCmdCopyBufferToImage-pRegions-07931

If [VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html) is not enabled, for
each element of `pRegions` whose `imageSubresource` contains a
depth aspect, the data in `srcBuffer` **must** be in the range
[0,1]

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07979) VUID-vkCmdCopyBufferToImage-dstImage-07979

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-09104) VUID-vkCmdCopyBufferToImage-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07980) VUID-vkCmdCopyBufferToImage-dstImage-07980

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07274) VUID-vkCmdCopyBufferToImage-dstImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10051) VUID-vkCmdCopyBufferToImage-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07275) VUID-vkCmdCopyBufferToImage-dstImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10052) VUID-vkCmdCopyBufferToImage-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07276) VUID-vkCmdCopyBufferToImage-dstImage-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-00207) VUID-vkCmdCopyBufferToImage-dstImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10053) VUID-vkCmdCopyBufferToImage-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10054) VUID-vkCmdCopyBufferToImage-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10055) VUID-vkCmdCopyBufferToImage-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-00208) VUID-vkCmdCopyBufferToImage-dstImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10056) VUID-vkCmdCopyBufferToImage-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10057) VUID-vkCmdCopyBufferToImage-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageOffset-10058) VUID-vkCmdCopyBufferToImage-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-00209) VUID-vkCmdCopyBufferToImage-dstImage-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-imageSubresource-09105) VUID-vkCmdCopyBufferToImage-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07981) VUID-vkCmdCopyBufferToImage-dstImage-07981

If `dstImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07983) VUID-vkCmdCopyBufferToImage-dstImage-07983

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdCopyBufferToImage-bufferRowLength-09106) VUID-vkCmdCopyBufferToImage-bufferRowLength-09106

For each element of `pRegions`, `bufferRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-bufferImageHeight-09107) VUID-vkCmdCopyBufferToImage-bufferImageHeight-09107

For each element of `pRegions`, `bufferImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyBufferToImage-bufferRowLength-09108) VUID-vkCmdCopyBufferToImage-bufferRowLength-09108

For each element of `pRegions`, `bufferRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `dstImage` **must** be less
than or equal to 231-1

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07975) VUID-vkCmdCopyBufferToImage-dstImage-07975

If `dstImage` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `bufferOffset` **must** be a
multiple of the [texel block size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07976) VUID-vkCmdCopyBufferToImage-dstImage-07976

If `dstImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`, `bufferOffset`
**must** be a multiple of the element size of the compatible format for the
format and the `aspectMask` of the `imageSubresource` as defined
in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-07978) VUID-vkCmdCopyBufferToImage-dstImage-07978

If `dstImage` has a depth/stencil format, the `bufferOffset`
member of any element of `pRegions` **must** be a multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-parameter) VUID-vkCmdCopyBufferToImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyBufferToImage-srcBuffer-parameter) VUID-vkCmdCopyBufferToImage-srcBuffer-parameter

 `srcBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdCopyBufferToImage-dstImage-parameter) VUID-vkCmdCopyBufferToImage-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdCopyBufferToImage-dstImageLayout-parameter) VUID-vkCmdCopyBufferToImage-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdCopyBufferToImage-pRegions-parameter) VUID-vkCmdCopyBufferToImage-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkBufferImageCopy](VkBufferImageCopy.html) structures

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-recording) VUID-vkCmdCopyBufferToImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyBufferToImage-commandBuffer-cmdpool) VUID-vkCmdCopyBufferToImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyBufferToImage-renderpass) VUID-vkCmdCopyBufferToImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyBufferToImage-suspended) VUID-vkCmdCopyBufferToImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyBufferToImage-videocoding) VUID-vkCmdCopyBufferToImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyBufferToImage-regionCount-arraylength) VUID-vkCmdCopyBufferToImage-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdCopyBufferToImage-commonparent) VUID-vkCmdCopyBufferToImage-commonparent

 Each of `commandBuffer`, `dstImage`, and `srcBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdCopyBufferToImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkBufferImageCopy](VkBufferImageCopy.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyBufferToImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
