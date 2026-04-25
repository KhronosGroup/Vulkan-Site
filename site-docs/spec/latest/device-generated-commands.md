# Device-Generated Commands

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/device_generated_commands/generatedcommands.html

## Table of Contents

- [Indirect Commands Layout](#indirectmdslayout)
- [Indirect_Commands_Layout](#indirectmdslayout)
- [Creation and Deletion](#_creation_and_deletion)
- [Creation_and_Deletion](#_creation_and_deletion)
- [Token Input Streams](#_token_input_streams)
- [Token_Input_Streams](#_token_input_streams)
- [Tokenized Command Processing](#_tokenized_command_processing)
- [Tokenized_Command_Processing](#_tokenized_command_processing)
- [Indirect Commands Generation and Execution](#_indirect_commands_generation_and_execution)
- [Indirect_Commands_Generation_and_Execution](#_indirect_commands_generation_and_execution)
- [Indirect Execution Sets](#device-generated-indirect-execution-sets)
- [Indirect_Execution_Sets](#device-generated-indirect-execution-sets)

## Content

This chapter discusses the generation of command buffer content on the
device, for which these principle steps are to be taken:

* 
Define a layout describing the sequence of commands which should be
generated.

* 
Optionally set up device-bindable shaders.

* 
Retrieve device addresses by [vkGetBufferDeviceAddressEXT](../resources.html#vkGetBufferDeviceAddressEXT) for
setting buffers on the device.

* 
Fill one or more `VkBuffer` with the appropriate content that gets
interpreted by the command layout.

* 
Create a `preprocess` `VkBuffer` using the device-queried allocation
information.

* 
Optionally preprocess the input data in a separate action.

* 
Generate and execute the actual commands.

The preprocessing step executes in a separate logical pipeline from either
graphics or compute.
When preprocessing commands in a separate step they **must** be explicitly
synchronized against the command execution.
When not preprocessing in a separate step, the preprocessing is
automatically synchronized against the command execution.

The device-side command generation happens through an iterative processing
of an atomic sequence comprised of command tokens, which are represented by:

// Provided by VK_EXT_device_generated_commands
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectCommandsLayoutEXT)

or:

// Provided by VK_NV_device_generated_commands
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectCommandsLayoutNV)

Each indirect command layout **must** have exactly one action command token and
it **must** be the last token in the sequence.

|  | If the indirect commands layout contains only 1 token, it will be an action
| --- | --- |
command token, and the contents of the indirect buffer will be a sequence of
indirect command structures, similar to the ones used for indirect draws and
dispatches.
On some implementations, using indirect draws and dispatches for these cases
will result in increased performance compared to using device-generated
commands, due to the overhead that results from using the latter. |

Indirect command layouts for `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)` are
created by:

// Provided by VK_EXT_device_generated_commands
VkResult vkCreateIndirectCommandsLayoutEXT(
    VkDevice                                    device,
    const VkIndirectCommandsLayoutCreateInfoEXT* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectCommandsLayoutEXT*                pIndirectCommandsLayout);

* 
`device` is the logical device that creates the indirect command
layout.

* 
`pCreateInfo` is a pointer to a
[VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) structure containing
parameters affecting creation of the indirect command layout.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pIndirectCommandsLayout` is a pointer to a
`VkIndirectCommandsLayoutEXT` handle in which the resulting indirect
command layout is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-deviceGeneratedCommands-11089) VUID-vkCreateIndirectCommandsLayoutEXT-deviceGeneratedCommands-11089

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-device-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pCreateInfo-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pAllocator-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-pIndirectCommandsLayout-parameter) VUID-vkCreateIndirectCommandsLayoutEXT-pIndirectCommandsLayout-parameter

 `pIndirectCommandsLayout` **must** be a valid pointer to a [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutEXT-device-queuecount) VUID-vkCreateIndirectCommandsLayoutEXT-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkIndirectCommandsLayoutCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsLayoutCreateInfoEXT {
    VkStructureType                            sType;
    const void*                                pNext;
    VkIndirectCommandsLayoutUsageFlagsEXT      flags;
    VkShaderStageFlags                         shaderStages;
    uint32_t                                   indirectStride;
    VkPipelineLayout                           pipelineLayout;
    uint32_t                                   tokenCount;
    const VkIndirectCommandsLayoutTokenEXT*    pTokens;
} VkIndirectCommandsLayoutCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkIndirectCommandsLayoutUsageFlagBitsEXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT) specifying usage rules
for this layout.

* 
`shaderStages` is the [VkShaderStageFlags](../pipelines.html#VkShaderStageFlags) that this layout
supports.

* 
`indirectStride` is the distance in bytes between sequences in the
indirect buffer

* 
`pipelineLayout` is the optional [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that tokens
in this layout use.
If the [    `dynamicGeneratedPipelineLayout`](../features.html#features-dynamicGeneratedPipelineLayout) feature is enabled,
`pipelineLayout` **can** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) and the layout **must**
be specified by chaining the [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) structure
off the `pNext`.
If the [`descriptorHeap`](../features.html#features-descriptorHeap) feature is
enabled, `pipelineLayout` **can** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) without
providing a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) structure.

* 
`tokenCount` is the length of the individual command sequence.

* 
`pTokens` is a pointer to an array of
[VkIndirectCommandsLayoutTokenEXT](#VkIndirectCommandsLayoutTokenEXT) describing each command token in
detail.

The following code illustrates some of the flags:

void cmdProcessAllSequences(cmd, indirectExecutionSet, indirectCommandsLayout, indirectAddress, sequencesCount)
{
  for (s = 0; s 

When tokens are consumed, an offset is computed based on token offset and
stream stride.
The resulting offset is required to be aligned.
The alignment for a specific token is equal to the scalar alignment of the
data type as defined in [Alignment Requirements](../interfaces.html#interfaces-alignment-requirements), or `4`, whichever is lower.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-indirectStride-11090) VUID-VkIndirectCommandsLayoutCreateInfoEXT-indirectStride-11090

`indirectStride` **must** be less than or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectCommandsIndirectStride`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11091) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11091

`shaderStages` **must** only contain stages supported by
[](../limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStages`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-11092) VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-11092

`tokenCount` **must** be less than or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectCommandsTokenCount`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11093) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11093

The number of tokens in the `pTokens` array with `type` equal to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) **must** be less
than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11145) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11145

The number of tokens in the `pTokens` array with `type` equal to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) **must** be less
than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11094) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11094

    The number of tokens in the `pTokens` array with `type` equal to
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)
or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)
    **must** be less than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11095) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11095

If the action command token in the `pTokens` array is not an indexed
draw token, then `pTokens` **must** not contain a member with
`type` set to [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11096) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11096

If the action command token in the `pTokens` array is not a non-mesh
draw token, then `pTokens` **must** not contain a member with
`type` set to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11097) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11097

If the `pTokens` array contains multiple tokens with `type`
equal to [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT), then
there **must** be no duplicate
[VkIndirectCommandsVertexBufferTokenEXT](#VkIndirectCommandsVertexBufferTokenEXT)::`vertexBindingUnit`
values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11099) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11099

    For all [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
    and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) type tokens
    in `pTokens`, there **must** be no overlapping ranges between any
    specified push constant ranges

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11100) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11100

The action command token **must** be the last token in the `pTokens`
array

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11139) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11139

If the `pTokens` array contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, then this
token **must** be the first token in the array

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11101) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11101

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) and the
[    `dynamicGeneratedPipelineLayout`](../features.html#features-dynamicGeneratedPipelineLayout) feature is not enabled, then the
`pipelineLayout` **must** not be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11102) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11102

For any element of `pTokens`, if `type` is either
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) and
`pipelineLayout` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the `pNext` chain
**must** include a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) struct

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11103) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11103

For any element of `pTokens`, the `offset` **must** be greater than
or equal to the `offset` member of the previous tokens

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11104) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11104

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT), or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT](#VkIndirectCommandsTokenTypeEXT), then `shaderStages`
**must** contain graphics stages

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11105) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11105

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#VkIndirectCommandsTokenTypeEXT), then
`shaderStages` **must** be [VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11106) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11106

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT), then
`shaderStages` **must** contain [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11107) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11107

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#VkIndirectCommandsTokenTypeEXT), then
the `shaderStages` **must** contain [VK_SHADER_STAGE_MESH_BIT_NV](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11108) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11108

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#VkIndirectCommandsTokenTypeEXT), then
`shaderStages` **must** contain ray tracing stages

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11109) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11109

    If `shaderStages` contains graphics stages then the state tokens in
    `pTokens` **must** not include
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#VkIndirectCommandsTokenTypeEXT),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11110) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11110

    If `shaderStages` is [VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits) then the
    state tokens in `pTokens` **must** only include
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#VkIndirectCommandsTokenTypeEXT),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
    or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11111) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11111

    If `shaderStages` contains ray tracing stages then the state tokens
    in `pTokens` **must** only include
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#VkIndirectCommandsTokenTypeEXT),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
    or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11112) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11112

The `shaderStages` **must** only contain stages from one of the
following:

[VK_SHADER_STAGE_ALL](../pipelines.html#VkShaderStageFlagBits) (if the [     `descriptorHeap`](../features.html#features-descriptorHeap) feature is enabled)

* 
graphics stages

* 
[VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits)

* 
mesh stages and [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)

* 
ray tracing stages

[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11113) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11113

If `shaderStages` contains [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits), then
`shaderStages` **must** also contain [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
or [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-sType) VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pNext-pNext) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-unique) VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-flags-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkIndirectCommandsLayoutUsageFlagBitsEXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-requiredbitmask) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pipelineLayout-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pipelineLayout-parameter

 If `pipelineLayout` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineLayout` **must** be a valid [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-parameter

 `pTokens` **must** be a valid pointer to an array of `tokenCount` valid [VkIndirectCommandsLayoutTokenEXT](#VkIndirectCommandsLayoutTokenEXT) structures

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-arraylength

 `tokenCount` **must** be greater than `0`

Bits which **can** be set in
[VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT)::`flags`, specifying usage
hints of an indirect command layout, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsLayoutUsageFlagBitsEXT {
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT = 0x00000002,
} VkIndirectCommandsLayoutUsageFlagBitsEXT;

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT)
specifies that the layout is always used with the manual preprocessing
step through calling [vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT) and
executed by [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT) with
`isPreprocessed` set to [VK_TRUE](../fundamentals.html#VK_TRUE).

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT)
specifies that the processing of sequences will happen at an
implementation-dependent order, which is not guaranteed to be
deterministic using the same input data.
This flag is ignored when the `shaderStages` is
[VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits) as it is implied that the dispatch
sequence is always unordered.

// Provided by VK_EXT_device_generated_commands
typedef VkFlags VkIndirectCommandsLayoutUsageFlagsEXT;

`VkIndirectCommandsLayoutUsageFlagsEXT` is a bitmask type for setting a
mask of zero or more [VkIndirectCommandsLayoutUsageFlagBitsEXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT).

Indirect command layouts for `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)` are
destroyed by:

// Provided by VK_EXT_device_generated_commands
void vkDestroyIndirectCommandsLayoutEXT(
    VkDevice                                    device,
    VkIndirectCommandsLayoutEXT                 indirectCommandsLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the layout.

* 
`indirectCommandsLayout` is the layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11114) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11114

All submitted commands that refer to `indirectCommandsLayout` **must**
have completed execution

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11115) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11115

If `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11116) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-11116

If no `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-device-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parameter

 If `indirectCommandsLayout` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-pAllocator-parameter) VUID-vkDestroyIndirectCommandsLayoutEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parent) VUID-vkDestroyIndirectCommandsLayoutEXT-indirectCommandsLayout-parent

 If `indirectCommandsLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectCommandsLayout` **must** be externally synchronized

Indirect command layouts for `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)` are
created by:

// Provided by VK_NV_device_generated_commands
VkResult vkCreateIndirectCommandsLayoutNV(
    VkDevice                                    device,
    const VkIndirectCommandsLayoutCreateInfoNV* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectCommandsLayoutNV*                 pIndirectCommandsLayout);

* 
`device` is the logical device that creates the indirect command
layout.

* 
`pCreateInfo` is a pointer to a
[VkIndirectCommandsLayoutCreateInfoNV](#VkIndirectCommandsLayoutCreateInfoNV) structure containing
parameters affecting creation of the indirect command layout.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pIndirectCommandsLayout` is a pointer to a
`VkIndirectCommandsLayoutNV` handle in which the resulting indirect
command layout is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-deviceGeneratedCommands-02929) VUID-vkCreateIndirectCommandsLayoutNV-deviceGeneratedCommands-02929

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-device-parameter) VUID-vkCreateIndirectCommandsLayoutNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pCreateInfo-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectCommandsLayoutCreateInfoNV](#VkIndirectCommandsLayoutCreateInfoNV) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pAllocator-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-pIndirectCommandsLayout-parameter) VUID-vkCreateIndirectCommandsLayoutNV-pIndirectCommandsLayout-parameter

 `pIndirectCommandsLayout` **must** be a valid pointer to a [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV) handle

* 
[](#VUID-vkCreateIndirectCommandsLayoutNV-device-queuecount) VUID-vkCreateIndirectCommandsLayoutNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkIndirectCommandsLayoutCreateInfoNV` structure is defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkIndirectCommandsLayoutCreateInfoNV {
    VkStructureType                           sType;
    const void*                               pNext;
    VkIndirectCommandsLayoutUsageFlagsNV      flags;
    VkPipelineBindPoint                       pipelineBindPoint;
    uint32_t                                  tokenCount;
    const VkIndirectCommandsLayoutTokenNV*    pTokens;
    uint32_t                                  streamCount;
    const uint32_t*                           pStreamStrides;
} VkIndirectCommandsLayoutCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) that this
layout targets.

* 
`flags` is a bitmask of
[VkIndirectCommandsLayoutUsageFlagBitsNV](#VkIndirectCommandsLayoutUsageFlagBitsNV) specifying usage hints of
this layout.

* 
`tokenCount` is the length of the individual command sequence.

* 
`pTokens` is an array describing each command token in detail.
See [VkIndirectCommandsTokenTypeNV](#VkIndirectCommandsTokenTypeNV) and
[VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV) below for details.

* 
`streamCount` is the number of streams used to provide the token
inputs.

* 
`pStreamStrides` is an array defining the byte stride for each input
stream.

The following code illustrates some of the flags:

void cmdProcessAllSequences(cmd, pipeline, indirectCommandsLayout, pIndirectCommandsTokens, sequencesCount, indexbuffer, indexbufferOffset)
{
  for (s = 0; s 

When tokens are consumed, an offset is computed based on token offset and
stream stride.
The resulting offset is required to be aligned.
The alignment for a specific token is equal to the scalar alignment of the
data type as defined in [Alignment Requirements](../interfaces.html#interfaces-alignment-requirements), or
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minIndirectCommandsBufferOffsetAlignment`,
whichever is lower.

|  | A `minIndirectCommandsBufferOffsetAlignment` of 4 allows
| --- | --- |
`VkDeviceAddress` to be packed as `uvec2` with scalar layout
instead of `uint64_t` with 8 byte alignment.
This enables direct compatibility with D3D12 command signature layouts. |

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-02930) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-02930

The `pipelineBindPoint` **must** be
[VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)
or [VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-02931) VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-02931

`tokenCount` **must** be greater than `0` and less than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxIndirectCommandsTokenCount`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02932) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02932

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#VkIndirectCommandsTokenTypeNV) it **must** be the
first element of the array and there **must** be only a single element of
such token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-09585) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-09585

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) it **must** be the first
element of the array and there **must** be only a single element of such
token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02933) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02933

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](#VkIndirectCommandsTokenTypeNV) there **must** be only
a single element of such token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02934) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02934

All state tokens in `pTokens` **must** occur before any action command
tokens ([VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV](#VkIndirectCommandsTokenTypeNV),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV](#VkIndirectCommandsTokenTypeNV),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](#VkIndirectCommandsTokenTypeNV),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](#VkIndirectCommandsTokenTypeNV)
, [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](#VkIndirectCommandsTokenTypeNV)
)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02935) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02935

The content of `pTokens` **must** include one single action command
token that is compatible with the `pipelineBindPoint`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-02936) VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-02936

`streamCount` **must** be greater than `0` and less or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxIndirectCommandsStreamCount`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-02937) VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-02937

each element of `pStreamStrides` **must** be greater than `0` and less
than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxIndirectCommandsStreamStride`.
Furthermore the alignment of each token input **must** be ensured

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09088) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09088

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint) then
the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedCompute`](../features.html#features-deviceGeneratedCompute)
feature **must** be enabled

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09089) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09089

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint) then
the state tokens in `pTokens` **must** only include
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](#VkIndirectCommandsTokenTypeNV),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](#VkIndirectCommandsTokenTypeNV),
or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09090) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09090

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint) and
`pTokens` includes
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-sType-sType) VUID-VkIndirectCommandsLayoutCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pNext-pNext) VUID-VkIndirectCommandsLayoutCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-flags-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkIndirectCommandsLayoutUsageFlagBitsNV](#VkIndirectCommandsLayoutUsageFlagBitsNV) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-parameter

 `pTokens` **must** be a valid pointer to an array of `tokenCount` valid [VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV) structures

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-parameter

 `pStreamStrides` **must** be a valid pointer to an array of `streamCount` `uint32_t` values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-arraylength

 `tokenCount` **must** be greater than `0`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-arraylength

 `streamCount` **must** be greater than `0`

Bits which **can** be set in
[VkIndirectCommandsLayoutCreateInfoNV](#VkIndirectCommandsLayoutCreateInfoNV)::`flags`, specifying usage
hints of an indirect command layout, are:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectCommandsLayoutUsageFlagBitsNV {
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV = 0x00000001,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV = 0x00000002,
    VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_NV = 0x00000004,
} VkIndirectCommandsLayoutUsageFlagBitsNV;

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV)
specifies that the layout is always used with the manual preprocessing
step through calling [vkCmdPreprocessGeneratedCommandsNV](#vkCmdPreprocessGeneratedCommandsNV) and
executed by [vkCmdExecuteGeneratedCommandsNV](#vkCmdExecuteGeneratedCommandsNV) with
`isPreprocessed` set to [VK_TRUE](../fundamentals.html#VK_TRUE).

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV)
specifies that the input data for the sequences is not implicitly
indexed from 0..sequencesUsed, but an application-provided
`VkBuffer` encoding the index is provided.

* 
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV)
specifies that the processing of sequences **can** happen at an
implementation-dependent order, which is not guaranteed to be coherent
using the same input data.
This flag is ignored when the `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint) as it is implied that the dispatch
sequence is always unordered.

// Provided by VK_NV_device_generated_commands
typedef VkFlags VkIndirectCommandsLayoutUsageFlagsNV;

`VkIndirectCommandsLayoutUsageFlagsNV` is a bitmask type for setting a
mask of zero or more [VkIndirectCommandsLayoutUsageFlagBitsNV](#VkIndirectCommandsLayoutUsageFlagBitsNV).

Indirect command layouts for `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)` are
destroyed by:

// Provided by VK_NV_device_generated_commands
void vkDestroyIndirectCommandsLayoutNV(
    VkDevice                                    device,
    VkIndirectCommandsLayoutNV                  indirectCommandsLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the layout.

* 
`indirectCommandsLayout` is the layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02938) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02938

All submitted commands that refer to `indirectCommandsLayout` **must**
have completed execution

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02939) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02939

If `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02940) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-02940

If no `VkAllocationCallbacks` were provided when
`indirectCommandsLayout` was created, `pAllocator` **must** be
`NULL`

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-deviceGeneratedCommands-02941) VUID-vkDestroyIndirectCommandsLayoutNV-deviceGeneratedCommands-02941

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-device-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parameter

 If `indirectCommandsLayout` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV) handle

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-pAllocator-parameter) VUID-vkDestroyIndirectCommandsLayoutNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parent) VUID-vkDestroyIndirectCommandsLayoutNV-indirectCommandsLayout-parent

 If `indirectCommandsLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectCommandsLayout` **must** be externally synchronized

For `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)`, the input streams **can**
contain raw `uint32_t` values, existing indirect commands such as:

* 
[VkDrawIndirectCommand](../drawing.html#VkDrawIndirectCommand)

* 
[VkDrawIndexedIndirectCommand](../drawing.html#VkDrawIndexedIndirectCommand)

* 
[VkDispatchIndirectCommand](../dispatch.html#VkDispatchIndirectCommand)

* 
[VkDrawMeshTasksIndirectCommandNV](../drawing.html#VkDrawMeshTasksIndirectCommandNV)

* 
[VkDrawMeshTasksIndirectCommandEXT](../drawing.html#VkDrawMeshTasksIndirectCommandEXT)

* 
[VkTraceRaysIndirectCommandKHR](../raytracing.html#VkTraceRaysIndirectCommandKHR)

* 
[VkTraceRaysIndirectCommand2KHR](../raytracing.html#VkTraceRaysIndirectCommand2KHR)

or additional commands as listed below.
How the data is used is described in the next section.

The `VkBindIndexBufferIndirectCommandEXT` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkBindIndexBufferIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    VkIndexType        indexType;
} VkBindIndexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](../resources.html#VkBuffer)
used as index buffer.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`indexType` is a [VkIndexType](../drawing.html#VkIndexType) value specifying how indices are
treated.

Valid Usage

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-None-11117) VUID-VkBindIndexBufferIndirectCommandEXT-None-11117

The buffer’s usage flags from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDEX_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-11118) VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-11118

The `bufferAddress` **must** be aligned to the [VkIndexType](../drawing.html#VkIndexType) of the
`indexType` used

Valid Usage (Implicit)

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-parameter) VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-indexType-parameter) VUID-VkBindIndexBufferIndirectCommandEXT-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](../drawing.html#VkIndexType) value

The `VkBindVertexBufferIndirectCommandEXT` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkBindVertexBufferIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    uint32_t           stride;
} VkBindVertexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](../resources.html#VkBuffer)
used as vertex input binding.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`stride` is the byte size stride for this vertex input binding as in
`VkVertexInputBindingDescription`::`stride`.

Valid Usage

* 
[](#VUID-VkBindVertexBufferIndirectCommandEXT-None-11120) VUID-VkBindVertexBufferIndirectCommandEXT-None-11120

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBufferIndirectCommandEXT-bufferAddress-parameter) VUID-VkBindVertexBufferIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

The `VkDrawIndirectCountIndirectCommandEXT` structure specifies the
input data for all draw-type tokens.

// Provided by VK_EXT_device_generated_commands
typedef struct VkDrawIndirectCountIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           stride;
    uint32_t           commandCount;
} VkDrawIndirectCountIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](../resources.html#VkBuffer)
used for draw commands.

* 
`stride` is the byte size stride for the command arguments

* 
`commandCount` is the number of commands to execute

The corresponding indirect draw structure data will be read from the buffer
address.

Valid Usage

* 
[](#VUID-VkDrawIndirectCountIndirectCommandEXT-None-11122) VUID-VkDrawIndirectCountIndirectCommandEXT-None-11122

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkDrawIndirectCountIndirectCommandEXT-bufferAddress-parameter) VUID-VkDrawIndirectCountIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

The `VkIndirectCommandsStreamNV` structure specifies the input data for
one or more tokens at processing time.

// Provided by VK_NV_device_generated_commands
typedef struct VkIndirectCommandsStreamNV {
    VkBuffer        buffer;
    VkDeviceSize    offset;
} VkIndirectCommandsStreamNV;

* 
`buffer` specifies the [VkBuffer](../resources.html#VkBuffer) storing the functional
arguments for each sequence.
These arguments **can** be written by the device.

* 
`offset` specified an offset into `buffer` where the arguments
start.

Valid Usage

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-02942) VUID-VkIndirectCommandsStreamNV-buffer-02942

The `buffer`’s usage flag **must** have the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

* 
[](#VUID-VkIndirectCommandsStreamNV-offset-02943) VUID-VkIndirectCommandsStreamNV-offset-02943

The `offset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minIndirectCommandsBufferOffsetAlignment`

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-02975) VUID-VkIndirectCommandsStreamNV-buffer-02975

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-parameter) VUID-VkIndirectCommandsStreamNV-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](../resources.html#VkBuffer) handle

For `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)`, the input streams **can** contain
raw `uint32_t` values, existing indirect commands such as:

* 
[VkDrawIndirectCommand](../drawing.html#VkDrawIndirectCommand)

* 
[VkDrawIndexedIndirectCommand](../drawing.html#VkDrawIndexedIndirectCommand)

* 
[VkDrawMeshTasksIndirectCommandNV](../drawing.html#VkDrawMeshTasksIndirectCommandNV)

* 
[VkDrawMeshTasksIndirectCommandEXT](../drawing.html#VkDrawMeshTasksIndirectCommandEXT)

* 
[VkDispatchIndirectCommand](../dispatch.html#VkDispatchIndirectCommand)

or additional commands as listed below.
How the data is used is described in the next section.

The `VkBindShaderGroupIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#VkIndirectCommandsTokenTypeNV) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindShaderGroupIndirectCommandNV {
    uint32_t    groupIndex;
} VkBindShaderGroupIndirectCommandNV;

* 
`groupIndex` specifies which shader group of the current bound
graphics pipeline is used.

Valid Usage

* 
[](#VUID-VkBindShaderGroupIndirectCommandNV-None-02944) VUID-VkBindShaderGroupIndirectCommandNV-None-02944

The current bound graphics pipeline, as well as the pipelines it may
reference, **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkBindShaderGroupIndirectCommandNV-index-02945) VUID-VkBindShaderGroupIndirectCommandNV-index-02945

