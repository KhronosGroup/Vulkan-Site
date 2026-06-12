# VkXYColorEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkXYColorEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkXYColorEXT - Specify X,Y chromaticity coordinates

The `VkXYColorEXT` structure is defined as:

// Provided by VK_EXT_hdr_metadata
typedef struct VkXYColorEXT {
    float    x;
    float    y;
} VkXYColorEXT;

* 
`x` is the x chromaticity coordinate.

* 
`y` is the y chromaticity coordinate.

Chromaticity coordinates are as specified in CIE 15:2004 “Calculation of
chromaticity coordinates” (Section 7.3) and are limited to between 0 and 1
for real colors.

[VK_EXT_hdr_metadata](VK_EXT_hdr_metadata.html), [VkHdrMetadataEXT](VkHdrMetadataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkXYColorEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
