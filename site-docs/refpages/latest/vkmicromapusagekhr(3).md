# VkMicromapUsageKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapUsageKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapUsageKHR - Structure specifying the usage information used to build a micromap

The `VkMicromapUsageKHR` structure is defined as:

// Provided by VK_KHR_opacity_micromap
typedef struct VkMicromapUsageKHR {
    uint32_t                      count;
    uint32_t                      subdivisionLevel;
    VkOpacityMicromapFormatKHR    format;
} VkMicromapUsageKHR;

* 
`count` is the number of triangles in the usage format defined by
the `subdivisionLevel` and `format` below in the micromap

* 
`subdivisionLevel` is the subdivision level of this usage format

* 
`format` is the format of this usage format

The `format` is interpreted based on the `type` of the micromap
using it.

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapUsageKHR-format-parameter) VUID-VkMicromapUsageKHR-format-parameter

 `format` **must** be a valid [VkOpacityMicromapFormatKHR](VkOpacityMicromapFormatKHR.html) value

[VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html), [VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html), [VkOpacityMicromapFormatKHR](VkOpacityMicromapFormatKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_opacity_micromap/micromaps.html#VkMicromapUsageKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
