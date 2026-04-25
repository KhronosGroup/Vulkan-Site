# VkDeviceImageSubresourceInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceImageSubresourceInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceImageSubresourceInfo - Image creation information for querying subresource layout

The `VkDeviceImageSubresourceInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkDeviceImageSubresourceInfo {
    VkStructureType               sType;
    const void*                   pNext;
    const VkImageCreateInfo*      pCreateInfo;
    const VkImageSubresource2*    pSubresource;
} VkDeviceImageSubresourceInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkDeviceImageSubresourceInfo
typedef VkDeviceImageSubresourceInfo VkDeviceImageSubresourceInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](VkImageCreateInfo.html) structure
containing parameters affecting creation of the image to query.

* 
`pSubresource` is a pointer to a [VkImageSubresource2](VkImageSubresource2.html) structure
selecting a specific image subresource for the query.

Valid Usage

* 
[](#VUID-VkDeviceImageSubresourceInfo-aspectMask-00997) VUID-VkDeviceImageSubresourceInfo-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-VkDeviceImageSubresourceInfo-mipLevel-01716) VUID-VkDeviceImageSubresourceInfo-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `pCreateInfo`

* 
[](#VUID-VkDeviceImageSubresourceInfo-arrayLayer-01717) VUID-VkDeviceImageSubresourceInfo-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `pCreateInfo`

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-08886) VUID-VkDeviceImageSubresourceInfo-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
and `tiling` of the `pCreateInfo` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04462) VUID-VkDeviceImageSubresourceInfo-format-04462

If `format` of the `pCreateInfo` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04463) VUID-VkDeviceImageSubresourceInfo-format-04463

If `format` of the `pCreateInfo` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04464) VUID-VkDeviceImageSubresourceInfo-format-04464

If `format` of the `pCreateInfo` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDeviceImageSubresourceInfo-tiling-08717) VUID-VkDeviceImageSubresourceInfo-tiling-08717

If the `tiling` of the `pCreateInfo` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) and has a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceImageSubresourceInfo-sType-sType) VUID-VkDeviceImageSubresourceInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceImageSubresourceInfo-pNext-pNext) VUID-VkDeviceImageSubresourceInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceImageSubresourceInfo-pCreateInfo-parameter) VUID-VkDeviceImageSubresourceInfo-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](VkImageCreateInfo.html) structure

* 
[](#VUID-VkDeviceImageSubresourceInfo-pSubresource-parameter) VUID-VkDeviceImageSubresourceInfo-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource2](VkImageSubresource2.html) structure

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageSubresource2](VkImageSubresource2.html), [VkStructureType](VkStructureType.html), [vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html), [vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDeviceImageSubresourceInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
