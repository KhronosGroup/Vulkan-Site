# VkClusterAccelerationStructureTriangleClusterInputNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureTriangleClusterInputNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureTriangleClusterInputNV - Parameters describing a cluster acceleration structure

The [VkClusterAccelerationStructureTriangleClusterInputNV](#) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureTriangleClusterInputNV {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           vertexFormat;
    uint32_t           maxGeometryIndexValue;
    uint32_t           maxClusterUniqueGeometryCount;
    uint32_t           maxClusterTriangleCount;
    uint32_t           maxClusterVertexCount;
    uint32_t           maxTotalTriangleCount;
    uint32_t           maxTotalVertexCount;
    uint32_t           minPositionTruncateBitCount;
} VkClusterAccelerationStructureTriangleClusterInputNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](VkFormat.html) of each vertex element.

* 
`maxGeometryIndexValue` is the maximum geometry index value for any
constructed geometry.

* 
`maxClusterUniqueGeometryCount` is the maximum number of unique
values of the geometry index for each cluster or cluster template.

* 
 `maxClusterTriangleCount` is the maximum
number of triangles in a cluster or cluster template.

* 
`maxClusterVertexCount` is the maximum number of unique vertices in
the cluster’s index buffer.

* 
`maxTotalTriangleCount` is the sum of all triangles across all
clusters or cluster templates.

* 
`maxTotalVertexCount` is the maximum number of vertices across all
clusters or cluster templates.

* 
 `minPositionTruncateBitCount`
is the least value specified in cluster build in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`positionTruncateBitCount`
or cluster template build in
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)::`positionTruncateBitCount`.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-10439) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-10439

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterTriangleCount-10440) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterTriangleCount-10440

`maxClusterTriangleCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxTrianglesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterVertexCount-10441) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterVertexCount-10441

`maxClusterVertexCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxVerticesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-minPositionTruncateBitCount-10442) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-minPositionTruncateBitCount-10442

`minPositionTruncateBitCount` **must** be less than or equal to `32`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-sType-sType) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_TRIANGLE_CLUSTER_INPUT_NV](VkStructureType.html)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-parameter) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](VkFormat.html) value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureTriangleClusterInputNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
