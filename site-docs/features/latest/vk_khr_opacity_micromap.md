# VK_KHR_opacity_micromap

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_opacity_micromap.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Get Micromap Size](#_get_micromap_size)
- [3.1._Get_Micromap_Size](#_get_micromap_size)
- [3.2. Create Micromap](#_create_micromap)
- [3.2._Create_Micromap](#_create_micromap)
- [3.3. Build Micromap](#building-micromaps)
- [3.3._Build_Micromap](#building-micromaps)
- [3.4. Build Acceleration Structure](#_build_acceleration_structure)
- [3.4._Build_Acceleration_Structure](#_build_acceleration_structure)
- [3.4.1. Determining Opacity in Traversal](#_determining_opacity_in_traversal)
- [3.4.1._Determining_Opacity_in_Traversal](#_determining_opacity_in_traversal)
- [3.5. Copying Micromaps](#_copying_micromaps)
- [3.5._Copying_Micromaps](#_copying_micromaps)
- [3.5.1. Cloning Micromaps](#_cloning_micromaps)
- [3.5.1._Cloning_Micromaps](#_cloning_micromaps)
- [3.5.2. Compacting Micromaps](#_compacting_micromaps)
- [3.5.2._Compacting_Micromaps](#_compacting_micromaps)
- [3.5.3. Serializing Micromaps](#_serializing_micromaps)
- [3.5.3._Serializing_Micromaps](#_serializing_micromaps)
- [3.5.4. Deserializing Micromaps](#_deserializing_micromaps)
- [3.5.4._Deserializing_Micromaps](#_deserializing_micromaps)
- [3.5.5. Querying Micromaps](#_querying_micromaps)
- [3.5.5._Querying_Micromaps](#_querying_micromaps)
- [3.6. Features](#_features)
- [3.7. Properties](#_properties)
- [3.8. Changes from VK_EXT_opacity_micromap](#_changes_from_vk_ext_opacity_micromap)
- [3.8._Changes_from_VK_EXT_opacity_micromap](#_changes_from_vk_ext_opacity_micromap)
- [3.8.1. VkMicromapEXT Deprecation](#_vkmicromapext_deprecation)
- [3.8.1._VkMicromapEXT_Deprecation](#_vkmicromapext_deprecation)
- [3.8.2. New Pipeline Flags](#_new_pipeline_flags)
- [3.8.2._New_Pipeline_Flags](#_new_pipeline_flags)
- [3.8.3. Ray Query](#_ray_query)
- [3.8.3._Ray_Query](#_ray_query)
- [3.8.4. GLSL](#_glsl)
- [3.8.5. Host Commands](#_host_commands)
- [3.8.5._Host_Commands](#_host_commands)
- [3.8.6. Lossy Micromaps](#_lossy_micromaps)
- [3.8.6._Lossy_Micromaps](#_lossy_micromaps)
- [3.8.7. Features](#_features_2)
- [3.8.8. Properties](#_properties_2)
- [3.8.9. Discardable](#_discardable)
- [3.8.10. Serializing Acceleration Structures](#_serializing_acceleration_structures)
- [3.8.10._Serializing_Acceleration_Structures](#_serializing_acceleration_structures)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. RESOLVED: Are there any issues that belong here?](#_resolved_are_there_any_issues_that_belong_here)
- [5.1._RESOLVED:_Are_there_any_issues_that_belong_here?](#_resolved_are_there_any_issues_that_belong_here)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Get Micromap Size](#_get_micromap_size)
[3.2. Create Micromap](#_create_micromap)
[3.3. Build Micromap](#building-micromaps)
[3.4. Build Acceleration Structure](#_build_acceleration_structure)
[3.5. Copying Micromaps](#_copying_micromaps)
[3.6. Features](#_features)
[3.7. Properties](#_properties)
[3.8. Changes from VK_EXT_opacity_micromap](#_changes_from_vk_ext_opacity_micromap)

[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. RESOLVED: Are there any issues that belong here?](#_resolved_are_there_any_issues_that_belong_here)

VK_KHR_opacity_micromap adds a new type of acceleration structure to associate micro-geometry information with geometry in an acceleration
structure as well as a specific application of an opacity micromap to accelerate sub-triangle opacity without
having to call a user any-hit shader.

This is a promotion of [VK_EXT_opacity_micromap](../../../../refpages/latest/refpages/source/VK_EXT_opacity_micromap.html) with significant changes to
the API, however, the overall traversal behavior and micromap structure are similar to the original extension.

Geometry in an acceleration structure in the basic ray tracing extensions contains either geometric information or
bounds for custom geometry. There are some applications where having a more compact representation of sub-triangle
level information can be useful. One specific application is handling opacity information more efficiently at traversal
time than having to return to an application-provided any-hit shader.

The mapping of the data onto the mesh is one design choice. Traditionally, texturing onto geometry is accomplished by
application-provided texture coordinates, but in this case that would add significant extra metadata and require
potentially more complicated sampling. A quad domain is natural for some interpretations of map data, but that may
require more information from the application on at least adjacency information, even if not full UV coordinates. A
triangular mapping is very amenable to performant implementations both in hardware and in software while not requiring
extra information from the application outside of a given triangle.

Relatedly, the mapping from triangle to index is another design choice. With raster images, pitch ordering is the de facto
standard for interoperating images. There is no direct analogy to a triangular domain, though, and the most similar mapping
is significantly less trivial than raster images. Moving to a mapping with more locality gives gains in terms of locality
of processing, ease of downsampling, and similar operations.

The extension defines a new `VkAccelerationStructureKHR` opacity micromap type.
The micromap information is defined on the domain of subdivided triangles on a given acceleration
structure geometry triangle. The build information contains usage information to compute the size including the number of triangles
with a given subdivision level and format. For an opacity micromap, the micromap contains either 1-bit or 2-bit information
which controls how the traversal is performed when combined with a set of flags.

Once the micromap is built an extension structure can attach it to
[VkAccelerationStructureGeometryKHR](../../../../refpages/latest/refpages/source/VkAccelerationStructureGeometryKHR.html) along with
mapping information from each triangle in the geometry to a specified triangle index in the micromap.

First, the application needs to determine the size required by the micromap build, which can be queried with:

VKAPI_ATTR void VKAPI_CALL vkGetAccelerationStructureBuildSizesKHR(
    VkDevice                                           device,
    VkAccelerationStructureBuildTypeKHR                buildType,
    const VkAccelerationStructureBuildGeometryInfoKHR* pBuildInfo,
    const uint32_t*                                    pMaxPrimitiveCounts,
    VkAccelerationStructureBuildSizesInfoKHR*          pSizeInfo);

* 
`buildType` is the type of build to be performed, must be `VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR`
as micromaps do not support [host commands](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands)

* 
`pBuildInfo` contains the build parameters that will be used to build the micromap

* 
`pMaxPrimitiveCounts` defines the number of primitives built into each geometry, given micromaps do not define
primitives, this pointer must be null

The `srcAccelerationStructure`, `dstAccelerationStructure`, `mode` and `scratchData`,
members of `pBuildInfo` are ignored by this command.
Likewise, the `data` and `triangleArray` members of any `VkAccelerationStructureGeometryMicromapDataKHR`
structure are ignored by this command.
See [Build Micromap](#building-micromaps) for more information about how to fill in this structure.

The `type`, `flags`, and either `ppUsageCounts` or `pUsageCounts` members
must have identical information as the build. Meaning, the latter pointers
do not need to be the same, but must specify a micromap with identical topology.

typedef struct VkAccelerationStructureBuildSizesInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       accelerationStructureSize;
    VkDeviceSize       updateScratchSize;
    VkDeviceSize       buildScratchSize;
} VkAccelerationStructureBuildSizesInfoKHR;

* 
`accelerationStructureSize` is the size that the `dstAccelerationStructure` provided to build needs to be created with

* 
`updateScratchSize` is the size that the `scratchData` provided during updates needs to be allocated as, given that
micromaps do not support updates, implementations must set this value to `0`

* 
`buildScratchSize` is the size that the `scratchData` provided to build needs to allocated as

Micromaps must be created by `vkCreateAccelerationStructure2KHR` provided by
`VK_KHR_device_address_commands` before they can be built and used in traversal.
`vkCreateAccelerationStructureKHR` [cannot be used](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-create) to create micromaps.

Buffers used in builds require flags provided at buffer creation:

VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR = 0x00080000;
VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR               = 0x00100000;

* 
`VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR` indicates that the buffer can be used as a read-only
input to building acceleration structures, which includes the `data` and `triangleArray` members for micromaps

* 
`VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR` allows the buffer to be used as the backing buffer for the
address provided to the `VkAccelerationStructureCreateInfo2KHR::addressRange` member

typedef enum VkAccelerationStructureCreateFlagBitsKHR {
    VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR    = 0x00000001,
    VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000008,
    VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV                            = 0x00000004,
} VkAccelerationStructureCreateFlagBitsKHR;
typedef VkFlags VkAccelerationStructureCreateFlagsKHR;

* 
`VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR` specifies that the micromap can be used in capture/replay,
this is the only permitted flag for micromaps

typedef enum VkAccelerationStructureTypeKHR {
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR = 0,
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR = 1,
    VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR = 2,
    VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR = 1000623000,
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR,
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR,
} VkAccelerationStructureTypeKHR;

* 
`VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR` specifies that this micromap is for opacity

* 
`VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR` specifies that this acceleration structure could be used for
top, bottom, or micromap types. [Build](#building-micromaps) will determine the type of acceleration structure.

Micromaps must be built before use by `vkCmdBuildAccelerationStructuresKHR`, this work is performed on the device.
[`vkBuildAccelerationStructuresKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands) and
[`vkCmdBuildAccelerationStructuresIndirectKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-indirect) cannot be used to
build micromaps.

VKAPI_ATTR void VKAPI_CALL vkCmdBuildAccelerationStructuresKHR(
    VkCommandBuffer                                        commandBuffer,
    uint32_t                                               infoCount,
    const VkAccelerationStructureBuildGeometryInfoKHR*     pInfos,
    const VkAccelerationStructureBuildRangeInfoKHR* const* ppBuildRangeInfos);

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
`ppBuildRangeInfos` each element that corresponds to a micromap build, does not need to be a
valid pointer and is ignored

* 
`type` must be `VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR` for micromap builds

* 
`flags` are the build flags, the only following are valid for micromaps:

`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR`

* 
`VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR`

* 
`VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR`

* 
`VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR`

`mode` specifies the type of operation to perform, as micromaps do not support
updates, this must be `VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR`

`srcAccelerationStructure` does not need to be a valid handle and is ignored
since `VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR` is not supported for micromaps

`dstAccelerationStructure` specifies the micromap object that bakes the build, this data is accessed with
`VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR`

`geometryCount` must be 1 for micromaps

`pGeometries` and `ppGeometries` specifies the micromap data, one and
only one of these must be a valid pointer

`scratchData` specifies the temporary working area used while building the micromap, this data
is accessed with
`VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR | VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR`

typedef enum VkBuildAccelerationStructureFlagBitsKHR {
    ...
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR                   = 0x00000002,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR                  = 0x00000004,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR                  = 0x00000008,
    VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR                     = 0x00000400,
    ...
} VkBuildAccelerationStructureFlagBitsKHR;
typedef VkFlags VkBuildAccelerationStructureFlagsKHR;

* 
`VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR` specifies the build should prioritize trace time over build time

* 
`VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR` specifies the build should prioritize build time over trace time

* 
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR` specifies the micromap supports compact copies

* 
`VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR` specifies that the implementation can build the micromap array with lossy states to
compress it or support more subdivision levels

typedef enum VkBuildAccelerationStructureModeKHR {
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR = 0,
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR = 1,
} VkBuildAccelerationStructureModeKHR;

* 
`VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR` specifies that the micromap build operation is to build it

typedef struct VkAccelerationStructureGeometryKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    VkGeometryTypeKHR                         geometryType;
    VkAccelerationStructureGeometryDataKHR    geometry;
    VkGeometryFlagsKHR                        flags;
} VkAccelerationStructureGeometryKHR;

* 
`geometryType` specifies the type of the `geometry` member, it must be
`VK_GEOMETRY_TYPE_MICROMAP_KHR` for micromaps

* 
`flags` specifies flags for the geometry, must be 0 for micromaps

This structure is added to the `pNext` of `VkAccelerationStructureGeometryKHR` to specify
the data for `VK_GEOMETRY_TYPE_MICROMAP_KHR` typed geometry:

typedef struct VkAccelerationStructureGeometryMicromapDataKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageKHR*           pUsageCounts;
    const VkMicromapUsageKHR* const*    ppUsageCounts;
    VkDeviceAddress                     data;
    VkDeviceAddress                     triangleArray;
    VkDeviceSize                        triangleArrayStride;
} VkAccelerationStructureGeometryMicromapDataKHR;

* 
`usageCountsCount` specifies the number of usage counts structures

* 
`pUsageCounts` and `ppUsageCounts` specifies the topology of the micromap, one and
only one of these must be a valid pointer

* 
`data` specifies the source data to build the micromap with, this data is accessed with
`VK_ACCESS_SHADER_READ_BIT`

* 
`triangleArray` specifies the layout of `data`, this array is accessed with
`VK_ACCESS_SHADER_READ_BIT`

* 
`triangleArrayStride` specifies the bytes between each element of the `triangleArray`

Builds are done in no explicit ordering within the `pInfos`, so there cannot
be any memory aliasing between any micromap memories or scratch memories being
used by any of the builds. Micromaps cannot be built in the same command that
they are being referenced by bottom-level acceleration structures.

Access to all buffers accessed by this command must be synchronized with the
VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR type.

The `data` and `triangleArray` members must have been retrieved from a buffer
created with `VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR`.

typedef struct VkMicromapUsageKHR {
    uint32_t                   count;
    uint32_t                   subdivisionLevel;
    VkOpacityMicromapFormatKHR format;
} VkMicromapUsageKHR;

* 
`count` specifies the number of triangles for this usage

* 
`subdivisionLevel` specifies which subdivision level this usage is describing

* 
`format` specifies the format of the states for this usage

typedef struct VkMicromapTriangleKHR {
    uint32_t    dataOffset;
    uint16_t    subdivisionLevel;
    uint16_t    format;
} VkMicromapTriangleKHR;

* 
`dataOffset` specifies the offset in `data` in the build command where this triangle is specified

* 
`subdivisionLevel` specifies which subdivision level this triangle is specifying

* 
`format` specifies the format of the states of this triangle

typedef enum VkOpacityMicromapFormatKHR {
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR = 1,
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR = 2,
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT = VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR,
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT = VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR,
    VK_OPACITY_MICROMAP_FORMAT_MAX_ENUM_KHR = 0x7FFFFFFF
} VkOpacityMicromapFormatKHR;

* 
`VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR` specifies the encoding is 1-bit per sub-triangle specifying
it as either fully-opaque or fully-transparent

* 
`VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR` specifies the encoding is 2-bits per sub-triangle, which
additionally allows for unknown opaque and unknown transparency

In order to use the micromap in a traversal, it needs to be built inside an acceleration structure by
providing the following to the `pNext` of
[VkAccelerationStructureGeometryTrianglesDataKHR](../../../../refpages/latest/refpages/source/VkAccelerationStructureGeometryTrianglesDataKHR.html):

typedef struct VkAccelerationStructureTrianglesOpacityMicromapKHR {
    VkStructureType                     sType;
    void*                               pNext;
    VkIndexType                         indexType;
    VkDeviceAddress                     indexBuffer;
    VkDeviceSize                        indexStride;
    uint32_t                            baseTriangle;
    VkAccelerationStructureKHR          micromap;
} VkAccelerationStructureTrianglesOpacityMicromapKHR;

* 
`indexType` is the format of the indices in the `indexBuffer`

* 
`indexBuffer` is the address of the triangle indices, and is accessed as
`VK_ACCESS_TRANSFER_READ_BIT`

* 
`indexStride` is the stride in bytes between indices

* 
`baseTriangle` is the triangle index offset in the micromap to use for this build

* 
`micromap` is the micromap used for this acceleration structure build, and is accessed as
`VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR`

Buffer accesses must be synchronized with
`VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR`.

For each triangle in the geometry, a triangle in the micromap is fetched
at index
reinterpret_cast(`indexBuffer` + `indexStride` * `geomTriangleIndex`) + `baseTriangle`.

If the index fetched from `indexbuffer` is negative then it is a special value and no fetch from micromap happens,
instead it represents a special index:

typedef enum VkOpacityMicromapSpecialIndexKHR {
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR = -1,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR = -2,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR = -3,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR = -4,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV = -5,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_MAX_ENUM_KHR = 0x7FFFFFFF
} VkOpacityMicromapSpecialIndexKHR;

The following flags means that the entire triangle is fully interpreted with that respective
opacity information instead of querying from the micromap:
  * `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR`
  * `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR`
  * `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR`
  * `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR`

If the `micromap` provided was `VK_NULL_HANDLE`, then all indices must be one of the special indices above.

The following acceleration structure build flags are also provided:

VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR      = 0x00000040
VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_KHR    = 0x00000080

* 
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR` specifies that the
micromaps associated with the acceleration structure can change on update

* 
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_KHR` specifies the
acceleration structure can be referenced by an instance with the
`VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR` flag set

The following geometry instance flags are provided:

VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_KHR = 0x00000010
VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR      = 0x00000020

* 
`VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_KHR` specifies that the micromaps built
into the acceleration structure referenced by this instance operate in `2 State override` mode.

* 
`VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR` specifies that the micromaps built
into the acceleration structures referenced by this instance are disabled and uses the
geometry `VkAccelerationStructureGeometryKHR::flags` instead.

The flow of, ray pipeline centric, traversal is referenced by the following diagram:

![ray tracing execution detail](../_images/proposals/ray_tracing_execution_detail.svg)

Figure 1. Traversal

 

If the candidate was not built with a `VkAccelerationStructureTrianglesOpacityMicromapKHR`,
or micromaps were disabled at the instance level with
`VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR`, then the
*initial opacity information*
is determined by whether or not `VK_GEOMETRY_OPAQUE_BIT_KHR` was
included in `VkAccelerationStructureGeometryKHR::flags`.

Otherwise, the opacity micromap is used to initially determine this state:

* 
If `micromap` is null in `VkAccelerationStructureTrianglesOpacityMicromapKHR` or
the intersection is with a triangle corresponding to a special index in
`VkOpacityMicromapSpecialIndexKHR`, this is fetched as the *initial micromap opacity value*.

* 
Otherwise, the micromap sub-triangle that was intersected is fetched and used as
the *initial micromap opacity value*.

In either case, if micromap was built as lossy with
`VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR`, then the
implementation can additionally substitute any state to any of the UNKNOWN states.

The *initial micromap opacity value* is combined with the format of the opacity value,
and whether or not force2state is selected by adding
`VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_KHR` to geometry instance flags or
`ForceOpacityMicromap2StateEXT` to ray flags in the shader,
according to the following table:

| 4 State value | 2 State value | Special index value | 2 State override | Result |
| --- | --- | --- | --- | --- |
| 0 | 0 | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR` | Y | Ignored |
| 0 | 0 | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR` | N | Ignored |
| 1 | 1 | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR` | Y | Opaque |
| 1 | 1 | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR` | N | Opaque |
| 2 |  | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR` | Y | Ignored |
| 2 |  | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR` | N | Non-opaque |
| 3 |  | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR` | Y | Opaque |
| 3 |  | `VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR` | N | Non-opaque |

If the result from the table above is `Ignored`, then processing continues by enumerating
the next candidate. Otherwise, the result is the *initial opacity information*.

Next the following overrides are applied in order to modify the *intial opacity information*:
  * `VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR` forces opacity to opaque
  * `OpaqueKHR` or `NoOpaqueKHR` ray flags are applied in the shader to force opacity respectively,
    these are mutually exclusive

Then the culling ray flags, `CullOpaqueKHR` and `CullNoOpaqueKHR` are applied in the shader
and if the respective opacity information matches, will proceed execution with the next
candidate.

Otherwise, if the intersection candidate is determined to hit non-opaque geometry, processing
will continue with the Any-Hit shader to determine to confirm the intersection.

When the intersection is confirmed or the geometry was determined to be opaque, then the
closest hit is updated and processing continues as indicated in the diagram.

In order to use micromaps with ray pipelines, the following flag must be provided:

static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR = 0x01000000ULL;

Or the equivalent `VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR` flag. This flag
only affects accessing acceleration structures with micromaps as described above and has no
effect on ray query accesses.

Ray query operations happen similarly and mostly happens within `OpRayQueryProceedKHR`.

Intersection candidates with AABB geometry cause `OpRayQueryProceedKHR` to
return `true`, incomplete traversal, in order for the shader to
confirm the hit.
To query the opacity that was determined by `OpRayQueryProceedKHR`,
`OpRayQueryGetIntersectionCandidateAABBOpaqueKHR` can be used.

Intersection candidates with triangle geometry that cause `OpRayQueryProceedKHR`
to return `true` have been determined to be non-opaque.
Intersection candidates with opaque triangle geometry continues
execution without causing `OpRayQueryProceedKHR` to return.

Micromaps can be copied with `vkCmdCopyAccelerationStructureKHR`.
[`vkCopyAccelerationStructureKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands)
cannot be used to copy micromaps.

VKAPI_ATTR void VKAPI_CALL vkCmdCopyAccelerationStructureKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyAccelerationStructureInfoKHR*   pInfo);

typedef struct VkCopyAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureInfoKHR;

The micromap is copied from `src` to `dst` on the device.

Their access by this command are through the `VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR` and
`VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR` respectively and must be synchronized with
pipeline stage `VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR`
or `VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR` as appropriate.

typedef enum VkCopyAccelerationStructureModeKHR {
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR = 0,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR = 1,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR = 2,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR = 3,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR,
} VkCopyAccelerationStructureModeKHR;

An identical copy can be copied with mode equal to
`VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR`. The parameters used to create both
micromaps must be identical.

The size needed for the cloned `dst` micromap can be queried from the `src`
micromap with
[vkCmdWriteAccelerationStructuresPropertiesKHR](../../../../refpages/latest/refpages/source/vkCmdWriteAccelerationStructuresPropertiesKHR.html)
using query type `VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR`.

The only other mode allowed for `vkCmdCopyAccelerationStructureKHR` is `VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR`.

To compact a micromap, it must be first built and then the size must be queried with
[vkCmdWriteAccelerationStructuresPropertiesKHR](../../../../refpages/latest/refpages/source/vkCmdWriteAccelerationStructuresPropertiesKHR.html)
using query type `VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR`.

Next, the application needs to create a destination micromap of size at least that returned
by the query with other parameters identical to the source micromap.

Then, the `vkCmdCopyAccelerationStructureKHR` can be called with mode `VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR`
to copy the micromap from source to destination while compacting it.

A micromap can be serialized to memory so it can be stored and loaded in another application instance without
having to regenerate the micromap.

First, the application needs to determine how large the serialized data is with
`vkCmdWriteAccelerationStructuresPropertiesKHR` using query type
`VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR`, and then allocate the memory.

Next, the application needs to issue `vkCmdCopyAccelerationStructureToMemoryKHR` to serialize it.
[`vkCopyAccelerationStructureToMemoryKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands)
cannot be used to copy micromaps.

VKAPI_ATTR void VKAPI_CALL vkCmdCopyAccelerationStructureToMemoryKHR(
    VkCommandBuffer                                     commandBuffer,
    const VkCopyAccelerationStructureToMemoryInfoKHR*   pInfo);

typedef struct VkCopyAccelerationStructureToMemoryInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkDeviceOrHostAddressKHR              dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureToMemoryInfoKHR;

* 
`src` is the source micromap to serialize, and is accessed as
`VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR`

* 
`dst` is the destination addr to write the data to, and is accessed as
`VK_ACCESS_TRANSFER_WRITE_BIT`

* 
`mode` is the type of operation and must be `VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR`

All accesses must be serialized with pipeline stage
`VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR`
or `VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR` as appropriate.

A defined header is written out to the data for reference:
  * `VK_UUID_SIZE` bytes of data matching
    `VkPhysicalDeviceIDProperties::driverUUID`
  * `VK_UUID_SIZE` bytes of data identifying the compatibility for
    comparison using `vkGetDeviceAccelerationStructureCompatibilityKHR`

The serialized data is written to the buffer (or read from the buffer)
according to the host endianness.

Micromaps can be loaded into an application by deserializing data that was previously serialized. First,
the application needs to check that the serialized data is compatible with this device:

VKAPI_ATTR void VKAPI_CALL vkGetDeviceAccelerationStructureCompatibilityKHR(
    VkDevice                                     device,
    const VkAccelerationStructureVersionInfoKHR* pVersionInfo,
    VkAccelerationStructureCompatibilityKHR*     pCompatibility);

typedef struct VkAccelerationStructureVersionInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    const uint8_t*     pVersionData;
} VkAccelerationStructureVersionInfoKHR;

typedef enum VkAccelerationStructureCompatibilityKHR {
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_COMPATIBLE_KHR   = 0,
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_INCOMPATIBLE_KHR = 1,
} VkAccelerationStructureCompatibilityKHR;

* 
`pVersionData` is the pointer to the header of a serialized micromap

Next, the application needs to create the destination micromap with a size greater or equal to the serialized data.

Then, the application needs to issue `vkCmdCopyMemoryToAccelerationStructureKHR` to deserialize the data.
[`vkCopyMemoryToAccelerationStructureKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands)
cannot be used to copy micromaps.

VKAPI_ATTR void VKAPI_CALL vkCmdCopyMemoryToAccelerationStructureKHR(
    VkCommandBuffer                                   commandBuffer,
    const VkCopyMemoryToAccelerationStructureInfoKHR* pInfo);

typedef struct VkCopyMemoryToAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceOrHostAddressConstKHR         src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyMemoryToAccelerationStructureInfoKHR;

* 
`src` is the source addr to read the data from, and is accessed as `VK_ACCESS_TRANSFER_READ_BIT`

* 
`dst` is the destination micromap to write the data to, and is accessed as
`VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR`

* 
`mode` is the type of operation and must be `VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR`

All accesses must be serialized with pipeline stage
`VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR`
or `VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR` as appropriate.

Properties of a built micromap can be queried with `vkCmdWriteAccelerationStructuresPropertiesKHR`.
[`vkWriteAccelerationStructuresPropertiesKHR`](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands)
cannot be used to copy micromaps.

VKAPI_ATTR void VKAPI_CALL vkCmdWriteAccelerationStructuresPropertiesKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureKHR*           pAccelerationStructures,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`pAccelerationStructures` is the list of micromaps of size `accelerationStructureCount` to write out the queries for,
and their access in this command is `VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR` and must be serialized with
`VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR` or `VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR`
as appropriate

typedef enum VkQueryType {
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR                      = 1000150000,
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR                  = 1000150001,
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR = 1000386000,
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR                                = 1000386001,
} VkQueryType;

* 
`VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR` will write out an entry per micromap that
specifies the size of the micromap in bytes

* 
`VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR` will write out an entry per micromap that
specifies the size of the serialized micromap in bytes

* 
`VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR` will write out an entry per micromap that specifies the size
of the compacted micromap in bytes

* 
`VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR` is not supported for micromaps

typedef struct VkPhysicalDeviceOpacityMicromapFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           micromap;
} VkPhysicalDeviceOpacityMicromapFeaturesKHR;

* 
`micromap` main feature to enable micromap functionality, only required feature

typedef struct VkPhysicalDeviceOpacityMicromapPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxOpacity2StateSubdivisionLevel;
    uint32_t           maxOpacity4StateSubdivisionLevel;
    uint32_t           maxOpacityLossy4StateSubdivisionLevel;
    uint64_t           maxMicromapTriangles;
} VkPhysicalDeviceOpacityMicromapPropertiesKHR;

* 
`maxOpacity2StateSubdivisionLevel` max allowed subdivision level for micromaps with
`VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR` format

* 
`maxOpacity4StateSubdivisionLevel` max allowed subdivision level for micromaps with
`VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR` format

* 
`maxOpacityLossy4StateSubdivisionLevel` may relax the 4 state subdivision limit if the micromap is lossy

* 
`maxMicromapTriangles` limits the number of triangles in the micromap to this value

The `VkMicromapEXT` object is
[deprecated]({extension}micromap-issues-micromap) in this extension, instead folding micromaps into
`VkAccelerationStructureKHR`. Much of the EXT API is replaced with commands from
`VK_KHR_acceleration_structure`.

A new pipeline flag is added to this extension:

static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_KHR = 0x20000000000ULL;

* 
`VK_PIPELINE_CREATE_2_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_KHR` specifies that pipelines cannot use
acceleration structures built with geometry that has an index buffer including both special indices and indices
pointing to an associated micromap array. Geometry which has an index buffer using only special indices without an
associated micromap array can still be used with this flag. Using this flag may allow some implementations to
perform a faster traversal.

For ray pipelines, this flag can only be specified if the `VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR`
flag is also provided. For ray query traversals, the
`VK_PIPELINE_CREATE_2_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_KHR` flag
is ignored if the shader does not enable the `OpacityMicromapKHR` execution mode.

The equivalent flag for shader objects is also provided:

VK_SHADER_CREATE_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_EXT = 0x00001000

Ray query operations could use opacity micromaps in the `VK_EXT_opacity_micromap` extension
without needing to supply a flag like ray pipelines. This has changed in this extension, which adds
a new execution mode in the
[SPV_KHR_opacity_micromap](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_opacity_micromap.html)
extension to enable opacity micromaps with ray query in shaders:

* 
`OpacityMicromapKHR` - this execution mode takes a specialization constant boolean value to determine
if ray queries in that shader can use opacity micromaps

If the `VK_EXT_opacity_micromap` extension is not enabled, this execution mode must be supplied to use opacity micromaps with ray queries,
even if executed inside a ray pipeline shader with the
`VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR` flag specified.

A built-in to enable encoding the `OpacityMicromapKHR` execution mode in SPIR-V is added in the
{GLSLregistry}/ext/GLSL_EXT_opacity_micromap_ray_query_mode.txt[`GLSL_EXT_opacity_micromap_ray_query_mode`]
extension:

layout(constant_id = ) gl_EnableOpacityMicromapExt;

In order to maintain backwards compatibility with existing shaders, high-level compilers should target
the `SPV_KHR_opacity_micromap` extension when this built-in is defined by the shader, and target the
[SPV_EXT_opacity_micromap](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_opacity_micromap.html)
extension otherwise.

Applications can provide shaders that use either SPIR-V extension with this Vulkan extension, but must
provide a shader that uses `SPV_KHR_opacity_micromap` if `OpacityMicromapKHR` is encoded.

[Host commands](../../../../refpages/latest/refpages/source/VK_KHR_opacity_micromap.html#micromap-issues-host-commands) are not widely supported and
updating the entry-points to support using host addresses instead of a buffer would have added complexity.

The
[VkAccelerationStructureTrianglesOpacityMicromapKHR](../../../../refpages/latest/refpages/source/VkAccelerationStructureTrianglesOpacityMicromapKHR.html)
structure is not equivalent to the one provided with `VK_EXT_opacity_micromap`.

* 
The `indexBuffer` parameter is now a `VkDeviceAddress` type as micromaps
are not permitted in host acceleration structure builds.

* 
The `micromap` parameter is now a `VkAccelerationStructureKHR` object

Micromaps can be built as lossy with a new flag:

VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR = 0x00000400

Lossy micromaps allow an implementation to build the micromap with lossy compression
and/or support more subdivision levels.

During traversal, a micromap built as lossy may substitute any state for
`VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR` or
`VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR`. The implementation,
on an identically created instance and device, must perform any lossy substitutions
invariantly with respect to acceleration structures and micromaps constructed
with an equivalent shape and data.

Equivalent shape and data is left without complete definition since there
are many ways to eventually construct the same effective micromap. The most
conservative option would be for app to construct the micromap using the
exact same methods and inputs to guarantee invariance. The invariance
guarantee is only provided to give a deterministic workload and should
not be relied upon for functional invariance.

Applications should make sure that the any-hit shader or ray query hit
confirmation is compatible with the built state, for example, it should
ignore intersections with elements built with fully transparent and
accept intersections with elements built with fully opaque states.
This way, when a potential substitution happens from one of those states
to a fully unknown state, traversal still behaves in the expected manner
even though the shader is invoked.

Lossy compression potentially offers a tradeoff between speeding up traversal at the
cost of possibly more shader invocations. It allows the implementation to
approximate regions of the micromap to a single state, conservatively invoking
shader code instead of finding the exact intersection element. Since the
substitution is required to be invariantly applied, this tradeoff is deterministic.

Similar methods could also be employed by the implementation to expose more
subdivision levels than what it normally supports without requiring applications
to downsample the micromap. The implementation could compress the micromap such
that the highest level it supports is an approximation of the levels above it,
letting the application to finely resolve these unsupported levels in the
shader. The limit `maxOpacityLossy4StateSubdivisionLevel` reports
the new maximum subdivision levels.

This extension provides a significantly different interface than `VK_EXT_opacity_micromap`,
described elsewhere, therefore the feature struct
[VkPhysicalDeviceOpacityMicromapFeaturesKHR](../../../../refpages/latest/refpages/source/VkPhysicalDeviceOpacityMicromapFeaturesKHR.html)
is not equivalent to the feature struct from `VK_EXT_opacity_micromap`.

Enabling features for one of these will not enable the counterpart feature in the other extension.

The `VkPhysicalDeviceOpacityMicromapFeaturesEXT::micromapHostCommands` feature is not promoted
due to host commands being removed, and
`VkPhysicalDeviceOpacityMicromapFeaturesEXT::micromapCaptureReplay` is superseded with
`VkPhysicalDeviceAccelerationStructureFeaturesKHR ::accelerationStructureCaptureReplay`.

The property struct
[VkPhysicalDeviceOpacityMicromapPropertiesKHR](../../../../refpages/latest/refpages/source/VkPhysicalDeviceOpacityMicromapPropertiesKHR.html)
is not equivalent to the property struct from `VK_EXT_opacity_micromap` due to inclusion of
a couple new properties:

* 
`maxOpacityLossy4StateSubdivisionLevel`

* 
`maxMicromapTriangles`

The discardable property for micromaps is not promoted, and the BLAS will always hold a reference to the micromap.
This feature was not widely supported and has minimal benefit to memory footprint. Not promoting this reduces the
number of paths that applications should support.

This also includes removal of
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT`, as this was mostly intended for use
with discardable micromaps where the implementation integrates it within the acceleration structure’s internal
representation.

Acceleration structures being serialized have references to micromaps built with them. These device addresses
are placed in a newly defined `VK_ACCELERATION_STRUCTURE_SERIALIZED_BLOCK_TYPE_OPACITY_MICROMAP_KHR` type block in the serialized data.

typedef enum VkAccelerationStructureSerializedBlockTypeKHR {
    VK_ACCELERATION_STRUCTURE_SERIALIZED_BLOCK_TYPE_OPACITY_MICROMAP_KHR = 0,
    VK_ACCELERATION_STRUCTURE_SERIALIZED_BLOCK_TYPE_MAX_ENUM_KHR = 0x7FFFFFFF
} VkAccelerationStructureSerializedBlockTypeKHR;

First, a bottom-level acceleration structure defines how many blocks it contains in the serialized header:

* 
A 64-bit integer consisting of two packed 32 bit values. The high 32 bits
are 0xFFFFFFFF to indicate a block-based format, and the low 32 bits
contain the number of serialized blocks that follow

Then each block is enumerated in the header, which looks like the following:

* 
A 32-bit unsigned integer set to
`VK_ACCELERATION_STRUCTURE_SERIALIZED_BLOCK_TYPE_OPACITY_MICROMAP_KHR`

* 
A 32-bit reserved value for alignment

* 
A 64-bit unsigned integer indicating the number of block buffer device
addresses that follow the block header

* 
An array of 64-bit buffer device addresses pointing to micromaps,
with the count matching the previous value

The application is responsible for keeping a mapping between these addresses and their respective micromaps.
Before deserializing the BLAS, applications must replace them in the serialized block with the addresses of newly
created micromaps, or create the micromaps with the same device addresses through capture/replay mechanisms.

Before the BLAS is used, its micromaps must be deserialized from the serialized data of the micromaps
originally referenced by the serialized BLAS, or replaced by newly constructed micromaps with a BLAS
update if it was originally built with the
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR` flag.

Applications cannot update a deserialized BLAS with a micromap data only update, it can only perform
a full micromap reference replacement build update. Implementations cannot reasonably guarantee that
the internal data structures are compatible for data only update between the serialize and
deserialize Vulkan instances.

    VkAccelerationStructureGeometryMicromapDataKHR micromapData = {
          .sType               = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MICROMAP_DATA_KHR,
          .usageCountsCount    = usageCount,
          .pUsageCounts        = &usage,
          .triangleArrayStride = 8
    };

    VkAccelerationStructureGeometryKHR geometry = {
      .sType        = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR,
      .pNext        = &micromapData,
      .geometryType = VK_GEOMETRY_TYPE_MICROMAP_KHR
    };

    VkAccelerationStructureBuildGeometryInfoKHR buildInfo = {
      .sType         = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_GEOMETRY_INFO_KHR,
      .type          = VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR,
      .mode          = VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR,
      .geometryCount = 1,
      .pGeometries   = &geometry
    };

    VkAccelerationStructureBuildSizesInfoKHR sizeInfo = {
        .sType = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR,
    };

    vkGetAccelerationStructureBuildSizesKHR(device,
                                            VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR
                                            &buildInfo,
                                            NULL,
                                            &sizeInfo);

    // Create with VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR | VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT
    micromapBufferAddress = CreateBuffer(sizeInfo.accelerationStructureSize);

    // Create with VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT
    scratchBufferAddress  = CreateBuffer(sizeInfo.buildScratchSize);

    VkAccelerationStructureCreateInfo2KHR  createInfo = {
        .sType        = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_KHR,
        .addressRange = bufferAddress,
        .type         = VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR
    };

    vkCreateAccelerationStructure2KHR(device, &createInfo, NULL, &micromap);

    buildInfo.dstAccelerationStructure = micromap;
    buildInfo.scratchData              = scratchBufferAddress;

    // Created with VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR | VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT
    buildInfo.pGeometries[0].geometry.data          = dataAddress;
    buildInfo.pGeometries[0].geometry.triangleArray = triangleArrayAddress;

    VkAccelerationStructureBuildRangeInfoKHR buildRangeInfo[1] = {};

    vkCmdBuildAccelerationStructuresKHR(cmdBuf, 1, &buildInfo, &buildRangeInfo);

    VkAccelerationStructureTrianglesOpacityMicromapKHR opacityGeometryMicromap = {
        .sType        = VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_KHR,
        .indexType    = indexType,
        .indexBuffer  = indexBufferAddress,
        .indexStride  = indexStride,
        .baseTriangle = baseTriangle,
        .micromap     = micromap
    };

    VkAccelerationStructureGeometryKHR bottomASGeometry = { VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR };

    bottomASGeometry... = ;
    bottomASGeometry.pNext = &opacityGeometryMicromap;

    vkGetAccelerationStructureBuildSizesKHR()
    vkCreateAccelerationStructureKHR()
    vkCmdBuildAccelerationStructureKHR()

All of the issues are in the spec documents.
