# Micromap

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html

## Table of Contents

- [Micromaps](#micromap-def)
- [Building Micromaps](#micromap-building)
- [Copying Micromaps](#micromap-copying)
- [Host Micromap Operations](#host-micromap)
- [Host_Micromap_Operations](#host-micromap)
- [Displacement Micromap](#displacement-micromap)
- [Displacement Base Triangle](#_displacement_base_triangle)
- [Displacement_Base_Triangle](#_displacement_base_triangle)
- [Displacement Micromap Encoding](#displacement-micromap-encoding)
- [Displacement_Micromap_Encoding](#displacement-micromap-encoding)

## Content

*Acceleration structures* store and organize geometry for ray tracing, but
in some cases it is beneficial to include some information within the
geometry, particularly for triangles.
A *micromap* organizes this data around a map of values corresponding to
subdivided microtriangles which can be added to a triangle geometry when
building a *bottom level acceleration structure*.

An *opacity micromap* is a type of micromap which stores information to
control intersection opacity as described in [Ray Opacity Micromap](../raytraversal.html#ray-opacity-micromap).

A *displacement micromap* is a type of micromap which stores information to
displace sub-triangle vertices as described in [Displacement Micromap](#displacement-micromap).

A micromap is considered to be constructed if a [micromap build command](#micromap-building) or [copy command](#micromap-copying) has been executed with
the given acceleration structure as the destination.

To build micromaps call:

// Provided by VK_EXT_opacity_micromap
void vkCmdBuildMicromapsEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkMicromapBuildInfoEXT*               pInfos);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of micromaps to build.
It specifies the number of the `pInfos` structures that **must** be
provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structures defining the data used to build
each micromap.

The `vkCmdBuildMicromapsEXT` command provides the ability to initiate
multiple micromaps builds, however there is no ordering or synchronization
implied between any of the individual micromap builds.

|  | This means that there **cannot** be any memory aliasing between any micromap
| --- | --- |
memories or scratch memories being used by any of the builds. |

Accesses to the micromap scratch buffers as identified by the
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT)::`scratchData` buffer device addresses
**must** be [synchronized](../synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
([VK_ACCESS_2_MICROMAP_READ_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR) |
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR)).
Accesses to [VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT)::`dstMicromap` **must** be
[synchronized](../synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR).

Accesses to other input buffers as identified by any used values of
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT)::`data` or
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT)::`triangleArray` **must** be
[synchronized](../synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_SHADER_READ_BIT](../synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07461) VUID-vkCmdBuildMicromapsEXT-pInfos-07461

For each `pInfos`[i], `dstMicromap` **must** have been created with
a value of [VkMicromapCreateInfoEXT](../resources.html#VkMicromapCreateInfoEXT)::`size` greater than or
equal to the memory size required by the build operation, as returned by
[vkGetMicromapBuildSizesEXT](../resources.html#vkGetMicromapBuildSizesEXT) with `pBuildInfo` =
`pInfos`[i]

* 
[](#VUID-vkCmdBuildMicromapsEXT-mode-07462) VUID-vkCmdBuildMicromapsEXT-mode-07462

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildMicromapModeEXT](#VkBuildMicromapModeEXT) value

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07463) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07463

The `dstMicromap` member of any element of `pInfos` **must** be a
valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07464) VUID-vkCmdBuildMicromapsEXT-pInfos-07464

For each element of `pInfos` its `type` member **must** match the
value of [VkMicromapCreateInfoEXT](../resources.html#VkMicromapCreateInfoEXT)::`type` when its
`dstMicromap` was created

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07465) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07465

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `dstMicromap` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildMicromapsEXT-dstMicromap-07466) VUID-vkCmdBuildMicromapsEXT-dstMicromap-07466

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any element of
`pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkCmdBuildMicromapsEXT-scratchData-07467) VUID-vkCmdBuildMicromapsEXT-scratchData-07467

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07508) VUID-vkCmdBuildMicromapsEXT-pInfos-07508

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07509) VUID-vkCmdBuildMicromapsEXT-pInfos-07509

If `pInfos`[i].`mode` is [VK_BUILD_MICROMAP_MODE_BUILD_EXT](#VkBuildMicromapModeEXT),
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `buildScratchSize` member of the
[VkMicromapBuildSizesInfoEXT](../resources.html#VkMicromapBuildSizesInfoEXT) structure returned from a call to
[vkGetMicromapBuildSizesEXT](../resources.html#vkGetMicromapBuildSizesEXT) with an identical
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structure and primitive count

* 
[](#VUID-vkCmdBuildMicromapsEXT-data-07510) VUID-vkCmdBuildMicromapsEXT-data-07510

The buffers from which the buffer device addresses for all of the
`data` and `triangleArray` members of all `pInfos`[i] are
queried **must** have been created with the
[VK_BUFFER_USAGE_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](../resources.html#VkBufferUsageFlagBits) usage flag
set

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07511) VUID-vkCmdBuildMicromapsEXT-pInfos-07511

For each element of `pInfos`[i] the buffer from which the buffer
device address `pInfos`[i].`scratchData.deviceAddress` is
queried **must** have been created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07512) VUID-vkCmdBuildMicromapsEXT-pInfos-07512

For each element of `pInfos`, if the value of
[VkMicromapBuildSizesInfoEXT](../resources.html#VkMicromapBuildSizesInfoEXT)::`buildScratchSize`, returned from
a call to [vkGetMicromapBuildSizesEXT](../resources.html#vkGetMicromapBuildSizesEXT) with an identical
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structure, is not `0`,
`scratchData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-10896) VUID-vkCmdBuildMicromapsEXT-pInfos-10896

For each element of `pInfos`, `data.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-10897) VUID-vkCmdBuildMicromapsEXT-pInfos-10897

For each element of `pInfos`, `triangleArray.deviceAddress`
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07514) VUID-vkCmdBuildMicromapsEXT-pInfos-07514

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](../limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-07515) VUID-vkCmdBuildMicromapsEXT-pInfos-07515

For each element of `pInfos`, its `triangleArray.deviceAddress`
and `data.deviceAddress` members **must** be a multiple of `256`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-parameter) VUID-vkCmdBuildMicromapsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildMicromapsEXT-pInfos-parameter) VUID-vkCmdBuildMicromapsEXT-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structures

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-recording) VUID-vkCmdBuildMicromapsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildMicromapsEXT-commandBuffer-cmdpool) VUID-vkCmdBuildMicromapsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBuildMicromapsEXT-renderpass) VUID-vkCmdBuildMicromapsEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildMicromapsEXT-suspended) VUID-vkCmdBuildMicromapsEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildMicromapsEXT-videocoding) VUID-vkCmdBuildMicromapsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildMicromapsEXT-infoCount-arraylength) VUID-vkCmdBuildMicromapsEXT-infoCount-arraylength

 `infoCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildMicromapsEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

Formats which **can** be set in [VkMicromapUsageEXT](#VkMicromapUsageEXT)::`format` and
[VkMicromapTriangleEXT](#VkMicromapTriangleEXT)::`format` for micromap builds, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkOpacityMicromapFormatEXT {
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT = 1,
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT = 2,
} VkOpacityMicromapFormatEXT;

* 
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) specifies that the given
micromap format has one bit per subtriangle encoding either fully opaque
or fully transparent.

* 
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT) specifies that the given
micromap format has two bits per subtriangle encoding four modes which
can be interpreted as described in [ray    traversal](../raytraversal.html#ray-opacity-micromap).

|  | For compactness, these values are stored as 16-bit in some structures. |
| --- | --- |

Formats which **can** be set in [VkMicromapUsageEXT](#VkMicromapUsageEXT)::`format` and
[VkMicromapTriangleEXT](#VkMicromapTriangleEXT)::`format` for micromap builds, are:

// Provided by VK_NV_displacement_micromap
typedef enum VkDisplacementMicromapFormatNV {
    VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV = 1,
    VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV = 2,
    VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV = 3,
} VkDisplacementMicromapFormatNV;

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](#VkDisplacementMicromapFormatNV) specifies
that the given micromap format encodes 64 micro-triangles worth of
displacements in 64 bytes as described in
[Displacement Micromap Encoding](#displacement-micromap-encoding).

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)
specifies that the given micromap format encodes 256 micro-triangles
worth of displacements in 128 bytes as described in
[Displacement Micromap Encoding](#displacement-micromap-encoding).

* 
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)
specifies that the given micromap format encodes 1024 micro-triangles
worth of displacements in 128 bytes as described in
[Displacement Micromap Encoding](#displacement-micromap-encoding).

|  | For compactness, these values are stored as 16-bit in some structures. |
| --- | --- |

The `VkMicromapBuildInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapBuildInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkMicromapTypeEXT                   type;
    VkBuildMicromapFlagsEXT             flags;
    VkBuildMicromapModeEXT              mode;
    VkMicromapEXT                       dstMicromap;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageEXT*           pUsageCounts;
    const VkMicromapUsageEXT* const*    ppUsageCounts;
    VkDeviceOrHostAddressConstKHR       data;
    VkDeviceOrHostAddressKHR            scratchData;
    VkDeviceOrHostAddressConstKHR       triangleArray;
    VkDeviceSize                        triangleArrayStride;
} VkMicromapBuildInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) value specifying the type of
micromap being built.

* 
`flags` is a bitmask of [VkBuildMicromapFlagBitsEXT](../resources.html#VkBuildMicromapFlagBitsEXT) specifying
additional parameters of the micromap.

* 
`mode` is a [VkBuildMicromapModeEXT](#VkBuildMicromapModeEXT) value specifying the type
of operation to perform.

* 
`dstMicromap` is a pointer to the target micromap for the build.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageEXT](#VkMicromapUsageEXT)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageEXT](#VkMicromapUsageEXT) structures.

* 
`data` is the device or host address of memory which contains the
data for the micromap.

* 
`scratchData` is the device or host address of memory that will be
used as scratch memory for the build.

* 
`triangleArray` is the device or host address of memory containing
the [VkMicromapTriangleEXT](#VkMicromapTriangleEXT) data

* 
`triangleArrayStride` is the stride in bytes between each element of
`triangleArray`

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total counts used to build
each micromap.
Each element contains a `count` which is the number of micromap
triangles of that `format` and `subdivisionLevel` contained in the
micromap.
Multiple elements with the same `format` and `subdivisionLevel` are
allowed and the total count for that `format` and `subdivisionLevel`
is the sum of the `count` for each element.

Each micromap triangle refers to one element in `triangleArray` which
contains the `format` and `subdivisionLevel` for that particular
triangle as well as a `dataOffset` in bytes which is the location
relative to `data` where that triangle’s micromap data begins.
The data at `triangleArray` is laid out as a 4 byte unsigned integer for
the `dataOffset` followed by a 2 byte unsigned integer for the
subdivision level then a 2 byte unsigned integer for the format.
In practice, compilers compile [VkMicromapTriangleEXT](#VkMicromapTriangleEXT) to match this
pattern.

For opacity micromaps, the data at `data` is packed as either one bit
per element for [VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) or two bits per
element for [VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT) and is packed from
LSB to MSB in each byte.
The data at each index in those bytes is interpreted as discussed in
[Ray Opacity Micromap](../raytraversal.html#ray-opacity-micromap).

For displacement micromaps, the data at `data` is interpreted as
discussed in [Displacement Micromap Encoding](#displacement-micromap-encoding).

Valid Usage

* 
[](#VUID-VkMicromapBuildInfoEXT-pUsageCounts-07516) VUID-VkMicromapBuildInfoEXT-pUsageCounts-07516

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

* 
[](#VUID-VkMicromapBuildInfoEXT-type-07517) VUID-VkMicromapBuildInfoEXT-type-07517

If `type` is [VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) the
`format` member of [VkMicromapUsageEXT](#VkMicromapUsageEXT) **must** be a valid value
from [VkOpacityMicromapFormatEXT](#VkOpacityMicromapFormatEXT)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-07518) VUID-VkMicromapBuildInfoEXT-type-07518

If `type` is [VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) the
`format` member of [VkMicromapTriangleEXT](#VkMicromapTriangleEXT) **must** be a valid
value from [VkOpacityMicromapFormatEXT](#VkOpacityMicromapFormatEXT)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-08704) VUID-VkMicromapBuildInfoEXT-type-08704

If `type` is [VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) the
`format` member of [VkMicromapUsageEXT](#VkMicromapUsageEXT) **must** be a valid value
from [VkDisplacementMicromapFormatNV](#VkDisplacementMicromapFormatNV)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-08705) VUID-VkMicromapBuildInfoEXT-type-08705

If `type` is [VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) the
`format` member of [VkMicromapTriangleEXT](#VkMicromapTriangleEXT) **must** be a valid
value from [VkDisplacementMicromapFormatNV](#VkDisplacementMicromapFormatNV)

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapBuildInfoEXT-sType-sType) VUID-VkMicromapBuildInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_BUILD_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkMicromapBuildInfoEXT-pNext-pNext) VUID-VkMicromapBuildInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapBuildInfoEXT-type-parameter) VUID-VkMicromapBuildInfoEXT-type-parameter

 `type` **must** be a valid [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) value

* 
[](#VUID-VkMicromapBuildInfoEXT-flags-parameter) VUID-VkMicromapBuildInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkBuildMicromapFlagBitsEXT](../resources.html#VkBuildMicromapFlagBitsEXT) values

* 
[](#VUID-VkMicromapBuildInfoEXT-pUsageCounts-parameter) VUID-VkMicromapBuildInfoEXT-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` [VkMicromapUsageEXT](#VkMicromapUsageEXT) structures

* 
[](#VUID-VkMicromapBuildInfoEXT-ppUsageCounts-parameter) VUID-VkMicromapBuildInfoEXT-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to [VkMicromapUsageEXT](#VkMicromapUsageEXT) structures

The [VkBuildMicromapModeEXT](#VkBuildMicromapModeEXT) enumeration is defined as:

// Provided by VK_EXT_opacity_micromap
typedef enum VkBuildMicromapModeEXT {
    VK_BUILD_MICROMAP_MODE_BUILD_EXT = 0,
} VkBuildMicromapModeEXT;

* 
[VK_BUILD_MICROMAP_MODE_BUILD_EXT](#VkBuildMicromapModeEXT) specifies that the destination
micromap will be built using the specified data.

The `VkMicromapUsageEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapUsageEXT {
    uint32_t    count;
    uint32_t    subdivisionLevel;
    uint32_t    format;
} VkMicromapUsageEXT;

* 
`count` is the number of triangles in the usage format defined by
the `subdivisionLevel` and `format` below in the micromap

* 
`subdivisionLevel` is the subdivision level of this usage format

* 
`format` is the format of this usage format

Valid Usage

* 
[](#VUID-VkMicromapUsageEXT-format-07519) VUID-VkMicromapUsageEXT-format-07519

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) then `format` **must** be
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) or
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT)

* 
[](#VUID-VkMicromapUsageEXT-format-07520) VUID-VkMicromapUsageEXT-format-07520

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](../limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT)::`maxOpacity2StateSubdivisionLevel`

* 
[](#VUID-VkMicromapUsageEXT-format-07521) VUID-VkMicromapUsageEXT-format-07521

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](../limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT)::`maxOpacity4StateSubdivisionLevel`

* 
[](#VUID-VkMicromapUsageEXT-format-08706) VUID-VkMicromapUsageEXT-format-08706

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) then `format` **must**
be [VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](#VkDisplacementMicromapFormatNV),
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV) or
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)

* 
[](#VUID-VkMicromapUsageEXT-subdivisionLevel-08707) VUID-VkMicromapUsageEXT-subdivisionLevel-08707

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) then
`subdivisionLevel` **must** be less than or equal to
[VkPhysicalDeviceDisplacementMicromapPropertiesNV](../limits.html#VkPhysicalDeviceDisplacementMicromapPropertiesNV)::`maxDisplacementMicromapSubdivisionLevel`

The `format` is interpreted based on the `type` of the micromap
using it.

The `VkMicromapTriangleEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapTriangleEXT {
    uint32_t    dataOffset;
    uint16_t    subdivisionLevel;
    uint16_t    format;
} VkMicromapTriangleEXT;

* 
`dataOffset` is the offset in bytes of the start of the data for
this triangle.
This is a byte aligned value.

* 
`subdivisionLevel` is the subdivision level of this triangle

* 
`format` is the format of this triangle

Valid Usage

* 
[](#VUID-VkMicromapTriangleEXT-format-07522) VUID-VkMicromapTriangleEXT-format-07522

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) then `format` **must** be
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) or
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT)

* 
[](#VUID-VkMicromapTriangleEXT-format-07523) VUID-VkMicromapTriangleEXT-format-07523

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#VkOpacityMicromapFormatEXT) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](../limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT)::`maxOpacity2StateSubdivisionLevel`

* 
[](#VUID-VkMicromapTriangleEXT-format-07524) VUID-VkMicromapTriangleEXT-format-07524

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](../resources.html#VkMicromapTypeEXT) and `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#VkOpacityMicromapFormatEXT) then `subdivisionLevel`
**must** be less than or equal to
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](../limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT)::`maxOpacity4StateSubdivisionLevel`

* 
[](#VUID-VkMicromapTriangleEXT-format-08708) VUID-VkMicromapTriangleEXT-format-08708

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) then `format` **must**
be [VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](#VkDisplacementMicromapFormatNV),
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV) or
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)

* 
[](#VUID-VkMicromapTriangleEXT-subdivisionLevel-08709) VUID-VkMicromapTriangleEXT-subdivisionLevel-08709

If the [VkMicromapTypeEXT](../resources.html#VkMicromapTypeEXT) of the micromap is
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](../resources.html#VkMicromapTypeEXT) then
`subdivisionLevel` **must** be less than or equal to
[VkPhysicalDeviceDisplacementMicromapPropertiesNV](../limits.html#VkPhysicalDeviceDisplacementMicromapPropertiesNV)::`maxDisplacementMicromapSubdivisionLevel`

The `format` is interpreted based on the `type` of the micromap
using it.

An additional command exists for copying micromaps without updating their
contents.
Before copying, an application **must** query the size of the resulting
micromap.

To query micromap size parameters call:

// Provided by VK_EXT_opacity_micromap
void vkCmdWriteMicromapsPropertiesEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    micromapCount,
    const VkMicromapEXT*                        pMicromaps,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`micromapCount` is the count of micromaps for which to query the
property.

* 
`pMicromaps` is a pointer to an array of existing previously built
micromaps.

* 
`queryType` is a [VkQueryType](../queries.html#VkQueryType) value specifying the type of
queries managed by the pool.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`firstQuery` is the first query index within the query pool that
will contain the `micromapCount` number of results.

Accesses to any of the micromaps listed in `pMicromaps` **must** be
[synchronized](../synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR).

* 
If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType), then the value
written out is the number of bytes required by a serialized micromap.

* 
If `queryType` is [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType),
then the value written out is the number of bytes required by a
compacted micromap.

Valid Usage

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07525) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07525

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07526) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07526

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-buffer-07527) VUID-vkCmdWriteMicromapsPropertiesEXT-buffer-07527

The `buffer` used to create each micromap in `pMicrmaps` **must**
be bound to device memory

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-query-07528) VUID-vkCmdWriteMicromapsPropertiesEXT-query-07528

The sum of `query` plus `micromapCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07501) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07501

All micromaps in `pMicromaps` **must** have been constructed prior to
the execution of this command

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07502) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07502

All micromaps in `pMicromaps` **must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](../resources.html#VkBuildMicromapFlagBitsEXT) if `queryType` is
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-07503) VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-07503

`queryType` **must** be [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType)
or [VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-parameter

 `pMicromaps` **must** be a valid pointer to an array of `micromapCount` valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handles

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](../queries.html#VkQueryType) value

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](../queries.html#VkQueryPool) handle

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-recording) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-cmdpool) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-renderpass) VUID-vkCmdWriteMicromapsPropertiesEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-suspended) VUID-vkCmdWriteMicromapsPropertiesEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-videocoding) VUID-vkCmdWriteMicromapsPropertiesEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-micromapCount-arraylength) VUID-vkCmdWriteMicromapsPropertiesEXT-micromapCount-arraylength

 `micromapCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commonparent) VUID-vkCmdWriteMicromapsPropertiesEXT-commonparent

 Each of `commandBuffer`, `queryPool`, and the elements of `pMicromaps` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdWriteMicromapsPropertiesEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

To copy a micromap call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMicromapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMicromapInfoEXT*                pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyMicromapInfoEXT](#VkCopyMicromapInfoEXT) structure
defining the copy operation.

This command copies the `pInfo->src` micromap to the `pInfo->dst`
micromap in the manner specified by `pInfo->mode`.

Accesses to `pInfo->src` and `pInfo->dst` **must** be
[synchronized](../synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyMicromapEXT-buffer-07529) VUID-vkCmdCopyMicromapEXT-buffer-07529

The `buffer` used to create `pInfo->src` **must** be bound to
device memory

* 
[](#VUID-vkCmdCopyMicromapEXT-buffer-07530) VUID-vkCmdCopyMicromapEXT-buffer-07530

The `buffer` used to create `pInfo->dst` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-parameter) VUID-vkCmdCopyMicromapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyMicromapEXT-pInfo-parameter) VUID-vkCmdCopyMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapInfoEXT](#VkCopyMicromapInfoEXT) structure

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-recording) VUID-vkCmdCopyMicromapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMicromapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyMicromapEXT-renderpass) VUID-vkCmdCopyMicromapEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMicromapEXT-suspended) VUID-vkCmdCopyMicromapEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMicromapEXT-videocoding) VUID-vkCmdCopyMicromapEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyMicromapEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The `VkCopyMicromapInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMicromapInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkMicromapEXT            src;
    VkMicromapEXT            dst;
    VkCopyMicromapModeEXT    mode;
} VkCopyMicromapInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source micromap for the copy.

* 
`dst` is the target micromap for the copy.

* 
`mode` is a [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-07531) VUID-VkCopyMicromapInfoEXT-mode-07531

`mode` **must** be [VK_COPY_MICROMAP_MODE_COMPACT_EXT](#VkCopyMicromapModeEXT) or
[VK_COPY_MICROMAP_MODE_CLONE_EXT](#VkCopyMicromapModeEXT)

* 
[](#VUID-VkCopyMicromapInfoEXT-src-07532) VUID-VkCopyMicromapInfoEXT-src-07532

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-07533) VUID-VkCopyMicromapInfoEXT-mode-07533

If `mode` is [VK_COPY_MICROMAP_MODE_COMPACT_EXT](#VkCopyMicromapModeEXT), `src`
**must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](../resources.html#VkBuildMicromapFlagBitsEXT) in the build

* 
[](#VUID-VkCopyMicromapInfoEXT-buffer-07534) VUID-VkCopyMicromapInfoEXT-buffer-07534

The `buffer` used to create `src` **must** be bound to device
memory

* 
[](#VUID-VkCopyMicromapInfoEXT-buffer-07535) VUID-VkCopyMicromapInfoEXT-buffer-07535

The `buffer` used to create `dst` **must** be bound to device
memory

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMicromapInfoEXT-sType-sType) VUID-VkCopyMicromapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MICROMAP_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyMicromapInfoEXT-pNext-pNext) VUID-VkCopyMicromapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMicromapInfoEXT-src-parameter) VUID-VkCopyMicromapInfoEXT-src-parameter

 `src` **must** be a valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-VkCopyMicromapInfoEXT-dst-parameter) VUID-VkCopyMicromapInfoEXT-dst-parameter

 `dst` **must** be a valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-VkCopyMicromapInfoEXT-mode-parameter) VUID-VkCopyMicromapInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value

* 
[](#VUID-VkCopyMicromapInfoEXT-commonparent) VUID-VkCopyMicromapInfoEXT-commonparent

 Both of `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Possible values of `mode` specifying additional operations to perform
during the copy, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkCopyMicromapModeEXT {
    VK_COPY_MICROMAP_MODE_CLONE_EXT = 0,
    VK_COPY_MICROMAP_MODE_SERIALIZE_EXT = 1,
    VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT = 2,
    VK_COPY_MICROMAP_MODE_COMPACT_EXT = 3,
} VkCopyMicromapModeEXT;

* 
[VK_COPY_MICROMAP_MODE_CLONE_EXT](#VkCopyMicromapModeEXT) creates a direct copy of the
micromap specified in `src` into the one specified by `dst`.
The `dst` micromap **must** have been created with the same parameters
as `src`.

* 
[VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](#VkCopyMicromapModeEXT) serializes the micromap to a
semi-opaque format which can be reloaded on a compatible implementation.

* 
[VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](#VkCopyMicromapModeEXT) deserializes the semi-opaque
serialization format in the buffer to the micromap.

* 
[VK_COPY_MICROMAP_MODE_COMPACT_EXT](#VkCopyMicromapModeEXT) creates a more compact version
of a micromap `src` into `dst`.
The micromap `dst` **must** have been created with a size at least as
large as that returned by [vkCmdWriteMicromapsPropertiesEXT](#vkCmdWriteMicromapsPropertiesEXT) after
the build of the micromap specified by `src`.

To copy a micromap to device memory call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMicromapToMemoryEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMicromapToMemoryInfoEXT*        pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is an a pointer to a [VkCopyMicromapToMemoryInfoEXT](#VkCopyMicromapToMemoryInfoEXT)
structure defining the copy operation.

Accesses to `pInfo->src` **must** be [synchronized](../synchronization.html#synchronization-dependencies) with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR).
Accesses to the buffer indicated by `pInfo->dst.deviceAddress` **must** be
synchronized with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
pipeline stage and an access type of [VK_ACCESS_TRANSFER_WRITE_BIT](../synchronization.html#VkAccessFlagBits).

This command produces the same results as [vkCopyMicromapToMemoryEXT](#vkCopyMicromapToMemoryEXT),
but writes its result to a device address, and is executed on the device
rather than the host.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToMicromapEXT](#vkCmdCopyMemoryToMicromapEXT) or
[vkCopyMemoryToMicromapEXT](#vkCopyMemoryToMicromapEXT).

The defined header structure for the serialized data consists of:

* 
[VK_UUID_SIZE](../devsandqueues.html#VK_UUID_SIZE) bytes of data matching
`VkPhysicalDeviceIDProperties`::`driverUUID`

* 
[VK_UUID_SIZE](../devsandqueues.html#VK_UUID_SIZE) bytes of data identifying the compatibility for
    comparison using [vkGetDeviceMicromapCompatibilityEXT](#vkGetDeviceMicromapCompatibilityEXT)
The serialized data is written to the buffer (or read from the buffer)
according to the host endianness.

Valid Usage

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07536) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07536

`pInfo->dst.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07537) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07537

`pInfo->dst.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07538) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07538

If the buffer pointed to by `pInfo->dst.deviceAddress` is non-sparse
then it **must** be bound completely and contiguously to a single
[VkDeviceMemory](../memory.html#VkDeviceMemory) object

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-buffer-07539) VUID-vkCmdCopyMicromapToMemoryEXT-buffer-07539

The `buffer` used to create `pInfo->src` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-parameter) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-parameter) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapToMemoryInfoEXT](#VkCopyMicromapToMemoryInfoEXT) structure

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-recording) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-renderpass) VUID-vkCmdCopyMicromapToMemoryEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-suspended) VUID-vkCmdCopyMicromapToMemoryEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-videocoding) VUID-vkCmdCopyMicromapToMemoryEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyMicromapToMemoryEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMicromapToMemoryInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkMicromapEXT               src;
    VkDeviceOrHostAddressKHR    dst;
    VkCopyMicromapModeEXT       mode;
} VkCopyMicromapToMemoryInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source micromap for the copy

* 
`dst` is the device or host address of memory which is the target
for the copy

* 
`mode` is a [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-src-07540) VUID-VkCopyMicromapToMemoryInfoEXT-src-07540

The source micromap `src` **must** have been constructed prior to the
execution of this command

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-dst-07541) VUID-VkCopyMicromapToMemoryInfoEXT-dst-07541

The memory pointed to by `dst` **must** be at least as large as the
serialization size of `src`, as reported by
[vkWriteMicromapsPropertiesEXT](#vkWriteMicromapsPropertiesEXT) or
[vkCmdWriteMicromapsPropertiesEXT](#vkCmdWriteMicromapsPropertiesEXT) with a query type of
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-mode-07542) VUID-VkCopyMicromapToMemoryInfoEXT-mode-07542

`mode` **must** be [VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](#VkCopyMicromapModeEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-sType-sType) VUID-VkCopyMicromapToMemoryInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MICROMAP_TO_MEMORY_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-pNext-pNext) VUID-VkCopyMicromapToMemoryInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-src-parameter) VUID-VkCopyMicromapToMemoryInfoEXT-src-parameter

 `src` **must** be a valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-VkCopyMicromapToMemoryInfoEXT-mode-parameter) VUID-VkCopyMicromapToMemoryInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value

To copy device memory to a micromap call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMemoryToMicromapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToMicromapInfoEXT*        pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyMemoryToMicromapInfoEXT](#VkCopyMemoryToMicromapInfoEXT)
structure defining the copy operation.

Accesses to `pInfo->dst` **must** be [synchronized](../synchronization.html#synchronization-dependencies) with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](../synchronization.html#synchronization-pipeline-stages) and an
[access type](../synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](../synchronization.html#VkAccessFlagBits2KHR).
Accesses to the buffer indicated by `pInfo->src.deviceAddress` **must** be
synchronized with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](../synchronization.html#VkPipelineStageFlagBits2KHR)
pipeline stage and an access type of [VK_ACCESS_TRANSFER_READ_BIT](../synchronization.html#VkAccessFlagBits).

This command can accept micromaps produced by either
[vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT) or [vkCopyMicromapToMemoryEXT](#vkCopyMicromapToMemoryEXT).

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07543) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07543

`pInfo->src.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07544) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07544

`pInfo->src.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07545) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07545

If the buffer pointed to by `pInfo->src.deviceAddress` is non-sparse
then it **must** be bound completely and contiguously to a single
[VkDeviceMemory](../memory.html#VkDeviceMemory) object

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-buffer-07546) VUID-vkCmdCopyMemoryToMicromapEXT-buffer-07546

The `buffer` used to create `pInfo->dst` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-parameter) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-parameter) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToMicromapInfoEXT](#VkCopyMemoryToMicromapInfoEXT) structure

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-recording) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-renderpass) VUID-vkCmdCopyMemoryToMicromapEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-suspended) VUID-vkCmdCopyMemoryToMicromapEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-videocoding) VUID-vkCmdCopyMemoryToMicromapEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyMemoryToMicromapEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The `VkCopyMemoryToMicromapInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkCopyMemoryToMicromapInfoEXT {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    src;
    VkMicromapEXT                    dst;
    VkCopyMicromapModeEXT            mode;
} VkCopyMemoryToMicromapInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the device or host address of memory containing the source
data for the copy.

* 
`dst` is the target micromap for the copy.

* 
`mode` is a [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value specifying additional
operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-src-07547) VUID-VkCopyMemoryToMicromapInfoEXT-src-07547

The source memory pointed to by `src` **must** contain data previously
serialized using [vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-mode-07548) VUID-VkCopyMemoryToMicromapInfoEXT-mode-07548

`mode` **must** be [VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](#VkCopyMicromapModeEXT)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-src-07549) VUID-VkCopyMemoryToMicromapInfoEXT-src-07549

The data in `src` **must** have a format compatible with the
destination physical device as returned by
[vkGetDeviceMicromapCompatibilityEXT](#vkGetDeviceMicromapCompatibilityEXT)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-dst-07550) VUID-VkCopyMemoryToMicromapInfoEXT-dst-07550

`dst` **must** have been created with a `size` greater than or
equal to that used to serialize the data in `src`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-sType-sType) VUID-VkCopyMemoryToMicromapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_TO_MICROMAP_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-pNext-pNext) VUID-VkCopyMemoryToMicromapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-dst-parameter) VUID-VkCopyMemoryToMicromapInfoEXT-dst-parameter

 `dst` **must** be a valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-VkCopyMemoryToMicromapInfoEXT-mode-parameter) VUID-VkCopyMemoryToMicromapInfoEXT-mode-parameter

 `mode` **must** be a valid [VkCopyMicromapModeEXT](#VkCopyMicromapModeEXT) value

To check if a serialized micromap is compatible with the current device
call:

// Provided by VK_EXT_opacity_micromap
void vkGetDeviceMicromapCompatibilityEXT(
    VkDevice                                    device,
    const VkMicromapVersionInfoEXT*             pVersionInfo,
    VkAccelerationStructureCompatibilityKHR*    pCompatibility);

* 
`device` is the device to check the version against.

* 
`pVersionInfo` is a pointer to a [VkMicromapVersionInfoEXT](#VkMicromapVersionInfoEXT)
structure specifying version information to check against the device.

* 
`pCompatibility` is a pointer to a
[VkAccelerationStructureCompatibilityKHR](../accelstructures.html#VkAccelerationStructureCompatibilityKHR) value in which
compatibility information is returned.

Valid Usage

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-micromap-07551) VUID-vkGetDeviceMicromapCompatibilityEXT-micromap-07551

The [`micromap`](../features.html#features-micromap) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-device-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-pVersionInfo-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-pVersionInfo-parameter

 `pVersionInfo` **must** be a valid pointer to a valid [VkMicromapVersionInfoEXT](#VkMicromapVersionInfoEXT) structure

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-pCompatibility-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-pCompatibility-parameter

 `pCompatibility` **must** be a valid pointer to a [VkAccelerationStructureCompatibilityKHR](../accelstructures.html#VkAccelerationStructureCompatibilityKHR) value

The `VkMicromapVersionInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapVersionInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const uint8_t*     pVersionData;
} VkMicromapVersionInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVersionData` is a pointer to the version header of a micromap as
defined in [vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT)

|  | `pVersionData` is a *pointer* to an array of 2×[VK_UUID_SIZE](../devsandqueues.html#VK_UUID_SIZE)
| --- | --- |
`uint8_t` values instead of two [VK_UUID_SIZE](../devsandqueues.html#VK_UUID_SIZE) arrays as the expected
use case for this member is to be pointed at the header of a previously
serialized micromap (via [vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT) or
[vkCopyMicromapToMemoryEXT](#vkCopyMicromapToMemoryEXT)) that is loaded in memory.
Using arrays would necessitate extra memory copies of the UUIDs. |

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapVersionInfoEXT-sType-sType) VUID-VkMicromapVersionInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_VERSION_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkMicromapVersionInfoEXT-pNext-pNext) VUID-VkMicromapVersionInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapVersionInfoEXT-pVersionData-parameter) VUID-VkMicromapVersionInfoEXT-pVersionData-parameter

 `pVersionData` **must** be a valid pointer to an array of    `uint8_t` values

Implementations are also required to provide host implementations of the
micromap operations if the [`micromapHostCommands`](../features.html#features-micromapHostCommands) feature is enabled:

* 
[vkBuildMicromapsEXT](#vkBuildMicromapsEXT) corresponding to [vkCmdBuildMicromapsEXT](#vkCmdBuildMicromapsEXT)

* 
[vkCopyMicromapEXT](#vkCopyMicromapEXT) corresponding to [vkCmdCopyMicromapEXT](#vkCmdCopyMicromapEXT)

* 
[vkCopyMicromapToMemoryEXT](#vkCopyMicromapToMemoryEXT) corresponding to
[vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT)

* 
[vkCopyMemoryToMicromapEXT](#vkCopyMemoryToMicromapEXT) corresponding to
[vkCmdCopyMemoryToMicromapEXT](#vkCmdCopyMemoryToMicromapEXT)

* 
[vkWriteMicromapsPropertiesEXT](#vkWriteMicromapsPropertiesEXT) corresponding to
[vkCmdWriteMicromapsPropertiesEXT](#vkCmdWriteMicromapsPropertiesEXT)

These commands are functionally equivalent to their device counterparts,
except that they are executed on the host timeline, rather than being
enqueued into command buffers.

All micromaps used by the host commands **must** be bound to host-visible
memory, and all input data for micromap builds **must** be referenced using
host addresses instead of device addresses.
Applications are not required to map micromap memory when using the host
commands.

|  | The [vkBuildMicromapsEXT](#vkBuildMicromapsEXT) and [vkCmdBuildMicromapsEXT](#vkCmdBuildMicromapsEXT) **may** use
| --- | --- |
different algorithms, and thus are not required to produce identical
structures.

Apart from these details, the host and device operations are
interchangeable. |

|  | For efficient execution, micromaps manipulated using these commands should
| --- | --- |
always be bound to host cached memory, as the implementation may need to
repeatedly read and write this memory during the execution of the command. |

To build micromaps on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkBuildMicromapsEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    uint32_t                                    infoCount,
    const VkMicromapBuildInfoEXT*               pInfos);

* 
`device` is the `VkDevice` for which the micromaps are being
built.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](../VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`infoCount` is the number of micromaps to build.
It specifies the number of the `pInfos` that **must** be provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structures defining the geometry used to
build each micromap.

This command fulfills the same task as [vkCmdBuildMicromapsEXT](#vkCmdBuildMicromapsEXT) but is
executed by the host.

The `vkBuildMicromapsEXT` command provides the ability to initiate
multiple micromaps builds, however there is no ordering or synchronization
implied between any of the individual micromap builds.

|  | This means that there **cannot** be any memory aliasing between any micromap
| --- | --- |
memories or scratch memories being used by any of the builds. |

Valid Usage

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07461) VUID-vkBuildMicromapsEXT-pInfos-07461

For each `pInfos`[i], `dstMicromap` **must** have been created with
a value of [VkMicromapCreateInfoEXT](../resources.html#VkMicromapCreateInfoEXT)::`size` greater than or
equal to the memory size required by the build operation, as returned by
[vkGetMicromapBuildSizesEXT](../resources.html#vkGetMicromapBuildSizesEXT) with `pBuildInfo` =
`pInfos`[i]

* 
[](#VUID-vkBuildMicromapsEXT-mode-07462) VUID-vkBuildMicromapsEXT-mode-07462

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildMicromapModeEXT](#VkBuildMicromapModeEXT) value

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07463) VUID-vkBuildMicromapsEXT-dstMicromap-07463

The `dstMicromap` member of any element of `pInfos` **must** be a
valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handle

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07464) VUID-vkBuildMicromapsEXT-pInfos-07464

For each element of `pInfos` its `type` member **must** match the
value of [VkMicromapCreateInfoEXT](../resources.html#VkMicromapCreateInfoEXT)::`type` when its
`dstMicromap` was created

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07465) VUID-vkBuildMicromapsEXT-dstMicromap-07465

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `dstMicromap` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildMicromapsEXT-dstMicromap-07466) VUID-vkBuildMicromapsEXT-dstMicromap-07466

The range of memory backing the `dstMicromap` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any element of
`pInfos` (including the same element), which is accessed by this
command

* 
[](#VUID-vkBuildMicromapsEXT-scratchData-07467) VUID-vkBuildMicromapsEXT-scratchData-07467

The range of memory backing the `scratchData` member of any element
of `pInfos` that is accessed by this command **must** not overlap the
memory backing the `scratchData` member of any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07552) VUID-vkBuildMicromapsEXT-pInfos-07552

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to host-visible device memory

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07553) VUID-vkBuildMicromapsEXT-pInfos-07553

For each element of `pInfos`, all referenced addresses of
`pInfos`[i].`data.hostAddress` **must** be valid host memory

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07554) VUID-vkBuildMicromapsEXT-pInfos-07554

For each element of `pInfos`, all referenced addresses of
`pInfos`[i].`triangleArray.hostAddress` **must** be valid host
memory

* 
[](#VUID-vkBuildMicromapsEXT-micromapHostCommands-07555) VUID-vkBuildMicromapsEXT-micromapHostCommands-07555

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07556) VUID-vkBuildMicromapsEXT-pInfos-07556

If `pInfos`[i].`mode` is [VK_BUILD_MICROMAP_MODE_BUILD_EXT](#VkBuildMicromapModeEXT),
and N is not `0`, then all addresses between
`pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the value of
[VkMicromapBuildSizesInfoEXT](../resources.html#VkMicromapBuildSizesInfoEXT)::`buildScratchSize` returned from
a call to [vkGetMicromapBuildSizesEXT](../resources.html#vkGetMicromapBuildSizesEXT) with an identical
[VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structure

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-07557) VUID-vkBuildMicromapsEXT-pInfos-07557

For each element of `pInfos`, the `buffer` used to create its
`dstMicromap` member **must** be bound to memory that was not allocated
with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkBuildMicromapsEXT-device-parameter) VUID-vkBuildMicromapsEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBuildMicromapsEXT-deferredOperation-parameter) VUID-vkBuildMicromapsEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkBuildMicromapsEXT-pInfos-parameter) VUID-vkBuildMicromapsEXT-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkMicromapBuildInfoEXT](#VkMicromapBuildInfoEXT) structures

* 
[](#VUID-vkBuildMicromapsEXT-infoCount-arraylength) VUID-vkBuildMicromapsEXT-infoCount-arraylength

 `infoCount` **must** be greater than `0`

* 
[](#VUID-vkBuildMicromapsEXT-deferredOperation-parent) VUID-vkBuildMicromapsEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To copy or compact a micromap on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMicromapEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMicromapInfoEXT*                pInfo);

* 
`device` is the device which owns the micromaps.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](../VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMicromapInfoEXT](#VkCopyMicromapInfoEXT) structure
defining the copy operation.

This command fulfills the same task as [vkCmdCopyMicromapEXT](#vkCmdCopyMicromapEXT) but is
executed by the host.

Valid Usage

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-03678) VUID-vkCopyMicromapEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMicromapEXT-buffer-07558) VUID-vkCopyMicromapEXT-buffer-07558

The `buffer` used to create `pInfo->src` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapEXT-buffer-07559) VUID-vkCopyMicromapEXT-buffer-07559

The `buffer` used to create `pInfo->dst` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapEXT-micromapHostCommands-07560) VUID-vkCopyMicromapEXT-micromapHostCommands-07560

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMicromapEXT-buffer-07561) VUID-vkCopyMicromapEXT-buffer-07561

The `buffer` used to create `pInfo->src` **must** be bound to
memory that was not allocated with multiple instances

* 
[](#VUID-vkCopyMicromapEXT-buffer-07562) VUID-vkCopyMicromapEXT-buffer-07562

The `buffer` used to create `pInfo->dst` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMicromapEXT-device-parameter) VUID-vkCopyMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-parameter) VUID-vkCopyMicromapEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyMicromapEXT-pInfo-parameter) VUID-vkCopyMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapInfoEXT](#VkCopyMicromapInfoEXT) structure

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-parent) VUID-vkCopyMicromapEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To copy host accessible memory to a micromap, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMemoryToMicromapEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMemoryToMicromapInfoEXT*        pInfo);

