# Acceleration Structures

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/accelstructures.html

## Table of Contents

- [Acceleration Structures](#acceleration-structure-def)
- [Geometry](#acceleration-structure-geometry)
- [Top Level Acceleration Structures](#acceleration-structure-top-level)
- [Top_Level_Acceleration_Structures](#acceleration-structure-top-level)
- [Bottom Level Acceleration Structures](#acceleration-structure-bottom-level)
- [Bottom_Level_Acceleration_Structures](#acceleration-structure-bottom-level)
- [Acceleration Structure Update Rules](#acceleration-structure-update)
- [Acceleration_Structure_Update_Rules](#acceleration-structure-update)
- [Inactive Primitives and Instances](#acceleration-structure-inactive-prims)
- [Inactive_Primitives_and_Instances](#acceleration-structure-inactive-prims)
- [Degenerate Primitives and Instances](#acceleration-structure-degenerate-prims)
- [Degenerate_Primitives_and_Instances](#acceleration-structure-degenerate-prims)
- [Building Acceleration Structures](#acceleration-structure-building)
- [Building_Acceleration_Structures](#acceleration-structure-building)
- [Copying Acceleration Structures](#acceleration-structure-copying)
- [Copying_Acceleration_Structures](#acceleration-structure-copying)
- [Cluster Level Acceleration Structures](#cluster-geometry)
- [Cluster_Level_Acceleration_Structures](#cluster-geometry)
- [Partitioned Top Level Acceleration Structures](#partitioned-tlas)
- [Partitioned_Top_Level_Acceleration_Structures](#partitioned-tlas)
- [Host Acceleration Structure Operations](#host-acceleration-structure)
- [Host_Acceleration_Structure_Operations](#host-acceleration-structure)

## Content

*Acceleration structures* are data structures used by the implementation to
efficiently manage scene geometry as it is [traversed during a ray tracing query](raytraversal.html#ray-traversal).
The application is responsible for managing acceleration structure objects
(see [Acceleration Structures](resources.html#resources-acceleration-structures)),
including allocation, destruction, executing builds or updates, and
synchronizing resources used during ray tracing queries.

There are two types of acceleration structures, *top level acceleration
structures* and *bottom level acceleration structures*.

An acceleration structure is considered to be constructed if an
[acceleration structure build command](#acceleration-structure-building) or
[copy command](#acceleration-structure-copying) has been executed with the
given acceleration structure as the destination.

![accelstruct](../_images/accelstruct.svg)

Figure 1. Acceleration Structure

Caption

The diagram shows the relationship between top and bottom level acceleration
structures.

*Geometries* refer to a triangle,
sphere, linear swept sphere (LSS),
or axis-aligned bounding box.

A triangle is a fundamental geometric primitive defined by three vertices in
3D space, forming a flat, planar surface.

An axis-aligned bounding box (AABB) is a rectangular box defined by two
points (minimum and maximum corners) that encloses a 3D object or scene.
Its faces are aligned with the coordinate axes, making intersection tests
efficient for spatial partitioning and acceleration structures.

A sphere primitive is defined by a position and a radius.

The linear swept sphere (LSS) primitive is comprised of two sphere endcaps
and a truncated cone midsection.
The midsection is constructed so that it tangentially intersects with the
endcaps.
Two points, P0 and P1, and two radii, r0 and
r1, fully describe the primitive.

The following figure shows an example of the LSS primitive composed of two
sphere endcaps connected by a midsection.
The solid non-dotted outline indicates the intersectable portion of the
primitive.

![lss primitive](../_images/lss_primitive.svg)

Figure 2. LSS primitive

Endcaps on LSS primitives are optional and are controlled by
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`endCapsMode`.
The following figure shows an example of the LSS primitive without the
endcaps with only the midsection present.

![lss primitive no endcaps](../_images/lss_primitive_no_endcaps.svg)

Figure 3. LSS primitive with no endcaps

A LSS geometry can be defined in multiple ways.
If only the vertex and radius data are specified in
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV) without
specifying the index data, LSS primitives are drawn in pairs of vertices.
Each primitive i is defined by entries (i × 2, i × 2
+  1) in the vertex and radius buffers.
For example, if a vertex buffer contains vertices A, B, C, D, E, F and
G, (assuming each character represents a position vector) with
corresponding radii as rA, rB, rC, rD, rE, rF and rG respectively, the
LSS primitives drawn will be as shown below with G skipped because it
does not have a corresponding vertex pair.

![lssWithVertexBuffers](../_images/lssWithVertexBuffers.svg)

Figure 4. Lss primitives drawn with only vertex data

LSS primitives **can** be chained together by specifying an index buffer and
indexing mode in the
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV) structure.

If the [VkRayTracingLssIndexingModeNV](#VkRayTracingLssIndexingModeNV)::`indexingMode` is set to
[VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV](#VkRayTracingLssIndexingModeNV), then the consecutive pair of
indices in the index buffer select the vertices that define the LSS chain.
For example, assuming the same vertex buffer as before, if the index buffer
contains indices [6, 5, 5, 4, 4, 3, 2, 1], the LSS primitives will be
chained as shown:

![lssWithListIndexingMode](../_images/lssWithListIndexingMode.svg)

Figure 5. Lss primitives drawn with VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV indexing mode

Note that due to the lack of a [3, 2] pair, there is a break in the
chain and D is not connected to C.

If the [VkRayTracingLssIndexingModeNV](#VkRayTracingLssIndexingModeNV)::`indexingMode` is set to
[VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](#VkRayTracingLssIndexingModeNV), then each LSS
primitive is defined by two successive positions and radii, (k, k

1), where k is a single index in the index buffer.
For example, if the index buffer contains indices [0, 1, 2, 4], the
LSS primitives will be chained as shown below.
Note that due to the absence of index 3 in the index buffer, there is a
break in the chain and D is not connected to E.

![lssWithSuccessiveIndexingMode](../_images/lssWithSuccessiveIndexingMode.svg)

Figure 6. Lss primitives drawn with VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV indexing mode

Opaque acceleration structure for an array of instances.
The descriptor or device address referencing this is the starting point for
traversal.

The top level acceleration structure takes a reference to any bottom level
acceleration structure referenced by its instances.
Those bottom level acceleration structure objects **must** be valid when the
top level acceleration structure is accessed.

Opaque acceleration structure for an array of geometries.

The API defines two types of operations to produce acceleration structures
from geometry:

* 
A *build* operation is used to construct an acceleration structure.

* 
An *update* operation is used to modify an existing acceleration
structure.

An update operation imposes certain constraints on the input, in exchange
for considerably faster execution.
When performing an update, the application is required to provide a full
description of the acceleration structure, but is prohibited from changing
anything other than instance definitions, transform matrices, and vertex or
AABB positions.
All other aspects of the description **must** exactly match the one from the
original build.

More precisely, the application **must** not use an update operation to do any
of the following:

* 
Change primitives or instances from *active* to *inactive*, or vice
versa (as defined in [Inactive Primitives and Instances](#acceleration-structure-inactive-prims)).

* 
Change the index or vertex formats of triangle geometry.

* 
Change triangle geometry transform pointers from null to non-null or
vice versa.

* 
Change the number of geometries or instances in the structure.

* 
Change the geometry flags for any geometry in the structure.

* 
Change the number of vertices or primitives for any geometry in the
structure.

If the original acceleration structure was built using opacity micromaps and
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
was set in `flags`, the application **must** provide a micromap matching
the original micromap in structure with only opacity values updated.
The application is prohibited from changing anything other than the specific
opacity values assigned to the triangles.

More precisely, the application **must** not use an update operation to do any
of the following:

* 
Remove micromaps or [VkOpacityMicromapSpecialIndexEXT](#VkOpacityMicromapSpecialIndexEXT) values from a
geometry which previously had them, or vice versa.

* 
Change between use of [VkOpacityMicromapSpecialIndexEXT](#VkOpacityMicromapSpecialIndexEXT) values and
explicit micro-map triangles.

* 
Change the subdivision level or format of the micromap triangle
associated with any acceleration-structure triangle.

If the original acceleration structure was built using opacity micromaps and
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
was set in `flags`, the application **must** provide a micromap to the
update operation.

If [VkMicromapBuildSizesInfoEXT](resources.html#VkMicromapBuildSizesInfoEXT)::`discardable` is [VK_FALSE](fundamentals.html#VK_FALSE), a
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
or
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
operation transfers the reference in the acceleration structure to the new
micromap.

If the original acceleration structure was built using opacity micromaps and
neither opacity micromap update flag is set, the application **must** provide
the original micromap to the update operation.

If the original acceleration structure was built using displacement
micromaps and
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV)
was set in `flags`, the application **must** provide a displacement
micromap to the update operation.

If the original acceleration structure was built using displacement
micromaps and the displacement micromap update flag is not set the
application **must** provide the original micromap to the update operation.

Acceleration structures allow the use of particular input values to signal
*inactive* primitives or instances.

An *inactive* triangle is one for which the first (X) component of any
vertex is NaN.
If any other vertex component is NaN, and the first is not, the behavior is
**undefined**.
If the vertex format does not have a NaN representation, then all triangles
are considered active.

An *inactive* instance is one whose acceleration structure reference is `0`.

An *inactive* AABB is one for which the minimum X coordinate is NaN.
If any other component is NaN, and the first is not, the behavior is
**undefined**.

An *inactive* LSS or sphere is one where any of the radius or position
component is NaN.

In the above definitions, “NaN” refers to any type of NaN.
Signaling, non-signaling, quiet, loud, or otherwise.

An inactive object is considered invisible to all rays, and **should** not be
represented in the acceleration structure.
Implementations **should** ensure that the presence of inactive objects does
not seriously degrade traversal performance.

Inactive objects are counted in the auto-generated index sequences which are
provided to shaders via `InstanceId` and `PrimitiveId` SPIR-V
decorations.
This allows objects in the scene to change freely between the active and
inactive states, without affecting the layout of any arrays which are being
indexed using the ID values.

Any transition between the active and inactive states requires a full
acceleration structure rebuild.
Applications **must** not perform an acceleration structure update where an
object is active in the source acceleration structure but would be inactive
in the destination, or vice versa.

The active/inactive state of primitives **must** not be changed with
acceleration structure updates.
For chained LSS, using the
[VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV](#VkRayTracingLssPrimitiveEndCapsModeNV) mode, entire
chains **must** be either active or inactive.
If any chain contains both active and inactive primitives, the behavior is
**undefined**.

*Degenerate* primitives and instances behave differently to
[inactive primitives and instances](#acceleration-structure-inactive-prims),
and are defined as:

* 
triangles that have one or more vertices whose respective (X), (Y), (Z)
components are identical, or have three vertices that have at least two
of the (X), (Y), or (Z) components identical, therefore forming a line
or point.
Degenerate triangles do not generate any intersections.

* 
AABBs whose `minX`=`maxX`, `minY`=`maxY`, and
`minZ`=`maxZ`.
Degenerate AABBs **may** invoke the intersection shader.

* 
LSS primitives where both the radii are set to `0`.

* 
sphere primitives whose radius is set to `0`.

* 
instances that reference bottom level acceleration structures that
contain no active primitives.
When building an acceleration structure, implementations **should** treat
degenerate instances as though they are a point at the instance origin,
specified by [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`transform`.

Unlike *inactive* primitives and instances, *degenerate* primitives and
instances **may** transition from the degenerate to the non-degenerate state,
or vice versa, when performing an acceleration structure update.

If an acceleration structure is built without
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) set in
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`flags`
or
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags`
, degenerate primitives **may** be discarded.
Primitives that are defined with the same index value for more than one
vertex **can** always be discarded.

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
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures defining
the geometry used to build each acceleration structure.

* 
`ppBuildRangeInfos` is a pointer to an array of `infoCount`
pointers to arrays of [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR)
structures.
Each `ppBuildRangeInfos`[i] is a pointer to an array of
`pInfos`[i].`geometryCount`
[VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structures defining
dynamic offsets to the addresses where geometry data is stored, as
defined by `pInfos`[i].

The `vkCmdBuildAccelerationStructuresKHR` command provides the ability
to initiate multiple acceleration structures builds, however there is no
ordering or synchronization implied between any of the individual
acceleration structure builds.

|  | This means that an application **cannot** build a top-level acceleration
| --- | --- |
structure in the same [vkCmdBuildAccelerationStructuresKHR](#vkCmdBuildAccelerationStructuresKHR) call as the
associated bottom-level or instance acceleration structures are being built.
There also **cannot** be any memory aliasing between any acceleration structure
memories or scratch memories being used by any of the builds. |

The input buffers passed to this commands will be referenced by the
implementation for the duration of this command’s execution on the device.

After the command completes, the acceleration structure **may** hold a
reference to any acceleration structure specified by an active instance
contained therein.
Apart from this referencing, acceleration structures **must** be fully
self-contained.

The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of future commands,
provided proper synchronization is used as described below.

|  | A [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structure is not used when
| --- | --- |
building an acceleration structure with a geometry type of
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV). |

|  | The required alignment of the device addresses passed in to parameters below
| --- | --- |
might not be provided by the base address of a [VkBuffer](resources.html#VkBuffer) created with
the correct usage flags and must still be manually aligned by the
application code. |

Accesses to the acceleration structure scratch buffers as identified by the
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`scratchData` buffer
device addresses **must** be [synchronized](synchronization.html#synchronization-dependencies) with
the [VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits)).
Accesses to each
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`srcAccelerationStructure`
and
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`dstAccelerationStructure`
**must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits), as appropriate.

Accesses to other input buffers as identified by any used values of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](#VkAccelerationStructureGeometryMotionTrianglesDataNV)::`vertexData`,
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)::`compressedData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`indexData`,
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`transformData`,
[VkAccelerationStructureGeometryAabbsDataKHR](#VkAccelerationStructureGeometryAabbsDataKHR)::`data`, and
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR)::`data` **must** be
[synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_SHADER_READ_BIT](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-accelerationStructure-08923) VUID-vkCmdBuildAccelerationStructuresKHR-accelerationStructure-08923

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-mode-04628) VUID-vkCmdBuildAccelerationStructuresKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](#VkBuildAccelerationStructureModeKHR) value

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-04629) VUID-vkCmdBuildAccelerationStructuresKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-04630) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

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
**must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03699) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03700) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03663) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR),
[inactive primitives](#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03664) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-None-03407) VUID-vkCmdBuildAccelerationStructuresKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other
element of `pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03701) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), which is accessed
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
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) (including the
same element), which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03706) VUID-vkCmdBuildAccelerationStructuresKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03667) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) set in
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags` in the
build

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03668) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR), or
not have any [memory aliasing](resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03758) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03759) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03760) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03761) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03762) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03763) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03764) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03765) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03766) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03767) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10898) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10898

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numTriangles` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10899) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10899

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numVertices` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10900) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10900

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxPrimitiveIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10901) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10901

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxGeometryIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10902) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10902

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`format` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10903) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10903

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`dataSize` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03768) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03768

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), and
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
then the value of each index referenced **must** be the same as the
corresponding index value when `srcAccelerationStructure` was last
built

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-primitiveCount-03769) VUID-vkCmdBuildAccelerationStructuresKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
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
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), the corresponding
`ppBuildRangeInfos`[i][j].`primitiveCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxInstanceCount`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03707) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03707

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03708) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03708

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03709) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03709

For each element of `pInfos`, if an acceleration structure is
referenced by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), it **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12258) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12258

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12259) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12259

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-geometry-03673) VUID-vkCmdBuildAccelerationStructuresKHR-geometry-03673

The buffers from which the buffer device addresses for all of the
`geometry.triangles.vertexData`, `geometry.triangles.indexData`,
`geometry.triangles.transformData`, `geometry.aabbs.data`, and
`geometry.instances.data` members of all
`pInfos`[i].`pGeometries` and `pInfos`[i].`ppGeometries`
are queried **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12260) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12260

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), and the size
reported by `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12261) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12261

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR), and the size
reported by `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03710) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03710

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03804) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03804

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`geometry.triangles.vertexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03711) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03711

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`geometry.triangles.vertexData.deviceAddress` **must** be aligned to:

the [size of the format](formats.html#formats) specified in `vertexFormat`, in
bytes, if that format is a [packed format](formats.html#formats-packed)

* 
the [component size](formats.html#formats) of the format specified in
`vertexFormat`, in bytes, if that format is not a [     packed format](formats.html#formats-packed)

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03806) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03806

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
`geometry.triangles.indexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03712) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03712

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), and with
`geometry.triangles.indexType` not equal to
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
`geometry.triangles.indexData.deviceAddress` **must** be aligned to the
size in bytes of the type in `indexType`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03808) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03808

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03810) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03810

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03811) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03811

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV),
`geometry.aabbs.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03714) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03714

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV),
`geometry.aabbs.data.deviceAddress` **must** be aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03715) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03715

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_FALSE](fundamentals.html#VK_FALSE), `geometry.instances.data.deviceAddress` **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03716) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03716

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_TRUE](fundamentals.html#VK_TRUE), `geometry.instances.data.deviceAddress` **must** be
aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03717) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03717

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_TRUE](fundamentals.html#VK_TRUE), each element of
`geometry.instances.data.deviceAddress` in device memory **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03813) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-03813

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV),
`geometry.instances.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12281) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-12281

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), each
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`accelerationStructureReference`
value in `geometry.instances.data.deviceAddress` **must** be `0` or a
value obtained from [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR) for
a valid bottom level acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10607) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10607

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](#VkGeometryInstanceFlagBitsNV) is set in
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`flags` then
`geometry.instances.data.deviceAddress` **must** refer to an
acceleration structure that was built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
set in [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-09547) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-09547

`commandBuffer` **must** not be a protected command buffer

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10904) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10904

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10905) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10905

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11846) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11846

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11847) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11847

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11848) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11848

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11849) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11849

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11850) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11850

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11851) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11851

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its
`indexData.deviceAddress` **must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11852) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11852

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11853) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11853

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10126) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10126

For each `pInfos`[i], `dstAccelerationStructure` **must** have been
created with a value of
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`size` greater than or
equal to either:

the memory size required by the build operation, as returned by
[vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with
`pBuildInfo` = `pInfos`[i] and with each element of the
`pMaxPrimitiveCounts` array greater than or equal to the equivalent
`ppBuildRangeInfos`[i][j].`primitiveCount` values for `j` in
[0,`pInfos`[i].`geometryCount`) or,

* 
the result of querying the corresponding
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), if
updating a compacted acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676) VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676

Each element of `ppBuildRangeInfos`[i] **must** be a valid pointer to
an array of `pInfos`[i].`geometryCount`
`VkAccelerationStructureBuildRangeInfoKHR` structures
, or `NULL`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10906) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-10906

For each element of `pInfos`[i] whose `pGeometries` or
`ppGeometries` members have a `geometryType` of
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV),
`ppBuildRangeInfos`[i] **must** be `NULL`

[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11845) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-11845

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](#VkAccelerationStructureGeometryMotionTrianglesDataNV) in the
`geometry.triangles.pNext` chain, then its
`vertexData.deviceAddress` **must** be a valid `VkDeviceAddress`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter) VUID-vkCmdBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter

 `ppBuildRangeInfos` **must** be a valid pointer to an array of `infoCount` [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structures

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-recording) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructuresKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

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
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildAccelerationStructuresKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

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
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures defining
the geometry used to build each acceleration structure.

* 
`pIndirectDeviceAddresses` is a pointer to an array of
`infoCount` buffer device addresses which point to
`pInfos`[i].`geometryCount`
[VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structures defining
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
[vkCmdBuildAccelerationStructuresKHR](#acceleration-structure-scratch).

Accesses to any element of `pIndirectDeviceAddresses` **must** be
[synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-accelerationStructureIndirectBuild-03650) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-accelerationStructureIndirectBuild-03650

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureIndirectBuild`](features.html#features-accelerationStructureIndirectBuild)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-mode-04628) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](#VkBuildAccelerationStructureModeKHR) value

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-srcAccelerationStructure-04629) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-04630) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

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
**must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03699) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03700) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03663) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR),
[inactive primitives](#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03664) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-None-03407) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other
element of `pInfos`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03701) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), which is accessed
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
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) (including the
same element), which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03706) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03667) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) set in
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags` in the
build

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03668) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR), or
not have any [memory aliasing](resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03758) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03759) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03760) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03761) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03762) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03763) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03764) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03765) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03766) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03767) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10898) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10898

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numTriangles` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10899) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10899

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numVertices` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10900) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10900

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxPrimitiveIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10901) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10901

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxGeometryIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10902) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10902

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`format` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10903) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10903

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`dataSize` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03768) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03768

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), and
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
then the value of each index referenced **must** be the same as the
corresponding index value when `srcAccelerationStructure` was last
built

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-primitiveCount-03769) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
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
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), the corresponding
`ppMaxPrimitiveCounts`[i][j] **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxInstanceCount`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03707) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03707

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03708) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03708

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03709) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03709

For each element of `pInfos`, if an acceleration structure is
referenced by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), it **must** be bound to device memory

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12258) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12258

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12259) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12259

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.deviceAddress`
and `pInfos`[i].`scratchData.deviceAddress` +  N - 1 **must**
be in the buffer device address range of the same buffer, where N is
given by the `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-geometry-03673) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-geometry-03673

The buffers from which the buffer device addresses for all of the
`geometry.triangles.vertexData`, `geometry.triangles.indexData`,
`geometry.triangles.transformData`, `geometry.aabbs.data`, and
`geometry.instances.data` members of all
`pInfos`[i].`pGeometries` and `pInfos`[i].`ppGeometries`
are queried **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12260) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12260

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), and the size
reported by `updateScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12261) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12261

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR), and the size
reported by `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with an identical
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structure and
primitive count is non-zero,
`pInfos`[i].`scratchData.deviceAddress` **must** be a device
address allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03710) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03710

For each element of `pInfos`, its `scratchData.deviceAddress`
member **must** be a multiple of
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`minAccelerationStructureScratchOffsetAlignment`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03804) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03804

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`geometry.triangles.vertexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03711) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03711

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`geometry.triangles.vertexData.deviceAddress` **must** be aligned to:

the [size of the format](formats.html#formats) specified in `vertexFormat`, in
bytes, if that format is a [packed format](formats.html#formats-packed)

* 
the [component size](formats.html#formats) of the format specified in
`vertexFormat`, in bytes, if that format is not a [     packed format](formats.html#formats-packed)

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03806) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03806

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
`geometry.triangles.indexData.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03712) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03712

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), and with
`geometry.triangles.indexType` not equal to
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
`geometry.triangles.indexData.deviceAddress` **must** be aligned to the
size in bytes of the type in `indexType`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03808) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03808

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03810) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03810

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.transformData.deviceAddress` is not `0`, it
**must** be aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03811) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03811

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV),
`geometry.aabbs.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03714) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03714

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV),
`geometry.aabbs.data.deviceAddress` **must** be aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03715) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03715

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_FALSE](fundamentals.html#VK_FALSE), `geometry.instances.data.deviceAddress` **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03716) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03716

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_TRUE](fundamentals.html#VK_TRUE), `geometry.instances.data.deviceAddress` **must** be
aligned to `8` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03717) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03717

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if `geometry.arrayOfPointers`
is [VK_TRUE](fundamentals.html#VK_TRUE), each element of
`geometry.instances.data.deviceAddress` in device memory **must** be
aligned to `16` bytes

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03813) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03813

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV),
`geometry.instances.data.deviceAddress` **must** be a valid
`VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12281) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-12281

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), each
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`accelerationStructureReference`
value in `geometry.instances.data.deviceAddress` **must** be `0` or a
value obtained from [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR) for
a valid bottom level acceleration structure

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10607) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10607

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), if
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](#VkGeometryInstanceFlagBitsNV) is set in
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`flags` then
`geometry.instances.data.deviceAddress` **must** refer to an
acceleration structure that was built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
set in [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-09547) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-09547

`commandBuffer` **must** not be a protected command buffer

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10904) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10904

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10905) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-10905

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11846) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11846

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11847) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11847

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11848) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11848

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11849) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11849

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`radiusData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11850) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11850

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.deviceAddress`
**must** be 0

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11851) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11851

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV), if
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its
`indexData.deviceAddress` **must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11852) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11852

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`vertexData.deviceAddress`
**must** be a valid `VkDeviceAddress`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11853) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-11853

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`radiusData.deviceAddress`
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
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03648) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03648

Each element of `pIndirectDeviceAddresses` **must** be a multiple of
`4`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-03787) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectStrides-03787

Each element of `pIndirectStrides` **must** be a multiple of `4`

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03651) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pIndirectDeviceAddresses-03651