The `index` **must** be within range of the accessible shader groups of
the current bound graphics pipeline.
See [vkCmdBindPipelineShaderGroupNV](../pipelines.html#vkCmdBindPipelineShaderGroupNV) for further details

The `VkBindIndexBufferIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV](#VkIndirectCommandsTokenTypeNV) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindIndexBufferIndirectCommandNV {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    VkIndexType        indexType;
} VkBindIndexBufferIndirectCommandNV;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](../resources.html#VkBuffer)
used as index buffer.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`indexType` is a [VkIndexType](../drawing.html#VkIndexType) value specifying how indices are
treated.
Instead of the Vulkan enum values, a custom `uint32_t` value **can** be
mapped to [VkIndexType](../drawing.html#VkIndexType) by specifying the
`VkIndirectCommandsLayoutTokenNV`::`pIndexTypes` and
`VkIndirectCommandsLayoutTokenNV`::`pIndexTypeValues` arrays.

Valid Usage

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-None-02946) VUID-VkBindIndexBufferIndirectCommandNV-None-02946

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDEX_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-02947) VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-02947

The `bufferAddress` **must** be aligned to the `indexType` used

Valid Usage (Implicit)

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-parameter) VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-indexType-parameter) VUID-VkBindIndexBufferIndirectCommandNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](../drawing.html#VkIndexType) value

The `VkBindVertexBufferIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](#VkIndirectCommandsTokenTypeNV) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindVertexBufferIndirectCommandNV {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    uint32_t           stride;
} VkBindVertexBufferIndirectCommandNV;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](../resources.html#VkBuffer)
used as vertex input binding.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`stride` is the byte size stride for this vertex input binding as in
`VkVertexInputBindingDescription`::`stride`.
It is only used if
`VkIndirectCommandsLayoutTokenNV`::`vertexDynamicStride` was
set, otherwise the stride is inherited from the current bound graphics
pipeline.

Valid Usage

* 
[](#VUID-VkBindVertexBufferIndirectCommandNV-None-02949) VUID-VkBindVertexBufferIndirectCommandNV-None-02949

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBufferIndirectCommandNV-bufferAddress-parameter) VUID-VkBindVertexBufferIndirectCommandNV-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

The `VkSetStateFlagsIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](#VkIndirectCommandsTokenTypeNV) token.
Which state is changed depends on the [VkIndirectStateFlagBitsNV](#VkIndirectStateFlagBitsNV)
specified at `VkIndirectCommandsLayoutNV` creation time.

// Provided by VK_NV_device_generated_commands
typedef struct VkSetStateFlagsIndirectCommandNV {
    uint32_t    data;
} VkSetStateFlagsIndirectCommandNV;

* 
`data` encodes packed state that this command alters.

Bit `0`: If set represents [VK_FRONT_FACE_CLOCKWISE](../primsrast.html#VkFrontFace), otherwise
[VK_FRONT_FACE_COUNTER_CLOCKWISE](../primsrast.html#VkFrontFace)

A subset of the graphics pipeline state **can** be altered using indirect state
flags:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectStateFlagBitsNV {
    VK_INDIRECT_STATE_FLAG_FRONTFACE_BIT_NV = 0x00000001,
} VkIndirectStateFlagBitsNV;

* 
[VK_INDIRECT_STATE_FLAG_FRONTFACE_BIT_NV](#VkIndirectStateFlagBitsNV) allows to toggle the
[VkFrontFace](../primsrast.html#VkFrontFace) rasterization state for subsequent drawing commands.

// Provided by VK_NV_device_generated_commands
typedef VkFlags VkIndirectStateFlagsNV;

`VkIndirectStateFlagsNV` is a bitmask type for setting a mask of zero or
more [VkIndirectStateFlagBitsNV](#VkIndirectStateFlagBitsNV).

The `VkBindPipelineIndirectCommandNV` structure specifies the input data
for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) token.

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkBindPipelineIndirectCommandNV {
    VkDeviceAddress    pipelineAddress;
} VkBindPipelineIndirectCommandNV;

* 
`pipelineAddress` specifies the pipeline address of the compute
pipeline that will be used in device generated rendering.

Valid Usage

* 
[](#VUID-VkBindPipelineIndirectCommandNV-deviceGeneratedComputePipelines-09091) VUID-VkBindPipelineIndirectCommandNV-deviceGeneratedComputePipelines-09091

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09092) VUID-VkBindPipelineIndirectCommandNV-None-09092

The referenced pipeline **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09093) VUID-VkBindPipelineIndirectCommandNV-None-09093

The referenced pipeline **must** have been updated with
[vkCmdUpdatePipelineIndirectBufferNV](../pipelines.html#vkCmdUpdatePipelineIndirectBufferNV)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09094) VUID-VkBindPipelineIndirectCommandNV-None-09094

The referenced pipeline’s address **must** have been queried with
[vkGetPipelineIndirectDeviceAddressNV](#vkGetPipelineIndirectDeviceAddressNV)

Valid Usage (Implicit)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-pipelineAddress-parameter) VUID-VkBindPipelineIndirectCommandNV-pipelineAddress-parameter

 `pipelineAddress` **must** be a valid `VkDeviceAddress` value

The processing for `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)` is in principle
illustrated below:

void cmdProcessSequence(cmd, indirectExecutionSet, indirectCommandsLayout, indirectAddress, s)
{
  for (t = 0; t 

The processing of each sequence is considered stateless, therefore all state
changes **must** occur prior to action commands within the sequence.
A single sequence is strictly targeting the [VkShaderStageFlags](../pipelines.html#VkShaderStageFlags) it was
created with.

The primary input data for each token is provided through `VkBuffer`
content at preprocessing using [vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT) or
execution time using [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT), however some
functional arguments, for example push constant layouts, are specified at
layout creation time.
The input size is different for each token.

Possible values of those elements of the
[VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT)::`pTokens` array specifying
command tokens (other elements of the array specify command parameters) are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsTokenTypeEXT {
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT = 0,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT = 1,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT = 2,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT = 3,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT = 4,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT = 5,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT = 6,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT = 7,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT = 8,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT = 9,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT = 1000135000,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT = 1000135001,
  // Provided by VK_EXT_device_generated_commands with VK_NV_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT = 1000202002,
  // Provided by VK_EXT_device_generated_commands with VK_NV_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT = 1000202003,
  // Provided by VK_EXT_device_generated_commands with VK_EXT_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT = 1000328000,
  // Provided by VK_EXT_device_generated_commands with VK_EXT_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT = 1000328001,
  // Provided by VK_KHR_ray_tracing_maintenance1 with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT = 1000386004,
} VkIndirectCommandsTokenTypeEXT;

| **Common Tokens** | **Command Data** |
| --- | --- |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) | `u32[]` array of indices into the indirect execution set |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) | `u32[]` raw data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT) | `u8[]` raw data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) | `u32` placeholder data (not accessed by shader) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) | `u32` placeholder data (not accessed by shader) |
| **Compute Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDispatchIndirectCommand](../dispatch.html#VkDispatchIndirectCommand) |
| **Ray Tracing Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkTraceRaysIndirectCommand2KHR](../raytracing.html#VkTraceRaysIndirectCommand2KHR) |
| **Graphics State Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkBindIndexBufferIndirectCommandEXT](#VkBindIndexBufferIndirectCommandEXT) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkBindVertexBufferIndirectCommandEXT](#VkBindVertexBufferIndirectCommandEXT) |
| **Graphics Draw Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndexedIndirectCommand](../drawing.html#VkDrawIndexedIndirectCommand) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndirectCommand](../drawing.html#VkDrawIndirectCommand) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawMeshTasksIndirectCommandEXT](../drawing.html#VkDrawMeshTasksIndirectCommandEXT) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawMeshTasksIndirectCommandNV](../drawing.html#VkDrawMeshTasksIndirectCommandNV) |
| **Graphics Draw Count Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndirectCountIndirectCommandEXT](#VkDrawIndirectCountIndirectCommandEXT) with VkDrawIndexedIndirectCommand |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndirectCountIndirectCommandEXT](#VkDrawIndirectCountIndirectCommandEXT) with VkDrawIndirectCommand |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndirectCountIndirectCommandEXT](#VkDrawIndirectCountIndirectCommandEXT) with VkDrawMeshTasksIndirectCommandEXT |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#VkIndirectCommandsTokenTypeEXT) | [VkDrawIndirectCountIndirectCommandEXT](#VkDrawIndirectCountIndirectCommandEXT) with VkDrawMeshTasksIndirectCommandNV |

The `VkIndirectCommandsLayoutTokenEXT` structure specifies details to
the function arguments that need to be known at layout creation time:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsLayoutTokenEXT {
    VkStructureType                   sType;
    const void*                       pNext;
    VkIndirectCommandsTokenTypeEXT    type;
    VkIndirectCommandsTokenDataEXT    data;
    uint32_t                          offset;
} VkIndirectCommandsLayoutTokenEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` specifies the [VkIndirectCommandsTokenTypeEXT](#VkIndirectCommandsTokenTypeEXT) for
`data`.

* 
`data` specifies a [VkIndirectCommandsTokenDataEXT](#VkIndirectCommandsTokenDataEXT) containing
token-specific details for command execution.
It is ignored if `type` does not match any member of the
[VkIndirectCommandsTokenDataEXT](#VkIndirectCommandsTokenDataEXT) union.

* 
`offset` is the relative byte offset for the token within one
sequence of the indirect buffer.
The data stored at that offset is the command data for the token, e.g.
`VkDispatchIndirectCommand`.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-offset-11124) VUID-VkIndirectCommandsLayoutTokenEXT-offset-11124

`offset` **must** be less than or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectCommandsTokenOffset`

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-offset-11125) VUID-VkIndirectCommandsLayoutTokenEXT-offset-11125

`offset` **must** be aligned to `4`

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-meshShader-11126) VUID-VkIndirectCommandsLayoutTokenEXT-meshShader-11126

If [`meshShader`](../features.html#features-meshShader) or [    `taskShader`](../features.html#features-taskShader) are not enabled, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](#VkIndirectCommandsTokenTypeEXT)
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-rayTracingMaintenance1-11128) VUID-VkIndirectCommandsLayoutTokenEXT-rayTracingMaintenance1-11128

If the [`rayTracingMaintenance1`](../features.html#features-rayTracingMaintenance1)
feature is not enabled, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11129) VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11129

If [](../limits.html#limits-deviceGeneratedCommandsMultiDrawIndirectCount)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`deviceGeneratedCommandsMultiDrawIndirectCount`
is not supported, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11130) VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11130

If [](../limits.html#limits-deviceGeneratedCommandsMultiDrawIndirectCount)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`deviceGeneratedCommandsMultiDrawIndirectCount`
is not supported, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11131) VUID-VkIndirectCommandsLayoutTokenEXT-deviceGeneratedCommandsMultiDrawIndirectCount-11131

If [](../limits.html#limits-deviceGeneratedCommandsMultiDrawIndirectCount)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`deviceGeneratedCommandsMultiDrawIndirectCount`
is not supported, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-descriptorHeap-11332) VUID-VkIndirectCommandsLayoutTokenEXT-descriptorHeap-11332

If the [`descriptorHeap`](../features.html#features-descriptorHeap) feature is not
enabled, `type` **must** not be
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-type-11333) VUID-VkIndirectCommandsLayoutTokenEXT-type-11333

If `type` is [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT)
[VkIndirectCommandsPushConstantTokenEXT](#VkIndirectCommandsPushConstantTokenEXT)::`updateRange.shaderStages`
**must** be [VK_SHADER_STAGE_ALL](../pipelines.html#VkShaderStageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-sType-sType) VUID-VkIndirectCommandsLayoutTokenEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-type-parameter) VUID-VkIndirectCommandsLayoutTokenEXT-type-parameter

 `type` **must** be a valid [VkIndirectCommandsTokenTypeEXT](#VkIndirectCommandsTokenTypeEXT) value

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-pPushConstant-parameter) VUID-VkIndirectCommandsLayoutTokenEXT-pPushConstant-parameter

 If `type` is [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT), or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT), the `pPushConstant` member of `data` **must** be a valid pointer to a valid [VkIndirectCommandsPushConstantTokenEXT](#VkIndirectCommandsPushConstantTokenEXT) structure

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-pVertexBuffer-parameter) VUID-VkIndirectCommandsLayoutTokenEXT-pVertexBuffer-parameter

 If `type` is [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT), the `pVertexBuffer` member of `data` **must** be a valid pointer to a valid [VkIndirectCommandsVertexBufferTokenEXT](#VkIndirectCommandsVertexBufferTokenEXT) structure

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-pIndexBuffer-parameter) VUID-VkIndirectCommandsLayoutTokenEXT-pIndexBuffer-parameter

 If `type` is [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT), the `pIndexBuffer` member of `data` **must** be a valid pointer to a valid [VkIndirectCommandsIndexBufferTokenEXT](#VkIndirectCommandsIndexBufferTokenEXT) structure

* 
[](#VUID-VkIndirectCommandsLayoutTokenEXT-pExecutionSet-parameter) VUID-VkIndirectCommandsLayoutTokenEXT-pExecutionSet-parameter

 If `type` is [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT), the `pExecutionSet` member of `data` **must** be a valid pointer to a valid [VkIndirectCommandsExecutionSetTokenEXT](#VkIndirectCommandsExecutionSetTokenEXT) structure

The `VkIndirectCommandsTokenDataEXT` structure provides token-specific
details used to generate the indirect execution layout.

// Provided by VK_EXT_device_generated_commands
typedef union VkIndirectCommandsTokenDataEXT {
    const VkIndirectCommandsPushConstantTokenEXT*    pPushConstant;
    const VkIndirectCommandsVertexBufferTokenEXT*    pVertexBuffer;
    const VkIndirectCommandsIndexBufferTokenEXT*     pIndexBuffer;
    const VkIndirectCommandsExecutionSetTokenEXT*    pExecutionSet;
} VkIndirectCommandsTokenDataEXT;

* 
`pPushConstant` is a pointer to a
    [VkIndirectCommandsPushConstantTokenEXT](#VkIndirectCommandsPushConstantTokenEXT) structure needed for
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
    and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) tokens

* 
`pVertexBuffer` is a pointer to a
[VkIndirectCommandsVertexBufferTokenEXT](#VkIndirectCommandsVertexBufferTokenEXT) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) tokens

* 
`pIndexBuffer` is a pointer to a
[VkIndirectCommandsIndexBufferTokenEXT](#VkIndirectCommandsIndexBufferTokenEXT) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) tokens

* 
`pExecutionSet` is a pointer to a
[VkIndirectCommandsExecutionSetTokenEXT](#VkIndirectCommandsExecutionSetTokenEXT) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) tokens

The appropriate member of the union **must** be set for each token.

The following code provides detailed information on how an individual
sequence is processed.
For valid usage, all restrictions from the regular commands apply.

void cmdProcessSequence(cmd, indirectExecutionSet, indirectCommandsLayout, indirectAddress, s)
{
  for (uint32_t t = 0; t offset;
    uint32_t stride  = indirectCommandsLayout.indirectStride;
    VkDeviceAddress streamData = indirectAddress;
    const void* input = streamData + stride * s + offset;

    switch (token->tokenType) {
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT:
      uint32_t *bind = input;
      VkIndirectCommandsExecutionSetTokenEXT *info = token->data.pExecutionSet;

      if (info->type == VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT) {
        vkCmdBindPipeline(cmd, indirectExecutionSet.pipelineBindPoint, indirectExecutionSet.pipelines[*bind]);
      } else {
        VkShaderStageFlagBits stages[];
        VkShaderEXT shaders[];
        uint32_t i = 0;
        IterateBitmaskLSBToMSB(iter, info->shaderStages) {
            stages[i] = iter;
            shaders[i] = indirectExecutionSet.shaders[bind[i]].shaderObject;
            i++;
        }
        vkCmdBindShadersEXT(cmd, i, stages, shaders);
      }
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT:
      uint32_t* data = input;
      VkPushConstantsInfoKHR info = {
        VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO_KHR,
        // this can also use `dynamicGeneratedPipelineLayout' to pass a VkPipelineLayoutCreateInfo from pNext
        indirectCommandsLayout.pipelineLayout,
        token->token.pushConstant.updateRange.shaderStages,
        token->token.pushConstant.updateRange.offset,
        token->token.pushConstant.updateRange.size,
        data
      };

      vkCmdPushConstants2KHR(cmd, &info);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT:

      VkHostAddressRangeConstEXT addressRange = {
        token->token.pushConstant.updateRange.data.size,
        input
      };

      VkPushDataInfoEXT info = {
        VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT,
        NULL,
        token->token.pushConstant.updateRange.offset,
        addressRange
      };

      vkCmdPushDataEXT(cmd, &info);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT:
      VkPushConstantsInfoKHR info = {
        VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO_KHR,
        // this can also use `dynamicGeneratedPipelineLayout' to pass a VkPipelineLayoutCreateInfo from pNext
        indirectCommandsLayout.pipelineLayout,
        token->token.pushConstant.updateRange.shaderStages,
        token->token.pushConstant.updateRange.offset,
        // this must be 4
        token->token.pushConstant.updateRange.size,
        // this just updates the sequence index
        &s
      };

      vkCmdPushConstants2KHR(cmd, &info);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT:

      VkHostAddressRangeConstEXT addressRange = {
        // this must be 4
        token->token.pushConstant.updateRange.data.size,
        // this just updates the sequence index
        &s
      };

      VkPushDataInfoEXT info = {
        VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT,
        NULL,
        token->token.pushConstant.updateRange.offset,
        addressRange
      };

      vkCmdPushDataEXT(cmd, &info);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT:
      VkBindIndexBufferIndirectCommandEXT* data = input;

      vkCmdBindIndexBuffer(cmd, deriveBuffer(data->bufferAddress), deriveOffset(data->bufferAddress), data->indexType);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT:
      VkBindVertexBufferIndirectCommandEXT* data = input;

      vkCmdBindVertexBuffers2(cmd, token->token.vertexBuffer->vertexBindingUnit, 1, &deriveBuffer(data->bufferAddress),
                              &deriveOffset(data->bufferAddress), data->size, data->stride);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT:
      VkDrawIndexedIndirectCommand *data = input;

      vkCmdDrawIndexed(cmd, data->indexCount, data->instanceCount, data->firstIndex, data->vertexOffset, data->firstInstance);
      break;
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT:
      VkDrawIndirectCountIndirectCommandEXT* data = input;

      vkCmdDrawIndexedIndirect(cmd, deriveBuffer(data->bufferAddress),  deriveoffset(data->bufferAddress), min(data->commandCount, indirectCommandsLayout.maxDrawCount), data->stride);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT:
      VkDrawIndirectCommand* data = input;

      vkCmdDraw(cmd, data->vertex_count, data->instanceCount, data->firstVertex, data->firstIndex);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT:
      VkDrawIndirectCountIndirectCommandEXT* data = input;

      vkCmdDrawIndirect(cmd, deriveBuffer(data->bufferAddress), deriveoffset(data->bufferAddress), min(data->commandCount, indirectCommandsLayout.maxDrawCount), data->stride);
      break;

    // only available if VK_NV_mesh_shader is enabled
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT:
      VkDrawMeshTasksIndirectCommandNV *data = input;

      vkCmdDrawMeshTasksNV(cmd, data->taskCount, data->firstTask);
     break;

    // only available if VK_NV_mesh_shader is enabled
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT:
      VkDrawIndirectCountIndirectCommandEXT* data = input;

      vkCmdDrawMeshTasksIndirectCountNV(cmd, deriveBuffer(data->bufferAddress),  deriveoffset(data->bufferAddress), min(data->commandCount, indirectCommandsLayout.maxDrawCount), data->stride);
      break;

    // only available if VK_EXT_mesh_shader is enabled
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT:
      VkDrawMeshTasksIndirectCommandEXT *data = input;

      vkCmdDrawMeshTasksEXT(cmd, data->groupCountX, data->groupCountY, data->groupCountZ);
     break;

    // only available if VK_EXT_mesh_shader is enabled
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT:
      VkDrawIndirectCountIndirectCommandEXT* data = input;

      vkCmdDrawMeshTasksIndirectCountEXT(cmd, deriveBuffer(data->bufferAddress),  deriveoffset(data->bufferAddress), min(data->commandCount, indirectCommandsLayout.maxDrawCount), data->stride);
      break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT:
      VkDispatchIndirectCommand *data = input;

      vkCmdDispatch(cmd, data->x, data->y, data->z);
      break;

    // only available if VK_KHR_ray_tracing_maintenance1 is enabled
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT:
      vkCmdTraceRaysIndirect2KHR(cmd, deriveBuffer(input));
      break;
    }
  }
}

The processing for `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)` is in principle
illustrated below:

void cmdProcessSequence(cmd, pipeline, indirectCommandsLayout, pIndirectCommandsStreams, s)
{
  for (t = 0; t 

The processing of each sequence is considered stateless, therefore all state
changes **must** occur before any action command tokens within the sequence.
A single sequence is strictly targeting the [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) it was
created with.

The primary input data for each token is provided through `VkBuffer`
content at preprocessing using [vkCmdPreprocessGeneratedCommandsNV](#vkCmdPreprocessGeneratedCommandsNV) or
execution time using [vkCmdExecuteGeneratedCommandsNV](#vkCmdExecuteGeneratedCommandsNV), however some
functional arguments, for example binding sets, are specified at layout
creation time.
The input size is different for each token.

The `VkIndirectCommandsPushConstantTokenEXT` structure specifies the
layout token info for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) tokens.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsPushConstantTokenEXT {
    VkPushConstantRange    updateRange;
} VkIndirectCommandsPushConstantTokenEXT;

* 
`updateRange` is the push constant range that will be updated by the
token.

The `stageFlags` member of `updateRange` is ignored.

Valid Usage

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-11132) VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-11132

If the token type is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT),
`updateRange` **must** be contained within the push constant info used
by [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT)

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-size-11133) VUID-VkIndirectCommandsPushConstantTokenEXT-size-11133

    If the token type is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) or
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT), the `size`
    member of `updateRange` **must** be 4

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-parameter) VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-parameter

 `updateRange` **must** be a valid [VkPushConstantRange](../descriptorsets.html#VkPushConstantRange) structure

The `VkIndirectCommandsVertexBufferTokenEXT` structure specifies the
layout token info for the
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsVertexBufferTokenEXT {
    uint32_t    vertexBindingUnit;
} VkIndirectCommandsVertexBufferTokenEXT;

* 
`vertexBindingUnit` is the vertex input binding number to be bound.

Valid Usage

* 
[](#VUID-VkIndirectCommandsVertexBufferTokenEXT-vertexBindingUnit-11134) VUID-VkIndirectCommandsVertexBufferTokenEXT-vertexBindingUnit-11134

`vertexBindingUnit` **must** be less than the total number of vertex
input bindings in use by the current graphics state

The `VkIndirectCommandsIndexBufferTokenEXT` structure specifies the
layout token info for the
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsIndexBufferTokenEXT {
    VkIndirectCommandsInputModeFlagBitsEXT    mode;
} VkIndirectCommandsIndexBufferTokenEXT;

* 
`mode` specifies the mode to use with this token.

This allows for easy layering of Vulkan atop other APIs.
When [VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT](#VkIndirectCommandsInputModeFlagBitsEXT) is
specified, the indirect buffer can contain a `D3D12_INDEX_BUFFER_VIEW`
instead of [VkBindIndexBufferIndirectCommandEXT](#VkBindIndexBufferIndirectCommandEXT) as D3D’s DXGI format
value is mapped to the [VkIndexType](../drawing.html#VkIndexType).
It works as both structs are otherwise binary compatible.

Valid Usage

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11135) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11135

`mode` **must** be non-zero

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11136) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11136

`mode` **must** be one of the bits supported in
[](../limits.html#limits-supportedIndirectCommandsInputModes)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsInputModes`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-parameter) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-parameter

 `mode` **must** be a valid [VkIndirectCommandsInputModeFlagBitsEXT](#VkIndirectCommandsInputModeFlagBitsEXT) value

Bits which are set in
[VkIndirectCommandsIndexBufferTokenEXT](#VkIndirectCommandsIndexBufferTokenEXT)::`mode`, specifying how an
index buffer is used, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsInputModeFlagBitsEXT {
    VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT = 0x00000002,
} VkIndirectCommandsInputModeFlagBitsEXT;

* 
[VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT](#VkIndirectCommandsInputModeFlagBitsEXT) specifies
that the indirect buffer contains
[VkBindIndexBufferIndirectCommandEXT](#VkBindIndexBufferIndirectCommandEXT).

* 
[VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT](#VkIndirectCommandsInputModeFlagBitsEXT) specifies
that the indirect buffer contains `D3D12_INDEX_BUFFER_VIEW`.

// Provided by VK_EXT_device_generated_commands
typedef VkFlags VkIndirectCommandsInputModeFlagsEXT;

`VkIndirectCommandsInputModeFlagsEXT` is a bitmask type for setting a
mask of zero or more [VkIndirectCommandsInputModeFlagBitsEXT](#VkIndirectCommandsInputModeFlagBitsEXT).

The `VkIndirectCommandsExecutionSetTokenEXT` structure specifies the
input data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsExecutionSetTokenEXT {
    VkIndirectExecutionSetInfoTypeEXT    type;
    VkShaderStageFlags                   shaderStages;
} VkIndirectCommandsExecutionSetTokenEXT;

* 
`type` describes the type of indirect execution set in use.

* 
`shaderStages` specifies the shaders that will be changed by this
token.

Valid Usage

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-11137) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-11137

Each bit in `shaderStages` **must** be supported by
[](../limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesPipelineBinding`
or [](../limits.html#limits-supportedIndirectCommandsShaderStagesShaderBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesShaderBinding`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-type-parameter) VUID-VkIndirectCommandsExecutionSetTokenEXT-type-parameter

 `type` **must** be a valid [VkIndirectExecutionSetInfoTypeEXT](#VkIndirectExecutionSetInfoTypeEXT) value

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-parameter) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-requiredbitmask) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

Possible values of those elements of the
[VkIndirectCommandsLayoutCreateInfoNV](#VkIndirectCommandsLayoutCreateInfoNV)::`pTokens` array specifying
command tokens (other elements of the array specify command parameters) are:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectCommandsTokenTypeNV {
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV = 0,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV = 1,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV = 2,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV = 3,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV = 4,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV = 5,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV = 6,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV = 7,
  // Provided by VK_EXT_descriptor_heap with VK_NV_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV = 1000135000,
  // Provided by VK_EXT_mesh_shader with VK_NV_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV = 1000328000,
  // Provided by VK_NV_device_generated_commands_compute
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV = 1000428003,
  // Provided by VK_NV_device_generated_commands_compute
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV = 1000428004,
} VkIndirectCommandsTokenTypeNV;

| Token type | Equivalent command |
| --- | --- |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdBindPipelineShaderGroupNV](../pipelines.html#vkCmdBindPipelineShaderGroupNV) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](#VkIndirectCommandsTokenTypeNV) | - |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdBindIndexBuffer](../drawing.html#vkCmdBindIndexBuffer) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdBindVertexBuffers](../fxvertex.html#vkCmdBindVertexBuffers) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdPushConstants](../descriptorsets.html#vkCmdPushConstants) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdPushDataEXT](../descriptorheaps.html#vkCmdPushDataEXT) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdDrawIndexedIndirect](../drawing.html#vkCmdDrawIndexedIndirect) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdDrawIndirect](../drawing.html#vkCmdDrawIndirect) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdDrawMeshTasksIndirectNV](../drawing.html#vkCmdDrawMeshTasksIndirectNV) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdDrawMeshTasksIndirectEXT](../drawing.html#vkCmdDrawMeshTasksIndirectEXT) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdBindPipeline](../pipelines.html#vkCmdBindPipeline) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](#VkIndirectCommandsTokenTypeNV) | [vkCmdDispatchIndirect](../dispatch.html#vkCmdDispatchIndirect) |

The `VkIndirectCommandsLayoutTokenNV` structure specifies details to the
function arguments that need to be known at layout creation time:

// Provided by VK_NV_device_generated_commands
typedef struct VkIndirectCommandsLayoutTokenNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkIndirectCommandsTokenTypeNV    tokenType;
    uint32_t                         stream;
    uint32_t                         offset;
    uint32_t                         vertexBindingUnit;
    VkBool32                         vertexDynamicStride;
    VkPipelineLayout                 pushconstantPipelineLayout;
    VkShaderStageFlags               pushconstantShaderStageFlags;
    uint32_t                         pushconstantOffset;
    uint32_t                         pushconstantSize;
    VkIndirectStateFlagsNV           indirectStateFlags;
    uint32_t                         indexTypeCount;
    const VkIndexType*               pIndexTypes;
    const uint32_t*                  pIndexTypeValues;
} VkIndirectCommandsLayoutTokenNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tokenType` is a [VkIndirectCommandsTokenTypeNV](#VkIndirectCommandsTokenTypeNV) specifying the
token command type.

* 
`stream` is the index of the input stream containing the token
argument data.

* 
`offset` is a relative starting offset within the input stream
memory for the token argument data.

* 
`vertexBindingUnit` is used for the vertex buffer binding command.

* 
`vertexDynamicStride` sets if the vertex buffer stride is provided
by the binding command rather than the current bound graphics pipeline
state.

* 
`pushconstantPipelineLayout` is the `VkPipelineLayout` used for
the push constant command.

* 
`pushconstantShaderStageFlags` are the shader stage flags used for
the push constant command.

* 
`pushconstantOffset` is the offset used for the push constant
command.

* 
`pushconstantSize` is the size used for the push constant command.

* 
`indirectStateFlags` is a [VkIndirectStateFlagsNV](#VkIndirectStateFlagsNV) bitfield
indicating the active states for the state flag command.

* 
`indexTypeCount` is the optional size of the `pIndexTypes` and
`pIndexTypeValues` array pairings.
If not zero, it allows to register a custom `uint32_t` value to be
treated as specific [VkIndexType](../drawing.html#VkIndexType).

* 
`pIndexTypes` is the used [VkIndexType](../drawing.html#VkIndexType) for the corresponding
`uint32_t` value entry in `pIndexTypeValues`.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-stream-02951) VUID-VkIndirectCommandsLayoutTokenNV-stream-02951

`stream` **must** be smaller than
`VkIndirectCommandsLayoutCreateInfoNV`::`streamCount`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-offset-02952) VUID-VkIndirectCommandsLayoutTokenNV-offset-02952

`offset` **must** be less than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxIndirectCommandsTokenOffset`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-offset-06888) VUID-VkIndirectCommandsLayoutTokenNV-offset-06888

`offset` **must** be aligned to the scalar alignment of `tokenType`
or `minIndirectCommandsBufferOffsetAlignment`, whichever is lower

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02976) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02976

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](#VkIndirectCommandsTokenTypeNV),
`vertexBindingUnit` **must** stay within device supported limits for
the appropriate commands

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02977) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02977

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV),
`pushconstantPipelineLayout` **must** be valid

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02978) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02978

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV),
`pushconstantOffset` **must** be a multiple of `4`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02979) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02979

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV),
`pushconstantSize` **must** be a multiple of `4`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02980) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02980

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV),
`pushconstantOffset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02981) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02981

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV),
`pushconstantSize` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`pushconstantOffset`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02982) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02982

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV), for each byte in
the range specified by `pushconstantOffset` and
`pushconstantSize` and for each shader stage in
`pushconstantShaderStageFlags`, there **must** be a push constant range
in `pushconstantPipelineLayout` that includes that byte and that
stage

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02983) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02983

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV), for each byte in
the range specified by `pushconstantOffset` and
`pushconstantSize` and for each push constant range that overlaps
that byte, `pushconstantShaderStageFlags` **must** include all stages
in that push constant range’s
[VkPushConstantRange](../descriptorsets.html#VkPushConstantRange)::`stageFlags`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02984) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02984

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](#VkIndirectCommandsTokenTypeNV),
`indirectStateFlags` **must** not be `0`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-11334) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-11334

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](#VkIndirectCommandsTokenTypeNV),
[VkIndirectCommandsLayoutPushDataTokenNV](#VkIndirectCommandsLayoutPushDataTokenNV)::`pushDataSize` **must**
be greater than `0`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-sType-sType) VUID-VkIndirectCommandsLayoutTokenNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pNext-pNext) VUID-VkIndirectCommandsLayoutTokenNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkIndirectCommandsLayoutPushDataTokenNV](#VkIndirectCommandsLayoutPushDataTokenNV)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-sType-unique) VUID-VkIndirectCommandsLayoutTokenNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-parameter) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-parameter

 `tokenType` **must** be a valid [VkIndirectCommandsTokenTypeNV](#VkIndirectCommandsTokenTypeNV) value

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pushconstantPipelineLayout-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pushconstantPipelineLayout-parameter

 If `pushconstantPipelineLayout` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `pushconstantPipelineLayout` **must** be a valid [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pushconstantShaderStageFlags-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pushconstantShaderStageFlags-parameter

 `pushconstantShaderStageFlags` **must** be a valid combination of [VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-indirectStateFlags-parameter) VUID-VkIndirectCommandsLayoutTokenNV-indirectStateFlags-parameter

 `indirectStateFlags` **must** be a valid combination of [VkIndirectStateFlagBitsNV](#VkIndirectStateFlagBitsNV) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypes-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypes-parameter

 If `indexTypeCount` is not `0`, `pIndexTypes` **must** be a valid pointer to an array of `indexTypeCount` valid [VkIndexType](../drawing.html#VkIndexType) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypeValues-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypeValues-parameter

 If `indexTypeCount` is not `0`, `pIndexTypeValues` **must** be a valid pointer to an array of `indexTypeCount` `uint32_t` values

The `VkIndirectCommandsLayoutTokenNV` structure specifies details to the
function arguments that need to be known at layout creation time:

// Provided by VK_EXT_descriptor_heap with VK_NV_device_generated_commands
typedef struct VkIndirectCommandsLayoutPushDataTokenNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           pushDataOffset;
    uint32_t           pushDataSize;
} VkIndirectCommandsLayoutPushDataTokenNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pushDataOffset` is the offset used for the push data command.

* 
`pushDataSize` is the size used for the push data command.

If this structure is in the `pNext` chain of
[VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV), and
[VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV)::`tokenType` is set to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](#VkIndirectCommandsTokenTypeNV), this structure defines a
push data command layout token.

If this structure is not provided, it is equivalent to setting
`pushDataOffset` and `pushDataSize` to 0.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11335) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11335

The sum of `pushDataOffset` and `pushDataSize` **must** be less
than [`maxPushDataSize`](../limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11420) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11420

`pushDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataSize-11421) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataSize-11421

`pushDataSize` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-sType-sType) VUID-VkIndirectCommandsLayoutPushDataTokenNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_PUSH_DATA_TOKEN_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV)

The following code provides detailed information on how an individual
sequence is processed.
For valid usage, all restrictions from the regular commands apply.

void cmdProcessSequence(cmd, pipeline, indirectCommandsLayout, pIndirectCommandsStreams, s)
{
  for (uint32_t t = 0; t groupIndex);
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV:
      VkSetStateFlagsIndirectCommandNV* state = input;

      if (token.indirectStateFlags & VK_INDIRECT_STATE_FLAG_FRONTFACE_BIT_NV){
        if (state.data & (1 bufferAddress),
        deriveOffset(data->bufferAddress),
        data->indexType);
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV:
      VkBindVertexBufferIndirectCommandNV* data = input;

      // if token.vertexDynamicStride is VK_TRUE
      // then the stride for this binding is set
      // using data->stride as well

      vkCmdBindVertexBuffers(cmd,
        token.vertexBindingUnit, 1,
        &deriveBuffer(data->bufferAddress),
        &deriveOffset(data->bufferAddress));
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV:
      vkCmdDrawIndexedIndirect(cmd,
        stream.buffer, offset, 1, 0);
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV:
      vkCmdDrawIndirect(cmd,
        stream.buffer,
        offset, 1, 0);
    break;

    // only available if VK_NV_mesh_shader is supported
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV:
      vkCmdDrawMeshTasksIndirectNV(cmd,
        stream.buffer, offset, 1, 0);
    break;

    // only available if VK_EXT_mesh_shader is supported
    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV:
      vkCmdDrawMeshTasksIndirectEXT(cmd,
        stream.buffer, offset, 1, 0);
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV:
      VkBindPipelineIndirectCommandNV *data = input;
      VkPipeline computePipeline = deriveFromDeviceAddress(data->pipelineAddress);
      vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_COMPUTE, computePipeline);
    break;

    case VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV:
      vkCmdDispatchIndirect(cmd, stream.buffer, offset);
    break;
    }
  }
}

The generation of commands on the device requires a `preprocess` buffer.

With `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)`, to retrieve the memory size
and alignment requirements of a particular execution state call:

// Provided by VK_EXT_device_generated_commands
void vkGetGeneratedCommandsMemoryRequirementsEXT(
    VkDevice                                    device,
    const VkGeneratedCommandsMemoryRequirementsInfoEXT* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a
[VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT) structure containing
parameters required for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2)
structure in which the memory requirements of the buffer object are
returned.

If the size returned is zero, the preprocessing step can be skipped for this
layout.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-device-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pInfo-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT) structure

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pMemoryRequirements-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2) structure

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsMemoryRequirementsInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkIndirectExecutionSetEXT      indirectExecutionSet;
    VkIndirectCommandsLayoutEXT    indirectCommandsLayout;
    uint32_t                       maxSequenceCount;
    uint32_t                       maxDrawCount;
} VkGeneratedCommandsMemoryRequirementsInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`indirectExecutionSet` is the indirect execution set to be used for
binding shaders.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT)
that this buffer memory is intended to be used with.

* 
`maxSequenceCount` is the maximum number of sequences that this
buffer memory can be used with.

* 
`maxDrawCount` is the maximum number of indirect draws that can be
executed by any COUNT-type multi-draw indirect tokens.
The draw count in the indirect buffer is clamped to this value for these
token types.

If the action command token for the layout is not a COUNT-type multi-draw
indirect token, `maxDrawCount` is ignored.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-maxSequencesCount-11009) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-maxSequencesCount-11009

`maxSequencesCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectSequenceCount`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11010) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11010

If `indirectCommandsLayout` was created with a token sequence that
contained the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, `indirectExecutionSet` **must** not be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11151) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11151

If `indirectCommandsLayout` was created with a token sequence that
contained the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, the shader stages used to create the initial shader state of
`indirectExecutionSet` **must** equal the
[VkIndirectCommandsExecutionSetTokenEXT](#VkIndirectCommandsExecutionSetTokenEXT)::`shaderStages` used to
create `indirectCommandsLayout`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11011) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-11011

If `indirectCommandsLayout` was not created with a token sequence
that contained the
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token,
`indirectExecutionSet` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-maxDrawCount-11146) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-maxDrawCount-11146

When not ignored, `maxDrawCount` ×
`maxSequenceCount` **must** be less than 2^24

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectExecutionSet-11012) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectExecutionSet-11012

    If `indirectExecutionSet` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
either
    a [VkGeneratedCommandsPipelineInfoEXT](#VkGeneratedCommandsPipelineInfoEXT)
or a [VkGeneratedCommandsShaderInfoEXT](#VkGeneratedCommandsShaderInfoEXT)
    **must** be included in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-sType-sType) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-pNext-pNext) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkGeneratedCommandsPipelineInfoEXT](#VkGeneratedCommandsPipelineInfoEXT) or [VkGeneratedCommandsShaderInfoEXT](#VkGeneratedCommandsShaderInfoEXT)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-sType-unique) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectExecutionSet-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectExecutionSet-parameter

 If `indirectExecutionSet` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-commonparent) VUID-VkGeneratedCommandsMemoryRequirementsInfoEXT-commonparent

 Both of `indirectCommandsLayout`, and `indirectExecutionSet` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsPipelineInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkPipeline         pipeline;
} VkGeneratedCommandsPipelineInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is a valid pipeline object.

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsPipelineInfoEXT-sType-sType) VUID-VkGeneratedCommandsPipelineInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_PIPELINE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsPipelineInfoEXT-pipeline-parameter) VUID-VkGeneratedCommandsPipelineInfoEXT-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)

* 
[VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT)

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsShaderInfoEXT {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              shaderCount;
    const VkShaderEXT*    pShaders;
} VkGeneratedCommandsShaderInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCount` is the size of the `pShaders` array.

