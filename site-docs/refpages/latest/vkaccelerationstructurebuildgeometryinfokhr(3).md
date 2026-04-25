# VkAccelerationStructureBuildGeometryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureBuildGeometryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureBuildGeometryInfoKHR - Structure specifying the geometry data used to build an acceleration structure

The `VkAccelerationStructureBuildGeometryInfoKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureBuildGeometryInfoKHR {
    VkStructureType                                     sType;
    const void*                                         pNext;
    VkAccelerationStructureTypeKHR                      type;
    VkBuildAccelerationStructureFlagsKHR                flags;
    VkBuildAccelerationStructureModeKHR                 mode;
    VkAccelerationStructureKHR                          srcAccelerationStructure;
    VkAccelerationStructureKHR                          dstAccelerationStructure;
    uint32_t                                            geometryCount;
    const VkAccelerationStructureGeometryKHR*           pGeometries;
    const VkAccelerationStructureGeometryKHR* const*    ppGeometries;
    VkDeviceOrHostAddressKHR                            scratchData;
} VkAccelerationStructureBuildGeometryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value specifying
the type of acceleration structure being built.

* 
`flags` is a bitmask of
[VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html) specifying additional
parameters of the acceleration structure.

* 
`mode` is a [VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) value
specifying the type of operation to perform.

* 
`srcAccelerationStructure` is a pointer to an existing acceleration
structure that is to be used to update the
`dstAccelerationStructure` acceleration structure when `mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html).

* 
`dstAccelerationStructure` is a pointer to the target acceleration
structure for the build.

* 
`geometryCount` specifies the number of geometries that will be
built into `dstAccelerationStructure`.

* 
`pGeometries` is a pointer to an array of
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structures.

* 
`ppGeometries` is a pointer to an array of pointers to
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structures.

* 
`scratchData` is the device or host address of memory that will be
used as scratch memory for the build.

Only one of `pGeometries` or `ppGeometries` **can** be a valid pointer,
the other **must** be `NULL`.
Each element of the non-`NULL` array describes the data used to build each
acceleration structure geometry.

The index of each element of the `pGeometries` or `ppGeometries`
members of [VkAccelerationStructureBuildGeometryInfoKHR](#) is used as the
*geometry index* during ray traversal.
The geometry index is available in ray shaders via the
[`RayGeometryIndexKHR` built-in](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raygeometryindex), and is [used to determine hit and intersection shaders executed during traversal](../../../../spec/latest/chapters/raytracing.html#shader-binding-table-hit-shader-indexing).
The geometry index is available to ray queries via the
`OpRayQueryGetIntersectionGeometryIndexKHR` instruction.

Setting [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`
indicates that this build is a motion top level acceleration structure.
A motion top level uses instances of format
[VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html) if
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)::`arrayOfPointers`
is [VK_FALSE](VK_FALSE.html).

If
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)::`arrayOfPointers`
is [VK_TRUE](VK_TRUE.html), the pointer for each element of the array of instance
pointers consists of 4 bits of
[VkAccelerationStructureMotionInstanceTypeNV](VkAccelerationStructureMotionInstanceTypeNV.html) in the low 4 bits of the
pointer identifying the type of structure at the pointer.
The device address accessed is the value in the array with the low 4 bits
set to zero.
The structure at the pointer is one of
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html),
[VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html) or
[VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html), depending on the type
value encoded in the low 4 bits.

A top level acceleration structure with either motion instances or vertex
motion in its instances **must** set
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) in `flags`.

Members `srcAccelerationStructure` and `dstAccelerationStructure`
**may** be the same or different for an update operation (when `mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html)).
If they are the same, the update happens in-place.
Otherwise, the target acceleration structure is updated and the source is
not modified.

Valid Usage

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03654) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03654

`type` **must** not be [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-03788) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-03788

If `geometryCount` is not `0`, exactly one of `pGeometries` or
`ppGeometries` **must** be a valid pointer, the other **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03789) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03789

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), the
`geometryType` member of elements of either `pGeometries` or
`ppGeometries` **must** be [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03790) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03790

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html),
`geometryCount` **must** be `1`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03791) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03791

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
the `geometryType` member of elements of either `pGeometries` or
`ppGeometries` **must** not be [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03792) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03792

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
then the `geometryType` member of each geometry in either
`pGeometries` or `ppGeometries` **must** be the same

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03793) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03793

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
then `geometryCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxGeometryCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-10884) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-10884

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), then
`geometryCount` **must** be `1`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03794) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03794

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is [VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html), the total number
of AABBs in all geometries **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxPrimitiveCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03795) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03795

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), the total
number of triangles in all geometries **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxPrimitiveCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-03796) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-03796

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) bit set,
then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) bit set

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-dstAccelerationStructure-04927) VUID-VkAccelerationStructureBuildGeometryInfoKHR-dstAccelerationStructure-04927

If `dstAccelerationStructure` was created with
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) set in
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`createFlags`,
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) **must** be set in
`flags`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04928) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04928

If [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) is set in
`flags`, `dstAccelerationStructure` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) set in
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`createFlags`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04929) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04929

If [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) is set in
`flags`, `type` **must** not be
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-07334) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-07334

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
bit set then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
bit set

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-sType-sType) VUID-VkAccelerationStructureBuildGeometryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_GEOMETRY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pNext-pNext) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html) values

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-parameter

 If `geometryCount` is not `0`, and `pGeometries` is not `NULL`, `pGeometries` **must** be a valid pointer to an array of `geometryCount` valid [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structures

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-ppGeometries-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-ppGeometries-parameter

 If `geometryCount` is not `0`, and `ppGeometries` is not `NULL`, `ppGeometries` **must** be a valid pointer to an array of `geometryCount` valid pointers to valid [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structures

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-commonparent) VUID-VkAccelerationStructureBuildGeometryInfoKHR-commonparent

 Both of `dstAccelerationStructure`, and `srcAccelerationStructure` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html), [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html), [VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), [VkStructureType](VkStructureType.html), [vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html), [vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html), [vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html), [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
