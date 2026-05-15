# VkImageCopy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCopy.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCopy - Structure specifying an image copy operation

The `VkImageCopy` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageCopy {
    VkImageSubresourceLayers    srcSubresource;
    VkOffset3D                  srcOffset;
    VkImageSubresourceLayers    dstSubresource;
    VkOffset3D                  dstOffset;
    VkExtent3D                  extent;
} VkImageCopy;

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
[](#VUID-VkImageCopy-apiVersion-07940) VUID-VkImageCopy-apiVersion-07940

If
    the [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
the
    `aspectMask` member of `srcSubresource` and `dstSubresource`
    **must** match

* 
[](#VUID-VkImageCopy-apiVersion-07941) VUID-VkImageCopy-apiVersion-07941

If
    the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled,
and
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
the
    `layerCount` member of `srcSubresource` and `dstSubresource`
    **must** match

* 
[](#VUID-VkImageCopy-extent-06668) VUID-VkImageCopy-extent-06668

`extent.width` **must** not be 0

* 
[](#VUID-VkImageCopy-extent-06669) VUID-VkImageCopy-extent-06669

`extent.height` **must** not be 0

* 
[](#VUID-VkImageCopy-extent-06670) VUID-VkImageCopy-extent-06670

`extent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkImageCopy-srcSubresource-parameter) VUID-VkImageCopy-srcSubresource-parameter

 `srcSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkImageCopy-dstSubresource-parameter) VUID-VkImageCopy-dstSubresource-parameter

 `dstSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [vkCmdCopyImage](vkCmdCopyImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageCopy).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
