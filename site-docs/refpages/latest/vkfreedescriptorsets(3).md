# vkFreeDescriptorSets(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkFreeDescriptorSets.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkFreeDescriptorSets - Free one or more descriptor sets

To free allocated descriptor sets, call:

// Provided by VK_VERSION_1_0
VkResult vkFreeDescriptorSets(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    uint32_t                                    descriptorSetCount,
    const VkDescriptorSet*                      pDescriptorSets);

* 
`device` is the logical device that owns the descriptor pool.

* 
`descriptorPool` is the descriptor pool from which the descriptor
sets were allocated.

* 
`descriptorSetCount` is the number of elements in the
`pDescriptorSets` array.

* 
`pDescriptorSets` is a pointer to an array of handles to
[VkDescriptorSet](VkDescriptorSet.html) objects.

After calling `vkFreeDescriptorSets`, all descriptor sets in
`pDescriptorSets` are invalid.

Valid Usage

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-00309) VUID-vkFreeDescriptorSets-pDescriptorSets-00309

All submitted commands that refer to any element of
`pDescriptorSets` **must** have completed execution

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-00310) VUID-vkFreeDescriptorSets-pDescriptorSets-00310

`pDescriptorSets` **must** be a valid pointer to an array of
`descriptorSetCount` `VkDescriptorSet` handles, each element of
which **must** either be a valid handle or [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-00312) VUID-vkFreeDescriptorSets-descriptorPool-00312

`descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](VkDescriptorPoolCreateFlagBits.html) flag

Valid Usage (Implicit)

* 
[](#VUID-vkFreeDescriptorSets-device-parameter) VUID-vkFreeDescriptorSets-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-parameter) VUID-vkFreeDescriptorSets-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](VkDescriptorPool.html) handle

* 
[](#VUID-vkFreeDescriptorSets-descriptorSetCount-arraylength) VUID-vkFreeDescriptorSets-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-parent) VUID-vkFreeDescriptorSets-descriptorPool-parent

 `descriptorPool` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-parent) VUID-vkFreeDescriptorSets-pDescriptorSets-parent

 Each element of `pDescriptorSets` that is a valid handle **must** have been created, allocated, or retrieved from `descriptorPool`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

* 
Host access to each member of `pDescriptorSets` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDescriptorSet](VkDescriptorSet.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkFreeDescriptorSets).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