* 
`pShaders` is a pointer to an array of shader objects.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-11127) VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-11127

`pShaders` **must** not contain more than one shader object for a given
[VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) stage

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-sType-sType) VUID-VkGeneratedCommandsShaderInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_SHADER_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-parameter) VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-parameter

 `pShaders` **must** be a valid pointer to an array of `shaderCount` valid [VkShaderEXT](../shaders.html#VkShaderEXT) handles

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-shaderCount-arraylength) VUID-VkGeneratedCommandsShaderInfoEXT-shaderCount-arraylength

 `shaderCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)

* 
[VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT)

With `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)`, to retrieve the memory size
and alignment requirements of a particular execution state call:

// Provided by VK_NV_device_generated_commands
void vkGetGeneratedCommandsMemoryRequirementsNV(
    VkDevice                                    device,
    const VkGeneratedCommandsMemoryRequirementsInfoNV* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a
[VkGeneratedCommandsMemoryRequirementsInfoNV](#VkGeneratedCommandsMemoryRequirementsInfoNV) structure containing
parameters required for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-deviceGeneratedCommands-02906) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-deviceGeneratedCommands-02906

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-09074) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-09074

If `pInfo->pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedCompute`](../features.html#features-deviceGeneratedCompute)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-device-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsMemoryRequirementsInfoNV](#VkGeneratedCommandsMemoryRequirementsInfoNV) structure

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2) structure

// Provided by VK_NV_device_generated_commands
typedef struct VkGeneratedCommandsMemoryRequirementsInfoNV {
    VkStructureType               sType;
    const void*                   pNext;
    VkPipelineBindPoint           pipelineBindPoint;
    VkPipeline                    pipeline;
    VkIndirectCommandsLayoutNV    indirectCommandsLayout;
    uint32_t                      maxSequencesCount;
} VkGeneratedCommandsMemoryRequirementsInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) of the
`pipeline` that this buffer memory is intended to be used with
during the execution.

* 
`pipeline` is the [VkPipeline](../pipelines.html#VkPipeline) that this buffer memory is
intended to be used with during the execution.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV)
that this buffer memory is intended to be used with.

* 
`maxSequencesCount` is the maximum number of sequences that this
buffer memory in combination with the other state provided **can** be used
with.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-maxSequencesCount-02907) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-maxSequencesCount-02907

`maxSequencesCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV)::`maxIndirectSequenceCount`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09075) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09075

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint), then `pipeline` **must** be a
valid [VkPipeline](../pipelines.html#VkPipeline) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09076) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09076

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), and the
`indirectCommandsLayout` was not created with a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) token, then the
`pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09077) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09077

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), and the
`indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) token, then the
`pipeline` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-sType-sType) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pNext-pNext) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipeline-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-commonparent) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-commonparent

 Both of `indirectCommandsLayout`, and `pipeline` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

With `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)`, to bind a compute pipeline in
[Device-Generated Commands](#device-generated-commands), an application
**must** query the pipeline’s device address.

To query a compute pipeline’s 64-bit device address, call:

// Provided by VK_NV_device_generated_commands_compute
VkDeviceAddress vkGetPipelineIndirectDeviceAddressNV(
    VkDevice                                    device,
    const VkPipelineIndirectDeviceAddressInfoNV* pInfo);

* 
`device` is the logical device on which the pipeline was created.

* 
`pInfo` is a pointer to a
[VkPipelineIndirectDeviceAddressInfoNV](#VkPipelineIndirectDeviceAddressInfoNV) structure specifying the
pipeline to retrieve the address for.

Valid Usage

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-deviceGeneratedComputePipelines-09078) VUID-vkGetPipelineIndirectDeviceAddressNV-deviceGeneratedComputePipelines-09078

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-device-parameter) VUID-vkGetPipelineIndirectDeviceAddressNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-pInfo-parameter) VUID-vkGetPipelineIndirectDeviceAddressNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPipelineIndirectDeviceAddressInfoNV](#VkPipelineIndirectDeviceAddressInfoNV) structure

The `VkPipelineIndirectDeviceAddressInfoNV` structure is defined as:

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkPipelineIndirectDeviceAddressInfoNV {
    VkStructureType        sType;
    const void*            pNext;
    VkPipelineBindPoint    pipelineBindPoint;
    VkPipeline             pipeline;
} VkPipelineIndirectDeviceAddressInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) value specifying
the type of pipeline whose device address is being queried.

* 
`pipeline` specifies the pipeline whose device address is being
queried.

Valid Usage

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-09079) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-09079

The provided `pipelineBindPoint` **must** be of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09080) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09080

`pipeline` **must** have been created with flag
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits) set

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09081) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09081

`pipeline` **must** have been created with a
[VkComputePipelineIndirectBufferInfoNV](../pipelines.html#VkComputePipelineIndirectBufferInfoNV) structure specifying a valid
address where its metadata will be saved

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-sType-sType) VUID-VkPipelineIndirectDeviceAddressInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_INDIRECT_DEVICE_ADDRESS_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pNext-pNext) VUID-VkPipelineIndirectDeviceAddressInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-parameter) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-parameter) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

To determine the memory requirements for a compute pipeline’s metadata,
call:

// Provided by VK_NV_device_generated_commands_compute
void vkGetPipelineIndirectMemoryRequirementsNV(
    VkDevice                                    device,
    const VkComputePipelineCreateInfo*          pCreateInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pCreateInfo` is a [VkComputePipelineCreateInfo](../pipelines.html#VkComputePipelineCreateInfo) structure
specifying the creation parameters of the compute pipeline whose memory
requirements are being queried.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2)
structure in which the requested pipeline’s memory requirements are
returned.

If `pCreateInfo->pNext` chain includes a pointer to a
[VkComputePipelineIndirectBufferInfoNV](../pipelines.html#VkComputePipelineIndirectBufferInfoNV) structure, then the contents of
that structure are ignored.

Valid Usage

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-deviceGeneratedComputePipelines-09082) VUID-vkGetPipelineIndirectMemoryRequirementsNV-deviceGeneratedComputePipelines-09082

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-09083) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-09083

`pCreateInfo->flags` **must** include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-device-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkComputePipelineCreateInfo](../pipelines.html#VkComputePipelineCreateInfo) structure

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2) structure

Indirect Execution Sets contain sets of pipelines
or shader objects
which can be bound individually.

// Provided by VK_EXT_device_generated_commands
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectExecutionSetEXT)

Indirect Execution Sets allow the device to bind different shaders and
pipeline states using [Device-Generated Commands](#device-generated-commands).

Indirect Execution Sets are created by calling:

// Provided by VK_EXT_device_generated_commands
VkResult vkCreateIndirectExecutionSetEXT(
    VkDevice                                    device,
    const VkIndirectExecutionSetCreateInfoEXT*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkIndirectExecutionSetEXT*                  pIndirectExecutionSet);

* 
`device` is the logical device that creates the indirect execution
set.

* 
`pCreateInfo` is a pointer to a
[VkIndirectExecutionSetCreateInfoEXT](#VkIndirectExecutionSetCreateInfoEXT) structure containing
parameters affecting creation of the indirect execution set.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pIndirectExecutionSet` is a pointer to a
[VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle in which the resulting indirect
execution set is returned.

Valid Usage

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-deviceGeneratedCommands-11013) VUID-vkCreateIndirectExecutionSetEXT-deviceGeneratedCommands-11013

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-device-parameter) VUID-vkCreateIndirectExecutionSetEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pCreateInfo-parameter) VUID-vkCreateIndirectExecutionSetEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIndirectExecutionSetCreateInfoEXT](#VkIndirectExecutionSetCreateInfoEXT) structure

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pAllocator-parameter) VUID-vkCreateIndirectExecutionSetEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-pIndirectExecutionSet-parameter) VUID-vkCreateIndirectExecutionSetEXT-pIndirectExecutionSet-parameter

 `pIndirectExecutionSet` **must** be a valid pointer to a [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-vkCreateIndirectExecutionSetEXT-device-queuecount) VUID-vkCreateIndirectExecutionSetEXT-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkIndirectExecutionSetCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    VkIndirectExecutionSetInfoTypeEXT    type;
    VkIndirectExecutionSetInfoEXT        info;
} VkIndirectExecutionSetCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkIndirectExecutionSetInfoTypeEXT](#VkIndirectExecutionSetInfoTypeEXT) describing the
type of set being created and determining which field of the `info`
union will be used.

* 
`info` is a [VkIndirectExecutionSetInfoEXT](#VkIndirectExecutionSetInfoEXT) union containing
layout information for the set.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-maxIndirectShaderObjectCount-11014) VUID-VkIndirectExecutionSetCreateInfoEXT-maxIndirectShaderObjectCount-11014

If
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectShaderObjectCount`
is zero
or the [`shaderObject`](../features.html#features-shaderObject) feature is not
enabled
`type` **must** not be
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#VkIndirectExecutionSetInfoTypeEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-sType-sType) VUID-VkIndirectExecutionSetCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-type-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-type-parameter

 `type` **must** be a valid [VkIndirectExecutionSetInfoTypeEXT](#VkIndirectExecutionSetInfoTypeEXT) value

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-pPipelineInfo-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-pPipelineInfo-parameter

 If `type` is [VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](#VkIndirectExecutionSetInfoTypeEXT), the `pPipelineInfo` member of `info` **must** be a valid pointer to a valid [VkIndirectExecutionSetPipelineInfoEXT](#VkIndirectExecutionSetPipelineInfoEXT) structure

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-pShaderInfo-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-pShaderInfo-parameter

 If `type` is [VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#VkIndirectExecutionSetInfoTypeEXT), the `pShaderInfo` member of `info` **must** be a valid pointer to a valid [VkIndirectExecutionSetShaderInfoEXT](#VkIndirectExecutionSetShaderInfoEXT) structure

Values which **can** be set in
[VkIndirectExecutionSetCreateInfoEXT](#VkIndirectExecutionSetCreateInfoEXT)::`type`, specifying contents
of an indirect execution set, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectExecutionSetInfoTypeEXT {
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT = 0,
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT = 1,
} VkIndirectExecutionSetInfoTypeEXT;

* 
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](#VkIndirectExecutionSetInfoTypeEXT) specifies that
the indirect execution set contains [VkPipeline](../pipelines.html#VkPipeline) objects.

* 
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#VkIndirectExecutionSetInfoTypeEXT) specifies
that the indirect execution set contains [VkShaderEXT](../shaders.html#VkShaderEXT) objects.

The `VkIndirectExecutionSetInfoEXT` union is defined as:

// Provided by VK_EXT_device_generated_commands
typedef union VkIndirectExecutionSetInfoEXT {
    const VkIndirectExecutionSetPipelineInfoEXT*    pPipelineInfo;
    const VkIndirectExecutionSetShaderInfoEXT*      pShaderInfo;
} VkIndirectExecutionSetInfoEXT;

* 
`pPipelineInfo` is a pointer to a
[VkIndirectExecutionSetPipelineInfoEXT](#VkIndirectExecutionSetPipelineInfoEXT) structure containing
pipeline layout information for the set.

* 
`pShaderInfo` is a pointer to a
[VkIndirectExecutionSetShaderInfoEXT](#VkIndirectExecutionSetShaderInfoEXT) structure containing shader
object layout information for the set.

The `VkIndirectExecutionSetPipelineInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetPipelineInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         initialPipeline;
    uint32_t           maxPipelineCount;
} VkIndirectExecutionSetPipelineInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`initialPipeline` is the initial pipeline for the set.
This pipeline will be automatically added to the set at index `0`.

* 
`maxPipelineCount` is the maximum number of pipelines stored in the
set.

The characteristics of `initialPipeline` will be used to validate all
pipelines added to the set even if they are removed from the set or
destroyed.

When an Indirect Execution Set created with pipelines is used,
`initialPipeline` constitutes the initial shader state.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11015) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11015

If [](../limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain [VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits), the
[VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) of `initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11016) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11016

If [](../limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits), the
[VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) of `initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11017) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11017

If [](../limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain ray tracing stages, the [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) of
`initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-maxPipelineCount-11018) VUID-VkIndirectExecutionSetPipelineInfoEXT-maxPipelineCount-11018

`maxPipelineCount` **must** be between `1` and
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectPipelineCount`

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11019) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11019

`initialPipeline` **must** not use descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](../descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](../descriptors.html#VkDescriptorType)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11153) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11153

`initialPipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-sType-sType) VUID-VkIndirectExecutionSetPipelineInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_PIPELINE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-parameter) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-parameter

 `initialPipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

The `VkIndirectExecutionSetShaderInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetShaderInfoEXT {
    VkStructureType                                     sType;
    const void*                                         pNext;
    uint32_t                                            shaderCount;
    const VkShaderEXT*                                  pInitialShaders;
    const VkIndirectExecutionSetShaderLayoutInfoEXT*    pSetLayoutInfos;
    uint32_t                                            maxShaderCount;
    uint32_t                                            pushConstantRangeCount;
    const VkPushConstantRange*                          pPushConstantRanges;
} VkIndirectExecutionSetShaderInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCount` is the number of members in the `pInitialShaders`
and `pSetLayoutInfos` arrays.

* 
`pInitialShaders` is a pointer to an array containing a
[VkShaderEXT](../shaders.html#VkShaderEXT) object for each shader stage that will be used in the
set.
These shaders will be automatically added to the set beginning at index
`0`.

* 
`pSetLayoutInfos` is NULL or a pointer to an array containing a
[VkIndirectExecutionSetShaderLayoutInfoEXT](#VkIndirectExecutionSetShaderLayoutInfoEXT) used by each
corresponding `pInitialShaders` shader stage in the set.

* 
`maxShaderCount` is the maximum number of shader objects stored in
the set.

* 
`pushConstantRangeCount` is the number of members in the
`pPushConstantRanges` array.

* 
`pPushConstantRanges` is a pointer to the array of
[VkPushConstantRange](../descriptorsets.html#VkPushConstantRange) ranges used by all shaders in the set.

The characteristics of `pInitialShaders` will be used to validate all
shaders added to the set even if they are removed from the set or destroyed.

When an Indirect Execution Set created with shader objects is used,
`pInitialShaders` constitutes the initial shader state.

If `pSetLayoutInfos` is `NULL`, the descriptor layout parameters are
inherited from the shader object.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11020) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11020

All members of `pInitialShaders` **must** have a `stage` supported
by [](../limits.html#limits-supportedIndirectCommandsShaderStagesShaderBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesShaderBinding`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11021) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11021

`maxShaderCount` **must** not be zero

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11022) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11022

`maxShaderCount` **must** be less than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectShaderObjectCount`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11036) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11036

`maxShaderCount` **must** be greater than or equal to `shaderCount`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-stage-11023) VUID-VkIndirectExecutionSetShaderInfoEXT-stage-11023

The `stage` of each element in the `pInitialShaders` array **must**
be unique

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11154) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11154

Each member of `pInitialShaders` **must** have been created with
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-10929) VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-10929

If `pSetLayoutInfos` is not `NULL`, the descriptor layout values
specified **must** be compatible with the descriptor set layouts defined at
the creation of the shader object

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11321) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11321

If any element of `pInitialShaders` was created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), all elements of
`pInitialShaders` **must** have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11322) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11322

If any element of `pInitialShaders` was created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), all elements of
`pInitialShaders` **must** have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11323) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11323

If elements of `pInitialShaders` were created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), `pSetLayoutInfos`
**must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-sType-sType) VUID-VkIndirectExecutionSetShaderInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-parameter

 `pInitialShaders` **must** be a valid pointer to an array of `shaderCount` valid [VkShaderEXT](../shaders.html#VkShaderEXT) handles

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-parameter

 If `pSetLayoutInfos` is not `NULL`, `pSetLayoutInfos` **must** be a valid pointer to an array of `shaderCount` valid [VkIndirectExecutionSetShaderLayoutInfoEXT](#VkIndirectExecutionSetShaderLayoutInfoEXT) structures

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pPushConstantRanges-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pPushConstantRanges-parameter

 If `pushConstantRangeCount` is not `0`, `pPushConstantRanges` **must** be a valid pointer to an array of `pushConstantRangeCount` valid [VkPushConstantRange](../descriptorsets.html#VkPushConstantRange) structures

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-shaderCount-arraylength) VUID-VkIndirectExecutionSetShaderInfoEXT-shaderCount-arraylength

 `shaderCount` **must** be greater than `0`

The `VkIndirectExecutionSetShaderLayoutInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetShaderLayoutInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        setLayoutCount;
    const VkDescriptorSetLayout*    pSetLayouts;
} VkIndirectExecutionSetShaderLayoutInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`setLayoutCount` is the number of members in the `pSetLayouts`
array

* 
`pSetLayouts` is a pointer to an array containing
[VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) objects used by the shader stage.
The implementation **must** not access these objects outside of the
duration of the command this structure is passed to.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-11024) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-11024

All members of `pSetLayouts` **must** not contain descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](../descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](../descriptors.html#VkDescriptorType)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-sType-sType) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_LAYOUT_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-parameter) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-parameter

 If `setLayoutCount` is not `0`, `pSetLayouts` **must** be a valid pointer to an array of `setLayoutCount` valid or [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) handles

Destroy an Indirect Execution Set by calling:

// Provided by VK_EXT_device_generated_commands
void vkDestroyIndirectExecutionSetEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-11025) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-11025

All submitted commands that refer to `indirectExecutionSet` **must**
have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-device-parameter) VUID-vkDestroyIndirectExecutionSetEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parameter) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parameter

 If `indirectExecutionSet` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-pAllocator-parameter) VUID-vkDestroyIndirectExecutionSetEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parent) VUID-vkDestroyIndirectExecutionSetEXT-indirectExecutionSet-parent

 If `indirectExecutionSet` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

The `VkWriteIndirectExecutionSetPipelineEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkWriteIndirectExecutionSetPipelineEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
    VkPipeline         pipeline;
} VkWriteIndirectExecutionSetPipelineEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the element of the set to update

* 
`pipeline` is the pipeline to store in the indirect execution set

Valid Usage

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11026) VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11026

`index` **must** be less than the value of
`VkIndirectExecutionSetPipelineInfoEXT`::`maxPipelineCount` used
to create the set

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11027) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11027

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11029) VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11029

`index` **must** not be referenced by submitted command buffers

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11030) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11030

The shader stages contained in `pipeline` **must** be supported by
[](../limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStagesPipelineBinding`

Valid Usage (Implicit)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-sType-sType) VUID-VkWriteIndirectExecutionSetPipelineEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_PIPELINE_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-parameter) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

The `VkWriteIndirectExecutionSetShaderEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands with VK_EXT_shader_object
typedef struct VkWriteIndirectExecutionSetShaderEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
    VkShaderEXT        shader;
} VkWriteIndirectExecutionSetShaderEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the element of the set to update

* 
`shader` is the shader to store in the indirect execution set

Shaders need not be stored in the Indirect Execution Set according to their
stage.
The only restriction for shader indices within a set is that the value of
the index **must** be less than the maximum number of shaders in the set.

Valid Usage

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-index-11031) VUID-VkWriteIndirectExecutionSetShaderEXT-index-11031

`index` **must** be less than
`VkIndirectExecutionSetShaderInfoEXT`::`maxShaderCount`

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-shader-11032) VUID-VkWriteIndirectExecutionSetShaderEXT-shader-11032

`shader` **must** have been created with
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-pInitialShaders-11033) VUID-VkWriteIndirectExecutionSetShaderEXT-pInitialShaders-11033

A shader created with the same [VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) **must** have
been passed in the
`VkIndirectExecutionSetShaderInfoEXT`::`pInitialShaders` array

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-index-11034) VUID-VkWriteIndirectExecutionSetShaderEXT-index-11034

`index` **must** not be in use by submitted command buffers

Valid Usage (Implicit)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-sType-sType) VUID-VkWriteIndirectExecutionSetShaderEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_SHADER_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-shader-parameter) VUID-VkWriteIndirectExecutionSetShaderEXT-shader-parameter

 `shader` **must** be a valid [VkShaderEXT](../shaders.html#VkShaderEXT) handle

Pipeline elements in an Indirect Execution Set can be updated by calling:

// Provided by VK_EXT_device_generated_commands
void vkUpdateIndirectExecutionSetPipelineEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    uint32_t                                    executionSetWriteCount,
    const VkWriteIndirectExecutionSetPipelineEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set being updated.

* 
`executionSetWriteCount` is the number of elements in the
`pExecutionSetWrites` array.

* 
`pExecutionSetWrites` is a pointer to an array of
[VkWriteIndirectExecutionSetPipelineEXT](#VkWriteIndirectExecutionSetPipelineEXT) structures describing the
elements to update.

Valid Usage

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-11035) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-11035

`indirectExecutionSet` **must** have been created with type
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](#VkIndirectExecutionSetInfoTypeEXT)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-11037) VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-11037

`executionSetWriteCount` **must** be less than or equal to
`VkIndirectExecutionSetPipelineInfoEXT`::`maxPipelineCount`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-11042) VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-11042

Each element in the `pExecutionSetWrites` array must have a unique
`VkWriteIndirectExecutionSetPipelineEXT`::`index`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11038) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11038

Each member of the Indirect Execution Set referenced by the update
command **must** not be in use by the device

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11324) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11324

If `initialPipeline` was created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR), each pipeline in
`pExecutionSetWrites` **must** also have been created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11325) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11325

If `initialPipeline` was created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR), each pipeline in
`pExecutionSetWrites` **must** also have been created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11039) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11039

If `initialPipeline` was created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR), the
layout of each pipeline in `pExecutionSetWrites` **must** be
[compatible](../descriptorsets.html#descriptors-compatibility) with the `initialPipeline`
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11040) VUID-vkUpdateIndirectExecutionSetPipelineEXT-None-11040

Each pipeline in the Indirect Execution Set **must** have identically
defined static and dynamic state values to the `initialPipeline`
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11147) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11147

Each pipeline in the Indirect Execution Set **must** have identically
defined [fragment outputs interface](../interfaces.html#interfaces-fragmentoutput) to the
`initialPipeline` used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11152) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11152

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
included shader stages

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11098) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11098

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `FragDepth`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11086) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11086

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `SampleMask`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11085) VUID-vkUpdateIndirectExecutionSetPipelineEXT-initialPipeline-11085

Each pipeline in the Indirect Execution Set **must** match the
`initialPipeline` used to create the Indirect Execution Set in its
use of `StencilExportEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-device-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parameter

 `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-parameter) VUID-vkUpdateIndirectExecutionSetPipelineEXT-pExecutionSetWrites-parameter

 `pExecutionSetWrites` **must** be a valid pointer to an array of `executionSetWriteCount` valid [VkWriteIndirectExecutionSetPipelineEXT](#VkWriteIndirectExecutionSetPipelineEXT) structures

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-arraylength) VUID-vkUpdateIndirectExecutionSetPipelineEXT-executionSetWriteCount-arraylength

 `executionSetWriteCount` **must** be greater than `0`

* 
[](#VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parent) VUID-vkUpdateIndirectExecutionSetPipelineEXT-indirectExecutionSet-parent

 `indirectExecutionSet` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

Shader object elements in an Indirect Execution Set can be updated by
calling:

// Provided by VK_EXT_device_generated_commands
void vkUpdateIndirectExecutionSetShaderEXT(
    VkDevice                                    device,
    VkIndirectExecutionSetEXT                   indirectExecutionSet,
    uint32_t                                    executionSetWriteCount,
    const VkWriteIndirectExecutionSetShaderEXT* pExecutionSetWrites);

* 
`device` is the logical device that owns the indirect execution set.

* 
`indirectExecutionSet` is the indirect execution set being updated.

* 
`executionSetWriteCount` is the number of elements in the
`pExecutionSetWrites` array.

* 
`pExecutionSetWrites` is a pointer to an array of
[VkWriteIndirectExecutionSetShaderEXT](#VkWriteIndirectExecutionSetShaderEXT) structures describing the
elements to update.

Valid Usage

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-11041) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-11041

`indirectExecutionSet` **must** have been created with type
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#VkIndirectExecutionSetInfoTypeEXT)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11043) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11043

Each element in the `pExecutionSetWrites` array must have a unique
`VkWriteIndirectExecutionSetShaderEXT`::`index`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11044) VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11044

Each member of the Indirect Execution Set referenced by the update
command **must** not be in use by the device

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11326) VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11326

If the shaders in `pInitialShaders` were created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), each shader in
`pExecutionSetWrites` **must** also have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11327) VUID-vkUpdateIndirectExecutionSetShaderEXT-pInitialShaders-11327

If the shaders in `pInitialShaders` were created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), each pipeline in
`pExecutionSetWrites` **must** also have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11140) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-11140

If the shaders in `pInitialShaders` were created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT), the
descriptor layout of each shader in `pExecutionSetWrites` **must** be
[compatible](../descriptorsets.html#descriptors-compatibility) with the initial layout info
used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11148) VUID-vkUpdateIndirectExecutionSetShaderEXT-None-11148

Each fragment shader element in the Indirect Execution Set **must** have
[identically defined](../../appendices/glossary.html#glossary-identically-defined)
[fragment outputs interface](../interfaces.html#interfaces-fragmentoutput) to the initial
shader state used to create the Indirect Execution Set

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-FragDepth-11054) VUID-vkUpdateIndirectExecutionSetShaderEXT-FragDepth-11054

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `FragDepth`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-SampleMask-11050) VUID-vkUpdateIndirectExecutionSetShaderEXT-SampleMask-11050

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `SampleMask`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-StencilExportEXT-11003) VUID-vkUpdateIndirectExecutionSetShaderEXT-StencilExportEXT-11003

Each fragment shader element in the Indirect Execution Set **must** match
the initial shader state used to create the Indirect Execution Set in
its use of `StencilExportEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-device-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parameter

 `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-parameter) VUID-vkUpdateIndirectExecutionSetShaderEXT-pExecutionSetWrites-parameter

 `pExecutionSetWrites` **must** be a valid pointer to an array of `executionSetWriteCount` valid [VkWriteIndirectExecutionSetShaderEXT](#VkWriteIndirectExecutionSetShaderEXT) structures

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-executionSetWriteCount-arraylength) VUID-vkUpdateIndirectExecutionSetShaderEXT-executionSetWriteCount-arraylength

 `executionSetWriteCount` **must** be greater than `0`

* 
[](#VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parent) VUID-vkUpdateIndirectExecutionSetShaderEXT-indirectExecutionSet-parent

 `indirectExecutionSet` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `indirectExecutionSet` **must** be externally synchronized

It is legal to update an Indirect Execution Set that is in flight as long as
the element indices in `pExecutionSetWrites` are not in use.
Any change to an indirect execution set requires recalculating memory
requirements by calling [vkGetGeneratedCommandsMemoryRequirementsEXT](#vkGetGeneratedCommandsMemoryRequirementsEXT)
for commands that use that modified state.
Commands that are in flight or those not using updated elements require no
changes.

The lifetimes of pipelines
and shader objects
contained in a set **must** match or exceed the lifetime of the set.

With `[VK_NV_device_generated_commands](../../appendices/extensions.html#VK_NV_device_generated_commands)`, the actual generation of
commands as well as their execution on the device is handled as single
action with:

// Provided by VK_NV_device_generated_commands
void vkCmdExecuteGeneratedCommandsNV(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    isPreprocessed,
    const VkGeneratedCommandsInfoNV*            pGeneratedCommandsInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`isPreprocessed` represents whether the input data has already been
preprocessed on the device.
If it is [VK_FALSE](../fundamentals.html#VK_FALSE) this command will implicitly trigger the
preprocessing step, otherwise not.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV) structure containing parameters
affecting the generation of commands.

If the [VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV)
flag was used to create the
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`indirectCommandsLayout` then the order
of execution of individual draws through this command **may** execute in any
order, and **may** not necessarily be in the same order as specified in
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`pStreams`.

The order of execution of individual dispatches through this command **may**
execute in any order and **may** not necessarily be in the same order as
specified in [VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`pStreams`.

Valid Usage

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-magFilter-04553) VUID-vkCmdExecuteGeneratedCommandsNV-magFilter-04553

If a [VkSampler](../samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](../samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](../samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](../fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-magFilter-09598) VUID-vkCmdExecuteGeneratedCommandsNV-magFilter-09598

If a [VkSampler](../samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](../samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-mipmapMode-04770) VUID-vkCmdExecuteGeneratedCommandsNV-mipmapMode-04770

If a [VkSampler](../samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](../samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](../samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](../fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-mipmapMode-09599) VUID-vkCmdExecuteGeneratedCommandsNV-mipmapMode-09599

If a [VkSampler](../samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](../samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-unnormalizedCoordinates-09635) VUID-vkCmdExecuteGeneratedCommandsNV-unnormalizedCoordinates-09635

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08609) VUID-vkCmdExecuteGeneratedCommandsNV-None-08609

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](../resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](../resources.html#VkImageViewType)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08610) VUID-vkCmdExecuteGeneratedCommandsNV-None-08610

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08611) VUID-vkCmdExecuteGeneratedCommandsNV-None-08611

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-06479) VUID-vkCmdExecuteGeneratedCommandsNV-None-06479

