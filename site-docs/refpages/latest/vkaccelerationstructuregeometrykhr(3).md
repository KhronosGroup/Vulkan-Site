# VkAccelerationStructureGeometryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryKHR - Structure specifying geometries to be built into an acceleration structure

The `VkAccelerationStructureGeometryKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    VkGeometryTypeKHR                         geometryType;
    VkAccelerationStructureGeometryDataKHR    geometry;
    VkGeometryFlagsKHR                        flags;
} VkAccelerationStructureGeometryKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`geometryType` describes which type of geometry this
`VkAccelerationStructureGeometryKHR` refers to.

* 
`geometry` is a [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html) union
describing the geometry data for the relevant geometry type.

* 
`flags` is a bitmask of [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html) values
describing additional properties of how the geometry should be built.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-sType-sType) VUID-VkAccelerationStructureGeometryKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html), or [VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-sType-unique) VUID-VkAccelerationStructureGeometryKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureGeometryKHR-geometryType-parameter) VUID-VkAccelerationStructureGeometryKHR-geometryType-parameter

 `geometryType` **must** be a valid [VkGeometryTypeKHR](VkGeometryTypeKHR.html) value

* 
[](#VUID-VkAccelerationStructureGeometryKHR-triangles-parameter) VUID-VkAccelerationStructureGeometryKHR-triangles-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), the `triangles` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-aabbs-parameter) VUID-VkAccelerationStructureGeometryKHR-aabbs-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html), the `aabbs` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-instances-parameter) VUID-VkAccelerationStructureGeometryKHR-instances-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), the `instances` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-flags-parameter) VUID-VkAccelerationStructureGeometryKHR-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html) values

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html), [VkGeometryFlagsKHR](VkGeometryFlagsKHR.html), [VkGeometryTypeKHR](VkGeometryTypeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
