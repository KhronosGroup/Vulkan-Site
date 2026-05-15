# VkAccelerationStructureGeometryMotionTrianglesDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryMotionTrianglesDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryMotionTrianglesDataNV - Structure specifying vertex motion in a bottom-level acceleration structure

The `VkAccelerationStructureGeometryMotionTrianglesDataNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureGeometryMotionTrianglesDataNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    vertexData;
} VkAccelerationStructureGeometryMotionTrianglesDataNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexData` is a pointer to vertex data for this geometry at time
1.0

If `VkAccelerationStructureGeometryMotionTrianglesDataNV` is included in
the `pNext` chain of a
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) structure, the basic
vertex positions are used for the position of the triangles in the geometry
at time 0.0 and the `vertexData` in
`VkAccelerationStructureGeometryMotionTrianglesDataNV` is used for the
vertex positions at time 1.0, with positions linearly interpolated at
intermediate times.

Indexing for `VkAccelerationStructureGeometryMotionTrianglesDataNV`
`vertexData` is equivalent to the basic vertex position data.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryMotionTrianglesDataNV-sType-sType) VUID-VkAccelerationStructureGeometryMotionTrianglesDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MOTION_TRIANGLES_DATA_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryMotionTrianglesDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
