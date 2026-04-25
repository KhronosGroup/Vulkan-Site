# VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX - Structure specifying acceleration structure DGF compressed triangle data

If a `VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure is included in the `pNext` chain of a
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structure whose `geometryType`
member is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), then
that structure defines triangle geometry using compressed data.

The `VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure is defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef struct VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX {
    VkStructureType                   sType;
    const void*                       pNext;
    VkDeviceOrHostAddressConstKHR     compressedData;
    VkDeviceSize                      dataSize;
    uint32_t                          numTriangles;
    uint32_t                          numVertices;
    uint32_t                          maxPrimitiveIndex;
    uint32_t                          maxGeometryIndex;
    VkCompressedTriangleFormatAMDX    format;
} VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compressedData` specifies the base address of the compressed data.

* 
`dataSize` specifies the size of the compressed data.

* 
`numTriangles` specifies the total number of triangles encoded in
the compressed data.

* 
`numVertices` specifies the number of vertices in the compressed
data.

* 
`maxPrimitiveIndex` specifies the maximum primitive index encoded in
the compressed data.

* 
`maxGeometryIndex` specifies the maximum geometry index encoded in
the compressed data.

* 
`format` specifies the [VkCompressedTriangleFormatAMDX](VkCompressedTriangleFormatAMDX.html) format
of the compressed data.

If `format` is [VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX](VkCompressedTriangleFormatAMDX.html),
`numVertices` specifies the sum of vertex counts across all blocks.

Valid Usage

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-10885) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-10885

The buffer from which `compressedData.deviceAddress` is queried
**must** have been created with the
[VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX](VkBufferUsageFlagBits2.html) usage flag set

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-denseGeometryFormat-10886) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-denseGeometryFormat-10886

The [    `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX`::`denseGeometryFormat`](../../../../spec/latest/chapters/features.html#features-denseGeometryFormat)
feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10887) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10887

If `format` is VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX, then
`compressedData` **must** be aligned to
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX](VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX.html) (128) bytes

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10888) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10888

If `format` is VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX, then
`dataSize` **must** be a multiple of
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX](VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX.html) (128) bytes

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10890) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10890

`pNext` **must** be `NULL` or a pointer to a valid
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) structure

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10891) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10891

If `pNext` is a pointer to a valid
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) structure, the
[`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-sType-sType) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DENSE_GEOMETRY_FORMAT_TRIANGLES_DATA_AMDX](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-parameter) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-parameter

 `compressedData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-parameter) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-parameter

 `format` **must** be a valid [VkCompressedTriangleFormatAMDX](VkCompressedTriangleFormatAMDX.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)

[VK_AMDX_dense_geometry_format](VK_AMDX_dense_geometry_format.html), [VkCompressedTriangleFormatAMDX](VkCompressedTriangleFormatAMDX.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
