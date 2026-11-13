# VkIndirectCommandsIndexBufferTokenEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsIndexBufferTokenEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsIndexBufferTokenEXT - Structure specifying layout token info for a single index buffer command token

The `VkIndirectCommandsIndexBufferTokenEXT` structure specifies the
layout token info for the
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_INDEX_BUFFER_EXT](VkIndirectCommandsTokenTypeEXT.html) token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsIndexBufferTokenEXT {
    VkIndirectCommandsInputModeFlagBitsEXT    mode;
} VkIndirectCommandsIndexBufferTokenEXT;

* 
`mode` specifies the mode to use with this token.

This allows for easy layering of Vulkan atop other APIs.
When [VK_INDIRECT_COMMANDS_INPUT_MODE_DXGI_INDEX_BUFFER_EXT](VkIndirectCommandsInputModeFlagBitsEXT.html) is
specified, the indirect buffer can contain a `D3D12_INDEX_BUFFER_VIEW`
instead of [VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html) as D3D’s DXGI format
value is mapped to the [VkIndexType](VkIndexType.html).
It works as both structs are otherwise binary compatible.

Valid Usage

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11135) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11135

`mode` **must** be non-zero

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11136) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-11136

`mode` **must** be one of the bits supported in
[](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsInputModes)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsInputModes`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-parameter) VUID-VkIndirectCommandsIndexBufferTokenEXT-mode-parameter

 `mode` **must** be a valid [VkIndirectCommandsInputModeFlagBitsEXT](VkIndirectCommandsInputModeFlagBitsEXT.html) value

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsInputModeFlagBitsEXT](VkIndirectCommandsInputModeFlagBitsEXT.html), [VkIndirectCommandsTokenDataEXT](VkIndirectCommandsTokenDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsIndexBufferTokenEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