* 
`device` is the device which owns `pInfo->dst`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](../VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMemoryToMicromapInfoEXT](#VkCopyMemoryToMicromapInfoEXT)
structure defining the copy operation.

This command fulfills the same task as [vkCmdCopyMemoryToMicromapEXT](#vkCmdCopyMemoryToMicromapEXT)
but is executed by the host.

This command can accept micromaps produced by either
[vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT) or [vkCopyMicromapToMemoryEXT](#vkCopyMicromapToMemoryEXT).

Valid Usage

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-03678) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-07563) VUID-vkCopyMemoryToMicromapEXT-pInfo-07563

`pInfo->src.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-07564) VUID-vkCopyMemoryToMicromapEXT-pInfo-07564

`pInfo->src.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMemoryToMicromapEXT-buffer-07565) VUID-vkCopyMemoryToMicromapEXT-buffer-07565

The `buffer` used to create `pInfo->dst` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMemoryToMicromapEXT-micromapHostCommands-07566) VUID-vkCopyMemoryToMicromapEXT-micromapHostCommands-07566

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMemoryToMicromapEXT-buffer-07567) VUID-vkCopyMemoryToMicromapEXT-buffer-07567

The `buffer` used to create `pInfo->dst` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMemoryToMicromapEXT-device-parameter) VUID-vkCopyMemoryToMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parameter) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-parameter) VUID-vkCopyMemoryToMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToMicromapInfoEXT](#VkCopyMemoryToMicromapInfoEXT) structure

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parent) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To copy a micromap to host accessible memory, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMicromapToMemoryEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMicromapToMemoryInfoEXT*        pInfo);

