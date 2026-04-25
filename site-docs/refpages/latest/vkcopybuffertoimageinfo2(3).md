# VkCopyBufferToImageInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyBufferToImageInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyBufferToImageInfo2 - Structure specifying parameters of a buffer to image copy command

The `VkCopyBufferToImageInfo2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCopyBufferToImageInfo2 {
    VkStructureType              sType;
    const void*                  pNext;
    VkBuffer                     srcBuffer;
    VkImage                      dstImage;
    VkImageLayout                dstImageLayout;
    uint32_t                     regionCount;
    const VkBufferImageCopy2*    pRegions;
} VkCopyBufferToImageInfo2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkCopyBufferToImageInfo2
typedef VkCopyBufferToImageInfo2 VkCopyBufferToImageInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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
`pRegions` is a pointer to an array of [VkBufferImageCopy2](VkBufferImageCopy2.html)
structures specifying the regions to copy.

Valid Usage

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-04565) VUID-VkCopyBufferToImageInfo2-pRegions-04565

The image region specified by each element of `pRegions`
that does not contain [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its
`pNext` chain
**must** be contained within the specified `imageSubresource` of
`dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2KHR-pRegions-04554) VUID-VkCopyBufferToImageInfo2KHR-pRegions-04554

If the image region specified by each element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, the
[rotated destination    region](../../../../spec/latest/chapters/copies.html#copies-buffers-images-rotation-addressing) **must** be contained within `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2KHR-pRegions-04555) VUID-VkCopyBufferToImageInfo2KHR-pRegions-04555

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`dstImage` **must** have a 1x1x1 [texel    block extent](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyBufferToImageInfo2KHR-pRegions-06203) VUID-VkCopyBufferToImageInfo2KHR-pRegions-06203

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`dstImage` **must** be of type [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkCopyBufferToImageInfo2KHR-pRegions-06204) VUID-VkCopyBufferToImageInfo2KHR-pRegions-06204

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`dstImage` **must** not have a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar)

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-00171) VUID-VkCopyBufferToImageInfo2-pRegions-00171

`srcBuffer` **must** be large enough to contain all buffer locations
that are accessed according to [Buffer    and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for each element of `pRegions`

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-00173) VUID-VkCopyBufferToImageInfo2-pRegions-00173

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-VkCopyBufferToImageInfo2-srcBuffer-00174) VUID-VkCopyBufferToImageInfo2-srcBuffer-00174

`srcBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-01997) VUID-VkCopyBufferToImageInfo2-dstImage-01997

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCopyBufferToImageInfo2-srcBuffer-00176) VUID-VkCopyBufferToImageInfo2-srcBuffer-00176

If `srcBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-00177) VUID-VkCopyBufferToImageInfo2-dstImage-00177

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImageLayout-00180) VUID-VkCopyBufferToImageInfo2-dstImageLayout-00180

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImageLayout-01396) VUID-VkCopyBufferToImageInfo2-dstImageLayout-01396

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-07931) VUID-VkCopyBufferToImageInfo2-pRegions-07931

If [VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html) is not enabled, for
each element of `pRegions` whose `imageSubresource` contains a
depth aspect, the data in `srcBuffer` **must** be in the range
[0,1]

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07966) VUID-VkCopyBufferToImageInfo2-dstImage-07966

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyBufferToImageInfo2-imageSubresource-07967) VUID-VkCopyBufferToImageInfo2-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyBufferToImageInfo2-imageSubresource-07968) VUID-VkCopyBufferToImageInfo2-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07969) VUID-VkCopyBufferToImageInfo2-dstImage-07969

`dstImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07973) VUID-VkCopyBufferToImageInfo2-dstImage-07973

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07979) VUID-VkCopyBufferToImageInfo2-dstImage-07979

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-09104) VUID-VkCopyBufferToImageInfo2-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07980) VUID-VkCopyBufferToImageInfo2-dstImage-07980

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07274) VUID-VkCopyBufferToImageInfo2-dstImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10051) VUID-VkCopyBufferToImageInfo2-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07275) VUID-VkCopyBufferToImageInfo2-dstImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10052) VUID-VkCopyBufferToImageInfo2-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07276) VUID-VkCopyBufferToImageInfo2-dstImage-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-00207) VUID-VkCopyBufferToImageInfo2-dstImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10053) VUID-VkCopyBufferToImageInfo2-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10054) VUID-VkCopyBufferToImageInfo2-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10055) VUID-VkCopyBufferToImageInfo2-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-00208) VUID-VkCopyBufferToImageInfo2-dstImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10056) VUID-VkCopyBufferToImageInfo2-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10057) VUID-VkCopyBufferToImageInfo2-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageOffset-10058) VUID-VkCopyBufferToImageInfo2-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-00209) VUID-VkCopyBufferToImageInfo2-dstImage-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-imageSubresource-09105) VUID-VkCopyBufferToImageInfo2-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07981) VUID-VkCopyBufferToImageInfo2-dstImage-07981

If `dstImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07983) VUID-VkCopyBufferToImageInfo2-dstImage-07983

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyBufferToImageInfo2-bufferRowLength-09106) VUID-VkCopyBufferToImageInfo2-bufferRowLength-09106

For each element of `pRegions`, `bufferRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-bufferImageHeight-09107) VUID-VkCopyBufferToImageInfo2-bufferImageHeight-09107

For each element of `pRegions`, `bufferImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-bufferRowLength-09108) VUID-VkCopyBufferToImageInfo2-bufferRowLength-09108

For each element of `pRegions`, `bufferRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `dstImage` **must** be less
than or equal to 231-1

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07975) VUID-VkCopyBufferToImageInfo2-dstImage-07975

If `dstImage` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `bufferOffset` **must** be a
multiple of the [texel block size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07976) VUID-VkCopyBufferToImageInfo2-dstImage-07976

If `dstImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`, `bufferOffset`
**must** be a multiple of the element size of the compatible format for the
format and the `aspectMask` of the `imageSubresource` as defined
in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-07978) VUID-VkCopyBufferToImageInfo2-dstImage-07978

If `dstImage` has a depth/stencil format, the `bufferOffset`
member of any element of `pRegions` **must** be a multiple of `4`

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-06223) VUID-VkCopyBufferToImageInfo2-pRegions-06223

For each element of `pRegions` not containing
`VkCopyCommandTransformInfoQCOM` in its `pNext` chain,
`imageOffset.x` and (`imageExtent.width` + 
`imageOffset.x`) **must** both be greater than or equal to `0` and
less than or equal to the width of the specified `imageSubresource`
of `dstImage`

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-06224) VUID-VkCopyBufferToImageInfo2-pRegions-06224

For each element of `pRegions` not containing
`VkCopyCommandTransformInfoQCOM` in its `pNext` chain,
`imageOffset.y` and (`imageExtent.height` + 
`imageOffset.y`) **must** both be greater than or equal to `0` and
less than or equal to the height of the specified `imageSubresource`
of `dstImage`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyBufferToImageInfo2-sType-sType) VUID-VkCopyBufferToImageInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2](VkStructureType.html)

* 
[](#VUID-VkCopyBufferToImageInfo2-pNext-pNext) VUID-VkCopyBufferToImageInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyBufferToImageInfo2-srcBuffer-parameter) VUID-VkCopyBufferToImageInfo2-srcBuffer-parameter

 `srcBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImage-parameter) VUID-VkCopyBufferToImageInfo2-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyBufferToImageInfo2-dstImageLayout-parameter) VUID-VkCopyBufferToImageInfo2-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyBufferToImageInfo2-pRegions-parameter) VUID-VkCopyBufferToImageInfo2-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkBufferImageCopy2](VkBufferImageCopy2.html) structures

* 
[](#VUID-VkCopyBufferToImageInfo2-regionCount-arraylength) VUID-VkCopyBufferToImageInfo2-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-VkCopyBufferToImageInfo2-commonparent) VUID-VkCopyBufferToImageInfo2-commonparent

 Both of `dstImage`, and `srcBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBuffer](VkBuffer.html), [VkBufferImageCopy2](VkBufferImageCopy2.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html), [vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html), [vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyBufferToImageInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
