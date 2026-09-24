# VkDisplaySurfaceStereoCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplaySurfaceStereoCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplaySurfaceStereoCreateInfoNV - Structure specifying stereo parameters of a newly created display plane surface object

The `VkDisplaySurfaceStereoCreateInfoNV` structure is defined as:

// Provided by VK_NV_display_stereo
typedef struct VkDisplaySurfaceStereoCreateInfoNV {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDisplaySurfaceStereoTypeNV    stereoType;
} VkDisplaySurfaceStereoCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `stereoType` is a
[VkDisplaySurfaceStereoTypeNV](VkDisplaySurfaceStereoTypeNV.html) value specifying the type of 3D
stereo presentation the display will be configured for.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplaySurfaceStereoCreateInfoNV-sType-sType) VUID-VkDisplaySurfaceStereoCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_SURFACE_STEREO_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkDisplaySurfaceStereoCreateInfoNV-stereoType-parameter) VUID-VkDisplaySurfaceStereoCreateInfoNV-stereoType-parameter

 `stereoType` **must** be a valid [VkDisplaySurfaceStereoTypeNV](VkDisplaySurfaceStereoTypeNV.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html)

[VK_NV_display_stereo](VK_NV_display_stereo.html), [VkDisplaySurfaceStereoTypeNV](VkDisplaySurfaceStereoTypeNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplaySurfaceStereoCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
