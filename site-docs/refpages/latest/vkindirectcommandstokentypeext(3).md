# VkIndirectCommandsTokenTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsTokenTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsTokenTypeEXT - Enum specifying token commands

Possible values of those elements of the
[VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html)::`pTokens` array specifying
command tokens (other elements of the array specify command parameters) are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsTokenTypeEXT {
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT = 0,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT = 1,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT = 2,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT = 3,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT = 4,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT = 5,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT = 6,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT = 7,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT = 8,
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT = 9,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT = 1000135000,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT = 1000135001,
  // Provided by VK_EXT_device_generated_commands with VK_NV_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT = 1000202002,
  // Provided by VK_EXT_device_generated_commands with VK_NV_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT = 1000202003,
  // Provided by VK_EXT_device_generated_commands with VK_EXT_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT = 1000328000,
  // Provided by VK_EXT_device_generated_commands with VK_EXT_mesh_shader
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT = 1000328001,
  // Provided by VK_KHR_ray_tracing_maintenance1 with VK_EXT_device_generated_commands
    VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT = 1000386004,
} VkIndirectCommandsTokenTypeEXT;

| **Common Tokens** | **Command Data** |
| --- | --- |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](#) | `u32[]` array of indices into the indirect execution set |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_CONSTANT_EXT](#) | `u32[]` raw data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](#) | `u8[]` raw data |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SEQUENCE_INDEX_EXT](#) | `u32` placeholder data (not accessed by shader) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](#) | `u32` placeholder data (not accessed by shader) |
| **Compute Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_EXT](#) | [VkDispatchIndirectCommand](VkDispatchIndirectCommand.html) |
| **Ray Tracing Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_TRACE_RAYS2_EXT](#) | [VkTraceRaysIndirectCommand2KHR](VkTraceRaysIndirectCommand2KHR.html) |
| **Graphics State Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](#) | [VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_VERTEX_BUFFER_EXT](#) | [VkBindVertexBufferIndirectCommandEXT](VkBindVertexBufferIndirectCommandEXT.html) |
| **Graphics Draw Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_EXT](#) | [VkDrawIndexedIndirectCommand](VkDrawIndexedIndirectCommand.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_EXT](#) | [VkDrawIndirectCommand](VkDrawIndirectCommand.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_EXT](#) | [VkDrawMeshTasksIndirectCommandEXT](VkDrawMeshTasksIndirectCommandEXT.html) |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_NV_EXT](#) | [VkDrawMeshTasksIndirectCommandNV](VkDrawMeshTasksIndirectCommandNV.html) |
| **Graphics Draw Count Tokens** |  |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_INDEXED_COUNT_EXT](#) | [VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html) with VkDrawIndexedIndirectCommand |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_COUNT_EXT](#) | [VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html) with VkDrawIndirectCommand |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_EXT](#) | [VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html) with VkDrawMeshTasksIndirectCommandEXT |
| [VK_INDIRECT_COMMANDS_TOKEN_TYPE_DRAW_MESH_TASKS_COUNT_NV_EXT](#) | [VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html) with VkDrawMeshTasksIndirectCommandNV |

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsTokenTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
