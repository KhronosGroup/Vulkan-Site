# VkMicromapTriangleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapTriangleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapTriangleKHR - Structure specifying the micromap format and data for a triangle

The `VkMicromapTriangleKHR` structure is defined as:

// Provided by VK_KHR_opacity_micromap
typedef struct VkMicromapTriangleKHR {
    uint32_t    dataOffset;
    uint16_t    subdivisionLevel;
    uint16_t    format;
} VkMicromapTriangleKHR;

// Provided by VK_EXT_opacity_micromap
// Equivalent to VkMicromapTriangleKHR
typedef VkMicromapTriangleKHR VkMicromapTriangleEXT;

* 
`dataOffset` is the offset in bytes of the start of the data for
this triangle.
This is a byte aligned value.

* 
`subdivisionLevel` is the subdivision level of this triangle

* 
`format` is the format of this triangle

The `format` is interpreted based on the `type` of the micromap
using it.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_opacity_micromap/micromaps.html#VkMicromapTriangleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
