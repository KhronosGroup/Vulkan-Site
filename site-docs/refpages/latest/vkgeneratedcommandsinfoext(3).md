# VkGeneratedCommandsInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeneratedCommandsInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeneratedCommandsInfoEXT - Structure specifying parameters for the generation of commands

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderStages` is the mask of shader stages used by the commands.

* 
`indirectExecutionSet` is the indirect execution set to be used for
binding shaders.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html)
that specifies the command sequence data.

* 
`indirectAddress` is an address that holds the indirect buffer data.

* 
`indirectAddressSize` is the size in bytes of indirect buffer data
starting at `indirectAddress`.

* 
`preprocessAddress` specifies a physical address of the
`VkBuffer` used for preprocessing the input data for execution.
If this structure is used with [vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html)
with its `isPreprocessed` set to [VK_TRUE](VK_TRUE.html), then the
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

If [vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html) returns a non-zero
size, `preprocessAddress` **must** not be `0`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11064) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11064

`VkDeviceMemory` objects bound to the underlying buffer for
`preprocessAddress` **must** have been allocated using one of the
memory types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned by
[vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11065) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11065

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html), then the
`indirectExecutionSet`’s push constant layout **must** contain the
`updateRange` specified in
[VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11066) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11066

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html), then the
`indirectExecutionSet`’s push constant layout **must** contain the
`updateRange` specified in
[VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-11067) VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-11067

`maxSequenceCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html)::`maxSequenceCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11068) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11068

If `sequenceCountAddress` is not `NULL`, the value contained in the
address **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html)::`maxSequenceCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-10246) VUID-VkGeneratedCommandsInfoEXT-maxSequenceCount-10246

`maxSequenceCount` **must** not be zero

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11069) VUID-VkGeneratedCommandsInfoEXT-preprocessAddress-11069

`preprocessAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html) usage flag set

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11144) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11144

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, and there
is a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) used to
create `indirectCommandsLayout`, the pipeline layout **must** be
[compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the descriptor and push
constant layout info used by `indirectExecutionSet`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11328) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11328

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, and there
was no descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) used to
create `indirectCommandsLayout`, pipelines in
`indirectExecutionSet` **must** have been created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11329) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11329

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, and there
was a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) used to
create `indirectCommandsLayout`, pipelines in
`indirectExecutionSet` **must** have been created without
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11330) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11330

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, and there
was no descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) used to
create `indirectCommandsLayout`, shaders in
`indirectExecutionSet` **must** have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11331) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11331

If the `indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, and there
was a descriptor and push constant layout info provided either by
`pipelineLayout` or through a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) in
`pNext` of the [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html) used to
create `indirectCommandsLayout`, shaders in
`indirectExecutionSet` **must** have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11002) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11002

If `indirectCommandsLayout` was created with a token sequence that
contained the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html)
token, the shader stages used to create the initial shader state of
`indirectExecutionSet` **must** equal the
[VkIndirectCommandsExecutionSetTokenEXT](VkIndirectCommandsExecutionSetTokenEXT.html)::`shaderStages` used to
create `indirectCommandsLayout`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-preprocessSize-11071) VUID-VkGeneratedCommandsInfoEXT-preprocessSize-11071

`preprocessSize` **must** be greater than or equal to the memory
requirement’s size returned by
[vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html) using the matching
inputs (`indirectCommandsLayout`, …​) as within this structure

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11072) VUID-VkGeneratedCommandsInfoEXT-sequenceCountAddress-11072

The underlying buffer for `sequenceCountAddress` **must** have the
[VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html) bit set in its usage
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
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) token
and shader objects are not bound
    then the bound graphics pipeline **must** have been created with
    [VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html) in
    `pDynamicStates`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11083) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-11083

If the token sequence of the passed `indirectCommandsLayout`
contains a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html)
token, the `indirectExecutionSet` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-10241) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-10241

If the token sequence of the passed `indirectCommandsLayout` does
not contains a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html)
token, the `indirectExecutionSet` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-11080) VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-11080

    If `indirectExecutionSet` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), a
    [VkGeneratedCommandsPipelineInfoEXT](VkGeneratedCommandsPipelineInfoEXT.html)
or [VkGeneratedCommandsShaderInfoEXT](VkGeneratedCommandsShaderInfoEXT.html)
    **must** be included in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-sType-sType) VUID-VkGeneratedCommandsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkGeneratedCommandsInfoEXT-shaderStages-parameter) VUID-VkGeneratedCommandsInfoEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkGeneratedCommandsInfoEXT-shaderStages-requiredbitmask) VUID-VkGeneratedCommandsInfoEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-parameter) VUID-VkGeneratedCommandsInfoEXT-indirectExecutionSet-parameter

 If `indirectExecutionSet` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `indirectExecutionSet` **must** be a valid [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsInfoEXT-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html) handle

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

 Both of `indirectCommandsLayout`, and `indirectExecutionSet` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), `VkDeviceAddress`, `VkDeviceSize`, [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html), [vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