Each [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structure referenced
by any element of `pIndirectDeviceAddresses` **must** be a valid
[VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structure

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03652) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-03652

`pInfos`[i].`dstAccelerationStructure` **must** have been created
with a value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`size`
greater than or equal to the memory size required by the build
operation, as returned by [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR)
with `pBuildInfo` = `pInfos`[i] and
`pMaxPrimitiveCounts` = `ppMaxPrimitiveCounts`[i]

[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-03653) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-ppMaxPrimitiveCounts-03653

Each `ppMaxPrimitiveCounts`[i][j] **must** be greater than or equal to
the `primitiveCount` value specified by the
[VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structure located at
`pIndirectDeviceAddresses`[i] +  (`j` ×
`pIndirectStrides`[i])

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-parameter) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures

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

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructuresIndirectKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

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
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildAccelerationStructuresIndirectKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkAccelerationStructureTypeKHR](resources.html#VkAccelerationStructureTypeKHR) value specifying
the type of acceleration structure being built.

* 
`flags` is a bitmask of
[VkBuildAccelerationStructureFlagBitsKHR](resources.html#VkBuildAccelerationStructureFlagBitsKHR) specifying additional
parameters of the acceleration structure.

* 
`mode` is a [VkBuildAccelerationStructureModeKHR](#VkBuildAccelerationStructureModeKHR) value
specifying the type of operation to perform.

* 
`srcAccelerationStructure` is a pointer to an existing acceleration
structure that is to be used to update the
`dstAccelerationStructure` acceleration structure when `mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR).

* 
`dstAccelerationStructure` is a pointer to the target acceleration
structure for the build.

* 
`geometryCount` specifies the number of geometries that will be
built into `dstAccelerationStructure`.

* 
`pGeometries` is a pointer to an array of
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structures.

* 
`ppGeometries` is a pointer to an array of pointers to
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structures.

* 
`scratchData` is the device or host address of memory that will be
used as scratch memory for the build.

Only one of `pGeometries` or `ppGeometries` **can** be a valid pointer,
the other **must** be `NULL`.
Each element of the non-`NULL` array describes the data used to build each
acceleration structure geometry.

The index of each element of the `pGeometries` or `ppGeometries`
members of [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) is used as the
*geometry index* during ray traversal.
The geometry index is available in ray shaders via the
[`RayGeometryIndexKHR` built-in](interfaces.html#interfaces-builtin-variables-raygeometryindex), and is [used to determine hit and intersection shaders executed during traversal](raytracing.html#shader-binding-table-hit-shader-indexing).
The geometry index is available to ray queries via the
`OpRayQueryGetIntersectionGeometryIndexKHR` instruction.

Setting [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`
indicates that this build is a motion top level acceleration structure.
A motion top level uses instances of format
[VkAccelerationStructureMotionInstanceNV](#VkAccelerationStructureMotionInstanceNV) if
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR)::`arrayOfPointers`
is [VK_FALSE](fundamentals.html#VK_FALSE).

If
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR)::`arrayOfPointers`
is [VK_TRUE](fundamentals.html#VK_TRUE), the pointer for each element of the array of instance
pointers consists of 4 bits of
[VkAccelerationStructureMotionInstanceTypeNV](#VkAccelerationStructureMotionInstanceTypeNV) in the low 4 bits of the
pointer identifying the type of structure at the pointer.
The device address accessed is the value in the array with the low 4 bits
set to zero.
The structure at the pointer is one of
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR),
[VkAccelerationStructureMatrixMotionInstanceNV](#VkAccelerationStructureMatrixMotionInstanceNV) or
[VkAccelerationStructureSRTMotionInstanceNV](#VkAccelerationStructureSRTMotionInstanceNV), depending on the type
value encoded in the low 4 bits.

A top level acceleration structure with either motion instances or vertex
motion in its instances **must** set
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`.

Members `srcAccelerationStructure` and `dstAccelerationStructure`
**may** be the same or different for an update operation (when `mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR)).
If they are the same, the update happens in-place.
Otherwise, the target acceleration structure is updated and the source is
not modified.

Valid Usage

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03654) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03654

`type` **must** not be [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-03788) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-03788

If `geometryCount` is not `0`, exactly one of `pGeometries` or
`ppGeometries` **must** be a valid pointer, the other **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03789) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03789

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), the
`geometryType` member of elements of either `pGeometries` or
`ppGeometries` **must** be [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03790) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03790

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV),
`geometryCount` **must** be `1`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03791) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03791

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
the `geometryType` member of elements of either `pGeometries` or
`ppGeometries` **must** not be [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03792) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03792

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
then the `geometryType` member of each geometry in either
`pGeometries` or `ppGeometries` **must** be the same

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03793) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03793

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
then `geometryCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxGeometryCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-10884) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-10884

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), then
`geometryCount` **must** be `1`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03794) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03794

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV), the total number
of AABBs in all geometries **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxPrimitiveCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03795) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-03795

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)
and the `geometryType` member of either `pGeometries` or
`ppGeometries` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), the total
number of triangles in all geometries **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxPrimitiveCount`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-03796) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-03796

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) bit set,
then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) bit set

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-dstAccelerationStructure-04927) VUID-VkAccelerationStructureBuildGeometryInfoKHR-dstAccelerationStructure-04927

If `dstAccelerationStructure` was created with
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](resources.html#VkAccelerationStructureCreateFlagBitsKHR) set in
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`createFlags`,
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) **must** be set in
`flags`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04928) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04928

If [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) is set in
`flags`, `dstAccelerationStructure` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](resources.html#VkAccelerationStructureCreateFlagBitsKHR) set in
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`createFlags`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04929) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-04929

If [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) is set in
`flags`, `type` **must** not be
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-07334) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-07334

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
bit set then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](resources.html#VkBuildAccelerationStructureFlagBitsNV)
bit set

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-sType-sType) VUID-VkAccelerationStructureBuildGeometryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_GEOMETRY_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pNext-pNext) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](resources.html#VkAccelerationStructureTypeKHR) value

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](resources.html#VkBuildAccelerationStructureFlagBitsKHR) values

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-pGeometries-parameter

 If `geometryCount` is not `0`, and `pGeometries` is not `NULL`, `pGeometries` **must** be a valid pointer to an array of `geometryCount` valid [VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structures

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-ppGeometries-parameter) VUID-VkAccelerationStructureBuildGeometryInfoKHR-ppGeometries-parameter

 If `geometryCount` is not `0`, and `ppGeometries` is not `NULL`, `ppGeometries` **must** be a valid pointer to an array of `geometryCount` valid pointers to valid [VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structures

* 
[](#VUID-VkAccelerationStructureBuildGeometryInfoKHR-commonparent) VUID-VkAccelerationStructureBuildGeometryInfoKHR-commonparent

 Both of `dstAccelerationStructure`, and `srcAccelerationStructure` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The [VkBuildAccelerationStructureModeKHR](#VkBuildAccelerationStructureModeKHR) enumeration is defined as:

// Provided by VK_KHR_acceleration_structure
typedef enum VkBuildAccelerationStructureModeKHR {
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR = 0,
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR = 1,
} VkBuildAccelerationStructureModeKHR;

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR) specifies that the
destination acceleration structure will be built using the specified
geometries.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) specifies that the
destination acceleration structure will be built using data in a source
acceleration structure, updated by the specified geometries.

The `VkDeviceOrHostAddressKHR` union is defined as:

// Provided by VK_KHR_acceleration_structure, VK_NV_cooperative_vector
typedef union VkDeviceOrHostAddressKHR {
    VkDeviceAddress    deviceAddress;
    void*              hostAddress;
} VkDeviceOrHostAddressKHR;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](resources.html#vkGetBufferDeviceAddressKHR) command.

* 
`hostAddress` is a host memory address.

The `VkDeviceOrHostAddressConstKHR` union is defined as:

// Provided by VK_KHR_acceleration_structure, VK_NV_cooperative_vector
typedef union VkDeviceOrHostAddressConstKHR {
    VkDeviceAddress    deviceAddress;
    const void*        hostAddress;
} VkDeviceOrHostAddressConstKHR;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](resources.html#vkGetBufferDeviceAddressKHR) command.

* 
`hostAddress` is a const host memory address.

The `VkAccelerationStructureGeometryKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    VkGeometryTypeKHR                         geometryType;
    VkAccelerationStructureGeometryDataKHR    geometry;
    VkGeometryFlagsKHR                        flags;
} VkAccelerationStructureGeometryKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`geometryType` describes which type of geometry this
`VkAccelerationStructureGeometryKHR` refers to.

* 
`geometry` is a [VkAccelerationStructureGeometryDataKHR](#VkAccelerationStructureGeometryDataKHR) union
describing the geometry data for the relevant geometry type.

* 
`flags` is a bitmask of [VkGeometryFlagBitsKHR](resources.html#VkGeometryFlagBitsKHR) values
describing additional properties of how the geometry should be built.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-sType-sType) VUID-VkAccelerationStructureGeometryKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV), or [VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)

* 
[](#VUID-VkAccelerationStructureGeometryKHR-sType-unique) VUID-VkAccelerationStructureGeometryKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureGeometryKHR-geometryType-parameter) VUID-VkAccelerationStructureGeometryKHR-geometryType-parameter

 `geometryType` **must** be a valid [VkGeometryTypeKHR](resources.html#VkGeometryTypeKHR) value

* 
[](#VUID-VkAccelerationStructureGeometryKHR-triangles-parameter) VUID-VkAccelerationStructureGeometryKHR-triangles-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), the `triangles` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-aabbs-parameter) VUID-VkAccelerationStructureGeometryKHR-aabbs-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV), the `aabbs` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryAabbsDataKHR](#VkAccelerationStructureGeometryAabbsDataKHR) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-instances-parameter) VUID-VkAccelerationStructureGeometryKHR-instances-parameter

 If `geometryType` is [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), the `instances` member of `geometry` **must** be a valid [VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR) structure

* 
[](#VUID-VkAccelerationStructureGeometryKHR-flags-parameter) VUID-VkAccelerationStructureGeometryKHR-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryFlagBitsKHR](resources.html#VkGeometryFlagBitsKHR) values

The `VkAccelerationStructureGeometryDataKHR` union is defined as:

// Provided by VK_KHR_acceleration_structure
typedef union VkAccelerationStructureGeometryDataKHR {
    VkAccelerationStructureGeometryTrianglesDataKHR    triangles;
    VkAccelerationStructureGeometryAabbsDataKHR        aabbs;
    VkAccelerationStructureGeometryInstancesDataKHR    instances;
} VkAccelerationStructureGeometryDataKHR;

* 
`triangles` is a
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR) structure.

* 
`aabbs` is a [VkAccelerationStructureGeometryAabbsDataKHR](#VkAccelerationStructureGeometryAabbsDataKHR)
structure.

* 
`instances` is a
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR) structure.

The `VkAccelerationStructureGeometryTrianglesDataKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryTrianglesDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkFormat                         vertexFormat;
    VkDeviceOrHostAddressConstKHR    vertexData;
    VkDeviceSize                     vertexStride;
    uint32_t                         maxVertex;
    VkIndexType                      indexType;
    VkDeviceOrHostAddressConstKHR    indexData;
    VkDeviceOrHostAddressConstKHR    transformData;
} VkAccelerationStructureGeometryTrianglesDataKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](formats.html#VkFormat) of each vertex element.

* 
`vertexData` is a device or host address of memory containing vertex
data for this geometry.

* 
`vertexStride` is the stride in bytes between each vertex.

* 
`maxVertex` is the number of vertices in `vertexData` minus one.

* 
`indexType` is the [VkIndexType](drawing.html#VkIndexType) of each index element.

* 
`indexData` is a device or host address of memory containing index
data for this geometry.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType) it **must** be `NULL`.

* 
`transformData` is a device or host address to memory containing an
optional reference to a [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure describing
a transformation from the space in which the vertices in this geometry
are described to the space in which the acceleration structure is
defined.

|  | Unlike the stride for vertex buffers in
| --- | --- |
[VkVertexInputBindingDescription](fxvertex.html#VkVertexInputBindingDescription) for graphics pipelines which must not
exceed `maxVertexInputBindingStride`, `vertexStride` for
acceleration structure geometry is instead restricted to being a 32-bit
value. |

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03735) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03735

`vertexStride` **must** be a multiple of the size in bytes of the
smallest component of `vertexFormat`

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03819) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexStride-03819

`vertexStride` **must** be less than or equal to 232-1

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-03797) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-03797

The [format features](resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-03798) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-03798

`indexType` **must** be [VK_INDEX_TYPE_UINT16](drawing.html#VkIndexType),
[VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType), or [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_TRIANGLES_DATA_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureGeometryMotionTrianglesDataNV](#VkAccelerationStructureGeometryMotionTrianglesDataNV), [VkAccelerationStructureTrianglesDisplacementMicromapNV](#VkAccelerationStructureTrianglesDisplacementMicromapNV), or [VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT)

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-unique) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-parameter) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-parameter) VUID-VkAccelerationStructureGeometryTrianglesDataKHR-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

The `VkAccelerationStructureGeometryMotionTrianglesDataNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureGeometryMotionTrianglesDataNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    vertexData;
} VkAccelerationStructureGeometryMotionTrianglesDataNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexData` is a pointer to vertex data for this geometry at time
1.0

If `VkAccelerationStructureGeometryMotionTrianglesDataNV` is included in
the `pNext` chain of a
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR) structure, the basic
vertex positions are used for the position of the triangles in the geometry
at time 0.0 and the `vertexData` in
`VkAccelerationStructureGeometryMotionTrianglesDataNV` is used for the
vertex positions at time 1.0, with positions linearly interpolated at
intermediate times.

Indexing for `VkAccelerationStructureGeometryMotionTrianglesDataNV`
`vertexData` is equivalent to the basic vertex position data.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryMotionTrianglesDataNV-sType-sType) VUID-VkAccelerationStructureGeometryMotionTrianglesDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MOTION_TRIANGLES_DATA_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)

The `VkAccelerationStructureTrianglesOpacityMicromapEXT` structure is
defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkAccelerationStructureTrianglesOpacityMicromapEXT {
    VkStructureType                     sType;
    void*                               pNext;
    VkIndexType                         indexType;
    VkDeviceOrHostAddressConstKHR       indexBuffer;
    VkDeviceSize                        indexStride;
    uint32_t                            baseTriangle;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageEXT*           pUsageCounts;
    const VkMicromapUsageEXT* const*    ppUsageCounts;
    VkMicromapEXT                       micromap;
} VkAccelerationStructureTrianglesOpacityMicromapEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`indexType` is the type of triangle indices used when indexing this
micromap.

* 
`indexBuffer` is a device or host address of memory containing the
triangle indices.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType) it **must** be `NULL`.

* 
`indexStride` is the byte stride between triangle indices.

* 
`baseTriangle` is the base value added to the non-negative triangle
indices.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures.

* 
`micromap` is the handle to the micromap object to include in this
geometry.

If `VkAccelerationStructureTrianglesOpacityMicromapEXT` is included in
the `pNext` chain of a
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX) or
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR) structure, that
geometry will reference that micromap.

For each triangle in the geometry, the acceleration structure build fetches
an index from `indexBuffer` using `indexType` and `indexStride`
if present.
If `indexBuffer` is `NULL` then the index used is the index of the
triangle in the geometry.

If that value is the unsigned cast of one of the values from
[VkOpacityMicromapSpecialIndexEXT](#VkOpacityMicromapSpecialIndexEXT) then that triangle behaves as
described for that special value in [Ray Opacity Micromap](raytraversal.html#ray-opacity-micromap).

Otherwise that triangle uses the opacity micromap information from
`micromap` at that index plus `baseTriangle`.

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total count used to build
this geometry.
For a given `format` and `subdivisionLevel` the number of triangles
in this geometry matching those values after indirection and special index
handling **must** be equal to the sum of matching `count` provided.

If `micromap` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then every value read from
`indexBuffer` **must** be one of the values in
[VkOpacityMicromapSpecialIndexEXT](#VkOpacityMicromapSpecialIndexEXT).

Valid Usage

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-07335) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-07335

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10719) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10719

`indexType` **must** be [VK_INDEX_TYPE_UINT16](drawing.html#VkIndexType),
[VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType), or [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10722) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10722

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then
`indexStride` **must** be a multiple of the size in bytes of
`indexType`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10723) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10723

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then
`indexStride` **must** be less than or equal to 232-1

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-sType-sType) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-ppUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-micromap-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `micromap` **must** be a valid [VkMicromapEXT](resources.html#VkMicromapEXT) handle

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)

The [VkOpacityMicromapSpecialIndexEXT](#VkOpacityMicromapSpecialIndexEXT) enumeration is defined as:

// Provided by VK_EXT_opacity_micromap
typedef enum VkOpacityMicromapSpecialIndexEXT {
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT = -1,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT = -2,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT = -3,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT = -4,
  // Provided by VK_EXT_opacity_micromap with VK_NV_cluster_acceleration_structure
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV = -5,
} VkOpacityMicromapSpecialIndexEXT;

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT](#VkOpacityMicromapSpecialIndexEXT) specifies
that the entire triangle is fully transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT](#VkOpacityMicromapSpecialIndexEXT) specifies that
the entire triangle is fully opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT](#VkOpacityMicromapSpecialIndexEXT)
specifies that the entire triangle is unknown-transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT](#VkOpacityMicromapSpecialIndexEXT)
specifies that the entire triangle is unknown-opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV](#VkOpacityMicromapSpecialIndexEXT)
specifies that [Opacity Micromap](raytraversal.html#ray-opacity-micromap) will be
disabled for this triangle and opacity value will be picked from
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)::`baseGeometryIndexAndGeometryFlags`
instead.
Note that this special index is only valid for [    Cluster Geometry](#cluster-geometry).

The `VkAccelerationStructureTrianglesDisplacementMicromapNV` structure
is defined as:

// Provided by VK_NV_displacement_micromap
typedef struct VkAccelerationStructureTrianglesDisplacementMicromapNV {
    VkStructureType                     sType;
    void*                               pNext;
    VkFormat                            displacementBiasAndScaleFormat;
    VkFormat                            displacementVectorFormat;
    VkDeviceOrHostAddressConstKHR       displacementBiasAndScaleBuffer;
    VkDeviceSize                        displacementBiasAndScaleStride;
    VkDeviceOrHostAddressConstKHR       displacementVectorBuffer;
    VkDeviceSize                        displacementVectorStride;
    VkDeviceOrHostAddressConstKHR       displacedMicromapPrimitiveFlags;
    VkDeviceSize                        displacedMicromapPrimitiveFlagsStride;
    VkIndexType                         indexType;
    VkDeviceOrHostAddressConstKHR       indexBuffer;
    VkDeviceSize                        indexStride;
    uint32_t                            baseTriangle;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageEXT*           pUsageCounts;
    const VkMicromapUsageEXT* const*    ppUsageCounts;
    VkMicromapEXT                       micromap;
} VkAccelerationStructureTrianglesDisplacementMicromapNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displacementBiasAndScaleFormat` is the format of displacement bias
and scale used in this displacement micromap reference.

* 
`displacementVectorFormat` is the format of displacement vector used
in this displacement micromap reference.

* 
`displacementBiasAndScaleBuffer` is the address containing the bias
and scale.

* 
`displacementBiasAndScaleStride` is the byte stride between bias and
scale values.

* 
`displacementVectorBuffer` is the address containing the
displacement vector values.

* 
`displacementVectorStride` is the byte stride between displacement
vector values.

* 
`displacedMicromapPrimitiveFlags` is the address containing the
primitive flags.

* 
`displacedMicromapPrimitiveFlagsStride` is the byte stride between
primitive flag values.

* 
`indexType` is the type of triangle indices used when indexing this
micromap.

* 
`indexBuffer` is a device or host address of memory containing the
triangle indices.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType) it **must** be `NULL`.

* 
`indexStride` is the byte stride between triangle indices.

* 
`baseTriangle` is the base value added to the non-negative triangle
indices.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures.

* 
`micromap` is the handle to the micromap object to include in this
geometry.

If `VkAccelerationStructureTrianglesDisplacementMicromapNV` is included
in the `pNext` chain of a
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR) structure, that
geometry will reference that micromap.

For each triangle in the geometry, the acceleration structure build fetches
an index from `indexBuffer` using `indexType` and `indexStride`.
That triangle uses the displacement micromap information from `micromap`
at that index plus `baseTriangle`.

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total count used to build
this geometry.
For a given `format` and `subdivisionLevel` the number of triangles
in this geometry matching those values after indirection **must** be equal to
the sum of matching `count` provided.

Valid Usage

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementBiasAndScaleFormat-09501) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementBiasAndScaleFormat-09501

`displacementBiasAndScaleFormat` **must** not be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementVectorFormat-09502) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementVectorFormat-09502

`displacementVectorFormat` **must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-pUsageCounts-07992) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-pUsageCounts-07992

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-sType-sType) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_DISPLACEMENT_MICROMAP_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementBiasAndScaleFormat-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementBiasAndScaleFormat-parameter

 `displacementBiasAndScaleFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementVectorFormat-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-displacementVectorFormat-parameter

 `displacementVectorFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-indexType-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-pUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-ppUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to [VkMicromapUsageEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapUsageEXT) structures

* 
[](#VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-micromap-parameter) VUID-VkAccelerationStructureTrianglesDisplacementMicromapNV-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `micromap` **must** be a valid [VkMicromapEXT](resources.html#VkMicromapEXT) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)

To build an acceleration structure for the `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`
extension call:

// Provided by VK_NV_ray_tracing
void vkCmdBuildAccelerationStructureNV(
    VkCommandBuffer                             commandBuffer,
    const VkAccelerationStructureInfoNV*        pInfo,
    VkBuffer                                    instanceData,
    VkDeviceSize                                instanceOffset,
    VkBool32                                    update,
    VkAccelerationStructureNV                   dst,
    VkAccelerationStructureNV                   src,
    VkBuffer                                    scratch,
    VkDeviceSize                                scratchOffset);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` contains the shared information for the acceleration
structure’s structure.

* 
`instanceData` is the buffer containing an array of
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR) structures defining
acceleration structures.
This parameter **must** be `NULL` for bottom level acceleration structures.

* 
`instanceOffset` is the offset in bytes (relative to the start of
`instanceData`) at which the instance data is located.

* 
`update` specifies whether to update the `dst` acceleration
structure with the data in `src`.

* 
`dst` is a pointer to the target acceleration structure for the
build.

* 
`src` is a pointer to an existing acceleration structure that is to
be used to update the `dst` acceleration structure.

* 
`scratch` is the [VkBuffer](resources.html#VkBuffer) that will be used as scratch memory
for the build.

* 
`scratchOffset` is the offset in bytes relative to the start of
`scratch` that will be used as a scratch memory.

Accesses to `dst`, `src`, and `scratch` **must** be
[synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-geometryCount-02241) VUID-vkCmdBuildAccelerationStructureNV-geometryCount-02241

`geometryCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxGeometryCount`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-02488) VUID-vkCmdBuildAccelerationStructureNV-dst-02488

`dst` **must** have been created with compatible
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV) where
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`type` and
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`flags` are identical,
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`instanceCount` and
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`geometryCount` for `dst`
are greater than or equal to the build size and each geometry in
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`pGeometries` for `dst` has
greater than or equal to the number of vertices, indices, and AABBs

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02489) VUID-vkCmdBuildAccelerationStructureNV-update-02489

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), `src` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02490) VUID-vkCmdBuildAccelerationStructureNV-update-02490

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), `src` **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) set in
[VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV)::`flags` in the original build

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02491) VUID-vkCmdBuildAccelerationStructureNV-update-02491

