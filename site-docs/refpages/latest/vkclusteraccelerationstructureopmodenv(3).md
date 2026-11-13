# VkClusterAccelerationStructureOpModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureOpModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureOpModeNV - Enum providing the mode of operation

Values which **can** be set in [VkClusterAccelerationStructureOpModeNV](#)
are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureOpModeNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV = 1,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV = 2,
} VkClusterAccelerationStructureOpModeNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#)
specifies that the build or move operation will implicitly distribute
built or compacted cluster acceleration structures starting at the
address provided in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`.
If a move operation is being performed, the acceleration structures will
be tightly compacted.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#)
specifies that the build or move operation will explicitly write built
or compacted cluster acceleration structures in the array of addresses
provided in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#)
specifies that computed cluster acceleration structure sizes will be
written to
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstSizesArray`.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureOpModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
