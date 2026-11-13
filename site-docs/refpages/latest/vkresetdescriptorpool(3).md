# vkResetDescriptorPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetDescriptorPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetDescriptorPool - Resets a descriptor pool object

To return all descriptor sets allocated from a given pool to the pool,
rather than freeing individual descriptor sets, call:

// Provided by VK_VERSION_1_0
VkResult vkResetDescriptorPool(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    VkDescriptorPoolResetFlags                  flags);

* 
`device` is the logical device that owns the descriptor pool.

* 
`descriptorPool` is the descriptor pool to be reset.

* 
`flags` is reserved for future use.

Resetting a descriptor pool recycles all of the resources from all of the
descriptor sets allocated from the descriptor pool back to the descriptor
pool, and the descriptor sets are implicitly freed.

Valid Usage

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-00313) VUID-vkResetDescriptorPool-descriptorPool-00313

All uses of `descriptorPool` (via any allocated descriptor sets)
**must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkResetDescriptorPool-device-parameter) VUID-vkResetDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-parameter) VUID-vkResetDescriptorPool-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](VkDescriptorPool.html) handle

* 
[](#VUID-vkResetDescriptorPool-flags-zerobitmask) VUID-vkResetDescriptorPool-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-parent) VUID-vkResetDescriptorPool-descriptorPool-parent

 `descriptorPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

* 
Host access to any `VkDescriptorSet` objects allocated from `descriptorPool` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDescriptorPoolResetFlags](VkDescriptorPoolResetFlags.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkResetDescriptorPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
