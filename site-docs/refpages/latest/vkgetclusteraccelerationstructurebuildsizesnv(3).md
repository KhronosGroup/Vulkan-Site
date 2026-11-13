# vkGetClusterAccelerationStructureBuildSizesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetClusterAccelerationStructureBuildSizesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetClusterAccelerationStructureBuildSizesNV - Retrieve the buffer allocation requirements for cluster geometry command

These cluster acceleration structures **can** be built or moved by a single
versatile multi-indirect function
[vkCmdBuildClusterAccelerationStructureIndirectNV](vkCmdBuildClusterAccelerationStructureIndirectNV.html).
To determine the memory requirements for executing this function, call:

// Provided by VK_NV_cluster_acceleration_structure
void vkGetClusterAccelerationStructureBuildSizesNV(
    VkDevice                                    device,
    const VkClusterAccelerationStructureInputInfoNV* pInfo,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that owns the acceleration structure.

* 
`pInfo` is a pointer to a
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html) structure containing
parameters required for the memory requirements query.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure which returns
the size required for an acceleration structure and scratch buffer,
given the build parameters.
The size requirements for a scratch buffer **may** be zero.

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
acceleration structure and scratch memory sizes are returned for all
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`maxAccelerationStructureCount`
acceleration structures.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
scratch memory size for all
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`maxAccelerationStructureCount`
acceleration structures and the acceleration structure memory size for a
single acceleration structure is returned.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html), only
scratch memory size is returned for the requested acceleration structures.

Valid Usage

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-clusterAccelerationStructure-10438) VUID-vkGetClusterAccelerationStructureBuildSizesNV-clusterAccelerationStructure-10438

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-device-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-pInfo-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html) structure

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-pSizeInfo-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html), [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkGetClusterAccelerationStructureBuildSizesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
