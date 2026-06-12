# VkPartitionedAccelerationStructureWriteInstanceDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureWriteInstanceDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureWriteInstanceDataNV - Structure describing instance data to write in PTLAS

The [VkPartitionedAccelerationStructureWriteInstanceDataNV](#) structure is
defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureWriteInstanceDataNV {
    VkTransformMatrixKHR                                 transform;
    float                                                explicitAABB[6];
    uint32_t                                             instanceID;
    uint32_t                                             instanceMask;
    uint32_t                                             instanceContributionToHitGroupIndex;
    VkPartitionedAccelerationStructureInstanceFlagsNV    instanceFlags;
    uint32_t                                             instanceIndex;
    uint32_t                                             partitionIndex;
    VkDeviceAddress                                      accelerationStructure;
} VkPartitionedAccelerationStructureWriteInstanceDataNV;

* 
`transform` is a [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure describing the
transformation to be applied to the instance in PTLAS.

* 
`explicitAABB` specifies an axis aligned bounding box representing
the maximum extent of any vertex within the used acceleration structure
after applying the instance-to-world transformation.
The [partition translation](../../../../spec/latest/chapters/accelstructures.html#ptlas-partition-translation) is not
applied to the bounding box.

* 
`instanceID` is a user specified constant assigned to an instance in
the PTLAS.

* 
`instanceMask` is a 8-bit mask assigned to the instance that **may** be
used to include or reject group of instances.

* 
`instanceContributionToHitGroupIndex` is a 24-bit per application
specified instance value added in the indexing into the shader binding
table to fetch the hit group to use.

* 
`instanceFlags` is a bitmask of
[VkPartitionedAccelerationStructureInstanceFlagsNV](VkPartitionedAccelerationStructureInstanceFlagsNV.html) specifying flags
an instance in the PTLAS.

* 
`instanceIndex` is the index of the instance within the PTLAS.

* 
`partitionIndex` is the index of the partition to which this
instance belongs.
[Global partitions](../../../../spec/latest/chapters/accelstructures.html#ptlas-global-partition) are referred to by
[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV.html).

* 
`accelerationStructure` is the device address of the bottom level
acceleration structure or a clustered bottom level acceleration
structure that is being instanced.
This instance is disabled if the device address is `0`.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceMask-10566) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceMask-10566

The most significant 24 bits of `instanceMask` **must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceContributionToHitGroupIndex-10567) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceContributionToHitGroupIndex-10567

The most significant 8 bits of `instanceContributionToHitGroupIndex`
**must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceIndex-10568) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceIndex-10568

`instanceIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`input.instanceCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-partitionIndex-10569) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-partitionIndex-10569

`partitionIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`input.partitionCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-explicitAABB-10570) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-explicitAABB-10570

`explicitAABB` **must** be a valid bounding box if instance was created
with flag
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](VkPartitionedAccelerationStructureInstanceFlagBitsNV.html)
set

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceFlags-parameter) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceFlags-parameter

 `instanceFlags` **must** be a valid combination of [VkPartitionedAccelerationStructureInstanceFlagBitsNV](VkPartitionedAccelerationStructureInstanceFlagBitsNV.html) values

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-accelerationStructure-parameter) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid `VkDeviceAddress` value

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkDeviceAddress`, [VkPartitionedAccelerationStructureInstanceFlagsNV](VkPartitionedAccelerationStructureInstanceFlagsNV.html), [VkTransformMatrixKHR](VkTransformMatrixKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureWriteInstanceDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
