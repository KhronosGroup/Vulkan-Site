# VkCopyImageToBufferInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyImageToBufferInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyImageToBufferInfo2 - Structure specifying parameters of an image to buffer copy command

The `VkCopyImageToBufferInfo2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCopyImageToBufferInfo2 {
    VkStructureType              sType;
    const void*                  pNext;
    VkImage                      srcImage;
    VkImageLayout                srcImageLayout;
    VkBuffer                     dstBuffer;
    uint32_t                     regionCount;
    const VkBufferImageCopy2*    pRegions;
} VkCopyImageToBufferInfo2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkCopyImageToBufferInfo2
typedef VkCopyImageToBufferInfo2 VkCopyImageToBufferInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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
`pRegions` is a pointer to an array of [VkBufferImageCopy2](VkBufferImageCopy2.html)
structures specifying the regions to copy.

Valid Usage

* 
[](#VUID-VkCopyImageToBufferInfo2-pRegions-04566) VUID-VkCopyImageToBufferInfo2-pRegions-04566

The image region specified by each element of `pRegions`
that does not contain [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its
`pNext` chain
**must** be contained within the specified `imageSubresource` of
`srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2KHR-pRegions-04557) VUID-VkCopyImageToBufferInfo2KHR-pRegions-04557

If the image region specified by each element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, the
[rotated source region](../../../../spec/latest/chapters/copies.html#copies-buffers-images-rotation-addressing)
**must** be contained within `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2KHR-pRegions-04558) VUID-VkCopyImageToBufferInfo2KHR-pRegions-04558

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`srcImage` **must** have a 1x1x1 [texel    block extent](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyImageToBufferInfo2KHR-pRegions-06205) VUID-VkCopyImageToBufferInfo2KHR-pRegions-06205

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`srcImage` **must** be of type [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkCopyImageToBufferInfo2KHR-pRegions-06206) VUID-VkCopyImageToBufferInfo2KHR-pRegions-06206

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`srcImage` **must** not have a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar)

* 
[](#VUID-VkCopyImageToBufferInfo2-pRegions-00183) VUID-VkCopyImageToBufferInfo2-pRegions-00183

`dstBuffer` **must** be large enough to contain all buffer locations
that are accessed according to [Buffer    and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for each element of `pRegions`

* 
[](#VUID-VkCopyImageToBufferInfo2-pRegions-00184) VUID-VkCopyImageToBufferInfo2-pRegions-00184

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-00186) VUID-VkCopyImageToBufferInfo2-srcImage-00186

`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-01998) VUID-VkCopyImageToBufferInfo2-srcImage-01998

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCopyImageToBufferInfo2-dstBuffer-00191) VUID-VkCopyImageToBufferInfo2-dstBuffer-00191

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToBufferInfo2-dstBuffer-00192) VUID-VkCopyImageToBufferInfo2-dstBuffer-00192

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImageLayout-00189) VUID-VkCopyImageToBufferInfo2-srcImageLayout-00189

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImageLayout-01397) VUID-VkCopyImageToBufferInfo2-srcImageLayout-01397

`srcImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07966) VUID-VkCopyImageToBufferInfo2-srcImage-07966

If `srcImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyImageToBufferInfo2-imageSubresource-07967) VUID-VkCopyImageToBufferInfo2-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToBufferInfo2-imageSubresource-07968) VUID-VkCopyImageToBufferInfo2-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07969) VUID-VkCopyImageToBufferInfo2-srcImage-07969

`srcImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07973) VUID-VkCopyImageToBufferInfo2-srcImage-07973

`srcImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07979) VUID-VkCopyImageToBufferInfo2-srcImage-07979

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-09104) VUID-VkCopyImageToBufferInfo2-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07980) VUID-VkCopyImageToBufferInfo2-srcImage-07980

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07274) VUID-VkCopyImageToBufferInfo2-srcImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10051) VUID-VkCopyImageToBufferInfo2-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07275) VUID-VkCopyImageToBufferInfo2-srcImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10052) VUID-VkCopyImageToBufferInfo2-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07276) VUID-VkCopyImageToBufferInfo2-srcImage-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-00207) VUID-VkCopyImageToBufferInfo2-srcImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10053) VUID-VkCopyImageToBufferInfo2-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10054) VUID-VkCopyImageToBufferInfo2-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10055) VUID-VkCopyImageToBufferInfo2-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-00208) VUID-VkCopyImageToBufferInfo2-srcImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10056) VUID-VkCopyImageToBufferInfo2-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10057) VUID-VkCopyImageToBufferInfo2-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-10058) VUID-VkCopyImageToBufferInfo2-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-00209) VUID-VkCopyImageToBufferInfo2-srcImage-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageSubresource-09105) VUID-VkCopyImageToBufferInfo2-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07981) VUID-VkCopyImageToBufferInfo2-srcImage-07981

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07983) VUID-VkCopyImageToBufferInfo2-srcImage-07983

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyImageToBufferInfo2-bufferRowLength-09106) VUID-VkCopyImageToBufferInfo2-bufferRowLength-09106

For each element of `pRegions`, `bufferRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-bufferImageHeight-09107) VUID-VkCopyImageToBufferInfo2-bufferImageHeight-09107

For each element of `pRegions`, `bufferImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-bufferRowLength-09108) VUID-VkCopyImageToBufferInfo2-bufferRowLength-09108

For each element of `pRegions`, `bufferRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `srcImage` **must** be less
than or equal to 231-1

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07975) VUID-VkCopyImageToBufferInfo2-srcImage-07975

If `srcImage` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
then for each element of `pRegions`, `bufferOffset` **must** be a
multiple of the [texel block size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07976) VUID-VkCopyImageToBufferInfo2-srcImage-07976

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`, `bufferOffset`
**must** be a multiple of the element size of the compatible format for the
format and the `aspectMask` of the `imageSubresource` as defined
in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-07978) VUID-VkCopyImageToBufferInfo2-srcImage-07978

If `srcImage` has a depth/stencil format, the `bufferOffset`
member of any element of `pRegions` **must** be a multiple of `4`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-00197) VUID-VkCopyImageToBufferInfo2-imageOffset-00197

For each element of `pRegions` not containing
`VkCopyCommandTransformInfoQCOM` in its `pNext` chain,
`imageOffset.x` and (`imageExtent.width` + 
`imageOffset.x`) **must** both be greater than or equal to `0` and
less than or equal to the width of the specified `imageSubresource`
of `srcImage`

* 
[](#VUID-VkCopyImageToBufferInfo2-imageOffset-00198) VUID-VkCopyImageToBufferInfo2-imageOffset-00198

For each element of `pRegions` not containing
`VkCopyCommandTransformInfoQCOM` in its `pNext` chain,
`imageOffset.y` and (`imageExtent.height` + 
`imageOffset.y`) **must** both be greater than or equal to `0` and
less than or equal to the height of the specified `imageSubresource`
of `srcImage`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyImageToBufferInfo2-sType-sType) VUID-VkCopyImageToBufferInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2](VkStructureType.html)

* 
[](#VUID-VkCopyImageToBufferInfo2-pNext-pNext) VUID-VkCopyImageToBufferInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImage-parameter) VUID-VkCopyImageToBufferInfo2-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyImageToBufferInfo2-srcImageLayout-parameter) VUID-VkCopyImageToBufferInfo2-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyImageToBufferInfo2-dstBuffer-parameter) VUID-VkCopyImageToBufferInfo2-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkCopyImageToBufferInfo2-pRegions-parameter) VUID-VkCopyImageToBufferInfo2-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkBufferImageCopy2](VkBufferImageCopy2.html) structures

* 
[](#VUID-VkCopyImageToBufferInfo2-regionCount-arraylength) VUID-VkCopyImageToBufferInfo2-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-VkCopyImageToBufferInfo2-commonparent) VUID-VkCopyImageToBufferInfo2-commonparent

 Both of `dstBuffer`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBuffer](VkBuffer.html), [VkBufferImageCopy2](VkBufferImageCopy2.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html), [vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html), [vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyImageToBufferInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
