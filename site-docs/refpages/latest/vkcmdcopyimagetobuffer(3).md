# vkCmdCopyImageToBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyImageToBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyImageToBuffer - Copy image data into a buffer

To copy data from an image object to a buffer object, call:

// Provided by VK_VERSION_1_0
void vkCmdCopyImageToBuffer(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     srcImage,
    VkImageLayout                               srcImageLayout,
    VkBuffer                                    dstBuffer,
    uint32_t                                    regionCount,
    const VkBufferImageCopy*                    pRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcImage` is the source image.

* 
`srcImageLayout` is the layout of the source image subresources for
the copy.

* 
`dstBuffer` is the destination buffer.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkBufferImageCopy](VkBufferImageCopy.html)
structures specifying the regions to copy.

Each source region specified by `pRegions` is copied from the source
image to the destination region of the destination buffer according to the
[addressing calculations](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing) for each
resource.
If any of the specified regions in `srcImage` overlaps in memory with
any of the specified regions in `dstBuffer`, values read from those
overlapping regions are **undefined**.

Copy regions for the image **must** be aligned to a multiple of the texel block
extent in each dimension, except at the edges of the image, where region
extents **must** match the edge of the image.

Valid Usage

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07966) VUID-vkCmdCopyImageToBuffer-srcImage-07966

If `srcImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyImageToBuffer-imageSubresource-07967) VUID-vkCmdCopyImageToBuffer-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdCopyImageToBuffer-imageSubresource-07968) VUID-vkCmdCopyImageToBuffer-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07969) VUID-vkCmdCopyImageToBuffer-srcImage-07969

`srcImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-imageSubresource-07971) VUID-vkCmdCopyImageToBuffer-imageSubresource-07971

For each element of `pRegions`, `imageOffset.x` and
(`imageExtent.width` +  `imageOffset.x`) **must**
both be greater than or equal to `0` and less than or equal to the width
of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageSubresource-07972) VUID-vkCmdCopyImageToBuffer-imageSubresource-07972

For each element of `pRegions`, `imageOffset.y` and
(`imageExtent.height` +  `imageOffset.y`) **must**
both be greater than or equal to `0` and less than or equal to the
height of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07973) VUID-vkCmdCopyImageToBuffer-srcImage-07973

`srcImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-01831) VUID-vkCmdCopyImageToBuffer-commandBuffer-01831

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-01832) VUID-vkCmdCopyImageToBuffer-commandBuffer-01832

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-01833) VUID-vkCmdCopyImageToBuffer-commandBuffer-01833

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-07746) VUID-vkCmdCopyImageToBuffer-commandBuffer-07746

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), the
`bufferOffset` member of any element of `pRegions` **must** be a
multiple of `4`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-07747) VUID-vkCmdCopyImageToBuffer-imageOffset-07747

The `imageOffset` and `imageExtent` members of each element of
`pRegions` **must** respect the image transfer granularity requirements
of `commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-10216) VUID-vkCmdCopyImageToBuffer-commandBuffer-10216

   If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
   `commandBuffer` was allocated from does not support
   [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
   and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
   enabled,
for each element of `pRegions`, the `aspectMask` member of
`imageSubresource` **must** not be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-11790) VUID-vkCmdCopyImageToBuffer-commandBuffer-11790

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-11791) VUID-vkCmdCopyImageToBuffer-commandBuffer-11791

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-11792) VUID-vkCmdCopyImageToBuffer-commandBuffer-11792

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-11793) VUID-vkCmdCopyImageToBuffer-commandBuffer-11793

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-pRegions-00183) VUID-vkCmdCopyImageToBuffer-pRegions-00183

`dstBuffer` **must** be large enough to contain all buffer locations
that are accessed according to [Buffer    and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for each element of `pRegions`

* 
[](#VUID-vkCmdCopyImageToBuffer-pRegions-00184) VUID-vkCmdCopyImageToBuffer-pRegions-00184

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-00186) VUID-vkCmdCopyImageToBuffer-srcImage-00186

`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-01998) VUID-vkCmdCopyImageToBuffer-srcImage-01998

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-dstBuffer-00191) VUID-vkCmdCopyImageToBuffer-dstBuffer-00191

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyImageToBuffer-dstBuffer-00192) VUID-vkCmdCopyImageToBuffer-dstBuffer-00192

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImageLayout-00189) VUID-vkCmdCopyImageToBuffer-srcImageLayout-00189

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImageLayout-01397) VUID-vkCmdCopyImageToBuffer-srcImageLayout-01397

`srcImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07979) VUID-vkCmdCopyImageToBuffer-srcImage-07979

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-09104) VUID-vkCmdCopyImageToBuffer-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07980) VUID-vkCmdCopyImageToBuffer-srcImage-07980

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07274) VUID-vkCmdCopyImageToBuffer-srcImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10051) VUID-vkCmdCopyImageToBuffer-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07275) VUID-vkCmdCopyImageToBuffer-srcImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10052) VUID-vkCmdCopyImageToBuffer-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07276) VUID-vkCmdCopyImageToBuffer-srcImage-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-00207) VUID-vkCmdCopyImageToBuffer-srcImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10053) VUID-vkCmdCopyImageToBuffer-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10054) VUID-vkCmdCopyImageToBuffer-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10055) VUID-vkCmdCopyImageToBuffer-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-00208) VUID-vkCmdCopyImageToBuffer-srcImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10056) VUID-vkCmdCopyImageToBuffer-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10057) VUID-vkCmdCopyImageToBuffer-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageOffset-10058) VUID-vkCmdCopyImageToBuffer-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-00209) VUID-vkCmdCopyImageToBuffer-srcImage-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-imageSubresource-09105) VUID-vkCmdCopyImageToBuffer-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07981) VUID-vkCmdCopyImageToBuffer-srcImage-07981

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07983) VUID-vkCmdCopyImageToBuffer-srcImage-07983

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdCopyImageToBuffer-bufferRowLength-09106) VUID-vkCmdCopyImageToBuffer-bufferRowLength-09106

For each element of `pRegions`, `bufferRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-bufferImageHeight-09107) VUID-vkCmdCopyImageToBuffer-bufferImageHeight-09107

For each element of `pRegions`, `bufferImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-vkCmdCopyImageToBuffer-bufferRowLength-09108) VUID-vkCmdCopyImageToBuffer-bufferRowLength-09108

For each element of `pRegions`, `bufferRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `srcImage` **must** be less
than or equal to 231-1

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07975) VUID-vkCmdCopyImageToBuffer-srcImage-07975

If `srcImage` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `bufferOffset` **must** be a
multiple of the [texel block size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07976) VUID-vkCmdCopyImageToBuffer-srcImage-07976

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`, `bufferOffset`
**must** be a multiple of the element size of the compatible format for the
format and the `aspectMask` of the `imageSubresource` as defined
in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-07978) VUID-vkCmdCopyImageToBuffer-srcImage-07978

If `srcImage` has a depth/stencil format, the `bufferOffset`
member of any element of `pRegions` **must** be a multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-parameter) VUID-vkCmdCopyImageToBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImage-parameter) VUID-vkCmdCopyImageToBuffer-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdCopyImageToBuffer-srcImageLayout-parameter) VUID-vkCmdCopyImageToBuffer-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdCopyImageToBuffer-dstBuffer-parameter) VUID-vkCmdCopyImageToBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdCopyImageToBuffer-pRegions-parameter) VUID-vkCmdCopyImageToBuffer-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkBufferImageCopy](VkBufferImageCopy.html) structures

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-recording) VUID-vkCmdCopyImageToBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyImageToBuffer-commandBuffer-cmdpool) VUID-vkCmdCopyImageToBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyImageToBuffer-renderpass) VUID-vkCmdCopyImageToBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyImageToBuffer-suspended) VUID-vkCmdCopyImageToBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyImageToBuffer-videocoding) VUID-vkCmdCopyImageToBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyImageToBuffer-regionCount-arraylength) VUID-vkCmdCopyImageToBuffer-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdCopyImageToBuffer-commonparent) VUID-vkCmdCopyImageToBuffer-commonparent

 Each of `commandBuffer`, `dstBuffer`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdCopyImageToBuffer is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkBufferImageCopy](VkBufferImageCopy.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyImageToBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
