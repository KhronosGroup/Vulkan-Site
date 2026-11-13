# VkBindIndexBufferIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindIndexBufferIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindIndexBufferIndirectCommandNV - Structure specifying input data for a single index buffer command token

The `VkBindIndexBufferIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV](VkIndirectCommandsTokenTypeNV.html) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindIndexBufferIndirectCommandNV {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    VkIndexType        indexType;
} VkBindIndexBufferIndirectCommandNV;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](VkBuffer.html)
used as index buffer.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`indexType` is a [VkIndexType](VkIndexType.html) value specifying how indices are
treated.
Instead of the Vulkan enum values, a custom `uint32_t` value **can** be
mapped to [VkIndexType](VkIndexType.html) by specifying the
`VkIndirectCommandsLayoutTokenNV`::`pIndexTypes` and
`VkIndirectCommandsLayoutTokenNV`::`pIndexTypeValues` arrays.

Valid Usage

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-None-02946) VUID-VkBindIndexBufferIndirectCommandNV-None-02946

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDEX_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-02947) VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-02947

The `bufferAddress` **must** be aligned to the `indexType` used

Valid Usage (Implicit)

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-parameter) VUID-VkBindIndexBufferIndirectCommandNV-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBindIndexBufferIndirectCommandNV-indexType-parameter) VUID-VkBindIndexBufferIndirectCommandNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), `VkDeviceAddress`, [VkIndexType](VkIndexType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindIndexBufferIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
