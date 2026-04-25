# VkClusterAccelerationStructureInputInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureInputInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureInputInfoNV - Structure describing a cluster acceleration structure

The [VkClusterAccelerationStructureInputInfoNV](#) structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureInputInfoNV {
    VkStructureType                            sType;
    void*                                      pNext;
    uint32_t                                   maxAccelerationStructureCount;
    VkBuildAccelerationStructureFlagsKHR       flags;
    VkClusterAccelerationStructureOpTypeNV     opType;
    VkClusterAccelerationStructureOpModeNV     opMode;
    VkClusterAccelerationStructureOpInputNV    opInput;
} VkClusterAccelerationStructureInputInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxAccelerationStructureCount` is the maximum number of
acceleration structures that will be provided to the multi indirect
operation.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html)
specifying flags for the multi indirect operation.

* 
`opType` is a [VkClusterAccelerationStructureOpTypeNV](VkClusterAccelerationStructureOpTypeNV.html) value
specifying the type of operation to perform.

* 
`opMode` is a [VkClusterAccelerationStructureOpModeNV](VkClusterAccelerationStructureOpModeNV.html) value
specifying the mode of operation.

* 
`opInput` is a [VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html) value
specifying the descriptions of the operation.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-sType-sType) VUID-VkClusterAccelerationStructureInputInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_INPUT_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pNext-pNext) VUID-VkClusterAccelerationStructureInputInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-flags-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html) values

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-opType-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-opType-parameter

 `opType` **must** be a valid [VkClusterAccelerationStructureOpTypeNV](VkClusterAccelerationStructureOpTypeNV.html) value

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-opMode-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-opMode-parameter

 `opMode` **must** be a valid [VkClusterAccelerationStructureOpModeNV](VkClusterAccelerationStructureOpModeNV.html) value

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pClustersBottomLevel-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pClustersBottomLevel-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](VkClusterAccelerationStructureOpTypeNV.html), the `pClustersBottomLevel` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureClustersBottomLevelInputNV](VkClusterAccelerationStructureClustersBottomLevelInputNV.html) structure

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pTriangleClusters-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pTriangleClusters-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html), [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](VkClusterAccelerationStructureOpTypeNV.html), [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html), or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](VkClusterAccelerationStructureOpTypeNV.html), the `pTriangleClusters` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html) structure

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pMoveObjects-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pMoveObjects-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html), the `pMoveObjects` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureMoveObjectsInputNV](VkClusterAccelerationStructureMoveObjectsInputNV.html) structure

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html), [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html), [VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html), [VkClusterAccelerationStructureOpModeNV](VkClusterAccelerationStructureOpModeNV.html), [VkClusterAccelerationStructureOpTypeNV](VkClusterAccelerationStructureOpTypeNV.html), [VkStructureType](VkStructureType.html), [vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureInputInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
