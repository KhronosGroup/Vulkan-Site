# VkBuildPartitionedAccelerationStructureInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuildPartitionedAccelerationStructureInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuildPartitionedAccelerationStructureInfoNV - Structure describing build parameters for a PTLAS

The [VkBuildPartitionedAccelerationStructureInfoNV](#) structure is defined
as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkBuildPartitionedAccelerationStructureInfoNV {
    VkStructureType                                       sType;
    void*                                                 pNext;
    VkPartitionedAccelerationStructureInstancesInputNV    input;
    VkDeviceAddress                                       srcAccelerationStructureData;
    VkDeviceAddress                                       dstAccelerationStructureData;
    VkDeviceAddress                                       scratchData;
    VkDeviceAddress                                       srcInfos;
    VkDeviceAddress                                       srcInfosCount;
} VkBuildPartitionedAccelerationStructureInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`input` is a
[VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html) structure
describing the instance and partition count information in the PTLAS.

* 
`srcAccelerationStructureData` is `NULL` or an address of a
previously built PTLAS.
If non-`NULL`, the PTLAS stored at this address is used as a basis to
create new PTLAS.

* 
`dstAccelerationStructureData` is the address to store the built
PTLAS.

* 
`scratchData` is the device address of scratch memory that will be
used during PTLAS build.

* 
`srcInfos` is the device address of an array of
[VkBuildPartitionedAccelerationStructureIndirectCommandNV](VkBuildPartitionedAccelerationStructureIndirectCommandNV.html)
structures describing the type of operation to perform.

* 
`srcInfosCount` is a device address containing the size of
`srcInfos` array.

Members `srcAccelerationStructureData` and
`dstAccelerationStructureData` **may** be the same or different.
If they are the same, the update happens in-place.
Otherwise, the destination acceleration structure is updated and the source
is not modified.

Valid Usage

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10558) VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10558

If the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) is not
`0`, then `scratchData` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10559) VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10559

Memory at `scratchData` **must** be equal or larger than the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html)::`buildScratchSize`
value returned from
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) with the same
build parameters

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-10560) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-10560

If `srcAccelerationStructureData` is not `NULL`, it **must** have
previously been built as a PTLAS

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-10562) VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-10562

Memory at `dstAccelerationStructureData` **must** be equal or larger
than the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html)::`accelerationStructureSize`
value returned from
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) with the same
build parameters

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-10563) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-10563

`srcInfosCount` **must** be 4-byte aligned

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-10564) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-10564

Each element of `srcInfos` array **must** have a unique
[VkBuildPartitionedAccelerationStructureIndirectCommandNV](VkBuildPartitionedAccelerationStructureIndirectCommandNV.html)::`opType`

Valid Usage (Implicit)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-sType-sType) VUID-VkBuildPartitionedAccelerationStructureInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUILD_PARTITIONED_ACCELERATION_STRUCTURE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-pNext-pNext) VUID-VkBuildPartitionedAccelerationStructureInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-input-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-input-parameter

 `input` **must** be a valid [VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html) structure

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-parameter

 If `srcAccelerationStructureData` is not `0`, `srcAccelerationStructureData` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-parameter

 `dstAccelerationStructureData` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-parameter

 `srcInfos` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-parameter

 `srcInfosCount` **must** be a valid `VkDeviceAddress` value

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkDeviceAddress`, [VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html), [VkStructureType](VkStructureType.html), [vkCmdBuildPartitionedAccelerationStructuresNV](vkCmdBuildPartitionedAccelerationStructuresNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkBuildPartitionedAccelerationStructureInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
