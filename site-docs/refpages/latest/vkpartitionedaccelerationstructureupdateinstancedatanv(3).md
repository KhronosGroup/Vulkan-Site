# VkPartitionedAccelerationStructureUpdateInstanceDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureUpdateInstanceDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureUpdateInstanceDataNV - Structure describing instance data to update in PTLAS

The [VkPartitionedAccelerationStructureUpdateInstanceDataNV](#) structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureUpdateInstanceDataNV {
    uint32_t           instanceIndex;
    uint32_t           instanceContributionToHitGroupIndex;
    VkDeviceAddress    accelerationStructure;
} VkPartitionedAccelerationStructureUpdateInstanceDataNV;

* 
`instanceIndex` is the index of the instance being updated.

* 
`instanceContributionToHitGroupIndex` is a 24-bit per instance value
added in the indexing into the shader binding table to fetch the hit
group to use.

* 
`accelerationStructure` is the device address of the bottom level
acceleration structure or a clustered bottom level acceleration
structure whose instance is being updated.
The instance is disabled if the device address is `0`.

If the instance was originally disabled by specifying a `0` in
[VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)::`accelerationStructure`,
it can not be updated to a new acceleration structure as the instance **may**
have been permanently disabled by the implementation.

To avoid a refit, the new acceleration structure **must** be within the
bounding box specified by
[VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)::`explicitAABB`
when the instance was first created.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceContributionToHitGroupIndex-10571) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceContributionToHitGroupIndex-10571

The most significant 8 bits of `instanceContributionToHitGroupIndex`
**must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-None-10572) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-None-10572

The instance **must** have either been created with flag
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](VkPartitionedAccelerationStructureInstanceFlagBitsNV.html)
or did not have an acceleration structure assigned with
[VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceIndex-10573) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceIndex-10573

`instanceIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`input.instanceCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-accelerationStructure-parameter) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid `VkDeviceAddress` value

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureUpdateInstanceDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
