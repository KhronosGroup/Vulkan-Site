# VkClusterAccelerationStructureClusterFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureClusterFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureClusterFlagBitsNV - Bitmask specifying cluster acceleration structure flags

Bits which **can** be set in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`clusterFlags`,
specifying flags for clusters in an acceleration structure, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureClusterFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_CLUSTER_ALLOW_DISABLE_OPACITY_MICROMAPS_NV = 0x00000001,
} VkClusterAccelerationStructureClusterFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_CLUSTER_ALLOW_DISABLE_OPACITY_MICROMAPS_NV](#)
specifies that the specified cluster acceleration structure **may** be
referenced in an instance with
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkGeometryInstanceFlagBitsKHR.html) set.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureClusterFlagsNV](VkClusterAccelerationStructureClusterFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureClusterFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
