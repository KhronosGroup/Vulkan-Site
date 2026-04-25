# VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV - Parameters describing build operation for a template cluster acceleration structure

The [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV {
    uint32_t                                                         clusterID;
    VkClusterAccelerationStructureClusterFlagsNV                     clusterFlags;
    uint32_t                                                         triangleCount:9;
    uint32_t                                                         vertexCount:9;
    uint32_t                                                         positionTruncateBitCount:6;
    uint32_t                                                         indexType:4;
    uint32_t                                                         opacityMicromapIndexType:4;
    VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV    baseGeometryIndexAndGeometryFlags;
    uint16_t                                                         indexBufferStride;
    uint16_t                                                         vertexBufferStride;
    uint16_t                                                         geometryIndexAndFlagsBufferStride;
    uint16_t                                                         opacityMicromapIndexBufferStride;
    VkDeviceAddress                                                  indexBuffer;
    VkDeviceAddress                                                  vertexBuffer;
    VkDeviceAddress                                                  geometryIndexAndFlagsBuffer;
    VkDeviceAddress                                                  opacityMicromapArray;
    VkDeviceAddress                                                  opacityMicromapIndexBuffer;
    VkDeviceAddress                                                  instantiationBoundingBoxLimit;
} VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV;

* 
`clusterID` is a user specified identifier assigned to this cluster
template.

* 
`clusterFlags` is a bitmask of
[VkClusterAccelerationStructureClusterFlagBitsNV](VkClusterAccelerationStructureClusterFlagBitsNV.html) values describing
flags how the cluster template should be built.

* 
`triangleCount` is the number of triangles in this cluster.

* 
`vertexCount` is the number of unique vertices in this cluster.

* 
`positionTruncateBitCount` is the number of bits starting at the
lowest bit (i.e. the LSBs of the mantissa), of each vertex position that
will be truncated to zero to improve floating-point compression.

* 
`indexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](VkClusterAccelerationStructureIndexFormatFlagBitsNV.html) value
specifying the index type in `indexBuffer`.

* 
`opacityMicromapIndexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](VkClusterAccelerationStructureIndexFormatFlagBitsNV.html) value
specifying the index type in `opacityMicromapIndexBuffer`.

* 
`baseGeometryIndexAndGeometryFlags` is a
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html)
value specifying the base geometry index and flags for all triangles in
the cluster template.

* 
`indexBufferStride` is the stride in bytes in `indexBuffer`.

* 
`vertexBufferStride` is the stride in bytes in `vertexBuffer`.

* 
`geometryIndexAndFlagsBufferStride` is the stride in bytes in
`geometryIndexAndFlagsBuffer`.

* 
`opacityMicromapIndexBufferStride` is the stride in bytes in
`opacityMicromapIndexBuffer`.

* 
`indexBuffer` contains the indices of vertices in the cluster and is
of type `indexType`.

* 
`vertexBuffer` is either `0` or specifies the vertex data of the
triangles in the cluster template with format specified in
[VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)::`vertexFormat`.

* 
`geometryIndexAndFlagsBuffer` is either `0` or an address containing
strided
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html)
values specifying the geometry index and flag for every triangle in the
cluster.

* 
`opacityMicromapArray` is either `0` or specifies the address of a
valid opacity micromap array to reference from the cluster acceleration
structure.
If it is `0`, then opacity micromaps will be disabled for this cluster
acceleration structure.

* 
`opacityMicromapIndexBuffer` is either `0` or specifies the address
of a strided array with size equal to the number of triangles or indices
into the opacity micromap array.
If `opacityMicromapIndexBuffer` is `0` then the index used is the
index of the triangle in the geometry.

* 
`instantiationBoundingBoxLimit` is either `0` or specifies the
address of a bounding box within which all instantiated clusters **must**
lie.
The bounding box is specified by six 32-bit floating-point values in the
order MinX, MinY, MinZ, MaxX, MaxY, MaxZ.

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is the following:

* 
`triangleCount`, `vertexCount`, `positionTruncateBitCount`,
`indexType` and `opacityMicromapIndexType` occupy the same
memory as if a single `uint32_t` was specified in their place

`triangleCount` occupies the 9 least significant bits of that
memory

* 
`vertexCount` occupies the next 9 least significant bits of that
memory

* 
`positionTruncateBitCount` occupies the next 6 least significant
bits of that memory

* 
`indexType` occupies the next 4 least significant bits of that
memory

* 
`opacityMicromapIndexType` occupies the 4 most significant bits of
that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Cluster templates cannot be directly used to build bottom level acceleration
structures, instead, they **must** be instantiated into
[CLAS objects](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-clas-geometry).

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterID-10497) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterID-10497

`clusterID` **must** not be 0xFFFFFFFF

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-triangleCount-10498) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-triangleCount-10498

`triangleCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxTrianglesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexCount-10499) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexCount-10499

`vertexCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxVerticesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexType-10500) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexType-10500

`indexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexType-10501) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexType-10501

`opacityMicromapIndexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-positionTruncateBitCount-10502) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-positionTruncateBitCount-10502

`positionTruncateBitCount` **must** be greater than or equal to
[VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)::`minPositionTruncateBitCount`
and less than or equal to `32`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBufferStride-10503) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBufferStride-10503

`indexBufferStride` **must** be `0` or a multiple of `indexType`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBufferStride-10504) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBufferStride-10504

`vertexBufferStride` **must** be `0` or a multiple of value specified
in
[VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)::`vertexFormat`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-10505) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-10505

`instantiationBoundingBoxLimit` **must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`clusterTemplateBoundsByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-baseGeometryIndex-10506) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-baseGeometryIndex-10506

The maximum geometry index after using the values in
`baseGeometryIndex` and `geometryIndexBuffer` **must** be less than
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxClusterGeometryIndex`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-10882) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-10882

If `opacityMicromapArray` is not `0`, then the template cluster
acceleration structure **must** have been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)
flag set in [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterFlags-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterFlags-parameter

 `clusterFlags` **must** be a valid combination of [VkClusterAccelerationStructureClusterFlagBitsNV](VkClusterAccelerationStructureClusterFlagBitsNV.html) values

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBuffer-parameter

 `indexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBuffer-parameter

 If `vertexBuffer` is not `0`, `vertexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-geometryIndexAndFlagsBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-geometryIndexAndFlagsBuffer-parameter

 If `geometryIndexAndFlagsBuffer` is not `0`, `geometryIndexAndFlagsBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-parameter

 If `opacityMicromapArray` is not `0`, `opacityMicromapArray` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexBuffer-parameter

 If `opacityMicromapIndexBuffer` is not `0`, `opacityMicromapIndexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-parameter

 If `instantiationBoundingBoxLimit` is not `0`, `instantiationBoundingBoxLimit` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureClusterFlagsNV](VkClusterAccelerationStructureClusterFlagsNV.html), [VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
