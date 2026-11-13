# VK_KHR_ray_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_ray_query.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_ray_query](#VK_KHR_ray_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Sample Code](#_sample_code)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_ray_query - device extension

**Name String**

`VK_KHR_ray_query`

**Extension Type**

Device extension

**Registered Extension Number**

349

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_spirv_1_4](VK_KHR_spirv_1_4.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

and

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_ray_query](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_query.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_ray_query] @dgkoch%0A*Here describe the issue or question you have about the VK_KHR_ray_query extension*)

**Last Modified Date**

2020-11-12

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_ray_query`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_query.txt)

**Contributors**

* 
Matthäus Chajdas, AMD

* 
Greg Grebe, AMD

* 
Nicolai Hähnle, AMD

* 
Tobias Hector, AMD

* 
Dave Oldcorn, AMD

* 
Skyler Saleh, AMD

* 
Mathieu Robart, Arm

* 
Marius Bjorge, Arm

* 
Tom Olson, Arm

* 
Sebastian Tafuri, EA

* 
Henrik Rydgard, Embark

* 
Juan Cañada, Epic Games

* 
Patrick Kelly, Epic Games

* 
Yuriy O’Donnell, Epic Games

* 
Michael Doggett, Facebook/Oculus

* 
Andrew Garrard, Imagination

* 
Don Scorgie, Imagination

* 
Dae Kim, Imagination

* 
Joshua Barczak, Intel

* 
Slawek Grajewski, Intel

* 
Jeff Bolz, NVIDIA

* 
Pascal Gautron, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Ashwin Lele, NVIDIA

* 
Robert Stepinski, NVIDIA

* 
Martin Stich, NVIDIA

* 
Nuno Subtil, NVIDIA

* 
Eric Werness, NVIDIA

* 
Jon Leech, Khronos

* 
Jeroen van Schijndel, OTOY

* 
Juul Joosten, OTOY

* 
Alex Bourd, Qualcomm

* 
Roman Larionov, Qualcomm

* 
David McAllister, Qualcomm

* 
Spencer Fricke, Samsung

* 
Lewis Gordon, Samsung

* 
Ralph Potter, Samsung

* 
Jasper Bekkers, Traverse Research

* 
Jesse Barker, Unity

* 
Baldur Karlsson, Valve

Rasterization has been the dominant method to produce interactive graphics,
but increasing performance of graphics hardware has made ray tracing a
viable option for interactive rendering.
Being able to integrate ray tracing with traditional rasterization makes it
easier for applications to incrementally add ray traced effects to existing
applications or to do hybrid approaches with rasterization for primary
visibility and ray tracing for secondary queries.

Ray queries are available to all shader types, including graphics, compute,
and ray tracing pipelines.
Ray queries are not able to launch additional shaders, instead returning
traversal results to the calling shader.

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_ray_query`

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayQueryFeaturesKHR](VkPhysicalDeviceRayQueryFeaturesKHR.html)

* 
`VK_KHR_RAY_QUERY_EXTENSION_NAME`

* 
`VK_KHR_RAY_QUERY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_QUERY_FEATURES_KHR](VkStructureType.html)

* 
[`RayQueryKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryKHR)

* 
[    `RayTraversalPrimitiveCullingKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTraversalPrimitiveCullingKHR)

Example of ray query in a GLSL shader, illustrating how to use ray queries
to determine whether a given position (at ray origin) is in shadow or not,
by tracing a ray towards the light, and checking for any intersections with
geometry occluding the light.

rayQueryEXT rq;

rayQueryInitializeEXT(rq, accStruct, gl_RayFlagsTerminateOnFirstHitEXT, cullMask, origin, tMin, direction, tMax);

// Traverse the acceleration structure and store information about the first intersection (if any)
rayQueryProceedEXT(rq);

if (rayQueryGetIntersectionTypeEXT(rq, true) == gl_RayQueryCommittedIntersectionNoneEXT) {
    // Not in shadow
}

(1) What are the changes between the public provisional (VK_KHR_ray_tracing
v8) release and the final (VK_KHR_acceleration_structure v11 /
VK_KHR_ray_query v1) release?

* 
refactor VK_KHR_ray_tracing into 3 extensions, enabling implementation
flexibility and decoupling ray query support from ray pipelines:

`[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` (for acceleration structure
operations)

* 
`[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` (for ray tracing pipeline and
shader stages)

* 
`[VK_KHR_ray_query](#)` (for ray queries in existing shader stages)

Update SPIRV capabilities to use `RayQueryKHR`

extension is no longer provisional

* 
Revision 1, 2020-11-12 (Mathieu Robart, Daniel Koch, Andrew Garrard)

Decomposition of the specification, from VK_KHR_ray_tracing to
VK_KHR_ray_query (#1918,!3912)

* 
update to use `RayQueryKHR` SPIR-V capability

* 
add numerical limits for ray parameters (#2235,!3960)

* 
relax formula for ray intersection candidate determination
(#2322,!4080)

* 
restrict traces to TLAS (#2239,!4141)

* 
require `HitT` to be in ray interval for
`OpRayQueryGenerateIntersectionKHR` (#2359,!4146)

* 
add ray query shader stages for AS read bit (#2407,!4203)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_ray_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
