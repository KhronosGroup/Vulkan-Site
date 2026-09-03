# VkCommandBufferResetFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferResetFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferResetFlagBits - Bitmask controlling behavior of a command buffer reset

Bits which **can** be set in [vkResetCommandBuffer](vkResetCommandBuffer.html)::`flags`,
controlling the reset operation, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferResetFlagBits {
    VK_COMMAND_BUFFER_RESET_RELEASE_RESOURCES_BIT = 0x00000001,
} VkCommandBufferResetFlagBits;

* 
[VK_COMMAND_BUFFER_RESET_RELEASE_RESOURCES_BIT](#) specifies that most
or all memory resources currently owned by the command buffer **should** be
returned to the parent command pool.
If this flag is not set, then the command buffer **may** hold onto memory
resources and reuse them when recording commands.
`commandBuffer` is moved to the [initial    state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferResetFlags](VkCommandBufferResetFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferResetFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
