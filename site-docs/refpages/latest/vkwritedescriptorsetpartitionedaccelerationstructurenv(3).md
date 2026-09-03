# VkWriteDescriptorSetPartitionedAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteDescriptorSetPartitionedAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteDescriptorSetPartitionedAccelerationStructureNV - Structure specifying descriptor for PTLAS

If the `descriptorType` member of [VkWriteDescriptorSet](VkWriteDescriptorSet.html) is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html), then the
data to write to the descriptor set is specified through a
`VkWriteDescriptorSetPartitionedAccelerationStructureNV` structure
included in the `pNext` chain of `VkWriteDescriptorSet`.

The `VkWriteDescriptorSetPartitionedAccelerationStructureNV` structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkWriteDescriptorSetPartitionedAccelerationStructureNV {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  accelerationStructureCount;
    const VkDeviceAddress*    pAccelerationStructures;
} VkWriteDescriptorSetPartitionedAccelerationStructureNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureCount` is the number of elements in
`pAccelerationStructures`.

* 
`pAccelerationStructures` is a pointer to an array of
`accelerationStructureCount` device addresses pointing to previously
built PTLAS.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-10511) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-10511

`accelerationStructureCount` **must** be equal to `descriptorCount`
in the extended structure

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-10512) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-10512

Each entry in `pAccelerationStructures` **must** be a valid address of
a PTLAS

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-sType-sType) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkStructureType.html)

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) `VkDeviceAddress` values

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkDeviceAddress`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkWriteDescriptorSetPartitionedAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
