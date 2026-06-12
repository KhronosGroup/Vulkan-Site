# VkCopyImageToMemoryInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyImageToMemoryInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyImageToMemoryInfo - Structure specifying parameters of an image to host memory copy command

The `VkCopyImageToMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkCopyImageToMemoryInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkHostImageCopyFlags          flags;
    VkImage                       srcImage;
    VkImageLayout                 srcImageLayout;
    uint32_t                      regionCount;
    const VkImageToMemoryCopy*    pRegions;
} VkCopyImageToMemoryInfo;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkCopyImageToMemoryInfo
typedef VkCopyImageToMemoryInfo VkCopyImageToMemoryInfoEXT;

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
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkImageToMemoryCopy](VkImageToMemoryCopy.html)
structures specifying the regions to copy.

`vkCopyImageToMemory` does not check whether the device memory
associated with `srcImage` is currently in use before performing the
copy.
The application **must** guarantee that any previously submitted command that
writes to the copy regions has completed before the host performs the copy.

Copy regions for the image **must** be aligned to a multiple of the texel block
extent in each dimension, except at the edges of the image, where region
extents **must** match the edge of the image.

Valid Usage

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-09109) VUID-VkCopyImageToMemoryInfo-srcImage-09109

If `srcImage` is sparse then all memory ranges accessed by the
copy command **must** be bound as described in
[Binding Resource Memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory-resource-binding)

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-09111) VUID-VkCopyImageToMemoryInfo-srcImage-09111

If the stencil aspect of `srcImage` is accessed, and
`srcImage` was not created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-09112) VUID-VkCopyImageToMemoryInfo-srcImage-09112

If the stencil aspect of `srcImage` is accessed, and
`srcImage` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-09113) VUID-VkCopyImageToMemoryInfo-srcImage-09113

If non-stencil aspects of `srcImage` are accessed,
`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-09114) VUID-VkCopyImageToMemoryInfo-imageOffset-09114

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`x`, `y`, and `z` members of the `imageOffset` member
of each element of `pRegions` **must** be `0`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-09115) VUID-VkCopyImageToMemoryInfo-srcImage-09115

If `flags` contains [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), the
`imageExtent` member of each element of `pRegions` **must** equal
the extents of `srcImage` identified by `imageSubresource`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07966) VUID-VkCopyImageToMemoryInfo-srcImage-07966

If `srcImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyImageToMemoryInfo-imageSubresource-07967) VUID-VkCopyImageToMemoryInfo-imageSubresource-07967

The `imageSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToMemoryInfo-imageSubresource-07968) VUID-VkCopyImageToMemoryInfo-imageSubresource-07968

If `imageSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount` of each element of `pRegions`
**must** be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07969) VUID-VkCopyImageToMemoryInfo-srcImage-07969

`srcImage` **must** not have been created with `flags`
containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyImageToMemoryInfo-imageSubresource-07971) VUID-VkCopyImageToMemoryInfo-imageSubresource-07971

For each element of `pRegions`, `imageOffset.x` and
(`imageExtent.width` +  `imageOffset.x`) **must**
both be greater than or equal to `0` and less than or equal to the width
of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageSubresource-07972) VUID-VkCopyImageToMemoryInfo-imageSubresource-07972

For each element of `pRegions`, `imageOffset.y` and
(`imageExtent.height` +  `imageOffset.y`) **must**
both be greater than or equal to `0` and less than or equal to the
height of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07973) VUID-VkCopyImageToMemoryInfo-srcImage-07973

`srcImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07979) VUID-VkCopyImageToMemoryInfo-srcImage-07979

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `imageOffset.y` **must** be `0` and
`imageExtent.height` **must** be `1`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-09104) VUID-VkCopyImageToMemoryInfo-imageOffset-09104

For each element of `pRegions`, `imageOffset.z` and
(`imageExtent.depth` +  `imageOffset.z`) **must**
both be greater than or equal to `0` and less than or equal to the depth
of the specified `imageSubresource` of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07980) VUID-VkCopyImageToMemoryInfo-srcImage-07980

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`imageOffset.z` **must** be `0` and `imageExtent.depth` **must**
be `1`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07274) VUID-VkCopyImageToMemoryInfo-srcImage-07274

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.x` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10051) VUID-VkCopyImageToMemoryInfo-imageOffset-10051

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.x`
does not equal the width of the subresource specified by
`imageSubresource`, `imageOffset.x` **must** be a multiple of
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07275) VUID-VkCopyImageToMemoryInfo-srcImage-07275

For each element of `pRegions`,
if [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
`imageOffset.y` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10052) VUID-VkCopyImageToMemoryInfo-imageOffset-10052

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) or
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and `imageOffset.y`
does not equal the height of the subresource specified by
`imageSubresource`, `imageOffset.y` **must** be a multiple of
the [texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07276) VUID-VkCopyImageToMemoryInfo-srcImage-07276

For each element of `pRegions`, `imageOffset.z` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-00207) VUID-VkCopyImageToMemoryInfo-srcImage-00207

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
the sum of `imageOffset.x` and `extent.width` does not equal
the width of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10053) VUID-VkCopyImageToMemoryInfo-imageOffset-10053

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10054) VUID-VkCopyImageToMemoryInfo-imageOffset-10054

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.x` and `extent.width` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10055) VUID-VkCopyImageToMemoryInfo-imageOffset-10055

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.x` and `extent.height` does not equal the width
of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-00208) VUID-VkCopyImageToMemoryInfo-srcImage-00208

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), and
the sum of `imageOffset.y` and `extent.height` does not equal
the height of the subresource specified by `imageSubresource`,
`extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10056) VUID-VkCopyImageToMemoryInfo-imageOffset-10056

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the sum of
`imageOffset.y` and `extent.width` does not equal the height
of the subresource specified by `imageSubresource`,
`extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10057) VUID-VkCopyImageToMemoryInfo-imageOffset-10057

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.height` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageOffset-10058) VUID-VkCopyImageToMemoryInfo-imageOffset-10058

