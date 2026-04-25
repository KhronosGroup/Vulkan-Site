# VK_EXT_device_generated_commands

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_device_generated_commands.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Goals](#_goals)
- [2.2. Current implementations](#_current_implementations)
- [2.2._Current_implementations](#_current_implementations)
- [2.2.1. Vulkan](#_vulkan)
- [2.2.2. D3D12](#_d3d12)
- [2.2.3. Metal](#_metal)
- [2.3. Command representation](#_command_representation)
- [2.3._Command_representation](#_command_representation)
- [3. Proposal](#_proposal)
- [3.1. Key differences with VK_NV_device_generated_commands](#_key_differences_with_vk_nv_device_generated_commands)
- [3.1._Key_differences_with_VK_NV_device_generated_commands](#_key_differences_with_vk_nv_device_generated_commands)
- [3.2. Indirect Execution Sets](#_indirect_execution_sets)
- [3.2._Indirect_Execution_Sets](#_indirect_execution_sets)
- [3.2.1. Creation and Deletion](#_creation_and_deletion)
- [3.2.1._Creation_and_Deletion](#_creation_and_deletion)
- [3.2.2. Updates](#_updates)
- [3.3. Indirect Commands Layout](#_indirect_commands_layout)
- [3.3._Indirect_Commands_Layout](#_indirect_commands_layout)
- [3.3.1. Creation and Deletion](#_creation_and_deletion_2)
- [3.3.1._Creation_and_Deletion](#_creation_and_deletion_2)
- [3.3.2. Token layout](#_token_layout)
- [3.3.2._Token_layout](#_token_layout)
- [3.4. Indirect Commands](#_indirect_commands)
- [3.4._Indirect_Commands](#_indirect_commands)
- [3.4.1. Bind Execution Command](#_bind_execution_command)
- [3.4.1._Bind_Execution_Command](#_bind_execution_command)
- [3.4.2. Push Constants Command](#_push_constants_command)
- [3.4.2._Push_Constants_Command](#_push_constants_command)
- [3.4.3. Sequence Index Command](#_sequence_index_command)
- [3.4.3._Sequence_Index_Command](#_sequence_index_command)
- [3.4.4. Bind Index Buffer Command](#_bind_index_buffer_command)
- [3.4.4._Bind_Index_Buffer_Command](#_bind_index_buffer_command)
- [3.4.5. Bind Vertex Buffer Command](#_bind_vertex_buffer_command)
- [3.4.5._Bind_Vertex_Buffer_Command](#_bind_vertex_buffer_command)
- [3.4.6. Draw Commands](#_draw_commands)
- [3.4.6._Draw_Commands](#_draw_commands)
- [3.4.7. Multi-draw Commands](#_multi_draw_commands)
- [3.4.7._Multi-draw_Commands](#_multi_draw_commands)
- [3.4.8. Dispatch Command](#_dispatch_command)
- [3.4.8._Dispatch_Command](#_dispatch_command)
- [3.4.9. Trace Rays Command](#_trace_rays_command)
- [3.4.9._Trace_Rays_Command](#_trace_rays_command)
- [3.5. Preprocess Buffer](#_preprocess_buffer)
- [3.5._Preprocess_Buffer](#_preprocess_buffer)
- [3.6. Command Buffer](#_command_buffer)
- [3.6._Command_Buffer](#_command_buffer)
- [3.6.1. Synchronization](#_synchronization)
- [3.6.2. Generated Commands](#_generated_commands)
- [3.6.2._Generated_Commands](#_generated_commands)
- [3.7. Features](#_features)
- [3.8. Properties](#_properties)
- [3.9. D3D12 Emulation](#_d3d12_emulation)
- [3.9._D3D12_Emulation](#_d3d12_emulation)
- [3.9.1. Argument Structures](#_argument_structures)
- [3.9.1._Argument_Structures](#_argument_structures)
- [3.9.2. Indirect Argument Type](#_indirect_argument_type)
- [3.9.2._Indirect_Argument_Type](#_indirect_argument_type)
- [3.9.3. Command Signature](#_command_signature)
- [3.9.3._Command_Signature](#_command_signature)
- [3.9.4. Alignment](#_alignment)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. UNRESOLVED: How will future commands be added?](#_unresolved_how_will_future_commands_be_added)
- [5.1._UNRESOLVED:_How_will_future_commands_be_added?](#_unresolved_how_will_future_commands_be_added)
- [5.2. Should additional state be included?](#_should_additional_state_be_included)
- [5.2._Should_additional_state_be_included?](#_should_additional_state_be_included)
- [5.3. What shader stages or pipeline states should be allowed to change?](#_what_shader_stages_or_pipeline_states_should_be_allowed_to_change)
- [5.3._What_shader_stages_or_pipeline_states_should_be_allowed_to_change?](#_what_shader_stages_or_pipeline_states_should_be_allowed_to_change)
- [5.4. UNRESOLVED: Should Indirect execution sets be merged with either Shader Binding Tables or Indirect Object Sets?](#_unresolved_should_indirect_execution_sets_be_merged_with_either_shader_binding_tables_or_indirect_object_sets)
- [5.4._UNRESOLVED:_Should_Indirect_execution_sets_be_merged_with_either_Shader_Binding_Tables_or_Indirect_Object_Sets?](#_unresolved_should_indirect_execution_sets_be_merged_with_either_shader_binding_tables_or_indirect_object_sets)
- [5.5. Should additional alignment properties be added?](#_should_additional_alignment_properties_be_added)
- [5.5._Should_additional_alignment_properties_be_added?](#_should_additional_alignment_properties_be_added)
- [5.6. Should index type values be remappable?](#_should_index_type_values_be_remappable)
- [5.6._Should_index_type_values_be_remappable?](#_should_index_type_values_be_remappable)
- [5.7. Should indirect buffers be reusable?](#_should_indirect_buffers_be_reusable)
- [5.7._Should_indirect_buffers_be_reusable?](#_should_indirect_buffers_be_reusable)
- [5.8. How should commands with less than 32-bits of data be handled?](#_how_should_commands_with_less_than_32_bits_of_data_be_handled)
- [5.8._How_should_commands_with_less_than_32-bits_of_data_be_handled?](#_how_should_commands_with_less_than_32_bits_of_data_be_handled)
- [5.9. How should applications provide data to the preprocess command in order for drivers to optimize indirect execution?](#_how_should_applications_provide_data_to_the_preprocess_command_in_order_for_drivers_to_optimize_indirect_execution)
- [5.9._How_should_applications_provide_data_to_the_preprocess_command_in_order_for_drivers_to_optimize_indirect_execution?](#_how_should_applications_provide_data_to_the_preprocess_command_in_order_for_drivers_to_optimize_indirect_execution)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)
- [7. TODO](#_todo)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Goals](#_goals)
[2.2. Current implementations](#_current_implementations)
[2.3. Command representation](#_command_representation)

[3. Proposal](#_proposal)

[3.1. Key differences with `VK_NV_device_generated_commands`](#_key_differences_with_vk_nv_device_generated_commands)
[3.2. Indirect Execution Sets](#_indirect_execution_sets)
[3.3. Indirect Commands Layout](#_indirect_commands_layout)
[3.4. Indirect Commands](#_indirect_commands)
[3.5. Preprocess Buffer](#_preprocess_buffer)
[3.6. Command Buffer](#_command_buffer)
[3.7. Features](#_features)
[3.8. Properties](#_properties)
[3.9. D3D12 Emulation](#_d3d12_emulation)

[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. UNRESOLVED: How will future commands be added?](#_unresolved_how_will_future_commands_be_added)
[5.2. Should additional state be included?](#_should_additional_state_be_included)
[5.3. What shader stages or pipeline states should be allowed to change?](#_what_shader_stages_or_pipeline_states_should_be_allowed_to_change)
[5.4. UNRESOLVED: Should Indirect execution sets be merged with either Shader Binding Tables or Indirect Object Sets?](#_unresolved_should_indirect_execution_sets_be_merged_with_either_shader_binding_tables_or_indirect_object_sets)
[5.5. Should additional alignment properties be added?](#_should_additional_alignment_properties_be_added)
[5.6. Should index type values be remappable?](#_should_index_type_values_be_remappable)
[5.7. Should indirect buffers be reusable?](#_should_indirect_buffers_be_reusable)
[5.8. How should commands with less than 32-bits of data be handled?](#_how_should_commands_with_less_than_32_bits_of_data_be_handled)
[5.9. How should applications provide data to the preprocess command in order for drivers to optimize indirect execution?](#_how_should_applications_provide_data_to_the_preprocess_command_in_order_for_drivers_to_optimize_indirect_execution)

[6. Further Functionality](#_further_functionality)
[7. TODO](#_todo)

This document details API design for indirect execution of device generated commands, improving performance by eliminating unnecessary host and device work.

Device-driven rendering is increasingly used to manage large and complex environments.  Scene management in particular is well suited for execution on device and is responsible for:

* 
Traversing the scene

* 
Managing LoD

* 
Performing various culling algorithms

* 
Generating work to render the visible result

Graphics APIs differ in their expressiveness but most have limitations for device-driven scene management that result in:

* 
Unnecessary state changes

* 
Wasted memory for worst-case allocations for intermediate results

* 
Round-tripping through memory instead of staying on chip

This proposal focuses on reducing unnecessary state changes.  For example, enabling a device to use compute shaders to launch other compute shaders rather than requiring explicit dispatch commands to be recorded.

There are several approaches to reduce unnecessary state changes.  Here are some potential solutions:

No API changes

* 
Work is done on the host to determine the set of shaders that are potentially visible.  This might be a simpler problem than object/triangle culling.

* 
Potentially duplicates work done by the device.

Work Graphs

* 
D3D12 supports Work Graphs, which are a more powerful method of moving work generation to the GPU

* 
Standardization and cross-vendor support of this advanced functionality takes a long time to achieve ecosystem adoption

Predicated/Conditional Rendering

* 
Commands are optionally executed depending on a condition evaluated on the device timeline.

* 
Exposed in D3D12 as `ID3D12GraphicsCommandList::SetPredication`

* 
Host encoding overhead of binding the shaders still exists.

Indirect Command Buffers (Host)

* 
Similar to secondary command buffers but with different restrictions and inheritance rules.

* 
Create multiple indirect command buffers (e.g. one per pipeline).

* 
Indirect execution of multiple indirect command buffers.

* 
May require patching/fast updating of objects referenced by the indirect command buffer.

Indirect Command Buffers (Device)

* 
Created in a compute shader.

* 
Can be re-created every frame avoiding multiple execution complexity or patching.

* 
Requires extensive shading language support.

Enhanced Indirect

* 
Add support to execute multiple types of operations in a sequence.

* 
Limited state changes and operations compared to what is available for primary or secondary command buffers.

* 
Should be able to represent most work in a "pass" (e.g. drawing shadows or opaque geometry)

Many graphics APIs have more expressive indirect capabilities.  This proposal pursues that approach to address both the problem statement and provide an emulation target.

These are the primary goals for the proposal:

* 
Efficient implementation for many-draws and many-dispatches per set of shaders.

* 
Device-side binding of shaders.

* 
Changing shaders for indirect dispatch during application lifetime.

* 
Emulation of D3D12 indirect execution.

* 
Emulation of D3D12 work graphs.

* 
Transition existing uses of `NV_device_generated_commands` and `NV_device_generated_commands_compute`.

* 
Single framework for all execution-based indirect commands.  Other indirect operations (e.g. building acceleration structures) have very different setup and argument management.

Indirect execution in Vulkan typically support only a single type of command:

* 
`vkCmdDrawIndirect`

* 
`vkCmdDrawIndexedIndirect`

* 
`vkCmdDispatchIndirect`

* 
`vkCmdDrawIndirectCount` (Vulkan 1.2)

* 
`vkCmdDrawIndexedIndirectCount` (Vulkan 1.2)

* 
`vkCmdDrawMeshTasksIndirectNV` (VK_NV_mesh_shader)

* 
`vkCmdDrawMeshTasksIndirectCountNV` (VK_NV_mesh_shader)

* 
`vkCmdBuildAccelerationStructuresIndirectKHR` (VK_KHR_acceleration_structure)

* 
`vkCmdTraceRaysIndirectKHR` (VK_KHR_ray_tracing_pipeline)

* 
`vkCmdDrawMeshTasksIndirectEXT` (VK_EXT_mesh_shader)

* 
`vkCmdDrawMeshTasksIndirectCountEXT` (VK_EXT_mesh_shader)

The `VK_NV_device_generated_commands` extension enables a more expressive model supporting multiple commands in a sequence that may change the following state:

* 
Shaders

* 
Primitive winding

* 
Index and vertex buffers

* 
Push constants

and perform the following operations:

* 
Indexed and non-indexed draws

* 
Mesh tasks

D3D12 indirect execution is similar in expressivity to both `VK_NV_device_generated_commands` and `VK_NV_device_generated_commands_compute` but offers no mechanism for changing graphics shaders or pipelines.  It is currently possible to emulate D3D12 behavior on top of `VK_NV_device_generated_commands` and other base Vulkan functionality so it is important to not lose any features required for emulation with this proposal.

D3D12 work graphs are more powerful in certain aspects than indirect execution but are not yet officially supported in Vulkan.

Metal is similar in expressivity to `VK_NV_device_generated_commands` and supports full pipeline changes as well as the equivalent of binding descriptor sets.

Indirect buffer layout is opaque and can be encoded on host through the API or on device using a compute shader.  For example:

struct arguments { command_buffer cmd_buffer; };

kernel void producer(device arguments& args, ushort cmd_idx [[thread_position_in_grid]])
{
    render_command cmd(args.cmd_buffer, cmd_idx);
    cmd.set_render_pipeline_state(...);
    cmd.set_vertex_buffer(...);
    cmd.draw_primitives(...);
}

Supporting multiple commands in an indirect buffer can either be done with a homogeneous structure where the layout is fixed and the same pattern of operations is executed.  Another alternative is a heterogeneous structure where there is no restriction on command ordering.  For heterogeneous layout, the size of the arguments for each command may also vary.

This proposal uses a homogeneous structure which matches D3D12, Metal, and `VK_NV_device_generated_commands`.  This restricted model simplifies construction and interpretation of the data while also introducing an optimization challenge.

Consider a sequence of `Bind Shaders/Draw` that binds the same shaders multiple times.  If the command buffer is constructed on the host,  draw calls with the same shaders can be grouped together creating a heterogeneous structure.  There are several options to with a homogeneous structure:

On-device optimization.  The implementation could detect/remove duplicates during pre-processing or execution.  This may be difficult or impractical for a device to implement.

Multi-level indirect.  One of the indirect operations could be another indirect execution.  For example, a two-level solution could be used with low-frequency operations in the first indirect buffer and high-frequency operations in the second indirect buffer.

IndirectCount commands.  Vulkan has pre-existing indirect commands that execute multiple operations with a device-specified count.  This is equivalent to a heavily constrained multi-level indirect solution.

This proposal does not expect significant on-device optimization and uses IndirectCount commands which are capable of representing many common application scenarios.

This proposal targets Vulkan 1.3 building on functionality from `NV_device_generated_commands` to address the problem statement and also provide an emulation target for other APIs.

Indirect buffers contain work elements (sequences) of uniform structure.  The memory layout of a sequence is described by an Indirect Commands Layout that specifies a fixed number of command buffer operations:

* 
Shaders

* 
Push constants

* 
Index and vertex buffers

* 
Draws and dispatches

* 
Multi-draws with device-specified count

* 
Trace rays

The extension provides a common framework for all existing and future indirect commands. An implementation does not need to support every command (see the Features section for more detail).

Sequences of compute commands that change shaders must refer to elements of an Indirect Execution Set, a table that references multiple shaders of similar state.

Implementations may also require a preprocess buffer to translate to a device-specific format.  With Multi-draw commands being available, optimization of the preprocess buffer to remove duplicates is not expected.

![VK EXT device generated commands overview](../_images/proposals/VK_EXT_device_generated_commands_overview.svg)

The generation of device generated commands uses the following principle steps:

* 
Define via `VkIndirectCommandsLayoutEXT` the sequence of commands which can be generated.

* 
Optionally create and update an `VkIndirectExecutionSetEXT` to support changing shaders.

* 
Retrieve device addresses and handles for objects stored in indirect buffers.

* 
Fill a `VkBuffer` with the content that matches the indirect command layout.

* 
Create a preprocess `VkBuffer` that satisfies the allocation information from `vkGetGeneratedCommandsMemoryRequirementsEXT`.

* 
Optionally preprocess the input data using `vkCmdPreprocessGeneratedCommandsEXT` in a separate action.

* 
Generate and execute the actual commands via `vkCmdExecuteGeneratedCommandsEXT` passing all required data.

`vkCmdPreprocessGeneratedCommandsEXT` executes in a separate logical pipeline from either graphics or compute. When preprocessing commands in a separate step they must be explicitly synchronized against the command execution. When not preprocessing, the preprocessing is automatically synchronized against the command execution.

* 
Common indirect commands under one unified framework (graphics, compute, and ray tracing)

* 
Incremental update of shaders available for use

* 
Adds IndirectCount commands

* 
Adds compute dispatch support

* 
Single-interleaved stream

* 
VK_EXT_shader_object support

Indirect buffers that bind shaders reference shaders (pipelines or shader objects) managed by a collection represented by:

VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectExecutionSetEXT)

Indirect execution sets group both pipelines with the same `VkPipelineLayout` and shader stages with matching per-stage descriptor layouts.

Indirect execution sets contain a maximum number of N execution slots that can be updated when not referenced by indirect buffers currently in flight. Drivers should ensure that updating a set is a pretty cheap operation as it is expected to be modified as application content changes.

Modifications to an indirect execution set may change the sizing requirements of the preprocess buffer.  Applications must call `vkGetGeneratedCommandsMemoryRequirementsEXT` and update the preprocess buffer if needed when modifications are complete.

Indirect execution sets are created by:

VKAPI_ATTR VkResult VKAPI_CALL vkCreateIndirectExecutionSetEXT(
    VkDevice                                   device,
    const VkIndirectExecutionSetCreateInfoEXT* pCreateInfo,
    const VkAllocationCallbacks*               pAllocator,
    VkIndirectExecutionSetEXT*                 pIndirectExecutionSet);

* 
`device` is the logical device that creates the indirect execution set.

* 
`pCreateInfo` is a pointer to a `VkIndirectExecutionSetCreateInfoEXT` structure containing parameters affecting creation of the indirect execution set.

* 
`pAllocator` controls host memory allocation as described in the Memory Allocation chapter.

* 
`pIndirectExecutionSet` is a pointer to a `VkIndirectExecutionSetEXT` handle in which the resulting indirect execution set is returned.

The `VkIndirectExecutionSetCreateInfoEXT` structure is defined as:

typedef struct VkIndirectExecutionSetCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkIndirectExecutionSetInfoTypeEXT       type;
    VkIndirectExecutionSetInfoEXT           info;
} VkIndirectExecutionSetCreateInfoEXT;

* 
`type` is a `VkIndirectExecutionSetInfoTypeEXT` describing the type of set being created and determining which field of the info union will be used.

* 
`info` is a `VkIndirectExecutionSetInfoEXT` union containing layout information for the indirect execution set.

The VkIndirectExecutionSetInfoTypeEXT enum is defined as:

typedef enum VkIndirectExecutionSetInfoTypeEXT
{
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT = 0x00000001,
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT = 0x00000002,
} VkIndirectExecutionSetInfoTypeEXT;

* 
`VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT` indicates that the `VkIndirectExecutionSetEXT` contains `VkPipeline` objects.

* 
`VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT` indicates that the `VkIndirectExecutionSetEXT` contains `VkShaderEXT` objects.

The `VkIndirectExecutionSetInfoEXT` union is defined as:

typedef union VkIndirectExecutionSetInfoEXT {
    const VkIndirectExecutionSetPipelineInfoEXT *pPipelineInfo;
    const VkIndirectExecutionSetShaderInfoEXT   *pShaderInfo;
}

* 
`pPipelineInfo` is a pointer to a `VkIndirectExecutionSetPipelineInfoEXT` struct containing pipeline layout information for the indirect execution set.

* 
`pShaderInfo` is a pointer to a `VkIndirectExecutionSetShaderInfoEXT` struct containing shader object layout information for the indirect execution set.

The `VkIndirectExecutionSetPipelineInfoEXT` structure is defined as:

typedef struct VkIndirectExecutionSetPipelineInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkPipeline                              initialPipeline;
    uint32_t                                maxPipelineCount;
} VkIndirectExecutionSetPipelineInfoEXT;

* 
`initialPipeline` is the pipeline to validate other pipelines in the set against. Its state will be used for validation even if it is removed from the set.
This pipeline will be automatically added to the set at index `0`.
The bind point must be supported by `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT::supportedIndirectCommandsShaderStagesPipelineBinding`.

* 
`maxPipelineCount` is the maximum number of pipelines stored in the set.

The `VkIndirectExecutionSetShaderInfoEXT` structure is defined as:

typedef struct VkIndirectExecutionSetShaderInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    uint32_t                                shaderCount;
    const VkShaderEXT                      *pInitialShaders;
    const VkIndirectExecutionSetShaderLayoutInfoEXT *pSetLayoutInfos;
    uint32_t                                maxShaderCount;
    uint32_t                                pushConstantRangeCount;
    const VkPushConstantRange              *pPushConstantRanges;
} VkIndirectExecutionSetShaderInfoEXT;

* 
`shaderCount` is the number of members in the `pInitialShaders` and `pSetLayoutInfos` arrays.

* 
`pInitialShaders` is a pointer to an array containing a `VkShaderEXT` object for each shader stage that will be used in the set.
These shaders will be used to validate other shaders in the set against. Their state will be used for validation even if they are removed from the set.
These shaders will be automatically added to the set beginning at index `0`.
The stages of the shaders must be supported by `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT::supportedIndirectCommandsShaderStagesShaderBinding`.

* 
`pSetLayoutInfos` is a pointer to array containing `VkIndirectExecutionSetShaderLayoutInfoEXT` infos used by each corresponding `pInitialShaders` shader stage in the set.

* 
`maxShaderCount` is the maximum number of corresponding shader objects stored in the set.

* 
`pushConstantRangeCount` is the number of members in the `pPushConstantRanges` array.

* 
`pPushConstantRanges` is a pointer to the array of `VkPushConstantRange` ranges used by all shaders in the set.

The `VkIndirectExecutionSetShaderLayoutInfoEXT` structure is defined as:

typedef struct VkIndirectExecutionSetShaderLayoutInfoEXT {
    uint32_t                     setLayoutCount;
    const VkDescriptorSetLayout *pSetLayouts;
} VkIndirectExecutionSetShaderLayoutInfoEXT;

* 
`setLayoutCount` is the number of `VkDescriptorSetLayout` in the `pSetLayouts` array.

* 
`pSetLayouts` is a pointer to an array containing `VkDescriptorSetLayout` objects used by a given shader stage.

Indirect execution sets are destroyed by:

VKAPI_ATTR void VKAPI_CALL vkDestroyIndirectExecutionSetEXT(
    VkDevice                      device,
    VkIndirectExecutionSetEXT     indirectExecutionSet,
    const VkAllocationCallbacks*  pAllocator);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set to destroy.

* 
`pAllocator` controls host memory allocation as described in the Memory Allocation chapter.

Once created, execution slots in indirect execution sets can be updated with one of the following functions depending on how it was created:

VKAPI_ATTR void VKAPI_CALL vkUpdateIndirectExecutionSetPipelineEXT(
    VkDevice                              device,
    VkIndirectExecutionSetEXT             indirectExecutionSet,
    uint32_t                              executionSetWriteCount,
    const VkWriteIndirectExecutionSetPipelineEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set to update.

* 
`executionSetWriteCount` is the number of elements in `pExecutionSetWrites`.

* 
`pExecutionSetWrites` is a pointer to a `VkWriteIndirectExecutionSetPipelineEXT` structure describing the elements to update.

VKAPI_ATTR void VKAPI_CALL vkUpdateIndirectExecutionSetShaderEXT(
    VkDevice                              device,
    VkIndirectExecutionSetEXT             indirectExecutionSet,
    uint32_t                              executionSetWriteCount,
    const VkWriteIndirectExecutionSetShaderEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set to update.

* 
`executionSetWriteCount` is the number of elements in `pExecutionSetWrites`.

* 
`pExecutionSetWrites` is a pointer to a `VkWriteIndirectExecutionSetShaderEXT` structure describing the elements to update.

It is legal to update an indirect execution set that is used in flight as long as the slot indices in `VkWriteIndirectExecutionSetEXT` are not in use.  Any change to an indirect execution set requires recalculating memory requirements by calling `vkGetGeneratedCommandsMemoryRequirementsEXT` for commands that use that modified state.  Commands that are in flight or those not using the changed state are safe.

The `VkWriteIndirectExecutionSetPipelineEXT` struct is defined as:

typedef struct VkWriteIndirectExecutionSetPipelineEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    uint32_t                             index;
    VkPipeline                           pipeline;
} VkWriteIndirectExecutionSetPipelineEXT;

* 
`index` is the execution slot to update

* 
`pipeline` is the pipeline to store in the indirect execution set

The `VkWriteIndirectExecutionSetShaderEXT` struct is defined as:

typedef struct VkWriteIndirectExecutionSetShaderEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    uint32_t                             index;
    VkShaderEXT                          shader;
} VkWriteIndirectExecutionSetShaderEXT;

* 
`index` is the execution slot to update

* 
`shader` is the shader object to store in the indirect execution set

The device-side command generation happens through an iterative processing of an atomic sequence comprised of command tokens, which are represented by:

VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectCommandsLayoutEXT)

Indirect command layouts are created by:

VKAPI_ATTR VkResult VKAPI_CALL vkCreateIndirectCommandsLayoutEXT(
    VkDevice                                     device,
    const VkIndirectCommandsLayoutCreateInfoEXT* pCreateInfo,
    const VkAllocationCallbacks*                 pAllocator,
    VkIndirectCommandsLayoutEXT*                 pIndirectCommandsLayout);

* 
`device` is the logical device that creates the indirect command layout.

* 
`pCreateInfo` is a pointer to a `VkIndirectCommandsLayoutCreateInfoEXT` structure containing parameters affecting creation of the indirect command layout.

* 
`pAllocator` controls host memory allocation as described in the Memory Allocation chapter.

* 
`pIndirectCommandsLayout` is a pointer to a `VkIndirectCommandsLayoutEXT` handle in which the resulting indirect command layout is returned.

The `VkIndirectCommandsLayoutCreateInfoEXT` structure is defined as:

typedef struct VkIndirectCommandsLayoutCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkIndirectCommandsLayoutUsageFlagsEXT   flags;
    VkShaderStageFlags                      shaderStages;
    uint32_t                                indirectStride;
    VkPipelineLayout                        pipelineLayout;
    uint32_t                                tokenCount;
    const VkIndirectCommandsLayoutTokenEXT* pTokens;
} VkIndirectCommandsLayoutCreateInfoEXT;

* 
`flags` is a bitmask of `VkIndirectCommandsLayoutUsageFlagBitsEXT` specifying usage rules for this layout.

* 
`shaderStages` is the `VkShaderStageFlags` that this layout supports.

* 
`indirectStride` is the stride of the indirect buffer.

* 
`pipelineLayout` is the `VkPipelineLayout` that this layout supports. If a `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` or `VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT` is used by the layout, it must not be `VK_NULL_HANDLE`.

* 
`tokenCount` is the length of the individual command sequence.

* 
`pTokens` is an array describing each command token in detail.  See `VkIndirectCommandsTokenTypeEXT` and `VkIndirectCommandsLayoutTokenEXT` below for details.

A `VkPipelineLayoutCreateInfo` can be passed in `pNext` if the `dynamicGeneratedPipelineLayout` feature is enabled.

Bits which can be set in `VkIndirectCommandsLayoutCreateInfoEXT::flags`, specifying usage rules of an indirect command layout, are:

typedef enum VkIndirectCommandsLayoutUsageFlagBitsEXT
{
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT = 0x00000002,
} VkIndirectCommandsLayoutUsageFlagBitsEXT;
typedef VkFlags VkIndirectCommandsLayoutUsageFlagsEXT;

* 
`VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT` specifies that the layout is always used with the manual preprocessing step through calling `vkCmdPreprocessGeneratedCommandsEXT` and executed by `vkCmdExecuteGeneratedCommandsEXT` when `isPreprocessed` set to `VK_TRUE`.

* 
`VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT` specifies that [submission order](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-submission-order) is not affected by the ordering of sequences, and sequences may be processed in any order.

Indirect command layouts are destroyed by:

VKAPI_ATTR void VKAPI_CALL vkDestroyIndirectCommandsLayoutEXT(
    VkDevice                     device,
    VkIndirectCommandsLayoutEXT  indirectCommandsLayout,
    const VkAllocationCallbacks* pAllocator);

* 
`device` is the logical device that owns the layout.

* 
`indirectCommandsLayout` is the layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the Memory Allocation chapter.

Each sequence of commands in the indirect buffer has the same memory layout.  The data can contain raw `uint32_t` values, existing indirect command such as `VkDrawIndirectCommand`, or additional commands listed in the next section.

The `VkIndirectCommandsLayoutTokenEXT` structure specifies details to the commands that need to be known at layout creation time:

typedef struct VkIndirectCommandsLayoutTokenEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkIndirectCommandsTokenTypeEXT type;
    VkIndirectCommandsTokenDataEXT data;
    uint32_t                       offset;
} VkIndirectCommandsLayoutTokenEXT;

* 
`type` specifies the token command type.

* 
`data` specifies token specific details for command execution.

* 
`offset` is the relative byte offset for the token within one sequence of the indirect buffer.  The data stored at that offset is the command data for the token, e.g. `VkDispatchIndirectCommand`.

Token data is a union of additional information specific to the command:

typedef union VkIndirectCommandsTokenDataEXT {
    const VkIndirectCommandsPushConstantTokenEXT          *pPushConstant;
    const VkIndirectCommandsVertexBufferTokenEXT          *pVertexBuffer;
    const VkIndirectCommandsIndexBufferTokenEXT           *pIndexBuffer;
    const VkIndirectCommandsExecutionSetTokenEXT          *pExecutionSet;
} VkIndirectCommandsTokenDataEXT;

These structures are described in the next section.

This extension defines the following commands for state changes and operations:

| **Common Tokens** | **Command Data** |
| --- | --- |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT` | `uint32_t[]` array of indices into the indirect execution set |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` | `uint32_t[]` raw data |
| **Compute Tokens** |  |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT` | `VkDispatchIndirectCommand` |
| **Ray Tracing Tokens** |  |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT` | `VkTraceRaysIndirectCommand2KHR` |
| **Graphics State Tokens** |  |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT` | `VkBindIndexBufferIndirectCommandEXT` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT` | `VkBindVertexBufferIndirectCommandEXT` |
| **Graphics Draw Tokens** |  |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT` | `VkDrawIndexedIndirectCommand` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT` | `VkDrawIndirectCommand` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT` | `VkDrawMeshTasksIndirectCommandEXT` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT` | `VkDrawMeshTasksIndirectCommandNV` |
| **Graphics Draw Count Tokens** |  |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT` | `VkDrawIndirectCountIndirectCommandEXT` with `VkDrawIndexedIndirectCommand` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT` | `VkDrawIndirectCountIndirectCommandEXT` with `VkDrawIndirectCommand` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT` | `VkDrawIndirectCountIndirectCommandEXT` with `VkDrawMeshTasksIndirectCommandEXT` |
| `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT` | `VkDrawIndirectCountIndirectCommandEXT` with `VkDrawMeshTasksIndirectCommandNV` |

All commands can be stored 4-byte aligned, independent of 64-bit alignment of structures due to use of `VkDeviceAddress`.  This provides binary compatibility with D3D12.

The type of tokens in a sequence is specified by `VkIndirectCommandsTokenTypeEXT` which must be one of the values:

typedef enum VkIndirectCommandsTokenTypeEXT {
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT,
} VkIndirectCommandsTokenTypeEXT;

An array of 32-bit unsigned integer values are the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT` token.
Each value is an index, specified in canonical pipeline order, into the Indirect Execution Set.
One index value must be passed for each bit set in VkIndirectCommandsExecutionSetTokenEXT::shaderStages.

The `VkIndirectCommandsExecutionSetTokenEXT` structure specifies additional info used when creating the layout object:

struct VkIndirectCommandsExecutionSetTokenEXT {
    VkIndirectExecutionSetInfoTypeEXT      type;
    VkShaderStageFlags                     shaderStages;
};

* 
`type` must be either `VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT` or `VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT`.

* 
`shaderStages` specifies the shaders that will be changed by this token.

This must be the first command in a sequence when used.

Pipelines and shaders bound in indirect buffers must be flagged at creation time:

#define VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT            ((VkPipelineCreateFlagBits)0x4000000000ULL)
#define VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT                ((VkShaderCreateFlagBitsEXT)0x00000080)

Raw 32-bit values are the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` token.

Interpretation of the data is specified at layout creation time:

typedef struct VkIndirectCommandsPushConstantTokenEXT {
    VkPushConstantRange             updateRange;
} VkIndirectCommandsPushConstantTokenEXT;

* 
`updateRange` is the range of push constant data to update.

There is a single `uint32_t` of placeholder data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT` token which is not accessed by the shader. It writes a single 32-bit value containing the current sequence index to the specified push constant range.

Interpretation of the data is specified at layout creation time:

typedef struct VkIndirectCommandsPushConstantTokenEXT {
    VkPushConstantRange             updateRange;
} VkIndirectCommandsPushConstantTokenEXT;

* 
`updateRange` is the range of push constant data to update. `updateRange.size` must be 4.

The `VkBindIndexBufferIndirectCommandEXT` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT` token.

typedef struct VkBindIndexBufferIndirectCommandEXT {
    VkDeviceAddress bufferAddress;
    uint32_t        size;
    VkIndexType     indexType;
} VkBindIndexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the `VkBuffer` used as an index buffer.

* 
`size` is the byte size range which is available for this operation from the provided address.

* 
`indexType` is a `VkIndexType` value specifying how indices are treated.  Instead of the Vulkan enum values, custom `uint32_t` values can be mapped to an `VkIndexType` as described below.

The index buffer is bound as specified at layout creation time:

typedef struct VkIndirectCommandsIndexBufferTokenEXT {
    VkIndirectCommandsInputModeFlagsEXT mode;
} VkIndirectCommandsIndexBufferTokenEXT;

* 
`mode` is a single `VkIndirectCommandsInputModeFlagBitsEXT` value specifying the mode to be used with this token.

The VkIndirectCommandsInputModeFlagsEXT enum is defined as:

typedef enum VkIndirectCommandsInputModeFlagBitsEXT
{
    VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT = 0x00000002,
} VkIndirectCommandsInputModeFlagBitsEXT;
typedef VkFlags VkIndirectCommandsInputModeFlagsEXT;

* 
`VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT` indicates that the indirect buffer contains `VkBindIndexBufferIndirectCommandEXT`.

* 
`VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT` indicates that the indirect buffer contains `D3D12_INDEX_BUFFER_VIEW`.

This allows for easy layering of Vulkan atop other APIs.  When `VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT` is specified, the indirect buffer can contain a `D3D12_INDEX_BUFFER_VIEW` instead of `VkBindIndexBufferIndirectCommandEXT` as D3D’s DXGI format value is mapped to the `VkIndexType`. It works as both structs are otherwise binary compatible.

The `VkBindVertexBufferIndirectCommandEXT` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT` token.

typedef struct VkBindVertexBufferIndirectCommandEXT {
    VkDeviceAddress bufferAddress;
    uint32_t        size;
    uint32_t        stride;
} VkBindVertexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the `VkBuffer` used as a vertex input binding.

* 
`size` is the byte size range which is available for this operation from the provided address.

* 
`stride` is the byte size stride for this vertex input binding as in `VkVertexInputBindingDescription::stride`.

The vertex buffer is bound as specified at layout creation time:

typedef struct VkIndirectCommandsVertexBufferTokenEXT {
    uint32_t            vertexBindingUnit;
} VkIndirectCommandsVertexBufferTokenEXT;

* 
`vertexBindingUnit` is the vertex input binding number to be bound.

Both  `VkBindVertexBufferIndirectCommandEXT` and `D3D12_VERTEX_BUFFER_VIEW` structs are binary compatible.

Draws can be executed with following commands:

* 
The `VkDrawIndexedIndirectCommand` structure specifies the inputs data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT` token.

* 
The `VkDrawIndirectCommand` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT` token.

* 
If `EXT_mesh_shader` is enabled, the `VkDrawMeshTasksIndirectCommandEXT` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT` token.

* 
If `NV_mesh_shader` is enabled, the `VkDrawMeshTasksIndirectCommandNV` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT` token.

Multiple draws can be executed using the following commands:

* 
Indexed draws with the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT` token.

* 
Non-indexed draws with the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT` token.

* 
If `EXT_mesh_shader` is enabled, mesh tasks with the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT` token.

* 
If `NV_mesh_shader` is enabled, mesh tasks with the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT` token.

* 
The `DrawIndex` shader variable is zero-indexed for each multi-draw token.

All multi-draw commands use `VkDrawIndirectCountIndirectCommandEXT` data:

typedef struct VkDrawIndirectCountIndirectCommandEXT {
    VkDeviceAddress bufferAddress;
    uint32_t        stride;
    uint32_t        commandCount;
} VkDrawIndirectCountIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the `VkBuffer` used for draw commands.

* 
`stride` is the byte size stride for the command arguments

* 
`commandCount` is the number of commands to execute

The data in `bufferAddress` depends on the token:

* 
`VkDrawIndexedIndirectCommand` for `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT`.

* 
`VkDrawIndirectCommand` for `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT` .

* 
`VkDrawMeshTasksIndirectCommandEXT` for `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT`.

* 
`VkDrawMeshTasksIndirectCommandNV` for `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT`.

The `VkDispatchIndirectCommand` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT` token.

If `VK_KHR_ray_tracing_maintenance1` is enabled, the `VkTraceRaysIndirectCommand2KHR` structure specifies the input data for the `VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT` token.

The generation of commands on the device may require a preprocess buffer.  Implementations may use this for the storage of device-specific commands or scratch memory.

To retrieve the memory size and alignment requirements of a particular execution state call:

VKAPI_ATTR void VKAPI_CALL vkGetGeneratedCommandsMemoryRequirementsEXT(
    VkDevice                                            device,
    const VkGeneratedCommandsMemoryRequirementsInfoEXT* pInfo,
    VkMemoryRequirements2*                              pMemoryRequirements);

* 
`device` is the logical device that will create the buffer.

* 
`pInfo` is a pointer to a `VkGeneratedCommandsMemoryRequirementsInfoEXT` structure containing parameters required for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a `VkMemoryRequirements2` structure in which the memory requirements of the buffer object are returned.

If `pMemoryRequirements→memoryRequirements.size` is zero then preprocessing is not required.

The `VkGeneratedCommandsMemoryRequirementsInfoEXT` structure is defined as:

typedef struct VkGeneratedCommandsMemoryRequirementsInfoEXT {
    VkStructureType              sType;
    const void*                  pNext;
    VkIndirectExecutionSetEXT    indirectExecutionSet;
    VkIndirectCommandsLayoutEXT  indirectCommandsLayout;
    uint32_t                     maxSequenceCount;
    uint32_t                     maxDrawCount;
} VkGeneratedCommandsMemoryRequirementsInfoEXT;

* 
`shaderStages` is the mask of shader stages that this buffer memory is intended to be used with during the execution.

* 
`indirectExecutionSet` is the indirect execution set to be used for binding shaders.  If the token sequence will contain a `VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT` token, it must not be `VK_NULL_HANDLE`.

* 
`indirectCommandsLayout` is the `VkIndirectCommandsLayoutEXT` that this buffer memory is intended to be used with.

* 
`maxSequenceCount` is the maximum number of sequences that this buffer memory can be used with.

* 
`maxDrawCount` is the maximum number of indirect draws that can be executed by any COUNT-type multi-draw indirect tokens (equivalent to `maxDrawCount` in `vkCmdDrawIndirectCount`)

Preprocess buffer memory can be recycled with different execution/preprocessing operations, but must be synchronized using barriers with `VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT` and `VK_ACCESS_COMMAND_PREPROCESS_WRITE/READ_BIT_EXT`.

The contents and the layout of this buffer is opaque to applications and must not be modified or copied to another buffer for reuse.

If `indirectExecutionSet` is `VK_NULL_HANDLE`, pipeline or shader info must be passed through the pNext pointer using either a `VkGeneratedCommandsPipelineInfoEXT` or `VkGeneratedCommandsShaderInfoEXT` struct.

The `VkGeneratedCommandsPipelineInfoEXT` structure is defined as:

typedef struct VkGeneratedCommandsPipelineInfoEXT {
    VkStructureType              sType;
    const void*                  pNext;
    VkPipeline                   pipeline;
} VkGeneratedCommandsPipelineInfoEXT;

* 
`pipeline` is a pipeline comprised of shaders that are compatible with the ones which will be used with the resulting indirect buffer.

The `VkGeneratedCommandsShaderInfoEXT` structure is defined as:

typedef struct VkGeneratedCommandsShaderInfoEXT {
    VkStructureType              sType;
    const void*                  pNext;
    uint32_t                     shaderCount;
    const VkShaderExt           *pShaders;
} VkGeneratedCommandsShaderInfoEXT;

* 
`shaderCount` is the number of members in the `pShaders` array.

* 
`pShaders` is a pointer to an array of shaders that are compatible with the ones which will be used with the resulting indirect buffer.

Synchronization of preprocessing via `vkCmdPreprocessGeneratedCommandsEXT` and generation/execution via `vkCmdExecuteGeneratedCommandsEXT` is supported with a new stage and access flags:

#define VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT  ((VkPipelineStageFlagBits)0x00020000)

#define VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT     ((VkAccessFlagBits)0x00020000)
#define VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT    ((VkAccessFlagBits)0x00040000)

* 
`VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT` specifies the stage of the pipeline where device-side preprocessing for generated commands via `vkCmdPreprocessGeneratedCommandsEXT` is handled.

* 
`VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT` specifies reads from buffer inputs to `vkCmdPreprocessGeneratedCommandsEXT`. Such access occurs in the `VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT` pipeline stage.

* 
`VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT` specifies writes to preprocess outputs from `vkCmdPreprocessGeneratedCommandsEXT`. Such access occurs in the `VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT` pipeline stage.

Device-generated commands are specified by:

typedef struct VkGeneratedCommandsInfoEXT {
    VkStructureType                  sType;
    const void*                      pNext;
    VkShaderStageFlags               shaderStages;
    VkIndirectExecutionSetEXT        indirectExecutionSet;
    VkIndirectCommandsLayoutEXT      indirectCommandsLayout;
    VkDeviceAddress                  indirectAddress;
    VkDeviceSize                     indirectAddressSize;
    VkDeviceAddress                  preprocessAddress;
    VkDeviceSize                     preprocessSize;
    uint32_t                         maxSequenceCount;
    VkDeviceAddress                  sequenceCountAddress;
    uint32_t                         maxDrawCount;
} VkGeneratedCommandsInfoEXT;

* 
`shaderStages` is the mask of shader stages used by the commands.

* 
`indirectExecutionSet` is the indirect execution set to be used for binding shaders.  If the token sequence contains a `VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT` token, it must not be `VK_NULL_HANDLE`.

* 
`indirectCommandsLayout` is the `VkIndirectCommandsLayoutEXT` that specifies the command sequence data.

* 
`indirectAddress` is an address that holds the indirect buffer data.

* 
`indirectAddressSize` is the size of the address space that holds the indirect buffer data.

* 
`preprocessAddress` specifies a physical address of the `VkBuffer` used for preprocessing the input data for execution.  It must not be `0` if `vkGetGeneratedCommandsMemoryRequirementsEXT` returns non-zero size.

* 
`preprocessSize` is the maximum byte size within the `preprocessAddress` that is available for preprocessing.

* 
`maxSequenceCount` is used to determine the number of sequences to execute.  If `sequenceCountAddress` is not `NULL`, then `maxSequenceCount` is the maximum number of sequences that can be executed. The actual number is `min(maxSequenceCount, *sequenceCountAddress)`.  Otherwise if `sequenceCountAddress` is `NULL`, then `maxSequenceCount` is the exact number of sequences to execute.

* 
`sequenceCountAddress` specifies an optional physical address of a single `uint32_t` value containing the requested number of sequences to execute.

* 
`maxDrawCount` is the maximum number of indirect draws that can be executed by any COUNT-type multi-draw indirect tokens (equivalent to `maxDrawCount` in `vkCmdDrawIndirectCount`)

When preprocessing, if `indirectExecutionSet` is `VK_NULL_HANDLE` then pipeline or shader info must be passed through the pNext pointer using either a `VkGeneratedCommandsPipelineInfoEXT` or `VkGeneratedCommandsShaderInfoEXT` struct.

The actual generation of commands as well as their execution on the device is handled as single action with:

VKAPI_ATTR void VKAPI_CALL vkCmdExecuteGeneratedCommandsEXT(
    VkCommandBuffer                   commandBuffer,
    VkBool32                          isPreprocessed,
    const VkGeneratedCommandsInfoEXT* pGeneratedCommandsInfo);

* 
`commandBuffer` is the command buffer into which the command is recorded.

* 
`isPreprocessed` represents whether the input data has been previously preprocessed on the device. If it is `VK_TRUE`, `vkCmdPreprocessGeneratedCommandsEXT` must have been previously called. If it is `VK_FALSE`, any necessary processing will be performed as part of this command.

* 
`pGeneratedCommandsInfo` is a pointer to a `VkGeneratedCommandsInfoEXT` structure containing parameters affecting the generation of commands.

All state affected by executed tokens is undefined after this command. The view mask of an active rendering pass must be zero.

Commands can be preprocessed prior execution using the following command:

VKAPI_ATTR void VKAPI_CALL vkCmdPreprocessGeneratedCommandsEXT(
    VkCommandBuffer commandBuffer,
    const VkGeneratedCommandsInfoEXT* pGeneratedCommandsInfo,
    VkCommandBuffer stateCommandBuffer);

* 
`commandBuffer` is the command buffer which does the preprocessing.

* 
`pGeneratedCommandsInfo` is a pointer to a `VkGeneratedCommandsInfoEXT` structure containing parameters affecting the preprocessing step.

* 
`stateCommandBuffer` is an command buffer from which to pull state affecting the preprocessing step.

Explicitly preprocessing the indirect buffer provides more control over the scheduling of work.  If not performed, the implementation may still have additional work to do that is deferred to execution time.
The bound state in `stateCommandBuffer` must be identical to the state bound at the time `vkCmdExecuteGeneratedCommandsEXT` is recorded.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT
{
    VkStructureType sType;
    const void*     pNext;
    VkBool32        deviceGeneratedCommands;
    VkBool32        dynamicGeneratedPipelineLayout;
} VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT;

* 
`deviceGeneratedCommands` is the core feature enabling the extension

* 
`dynamicGeneratedPipelineLayout` enables passing a `VkPipelineLayoutCreateInfo` in the `pNext` of `VkIndirectCommandsLayoutCreateInfoEXT` with a `VK_NULL_HANDLE` `pipelineLayout`

The following properties are exposed by this extension:

typedef struct VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT
{
    VkStructureType sType;
    const void*     pNext;
    uint32_t        maxIndirectPipelineCount;
    uint32_t        maxIndirectShaderObjectCount;
    uint32_t        maxIndirectSequenceCount;
    uint32_t        maxIndirectCommandsTokenCount;
    uint32_t        maxIndirectCommandsTokenOffset;
    uint32_t        maxIndirectCommandsIndirectStride;
    VkIndirectCommandsInputModeFlagsEXT supportedIndirectCommandsInputModes;
    VkShaderStageFlags supportedIndirectCommandsShaderStages;
    VkShaderStageFlags supportedIndirectCommandsShaderStagesPipelineBinding;
    VkShaderStageFlags supportedIndirectCommandsShaderStagesShaderBinding;
    VkBool32        deviceGeneratedCommandsTransformFeedback;
    VkBool32        deviceGeneratedCommandsMultiDrawIndirectCount;
} VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT;

The following limits affect indirect execution set creation:

* 
`maxIndirectPipelineCount` indicates the maximum number of pipelines that can be stored in an indirect execution set.

* 
`maxIndirectShaderObjectCount` indicates the maximum number of shader objects that can be stored in an indirect execution set.

* 
`supportedIndirectCommandsShaderStagesPipelineBinding` is a bitmask of the shader stages which can be used within indirect execution sets comprised of pipelines.

* 
`supportedIndirectCommandsShaderStagesShaderBinding` is a bitmask of the shader stages which can be used within indirect execution sets comprised of shader objects.

The following limits affect indirect command layout creation:

* 
`maxIndirectCommandsTokenCount` indicates the maximum number of tokens in a sequence.

* 
`maxIndirectCommandsTokenOffset` indicates the maximum byte offset of a token within a sequence.

* 
`supportedIndirectCommandsInputModes` indicates the supported index buffer modes.

The following limits affect indirect command execution:

* 
`maxIndirectSequenceCount` indicates the maximum number of sequences that can executed.

* 
`maxIndirectCommandsIndirectStride` indicates the maximum stride that can be used for the indirect buffer.

If `VK_EXT_transform_feedback` is also enabled, `deviceGeneratedCommandsTransformFeedback` enables the use of Transform Feedback with indirect execution.

`supportedIndirectCommandsShaderStages` is a bitmask of the shader stages which can be active while executing indirect commands as well as the use of certain tokens.

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` and `VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT` are always supported for the specified stages.

`VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT` enables use of these tokens:

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT` if `deviceGeneratedCommandsMultiDrawIndirectCount` is supported

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT` if `deviceGeneratedCommandsMultiDrawIndirectCount` is supported

If `EXT_mesh_shader` extension is also enabled, `VK_SHADER_STAGE_FRAGMENT_BIT | VK_SHADER_STAGE_MESH_BIT_EXT` enables use of these tokens:

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT` if `deviceGeneratedCommandsMultiDrawIndirectCount` is supported

If `NV_mesh_shader` extension is also enabled, `VK_SHADER_STAGE_FRAGMENT_BIT | VK_SHADER_STAGE_MESH_BIT_NV` enables use of these tokens:

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT`

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT` if `deviceGeneratedCommandsMultiDrawIndirectCount` is supported

`VK_SHADER_STAGE_COMPUTE_BIT` enables use of these tokens:

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT`

If `VK_KHR_ray_tracing_maintenance1` is also enabled, the presence of ray tracing stages enables use of these tokens:

* 
`VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT`

Most structures have direct equivalents:

| **D3D12 type** | **Vulkan type** |
| --- | --- |
| `D3D12_DRAW_ARGUMENTS` | `VkDrawIndirectCommand` |
| `D3D12_DRAW_INDEXED_ARGUMENTS` | `VkDrawIndexedIndirectCommand` |
| `D3D12_DISPATCH_ARGUMENTS` | `VkDispatchIndirectCommand` |
| `D3D12_INDEX_BUFFER_VIEW` | `VkBindIndexBufferIndirectCommandEXT` |
| `D3D12_VERTEX_BUFFER_VIEW` | `VkBindVertexBufferIndirectCommandEXT` |

Binding of views or constants require translation due to mismatches between the APIs.

Maps to `VkIndirectCommandsTokenTypeEXT`:

| **D3D12 value** | **Vulkan value** |
| --- | --- |
| `D3D12_INDIRECT_ARGUMENT_TYPE_DRAW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_DRAW_INDEXED` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_DISPATCH` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_VERTEX_BUFFER_VIEW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_INDEX_BUFFER_VIEW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_CONSTANT` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_CONSTANT_BUFFER_VIEW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_SHADER_RESOURCE_VIEW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_UNORDERED_ACCESS_VIEW` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_DISPATCH_RAYS` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT` |
| `D3D12_INDIRECT_ARGUMENT_TYPE_DISPATCH_MESH` | `VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT` |

A root descriptor in D3D12 is a 64-bit virtual address to a raw buffer. To implement this, `VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT` tokens can be used to update buffer device addresses stored in push constants rather than interacting with the descriptor binding model. Similar techniques can be used to update non-root descriptors as well.

`VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT` can be used to mimic D3D12 DGC TIER_1_1 support.

* 
`ByteStride` is specified at execution time with `VkGeneratedCommandsInfoEXT::indirectAddressRegion.stride`.

* 
Set `VkIndirectCommandsIndexBufferTokenEXT::mode` to `VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT` to remap `DXGI_FORMAT` values.

Alignment requirements:

* 
`ByteStride` is 4 byte aligned

* 
`CountBufferOffset` is 4 byte aligned

* 
`ArgumentBufferOffset` is 4 byte aligned

* 
`tokenOffset` is 4 byte aligned

TODO

New pointer members will be added to `VkIndirectCommandsTokenDataEXT`.

No additional state changes are permitted in order to enable fast and broad adoption.

All implementation-supported shader stagess can be changed indirectly. No pipeline state may be changed. Future extensions may expose additional functionality.

* 
Significant overlap in functionality with Shader Binding Tables

* 
Indirect Object Sets would allow for indirect dynamic state groups.

Recent extensions have been using fixed rather than queryable alignment rules. It makes sense to use fixed alignments here too.

`D3D12_INDEX_BUFFER_VIEW` and `VkBindIndexBufferIndirectCommandEXT` have the same memory layout but `DXGI_FORMAT` and `VkIndexType` do not have equivalent values.  Providing the ability to remap index type values in the layout simplifies API emulation.

There is explicit mapping from data values to `VkIndexType`.

Yes, indirect buffers can be reused.

No such commands are provided.

A `stateCommandBuffer` is added to `vkCmdPreprocessGeneratedCommandsEXT` with the requirement that all state must match between this command buffer and the one used to record `vkCmdExecuteGeneratedCommandsEXT`.
This guarantees that all pipeline state and, specifically for draw commands, other state (e.g., vertex buffers, index buffers) is available at preprocess time.

* 
Support for Multi-dispatch (needs something like `gl_drawID` for compute shaders).

* 
Multi-level indirect execution through a command that is equivalent to `vkCmdExecuteGeneratedCommandsEXT`.

* 
Indirect command buffers.

* 
Example section