* 
`device` is the device which owns `pInfo->src`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](../VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMicromapToMemoryInfoEXT](#VkCopyMicromapToMemoryInfoEXT)
structure defining the copy operation.

This command fulfills the same task as [vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT)
but is executed by the host.

This command produces the same results as
[vkCmdCopyMicromapToMemoryEXT](#vkCmdCopyMicromapToMemoryEXT), but writes its result directly to a host
pointer, and is executed on the host rather than the device.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToMicromapEXT](#vkCmdCopyMemoryToMicromapEXT) or
[vkCopyMemoryToMicromapEXT](#vkCopyMemoryToMicromapEXT).

Valid Usage

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-03678) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMicromapToMemoryEXT-buffer-07568) VUID-vkCopyMicromapToMemoryEXT-buffer-07568

The `buffer` used to create `pInfo->src` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-07569) VUID-vkCopyMicromapToMemoryEXT-pInfo-07569

`pInfo->dst.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-07570) VUID-vkCopyMicromapToMemoryEXT-pInfo-07570

`pInfo->dst.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMicromapToMemoryEXT-micromapHostCommands-07571) VUID-vkCopyMicromapToMemoryEXT-micromapHostCommands-07571

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMicromapToMemoryEXT-buffer-07572) VUID-vkCopyMicromapToMemoryEXT-buffer-07572

