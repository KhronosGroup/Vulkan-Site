# VkCommandPoolResetFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandPoolResetFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandPoolResetFlagBits - Bitmask controlling behavior of a command pool reset

Bits which **can** be set in [vkResetCommandPool](vkResetCommandPool.html)::`flags`, controlling
the reset operation, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandPoolResetFlagBits {
    VK_COMMAND_POOL_RESET_RELEASE_RESOURCES_BIT = 0x00000001,
} VkCommandPoolResetFlagBits;

* 
[VK_COMMAND_POOL_RESET_RELEASE_RESOURCES_BIT](#)
specifies that resetting a command pool recycles all of the resources
from the command pool back to the system.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandPoolResetFlags](VkCommandPoolResetFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandPoolResetFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
