# VkClusterAccelerationStructureOpInputNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureOpInputNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureOpInputNV - Union specifying cluster acceleration structure description

The `VkClusterAccelerationStructureOpInputNV` union is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef union VkClusterAccelerationStructureOpInputNV {
    VkClusterAccelerationStructureClustersBottomLevelInputNV*    pClustersBottomLevel;
    VkClusterAccelerationStructureTriangleClusterInputNV*        pTriangleClusters;
    VkClusterAccelerationStructureMoveObjectsInputNV*            pMoveObjects;
} VkClusterAccelerationStructureOpInputNV;

* 
`pClustersBottomLevel` is a
[VkClusterAccelerationStructureClustersBottomLevelInputNV](VkClusterAccelerationStructureClustersBottomLevelInputNV.html) structure
specifying an upper threshold on parameters to build multiple bottom
level acceleration structures from multiple cluster level acceleration
structures.

* 
`pTriangleClusters` is a
[VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html) structure
specifying an upper threshold on parameters to build a regular or
templated cluster acceleration structure.

* 
`pMoveObjects` is a
[VkClusterAccelerationStructureMoveObjectsInputNV](VkClusterAccelerationStructureMoveObjectsInputNV.html) structure
specifying an upper threshold on the number of bytes moved and the type
of acceleration structure being moved.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureClustersBottomLevelInputNV](VkClusterAccelerationStructureClustersBottomLevelInputNV.html), [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html), [VkClusterAccelerationStructureMoveObjectsInputNV](VkClusterAccelerationStructureMoveObjectsInputNV.html), [VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureOpInputNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
