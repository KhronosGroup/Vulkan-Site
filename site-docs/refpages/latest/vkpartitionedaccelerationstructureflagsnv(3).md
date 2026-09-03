# VkPartitionedAccelerationStructureFlagsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureFlagsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureFlagsNV - Structure describing additional flags for PTLAS

The [VkPartitionedAccelerationStructureFlagsNV](#) structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureFlagsNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           enablePartitionTranslation;
} VkPartitionedAccelerationStructureFlagsNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enablePartitionTranslation` specifies if a
[partition translation](../../../../spec/latest/chapters/accelstructures.html#ptlas-partition-translation) **may** be applied
with
[VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](VkPartitionedAccelerationStructureWritePartitionTranslationDataNV.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureFlagsNV-sType-sType) VUID-VkPartitionedAccelerationStructureFlagsNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_FLAGS_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html)

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureFlagsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
