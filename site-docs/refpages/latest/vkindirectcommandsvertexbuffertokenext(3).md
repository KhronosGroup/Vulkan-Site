# VkIndirectCommandsVertexBufferTokenEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsVertexBufferTokenEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsVertexBufferTokenEXT - Structure specifying layout token info for a single index buffer command token

The `VkIndirectCommandsVertexBufferTokenEXT` structure specifies the
layout token info for the
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsVertexBufferTokenEXT {
    uint32_t    vertexBindingUnit;
} VkIndirectCommandsVertexBufferTokenEXT;

* 
`vertexBindingUnit` is the vertex input binding number to be bound.

Valid Usage

* 
[](#VUID-VkIndirectCommandsVertexBufferTokenEXT-vertexBindingUnit-11134) VUID-VkIndirectCommandsVertexBufferTokenEXT-vertexBindingUnit-11134

`vertexBindingUnit` **must** be less than the total number of vertex
input bindings in use by the current graphics state

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsTokenDataEXT](VkIndirectCommandsTokenDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsVertexBufferTokenEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