If a [VkImageView](../resources.html#VkImageView) is sampled with
[depth comparison](../textures.html#textures-depth-compare-operation), the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-02691) VUID-vkCmdExecuteGeneratedCommandsNV-None-02691

If a [VkImageView](../resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07888) VUID-vkCmdExecuteGeneratedCommandsNV-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](../descriptors.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](../resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-02692) VUID-vkCmdExecuteGeneratedCommandsNV-None-02692

If a [VkImageView](../resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-02693) VUID-vkCmdExecuteGeneratedCommandsNV-None-02693

If
the [VK_EXT_filter_cubic](../../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](../resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](../resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](../resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](../resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](../resources.html#VkImageViewType)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-filterCubic-02694) VUID-vkCmdExecuteGeneratedCommandsNV-filterCubic-02694

Any [VkImageView](../resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](../resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](../capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-filterCubicMinmax-02695) VUID-vkCmdExecuteGeneratedCommandsNV-filterCubicMinmax-02695

Any [VkImageView](../resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](../resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](../capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-cubicRangeClamp-09212) VUID-vkCmdExecuteGeneratedCommandsNV-cubicRangeClamp-09212

If the [`cubicRangeClamp`](../features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](../resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](../samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](../samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-reductionMode-09213) VUID-vkCmdExecuteGeneratedCommandsNV-reductionMode-09213

Any [VkImageView](../resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](../samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](../samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-selectableCubicWeights-09214) VUID-vkCmdExecuteGeneratedCommandsNV-selectableCubicWeights-09214

If the [`selectableCubicWeights`](../features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](../resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](../samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](../samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-flags-02696) VUID-vkCmdExecuteGeneratedCommandsNV-flags-02696

Any [VkImage](../resources.html#VkImage) created with a [VkImageCreateInfo](../resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](../resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](../samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](../samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07027) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07027

For any [VkImageView](../resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07028) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07028

For any [VkImageView](../resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07029) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07029

For any [VkBufferView](../resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](../formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07030) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07030

Any [VkBufferView](../resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](../formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08600) VUID-vkCmdExecuteGeneratedCommandsNV-None-08600

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](../shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](../descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08601) VUID-vkCmdExecuteGeneratedCommandsNV-None-08601

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](../descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](../shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10068) VUID-vkCmdExecuteGeneratedCommandsNV-None-10068

For each array of resources that is used by [a bound    shader](../shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-maintenance4-08602) VUID-vkCmdExecuteGeneratedCommandsNV-maintenance4-08602

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](../descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](../descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](../shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08114) VUID-vkCmdExecuteGeneratedCommandsNV-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](../descriptorsets.html#descriptor-validity) by
the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](../pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageLayout-00344) VUID-vkCmdExecuteGeneratedCommandsNV-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](../resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](../resources.html#VkImageView) as
defined by the [image layout    matching rules](../resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08115) VUID-vkCmdExecuteGeneratedCommandsNV-None-08115

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](../pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08116) VUID-vkCmdExecuteGeneratedCommandsNV-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](../pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08604) VUID-vkCmdExecuteGeneratedCommandsNV-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08117) VUID-vkCmdExecuteGeneratedCommandsNV-None-08117

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](../pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08119) VUID-vkCmdExecuteGeneratedCommandsNV-None-08119

If a descriptor is dynamically used with a [VkPipeline](../pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08605) VUID-vkCmdExecuteGeneratedCommandsNV-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](../shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08606) VUID-vkCmdExecuteGeneratedCommandsNV-None-08606

If the [`shaderObject`](../features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08608) VUID-vkCmdExecuteGeneratedCommandsNV-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](../pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-uniformBuffers-06935) VUID-vkCmdExecuteGeneratedCommandsNV-uniformBuffers-06935

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08612) VUID-vkCmdExecuteGeneratedCommandsNV-None-08612

If the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-storageBuffers-06936) VUID-vkCmdExecuteGeneratedCommandsNV-storageBuffers-06936

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08613) VUID-vkCmdExecuteGeneratedCommandsNV-None-08613

If the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-02707) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](../shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewType-07752) VUID-vkCmdExecuteGeneratedCommandsNV-viewType-07752

If a [VkImageView](../resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-format-07753) VUID-vkCmdExecuteGeneratedCommandsNV-format-07753

If a [VkImageView](../resources.html#VkImageView) or [VkBufferView](../resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](../formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-08795) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-08795

If a [VkImageView](../resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](../formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-08796) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-08796

If a [VkImageView](../resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](../formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-04469) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageWrite-04469

If a [VkBufferView](../resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04470) VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04470

If a [VkImageView](../resources.html#VkImageView) with a [VkFormat](../formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04471) VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04471

If a [VkImageView](../resources.html#VkImageView) with a [VkFormat](../formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04472) VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04472

If a [VkBufferView](../resources.html#VkBufferView) with a [VkFormat](../formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04473) VUID-vkCmdExecuteGeneratedCommandsNV-SampledType-04473

If a [VkBufferView](../resources.html#VkBufferView) with a [VkFormat](../formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-sparseImageInt64Atomics-04474) VUID-vkCmdExecuteGeneratedCommandsNV-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](../features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](../resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](../resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-sparseImageInt64Atomics-04475) VUID-vkCmdExecuteGeneratedCommandsNV-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](../features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](../resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](../resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06971) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](../resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06972) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](../resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBoxFilterQCOM-06973) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](../resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](../textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06977) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](../samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](../samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06978) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](../samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](../samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09215) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09216) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09217) VUID-vkCmdExecuteGeneratedCommandsNV-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](../textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07288) VUID-vkCmdExecuteGeneratedCommandsNV-None-07288

Any shader invocation executed by this command **must**
[terminate](../shaders.html#shaders-termination)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09600) VUID-vkCmdExecuteGeneratedCommandsNV-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](../descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](../descriptors.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-10746) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](../memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](../memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10678) VUID-vkCmdExecuteGeneratedCommandsNV-None-10678

If this command is recorded inside a [tile    shading render pass](../renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10679) VUID-vkCmdExecuteGeneratedCommandsNV-None-10679

If this command is recorded where
[per-tile execution model](../renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](../resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDescription-09900) VUID-vkCmdExecuteGeneratedCommandsNV-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](../resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](../resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-dimensionCount-09905) VUID-vkCmdExecuteGeneratedCommandsNV-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](../resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](../resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeTensorARM-09906) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](../formats.html#VkFormat) of the
[VkTensorViewARM](../resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11297) VUID-vkCmdExecuteGeneratedCommandsNV-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](../limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11298) VUID-vkCmdExecuteGeneratedCommandsNV-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](../limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11299) VUID-vkCmdExecuteGeneratedCommandsNV-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](../limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11397) VUID-vkCmdExecuteGeneratedCommandsNV-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](../limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11300) VUID-vkCmdExecuteGeneratedCommandsNV-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11301) VUID-vkCmdExecuteGeneratedCommandsNV-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11302) VUID-vkCmdExecuteGeneratedCommandsNV-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11304) VUID-vkCmdExecuteGeneratedCommandsNV-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11305) VUID-vkCmdExecuteGeneratedCommandsNV-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11306) VUID-vkCmdExecuteGeneratedCommandsNV-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11308) VUID-vkCmdExecuteGeneratedCommandsNV-None-11308

For each [descriptor heap](../descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](../shaders.html#shaders-binding), either directly or via a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11309) VUID-vkCmdExecuteGeneratedCommandsNV-None-11309

If a [bound shader](../shaders.html#shaders-binding) was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11372) VUID-vkCmdExecuteGeneratedCommandsNV-None-11372

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11373) VUID-vkCmdExecuteGeneratedCommandsNV-None-11373

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11374) VUID-vkCmdExecuteGeneratedCommandsNV-None-11374

If
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pBindInfo-11375) VUID-vkCmdExecuteGeneratedCommandsNV-pBindInfo-11375

If any [bound shader](../shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](../descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](../limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11376) VUID-vkCmdExecuteGeneratedCommandsNV-None-11376

If a [bound shader](../shaders.html#shaders-binding) was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](../descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11398) VUID-vkCmdExecuteGeneratedCommandsNV-None-11398

If a [bound shader](../shaders.html#shaders-binding) was created with a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](../shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11437) VUID-vkCmdExecuteGeneratedCommandsNV-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11438) VUID-vkCmdExecuteGeneratedCommandsNV-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11441) VUID-vkCmdExecuteGeneratedCommandsNV-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](../limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11439) VUID-vkCmdExecuteGeneratedCommandsNV-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11442) VUID-vkCmdExecuteGeneratedCommandsNV-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](../limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11485) VUID-vkCmdExecuteGeneratedCommandsNV-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](../resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](../resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](../resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](../resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-index-11450) VUID-vkCmdExecuteGeneratedCommandsNV-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](../samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](../samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-protectedNoFault-11455) VUID-vkCmdExecuteGeneratedCommandsNV-protectedNoFault-11455

If [`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](../resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-protectedNoFault-11456) VUID-vkCmdExecuteGeneratedCommandsNV-protectedNoFault-11456

If [`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](../resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-renderPass-02684) VUID-vkCmdExecuteGeneratedCommandsNV-renderPass-02684

The current render pass **must** be [compatible](../renderpass.html#renderpass-compatibility)
with the `renderPass` member of the
`VkGraphicsPipelineCreateInfo` structure specified when creating the
`VkPipeline` bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-subpass-02685) VUID-vkCmdExecuteGeneratedCommandsNV-subpass-02685

The subpass index of the current render pass **must** be equal to the
`subpass` member of the `VkGraphicsPipelineCreateInfo` structure
specified when creating the `VkPipeline` bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07468) VUID-vkCmdExecuteGeneratedCommandsNV-OpTypeImage-07468

If any shader executed by this pipeline accesses an `OpTypeImage`
variable with a `Dim` operand of `SubpassData`, it **must** be
decorated with an `InputAttachmentIndex` that corresponds to a valid
input attachment in the current subpass

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07469) VUID-vkCmdExecuteGeneratedCommandsNV-None-07469

Input attachment views accessed in a subpass **must** be created with the
same [VkFormat](../formats.html#VkFormat) as the corresponding subpass definition, and be
created with a [VkImageView](../resources.html#VkImageView) that is compatible with the attachment
referenced by the subpass'
`pInputAttachments`[`InputAttachmentIndex`] in the bound
[VkFramebuffer](../renderpass.html#VkFramebuffer) as specified by
[Fragment Input Attachment    Compatibility](../interfaces.html#compatibility-inputattachment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthInputAttachmentIndex-09595) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthInputAttachmentIndex-09595

Input attachment views accessed in a dynamic render pass with a
`InputAttachmentIndex` referenced by
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo), or no
`InputAttachmentIndex` if
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
or
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
are `NULL`, **must** be created with a [VkImageView](../resources.html#VkImageView) that is compatible
with the corresponding color, depth, or stencil attachment in
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthInputAttachmentIndex-09596) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthInputAttachmentIndex-09596

Input attachment views accessed in a dynamic render pass via a shader
object **must** have an `InputAttachmentIndex` if both
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
and
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
are non-`NULL`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-InputAttachmentIndex-09597) VUID-vkCmdExecuteGeneratedCommandsNV-InputAttachmentIndex-09597

If an input attachment view accessed in a dynamic render pass via a
shader object has an `InputAttachmentIndex`, the
`InputAttachmentIndex` **must** match an index in
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-06537) VUID-vkCmdExecuteGeneratedCommandsNV-None-06537

Memory backing image subresources used as attachments in the current
render pass **must** not be written in any way other than as an attachment
by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10795) VUID-vkCmdExecuteGeneratedCommandsNV-None-10795

If a color attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10796) VUID-vkCmdExecuteGeneratedCommandsNV-None-10796

If a depth attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10797) VUID-vkCmdExecuteGeneratedCommandsNV-None-10797

If a stencil attachment is written by any prior command in this subpass
or by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-12338) VUID-vkCmdExecuteGeneratedCommandsNV-None-12338

If a color attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the color attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-12339) VUID-vkCmdExecuteGeneratedCommandsNV-None-12339

If a depth attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the depth attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-12340) VUID-vkCmdExecuteGeneratedCommandsNV-None-12340

If a stencil attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the stencil attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09003) VUID-vkCmdExecuteGeneratedCommandsNV-None-09003

If an attachment is written by any prior command in this subpass or by
the load, store, or resolve operations for this subpass, it **must** not be
accessed in any way other than as an attachment, storage image, or
sampled image by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-06886) VUID-vkCmdExecuteGeneratedCommandsNV-None-06886

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the depth aspect, [depth    writes](../fragops.html#fragops-depth-write) **must** be disabled

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-06887) VUID-vkCmdExecuteGeneratedCommandsNV-None-06887

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the stencil aspect, both front and back
`writeMask` are not zero, and stencil test is enabled,
[all stencil ops](../fragops.html#fragops-stencil) **must** be [VK_STENCIL_OP_KEEP](../fragops.html#VkStencilOp)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07831) VUID-vkCmdExecuteGeneratedCommandsNV-None-07831

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT](../pipelines.html#VkDynamicState) dynamic state enabled then
[vkCmdSetViewport](../vertexpostproc.html#vkCmdSetViewport) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07832) VUID-vkCmdExecuteGeneratedCommandsNV-None-07832

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SCISSOR](../pipelines.html#VkDynamicState) dynamic state enabled then
[vkCmdSetScissor](../fragops.html#vkCmdSetScissor) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08617) VUID-vkCmdExecuteGeneratedCommandsNV-None-08617

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_WIDTH](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then [vkCmdSetLineWidth](../primsrast.html#vkCmdSetLineWidth) **must**
have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07834) VUID-vkCmdExecuteGeneratedCommandsNV-None-07834

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthBiasEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthBias](../primsrast.html#vkCmdSetDepthBias)
or [vkCmdSetDepthBias2EXT](../primsrast.html#vkCmdSetDepthBias2EXT)
**must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07835) VUID-vkCmdExecuteGeneratedCommandsNV-None-07835

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and an active color
attachment [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE) with a blend equations where any
[VkBlendFactor](../framebuffer.html#VkBlendFactor) member is [VK_BLEND_FACTOR_CONSTANT_COLOR](../framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](../framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_CONSTANT_ALPHA](../framebuffer.html#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](../framebuffer.html#VkBlendFactor), then
[vkCmdSetBlendConstants](../framebuffer.html#vkCmdSetBlendConstants) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07836) VUID-vkCmdExecuteGeneratedCommandsNV-None-07836

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`depthBoundsTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDepthBounds](../fragops.html#vkCmdSetDepthBounds) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07837) VUID-vkCmdExecuteGeneratedCommandsNV-None-07837

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilCompareMask](../fragops.html#vkCmdSetStencilCompareMask) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07838) VUID-vkCmdExecuteGeneratedCommandsNV-None-07838

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilWriteMask](../fragops.html#vkCmdSetStencilWriteMask) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07839) VUID-vkCmdExecuteGeneratedCommandsNV-None-07839

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of and
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilReference](../fragops.html#vkCmdSetStencilReference) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-maxMultiviewInstanceIndex-02688) VUID-vkCmdExecuteGeneratedCommandsNV-maxMultiviewInstanceIndex-02688

If the draw is recorded in a render pass instance with multiview
enabled, the maximum instance index **must** be less than or equal to
[VkPhysicalDeviceMultiviewProperties](../limits.html#VkPhysicalDeviceMultiviewProperties)::`maxMultiviewInstanceIndex`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-02689) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-02689

If the bound graphics pipeline was created with
[VkPipelineSampleLocationsStateCreateInfoEXT](../primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
set to [VK_TRUE](../fundamentals.html#VK_TRUE), then the active depth attachment **must** have been
created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](../resources.html#VkImageCreateFlagBits) bit set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07634) VUID-vkCmdExecuteGeneratedCommandsNV-None-07634

If the `[VK_EXT_sample_locations](../../appendices/extensions.html#VK_EXT_sample_locations)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-06666) VUID-vkCmdExecuteGeneratedCommandsNV-None-06666

If the `[VK_EXT_sample_locations](../../appendices/extensions.html#VK_EXT_sample_locations)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07840) VUID-vkCmdExecuteGeneratedCommandsNV-None-07840

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CULL_MODE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCullMode](../primsrast.html#vkCmdSetCullMode) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07841) VUID-vkCmdExecuteGeneratedCommandsNV-None-07841

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRONT_FACE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetFrontFace](../primsrast.html#vkCmdSetFrontFace) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07843) VUID-vkCmdExecuteGeneratedCommandsNV-None-07843

 If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE),
[vkCmdSetDepthTestEnable](../fragops.html#vkCmdSetDepthTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07844) VUID-vkCmdExecuteGeneratedCommandsNV-None-07844

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthWriteEnable](../fragops.html#vkCmdSetDepthWriteEnable) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07845) VUID-vkCmdExecuteGeneratedCommandsNV-None-07845

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthCompareOp](../fragops.html#vkCmdSetDepthCompareOp) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07846) VUID-vkCmdExecuteGeneratedCommandsNV-None-07846

If the [`depthBounds`](../features.html#features-depthBounds) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthBoundsTestEnable](../fragops.html#vkCmdSetDepthBoundsTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07847) VUID-vkCmdExecuteGeneratedCommandsNV-None-07847

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetStencilTestEnable](../fragops.html#vkCmdSetStencilTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07848) VUID-vkCmdExecuteGeneratedCommandsNV-None-07848

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_OP](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetStencilOp](../fragops.html#vkCmdSetStencilOp)
**must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-03417) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-03417

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-scissorCount-03418) VUID-vkCmdExecuteGeneratedCommandsNV-scissorCount-03418

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetScissorWithCount](../vertexpostproc.html#vkCmdSetScissorWithCount) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-03419) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-03419

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with both the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic states enabled,
and the state is not inherited,
then the `viewportCount` parameter of
`vkCmdSetViewportWithCount` **must** match the `scissorCount`
parameter of `vkCmdSetScissorWithCount`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04137) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04137

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportWScalingStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04138) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04138

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetViewportWScalingNV](../vertexpostproc.html#vkCmdSetViewportWScalingNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08636) VUID-vkCmdExecuteGeneratedCommandsNV-None-08636

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWScalingNV](../vertexpostproc.html#vkCmdSetViewportWScalingNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04139) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-04139

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic
state enabled, then the bound graphics pipeline **must** have been created
with
[VkPipelineViewportShadingRateImageStateCreateInfoNV](../primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-shadingRateImage-09233) VUID-vkCmdExecuteGeneratedCommandsNV-shadingRateImage-09233

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](../pipelines.html#VkDynamicState) and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoarseSampleOrderNV](../primsrast.html#vkCmdSetCoarseSampleOrderNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-shadingRateImage-09234) VUID-vkCmdExecuteGeneratedCommandsNV-shadingRateImage-09234

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetViewportShadingRatePaletteNV](../primsrast.html#vkCmdSetViewportShadingRatePaletteNV) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08637) VUID-vkCmdExecuteGeneratedCommandsNV-None-08637

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportShadingRatePaletteNV](../primsrast.html#vkCmdSetViewportShadingRatePaletteNV) **must** be greater than or
equal to the `viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-VkPipelineVieportCreateInfo-04141) VUID-vkCmdExecuteGeneratedCommandsNV-VkPipelineVieportCreateInfo-04141

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled and a
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV) structure chained from
[VkPipelineViewportStateCreateInfo](../vertexpostproc.html#VkPipelineViewportStateCreateInfo), then the bound graphics
pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-VkPipelineVieportCreateInfo-04142) VUID-vkCmdExecuteGeneratedCommandsNV-VkPipelineVieportCreateInfo-04142

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled and a
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](../fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) structure
chained from [VkPipelineViewportStateCreateInfo](../vertexpostproc.html#VkPipelineViewportStateCreateInfo), then the bound
graphics pipeline **must** have been created with
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](../fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV)::`exclusiveScissorCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07878) VUID-vkCmdExecuteGeneratedCommandsNV-None-07878

If the [`exclusiveScissor`](../features.html#features-exclusiveScissor) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetExclusiveScissorEnableNV](../fragops.html#vkCmdSetExclusiveScissorEnableNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07879) VUID-vkCmdExecuteGeneratedCommandsNV-None-07879

If the [`exclusiveScissor`](../features.html#features-exclusiveScissor) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](../pipelines.html#VkDynamicState) dynamic state enabled, and
the most recent call to [vkCmdSetExclusiveScissorEnableNV](../fragops.html#vkCmdSetExclusiveScissorEnableNV) in the
current command buffer set any element of `pExclusiveScissorEnables`
to [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetExclusiveScissorNV](../fragops.html#vkCmdSetExclusiveScissorNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04876) VUID-vkCmdExecuteGeneratedCommandsNV-None-04876

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizerDiscardEnable](../primsrast.html#vkCmdSetRasterizerDiscardEnable) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04877) VUID-vkCmdExecuteGeneratedCommandsNV-None-04877

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthBiasEnable](../primsrast.html#vkCmdSetDepthBiasEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-logicOp-04878) VUID-vkCmdExecuteGeneratedCommandsNV-logicOp-04878

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `logicOpEnable` is
[VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetLogicOpEXT](../framebuffer.html#vkCmdSetLogicOpEXT) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitiveFragmentShadingRateWithMultipleViewports-04552) VUID-vkCmdExecuteGeneratedCommandsNV-primitiveFragmentShadingRateWithMultipleViewports-04552

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, and
any of the shader stages of the bound graphics pipeline write to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitiveFragmentShadingRateWithMultipleViewports-08642) VUID-vkCmdExecuteGeneratedCommandsNV-primitiveFragmentShadingRateWithMultipleViewports-08642

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and any shader object bound to a graphics stage writes to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-blendEnable-04727) VUID-vkCmdExecuteGeneratedCommandsNV-blendEnable-04727

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then for each color
attachment, if the corresponding image view’s
[format features](../resources.html#resources-image-view-format-features) do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](../formats.html#VkFormatFeatureFlagBits), then the
corresponding [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` **must** be [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08644) VUID-vkCmdExecuteGeneratedCommandsNV-None-08644

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE),
and none of the following is enabled:

the `[VK_AMD_mixed_attachment_samples](../../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

* 
the [     `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature

then the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` **must** be the same as the current color and/or
depth/stencil attachments

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08876) VUID-vkCmdExecuteGeneratedCommandsNV-None-08876

If a shader object is bound to any graphics stage, the current render
pass instance **must** have been begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06172) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06172

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command
**must** not write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06173) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06173

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command
**must** not write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06174) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06174

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](../resources.html#VkImageLayout), this
command **must** not write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06175) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06175

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this
command **must** not write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06176) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06176

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command **must** not
write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06177) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06177

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command **must** not
write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewMask-06178) VUID-vkCmdExecuteGeneratedCommandsNV-viewMask-06178

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound graphics pipeline **must** have been
created with a [VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`viewMask` equal
to [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`viewMask`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-06179) VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-06179

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound graphics pipeline **must** have been
created with a
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`colorAttachmentCount` equal to
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08910) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08910

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08912) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08912

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `imageView` equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have the
corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08911) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08911

If the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, and the
current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`,
then each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments`
array with an `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats`, if
it exists, **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-09362) VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-09362

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`,
there is no shader object bound to any graphics stage,
and a color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), each
element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with
a `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
been created with an image created with a
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value equal to the
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09363) VUID-vkCmdExecuteGeneratedCommandsNV-None-09363

If
there is no shader object bound to any graphics stage,
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`, and a
color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), each
element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with
a `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
created with an image created with a
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value equal to the
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09364) VUID-vkCmdExecuteGeneratedCommandsNV-None-09364

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have set the blend enable
to [VK_FALSE](../fundamentals.html#VK_FALSE) prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09365) VUID-vkCmdExecuteGeneratedCommandsNV-None-09365

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](../limits.html#VkSampleCountFlagBits) prior to this
drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09366) VUID-vkCmdExecuteGeneratedCommandsNV-None-09366

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have set blend enable
to [VK_FALSE](../fundamentals.html#VK_FALSE) prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-09367) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-09367

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](../limits.html#VkSampleCountFlagBits) prior to this
drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09368) VUID-vkCmdExecuteGeneratedCommandsNV-None-09368

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09369) VUID-vkCmdExecuteGeneratedCommandsNV-None-09369

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pFragmentSize-09370) VUID-vkCmdExecuteGeneratedCommandsNV-pFragmentSize-09370

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pFragmentSize-09371) VUID-vkCmdExecuteGeneratedCommandsNV-pFragmentSize-09371

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07749) VUID-vkCmdExecuteGeneratedCommandsNV-None-07749

If the [`colorWriteEnable`](../features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorWriteEnableEXT](../framebuffer.html#vkCmdSetColorWriteEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-attachmentCount-07750) VUID-vkCmdExecuteGeneratedCommandsNV-attachmentCount-07750

If the [`colorWriteEnable`](../features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the
`attachmentCount` parameter of most recent call to
`vkCmdSetColorWriteEnableEXT` in the current command buffer **must** be
greater than or equal to the number of active color attachments

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07751) VUID-vkCmdExecuteGeneratedCommandsNV-None-07751

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled, a
graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo) included a
[VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleEXT](../fragops.html#vkCmdSetDiscardRectangleEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT)::`discardRectangleCount`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-09236) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-09236

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo) did not
include a [VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleEXT](../fragops.html#vkCmdSetDiscardRectangleEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPhysicalDeviceDiscardRectanglePropertiesEXT](../limits.html#VkPhysicalDeviceDiscardRectanglePropertiesEXT)::`maxDiscardRectangles`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07880) VUID-vkCmdExecuteGeneratedCommandsNV-None-07880

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDiscardRectangleEnableEXT](../fragops.html#vkCmdSetDiscardRectangleEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07881) VUID-vkCmdExecuteGeneratedCommandsNV-None-07881

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleModeEXT](../fragops.html#vkCmdSetDiscardRectangleModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08913) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08913

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08914) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08914

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](../formats.html#VkFormat)
used to create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08915) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08915

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](../formats.html#VkFormat)
used to create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`,
the value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08916) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08916

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08917) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08917

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08918) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-08918

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`, the value of
the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06183) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06183

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingFragmentShadingRateAttachmentInfoKHR](../renderpass.html#VkRenderingFragmentShadingRateAttachmentInfoKHR)::`imageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingLocalRead-11797) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingLocalRead-11797

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[`dynamicRenderingLocalRead`](../features.html#features-dynamicRenderingLocalRead)
feature is enabled, the
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](../renderpass.html#VkRenderingFlagBitsKHR) flag is
specified, and an attachment is being used as a feedback loop as
specified by
[](../renderpass.html#rendering-attachment-input-attachment-feedback)[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](../renderpass.html#VkRenderingAttachmentFlagBitsKHR),
[VkRenderingAttachmentFlagsInfoKHR](../renderpass.html#VkRenderingAttachmentFlagsInfoKHR)::`flags` for that attachment
**must** include
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](../renderpass.html#VkRenderingAttachmentFlagBitsKHR)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06184) VUID-vkCmdExecuteGeneratedCommandsNV-imageView-06184

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingFragmentDensityMapAttachmentInfoEXT](../renderpass.html#VkRenderingFragmentDensityMapAttachmentInfoEXT)::`imageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-layers-10831) VUID-vkCmdExecuteGeneratedCommandsNV-layers-10831

If the current render pass instance was created with
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../renderpass.html#VkRenderingFlagBitsKHR) or
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../renderpass.html#VkRenderPassCreateFlagBits), and
the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../pipelines.html#VkPipelineCreateFlagBits2KHR), then
the current render pass instance **must** have a `layers` value less
than or equal to
[VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](../pipelines.html#VkPipelineFragmentDensityMapLayeredCreateInfoVALVE)::`maxFragmentDensityMapLayers`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-06185) VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-06185

If the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
`0`, then each element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
`imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
created with a sample count equal to the corresponding element of the
`pColorAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-06186) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-06186

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-06187) VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-06187

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07285) VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07285

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
    `0`, then each element of the
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
    `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
    created with a sample count equal to the value of
    `rasterizationSamples` for the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07286) VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07286

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
    [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07287) VUID-vkCmdExecuteGeneratedCommandsNV-multisampledRenderToSingleSampled-07287

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
    [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pNext-07935) VUID-vkCmdExecuteGeneratedCommandsNV-pNext-07935

If this command is called inside a render pass instance started with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), and the `pNext` chain of
[VkRenderingInfo](../renderpass.html#VkRenderingInfo) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](../fundamentals.html#VK_TRUE),
then the value of `rasterizationSamples` for the bound graphics
pipeline **must** be equal to
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-renderPass-06198) VUID-vkCmdExecuteGeneratedCommandsNV-renderPass-06198

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline **must** have been created
with a [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo)::`renderPass` equal to
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pColorAttachments-08963) VUID-vkCmdExecuteGeneratedCommandsNV-pColorAttachments-08963

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound with a fragment shader that
statically writes to a color attachment, the color write mask is not
zero, color writes are enabled, and the corresponding element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pColorAttachments-11539) VUID-vkCmdExecuteGeneratedCommandsNV-pColorAttachments-11539

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline bound
with a fragment shader that statically writes to a color attachment, the
color write mask is not zero, color writes are enabled, and the
corresponding element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-08964) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-08964

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, depth test is enabled, and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-11540) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-11540

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline
bound, depth test is enabled, and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-08965) VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-08965

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, stencil test is enabled and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-11860) VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-11860

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline
bound, stencil test is enabled and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-flags-10582) VUID-vkCmdExecuteGeneratedCommandsNV-flags-10582

If the current render pass instance was begun with a
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) call in `commandBuffer`, its
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`flags` parameter **must** not have
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](../renderpass.html#VkRenderingFlagBitsKHR) set
unless [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](../renderpass.html#VkRenderingFlagBitsKHR) is also set

[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithRasterizerDiscard-06708) VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithRasterizerDiscard-06708

If the [    `primitivesGeneratedQueryWithRasterizerDiscard`](../features.html#features-primitivesGeneratedQueryWithRasterizerDiscard) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, [rasterization discard](../primsrast.html#primsrast-discard) **must** not be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithNonZeroStreams-06709) VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithNonZeroStreams-06709

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, the bound graphics pipeline **must** not have been created with a
non-zero value in
`VkPipelineRasterizationStateStreamCreateInfoEXT`::`rasterizationStream`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07620) VUID-vkCmdExecuteGeneratedCommandsNV-None-07620

If the [`depthClamp`](../features.html#features-depthClamp) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthClampEnableEXT](../vertexpostproc.html#vkCmdSetDepthClampEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07621) VUID-vkCmdExecuteGeneratedCommandsNV-None-07621

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetPolygonModeEXT](../primsrast.html#vkCmdSetPolygonModeEXT) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07622) VUID-vkCmdExecuteGeneratedCommandsNV-None-07622

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07623) VUID-vkCmdExecuteGeneratedCommandsNV-None-07623

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-alphaToCoverageEnable-08919) VUID-vkCmdExecuteGeneratedCommandsNV-alphaToCoverageEnable-08919

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and `alphaToCoverageEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last
call to [vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT), then the
[Fragment Output Interface](../interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdExecuteGeneratedCommandsNV-alphaToCoverageEnable-08920) VUID-vkCmdExecuteGeneratedCommandsNV-alphaToCoverageEnable-08920

If a shader object is bound to any graphics stage, and the most recent
call to [vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT) in the current command
buffer set `alphaToCoverageEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
[Fragment Output Interface](../interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07624) VUID-vkCmdExecuteGeneratedCommandsNV-None-07624

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07625) VUID-vkCmdExecuteGeneratedCommandsNV-None-07625

If the [`alphaToOne`](../features.html#features-alphaToOne) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAlphaToOneEnableEXT](../fragops.html#vkCmdSetAlphaToOneEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07626) VUID-vkCmdExecuteGeneratedCommandsNV-None-07626

If the [`logicOp`](../features.html#features-logicOp) feature is enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetLogicOpEnableEXT](../framebuffer.html#vkCmdSetLogicOpEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07627) VUID-vkCmdExecuteGeneratedCommandsNV-None-07627

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and there are color
attachments bound, then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have
been called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime)
in the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07629) VUID-vkCmdExecuteGeneratedCommandsNV-None-07629

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and there are color
attachments bound, then [vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07630) VUID-vkCmdExecuteGeneratedCommandsNV-None-07630

If the [`geometryStreams`](../features.html#features-geometryStreams) feature is
enabled, and
a shader object is bound to the [VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with both a
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits) stage and the
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizationStreamEXT](../primsrast.html#vkCmdSetRasterizationStreamEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07631) VUID-vkCmdExecuteGeneratedCommandsNV-None-07631

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetConservativeRasterizationModeEXT](../primsrast.html#vkCmdSetConservativeRasterizationModeEXT) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07632) VUID-vkCmdExecuteGeneratedCommandsNV-None-07632

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](../pipelines.html#VkDynamicState) dynamic
state enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` is
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](../primsrast.html#VkConservativeRasterizationModeEXT), then
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](../primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-conservativePointAndLineRasterization-07499) VUID-vkCmdExecuteGeneratedCommandsNV-conservativePointAndLineRasterization-07499

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
[    `conservativePointAndLineRasterization`](../limits.html#limits-conservativePointAndLineRasterization) is not supported,
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line or point topology class, then the
[current value](../pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` **must** be
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](../primsrast.html#VkConservativeRasterizationModeEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07633) VUID-vkCmdExecuteGeneratedCommandsNV-None-07633

If the [`depthClipEnable`](../features.html#features-depthClipEnable) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state, then
[vkCmdSetDepthClipEnableEXT](../vertexpostproc.html#vkCmdSetDepthClipEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07636) VUID-vkCmdExecuteGeneratedCommandsNV-None-07636

If the `[VK_EXT_provoking_vertex](../../appendices/extensions.html#VK_EXT_provoking_vertex)` extension is enabled,
a shader object is bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetProvokingVertexModeEXT](../vertexpostproc.html#vkCmdSetProvokingVertexModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08666) VUID-vkCmdExecuteGeneratedCommandsNV-None-08666

If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineRasterizationModeEXT](../primsrast.html#vkCmdSetLineRasterizationModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08669) VUID-vkCmdExecuteGeneratedCommandsNV-None-08669

If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineStippleEnableEXT](../primsrast.html#vkCmdSetLineStippleEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07849) VUID-vkCmdExecuteGeneratedCommandsNV-None-07849

    If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled and
    a shader object is bound to any graphics stage, or
    a bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE](../pipelines.html#VkDynamicState)
    dynamic state enabled, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
    [current value](../pipelines.html#dynamic-state-current-value) of
    `stippledLineEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetLineStipple](../primsrast.html#vkCmdSetLineStipple)
    **must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
    command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10608) VUID-vkCmdExecuteGeneratedCommandsNV-None-10608

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, the [effective    rasterization input topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, and the
current `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](../primsrast.html#VkLineRasterizationModeEXT) or
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](../primsrast.html#VkLineRasterizationModeEXT), then the current
`alphaToCoverageEnable`, `alphaToOneEnable` and
`sampleShadingEnable` states **must** all be [VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07639) VUID-vkCmdExecuteGeneratedCommandsNV-None-07639

If the [`depthClipControl`](../features.html#features-depthClipControl) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetDepthClipNegativeOneToOneEXT](../vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09650) VUID-vkCmdExecuteGeneratedCommandsNV-None-09650

If the [`depthClampControl`](../features.html#features-depthClampControl) feature
is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`depthClampEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDepthClampRangeEXT](../fragops.html#vkCmdSetDepthClampRangeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07640) VUID-vkCmdExecuteGeneratedCommandsNV-None-07640

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetViewportWScalingEnableNV](../vertexpostproc.html#vkCmdSetViewportWScalingEnableNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07641) VUID-vkCmdExecuteGeneratedCommandsNV-None-07641

If the `[VK_NV_viewport_swizzle](../../appendices/extensions.html#VK_NV_viewport_swizzle)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic state enabled, then
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07642) VUID-vkCmdExecuteGeneratedCommandsNV-None-07642

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07643) VUID-vkCmdExecuteGeneratedCommandsNV-None-07643

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageToColorEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07644) VUID-vkCmdExecuteGeneratedCommandsNV-None-07644

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageModulationModeNV](../fragops.html#vkCmdSetCoverageModulationModeNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07645) VUID-vkCmdExecuteGeneratedCommandsNV-None-07645

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageModulationMode` is any value other than
[VK_COVERAGE_MODULATION_MODE_NONE_NV](../fragops.html#VkCoverageModulationModeNV), then
[vkCmdSetCoverageModulationTableEnableNV](../fragops.html#vkCmdSetCoverageModulationTableEnableNV) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07646) VUID-vkCmdExecuteGeneratedCommandsNV-None-07646

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageModulationTableEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetCoverageModulationTableNV](../fragops.html#vkCmdSetCoverageModulationTableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07647) VUID-vkCmdExecuteGeneratedCommandsNV-None-07647

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetShadingRateImageEnableNV](../primsrast.html#vkCmdSetShadingRateImageEnableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pipelineFragmentShadingRate-09238) VUID-vkCmdExecuteGeneratedCommandsNV-pipelineFragmentShadingRate-09238

If the [    `pipelineFragmentShadingRate`](../features.html#features-pipelineFragmentShadingRate) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07648) VUID-vkCmdExecuteGeneratedCommandsNV-None-07648

If the [    `representativeFragmentTest`](../features.html#features-representativeFragmentTest) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic
state enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetRepresentativeFragmentTestEnableNV](../fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07649) VUID-vkCmdExecuteGeneratedCommandsNV-None-07649

If the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageReductionModeNV](../fragops.html#vkCmdSetCoverageReductionModeNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07471) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07471

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
current subpass does not use any color and/or depth/stencil attachments,
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** follow the rules for a
[zero-attachment subpass](../renderpass.html#renderpass-noattachments)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-samples-07472) VUID-vkCmdExecuteGeneratedCommandsNV-samples-07472

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state disabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** be greater or equal to the
[VkPipelineMultisampleStateCreateInfo](../primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`
parameter used to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-samples-07473) VUID-vkCmdExecuteGeneratedCommandsNV-samples-07473

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) state and
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) states enabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** be greater or equal to the
`rasterizationSamples` parameter in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09211) VUID-vkCmdExecuteGeneratedCommandsNV-None-09211

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled,
or a shader object is bound to any graphics stage,
and the current render pass instance includes a
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](../fundamentals.html#VK_TRUE),
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** be the same as the
`rasterizationSamples` member of that structure

[](#VUID-vkCmdExecuteGeneratedCommandsNV-firstAttachment-07476) VUID-vkCmdExecuteGeneratedCommandsNV-firstAttachment-07476

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the last call to
[vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdExecuteGeneratedCommandsNV-firstAttachment-07478) VUID-vkCmdExecuteGeneratedCommandsNV-firstAttachment-07478

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic states enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the last call to
[vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdExecuteGeneratedCommandsNV-advancedBlendMaxColorAttachments-07480) VUID-vkCmdExecuteGeneratedCommandsNV-advancedBlendMaxColorAttachments-07480

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and an active color
attachment [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the number of active color
attachments **must** not exceed [    `advancedBlendMaxColorAttachments`](../limits.html#limits-advancedBlendMaxColorAttachments)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10862) VUID-vkCmdExecuteGeneratedCommandsNV-None-10862

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState)
, but not the [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState)
dynamic state enabled, and the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorBlendEquationEXT](../framebuffer.html#vkCmdSetColorBlendEquationEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-10863) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-10863

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState), but not the
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorBlendAdvancedEXT](../framebuffer.html#vkCmdSetColorBlendAdvancedEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10864) VUID-vkCmdExecuteGeneratedCommandsNV-None-10864

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
either [vkCmdSetColorBlendAdvancedEXT](../framebuffer.html#vkCmdSetColorBlendAdvancedEXT) or
[vkCmdSetColorBlendEquationEXT](../framebuffer.html#vkCmdSetColorBlendEquationEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithNonZeroStreams-07481) VUID-vkCmdExecuteGeneratedCommandsNV-primitivesGeneratedQueryWithNonZeroStreams-07481

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, and the bound graphics pipeline was created with
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](../pipelines.html#VkDynamicState) state enabled, the last
call to [vkCmdSetRasterizationStreamEXT](../primsrast.html#vkCmdSetRasterizationStreamEXT) **must** have set the
`rasterizationStream` to zero

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsPerPixel-07482) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsPerPixel-07482

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state disabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** equal the
`rasterizationSamples` member of the
[VkPipelineMultisampleStateCreateInfo](../primsrast.html#VkPipelineMultisampleStateCreateInfo) structure the bound graphics
pipeline has been created with

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsPerPixel-07483) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsPerPixel-07483

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** equal the
`rasterizationSamples` parameter of the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07484) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07484

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT) then the current active depth
attachment **must** have been created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](../resources.html#VkImageCreateFlagBits) bit set

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07485) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07485

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), then the
`sampleLocationsInfo.maxSampleLocationGridSize.width` in the last
call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** evenly divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07486) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07486

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), then the
`sampleLocationsInfo.maxSampleLocationGridSize.height` in the last
call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** evenly divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07487) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07487

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), the fragment shader code **must**
not statically use the extended instruction `InterpolateAtSample`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07936) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07936

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationGridSize.width` **must** evenly
divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07937) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07937

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationGridSize.height` **must** evenly
divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07938) VUID-vkCmdExecuteGeneratedCommandsNV-sampleLocationsEnable-07938

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationsPerPixel` **must** equal
`rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-coverageModulationTableEnable-07488) VUID-vkCmdExecuteGeneratedCommandsNV-coverageModulationTableEnable-07488