If `update` is [VK_FALSE](fundamentals.html#VK_FALSE), the `size` member of the
[VkMemoryRequirements](resources.html#VkMemoryRequirements) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](resources.html#vkGetAccelerationStructureMemoryRequirementsNV) with
[VkAccelerationStructureMemoryRequirementsInfoNV](resources.html#VkAccelerationStructureMemoryRequirementsInfoNV)::`accelerationStructure`
set to `dst` and
[VkAccelerationStructureMemoryRequirementsInfoNV](resources.html#VkAccelerationStructureMemoryRequirementsInfoNV)::`type` set to
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](resources.html#VkAccelerationStructureMemoryRequirementsTypeNV)
**must** be less than or equal to the size of `scratch` minus
`scratchOffset`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02492) VUID-vkCmdBuildAccelerationStructureNV-update-02492

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), the `size` member of the
[VkMemoryRequirements](resources.html#VkMemoryRequirements) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](resources.html#vkGetAccelerationStructureMemoryRequirementsNV) with
[VkAccelerationStructureMemoryRequirementsInfoNV](resources.html#VkAccelerationStructureMemoryRequirementsInfoNV)::`accelerationStructure`
set to `dst` and
[VkAccelerationStructureMemoryRequirementsInfoNV](resources.html#VkAccelerationStructureMemoryRequirementsInfoNV)::`type` set to
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](resources.html#VkAccelerationStructureMemoryRequirementsTypeNV)
**must** be less than or equal to the size of `scratch` minus
`scratchOffset`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-scratch-03522) VUID-vkCmdBuildAccelerationStructureNV-scratch-03522

`scratch` **must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-instanceData-03523) VUID-vkCmdBuildAccelerationStructureNV-instanceData-03523

If `instanceData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `instanceData`
**must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-accelerationStructureReference-12264) VUID-vkCmdBuildAccelerationStructureNV-accelerationStructureReference-12264

Each
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`accelerationStructureReference`
value in `instanceData` **must** be a value obtained from
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV) for a bottom level acceleration
structure

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03524) VUID-vkCmdBuildAccelerationStructureNV-update-03524

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), then objects that were previously
active **must** not be made inactive as per
[Inactive Primitives and Instances](#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03525) VUID-vkCmdBuildAccelerationStructureNV-update-03525

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), then objects that were previously
inactive **must** not be made active as per
[Inactive Primitives and Instances](#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03526) VUID-vkCmdBuildAccelerationStructureNV-update-03526

If `update` is [VK_TRUE](fundamentals.html#VK_TRUE), the `src` and `dst` objects
**must** either be the same object or not have any
[memory aliasing](resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-07787) VUID-vkCmdBuildAccelerationStructureNV-dst-07787

`dst` **must** be bound completely and contiguously to a single
`VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](resources.html#vkBindAccelerationStructureMemoryNV)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-pInfo-parameter) VUID-vkCmdBuildAccelerationStructureNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureInfoNV](resources.html#VkAccelerationStructureInfoNV) structure

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-instanceData-parameter) VUID-vkCmdBuildAccelerationStructureNV-instanceData-parameter

 If `instanceData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `instanceData` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-parameter) VUID-vkCmdBuildAccelerationStructureNV-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-src-parameter) VUID-vkCmdBuildAccelerationStructureNV-src-parameter

 If `src` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `src` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-scratch-parameter) VUID-vkCmdBuildAccelerationStructureNV-scratch-parameter

 `scratch` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-recording) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-renderpass) VUID-vkCmdBuildAccelerationStructureNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-suspended) VUID-vkCmdBuildAccelerationStructureNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-videocoding) VUID-vkCmdBuildAccelerationStructureNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commonparent) VUID-vkCmdBuildAccelerationStructureNV-commonparent

 Each of `commandBuffer`, `dst`, `instanceData`, `scratch`, and `src` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildAccelerationStructureNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkTransformMatrixKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkTransformMatrixKHR {
    float    matrix[3][4];
} VkTransformMatrixKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkTransformMatrixKHR
typedef VkTransformMatrixKHR VkTransformMatrixNV;

* 
`matrix` is a 3x4 row-major affine transformation matrix.

Valid Usage

* 
[](#VUID-VkTransformMatrixKHR-matrix-03799) VUID-VkTransformMatrixKHR-matrix-03799

The first three columns of `matrix` **must** define an invertible 3x3
matrix

The `VkAccelerationStructureGeometryAabbsDataKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryAabbsDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    data;
    VkDeviceSize                     stride;
} VkAccelerationStructureGeometryAabbsDataKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`data` is a device or host address of memory containing
[VkAabbPositionsKHR](#VkAabbPositionsKHR) structures containing position data for each
axis-aligned bounding box in the geometry.

* 
`stride` is the stride in bytes between each entry in `data`.
The stride **must** be a multiple of `8`.

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03545) VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03545

`stride` **must** be a multiple of `8`

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03820) VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03820

`stride` **must** be less than or equal to 232-1

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryAabbsDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_AABBS_DATA_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryAabbsDataKHR-pNext-pNext

 `pNext` **must** be `NULL`

The `VkAabbPositionsKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAabbPositionsKHR {
    float    minX;
    float    minY;
    float    minZ;
    float    maxX;
    float    maxY;
    float    maxZ;
} VkAabbPositionsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAabbPositionsKHR
typedef VkAabbPositionsKHR VkAabbPositionsNV;

* 
`minX` is the x position of one opposing corner of a bounding box.

* 
`minY` is the y position of one opposing corner of a bounding box.

* 
`minZ` is the z position of one opposing corner of a bounding box.

* 
`maxX` is the x position of the other opposing corner of a bounding
box.

* 
`maxY` is the y position of the other opposing corner of a bounding
box.

* 
`maxZ` is the z position of the other opposing corner of a bounding
box.

Valid Usage

* 
[](#VUID-VkAabbPositionsKHR-minX-03546) VUID-VkAabbPositionsKHR-minX-03546

`minX` **must** be less than or equal to `maxX`

* 
[](#VUID-VkAabbPositionsKHR-minY-03547) VUID-VkAabbPositionsKHR-minY-03547

`minY` **must** be less than or equal to `maxY`

* 
[](#VUID-VkAabbPositionsKHR-minZ-03548) VUID-VkAabbPositionsKHR-minZ-03548

`minZ` **must** be less than or equal to `maxZ`

The `VkAccelerationStructureGeometryInstancesDataKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryInstancesDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkBool32                         arrayOfPointers;
    VkDeviceOrHostAddressConstKHR    data;
} VkAccelerationStructureGeometryInstancesDataKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`arrayOfPointers` specifies whether `data` is used as an array
of addresses or just an array.

