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

The `format` is interpreted based on the `type` of the micromap
using it.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_opacity_micromap/micromaps.html#VkMicromapUsageEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
