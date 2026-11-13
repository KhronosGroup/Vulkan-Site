# VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV - Parameters describing build operation for a bottom level cluster acceleration structure

The [VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](#)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV {
    uint32_t           clusterReferencesCount;
    uint32_t           clusterReferencesStride;
    VkDeviceAddress    clusterReferences;
} VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV;

* 
`clusterReferencesCount` is the number of clusters this bottom level
acceleration structure will be built from.

* 
`clusterReferencesStride` is the stride in `clusterReferences`.

* 
`clusterReferences` is the device memory containing the address of
the clusters.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10484) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10484

All cluster references in `clusterReferences` **must** be unique

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10485) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10485

`clusterReferences` **must** have at least `clusterReferencesCount`
values

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferencesStride-10486) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferencesStride-10486

`clusterReferencesStride` **must** be greater than or equal to 8

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-parameter) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-parameter

 `clusterReferences` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