If
a shader object is bound to any graphics stage or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](../pipelines.html#VkDynamicState) state
enabled, and the last call to
[vkCmdSetCoverageModulationTableEnableNV](../fragops.html#vkCmdSetCoverageModulationTableEnableNV) set
`coverageModulationTableEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`coverageModulationTableCount` parameter in the last call to
[vkCmdSetCoverageModulationTableNV](../fragops.html#vkCmdSetCoverageModulationTableNV) **must** equal the current
`rasterizationSamples` divided by the number of color samples in the
current active color attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07489) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07489

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
and if current subpass has a depth/stencil attachment and depth test,
stencil test, or depth bounds test are enabled in the bound pipeline,
then the current `rasterizationSamples` **must** be the same as the
sample count of the depth/stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsNV-coverageToColorEnable-07490) VUID-vkCmdExecuteGeneratedCommandsNV-coverageToColorEnable-07490

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](../pipelines.html#VkDynamicState) state enabled and the
last call to [vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) set the
`coverageToColorEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) `coverageToColorLocation`,
with a [VkFormat](../formats.html#VkFormat) of [VK_FORMAT_R8_UINT](../formats.html#VkFormat),
[VK_FORMAT_R8_SINT](../formats.html#VkFormat), [VK_FORMAT_R16_UINT](../formats.html#VkFormat),
[VK_FORMAT_R16_SINT](../formats.html#VkFormat), [VK_FORMAT_R32_UINT](../formats.html#VkFormat), or
[VK_FORMAT_R32_SINT](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-09420) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizerDiscardEnable-09420

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
and a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, and the most recent call to [vkCmdSetRasterizerDiscardEnable](../primsrast.html#vkCmdSetRasterizerDiscardEnable)
in the current command buffer set `rasterizerDiscardEnable` to
[VK_FALSE](../fundamentals.html#VK_FALSE), and the last call to
[vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) set the
`coverageToColorEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) `coverageToColorLocation`,
with a [VkFormat](../formats.html#VkFormat) of [VK_FORMAT_R8_UINT](../formats.html#VkFormat),
[VK_FORMAT_R8_SINT](../formats.html#VkFormat), [VK_FORMAT_R16_UINT](../formats.html#VkFormat),
[VK_FORMAT_R16_SINT](../formats.html#VkFormat), [VK_FORMAT_R32_UINT](../formats.html#VkFormat), or
[VK_FORMAT_R32_SINT](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-coverageReductionMode-07491) VUID-vkCmdExecuteGeneratedCommandsNV-coverageReductionMode-07491

If the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
then the [current values](../pipelines.html#dynamic-state-current-value) of
`coverageReductionMode`, `rasterizationSamples`, the sample
counts for the color and depth/stencil attachments (if the subpass has
them) **must** be a valid combination returned by
[vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](../fragops.html#vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-07492) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-07492

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-07493) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-07493

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic states enabled then
the `viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-09421) VUID-vkCmdExecuteGeneratedCommandsNV-viewportCount-09421

If the `[VK_NV_viewport_swizzle](../../appendices/extensions.html#VK_NV_viewport_swizzle)` extension is enabled, and a
shader object is bound to any graphics stage, then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07494) VUID-vkCmdExecuteGeneratedCommandsNV-rasterizationSamples-07494

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
and the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is not enabled, or the [current    value](../pipelines.html#dynamic-state-current-value) of `coverageReductionMode` is not
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](../fragops.html#VkCoverageReductionModeNV),
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` is greater than sample count of the color
attachment, then [sample shading](../primsrast.html#primsrast-sampleshading) **must** be
disabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07495) VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07495

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledRectangularLines`](../features.html#features-stippledRectangularLines)
feature **must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07496) VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07496

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledBresenhamLines`](../features.html#features-stippledBresenhamLines)
feature **must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07497) VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07497

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledSmoothLines`](../features.html#features-stippledSmoothLines) feature
**must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07498) VUID-vkCmdExecuteGeneratedCommandsNV-stippledLineEnable-07498

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_DEFAULT](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledRectangularLines`](../features.html#features-stippledRectangularLines)
feature **must** be enabled and
[VkPhysicalDeviceLimits](../limits.html#VkPhysicalDeviceLimits)::`strictLines` **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-stage-07073) VUID-vkCmdExecuteGeneratedCommandsNV-stage-07073

If the bound pipeline was created with the
[VkPipelineShaderStageCreateInfo](../pipelines.html#VkPipelineShaderStageCreateInfo)::`stage` member of an element
of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo)::`pStages` set to
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits), then [Mesh    Shader Queries](../queries.html#queries-mesh-shader) **must** not be active

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08877) VUID-vkCmdExecuteGeneratedCommandsNV-None-08877

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAttachmentFeedbackLoopEnableEXT](../renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07850) VUID-vkCmdExecuteGeneratedCommandsNV-None-07850

If dynamic state was inherited from
[VkCommandBufferInheritanceViewportScissorInfoNV](../cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV), it **must** be set
in the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsNV-nextStage-10745) VUID-vkCmdExecuteGeneratedCommandsNV-nextStage-10745

For each shader object bound to a graphics stage, except for shader
object bound to the last graphics stage in the logical pipeline, it
**must** have been created with a `nextStage` including the
corresponding bit to the shader object bound to the following graphics
stage in the logical pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08684) VUID-vkCmdExecuteGeneratedCommandsNV-None-08684

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08685) VUID-vkCmdExecuteGeneratedCommandsNV-None-08685

If there is no bound graphics pipeline, and the
[`tessellationShader`](../features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08686) VUID-vkCmdExecuteGeneratedCommandsNV-None-08686

If there is no bound graphics pipeline, and the
[`tessellationShader`](../features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08687) VUID-vkCmdExecuteGeneratedCommandsNV-None-08687

If there is no bound graphics pipeline, and the
[`geometryShader`](../features.html#features-geometryShader) feature is enabled,
`vkCmdBindShadersEXT` **must** have been called in the current command
buffer with `pStages` with an element of
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08688) VUID-vkCmdExecuteGeneratedCommandsNV-None-08688

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08689) VUID-vkCmdExecuteGeneratedCommandsNV-None-08689

If there is no bound graphics pipeline, and the [    `taskShader`](../features.html#features-taskShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08690) VUID-vkCmdExecuteGeneratedCommandsNV-None-08690

If there is no bound graphics pipeline, and the [    `meshShader`](../features.html#features-meshShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08693) VUID-vkCmdExecuteGeneratedCommandsNV-None-08693

If there is no bound graphics pipeline, and at least one of the
[`taskShader`](../features.html#features-taskShader) and [    `meshShader`](../features.html#features-meshShader) features is enabled, one of the
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) or [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)
stages **must** have a valid `VkShaderEXT` bound, and the other **must**
have no `VkShaderEXT` bound

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08696) VUID-vkCmdExecuteGeneratedCommandsNV-None-08696

If there is no bound graphics pipeline, and a valid `VkShaderEXT` is
bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) stage, there **must** be no
`VkShaderEXT` bound to either the [VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)
stage or the [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits) stage

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08698) VUID-vkCmdExecuteGeneratedCommandsNV-None-08698

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag, then all shaders created
with the [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag in the same
[vkCreateShadersEXT](../shaders.html#vkCreateShadersEXT) call **must** also be bound

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08699) VUID-vkCmdExecuteGeneratedCommandsNV-None-08699

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag, any stages in between
stages whose shaders which did not create a shader with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag as part of the same
[vkCreateShadersEXT](../shaders.html#vkCreateShadersEXT) call **must** not have any `VkShaderEXT` bound

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08878) VUID-vkCmdExecuteGeneratedCommandsNV-None-08878

All bound graphics shader objects **must** have been created with identical
or [identically defined](../../appendices/glossary.html#glossary-identically-defined) push constant
ranges

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08879) VUID-vkCmdExecuteGeneratedCommandsNV-None-08879

All bound graphics shader objects **must** have either been created with
the [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag set, or with
identical or [identically defined](../../appendices/glossary.html#glossary-identically-defined) arrays
of descriptor set layouts

[](#VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-09372) VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-09372

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`, a color
attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), and a
fragment shader is bound, it **must** not declare the `DepthReplacing`
or `StencilRefReplacingEXT` execution modes

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDynamicStates-08715) VUID-vkCmdExecuteGeneratedCommandsNV-pDynamicStates-08715

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](../pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](../pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpDepthAttachmentReadEXT`, the `depthWriteEnable` parameter
in the last call to [vkCmdSetDepthWriteEnable](../fragops.html#vkCmdSetDepthWriteEnable) **must** be
[VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDynamicStates-08716) VUID-vkCmdExecuteGeneratedCommandsNV-pDynamicStates-08716

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](../pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](../pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpStencilAttachmentReadEXT`, the `writeMask` parameter in
the last call to [vkCmdSetStencilWriteMask](../fragops.html#vkCmdSetStencilWriteMask) **must** be `0`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09116) VUID-vkCmdExecuteGeneratedCommandsNV-None-09116

    If
    a shader object is bound to any graphics stage
or
    the bound graphics pipeline was created with
    [VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState),
    and the format of any color attachment is
    [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](../formats.html#VkFormat), the corresponding element of the
    `pColorWriteMasks` parameter of [vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT)
    **must** either include all of [VK_COLOR_COMPONENT_R_BIT](../framebuffer.html#VkColorComponentFlagBits),
    [VK_COLOR_COMPONENT_G_BIT](../framebuffer.html#VkColorComponentFlagBits), and [VK_COLOR_COMPONENT_B_BIT](../framebuffer.html#VkColorComponentFlagBits), or
    none of them

[](#VUID-vkCmdExecuteGeneratedCommandsNV-maxFragmentDualSrcAttachments-09239) VUID-vkCmdExecuteGeneratedCommandsNV-maxFragmentDualSrcAttachments-09239

If [blending](../framebuffer.html#framebuffer-blending) is enabled for any attachment where
either the source or destination blend factors for that attachment
[use the secondary color input](../framebuffer.html#framebuffer-dsb), the maximum value of
`Location` for any output attachment [statically    used](../shaders.html#shaders-staticuse) in the `Fragment` `Execution` `Model` executed by this command
**must** be less than [    `maxFragmentDualSrcAttachments`](../limits.html#limits-maxFragmentDualSrcAttachments)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09548) VUID-vkCmdExecuteGeneratedCommandsNV-None-09548

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingAttachmentLocationInfo](../interfaces.html#VkRenderingAttachmentLocationInfo)::`pColorAttachmentLocations`
in the bound pipeline **must** match the value for the corresponding
locations set currently in the current render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09549) VUID-vkCmdExecuteGeneratedCommandsNV-None-09549

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pColorAttachmentInputIndices`
in the bound pipeline **must** match the value for the corresponding index
set currently in the current render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10927) VUID-vkCmdExecuteGeneratedCommandsNV-None-10927

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10928) VUID-vkCmdExecuteGeneratedCommandsNV-None-10928

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09642) VUID-vkCmdExecuteGeneratedCommandsNV-None-09642

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with
the [VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR) flag, the bound
graphics pipeline **must** have been created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09643) VUID-vkCmdExecuteGeneratedCommandsNV-None-09643

If the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR), the current
render pass **must** have begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with the
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR) flag

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10677) VUID-vkCmdExecuteGeneratedCommandsNV-None-10677

If the [per-tile execution model](../renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDraw](../features.html#features-tileShadingPerTileDraw) feature **must**
be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10772) VUID-vkCmdExecuteGeneratedCommandsNV-None-10772

If a shader object is bound to any graphics stage, *multiview*
functionality **must** not be enabled in the current render pass

[](#VUID-vkCmdExecuteGeneratedCommandsNV-multiviewPerViewViewports-12262) VUID-vkCmdExecuteGeneratedCommandsNV-multiviewPerViewViewports-12262

If the [    `multiviewPerViewViewports`](../features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../pipelines.html#dynamic-state-current-value) of
`viewportCount`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-multiviewPerViewViewports-12263) VUID-vkCmdExecuteGeneratedCommandsNV-multiviewPerViewViewports-12263

If the [    `multiviewPerViewViewports`](../features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../pipelines.html#dynamic-state-current-value) of
`scissorCount`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-flags-11521) VUID-vkCmdExecuteGeneratedCommandsNV-flags-11521

If current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)
with [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`flags` which includes
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR), and if
[sample shading](../primsrast.html#primsrast-sampleshading) is enabled (explicitly or
implicitly), then the minimum fraction for sample shading **must** equal
0.0

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11522) VUID-vkCmdExecuteGeneratedCommandsNV-None-11522

    If the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** have been created with a
    [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11523) VUID-vkCmdExecuteGeneratedCommandsNV-None-11523

    If the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and does not contain a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** not have been created with a
    [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11524) VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11524

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, the graphics pipeline bound **must**
have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11525) VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11525

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not been recorded in the render
pass instance, the graphics pipeline bound **must** have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11861) VUID-vkCmdExecuteGeneratedCommandsNV-None-11861

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve, the bound
graphics pipeline **must** have been created with a
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`colorAttachmentCount` equal to
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11862) VUID-vkCmdExecuteGeneratedCommandsNV-None-11862

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11863) VUID-vkCmdExecuteGeneratedCommandsNV-None-11863

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11864) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11864

If the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, the
current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats`, if it
exists, **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11865) VUID-vkCmdExecuteGeneratedCommandsNV-None-11865

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11866) VUID-vkCmdExecuteGeneratedCommandsNV-None-11866

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](../formats.html#VkFormat)
used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11867) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11867

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](../formats.html#VkFormat)
used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11868) VUID-vkCmdExecuteGeneratedCommandsNV-None-11868

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
was [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-11869) VUID-vkCmdExecuteGeneratedCommandsNV-None-11869

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11870) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicRenderingUnusedAttachments-11870

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-11871) VUID-vkCmdExecuteGeneratedCommandsNV-colorAttachmentCount-11871

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
`0` and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been recorded in the render
pass instance, then for each element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
`resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the
`resolveImageView` **must** have been created with a sample count equal
to the value of `rasterizationSamples` for the bound graphics
pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-11872) VUID-vkCmdExecuteGeneratedCommandsNV-pDepthAttachment-11872

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-11873) VUID-vkCmdExecuteGeneratedCommandsNV-pStencilAttachment-11873

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for
the bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11529) VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11529

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), a fragment
density map attachment is active, and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT)
has been called, then the fragment shader object bound **must** have been
created with [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11530) VUID-vkCmdExecuteGeneratedCommandsNV-customResolve-11530

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a
custom resolve, a fragment density map attachment is active, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been called, then the
fragment shader object bound **must** have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04007) VUID-vkCmdExecuteGeneratedCommandsNV-None-04007

All vertex input bindings accessed via vertex input variables declared
in the vertex shader entry point’s interface **must** have either valid or
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) buffers bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04008) VUID-vkCmdExecuteGeneratedCommandsNV-None-04008

If the [`nullDescriptor`](../features.html#features-nullDescriptor) feature is not
enabled, all vertex input bindings accessed via vertex input variables
declared in the vertex shader entry point’s interface **must** not be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-02721) VUID-vkCmdExecuteGeneratedCommandsNV-None-02721

If the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature
is not enabled,
and that pipeline was created without enabling
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`vertexInputs`,
then for a given vertex buffer binding, any attribute data fetched **must**
be entirely contained within the corresponding vertex buffer binding, as
described in [Vertex Input Description](../fxvertex.html#fxvertex-input)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-format-10389) VUID-vkCmdExecuteGeneratedCommandsNV-format-10389

For each vertex attribute accessed by this command, if its
[VkVertexInputAttributeDescription](../fxvertex.html#VkVertexInputAttributeDescription)::`format`
or [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format`
is a [packed format](../formats.html#formats-packed),
and the [    `legacyVertexAttributes`](../features.html#features-legacyVertexAttributes) feature is not enabled,
the value of `attribAddress`, calculated as described in
[Vertex Input Calculation](../fxvertex.html#fxvertex-input-address-calculation), **must**
be a multiple of the [size of the `format`](../formats.html#formats)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-format-10390) VUID-vkCmdExecuteGeneratedCommandsNV-format-10390

For each vertex attribute accessed by this command, if its
[VkVertexInputAttributeDescription](../fxvertex.html#VkVertexInputAttributeDescription)::`format`
or [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format`
is not a [packed format](../formats.html#formats-packed),
and either the [    `legacyVertexAttributes`](../features.html#features-legacyVertexAttributes) feature is not enabled or `format`
has 64-bit components,
the value of `attribAddress`, calculated as described in
[Vertex Input Calculation](../fxvertex.html#fxvertex-input-address-calculation), **must**
be a multiple of the [component size of the `format`](../formats.html#formats)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07842) VUID-vkCmdExecuteGeneratedCommandsNV-None-07842

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](../pipelines.html#VkDynamicState) dynamic state enabled
    then [vkCmdSetPrimitiveTopology](../drawing.html#vkCmdSetPrimitiveTopology) **must** have been called and not
    subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
    command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-dynamicPrimitiveTopologyUnrestricted-07500) VUID-vkCmdExecuteGeneratedCommandsNV-dynamicPrimitiveTopologyUnrestricted-07500

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](../pipelines.html#VkDynamicState) dynamic state enabled
and the [    `dynamicPrimitiveTopologyUnrestricted`](../limits.html#limits-dynamicPrimitiveTopologyUnrestricted) is [VK_FALSE](../fundamentals.html#VK_FALSE),
then the `primitiveTopology` parameter of
`vkCmdSetPrimitiveTopology` **must** be of the same
[topology class](../drawing.html#drawing-primitive-topology-class) as the pipeline
[VkPipelineInputAssemblyStateCreateInfo](../drawing.html#VkPipelineInputAssemblyStateCreateInfo)::`topology` state

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10286) VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10286

If a [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) stage is bound, then
the [current value](../pipelines.html#dynamic-state-current-value) of
`primitiveTopology` **must** be [VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](../drawing.html#VkPrimitiveTopology)
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10747) VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10747

If [vkCmdSetPrimitiveTopology](../drawing.html#vkCmdSetPrimitiveTopology) set `primitiveTopology` to
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](../drawing.html#VkPrimitiveTopology) prior to this drawing command,
then a [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) stage **must** be
bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10748) VUID-vkCmdExecuteGeneratedCommandsNV-primitiveTopology-10748

If [vkCmdSetPrimitiveTopology](../drawing.html#vkCmdSetPrimitiveTopology) set `primitiveTopology` to
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](../drawing.html#VkPrimitiveTopology) prior to this drawing command,
the [`maintenance5`](../features.html#features-maintenance5) feature is not
enabled,
both a [VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits) stage are not bound, then the
`Vertex` `Execution` `Model` **must** have a `PointSize` decorated
variable that is statically written to

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pStrides-04913) VUID-vkCmdExecuteGeneratedCommandsNV-pStrides-04913

If the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](../pipelines.html#VkDynamicState) dynamic state
enabled,
but without the [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled,
then [vkCmdBindVertexBuffers2](../fxvertex.html#vkCmdBindVertexBuffers2) with a non-`NULL` `pStrides`
parameter
or [vkCmdBindVertexBuffers3KHR](../fxvertex.html#vkCmdBindVertexBuffers3KHR) with `setStride` set to
[VK_TRUE](../fundamentals.html#VK_TRUE)
**must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this draw command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-13118) VUID-vkCmdExecuteGeneratedCommandsNV-None-13118

If the bound graphics pipeline was created without the
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](../pipelines.html#VkDynamicState) dynamic state
enabled,
without the [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled,
and [vkCmdBindVertexBuffers3KHR](../fxvertex.html#vkCmdBindVertexBuffers3KHR) was called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this draw command, the value of `setStride` in each of its
`pBindInfos` elements must have been [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04914) VUID-vkCmdExecuteGeneratedCommandsNV-None-04914

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    then [vkCmdSetVertexInputEXT](../fxvertex.html#vkCmdSetVertexInputEXT) **must** have been called and not
    subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
    command buffer prior to this draw command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-Input-07939) VUID-vkCmdExecuteGeneratedCommandsNV-Input-07939

    If
    the [    `vertexAttributeRobustness`](../features.html#features-vertexAttributeRobustness) feature is not enabled, and
    the [`maintenance9`](../features.html#features-maintenance9) feature is not
    enabled, and
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    then all variables with the `Input` storage class decorated with
    `Location` in the `Vertex` `Execution` `Model` `OpEntryPoint`
    **must** contain a location in
    [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`location`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-Input-08734) VUID-vkCmdExecuteGeneratedCommandsNV-Input-08734

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    and either the [    `legacyVertexAttributes`](../features.html#features-legacyVertexAttributes) feature is not enabled or the SPIR-V Type
    associated with a given `Input` variable of the corresponding
    `Location` in the `Vertex` `Execution` `Model` `OpEntryPoint` is
    64-bit,
    then the numeric type associated with all `Input` variables of the
    corresponding `Location` in the `Vertex` `Execution` `Model`
    `OpEntryPoint` **must** be the same as
    [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-format-08936) VUID-vkCmdExecuteGeneratedCommandsNV-format-08936

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    and [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format` has a
    64-bit component, then the scalar width associated with all `Input`
    variables of the corresponding `Location` in the `Vertex`
    `Execution` `Model` `OpEntryPoint` **must** be 64-bit

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-format-08937) VUID-vkCmdExecuteGeneratedCommandsNV-format-08937

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    and the scalar width associated with a `Location` decorated
    `Input` variable in the `Vertex` `Execution` `Model`
    `OpEntryPoint` is 64-bit, then the corresponding
    [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format` **must** have a
    64-bit component

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09203) VUID-vkCmdExecuteGeneratedCommandsNV-None-09203

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](../pipelines.html#VkDynamicState) dynamic state enabled
    and [VkVertexInputAttributeDescription2EXT](../fxvertex.html#VkVertexInputAttributeDescription2EXT)::`format` has a
    64-bit component, then all `Input` variables at the corresponding
    `Location` in the `Vertex` `Execution` `Model` `OpEntryPoint`
    **must** not use components that are not present in the format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04875) VUID-vkCmdExecuteGeneratedCommandsNV-None-04875

    If
    there is a shader object bound to the
    [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
    the bound graphics pipeline state was created with both a
    [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) stage and the
    [VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
    and the [current value](../pipelines.html#dynamic-state-current-value) of
    `primitiveTopology` is [VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](../drawing.html#VkPrimitiveTopology), then
    [vkCmdSetPatchControlPointsEXT](../shaders.html#vkCmdSetPatchControlPointsEXT) **must** have been called and not
    subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
    command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-04879) VUID-vkCmdExecuteGeneratedCommandsNV-None-04879

    If
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled
    then [vkCmdSetPrimitiveRestartEnable](../drawing.html#vkCmdSetPrimitiveRestartEnable) **must** have been called and not
    subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
    command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-09637) VUID-vkCmdExecuteGeneratedCommandsNV-None-09637

    If
    the [    `primitiveTopologyListRestart`](../features.html#features-primitiveTopologyListRestart) feature is not enabled,
    the [input assembly](../drawing.html#drawing-vertex-input-assembler-topology) is
    [VK_PRIMITIVE_TOPOLOGY_POINT_LIST](../drawing.html#VkPrimitiveTopology),
    [VK_PRIMITIVE_TOPOLOGY_LINE_LIST](../drawing.html#VkPrimitiveTopology),
    [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](../drawing.html#VkPrimitiveTopology),
    [VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](../drawing.html#VkPrimitiveTopology), or
    [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](../drawing.html#VkPrimitiveTopology),
    there is a shader object bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)
    stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled,
    then [vkCmdSetPrimitiveRestartEnable](../drawing.html#vkCmdSetPrimitiveRestartEnable) **must** be [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-10909) VUID-vkCmdExecuteGeneratedCommandsNV-None-10909

    If
    the [    `primitiveTopologyPatchListRestart`](../features.html#features-primitiveTopologyPatchListRestart) feature is not enabled,
    the [input assembly](../drawing.html#drawing-vertex-input-assembler-topology) is
    [VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](../drawing.html#VkPrimitiveTopology),
    there is a shader object bound to the
    [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
    the bound graphics pipeline state was created with the
    [VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled
    then [vkCmdSetPrimitiveRestartEnable](../drawing.html#vkCmdSetPrimitiveRestartEnable) **must** be [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-stage-06481) VUID-vkCmdExecuteGeneratedCommandsNV-stage-06481

The bound graphics pipeline **must** not have been created with the
[VkPipelineShaderStageCreateInfo](../pipelines.html#VkPipelineShaderStageCreateInfo)::`stage` member of any element
of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo)::`pStages` set to
[VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits) or [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-08885) VUID-vkCmdExecuteGeneratedCommandsNV-None-08885

There **must** be no shader object bound to either of the
[VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits) or [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)
stages

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-07619) VUID-vkCmdExecuteGeneratedCommandsNV-None-07619

If
a shader object is bound to the
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stage or
a graphics pipeline is bound which was created with both a
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stage and the
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetTessellationDomainOriginEXT](../tessellation.html#vkCmdSetTessellationDomainOriginEXT) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12239) VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12239

If a shader is bound to both the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stages, and if both
stages contain an `OpExecutionMode` instruction specifying the type
of subdivision, they **must** be the same

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12240) VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12240

If a shader is bound to both the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stages, and if both
stages contain an `OpExecutionMode` instruction specifying the
orientation of triangles, they **must** be the same

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12241) VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12241

If a shader is bound to both the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stages, and if both
stages contain an `OpExecutionMode` instruction specifying the
segment spacing, they **must** be the same

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12242) VUID-vkCmdExecuteGeneratedCommandsNV-OpExecutionMode-12242

If a shader is bound to both the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) stages, and if both
stages contain an `OpExecutionMode` instruction specifying the output
patch size, they **must** be the same

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-02970) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-02970

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-isPreprocessed-02908) VUID-vkCmdExecuteGeneratedCommandsNV-isPreprocessed-02908

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) then
[vkCmdPreprocessGeneratedCommandsNV](#vkCmdPreprocessGeneratedCommandsNV) **must** have already been
executed on the device, using the same `pGeneratedCommandsInfo`
content as well as the content of the input buffers it references (all
except [VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`preprocessBuffer`).
Furthermore, `pGeneratedCommandsInfo`’s `indirectCommandsLayout`
**must** have been created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV) bit
set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pipeline-02909) VUID-vkCmdExecuteGeneratedCommandsNV-pipeline-02909

[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`pipeline` **must** match the current
bound pipeline at
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`pipelineBindPoint`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-None-02910) VUID-vkCmdExecuteGeneratedCommandsNV-None-02910

Transform feedback **must** not be active

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-deviceGeneratedCommands-02911) VUID-vkCmdExecuteGeneratedCommandsNV-deviceGeneratedCommands-02911

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-parameter) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-pGeneratedCommandsInfo-parameter) VUID-vkCmdExecuteGeneratedCommandsNV-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV) structure

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-recording) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-cmdpool) VUID-vkCmdExecuteGeneratedCommandsNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-renderpass) VUID-vkCmdExecuteGeneratedCommandsNV-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-suspended) VUID-vkCmdExecuteGeneratedCommandsNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdExecuteGeneratedCommandsNV-videocoding) VUID-vkCmdExecuteGeneratedCommandsNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

Indirection |

Conditional Rendering

vkCmdExecuteGeneratedCommandsNV is affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The `VkGeneratedCommandsInfoNV` is defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkGeneratedCommandsInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkPipelineBindPoint                  pipelineBindPoint;
    VkPipeline                           pipeline;
    VkIndirectCommandsLayoutNV           indirectCommandsLayout;
    uint32_t                             streamCount;
    const VkIndirectCommandsStreamNV*    pStreams;
    uint32_t                             sequencesCount;
    VkBuffer                             preprocessBuffer;
    VkDeviceSize                         preprocessOffset;
    VkDeviceSize                         preprocessSize;
    VkBuffer                             sequencesCountBuffer;
    VkDeviceSize                         sequencesCountOffset;
    VkBuffer                             sequencesIndexBuffer;
    VkDeviceSize                         sequencesIndexOffset;
} VkGeneratedCommandsInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) used for the
`pipeline`.

* 
`pipeline` is the [VkPipeline](../pipelines.html#VkPipeline) used in the generation and
execution process.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV)
that provides the command sequence to generate.

* 
`streamCount` defines the number of input streams

* 
`pStreams` is a pointer to an array of `streamCount`
[VkIndirectCommandsStreamNV](#VkIndirectCommandsStreamNV) structures providing the input data for
the tokens used in `indirectCommandsLayout`.

* 
`sequencesCount` is the maximum number of sequences to reserve.
If `sequencesCountBuffer` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), this is also the
actual number of sequences generated.

* 
`preprocessBuffer` is the [VkBuffer](../resources.html#VkBuffer) that is used for
preprocessing the input data for execution.
If this structure is used with [vkCmdExecuteGeneratedCommandsNV](#vkCmdExecuteGeneratedCommandsNV)
with its `isPreprocessed` set to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
preprocessing step is skipped and data in this buffer will not be
modified.
The contents and the layout of this buffer are opaque to applications
and **must** not be modified outside functions related to device-generated
commands or copied to another buffer for reuse.

* 
`preprocessOffset` is the byte offset into `preprocessBuffer`
where the preprocessed data is stored.

* 
`preprocessSize` is the maximum byte size within the
`preprocessBuffer` after the `preprocessOffset` that is
available for preprocessing.

* 
`sequencesCountBuffer` is a `VkBuffer` in which the actual
number of sequences is provided as single `uint32_t` value.

* 
`sequencesCountOffset` is the byte offset into
`sequencesCountBuffer` where the count value is stored.

* 
`sequencesIndexBuffer` is a `VkBuffer` that encodes the used
sequence indices as `uint32_t` array.

* 
`sequencesIndexOffset` is the byte offset into
`sequencesIndexBuffer` where the index values start.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipeline-02912) VUID-VkGeneratedCommandsInfoNV-pipeline-02912

The provided `pipeline` **must** match the pipeline bound at execution
time

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02913) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02913

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#VkIndirectCommandsTokenTypeNV), then the
`pipeline` **must** have been created with multiple shader groups

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02914) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02914

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#VkIndirectCommandsTokenTypeNV), then the
`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits) set in
`VkGraphicsPipelineCreateInfo`::`flags`

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02915) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02915

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV), then the
`pipeline`’s `VkPipelineLayout` **must** match the
[VkIndirectCommandsLayoutTokenNV](#VkIndirectCommandsLayoutTokenNV)::`pushconstantPipelineLayout`

* 
[](#VUID-VkGeneratedCommandsInfoNV-streamCount-02916) VUID-VkGeneratedCommandsInfoNV-streamCount-02916

`streamCount` **must** match the `indirectCommandsLayout`’s
`streamCount`

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09084) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09084

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), then the `pipeline` **must** have
been created with the flag
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09085) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09085

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), then the `pipeline` **must** have
been created with a [VkComputePipelineIndirectBufferInfoNV](../pipelines.html#VkComputePipelineIndirectBufferInfoNV)
structure specifying a valid address where its metadata will be saved

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09086) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09086

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), then
[vkCmdUpdatePipelineIndirectBufferNV](../pipelines.html#vkCmdUpdatePipelineIndirectBufferNV) **must** have been called on that
pipeline to save its metadata to a device address

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09087) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09087

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](../pipelines.html#VkPipelineBindPoint), and if
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#VkIndirectCommandsTokenTypeNV) is used, then
`pipeline` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCount-02917) VUID-VkGeneratedCommandsInfoNV-sequencesCount-02917

`sequencesCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoNV](#VkGeneratedCommandsMemoryRequirementsInfoNV)::`maxSequencesCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02918) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02918

`preprocessBuffer` **must** have the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set in its usage flag

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessOffset-02919) VUID-VkGeneratedCommandsInfoNV-preprocessOffset-02919

