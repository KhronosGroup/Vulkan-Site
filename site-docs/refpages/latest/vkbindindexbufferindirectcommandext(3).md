# VkBindIndexBufferIndirectCommandEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindIndexBufferIndirectCommandEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindIndexBufferIndirectCommandEXT - Structure specifying input data for a single index buffer command token

The `VkBindIndexBufferIndirectCommandEXT` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkBindIndexBufferIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    VkIndexType        indexType;
} VkBindIndexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](VkBuffer.html)
used as index buffer.

* 
`size` is the byte size range which is available for this operation
from the provided address.

* 
`indexType` is a [VkIndexType](VkIndexType.html) value specifying how indices are
treated.

Valid Usage

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-None-11117) VUID-VkBindIndexBufferIndirectCommandEXT-None-11117

The buffer’s usage flags from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDEX_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-11118) VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-11118

The `bufferAddress` **must** be aligned to the [VkIndexType](VkIndexType.html) of the
`indexType` used

Valid Usage (Implicit)

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-parameter) VUID-VkBindIndexBufferIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkBindIndexBufferIndirectCommandEXT-indexType-parameter) VUID-VkBindIndexBufferIndirectCommandEXT-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), `VkDeviceAddress`, [VkIndexType](VkIndexType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindIndexBufferIndirectCommandEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
