# vkBuildAccelerationStructuresKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBuildAccelerationStructuresKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBuildAccelerationStructuresKHR - Build an acceleration structure on the host

To build acceleration structures on the host, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkBuildAccelerationStructuresKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    uint32_t                                    infoCount,
    const VkAccelerationStructureBuildGeometryInfoKHR* pInfos,
    const VkAccelerationStructureBuildRangeInfoKHR* const* ppBuildRangeInfos);

* 
`device` is the `VkDevice` for which the acceleration structures
are being built.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

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

This command fulfills the same task as
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html) but is executed by the host.

The `vkBuildAccelerationStructuresKHR` command provides the ability to
initiate multiple acceleration structures builds, however there is no
ordering or synchronization implied between any of the individual
acceleration structure builds.

|  | This means that an application **cannot** build a top-level acceleration
| --- | --- |
structure in the same [vkBuildAccelerationStructuresKHR](#) call as the
associated bottom-level or instance acceleration structures are being built.
There also **cannot** be any memory aliasing between any acceleration structure
memories or scratch memories being used by any of the builds. |

Valid Usage

* 
[](#VUID-vkBuildAccelerationStructuresKHR-accelerationStructureHostCommands-03581) VUID-vkBuildAccelerationStructuresKHR-accelerationStructureHostCommands-03581

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkBuildAccelerationStructuresKHR-mode-04628) VUID-vkBuildAccelerationStructuresKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) value

* 
[](#VUID-vkBuildAccelerationStructuresKHR-srcAccelerationStructure-04629) VUID-vkBuildAccelerationStructuresKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-04630) VUID-vkBuildAccelerationStructuresKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03403) VUID-vkBuildAccelerationStructuresKHR-pInfos-03403

The `srcAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03698) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03698

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be the same acceleration structure as the
`dstAccelerationStructure` member of any other element of
`pInfos`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03800) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03800

The `dstAccelerationStructure` member of any element of `pInfos`
**must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03699) VUID-vkBuildAccelerationStructuresKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03700) VUID-vkBuildAccelerationStructuresKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03663) VUID-vkBuildAccelerationStructuresKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html),
[inactive primitives](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03664) VUID-vkBuildAccelerationStructuresKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-None-03407) VUID-vkBuildAccelerationStructuresKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other
element of `pInfos`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03701) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), which is accessed
by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03702) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03702

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `dstAccelerationStructure` member of
any other element of `pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03703) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03703

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `scratchData` member of any element
of `pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-scratchData-03704) VUID-vkBuildAccelerationStructuresKHR-scratchData-03704

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-scratchData-03705) VUID-vkBuildAccelerationStructuresKHR-scratchData-03705

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `srcAccelerationStructure` member of any element
of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) (including the
same element), which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03706) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03667) VUID-vkBuildAccelerationStructuresKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) set in
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags` in the
build

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03668) VUID-vkBuildAccelerationStructuresKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), or
not have any [memory aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03758) VUID-vkBuildAccelerationStructuresKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03759) VUID-vkBuildAccelerationStructuresKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03760) VUID-vkBuildAccelerationStructuresKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03761) VUID-vkBuildAccelerationStructuresKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03762) VUID-vkBuildAccelerationStructuresKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03763) VUID-vkBuildAccelerationStructuresKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03764) VUID-vkBuildAccelerationStructuresKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03765) VUID-vkBuildAccelerationStructuresKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03766) VUID-vkBuildAccelerationStructuresKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03767) VUID-vkBuildAccelerationStructuresKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10898) VUID-vkBuildAccelerationStructuresKHR-pInfos-10898

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10899) VUID-vkBuildAccelerationStructuresKHR-pInfos-10899

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10900) VUID-vkBuildAccelerationStructuresKHR-pInfos-10900

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10901) VUID-vkBuildAccelerationStructuresKHR-pInfos-10901

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10902) VUID-vkBuildAccelerationStructuresKHR-pInfos-10902

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10903) VUID-vkBuildAccelerationStructuresKHR-pInfos-10903

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
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03768) VUID-vkBuildAccelerationStructuresKHR-pInfos-03768

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
[](#VUID-vkBuildAccelerationStructuresKHR-primitiveCount-03769) VUID-vkBuildAccelerationStructuresKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, the
`primitiveCount` member of its corresponding
`VkAccelerationStructureBuildRangeInfoKHR` structure **must** have the
same value which was specified when `srcAccelerationStructure` was
last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03801) VUID-vkBuildAccelerationStructuresKHR-pInfos-03801

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), the corresponding
`ppBuildRangeInfos`[i][j].`primitiveCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxInstanceCount`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10126) VUID-vkBuildAccelerationStructuresKHR-pInfos-10126

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

