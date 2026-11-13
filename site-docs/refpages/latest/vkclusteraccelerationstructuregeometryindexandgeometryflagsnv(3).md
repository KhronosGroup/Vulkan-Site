# VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV - Parameters describing geometry index and flags values for cluster acceleration structure

The [VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV {
    uint32_t    geometryIndex:24;
    uint32_t    reserved:5;
    uint32_t    geometryFlags:3;
} VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV;

* 
`geometryIndex` specifies the geometry index for all triangles in
the cluster acceleration structure.

* 
`reserved` is reserved for future use.

* 
`geometryFlags` is a bitmask of
[VkClusterAccelerationStructureGeometryFlagBitsNV](VkClusterAccelerationStructureGeometryFlagBitsNV.html) values describing
geometry flags for the cluster acceleration structure.

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is the following:

* 
`geometryIndex`, `reserved` and `mask` occupy the same
memory as if a single `uint32_t` was specified in their place

`geometryIndex` occupies the 24 least significant bits of that
memory

* 
`geometryFlags` occupies the 3 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV-reserved-10487) VUID-VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV-reserved-10487

`reserved` **must** be `0`

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html), [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
