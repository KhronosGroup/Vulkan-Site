# VkIndirectCommandsTokenDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsTokenDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsTokenDataEXT - Union specifying the token-specific details of an indirect command layout token

The `VkIndirectCommandsTokenDataEXT` structure provides token-specific
details used to generate the indirect execution layout.

// Provided by VK_EXT_device_generated_commands
typedef union VkIndirectCommandsTokenDataEXT {
    const VkIndirectCommandsPushConstantTokenEXT*    pPushConstant;
    const VkIndirectCommandsVertexBufferTokenEXT*    pVertexBuffer;
    const VkIndirectCommandsIndexBufferTokenEXT*     pIndexBuffer;
    const VkIndirectCommandsExecutionSetTokenEXT*    pExecutionSet;
} VkIndirectCommandsTokenDataEXT;

* 
`pPushConstant` is a pointer to a
    [VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html) structure needed for
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html), [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
    and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) tokens

* 
`pVertexBuffer` is a pointer to a
[VkIndirectCommandsVertexBufferTokenEXT](VkIndirectCommandsVertexBufferTokenEXT.html) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) tokens

* 
`pIndexBuffer` is a pointer to a
[VkIndirectCommandsIndexBufferTokenEXT](VkIndirectCommandsIndexBufferTokenEXT.html) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) tokens

* 
`pExecutionSet` is a pointer to a
[VkIndirectCommandsExecutionSetTokenEXT](VkIndirectCommandsExecutionSetTokenEXT.html) structure needed for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) tokens

The appropriate member of the union **must** be set for each token.

The following code provides detailed information on how an individual
sequence is processed.
For valid usage, all restrictions from the regular commands apply.

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsExecutionSetTokenEXT](VkIndirectCommandsExecutionSetTokenEXT.html), [VkIndirectCommandsIndexBufferTokenEXT](VkIndirectCommandsIndexBufferTokenEXT.html), [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html), [VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html), [VkIndirectCommandsVertexBufferTokenEXT](VkIndirectCommandsVertexBufferTokenEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsTokenDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
