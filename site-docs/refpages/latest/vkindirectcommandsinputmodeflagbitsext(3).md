# VkIndirectCommandsInputModeFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsInputModeFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsInputModeFlagBitsEXT - Bitmask specifying allowed usage of an indirect commands layout

Bits which are set in
[VkIndirectCommandsIndexBufferTokenEXT](VkIndirectCommandsIndexBufferTokenEXT.html)::`mode`, specifying how an
index buffer is used, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectCommandsInputModeFlagBitsEXT {
    VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT = 0x00000001,
    VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT = 0x00000002,
} VkIndirectCommandsInputModeFlagBitsEXT;

* 
[VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT](#) specifies
that the indirect buffer contains
[VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html).

* 
[VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT](#) specifies
that the indirect buffer contains `D3D12_INDEX_BUFFER_VIEW`.

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsIndexBufferTokenEXT](VkIndirectCommandsIndexBufferTokenEXT.html), [VkIndirectCommandsInputModeFlagsEXT](VkIndirectCommandsInputModeFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsInputModeFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
