# VkCommandBufferLevel(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferLevel.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferLevel - Enumerant specifying a command buffer level

Possible values of [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html)::`level`,
specifying the command buffer level, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferLevel {
    VK_COMMAND_BUFFER_LEVEL_PRIMARY = 0,
    VK_COMMAND_BUFFER_LEVEL_SECONDARY = 1,
} VkCommandBufferLevel;

* 
[VK_COMMAND_BUFFER_LEVEL_PRIMARY](#) specifies a primary command
buffer.

* 
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](#) specifies a secondary command
buffer.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
