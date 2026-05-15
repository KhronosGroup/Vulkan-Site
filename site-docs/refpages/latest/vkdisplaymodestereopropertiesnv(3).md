# VkDisplayModeStereoPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayModeStereoPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayModeStereoPropertiesNV - Structure describing the stereo properties of a display mode

The `VkDisplayModeStereoPropertiesNV` structure is defined as:

// Provided by VK_NV_display_stereo
typedef struct VkDisplayModeStereoPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdmi3DSupported;
} VkDisplayModeStereoPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hdmi3DSupported` indicates whether this display mode can be used
for a display surface configured for
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](VkDisplaySurfaceStereoTypeNV.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeStereoPropertiesNV-sType-sType) VUID-VkDisplayModeStereoPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_STEREO_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html)

[VK_NV_display_stereo](VK_NV_display_stereo.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayModeStereoPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
