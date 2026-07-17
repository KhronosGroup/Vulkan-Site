# VK_EXT_opacity_micromap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_opacity_micromap.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_opacity_micromap](#VK_EXT_opacity_micromap)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to VK_KHR_opacity_micromap](#_promotion_to_vk_khr_opacity_micromap)
- [Promotion_to_VK_KHR_opacity_micromap](#_promotion_to_vk_khr_opacity_micromap)
- [Reference Code](#opacity-micromap-reference-code)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_opacity_micromap - device extension

**Name String**

`VK_EXT_opacity_micromap`

**Extension Type**

Device extension

**Registered Extension Number**

397

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

     or

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_KHR_maintenance5

**SPIR-V Dependencies**

* 
[SPV_EXT_opacity_micromap](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_opacity_micromap.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html)
extension

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_opacity_micromap] @pixeljetstream%0A*Here describe the issue or question you have about the VK_EXT_opacity_micromap extension*)

* 
Eric Werness

**Extension Proposal**

[VK_EXT_opacity_micromap](../../../../features/latest/features/proposals/VK_EXT_opacity_micromap.html)

**Last Modified Date**

2022-08-24

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_opacity_micromap`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_opacity_micromap.txt)

**Contributors**

* 
Christoph Kubisch, NVIDIA

* 
Eric Werness, NVIDIA

* 
Josh Barczak, Intel

* 
Stu Smith, AMD

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
a [VkMicromapEXT](VkMicromapEXT.html) structure to store the micromap,

* 
functions similar to acceleration structure build functions to build the
opacity micromap array, and

* 
a structure to extend
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) to attach a
micromap to the geometry of the acceleration structure.

* 
[VkMicromapEXT](VkMicromapEXT.html)

* 
[vkBuildMicromapsEXT](vkBuildMicromapsEXT.html)

* 
[vkCmdBuildMicromapsEXT](vkCmdBuildMicromapsEXT.html)

* 
[vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html)

* 
[vkCmdCopyMicromapEXT](vkCmdCopyMicromapEXT.html)

* 
[vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html)

* 
[vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html)

* 
[vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html)

* 
[vkCopyMicromapEXT](vkCopyMicromapEXT.html)

* 
[vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html)

* 
[vkCreateMicromapEXT](vkCreateMicromapEXT.html)

* 
[vkDestroyMicromapEXT](vkDestroyMicromapEXT.html)

* 
[vkGetDeviceMicromapCompatibilityEXT](vkGetDeviceMicromapCompatibilityEXT.html)

* 
[vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html)

* 
[vkWriteMicromapsPropertiesEXT](vkWriteMicromapsPropertiesEXT.html)

* 
[VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html)

* 
[VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html)

* 
[VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html)

* 
[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)

* 
[VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html)

* 
[VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)

* 
[VkMicromapTriangleEXT](VkMicromapTriangleKHR.html)

* 
[VkMicromapUsageEXT](VkMicromapUsageEXT.html)

* 
[VkMicromapVersionInfoEXT](VkMicromapVersionInfoEXT.html)

* 
Extending [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html), [VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html):

[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceOpacityMicromapFeaturesEXT](VkPhysicalDeviceOpacityMicromapFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceOpacityMicromapPropertiesEXT](VkPhysicalDeviceOpacityMicromapPropertiesEXT.html)

* 
[VkBuildMicromapFlagBitsEXT](VkBuildMicromapFlagBitsEXT.html)

* 
[VkBuildMicromapModeEXT](VkBuildMicromapModeEXT.html)

* 
[VkCopyMicromapModeEXT](VkCopyMicromapModeEXT.html)

* 
[VkMicromapCreateFlagBitsEXT](VkMicromapCreateFlagBitsEXT.html)

* 
[VkMicromapTypeEXT](VkMicromapTypeEXT.html)

* 
[VkOpacityMicromapFormatEXT](VkOpacityMicromapFormatKHR.html)

* 
[VkOpacityMicromapSpecialIndexEXT](VkOpacityMicromapSpecialIndexKHR.html)

* 
[VkBuildMicromapFlagsEXT](VkBuildMicromapFlagsEXT.html)

* 
[VkMicromapCreateFlagsEXT](VkMicromapCreateFlagsEXT.html)

* 
`VK_EXT_OPACITY_MICROMAP_EXTENSION_NAME`

* 
`VK_EXT_OPACITY_MICROMAP_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_MICROMAP_STORAGE_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_EXT](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html):

