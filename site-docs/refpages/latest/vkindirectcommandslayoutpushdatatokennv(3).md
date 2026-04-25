# VkIndirectCommandsLayoutPushDataTokenNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsLayoutPushDataTokenNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsLayoutPushDataTokenNV - Struct specifying the details of an indirect push data command layout token

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pushDataOffset` is the offset used for the push data command.

* 
`pushDataSize` is the size used for the push data command.

If this structure is in the `pNext` chain of
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html), and
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html)::`tokenType` is set to
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](VkIndirectCommandsTokenTypeNV.html), this structure defines a
push data command layout token.

If this structure is not provided, it is equivalent to setting
`pushDataOffset` and `pushDataSize` to 0.

Valid Usage

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11335) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11335

The sum of `pushDataOffset` and `pushDataSize` **must** be less
than [`maxPushDataSize`](../../../../spec/latest/chapters/limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11420) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataOffset-11420

`pushDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataSize-11421) VUID-VkIndirectCommandsLayoutPushDataTokenNV-pushDataSize-11421

`pushDataSize` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsLayoutPushDataTokenNV-sType-sType) VUID-VkIndirectCommandsLayoutPushDataTokenNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_PUSH_DATA_TOKEN_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutPushDataTokenNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
