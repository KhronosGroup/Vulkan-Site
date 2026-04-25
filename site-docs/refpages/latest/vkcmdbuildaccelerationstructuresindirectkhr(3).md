# vkCmdBuildAccelerationStructuresIndirectKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildAccelerationStructuresIndirectKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildAccelerationStructuresIndirectKHR - Build an acceleration structure with some parameters provided on the device

To build acceleration structures with some parameters sourced on the device
call:

// Provided by VK_KHR_acceleration_structure
void vkCmdBuildAccelerationStructuresIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkAccelerationStructureBuildGeometryInfoKHR* pInfos,
    const VkDeviceAddress*                      pIndirectDeviceAddresses,
    const uint32_t*                             pIndirectStrides,
    const uint32_t* const*                      ppMaxPrimitiveCounts);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of acceleration structures to build.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structures defining
the geometry used to build each acceleration structure.

* 
`pIndirectDeviceAddresses` is a pointer to an array of
`infoCount` buffer device addresses which point to
`pInfos`[i].`geometryCount`
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structures defining
dynamic offsets to the addresses where geometry data is stored, as
defined by `pInfos`[i].

* 
`pIndirectStrides` is a pointer to an array of `infoCount` byte
strides between elements of `pIndirectDeviceAddresses`.

* 
`ppMaxPrimitiveCounts` is a pointer to an array of `infoCount`
pointers to arrays of `pInfos`[i].`geometryCount` values
indicating the maximum number of primitives that will be built by this
command for each geometry.

Accesses to acceleration structures, scratch buffers, vertex buffers, index
buffers, and instance buffers **must** be synchronized as with
[vkCmdBuildAccelerationStructuresKHR](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-scratch).

Accesses to any element of `pIndirectDeviceAddresses` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-accelerationStructureIndirectBuild-03650) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-accelerationStructureIndirectBuild-03650

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureIndirectBuild`](../../../../spec/latest/chapters/features.html#features-accelerationStructureIndirectBuild)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-mode-04628) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) value

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-srcAccelerationStructure-04629) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-04630) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03403) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03403

The `srcAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03698) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03698

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03800) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03800

The `dstAccelerationStructure` member of any element of `pInfos`
**must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03699) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03700) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03663) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html),
[inactive primitives](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03664) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-None-03407) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other
element of `pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03701) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), which is accessed
by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03702) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03702

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `dstAccelerationStructure` member of
any other element of `pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03703) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03703

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `scratchData` member of any element
of `pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-scratchData-03704) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-scratchData-03704

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-scratchData-03705) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-scratchData-03705

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `srcAccelerationStructure` member of any element
of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) (including the
same element), which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03706) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03667) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) set in
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags` in the
build

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03668) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), or
not have any [memory aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03758) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03759) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03760) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03761) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03762) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03763) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03764) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03765) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03766) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03767) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10898) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10898

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10899) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10899

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10900) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10900

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10901) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10901

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10902) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10902

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10903) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10903

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03768) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03768

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-primitiveCount-03769) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, the
`primitiveCount` member of its corresponding
`VkAccelerationStructureBuildRangeInfoKHR` structure **must** have the
same value which was specified when `srcAccelerationStructure` was
last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03801) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03801

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), the corresponding
`ppMaxPrimitiveCounts`[i][j] **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxInstanceCount`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03707) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03707

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03708) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03708

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03709) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03709

For each element of `pInfos`, if an acceleration structure is
referenced by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), it **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12258) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12258

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12259) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12259

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-geometry-03673) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-geometry-03673

The buffers from which the buffer device addresses for all of the
`geometry.triangles.vertexData`, `geometry.triangles.indexData`,
`geometry.triangles.transformData`, `geometry.aabbs.data`, and
`geometry.instances.data` members of all
`pInfos`[i].`pGeometries` and `pInfos`[i].`ppGeometries`
are queried **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12260) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12260

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12261) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12261

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
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03710) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03710

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03804) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03804

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`geometry.triangles.vertexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03711) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03711

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`geometry.triangles.vertexData.deviceAddress` **must** be aligned to:

