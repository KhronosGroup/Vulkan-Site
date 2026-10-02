# VK_KHR_ray_tracing_position_fetch(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_ray_tracing_position_fetch.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_ray_tracing_position_fetch](#VK_KHR_ray_tracing_position_fetch)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_ray_tracing_position_fetch - device extension

**Name String**

`VK_KHR_ray_tracing_position_fetch`

**Extension Type**

Device extension

**Registered Extension Number**

482

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_ray_tracing_position_fetch](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_tracing_position_fetch.html)

**Contact**

* 
Eric Werness

**Extension Proposal**

[VK_KHR_ray_tracing_position_fetch](../../../../features/latest/features/proposals/VK_KHR_ray_tracing_position_fetch.html)

**Last Modified Date**

2023-02-17

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_ray_tracing_position_fetch`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_tracing_position_fetch.txt)

* 
Interacts with `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)`

* 
Interacts with `[VK_KHR_ray_query](VK_KHR_ray_query.html)`

**Contributors**

* 
Eric Werness, NVIDIA

* 
Stu Smith, AMD

* 
Yuriy O’Donnell, Epic Games

* 
Ralph Potter, Samsung

* 
Joshua Barczak, Intel

* 
Lionel Landwerlin, Intel

* 
Andrew Garrard, Imagination Technologies

* 
Alex Bourd, Qualcomm

* 
Yunpeng Zhu, Huawei Technologies

* 
Marius Bjorge, Arm

* 
Daniel Koch, NVIDIA

`VK_KHR_ray_tracing_position_fetch` adds the ability to fetch the vertex
positions in the shader from a hit triangle as stored in the acceleration
structure.

An application adds
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) to the
acceleration structure at build time.
Then, if the hit is a triangle geometry, the shader (any-hit or closest hit
for ray pipelines or using ray query) **can** fetch the three, three-component
vertex positions in object space, of the triangle which was hit.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR](VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR.html)

* 
`VK_KHR_RAY_TRACING_POSITION_FETCH_EXTENSION_NAME`

* 
`VK_KHR_RAY_TRACING_POSITION_FETCH_SPEC_VERSION`

* 
Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_POSITION_FETCH_FEATURES_KHR](VkStructureType.html)

* 
[`HitTriangleVertexPositionsKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hittrianglevertexpositions)

* 
[RayTracingPositionFetchKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingPositionFetchKHR)

* 
[RayQueryPositionFetchKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayQueryPositionFetchKHR)

None Yet!

* 
Revision 1, 2023-02-17 (Eric Werness)

internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_ray_tracing_position_fetch).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
