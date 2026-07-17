# VK_KHR_ray_tracing_pipeline(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_ray_tracing_pipeline.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_ray_tracing_pipeline](#VK_KHR_ray_tracing_pipeline)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Sample Code](#_sample_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_ray_tracing_pipeline - device extension

**Name String**

`VK_KHR_ray_tracing_pipeline`

**Extension Type**

Device extension

**Registered Extension Number**

348

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

**API Interactions**

* 
Interacts with VK_KHR_ray_query

**SPIR-V Dependencies**

* 
[SPV_KHR_ray_tracing](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_tracing.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_ray_tracing_pipeline] @dgkoch%0A*Here describe the issue or question you have about the VK_KHR_ray_tracing_pipeline extension*)

**Last Modified Date**

2020-11-12

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_ray_tracing`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_tracing.txt)

* 
This extension interacts with [Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) and
`[VK_KHR_vulkan_memory_model](VK_KHR_vulkan_memory_model.html)`, adding the [    shader-call-related](../../../../spec/latest/appendices/memorymodel.html#shader-call-related) relation of invocations, [    shader-call-order](../../../../spec/latest/appendices/memorymodel.html#shader-call-order) partial order of dynamic instances of instructions,
and the [`ShaderCallKHR`](../../../../spec/latest/chapters/shaders.html#shaders-scope-shadercall) scope.

* 
This extension interacts with `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)`, enabling
pipeline libraries to be used with ray tracing pipelines and enabling
usage of [VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html).

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

To enable ray tracing, this extension adds a few different categories of new
functionality:

* 
A new ray tracing pipeline type with new shader domains: ray generation,
intersection, any-hit, closest hit, miss, and callable

* 
A shader binding indirection table to link shader groups with
acceleration structure items

* 
Ray tracing commands which initiate the ray pipeline traversal and
invocation of the various new shader domains depending on which
traversal conditions are met

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_ray_tracing`

* 
[vkCmdSetRayTracingPipelineStackSizeKHR](vkCmdSetRayTracingPipelineStackSizeKHR.html)

* 
[vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html)

* 
[vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html)

* 
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html)

* 
[vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](vkGetRayTracingCaptureReplayShaderGroupHandlesKHR.html)

* 
[vkGetRayTracingShaderGroupHandlesKHR](vkGetRayTracingShaderGroupHandlesKHR.html)

* 
[vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

* 
[VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html)

* 
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html)

* 
[VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html)

* 
[VkTraceRaysIndirectCommandKHR](VkTraceRaysIndirectCommandKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)

* 
[VkRayTracingShaderGroupTypeKHR](VkRayTracingShaderGroupTypeKHR.html)

* 
[VkShaderGroupShaderKHR](VkShaderGroupShaderKHR.html)

* 
`VK_KHR_RAY_TRACING_PIPELINE_EXTENSION_NAME`

* 
`VK_KHR_RAY_TRACING_PIPELINE_SPEC_VERSION`

* 
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html)

* 
Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html)

Extending [VkDynamicState](VkDynamicState.html):

* 
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html)

Extending [VkPipelineBindPoint](VkPipelineBindPoint.html):

* 
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](VkPipelineBindPoint.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_BUILT_IN_PRIMITIVES_BIT_KHR](VkPipelineCreateFlagBits2.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

Extending [VkShaderStageFlagBits](VkShaderStageFlagBits.html):

* 
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_MISS_BIT_KHR](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_INTERFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_KHR](VkStructureType.html)

* 
[`LaunchIdKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-launchid)

* 
[`LaunchSizeKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-launchsize)

* 
[`WorldRayOriginKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldrayorigin)

* 
[`WorldRayDirectionKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldraydirection)

* 
[`ObjectRayOriginKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objectrayorigin)

* 
[`ObjectRayDirectionKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objectraydirection)

* 
[`RayTminKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raytmin)

* 
[`RayTmaxKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raytmax)

* 
[`InstanceCustomIndexKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-instancecustomindex)

* 
[`InstanceId`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-instanceid)

* 
[`ObjectToWorldKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objecttoworld)

