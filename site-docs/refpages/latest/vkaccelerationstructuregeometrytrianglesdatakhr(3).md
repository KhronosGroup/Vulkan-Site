# VkAccelerationStructureGeometryTrianglesDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryTrianglesDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryTrianglesDataKHR - Structure specifying a triangle geometry in a bottom-level acceleration structure

The `VkAccelerationStructureGeometryTrianglesDataKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryTrianglesDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkFormat                         vertexFormat;
    VkDeviceOrHostAddressConstKHR    vertexData;
    VkDeviceSize                     vertexStride;
    uint32_t                         maxVertex;
    VkIndexType                      indexType;
    VkDeviceOrHostAddressConstKHR    indexData;
    VkDeviceOrHostAddressConstKHR    transformData;
} VkAccelerationStructureGeometryTrianglesDataKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](VkFormat.html) of each vertex element.

* 
`vertexData` is a device or host address of memory containing vertex
data for this geometry.

* 
`vertexStride` is the stride in bytes between each vertex.

* 
`maxVertex` is the number of vertices in `vertexData` minus one.

* 
`indexType` is the [VkIndexType](VkIndexType.html) of each index element.

* 
`indexData` is a device or host address of memory containing index
data for this geometry.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html) it **must** be `NULL`.

* 
`transformData` is a device or host address to memory containing an
optional reference to a [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure describing
a transformation from the space in which the vertices in this geometry
are described to the space in which the acceleration structure is
defined.

|  | Unlike the stride for vertex buffers in
| --- | --- |
[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) for graphics pipelines which must not
exceed `maxVertexInputBindingStride`, `vertexStride` for
acceleration structure geometry is instead restricted to being a 32-bit
value. |

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03735) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03735

`vertexStride` **must** be a multiple of the size in bytes of the
smallest component of `vertexFormat`

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03819) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03819

`vertexStride` **must** be less than or equal to 232-1

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-03797) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-03797

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-03798) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-03798

`indexType` **must** be [VK_INDEX_TYPE_UINT16](VkIndexType.html),
[VK_INDEX_TYPE_UINT32](VkIndexType.html), or [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_TRIANGLES_DATA_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), or [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-unique) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-parameter) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-parameter) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkFormat](VkFormat.html), [VkIndexType](VkIndexType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryTrianglesDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
