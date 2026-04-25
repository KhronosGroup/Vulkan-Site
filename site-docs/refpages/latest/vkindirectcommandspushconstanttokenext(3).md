# VkIndirectCommandsPushConstantTokenEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsPushConstantTokenEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsPushConstantTokenEXT - Structure specifying layout token info for a single push constant command token

The `VkIndirectCommandsPushConstantTokenEXT` structure specifies the
layout token info for
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html),
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
and [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) tokens.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsPushConstantTokenEXT {
    VkPushConstantRange    updateRange;
} VkIndirectCommandsPushConstantTokenEXT;

* 
`updateRange` is the push constant range that will be updated by the
token.

The `stageFlags` member of `updateRange` is ignored.

Valid Usage

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-11132) VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-11132

If the token type is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](VkIndirectCommandsTokenTypeEXT.html) or
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html),
`updateRange` **must** be contained within the push constant info used
by [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html)

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-size-11133) VUID-VkIndirectCommandsPushConstantTokenEXT-size-11133

    If the token type is
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html) or
    [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html), the `size`
    member of `updateRange` **must** be 4

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-parameter) VUID-VkIndirectCommandsPushConstantTokenEXT-updateRange-parameter

 `updateRange` **must** be a valid [VkPushConstantRange](VkPushConstantRange.html) structure

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsTokenDataEXT](VkIndirectCommandsTokenDataEXT.html), [VkPushConstantRange](VkPushConstantRange.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsPushConstantTokenEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
