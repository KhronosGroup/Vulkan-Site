# VkCopyImageToImageInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyImageToImageInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyImageToImageInfo - Structure specifying parameters of an image to image host copy command

The `VkCopyImageToImageInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkCopyImageToImageInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkHostImageCopyFlags    flags;
    VkImage                 srcImage;
    VkImageLayout           srcImageLayout;
    VkImage                 dstImage;
    VkImageLayout           dstImageLayout;
    uint32_t                regionCount;
    const VkImageCopy2*     pRegions;
} VkCopyImageToImageInfo;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkCopyImageToImageInfo
typedef VkCopyImageToImageInfo VkCopyImageToImageInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkHostImageCopyFlagBits](VkHostImageCopyFlagBits.html) values
describing additional copy parameters.

* 
`srcImage` is the source image.

* 
`srcImageLayout` is the layout of the source image subresources for
the copy.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the copy.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkImageCopy2](VkImageCopy2.html) structures
specifying the regions to copy.

`vkCopyImageToImage` does not check whether the device memory associated
with `srcImage` or `dstImage` is currently in use before performing
the copy.
The application **must** guarantee that any previously submitted command that
writes to the copy regions has completed before the host performs the copy.

Valid Usage

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09069) VUID-VkCopyImageToImageInfo-srcImage-09069

`srcImage` and `dstImage` **must** have been created with identical
image creation parameters

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09109) VUID-VkCopyImageToImageInfo-srcImage-09109

If `srcImage` is sparse then all memory ranges accessed by the
copy command **must** be bound as described in
[Binding Resource Memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory-resource-binding)

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09111) VUID-VkCopyImageToImageInfo-srcImage-09111

If the stencil aspect of `srcImage` is accessed, and
`srcImage` was not created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09112) VUID-VkCopyImageToImageInfo-srcImage-09112

If the stencil aspect of `srcImage` is accessed, and
`srcImage` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09113) VUID-VkCopyImageToImageInfo-srcImage-09113

If non-stencil aspects of `srcImage` are accessed,
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-09114) VUID-VkCopyImageToImageInfo-srcOffset-09114

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`x`, `y`, and `z` members of the `srcOffset` member
of each element of `pRegions` **must** be `0`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-09115) VUID-VkCopyImageToImageInfo-srcImage-09115

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`extent` member of each element of `pRegions` **must** equal
the extents of `srcImage` identified by `srcSubresource`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07966) VUID-VkCopyImageToImageInfo-srcImage-07966

If `srcImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyImageToImageInfo-srcSubresource-07967) VUID-VkCopyImageToImageInfo-srcSubresource-07967

The `srcSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToImageInfo-srcSubresource-07968) VUID-VkCopyImageToImageInfo-srcSubresource-07968

If `srcSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`srcSubresource.baseArrayLayer` + 
`srcSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07969) VUID-VkCopyImageToImageInfo-srcImage-07969

`srcImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyImageToImageInfo-srcSubresource-07971) VUID-VkCopyImageToImageInfo-srcSubresource-07971

For each element of `pRegions`, `srcOffset.x` and
(`extent.width` +  `srcOffset.x`) **must**
both be greater than or equal to `0` and less than or equal to the width
of the specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcSubresource-07972) VUID-VkCopyImageToImageInfo-srcSubresource-07972

For each element of `pRegions`, `srcOffset.y` and
(`extent.height` +  `srcOffset.y`) **must**
both be greater than or equal to `0` and less than or equal to the
height of the specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07979) VUID-VkCopyImageToImageInfo-srcImage-07979

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-09104) VUID-VkCopyImageToImageInfo-srcOffset-09104

