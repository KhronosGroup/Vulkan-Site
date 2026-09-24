# VkIndirectCommandsTokenTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsTokenTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsTokenTypeNV - Enum specifying token commands

Possible values of those elements of the
[VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html)::`pTokens` array specifying
command tokens (other elements of the array specify command parameters) are:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectCommandsTokenTypeNV {
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV = 0,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV = 1,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV = 2,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV = 3,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV = 4,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV = 5,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV = 6,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV = 7,
  // Provided by VK_EXT_descriptor_heap with VK_NV_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV = 1000135000,
  // Provided by VK_EXT_mesh_shader with VK_NV_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV = 1000328000,
  // Provided by VK_NV_device_generated_commands_compute
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV = 1000428003,
  // Provided by VK_NV_device_generated_commands_compute
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV = 1000428004,
} VkIndirectCommandsTokenTypeNV;

| Token type | Equivalent command |
| --- | --- |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](#) | [vkCmdBindPipelineShaderGroupNV](vkCmdBindPipelineShaderGroupNV.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](#) | - |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_NV](#) | [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_NV](#) | [vkCmdBindVertexBuffers](vkCmdBindVertexBuffers.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_NV](#) | [vkCmdPushConstants](vkCmdPushConstants.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](#) | [vkCmdPushDataEXT](vkCmdPushDataEXT.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_NV](#) | [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_NV](#) | [vkCmdDrawIndirect](vkCmdDrawIndirect.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_TASKS_NV](#) | [vkCmdDrawMeshTasksIndirectNV](vkCmdDrawMeshTasksIndirectNV.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV](#) | [vkCmdDrawMeshTasksIndirectEXT](vkCmdDrawMeshTasksIndirectEXT.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](#) | [vkCmdBindPipeline](vkCmdBindPipeline.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](#) | [vkCmdDispatchIndirect](vkCmdDispatchIndirect.html) |

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsTokenTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