The `buffer` used to create `pInfo->src` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMicromapToMemoryEXT-device-parameter) VUID-vkCopyMicromapToMemoryEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parameter) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-parameter) VUID-vkCopyMicromapToMemoryEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapToMemoryInfoEXT](#VkCopyMicromapToMemoryInfoEXT) structure

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parent) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To query micromap size parameters on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkWriteMicromapsPropertiesEXT(
    VkDevice                                    device,
    uint32_t                                    micromapCount,
    const VkMicromapEXT*                        pMicromaps,
    VkQueryType                                 queryType,
    size_t                                      dataSize,
    void*                                       pData,
    size_t                                      stride);

* 
`device` is the device which owns the micromaps in `pMicromaps`.

* 
`micromapCount` is the count of micromaps for which to query the
property.

* 
`pMicromaps` is a pointer to an array of existing previously built
micromaps.

* 
`queryType` is a [VkQueryType](../queries.html#VkQueryType) value specifying the property to
be queried.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

* 
`stride` is the stride in bytes between results for individual
queries within `pData`.

This command fulfills the same task as
[vkCmdWriteMicromapsPropertiesEXT](#vkCmdWriteMicromapsPropertiesEXT) but is executed by the host.

Valid Usage

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07501) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07501

All micromaps in `pMicromaps` **must** have been constructed prior to
the execution of this command

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07502) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07502

