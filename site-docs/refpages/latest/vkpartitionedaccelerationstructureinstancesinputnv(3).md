# VkPartitionedAccelerationStructureInstancesInputNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPartitionedAccelerationStructureInstancesInputNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPartitionedAccelerationStructureInstancesInputNV - Parameters describing a PTLAS structure

The [VkPartitionedAccelerationStructureInstancesInputNV](#) structure is
defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureInstancesInputNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkBuildAccelerationStructureFlagsKHR    flags;
    uint32_t                                instanceCount;
    uint32_t                                maxInstancePerPartitionCount;
    uint32_t                                partitionCount;
    uint32_t                                maxInstanceInGlobalPartitionCount;
} VkPartitionedAccelerationStructureInstancesInputNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html)
specifying flags for the PTLAS build operation.

* 
`instanceCount` is the number of instances in this PTLAS.

* 
`maxInstancePerPartitionCount` is the maximum number of instances
per partition in the PTLAS.

* 
`partitionCount` is the number of partitions in the PTLAS.

* 
`maxInstanceInGlobalPartitionCount` is maximum number of instances
in the [global partition](../../../../spec/latest/chapters/accelstructures.html#ptlas-global-partition).

If the `pNext` chain includes a
[VkPartitionedAccelerationStructureFlagsNV](VkPartitionedAccelerationStructureFlagsNV.html) structure, then that
structure specifies additional flags for the PTLAS.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-partitionCount-10535) VUID-VkPartitionedAccelerationStructureInstancesInputNV-partitionCount-10535

The sum of `partitionCount` and
`maxInstanceInGlobalPartitionCount` **must** be less than or equal to
[VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV](VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV.html)::`maxPartitionCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-sType) VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCES_INPUT_NV](VkStructureType.html)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-pNext-pNext) VUID-VkPartitionedAccelerationStructureInstancesInputNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPartitionedAccelerationStructureFlagsNV](VkPartitionedAccelerationStructureFlagsNV.html)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-unique) VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-flags-parameter) VUID-VkPartitionedAccelerationStructureInstancesInputNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html) values

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html), [VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html), [VkStructureType](VkStructureType.html), [vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkPartitionedAccelerationStructureInstancesInputNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
