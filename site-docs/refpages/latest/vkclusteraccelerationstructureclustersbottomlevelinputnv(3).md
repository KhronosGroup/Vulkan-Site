# VkClusterAccelerationStructureClustersBottomLevelInputNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureClustersBottomLevelInputNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureClustersBottomLevelInputNV - Parameters describing bottom level acceleration structure

The [VkClusterAccelerationStructureClustersBottomLevelInputNV](#) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureClustersBottomLevelInputNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTotalClusterCount;
    uint32_t           maxClusterCountPerAccelerationStructure;
} VkClusterAccelerationStructureClustersBottomLevelInputNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxTotalClusterCount` is the total number of clusters acceleration
structures that will be built or moved across all input arguments.

* 
`maxClusterCountPerAccelerationStructure` is the maximum number of
clusters acceleration structures that will be built or moved per input
argument.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-sType-sType) VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_CLUSTERS_BOTTOM_LEVEL_INPUT_NV](VkStructureType.html)

* 
[](#VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureClustersBottomLevelInputNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