* 
[`WorldToObjectKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldtoobject)

* 
[`HitKindKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitkind)

* 
[`IncomingRayFlagsKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-incomingrayflags)

* 
[`RayGeometryIndexKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raygeometryindex)

* 
(modified)`PrimitiveId`

* 
[`RayTracingKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingKHR)

* 
[    `RayTraversalPrimitiveCullingKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTraversalPrimitiveCullingKHR)

(1) How does this extension differ from VK_NV_ray_tracing?

**DISCUSSION**:

The following is a summary of the main functional differences between
VK_KHR_ray_tracing_pipeline and VK_NV_ray_tracing:

* 
added support for indirect ray tracing ([vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html))

* 
uses SPV_KHR_ray_tracing instead of SPV_NV_ray_tracing

refer to KHR SPIR-V enums instead of NV SPIR-V enums (which are
functionally equivalent and aliased to the same values).

* 
added `RayGeometryIndexKHR` built-in

removed vkCompileDeferredNV compilation functionality and replaced with
[deferred host operations](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations) interactions for
ray tracing

added [VkPhysicalDeviceRayTracingPipelineFeaturesKHR](VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html) structure

extended [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html) structure

* 
renamed `maxRecursionDepth` to `maxRayRecursionDepth` and it
has a minimum of 1 instead of 31

* 
require `shaderGroupHandleSize` to be 32 bytes

* 
added `maxRayDispatchInvocationCount`,
`shaderGroupHandleAlignment` and `maxRayHitAttributeSize`

reworked geometry structures so they could be better shared between
device, host, and indirect builds

changed SBT parameters to a structure and added size
([VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html))

add parameter for requesting memory requirements for host and/or device
build

added [pipeline library](../../../../spec/latest/chapters/pipelines.html#pipelines-library) support for ray tracing

added [watertightness guarantees](../../../../spec/latest/chapters/raytraversal.html#ray-traversal-watertight)

added no-null-shader pipeline flags
(`VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_*_SHADERS_BIT_KHR`)

added [memory model interactions](../../../../spec/latest/chapters/raytracing.html#ray-tracing-shader-call) with ray
tracing and define how subgroups work and can be repacked

(2) Can you give a more detailed comparison of differences and similarities
between VK_NV_ray_tracing and VK_KHR_ray_tracing_pipeline?

**DISCUSSION**:

The following is a more detailed comparison of which commands, structures,
and enums are aliased, changed, or removed.

* 
Aliased functionality — enums, structures, and commands that are
considered equivalent:

[VkRayTracingShaderGroupTypeNV](VkRayTracingShaderGroupTypeKHR.html) ↔
[VkRayTracingShaderGroupTypeKHR](VkRayTracingShaderGroupTypeKHR.html)

* 
[vkGetRayTracingShaderGroupHandlesNV](vkGetRayTracingShaderGroupHandlesKHR.html) ↔
[vkGetRayTracingShaderGroupHandlesKHR](vkGetRayTracingShaderGroupHandlesKHR.html)

Changed enums, structures, and commands:

* 
[VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html) →
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html) (added
`pShaderGroupCaptureReplayHandle`)

* 
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html) →
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html) (changed type of `pGroups`,
added `libraries`, `pLibraryInterface`, and
`pDynamicState`)

* 
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html) →
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html) (renamed
`maxTriangleCount` to `maxPrimitiveCount`, added
`shaderGroupHandleCaptureReplaySize`)

* 
[vkCmdTraceRaysNV](vkCmdTraceRaysNV.html) → [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html) (params to struct)

* 
[vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html) →
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html) (different struct, changed
functionality)

Added enums, structures, and commands:

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html),
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html) to
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html)

* 
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html) structure

* 
[VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html) and [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html)
unions

* 
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) struct

* 
[VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html) struct

* 
[VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html) struct

* 
[vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html) command and
[VkTraceRaysIndirectCommandKHR](VkTraceRaysIndirectCommandKHR.html) struct

