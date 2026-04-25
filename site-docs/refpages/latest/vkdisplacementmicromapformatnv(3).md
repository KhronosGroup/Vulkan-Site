# VkDisplacementMicromapFormatNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplacementMicromapFormatNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplacementMicromapFormatNV - Format enum for displacement micromaps

Formats which **can** be set in [VkMicromapUsageEXT](VkMicromapUsageEXT.html)::`format` and
[VkMicromapTriangleEXT](VkMicromapTriangleEXT.html)::`format` for micromap builds, are:

// Provided by VK_NV_displacement_micromap
typedef enum VkDisplacementMicromapFormatNV {
    VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV = 1,
    VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV = 2,
    VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV = 3,
} VkDisplacementMicromapFormatNV;

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](#) specifies
that the given micromap format encodes 64 micro-triangles worth of
displacements in 64 bytes as described in
[Displacement Micromap Encoding](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#displacement-micromap-encoding).

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#)
specifies that the given micromap format encodes 256 micro-triangles
worth of displacements in 128 bytes as described in
[Displacement Micromap Encoding](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#displacement-micromap-encoding).

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#)
specifies that the given micromap format encodes 1024 micro-triangles
worth of displacements in 128 bytes as described in
[Displacement Micromap Encoding](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#displacement-micromap-encoding).

|  | For compactness, these values are stored as 16-bit in some structures. |
| --- | --- |

[VK_NV_displacement_micromap](VK_NV_displacement_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkDisplacementMicromapFormatNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
