# VkCopyDeviceMemoryImageInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyDeviceMemoryImageInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyDeviceMemoryImageInfoKHR - Structure specifying copy operations between an image and memory ranges

The `VkCopyDeviceMemoryImageInfoKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkCopyDeviceMemoryImageInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkImage                              image;
    uint32_t                             regionCount;
    const VkDeviceMemoryImageCopyKHR*    pRegions;
} VkCopyDeviceMemoryImageInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the base image accessed by the copy command.

* 
`regionCount` is the number of copies to be performed.

* 
`pRegions` is a pointer to an array of
[VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html) structures describing individual copy
operations between two memory ranges.

Valid Usage

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-addressRange-13026) VUID-VkCopyDeviceMemoryImageInfoKHR-addressRange-13026

The range of memory backing the address range defined by the
`addressRange` member of any element of `pRegions` **must** not
overlap the memory backing the address range defined by the
`addressRange` of any other element of `pRegions`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-addressRange-13027) VUID-VkCopyDeviceMemoryImageInfoKHR-addressRange-13027

The range of memory backing the address range defined by the
`addressRange` member of any element of `pRegions` **must** not
overlap the memory backing any texels in `image` defined by the
`imageSubresource`, `imageOffset`, and `imageExtent` members
of any element of `pRegions`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageLayout-13028) VUID-VkCopyDeviceMemoryImageInfoKHR-imageLayout-13028

The `imageLayout` member of each element of `pRegions` **must**
specify the layout of the image subresource specified for that element
of `pRegions` at the time this command is executed on a
[VkDevice](VkDevice.html)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07966) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07966

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-07967) VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-07968) VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07969) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07969

`image` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07973) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07973

`image` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07979) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07979

If `image` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-09104) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07980) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07980

If `image` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07274) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10051) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07275) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10052) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07276) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-00207) VUID-VkCopyDeviceMemoryImageInfoKHR-image-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10053) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10054) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10055) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-00208) VUID-VkCopyDeviceMemoryImageInfoKHR-image-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10056) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10057) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10058) VUID-VkCopyDeviceMemoryImageInfoKHR-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-00209) VUID-VkCopyDeviceMemoryImageInfoKHR-image-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-09105) VUID-VkCopyDeviceMemoryImageInfoKHR-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07981) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07981

If `image` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-07983) VUID-VkCopyDeviceMemoryImageInfoKHR-image-07983

If `image` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-addressRowLength-09106) VUID-VkCopyDeviceMemoryImageInfoKHR-addressRowLength-09106

For each element of `pRegions`, `addressRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-addressImageHeight-09107) VUID-VkCopyDeviceMemoryImageInfoKHR-addressImageHeight-09107

For each element of `pRegions`, `addressImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-addressRowLength-09108) VUID-VkCopyDeviceMemoryImageInfoKHR-addressRowLength-09108

For each element of `pRegions`, `addressRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `image` **must** be less
than or equal to 231-1

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-13029) VUID-VkCopyDeviceMemoryImageInfoKHR-image-13029

If `image` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion),
then for each element of `pRegions`, `addressRange.address`
**must** be a multiple of the [texel block    size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-13030) VUID-VkCopyDeviceMemoryImageInfoKHR-image-13030

If `image` has a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion), then
for each element of `pRegions`, `addressRange.address` **must** be
a multiple of the element size of the compatible format for the format
and the `aspectMask` of the `imageSubresource` as defined in
[Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-13031) VUID-VkCopyDeviceMemoryImageInfoKHR-image-13031

If `image` has a depth/stencil format, the
`addressRange.address` member of any element of `pRegions` **must**
be a multiple of `4`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13032) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13032

The image region specified by each element of `pRegions`
that does not contain [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its
`pNext` chain
**must** be contained within the specified `imageSubresource` of
`image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13033) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13033

If the image region specified by each element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, the
[rotated image region](../../../../spec/latest/chapters/copies.html#copies-buffers-images-rotation-addressing)
**must** be contained within `image`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13034) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13034

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`image` **must** have a 1x1x1 [texel    block extent](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13035) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13035

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`image` **must** be of type [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13036) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-13036

If any element of `pRegions` contains
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html) in its `pNext` chain, then
`image` **must** not have a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-sType-sType) VUID-VkCopyDeviceMemoryImageInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_IMAGE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pNext-pNext) VUID-VkCopyDeviceMemoryImageInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-image-parameter) VUID-VkCopyDeviceMemoryImageInfoKHR-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-parameter) VUID-VkCopyDeviceMemoryImageInfoKHR-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html) structures

* 
[](#VUID-VkCopyDeviceMemoryImageInfoKHR-regionCount-arraylength) VUID-VkCopyDeviceMemoryImageInfoKHR-regionCount-arraylength

 `regionCount` **must** be greater than `0`

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html), [vkCmdCopyImageToMemoryKHR](vkCmdCopyImageToMemoryKHR.html), [vkCmdCopyMemoryToImageKHR](vkCmdCopyMemoryToImageKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyDeviceMemoryImageInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