For each element of `pRegions`, `srcOffset.z` and
(`extent.depth` +  `srcOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07980) VUID-VkCopyImageToImageInfo-srcImage-07980

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`srcOffset.z` **must** be `0` and `extent.depth` **must**
be `1`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07274) VUID-VkCopyImageToImageInfo-srcImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`srcOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10051) VUID-VkCopyImageToImageInfo-srcOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `srcOffset.x`
does not equal the width of the subresource specified by
`srcSubresource`, `srcOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07275) VUID-VkCopyImageToImageInfo-srcImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`srcOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10052) VUID-VkCopyImageToImageInfo-srcOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `srcOffset.y`
does not equal the height of the subresource specified by
`srcSubresource`, `srcOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07276) VUID-VkCopyImageToImageInfo-srcImage-07276

For each element of `pRegions`, `srcOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-00207) VUID-VkCopyImageToImageInfo-srcImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `srcOffset.x` and `extent.width` does not equal
the width of the subresource specified by `srcSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10053) VUID-VkCopyImageToImageInfo-srcOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`srcOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10054) VUID-VkCopyImageToImageInfo-srcOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`srcOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10055) VUID-VkCopyImageToImageInfo-srcOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`srcOffset.x` and `extent.height` does not equal the width
of the subresource specified by `srcSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-00208) VUID-VkCopyImageToImageInfo-srcImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `srcOffset.y` and `extent.height` does not equal
the height of the subresource specified by `srcSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10056) VUID-VkCopyImageToImageInfo-srcOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`srcOffset.y` and `extent.width` does not equal the height
of the subresource specified by `srcSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10057) VUID-VkCopyImageToImageInfo-srcOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`srcOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcOffset-10058) VUID-VkCopyImageToImageInfo-srcOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`srcOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-00209) VUID-VkCopyImageToImageInfo-srcImage-00209

For each element of `pRegions`, if the sum of `srcOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcSubresource-09105) VUID-VkCopyImageToImageInfo-srcSubresource-09105

For each element of `pRegions`, `srcSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07981) VUID-VkCopyImageToImageInfo-srcImage-07981

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`srcSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-07983) VUID-VkCopyImageToImageInfo-srcImage-07983

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `srcSubresource.baseArrayLayer` **must**
be `0` and `srcSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-09109) VUID-VkCopyImageToImageInfo-dstImage-09109

If `dstImage` is sparse then all memory ranges accessed by the
copy command **must** be bound as described in
[Binding Resource Memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory-resource-binding)

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-09111) VUID-VkCopyImageToImageInfo-dstImage-09111

If the stencil aspect of `dstImage` is accessed, and
`dstImage` was not created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-09112) VUID-VkCopyImageToImageInfo-dstImage-09112

If the stencil aspect of `dstImage` is accessed, and
`dstImage` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-09113) VUID-VkCopyImageToImageInfo-dstImage-09113

If non-stencil aspects of `dstImage` are accessed,
`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-09114) VUID-VkCopyImageToImageInfo-dstOffset-09114

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`x`, `y`, and `z` members of the `dstOffset` member
of each element of `pRegions` **must** be `0`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-09115) VUID-VkCopyImageToImageInfo-dstImage-09115

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`extent` member of each element of `pRegions` **must** equal
the extents of `dstImage` identified by `dstSubresource`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07966) VUID-VkCopyImageToImageInfo-dstImage-07966

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyImageToImageInfo-dstSubresource-07967) VUID-VkCopyImageToImageInfo-dstSubresource-07967

The `dstSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyImageToImageInfo-dstSubresource-07968) VUID-VkCopyImageToImageInfo-dstSubresource-07968

If `dstSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`dstSubresource.baseArrayLayer` + 
`dstSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07969) VUID-VkCopyImageToImageInfo-dstImage-07969

`dstImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyImageToImageInfo-dstSubresource-07971) VUID-VkCopyImageToImageInfo-dstSubresource-07971

For each element of `pRegions`, `dstOffset.x` and
(`extent.width` +  `dstOffset.x`) **must**
both be greater than or equal to `0` and less than or equal to the width
of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstSubresource-07972) VUID-VkCopyImageToImageInfo-dstSubresource-07972

For each element of `pRegions`, `dstOffset.y` and
(`extent.height` +  `dstOffset.y`) **must**
both be greater than or equal to `0` and less than or equal to the
height of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07979) VUID-VkCopyImageToImageInfo-dstImage-07979

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-09104) VUID-VkCopyImageToImageInfo-dstOffset-09104

For each element of `pRegions`, `dstOffset.z` and
(`extent.depth` +  `dstOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07980) VUID-VkCopyImageToImageInfo-dstImage-07980

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`dstOffset.z` **must** be `0` and `extent.depth` **must**
be `1`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07274) VUID-VkCopyImageToImageInfo-dstImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`dstOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10051) VUID-VkCopyImageToImageInfo-dstOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `dstOffset.x`
does not equal the width of the subresource specified by
`dstSubresource`, `dstOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07275) VUID-VkCopyImageToImageInfo-dstImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`dstOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10052) VUID-VkCopyImageToImageInfo-dstOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `dstOffset.y`
does not equal the height of the subresource specified by
`dstSubresource`, `dstOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07276) VUID-VkCopyImageToImageInfo-dstImage-07276

