# VkClusterAccelerationStructureInstantiateClusterInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureInstantiateClusterInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureInstantiateClusterInfoNV - Parameters describing instantiate operation for a template cluster acceleration structure

The [VkClusterAccelerationStructureInstantiateClusterInfoNV](#) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureInstantiateClusterInfoNV {
    uint32_t                    clusterIdOffset;
    uint32_t                    geometryIndexOffset:24;
    uint32_t                    reserved:8;
    VkDeviceAddress             clusterTemplateAddress;
    VkStridedDeviceAddressNV    vertexBuffer;
} VkClusterAccelerationStructureInstantiateClusterInfoNV;

* 
`clusterIdOffset` is an unsigned offset applied to the
`clusterID` value stored in the cluster template.

* 
`geometryIndexOffset` is a signed offset applied to the geometry
index of each triangle.

* 
`reserved` is reserved for future use.

* 
`clusterTemplateAddress` is the address of a previously built
cluster template.

* 
`vertexBuffer` is a [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html) structure
containing the vertex data for the indexed triangles stored in the
cluster template.
If the address in [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html) is `0` the vertex data
is sourced from the cluster template.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10507) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10507

`vertexBuffer` **must** not be `0` if the template was built without
vertex data

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10508) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10508

The format in `vertexBuffer` **must** match the original format
specified in [VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-reserved-10509) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-reserved-10509

`reserved` **must** be `0`

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-geometryIndexOffset-10510) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-geometryIndexOffset-10510

The maximum geometry index after using the value in
`geometryIndexOffset` **must** be less than
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`maxClusterGeometryIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-clusterTemplateAddress-parameter) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-clusterTemplateAddress-parameter

 `clusterTemplateAddress` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkDeviceAddress`, [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureInstantiateClusterInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