* 
`data` is either the address of an array of device or host addresses
referencing individual [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)
structures
or packed motion instance information as described in
[motion instances](#acceleration-structure-motion-instances)
if `arrayOfPointers` is [VK_TRUE](fundamentals.html#VK_TRUE), or the address of an array of
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)
or [VkAccelerationStructureMotionInstanceNV](#VkAccelerationStructureMotionInstanceNV)
structures.
Addresses and [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR) structures are
tightly packed.
[VkAccelerationStructureMotionInstanceNV](#VkAccelerationStructureMotionInstanceNV) structures have a stride
of 160 bytes.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryInstancesDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryInstancesDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_INSTANCES_DATA_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometryInstancesDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryInstancesDataKHR-pNext-pNext

 `pNext` **must** be `NULL`

*Acceleration structure instances* **can** be built into top-level acceleration
structures.
Each acceleration structure instance is a separate entry in the top-level
acceleration structure which includes all the geometry of a bottom-level
acceleration structure at a transformed location.
Multiple instances **can** point to the same bottom level acceleration
structure.

An acceleration structure instance is defined by the structure:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureInstanceKHR {
    VkTransformMatrixKHR          transform;
    uint32_t                      instanceCustomIndex:24;
    uint32_t                      mask:8;
    uint32_t                      instanceShaderBindingTableRecordOffset:24;
    VkGeometryInstanceFlagsKHR    flags:8;
    uint64_t                      accelerationStructureReference;
} VkAccelerationStructureInstanceKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAccelerationStructureInstanceKHR
typedef VkAccelerationStructureInstanceKHR VkAccelerationStructureInstanceNV;

* 
`transform` is a [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure describing a
transformation to be applied to the acceleration structure.

* 
`instanceCustomIndex` is a 24-bit application-specified index value
accessible to ray shaders in the `InstanceCustomIndexKHR` built-in.

* 
`mask` is an 8-bit visibility mask for the geometry.
The instance **may** only be hit if `Cull Mask & instance.mask != 0`

* 
`instanceShaderBindingTableRecordOffset` is a 24-bit offset used in
calculating the hit shader binding table index.

* 
`flags` is an 8-bit mask of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR)
values to apply to this instance.

* 
`accelerationStructureReference` is
either
    :

a device address containing the value obtained from
[vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)
     for a bottom level acceleration structure (used by device operations
     which reference acceleration structures)
or,

* 
a device address containing a bottom level cluster acceleration
structure built using
[vkCmdBuildClusterAccelerationStructureIndirectNV](#vkCmdBuildClusterAccelerationStructureIndirectNV)

* 
a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object (used by host operations
which reference acceleration structures).

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is for the following:

* 
`instanceCustomIndex` and `mask` occupy the same memory as if a
single `uint32_t` was specified in their place

`instanceCustomIndex` occupies the 24 least significant bits of
that memory

* 
`mask` occupies the 8 most significant bits of that memory

`instanceShaderBindingTableRecordOffset` and `flags` occupy the
same memory as if a single `uint32_t` was specified in their place

* 
`instanceShaderBindingTableRecordOffset` occupies the 24 least
significant bits of that memory

* 
`flags` occupies the 8 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureInstanceKHR-flags-parameter) VUID-VkAccelerationStructureInstanceKHR-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR) values

Possible values of `flags` in the instance modifying the behavior of
that instance are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryInstanceFlagBitsKHR {
    VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR = 0x00000001,
    VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR = 0x00000002,
    VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR = 0x00000004,
    VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_opacity_micromap
    VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_opacity_micromap
    VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT = 0x00000020,
    VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR = VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_TRIANGLE_CULL_DISABLE_BIT_NV = VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_NV = VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_NV = VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_NV = VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR,
  // Provided by VK_EXT_opacity_micromap
  // VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_EXT is a legacy alias
    VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_EXT = VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_EXT is a legacy alias
    VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_EXT = VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT,
} VkGeometryInstanceFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryInstanceFlagBitsKHR
typedef VkGeometryInstanceFlagBitsKHR VkGeometryInstanceFlagBitsNV;

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR](#VkGeometryInstanceFlagBitsNV) disables
face culling for this instance.

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR](#VkGeometryInstanceFlagBitsNV) specifies that
the [facing determination](raytraversal.html#ray-traversal-culling-face) for geometry in
this instance is inverted.
Because the facing is determined in object space, an instance transform
does not change the winding, but a geometry transform does.

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR](#VkGeometryInstanceFlagBitsNV) causes this instance to
act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV) were specified on all
geometries referenced by this instance.
This behavior **can** be overridden by the SPIR-V `NoOpaqueKHR` ray
flag.

* 
[VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR](#VkGeometryInstanceFlagBitsNV) causes this instance
to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV) were not specified on
all geometries referenced by this instance.
This behavior **can** be overridden by the SPIR-V `OpaqueKHR` ray flag.

[VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR](#VkGeometryInstanceFlagBitsNV) and
[VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR](#VkGeometryInstanceFlagBitsNV) **must** not be used in the
same flag.

// Provided by VK_KHR_acceleration_structure
typedef VkFlags VkGeometryInstanceFlagsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryInstanceFlagsKHR
typedef VkGeometryInstanceFlagsKHR VkGeometryInstanceFlagsNV;

`VkGeometryInstanceFlagsKHR` is a bitmask type for setting a mask of
zero or more [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR).

*Acceleration structure motion instances* **can** be built into top-level
acceleration structures.
Each acceleration structure instance is a separate entry in the top-level
acceleration structure which includes all the geometry of a bottom-level
acceleration structure at a transformed location including a type of motion
and parameters to determine the motion of the instance over time.

An acceleration structure motion instance is defined by the structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMotionInstanceNV {
    VkAccelerationStructureMotionInstanceTypeNV     type;
    VkAccelerationStructureMotionInstanceFlagsNV    flags;
    VkAccelerationStructureMotionInstanceDataNV     data;
} VkAccelerationStructureMotionInstanceNV;

* 
`type` is a [VkAccelerationStructureMotionInstanceTypeNV](#VkAccelerationStructureMotionInstanceTypeNV)
enumerant identifying which type of motion instance this is and which
type of the union is valid.

* 
`flags` is currently unused, but is required to keep natural
alignment of `data`.

* 
`data` is a [VkAccelerationStructureMotionInstanceDataNV](#VkAccelerationStructureMotionInstanceDataNV)
containing motion instance data for this instance.

|  | If writing this other than with a standard C compiler, note that the final
| --- | --- |
structure should be 152 bytes in size. |

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-type-parameter) VUID-VkAccelerationStructureMotionInstanceNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureMotionInstanceTypeNV](#VkAccelerationStructureMotionInstanceTypeNV) value

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-flags-zerobitmask) VUID-VkAccelerationStructureMotionInstanceNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-staticInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-staticInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV](#VkAccelerationStructureMotionInstanceTypeNV), the `staticInstance` member of `data` **must** be a valid [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR) structure

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-matrixMotionInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-matrixMotionInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV](#VkAccelerationStructureMotionInstanceTypeNV), the `matrixMotionInstance` member of `data` **must** be a valid [VkAccelerationStructureMatrixMotionInstanceNV](#VkAccelerationStructureMatrixMotionInstanceNV) structure

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-srtMotionInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-srtMotionInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV](#VkAccelerationStructureMotionInstanceTypeNV), the `srtMotionInstance` member of `data` **must** be a valid [VkAccelerationStructureSRTMotionInstanceNV](#VkAccelerationStructureSRTMotionInstanceNV) structure

Acceleration structure motion instance is defined by the union:

// Provided by VK_NV_ray_tracing_motion_blur
typedef union VkAccelerationStructureMotionInstanceDataNV {
    VkAccelerationStructureInstanceKHR               staticInstance;
    VkAccelerationStructureMatrixMotionInstanceNV    matrixMotionInstance;
    VkAccelerationStructureSRTMotionInstanceNV       srtMotionInstance;
} VkAccelerationStructureMotionInstanceDataNV;

* 
`staticInstance` is a [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)
structure containing data for a static instance.

* 
`matrixMotionInstance` is a
[VkAccelerationStructureMatrixMotionInstanceNV](#VkAccelerationStructureMatrixMotionInstanceNV) structure containing
data for a matrix motion instance.

* 
`srtMotionInstance` is a
[VkAccelerationStructureSRTMotionInstanceNV](#VkAccelerationStructureSRTMotionInstanceNV) structure containing
data for an SRT motion instance.

// Provided by VK_NV_ray_tracing_motion_blur
typedef VkFlags VkAccelerationStructureMotionInstanceFlagsNV;

`VkAccelerationStructureMotionInstanceFlagsNV` is a bitmask type for
setting a mask, but is currently reserved for future use.

The [VkAccelerationStructureMotionInstanceTypeNV](#VkAccelerationStructureMotionInstanceTypeNV) enumeration is defined
as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef enum VkAccelerationStructureMotionInstanceTypeNV {
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV = 0,
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV = 1,
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV = 2,
} VkAccelerationStructureMotionInstanceTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV](#VkAccelerationStructureMotionInstanceTypeNV) specifies
that the instance is a static instance with no instance motion.

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV](#VkAccelerationStructureMotionInstanceTypeNV)
specifies that the instance is a motion instance with motion specified
by interpolation between two matrices.

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV](#VkAccelerationStructureMotionInstanceTypeNV)
specifies that the instance is a motion instance with motion specified
by interpolation in the SRT decomposition.

An acceleration structure matrix motion instance is defined by the
structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMatrixMotionInstanceNV {
    VkTransformMatrixKHR          transformT0;
    VkTransformMatrixKHR          transformT1;
    uint32_t                      instanceCustomIndex:24;
    uint32_t                      mask:8;
    uint32_t                      instanceShaderBindingTableRecordOffset:24;
    VkGeometryInstanceFlagsKHR    flags:8;
    uint64_t                      accelerationStructureReference;
} VkAccelerationStructureMatrixMotionInstanceNV;

* 
`transformT0` is a [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure describing a
transformation to be applied to the acceleration structure at time 0.

* 
`transformT1` is a [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure describing a
transformation to be applied to the acceleration structure at time 1.

* 
`instanceCustomIndex` is a 24-bit application-specified index value
accessible to ray shaders in the `InstanceCustomIndexKHR` built-in.

* 
`mask` is an 8-bit visibility mask for the geometry.
The instance **may** only be hit if `Cull Mask & instance.mask != 0`

* 
`instanceShaderBindingTableRecordOffset` is a 24-bit offset used in
calculating the hit shader binding table index.

* 
`flags` is an 8-bit mask of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR)
values to apply to this instance.

* 
`accelerationStructureReference` is either:

a device address containing the value obtained from
[vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)
     (used by device operations which reference acceleration structures) or,

* 
a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object (used by host operations
which reference acceleration structures).

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is for the following:

* 
`instanceCustomIndex` and `mask` occupy the same memory as if a
single `uint32_t` was specified in their place

`instanceCustomIndex` occupies the 24 least significant bits of
that memory

* 
`mask` occupies the 8 most significant bits of that memory

`instanceShaderBindingTableRecordOffset` and `flags` occupy the
same memory as if a single `uint32_t` was specified in their place

* 
`instanceShaderBindingTableRecordOffset` occupies the 24 least
significant bits of that memory

* 
`flags` occupies the 8 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

The transform for a matrix motion instance at a point in time is derived by
component-wise linear interpolation of the two transforms.
That is, for a `time` in [0,1] the resulting transform is

`transformT0` × (1 - `time`) + 
`transformT1` × `time`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMatrixMotionInstanceNV-flags-parameter) VUID-VkAccelerationStructureMatrixMotionInstanceNV-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR) values

An acceleration structure SRT motion instance is defined by the structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureSRTMotionInstanceNV {
    VkSRTDataNV                   transformT0;
    VkSRTDataNV                   transformT1;
    uint32_t                      instanceCustomIndex:24;
    uint32_t                      mask:8;
    uint32_t                      instanceShaderBindingTableRecordOffset:24;
    VkGeometryInstanceFlagsKHR    flags:8;
    uint64_t                      accelerationStructureReference;
} VkAccelerationStructureSRTMotionInstanceNV;

* 
`transformT0` is a [VkSRTDataNV](#VkSRTDataNV) structure describing a
transformation to be applied to the acceleration structure at time 0.

* 
`transformT1` is a [VkSRTDataNV](#VkSRTDataNV) structure describing a
transformation to be applied to the acceleration structure at time 1.

* 
`instanceCustomIndex` is a 24-bit application-specified index value
accessible to ray shaders in the `InstanceCustomIndexKHR` built-in.

* 
`mask` is an 8-bit visibility mask for the geometry.
The instance **may** only be hit if `Cull Mask & instance.mask != 0`

* 
`instanceShaderBindingTableRecordOffset` is a 24-bit offset used in
calculating the hit shader binding table index.

* 
`flags` is an 8-bit mask of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR)
values to apply to this instance.

* 
`accelerationStructureReference` is either:

a device address containing the value obtained from
[vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)
     (used by device operations which reference acceleration structures) or,

* 
a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object (used by host operations
which reference acceleration structures).

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is for the following:

* 
`instanceCustomIndex` and `mask` occupy the same memory as if a
single `uint32_t` was specified in their place

`instanceCustomIndex` occupies the 24 least significant bits of
that memory

* 
`mask` occupies the 8 most significant bits of that memory

`instanceShaderBindingTableRecordOffset` and `flags` occupy the
same memory as if a single `uint32_t` was specified in their place

* 
`instanceShaderBindingTableRecordOffset` occupies the 24 least
significant bits of that memory

* 
`flags` occupies the 8 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

The transform for a SRT motion instance at a point in time is derived from
component-wise linear interpolation of the two SRT transforms.
That is, for a `time` in [0,1] the resulting transform is

`transformT0` × (1 - `time`) + 
`transformT1` × `time`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureSRTMotionInstanceNV-flags-parameter) VUID-VkAccelerationStructureSRTMotionInstanceNV-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryInstanceFlagBitsKHR](#VkGeometryInstanceFlagBitsKHR) values

An acceleration structure SRT transform is defined by the structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkSRTDataNV {
    float    sx;
    float    a;
    float    b;
    float    pvx;
    float    sy;
    float    c;
    float    pvy;
    float    sz;
    float    pvz;
    float    qx;
    float    qy;
    float    qz;
    float    qw;
    float    tx;
    float    ty;
    float    tz;
} VkSRTDataNV;

* 
`sx` is the x component of the scale of the transform

* 
`a` is one component of the shear for the transform

* 
`b` is one component of the shear for the transform

* 
`pvx` is the x component of the pivot point of the transform

* 
`sy` is the y component of the scale of the transform

* 
`c` is one component of the shear for the transform

* 
`pvy` is the y component of the pivot point of the transform

* 
`sz` is the z component of the scale of the transform

* 
`pvz` is the z component of the pivot point of the transform

* 
`qx` is the x component of the rotation quaternion

* 
`qy` is the y component of the rotation quaternion

* 
`qz` is the z component of the rotation quaternion

* 
`qw` is the w component of the rotation quaternion

* 
`tx` is the x component of the post-rotation translation

* 
`ty` is the y component of the post-rotation translation

* 
`tz` is the z component of the post-rotation translation

This transform decomposition consists of three elements.
The first is a matrix S, consisting of a scale, shear, and translation,
usually used to define the pivot point of the following rotation.
This matrix is constructed from the parameters above by:

  

  

The rotation quaternion is defined as:

`R` = [ `qx`, `qy`, `qz`, `qw` ]

This is a rotation around a conceptual normalized axis [ ax, ay, az ]
of amount `theta` such that:

[ `qx`, `qy`, `qz` ] = sin(`theta`/2)
× [ `ax`, `ay`, `az` ]

and

`qw` = cos(`theta`/2)

Finally, the transform has a translation T constructed from the parameters
above by:

  

  

The effective derived transform is then given by

`T` × `R` × `S`

If a `VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure is included in the `pNext` chain of a
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structure whose `geometryType`
member is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), then
that structure defines triangle geometry using compressed data.

The `VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure is defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef struct VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX {
    VkStructureType                   sType;
    const void*                       pNext;
    VkDeviceOrHostAddressConstKHR     compressedData;
    VkDeviceSize                      dataSize;
    uint32_t                          numTriangles;
    uint32_t                          numVertices;
    uint32_t                          maxPrimitiveIndex;
    uint32_t                          maxGeometryIndex;
    VkCompressedTriangleFormatAMDX    format;
} VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compressedData` specifies the base address of the compressed data.

* 
`dataSize` specifies the size of the compressed data.

* 
`numTriangles` specifies the total number of triangles encoded in
the compressed data.

* 
`numVertices` specifies the number of vertices in the compressed
data.

* 
`maxPrimitiveIndex` specifies the maximum primitive index encoded in
the compressed data.

* 
`maxGeometryIndex` specifies the maximum geometry index encoded in
the compressed data.

* 
`format` specifies the [VkCompressedTriangleFormatAMDX](#VkCompressedTriangleFormatAMDX) format
of the compressed data.

If `format` is [VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX](#VkCompressedTriangleFormatAMDX),
`numVertices` specifies the sum of vertex counts across all blocks.

Valid Usage

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-10885) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-10885

The buffer from which `compressedData.deviceAddress` is queried
**must** have been created with the
[VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX](resources.html#VkBufferUsageFlagBits2KHR) usage flag set

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-denseGeometryFormat-10886) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-denseGeometryFormat-10886

The [    `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX`::`denseGeometryFormat`](features.html#features-denseGeometryFormat)
feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10887) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10887

If `format` is VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX, then
`compressedData` **must** be aligned to
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX](#VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX) (128) bytes

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10888) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-10888

If `format` is VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX, then
`dataSize` **must** be a multiple of
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX](#VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX) (128) bytes

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10890) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10890

`pNext` **must** be `NULL` or a pointer to a valid
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) structure

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10891) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-pNext-10891

If `pNext` is a pointer to a valid
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) structure, the
[`micromap`](features.html#features-micromap) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-sType-sType) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DENSE_GEOMETRY_FORMAT_TRIANGLES_DATA_AMDX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-parameter) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-compressedData-parameter

 `compressedData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-parameter) VUID-VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX-format-parameter

 `format` **must** be a valid [VkCompressedTriangleFormatAMDX](#VkCompressedTriangleFormatAMDX) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR)

[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX](#VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX) is the
alignment requirement in bytes for compressed triangle data as specified in
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)::`compressedData`.

#define VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX 128U

[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX](#VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX) is the stride
requirement in bytes for compressed triangle data as specified in
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)::`dataSize`.

#define VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX 128U

The [VkCompressedTriangleFormatAMDX](#VkCompressedTriangleFormatAMDX) enumeration is defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef enum VkCompressedTriangleFormatAMDX {
    VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX = 0,
} VkCompressedTriangleFormatAMDX;

* 
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_AMDX](#VkCompressedTriangleFormatAMDX) specifies that the
compressed triangle data is in [Dense Geometry    Format](VK_AMDX_dense_geometry_format/dense_geometry_format.html#dense-geometry-format), version 1, consisting of an array of 128B DGF blocks.

`VkAccelerationStructureBuildRangeInfoKHR` is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureBuildRangeInfoKHR {
    uint32_t    primitiveCount;
    uint32_t    primitiveOffset;
    uint32_t    firstVertex;
    uint32_t    transformOffset;
} VkAccelerationStructureBuildRangeInfoKHR;

* 
`primitiveCount` defines the number of primitives for a
corresponding acceleration structure geometry.

* 
`primitiveOffset` defines an offset in bytes into the memory where
primitive data is defined.

* 
`firstVertex` is the index of the first vertex to build from for
triangle geometry.

* 
`transformOffset` defines an offset in bytes into the memory where a
transform matrix is defined.

The primitive count and primitive offset are interpreted differently
depending on the [VkGeometryTypeKHR](resources.html#VkGeometryTypeKHR) used:

* 
For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`primitiveCount` is the number of triangles to be built, where each
triangle is treated as 3 vertices.

If the geometry uses indices, `primitiveCount` × 3
indices are consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices.

* 
If the geometry does not use indices, `primitiveCount` ×
3 vertices are consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexStride`
× `firstVertex`.

* 
If
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`transformData`
is not `NULL`, a single [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure is
consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`transformData`,
at an offset of `transformOffset`.
This matrix describes a transformation from the space in which the
vertices for all triangles in this geometry are described to the space
in which the acceleration structure is defined.

For geometries of type [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV),
`primitiveCount` is the number of axis-aligned bounding boxes.
`primitiveCount` [VkAabbPositionsKHR](#VkAabbPositionsKHR) structures are consumed
from [VkAccelerationStructureGeometryAabbsDataKHR](#VkAccelerationStructureGeometryAabbsDataKHR)::`data`,
starting at an offset of `primitiveOffset`.

For geometries of type [VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
`primitiveCount` is the number of spheres to be built, where each
sphere is treated as 1 vertex.

* 
If the geometry uses indices, `primitiveCount` indices are consumed
from
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices and radii.

* 
If the geometry does not use indices, `primitiveCount` vertices and
radii are consumed from
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`vertexStride`
× `firstVertex` and
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`radiusData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`radiusStride`
× `firstVertex` respectively.

For geometries of type [VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
`primitiveCount` is the number of LSS primitives to be built, where
each LSS primitive is treated as 2 vertices.

* 
If the geometry uses indices, `primitiveCount` × 2
indices are consumed from
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexData`,
starting at an offset of `primitiveOffset`.
The value of `firstVertex` is added to the index values before
fetching vertices and radii.

* 
If the geometry does not use indices, `primitiveCount` ×
2 vertices and radii are consumed from
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`vertexData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`vertexStride`
× `firstVertex` and
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`radiusData`,
starting at an offset of `primitiveOffset` + 
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`radiusStride`
× `firstVertex` respectively.

For geometries of type [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV),
`primitiveCount` is the number of acceleration structures.
`primitiveCount` [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)
or [VkAccelerationStructureMotionInstanceNV](#VkAccelerationStructureMotionInstanceNV)
structures are consumed from
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR)::`data`,
starting at an offset of `primitiveOffset`.

Valid Usage

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-vertexData-10418) VUID-VkAccelerationStructureBuildRangeInfoKHR-vertexData-10418

The number of vertices consumed from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexData`
**must** be less than or equal to
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`maxVertex`
+ 1

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03656) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03656

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if the
geometry uses indices, the offset `primitiveOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`indexData`
**must** be a multiple of the element size of
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`indexType`

* 
[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03657) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03657

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if the
geometry does not use indices, the offset `primitiveOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexData`
**must** be a multiple of:

the [size of the format](formats.html#formats) specified in
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexFormat`,
if that format is a [packed format](formats.html#formats-packed)

* 
the [component size](formats.html#formats) of the
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`vertexFormat`,
if that format is not a [packed format](formats.html#formats-packed)

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-maxVertex-10774) VUID-VkAccelerationStructureBuildRangeInfoKHR-maxVertex-10774

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if the
geometry uses indices, then
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`maxVertex`
**must** be greater than or equal to `firstVertex` plus the maximum
index value found in the
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`indexData`
in the range [`primitiveOffset`, `primitiveOffset`

`primitiveCount` x 3]

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-None-10775) VUID-VkAccelerationStructureBuildRangeInfoKHR-None-10775

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if the
geometry does not use indices, then
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::maxVertex **must**
be greater than or equal to firstVertex + primitiveCount x 3 - 1

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-transformOffset-03658) VUID-VkAccelerationStructureBuildRangeInfoKHR-transformOffset-03658

For geometries of type [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), the offset
`transformOffset` from
[VkAccelerationStructureGeometryTrianglesDataKHR](#VkAccelerationStructureGeometryTrianglesDataKHR)::`transformData`
**must** be a multiple of 16

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03659) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03659

For geometries of type [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV), the offset
`primitiveOffset` from
[VkAccelerationStructureGeometryAabbsDataKHR](#VkAccelerationStructureGeometryAabbsDataKHR)::`data` **must** be a
multiple of 8

[](#VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03660) VUID-VkAccelerationStructureBuildRangeInfoKHR-primitiveOffset-03660

For geometries of type [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), the offset
`primitiveOffset` from
[VkAccelerationStructureGeometryInstancesDataKHR](#VkAccelerationStructureGeometryInstancesDataKHR)::`data` **must**
be a multiple of 16

If `VkAccelerationStructureGeometryLinearSweptSpheresDataNV` is included
in the `pNext` chain of a [VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR)
structure, then that structures defines the linear swept sphere’s (LSS)
geometry data.

The `VkAccelerationStructureGeometryLinearSweptSpheresDataNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkAccelerationStructureGeometryLinearSweptSpheresDataNV {
    VkStructureType                          sType;
    const void*                              pNext;
    VkFormat                                 vertexFormat;
    VkDeviceOrHostAddressConstKHR            vertexData;
    VkDeviceSize                             vertexStride;
    VkFormat                                 radiusFormat;
    VkDeviceOrHostAddressConstKHR            radiusData;
    VkDeviceSize                             radiusStride;
    VkIndexType                              indexType;
    VkDeviceOrHostAddressConstKHR            indexData;
    VkDeviceSize                             indexStride;
    VkRayTracingLssIndexingModeNV            indexingMode;
    VkRayTracingLssPrimitiveEndCapsModeNV    endCapsMode;
} VkAccelerationStructureGeometryLinearSweptSpheresDataNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](formats.html#VkFormat) of each LSS vertex element.

* 
`vertexData` is a device or host address of memory containing vertex
data for this geometry.

* 
`vertexStride` is the stride in bytes between each vertex element.

* 
`radiusFormat` is the [VkFormat](formats.html#VkFormat) of each LSS radius.

* 
`radiusData` is a device or host address of memory containing LSS
radius data value.

* 
`radiusStride` is the stride in bytes between each radius value.

* 
`indexType` is the [VkIndexType](drawing.html#VkIndexType) of each index element.

* 
`indexData` is a device or host address of memory containing index
data for vertex and radius buffers for this geometry.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType) it **must** be `NULL`.

* 
`indexStride` is the stride in bytes between each index element.

* 
`indexingMode` is a [VkRayTracingLssIndexingModeNV](#VkRayTracingLssIndexingModeNV) value
specifying the mode of indexing.

* 
`endCapsMode` is a [VkRayTracingLssPrimitiveEndCapsModeNV](#VkRayTracingLssPrimitiveEndCapsModeNV) value
specifying the endcaps mode for LSS primitives.

If an index buffer is not specified in `indexData`, LSS primitives are
rendered individually using subsequent pairs of vertices similar to
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](drawing.html#VkPrimitiveTopology).

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-None-10419) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-None-10419

The [linearSweptSpheres](features.html#features-linearSweptSpheres) feature **must** be
enabled

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10421) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10421

`vertexStride` **must** be a multiple of:

the [size of the format](formats.html#formats) specified in `vertexFormat` if
that format is a [packed format](formats.html#formats-packed)

* 
the [component size](formats.html#formats) specified in `vertexFormat` if that
format is not a [packed format](formats.html#formats-packed)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10422) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10422

`vertexStride` and `radiusStride` **must** be less than or equal to
232-1

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-10423) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-10423

The [format features](resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-10424) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-10424

The [format features](resources.html#resources-buffer-view-format-features) of
`radiusFormat` **must** contain
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-10426) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-10426

All values referenced in `radiusData` **must** be greater than or equal
to `0`

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-10427) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-10427

If `indexingMode` is
[VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](#VkRayTracingLssIndexingModeNV), `indexData`
**must** not be `NULL`

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-10428) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-10428

`indexType` **must** be [VK_INDEX_TYPE_UINT16](drawing.html#VkIndexType),
[VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType), or [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-sType-sType) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_LINEAR_SWEPT_SPHERES_DATA_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexData-parameter

 `vertexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-parameter

 `radiusFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-parameter

 `radiusData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexType-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-parameter

 `indexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-parameter

 `indexingMode` **must** be a valid [VkRayTracingLssIndexingModeNV](#VkRayTracingLssIndexingModeNV) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-endCapsMode-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-endCapsMode-parameter

 `endCapsMode` **must** be a valid [VkRayTracingLssPrimitiveEndCapsModeNV](#VkRayTracingLssPrimitiveEndCapsModeNV) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR)

Chaining LSS primitives **can** be achieved by specifying an index buffer in
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexData`
and setting
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexingMode`
to one of [VkRayTracingLssIndexingModeNV](#VkRayTracingLssIndexingModeNV) values:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef enum VkRayTracingLssIndexingModeNV {
    VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV = 0,
    VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV = 1,
} VkRayTracingLssIndexingModeNV;

* 
[VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV](#VkRayTracingLssIndexingModeNV) specifies that a list of
indices is provided where each consecutive pair of indices define a LSS
primitive.

* 
[VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](#VkRayTracingLssIndexingModeNV) specifies a
successive implicit indexing format, in which each LSS primitive is
defined by two successive positions and radii, (k, k + 1), where
k is a single index provided in the index buffer.
In this indexing scheme, there is a 1:1 mapping between the index buffer
and primitive index within the geometry.

The default behavior with endcaps in a LSS chain is that both endcaps will
be enabled for all beginning and end points.
To change the LSS chain’s endcaps mode use
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`endCapsMode`.
The possible values for `endCapsMode` are:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef enum VkRayTracingLssPrimitiveEndCapsModeNV {
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV = 0,
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV = 1,
} VkRayTracingLssPrimitiveEndCapsModeNV;

* 
[VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV](#VkRayTracingLssPrimitiveEndCapsModeNV) disables all
endcaps and the chain boundaries have no influence.

* 
[VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV](#VkRayTracingLssPrimitiveEndCapsModeNV) specifies
that when [VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](#VkRayTracingLssIndexingModeNV) is used
as indexing mode for the LSS primitive, the first primitive in each
chain will have both endcaps enabled, and every following primitive in
the chain only has endcaps at the trailing position enabled.

In addition to LSS primitives, simple sphere geometry is also supported.
Spheres do not have an endcap mode.
If an index buffer is present, each entry represents a single position and
radius describing one sphere primitive.
If no index buffer is provided, the vertex position and radius values are
sequentially read from the corresponding buffers.

If `VkAccelerationStructureGeometrySpheresDataNV` is included in the
`pNext` chain of a [VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR) structure,
then that structures defines the sphere’s geometry data.

The `VkAccelerationStructureGeometrySpheresDataNV` structure is defined
as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkAccelerationStructureGeometrySpheresDataNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkFormat                         vertexFormat;
    VkDeviceOrHostAddressConstKHR    vertexData;
    VkDeviceSize                     vertexStride;
    VkFormat                         radiusFormat;
    VkDeviceOrHostAddressConstKHR    radiusData;
    VkDeviceSize                     radiusStride;
    VkIndexType                      indexType;
    VkDeviceOrHostAddressConstKHR    indexData;
    VkDeviceSize                     indexStride;
} VkAccelerationStructureGeometrySpheresDataNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](formats.html#VkFormat) of each sphere’s vertex
element.

* 
`vertexData` is a device or host address of memory containing vertex
data in form of pairs of centers of spheres that define all sphere
geometry.

* 
`vertexStride` is the stride in bytes between each vertex element.

* 
`radiusFormat` is the [VkFormat](formats.html#VkFormat) of each sphere’s radius.

* 
`radiusData` is a device or host address of memory containing
sphere’s radius data value.

* 
`radiusStride` is the stride in bytes between each radius value.

* 
`indexType` is the [VkIndexType](drawing.html#VkIndexType) of each index element.

* 
`indexData` is a device or host address of memory containing index
data for vertex and radius buffers for this geometry.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType) it **must** be `NULL`.

* 
`indexStride` is the stride in bytes between each index element.

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-None-10429) VUID-VkAccelerationStructureGeometrySpheresDataNV-None-10429

The [spheres](features.html#features-spheres) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10431) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10431

`vertexStride` **must** be a multiple of:

the [size of the format](formats.html#formats) specified in `vertexFormat` if
that format is a [packed format](formats.html#formats-packed)

* 
the smallest [component size](formats.html#formats) specified in
`vertexFormat` if that format is not a [packed     format](formats.html#formats-packed)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10432) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10432

`vertexStride` and `radiusStride` **must** be less than or equal to
232-1

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-10434) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-10434

The [format features](resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-10435) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-10435

The [format features](resources.html#resources-buffer-view-format-features) of
`radiusFormat` **must** contain
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-10436) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-10436

All values referenced in `radiusData` **must** be greater than or equal
to `0`

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-10437) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-10437

`indexType` **must** be [VK_INDEX_TYPE_UINT16](drawing.html#VkIndexType),
[VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType), [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-sType-sType) VUID-VkAccelerationStructureGeometrySpheresDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_SPHERES_DATA_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexData-parameter

 `vertexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-parameter

 `radiusFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-parameter

 `radiusData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexType-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-parameter

 `indexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](#VkDeviceOrHostAddressConstKHR) union

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](#VkAccelerationStructureGeometryKHR)

An additional command exists for copying acceleration structures without
updating their contents.
The acceleration structure object **can** be compacted in order to improve
performance.
Before copying, an application **must** query the size of the resulting
acceleration structure.

To query acceleration structure size parameters call:

// Provided by VK_KHR_acceleration_structure
void vkCmdWriteAccelerationStructuresPropertiesKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureKHR*           pAccelerationStructures,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`accelerationStructureCount` is the count of acceleration structures
for which to query the property.

* 
`pAccelerationStructures` is a pointer to an array of existing
previously built acceleration structures.

* 
`queryType` is a [VkQueryType](queries.html#VkQueryType) value specifying the type of
queries managed by the pool.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`firstQuery` is the first query index within the query pool that
will contain the `accelerationStructureCount` number of results.

Accesses to any of the acceleration structures listed in
`pAccelerationStructures` **must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits).

* 
If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), then the
value written out is the number of bytes required by a compacted
acceleration structure.

* 
If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType), then
the value written out is the number of bytes required by a serialized
acceleration structure.

Valid Usage

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructure-08924) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructure-08924

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02493) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02493

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02494) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02494

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-buffer-03736) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-buffer-03736

Each element of `pAccelerationStructures` **must** be bound to device
memory

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-query-04880) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-query-04880

The sum of `firstQuery` plus `accelerationStructureCount` **must**
be less than or equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-06742) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-06742

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](queries.html#VkQueryType),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handles

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](queries.html#VkQueryType) value

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](queries.html#VkQueryPool) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-recording) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-cmdpool) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-renderpass) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-suspended) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-videocoding) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commonparent) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commonparent

 Each of `commandBuffer`, `queryPool`, and the elements of `pAccelerationStructures` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdWriteAccelerationStructuresPropertiesKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To query acceleration structure size parameters for the
`[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)` extension call:

// Provided by VK_NV_ray_tracing
void vkCmdWriteAccelerationStructuresPropertiesNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureNV*            pAccelerationStructures,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`accelerationStructureCount` is the count of acceleration structures
for which to query the property.

* 
`pAccelerationStructures` is a pointer to an array of existing
previously built acceleration structures.

* 
`queryType` is a [VkQueryType](queries.html#VkQueryType) value specifying the type of
queries managed by the pool.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`firstQuery` is the first query index within the query pool that
will contain the `accelerationStructureCount` number of results.

Accesses to any of the acceleration structures listed in
`pAccelerationStructures` **must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03755) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03755

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03756) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03756

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructure-03757) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructure-03757

`accelerationStructure` **must** be bound completely and contiguously
to a single `VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](resources.html#vkBindAccelerationStructureMemoryNV)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-04958) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-04958

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-06215) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-06215

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](queries.html#VkQueryType)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-06216) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-06216

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](queries.html#VkQueryType)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handles

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](queries.html#VkQueryType) value

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](queries.html#VkQueryPool) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-recording) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-cmdpool) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-renderpass) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-suspended) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-videocoding) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructureCount-arraylength) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commonparent) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commonparent

 Each of `commandBuffer`, `queryPool`, and the elements of `pAccelerationStructures` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdWriteAccelerationStructuresPropertiesNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To copy an acceleration structure call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyAccelerationStructureKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyAccelerationStructureInfoKHR*   pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyAccelerationStructureInfoKHR](#VkCopyAccelerationStructureInfoKHR)
structure defining the copy operation.

This command copies the `pInfo->src` acceleration structure to the
`pInfo->dst` acceleration structure in the manner specified by
`pInfo->mode`.

Accesses to `pInfo->src` and `pInfo->dst` **must** be
[synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-accelerationStructure-08925) VUID-vkCmdCopyAccelerationStructureKHR-accelerationStructure-08925

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-src-11633) VUID-vkCmdCopyAccelerationStructureKHR-src-11633

The source acceleration structure `pInfo->src` **must** have been
constructed prior to the execution of this command on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-pInfo-parameter) VUID-vkCmdCopyAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureInfoKHR](#VkCopyAccelerationStructureInfoKHR) structure

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-renderpass) VUID-vkCmdCopyAccelerationStructureKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-suspended) VUID-vkCmdCopyAccelerationStructureKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-videocoding) VUID-vkCmdCopyAccelerationStructureKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyAccelerationStructureKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkCopyAccelerationStructureInfoKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source acceleration structure for the copy.

* 
`dst` is the target acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-mode-03410) VUID-VkCopyAccelerationStructureInfoKHR-mode-03410

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#VkCopyAccelerationStructureModeNV) or
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](#VkCopyAccelerationStructureModeNV)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-04963) VUID-VkCopyAccelerationStructureInfoKHR-src-04963

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-03411) VUID-VkCopyAccelerationStructureInfoKHR-src-03411

If `mode` is [VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#VkCopyAccelerationStructureModeNV),
`src` **must** have been constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) in the
build

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-buffer-03718) VUID-VkCopyAccelerationStructureInfoKHR-buffer-03718

The range of `src` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-buffer-03719) VUID-VkCopyAccelerationStructureInfoKHR-buffer-03719

The range of `dst` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-dst-07791) VUID-VkCopyAccelerationStructureInfoKHR-dst-07791

The range of memory backing `dst` that is accessed by this command
**must** not overlap the memory backing `src` that is accessed by this
command

Valid Usage (Implicit)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-sType-sType) VUID-VkCopyAccelerationStructureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-pNext-pNext) VUID-VkCopyAccelerationStructureInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-src-parameter) VUID-VkCopyAccelerationStructureInfoKHR-src-parameter

 `src` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-dst-parameter) VUID-VkCopyAccelerationStructureInfoKHR-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-mode-parameter) VUID-VkCopyAccelerationStructureInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value

* 
[](#VUID-VkCopyAccelerationStructureInfoKHR-commonparent) VUID-VkCopyAccelerationStructureInfoKHR-commonparent

 Both of `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To copy an acceleration structure for the `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`
extension call:

// Provided by VK_NV_ray_tracing
void vkCmdCopyAccelerationStructureNV(
    VkCommandBuffer                             commandBuffer,
    VkAccelerationStructureNV                   dst,
    VkAccelerationStructureNV                   src,
    VkCopyAccelerationStructureModeKHR          mode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dst` is the target acceleration structure for the copy.

* 
`src` is the source acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value
specifying additional operations to perform during the copy.

Accesses to `src` and `dst` **must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-mode-03410) VUID-vkCmdCopyAccelerationStructureNV-mode-03410

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#VkCopyAccelerationStructureModeNV) or
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](#VkCopyAccelerationStructureModeNV)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-04963) VUID-vkCmdCopyAccelerationStructureNV-src-04963

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-03411) VUID-vkCmdCopyAccelerationStructureNV-src-03411

If `mode` is [VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#VkCopyAccelerationStructureModeNV),
`src` **must** have been constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) in the
build

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-buffer-03718) VUID-vkCmdCopyAccelerationStructureNV-buffer-03718

The range of `src` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-buffer-03719) VUID-vkCmdCopyAccelerationStructureNV-buffer-03719

The range of `dst` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-dst-07791) VUID-vkCmdCopyAccelerationStructureNV-dst-07791

The range of memory backing `dst` that is accessed by this command
**must** not overlap the memory backing `src` that is accessed by this
command

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-dst-parameter) VUID-vkCmdCopyAccelerationStructureNV-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-parameter) VUID-vkCmdCopyAccelerationStructureNV-src-parameter

 `src` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-mode-parameter) VUID-vkCmdCopyAccelerationStructureNV-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-renderpass) VUID-vkCmdCopyAccelerationStructureNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-suspended) VUID-vkCmdCopyAccelerationStructureNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-videocoding) VUID-vkCmdCopyAccelerationStructureNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commonparent) VUID-vkCmdCopyAccelerationStructureNV-commonparent

 Each of `commandBuffer`, `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyAccelerationStructureNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Possible values of `mode` specifying additional operations to perform
during the copy, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkCopyAccelerationStructureModeKHR {
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR = 0,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR = 1,
  // Provided by VK_KHR_acceleration_structure
    VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR = 2,
  // Provided by VK_KHR_acceleration_structure
    VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR = 3,
  // Provided by VK_NV_ray_tracing
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR,
  // Provided by VK_NV_ray_tracing
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR,
} VkCopyAccelerationStructureModeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkCopyAccelerationStructureModeKHR
typedef VkCopyAccelerationStructureModeKHR VkCopyAccelerationStructureModeNV;

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](#VkCopyAccelerationStructureModeNV) creates a direct
copy of the acceleration structure specified in `src` into the one
specified by `dst`.
The `dst` acceleration structure **must** have been created with the
same parameters as `src`.
If `src` contains references to other acceleration structures,
`dst` will reference the same acceleration structures.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#VkCopyAccelerationStructureModeNV) creates a more
    compact version of an acceleration structure `src` into `dst`.
    The acceleration structure `dst` **must** have been created with a size
    at least as large as that returned by
[vkCmdWriteAccelerationStructuresPropertiesNV](#vkCmdWriteAccelerationStructuresPropertiesNV)
,
    [vkCmdWriteAccelerationStructuresPropertiesKHR](#vkCmdWriteAccelerationStructuresPropertiesKHR), or
    [vkWriteAccelerationStructuresPropertiesKHR](#vkWriteAccelerationStructuresPropertiesKHR)
    after the build of the acceleration structure specified by `src`.
    If `src` contains references to other acceleration structures,
    `dst` will reference the same acceleration structures.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](#VkCopyAccelerationStructureModeNV) serializes the
acceleration structure to a semi-opaque format which can be reloaded on
a compatible implementation.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](#VkCopyAccelerationStructureModeNV) deserializes
the semi-opaque serialization format in the buffer to the acceleration
structure.

To copy an acceleration structure to device memory call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyAccelerationStructureToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyAccelerationStructureToMemoryInfoKHR* pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a
[VkCopyAccelerationStructureToMemoryInfoKHR](#VkCopyAccelerationStructureToMemoryInfoKHR) structure defining the
copy operation.

Accesses to `pInfo->src` **must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits).
Accesses to the buffer indicated by `pInfo->dst.deviceAddress` **must** be
synchronized with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an access type of
[VK_ACCESS_TRANSFER_WRITE_BIT](synchronization.html#VkAccessFlagBits).

This command produces the same results as
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR), but writes its result to a
device address, and is executed on the device rather than the host.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToAccelerationStructureKHR](#vkCmdCopyMemoryToAccelerationStructureKHR) or
[vkCopyMemoryToAccelerationStructureKHR](#vkCopyMemoryToAccelerationStructureKHR).

The defined header structure for the serialized data consists of:

* 
[VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) bytes of data matching
`VkPhysicalDeviceIDProperties`::`driverUUID`

* 
[VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) bytes of data identifying the compatibility for
comparison using [vkGetDeviceAccelerationStructureCompatibilityKHR](#vkGetDeviceAccelerationStructureCompatibilityKHR)

* 
A 64-bit integer of the total size matching the value queried using
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType)

* 
A 64-bit integer of the deserialized size to be passed in to
`VkAccelerationStructureCreateInfoKHR`::`size`

* 
A 64-bit integer of the count of the number of acceleration structure
handles following.
This value matches the value queried using
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType).
This will be zero for a bottom-level acceleration structure.
For top-level acceleration structures this number is
implementation-dependent; the number of and ordering of the handles may
not match the instance descriptions which were used to build the
acceleration structure.

The corresponding handles matching the values returned by
[vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)
are tightly packed in the buffer following the count.
The application is expected to store a mapping between those handles and the
original application-generated bottom-level acceleration structures to
provide when deserializing.
The serialized data is written to the buffer (or read from the buffer)
according to the host endianness.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-accelerationStructure-08926) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-accelerationStructure-08926

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03739) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03739

`pInfo->dst.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03740) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03740

`pInfo->dst.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-None-03559) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-None-03559

`pInfo->src` **must** be bound to device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-parameter) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureToMemoryInfoKHR](#VkCopyAccelerationStructureToMemoryInfoKHR) structure

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-renderpass) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-suspended) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-videocoding) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyAccelerationStructureToMemoryKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyAccelerationStructureToMemoryInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkDeviceOrHostAddressKHR              dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureToMemoryInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source acceleration structure for the copy.

* 
`dst` is the device or host address of memory which is the target
for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-04959) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-04959

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-dst-03561) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-dst-03561

The memory pointed to by `dst` **must** be at least as large as the
serialization size of `src`, as reported by
[vkWriteAccelerationStructuresPropertiesKHR](#vkWriteAccelerationStructuresPropertiesKHR) or
[vkCmdWriteAccelerationStructuresPropertiesKHR](#vkCmdWriteAccelerationStructuresPropertiesKHR) with a query type of
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-03412) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-03412

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](#VkCopyAccelerationStructureModeNV)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-sType-sType) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_TO_MEMORY_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-pNext-pNext) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-parameter) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-parameter

 `src` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-parameter) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value

To copy device memory to an acceleration structure call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyMemoryToAccelerationStructureKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToAccelerationStructureInfoKHR* pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a
[VkCopyMemoryToAccelerationStructureInfoKHR](#VkCopyMemoryToAccelerationStructureInfoKHR) structure defining the
copy operation.

Accesses to `pInfo->dst` **must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits).
Accesses to the buffer indicated by `pInfo->src.deviceAddress` **must** be
synchronized with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages), and an access type of
[VK_ACCESS_TRANSFER_READ_BIT](synchronization.html#VkAccessFlagBits).

This command can accept acceleration structures produced by either
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR) or
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR).

The structure provided as input to deserialize is as described in
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR), with any acceleration
structure handles filled in with the newly-queried handles to bottom level
acceleration structures created before deserialization.
These do not need to be built at deserialize time, but **must** be created.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-accelerationStructure-08927) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-accelerationStructure-08927

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03742) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03742

`pInfo->src.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03743) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03743

`pInfo->src.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-buffer-03745) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-buffer-03745

`pInfo->dst` **must** be bound to device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-parameter) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-parameter) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToAccelerationStructureInfoKHR](#VkCopyMemoryToAccelerationStructureInfoKHR) structure

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-recording) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-renderpass) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-suspended) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-videocoding) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyMemoryToAccelerationStructureKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkCopyMemoryToAccelerationStructureInfoKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyMemoryToAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceOrHostAddressConstKHR         src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyMemoryToAccelerationStructureInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the device or host address of memory containing the source
data for the copy.

