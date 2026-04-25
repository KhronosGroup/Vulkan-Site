# vkResetCommandPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetCommandPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetCommandPool - Reset a command pool

To reset a command pool, call:

// Provided by VK_VERSION_1_0
VkResult vkResetCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolResetFlags                     flags);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool to reset.

* 
`flags` is a bitmask of [VkCommandPoolResetFlagBits](VkCommandPoolResetFlagBits.html) controlling
the reset operation.

Resetting a command pool recycles all of the resources from all of the
command buffers allocated from the command pool back to the command pool.
All command buffers that have been allocated from the command pool are put
in the [initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

Any primary command buffer allocated from another [VkCommandPool](VkCommandPool.html) that
is in the [recording or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) and
has a secondary command buffer allocated from `commandPool` recorded
into it, becomes [invalid](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkResetCommandPool-commandPool-00040) VUID-vkResetCommandPool-commandPool-00040

All `VkCommandBuffer` objects allocated from `commandPool` **must**
not be in the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkResetCommandPool-device-parameter) VUID-vkResetCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetCommandPool-commandPool-parameter) VUID-vkResetCommandPool-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-vkResetCommandPool-flags-parameter) VUID-vkResetCommandPool-flags-parameter

 `flags` **must** be a valid combination of [VkCommandPoolResetFlagBits](VkCommandPoolResetFlagBits.html) values

* 
[](#VUID-vkResetCommandPool-commandPool-parent) VUID-vkResetCommandPool-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandPool](VkCommandPool.html), [VkCommandPoolResetFlags](VkCommandPoolResetFlags.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkResetCommandPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
