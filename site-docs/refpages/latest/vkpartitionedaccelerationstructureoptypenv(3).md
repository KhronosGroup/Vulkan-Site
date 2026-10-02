# VkPartitionedAccelerationStructureOpTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureOpTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureOpTypeNV - Enum providing the type of PTLAS operation to perform

Values which **can** be set in [VkPartitionedAccelerationStructureOpTypeNV](#)
are:

// Provided by VK_NV_partitioned_acceleration_structure
typedef enum VkPartitionedAccelerationStructureOpTypeNV {
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV = 0,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV = 1,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV = 2,
} VkPartitionedAccelerationStructureOpTypeNV;

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV](#) is
used to assign a transformed bottom level acceleration structure to an
instance and partition.
This is similar to [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html) that defines
the properties and transformations for a single instance in
non-partitioned TLAS.
Any partition that contains at least one of the affected instances will
have their internal acceleration structure rebuilt.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV](#)
specifies that an instance will be updated with a new bottom level
acceleration structure.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV](#)
specifies that a partition will be assigned a
[translation vector](../../../../spec/latest/chapters/accelstructures.html#ptlas-partition-translation).

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkBuildPartitionedAccelerationStructureIndirectCommandNV](VkBuildPartitionedAccelerationStructureIndirectCommandNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureOpTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