* 
`dst` is the target acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-src-04960) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-src-04960

The source memory pointed to by `src` **must** contain data previously
serialized using [vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR),
potentially modified to relocate acceleration structure references as
described in that command

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-03413) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-03413

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](#VkCopyAccelerationStructureModeNV)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pInfo-03414) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pInfo-03414

The data in `src` **must** have a format compatible with the
destination physical device as returned by
[vkGetDeviceAccelerationStructureCompatibilityKHR](#vkGetDeviceAccelerationStructureCompatibilityKHR)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-03746) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-03746

`dst` **must** have been created with a `size` greater than or
equal to that used to serialize the data in `src`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-sType-sType) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_TO_ACCELERATION_STRUCTURE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pNext-pNext) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-parameter) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-parameter) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](#VkCopyAccelerationStructureModeKHR) value

To check if a serialized acceleration structure is compatible with the
current device call:

// Provided by VK_KHR_acceleration_structure
void vkGetDeviceAccelerationStructureCompatibilityKHR(
    VkDevice                                    device,
    const VkAccelerationStructureVersionInfoKHR* pVersionInfo,
    VkAccelerationStructureCompatibilityKHR*    pCompatibility);

* 
`device` is the device to check the version against.

* 
`pVersionInfo` is a pointer to a
[VkAccelerationStructureVersionInfoKHR](#VkAccelerationStructureVersionInfoKHR) structure specifying version
information to check against the device.

* 
`pCompatibility` is a pointer to a
[VkAccelerationStructureCompatibilityKHR](#VkAccelerationStructureCompatibilityKHR) value in which
compatibility information is returned.

Valid Usage

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-accelerationStructure-08928) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-accelerationStructure-08928

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-device-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pVersionInfo-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pVersionInfo-parameter

 `pVersionInfo` **must** be a valid pointer to a valid [VkAccelerationStructureVersionInfoKHR](#VkAccelerationStructureVersionInfoKHR) structure

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pCompatibility-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pCompatibility-parameter

 `pCompatibility` **must** be a valid pointer to a [VkAccelerationStructureCompatibilityKHR](#VkAccelerationStructureCompatibilityKHR) value

The `VkAccelerationStructureVersionInfoKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureVersionInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    const uint8_t*     pVersionData;
} VkAccelerationStructureVersionInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVersionData` is a pointer to the version header of an acceleration
structure as defined in [vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR)

|  | `pVersionData` is a *pointer* to an array of 2×[VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE)
| --- | --- |
`uint8_t` values instead of two [VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) arrays as the expected
use case for this member is to be pointed at the header of a previously
serialized acceleration structure (via
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR) or
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR)) that is loaded in memory.
Using arrays would necessitate extra memory copies of the UUIDs. |

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-sType-sType) VUID-VkAccelerationStructureVersionInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-pNext-pNext) VUID-VkAccelerationStructureVersionInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-pVersionData-parameter) VUID-VkAccelerationStructureVersionInfoKHR-pVersionData-parameter

 `pVersionData` **must** be a valid pointer to an array of    `uint8_t` values

Possible values of `pCompatibility` returned by
[vkGetDeviceAccelerationStructureCompatibilityKHR](#vkGetDeviceAccelerationStructureCompatibilityKHR) are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureCompatibilityKHR {
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_COMPATIBLE_KHR = 0,
    VK_ACCELERATION_STRUCTURE_COMPATIBILITY_INCOMPATIBLE_KHR = 1,
} VkAccelerationStructureCompatibilityKHR;

* 
[VK_ACCELERATION_STRUCTURE_COMPATIBILITY_COMPATIBLE_KHR](#VkAccelerationStructureCompatibilityKHR) if the
`pVersionData` version acceleration structure is compatible with
`device`.

* 
[VK_ACCELERATION_STRUCTURE_COMPATIBILITY_INCOMPATIBLE_KHR](#VkAccelerationStructureCompatibilityKHR) if the
`pVersionData` version acceleration structure is not compatible with
`device`.

Acceleration structure build times in ray tracing applications with
extensive geometry **can** be reduced by introducing alternative acceleration
structure types that facilitate bottom-level acceleration structure
construction using pre-generated primitive clusters, improving geometry
reuse.
This **can** be achieved by incorporating additional acceleration structure
types:

[Cluster Level Acceleration    Structure](#acceleration-structure-clas-geometry)

[Cluster Template Acceleration    Structure](#acceleration-structure-clas-template)

[Cluster Level Bottom Level    Acceleration Structure](#acceleration-structure-bottom-level-clas)

Cluster Level Acceleration Structure (CLAS) is an intermediate acceleration
structure constructed from triangles, which serves as a building block for
[Cluster Level Bottom Level Acceleration Structure](#acceleration-structure-bottom-level-clas).
A CLAS shares similarities with a traditional
[bottom level acceleration structure](#acceleration-structure-bottom-level)
but has several key distinctions.
A CLAS **can** only contain a limited number of [triangles and vertices](#cluster-geometry-limits).
CLAS objects cannot be directly referenced in a top level acceleration
structure, instead, they **must** be part of a
[Cluster Level Bottom Level Acceleration Structure](#acceleration-structure-bottom-level-clas).
The [geometry indices](#cluster-geometry-index-flags) within a CLAS are
local to it, potentially non-consecutive, and customizable per primitive.
Each CLAS **can** also have a user-defined 32-bit
[ClusterID](interfaces.html#interfaces-builtin-variables-clusteridnv), which is accessible
in the hit shaders.
The vertex positions within a CLAS **can** be quantized by
[zeroing](#cluster-vertex-position-truncate) specific floating-point
mantissa bits to optimize storage.

Cluster Template Acceleration Structure is a partially constructed
[CLAS](#acceleration-structure-clas-geometry) designed for efficient
instantiation into multiple [CLAS](#acceleration-structure-clas-geometry)
objects.
During a cluster template build, some pre-computation is performed
independent of vertex positions, allowing reuse across multiple CLAS objects
with different vertex data.
A cluster template itself does not require vertex positions but it retains
non-positional properties similar to a CLAS, which are then inherited during
instantiation.
A cluster template **must** be instantiated into a CLAS object to be usable.

Cluster Level Bottom Level Acceleration Structure is a new alternative to
the existing [bottom level acceleration structures](#acceleration-structure-bottom-level), which is constructed using references to already
built [CLAS](#acceleration-structure-clas-geometry) objects and is the only
cluster acceleration structure that **can** be referenced in a top level
acceleration structure.

These cluster acceleration structures **can** be built or moved by a single
versatile multi-indirect function
[vkCmdBuildClusterAccelerationStructureIndirectNV](#vkCmdBuildClusterAccelerationStructureIndirectNV).
To determine the memory requirements for executing this function, call:

// Provided by VK_NV_cluster_acceleration_structure
void vkGetClusterAccelerationStructureBuildSizesNV(
    VkDevice                                    device,
    const VkClusterAccelerationStructureInputInfoNV* pInfo,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that owns the acceleration structure.

* 
`pInfo` is a pointer to a
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV) structure containing
parameters required for the memory requirements query.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure which returns
the size required for an acceleration structure and scratch buffer,
given the build parameters.
The size requirements for a scratch buffer **may** be zero.

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
acceleration structure and scratch memory sizes are returned for all
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`maxAccelerationStructureCount`
acceleration structures.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
scratch memory size for all
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`maxAccelerationStructureCount`
acceleration structures and the acceleration structure memory size for a
single acceleration structure is returned.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV), only
scratch memory size is returned for the requested acceleration structures.

Valid Usage

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-clusterAccelerationStructure-10438) VUID-vkGetClusterAccelerationStructureBuildSizesNV-clusterAccelerationStructure-10438

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-device-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-pInfo-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV) structure

* 
[](#VUID-vkGetClusterAccelerationStructureBuildSizesNV-pSizeInfo-parameter) VUID-vkGetClusterAccelerationStructureBuildSizesNV-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure

The [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV) structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureInputInfoNV {
    VkStructureType                            sType;
    void*                                      pNext;
    uint32_t                                   maxAccelerationStructureCount;
    VkBuildAccelerationStructureFlagsKHR       flags;
    VkClusterAccelerationStructureOpTypeNV     opType;
    VkClusterAccelerationStructureOpModeNV     opMode;
    VkClusterAccelerationStructureOpInputNV    opInput;
} VkClusterAccelerationStructureInputInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxAccelerationStructureCount` is the maximum number of
acceleration structures that will be provided to the multi indirect
operation.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagsKHR](resources.html#VkBuildAccelerationStructureFlagsKHR)
specifying flags for the multi indirect operation.

* 
`opType` is a [VkClusterAccelerationStructureOpTypeNV](#VkClusterAccelerationStructureOpTypeNV) value
specifying the type of operation to perform.

* 
`opMode` is a [VkClusterAccelerationStructureOpModeNV](#VkClusterAccelerationStructureOpModeNV) value
specifying the mode of operation.

* 
`opInput` is a [VkClusterAccelerationStructureOpInputNV](#VkClusterAccelerationStructureOpInputNV) value
specifying the descriptions of the operation.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-sType-sType) VUID-VkClusterAccelerationStructureInputInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_INPUT_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pNext-pNext) VUID-VkClusterAccelerationStructureInputInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-flags-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](resources.html#VkBuildAccelerationStructureFlagBitsKHR) values

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-opType-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-opType-parameter

 `opType` **must** be a valid [VkClusterAccelerationStructureOpTypeNV](#VkClusterAccelerationStructureOpTypeNV) value

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-opMode-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-opMode-parameter

 `opMode` **must** be a valid [VkClusterAccelerationStructureOpModeNV](#VkClusterAccelerationStructureOpModeNV) value

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pClustersBottomLevel-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pClustersBottomLevel-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureOpTypeNV), the `pClustersBottomLevel` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureClustersBottomLevelInputNV](#VkClusterAccelerationStructureClustersBottomLevelInputNV) structure

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pTriangleClusters-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pTriangleClusters-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV), [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureOpTypeNV), [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV), or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](#VkClusterAccelerationStructureOpTypeNV), the `pTriangleClusters` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV) structure

* 
[](#VUID-VkClusterAccelerationStructureInputInfoNV-pMoveObjects-parameter) VUID-VkClusterAccelerationStructureInputInfoNV-pMoveObjects-parameter

 If `opType` is [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV), the `pMoveObjects` member of `opInput` **must** be a valid pointer to a [VkClusterAccelerationStructureMoveObjectsInputNV](#VkClusterAccelerationStructureMoveObjectsInputNV) structure

Values which **can** be set in [VkClusterAccelerationStructureOpTypeNV](#VkClusterAccelerationStructureOpTypeNV)
are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureOpTypeNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV = 1,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV = 2,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV = 3,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV = 4,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV = 5,
} VkClusterAccelerationStructureOpTypeNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that a cluster acceleration structure, cluster acceleration
structure template or a bottom level acceleration structure built from
cluster acceleration structures will be moved.
If a cluster acceleration structure is moved, the bottom level cluster
acceleration structures containing it will have to be re-built.
If used with
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV), it
returns the size of existing cluster acceleration structures.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that bottom level cluster acceleration structures will be
built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that cluster acceleration structures will be built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that a template for cluster acceleration structure will be
built.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that a template for a cluster acceleration structure will be
instantiated, resulting in a built cluster acceleration structure.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](#VkClusterAccelerationStructureOpTypeNV)
specifies that the vertex indices of the cluster template acceleration
structure will be fetched.

Values which **can** be set in [VkClusterAccelerationStructureOpModeNV](#VkClusterAccelerationStructureOpModeNV)
are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureOpModeNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV = 1,
    VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV = 2,
} VkClusterAccelerationStructureOpModeNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
specifies that the build or move operation will implicitly distribute
built or compacted cluster acceleration structures starting at the
address provided in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`.
If a move operation is being performed, the acceleration structures will
be tightly compacted.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
specifies that the build or move operation will explicitly write built
or compacted cluster acceleration structures in the array of addresses
provided in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV)
specifies that computed cluster acceleration structure sizes will be
written to
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstSizesArray`.

The `VkClusterAccelerationStructureOpInputNV` union is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef union VkClusterAccelerationStructureOpInputNV {
    VkClusterAccelerationStructureClustersBottomLevelInputNV*    pClustersBottomLevel;
    VkClusterAccelerationStructureTriangleClusterInputNV*        pTriangleClusters;
    VkClusterAccelerationStructureMoveObjectsInputNV*            pMoveObjects;
} VkClusterAccelerationStructureOpInputNV;

* 
`pClustersBottomLevel` is a
[VkClusterAccelerationStructureClustersBottomLevelInputNV](#VkClusterAccelerationStructureClustersBottomLevelInputNV) structure
specifying an upper threshold on parameters to build multiple bottom
level acceleration structures from multiple cluster level acceleration
structures.

* 
`pTriangleClusters` is a
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV) structure
specifying an upper threshold on parameters to build a regular or
templated cluster acceleration structure.

* 
`pMoveObjects` is a
[VkClusterAccelerationStructureMoveObjectsInputNV](#VkClusterAccelerationStructureMoveObjectsInputNV) structure
specifying an upper threshold on the number of bytes moved and the type
of acceleration structure being moved.

The [VkClusterAccelerationStructureClustersBottomLevelInputNV](#VkClusterAccelerationStructureClustersBottomLevelInputNV) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureClustersBottomLevelInputNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTotalClusterCount;
    uint32_t           maxClusterCountPerAccelerationStructure;
} VkClusterAccelerationStructureClustersBottomLevelInputNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxTotalClusterCount` is the total number of clusters acceleration
structures that will be built or moved across all input arguments.

* 
`maxClusterCountPerAccelerationStructure` is the maximum number of
clusters acceleration structures that will be built or moved per input
argument.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-sType-sType) VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_CLUSTERS_BOTTOM_LEVEL_INPUT_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureClustersBottomLevelInputNV-pNext-pNext

 `pNext` **must** be `NULL`

The [VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureTriangleClusterInputNV {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           vertexFormat;
    uint32_t           maxGeometryIndexValue;
    uint32_t           maxClusterUniqueGeometryCount;
    uint32_t           maxClusterTriangleCount;
    uint32_t           maxClusterVertexCount;
    uint32_t           maxTotalTriangleCount;
    uint32_t           maxTotalVertexCount;
    uint32_t           minPositionTruncateBitCount;
} VkClusterAccelerationStructureTriangleClusterInputNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](formats.html#VkFormat) of each vertex element.

* 
`maxGeometryIndexValue` is the maximum geometry index value for any
constructed geometry.

* 
`maxClusterUniqueGeometryCount` is the maximum number of unique
values of the geometry index for each cluster or cluster template.

* 
 `maxClusterTriangleCount` is the maximum
number of triangles in a cluster or cluster template.

* 
`maxClusterVertexCount` is the maximum number of unique vertices in
the cluster’s index buffer.

* 
`maxTotalTriangleCount` is the sum of all triangles across all
clusters or cluster templates.

* 
`maxTotalVertexCount` is the maximum number of vertices across all
clusters or cluster templates.

* 
 `minPositionTruncateBitCount`
is the least value specified in cluster build in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)::`positionTruncateBitCount`
or cluster template build in
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)::`positionTruncateBitCount`.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-10439) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-10439

The [format features](resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterTriangleCount-10440) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterTriangleCount-10440

`maxClusterTriangleCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxTrianglesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterVertexCount-10441) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-maxClusterVertexCount-10441

`maxClusterVertexCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxVerticesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-minPositionTruncateBitCount-10442) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-minPositionTruncateBitCount-10442

`minPositionTruncateBitCount` **must** be less than or equal to `32`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-sType-sType) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_TRIANGLE_CLUSTER_INPUT_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-parameter) VUID-VkClusterAccelerationStructureTriangleClusterInputNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

The [VkClusterAccelerationStructureMoveObjectsInputNV](#VkClusterAccelerationStructureMoveObjectsInputNV) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureMoveObjectsInputNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkClusterAccelerationStructureTypeNV    type;
    VkBool32                                noMoveOverlap;
    VkDeviceSize                            maxMovedBytes;
} VkClusterAccelerationStructureMoveObjectsInputNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkClusterAccelerationStructureTypeNV](#VkClusterAccelerationStructureTypeNV) value
identifying the type of cluster acceleration structure.

* 
`noMoveOverlap` specifies if the source and destination cluster
acceleration structures overlap in memory for the move operation.
If set to [VK_TRUE](fundamentals.html#VK_TRUE), the source cluster acceleration structure
remains valid after the move and move operation acts like a copy.

* 
`maxMovedBytes` is the maximum number of bytes that **may** be moved in
this operation.

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-sType-sType) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_MOVE_OBJECTS_INPUT_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-pNext-pNext) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInputNV-type-parameter) VUID-VkClusterAccelerationStructureMoveObjectsInputNV-type-parameter

 `type` **must** be a valid [VkClusterAccelerationStructureTypeNV](#VkClusterAccelerationStructureTypeNV) value

Values which **can** be set in [VkClusterAccelerationStructureTypeNV](#VkClusterAccelerationStructureTypeNV) are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureTypeNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_CLUSTERS_BOTTOM_LEVEL_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_TRIANGLE_CLUSTER_NV = 1,
    VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_TRIANGLE_CLUSTER_TEMPLATE_NV = 2,
} VkClusterAccelerationStructureTypeNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureTypeNV)
specifies a bottom level cluster acceleration structure.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureTypeNV)
specifies a cluster acceleration structure.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_TYPE_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureTypeNV)
specifies a template cluster acceleration structure.

To build or move a cluster acceleration structure or a cluster acceleration
structure template call:

// Provided by VK_NV_cluster_acceleration_structure
void vkCmdBuildClusterAccelerationStructureIndirectNV(
    VkCommandBuffer                             commandBuffer,
    const VkClusterAccelerationStructureCommandsInfoNV* pCommandInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pCommandInfos` is a pointer to a
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV) structure containing
parameters required for building or moving the cluster acceleration
structure.

Similar to [vkCmdBuildAccelerationStructuresKHR](#vkCmdBuildAccelerationStructuresKHR), this command **may**
initiate multiple acceleration structures builds and there is no ordering or
synchronization implied between any of the individual acceleration structure
builds.
Accesses to the acceleration structure scratch memory as identified by the
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData` **must**
be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits)).

Accesses to each
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
and [VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstSizesArray`
**must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits).

Accesses to memory with input data as identified by any used values of
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosArray` and
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosCount`
**must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-clusterAccelerationStructure-10443) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-clusterAccelerationStructure-10443

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pNext-10444) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pNext-10444

The `pNext` chain of the bound ray tracing pipeline **must** include a
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](pipelines.html#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)
structure

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10445) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10445

`pCommandInfos->input.maxAccelerationStructureCount` **must** be less
than or equal to the value used in
`pInfo->maxAccelerationStructureCount` in
[vkGetClusterAccelerationStructureBuildSizesNV](#vkGetClusterAccelerationStructureBuildSizesNV) to determine the
memory requirements for the build operation

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12300) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12300

The scratch memory of the cluster acceleration structure specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be larger than or equal to the scratch size queried with
[vkGetClusterAccelerationStructureBuildSizesNV](#vkGetClusterAccelerationStructureBuildSizesNV)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12301) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12301

The scratch address of the cluster acceleration structure specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned based on the cluster acceleration structure type and
its alignment properties as queried with
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10448) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10448

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureMoveObjectsInfoNV](#VkClusterAccelerationStructureMoveObjectsInfoNV) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10449) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10449

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](#VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10450) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10450

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10451) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10451

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10452) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10452

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureInstantiateClusterInfoNV](#VkClusterAccelerationStructureInstantiateClusterInfoNV) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10832) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10832

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](#VkClusterAccelerationStructureOpTypeNV),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureGetTemplateIndicesInfoNV](#VkClusterAccelerationStructureGetTemplateIndicesInfoNV) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10453) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10453

The value in `pCommandInfos->srcInfosCount` **must** be less than or
equal to `pCommandInfos->input.maxAccelerationStructureCount`

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10454) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10454

The number of inputs specified in `pCommandInfos->srcInfosArray`
**must** be greater than or equal to `pCommandInfos->srcInfosCount`

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstAddressesArray-12302) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstAddressesArray-12302

The memory regions specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** not overlap with each other or with
`pCommandInfos->scratchData`, or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstImplicitData-12303) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstImplicitData-12303

The memory region specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
for multiple acceleration structure builds **must** not overlap with
`pCommandInfos->scratchData`, or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12304) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12304

`pCommandInfos->scratchData`, or the address indirectly referenced
in [VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a device address allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12305) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12305

`pCommandInfos->srcInfosArray`, or the address indirectly referenced
in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a device address range allocated to the application from a
buffer created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12306) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12306

`pCommandInfos->srcInfosCount`, or the address indirectly referenced
in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosCount`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12381) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12381

`pCommandInfos->dstAddressesArray`, or the address indirectly
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a device address range allocated to the application from a
buffer created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12382) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12382

All destination addresses contained in
`pCommandInfos->dstAddressesArray`, or in the memory indirectly
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be device address ranges allocated to the application from buffers
created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag
set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12308) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12308

`pCommandInfos->dstImplicitData`, or the address indirectly
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag
set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-parameter) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-parameter) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-parameter

 `pCommandInfos` **must** be a valid pointer to a valid [VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV) structure

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-recording) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-cmdpool) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-renderpass) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-suspended) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-videocoding) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildClusterAccelerationStructureIndirectNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The [VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV) structure is defined
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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`input` is [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV) structure
describing the build or move parameters for the cluster acceleration
structure.

