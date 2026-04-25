# VkClusterAccelerationStructureGetTemplateIndicesInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureGetTemplateIndicesInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureGetTemplateIndicesInfoNV - Parameters describing addresses of cluster template acceleration structure whose index data is requested

The [VkClusterAccelerationStructureGetTemplateIndicesInfoNV](#) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureGetTemplateIndicesInfoNV {
    VkDeviceAddress    clusterTemplateAddress;
} VkClusterAccelerationStructureGetTemplateIndicesInfoNV;

* 
`clusterTemplateAddress` is the device address of the cluster
template acceleration structure whose index data is being fetched.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-10833) VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-10833

`clusterTemplateAddress` **must** be a
[template cluster acceleration    structure](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-clas-template)

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-parameter) VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-parameter

 `clusterTemplateAddress` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureGetTemplateIndicesInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
