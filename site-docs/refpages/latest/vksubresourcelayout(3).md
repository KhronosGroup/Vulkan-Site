# VkSubresourceLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubresourceLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubresourceLayout - Structure specifying subresource layout

Information about the layout of the image subresource is returned in a
`VkSubresourceLayout` structure:

// Provided by VK_VERSION_1_0
typedef struct VkSubresourceLayout {
    VkDeviceSize    offset;
    VkDeviceSize    size;
    VkDeviceSize    rowPitch;
    VkDeviceSize    arrayPitch;
    VkDeviceSize    depthPitch;
} VkSubresourceLayout;

* 
`offset` is the byte offset from the start of the image
or the plane
where the image subresource begins.

* 
`size` is the size in bytes of the image subresource.
`size` includes any extra memory that is required based on
`rowPitch`.

* 
`rowPitch` describes the number of bytes between each row of texels
in an image.

* 
`arrayPitch` describes the number of bytes between each array layer
of an image.

* 
`depthPitch` describes the number of bytes between each slice of 3D
image.

If the image is [linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then `rowPitch`,
`arrayPitch` and `depthPitch` describe the layout of the image
subresource in linear memory.
For uncompressed formats, `rowPitch` is the number of bytes between
texels with the same x coordinate in adjacent rows (y coordinates differ by
one).
`arrayPitch` is the number of bytes between texels with the same x and y
coordinate in adjacent array layers of the image (array layer values differ
by one).
`depthPitch` is the number of bytes between texels with the same x and y
coordinate in adjacent slices of a 3D image (z coordinates differ by one).
Expressed as an addressing formula, the starting byte of a texel in the
image subresource has address:

// (x,y,z,layer) are in texel coordinates
address(x,y,z,layer) = layer*arrayPitch + z*depthPitch + y*rowPitch + x*elementSize + offset

For compressed formats, the `rowPitch` is the number of bytes between
compressed texel blocks in adjacent rows.
`arrayPitch` is the number of bytes between compressed texel blocks in
adjacent array layers.
`depthPitch` is the number of bytes between compressed texel blocks in
adjacent slices of a 3D image.

// (x,y,z,layer) are in compressed texel block coordinates
address(x,y,z,layer) = layer*arrayPitch + z*depthPitch + y*rowPitch + x*compressedTexelBlockByteSize + offset;

The value of `arrayPitch` is **undefined** for images that were not created
as arrays.
`depthPitch` is defined only for 3D images.

If the image has a
*single-plane*
color format
and its tiling is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html)
, then the `aspectMask` member of `VkImageSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html).

If the image has a depth/stencil format
and its tiling is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html)
, then `aspectMask` **must** be either [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html).
On implementations that store depth and stencil aspects separately, querying
each of these image subresource layouts will return a different `offset`
and `size` representing the region of memory used for that aspect.
On implementations that store depth and stencil aspects interleaved, the
same `offset` and `size` are returned and represent the interleaved
memory allocation.

If the image has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar)
and its tiling is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html)
, then the `aspectMask` member of `VkImageSubresource` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html), or
(for 3-plane formats only) [VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html).
Querying each of these image subresource layouts will return a different
`offset` and `size` representing the region of memory used for that
plane.
If the image is *disjoint*, then the `offset` is relative to the base
address of the plane.
If the image is *non-disjoint*, then the `offset` is relative to the
base address of the image.

If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
the `aspectMask` member of `VkImageSubresource` **must** be one of
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT`, where the maximum allowed
plane index *i* is defined by the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with the image’s [VkImageCreateInfo](VkImageCreateInfo.html)::`format` and
[modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).
The memory range used by the subresource is described by `offset` and
`size`.
If the image is *disjoint*, then the `offset` is relative to the base
address of the *memory plane*.
If the image is *non-disjoint*, then the `offset` is relative to the
base address of the image.
If the image is [non-linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then
`rowPitch`, `arrayPitch`, and `depthPitch` have an
implementation-dependent meaning.

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html), [VkSubresourceLayout2](VkSubresourceLayout2.html), [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkSubresourceLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
