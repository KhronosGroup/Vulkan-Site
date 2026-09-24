# vkCmdBuildAccelerationStructuresKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildAccelerationStructuresKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildAccelerationStructuresKHR - Build an acceleration structure

To build acceleration structures call:

// Provided by VK_KHR_acceleration_structure
void vkCmdBuildAccelerationStructuresKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkAccelerationStructureBuildGeometryInfoKHR* pInfos,
    const VkAccelerationStructureBuildRangeInfoKHR* const* ppBuildRangeInfos);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of acceleration structures to build.
It specifies the number of the `pInfos` structures and
`ppBuildRangeInfos` pointers that **must** be provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structures defining
the geometry used to build each acceleration structure.

* 
`ppBuildRangeInfos` is a pointer to an array of `infoCount`
pointers to arrays of [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html)
structures.
Each `ppBuildRangeInfos`[i] is a pointer to an array of
`pInfos`[i].`geometryCount`
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structures defining
dynamic offsets to the addresses where geometry data is stored, as
defined by `pInfos`[i].

The `vkCmdBuildAccelerationStructuresKHR` command provides the ability
to initiate multiple acceleration structures builds, however there is no
ordering or synchronization implied between any of the individual
acceleration structure builds.

|  | This means that an application **cannot** build a top-level acceleration
| --- | --- |
structure in the same [vkCmdBuildAccelerationStructuresKHR](#) call as the
associated bottom-level or instance acceleration structures are being built.
Similarly, the application **cannot** build a bottom-level acceleration
structure in the same [vkCmdBuildAccelerationStructuresKHR](#) call as the
associated micromaps are being built.
There also **cannot** be any memory aliasing between any acceleration structure
memories or scratch memories being used by any of the builds. |

The input buffers passed to this commands will be referenced by the
implementation for the duration of this command’s execution on the device.

After the command completes, the acceleration structure **may** hold a
reference to any acceleration structure specified by an active instance
contained therein.
Apart from this referencing, acceleration structures **must** be fully
self-contained.
Micromaps **must** always be fully-self-contained.

The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of future commands,
provided proper synchronization is used as described below.

|  | A [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structure is not used when
| --- | --- |
building an acceleration structure with any of the following geometry types,
and **must** be NULL:
  ** [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html)
  ** [VK_GEOMETRY_TYPE_MICROMAP_KHR](VkGeometryTypeKHR.html) |

|  | The required alignment of the device addresses passed in to parameters below
| --- | --- |
might not be provided by the base address of a [VkBuffer](VkBuffer.html) created with
the correct usage flags and must still be manually aligned by the
application code. |

Accesses to the acceleration structure scratch buffers as identified by the
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`scratchData` buffer
device addresses **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with
the [VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html)).
Accesses to each
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`srcAccelerationStructure`
and
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`dstAccelerationStructure`
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html), as appropriate.

Accesses to other input buffers as identified by any used values of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html)::`vertexData`,
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html)::`data`,
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html)::`triangleArray`,
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)::`compressedData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`vertexData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`indexData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`transformData`,
[VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html)::`data`, and
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)::`data` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_SHADER_READ_BIT](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-accelerationStructure-08923) VUID-vkCmdBuildAccelerationStructuresKHR-accelerationStructure-08923

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-11543) VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-11543

Each element of `ppBuildRangeInfos`[i] **must** be a valid pointer to
an array of `pInfos`[i].`geometryCount`
`VkAccelerationStructureBuildRangeInfoKHR` structures
if the `pInfos`[i].type is not one of:

[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html)

* 
[VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10906) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10906

For each element of `pInfos`[i] whose `pGeometries` or
`ppGeometries` members have a `geometryType` of
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html),
`ppBuildRangeInfos`[i] **must** be `NULL`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-11544) VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-11544

For each element of `pInfos`[i] whose `pGeometries` or
`ppGeometries` members have a `geometryType` of
[VK_GEOMETRY_TYPE_MICROMAP_KHR](VkGeometryTypeKHR.html), `ppBuildRangeInfos`[i] **must** be
`NULL`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-mode-11545) VUID-vkCmdBuildAccelerationStructuresKHR-mode-11545

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html), its
`mode` **must** equal
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](VkBuildAccelerationStructureModeKHR.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-11546) VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-11546

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html), its
`srcAccelerationStructure` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11547) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11547

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11548) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11548

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by any
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html)::`micromap`
member included in the `pNext` chain of any `geometry.triangles`
member of any element of `pGeometries` or `ppGeometries` in any
other element of `pInfos`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11549) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-11549

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html)::`micromap`
member included in the `pNext` chain of any `geometry.triangles`
member of any element of `pGeometries` or `ppGeometries` in any
other element of `pInfos`, which is accessed by this command

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11550) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11550

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, its `data` and `triangleArray` members **must**
be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11551) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11551

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, the buffers from which the buffer device addresses
for its `data` and `triangleArray` members are queried **must**
have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11552) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11552

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, its `data` and `triangleArray` members **must**
be a multiple of `128`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11553) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11553

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, each element of its `triangleArray` member **must**
specify an access within the range of the [VkBuffer](VkBuffer.html) that `data`
was retrieved from, given by [`dataOffset`, `dataOffset`

triangleSize] where triangleSize is calculated using its `format`
and `subdivisionLevel` members rounded up to the nearest byte

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11554) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11554

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, the range of [`triangleArray`,
`triangleArray` + (`triangleArrayStride` * numTriangles)] **must**
be within the range of the [VkBuffer](VkBuffer.html) from which the
`triangleArray` member was retrieved from, where *numTriangles* is
the sum of `count` of all elements of `pUsageCounts` or
`ppUsageCounts`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11555) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11555

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, each element of its `geometry.triangleArray`
member **must** have a `format` with a valid value from
[VkOpacityMicromapFormatKHR](VkOpacityMicromapFormatKHR.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11556) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11556

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, if it includes a
[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html) structure in its
`pNext` chain, for each element of its `triangleArray` member
with a `format` equal to
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR](VkOpacityMicromapFormatKHR.html), `subdivisionLevel`
**must** be less than or equal to
[    `maxOpacity2StateSubdivisionLevel`](../../../../spec/latest/chapters/limits.html#limits-maxOpacity2StateSubdivisionLevel)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11575) VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11575

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its `geometry.triangles`
member includes a
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) structure in
its `pNext` chain, the micromap’s `indexType` member is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), and `micromap` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), for each *index* in `indexBuffer`[*j*] greater
than zero where *j* is within the range [0, numTrianglesInGeometry -
1] where *numTrianglesInGeometry* is equal to
`ppBuildRangeInfos`[i]→primitiveCount, *index* plus
`baseTriangle` **must** be less than or equal to *numTriangles*, where
*numTriangles* is given by the sum of all `count` parameters in the
`pUsageCounts` or `ppUsageCounts` provided to the micromap’s
build command

[](#VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11577) VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11577

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its `geometry.triangles`
member includes a
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) structure in
its `pNext` chain, and the micromap’s `indexType` member is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), `indexBuffer`

(`indexStride` * numTrianglesInGeometry) **must** be within the range
of the [VkBuffer](VkBuffer.html) from which the `indexBuffer` device address
was obtained from where *numTrianglesInGeometry* is equal to
`ppBuildRangeInfos`[i]→primitiveCount

[](#VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11578) VUID-vkCmdBuildAccelerationStructuresKHR-indexBuffer-11578

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its `geometry.triangles`
member includes a
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) structure in
its `pNext` chain, the micromap’s `indexType` member is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), and `micromap` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), for each *index* in `indexBuffer`[*j*] where
*j* is within the range from [0, numTrianglesInGeometry - 1],
*index* **must** be a valid [VkOpacityMicromapSpecialIndexKHR](VkOpacityMicromapSpecialIndexKHR.html) value
where *numTrianglesInGeometry* is equal to
`ppBuildRangeInfos`[i]→primitiveCount

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-mode-04628) VUID-vkCmdBuildAccelerationStructuresKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) value

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-04629) VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-04630) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03708) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03708

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html),
`srcAccelerationStructure` **must** be fully backed by physical memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03403) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03403

The `srcAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03698) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03698

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03800) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03800

