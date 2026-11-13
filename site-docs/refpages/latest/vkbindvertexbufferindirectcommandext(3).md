# VkBindVertexBufferIndirectCommandEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindVertexBufferIndirectCommandEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindVertexBufferIndirectCommandEXT - Structure specifying input data for a single vertex buffer command token

The `VkBindVertexBufferIndirectCommandEXT` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkBindVertexBufferIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    uint32_t           stride;
} VkBindVertexBufferIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](VkBuffer.html)
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
the [VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBufferIndirectCommandEXT-bufferAddress-parameter) VUID-VkBindVertexBufferIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindVertexBufferIndirectCommandEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
