# VkAccelerationStructureBuildSizesInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureBuildSizesInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureBuildSizesInfoKHR - Structure specifying build sizes for an acceleration structure

The `VkAccelerationStructureBuildSizesInfoKHR` structure describes the
required build sizes for an acceleration structure and scratch buffers and
is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureBuildSizesInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       accelerationStructureSize;
    VkDeviceSize       updateScratchSize;
    VkDeviceSize       buildScratchSize;
} VkAccelerationStructureBuildSizesInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureSize` is the size in bytes required in a
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) for a build or update operation.

* 
`updateScratchSize` is the size in bytes required in a scratch
buffer for an update operation.

* 
`buildScratchSize` is the size in bytes required in a scratch buffer
for a build operation.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureBuildSizesInfoKHR-sType-sType) VUID-VkAccelerationStructureBuildSizesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureBuildSizesInfoKHR-pNext-pNext) VUID-VkAccelerationStructureBuildSizesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html), [vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html), [vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureBuildSizesInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