* 
[vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](vkGetRayTracingCaptureReplayShaderGroupHandlesKHR.html) (shader group
capture/replay)

* 
[vkCmdSetRayTracingPipelineStackSizeKHR](vkCmdSetRayTracingPipelineStackSizeKHR.html) and
[vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html) commands for stack size
control

Functionality removed:

* 
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[vkCompileDeferredNV](vkCompileDeferredNV.html) command (replaced with
`[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)`)

(3) What are the changes between the public provisional (VK_KHR_ray_tracing
v8) release and the internal provisional (VK_KHR_ray_tracing v9) release?

* 
Require Vulkan 1.1 and SPIR-V 1.4

* 
Added interactions with Vulkan 1.2 and
`[VK_KHR_vulkan_memory_model](VK_KHR_vulkan_memory_model.html)`

* 
added creation time capture and replay flags

added
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)
to [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html)

replace `VkStridedBufferRegionKHR` with
[VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html) and change
[vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html), [vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html), to take these
for the shader binding table and use device addresses instead of
buffers.

require the shader binding table buffers to have the
`VK_BUFFER_USAGE_RAY_TRACING_BIT_KHR` set

make `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)` an interaction instead of required
extension

rename the `libraries` member of
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html) to `pLibraryInfo` and make
it a pointer

make `[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)` an interaction instead of
a required extension (later went back on this)

added explicit stack size management for ray tracing pipelines

* 
removed the `maxCallableSize` member of
[VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html)

* 
added the `pDynamicState` member to
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

* 
added [VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html)
dynamic state for ray tracing pipelines

* 
added [vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html) and
[vkCmdSetRayTracingPipelineStackSizeKHR](vkCmdSetRayTracingPipelineStackSizeKHR.html) commands

* 
added [VkShaderGroupShaderKHR](VkShaderGroupShaderKHR.html) enum

Added `maxRayDispatchInvocationCount` limit to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)

Added `shaderGroupHandleAlignment` property to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)

Added `maxRayHitAttributeSize` property to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)

Clarify deferred host ops for pipeline creation

* 
[VkDeferredOperationKHR](VkDeferredOperationKHR.html) is now a top-level parameter for
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html)

* 
removed `VkDeferredOperationInfoKHR` structure

* 
change deferred host creation/return parameter behavior such that the
implementation can modify such parameters until the deferred host
operation completes

* 
`[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)` is required again

(4) What are the changes between the internal provisional
(VK_KHR_ray_tracing v9) release and the final (VK_KHR_acceleration_structure
v11 / VK_KHR_ray_tracing_pipeline v1) release?

* 
refactor VK_KHR_ray_tracing into 3 extensions, enabling implementation
flexibility and decoupling ray query support from ray pipelines:

`[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` (for acceleration structure
operations)

* 
`[VK_KHR_ray_tracing_pipeline](#)` (for ray tracing pipeline and
shader stages)

* 
`[VK_KHR_ray_query](VK_KHR_ray_query.html)` (for ray queries in existing shader stages)

Require `Volatile` for the following builtins in the ray generation,
closest hit, miss, intersection, and callable shader stages:

* 
`SubgroupSize`, `SubgroupLocalInvocationId`, `SubgroupEqMask`,
`SubgroupGeMask`, `SubgroupGtMask`, `SubgroupLeMask`,
`SubgroupLtMask`

* 
`SMIDNV`, `WarpIDNV`

clarify buffer usage flags for ray tracing

* 
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) is added as an alias
of [VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) and is required on shader
binding table buffers

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) is used in
`[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` for `scratchData`

rename `maxRecursionDepth` to `maxRayPipelineRecursionDepth`
(pipeline creation) and `maxRayRecursionDepth` (limit) to reduce
confusion

Add queryable `maxRayHitAttributeSize` limit and rename members of
[VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html) to
`maxPipelineRayPayloadSize` and `maxPipelineRayHitAttributeSize`
for clarity

Update SPIRV capabilities to use `RayTracingKHR`

extension is no longer provisional

define synchronization requirements for indirect trace rays and indirect
buffer

