# vkResetCommandBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetCommandBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetCommandBuffer - Reset a command buffer to the initial state

To reset a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkResetCommandBuffer(
    VkCommandBuffer                             commandBuffer,
    VkCommandBufferResetFlags                   flags);

* 
`commandBuffer` is the command buffer to reset.
The command buffer **can** be in any state other than
[pending](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), and is moved into the
[initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

* 
`flags` is a bitmask of [VkCommandBufferResetFlagBits](VkCommandBufferResetFlagBits.html)
controlling the reset operation.

Any primary command buffer that is in the [recording or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) and has `commandBuffer` recorded into
it, becomes [invalid](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

After a command buffer is reset, any objects or memory specified by commands
recorded into the command buffer **must** no longer be accessed when the
command buffer is accessed by the implementation.

Valid Usage

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-00045) VUID-vkResetCommandBuffer-commandBuffer-00045

`commandBuffer` **must** not be in the [    pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-00046) VUID-vkResetCommandBuffer-commandBuffer-00046

`commandBuffer` **must** have been allocated from a pool that was
created with the [VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](VkCommandPoolCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-parameter) VUID-vkResetCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkResetCommandBuffer-flags-parameter) VUID-vkResetCommandBuffer-flags-parameter

 `flags` **must** be a valid combination of [VkCommandBufferResetFlagBits](VkCommandBufferResetFlagBits.html) values

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCommandBufferResetFlags](VkCommandBufferResetFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkResetCommandBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
