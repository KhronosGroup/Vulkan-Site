# VkShadingRatePaletteNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShadingRatePaletteNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShadingRatePaletteNV - Structure specifying a single shading rate palette

The `VkShadingRatePaletteNV` structure specifies to contents of a single
shading rate image palette and is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkShadingRatePaletteNV {
    uint32_t                              shadingRatePaletteEntryCount;
    const VkShadingRatePaletteEntryNV*    pShadingRatePaletteEntries;
} VkShadingRatePaletteNV;

* 
`shadingRatePaletteEntryCount` specifies the number of entries in
the shading rate image palette.

* 
`pShadingRatePaletteEntries` is a pointer to an array of
[VkShadingRatePaletteEntryNV](VkShadingRatePaletteEntryNV.html) enums defining the shading rate for
each palette entry.

Valid Usage

* 
[](#VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-02071) VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-02071

`shadingRatePaletteEntryCount` **must** be between `1` and
`VkPhysicalDeviceShadingRateImagePropertiesNV`::`shadingRatePaletteSize`,
inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkShadingRatePaletteNV-pShadingRatePaletteEntries-parameter) VUID-VkShadingRatePaletteNV-pShadingRatePaletteEntries-parameter

 `pShadingRatePaletteEntries` **must** be a valid pointer to an array of `shadingRatePaletteEntryCount` valid [VkShadingRatePaletteEntryNV](VkShadingRatePaletteEntryNV.html) values

* 
[](#VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-arraylength) VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-arraylength

 `shadingRatePaletteEntryCount` **must** be greater than `0`

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html), [VkShadingRatePaletteEntryNV](VkShadingRatePaletteEntryNV.html), [vkCmdSetViewportShadingRatePaletteNV](vkCmdSetViewportShadingRatePaletteNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkShadingRatePaletteNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
