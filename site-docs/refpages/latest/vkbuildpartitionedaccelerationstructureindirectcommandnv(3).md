# VkBuildPartitionedAccelerationStructureIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuildPartitionedAccelerationStructureIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuildPartitionedAccelerationStructureIndirectCommandNV - Structure describing PTLAS operation to perform

The [VkBuildPartitionedAccelerationStructureIndirectCommandNV](#) structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkBuildPartitionedAccelerationStructureIndirectCommandNV {
    VkPartitionedAccelerationStructureOpTypeNV    opType;
    uint32_t                                      argCount;
    VkStridedDeviceAddressNV                      argData;
} VkBuildPartitionedAccelerationStructureIndirectCommandNV;

* 
`opType` is a [VkPartitionedAccelerationStructureOpTypeNV](VkPartitionedAccelerationStructureOpTypeNV.html)
describing the type of operation.

* 
`argCount` the number of structures in `argData` array.

* 
`argData` is an array of [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html) structures
containing the write or update data for instances and partitions in the
PTLAS.
The structure is dependent on `opType` as shown in the table below.

| `opType` | Format of `argData` |
| --- | --- |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV](VkPartitionedAccelerationStructureOpTypeNV.html) | [VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html) |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV](VkPartitionedAccelerationStructureOpTypeNV.html) | [VkPartitionedAccelerationStructureUpdateInstanceDataNV](VkPartitionedAccelerationStructureUpdateInstanceDataNV.html) |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV](VkPartitionedAccelerationStructureOpTypeNV.html) | [VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](VkPartitionedAccelerationStructureWritePartitionTranslationDataNV.html) |

Valid Usage

* 
[](#VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-argData-10565) VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-argData-10565

An instance index **must** not be referenced by more than one structure in
`argData`

Valid Usage (Implicit)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-opType-parameter) VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-opType-parameter

 `opType` **must** be a valid [VkPartitionedAccelerationStructureOpTypeNV](VkPartitionedAccelerationStructureOpTypeNV.html) value

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkPartitionedAccelerationStructureOpTypeNV](VkPartitionedAccelerationStructureOpTypeNV.html), [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkBuildPartitionedAccelerationStructureIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
