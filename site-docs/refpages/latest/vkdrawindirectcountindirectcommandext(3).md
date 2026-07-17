# VkDrawIndirectCountIndirectCommandEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawIndirectCountIndirectCommandEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawIndirectCountIndirectCommandEXT - Structure specifying input data for a single draw-type command token

The `VkDrawIndirectCountIndirectCommandEXT` structure specifies the
input data for all draw-type tokens.

// Provided by VK_EXT_device_generated_commands
typedef struct VkDrawIndirectCountIndirectCommandEXT {
    VkDeviceAddress    bufferAddress;
    uint32_t           stride;
    uint32_t           commandCount;
} VkDrawIndirectCountIndirectCommandEXT;

* 
`bufferAddress` specifies a physical address of the [VkBuffer](VkBuffer.html)
used for draw commands.

* 
`stride` is the byte size stride for the command arguments

* 
`commandCount` is the number of commands to execute

The corresponding indirect draw structure data will be read from the buffer
address.

Valid Usage

* 
[](#VUID-VkDrawIndirectCountIndirectCommandEXT-None-11122) VUID-VkDrawIndirectCountIndirectCommandEXT-None-11122

The buffer’s usage flag from which the address was acquired **must** have
the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkDrawIndirectCountIndirectCommandEXT-bufferAddress-parameter) VUID-VkDrawIndirectCountIndirectCommandEXT-bufferAddress-parameter

 `bufferAddress` **must** be a valid `VkDeviceAddress` value

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkDrawIndirectCountIndirectCommandEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