All micromaps in `pMicromaps` **must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](../resources.html#VkBuildMicromapFlagBitsEXT) if `queryType` is
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-07503) VUID-vkWriteMicromapsPropertiesEXT-queryType-07503

`queryType` **must** be [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType)
or [VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-10071) VUID-vkWriteMicromapsPropertiesEXT-queryType-10071

If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType) or
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType) then `stride` **must**
be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-10072) VUID-vkWriteMicromapsPropertiesEXT-queryType-10072

If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](../queries.html#VkQueryType) or
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](../queries.html#VkQueryType) then `pData` **must**
point to a `VkDeviceSize`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-dataSize-07576) VUID-vkWriteMicromapsPropertiesEXT-dataSize-07576

`dataSize` **must** be greater than or equal to
`micromapCount`*`stride`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-buffer-07577) VUID-vkWriteMicromapsPropertiesEXT-buffer-07577

The `buffer` used to create each micromap in `pMicromaps` **must**
be bound to host-visible device memory

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-micromapHostCommands-07578) VUID-vkWriteMicromapsPropertiesEXT-micromapHostCommands-07578

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-buffer-07579) VUID-vkWriteMicromapsPropertiesEXT-buffer-07579

The `buffer` used to create each micromap in `pMicromaps` **must**
be bound to memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-device-parameter) VUID-vkWriteMicromapsPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parameter) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parameter

 `pMicromaps` **must** be a valid pointer to an array of `micromapCount` valid [VkMicromapEXT](../resources.html#VkMicromapEXT) handles

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-parameter) VUID-vkWriteMicromapsPropertiesEXT-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](../queries.html#VkQueryType) value

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pData-parameter) VUID-vkWriteMicromapsPropertiesEXT-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-micromapCount-arraylength) VUID-vkWriteMicromapsPropertiesEXT-micromapCount-arraylength

 `micromapCount` **must** be greater than `0`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-dataSize-arraylength) VUID-vkWriteMicromapsPropertiesEXT-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parent) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parent

 Each element of `pMicromaps` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

