# VkImageViewMinLodCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewMinLodCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewMinLodCreateInfoEXT - Structure describing the minimum LOD of an image view

The `VkImageViewMinLodCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_image_view_min_lod
typedef struct VkImageViewMinLodCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              minLod;
} VkImageViewMinLodCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minLod` is the value to clamp the minimum LOD accessible by this
[VkImageView](VkImageView.html).

If the `pNext` chain includes a `VkImageViewMinLodCreateInfoEXT`
structure, then that structure includes a parameter specifying a value to
clamp the minimum LOD value during [Image Level(s) Selection](../../../../spec/latest/chapters/textures.html#textures-image-level-selection), [Texel Gathering](../../../../spec/latest/chapters/textures.html#textures-gather) and
[Integer Texel Coordinate Operations](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-operations).

If the image view contains `VkImageViewMinLodCreateInfoEXT` and it is
used as part of a sampling operation:

minLodFloatimageView = `minLod`

otherwise:

minLodFloatimageView = 0.0

An integer variant of this parameter is also defined for sampling operations
which access integer mipmap levels:

minLodIntegerimageView = ⌊minLodFloatimageView⌋

Valid Usage

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-minLod-06455) VUID-VkImageViewMinLodCreateInfoEXT-minLod-06455

If the [`minLod`](../../../../spec/latest/chapters/features.html#features-minLod) feature is not enabled,
`minLod` **must** be `0.0`

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-minLod-06456) VUID-VkImageViewMinLodCreateInfoEXT-minLod-06456

`minLod` **must** be less or equal to the index of the last mipmap
level accessible to the view

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-sType-sType) VUID-VkImageViewMinLodCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_MIN_LOD_CREATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_EXT_image_view_min_lod](VK_EXT_image_view_min_lod.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewMinLodCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
