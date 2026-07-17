# VkImageBlit2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageBlit2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageBlit2 - Structure specifying an image blit operation

The `VkImageBlit2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkImageBlit2 {
    VkStructureType             sType;
    const void*                 pNext;
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffsets[2];
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffsets[2];
} VkImageBlit2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkImageBlit2
typedef VkImageBlit2 VkImageBlit2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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
[](#VUID-VkImageBlit2-aspectMask-00238) VUID-VkImageBlit2-aspectMask-00238

The `aspectMask` member of `srcSubresource` and
`dstSubresource` **must** match

* 
[](#VUID-VkImageBlit2-layerCount-08800) VUID-VkImageBlit2-layerCount-08800

If neither of the `layerCount` members of `srcSubresource` or
`dstSubresource` are [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the
`layerCount` members of `srcSubresource` or `dstSubresource`
**must** match

* 
[](#VUID-VkImageBlit2-layerCount-08801) VUID-VkImageBlit2-layerCount-08801

If one of the `layerCount` members of `srcSubresource` or
`dstSubresource` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the other
member **must** be either [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) or equal to the
`arrayLayers` member of the [VkImageCreateInfo](VkImageCreateInfo.html) used to create
the image minus `baseArrayLayer`

Valid Usage (Implicit)

* 
[](#VUID-VkImageBlit2-sType-sType) VUID-VkImageBlit2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_BLIT_2](VkStructureType.html)

* 
[](#VUID-VkImageBlit2-pNext-pNext) VUID-VkImageBlit2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)

* 
[](#VUID-VkImageBlit2-sType-unique) VUID-VkImageBlit2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageBlit2-srcSubresource-parameter) VUID-VkImageBlit2-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageBlit2-dstSubresource-parameter) VUID-VkImageBlit2-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBlitImageInfo2](VkBlitImageInfo2.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageBlit2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
