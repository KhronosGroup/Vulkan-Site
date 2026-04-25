# VkMicromapTriangleEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapTriangleEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapTriangleEXT - Structure specifying the micromap format and data for a triangle

The `VkMicromapTriangleEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapTriangleEXT {
    uint32_t    dataOffset;
    uint16_t    subdivisionLevel;
    uint16_t    format;
} VkMicromapTriangleEXT;

* 
`dataOffset` is the offset in bytes of the start of the data for
this triangle.
This is a byte aligned value.

* 
`subdivisionLevel` is the subdivision level of this triangle

* 
`format` is the format of this triangle

Valid Usage

* 
[](#VUID-VkMicromapTriangleEXT-format-07522) VUID-VkMicromapTriangleEXT-format-07522

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) then `format` **must** be
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html) or
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html)

* 
[](#VUID-VkMicromapTriangleEXT-format-07523) VUID-VkMicromapTriangleEXT-format-07523

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](VkPhysicalDeviceOpacityMicromapPropertiesEXT.html)::`maxOpacity2StateSubdivisionLevel`

* 
[](#VUID-VkMicromapTriangleEXT-format-07524) VUID-VkMicromapTriangleEXT-format-07524

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](VkPhysicalDeviceOpacityMicromapPropertiesEXT.html)::`maxOpacity4StateSubdivisionLevel`

* 
[](#VUID-VkMicromapTriangleEXT-format-08708) VUID-VkMicromapTriangleEXT-format-08708

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) then `format` **must**
be [VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](VkDisplacementMicromapFormatNV.html),
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](VkDisplacementMicromapFormatNV.html) or
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](VkDisplacementMicromapFormatNV.html)

* 
[](#VUID-VkMicromapTriangleEXT-subdivisionLevel-08709) VUID-VkMicromapTriangleEXT-subdivisionLevel-08709

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) then
`subdivisionLevel` **must** be less than or equal to
[VkPhysicalDeviceDisplacementMicromapPropertiesNV](VkPhysicalDeviceDisplacementMicromapPropertiesNV.html)::`maxDisplacementMicromapSubdivisionLevel`

The `format` is interpreted based on the `type` of the micromap
using it.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkMicromapTriangleEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
