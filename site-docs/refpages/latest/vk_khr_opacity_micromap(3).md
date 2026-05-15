# VK_KHR_opacity_micromap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_opacity_micromap.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_opacity_micromap](#VK_KHR_opacity_micromap)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Reference Code](#_reference_code)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_opacity_micromap - device extension

**Name String**

`VK_KHR_opacity_micromap`

**Extension Type**

Device extension

**Registered Extension Number**

624

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

and

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_EXT_shader_object

* 
Interacts with VK_KHR_maintenance5

**SPIR-V Dependencies**

* 
[SPV_EXT_opacity_micromap](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_opacity_micromap.html)

* 
[SPV_KHR_opacity_micromap](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_opacity_micromap.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_opacity_micromap] @mnetsch%0A*Here describe the issue or question you have about the VK_KHR_opacity_micromap extension*)

**Extension Proposal**

[VK_KHR_opacity_micromap](../../../../features/latest/features/proposals/VK_KHR_opacity_micromap.html)

**Last Modified Date**

2026-05-08

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_opacity_micromap`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_opacity_micromap.txt)

* 
This extension provides API support for
[`GLSL_EXT_opacity_micromap_ray_query_mode`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_opacity_micromap_ray_query_mode.txt)

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Aleksandra Krstic, Qualcomm Technologies, Inc

* 
Eric Werness, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Stu Smith, AMD

* 
Sven Woop, Intel

* 
Anton Berko, MediaTek

* 
Radoslaw Drabinski, Intel

* 
Simon Fenney, Imagination Technologies

* 
Andrew Garrard, Imagination Technologies

* 
Dae Kim, Imagination Technologies

* 
Fred Saucedo, Qualcomm Technologies, Inc

* 
Ramesh babu Admimula, Qualcomm Technologies, Inc

* 
Zedian Zhang, Qualcomm Technologies, Inc

* 
Hans-Kristian Arntzen, Valve

* 
Vikram Kushwaha, NVIDIA

* 
Spencer Fricke, LunarG

* 
Revanth Ponna, Qualcomm Technologies, Inc

* 
Contributors to `[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)`

When adding transparency to a ray traced scene, an application can choose
between further tessellating the geometry or using an any-hit shader to
allow the ray through specific parts of the geometry.
These options have the downside of either significantly increasing memory
consumption or adding runtime overhead to run shader code in the middle of
traversal, respectively.

This extension adds the ability to add an *opacity micromap* to geometry
when building an acceleration structure.
The opacity micromap compactly encodes opacity information which can be read
by the implementation to mark parts of triangles as opaque or transparent.
The format is externally visible to allow the application to compress its
internal geometry and surface representations into the compressed format
ahead of time.
The compressed format subdivides each triangle into a set of subtriangles,
each of which can be assigned either two or four opacity values.
These opacity values can control if a ray hitting that subtriangle is
treated as an opaque hit, complete miss, or possible hit, depending on the
controls described in [Ray Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

This extension provides:

* 
the ability to create micromaps as [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html)
structures

* 
the ability to build, copy, and query micromaps with the acceleration
structure functions, and

* 
a structure to extend
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) to attach a
micromap to the geometry of the acceleration structure.

* 
[VkMicromapTriangleKHR](VkMicromapTriangleKHR.html)

* 
[VkMicromapUsageKHR](VkMicromapUsageKHR.html)

* 
Extending [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html):

[VkAccelerationStructureGeometryMicromapDataKHR](VkAccelerationStructureGeometryMicromapDataKHR.html)

Extending [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html), [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html):

* 
[VkAccelerationStructureTrianglesOpacityMicromapKHR](VkAccelerationStructureTrianglesOpacityMicromapKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceOpacityMicromapFeaturesKHR](VkPhysicalDeviceOpacityMicromapFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceOpacityMicromapPropertiesKHR](VkPhysicalDeviceOpacityMicromapPropertiesKHR.html)

* 
[VkAccelerationStructureSerializedBlockTypeKHR](VkAccelerationStructureSerializedBlockTypeKHR.html)

* 
[VkOpacityMicromapFormatKHR](VkOpacityMicromapFormatKHR.html)

* 
[VkOpacityMicromapSpecialIndexKHR](VkOpacityMicromapSpecialIndexKHR.html)

* 
`VK_KHR_OPACITY_MICROMAP_EXTENSION_NAME`

* 
`VK_KHR_OPACITY_MICROMAP_SPEC_VERSION`

* 
Extending [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html):

[VK_ACCELERATION_STRUCTURE_TYPE_OPACITY_MICROMAP_KHR](VkAccelerationStructureTypeKHR.html)

Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MICROMAP_LOSSY_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html):

* 
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_KHR](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_KHR](VkGeometryInstanceFlagBitsKHR.html)

Extending [VkGeometryTypeKHR](VkGeometryTypeKHR.html):

* 
[VK_GEOMETRY_TYPE_MICROMAP_KHR](VkGeometryTypeKHR.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MICROMAP_DATA_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_PROPERTIES_KHR](VkStructureType.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_KHR_maintenance5](VK_KHR_maintenance5.html) or [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_OPACITY_MICROMAP_DISALLOW_MIXED_SPECIAL_INDEX_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_KHR](VkPipelineCreateFlagBits2.html)

The following code illustrates an algorithm that converts the barycentric
coordinates inside a triangle into an OMM array index:

uint32_t BarycentricsToSpaceFillingCurveIndex(float u, float v, uint32_t level)
{
    u = clamp(u, 0.0f, 1.0f);
    v = clamp(v, 0.0f, 1.0f);

    uint32_t iu, iv, iw;

    // Quantize barycentric coordinates
    float fu = u * (1u = (1u = (1u = (1u = 1.0f && iuv > 1u;
    f ^= f >> 2u;
    f ^= f >> 4u;
    f ^= f >> 8u;
    uint32_t b1 = ((f ^ iu) & ~b0) | t;

    // Interleave bits
    b0 = (b0 | (b0 

(1) Is the build actually similar to an acceleration structure build?

* 
Resolved: The build should be much lighter-weight than an acceleration
structure build

(2) Why does VkMicromapUsageKHR not have type/pNext?

* 
Resolved: There can be a very large number of these structures, so
doubling the size of these can be significant memory consumption.
Also, an application may be loading these directly from a file which is
more compatible with it being a flat structure.
The including structures are extensible and are probably a more suitable
place to add extensibility.

(3) Why is there a SPIR-V extension?

* 
Resolved: There is a ray flag and an execution mode.
To be consistent with how the existing ray tracing extensions work that
these needs its own extension.

(4) Should there be indirect micromap build?

* 
Resolved: Not for now.
There is more in-depth usage metadata required and it seems less likely
that something like a GPU culling system would need to change the counts
for a micromap.

(5) Should the feature struct be aliased with
VkPhysicalDeviceOpacityMicromapFeaturesEXT?

* 
Resolved: No.
This extension is not an exact promotion of
`[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)` and provides significantly different
functionality.

(6) Should micromaps API be similar to the `[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)`?

`[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)` introduced almost an identical set of
functionality for micromaps as acceleration structures.
Should this promotion fold in micromaps as an acceleration structure type?

* 
Resolved: Yes.
While this is significant API breakage from the EXT, it is a better
design choice going forward and can eliminate significant API surface
area if promoted in the future.

(7) Should micromaps support host commands?

* 
Resolved: No.
Host commands are deprecated and not widely supported.

(8) Should [vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html) be used to create
micromaps?

This interface that uses [VkBuffer](VkBuffer.html) to back micromaps is deprecated, but
is still available for acceleration structure object creation.

* 
Resolved: No.
Make a new entry point that uses a device address to back micromaps and
other acceleration structures instead of a buffer.
Eliminate the ability to provide a separate capture/replay address as
well.
Top-level acceleration structures **must** reference the device address
that backs the bottom-level acceleration structures and implementations
**must** not expose an indirect handle.

(9) Should
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
be promoted from `[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)` to this extension?

[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)
distinguished between replacing a micromap with one of a different shape
([VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html))
and replacing one where the shape is identical and only the opacity values
have changed (DATA_UPDATE).
The DATA_UPDATE flag was correlated with the discardable micromap feature,
where an implementation might embed micromap state directly in the
acceleration structure and exploit the tighter constraint to avoid a full
rebuild.
However, the spec never required DATA_UPDATE to be restricted to discardable
micromaps, and it was already legal to treat DATA_UPDATE identically to
UPDATE.

* 
Resolved: No.
The discardable micromap feature is not promoted to this extension,
removing the primary motivation for DATA_UPDATE.
No implementation identified a meaningful optimization from the stricter
constraint beyond what UPDATE already provides, and no CTS coverage
existed for either opacity micromap update flag in the EXT.
Removing it is a pure API simplification with no functional loss.
Applications must still perform a BLAS build update when opacity
micromap data changes, even if only values and not structure have
changed.

* 
Revision 1, 2026-05-08 (Matthew Netsch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_opacity_micromap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