* 
`dstImplicitData` is the device address for memory where the
implicit build of cluster acceleration structure will be saved.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV),
this value is ignored.

* 
`scratchData` is the device address of scratch memory that will be
used during cluster acceleration structure move or build.

* 
`dstAddressesArray` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) that
specifies addresses and stride for moved or built cluster acceleration
structures, depending on the value of
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode`.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
and [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)::`deviceAddress` is not
`0`, then the implementation writes the cluster addresses to the
specified region.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
the implementation reads the cluster addresses from the specified
region.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV), this
member is ignored.

* 
`dstSizesArray` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)
containing sizes of moved or built cluster acceleration structures.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
or [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV),
then the sizes are saved.
If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
then the sizes are read from.

* 
`srcInfosArray` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) where
input data for the build or move operation is read from.
If the stride is `0`, the structures are assumed to be packed tightly.
Its format is dependent on
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opType` as per the
table below.

| `input.opType` | Format of `srcInfosArray` |
| --- | --- |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureMoveObjectsInfoNV](#VkClusterAccelerationStructureMoveObjectsInfoNV) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](#VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureInstantiateClusterInfoNV](#VkClusterAccelerationStructureInstantiateClusterInfoNV) |
| [VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](#VkClusterAccelerationStructureOpTypeNV) | [VkClusterAccelerationStructureGetTemplateIndicesInfoNV](#VkClusterAccelerationStructureGetTemplateIndicesInfoNV) |

* 
`srcInfosCount` is the device address of memory containing the count
of number of build or move operations to perform.
The actual value is the minimum of this value and the value specified in
`input.maxAccelerationStructureCount`.
If this value is `0`, the count is determined by
`input.maxAccelerationStructureCount` alone.

* 
`addressResolutionFlags` is a bitmask of
[VkClusterAccelerationStructureAddressResolutionFlagBitsNV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV) values
specifying how an implementation will interpret the device addresses in
this structure.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12309) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12309

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12310) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12310

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
and `input.opType` is not
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV), the
memory in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
**must** be equal to or larger than the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR)::`accelerationStructureSize`
value returned from [vkGetClusterAccelerationStructureBuildSizesNV](#vkGetClusterAccelerationStructureBuildSizesNV)
with same input parameters

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12311) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12311

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_IMPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV)
and `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV), the
memory in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be equal to or larger than the sum of all the built acceleration
structures that are being moved

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-10469) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-10469

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](#VkClusterAccelerationStructureOpTypeNV), the
total memory moved **must** not be larger than the size provided in
[VkClusterAccelerationStructureMoveObjectsInputNV](#VkClusterAccelerationStructureMoveObjectsInputNV)::`maxMovedBytes`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12312) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12312

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_COMPUTE_SIZES_NV](#VkClusterAccelerationStructureOpModeNV),
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstSizesArray`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstSizesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12313) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12313

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
the address in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12314) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12314

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
the addresses in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be large enough to accommodate built or moved clusters

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12315) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12315

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
the buffers in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the buffers indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** not overlap

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12316) VUID-VkClusterAccelerationStructureCommandsInfoNV-opMode-12316

If [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_MODE_EXPLICIT_DESTINATIONS_NV](#VkClusterAccelerationStructureOpModeNV),
the addresses in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned based on the cluster acceleration structure type and
its alignment properties as described in
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)

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
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`clusterByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12318) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12318

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](#VkClusterAccelerationStructureOpTypeNV),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`clusterTemplateByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12319) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12319

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](#VkClusterAccelerationStructureOpTypeNV),
then depending on the
[VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`opMode`,
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
or addresses specified in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`,
or the addresses indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`clusterByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-12320) VUID-VkClusterAccelerationStructureCommandsInfoNV-scratchData-12320

[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`clusterScratchByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-buildScratchSize-12321) VUID-VkClusterAccelerationStructureCommandsInfoNV-buildScratchSize-12321

If the `buildScratchSize` member of the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetClusterAccelerationStructureBuildSizesNV](#vkGetClusterAccelerationStructureBuildSizesNV) is not `0`,
then
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-12322) VUID-VkClusterAccelerationStructureCommandsInfoNV-srcInfosCount-12322

[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosCount`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosCount`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be 4-byte aligned

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12323) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-12323

If `input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](#VkClusterAccelerationStructureOpTypeNV),
the total and per argument number of cluster acceleration structures
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosArray`,
or the structures indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV),
**must** be equal or less than the maximum values with which memory
requirements were queried in
[vkGetClusterAccelerationStructureBuildSizesNV](#vkGetClusterAccelerationStructureBuildSizesNV) with
[VkClusterAccelerationStructureOpInputNV](#VkClusterAccelerationStructureOpInputNV)::`pClustersBottomLevel`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-sType-sType) VUID-VkClusterAccelerationStructureCommandsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_COMMANDS_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-pNext-pNext) VUID-VkClusterAccelerationStructureCommandsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkClusterAccelerationStructureCommandsInfoNV-input-parameter) VUID-VkClusterAccelerationStructureCommandsInfoNV-input-parameter

 `input` **must** be a valid [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV) structure

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

 `addressResolutionFlags` **must** be a valid combination of [VkClusterAccelerationStructureAddressResolutionFlagBitsNV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV) values

Bits which **can** be set in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`addressResolutionFlags`,
specifying how the device address in
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV) are interpreted, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureAddressResolutionFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_NONE_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV = 0x00000004,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV = 0x00000008,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV = 0x00000010,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV = 0x00000020,
} VkClusterAccelerationStructureAddressResolutionFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_NONE_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies that no address resolution flags are provided.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstImplicitData`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`scratchData`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstAddressesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`dstSizesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](#VkClusterAccelerationStructureCommandsInfoNV)::`srcInfosCount`.

// Provided by VK_NV_cluster_acceleration_structure
typedef VkFlags VkClusterAccelerationStructureAddressResolutionFlagsNV;

`VkClusterAccelerationStructureAddressResolutionFlagsNV` is a bitmask
type for setting a mask of zero or more
[VkClusterAccelerationStructureAddressResolutionFlagBitsNV](#VkClusterAccelerationStructureAddressResolutionFlagBitsNV).

The [VkClusterAccelerationStructureMoveObjectsInfoNV](#VkClusterAccelerationStructureMoveObjectsInfoNV) structure is
defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureMoveObjectsInfoNV {
    VkDeviceAddress    srcAccelerationStructure;
} VkClusterAccelerationStructureMoveObjectsInfoNV;

* 
`srcAccelerationStructure` is the device address of the source
cluster acceleration structure that will be moved.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-10483) VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-10483

`srcAccelerationStructure` **must** be a type of [    cluster acceleration structure](#cluster-geometry)

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-parameter) VUID-VkClusterAccelerationStructureMoveObjectsInfoNV-srcAccelerationStructure-parameter

 `srcAccelerationStructure` **must** be a valid `VkDeviceAddress` value

The [VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](#VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV {
    uint32_t           clusterReferencesCount;
    uint32_t           clusterReferencesStride;
    VkDeviceAddress    clusterReferences;
} VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV;

* 
`clusterReferencesCount` is the number of clusters this bottom level
acceleration structure will be built from.

* 
`clusterReferencesStride` is the stride in `clusterReferences`.

* 
`clusterReferences` is the device memory containing the address of
the clusters.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10484) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10484

All cluster references in `clusterReferences` **must** be unique

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10485) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-10485

`clusterReferences` **must** have at least `clusterReferencesCount`
values

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferencesStride-10486) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferencesStride-10486

`clusterReferencesStride` **must** be greater than or equal to 8

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-parameter) VUID-VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV-clusterReferences-parameter

 `clusterReferences` **must** be a valid `VkDeviceAddress` value

Bits which **can** be set in
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)::`geometryFlags`,
specifying geometry flags for cluster acceleration structure, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureGeometryFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_CULL_DISABLE_BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_NO_DUPLICATE_ANYHIT_INVOCATION_BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_OPAQUE_BIT_NV = 0x00000004,
} VkClusterAccelerationStructureGeometryFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_CULL_DISABLE_BIT_NV](#VkClusterAccelerationStructureGeometryFlagBitsNV)
disables face culling for this geometry.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_NO_DUPLICATE_ANYHIT_INVOCATION_BIT_NV](#VkClusterAccelerationStructureGeometryFlagBitsNV)
specifies that the implementation **must** only call the any-hit shader a
single time for each primitive in this geometry.
If this bit is absent an implementation **may** invoke the any-hit shader
more than once for this geometry.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_GEOMETRY_OPAQUE_BIT_NV](#VkClusterAccelerationStructureGeometryFlagBitsNV) specifies
that this geometry does not invoke the any-hit shaders even if present
in a hit group.

// Provided by VK_NV_cluster_acceleration_structure
typedef VkFlags VkClusterAccelerationStructureGeometryFlagsNV;

`VkClusterAccelerationStructureGeometryFlagsNV` is a bitmask type for
setting a mask of zero or more
[VkClusterAccelerationStructureGeometryFlagBitsNV](#VkClusterAccelerationStructureGeometryFlagBitsNV).

The [VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV {
    uint32_t    geometryIndex:24;
    uint32_t    reserved:5;
    uint32_t    geometryFlags:3;
} VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV;

* 
`geometryIndex` specifies the geometry index for all triangles in
the cluster acceleration structure.

* 
`reserved` is reserved for future use.

* 
`geometryFlags` is a bitmask of
[VkClusterAccelerationStructureGeometryFlagBitsNV](#VkClusterAccelerationStructureGeometryFlagBitsNV) values describing
geometry flags for the cluster acceleration structure.

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is the following:

* 
`geometryIndex`, `reserved` and `mask` occupy the same
memory as if a single `uint32_t` was specified in their place

`geometryIndex` occupies the 24 least significant bits of that
memory

* 
`geometryFlags` occupies the 3 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV-reserved-10487) VUID-VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV-reserved-10487

`reserved` **must** be `0`

Bits which **can** be set in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)::`clusterFlags`,
specifying flags for clusters in an acceleration structure, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureClusterFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_CLUSTER_ALLOW_DISABLE_OPACITY_MICROMAPS_NV = 0x00000001,
} VkClusterAccelerationStructureClusterFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_CLUSTER_ALLOW_DISABLE_OPACITY_MICROMAPS_NV](#VkClusterAccelerationStructureClusterFlagBitsNV)
specifies that the specified cluster acceleration structure **may** be
referenced in an instance with
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](#VkGeometryInstanceFlagBitsNV) set.

// Provided by VK_NV_cluster_acceleration_structure
typedef VkFlags VkClusterAccelerationStructureClusterFlagsNV;

`VkClusterAccelerationStructureClusterFlagsNV` is a bitmask type for
setting a mask of zero or more
[VkClusterAccelerationStructureClusterFlagBitsNV](#VkClusterAccelerationStructureClusterFlagBitsNV).

The [VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureBuildTriangleClusterInfoNV {
    uint32_t                                                         clusterID;
    VkClusterAccelerationStructureClusterFlagsNV                     clusterFlags;
    uint32_t                                                         triangleCount:9;
    uint32_t                                                         vertexCount:9;
    uint32_t                                                         positionTruncateBitCount:6;
    uint32_t                                                         indexType:4;
    uint32_t                                                         opacityMicromapIndexType:4;
    VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV    baseGeometryIndexAndGeometryFlags;
    uint16_t                                                         indexBufferStride;
    uint16_t                                                         vertexBufferStride;
    uint16_t                                                         geometryIndexAndFlagsBufferStride;
    uint16_t                                                         opacityMicromapIndexBufferStride;
    VkDeviceAddress                                                  indexBuffer;
    VkDeviceAddress                                                  vertexBuffer;
    VkDeviceAddress                                                  geometryIndexAndFlagsBuffer;
    VkDeviceAddress                                                  opacityMicromapArray;
    VkDeviceAddress                                                  opacityMicromapIndexBuffer;
} VkClusterAccelerationStructureBuildTriangleClusterInfoNV;

* 
`clusterID` is a user specified identifier assigned to this cluster.

* 
`clusterFlags` is a bitmask of
[VkClusterAccelerationStructureClusterFlagBitsNV](#VkClusterAccelerationStructureClusterFlagBitsNV) values describing
flags how the cluster should be built.

* 
`triangleCount` is the number of triangles in this cluster.

* 
`vertexCount` is the number of unique vertices in this cluster.

* 
`positionTruncateBitCount` is the number of bits starting at the
lowest bit (i.e. the LSBs of the mantissa), of each vertex position that
will be truncated to zero to improve floating-point compression.

* 
`indexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) value
specifying the index type in `indexBuffer`.

* 
`opacityMicromapIndexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) value
specifying the index type in `opacityMicromapIndexBuffer`.

* 
`baseGeometryIndexAndGeometryFlags` is a
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)
value specifying the base geometry index and flags for all triangles in
the cluster.

* 
`indexBufferStride` is the stride in bytes in `indexBuffer` with
`0` meaning the values are tightly-packed.

* 
`vertexBufferStride` is the stride in bytes in `vertexBuffer`
with `0` meaning the values are tightly-packed.

* 
`geometryIndexAndFlagsBufferStride` is the stride in bytes in
`geometryIndexAndFlagsBuffer` with `0` meaning the values are
tightly-packed.

* 
`opacityMicromapIndexBufferStride` is the stride in bytes in
`opacityMicromapIndexBuffer` with `0` meaning the values are
tightly-packed.

* 
`indexBuffer` is a device address containing the indices of the
vertices in the cluster and are of type `indexType`.

* 
`vertexBuffer` is a device address containing the vertex data of the
triangles in the cluster with format specified in
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`vertexFormat`.

* 
 `geometryIndexAndFlagsBuffer` is
either `0` or an address containing strided
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)
values specifying the geometry index and flag for every triangle in the
cluster.

* 
`opacityMicromapArray` is either `0` or specifies the address of a
valid opacity micromap array to reference from the cluster acceleration
structure.
If it is `0`, then opacity micromaps will be disabled for this cluster
acceleration structure.

* 
`opacityMicromapIndexBuffer` is either `0` or specifies the address
of a strided array with size equal to the number of triangles or indices
into the opacity micromap array.
If `opacityMicromapIndexBuffer` is `0` then the index used is the
index of the triangle in the geometry.

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is the following:

* 
`triangleCount`, `vertexCount`, `positionTruncateBitCount`,
`indexType` and `opacityMicromapIndexType` occupy the same
memory as if a single `uint32_t` was specified in their place

`triangleCount` occupies the 9 least significant bits of that
memory

* 
`vertexCount` occupies the next 9 least significant bits of that
memory

* 
`positionTruncateBitCount` occupies the next 6 least significant
bits of that memory

* 
`indexType` occupies the next 4 least significant bits of that
memory

* 
`opacityMicromapIndexType` occupies the 4 most significant bits of
that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-clusterID-10488) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-clusterID-10488

`clusterID` **must** not be 0xFFFFFFFF

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-triangleCount-10489) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-triangleCount-10489

`triangleCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxTrianglesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexCount-10490) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexCount-10490

`vertexCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxVerticesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexType-10491) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexType-10491

`indexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapIndexType-10492) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapIndexType-10492

`opacityMicromapIndexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-positionTruncateBitCount-10493) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-positionTruncateBitCount-10493

`positionTruncateBitCount` **must** be greater than or equal to
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`minPositionTruncateBitCount`
and less than or equal to `32`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexBufferStride-10494) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexBufferStride-10494

`indexBufferStride` **must** be `0` or a multiple of `indexType`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexBufferStride-10495) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexBufferStride-10495

`vertexBufferStride` **must** be `0` or a multiple of value specified
in
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`vertexFormat`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-baseGeometryIndex-10496) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-baseGeometryIndex-10496

The maximum geometry index after using the values in
`baseGeometryIndex` and `geometryIndexBuffer` **must** be less than
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxClusterGeometryIndex`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapArray-10881) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapArray-10881

If `opacityMicromapArray` is not `0`, then the cluster acceleration
structure **must** have been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV)
flag set in [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-clusterFlags-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-clusterFlags-parameter

 `clusterFlags` **must** be a valid combination of [VkClusterAccelerationStructureClusterFlagBitsNV](#VkClusterAccelerationStructureClusterFlagBitsNV) values

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-indexBuffer-parameter

 `indexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-vertexBuffer-parameter

 `vertexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-geometryIndexAndFlagsBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-geometryIndexAndFlagsBuffer-parameter

 If `geometryIndexAndFlagsBuffer` is not `0`, `geometryIndexAndFlagsBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapArray-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapArray-parameter

 If `opacityMicromapArray` is not `0`, `opacityMicromapArray` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapIndexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterInfoNV-opacityMicromapIndexBuffer-parameter

 If `opacityMicromapIndexBuffer` is not `0`, `opacityMicromapIndexBuffer` **must** be a valid `VkDeviceAddress` value

Bits that **can** be set in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)::`indexType`,
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterInfoNV)::`opacityMicromapIndexType`,
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)::`indexType`
and
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)::`opacityMicromapIndexType`
specifying the index type is one of:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureIndexFormatFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_8BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_16BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_32BIT_NV = 0x00000004,
} VkClusterAccelerationStructureIndexFormatFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_8BIT_NV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) specifies
that 8-bit indices will be used.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_16BIT_NV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) specifies
that 16-bit indices will be used.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_32BIT_NV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) specifies
that 32-bit indices will be used.

// Provided by VK_NV_cluster_acceleration_structure
typedef VkFlags VkClusterAccelerationStructureIndexFormatFlagsNV;

`VkClusterAccelerationStructureIndexFormatFlagsNV` is a bitmask type for
setting a single [VkClusterAccelerationStructureIndexFormatFlagBitsNV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV).

The [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)
structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV {
    uint32_t                                                         clusterID;
    VkClusterAccelerationStructureClusterFlagsNV                     clusterFlags;
    uint32_t                                                         triangleCount:9;
    uint32_t                                                         vertexCount:9;
    uint32_t                                                         positionTruncateBitCount:6;
    uint32_t                                                         indexType:4;
    uint32_t                                                         opacityMicromapIndexType:4;
    VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV    baseGeometryIndexAndGeometryFlags;
    uint16_t                                                         indexBufferStride;
    uint16_t                                                         vertexBufferStride;
    uint16_t                                                         geometryIndexAndFlagsBufferStride;
    uint16_t                                                         opacityMicromapIndexBufferStride;
    VkDeviceAddress                                                  indexBuffer;
    VkDeviceAddress                                                  vertexBuffer;
    VkDeviceAddress                                                  geometryIndexAndFlagsBuffer;
    VkDeviceAddress                                                  opacityMicromapArray;
    VkDeviceAddress                                                  opacityMicromapIndexBuffer;
    VkDeviceAddress                                                  instantiationBoundingBoxLimit;
} VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV;

* 
`clusterID` is a user specified identifier assigned to this cluster
template.

* 
`clusterFlags` is a bitmask of
[VkClusterAccelerationStructureClusterFlagBitsNV](#VkClusterAccelerationStructureClusterFlagBitsNV) values describing
flags how the cluster template should be built.

* 
`triangleCount` is the number of triangles in this cluster.

* 
`vertexCount` is the number of unique vertices in this cluster.

* 
`positionTruncateBitCount` is the number of bits starting at the
lowest bit (i.e. the LSBs of the mantissa), of each vertex position that
will be truncated to zero to improve floating-point compression.

* 
`indexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) value
specifying the index type in `indexBuffer`.

* 
`opacityMicromapIndexType` is a single
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](#VkClusterAccelerationStructureIndexFormatFlagBitsNV) value
specifying the index type in `opacityMicromapIndexBuffer`.

* 
`baseGeometryIndexAndGeometryFlags` is a
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)
value specifying the base geometry index and flags for all triangles in
the cluster template.

* 
`indexBufferStride` is the stride in bytes in `indexBuffer`.

* 
`vertexBufferStride` is the stride in bytes in `vertexBuffer`.

* 
`geometryIndexAndFlagsBufferStride` is the stride in bytes in
`geometryIndexAndFlagsBuffer`.

* 
`opacityMicromapIndexBufferStride` is the stride in bytes in
`opacityMicromapIndexBuffer`.

* 
`indexBuffer` contains the indices of vertices in the cluster and is
of type `indexType`.

* 
`vertexBuffer` is either `0` or specifies the vertex data of the
triangles in the cluster template with format specified in
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`vertexFormat`.

* 
`geometryIndexAndFlagsBuffer` is either `0` or an address containing
strided
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](#VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV)
values specifying the geometry index and flag for every triangle in the
cluster.

* 
`opacityMicromapArray` is either `0` or specifies the address of a
valid opacity micromap array to reference from the cluster acceleration
structure.
If it is `0`, then opacity micromaps will be disabled for this cluster
acceleration structure.

* 
`opacityMicromapIndexBuffer` is either `0` or specifies the address
of a strided array with size equal to the number of triangles or indices
into the opacity micromap array.
If `opacityMicromapIndexBuffer` is `0` then the index used is the
index of the triangle in the geometry.

* 
`instantiationBoundingBoxLimit` is either `0` or specifies the
address of a bounding box within which all instantiated clusters **must**
lie.
The bounding box is specified by six 32-bit floating-point values in the
order MinX, MinY, MinZ, MaxX, MaxY, MaxZ.

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is the following:

* 
`triangleCount`, `vertexCount`, `positionTruncateBitCount`,
`indexType` and `opacityMicromapIndexType` occupy the same
memory as if a single `uint32_t` was specified in their place

`triangleCount` occupies the 9 least significant bits of that
memory

* 
`vertexCount` occupies the next 9 least significant bits of that
memory

* 
`positionTruncateBitCount` occupies the next 6 least significant
bits of that memory

* 
`indexType` occupies the next 4 least significant bits of that
memory

* 
`opacityMicromapIndexType` occupies the 4 most significant bits of
that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

Cluster templates cannot be directly used to build bottom level acceleration
structures, instead, they **must** be instantiated into
[CLAS objects](#acceleration-structure-clas-geometry).

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterID-10497) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterID-10497

`clusterID` **must** not be 0xFFFFFFFF

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-triangleCount-10498) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-triangleCount-10498

`triangleCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxTrianglesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexCount-10499) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexCount-10499

`vertexCount` **must** be less than or equal to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxVerticesPerCluster`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexType-10500) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexType-10500

`indexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexType-10501) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexType-10501

`opacityMicromapIndexType` **must** only have a single bit set

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-positionTruncateBitCount-10502) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-positionTruncateBitCount-10502

`positionTruncateBitCount` **must** be greater than or equal to
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`minPositionTruncateBitCount`
and less than or equal to `32`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBufferStride-10503) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBufferStride-10503

`indexBufferStride` **must** be `0` or a multiple of `indexType`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBufferStride-10504) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBufferStride-10504

`vertexBufferStride` **must** be `0` or a multiple of value specified
in
[VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)::`vertexFormat`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-10505) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-10505

`instantiationBoundingBoxLimit` **must** be aligned to
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`clusterTemplateBoundsByteAlignment`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-baseGeometryIndex-10506) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-baseGeometryIndex-10506

The maximum geometry index after using the values in
`baseGeometryIndex` and `geometryIndexBuffer` **must** be less than
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxClusterGeometryIndex`

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-10882) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-10882

