# VkSetStateFlagsIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSetStateFlagsIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSetStateFlagsIndirectCommandNV - Structure specifying input data for a single state flag command token

The `VkSetStateFlagsIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_STATE_FLAGS_NV](VkIndirectCommandsTokenTypeNV.html) token.
Which state is changed depends on the [VkIndirectStateFlagBitsNV](VkIndirectStateFlagBitsNV.html)
specified at `VkIndirectCommandsLayoutNV` creation time.

// Provided by VK_NV_device_generated_commands
typedef struct VkSetStateFlagsIndirectCommandNV {
    uint32_t    data;
} VkSetStateFlagsIndirectCommandNV;

* 
`data` encodes packed state that this command alters.

Bit `0`: If set represents [VK_FRONT_FACE_CLOCKWISE](VkFrontFace.html), otherwise
[VK_FRONT_FACE_COUNTER_CLOCKWISE](VkFrontFace.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkSetStateFlagsIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
