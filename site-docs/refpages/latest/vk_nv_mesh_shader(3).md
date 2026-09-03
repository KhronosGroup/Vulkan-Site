# VK_NV_mesh_shader(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_mesh_shader.html

## Table of Contents

- [Name](#_name)
- [VK_NV_mesh_shader](#VK_NV_mesh_shader)
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
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_mesh_shader - device extension

**Name String**

`VK_NV_mesh_shader`

**Extension Type**

Device extension

**Registered Extension Number**

203

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_AMD_draw_indirect_count

* 
Interacts with VK_EXT_device_generated_commands

* 
Interacts with VK_KHR_draw_indirect_count

**SPIR-V Dependencies**

* 
[SPV_NV_mesh_shader](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_mesh_shader.html)

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_mesh_shader] @pixeljetstream%0A*Here describe the issue or question you have about the VK_NV_mesh_shader extension*)

**Last Modified Date**

2018-07-19

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_NV_mesh_shader`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_mesh_shader.txt)

**Contributors**

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

This extension provides a new mechanism allowing applications to generate
collections of geometric primitives via programmable mesh shading.
It is an alternative to the existing programmable primitive shading
pipeline, which relied on generating input primitives by a fixed function
assembler as well as fixed function vertex fetch.

There are new programmable shader types — the task and mesh shader — to
generate these collections to be processed by fixed-function primitive
assembly and rasterization logic.
When task and mesh shaders are dispatched, they replace the core
[pre-rasterization stages](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
including vertex array attribute fetching, vertex shader processing,
tessellation, and geometry shader processing.

This extension also adds support for the following SPIR-V extension in
Vulkan:

* 
[`SPV_NV_mesh_shader`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_mesh_shader.html)

* 
[vkCmdDrawMeshTasksIndirectNV](vkCmdDrawMeshTasksIndirectNV.html)

* 
[vkCmdDrawMeshTasksNV](vkCmdDrawMeshTasksNV.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html) or [VK_AMD_draw_indirect_count](VK_AMD_draw_indirect_count.html) is supported:

* 
[vkCmdDrawMeshTasksIndirectCountNV](vkCmdDrawMeshTasksIndirectCountNV.html)

* 
[VkDrawMeshTasksIndirectCommandNV](VkDrawMeshTasksIndirectCommandNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMeshShaderFeaturesNV](VkPhysicalDeviceMeshShaderFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)

* 
`VK_NV_MESH_SHADER_EXTENSION_NAME`

* 
`VK_NV_MESH_SHADER_SPEC_VERSION`

* 
Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

[VK_PIPELINE_STAGE_MESH_SHADER_BIT_NV](VkPipelineStageFlagBits.html)

* 
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_NV](VkPipelineStageFlagBits.html)

Extending [VkShaderStageFlagBits](VkShaderStageFlagBits.html):

* 
[VK_SHADER_STAGE_MESH_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_TASK_BIT_NV](VkShaderStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_NV](VkStructureType.html)

If [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[TaskCountNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-taskcount)

* 
[PrimitiveCountNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-primitivecount)

* 
[PrimitiveIndicesNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-primitiveindices)

* 
[ClipDistancePerViewNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-clipdistancepv)

* 
[CullDistancePerViewNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-culldistancepv)

* 
[LayerPerViewNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-layerpv)

* 
[MeshViewCountNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-meshviewcount)

* 
[MeshViewIndicesNV](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-meshviewindices)

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
(modified)`DrawIndex`

* 
(modified)`ViewportMaskNV`

* 
(modified)`PositionPerViewNV`

* 
(modified)`ViewportMaskPerViewNV`

* 
[`MeshShadingNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-MeshShadingNV)

How to name this extension?

**RESOLVED**: VK_NV_mesh_shader

Other options considered:

* 
VK_NV_mesh_shading

* 
VK_NV_programmable_mesh_shading

* 
VK_NV_primitive_group_shading

* 
VK_NV_grouped_drawing

Do we need a new VkPrimitiveTopology?

**RESOLVED**: No.
We skip the InputAssembler stage.

Should we allow Instancing?

**RESOLVED**: No.
There is no fixed function input, other than the IDs.
However, allow offsetting with a “first” value.

Should we use existing vkCmdDraw or introduce new functions?

**RESOLVED**: Introduce new functions.

New functions make it easier to separate from “programmable primitive
shading” chapter, less “dual use” language about existing functions
having alternative behavior.
The text around the existing “draws” is heavily based around emitting
vertices.

If new functions, how to name?

**RESOLVED**: CmdDrawMeshTasks*

Other options considered:

* 
CmdDrawMeshed

* 
CmdDrawTasked

* 
CmdDrawGrouped

Should VK_SHADER_STAGE_ALL_GRAPHICS be updated to include the new stages?

**RESOLVED**: No.
If an application were to be recompiled with headers that include additional
shader stage bits in VK_SHADER_STAGE_ALL_GRAPHICS, then the previously valid
application would no longer be valid on implementations that do not support
mesh or task shaders.
This means the change would not be backwards compatible.
It is too bad VkShaderStageFlagBits does not have a dedicated “all
supported graphics stages” bit like VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT,
which would have avoided this problem.

* 
Revision 1, 2018-07-19 (Christoph Kubisch, Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_mesh_shader).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
