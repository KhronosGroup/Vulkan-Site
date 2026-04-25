# VkCompressedTriangleFormatAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCompressedTriangleFormatAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCompressedTriangleFormatAMDX - Available compressed triangle formats

The [VkCompressedTriangleFormatAMDX](#) enumeration is defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef enum VkCompressedTriangleFormatAMDX {
    VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX = 0,
} VkCompressedTriangleFormatAMDX;

* 
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX](#) specifies that the
compressed triangle data is in [Dense Geometry    Format](../../../../spec/latest/chapters/VK_AMDX_dense_geometry_format/dense_geometry_format.html#dense-geometry-format), version 1, consisting of an array of 128B DGF blocks.

[VK_AMDX_dense_geometry_format](VK_AMDX_dense_geometry_format.html), [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkCompressedTriangleFormatAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