The `dstAccelerationStructure` member of any element of `pInfos`
**must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03707) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03707

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be fully backed by physical memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03699) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03700) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03663) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html),
[inactive primitives](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03664) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03709) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03709

For each element of `pInfos`, if an acceleration structure is
referenced by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), it **must** be fully backed by
physical memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-None-03407) VUID-vkCmdBuildAccelerationStructuresKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other
element of `pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03701) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), which is accessed
by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03702) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03702

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `dstAccelerationStructure` member of
any other element of `pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03703) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03703

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `scratchData` member of any element
of `pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-scratchData-03704) VUID-vkCmdBuildAccelerationStructuresKHR-scratchData-03704

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-scratchData-03705) VUID-vkCmdBuildAccelerationStructuresKHR-scratchData-03705

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `srcAccelerationStructure` member of any element
of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) (including the
same element), which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03706) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03667) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) set in
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags` in the
build

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03668) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), or
not have any [memory aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03758) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03759) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03760) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03761) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03762) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03763) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03764) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03765) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03766) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03767) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10898) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10898

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`numTriangles` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10899) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10899

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`numVertices` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10900) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10900

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`maxPrimitiveIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10901) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10901

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`maxGeometryIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10902) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10902

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`format` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10903) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10903

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`dataSize` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03768) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03768

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
then the value of each index referenced **must** be the same as the
corresponding index value when `srcAccelerationStructure` was last
built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-primitiveCount-03769) VUID-vkCmdBuildAccelerationStructuresKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, the
`primitiveCount` member of its corresponding
`VkAccelerationStructureBuildRangeInfoKHR` structure **must** have the
same value which was specified when `srcAccelerationStructure` was
last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03801) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03801

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), the corresponding
`ppBuildRangeInfos`[i][j].`primitiveCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxInstanceCount`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12258) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12258

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](VkBuildAccelerationStructureModeKHR.html), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12259) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12259

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-geometry-03673) VUID-vkCmdBuildAccelerationStructuresKHR-geometry-03673