If `opacityMicromapArray` is not `0`, then the template cluster
acceleration structure **must** have been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV)
flag set in [VkClusterAccelerationStructureInputInfoNV](#VkClusterAccelerationStructureInputInfoNV)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterFlags-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-clusterFlags-parameter

 `clusterFlags` **must** be a valid combination of [VkClusterAccelerationStructureClusterFlagBitsNV](#VkClusterAccelerationStructureClusterFlagBitsNV) values

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-indexBuffer-parameter

 `indexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-vertexBuffer-parameter

 If `vertexBuffer` is not `0`, `vertexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-geometryIndexAndFlagsBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-geometryIndexAndFlagsBuffer-parameter

 If `geometryIndexAndFlagsBuffer` is not `0`, `geometryIndexAndFlagsBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapArray-parameter

 If `opacityMicromapArray` is not `0`, `opacityMicromapArray` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexBuffer-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-opacityMicromapIndexBuffer-parameter

 If `opacityMicromapIndexBuffer` is not `0`, `opacityMicromapIndexBuffer` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-parameter) VUID-VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV-instantiationBoundingBoxLimit-parameter

 If `instantiationBoundingBoxLimit` is not `0`, `instantiationBoundingBoxLimit` **must** be a valid `VkDeviceAddress` value

The [VkClusterAccelerationStructureInstantiateClusterInfoNV](#VkClusterAccelerationStructureInstantiateClusterInfoNV) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureInstantiateClusterInfoNV {
    uint32_t                    clusterIdOffset;
    uint32_t                    geometryIndexOffset:24;
    uint32_t                    reserved:8;
    VkDeviceAddress             clusterTemplateAddress;
    VkStridedDeviceAddressNV    vertexBuffer;
} VkClusterAccelerationStructureInstantiateClusterInfoNV;

* 
`clusterIdOffset` is an unsigned offset applied to the
`clusterID` value stored in the cluster template.

* 
`geometryIndexOffset` is a signed offset applied to the geometry
index of each triangle.

* 
`reserved` is reserved for future use.

* 
`clusterTemplateAddress` is the address of a previously built
cluster template.

* 
`vertexBuffer` is a [VkStridedDeviceAddressNV](#VkStridedDeviceAddressNV) structure
containing the vertex data for the indexed triangles stored in the
cluster template.
If the address in [VkStridedDeviceAddressNV](#VkStridedDeviceAddressNV) is `0` the vertex data
is sourced from the cluster template.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10507) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10507

`vertexBuffer` **must** not be `0` if the template was built without
vertex data

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10508) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-vertexBuffer-10508

The format in `vertexBuffer` **must** match the original format
specified in [VkClusterAccelerationStructureTriangleClusterInputNV](#VkClusterAccelerationStructureTriangleClusterInputNV)

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-reserved-10509) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-reserved-10509

`reserved` **must** be `0`

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-geometryIndexOffset-10510) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-geometryIndexOffset-10510

The maximum geometry index after using the value in
`geometryIndexOffset` **must** be less than
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV)::`maxClusterGeometryIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-clusterTemplateAddress-parameter) VUID-VkClusterAccelerationStructureInstantiateClusterInfoNV-clusterTemplateAddress-parameter

 `clusterTemplateAddress` **must** be a valid `VkDeviceAddress` value

The [VkClusterAccelerationStructureGetTemplateIndicesInfoNV](#VkClusterAccelerationStructureGetTemplateIndicesInfoNV) structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkClusterAccelerationStructureGetTemplateIndicesInfoNV {
    VkDeviceAddress    clusterTemplateAddress;
} VkClusterAccelerationStructureGetTemplateIndicesInfoNV;

* 
`clusterTemplateAddress` is the device address of the cluster
template acceleration structure whose index data is being fetched.

Valid Usage

* 
[](#VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-10833) VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-10833

`clusterTemplateAddress` **must** be a
[template cluster acceleration    structure](#acceleration-structure-clas-template)

Valid Usage (Implicit)

* 
[](#VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-parameter) VUID-VkClusterAccelerationStructureGetTemplateIndicesInfoNV-clusterTemplateAddress-parameter

 `clusterTemplateAddress` **must** be a valid `VkDeviceAddress` value

The [VkStridedDeviceAddressNV](#VkStridedDeviceAddressNV) structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkStridedDeviceAddressNV {
    VkDeviceAddress    startAddress;
    VkDeviceSize       strideInBytes;
} VkStridedDeviceAddressNV;

* 
`startAddress` is the device address (as returned by the
[vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress) command) at which the region starts, or
zero if the region is unused.

* 
`strideInBytes` is the byte stride between consecutive elements.
Only the bottom 32 bits are used.
The field is 64 bits to ensure consistent alignment across all
containing structures.

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressNV-startAddress-parameter) VUID-VkStridedDeviceAddressNV-startAddress-parameter

 `startAddress` **must** be a valid `VkDeviceAddress` value

Partitioned Top Level Acceleration Structures (PTLAS) allow efficient reuse
of previously constructed sections of the top level acceleration structure
by eliminating a full rebuild when only a few instances are modified.
This reduces build times and supports handling a higher number of instances,
making it more suitable for large and complex scenes.

PTLAS organizes instances into partitions, enabling a two-stage build
process: first, it constructs an acceleration structure for each partition
by grouping the instances within it, and second, it combines these partition
structures into a single acceleration structure, similar to the current
top-level acceleration structure.

To maintain compatibility, PTLAS behaves identically to the current
top-level acceleration structure from the perspective of ray tracing shaders
and pipelines.

PTLAS includes a unique global partition that operates independently of
other partitions.
Instances **can** be assigned to this global partition just like they would to
regular partitions.
The global partition is well-suited for frequently updated instances, such
as animated characters.
During the build process, instances in the global partition are treated as
if they belong to individual partitions, without increasing the maximum
partition count.
However, instances in the global partition may still impact build
performance.
Once these instances become stable, they should be moved to a spatially
optimized, non-global partition to lower build costs and minimize trace
performance issues.

To handle large worlds requiring more precision than 32-bit floating-point
numbers offer, PTLAS offers efficient partition translation.
Typically, applications maintain precision by placing the world center near
the camera.
Partition translation allows an additional translation of instances during
construction without changing their stored transforms.
This method stores instance transforms relative to partitions, applying a
translation to achieve accurate world positions.
Higher precision is maintained using smaller floating-point numbers until
the structure is built.
World space coordinates **can** also be updated efficiently without rebuilding
the entire PTLAS.
Partition translation requires extra memory for untranslated instance
transforms and **must** be explicitly enabled with
[VkPartitionedAccelerationStructureFlagsNV](#VkPartitionedAccelerationStructureFlagsNV)::`enablePartitionTranslation`
flag.

To determine the memory requirements for a PTAS, call:

// Provided by VK_NV_partitioned_acceleration_structure
void vkGetPartitionedAccelerationStructuresBuildSizesNV(
    VkDevice                                    device,
    const VkPartitionedAccelerationStructureInstancesInputNV* pInfo,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that owns the acceleration structure.

* 
`pInfo` is a pointer to a
[VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV) structure
containing parameters required for the memory requirements query.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure which returns
the size required for an acceleration structure and the sizes required
for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

Valid Usage

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-partitionedAccelerationStructure-10534) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-partitionedAccelerationStructure-10534

The [    `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`::`partitionedAccelerationStructure`](features.html#features-partitionedAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-device-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pInfo-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV) structure

* 
[](#VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pSizeInfo-parameter) VUID-vkGetPartitionedAccelerationStructuresBuildSizesNV-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure

The [VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV) structure is
defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureInstancesInputNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkBuildAccelerationStructureFlagsKHR    flags;
    uint32_t                                instanceCount;
    uint32_t                                maxInstancePerPartitionCount;
    uint32_t                                partitionCount;
    uint32_t                                maxInstanceInGlobalPartitionCount;
} VkPartitionedAccelerationStructureInstancesInputNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagsKHR](resources.html#VkBuildAccelerationStructureFlagsKHR)
specifying flags for the PTLAS build operation.

* 
`instanceCount` is the number of instances in this PTLAS.

* 
`maxInstancePerPartitionCount` is the maximum number of instances
per partition in the PTLAS.

* 
`partitionCount` is the number of partitions in the PTLAS.

* 
`maxInstanceInGlobalPartitionCount` is maximum number of instances
in the [global partition](#ptlas-global-partition).

If the `pNext` chain includes a
[VkPartitionedAccelerationStructureFlagsNV](#VkPartitionedAccelerationStructureFlagsNV) structure, then that
structure specifies additional flags for the PTLAS.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-partitionCount-10535) VUID-VkPartitionedAccelerationStructureInstancesInputNV-partitionCount-10535

The sum of `partitionCount` and
`maxInstanceInGlobalPartitionCount` **must** be less than or equal to
[VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV](limits.html#VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV)::`maxPartitionCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-sType) VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCES_INPUT_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-pNext-pNext) VUID-VkPartitionedAccelerationStructureInstancesInputNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPartitionedAccelerationStructureFlagsNV](#VkPartitionedAccelerationStructureFlagsNV)

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-unique) VUID-VkPartitionedAccelerationStructureInstancesInputNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPartitionedAccelerationStructureInstancesInputNV-flags-parameter) VUID-VkPartitionedAccelerationStructureInstancesInputNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsKHR](resources.html#VkBuildAccelerationStructureFlagBitsKHR) values

The [VkPartitionedAccelerationStructureFlagsNV](#VkPartitionedAccelerationStructureFlagsNV) structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureFlagsNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           enablePartitionTranslation;
} VkPartitionedAccelerationStructureFlagsNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enablePartitionTranslation` specifies if a
[partition translation](#ptlas-partition-translation) **may** be applied
with
[VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](#VkPartitionedAccelerationStructureWritePartitionTranslationDataNV).

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureFlagsNV-sType-sType) VUID-VkPartitionedAccelerationStructureFlagsNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_FLAGS_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV)

To build a partitioned top level acceleration structure, call:

// Provided by VK_NV_partitioned_acceleration_structure
void vkCmdBuildPartitionedAccelerationStructuresNV(
    VkCommandBuffer                             commandBuffer,
    const VkBuildPartitionedAccelerationStructureInfoNV* pBuildInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pBuildInfo` is a pointer to a
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV) structure containing
parameters required for building a PTLAS.

Accesses to the acceleration structure scratch memory as identified by the
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`scratchData` **must**
be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits)).

Accesses to each
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`srcAccelerationStructureData`
and
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`dstAccelerationStructureData`
**must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](synchronization.html#VkAccessFlagBits), as appropriate.

Accesses to memory with input data as identified by any used values of
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`srcInfos` and
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`srcInfosCount`
**must** be [synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](synchronization.html#VkAccessFlagBits).

Valid Usage

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-partitionedAccelerationStructure-10536) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-partitionedAccelerationStructure-10536

The [    `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`::`partitionedAccelerationStructure`](features.html#features-partitionedAccelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10537) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10537

The count specified in `pBuildInfo->input.instanceCount` for the
build operation **must** not exceed the value provided in
`pInfo->instanceCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10538) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10538

The count specified in
`pBuildInfo->input.maxInstancePerPartitionCount` for the build
operation **must** not exceed the value provided in
`pInfo->maxInstancePerPartitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10539) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10539

The count specified in `pBuildInfo->input.partitionCount` for the
build operation **must** not exceed the value provided in
`pInfo->partitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10540) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10540

The count specified in
`pBuildInfo->input.maxInstanceInGlobalPartitionCount` for the build
operation **must** not exceed the value provided in
`pInfo->maxInstanceInGlobalPartitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10541) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10541

The scratch memory for the partitioned acceleration structure build
specified in `pBuildInfo->scratchData` **must** be larger than or equal
to the scratch size queried with
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10542) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10542

`pBuildInfo->scratchData` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10543) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10543

The destination memory of the partitioned acceleration structure build
specified in `pBuildInfo->dstAccelerationStructureData` **must** be
larger than or equal to the size queried with
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10544) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10544

`pBuildInfo->srcAccelerationStructureData` **must** be aligned to `256`
bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10545) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10545

`pBuildInfo->dstAccelerationStructureData` **must** be aligned to `256`
bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10546) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10546

The number of inputs specified in `pBuildInfo->srcInfos` **must** be
greater than or equal to `pBuildInfo->srcInfosCount`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10547) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10547

The memory region containing the acceleration structure at address
`pBuildInfo->srcAccelerationStructureData` **must** not overlap with
scratch memory region at address `pBuildInfo->scratchData`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10548) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10548

The memory region containing the acceleration structure at address
`pBuildInfo->dstAccelerationStructureData` **must** not overlap with
scratch memory region at address `pBuildInfo->scratchData`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10549) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10549

If the source and destination acceleration structures are not the same,
the memory regions containing the acceleration structures at addresses
`pBuildInfo->srcAccelerationStructureData` and
`pBuildInfo->dstAccelerationStructureData` **must** not overlap with
each other

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10550) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10550

`pBuildInfo->scratchData` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10551) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10551

`pBuildInfo->srcInfos` and `pBuildInfo->srcInfosCount` **must** be
device addresses allocated to the application from buffers created with
the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10552) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10552

`pBuildInfo->srcAccelerationStructureData` and
`pBuildInfo->dstAccelerationStructureData` **must** be a device
addresses allocated to the application from buffers created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag
set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-parameter) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-parameter) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV) structure

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-recording) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-cmdpool) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-renderpass) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-suspended) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-videocoding) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildPartitionedAccelerationStructuresNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The [VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV) structure is defined
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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`input` is a
[VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV) structure
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
[VkBuildPartitionedAccelerationStructureIndirectCommandNV](#VkBuildPartitionedAccelerationStructureIndirectCommandNV)
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
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure returned from a
call to [vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) is not
`0`, then `scratchData` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10559) VUID-VkBuildPartitionedAccelerationStructureInfoNV-scratchData-10559

Memory at `scratchData` **must** be equal or larger than the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR)::`buildScratchSize`
value returned from
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) with the same
build parameters

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-10560) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcAccelerationStructureData-10560

If `srcAccelerationStructureData` is not `NULL`, it **must** have
previously been built as a PTLAS

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-10562) VUID-VkBuildPartitionedAccelerationStructureInfoNV-dstAccelerationStructureData-10562

Memory at `dstAccelerationStructureData` **must** be equal or larger
than the
[VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR)::`accelerationStructureSize`
value returned from
[vkGetPartitionedAccelerationStructuresBuildSizesNV](#vkGetPartitionedAccelerationStructuresBuildSizesNV) with the same
build parameters

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-10563) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfosCount-10563

`srcInfosCount` **must** be 4-byte aligned

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-10564) VUID-VkBuildPartitionedAccelerationStructureInfoNV-srcInfos-10564

