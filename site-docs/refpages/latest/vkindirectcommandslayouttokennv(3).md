# VkIndirectCommandsLayoutTokenNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutTokenNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutTokenNV - Struct specifying the details of an indirect command layout token

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tokenType` is a [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html) specifying the
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
`indirectStateFlags` is a [VkIndirectStateFlagsNV](VkIndirectStateFlagsNV.html) bitfield
indicating the active states for the state flag command.

* 
`indexTypeCount` is the optional size of the `pIndexTypes` and
`pIndexTypeValues` array pairings.
If not zero, it allows to register a custom `uint32_t` value to be
treated as specific [VkIndexType](VkIndexType.html).

* 
`pIndexTypes` is the used [VkIndexType](VkIndexType.html) for the corresponding
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
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](VkIndirectCommandsTokenTypeNV.html),
`vertexBindingUnit` **must** stay within device supported limits for
the appropriate commands

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02977) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02977

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html),
`pushconstantPipelineLayout` **must** be valid

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02978) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02978

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html),
`pushconstantOffset` **must** be a multiple of `4`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02979) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02979

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html),
`pushconstantSize` **must** be a multiple of `4`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02980) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02980

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html),
`pushconstantOffset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02981) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02981

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html),
`pushconstantSize` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`pushconstantOffset`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02982) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02982

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html), for each byte in
the range specified by `pushconstantOffset` and
`pushconstantSize` and for each shader stage in
`pushconstantShaderStageFlags`, there **must** be a push constant range
in `pushconstantPipelineLayout` that includes that byte and that
stage

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02983) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02983

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](VkIndirectCommandsTokenTypeNV.html), for each byte in
the range specified by `pushconstantOffset` and
`pushconstantSize` and for each push constant range that overlaps
that byte, `pushconstantShaderStageFlags` **must** include all stages
in that push constant range’s
[VkPushConstantRange](VkPushConstantRange.html)::`stageFlags`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02984) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-02984

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](VkIndirectCommandsTokenTypeNV.html),
`indirectStateFlags` **must** not be `0`

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-11334) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-11334

If `tokenType` is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](VkIndirectCommandsTokenTypeNV.html),
[VkIndirectCommandsLayoutPushDataTokenNV](VkIndirectCommandsLayoutPushDataTokenNV.html)::`pushDataSize` **must**
be greater than `0`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-sType-sType) VUID-VkIndirectCommandsLayoutTokenNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_NV](VkStructureType.html)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pNext-pNext) VUID-VkIndirectCommandsLayoutTokenNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkIndirectCommandsLayoutPushDataTokenNV](VkIndirectCommandsLayoutPushDataTokenNV.html)

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-sType-unique) VUID-VkIndirectCommandsLayoutTokenNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-tokenType-parameter) VUID-VkIndirectCommandsLayoutTokenNV-tokenType-parameter

 `tokenType` **must** be a valid [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html) value

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pushconstantPipelineLayout-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pushconstantPipelineLayout-parameter

 If `pushconstantPipelineLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pushconstantPipelineLayout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pushconstantShaderStageFlags-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pushconstantShaderStageFlags-parameter

 `pushconstantShaderStageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-indirectStateFlags-parameter) VUID-VkIndirectCommandsLayoutTokenNV-indirectStateFlags-parameter

 `indirectStateFlags` **must** be a valid combination of [VkIndirectStateFlagBitsNV](VkIndirectStateFlagBitsNV.html) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypes-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypes-parameter

 If `indexTypeCount` is not `0`, `pIndexTypes` **must** be a valid pointer to an array of `indexTypeCount` valid [VkIndexType](VkIndexType.html) values

* 
[](#VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypeValues-parameter) VUID-VkIndirectCommandsLayoutTokenNV-pIndexTypeValues-parameter

 If `indexTypeCount` is not `0`, `pIndexTypeValues` **must** be a valid pointer to an array of `indexTypeCount` `uint32_t` values

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), `VkBool32`, [VkIndexType](VkIndexType.html), [VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html), [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html), [VkIndirectStateFlagsNV](VkIndirectStateFlagsNV.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