The buffers from which the buffer device addresses for all of the
`geometry.triangles.vertexData`, `geometry.triangles.indexData`,
`geometry.triangles.transformData`, `geometry.aabbs.data`, and
`geometry.instances.data` members of all
`pInfos`[i].`pGeometries` and `pInfos`[i].`ppGeometries`
are queried **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12260) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12260

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), and the size
reported by `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12261) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12261

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](VkBuildAccelerationStructureModeKHR.html), and the size
reported by `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03710) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03710

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03804) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03804

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`geometry.triangles.vertexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03711) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03711

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`geometry.triangles.vertexData.deviceAddress` **must** be aligned to:

the [size of the format](../../../../spec/latest/chapters/formats.html#formats) specified in `vertexFormat`, in
bytes, if that format is a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

* 
the [component size](../../../../spec/latest/chapters/formats.html#formats) of the format specified in
`vertexFormat`, in bytes, if that format is not a [     packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03806) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03806

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`geometry.triangles.indexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03712) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03712

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and with
`geometry.triangles.indexType` not equal to
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`geometry.triangles.indexData.deviceAddress` **must** be aligned to the
size in bytes of the type in `indexType`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03808) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03808

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03810) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03810

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03811) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03811

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html),
`geometry.aabbs.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03714) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03714

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html),
`geometry.aabbs.data.deviceAddress` **must** be aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03715) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03715

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_FALSE](VK_FALSE.html), `geometry.instances.data.deviceAddress` **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03716) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03716

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_TRUE](VK_TRUE.html), `geometry.instances.data.deviceAddress` **must** be
aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03717) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03717

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_TRUE](VK_TRUE.html), each element of
`geometry.instances.data.deviceAddress` in device memory **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03813) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03813

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html),
`geometry.instances.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12281) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12281

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), each
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`accelerationStructureReference`
value in `geometry.instances.data.deviceAddress` **must** be `0` or a
value obtained from [vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html) for
a valid bottom level acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10607) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10607

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR](VkGeometryInstanceFlagBitsKHR.html) is set in
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`flags` then
`geometry.instances.data.deviceAddress` **must** refer to an
acceleration structure that was built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)
set in [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-09547) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-09547