the [size of the format](../../../../spec/latest/chapters/formats.html#formats) specified in `vertexFormat`, in
bytes, if that format is a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

* 
the [component size](../../../../spec/latest/chapters/formats.html#formats) of the format specified in
`vertexFormat`, in bytes, if that format is not a [     packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03806) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03806

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`geometry.triangles.indexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03712) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03712

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), and with
`geometry.triangles.indexType` not equal to
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`geometry.triangles.indexData.deviceAddress` **must** be aligned to the
size in bytes of the type in `indexType`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03808) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03808

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03810) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03810

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03811) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03811

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html),
`geometry.aabbs.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03714) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03714

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html),
`geometry.aabbs.data.deviceAddress` **must** be aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03715) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03715

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_FALSE](VK_FALSE.html), `geometry.instances.data.deviceAddress` **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03716) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03716

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_TRUE](VK_TRUE.html), `geometry.instances.data.deviceAddress` **must** be
aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03717) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03717

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if `geometry.arrayOfPointers`
is [VK_TRUE](VK_TRUE.html), each element of
`geometry.instances.data.deviceAddress` in device memory **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03813) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03813

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html),
`geometry.instances.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12281) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12281

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), each
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`accelerationStructureReference`
value in `geometry.instances.data.deviceAddress` **must** be `0` or a
value obtained from [vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html) for
a valid bottom level acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10607) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10607

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), if
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkGeometryInstanceFlagBitsKHR.html) is set in
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`flags` then
`geometry.instances.data.deviceAddress` **must** refer to an
acceleration structure that was built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
set in [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-09547) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-09547

`commandBuffer` **must** not be a protected command buffer

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10904) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10904

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10905) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10905

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11846) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11846

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11847) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11847

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11848) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11848

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11849) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11849

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11850) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11850

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11851) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11851

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its
`indexData.deviceAddress` **must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11852) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11852

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11853) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11853

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03646) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03646

For each element of `pIndirectDeviceAddresses`[i], all device
addresses between `pIndirectDeviceAddresses`[i] and
`pIndirectDeviceAddresses`[i] + 
(`pInfos`[i].`geometryCount` × `pIndirectStrides`[i]) -
1 **must** be in the buffer device address range of the same buffer

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03647) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03647

For each element of `pIndirectDeviceAddresses`, the buffer from
which it was queried **must** have been created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03648) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03648

Each element of `pIndirectDeviceAddresses` **must** be a multiple of
`4`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-03787) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-03787

Each element of `pIndirectStrides` **must** be a multiple of `4`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03651) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03651

Each [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structure referenced
by any element of `pIndirectDeviceAddresses` **must** be a valid
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structure

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03652) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03652

`pInfos`[i].`dstAccelerationStructure` **must** have been created
with a value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`size`
greater than or equal to the memory size required by the build
operation, as returned by [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)
with `pBuildInfo` = `pInfos`[i] and
`pMaxPrimitiveCounts` = `ppMaxPrimitiveCounts`[i]

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-03653) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-03653

Each `ppMaxPrimitiveCounts`[i][j] **must** be greater than or equal to
the `primitiveCount` value specified by the
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structure located at
`pIndirectDeviceAddresses`[i] +  (`j` ×
`pIndirectStrides`[i])

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structures

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-parameter

 `pIndirectDeviceAddresses` **must** be a valid pointer to an array of `infoCount` `VkDeviceAddress` values

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-parameter

 `pIndirectStrides` **must** be a valid pointer to an array of `infoCount` `uint32_t` values

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-parameter

 `ppMaxPrimitiveCounts` **must** be a valid pointer to an array of `infoCount` `uint32_t` values

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-recording) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-renderpass) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-suspended) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-videocoding) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-infoCount-arraylength) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-infoCount-arraylength

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

vkCmdBuildAccelerationStructuresIndirectKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdBuildAccelerationStructuresIndirectKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
