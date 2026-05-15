# VkImagePlaneMemoryRequirementsInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImagePlaneMemoryRequirementsInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImagePlaneMemoryRequirementsInfo - Structure specifying image plane for memory requirements

To determine the memory requirements for a plane of a disjoint image, add a
`VkImagePlaneMemoryRequirementsInfo` structure to the `pNext` chain
of the `VkImageMemoryRequirementsInfo2` structure.

The `VkImagePlaneMemoryRequirementsInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImagePlaneMemoryRequirementsInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    planeAspect;
} VkImagePlaneMemoryRequirementsInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkImagePlaneMemoryRequirementsInfo
typedef VkImagePlaneMemoryRequirementsInfo VkImagePlaneMemoryRequirementsInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`planeAspect` is a [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value specifying the
aspect corresponding to the image plane to query.

Valid Usage

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02281) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02281

If the image’s `tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02282) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02282

If the image’s `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-sType-sType) VUID-VkImagePlaneMemoryRequirementsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO](VkStructureType.html)

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-parameter) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-parameter

 `planeAspect` **must** be a valid [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageAspectFlagBits](VkImageAspectFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImagePlaneMemoryRequirementsInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