`commandBuffer` **must** not be a protected command buffer

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11701) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11701

For any element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in the
`geometry.triangles.pNext` chain with a valid `micromap` member,
then the `micromap` member **must** have been constructed prior to this
command’s execution on the device

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11624) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11624

For any element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in the
`geometry.triangles.pNext` chain with a valid `micromap` member,
then the `micromap` member **must** have been built with a `type`
of [VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11625) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11625

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and the same geometry in the
original build of `srcAccelerationStructure` was built with an
instance of [VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in
its `geometry.triangles.pNext` chain with a valid `micromap`
member, then an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) **must** be
included in the in the `geometry.triangles.pNext` chain with a valid
`micromap` member

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11626) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11626

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and the same geometry in the
original build of `srcAccelerationStructure` was built with an
instance of [VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in
its `geometry.triangles.pNext` chain with its `micromap` member
equal to `VK_NULL_HANDLE`, then an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) **must** be
included in the in the `geometry.triangles.pNext` chain with its
`micromap` member equal to `VK_NULL_HANDLE`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11627) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11627

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and the same geometry in the
original build of `srcAccelerationStructure` was not built with an
instance of [VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in
its `geometry.triangles.pNext` chain, then an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) **must** not be
included in the in the `geometry.triangles.pNext` chain

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11628) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11628

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` was originally built without the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)
flag, and `srcAccelerationStructure` was constructed by
deserialization with [vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html),
then for each `VkAccelerationStructureGeometryKHR` structure
referred to by its `pGeometries` or `ppGeometries` members, if
`geometryType` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and the same
geometry in the original build of `srcAccelerationStructure` was
built with an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in its
`geometry.triangles.pNext` chain with a valid `micromap` member,
then an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) **must** be
included in the in the `geometry.triangles.pNext` chain with a
`micromap` that was deserialized from the serialized data of the
`micromap` in the original build of `srcAccelerationStructure`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11629) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11629

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` was originally built without
either the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
or
the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)
flags, and `srcAccelerationStructure` was not constructed by
deserialization with [vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html),
then for each `VkAccelerationStructureGeometryKHR` structure
referred to by its `pGeometries` or `ppGeometries` members, if
`geometryType` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and the same
geometry in the original build of `srcAccelerationStructure` was
built with an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) in its
`geometry.triangles.pNext` chain with a valid `micromap` member,
then an instance of
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html) **must** be
included in the in the `geometry.triangles.pNext` chain with the
same `micromap` handle as the original build

[](#VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11632) VUID-vkCmdBuildAccelerationStructuresKHR-micromap-11632

For any element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, then its `micromap` member
**must** have been constructed prior to this command’s execution on the
device

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10904) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10904

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10905) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10905

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11846) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11846

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11847) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11847

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11848) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11848

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11849) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11849

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11850) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11850

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11851) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11851

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its
`indexData.deviceAddress` **must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11852) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11852

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11853) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11853

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10126) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10126

For each `pInfos`[i], `dstAccelerationStructure` **must** have been
created with a value of
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`size` greater than or
equal to either:

the memory size required by the build operation, as returned by
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) with
`pBuildInfo` = `pInfos`[i] and with each element of the
`pMaxPrimitiveCounts` array greater than or equal to the equivalent
`ppBuildRangeInfos`[i][j].`primitiveCount` values for `j` in
[0,`pInfos`[i].`geometryCount`) or,

* 
the result of querying the corresponding
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), if
updating a compacted acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11845) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11845

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html) in the
`geometry.triangles.pNext` chain, then its
`vertexData.deviceAddress` **must** be a valid `VkDeviceAddress`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structures

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter

 `ppBuildRangeInfos` **must** be a valid pointer to an array of `infoCount` [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structures

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-recording) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-renderpass) VUID-vkCmdBuildAccelerationStructuresKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-suspended) VUID-vkCmdBuildAccelerationStructuresKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-videocoding) VUID-vkCmdBuildAccelerationStructuresKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-infoCount-arraylength) VUID-vkCmdBuildAccelerationStructuresKHR-infoCount-arraylength

 `infoCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildAccelerationStructuresKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdBuildAccelerationStructuresKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
