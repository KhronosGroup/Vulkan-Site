# VK_EXT_mesh_shader(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_mesh_shader.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_mesh_shader](#VK_EXT_mesh_shader)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_mesh_shader - device extension

**Name String**

`VK_EXT_mesh_shader`

**Extension Type**

Device extension

**Registered Extension Number**

329

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_spirv_1_4](VK_KHR_spirv_1_4.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_AMD_draw_indirect_count

* 
Interacts with VK_EXT_device_generated_commands

* 
Interacts with VK_KHR_draw_indirect_count

* 
Interacts with VK_KHR_fragment_shading_rate

* 
Interacts with VK_NV_device_generated_commands

* 
Interacts with VkPhysicalDeviceMeshShaderFeaturesEXT::primitiveFragmentShadingRateMeshShader

**SPIR-V Dependencies**

* 
[SPV_EXT_mesh_shader](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_mesh_shader.html)

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_mesh_shader] @pixeljetstream%0A*Here describe the issue or question you have about the VK_EXT_mesh_shader extension*)

**Extension Proposal**

[VK_EXT_mesh_shader](../../../../features/latest/features/proposals/VK_EXT_mesh_shader.html)

**Last Modified Date**

2022-01-20

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_mesh_shader`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_mesh_shader.txt)

* 
Interacts with Vulkan 1.1

* 
Interacts with `[VK_KHR_multiview](VK_KHR_multiview.html)`

* 
Interacts with `[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html)`

**Contributors**

* 
Christoph Kubisch, NVIDIA

* 
Pat Brown, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Pierre Boudier, NVIDIA

* 
Patrick Mours, NVIDIA

* 
David Zhao Akeley, NVIDIA

* 
Kedarnath Thangudu, NVIDIA

* 
Timur Kristóf, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Philip Rebohle, Valve

* 
Mike Blumenkrantz, Valve

* 
Slawomir Grajewski, Intel

* 
Michal Pietrasiuk, Intel

* 
Mariusz Merecki, Intel

* 
Tom Olson, ARM

* 
Jan-Harald Fredriksen, ARM

* 
Sandeep Kakarlapudi, ARM

* 
Ruihao Zhang, QUALCOMM

* 
Ricardo Garcia, Igalia, S.L.

* 
Tobias Hector, AMD

* 
Stu Smith, AMD

This extension provides a new mechanism allowing applications to generate
collections of geometric primitives via programmable mesh shading.
It is an alternative to the existing programmable primitive shading
pipeline, which relied on generating input primitives by a fixed function
assembler as well as fixed function vertex fetch.

This extension also adds support for the following SPIR-V extension in
Vulkan:

* 
[`SPV_EXT_mesh_shader`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_mesh_shader.html)

* 
[vkCmdDrawMeshTasksEXT](vkCmdDrawMeshTasksEXT.html)

* 
[vkCmdDrawMeshTasksIndirectEXT](vkCmdDrawMeshTasksIndirectEXT.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html) or [VK_AMD_draw_indirect_count](VK_AMD_draw_indirect_count.html) is supported:

* 
[vkCmdDrawMeshTasksIndirectCountEXT](vkCmdDrawMeshTasksIndirectCountEXT.html)

* 
[VkDrawMeshTasksIndirectCommandEXT](VkDrawMeshTasksIndirectCommandEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMeshShaderFeaturesEXT](VkPhysicalDeviceMeshShaderFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)

* 
`VK_EXT_MESH_SHADER_EXTENSION_NAME`

* 
`VK_EXT_MESH_SHADER_SPEC_VERSION`

* 
Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

Extending [VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html):

* 
[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html)

* 
[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](VkQueryType.html)

Extending [VkShaderStageFlagBits](VkShaderStageFlagBits.html):

* 
[VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_EXT](VkStructureType.html)

If [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](VkIndirectCommandsTokenTypeEXT.html)

If [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](VkIndirectCommandsTokenTypeNV.html)

* 
[CullPrimitiveEXT](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-cullprimitive)

* 
[PrimitivePointIndicesEXT](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-primitivepointindices)

* 
[PrimitiveLineIndicesEXT](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-primitivelineindices)

* 
[PrimitiveTriangleIndicesEXT](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-primitivetriangleindices)

* 
(modified)`Position`

* 
(modified)`PointSize`

* 
(modified)`ClipDistance`

* 
(modified)`CullDistance`

* 
(modified)`PrimitiveId`

* 
(modified)`Layer`

* 
(modified)`ViewportIndex`

* 
(modified)`NumWorkgroups`

* 
(modified)`WorkgroupSize`

* 
(modified)`WorkgroupId`

* 
(modified)`LocalInvocationId`

* 
(modified)`GlobalInvocationId`

* 
(modified)`LocalInvocationIndex`

* 
(modified)`NumSubgroups`

* 
(modified)`SubgroupId`

* 
(modified)`DrawIndex`

* 
(modified)`PrimitiveShadingRateKHR`

* 
(modified)`ViewIndex`

* 
[`MeshShadingEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-MeshShadingEXT)

* 
Revision 1, 2022-03-08 (Christoph Kubisch, Daniel Koch, Patrick Mours)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_mesh_shader).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