For each element of `pRegions`, `dstOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-00207) VUID-VkCopyImageToImageInfo-dstImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `dstOffset.x` and `extent.width` does not equal
the width of the subresource specified by `dstSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10053) VUID-VkCopyImageToImageInfo-dstOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`dstOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10054) VUID-VkCopyImageToImageInfo-dstOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`dstOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10055) VUID-VkCopyImageToImageInfo-dstOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`dstOffset.x` and `extent.height` does not equal the width
of the subresource specified by `dstSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-00208) VUID-VkCopyImageToImageInfo-dstImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `dstOffset.y` and `extent.height` does not equal
the height of the subresource specified by `dstSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10056) VUID-VkCopyImageToImageInfo-dstOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`dstOffset.y` and `extent.width` does not equal the height
of the subresource specified by `dstSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10057) VUID-VkCopyImageToImageInfo-dstOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`dstOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstOffset-10058) VUID-VkCopyImageToImageInfo-dstOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`dstOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-00209) VUID-VkCopyImageToImageInfo-dstImage-00209

For each element of `pRegions`, if the sum of `dstOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstSubresource-09105) VUID-VkCopyImageToImageInfo-dstSubresource-09105

For each element of `pRegions`, `dstSubresource.aspectMask`
**must** specify aspects present in `dstImage`

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07981) VUID-VkCopyImageToImageInfo-dstImage-07981

If `dstImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`dstSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-07983) VUID-VkCopyImageToImageInfo-dstImage-07983

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `dstSubresource.baseArrayLayer` **must**
be `0` and `dstSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyImageToImageInfo-srcImageLayout-09070) VUID-VkCopyImageToImageInfo-srcImageLayout-09070

`srcImageLayout` **must** specify the current layout of the image
subresources of `srcImage` specified in `pRegions`

* 
[](#VUID-VkCopyImageToImageInfo-dstImageLayout-09071) VUID-VkCopyImageToImageInfo-dstImageLayout-09071

`dstImageLayout` **must** specify the current layout of the image
subresources of `dstImage` specified in `pRegions`

* 
[](#VUID-VkCopyImageToImageInfo-srcImageLayout-09072) VUID-VkCopyImageToImageInfo-srcImageLayout-09072

`srcImageLayout` **must** be one of the image layouts returned in
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`pCopySrcLayouts`

* 
[](#VUID-VkCopyImageToImageInfo-dstImageLayout-09073) VUID-VkCopyImageToImageInfo-dstImageLayout-09073

`dstImageLayout` **must** be one of the image layouts returned in
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`pCopyDstLayouts`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyImageToImageInfo-sType-sType) VUID-VkCopyImageToImageInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO](VkStructureType.html)

* 
[](#VUID-VkCopyImageToImageInfo-pNext-pNext) VUID-VkCopyImageToImageInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyImageToImageInfo-flags-parameter) VUID-VkCopyImageToImageInfo-flags-parameter

 `flags` **must** be a valid combination of [VkHostImageCopyFlagBits](VkHostImageCopyFlagBits.html) values

* 
[](#VUID-VkCopyImageToImageInfo-srcImage-parameter) VUID-VkCopyImageToImageInfo-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyImageToImageInfo-srcImageLayout-parameter) VUID-VkCopyImageToImageInfo-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyImageToImageInfo-dstImage-parameter) VUID-VkCopyImageToImageInfo-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyImageToImageInfo-dstImageLayout-parameter) VUID-VkCopyImageToImageInfo-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyImageToImageInfo-pRegions-parameter) VUID-VkCopyImageToImageInfo-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageCopy2](VkImageCopy2.html) structures

* 
[](#VUID-VkCopyImageToImageInfo-regionCount-arraylength) VUID-VkCopyImageToImageInfo-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-VkCopyImageToImageInfo-commonparent) VUID-VkCopyImageToImageInfo-commonparent

 Both of `dstImage`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkHostImageCopyFlags](VkHostImageCopyFlags.html), [VkImage](VkImage.html), [VkImageCopy2](VkImageCopy2.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html), [vkCopyImageToImage](vkCopyImageToImage.html), [vkCopyImageToImage](vkCopyImageToImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyImageToImageInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
