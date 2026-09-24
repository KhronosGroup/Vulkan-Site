# VkCommandPoolCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandPoolCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandPoolCreateFlagBits - Bitmask specifying usage behavior for a command pool

Bits which **can** be set in [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)::`flags`,
specifying usage behavior for a command pool, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandPoolCreateFlagBits {
    VK_COMMAND_POOL_CREATE_TRANSIENT_BIT = 0x00000001,
    VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT = 0x00000002,
  // Provided by VK_VERSION_1_1
    VK_COMMAND_POOL_CREATE_PROTECTED_BIT = 0x00000004,
} VkCommandPoolCreateFlagBits;

* 
[VK_COMMAND_POOL_CREATE_TRANSIENT_BIT](#) specifies that command
buffers allocated from the pool will be short-lived, meaning that they
will be reset or freed in a relatively short timeframe.
This flag **may** be used by the implementation to control memory
allocation behavior within the pool.

* 
[VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#) allows any command
buffer allocated from a pool to be individually reset to the
[initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle); either by calling
[vkResetCommandBuffer](vkResetCommandBuffer.html), or via the implicit reset when calling
[vkBeginCommandBuffer](vkBeginCommandBuffer.html).
If this flag is not set on a pool, then `vkResetCommandBuffer` **must**
not be called for any command buffer allocated from that pool.

* 
[VK_COMMAND_POOL_CREATE_PROTECTED_BIT](#) specifies that command
buffers allocated from the pool are protected command buffers.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandPoolCreateFlags](VkCommandPoolCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandPoolCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
