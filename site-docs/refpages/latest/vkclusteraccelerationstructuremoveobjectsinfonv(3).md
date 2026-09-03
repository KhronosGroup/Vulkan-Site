# VkClusterAccelerationStructureMoveObjectsInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureMoveObjectsInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureMoveObjectsInfoNV - Parameters describing move operation for a cluster acceleration structure

The [VkClusterAccelerationStructureMoveObjectsInfoNV](#) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureMoveObjectsInfoNV {
    VkDeviceAddress    srcAccelerationStructure;
} VkClusterAccelerationStructureMoveObjectsInfoNV;

* 
`srcAccelerationStructure` is the device address of the source
cluster acceleration structure that will be moved.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-10483) VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-10483

`srcAccelerationStructure` **must** be a type of [    cluster acceleration structure](../../../../spec/latest/chapters/accelstructures.html#cluster-geometry)

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-parameter) VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-parameter

 `srcAccelerationStructure` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureMoveObjectsInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
