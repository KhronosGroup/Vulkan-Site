# VkClusterAccelerationStructureGeometryFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureGeometryFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureGeometryFlagBitsNV - Bitmask specifying geometry flags for cluster acceleration structure

Bits which **can** be set in
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html)::`geometryFlags`,
specifying geometry flags for cluster acceleration structure, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureGeometryFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_CULL_DISABLE_BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_NO_DUPLICATE_ANYHIT_INVOCATION_BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_OPAQUE_BIT_NV = 0x00000004,
} VkClusterAccelerationStructureGeometryFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_CULL_DISABLE_BIT_NV](#)
disables face culling for this geometry.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_NO_DUPLICATE_ANYHIT_INVOCATION_BIT_NV](#)
specifies that the implementation **must** only call the any-hit shader a
single time for each primitive in this geometry.
If this bit is absent an implementation **may** invoke the any-hit shader
more than once for this geometry.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_OPAQUE_BIT_NV](#) specifies
that this geometry does not invoke the any-hit shaders even if present
in a hit group.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureGeometryFlagsNV](VkClusterAccelerationStructureGeometryFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureGeometryFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
