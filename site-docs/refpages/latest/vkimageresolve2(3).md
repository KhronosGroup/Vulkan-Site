# VkImageResolve2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageResolve2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageResolve2 - Structure specifying an image resolve operation

The `VkImageResolve2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkImageResolve2 {
    VkStructureType             sType;
    const void*                 pNext;
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffset;
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffset;
    VkExtent3D                  extent;
} VkImageResolve2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkImageResolve2
typedef VkImageResolve2 VkImageResolve2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSubresource` and `dstSubresource` are
[VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures specifying the image
subresources of the images used for the source and destination image
data, respectively.

* 
`srcOffset` and `dstOffset` select the initial `x`, `y`,
and `z` offsets in texels of the sub-regions of the source and
destination image data.

* 
`extent` is the size in texels of the source image to resolve in
`width`, `height` and `depth`.

Valid Usage

* 
[](#VUID-VkImageResolve2-aspectMask-10993) VUID-VkImageResolve2-aspectMask-10993

The `aspectMask` member of `srcSubresource` and
`dstSubresource` **must** only contain
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), or
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageResolve2-maintenance10-10994) VUID-VkImageResolve2-maintenance10-10994

If [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled, `srcSubresource` and `dstSubresource` **must** not contain
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageResolve2-layerCount-08803) VUID-VkImageResolve2-layerCount-08803

If neither of the `layerCount` members of `srcSubresource` or
`dstSubresource` are [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the
`layerCount` member of `srcSubresource` and `dstSubresource`
**must** match

* 
[](#VUID-VkImageResolve2-layerCount-08804) VUID-VkImageResolve2-layerCount-08804

If one of the `layerCount` members of `srcSubresource` or
`dstSubresource` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the other
member **must** be either [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) or equal to the
`arrayLayers` member of the [VkImageCreateInfo](VkImageCreateInfo.html) used to create
the image minus `baseArrayLayer`

Valid Usage (Implicit)

* 
[](#VUID-VkImageResolve2-sType-sType) VUID-VkImageResolve2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2](VkStructureType.html)

* 
[](#VUID-VkImageResolve2-pNext-pNext) VUID-VkImageResolve2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageResolve2-srcSubresource-parameter) VUID-VkImageResolve2-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageResolve2-dstSubresource-parameter) VUID-VkImageResolve2-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkResolveImageInfo2](VkResolveImageInfo2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageResolve2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