A displacement micromap in an acceleration structure includes information in
the [VkAccelerationStructureTrianglesDisplacementMicromapNV](../accelstructures.html#VkAccelerationStructureTrianglesDisplacementMicromapNV) to define a
base triangle and displacement directions then uses displacement information
encoded in the micromap to apply to those values to generate the final
position.

If `displacementBiasAndScaleBuffer` is provided the bias and scale are
fetched from that buffer.
If `displacementBiasAndScaleBuffer` is zero the bias and scale are
assumed to be 0.0 and 1.0, respectively.

Given an input position from the geometry, the base position and
displacement vector used by the displacement are computed by:

basePosition = inputPosition +  displacementVector × bias

baseDisplacementVector = displacementVector × scale

The parameters of each micro-vertex are derived from a combination of the
base triangle parameters extracted from the bottom-level acceleration
structure, the barycentrics of that micro-vertex, and the displacement value
fetched from the displacement micromap corresponding to that micro-vertex.

microVertexBasePosition = lerp(basePositions, microVertexBarycentrics)

microVertexDisplacementVector = lerp(displacementVectors,
microVertexBarycentrics)

microVertexDisplacedPosition = microVertexBasePosition + 
microVertexDisplacementVector × micromapDisplacementValue

Displacement amounts are stored in displacement blocks, each covering a
triangular region of microvertices.
Depending on the subdivision level and encoding format, one or more
displacement blocks combine to store all displacement values for a given
displacement micromap.

Displacement blocks are organized along a space filling curve within a
displacement micromap if more than one block is required, then
micro-vertices are organized along the same space filling curve within a
displacement micromap.

The space-filling curve is purely hierarchical with recursive splitting,
similar to that for opacity micromaps but operating on vertices instead of
triangles.
To maintain that the hierarchical ordering is contiguous while keeping
continuous winding, some triangles are flipped and wound differently.

The [VK_DISPLACEMENT_MICROMAP_FORMAT_64_TRIANGLES_64_BYTES_NV](#VkDisplacementMicromapFormatNV) format is
an uncompressed, packed format which covers 64 microtriangles (subdivision
level 3) in a block.
The block contains 45 displacement values encoded as 11 bit unorm values and
stored tightly packed in the vertex order described above, occupying 495
bits.
This is followed by 15 unused bits then 2 reserved bits which **must** be 0.
If this block is used to store displacement for a subdivision level below 3
the later unused values are ignored.

| Section | Field | Entries | Bits per entry | Starting bit offset |
| --- | --- | --- | --- | --- |
| Displacement amounts | Vertex 0 - 44 | 45 | 11 | 0 |
| Unused |  | 1 | 15 | 495 |
| Reserved | Must be 0 | 1 | 2 | 510 |

The [VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV) and
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV) formats
store displacements in a compressed form to save space.
Both formats use the same compression algorithm, differing in the number of
bits used in the different fields.

The compression algorithm works by starting with fully specified anchor
vertices, then for each level, predicting the value for the displacement and
encoding the correction for that value, using fewer bits for each level of
subdivision.

When adding a vertex in the recursive subdivision process between two
adjacent displacement values, the predicted value is given by the rounded
average of the two adjacent values as integers:

prediction = (A +  B +  1) / 2

The decoded value after applying the correction is given by:

decoded = prediction +  ( SignExtend(correction) 

where correction is given by the corrections field for a given level
and micro vertex and shift is given by the shifts field indexed from
the level then by 4 values, selected from interior or the 3 edges in vertex
order in that order.

The bit encoding for
[VK_DISPLACEMENT_MICROMAP_FORMAT_256_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)

| Section | Field | Entries | Bits per entry | Starting bit offset |
| --- | --- | --- | --- | --- |
| Anchors | Vertex 0 - 2 | 3 | 11 | 0 |
| Corrections | Level 1 | 3 | 11 | 33 |
|  | Level 2 | 9 | 11 | 66 |
|  | Level 3 | 30 | 10 | 165 |
|  | Level 4 | 108 | 5 | 465 |
| Unused |  | 1 | 1 | 1005 |
| Shifts | Level 4 | 4 | 3 | 1006 |
|  | Level 3 | 4 | 1 | 1018 |
| Reserved | Must be 0 | 1 | 2 | 1022 |

The bit encoding for
[VK_DISPLACEMENT_MICROMAP_FORMAT_1024_TRIANGLES_128_BYTES_NV](#VkDisplacementMicromapFormatNV)

| Section | Field | Entries | Bits per entry | Starting bit offset |
| --- | --- | --- | --- | --- |
| Anchors | Vertex 0 - 2 | 3 | 11 | 0 |
| Corrections | Level 1 | 3 | 11 | 33 |
|  | Level 2 | 9 | 8 | 66 |
|  | Level 3 | 30 | 4 | 138 |
|  | Level 4 | 108 | 2 | 258 |
|  | Level 5 | 408 | 1 | 474 |
| Unused |  | 1 | 88 | 882 |
| Shifts | Level 5 | 4 | 4 | 970 |
|  | Level 4 | 4 | 4 | 986 |
|  | Level 3 | 4 | 3 | 1002 |
|  | Level 2 | 4 | 2 | 1014 |
| Reserved | Must be 0 | 1 | 2 | 1022 |
