# VkIndirectStateFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectStateFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectStateFlagBitsNV - Bitmask specifying state that can be altered on the device

A subset of the graphics pipeline state **can** be altered using indirect state
flags:

// Provided by VK_NV_device_generated_commands
typedef enum VkIndirectStateFlagBitsNV {
    VK_INDIRECT_STATE_FLAG_FRONTFACE_BIT_NV = 0x00000001,
} VkIndirectStateFlagBitsNV;

* 
[VK_INDIRECT_STATE_FLAG_FRONTFACE_BIT_NV](#) allows to toggle the
[VkFrontFace](VkFrontFace.html) rasterization state for subsequent drawing commands.

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkIndirectStateFlagsNV](VkIndirectStateFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectStateFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
