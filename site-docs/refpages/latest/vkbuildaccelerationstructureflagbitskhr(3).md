# VkBuildAccelerationStructureFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuildAccelerationStructureFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuildAccelerationStructureFlagBitsKHR - Bitmask specifying additional parameters for acceleration structure builds

Bits which **can** be set in
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)::`flags`
or
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`flags`
specifying additional parameters for acceleration structure builds, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkBuildAccelerationStructureFlagBitsKHR {
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR = 0x00000001,
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR = 0x00000002,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR = 0x00000004,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR = 0x00000008,
    VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR = 0x00000010,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV = 0x00000020,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT = 0x00000100,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV = 0x00000200,
#endif
  // Provided by VK_KHR_ray_tracing_position_fetch
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR = 0x00000800,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV = 0x00001000,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_NV is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV,
#endif
  // Provided by VK_KHR_ray_tracing_position_fetch
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR,
} VkBuildAccelerationStructureFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkBuildAccelerationStructureFlagBitsKHR
typedef VkBuildAccelerationStructureFlagBitsKHR VkBuildAccelerationStructureFlagBitsNV;

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#) specifies
    that the specified acceleration structure **can** be updated with
    a `mode` of [VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) in
    [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)
or
    an `update` of [VK_TRUE](VK_TRUE.html) in
    [vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html)
    .
    For sphere and LSS primitives, only positions and radii may be updated,
    the provided index buffers and flags **must** remain unchanged from the
    initial build.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#) specifies
that the specified acceleration structure **can** act as the source for a
copy acceleration structure command with `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](VkCopyAccelerationStructureModeKHR.html) to produce a
compacted acceleration structure.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR](#)
specifies that the given acceleration structure build **should** prioritize
trace performance over build time.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR](#)
specifies that the given acceleration structure build **should** prioritize
build time over trace performance.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR](#) specifies that
this acceleration structure **should** minimize the size of the scratch
memory and the final result acceleration structure, potentially at the
expense of build time or trace performance.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](#)
specifies that the opacity micromaps associated with the specified
acceleration structure **may** change with an acceleration structure
update.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](#)
specifies that the data of the opacity micromaps associated with the
specified acceleration structure **may** change with an acceleration
structure update.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](#)
specifies that the specified acceleration structure **may** be referenced
in an instance with
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkGeometryInstanceFlagBitsKHR.html) set.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](#)
specifies that opacity micromaps **may** be associated with the given
cluster acceleration structure.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](#)
specifies that the specified acceleration structure **can** be used when
fetching the
vertex and radius positions of a hit LSS or sphere primitive, or
vertex positions of a hit triangle.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV](#)
specifies that the displacement micromaps associated with the specified
acceleration structure **may** change with an acceleration structure
update.

|  | [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#) and
| --- | --- |
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#) **may** take
more time and memory than a normal build, and so **should** only be used when
those features are needed. |

|  | [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#) and
| --- | --- |
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#) are allowed
to be used together.
In that case, the result of the compaction copy is used as the source of a
build with `mode` of
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html) to perform the
compacted update. |

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBuildAccelerationStructureFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
