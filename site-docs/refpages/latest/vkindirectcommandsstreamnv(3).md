# VkIndirectCommandsStreamNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsStreamNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsStreamNV - Structure specifying input streams for generated command tokens

The `VkIndirectCommandsStreamNV` structure specifies the input data for
one or more tokens at processing time.

// Provided by VK_NV_device_generated_commands
typedef struct VkIndirectCommandsStreamNV {
    VkBuffer        buffer;
    VkDeviceSize    offset;
} VkIndirectCommandsStreamNV;

* 
`buffer` specifies the [VkBuffer](VkBuffer.html) storing the functional
arguments for each sequence.
These arguments **can** be written by the device.

* 
`offset` specified an offset into `buffer` where the arguments
start.

Valid Usage

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-02942) VUID-VkIndirectCommandsStreamNV-buffer-02942

The `buffer`’s usage flag **must** have the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) bit set

* 
[](#VUID-VkIndirectCommandsStreamNV-offset-02943) VUID-VkIndirectCommandsStreamNV-offset-02943

The `offset` **must** be aligned to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`minIndirectCommandsBufferOffsetAlignment`

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-02975) VUID-VkIndirectCommandsStreamNV-buffer-02975

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsStreamNV-buffer-parameter) VUID-VkIndirectCommandsStreamNV-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsStreamNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