For each element of `pRegions`, if
[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)::`transform` is equal to
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the difference of
`imageOffset.y` and `extent.width` **must** be a multiple of the
[texel block extent height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the
[VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-00209) VUID-VkCopyImageToMemoryInfo-srcImage-00209

For each element of `pRegions`, if the sum of `imageOffset.z`
and `extent.depth` does not equal the depth of the subresource
specified by `srcSubresource`, `extent.depth` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-imageSubresource-09105) VUID-VkCopyImageToMemoryInfo-imageSubresource-09105

For each element of `pRegions`, `imageSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07981) VUID-VkCopyImageToMemoryInfo-srcImage-07981

If `srcImage` has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then for each element of `pRegions`,
`imageSubresource.aspectMask` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-07983) VUID-VkCopyImageToMemoryInfo-srcImage-07983

If `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
element of `pRegions`, `imageSubresource.baseArrayLayer` **must**
be `0` and `imageSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkCopyImageToMemoryInfo-memoryRowLength-09106) VUID-VkCopyImageToMemoryInfo-memoryRowLength-09106

For each element of `pRegions`, `memoryRowLength` **must** be a
multiple of the [texel block extent    width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-memoryImageHeight-09107) VUID-VkCopyImageToMemoryInfo-memoryImageHeight-09107

For each element of `pRegions`, `memoryImageHeight` **must** be a
multiple of the [texel block extent    height](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `srcImage`

* 
[](#VUID-VkCopyImageToMemoryInfo-memoryRowLength-09108) VUID-VkCopyImageToMemoryInfo-memoryRowLength-09108

For each element of `pRegions`, `memoryRowLength` divided by
the [texel block extent width](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) and then
multiplied by the texel block size of `srcImage` **must** be less
than or equal to 231-1

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImageLayout-09064) VUID-VkCopyImageToMemoryInfo-srcImageLayout-09064

`srcImageLayout` **must** specify the current layout of the image
subresources of `srcImage` specified in `pRegions`

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImageLayout-09065) VUID-VkCopyImageToMemoryInfo-srcImageLayout-09065

`srcImageLayout` **must** be one of the image layouts returned in
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`pCopySrcLayouts`

* 
[](#VUID-VkCopyImageToMemoryInfo-flags-09394) VUID-VkCopyImageToMemoryInfo-flags-09394

If `flags` includes [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html), for each
region in `pRegions`, `memoryRowLength` and
`memoryImageHeight` **must** both be 0

Valid Usage (Implicit)

* 
[](#VUID-VkCopyImageToMemoryInfo-sType-sType) VUID-VkCopyImageToMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO](VkStructureType.html)

* 
[](#VUID-VkCopyImageToMemoryInfo-pNext-pNext) VUID-VkCopyImageToMemoryInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyImageToMemoryInfo-flags-parameter) VUID-VkCopyImageToMemoryInfo-flags-parameter

 `flags` **must** be a valid combination of [VkHostImageCopyFlagBits](VkHostImageCopyFlagBits.html) values

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImage-parameter) VUID-VkCopyImageToMemoryInfo-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyImageToMemoryInfo-srcImageLayout-parameter) VUID-VkCopyImageToMemoryInfo-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyImageToMemoryInfo-pRegions-parameter) VUID-VkCopyImageToMemoryInfo-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageToMemoryCopy](VkImageToMemoryCopy.html) structures

* 
[](#VUID-VkCopyImageToMemoryInfo-regionCount-arraylength) VUID-VkCopyImageToMemoryInfo-regionCount-arraylength

 `regionCount` **must** be greater than `0`

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkHostImageCopyFlags](VkHostImageCopyFlags.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageToMemoryCopy](VkImageToMemoryCopy.html), [VkStructureType](VkStructureType.html), [vkCopyImageToMemory](vkCopyImageToMemory.html), [vkCopyImageToMemory](vkCopyImageToMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyImageToMemoryInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