* 
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_EXT](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_EXT](VkGeometryInstanceFlagBitsKHR.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_MICROMAP_EXT](VkObjectType.html)

Extending [VkOpacityMicromapFormatKHR](VkOpacityMicromapFormatKHR.html):

* 
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatKHR.html)

* 
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatKHR.html)

Extending [VkOpacityMicromapSpecialIndexKHR](VkOpacityMicromapSpecialIndexKHR.html):

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT](VkOpacityMicromapSpecialIndexKHR.html)

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT](VkOpacityMicromapSpecialIndexKHR.html)

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT](VkOpacityMicromapSpecialIndexKHR.html)

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT](VkOpacityMicromapSpecialIndexKHR.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html)

* 
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_MICROMAP_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MICROMAP_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MICROMAP_TO_MEMORY_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MICROMAP_BUILD_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MICROMAP_BUILD_SIZES_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MICROMAP_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MICROMAP_VERSION_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_PROPERTIES_EXT](VkStructureType.html)

If [VK_KHR_maintenance5](VK_KHR_maintenance5.html) or [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_MICROMAP_STORAGE_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

Functionality in this extension is included in VK_KHR_opacity_micromap.
The type, enum and command names are still aliases of the KHR functionality
with some exceptions.

While most application-visible functionality is available through both
extensions, two notable differences to be aware of are:

* 
The `hostMicromapCommands` feature and its associated host-side
build, copy, and query commands are only exposed by
[VK_EXT_opacity_micromap](#); those commands are [    legacy](../../../../spec/latest/appendices/legacy.html#legacy-host-builds) and are not included in [VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html).

* 
With [VK_EXT_opacity_micromap](#) enabled, opacity micromap data
present in the acceleration structure is always consumed by shaders.
With the [VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html) `micromap` feature enabled
instead, opacity micromap data is only consumed when the shader declares
the `OpacityMicromapIdKHR` execution mode with its
specialization-constant operand equal to [VK_TRUE](VK_TRUE.html).

See the VK_KHR_opacity_micromap proposal for details on the differences.

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
structure build, but the infrastructure is similar enough that it makes
sense to keep the concepts compatible.

(2) Why does VkMicromapUsageEXT not have type/pNext?

* 
Resolved: There can be a very large number of these structures, so
doubling the size of these can be significant memory consumption.
Also, an application may be loading these directly from a file which is
more compatible with it being a flat structure.
The including structures are extensible and are probably a more suitable
place to add extensibility.

(3) Why is there a SPIR-V extension?

* 
Resolved: There is a ray flag.
To be consistent with how the existing ray tracing extensions work that
ray flag needs its own extension.

(4) Should there be indirect micromap build?

* 
Resolved: Not for now.
There is more in-depth usage metadata required and it seems less likely
that something like a GPU culling system would need to change the counts
for a micromap.

(5) Should micromaps have a micromap device address?

* 
Resolved: There is no need right now (can just use the handle) but that
is a bit different from acceleration structures, though the two are not
completely parallel in their usage.

(6) Why are the alignment requirements defined as a mix of hardcoded values
and caps?

* 
Resolved: This is most parallel with the definition of
`[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` and maintaining commonality makes
it easier for applications to share memory.

* 
Revision 2, 2022-06-22 (Eric Werness)

EXTify and clean up for discussion

Revision 1, 2022-01-01 (Eric Werness)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_opacity_micromap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