`preprocessOffset` **must** be aligned to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV)::`minIndirectCommandsBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02971) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02971

If `preprocessBuffer` is non-sparse then it **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessSize-02920) VUID-VkGeneratedCommandsInfoNV-preprocessSize-02920

`preprocessSize` **must** be at least equal to the memory requirement’s
size returned by [vkGetGeneratedCommandsMemoryRequirementsNV](#vkGetGeneratedCommandsMemoryRequirementsNV) using
the matching inputs (`indirectCommandsLayout`, …​) as within this
structure

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02921) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02921

`sequencesCountBuffer` **can** be set if the actual used count of
sequences is sourced from the provided buffer.
In that case the `sequencesCount` serves as upper bound

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02922) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02922

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), its usage
flag **must** have the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02923) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02923

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`sequencesCountOffset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minSequencesCountBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02972) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02972

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) and is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02924) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02924

If `indirectCommandsLayout`’s
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV) is set,
`sequencesIndexBuffer` **must** be set otherwise it **must** be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02925) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02925

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), its usage
flag **must** have the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) bit set

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02926) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02926

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`sequencesIndexOffset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minSequencesIndexBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02973) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02973

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) and is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07078) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07078

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](#VkIndirectCommandsTokenTypeNV), then the
`pipeline` **must** contain a shader stage using the `MeshNV`
`Execution` `Model`

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07079) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07079

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](#VkIndirectCommandsTokenTypeNV), then the
`pipeline` **must** contain a shader stage using the `MeshEXT`
`Execution` `Model`

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sType-sType) VUID-VkGeneratedCommandsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsInfoNV-pNext-pNext) VUID-VkGeneratedCommandsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-parameter) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](../pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipeline-parameter) VUID-VkGeneratedCommandsInfoNV-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `pipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](#VkIndirectCommandsLayoutNV) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-pStreams-parameter) VUID-VkGeneratedCommandsInfoNV-pStreams-parameter

 `pStreams` **must** be a valid pointer to an array of `streamCount` valid [VkIndirectCommandsStreamNV](#VkIndirectCommandsStreamNV) structures

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-parameter

 `preprocessBuffer` **must** be a valid [VkBuffer](../resources.html#VkBuffer) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-parameter

 If `sequencesCountBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `sequencesCountBuffer` **must** be a valid [VkBuffer](../resources.html#VkBuffer) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-parameter

 If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `sequencesIndexBuffer` **must** be a valid [VkBuffer](../resources.html#VkBuffer) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-streamCount-arraylength) VUID-VkGeneratedCommandsInfoNV-streamCount-arraylength

 `streamCount` **must** be greater than `0`

* 
[](#VUID-VkGeneratedCommandsInfoNV-commonparent) VUID-VkGeneratedCommandsInfoNV-commonparent

 Each of `indirectCommandsLayout`, `pipeline`, `preprocessBuffer`, `sequencesCountBuffer`, and `sequencesIndexBuffer` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Referencing the functions defined in [Indirect Commands Layout](#indirectmdslayout),
`vkCmdExecuteGeneratedCommandsNV` behaves as:

uint32_t sequencesCount = sequencesCountBuffer ?
      min(maxSequencesCount, sequencesCountBuffer.load_uint32(sequencesCountOffset) :
      maxSequencesCount;

cmdProcessAllSequences(commandBuffer, pipeline,
                       indirectCommandsLayout, pIndirectCommandsStreams,
                       sequencesCount,
                       sequencesIndexBuffer, sequencesIndexOffset);

// The stateful commands within indirectCommandsLayout will not
// affect the state of subsequent commands in the target
// command buffer (cmd)

|  | It is important to note that the values of all state related to the
| --- | --- |
`pipelineBindPoint` used are **undefined** after this command. |

Commands **can** be preprocessed prior execution using the following command:

// Provided by VK_NV_device_generated_commands
void vkCmdPreprocessGeneratedCommandsNV(
    VkCommandBuffer                             commandBuffer,
    const VkGeneratedCommandsInfoNV*            pGeneratedCommandsInfo);

* 
`commandBuffer` is the command buffer which does the preprocessing.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV) structure containing parameters
affecting the preprocessing step.

Valid Usage

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-02974) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-02974

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-02927) VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-02927

`pGeneratedCommandsInfo->indirectCommandsLayout` **must** have been
created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV](#VkIndirectCommandsLayoutUsageFlagBitsNV) bit
set

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-deviceGeneratedCommands-02928) VUID-vkCmdPreprocessGeneratedCommandsNV-deviceGeneratedCommands-02928

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-parameter) VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV) structure

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-recording) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-cmdpool) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-renderpass) VUID-vkCmdPreprocessGeneratedCommandsNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-suspended) VUID-vkCmdPreprocessGeneratedCommandsNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-videocoding) VUID-vkCmdPreprocessGeneratedCommandsNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdPreprocessGeneratedCommandsNV is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The bound descriptor sets and push constants that will be used with indirect
command generation for the compute pipelines **must** already be specified at
the time of preprocessing commands with
[vkCmdPreprocessGeneratedCommandsNV](#vkCmdPreprocessGeneratedCommandsNV).
They **must** not change until the execution of indirect commands is submitted
with [vkCmdExecuteGeneratedCommandsNV](#vkCmdExecuteGeneratedCommandsNV).

If push constants for the compute pipeline are also specified in the
[VkGeneratedCommandsInfoNV](#VkGeneratedCommandsInfoNV)::`indirectCommandsLayout` with
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#VkIndirectCommandsTokenTypeNV) token, then those
values override the push constants that were previously pushed for the
compute pipeline.

With `[VK_EXT_device_generated_commands](../../appendices/extensions.html#VK_EXT_device_generated_commands)`, the actual generation of
commands as well as their execution on the device is handled as single
action with:

// Provided by VK_EXT_device_generated_commands
void vkCmdExecuteGeneratedCommandsEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    isPreprocessed,
    const VkGeneratedCommandsInfoEXT*           pGeneratedCommandsInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`isPreprocessed` represents whether the input data has already been
preprocessed on the device.
If it is [VK_FALSE](../fundamentals.html#VK_FALSE) this command will implicitly trigger the
preprocessing step, otherwise not.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT) structure containing parameters
affecting the generation of commands.

If the [VK_INDIRECT_COMMANDS_LAYOUT_USAGE_UNORDERED_SEQUENCES_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT)
flag was used to create the
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectCommandsLayout` then the
execution of sequences through this command **may** use implementation-defined
ordering which is not guaranteed to be coherent using the same input data.
It does not affect the order of token processing within a sequence.
This is the implied ordering with
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#VkIndirectCommandsTokenTypeEXT).

After a call to `vkCmdExecuteGeneratedCommandsEXT`, command buffer state
will become **undefined** according to the tokens executed.
This table specifies the relationship between tokens used and state
invalidation.

| **Common Tokens** | **States Invalidated** |
| --- | --- |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) | Bound shaders and pipelines |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) | Push constant data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) | Push constant data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#VkIndirectCommandsTokenTypeEXT) | Push data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) | Push data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) | Index buffer |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) | Vertex buffer |

Valid Usage

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-magFilter-04553) VUID-vkCmdExecuteGeneratedCommandsEXT-magFilter-04553

If a [VkSampler](../samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](../samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](../samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](../fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-magFilter-09598) VUID-vkCmdExecuteGeneratedCommandsEXT-magFilter-09598

If a [VkSampler](../samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](../samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-mipmapMode-04770) VUID-vkCmdExecuteGeneratedCommandsEXT-mipmapMode-04770

If a [VkSampler](../samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](../samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](../samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](../fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-mipmapMode-09599) VUID-vkCmdExecuteGeneratedCommandsEXT-mipmapMode-09599

If a [VkSampler](../samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](../samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-unnormalizedCoordinates-09635) VUID-vkCmdExecuteGeneratedCommandsEXT-unnormalizedCoordinates-09635

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08609) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08609

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](../resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](../resources.html#VkImageViewType)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08610) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08610

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08611) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08611

If a [VkSampler](../samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](../fundamentals.html#VK_TRUE) is used to sample a [VkImageView](../resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-06479) VUID-vkCmdExecuteGeneratedCommandsEXT-None-06479

If a [VkImageView](../resources.html#VkImageView) is sampled with
[depth comparison](../textures.html#textures-depth-compare-operation), the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-02691) VUID-vkCmdExecuteGeneratedCommandsEXT-None-02691

If a [VkImageView](../resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07888) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](../descriptors.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](../resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-02692) VUID-vkCmdExecuteGeneratedCommandsEXT-None-02692

If a [VkImageView](../resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](../formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-02693) VUID-vkCmdExecuteGeneratedCommandsEXT-None-02693

If
the [VK_EXT_filter_cubic](../../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](../resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](../resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](../resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](../resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](../resources.html#VkImageViewType)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-filterCubic-02694) VUID-vkCmdExecuteGeneratedCommandsEXT-filterCubic-02694

Any [VkImageView](../resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](../resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](../capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-filterCubicMinmax-02695) VUID-vkCmdExecuteGeneratedCommandsEXT-filterCubicMinmax-02695

Any [VkImageView](../resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](../samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](../samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](../resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](../capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-cubicRangeClamp-09212) VUID-vkCmdExecuteGeneratedCommandsEXT-cubicRangeClamp-09212

If the [`cubicRangeClamp`](../features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](../resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](../samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](../samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-reductionMode-09213) VUID-vkCmdExecuteGeneratedCommandsEXT-reductionMode-09213

Any [VkImageView](../resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](../samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](../samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-selectableCubicWeights-09214) VUID-vkCmdExecuteGeneratedCommandsEXT-selectableCubicWeights-09214

If the [`selectableCubicWeights`](../features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](../resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](../samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](../samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](../samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-flags-02696) VUID-vkCmdExecuteGeneratedCommandsEXT-flags-02696

Any [VkImage](../resources.html#VkImage) created with a [VkImageCreateInfo](../resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](../resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](../samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](../samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07027) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07027

For any [VkImageView](../resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07028) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07028

For any [VkImageView](../resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07029) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07029

For any [VkBufferView](../resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](../formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07030) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07030

Any [VkBufferView](../resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](../formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08600) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08600

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](../shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](../descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08601) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08601

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](../descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](../shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10068) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10068

For each array of resources that is used by [a bound    shader](../shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-maintenance4-08602) VUID-vkCmdExecuteGeneratedCommandsEXT-maintenance4-08602

If a [a bound shader](../shaders.html#shaders-binding)
was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](../descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](../pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](../descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](../shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08114) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](../descriptorsets.html#descriptor-validity) by
the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](../pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageLayout-00344) VUID-vkCmdExecuteGeneratedCommandsEXT-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](../resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](../resources.html#VkImageView) as
defined by the [image layout    matching rules](../resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08115) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08115

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](../pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08116) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](../pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08604) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08117) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08117

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](../descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](../pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08119) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08119

If a descriptor is dynamically used with a [VkPipeline](../pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08605) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](../shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08606) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08606

If the [`shaderObject`](../features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08608) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](../pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-uniformBuffers-06935) VUID-vkCmdExecuteGeneratedCommandsEXT-uniformBuffers-06935

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08612) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08612

If the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-storageBuffers-06936) VUID-vkCmdExecuteGeneratedCommandsEXT-storageBuffers-06936

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08613) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08613

If the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-02707) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](../shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewType-07752) VUID-vkCmdExecuteGeneratedCommandsEXT-viewType-07752

If a [VkImageView](../resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-format-07753) VUID-vkCmdExecuteGeneratedCommandsEXT-format-07753

If a [VkImageView](../resources.html#VkImageView) or [VkBufferView](../resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](../formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-08795) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-08795

If a [VkImageView](../resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](../formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-08796) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-08796

If a [VkImageView](../resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](../formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-04469) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageWrite-04469

If a [VkBufferView](../resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04470) VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04470

If a [VkImageView](../resources.html#VkImageView) with a [VkFormat](../formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04471) VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04471

If a [VkImageView](../resources.html#VkImageView) with a [VkFormat](../formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04472) VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04472

If a [VkBufferView](../resources.html#VkBufferView) with a [VkFormat](../formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04473) VUID-vkCmdExecuteGeneratedCommandsEXT-SampledType-04473

If a [VkBufferView](../resources.html#VkBufferView) with a [VkFormat](../formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sparseImageInt64Atomics-04474) VUID-vkCmdExecuteGeneratedCommandsEXT-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](../features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](../resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](../resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sparseImageInt64Atomics-04475) VUID-vkCmdExecuteGeneratedCommandsEXT-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](../features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](../resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](../resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06971) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](../resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06972) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](../resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBoxFilterQCOM-06973) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](../resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](../textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06977) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](../samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](../samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06978) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](../samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](../samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09215) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
[format features](../resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](../formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09216) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](../resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09217) VUID-vkCmdExecuteGeneratedCommandsEXT-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](../textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07288) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07288

Any shader invocation executed by this command **must**
[terminate](../shaders.html#shaders-termination)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09600) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](../descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](../descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](../descriptors.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-10746) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](../memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](../memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10678) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10678

If this command is recorded inside a [tile    shading render pass](../renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](../pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10679) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10679

If this command is recorded where
[per-tile execution model](../renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](../resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDescription-09900) VUID-vkCmdExecuteGeneratedCommandsEXT-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](../resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](../resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dimensionCount-09905) VUID-vkCmdExecuteGeneratedCommandsEXT-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](../resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](../resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeTensorARM-09906) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](../formats.html#VkFormat) of the
[VkTensorViewARM](../resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11297) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](../limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11298) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](../limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11299) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](../limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11397) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](../limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11300) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11301) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11302) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11304) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11305) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11306) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11308) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11308

For each [descriptor heap](../descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](../shaders.html#shaders-binding), either directly or via a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11309) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11309

If a [bound shader](../shaders.html#shaders-binding) was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11372) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11372

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11373) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11373

If any stage of the [VkPipeline](../pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](../pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](../features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11374) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11374

If
the [`robustBufferAccess2`](../features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](../features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](../shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](../fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pBindInfo-11375) VUID-vkCmdExecuteGeneratedCommandsEXT-pBindInfo-11375

If any [bound shader](../shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](../descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](../limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11376) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11376

If a [bound shader](../shaders.html#shaders-binding) was created
as a [VkShaderEXT](../shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](../descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11398) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11398

If a [bound shader](../shaders.html#shaders-binding) was created with a
[descriptor mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](../shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11437) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11438) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11441) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](../limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11439) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](../resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11442) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](../limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11485) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](../resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](../resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](../resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](../resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-index-11450) VUID-vkCmdExecuteGeneratedCommandsEXT-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](../samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](../samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-protectedNoFault-11455) VUID-vkCmdExecuteGeneratedCommandsEXT-protectedNoFault-11455

If [`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](../resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-protectedNoFault-11456) VUID-vkCmdExecuteGeneratedCommandsEXT-protectedNoFault-11456

If [`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](../descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](../descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](../resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-renderPass-02684) VUID-vkCmdExecuteGeneratedCommandsEXT-renderPass-02684

The current render pass **must** be [compatible](../renderpass.html#renderpass-compatibility)
with the `renderPass` member of the
`VkGraphicsPipelineCreateInfo` structure specified when creating the
`VkPipeline` bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-subpass-02685) VUID-vkCmdExecuteGeneratedCommandsEXT-subpass-02685

The subpass index of the current render pass **must** be equal to the
`subpass` member of the `VkGraphicsPipelineCreateInfo` structure
specified when creating the `VkPipeline` bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](../pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07468) VUID-vkCmdExecuteGeneratedCommandsEXT-OpTypeImage-07468

If any shader executed by this pipeline accesses an `OpTypeImage`
variable with a `Dim` operand of `SubpassData`, it **must** be
decorated with an `InputAttachmentIndex` that corresponds to a valid
input attachment in the current subpass

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07469) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07469

Input attachment views accessed in a subpass **must** be created with the
same [VkFormat](../formats.html#VkFormat) as the corresponding subpass definition, and be
created with a [VkImageView](../resources.html#VkImageView) that is compatible with the attachment
referenced by the subpass'
`pInputAttachments`[`InputAttachmentIndex`] in the bound
[VkFramebuffer](../renderpass.html#VkFramebuffer) as specified by
[Fragment Input Attachment    Compatibility](../interfaces.html#compatibility-inputattachment)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthInputAttachmentIndex-09595) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthInputAttachmentIndex-09595

Input attachment views accessed in a dynamic render pass with a
`InputAttachmentIndex` referenced by
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo), or no
`InputAttachmentIndex` if
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
or
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
are `NULL`, **must** be created with a [VkImageView](../resources.html#VkImageView) that is compatible
with the corresponding color, depth, or stencil attachment in
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthInputAttachmentIndex-09596) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthInputAttachmentIndex-09596

Input attachment views accessed in a dynamic render pass via a shader
object **must** have an `InputAttachmentIndex` if both
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
and
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
are non-`NULL`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-InputAttachmentIndex-09597) VUID-vkCmdExecuteGeneratedCommandsEXT-InputAttachmentIndex-09597

If an input attachment view accessed in a dynamic render pass via a
shader object has an `InputAttachmentIndex`, the
`InputAttachmentIndex` **must** match an index in
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-06537) VUID-vkCmdExecuteGeneratedCommandsEXT-None-06537

Memory backing image subresources used as attachments in the current
render pass **must** not be written in any way other than as an attachment
by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10795) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10795

If a color attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10796) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10796

If a depth attachment is written by any prior command in this subpass or
by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10797) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10797

If a stencil attachment is written by any prior command in this subpass
or by the load, store, or resolve operations for this subpass,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
it **must** not be accessed in any way other than as an attachment by this
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-12338) VUID-vkCmdExecuteGeneratedCommandsEXT-None-12338

If a color attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_COLOR_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the color attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-12339) VUID-vkCmdExecuteGeneratedCommandsEXT-None-12339

If a depth attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_DEPTH_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the depth attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-12340) VUID-vkCmdExecuteGeneratedCommandsEXT-None-12340

If a stencil attachment is read in this command in any way other than as
an attachment, or has been read by any prior command in this subpass as
a non-attachment,
and [feedback loop](../renderpass.html#renderpass-feedbackloop) is not enabled for
[VK_IMAGE_ASPECT_STENCIL_BIT](../resources.html#VkImageAspectFlagBits) on that attachment,
the stencil attachment **must** not be written to by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09003) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09003

If an attachment is written by any prior command in this subpass or by
the load, store, or resolve operations for this subpass, it **must** not be
accessed in any way other than as an attachment, storage image, or
sampled image by this command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-06886) VUID-vkCmdExecuteGeneratedCommandsEXT-None-06886

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the depth aspect, [depth    writes](../fragops.html#fragops-depth-write) **must** be disabled

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-06887) VUID-vkCmdExecuteGeneratedCommandsEXT-None-06887

If the current render pass instance uses a depth/stencil attachment with
a read-only layout for the stencil aspect, both front and back
`writeMask` are not zero, and stencil test is enabled,
[all stencil ops](../fragops.html#fragops-stencil) **must** be [VK_STENCIL_OP_KEEP](../fragops.html#VkStencilOp)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07831) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07831

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT](../pipelines.html#VkDynamicState) dynamic state enabled then
[vkCmdSetViewport](../vertexpostproc.html#vkCmdSetViewport) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07832) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07832

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SCISSOR](../pipelines.html#VkDynamicState) dynamic state enabled then
[vkCmdSetScissor](../fragops.html#vkCmdSetScissor) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08617) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08617

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_WIDTH](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then [vkCmdSetLineWidth](../primsrast.html#vkCmdSetLineWidth) **must**
have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07834) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07834

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthBiasEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthBias](../primsrast.html#vkCmdSetDepthBias)
or [vkCmdSetDepthBias2EXT](../primsrast.html#vkCmdSetDepthBias2EXT)
**must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07835) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07835

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and an active color
attachment [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE) with a blend equations where any
[VkBlendFactor](../framebuffer.html#VkBlendFactor) member is [VK_BLEND_FACTOR_CONSTANT_COLOR](../framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](../framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_CONSTANT_ALPHA](../framebuffer.html#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](../framebuffer.html#VkBlendFactor), then
[vkCmdSetBlendConstants](../framebuffer.html#vkCmdSetBlendConstants) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07836) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07836

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`depthBoundsTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDepthBounds](../fragops.html#vkCmdSetDepthBounds) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07837) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07837

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilCompareMask](../fragops.html#vkCmdSetStencilCompareMask) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07838) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07838

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilWriteMask](../fragops.html#vkCmdSetStencilWriteMask) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07839) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07839

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of and
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetStencilReference](../fragops.html#vkCmdSetStencilReference) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-maxMultiviewInstanceIndex-02688) VUID-vkCmdExecuteGeneratedCommandsEXT-maxMultiviewInstanceIndex-02688

If the draw is recorded in a render pass instance with multiview
enabled, the maximum instance index **must** be less than or equal to
[VkPhysicalDeviceMultiviewProperties](../limits.html#VkPhysicalDeviceMultiviewProperties)::`maxMultiviewInstanceIndex`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-02689) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-02689

If the bound graphics pipeline was created with
[VkPipelineSampleLocationsStateCreateInfoEXT](../primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
set to [VK_TRUE](../fundamentals.html#VK_TRUE), then the active depth attachment **must** have been
created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](../resources.html#VkImageCreateFlagBits) bit set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07634) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07634

If the `[VK_EXT_sample_locations](../../appendices/extensions.html#VK_EXT_sample_locations)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-06666) VUID-vkCmdExecuteGeneratedCommandsEXT-None-06666

If the `[VK_EXT_sample_locations](../../appendices/extensions.html#VK_EXT_sample_locations)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07840) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07840

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CULL_MODE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCullMode](../primsrast.html#vkCmdSetCullMode) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07841) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07841

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRONT_FACE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetFrontFace](../primsrast.html#vkCmdSetFrontFace) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07843) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07843

 If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE),
[vkCmdSetDepthTestEnable](../fragops.html#vkCmdSetDepthTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07844) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07844

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthWriteEnable](../fragops.html#vkCmdSetDepthWriteEnable) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07845) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07845

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `depthTestEnable`
is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetDepthCompareOp](../fragops.html#vkCmdSetDepthCompareOp) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07846) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07846

If the [`depthBounds`](../features.html#features-depthBounds) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthBoundsTestEnable](../fragops.html#vkCmdSetDepthBoundsTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07847) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07847

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetStencilTestEnable](../fragops.html#vkCmdSetStencilTestEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07848) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07848

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_STENCIL_OP](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), the
[current value](../pipelines.html#dynamic-state-current-value) of
`stencilTestEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetStencilOp](../fragops.html#vkCmdSetStencilOp)
**must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-03417) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-03417

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-scissorCount-03418) VUID-vkCmdExecuteGeneratedCommandsEXT-scissorCount-03418

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the state is not inherited,
then [vkCmdSetScissorWithCount](../vertexpostproc.html#vkCmdSetScissorWithCount) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-03419) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-03419

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with both the
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic states enabled,
and the state is not inherited,
then the `viewportCount` parameter of
`vkCmdSetViewportWithCount` **must** match the `scissorCount`
parameter of `vkCmdSetScissorWithCount`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04137) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04137

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportWScalingStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04138) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04138

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetViewportWScalingNV](../vertexpostproc.html#vkCmdSetViewportWScalingNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08636) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08636

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`viewportWScalingEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWScalingNV](../vertexpostproc.html#vkCmdSetViewportWScalingNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04139) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-04139

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic
state enabled, then the bound graphics pipeline **must** have been created
with
[VkPipelineViewportShadingRateImageStateCreateInfoNV](../primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-shadingRateImage-09233) VUID-vkCmdExecuteGeneratedCommandsEXT-shadingRateImage-09233

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](../pipelines.html#VkDynamicState) and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoarseSampleOrderNV](../primsrast.html#vkCmdSetCoarseSampleOrderNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-shadingRateImage-09234) VUID-vkCmdExecuteGeneratedCommandsEXT-shadingRateImage-09234

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetViewportShadingRatePaletteNV](../primsrast.html#vkCmdSetViewportShadingRatePaletteNV) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08637) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08637

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`shadingRateImageEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportShadingRatePaletteNV](../primsrast.html#vkCmdSetViewportShadingRatePaletteNV) **must** be greater than or
equal to the `viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-VkPipelineVieportCreateInfo-04141) VUID-vkCmdExecuteGeneratedCommandsEXT-VkPipelineVieportCreateInfo-04141

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled and a
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV) structure chained from
[VkPipelineViewportStateCreateInfo](../vertexpostproc.html#VkPipelineViewportStateCreateInfo), then the bound graphics
pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-VkPipelineVieportCreateInfo-04142) VUID-vkCmdExecuteGeneratedCommandsEXT-VkPipelineVieportCreateInfo-04142

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled and a
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](../fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) structure
chained from [VkPipelineViewportStateCreateInfo](../vertexpostproc.html#VkPipelineViewportStateCreateInfo), then the bound
graphics pipeline **must** have been created with
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](../fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV)::`exclusiveScissorCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07878) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07878

If the [`exclusiveScissor`](../features.html#features-exclusiveScissor) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetExclusiveScissorEnableNV](../fragops.html#vkCmdSetExclusiveScissorEnableNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07879) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07879

If the [`exclusiveScissor`](../features.html#features-exclusiveScissor) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](../pipelines.html#VkDynamicState) dynamic state enabled, and
the most recent call to [vkCmdSetExclusiveScissorEnableNV](../fragops.html#vkCmdSetExclusiveScissorEnableNV) in the
current command buffer set any element of `pExclusiveScissorEnables`
to [VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetExclusiveScissorNV](../fragops.html#vkCmdSetExclusiveScissorNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-04876) VUID-vkCmdExecuteGeneratedCommandsEXT-None-04876

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizerDiscardEnable](../primsrast.html#vkCmdSetRasterizerDiscardEnable) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-04877) VUID-vkCmdExecuteGeneratedCommandsEXT-None-04877

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthBiasEnable](../primsrast.html#vkCmdSetDepthBiasEnable) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-logicOp-04878) VUID-vkCmdExecuteGeneratedCommandsEXT-logicOp-04878

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of `logicOpEnable` is
[VK_TRUE](../fundamentals.html#VK_TRUE), then [vkCmdSetLogicOpEXT](../framebuffer.html#vkCmdSetLogicOpEXT) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-primitiveFragmentShadingRateWithMultipleViewports-04552) VUID-vkCmdExecuteGeneratedCommandsEXT-primitiveFragmentShadingRateWithMultipleViewports-04552

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, and
any of the shader stages of the bound graphics pipeline write to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-primitiveFragmentShadingRateWithMultipleViewports-08642) VUID-vkCmdExecuteGeneratedCommandsEXT-primitiveFragmentShadingRateWithMultipleViewports-08642

If the [    `primitiveFragmentShadingRateWithMultipleViewports`](../limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and any shader object bound to a graphics stage writes to the
`PrimitiveShadingRateKHR` built-in, then
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount) **must** have been called in the current
command buffer prior to this drawing command, and the
`viewportCount` parameter of `vkCmdSetViewportWithCount` **must**
be `1`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-blendEnable-04727) VUID-vkCmdExecuteGeneratedCommandsEXT-blendEnable-04727

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then for each color
attachment, if the corresponding image view’s
[format features](../resources.html#resources-image-view-format-features) do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](../formats.html#VkFormatFeatureFlagBits), then the
corresponding [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` **must** be [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08644) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08644

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE),
and none of the following is enabled:

the `[VK_AMD_mixed_attachment_samples](../../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

* 
the [     `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature

then the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` **must** be the same as the current color and/or
depth/stencil attachments

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08876) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08876

If a shader object is bound to any graphics stage, the current render
pass instance **must** have been begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06172) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06172

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command
**must** not write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06173) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06173

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command
**must** not write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06174) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06174

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](../resources.html#VkImageLayout), this
command **must** not write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06175) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06175

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this
command **must** not write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06176) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06176

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pDepthAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the `layout`
member of `pDepthAttachment` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command **must** not
write any values to the depth attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06177) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06177

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the `imageView` member of
`pStencilAttachment` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the
`layout` member of `pStencilAttachment` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](../resources.html#VkImageLayout), this command **must** not
write any values to the stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewMask-06178) VUID-vkCmdExecuteGeneratedCommandsEXT-viewMask-06178

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound graphics pipeline **must** have been
created with a [VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`viewMask` equal
to [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`viewMask`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-06179) VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-06179

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound graphics pipeline **must** have been
created with a
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`colorAttachmentCount` equal to
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08910) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08910

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08912) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08912

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `imageView` equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have the
corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08911) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08911

If the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, and the
current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`,
then each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments`
array with an `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats`, if
it exists, **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-09362) VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-09362

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`,
there is no shader object bound to any graphics stage,
and a color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), each
element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with
a `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
been created with an image created with a
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value equal to the
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09363) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09363

If
there is no shader object bound to any graphics stage,
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`, and a
color attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), each
element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with
a `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
created with an image created with a
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value equal to the
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value used to create
the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09364) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09364

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have set the blend enable
to [VK_FALSE](../fundamentals.html#VK_FALSE) prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09365) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09365

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](../limits.html#VkSampleCountFlagBits) prior to this
drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09366) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09366

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have set blend enable
to [VK_FALSE](../fundamentals.html#VK_FALSE) prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-09367) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-09367

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have set
`rasterizationSamples` to [VK_SAMPLE_COUNT_1_BIT](../limits.html#VkSampleCountFlagBits) prior to this
drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09368) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09368

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09369) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09369

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
and the bound graphics pipeline was created with a non-zero
[VkExternalFormatANDROID](../resources.html#VkExternalFormatANDROID)::`externalFormat` value and with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pFragmentSize-09370) VUID-vkCmdExecuteGeneratedCommandsEXT-pFragmentSize-09370

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->width` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pFragmentSize-09371) VUID-vkCmdExecuteGeneratedCommandsEXT-pFragmentSize-09371

If there is a shader object bound to any graphics stage, and the current
render pass includes a color attachment that uses the
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR) resolve
mode, then [vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have set
`pFragmentSize->height` to `1` prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07749) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07749

If the [`colorWriteEnable`](../features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorWriteEnableEXT](../framebuffer.html#vkCmdSetColorWriteEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-attachmentCount-07750) VUID-vkCmdExecuteGeneratedCommandsEXT-attachmentCount-07750

If the [`colorWriteEnable`](../features.html#features-colorWriteEnable) feature is
enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the
`attachmentCount` parameter of most recent call to
`vkCmdSetColorWriteEnableEXT` in the current command buffer **must** be
greater than or equal to the number of active color attachments

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07751) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07751

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled, a
graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo) included a
[VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleEXT](../fragops.html#vkCmdSetDiscardRectangleEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT)::`discardRectangleCount`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-09236) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-09236

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled and
the `pNext` chain of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo) did not
include a [VkPipelineDiscardRectangleStateCreateInfoEXT](../fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleEXT](../fragops.html#vkCmdSetDiscardRectangleEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for each discard rectangle
in
[VkPhysicalDeviceDiscardRectanglePropertiesEXT](../limits.html#VkPhysicalDeviceDiscardRectanglePropertiesEXT)::`maxDiscardRectangles`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07880) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07880

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDiscardRectangleEnableEXT](../fragops.html#vkCmdSetDiscardRectangleEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07881) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07881

If the `[VK_EXT_discard_rectangles](../../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`discardRectangleEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDiscardRectangleModeEXT](../fragops.html#vkCmdSetDiscardRectangleModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08913) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08913

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08914) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08914

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](../formats.html#VkFormat)
used to create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08915) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08915

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](../formats.html#VkFormat)
used to create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`,
the value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08916) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08916

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08917) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08917

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08918) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-08918

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`, the value of
the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06183) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06183

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingFragmentShadingRateAttachmentInfoKHR](../renderpass.html#VkRenderingFragmentShadingRateAttachmentInfoKHR)::`imageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingLocalRead-11797) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingLocalRead-11797

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the
[`dynamicRenderingLocalRead`](../features.html#features-dynamicRenderingLocalRead)
feature is enabled, the
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](../renderpass.html#VkRenderingFlagBitsKHR) flag is
specified, and an attachment is being used as a feedback loop as
specified by
[](../renderpass.html#rendering-attachment-input-attachment-feedback)[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](../renderpass.html#VkRenderingAttachmentFlagBitsKHR),
[VkRenderingAttachmentFlagsInfoKHR](../renderpass.html#VkRenderingAttachmentFlagsInfoKHR)::`flags` for that attachment
**must** include
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](../renderpass.html#VkRenderingAttachmentFlagBitsKHR)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06184) VUID-vkCmdExecuteGeneratedCommandsEXT-imageView-06184

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and
[VkRenderingFragmentDensityMapAttachmentInfoEXT](../renderpass.html#VkRenderingFragmentDensityMapAttachmentInfoEXT)::`imageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the bound graphics pipeline **must** have
been created with
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-layers-10831) VUID-vkCmdExecuteGeneratedCommandsEXT-layers-10831

If the current render pass instance was created with
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../renderpass.html#VkRenderingFlagBitsKHR) or
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../renderpass.html#VkRenderPassCreateFlagBits), and
the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](../pipelines.html#VkPipelineCreateFlagBits2KHR), then
the current render pass instance **must** have a `layers` value less
than or equal to
[VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](../pipelines.html#VkPipelineFragmentDensityMapLayeredCreateInfoVALVE)::`maxFragmentDensityMapLayers`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-06185) VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-06185

If the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
`0`, then each element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
`imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
created with a sample count equal to the corresponding element of the
`pColorAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-06186) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-06186

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-06187) VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-06187

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline was created with a
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) structure, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV) used to create the bound graphics
pipeline **must** be equal to the sample count used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07285) VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07285

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
    `0`, then each element of the
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
    `imageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been
    created with a sample count equal to the value of
    `rasterizationSamples` for the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07286) VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07286

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
    [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07287) VUID-vkCmdExecuteGeneratedCommandsEXT-multisampledRenderToSingleSampled-07287

    If
    the bound pipeline was created without a
    [VkAttachmentSampleCountInfoAMD](../cmdbuffers.html#VkAttachmentSampleCountInfoAMD)
or
    [VkAttachmentSampleCountInfoNV](../cmdbuffers.html#VkAttachmentSampleCountInfoNV)
    structure, and
    the [    `multisampledRenderToSingleSampled`](../features.html#features-multisampledRenderToSingleSampled) feature is not enabled, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
    [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
    bound graphics pipeline **must** be equal to the sample count used to
    create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pNext-07935) VUID-vkCmdExecuteGeneratedCommandsEXT-pNext-07935

If this command is called inside a render pass instance started with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), and the `pNext` chain of
[VkRenderingInfo](../renderpass.html#VkRenderingInfo) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](../fundamentals.html#VK_TRUE),
then the value of `rasterizationSamples` for the bound graphics
pipeline **must** be equal to
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-renderPass-06198) VUID-vkCmdExecuteGeneratedCommandsEXT-renderPass-06198

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), the bound pipeline **must** have been created
with a [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo)::`renderPass` equal to
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pColorAttachments-08963) VUID-vkCmdExecuteGeneratedCommandsEXT-pColorAttachments-08963

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound with a fragment shader that
statically writes to a color attachment, the color write mask is not
zero, color writes are enabled, and the corresponding element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding element of
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pColorAttachments-11539) VUID-vkCmdExecuteGeneratedCommandsEXT-pColorAttachments-11539

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline bound
with a fragment shader that statically writes to a color attachment, the
color write mask is not zero, color writes are enabled, and the
corresponding element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-08964) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-08964

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, depth test is enabled, and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-11540) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-11540

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline
bound, depth test is enabled, and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-08965) VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-08965

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render
pass instance,
there is a graphics pipeline bound, stencil test is enabled and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkPipelineRenderingCreateInfo](../pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-11860) VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-11860

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, there is a graphics pipeline
bound, stencil test is enabled and the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), then the
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the pipeline **must** not be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-flags-10582) VUID-vkCmdExecuteGeneratedCommandsEXT-flags-10582

If the current render pass instance was begun with a
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) call in `commandBuffer`, its
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`flags` parameter **must** not have
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](../renderpass.html#VkRenderingFlagBitsKHR) set
unless [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](../renderpass.html#VkRenderingFlagBitsKHR) is also set

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithRasterizerDiscard-06708) VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithRasterizerDiscard-06708

If the [    `primitivesGeneratedQueryWithRasterizerDiscard`](../features.html#features-primitivesGeneratedQueryWithRasterizerDiscard) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, [rasterization discard](../primsrast.html#primsrast-discard) **must** not be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithNonZeroStreams-06709) VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithNonZeroStreams-06709

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, the bound graphics pipeline **must** not have been created with a
non-zero value in
`VkPipelineRasterizationStateStreamCreateInfoEXT`::`rasterizationStream`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07620) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07620

If the [`depthClamp`](../features.html#features-depthClamp) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetDepthClampEnableEXT](../vertexpostproc.html#vkCmdSetDepthClampEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07621) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07621

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetPolygonModeEXT](../primsrast.html#vkCmdSetPolygonModeEXT) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07622) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07622

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07623) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07623

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** have been called and not subsequently
[invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer
prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-alphaToCoverageEnable-08919) VUID-vkCmdExecuteGeneratedCommandsEXT-alphaToCoverageEnable-08919

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and `alphaToCoverageEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last
call to [vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT), then the
[Fragment Output Interface](../interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-alphaToCoverageEnable-08920) VUID-vkCmdExecuteGeneratedCommandsEXT-alphaToCoverageEnable-08920

