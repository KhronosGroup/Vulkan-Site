# VkIndirectCommandsLayoutCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutCreateInfoEXT - Structure specifying the parameters of a newly created indirect commands layout object

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkIndirectCommandsLayoutUsageFlagBitsEXT](VkIndirectCommandsLayoutUsageFlagBitsEXT.html) specifying usage rules
for this layout.

* 
`shaderStages` is the [VkShaderStageFlags](VkShaderStageFlags.html) that this layout
supports.

* 
`indirectStride` is the distance in bytes between sequences in the
indirect buffer

* 
`pipelineLayout` is the optional [VkPipelineLayout](VkPipelineLayout.html) that tokens
in this layout use.
If the [    `dynamicGeneratedPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicGeneratedPipelineLayout) feature is enabled,
`pipelineLayout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the layout **must**
be specified by chaining the [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure
off the `pNext`.
If the [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is
enabled, `pipelineLayout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) without
providing a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure.

* 
`tokenCount` is the length of the individual command sequence.

* 
`pTokens` is a pointer to an array of
[VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html) describing each command token in
detail.

The following code illustrates some of the flags:

void cmdProcessAllSequences(cmd, indirectExecutionSet, indirectCommandsLayout, indirectAddress, sequencesCount)
{
  for (s = 0; s 

When tokens are consumed, an offset is computed based on token offset and
stream stride.
The resulting offset is required to be aligned.
The alignment for a specific token is equal to the scalar alignment of the
data type as defined in [Alignment Requirements](../../../../spec/latest/chapters/interfaces.html#interfaces-alignment-requirements), or `4`, whichever is lower.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-indirectStride-11090) VUID-VkIndirectCommandsLayoutCreateInfoEXT-indirectStride-11090

`indirectStride` **must** be less than or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`maxIndirectCommandsIndirectStride`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11091) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11091

`shaderStages` **must** only contain stages supported by
[](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStages`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-11092) VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-11092

`tokenCount` **must** be less than or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`maxIndirectCommandsTokenCount`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11093) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11093

The number of tokens in the `pTokens` array with `type` equal to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) **must** be less
than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11145) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11145

The number of tokens in the `pTokens` array with `type` equal to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) **must** be less
than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11094) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11094

    The number of tokens in the `pTokens` array with `type` equal to
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html)
or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html)
    **must** be less than or equal to `1`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11095) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11095

If the action command token in the `pTokens` array is not an indexed
draw token, then `pTokens` **must** not contain a member with
`type` set to [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11096) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11096

If the action command token in the `pTokens` array is not a non-mesh
draw token, then `pTokens` **must** not contain a member with
`type` set to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11097) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11097

If the `pTokens` array contains multiple tokens with `type`
equal to [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html), then
there **must** be no duplicate
[VkIndirectCommandsVertexBufferTokenEXT](VkIndirectCommandsVertexBufferTokenEXT.html)::`vertexBindingUnit`
values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11099) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11099

    For all [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
    and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) type tokens
    in `pTokens`, there **must** be no overlapping ranges between any
    specified push constant ranges

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11100) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11100

The action command token **must** be the last token in the `pTokens`
array

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11139) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11139

If the `pTokens` array contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, then this
token **must** be the first token in the array

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11101) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11101

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) and the
[    `dynamicGeneratedPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicGeneratedPipelineLayout) feature is not enabled, then the
`pipelineLayout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11102) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11102

For any element of `pTokens`, if `type` is either
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) and
`pipelineLayout` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the `pNext` chain
**must** include a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) struct

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11103) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11103

For any element of `pTokens`, the `offset` **must** be greater than
or equal to the `offset` member of the previous tokens

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11104) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11104

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT](VkIndirectCommandsTokenTypeEXT.html), or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT](VkIndirectCommandsTokenTypeEXT.html), then `shaderStages`
**must** contain graphics stages

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11105) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11105

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](VkIndirectCommandsTokenTypeEXT.html), then
`shaderStages` **must** be [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11106) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11106

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](VkIndirectCommandsTokenTypeEXT.html) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](VkIndirectCommandsTokenTypeEXT.html), then
`shaderStages` **must** contain [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11107) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11107

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](VkIndirectCommandsTokenTypeEXT.html) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](VkIndirectCommandsTokenTypeEXT.html), then
the `shaderStages` **must** contain [VK_SHADER_STAGE_MESH_BIT_NV](VkShaderStageFlagBits.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11108) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-11108

For any element of `pTokens`, if `type` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](VkIndirectCommandsTokenTypeEXT.html), then
`shaderStages` **must** contain ray tracing stages

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11109) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11109

    If `shaderStages` contains graphics stages then the state tokens in
    `pTokens` **must** not include
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](VkIndirectCommandsTokenTypeEXT.html),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11110) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11110

    If `shaderStages` is [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) then the
    state tokens in `pTokens` **must** only include
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](VkIndirectCommandsTokenTypeEXT.html),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
    or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11111) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11111

    If `shaderStages` contains ray tracing stages then the state tokens
    in `pTokens` **must** only include
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](VkIndirectCommandsTokenTypeEXT.html),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html),
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
    or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11112) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11112

The `shaderStages` **must** only contain stages from one of the
following:

[VK_SHADER_STAGE_ALL](VkShaderStageFlagBits.html) (if the [     `descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is enabled)

* 
graphics stages

* 
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
mesh stages and [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)

* 
ray tracing stages

[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11113) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-11113

If `shaderStages` contains [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html), then
`shaderStages` **must** also contain [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html)
or [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-sType) VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pNext-pNext) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-unique) VUID-VkIndirectCommandsLayoutCreateInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-flags-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkIndirectCommandsLayoutUsageFlagBitsEXT](VkIndirectCommandsLayoutUsageFlagBitsEXT.html) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-requiredbitmask) VUID-VkIndirectCommandsLayoutCreateInfoEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pipelineLayout-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pipelineLayout-parameter

 If `pipelineLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineLayout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-parameter) VUID-VkIndirectCommandsLayoutCreateInfoEXT-pTokens-parameter

 `pTokens` **must** be a valid pointer to an array of `tokenCount` valid [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html) structures

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoEXT-tokenCount-arraylength

 `tokenCount` **must** be greater than `0`

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html), [VkIndirectCommandsLayoutUsageFlagsEXT](VkIndirectCommandsLayoutUsageFlagsEXT.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [vkCreateIndirectCommandsLayoutEXT](vkCreateIndirectCommandsLayoutEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