(5) This extension adds gl_InstanceID for the intersection, any-hit, and
closest hit shaders, but in KHR_vulkan_glsl, gl_InstanceID is replaced with
gl_InstanceIndex.
Which should be used for Vulkan in this extension?

**RESOLVED**: This extension uses gl_InstanceID and maps it to `InstanceId`
in SPIR-V.
It is acknowledged that this is different than other shader stages in
Vulkan.
There are two main reasons for the difference here:

* 
symmetry with gl_PrimitiveID which is also available in these shaders

* 
there is no “baseInstance” relevant for these shaders, and so ID makes
it more obvious that this is zero-based.

(6) Why is `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)` an interaction instead of a
required dependency, particularly when the “Device Extensions” section
says it is required to be supported anyhow?

**RESOLVED**: If the `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)` extension were a
required dependency, then every application would need to enable the
extension whether or not they actually want to use the pipeline library
functionality.
Developers found this to be annoying and unfriendly behavior.
We do wish to require all **implementations** to support it though, and thus
it is listed as a requirement in device extensions section.

Example ray generation GLSL shader

#version 450 core
#extension GL_EXT_ray_tracing : require
layout(set = 0, binding = 0, rgba8) uniform image2D image;
layout(set = 0, binding = 1) uniform accelerationStructureEXT as;
layout(location = 0) rayPayloadEXT float payload;

void main()
{
   vec4 col = vec4(0, 0, 0, 1);

   vec3 origin = vec3(float(gl_LaunchIDEXT.x)/float(gl_LaunchSizeEXT.x), float(gl_LaunchIDEXT.y)/float(gl_LaunchSizeEXT.y), 1.0);
   vec3 dir = vec3(0.0, 0.0, -1.0);

   traceRayEXT(as, 0, 0xff, 0, 1, 0, origin, 0.0, dir, 1000.0, 0);

   col.y = payload;

   imageStore(image, ivec2(gl_LaunchIDEXT.xy), col);
}

* 
Revision 1, 2020-11-12 (Mathieu Robart, Daniel Koch, Eric Werness,
Tobias Hector)

Decomposition of the specification, from VK_KHR_ray_tracing to
VK_KHR_ray_tracing_pipeline (#1918,!3912)

* 
require certain subgroup and sm_shader_builtin shader builtins to be
decorated as volatile in the ray generation, closest hit, miss,
intersection, and callable stages (#1924,!3903,!3954)

* 
clarify buffer usage flags for ray tracing (#2181,!3939)

* 
rename maxRecursionDepth to maxRayPipelineRecursionDepth and
maxRayRecursionDepth (#2203,!3937)

* 
add queryable maxRayHitAttributeSize and rename members of
VkRayTracingPipelineInterfaceCreateInfoKHR (#2102,!3966)

* 
update to use `RayTracingKHR` SPIR-V capability

* 
add VUs for matching hit group type against geometry type (#2245,!3994)

* 
require `RayTMaxKHR` be volatile in intersection shaders
(#2268,!4030)

* 
add numerical limits for ray parameters (#2235,!3960)

* 
fix SBT indexing rules for device addresses (#2308,!4079)

* 
relax formula for ray intersection candidate determination
(#2322,!4080)

* 
add more details on `ShaderRecordBufferKHR` variables (#2230,!4083)

* 
clarify valid bits for `InstanceCustomIndexKHR` (GLSL/GLSL#19,!4128)

* 
allow at most one `IncomingRayPayloadKHR`,
`IncomingCallableDataKHR`, and `HitAttributeKHR` (!4129)

* 
add minimum for maxShaderGroupStride (#2353,!4131)

* 
require VK_KHR_pipeline_library extension to be supported (#2348,!4135)

* 
clarify meaning of 'geometry index' (#2272,!4137)

* 
restrict traces to TLAS (#2239,!4141)

* 
add note about maxPipelineRayPayloadSize (#2383,!4172)

* 
do not require raygen shader in pipeline libraries (!4185)

* 
define sync for indirect trace rays and indirect buffer (#2407,!4208)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_ray_tracing_pipeline).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