If a shader object is bound to any graphics stage, and the most recent
call to [vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT) in the current command
buffer set `alphaToCoverageEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
[Fragment Output Interface](../interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07624) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07624

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAlphaToCoverageEnableEXT](../fragops.html#vkCmdSetAlphaToCoverageEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07625) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07625

If the [`alphaToOne`](../features.html#features-alphaToOne) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAlphaToOneEnableEXT](../fragops.html#vkCmdSetAlphaToOneEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07626) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07626

If the [`logicOp`](../features.html#features-logicOp) feature is enabled,
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetLogicOpEnableEXT](../framebuffer.html#vkCmdSetLogicOpEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07627) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07627

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and there are color
attachments bound, then [vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) **must** have
been called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime)
in the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07629) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07629

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, the
[current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and there are color
attachments bound, then [vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07630) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07630

If the [`geometryStreams`](../features.html#features-geometryStreams) feature is
enabled, and
a shader object is bound to the [VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with both a
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits) stage and the
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdSetRasterizationStreamEXT](../primsrast.html#vkCmdSetRasterizationStreamEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07631) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07631

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetConservativeRasterizationModeEXT](../primsrast.html#vkCmdSetConservativeRasterizationModeEXT) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07632) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07632

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](../pipelines.html#VkDynamicState) dynamic
state enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` is
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](../primsrast.html#VkConservativeRasterizationModeEXT), then
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](../primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-conservativePointAndLineRasterization-07499) VUID-vkCmdExecuteGeneratedCommandsEXT-conservativePointAndLineRasterization-07499

If the `[VK_EXT_conservative_rasterization](../../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled,
[    `conservativePointAndLineRasterization`](../limits.html#limits-conservativePointAndLineRasterization) is not supported,
a shader object is bound to any graphics stage or
a graphics pipeline is bound, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line or point topology class, then the
[current value](../pipelines.html#dynamic-state-current-value) of
`conservativeRasterizationMode` **must** be
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](../primsrast.html#VkConservativeRasterizationModeEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07633) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07633

If the [`depthClipEnable`](../features.html#features-depthClipEnable) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state, then
[vkCmdSetDepthClipEnableEXT](../vertexpostproc.html#vkCmdSetDepthClipEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07636) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07636

If the `[VK_EXT_provoking_vertex](../../appendices/extensions.html#VK_EXT_provoking_vertex)` extension is enabled,
a shader object is bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetProvokingVertexModeEXT](../vertexpostproc.html#vkCmdSetProvokingVertexModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08666) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08666

If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineRasterizationModeEXT](../primsrast.html#vkCmdSetLineRasterizationModeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08669) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08669

If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[effective rasterization input    topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, then
[vkCmdSetLineStippleEnableEXT](../primsrast.html#vkCmdSetLineStippleEnableEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07849) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07849

    If any of the [    `stippledRectangularLines`](../features.html#features-stippledRectangularLines), [    `stippledBresenhamLines`](../features.html#features-stippledBresenhamLines) or [    `stippledSmoothLines`](../features.html#features-stippledSmoothLines) features are enabled and
    a shader object is bound to any graphics stage, or
    a bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE](../pipelines.html#VkDynamicState)
    dynamic state enabled, the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
    [current value](../pipelines.html#dynamic-state-current-value) of
    `stippledLineEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetLineStipple](../primsrast.html#vkCmdSetLineStipple)
    **must** have been called and not subsequently [    invalidated](../pipelines.html#dynamic-state-lifetime) in the current command buffer prior to this drawing
    command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10608) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10608

If
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, the [effective    rasterization input topology](../drawing.html#drawing-rasterization-input-topology) is in line topology class, and the
current `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](../primsrast.html#VkLineRasterizationModeEXT) or
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](../primsrast.html#VkLineRasterizationModeEXT), then the current
`alphaToCoverageEnable`, `alphaToOneEnable` and
`sampleShadingEnable` states **must** all be [VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07639) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07639

If the [`depthClipControl`](../features.html#features-depthClipControl) feature is
enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetDepthClipNegativeOneToOneEXT](../vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09650) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09650

If the [`depthClampControl`](../features.html#features-depthClampControl) feature
is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](../pipelines.html#VkDynamicState) dynamic state enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`depthClampEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetDepthClampRangeEXT](../fragops.html#vkCmdSetDepthClampRangeEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07640) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07640

If the `[VK_NV_clip_space_w_scaling](../../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then [vkCmdSetViewportWScalingEnableNV](../vertexpostproc.html#vkCmdSetViewportWScalingEnableNV) **must** have been
called and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in
the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07641) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07641

If the `[VK_NV_viewport_swizzle](../../appendices/extensions.html#VK_NV_viewport_swizzle)` extension is enabled, and
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic state enabled, then
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07642) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07642

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07643) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07643

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageToColorEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07644) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07644

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageModulationModeNV](../fragops.html#vkCmdSetCoverageModulationModeNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07645) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07645

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageModulationMode` is any value other than
[VK_COVERAGE_MODULATION_MODE_NONE_NV](../fragops.html#VkCoverageModulationModeNV), then
[vkCmdSetCoverageModulationTableEnableNV](../fragops.html#vkCmdSetCoverageModulationTableEnableNV) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07646) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07646

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and the
[current value](../pipelines.html#dynamic-state-current-value) of
`coverageModulationTableEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
[vkCmdSetCoverageModulationTableNV](../fragops.html#vkCmdSetCoverageModulationTableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07647) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07647

If the [`shadingRateImage`](../features.html#features-shadingRateImage) feature is
enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetShadingRateImageEnableNV](../primsrast.html#vkCmdSetShadingRateImageEnableNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pipelineFragmentShadingRate-09238) VUID-vkCmdExecuteGeneratedCommandsEXT-pipelineFragmentShadingRate-09238

If the [    `pipelineFragmentShadingRate`](../features.html#features-pipelineFragmentShadingRate) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetFragmentShadingRateKHR](../primsrast.html#vkCmdSetFragmentShadingRateKHR) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07648) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07648

If the [    `representativeFragmentTest`](../features.html#features-representativeFragmentTest) feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](../pipelines.html#VkDynamicState) dynamic
state enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetRepresentativeFragmentTestEnableNV](../fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV) **must** have been called
and not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the
current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07649) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07649

If the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetCoverageReductionModeNV](../fragops.html#vkCmdSetCoverageReductionModeNV) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07471) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07471

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
current subpass does not use any color and/or depth/stencil attachments,
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** follow the rules for a
[zero-attachment subpass](../renderpass.html#renderpass-noattachments)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-samples-07472) VUID-vkCmdExecuteGeneratedCommandsEXT-samples-07472

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state disabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** be greater or equal to the
[VkPipelineMultisampleStateCreateInfo](../primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`
parameter used to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-samples-07473) VUID-vkCmdExecuteGeneratedCommandsEXT-samples-07473

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](../pipelines.html#VkDynamicState) state and
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) states enabled, then
the `samples` parameter in the last call to
[vkCmdSetSampleMaskEXT](../fragops.html#vkCmdSetSampleMaskEXT) **must** be greater or equal to the
`rasterizationSamples` parameter in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09211) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09211

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled,
or a shader object is bound to any graphics stage,
and the current render pass instance includes a
[VkMultisampledRenderToSingleSampledInfoEXT](../renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](../fundamentals.html#VK_TRUE),
then the `rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT) **must** be the same as the
`rasterizationSamples` member of that structure

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-firstAttachment-07476) VUID-vkCmdExecuteGeneratedCommandsEXT-firstAttachment-07476

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the last call to
[vkCmdSetColorBlendEnableEXT](../framebuffer.html#vkCmdSetColorBlendEnableEXT) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-firstAttachment-07478) VUID-vkCmdExecuteGeneratedCommandsEXT-firstAttachment-07478

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState) dynamic states enabled, and
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then the last call to
[vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT) in the current command buffer prior to
this drawing command **must** have set a value for all active color
attachments

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-advancedBlendMaxColorAttachments-07480) VUID-vkCmdExecuteGeneratedCommandsEXT-advancedBlendMaxColorAttachments-07480

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with the
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), and an active color
attachment [current value](../pipelines.html#dynamic-state-current-value) of
`blendEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the number of active color
attachments **must** not exceed [    `advancedBlendMaxColorAttachments`](../limits.html#limits-advancedBlendMaxColorAttachments)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10862) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10862

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState)
, but not the [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState)
dynamic state enabled, and the [current    value](../pipelines.html#dynamic-state-current-value) of `rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorBlendEquationEXT](../framebuffer.html#vkCmdSetColorBlendEquationEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-10863) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-10863

If a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState), but not the
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetColorBlendAdvancedEXT](../framebuffer.html#vkCmdSetColorBlendAdvancedEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10864) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10864

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound was created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](../pipelines.html#VkDynamicState) dynamic state enabled,
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
either [vkCmdSetColorBlendAdvancedEXT](../framebuffer.html#vkCmdSetColorBlendAdvancedEXT) or
[vkCmdSetColorBlendEquationEXT](../framebuffer.html#vkCmdSetColorBlendEquationEXT) **must** have been called and not
subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command for all active color
attachments with the `blendEnable` [    current value](../pipelines.html#dynamic-state-current-value) of [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithNonZeroStreams-07481) VUID-vkCmdExecuteGeneratedCommandsEXT-primitivesGeneratedQueryWithNonZeroStreams-07481

If the [    `primitivesGeneratedQueryWithNonZeroStreams`](../features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled and the [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](../queries.html#VkQueryType) query is
active, and the bound graphics pipeline was created with
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](../pipelines.html#VkDynamicState) state enabled, the last
call to [vkCmdSetRasterizationStreamEXT](../primsrast.html#vkCmdSetRasterizationStreamEXT) **must** have set the
`rasterizationStream` to zero

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsPerPixel-07482) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsPerPixel-07482

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state disabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** equal the
`rasterizationSamples` member of the
[VkPipelineMultisampleStateCreateInfo](../primsrast.html#VkPipelineMultisampleStateCreateInfo) structure the bound graphics
pipeline has been created with

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsPerPixel-07483) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsPerPixel-07483

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`sampleLocationsPerPixel` member of `pSampleLocationsInfo` in
the last call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** equal the
`rasterizationSamples` parameter of the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07484) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07484

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT) then the current active depth
attachment **must** have been created with the
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](../resources.html#VkImageCreateFlagBits) bit set

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07485) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07485

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), then the
`sampleLocationsInfo.maxSampleLocationGridSize.width` in the last
call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** evenly divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07486) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07486

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state enabled and the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), then the
`sampleLocationsInfo.maxSampleLocationGridSize.height` in the last
call to [vkCmdSetSampleLocationsEXT](../primsrast.html#vkCmdSetSampleLocationsEXT) **must** evenly divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07487) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07487

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](../pipelines.html#VkDynamicState) state enabled, and if
`sampleLocationsEnable` was [VK_TRUE](../fundamentals.html#VK_TRUE) in the last call to
[vkCmdSetSampleLocationsEnableEXT](../primsrast.html#vkCmdSetSampleLocationsEnableEXT), the fragment shader code **must**
not statically use the extended instruction `InterpolateAtSample`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07936) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07936

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationGridSize.width` **must** evenly
divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07937) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07937

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationGridSize.height` **must** evenly
divide
[VkMultisamplePropertiesEXT](../limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](../limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling the value of `rasterizationSamples`
in the last call to [vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07938) VUID-vkCmdExecuteGeneratedCommandsEXT-sampleLocationsEnable-07938

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](../pipelines.html#VkDynamicState) state disabled and the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) state enabled, and the
[current value](../pipelines.html#dynamic-state-current-value) of
`sampleLocationsEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE), then
`sampleLocationsInfo.sampleLocationsPerPixel` **must** equal
`rasterizationSamples` in the last call to
[vkCmdSetRasterizationSamplesEXT](../primsrast.html#vkCmdSetRasterizationSamplesEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-coverageModulationTableEnable-07488) VUID-vkCmdExecuteGeneratedCommandsEXT-coverageModulationTableEnable-07488

If
a shader object is bound to any graphics stage or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](../pipelines.html#VkDynamicState) state
enabled, and the last call to
[vkCmdSetCoverageModulationTableEnableNV](../fragops.html#vkCmdSetCoverageModulationTableEnableNV) set
`coverageModulationTableEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
`coverageModulationTableCount` parameter in the last call to
[vkCmdSetCoverageModulationTableNV](../fragops.html#vkCmdSetCoverageModulationTableNV) **must** equal the current
`rasterizationSamples` divided by the number of color samples in the
current active color attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07489) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07489

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
and if current subpass has a depth/stencil attachment and depth test,
stencil test, or depth bounds test are enabled in the bound pipeline,
then the current `rasterizationSamples` **must** be the same as the
sample count of the depth/stencil attachment

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-coverageToColorEnable-07490) VUID-vkCmdExecuteGeneratedCommandsEXT-coverageToColorEnable-07490

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](../pipelines.html#VkDynamicState) state enabled and the
last call to [vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) set the
`coverageToColorEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) `coverageToColorLocation`,
with a [VkFormat](../formats.html#VkFormat) of [VK_FORMAT_R8_UINT](../formats.html#VkFormat),
[VK_FORMAT_R8_SINT](../formats.html#VkFormat), [VK_FORMAT_R16_UINT](../formats.html#VkFormat),
[VK_FORMAT_R16_SINT](../formats.html#VkFormat), [VK_FORMAT_R32_UINT](../formats.html#VkFormat), or
[VK_FORMAT_R32_SINT](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-09420) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizerDiscardEnable-09420

If the `[VK_NV_fragment_coverage_to_color](../../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled,
and a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)
stage, and the most recent call to [vkCmdSetRasterizerDiscardEnable](../primsrast.html#vkCmdSetRasterizerDiscardEnable)
in the current command buffer set `rasterizerDiscardEnable` to
[VK_FALSE](../fundamentals.html#VK_FALSE), and the last call to
[vkCmdSetCoverageToColorEnableNV](../fragops.html#vkCmdSetCoverageToColorEnableNV) set the
`coverageToColorEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE), then there **must** be an
active color attachment at the location selected by the last call to
[vkCmdSetCoverageToColorLocationNV](../fragops.html#vkCmdSetCoverageToColorLocationNV) `coverageToColorLocation`,
with a [VkFormat](../formats.html#VkFormat) of [VK_FORMAT_R8_UINT](../formats.html#VkFormat),
[VK_FORMAT_R8_SINT](../formats.html#VkFormat), [VK_FORMAT_R16_UINT](../formats.html#VkFormat),
[VK_FORMAT_R16_SINT](../formats.html#VkFormat), [VK_FORMAT_R32_UINT](../formats.html#VkFormat), or
[VK_FORMAT_R32_SINT](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-coverageReductionMode-07491) VUID-vkCmdExecuteGeneratedCommandsEXT-coverageReductionMode-07491

If the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is enabled,
a shader object is bound to any graphics stage or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](../pipelines.html#VkDynamicState) dynamic states enabled,
then the [current values](../pipelines.html#dynamic-state-current-value) of
`coverageReductionMode`, `rasterizationSamples`, the sample
counts for the color and depth/stencil attachments (if the subpass has
them) **must** be a valid combination returned by
[vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](../fragops.html#vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-07492) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-07492

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) dynamic state enabled, but
not the [VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic state
enabled, then the bound graphics pipeline **must** have been created with
[VkPipelineViewportSwizzleStateCreateInfoNV](../vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV)::`viewportCount`
greater or equal to the `viewportCount` parameter in the last call
to [vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-07493) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-07493

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../pipelines.html#VkDynamicState) and
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](../pipelines.html#VkDynamicState) dynamic states enabled then
the `viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-09421) VUID-vkCmdExecuteGeneratedCommandsEXT-viewportCount-09421

If the `[VK_NV_viewport_swizzle](../../appendices/extensions.html#VK_NV_viewport_swizzle)` extension is enabled, and a
shader object is bound to any graphics stage, then the
`viewportCount` parameter in the last call to
[vkCmdSetViewportSwizzleNV](../vertexpostproc.html#vkCmdSetViewportSwizzleNV) **must** be greater than or equal to the
`viewportCount` parameter in the last call to
[vkCmdSetViewportWithCount](../vertexpostproc.html#vkCmdSetViewportWithCount)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07494) VUID-vkCmdExecuteGeneratedCommandsEXT-rasterizationSamples-07494

If the `[VK_NV_framebuffer_mixed_samples](../../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
and the [`coverageReductionMode`](../features.html#features-coverageReductionMode)
feature is not enabled, or the [current    value](../pipelines.html#dynamic-state-current-value) of `coverageReductionMode` is not
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](../fragops.html#VkCoverageReductionModeNV),
and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizationSamples` is greater than sample count of the color
attachment, then [sample shading](../primsrast.html#primsrast-sampleshading) **must** be
disabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07495) VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07495

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledRectangularLines`](../features.html#features-stippledRectangularLines)
feature **must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07496) VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07496

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledBresenhamLines`](../features.html#features-stippledBresenhamLines)
feature **must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07497) VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07497

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledSmoothLines`](../features.html#features-stippledSmoothLines) feature
**must** be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07498) VUID-vkCmdExecuteGeneratedCommandsEXT-stippledLineEnable-07498

If the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](../pipelines.html#VkDynamicState) or
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](../pipelines.html#VkDynamicState) dynamic states
enabled, and if the current `stippledLineEnable` state is
[VK_TRUE](../fundamentals.html#VK_TRUE) and the current `lineRasterizationMode` state is
[VK_LINE_RASTERIZATION_MODE_DEFAULT](../primsrast.html#VkLineRasterizationModeEXT), then the
[`stippledRectangularLines`](../features.html#features-stippledRectangularLines)
feature **must** be enabled and
[VkPhysicalDeviceLimits](../limits.html#VkPhysicalDeviceLimits)::`strictLines` **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-stage-07073) VUID-vkCmdExecuteGeneratedCommandsEXT-stage-07073

If the bound pipeline was created with the
[VkPipelineShaderStageCreateInfo](../pipelines.html#VkPipelineShaderStageCreateInfo)::`stage` member of an element
of [VkGraphicsPipelineCreateInfo](../pipelines.html#VkGraphicsPipelineCreateInfo)::`pStages` set to
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits), then [Mesh    Shader Queries](../queries.html#queries-mesh-shader) **must** not be active

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08877) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08877

If
a shader object is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits) stage
or
a graphics pipeline is bound which was created with the
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](../pipelines.html#VkDynamicState) dynamic state
enabled, and the [current value](../pipelines.html#dynamic-state-current-value) of
`rasterizerDiscardEnable` is [VK_FALSE](../fundamentals.html#VK_FALSE), then
[vkCmdSetAttachmentFeedbackLoopEnableEXT](../renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT) **must** have been called and
not subsequently [invalidated](../pipelines.html#dynamic-state-lifetime) in the current
command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-07850) VUID-vkCmdExecuteGeneratedCommandsEXT-None-07850

If dynamic state was inherited from
[VkCommandBufferInheritanceViewportScissorInfoNV](../cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV), it **must** be set
in the current command buffer prior to this drawing command

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-nextStage-10745) VUID-vkCmdExecuteGeneratedCommandsEXT-nextStage-10745

For each shader object bound to a graphics stage, except for shader
object bound to the last graphics stage in the logical pipeline, it
**must** have been created with a `nextStage` including the
corresponding bit to the shader object bound to the following graphics
stage in the logical pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08684) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08684

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08685) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08685

If there is no bound graphics pipeline, and the
[`tessellationShader`](../features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08686) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08686

If there is no bound graphics pipeline, and the
[`tessellationShader`](../features.html#features-tessellationShader) feature is
enabled, `vkCmdBindShadersEXT` **must** have been called in the current
command buffer with `pStages` with an element of
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08687) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08687

If there is no bound graphics pipeline, and the
[`geometryShader`](../features.html#features-geometryShader) feature is enabled,
`vkCmdBindShadersEXT` **must** have been called in the current command
buffer with `pStages` with an element of
[VK_SHADER_STAGE_GEOMETRY_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08688) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08688

If there is no bound graphics pipeline, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_FRAGMENT_BIT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08689) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08689

If there is no bound graphics pipeline, and the [    `taskShader`](../features.html#features-taskShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08690) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08690

If there is no bound graphics pipeline, and the [    `meshShader`](../features.html#features-meshShader) feature is enabled, `vkCmdBindShadersEXT` **must**
have been called in the current command buffer with `pStages` with
an element of [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08693) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08693

If there is no bound graphics pipeline, and at least one of the
[`taskShader`](../features.html#features-taskShader) and [    `meshShader`](../features.html#features-meshShader) features is enabled, one of the
[VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) or [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)
stages **must** have a valid `VkShaderEXT` bound, and the other **must**
have no `VkShaderEXT` bound

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08696) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08696

If there is no bound graphics pipeline, and a valid `VkShaderEXT` is
bound to the [VK_SHADER_STAGE_VERTEX_BIT](../pipelines.html#VkShaderStageFlagBits) stage, there **must** be no
`VkShaderEXT` bound to either the [VK_SHADER_STAGE_TASK_BIT_EXT](../pipelines.html#VkShaderStageFlagBits)
stage or the [VK_SHADER_STAGE_MESH_BIT_EXT](../pipelines.html#VkShaderStageFlagBits) stage

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08698) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08698

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag, then all shaders created
with the [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag in the same
[vkCreateShadersEXT](../shaders.html#vkCreateShadersEXT) call **must** also be bound

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08699) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08699

If any graphics shader is bound which was created with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag, any stages in between
stages whose shaders which did not create a shader with the
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag as part of the same
[vkCreateShadersEXT](../shaders.html#vkCreateShadersEXT) call **must** not have any `VkShaderEXT` bound

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08878) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08878

All bound graphics shader objects **must** have been created with identical
or [identically defined](../../appendices/glossary.html#glossary-identically-defined) push constant
ranges

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-08879) VUID-vkCmdExecuteGeneratedCommandsEXT-None-08879

All bound graphics shader objects **must** have either been created with
the [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT) flag set, or with
identical or [identically defined](../../appendices/glossary.html#glossary-identically-defined) arrays
of descriptor set layouts

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-09372) VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-09372

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` equal to `1`, a color
attachment with a resolve mode of
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](../renderpass.html#VkResolveModeFlagBitsKHR), and a
fragment shader is bound, it **must** not declare the `DepthReplacing`
or `StencilRefReplacingEXT` execution modes

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDynamicStates-08715) VUID-vkCmdExecuteGeneratedCommandsEXT-pDynamicStates-08715

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](../pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](../pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpDepthAttachmentReadEXT`, the `depthWriteEnable` parameter
in the last call to [vkCmdSetDepthWriteEnable](../fragops.html#vkCmdSetDepthWriteEnable) **must** be
[VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDynamicStates-08716) VUID-vkCmdExecuteGeneratedCommandsEXT-pDynamicStates-08716

If the bound graphics pipeline state includes a fragment shader stage,
was created with [VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](../pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](../pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpStencilAttachmentReadEXT`, the `writeMask` parameter in
the last call to [vkCmdSetStencilWriteMask](../fragops.html#vkCmdSetStencilWriteMask) **must** be `0`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09116) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09116

    If
    a shader object is bound to any graphics stage
or
    the bound graphics pipeline was created with
    [VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](../pipelines.html#VkDynamicState),
    and the format of any color attachment is
    [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](../formats.html#VkFormat), the corresponding element of the
    `pColorWriteMasks` parameter of [vkCmdSetColorWriteMaskEXT](../framebuffer.html#vkCmdSetColorWriteMaskEXT)
    **must** either include all of [VK_COLOR_COMPONENT_R_BIT](../framebuffer.html#VkColorComponentFlagBits),
    [VK_COLOR_COMPONENT_G_BIT](../framebuffer.html#VkColorComponentFlagBits), and [VK_COLOR_COMPONENT_B_BIT](../framebuffer.html#VkColorComponentFlagBits), or
    none of them

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-maxFragmentDualSrcAttachments-09239) VUID-vkCmdExecuteGeneratedCommandsEXT-maxFragmentDualSrcAttachments-09239

If [blending](../framebuffer.html#framebuffer-blending) is enabled for any attachment where
either the source or destination blend factors for that attachment
[use the secondary color input](../framebuffer.html#framebuffer-dsb), the maximum value of
`Location` for any output attachment [statically    used](../shaders.html#shaders-staticuse) in the `Fragment` `Execution` `Model` executed by this command
**must** be less than [    `maxFragmentDualSrcAttachments`](../limits.html#limits-maxFragmentDualSrcAttachments)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09548) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09548

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingAttachmentLocationInfo](../interfaces.html#VkRenderingAttachmentLocationInfo)::`pColorAttachmentLocations`
in the bound pipeline **must** match the value for the corresponding
locations set currently in the current render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09549) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09549

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of each element of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pColorAttachmentInputIndices`
in the bound pipeline **must** match the value for the corresponding index
set currently in the current render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10927) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10927

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pDepthInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10928) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10928

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
and there is no shader object bound to any graphics stage,
the value of
[VkRenderingInputAttachmentIndexInfo](../interfaces.html#VkRenderingInputAttachmentIndexInfo)::`pStencilInputAttachmentIndex`
in the bound pipeline **must** match the value set currently in the current
render pass instance

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09642) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09642

If the current render pass was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with
the [VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR) flag, the bound
graphics pipeline **must** have been created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-09643) VUID-vkCmdExecuteGeneratedCommandsEXT-None-09643

If the bound graphics pipeline was created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR), the current
render pass **must** have begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with the
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR) flag

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10677) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10677

If the [per-tile execution model](../renderpass.html#renderpass-per-tile-execution-model)
is enabled, the
[tileShadingPerTileDraw](../features.html#features-tileShadingPerTileDraw) feature **must**
be enabled

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-10772) VUID-vkCmdExecuteGeneratedCommandsEXT-None-10772

If a shader object is bound to any graphics stage, *multiview*
functionality **must** not be enabled in the current render pass

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-multiviewPerViewViewports-12262) VUID-vkCmdExecuteGeneratedCommandsEXT-multiviewPerViewViewports-12262

If the [    `multiviewPerViewViewports`](../features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../pipelines.html#dynamic-state-current-value) of
`viewportCount`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-multiviewPerViewViewports-12263) VUID-vkCmdExecuteGeneratedCommandsEXT-multiviewPerViewViewports-12263

If the [    `multiviewPerViewViewports`](../features.html#features-multiviewPerViewViewports) feature is enabled, then the index of
the most significant bit in current render pass instance `viewMask`
**must** be less than the [current value](../pipelines.html#dynamic-state-current-value) of
`scissorCount`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-flags-11521) VUID-vkCmdExecuteGeneratedCommandsEXT-flags-11521

If current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering)
with [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`flags` which includes
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](../renderpass.html#VkRenderingFlagBitsKHR), and if
[sample shading](../primsrast.html#primsrast-sampleshading) is enabled (explicitly or
implicitly), then the minimum fraction for sample shading **must** equal
0.0

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11522) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11522

    If the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** have been created with a
    [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11523) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11523

    If the current render pass instance was begun with
    [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and does not contain a custom resolve,
and the [`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled,
    the graphics pipeline bound **must** not have been created with a
    [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11524) VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11524

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, the graphics pipeline bound **must**
have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as [VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11525) VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11525

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not been recorded in the render
pass instance, the graphics pipeline bound **must** have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_FALSE](../fundamentals.html#VK_FALSE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11861) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11861

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a custom resolve, the bound
graphics pipeline **must** have been created with a
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`colorAttachmentCount` equal to
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11862) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11862

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound graphics pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11863) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11863

If
the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled, and
the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have
the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound pipeline equal to [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11864) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11864

If the [    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, the
current render pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering),
it contains a custom resolve, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` greater than `0`, then
each element of the [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array
with an `resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must**
have been created with a [VkFormat](../formats.html#VkFormat) equal to the corresponding
element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats` used
to create the bound graphics pipeline, or the corresponding element of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`pColorAttachmentFormats`, if it
exists, **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11865) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11865

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11866) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11866

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline **must** be equal to the [VkFormat](../formats.html#VkFormat)
used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11867) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11867

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`depthAttachmentFormat` used to
create the bound graphics pipeline was not equal to the [VkFormat](../formats.html#VkFormat)
used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11868) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11868

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
was [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to
[VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11869) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11869

If current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve,
the
[`dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments)
feature is not enabled,
and [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
was not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline **must** be equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11870) VUID-vkCmdExecuteGeneratedCommandsEXT-dynamicRenderingUnusedAttachments-11870

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), it contains a custom resolve, the
[    `dynamicRenderingUnusedAttachments`](../features.html#features-dynamicRenderingUnusedAttachments) feature is enabled,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the value of
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`stencilAttachmentFormat` used
to create the bound graphics pipeline was not equal to the
[VkFormat](../formats.html#VkFormat) used to create
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`, the
value of the format **must** be [VK_FORMAT_UNDEFINED](../formats.html#VkFormat)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-11871) VUID-vkCmdExecuteGeneratedCommandsEXT-colorAttachmentCount-11871

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) with a
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter greater than
`0` and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been recorded in the render
pass instance, then for each element of the
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pColorAttachments` array with a
`resolveImageView` not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the
`resolveImageView` **must** have been created with a sample count equal
to the value of `rasterizationSamples` for the bound graphics
pipeline

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-11872) VUID-vkCmdExecuteGeneratedCommandsEXT-pDepthAttachment-11872

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, and
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView` was not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for the
bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-11873) VUID-vkCmdExecuteGeneratedCommandsEXT-pStencilAttachment-11873

If the current render pass instance was begun with
[vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance,
[VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView` was
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the value of `rasterizationSamples` for
the bound graphics pipeline **must** be equal to the sample count used to
create [VkRenderingInfo](../renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11529) VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11529

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering), a fragment
density map attachment is active, and [vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT)
has been called, then the fragment shader object bound **must** have been
created with [VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_TRUE](../fundamentals.html#VK_TRUE)

[](#VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11530) VUID-vkCmdExecuteGeneratedCommandsEXT-customResolve-11530

If a shader object is bound to the fragment stage, the current render
pass instance was begun with [vkCmdBeginRendering](../renderpass.html#vkCmdBeginRendering) and contains a
custom resolve, a fragment density map attachment is active, and
[vkCmdBeginCustomResolveEXT](../renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been called, then the
fragment shader object bound **must** have been created with
[VkCustomResolveCreateInfoEXT](../pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-11045) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-11045

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11046) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11046

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and
[vkGetGeneratedCommandsMemoryRequirementsEXT](#vkGetGeneratedCommandsMemoryRequirementsEXT) did not return a
required size of zero then [vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)
**must** have already been executed on the device before this command
executes, and the preprocessing command **must** have used the same
`pGeneratedCommandsInfo` content as well as the content of the input
buffers it references (all except
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`preprocessAddress`)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11047) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11047

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) then the
`indirectCommandsLayout` member of `pGeneratedCommandsInfo`
**must** have been created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT) bit
set

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11141) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11141

If the `indirectCommandsLayout` member of
`pGeneratedCommandsInfo` was created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT) bit
set, then `isPreprocessed` **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-preprocessAddress-11142) VUID-vkCmdExecuteGeneratedCommandsEXT-preprocessAddress-11142

The contents of the `preprocessAddress` member of
`pGeneratedCommandsInfo` **must** not have been previously used to
record another [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11048) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11048

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) then the bound descriptor sets
and push constants **must** match identically with those bound during
recording of the corresponding call to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-10198) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-10198

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) then the conditional render
state and its predicate value **must** match identically with the state and
value set during execution of the corresponding call to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11049) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11049

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and the
`indirectCommandsLayout` member of `pGeneratedCommandsInfo`
contains a draw token, then the graphics state bound on
`commandBuffer` **must** match identically with the graphics state
bound on the `stateCommandBuffer` passed to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11149) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11149

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE), then the queue family index of
`commandBuffer` **must** be the same as the queue family index used to
allocate the `stateCommandBuffer` passed to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11051) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11051

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and the
`indirectCommandsLayout` member of `pGeneratedCommandsInfo`
contains a dispatch token, then the compute state bound on
`commandBuffer` **must** match identically with the compute state bound
on the `stateCommandBuffer` passed to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11052) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11052

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and the
`indirectCommandsLayout` member of `pGeneratedCommandsInfo`
contains a ray tracing token, then the ray tracing state bound on
`commandBuffer` **must** match identically with the ray tracing state
bound on the `stateCommandBuffer` passed to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11150) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11150

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and the
`indirectCommandsLayout` member of `pGeneratedCommandsInfo`
contains a ray tracing token, the queue family index `commandBuffer`
was allocated from **must** be the same queue family index used to allocate
the `stateCommandBuffer` passed to
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11053) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11053

If the token sequence of the passed
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectCommandsLayout` contains
a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, the
initial shader state of
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectExecutionSet` **must** be
bound on `commandBuffer`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11004) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11004

