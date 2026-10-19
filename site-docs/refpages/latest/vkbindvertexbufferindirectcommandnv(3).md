# VkBindVertexBufferIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindVertexBufferIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindVertexBufferIndirectCommandNV - Structure specifying input data for a single vertex buffer command token

The `VkBindVertexBufferIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](VkIndirectCommandsTokenTypeNV.html) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindVertexBufferIndirectCommandNV {
    VkDeviceAddress    bufferAddress;
    uint32_t           size;
    uint32_t           stride;
} VkBindVertexBufferIndirectCommandNV;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](VkBuffer.html)
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
the [VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBufferIndirectCommandNV-bufferAddress-parameter) VUID-VkBindVertexBufferIndirectCommandNV-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindVertexBufferIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
