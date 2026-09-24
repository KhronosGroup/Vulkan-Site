# VkGeneratedCommandsInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeneratedCommandsInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeneratedCommandsInfoNV - Structure specifying parameters for the generation of commands

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](VkPipelineBindPoint.html) used for the
`pipeline`.

* 
`pipeline` is the [VkPipeline](VkPipeline.html) used in the generation and
execution process.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html)
that provides the command sequence to generate.

* 
`streamCount` defines the number of input streams

* 
`pStreams` is a pointer to an array of `streamCount`
[VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html) structures providing the input data for
the tokens used in `indirectCommandsLayout`.

* 
`sequencesCount` is the maximum number of sequences to reserve.
If `sequencesCountBuffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), this is also the
actual number of sequences generated.

* 
`preprocessBuffer` is the [VkBuffer](VkBuffer.html) that is used for
preprocessing the input data for execution.
If this structure is used with [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html)
with its `isPreprocessed` set to [VK_TRUE](VK_TRUE.html), then the
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
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](VkIndirectCommandsTokenTypeNV.html), then the
`pipeline` **must** have been created with multiple shader groups

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02914) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02914

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](VkIndirectCommandsTokenTypeNV.html), then the
`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html) set in
`VkGraphicsPipelineCreateInfo`::`flags`

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02915) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-02915

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html), then the
`pipeline`’s `VkPipelineLayout` **must** match the
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html)::`pushconstantPipelineLayout`

* 
[](#VUID-VkGeneratedCommandsInfoNV-streamCount-02916) VUID-VkGeneratedCommandsInfoNV-streamCount-02916

`streamCount` **must** match the `indirectCommandsLayout`’s
`streamCount`

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09084) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09084

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), then the `pipeline` **must** have
been created with the flag
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09085) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09085

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), then the `pipeline` **must** have
been created with a [VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html)
structure specifying a valid address where its metadata will be saved

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09086) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09086

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), then
[vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html) **must** have been called on that
pipeline to save its metadata to a device address

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09087) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-09087

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), and if
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html) is used, then
`pipeline` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCount-02917) VUID-VkGeneratedCommandsInfoNV-sequencesCount-02917

`sequencesCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV.html)::`maxIndirectSequenceCount`
and
[VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html)::`maxSequencesCount`
that was used to determine the `preprocessSize`

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02918) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02918

`preprocessBuffer` **must** have the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set in its usage flag

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessOffset-02919) VUID-VkGeneratedCommandsInfoNV-preprocessOffset-02919

`preprocessOffset` **must** be aligned to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV.html)::`minIndirectCommandsBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02971) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-02971

If `preprocessBuffer` is non-sparse then it **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessSize-02920) VUID-VkGeneratedCommandsInfoNV-preprocessSize-02920

`preprocessSize` **must** be at least equal to the memory requirement’s
size returned by [vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html) using
the matching inputs (`indirectCommandsLayout`, …​) as within this
structure

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02921) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02921

`sequencesCountBuffer` **can** be set if the actual used count of
sequences is sourced from the provided buffer.
In that case the `sequencesCount` serves as upper bound

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02922) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02922

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), its usage
flag **must** have the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02923) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02923

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`sequencesCountOffset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minSequencesCountBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02972) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-02972

If `sequencesCountBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02924) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02924

If `indirectCommandsLayout`’s
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_INDEXED_SEQUENCES_BIT_NV](VkIndirectCommandsLayoutUsageFlagBitsNV.html) is set,
`sequencesIndexBuffer` **must** be set otherwise it **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02925) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02925

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), its usage
flag **must** have the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02926) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02926

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`sequencesIndexOffset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minSequencesIndexBufferOffsetAlignment`

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02973) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-02973

If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07078) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07078

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](VkIndirectCommandsTokenTypeNV.html), then the
`pipeline` **must** contain a shader stage using the `MeshNV`
`Execution` `Model`

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07079) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-07079

If the `indirectCommandsLayout` uses a token of
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](VkIndirectCommandsTokenTypeNV.html), then the
`pipeline` **must** contain a shader stage using the `MeshEXT`
`Execution` `Model`

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsInfoNV-sType-sType) VUID-VkGeneratedCommandsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkGeneratedCommandsInfoNV-pNext-pNext) VUID-VkGeneratedCommandsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-parameter) VUID-VkGeneratedCommandsInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkGeneratedCommandsInfoNV-pipeline-parameter) VUID-VkGeneratedCommandsInfoNV-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsInfoNV-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-pStreams-parameter) VUID-VkGeneratedCommandsInfoNV-pStreams-parameter

 `pStreams` **must** be a valid pointer to an array of `streamCount` valid [VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html) structures

* 
[](#VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-preprocessBuffer-parameter

 `preprocessBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-sequencesCountBuffer-parameter

 If `sequencesCountBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `sequencesCountBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-parameter) VUID-VkGeneratedCommandsInfoNV-sequencesIndexBuffer-parameter

 If `sequencesIndexBuffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `sequencesIndexBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeneratedCommandsInfoNV-streamCount-arraylength) VUID-VkGeneratedCommandsInfoNV-streamCount-arraylength

 `streamCount` **must** be greater than `0`

* 
[](#VUID-VkGeneratedCommandsInfoNV-commonparent) VUID-VkGeneratedCommandsInfoNV-commonparent

 Each of `indirectCommandsLayout`, `pipeline`, `preprocessBuffer`, `sequencesCountBuffer`, and `sequencesIndexBuffer` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html), [VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkStructureType](VkStructureType.html), [vkCmdExecuteGeneratedCommandsNV](vkCmdExecuteGeneratedCommandsNV.html), [vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
