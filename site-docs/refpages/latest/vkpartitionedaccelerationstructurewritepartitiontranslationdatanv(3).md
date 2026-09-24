# VkPartitionedAccelerationStructureWritePartitionTranslationDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureWritePartitionTranslationDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureWritePartitionTranslationDataNV - Structure describing partition translation data to write in PTLAS

The [VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](#)
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureWritePartitionTranslationDataNV {
    uint32_t    partitionIndex;
    float       partitionTranslation[3];
} VkPartitionedAccelerationStructureWritePartitionTranslationDataNV;

* 
`partitionIndex` is the index of partition to write.
[Global partition](../../../../spec/latest/chapters/accelstructures.html#ptlas-global-partition) is referred to by
[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV.html).

* 
`partitionTranslation` sets the [    translation vector](../../../../spec/latest/chapters/accelstructures.html#ptlas-partition-translation) for this partition.
When tracing this partition, the contained instances will behave as if
the partition translation was added to the translation component of the
instance transform.
This translation vector is also added to the instances in the partition
that had their bounding box specified.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-partitionIndex-10574) VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-partitionIndex-10574

`partitionIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`input.partitionCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-enablePartitionTranslation-10575) VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-enablePartitionTranslation-10575

The partitioned acceleration structure **must** have the
[VkPartitionedAccelerationStructureFlagsNV](VkPartitionedAccelerationStructureFlagsNV.html)::`enablePartitionTranslation`
flag set

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureWritePartitionTranslationDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
