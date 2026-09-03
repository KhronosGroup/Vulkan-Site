# VkImageTilingControlCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageTilingControlCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageTilingControlCreateInfoEXT - Specifies additional creation parameters for image tiling

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageTilingControlCreateInfoEXT` structure, then that structure
specifies the optimal tiling arrangement for this image.

The `VkImageTilingControlCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_image_tiling_control
typedef struct VkImageTilingControlCreateInfoEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkImageTilingControlEXT    tilingControl;
} VkImageTilingControlCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageTiling` is a [VkImageTilingControlEXT](VkImageTilingControlEXT.html) value specifying
the optimal tiling arrangement for the image.

Valid Usage

* 
[](#VUID-VkImageTilingControlCreateInfoEXT-imageTiling-12481) VUID-VkImageTilingControlCreateInfoEXT-imageTiling-12481

If `VkImageTilingControlCreateInfoEXT`::`imageTiling` is not
[VK_IMAGE_TILING_CONTROL_DEFAULT_EXT](VkImageTilingControlEXT.html), the
[`imageTilingControl`](../../../../spec/latest/chapters/features.html#features-imageTilingControl) feature **must**
be enabled

* 
[](#VUID-VkImageTilingControlCreateInfoEXT-imageTiling-12479) VUID-VkImageTilingControlCreateInfoEXT-imageTiling-12479

If `VkImageTilingControlCreateInfoEXT`::`imageTiling` is not
[VK_IMAGE_TILING_CONTROL_DEFAULT_EXT](VkImageTilingControlEXT.html),
[VkImageCreateInfo](VkImageCreateInfo.html)::`tiling` **must** not be
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageTilingControlCreateInfoEXT-sType-sType) VUID-VkImageTilingControlCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_TILING_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageTilingControlCreateInfoEXT-tilingControl-parameter) VUID-VkImageTilingControlCreateInfoEXT-tilingControl-parameter

 `tilingControl` **must** be a valid [VkImageTilingControlEXT](VkImageTilingControlEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_EXT_image_tiling_control](VK_EXT_image_tiling_control.html), [VkImageTilingControlEXT](VkImageTilingControlEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageTilingControlCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