[](#VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676) VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676

Each element of `ppBuildRangeInfos`[i] **must** be a valid pointer to
an array of `pInfos`[i].`geometryCount`
`VkAccelerationStructureBuildRangeInfoKHR` structures
, or `NULL`

[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10906) VUID-vkBuildAccelerationStructuresKHR-pInfos-10906

For each element of `pInfos`[i] whose `pGeometries` or
`ppGeometries` members have a `geometryType` of
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html),
`ppBuildRangeInfos`[i] **must** be `NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-03678) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11703) VUID-vkBuildAccelerationStructuresKHR-pInfos-11703

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03722) VUID-vkBuildAccelerationStructuresKHR-pInfos-03722

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to host-visible device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11706) VUID-vkBuildAccelerationStructuresKHR-pInfos-11706

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), its
`srcAccelerationStructure` member **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03723) VUID-vkBuildAccelerationStructuresKHR-pInfos-03723

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) the `buffer`
used to create its `srcAccelerationStructure` member **must** be bound
to host-visible device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11704) VUID-vkBuildAccelerationStructuresKHR-pInfos-11704

For each element of `pInfos`, the acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03724) VUID-vkBuildAccelerationStructuresKHR-pInfos-03724

For each element of `pInfos`, each acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) **must** be bound to host-visible
device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-12244) VUID-vkBuildAccelerationStructuresKHR-pInfos-12244

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](VkBuildAccelerationStructureModeKHR.html), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the `buildScratchSize`
member of the [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure
returned from a call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)
with an identical [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)
structure and primitive count

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-12245) VUID-vkBuildAccelerationStructuresKHR-pInfos-12245

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the `updateScratchSize`
member of the [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure
returned from a call to [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)
with an identical [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)
structure and primitive count

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03771) VUID-vkBuildAccelerationStructuresKHR-pInfos-03771

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html),
`geometry.triangles.vertexData.hostAddress` **must** be a valid host
address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03772) VUID-vkBuildAccelerationStructuresKHR-pInfos-03772

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`geometry.triangles.indexData.hostAddress` **must** be a valid host
address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03773) VUID-vkBuildAccelerationStructuresKHR-pInfos-03773

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if
`geometry.triangles.transformData.hostAddress` is not `0`, it **must**
be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03774) VUID-vkBuildAccelerationStructuresKHR-pInfos-03774

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html), `geometry.aabbs.data.hostAddress`
**must** be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03775) VUID-vkBuildAccelerationStructuresKHR-pInfos-03775

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to memory that was not allocated with multiple
instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03776) VUID-vkBuildAccelerationStructuresKHR-pInfos-03776

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) the `buffer`
used to create its `srcAccelerationStructure` member **must** be bound
to memory that was not allocated with multiple instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03777) VUID-vkBuildAccelerationStructuresKHR-pInfos-03777

For each element of `pInfos`, each acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) **must** be bound to memory that was
not allocated with multiple instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03778) VUID-vkBuildAccelerationStructuresKHR-pInfos-03778

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html),
`geometry.instances.data.hostAddress` **must** be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03779) VUID-vkBuildAccelerationStructuresKHR-pInfos-03779

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), each
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`accelerationStructureReference`
value in `geometry.instances.data.hostAddress` **must** be a valid
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) object

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-04930) VUID-vkBuildAccelerationStructuresKHR-pInfos-04930

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) set, each
`accelerationStructureReference` in any structure in
[VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html) value in
`geometry.instances.data.hostAddress` **must** be a valid
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) object

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11820) VUID-vkBuildAccelerationStructuresKHR-pInfos-11820

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html) in the
`geometry.triangles.pNext` chain, then its
`vertexData.hostAddress` **must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10892) VUID-vkBuildAccelerationStructuresKHR-pInfos-10892

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.hostAddress`
**must** be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11821) VUID-vkBuildAccelerationStructuresKHR-pInfos-11821

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexBuffer.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11822) VUID-vkBuildAccelerationStructuresKHR-pInfos-11822

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.hostAddress` **must**
be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11823) VUID-vkBuildAccelerationStructuresKHR-pInfos-11823

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11824) VUID-vkBuildAccelerationStructuresKHR-pInfos-11824

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`vertexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11825) VUID-vkBuildAccelerationStructuresKHR-pInfos-11825

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)::`radiusData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11826) VUID-vkBuildAccelerationStructuresKHR-pInfos-11826

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its `indexData.hostAddress`
**must** be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11827) VUID-vkBuildAccelerationStructuresKHR-pInfos-11827

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then its
`indexData.hostAddress` **must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11828) VUID-vkBuildAccelerationStructuresKHR-pInfos-11828

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`vertexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11829) VUID-vkBuildAccelerationStructuresKHR-pInfos-11829

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`radiusData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10893) VUID-vkBuildAccelerationStructuresKHR-pInfos-10893

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, `geometryType` **must** not be
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-device-parameter) VUID-vkBuildAccelerationStructuresKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parameter) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-parameter) VUID-vkBuildAccelerationStructuresKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structures

* 
[](#VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter) VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter

 `ppBuildRangeInfos` **must** be a valid pointer to an array of `infoCount` [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structures

* 
[](#VUID-vkBuildAccelerationStructuresKHR-infoCount-arraylength) VUID-vkBuildAccelerationStructuresKHR-infoCount-arraylength

 `infoCount` **must** be greater than `0`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parent) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](VkResult.html)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkBuildAccelerationStructuresKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
