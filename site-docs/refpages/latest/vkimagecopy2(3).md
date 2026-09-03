# VkImageCopy2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCopy2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCopy2 - Structure specifying an image copy operation

The `VkImageCopy2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkImageCopy2 {
    VkStructureType             sType;
    const void*                 pNext;
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffset;
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffset;
    VkExtent3D                  extent;
} VkImageCopy2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkImageCopy2
typedef VkImageCopy2 VkImageCopy2KHR;

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
`extent` is the size in texels of the image to copy in `width`,
`height` and `depth`.

Valid Usage

* 
[](#VUID-VkImageCopy2-apiVersion-07940) VUID-VkImageCopy2-apiVersion-07940

If
    the [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
the
    `aspectMask` member of `srcSubresource` and `dstSubresource`
    **must** match

* 
[](#VUID-VkImageCopy2-apiVersion-07941) VUID-VkImageCopy2-apiVersion-07941

If
    the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
the
    `layerCount` member of `srcSubresource` and `dstSubresource`
    **must** match

* 
[](#VUID-VkImageCopy2-extent-06668) VUID-VkImageCopy2-extent-06668

`extent.width` **must** not be 0

* 
[](#VUID-VkImageCopy2-extent-06669) VUID-VkImageCopy2-extent-06669

`extent.height` **must** not be 0

* 
[](#VUID-VkImageCopy2-extent-06670) VUID-VkImageCopy2-extent-06670

`extent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkImageCopy2-sType-sType) VUID-VkImageCopy2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_COPY_2](VkStructureType.html)

* 
[](#VUID-VkImageCopy2-pNext-pNext) VUID-VkImageCopy2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageCopy2-srcSubresource-parameter) VUID-VkImageCopy2-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageCopy2-dstSubresource-parameter) VUID-VkImageCopy2-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCopyImageInfo2](VkCopyImageInfo2.html), [VkCopyImageToImageInfo](VkCopyImageToImageInfo.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageCopy2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
