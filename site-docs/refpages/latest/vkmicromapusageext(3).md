# VkMicromapUsageEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapUsageEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapUsageEXT - Structure specifying the usage information used to build a micromap

The `VkMicromapUsageEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapUsageEXT {
    uint32_t    count;
    uint32_t    subdivisionLevel;
    uint32_t    format;
} VkMicromapUsageEXT;

* 
`count` is the number of triangles in the usage format defined by
the `subdivisionLevel` and `format` below in the micromap

* 
`subdivisionLevel` is the subdivision level of this usage format

* 
`format` is the format of this usage format

Valid Usage

* 
[](#VUID-VkMicromapUsageEXT-format-07519) VUID-VkMicromapUsageEXT-format-07519

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) then `format` **must** be
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html) or
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html)

* 
[](#VUID-VkMicromapUsageEXT-format-07520) VUID-VkMicromapUsageEXT-format-07520

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](VkPhysicalDeviceOpacityMicromapPropertiesEXT.html)::`maxOpacity2StateSubdivisionLevel`

* 
[](#VUID-VkMicromapUsageEXT-format-07521) VUID-VkMicromapUsageEXT-format-07521

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](VkPhysicalDeviceOpacityMicromapPropertiesEXT.html)::`maxOpacity4StateSubdivisionLevel`

* 
[](#VUID-VkMicromapUsageEXT-format-08706) VUID-VkMicromapUsageEXT-format-08706

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) then `format` **must**
be [VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](VkDisplacementMicromapFormatNV.html),
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](VkDisplacementMicromapFormatNV.html) or
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](VkDisplacementMicromapFormatNV.html)

* 
[](#VUID-VkMicromapUsageEXT-subdivisionLevel-08707) VUID-VkMicromapUsageEXT-subdivisionLevel-08707

If the [VkMicromapTypeEXT](VkMicromapTypeEXT.html) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) then
`subdivisionLevel` **must** be less than or equal to
[VkPhysicalDeviceDisplacementMicromapPropertiesNV](VkPhysicalDeviceDisplacementMicromapPropertiesNV.html)::`maxDisplacementMicromapSubdivisionLevel`

The `format` is interpreted based on the `type` of the micromap
using it.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