If `indirectCommandsLayout` was created with a token sequence that
contained the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token and `indirectExecutionSet` was created using
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#VkIndirectExecutionSetInfoTypeEXT), every
executed [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token
**must** bind all the shader stages set in the
[VkIndirectCommandsExecutionSetTokenEXT](#VkIndirectCommandsExecutionSetTokenEXT)::`shaderStages` used to
create `indirectCommandsLayout`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11055) VUID-vkCmdExecuteGeneratedCommandsEXT-isPreprocessed-11055

If `isPreprocessed` is [VK_TRUE](../fundamentals.html#VK_TRUE) and the token sequence of the
passed [VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectCommandsLayout`
contains a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, the members of
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectExecutionSet` accessed by
this command **must** not have been modified since the preprocess buffer
was generated

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11056) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-11056

If the `indirectCommandsLayout` member of
`pGeneratedCommandsInfo` contains a draw token, then the active
render pass **must** not have a specified fragment density map

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-deviceGeneratedCommandsTransformFeedback-11057) VUID-vkCmdExecuteGeneratedCommandsEXT-deviceGeneratedCommandsTransformFeedback-11057

If
[`deviceGeneratedCommandsTransformFeedback`](../limits.html#limits-deviceGeneratedCommandsTransformFeedback)
is not supported on device, transform feedback **must** not be active

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectExecutionSet-11058) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectExecutionSet-11058

If transform feedback is active,
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectExecutionSet` **must** be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-deviceGeneratedCommands-11059) VUID-vkCmdExecuteGeneratedCommandsEXT-deviceGeneratedCommands-11059

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11060) VUID-vkCmdExecuteGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11060

The bound shader stages **must** be supported by
[](../limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStages`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11061) VUID-vkCmdExecuteGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11061

Only stages specified in [](../limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStages`
**can** be set in `pGeneratedCommandsInfo->shaderStages`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-None-11062) VUID-vkCmdExecuteGeneratedCommandsEXT-None-11062

If a rendering pass is currently active, the view mask **must** be `0`

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-11143) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-11143

`commandBuffer` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](../cmdbuffers.html#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-10769) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-10769

If the `indirectCommandsLayout` member of
`pGeneratedCommandsInfo` contains a draw token, this command **must**
not be called outside a render pass instance

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-12202) VUID-vkCmdExecuteGeneratedCommandsEXT-indirectCommandsLayout-12202

If the `indirectCommandsLayout` member of
`pGeneratedCommandsInfo` does not contain a draw token, this command
**must** not be called inside a render pass instance

Valid Usage (Implicit)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-parameter) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter) VUID-vkCmdExecuteGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT) structure

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-recording) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-cmdpool) VUID-vkCmdExecuteGeneratedCommandsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-suspended) VUID-vkCmdExecuteGeneratedCommandsEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-videocoding) VUID-vkCmdExecuteGeneratedCommandsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdExecuteGeneratedCommandsEXT-bufferlevel) VUID-vkCmdExecuteGeneratedCommandsEXT-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

Indirection |

Conditional Rendering

vkCmdExecuteGeneratedCommandsEXT is affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The `VkGeneratedCommandsInfoEXT` is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkShaderStageFlags             shaderStages;
    VkIndirectExecutionSetEXT      indirectExecutionSet;
    VkIndirectCommandsLayoutEXT    indirectCommandsLayout;
    VkDeviceAddress                indirectAddress;
    VkDeviceSize                   indirectAddressSize;
    VkDeviceAddress                preprocessAddress;
    VkDeviceSize                   preprocessSize;
    uint32_t                       maxSequenceCount;
    VkDeviceAddress                sequenceCountAddress;
    uint32_t                       maxDrawCount;
} VkGeneratedCommandsInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderStages` is the mask of shader stages used by the commands.

* 
`indirectExecutionSet` is the indirect execution set to be used for
binding shaders.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT)
that specifies the command sequence data.

* 
`indirectAddress` is an address that holds the indirect buffer data.

* 
`indirectAddressSize` is the size in bytes of indirect buffer data
starting at `indirectAddress`.

* 
`preprocessAddress` specifies a physical address of the
`VkBuffer` used for preprocessing the input data for execution.
If this structure is used with [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT)
with its `isPreprocessed` set to [VK_TRUE](../fundamentals.html#VK_TRUE), then the
preprocessing step is skipped but data in this address **may** still be
modified.
The contents and the layout of this address are opaque to applications
and **must** not be modified outside functions related to device-generated
commands or copied to another buffer for reuse.

* 
`preprocessSize` is the maximum byte size within
`preprocessAddress` that is available for preprocessing.

* 
`maxSequenceCount` is used to determine the number of sequences to
execute.

* 
`sequenceCountAddress` specifies an optional physical address of a
single `uint32_t` value containing the requested number of sequences
to execute.

* 
`maxDrawCount` is the maximum number of indirect draws that can be
executed by any COUNT-type multi-draw indirect tokens.
The draw count in the indirect buffer is clamped to this value for these
token types.

If `sequenceCountAddress` is not `NULL`, then `maxSequenceCount` is
the maximum number of sequences that can be executed.
The actual number is `min(maxSequenceCount, *sequenceCountAddress)`.
If `sequenceCountAddress` is `NULL`, then `maxSequenceCount` is the
exact number of sequences to execute.

If the action command token for the layout is not a COUNT-type multi-draw
indirect token, `maxDrawCount` is ignored.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11063) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11063

If [vkGetGeneratedCommandsMemoryRequirementsEXT](#vkGetGeneratedCommandsMemoryRequirementsEXT) returns a non-zero
size, `preprocessAddress` **must** not be `0`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11064) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11064

`VkDeviceMemory` objects bound to the underlying buffer for
`preprocessAddress` **must** have been allocated using one of the
memory types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](../resources.html#VkMemoryRequirements) structure returned by
[vkGetGeneratedCommandsMemoryRequirementsEXT](#vkGetGeneratedCommandsMemoryRequirementsEXT)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11065) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11065

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT), then the
`indirectExecutionSet`’s push constant layout **must** contain the
`updateRange` specified in
[VkIndirectCommandsPushConstantTokenEXT](#VkIndirectCommandsPushConstantTokenEXT)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11066) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11066

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT), then the
`indirectExecutionSet`’s push constant layout **must** contain the
`updateRange` specified in
[VkIndirectCommandsPushConstantTokenEXT](#VkIndirectCommandsPushConstantTokenEXT)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-11067) VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-11067

`maxSequenceCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT)::`maxSequenceCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11068) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11068

If `sequenceCountAddress` is not `NULL`, the value contained in the
address **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoEXT](#VkGeneratedCommandsMemoryRequirementsInfoEXT)::`maxSequenceCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-10246) VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-10246

`maxSequenceCount` **must** not be zero

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11069) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11069

`preprocessAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT](../resources.html#VkBufferUsageFlagBits2KHR) usage flag set

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11144) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11144

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, and there
is a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) used to
create `indirectCommandsLayout`, the pipeline layout **must** be
[compatible](../descriptorsets.html#descriptors-compatibility) with the descriptor and push
constant layout info used by `indirectExecutionSet`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11328) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11328

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, and there
was no descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) used to
create `indirectCommandsLayout`, pipelines in
`indirectExecutionSet` **must** have been created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11329) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11329

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, and there
was a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) used to
create `indirectCommandsLayout`, pipelines in
`indirectExecutionSet` **must** have been created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11330) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11330

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, and there
was no descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) used to
create `indirectCommandsLayout`, shaders in
`indirectExecutionSet` **must** have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11331) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11331

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, and there
was a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](#VkIndirectCommandsLayoutCreateInfoEXT) used to
create `indirectCommandsLayout`, shaders in
`indirectExecutionSet` **must** have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](../shaders.html#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11002) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11002

If `indirectCommandsLayout` was created with a token sequence that
contained the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, the shader stages used to create the initial shader state of
`indirectExecutionSet` **must** equal the
[VkIndirectCommandsExecutionSetTokenEXT](#VkIndirectCommandsExecutionSetTokenEXT)::`shaderStages` used to
create `indirectCommandsLayout`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessSize-11071) VUID-VkGeneratedCommandsInfoEXT-preprocessSize-11071

`preprocessSize` **must** be greater than or equal to the memory
requirement’s size returned by
[vkGetGeneratedCommandsMemoryRequirementsEXT](#vkGetGeneratedCommandsMemoryRequirementsEXT) using the matching
inputs (`indirectCommandsLayout`, …​) as within this structure

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11072) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11072

The underlying buffer for `sequenceCountAddress` **must** have the
[VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT_KHR](../resources.html#VkBufferUsageFlagBits2KHR) bit set in its usage
flag

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11073) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11073

If `sequenceCountAddress` is not `NULL`, `sequenceCountAddress`
**must** be aligned to `4`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectAddress-11074) VUID-VkGeneratedCommandsInfoEXT-indirectAddress-11074

`indirectAddress` **must** be aligned to `4`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectAddressSize-11077) VUID-VkGeneratedCommandsInfoEXT-indirectAddressSize-11077

`indirectAddressSize` **must** be greater than zero

* 
[](#VUID-VkGeneratedCommandsInfoEXT-maxDrawCount-11078) VUID-VkGeneratedCommandsInfoEXT-maxDrawCount-11078

When not ignored, `maxDrawCount` ×
`maxSequenceCount` **must** be less than 2^24

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11079) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11079

    If `indirectCommandsLayout` was created using a
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#VkIndirectCommandsTokenTypeEXT) token
and shader objects are not bound
    then the bound graphics pipeline **must** have been created with
    [VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](../pipelines.html#VkDynamicState) in
    `pDynamicStates`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11083) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11083

If the token sequence of the passed `indirectCommandsLayout`
contains a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, the `indirectExecutionSet` **must** not be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-10241) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-10241

If the token sequence of the passed `indirectCommandsLayout` does
not contains a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT)
token, the `indirectExecutionSet` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-11080) VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-11080

    If `indirectExecutionSet` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), a
    [VkGeneratedCommandsPipelineInfoEXT](#VkGeneratedCommandsPipelineInfoEXT)
or [VkGeneratedCommandsShaderInfoEXT](#VkGeneratedCommandsShaderInfoEXT)
    **must** be included in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sType-sType) VUID-VkGeneratedCommandsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-shaderStages-parameter) VUID-VkGeneratedCommandsInfoEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](../pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkGeneratedCommandsInfoEXT-shaderStages-requiredbitmask) VUID-VkGeneratedCommandsInfoEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-parameter) VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-parameter

 If `indirectExecutionSet` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](#VkIndirectExecutionSetEXT) handle

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutEXT](#VkIndirectCommandsLayoutEXT) handle

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectAddress-parameter) VUID-VkGeneratedCommandsInfoEXT-indirectAddress-parameter

 `indirectAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-parameter) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-parameter

 If `preprocessAddress` is not `0`, `preprocessAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-parameter) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-parameter

 If `sequenceCountAddress` is not `0`, `sequenceCountAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkGeneratedCommandsInfoEXT-commonparent) VUID-VkGeneratedCommandsInfoEXT-commonparent

 Both of `indirectCommandsLayout`, and `indirectExecutionSet` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Referencing the functions defined in [Indirect Commands Layout](#indirectmdslayout),
`vkCmdExecuteGeneratedCommandsEXT` behaves as:

uint32_t sequencesCount = sequenceCountAddress ?
      min(maxSequenceCount, sequenceCountAddress.load_uint32()) :
      maxSequenceCount;

cmdProcessAllSequences(commandBuffer, indirectExecutionSet,
                       indirectCommandsLayout, indirectAddress,
                       sequencesCount);

// The stateful commands within indirectCommandsLayout will not
// affect the state of subsequent commands in the target
// command buffer (cmd)

|  | It is important to note that the affected values of all state related to the
| --- | --- |
`shaderStages` used are **undefined** after this command.
This means that e.g., if this command indirectly alters push constants, the
push constant state becomes **undefined**. |

Commands **can** be preprocessed prior execution using the following command:

// Provided by VK_EXT_device_generated_commands
void vkCmdPreprocessGeneratedCommandsEXT(
    VkCommandBuffer                             commandBuffer,
    const VkGeneratedCommandsInfoEXT*           pGeneratedCommandsInfo,
    VkCommandBuffer                             stateCommandBuffer);

* 
`commandBuffer` is the command buffer which does the preprocessing.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT) structure containing parameters
affecting the preprocessing step.

* 
`stateCommandBuffer` is a command buffer from which to snapshot
current states affecting the preprocessing step.
When a graphics command action token is used, graphics state is
snapshotted.
When a compute action command token is used, compute state is
snapshotted.
When a ray tracing action command token is used, ray tracing state is
snapshotted.
It can be deleted at any time after this command has been recorded.

|  | `stateCommandBuffer` access is not synchronized by the driver, meaning
| --- | --- |
that this command buffer **must** not be modified between threads in an unsafe
manner. |

Valid Usage

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-11081) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-11081

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-11082) VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-11082

`pGeneratedCommandsInfo`’s `indirectCommandsLayout` **must** have
been created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](#VkIndirectCommandsLayoutUsageFlagBitsEXT) bit
set

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-indirectCommandsLayout-11084) VUID-vkCmdPreprocessGeneratedCommandsEXT-indirectCommandsLayout-11084

If the token sequence of the passed
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectCommandsLayout` contains
a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#VkIndirectCommandsTokenTypeEXT) token, the
initial shader state of
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectExecutionSet` **must** be
bound on `stateCommandBuffer`

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-11138) VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-11138

`stateCommandBuffer` **must** be in the recording state

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-deviceGeneratedCommands-11087) VUID-vkCmdPreprocessGeneratedCommandsEXT-deviceGeneratedCommands-11087

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11088) VUID-vkCmdPreprocessGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11088

Only stages specified in [](../limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](../limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT)::`supportedIndirectCommandsShaderStages`
**can** be set in `pGeneratedCommandsInfo->shaderStages`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT) structure

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-parameter

 `stateCommandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-recording) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-cmdpool) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-renderpass) VUID-vkCmdPreprocessGeneratedCommandsEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-suspended) VUID-vkCmdPreprocessGeneratedCommandsEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-videocoding) VUID-vkCmdPreprocessGeneratedCommandsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-bufferlevel) VUID-vkCmdPreprocessGeneratedCommandsEXT-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commonparent) VUID-vkCmdPreprocessGeneratedCommandsEXT-commonparent

 Both of `commandBuffer`, and `stateCommandBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to `stateCommandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdPreprocessGeneratedCommandsEXT is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The bound descriptor sets and push constants that will be used with indirect
command generation **must** already be specified on `stateCommandBuffer` at
the time of preprocessing commands with
[vkCmdPreprocessGeneratedCommandsEXT](#vkCmdPreprocessGeneratedCommandsEXT).
They **must** match the bound descriptor sets and push constants used in the
execution of indirect commands with [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT).

If push constants for shader stages are also specified in the
[VkGeneratedCommandsInfoEXT](#VkGeneratedCommandsInfoEXT)::`indirectCommandsLayout` with a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#VkIndirectCommandsTokenTypeEXT) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#VkIndirectCommandsTokenTypeEXT) token, then those
values override the push constants that were previously pushed.

All [State-setting commands](../fundamentals.html#fundamentals-queueoperation-command-types)
that are bound on `stateCommandBuffer` will be used.
Any parameters set by those commands **must** be set identically in a command
buffer that [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT) is recorded into, at the
point [vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT) is recorded.
If conditional rendering is used, the predicate value at preprocessing time
**must** match the one at execution time.
The queue family index `stateCommandBuffer` was allocated from **must** be
the same as the queue family index of the command buffer used in
[vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT).

On some implementations, preprocessing **may** have no effect on performance.

[vkCmdExecuteGeneratedCommandsEXT](#vkCmdExecuteGeneratedCommandsEXT) **may** write to the preprocess buffer,
no matter the isPreprocess parameter.
In this case, the implementation **must** insert appropriate synchronization
automatically, which corresponds to the following pseudocode:

* 
Barrier

srcStageMask = DRAW_INDIRECT

* 
srcAccesMask = 0

* 
dstStageMask = COMMAND_PREPROCESS_BIT

* 
dstAccessMask = COMMAND_PREPROCESS_WRITE_BIT |
COMMAND_PREPROCESS_READ_BIT

Do internal writes

Barrier

* 
srcStageMask = COMMAND_PREPROCESS_BIT

* 
srcAccesMask = COMMAND_PREPROCESS_WRITE_BIT

* 
dstStageMask = DRAW_INDIRECT

* 
dstAccessMask = INDIRECT_COMMAND_READ_BIT

Execute
