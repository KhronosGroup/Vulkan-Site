# VkImageViewSlicedCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewSlicedCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewSlicedCreateInfoEXT - Specify the subset of 3D slices of an image view

The range of 3D slices for the created image view **can** be restricted to a
subset of the parent image’s Z range by adding a
`VkImageViewSlicedCreateInfoEXT` structure to the `pNext` chain of
[VkImageViewCreateInfo](VkImageViewCreateInfo.html).

The `VkImageViewSlicedCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_image_sliced_view_of_3d
typedef struct VkImageViewSlicedCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           sliceOffset;
    uint32_t           sliceCount;
} VkImageViewSlicedCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sliceOffset` is the Z-offset for the first 3D slice accessible to
the image view.

* 
`sliceCount` is the number of 3D slices accessible to the image
view.

When this structure is chained to [VkImageViewCreateInfo](VkImageViewCreateInfo.html) the
`sliceOffset` field is treated as a Z-offset for the sliced view and
`sliceCount` specifies the range.
Shader accesses using a Z coordinate of 0 will access the depth slice
corresponding to `sliceOffset` in the image, and in a shader, the
maximum in-bounds Z coordinate for the view is `sliceCount` - 1.

A sliced 3D view **must** only be used with a single mip level.
The slice coordinates are integer coordinates within the
`subresourceRange.baseMipLevel` used to create the image view.

The effective view depth is equal to `extent.depth` used to create the
`image` for this view adjusted by `subresourceRange.baseMipLevel` as
specified in [Image Mip Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing).

Shader access to this image view is only affected by
`VkImageViewSlicedCreateInfoEXT` if it uses a descriptor of type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html).
For access using any other descriptor type, the contents of
`VkImageViewSlicedCreateInfoEXT` are ignored; instead, `sliceOffset`
is treated as being equal to 0, and `sliceCount` is treated as being
equal to [VK_REMAINING_3D_SLICES_EXT](VK_REMAINING_3D_SLICES_EXT.html).

Valid Usage

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sliceOffset-07867) VUID-VkImageViewSlicedCreateInfoEXT-sliceOffset-07867

`sliceOffset` **must** be less than the effective view depth as
specified in [Image Mip Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sliceCount-07868) VUID-VkImageViewSlicedCreateInfoEXT-sliceCount-07868

If `sliceCount` is not [VK_REMAINING_3D_SLICES_EXT](VK_REMAINING_3D_SLICES_EXT.html), it **must** be
non-zero and `sliceOffset` +  `sliceCount` **must** be
less than or equal to the effective view depth as specified in
[Image Mip Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-image-07869) VUID-VkImageViewSlicedCreateInfoEXT-image-07869

`image` **must** have been created with `imageType` equal to
[VK_IMAGE_TYPE_3D](VkImageType.html)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-viewType-07909) VUID-VkImageViewSlicedCreateInfoEXT-viewType-07909

`viewType` **must** be [VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-None-07870) VUID-VkImageViewSlicedCreateInfoEXT-None-07870

The image view **must** reference exactly 1 mip level

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-None-07871) VUID-VkImageViewSlicedCreateInfoEXT-None-07871

The [imageSlicedViewOf3D](../../../../spec/latest/chapters/features.html#features-imageSlicedViewOf3D) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sType-sType) VUID-VkImageViewSlicedCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_SLICED_CREATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_EXT_image_sliced_view_of_3d](VK_EXT_image_sliced_view_of_3d.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewSlicedCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
