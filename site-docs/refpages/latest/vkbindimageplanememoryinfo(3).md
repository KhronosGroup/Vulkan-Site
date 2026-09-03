# VkBindImagePlaneMemoryInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindImagePlaneMemoryInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindImagePlaneMemoryInfo - Structure specifying how to bind an image plane to memory

In order to bind *planes* of a *disjoint image*, add a
`VkBindImagePlaneMemoryInfo` structure to the `pNext` chain of
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html).

The `VkBindImagePlaneMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImagePlaneMemoryInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    planeAspect;
} VkBindImagePlaneMemoryInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkBindImagePlaneMemoryInfo
typedef VkBindImagePlaneMemoryInfo VkBindImagePlaneMemoryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`planeAspect` is a [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value specifying the
aspect of the disjoint image plane to bind.

Valid Usage

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-02283) VUID-VkBindImagePlaneMemoryInfo-planeAspect-02283

If the image’s `tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-02284) VUID-VkBindImagePlaneMemoryInfo-planeAspect-02284

If the image’s `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkBindImagePlaneMemoryInfo-sType-sType) VUID-VkBindImagePlaneMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO](VkStructureType.html)

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-parameter) VUID-VkBindImagePlaneMemoryInfo-planeAspect-parameter

 `planeAspect` **must** be a valid [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageAspectFlagBits](VkImageAspectFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindImagePlaneMemoryInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
