# VkPartitionedAccelerationStructureInstanceFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureInstanceFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureInstanceFlagBitsNV - Bitmask specifying flags for PTLAS instances

Bits which **can** be set in
[VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)::`instanceFlags`,
specifying flags for instances, are:

// Provided by VK_NV_partitioned_acceleration_structure
typedef enum VkPartitionedAccelerationStructureInstanceFlagBitsNV {
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FACING_CULL_DISABLE_BIT_NV = 0x00000001,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FLIP_FACING_BIT_NV = 0x00000002,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_OPAQUE_BIT_NV = 0x00000004,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_NO_OPAQUE_BIT_NV = 0x00000008,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV = 0x00000010,
} VkPartitionedAccelerationStructureInstanceFlagBitsNV;

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FACING_CULL_DISABLE_BIT_NV](#)
disables face culling for this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FLIP_FACING_BIT_NV](#)
specifies that the [facing determination](../../../../spec/latest/chapters/raytraversal.html#ray-traversal-culling-face)
for geometry in this instance is inverted.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_OPAQUE_BIT_NV](#)
causes this instance to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](VkGeometryFlagBitsKHR.html)
were specified on all geometries referenced by this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_NO_OPAQUE_BIT_NV](#)
causes this instance to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](VkGeometryFlagBitsKHR.html)
were not specified on all geometries referenced by this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](#)
enables use of an explicit bounding box for this instance.

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkPartitionedAccelerationStructureInstanceFlagsNV](VkPartitionedAccelerationStructureInstanceFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureInstanceFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
