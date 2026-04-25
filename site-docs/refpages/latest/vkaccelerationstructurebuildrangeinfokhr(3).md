# VkAccelerationStructureBuildRangeInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureBuildRangeInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureBuildRangeInfoKHR - Structure specifying build offsets and counts for acceleration structure builds

`VkAccelerationStructureBuildRangeInfoKHR` is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureBuildRangeInfoKHR {
    uint32_t    primitiveCount;
    uint32_t    primitiveOffset;
    uint32_t    firstVertex;
    uint32_t    transformOffset;
} VkAccelerationStructureBuildRangeInfoKHR;

* 
`primitiveCount` defines the number of primitives for a
corresponding acceleration structure geometry.

* 
`primitiveOffset` defines an offset in bytes into the memory where
primitive data is defined.

* 
`firstVertex` is the index of the first vertex to build from for
triangle geometry.

* 
`transformOffset` defines an offset in bytes into the memory where a
transform matrix is defined.

The primitive count and primitive offset are interpreted differently
depending on the [VkGeometryTypeKHR](VkGeometryTypeKHR.html) used:

* 
For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`primitiveCount` is the number of triangles to be built, where each
triangle is treated as 3 vertices.

If the geometry uses indices, `primitiveCount` × 3
indices are consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices.

* 
If the geometry does not use indices, `primitiveCount` ×
3 vertices are consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexStride`
× `firstVertex`.

* 
If
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`transformData`
is not `NULL`, a single [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure is
consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`transformData`,
at an offset of `transformOffset`.
This matrix describes a transformation from the space in which the
vertices for all triangles in this geometry are described to the space
in which the acceleration structure is defined.

For geometries of type [VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html),
`primitiveCount` is the number of axis-aligned bounding boxes.
`primitiveCount` [VkAabbPositionsKHR](VkAabbPositionsKHR.html) structures are consumed
from [VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html)::`data`,
starting at an offset of `primitiveOffset`.

For geometries of type [VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
`primitiveCount` is the number of spheres to be built, where each
sphere is treated as 1 vertex.

* 
If the geometry uses indices, `primitiveCount` indices are consumed
from
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices and radii.

* 
If the geometry does not use indices, `primitiveCount` vertices and
radii are consumed from
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`vertexStride`
× `firstVertex` and
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`radiusData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`radiusStride`
× `firstVertex` respectively.

For geometries of type [VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
`primitiveCount` is the number of LSS primitives to be built, where
each LSS primitive is treated as 2 vertices.

* 
If the geometry uses indices, `primitiveCount` × 2
indices are consumed from
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices and radii.

* 
If the geometry does not use indices, `primitiveCount` ×
2 vertices and radii are consumed from
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`vertexStride`
× `firstVertex` and
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`radiusData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`radiusStride`
× `firstVertex` respectively.

For geometries of type [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html),
`primitiveCount` is the number of acceleration structures.
`primitiveCount` [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)
or [VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html)
structures are consumed from
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)::`data`,
starting at an offset of `primitiveOffset`.

Valid Usage

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-vertexData-10418) VUID-VkAccelerationStructureBuildRangeInfoKHR-vertexData-10418

The number of vertices consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexData`
**must** be less than or equal to
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`maxVertex`
+ 1

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03656) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03656

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the
geometry uses indices, the offset `primitiveOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`indexData`
**must** be a multiple of the element size of
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`indexType`

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03657) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03657

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the
geometry does not use indices, the offset `primitiveOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexData`
**must** be a multiple of:

the [size of the format](../../../../spec/latest/chapters/formats.html#formats) specified in
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexFormat`,
if that format is a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

* 
the [component size](../../../../spec/latest/chapters/formats.html#formats) of the
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexFormat`,
if that format is not a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-maxVertex-10774) VUID-VkAccelerationStructureBuildRangeInfoKHR-maxVertex-10774

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the
geometry uses indices, then
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`maxVertex`
**must** be greater than or equal to `firstVertex` plus the maximum
index value found in the
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`indexData`
in the range [`primitiveOffset`, `primitiveOffset`

`primitiveCount` x 3]

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-None-10775) VUID-VkAccelerationStructureBuildRangeInfoKHR-None-10775

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the
geometry does not use indices, then
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::maxVertex **must**
be greater than or equal to firstVertex + primitiveCount x 3 - 1

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-transformOffset-03658) VUID-VkAccelerationStructureBuildRangeInfoKHR-transformOffset-03658

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), the offset
`transformOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`transformData`
**must** be a multiple of 16

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03659) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03659

For geometries of type [VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html), the offset
`primitiveOffset` from
[VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html)::`data` **must** be a
multiple of 8

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03660) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03660

For geometries of type [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), the offset
`primitiveOffset` from
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)::`data` **must**
be a multiple of 16

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html), [vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureBuildRangeInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
