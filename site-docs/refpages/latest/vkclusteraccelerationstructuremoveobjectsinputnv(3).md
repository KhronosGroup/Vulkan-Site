# VkClusterAccelerationStructureMoveObjectsInputNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureMoveObjectsInputNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureMoveObjectsInputNV - Parameters describing move information for an acceleration structure

The [VkClusterAccelerationStructureMoveObjectsInputNV](#) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureMoveObjectsInputNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkClusterAccelerationStructureTypeNV    type;
    VkBool32                                noMoveOverlap;
    VkDeviceSize                            maxMovedBytes;
} VkClusterAccelerationStructureMoveObjectsInputNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkClusterAccelerationStructureTypeNV](VkClusterAccelerationStructureTypeNV.html) value
identifying the type of cluster acceleration structure.

* 
`noMoveOverlap` specifies if the source and destination cluster
acceleration structures overlap in memory for the move operation.
If set to [VK_TRUE](VK_TRUE.html), the source cluster acceleration structure
remains valid after the move and move operation acts like a copy.

* 
`maxMovedBytes` is the maximum number of bytes that **may** be moved in
this operation.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-sType-sType) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_MOVE_OBJECTS_INPUT_NV](VkStructureType.html)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-type-parameter) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-type-parameter

 `type` **must** be a valid [VkClusterAccelerationStructureTypeNV](VkClusterAccelerationStructureTypeNV.html) value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkBool32`, [VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html), [VkClusterAccelerationStructureTypeNV](VkClusterAccelerationStructureTypeNV.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureMoveObjectsInputNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
