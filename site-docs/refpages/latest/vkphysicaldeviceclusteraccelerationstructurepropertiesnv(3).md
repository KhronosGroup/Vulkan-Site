# VkPhysicalDeviceClusterAccelerationStructurePropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceClusterAccelerationStructurePropertiesNV - Structure describing properties supported by a cluster acceleration structure implementation

The `VkPhysicalDeviceClusterAccelerationStructurePropertiesNV` structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkPhysicalDeviceClusterAccelerationStructurePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVerticesPerCluster;
    uint32_t           maxTrianglesPerCluster;
    uint32_t           clusterScratchByteAlignment;
    uint32_t           clusterByteAlignment;
    uint32_t           clusterTemplateByteAlignment;
    uint32_t           clusterBottomLevelByteAlignment;
    uint32_t           clusterTemplateBoundsByteAlignment;
    uint32_t           maxClusterGeometryIndex;
} VkPhysicalDeviceClusterAccelerationStructurePropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxVerticesPerCluster` indicates
the maximum number of unique vertices that **can** be specified in the
index buffer for a cluster.

* 
 `maxTrianglesPerCluster` indicates
the maximum number of triangles in a cluster.

* 
 `clusterScratchByteAlignment`
indicates the alignment required for scratch memory used in building or
moving cluster acceleration structures.

* 
 `clusterByteAlignment` indicates the
alignment of buffers when building cluster acceleration structures.

* 

`clusterTemplateByteAlignment` indicates the alignment of buffers
when building cluster templates.

* 

`clusterBottomLevelByteAlignment` indicates the alignment of buffers
when building bottom level acceleration structures.

* 

`clusterTemplateBoundsByteAlignment` indicates the alignment of
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)::`instantiationBoundingBoxLimit`.

* 
 `maxClusterGeometryIndex`
indicates the maximum geometry index possible for a triangle in an
cluster acceleration structures.

If the `VkPhysicalDeviceClusterAccelerationStructurePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterAccelerationStructurePropertiesNV-sType-sType) VUID-VkPhysicalDeviceClusterAccelerationStructurePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
