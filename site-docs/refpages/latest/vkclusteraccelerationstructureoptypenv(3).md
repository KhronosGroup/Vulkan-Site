# VkClusterAccelerationStructureOpTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureOpTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureOpTypeNV - Enum providing the type of operation

Values which **can** be set in [VkClusterAccelerationStructureOpTypeNV](#)
are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureOpTypeNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV = 1,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV = 2,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV = 3,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV = 4,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV = 5,
} VkClusterAccelerationStructureOpTypeNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#)
specifies that a cluster acceleration structure, cluster acceleration
structure template or a bottom level acceleration structure built from
cluster acceleration structures will be moved.
If a cluster acceleration structure is moved, the bottom level cluster
acceleration structures containing it will have to be re-built.
If used with
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html), it
returns the size of existing cluster acceleration structures.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#)
specifies that bottom level cluster acceleration structures will be
built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#)
specifies that cluster acceleration structures will be built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#)
specifies that a template for cluster acceleration structure will be
built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#)
specifies that a template for a cluster acceleration structure will be
instantiated, resulting in a built cluster acceleration structure.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](#)
specifies that the vertex indices of the cluster template acceleration
structure will be fetched.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureOpTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
