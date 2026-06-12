# VK_KHR_ray_tracing_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_ray_tracing_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_ray_tracing_maintenance1](#VK_KHR_ray_tracing_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
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

VK_KHR_ray_tracing_maintenance1 - device extension

**Name String**

`VK_KHR_ray_tracing_maintenance1`

**Extension Type**

Device extension

**Registered Extension Number**

387

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_EXT_device_generated_commands

* 
Interacts with VK_KHR_ray_tracing_pipeline

* 
Interacts with VK_KHR_synchronization2

**SPIR-V Dependencies**

* 
[SPV_KHR_ray_cull_mask](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_cull_mask.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_ray_tracing_maintenance1] @dgkoch%0A*Here describe the issue or question you have about the VK_KHR_ray_tracing_maintenance1 extension*)

**Last Modified Date**

2022-02-21

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_ray_cull_mask`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_cull_mask.txt)

* 
Interacts with `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)`

* 
Interacts with `[VK_KHR_synchronization2](VK_KHR_synchronization2.html)`

**Contributors**

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Marius Bjorge, Arm

* 
Tom Olson, Arm

* 
Yuriy O’Donnell, Epic Games

* 
Yunpeng Zhu, Huawei

* 
Andrew Garrard, Imagination

* 
Dae Kim, Imagination

* 
Joshua Barczak, Intel

* 
Lionel Landwerlin, Intel

* 
Daniel Koch, NVIDIA

* 
Eric Werness, NVIDIA

* 
Spencer Fricke, Samsung

`VK_KHR_ray_tracing_maintenance1` adds a collection of minor ray tracing
features, none of which would warrant an entire extension of their own.

The new features are as follows:

* 
Adds support for the `SPV_KHR_ray_cull_mask` SPIR-V extension in Vulkan.
This extension provides access to built-in `CullMaskKHR` shader
variable which contains the value of the `OpTrace*` `Cull Mask`
parameter.
This new shader variable is accessible in the intersection, any-hit,
closest hit and miss shader stages.

* 
Adds support for a new pipeline stage and access mask built on top of
`[VK_KHR_synchronization2](VK_KHR_synchronization2.html)`:

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html) to
specify execution of [acceleration     structure copy commands](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-copying)

* 
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html) to specify read
access to a [shader binding table](../../../../spec/latest/chapters/raytracing.html#shader-binding-table) in any
shader pipeline stage

Adds two new acceleration structure query parameters:

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html) to query the
acceleration structure size on the device timeline

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html)
to query the number of bottom level acceleration structure pointers for
serialization

Adds an optional new indirect ray tracing dispatch command,
[vkCmdTraceRaysIndirect2KHR](vkCmdTraceRaysIndirect2KHR.html), which sources the shader binding table
parameters as well as the dispatch dimensions from the device.
The [    `rayTracingPipelineTraceRaysIndirect2`](../../../../spec/latest/chapters/features.html#features-rayTracingPipelineTraceRaysIndirect2) feature indicates whether
this functionality is supported.

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
[vkCmdTraceRaysIndirect2KHR](vkCmdTraceRaysIndirect2KHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR](VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR.html)

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
[VkTraceRaysIndirectCommand2KHR](VkTraceRaysIndirectCommand2KHR.html)

* 
`VK_KHR_RAY_TRACING_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_KHR_RAY_TRACING_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkQueryType](VkQueryType.html):

[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html)

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MAINTENANCE_1_FEATURES_KHR](VkStructureType.html)

If [VK_KHR_synchronization2](VK_KHR_synchronization2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) and [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html)

If [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](VkIndirectCommandsTokenTypeEXT.html)

If [VK_KHR_synchronization2](VK_KHR_synchronization2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[`CullMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-cullmask)

* 
[`RayCullMaskKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayCullMaskKHR)

None Yet!

* 
Revision 1, 2022-02-21 (Members of the Vulkan Ray Tracing TSG)

internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_ray_tracing_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
