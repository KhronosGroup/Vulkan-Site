# VkIndirectCommandsLayoutCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutCreateInfoNV - Structure specifying the parameters of a newly created indirect commands layout object

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](VkPipelineBindPoint.html) that this
layout targets.

* 
`flags` is a bitmask of
[VkIndirectCommandsLayoutUsageFlagBitsNV](VkIndirectCommandsLayoutUsageFlagBitsNV.html) specifying usage hints of
this layout.

* 
`tokenCount` is the length of the individual command sequence.

* 
`pTokens` is an array describing each command token in detail.
See [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html) and
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html) below for details.

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
data type as defined in [Alignment Requirements](../../../../spec/latest/chapters/interfaces.html#interfaces-alignment-requirements), or
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
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
or [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-02931) VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-02931

`tokenCount` **must** be greater than `0` and less than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxIndirectCommandsTokenCount`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02932) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02932

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](VkIndirectCommandsTokenTypeNV.html) it **must** be the
first element of the array and there **must** be only a single element of
such token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-09585) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-09585

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html) it **must** be the first
element of the array and there **must** be only a single element of such
token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02933) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02933

If `pTokens` contains an entry of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](VkIndirectCommandsTokenTypeNV.html) there **must** be only
a single element of such token type

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02934) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-02934

All state tokens in `pTokens` **must** occur before any action command
tokens ([VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV](VkIndirectCommandsTokenTypeNV.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV](VkIndirectCommandsTokenTypeNV.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](VkIndirectCommandsTokenTypeNV.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](VkIndirectCommandsTokenTypeNV.html)
, [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](VkIndirectCommandsTokenTypeNV.html)
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

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html) then
the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedCompute`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCompute)
feature **must** be enabled

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09089) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09089

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html) then
the state tokens in `pTokens` **must** only include
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](VkIndirectCommandsTokenTypeNV.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](VkIndirectCommandsTokenTypeNV.html),
or [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09090) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-09090

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html) and
`pTokens` includes
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-sType-sType) VUID-VkIndirectCommandsLayoutCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pNext-pNext) VUID-VkIndirectCommandsLayoutCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-flags-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkIndirectCommandsLayoutUsageFlagBitsNV](VkIndirectCommandsLayoutUsageFlagBitsNV.html) values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pTokens-parameter

 `pTokens` **must** be a valid pointer to an array of `tokenCount` valid [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html) structures

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-parameter) VUID-VkIndirectCommandsLayoutCreateInfoNV-pStreamStrides-parameter

 `pStreamStrides` **must** be a valid pointer to an array of `streamCount` `uint32_t` values

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoNV-tokenCount-arraylength

 `tokenCount` **must** be greater than `0`

* 
[](#VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-arraylength) VUID-VkIndirectCommandsLayoutCreateInfoNV-streamCount-arraylength

 `streamCount` **must** be greater than `0`

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html), [VkIndirectCommandsLayoutUsageFlagsNV](VkIndirectCommandsLayoutUsageFlagsNV.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkStructureType](VkStructureType.html), [vkCreateIndirectCommandsLayoutNV](vkCreateIndirectCommandsLayoutNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