Each element of `srcInfos` array **must** have a unique
[VkBuildPartitionedAccelerationStructureIndirectCommandNV](#VkBuildPartitionedAccelerationStructureIndirectCommandNV)::`opType`

Valid Usage (Implicit)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-sType-sType) VUID-VkBuildPartitionedAccelerationStructureInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUILD_PARTITIONED_ACCELERATION_STRUCTURE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-pNext-pNext) VUID-VkBuildPartitionedAccelerationStructureInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBuildPartitionedAccelerationStructureInfoNV-input-parameter) VUID-VkBuildPartitionedAccelerationStructureInfoNV-input-parameter

 `input` **must** be a valid [VkPartitionedAccelerationStructureInstancesInputNV](#VkPartitionedAccelerationStructureInstancesInputNV) structure

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

The [VkBuildPartitionedAccelerationStructureIndirectCommandNV](#VkBuildPartitionedAccelerationStructureIndirectCommandNV) structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkBuildPartitionedAccelerationStructureIndirectCommandNV {
    VkPartitionedAccelerationStructureOpTypeNV    opType;
    uint32_t                                      argCount;
    VkStridedDeviceAddressNV                      argData;
} VkBuildPartitionedAccelerationStructureIndirectCommandNV;

* 
`opType` is a [VkPartitionedAccelerationStructureOpTypeNV](#VkPartitionedAccelerationStructureOpTypeNV)
describing the type of operation.

* 
`argCount` the number of structures in `argData` array.

* 
`argData` is an array of [VkStridedDeviceAddressNV](#VkStridedDeviceAddressNV) structures
containing the write or update data for instances and partitions in the
PTLAS.
The structure is dependent on `opType` as shown in the table below.

| `opType` | Format of `argData` |
| --- | --- |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV](#VkPartitionedAccelerationStructureOpTypeNV) | [VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV) |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV](#VkPartitionedAccelerationStructureOpTypeNV) | [VkPartitionedAccelerationStructureUpdateInstanceDataNV](#VkPartitionedAccelerationStructureUpdateInstanceDataNV) |
| [VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV](#VkPartitionedAccelerationStructureOpTypeNV) | [VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](#VkPartitionedAccelerationStructureWritePartitionTranslationDataNV) |

Valid Usage

* 
[](#VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-argData-10565) VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-argData-10565

An instance index **must** not be referenced by more than one structure in
`argData`

Valid Usage (Implicit)

* 
[](#VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-opType-parameter) VUID-VkBuildPartitionedAccelerationStructureIndirectCommandNV-opType-parameter

 `opType` **must** be a valid [VkPartitionedAccelerationStructureOpTypeNV](#VkPartitionedAccelerationStructureOpTypeNV) value

Values which **can** be set in [VkPartitionedAccelerationStructureOpTypeNV](#VkPartitionedAccelerationStructureOpTypeNV)
are:

// Provided by VK_NV_partitioned_acceleration_structure
typedef enum VkPartitionedAccelerationStructureOpTypeNV {
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV = 0,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV = 1,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV = 2,
} VkPartitionedAccelerationStructureOpTypeNV;

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_INSTANCE_NV](#VkPartitionedAccelerationStructureOpTypeNV) is
used to assign a transformed bottom level acceleration structure to an
instance and partition.
This is similar to [VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR) that defines
the properties and transformations for a single instance in
non-partitioned TLAS.
Any partition that contains at least one of the affected instances will
have their internal acceleration structure rebuilt.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_UPDATE_INSTANCE_NV](#VkPartitionedAccelerationStructureOpTypeNV)
specifies that an instance will be updated with a new bottom level
acceleration structure.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_OP_TYPE_WRITE_PARTITION_TRANSLATION_NV](#VkPartitionedAccelerationStructureOpTypeNV)
specifies that a partition will be assigned a
[translation vector](#ptlas-partition-translation).

The [VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV) structure is
defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureWriteInstanceDataNV {
    VkTransformMatrixKHR                                 transform;
    float                                                explicitAABB[6];
    uint32_t                                             instanceID;
    uint32_t                                             instanceMask;
    uint32_t                                             instanceContributionToHitGroupIndex;
    VkPartitionedAccelerationStructureInstanceFlagsNV    instanceFlags;
    uint32_t                                             instanceIndex;
    uint32_t                                             partitionIndex;
    VkDeviceAddress                                      accelerationStructure;
} VkPartitionedAccelerationStructureWriteInstanceDataNV;

* 
`transform` is a [VkTransformMatrixKHR](#VkTransformMatrixKHR) structure describing the
transformation to be applied to the instance in PTLAS.

* 
`explicitAABB` specifies an axis aligned bounding box representing
the maximum extent of any vertex within the used acceleration structure
after applying the instance-to-world transformation.
The [partition translation](#ptlas-partition-translation) is not
applied to the bounding box.

* 
`instanceID` is a user specified constant assigned to an instance in
the PTLAS.

* 
`instanceMask` is a 8-bit mask assigned to the instance that **may** be
used to include or reject group of instances.

* 
`instanceContributionToHitGroupIndex` is a 24-bit per application
specified instance value added in the indexing into the shader binding
table to fetch the hit group to use.

* 
`instanceFlags` is a bitmask of
[VkPartitionedAccelerationStructureInstanceFlagsNV](#VkPartitionedAccelerationStructureInstanceFlagsNV) specifying flags
an instance in the PTLAS.

* 
`instanceIndex` is the index of the instance within the PTLAS.

* 
`partitionIndex` is the index of the partition to which this
instance belongs.
[Global partitions](#ptlas-global-partition) are referred to by
[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](#VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV).

* 
`accelerationStructure` is the device address of the bottom level
acceleration structure or a clustered bottom level acceleration
structure that is being instanced.
This instance is disabled if the device address is `0`.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceMask-10566) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceMask-10566

The most significant 24 bits of `instanceMask` **must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceContributionToHitGroupIndex-10567) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceContributionToHitGroupIndex-10567

The most significant 8 bits of `instanceContributionToHitGroupIndex`
**must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceIndex-10568) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceIndex-10568

`instanceIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`input.instanceCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-partitionIndex-10569) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-partitionIndex-10569

`partitionIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`input.partitionCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-explicitAABB-10570) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-explicitAABB-10570

`explicitAABB` **must** be a valid bounding box if instance was created
with flag
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
set

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceFlags-parameter) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-instanceFlags-parameter

 `instanceFlags` **must** be a valid combination of [VkPartitionedAccelerationStructureInstanceFlagBitsNV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV) values

* 
[](#VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-accelerationStructure-parameter) VUID-VkPartitionedAccelerationStructureWriteInstanceDataNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid `VkDeviceAddress` value

[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](#VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV) is a
special constant value used for partitioned acceleration structures to
specify global partitions.

#define VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV (~0U)

The [VkPartitionedAccelerationStructureUpdateInstanceDataNV](#VkPartitionedAccelerationStructureUpdateInstanceDataNV) structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureUpdateInstanceDataNV {
    uint32_t           instanceIndex;
    uint32_t           instanceContributionToHitGroupIndex;
    VkDeviceAddress    accelerationStructure;
} VkPartitionedAccelerationStructureUpdateInstanceDataNV;

* 
`instanceIndex` is the index of the instance being updated.

* 
`instanceContributionToHitGroupIndex` is a 24-bit per instance value
added in the indexing into the shader binding table to fetch the hit
group to use.

* 
`accelerationStructure` is the device address of the bottom level
acceleration structure or a clustered bottom level acceleration
structure whose instance is being updated.
The instance is disabled if the device address is `0`.

If the instance was originally disabled by specifying a `0` in
[VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV)::`accelerationStructure`,
it can not be updated to a new acceleration structure as the instance **may**
have been permanently disabled by the implementation.

To avoid a refit, the new acceleration structure **must** be within the
bounding box specified by
[VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV)::`explicitAABB`
when the instance was first created.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceContributionToHitGroupIndex-10571) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceContributionToHitGroupIndex-10571

The most significant 8 bits of `instanceContributionToHitGroupIndex`
**must** be `0`

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-None-10572) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-None-10572

The instance **must** have either been created with flag
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
or did not have an acceleration structure assigned with
[VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV)

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceIndex-10573) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-instanceIndex-10573

`instanceIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`input.instanceCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-accelerationStructure-parameter) VUID-VkPartitionedAccelerationStructureUpdateInstanceDataNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid `VkDeviceAddress` value

Bits which **can** be set in
[VkPartitionedAccelerationStructureWriteInstanceDataNV](#VkPartitionedAccelerationStructureWriteInstanceDataNV)::`instanceFlags`,
specifying flags for instances, are:

// Provided by VK_NV_partitioned_acceleration_structure
typedef enum VkPartitionedAccelerationStructureInstanceFlagBitsNV {
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FACING_CULL_DISABLE_BIT_NV = 0x00000001,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FLIP_FACING_BIT_NV = 0x00000002,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_OPAQUE_BIT_NV = 0x00000004,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_NO_OPAQUE_BIT_NV = 0x00000008,
    VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV = 0x00000010,
} VkPartitionedAccelerationStructureInstanceFlagBitsNV;

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FACING_CULL_DISABLE_BIT_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
disables face culling for this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_TRIANGLE_FLIP_FACING_BIT_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
specifies that the [facing determination](raytraversal.html#ray-traversal-culling-face)
for geometry in this instance is inverted.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_OPAQUE_BIT_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
causes this instance to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV)
were specified on all geometries referenced by this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_FORCE_NO_OPAQUE_BIT_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
causes this instance to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](resources.html#VkGeometryFlagBitsNV)
were not specified on all geometries referenced by this instance.

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCE_FLAG_ENABLE_EXPLICIT_BOUNDING_BOX_NV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV)
enables use of an explicit bounding box for this instance.

// Provided by VK_NV_partitioned_acceleration_structure
typedef VkFlags VkPartitionedAccelerationStructureInstanceFlagsNV;

`VkPartitionedAccelerationStructureInstanceFlagsNV` is a bitmask type
for setting a mask of zero or more
[VkPartitionedAccelerationStructureInstanceFlagBitsNV](#VkPartitionedAccelerationStructureInstanceFlagBitsNV).

The [VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](#VkPartitionedAccelerationStructureWritePartitionTranslationDataNV)
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPartitionedAccelerationStructureWritePartitionTranslationDataNV {
    uint32_t    partitionIndex;
    float       partitionTranslation[3];
} VkPartitionedAccelerationStructureWritePartitionTranslationDataNV;

* 
`partitionIndex` is the index of partition to write.
[Global partition](#ptlas-global-partition) is referred to by
[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](#VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV).

* 
`partitionTranslation` sets the [    translation vector](#ptlas-partition-translation) for this partition.
When tracing this partition, the contained instances will behave as if
the partition translation was added to the translation component of the
instance transform.
This translation vector is also added to the instances in the partition
that had their bounding box specified.

Valid Usage

* 
[](#VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-partitionIndex-10574) VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-partitionIndex-10574

`partitionIndex` **must** be less than
[VkBuildPartitionedAccelerationStructureInfoNV](#VkBuildPartitionedAccelerationStructureInfoNV)::`input.partitionCount`

* 
[](#VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-enablePartitionTranslation-10575) VUID-VkPartitionedAccelerationStructureWritePartitionTranslationDataNV-enablePartitionTranslation-10575

The partitioned acceleration structure **must** have the
[VkPartitionedAccelerationStructureFlagsNV](#VkPartitionedAccelerationStructureFlagsNV)::`enablePartitionTranslation`
flag set

Implementations are also required to provide host implementations of the
acceleration structure operations if the
[`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands) feature is enabled:

* 
[vkBuildAccelerationStructuresKHR](#vkBuildAccelerationStructuresKHR) corresponding to
[vkCmdBuildAccelerationStructuresKHR](#vkCmdBuildAccelerationStructuresKHR)

* 
[vkCopyAccelerationStructureKHR](#vkCopyAccelerationStructureKHR) corresponding to
[vkCmdCopyAccelerationStructureKHR](#vkCmdCopyAccelerationStructureKHR)

* 
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR) corresponding to
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR)

* 
[vkCopyMemoryToAccelerationStructureKHR](#vkCopyMemoryToAccelerationStructureKHR) corresponding to
[vkCmdCopyMemoryToAccelerationStructureKHR](#vkCmdCopyMemoryToAccelerationStructureKHR)

* 
[vkWriteAccelerationStructuresPropertiesKHR](#vkWriteAccelerationStructuresPropertiesKHR) corresponding to
[vkCmdWriteAccelerationStructuresPropertiesKHR](#vkCmdWriteAccelerationStructuresPropertiesKHR)

These commands are functionally equivalent to their device counterparts,
except that they are executed on the host timeline, rather than being
enqueued into command buffers.

All acceleration structures used by the host commands **must** be bound to
host-visible memory, and all input data for acceleration structure builds
**must** be referenced using host addresses instead of device addresses.
Applications are not required to map acceleration structure memory when
using the host commands.

|  | The [vkBuildAccelerationStructuresKHR](#vkBuildAccelerationStructuresKHR) and
| --- | --- |
[vkCmdBuildAccelerationStructuresKHR](#vkCmdBuildAccelerationStructuresKHR) **may** use different algorithms, and
thus are not required to produce identical structures.
The structures produced by these two commands **may** exhibit different memory
footprints or traversal performance, but should strive to be similar where
possible.

Apart from these details, the host and device operations are
interchangeable.
For example, an application **can** use [vkBuildAccelerationStructuresKHR](#vkBuildAccelerationStructuresKHR)
to build a structure, compact it on the device using
[vkCmdCopyAccelerationStructureKHR](#vkCmdCopyAccelerationStructureKHR), and serialize the result using
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR).

The exception to this are acceleration structures that are created with the
[VkAccelerationStructureCreateInfo2KHR](resources.html#VkAccelerationStructureCreateInfo2KHR) command as they are backed by a
`VkDeviceAddress` and therefore are not valid to be used with host
commands. |

|  | For efficient execution, acceleration structures manipulated using these
| --- | --- |
commands should always be bound to host cached memory, as the implementation
may need to repeatedly read and write this memory during the execution of
the command. |

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
`deferredOperation` is an optional [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`infoCount` is the number of acceleration structures to build.
It specifies the number of the `pInfos` structures and
`ppBuildRangeInfos` pointers that **must** be provided.

* 
`pInfos` is a pointer to an array of `infoCount`
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures defining
the geometry used to build each acceleration structure.

* 
`ppBuildRangeInfos` is a pointer to an array of `infoCount`
pointers to arrays of [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR)
structures.
Each `ppBuildRangeInfos`[i] is a pointer to an array of
`pInfos`[i].`geometryCount`
[VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structures defining
dynamic offsets to the addresses where geometry data is stored, as
defined by `pInfos`[i].

This command fulfills the same task as
[vkCmdBuildAccelerationStructuresKHR](#vkCmdBuildAccelerationStructuresKHR) but is executed by the host.

The `vkBuildAccelerationStructuresKHR` command provides the ability to
initiate multiple acceleration structures builds, however there is no
ordering or synchronization implied between any of the individual
acceleration structure builds.

|  | This means that an application **cannot** build a top-level acceleration
| --- | --- |
structure in the same [vkBuildAccelerationStructuresKHR](#vkBuildAccelerationStructuresKHR) call as the
associated bottom-level or instance acceleration structures are being built.
There also **cannot** be any memory aliasing between any acceleration structure
memories or scratch memories being used by any of the builds. |

Valid Usage

* 
[](#VUID-vkBuildAccelerationStructuresKHR-accelerationStructureHostCommands-03581) VUID-vkBuildAccelerationStructuresKHR-accelerationStructureHostCommands-03581

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkBuildAccelerationStructuresKHR-mode-04628) VUID-vkBuildAccelerationStructuresKHR-mode-04628

The `mode` member of each element of `pInfos` **must** be a valid
[VkBuildAccelerationStructureModeKHR](#VkBuildAccelerationStructureModeKHR) value

* 
[](#VUID-vkBuildAccelerationStructuresKHR-srcAccelerationStructure-04629) VUID-vkBuildAccelerationStructuresKHR-srcAccelerationStructure-04629

If the `srcAccelerationStructure` member of any element of
`pInfos` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`srcAccelerationStructure` member **must** be a valid
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-04630) VUID-vkBuildAccelerationStructuresKHR-pInfos-04630

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

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
**must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03699) VUID-vkBuildAccelerationStructuresKHR-pInfos-03699

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03700) VUID-vkBuildAccelerationStructuresKHR-pInfos-03700

For each element of `pInfos`, if its `type` member is
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV), its
`dstAccelerationStructure` member **must** have been created with a
value of [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`type` equal to
either [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03663) VUID-vkBuildAccelerationStructuresKHR-pInfos-03663

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR),
[inactive primitives](#acceleration-structure-inactive-prims) in its
`srcAccelerationStructure` member **must** not be made active

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03664) VUID-vkBuildAccelerationStructuresKHR-pInfos-03664

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), active primitives
in its `srcAccelerationStructure` member **must** not be made
[inactive](#acceleration-structure-inactive-prims)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-None-03407) VUID-vkBuildAccelerationStructuresKHR-None-03407

The `dstAccelerationStructure` member of any element of `pInfos`
**must** not be referenced by the `geometry.instances.data` member of
any element of `pGeometries` or `ppGeometries` with a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other
element of `pInfos`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03701) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03701

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing the `srcAccelerationStructure` member of
any other element of `pInfos` with a `mode` equal to
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), which is accessed
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
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) (including the
same element), which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03706) VUID-vkBuildAccelerationStructuresKHR-dstAccelerationStructure-03706

The range of memory backing the `dstAccelerationStructure` member of
any element of `pInfos` that is accessed by this command **must** not
overlap the memory backing any acceleration structure referenced by the
`geometry.instances.data` member of any element of `pGeometries`
or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) in any other element of
`pInfos`, which is accessed by this command

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03667) VUID-vkBuildAccelerationStructuresKHR-pInfos-03667

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) set in
[VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)::`flags` in the
build

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03668) VUID-vkBuildAccelerationStructuresKHR-pInfos-03668

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` and `dstAccelerationStructure`
members **must** either be the same [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR), or
not have any [memory aliasing](resources.html#resources-memory-aliasing)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03758) VUID-vkBuildAccelerationStructuresKHR-pInfos-03758

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`geometryCount` member **must** have the same value which was specified
when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03759) VUID-vkBuildAccelerationStructuresKHR-pInfos-03759

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `flags`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03760) VUID-vkBuildAccelerationStructuresKHR-pInfos-03760

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its `type`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03761) VUID-vkBuildAccelerationStructuresKHR-pInfos-03761

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `geometryType`
member **must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03762) VUID-vkBuildAccelerationStructuresKHR-pInfos-03762

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, its `flags` member
**must** have the same value which was specified when
`srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03763) VUID-vkBuildAccelerationStructuresKHR-pInfos-03763

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.vertexFormat` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03764) VUID-vkBuildAccelerationStructuresKHR-pInfos-03764

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.maxVertex` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03765) VUID-vkBuildAccelerationStructuresKHR-pInfos-03765

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), its
`geometry.triangles.indexType` member **must** have the same value
which was specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03766) VUID-vkBuildAccelerationStructuresKHR-pInfos-03766

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was `NULL` when
`srcAccelerationStructure` was last built, then it **must** be `NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03767) VUID-vkBuildAccelerationStructuresKHR-pInfos-03767

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if its
`geometry.triangles.transformData` address was not `NULL` when
`srcAccelerationStructure` was last built, then it **must** not be
`NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10898) VUID-vkBuildAccelerationStructuresKHR-pInfos-10898

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numTriangles` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10899) VUID-vkBuildAccelerationStructuresKHR-pInfos-10899

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`numVertices` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10900) VUID-vkBuildAccelerationStructuresKHR-pInfos-10900

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxPrimitiveIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10901) VUID-vkBuildAccelerationStructuresKHR-pInfos-10901

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`maxGeometryIndex` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10902) VUID-vkBuildAccelerationStructuresKHR-pInfos-10902

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`format` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10903) VUID-vkBuildAccelerationStructuresKHR-pInfos-10903

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV), the
`dataSize` member of the
`VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX`
structure in the `pNext` chain **must** have the same value which was
specified when `srcAccelerationStructure` was last built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03768) VUID-vkBuildAccelerationStructuresKHR-pInfos-03768

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
`VkAccelerationStructureGeometryKHR` structure referred to by its
`pGeometries` or `ppGeometries` members, if `geometryType`
is [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), and
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
then the value of each index referenced **must** be the same as the
corresponding index value when `srcAccelerationStructure` was last
built

* 
[](#VUID-vkBuildAccelerationStructuresKHR-primitiveCount-03769) VUID-vkBuildAccelerationStructuresKHR-primitiveCount-03769

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), then for each
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
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), the corresponding
`ppBuildRangeInfos`[i][j].`primitiveCount` **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxInstanceCount`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10126) VUID-vkBuildAccelerationStructuresKHR-pInfos-10126

For each `pInfos`[i], `dstAccelerationStructure` **must** have been
created with a value of
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`size` greater than or
equal to either:

the memory size required by the build operation, as returned by
[vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR) with
`pBuildInfo` = `pInfos`[i] and with each element of the
`pMaxPrimitiveCounts` array greater than or equal to the equivalent
`ppBuildRangeInfos`[i][j].`primitiveCount` values for `j` in
[0,`pInfos`[i].`geometryCount`) or,

* 
the result of querying the corresponding
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), if
updating a compacted acceleration structure

[](#VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676) VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-03676

Each element of `ppBuildRangeInfos`[i] **must** be a valid pointer to
an array of `pInfos`[i].`geometryCount`
`VkAccelerationStructureBuildRangeInfoKHR` structures
, or `NULL`

[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10906) VUID-vkBuildAccelerationStructuresKHR-pInfos-10906

For each element of `pInfos`[i] whose `pGeometries` or
`ppGeometries` members have a `geometryType` of
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV),
`ppBuildRangeInfos`[i] **must** be `NULL`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-03678) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11703) VUID-vkBuildAccelerationStructuresKHR-pInfos-11703

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03722) VUID-vkBuildAccelerationStructuresKHR-pInfos-03722

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to host-visible device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11706) VUID-vkBuildAccelerationStructuresKHR-pInfos-11706

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), its
`srcAccelerationStructure` member **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03723) VUID-vkBuildAccelerationStructuresKHR-pInfos-03723

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) the `buffer`
used to create its `srcAccelerationStructure` member **must** be bound
to host-visible device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11704) VUID-vkBuildAccelerationStructuresKHR-pInfos-11704

For each element of `pInfos`, the acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03724) VUID-vkBuildAccelerationStructuresKHR-pInfos-03724

For each element of `pInfos`, each acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) **must** be bound to host-visible
device memory

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-12244) VUID-vkBuildAccelerationStructuresKHR-pInfos-12244

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the `buildScratchSize`
member of the [VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure
returned from a call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR)
with an identical [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)
structure and primitive count

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-12245) VUID-vkBuildAccelerationStructuresKHR-pInfos-12245

If `pInfos`[i].`mode` is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR), and N is not `0`,
all addresses between `pInfos`[i].`scratchData.hostAddress` and
`pInfos`[i].`scratchData.hostAddress` +  N - 1 **must**
be valid host memory, where N is given by the `updateScratchSize`
member of the [VkAccelerationStructureBuildSizesInfoKHR](resources.html#VkAccelerationStructureBuildSizesInfoKHR) structure
returned from a call to [vkGetAccelerationStructureBuildSizesKHR](resources.html#vkGetAccelerationStructureBuildSizesKHR)
with an identical [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR)
structure and primitive count

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03771) VUID-vkBuildAccelerationStructuresKHR-pInfos-03771

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV),
`geometry.triangles.vertexData.hostAddress` **must** be a valid host
address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03772) VUID-vkBuildAccelerationStructuresKHR-pInfos-03772

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.indexType` is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType),
`geometry.triangles.indexData.hostAddress` **must** be a valid host
address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03773) VUID-vkBuildAccelerationStructuresKHR-pInfos-03773

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if
`geometry.triangles.transformData.hostAddress` is not `0`, it **must**
be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03774) VUID-vkBuildAccelerationStructuresKHR-pInfos-03774

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV), `geometry.aabbs.data.hostAddress`
**must** be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03775) VUID-vkBuildAccelerationStructuresKHR-pInfos-03775

For each element of `pInfos`, its `dstAccelerationStructure`
member **must** be bound to memory that was not allocated with multiple
instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03776) VUID-vkBuildAccelerationStructuresKHR-pInfos-03776

For each element of `pInfos`, if its `mode` member is
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#VkBuildAccelerationStructureModeKHR) the `buffer`
used to create its `srcAccelerationStructure` member **must** be bound
to memory that was not allocated with multiple instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03777) VUID-vkBuildAccelerationStructuresKHR-pInfos-03777

For each element of `pInfos`, each acceleration structure referenced
by the `geometry.instances.data` member of any element of
`pGeometries` or `ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) **must** be bound to memory that was
not allocated with multiple instances

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03778) VUID-vkBuildAccelerationStructuresKHR-pInfos-03778

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV),
`geometry.instances.data.hostAddress` **must** be a valid host address

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-03779) VUID-vkBuildAccelerationStructuresKHR-pInfos-03779

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV), each
[VkAccelerationStructureInstanceKHR](#VkAccelerationStructureInstanceKHR)::`accelerationStructureReference`
value in `geometry.instances.data.hostAddress` **must** be a valid
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-04930) VUID-vkBuildAccelerationStructuresKHR-pInfos-04930

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_INSTANCES_KHR](resources.html#VkGeometryTypeNV) with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](resources.html#VkBuildAccelerationStructureFlagBitsNV) set, each
`accelerationStructureReference` in any structure in
[VkAccelerationStructureMotionInstanceNV](#VkAccelerationStructureMotionInstanceNV) value in
`geometry.instances.data.hostAddress` **must** be a valid
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11820) VUID-vkBuildAccelerationStructuresKHR-pInfos-11820

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureGeometryMotionTrianglesDataNV](#VkAccelerationStructureGeometryMotionTrianglesDataNV) in the
`geometry.triangles.pNext` chain, then its
`vertexData.hostAddress` **must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10892) VUID-vkBuildAccelerationStructuresKHR-pInfos-10892

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.hostAddress`
**must** be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11821) VUID-vkBuildAccelerationStructuresKHR-pInfos-11821

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV), if there is an instance of
[VkAccelerationStructureTrianglesOpacityMicromapEXT](#VkAccelerationStructureTrianglesOpacityMicromapEXT) in the
`geometry.triangles.pNext` chain, and its `indexType` is not
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexBuffer.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11822) VUID-vkBuildAccelerationStructuresKHR-pInfos-11822

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
[VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.hostAddress` **must**
be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11823) VUID-vkBuildAccelerationStructuresKHR-pInfos-11823

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`indexType` is
not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11824) VUID-vkBuildAccelerationStructuresKHR-pInfos-11824

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`vertexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11825) VUID-vkBuildAccelerationStructuresKHR-pInfos-11825

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometrySpheresDataNV](#VkAccelerationStructureGeometrySpheresDataNV)::`radiusData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11826) VUID-vkBuildAccelerationStructuresKHR-pInfos-11826

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its `indexData.hostAddress`
**must** be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11827) VUID-vkBuildAccelerationStructuresKHR-pInfos-11827

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`indexType`
is not [VK_INDEX_TYPE_NONE_KHR](drawing.html#VkIndexType), then its
`indexData.hostAddress` **must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11828) VUID-vkBuildAccelerationStructuresKHR-pInfos-11828

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`vertexData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-11829) VUID-vkBuildAccelerationStructuresKHR-pInfos-11829

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries` with a `geometryType` of
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](resources.html#VkGeometryTypeNV),
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](#VkAccelerationStructureGeometryLinearSweptSpheresDataNV)::`radiusData.hostAddress`
**must** not be 0

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-10893) VUID-vkBuildAccelerationStructuresKHR-pInfos-10893

For each element of `pInfos`[i].`pGeometries` or
`pInfos`[i].`ppGeometries`, `geometryType` **must** not be
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](resources.html#VkGeometryTypeNV)

Valid Usage (Implicit)

* 
[](#VUID-vkBuildAccelerationStructuresKHR-device-parameter) VUID-vkBuildAccelerationStructuresKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parameter) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkBuildAccelerationStructuresKHR-pInfos-parameter) VUID-vkBuildAccelerationStructuresKHR-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkAccelerationStructureBuildGeometryInfoKHR](#VkAccelerationStructureBuildGeometryInfoKHR) structures

* 
[](#VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter) VUID-vkBuildAccelerationStructuresKHR-ppBuildRangeInfos-parameter

 `ppBuildRangeInfos` **must** be a valid pointer to an array of `infoCount` [VkAccelerationStructureBuildRangeInfoKHR](#VkAccelerationStructureBuildRangeInfoKHR) structures

* 
[](#VUID-vkBuildAccelerationStructuresKHR-infoCount-arraylength) VUID-vkBuildAccelerationStructuresKHR-infoCount-arraylength

 `infoCount` **must** be greater than `0`

* 
[](#VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parent) VUID-vkBuildAccelerationStructuresKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To copy or compact an acceleration structure on the host, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyAccelerationStructureKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyAccelerationStructureInfoKHR*   pInfo);

* 
`device` is the device which owns the acceleration structures.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyAccelerationStructureInfoKHR](#VkCopyAccelerationStructureInfoKHR)
structure defining the copy operation.

This command fulfills the same task as
[vkCmdCopyAccelerationStructureKHR](#vkCmdCopyAccelerationStructureKHR) but is executed by the host.

Valid Usage

* 
[](#VUID-vkCopyAccelerationStructureKHR-accelerationStructureHostCommands-03582) VUID-vkCopyAccelerationStructureKHR-accelerationStructureHostCommands-03582

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-03678) VUID-vkCopyAccelerationStructureKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03727) VUID-vkCopyAccelerationStructureKHR-buffer-03727

`pInfo->src` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03728) VUID-vkCopyAccelerationStructureKHR-buffer-03728

`pInfo->dst` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03780) VUID-vkCopyAccelerationStructureKHR-buffer-03780

`pInfo->src` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03781) VUID-vkCopyAccelerationStructureKHR-buffer-03781

`pInfo->dst` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureKHR-src-11588) VUID-vkCopyAccelerationStructureKHR-src-11588

`pInfo->src` **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

* 
[](#VUID-vkCopyAccelerationStructureKHR-dst-11589) VUID-vkCopyAccelerationStructureKHR-dst-11589

`pInfo->dst` **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyAccelerationStructureKHR-device-parameter) VUID-vkCopyAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-parameter) VUID-vkCopyAccelerationStructureKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyAccelerationStructureKHR-pInfo-parameter) VUID-vkCopyAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureInfoKHR](#VkCopyAccelerationStructureInfoKHR) structure

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-parent) VUID-vkCopyAccelerationStructureKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To copy host accessible memory to an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyMemoryToAccelerationStructureKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMemoryToAccelerationStructureInfoKHR* pInfo);

* 
`device` is the device which owns `pInfo->dst`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a
[VkCopyMemoryToAccelerationStructureInfoKHR](#VkCopyMemoryToAccelerationStructureInfoKHR) structure defining the
copy operation.

This command fulfills the same task as
[vkCmdCopyMemoryToAccelerationStructureKHR](#vkCmdCopyMemoryToAccelerationStructureKHR) but is executed by the host.

This command can accept acceleration structures produced by either
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR) or
[vkCopyAccelerationStructureToMemoryKHR](#vkCopyAccelerationStructureToMemoryKHR).

Valid Usage

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-accelerationStructureHostCommands-03583) VUID-vkCopyMemoryToAccelerationStructureKHR-accelerationStructureHostCommands-03583

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-03678) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03729) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03729

`pInfo->src.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03750) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03750

`pInfo->src.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03730) VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03730

`pInfo->dst` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03782) VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03782

`pInfo->dst` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-dst-11677) VUID-vkCopyMemoryToAccelerationStructureKHR-dst-11677

`pInfo->dst` **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-device-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToAccelerationStructureInfoKHR](#VkCopyMemoryToAccelerationStructureInfoKHR) structure

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parent) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To copy an acceleration structure to host accessible memory, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyAccelerationStructureToMemoryKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyAccelerationStructureToMemoryInfoKHR* pInfo);

* 
`device` is the device which owns `pInfo->src`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) to
[request deferral](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a
[VkCopyAccelerationStructureToMemoryInfoKHR](#VkCopyAccelerationStructureToMemoryInfoKHR) structure defining the
copy operation.

This command fulfills the same task as
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR) but is executed by the host.

This command produces the same results as
[vkCmdCopyAccelerationStructureToMemoryKHR](#vkCmdCopyAccelerationStructureToMemoryKHR), but writes its result
directly to a host pointer, and is executed on the host rather than the
device.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToAccelerationStructureKHR](#vkCmdCopyMemoryToAccelerationStructureKHR) or
[vkCopyMemoryToAccelerationStructureKHR](#vkCopyMemoryToAccelerationStructureKHR).

Valid Usage

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-accelerationStructureHostCommands-03584) VUID-vkCopyAccelerationStructureToMemoryKHR-accelerationStructureHostCommands-03584

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-03678) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03731) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03731

`pInfo->src` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03732) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03732

`pInfo->dst.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03751) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03751

`pInfo->dst.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-buffer-03783) VUID-vkCopyAccelerationStructureToMemoryKHR-buffer-03783

`pInfo->src` **must** not be bound to memory that was allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-src-11678) VUID-vkCopyAccelerationStructureToMemoryKHR-src-11678

`pInfo->src` **must** have been created with
[vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-device-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureToMemoryInfoKHR](#VkCopyAccelerationStructureToMemoryInfoKHR) structure

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parent) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To query acceleration structure size parameters on the host, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkWriteAccelerationStructuresPropertiesKHR(
    VkDevice                                    device,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureKHR*           pAccelerationStructures,
    VkQueryType                                 queryType,
    size_t                                      dataSize,
    void*                                       pData,
    size_t                                      stride);

* 
`device` is the device which owns the acceleration structures in
`pAccelerationStructures`.

* 
`accelerationStructureCount` is the count of acceleration structures
for which to query the property.

* 
`pAccelerationStructures` is a pointer to an array of existing
previously built acceleration structures.

* 
`queryType` is a [VkQueryType](queries.html#VkQueryType) value specifying the property to
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
[vkCmdWriteAccelerationStructuresPropertiesKHR](#vkCmdWriteAccelerationStructuresPropertiesKHR) but is executed by the
host.

Valid Usage

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureHostCommands-03585) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureHostCommands-03585

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06742) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06742

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](queries.html#VkQueryType),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03448) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03448

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), then
`stride` **must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03449) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03449

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](queries.html#VkQueryType), then
`pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03450) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03450

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType), then
`stride` **must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03451) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03451

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](queries.html#VkQueryType), then
`pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06731) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06731

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](queries.html#VkQueryType), then `stride`
**must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06732) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06732

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](queries.html#VkQueryType), then `pData`
**must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06733) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06733

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType),
then `stride` **must** be a multiple of the size of
`VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06734) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06734

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType),
then `pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-03452) VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-03452

`dataSize` **must** be greater than or equal to
`accelerationStructureCount`*`stride`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03733) VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03733

Each element of `pAccelerationStructures` **must** be bound to
host-visible device memory

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-11592) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-11592

Each acceleration structure in `pAccelerationStructures` **must** have
been created with [vkCreateAccelerationStructureKHR](resources.html#vkCreateAccelerationStructureKHR)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03784) VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03784

Each element of `pAccelerationStructures` **must** be bound to memory
that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-device-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handles

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](queries.html#VkQueryType) value

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pData-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-arraylength) VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parent) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parent

 Each element of `pAccelerationStructures` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)
