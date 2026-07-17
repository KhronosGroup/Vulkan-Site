# VkClusterAccelerationStructureCommandsInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureCommandsInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureCommandsInfoNV - Structure describing parameters for building for moving an acceleration structure

The [VkClusterAccelerationStructureCommandsInfoNV](#) structure is defined
as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureCommandsInfoNV {
    VkStructureType                                           sType;
    void*                                                     pNext;
    VkClusterAccelerationStructureInputInfoNV                 input;
    VkDeviceAddress                                           dstImplicitData;
    VkDeviceAddress                                           scratchData;
    VkStridedDeviceAddressRegionKHR                           dstAddressesArray;
    VkStridedDeviceAddressRegionKHR                           dstSizesArray;
    VkStridedDeviceAddressRegionKHR                           srcInfosArray;
    VkDeviceAddress                                           srcInfosCount;
    VkClusterAccelerationStructureAddressResolutionFlagsNV    addressResolutionFlags;
} VkClusterAccelerationStructureCommandsInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`input` is [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html) structure
describing the build or move parameters for the cluster acceleration
structure.

* 
`dstImplicitData` is the device address for memory where the
implicit build of cluster acceleration structure will be saved.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html)
or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html),
this value is ignored.

* 
`scratchData` is the device address of scratch memory that will be
used during cluster acceleration structure move or build.

* 
`dstAddressesArray` is a [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html) that
specifies addresses and stride for moved or built cluster acceleration
structures, depending on the value of
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode`.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html)
and [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html)::`deviceAddress` is not
`0`, then the implementation writes the cluster addresses to the
specified region.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
the implementation reads the cluster addresses from the specified
region.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html), this
member is ignored.

* 
`dstSizesArray` is a [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html)
containing sizes of moved or built cluster acceleration structures.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html)
or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html),
then the sizes are saved.
If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
then the sizes are read from.

* 
`srcInfosArray` is a [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html) where
input data for the build or move operation is read from.
If the stride is `0`, the structures are assumed to be packed tightly.
Its format is dependent on
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opType` as per the
table below.

| `input.opType` | Format of `srcInfosArray` |
| --- | --- |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureMoveObjectsInfoNV](VkClusterAccelerationStructureMoveObjectsInfoNV.html) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV.html) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureInstantiateClusterInfoNV](VkClusterAccelerationStructureInstantiateClusterInfoNV.html) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](VkClusterAccelerationStructureOpTypeNV.html) | [VkClusterAccelerationStructureGetTemplateIndicesInfoNV](VkClusterAccelerationStructureGetTemplateIndicesInfoNV.html) |

* 
`srcInfosCount` is the device address of memory containing the count
of number of build or move operations to perform.
The actual value is the minimum of this value and the value specified in
`input.maxAccelerationStructureCount`.
If this value is `0`, the count is determined by
`input.maxAccelerationStructureCount` alone.

* 
`addressResolutionFlags` is a bitmask of
[VkClusterAccelerationStructureAddressResolutionFlagBitsNV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html) values
specifying how an implementation will interpret the device addresses in
this structure.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12309) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12309

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12310) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12310

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html)
and `input.opType` is not
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html), the
memory in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html)
**must** be equal to or larger than the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html)::`accelerationStructureSize`
value returned from [vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html)
with same input parameters

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12311) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12311

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html)
and `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html), the
memory in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be equal to or larger than the sum of all the built acceleration
structures that are being moved

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-10469) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-10469

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html), the
total memory moved **must** not be larger than the size provided in
[VkClusterAccelerationStructureMoveObjectsInputNV](VkClusterAccelerationStructureMoveObjectsInputNV.html)::`maxMovedBytes`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12312) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12312

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](VkClusterAccelerationStructureOpModeNV.html),
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstSizesArray`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstSizesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12313) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12313

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
the address in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12314) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12314

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
the addresses in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be large enough to accommodate built or moved clusters

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12315) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12315

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
the buffers in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the buffers indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** not overlap

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12316) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12316

If [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](VkClusterAccelerationStructureOpModeNV.html),
the addresses in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned based on the cluster acceleration structure type and
its alignment properties as described in
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-dstAddressesArray-10474) VUID-VkClusterAccelerationStructureCommandsInfoNV-dstAddressesArray-10474

The stride in `dstAddressesArray` **must** be greater than or equal to
8

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-dstSizesArray-10475) VUID-VkClusterAccelerationStructureCommandsInfoNV-dstSizesArray-10475

The stride in `dstSizesArray` **must** be greater than or equal to 4

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosArray-10476) VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosArray-10476

The stride in `srcInfosArray` **must** be greater than the type of
structure the address is describing

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12317) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12317

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`clusterByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12318) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12318

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](VkClusterAccelerationStructureOpTypeNV.html),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`clusterTemplateByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12319) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12319

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`clusterByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-12320) VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-12320

[VkClusterAccelerationStructureCommandsInfoNV](#)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)::`clusterScratchByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-buildScratchSize-12321) VUID-VkClusterAccelerationStructureCommandsInfoNV-buildScratchSize-12321

If the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html) is not `0`,
then
[VkClusterAccelerationStructureCommandsInfoNV](#)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-12322) VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-12322

[VkClusterAccelerationStructureCommandsInfoNV](#)::`srcInfosCount`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`srcInfosCount`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be 4-byte aligned

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12323) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12323

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](VkClusterAccelerationStructureOpTypeNV.html),
the total and per argument number of cluster acceleration structures
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`srcInfosArray`,
or the structures indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#)::`srcInfosArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be equal or less than the maximum values with which memory
requirements were queried in
[vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html) with
[VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html)::`pClustersBottomLevel`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-sType-sType) VUID-VkClusterAccelerationStructureCommandsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_COMMANDS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-pNext-pNext) VUID-VkClusterAccelerationStructureCommandsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-parameter

 `input` **must** be a valid [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html) structure

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-dstImplicitData-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-dstImplicitData-parameter

 If `dstImplicitData` is not `0`, `dstImplicitData` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-parameter

 `scratchData` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-parameter

 If `srcInfosCount` is not `0`, `srcInfosCount` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-addressResolutionFlags-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-addressResolutionFlags-parameter

 `addressResolutionFlags` **must** be a valid combination of [VkClusterAccelerationStructureAddressResolutionFlagBitsNV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html) values

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureAddressResolutionFlagsNV](VkClusterAccelerationStructureAddressResolutionFlagsNV.html), [VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html), `VkDeviceAddress`, [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html), [VkStructureType](VkStructureType.html), [vkCmdBuildClusterAccelerationStructureIndirectNV](vkCmdBuildClusterAccelerationStructureIndirectNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureCommandsInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
