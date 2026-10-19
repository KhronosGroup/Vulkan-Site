# VkCommandBufferUsageFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferUsageFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferUsageFlagBits - Bitmask specifying usage behavior for command buffer

Bits which **can** be set in [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`flags`,
specifying usage behavior for a command buffer, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferUsageFlagBits {
    VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT = 0x00000001,
    VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT = 0x00000002,
    VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT = 0x00000004,
} VkCommandBufferUsageFlagBits;

* 
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#) specifies that each
recording of the command buffer will only be submitted once, and the
command buffer will be reset and recorded again between each submission.

* 
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#) specifies that a
secondary command buffer is considered to be entirely inside a render
pass.
If this is a primary command buffer, then this bit is ignored.

* 
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#) specifies that a
command buffer **can** be resubmitted to any queue of the same queue family
while it is in the *pending state*, and recorded into multiple primary
command buffers.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferUsageFlags](VkCommandBufferUsageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferUsageFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
