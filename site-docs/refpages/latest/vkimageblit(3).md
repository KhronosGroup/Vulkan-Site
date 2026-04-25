# VkImageBlit(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageBlit.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageBlit - Structure specifying an image blit operation

The `VkImageBlit` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageBlit {
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffsets[2];
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffsets[2];
} VkImageBlit;

* 
`srcSubresource` is the subresource to blit from.

* 
`srcOffsets` is a pointer to an array of two [VkOffset3D](VkOffset3D.html)
structures specifying the bounds of the source region within
`srcSubresource`.

* 
`dstSubresource` is the subresource to blit into.

* 
`dstOffsets` is a pointer to an array of two [VkOffset3D](VkOffset3D.html)
structures specifying the bounds of the destination region within
`dstSubresource`.

For each element of the `pRegions` array, a blit operation is performed
for the specified source and destination regions.

Valid Usage

* 
[](#VUID-VkImageBlit-aspectMask-00238) VUID-VkImageBlit-aspectMask-00238

The `aspectMask` member of `srcSubresource` and
`dstSubresource` **must** match

* 
[](#VUID-VkImageBlit-layerCount-08800) VUID-VkImageBlit-layerCount-08800

If neither of the `layerCount` members of `srcSubresource` or
`dstSubresource` are [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the
`layerCount` members of `srcSubresource` or `dstSubresource`
**must** match

* 
[](#VUID-VkImageBlit-layerCount-08801) VUID-VkImageBlit-layerCount-08801

If one of the `layerCount` members of `srcSubresource` or
`dstSubresource` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the other
member **must** be either [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) or equal to the
`arrayLayers` member of the [VkImageCreateInfo](VkImageCreateInfo.html) used to create
the image minus `baseArrayLayer`

Valid Usage (Implicit)

* 
[](#VUID-VkImageBlit-srcSubresource-parameter) VUID-VkImageBlit-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageBlit-dstSubresource-parameter) VUID-VkImageBlit-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [vkCmdBlitImage](vkCmdBlitImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageBlit).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
