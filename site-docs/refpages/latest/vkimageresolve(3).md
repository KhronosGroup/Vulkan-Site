# VkImageResolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageResolve.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageResolve - Structure specifying an image resolve operation

The `VkImageResolve` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageResolve {
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffset;
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffset;
    VkExtent3D                  extent;
} VkImageResolve;

* 
`srcSubresource` and `dstSubresource` are
[VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures specifying the image
subresources of the images used for the source and destination image
data, respectively.
Resolve of depth/stencil images is not supported.
[VkImageResolve2](VkImageResolve2.html) **can** support resolve of depth/stencil images with
[`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) instead.

* 
`srcOffset` and `dstOffset` select the initial `x`, `y`,
and `z` offsets in texels of the sub-regions of the source and
destination image data.

* 
`extent` is the size in texels of the source image to resolve in
`width`, `height` and `depth`.

Valid Usage

* 
[](#VUID-VkImageResolve-aspectMask-10981) VUID-VkImageResolve-aspectMask-10981

The `aspectMask` member of `srcSubresource` and
`dstSubresource` **must** only contain [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageResolve-layerCount-08803) VUID-VkImageResolve-layerCount-08803

If neither of the `layerCount` members of `srcSubresource` or
`dstSubresource` are [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the
`layerCount` member of `srcSubresource` and `dstSubresource`
**must** match

* 
[](#VUID-VkImageResolve-layerCount-08804) VUID-VkImageResolve-layerCount-08804

If one of the `layerCount` members of `srcSubresource` or
`dstSubresource` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the other
member **must** be either [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) or equal to the
`arrayLayers` member of the [VkImageCreateInfo](VkImageCreateInfo.html) used to create
the image minus `baseArrayLayer`

Valid Usage (Implicit)

* 
[](#VUID-VkImageResolve-srcSubresource-parameter) VUID-VkImageResolve-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageResolve-dstSubresource-parameter) VUID-VkImageResolve-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [vkCmdResolveImage](vkCmdResolveImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageResolve).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
