# vkGetPartitionedAccelerationStructuresBuildSizesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPartitionedAccelerationStructuresBuildSizesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPartitionedAccelerationStructuresBuildSizesNV - Retrieve the buffer allocation requirements for partitioned acceleration structure command

To determine the memory requirements for a PTAS, call:

// Provided by VK_NV_partitioned_acceleration_structure
void vkGetPartitionedAccelerationStructuresBuildSizesNV(
    VkDevice                                    device,
    const VkPartitionedAccelerationStructureInstancesInputNV* pInfo,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that owns the acceleration structure.

* 
`pInfo` is a pointer to a
[VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html) structure
containing parameters required for the memory requirements query.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure which returns
the size required for an acceleration structure and the sizes required
for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

Valid Usage

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-partitionedAccelerationStructure-10534) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-partitionedAccelerationStructure-10534

The [    `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`::`partitionedAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-partitionedAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-device-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pInfo-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html) structure

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pSizeInfo-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html), [VkDevice](VkDevice.html), [VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkGetPartitionedAccelerationStructuresBuildSizesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
