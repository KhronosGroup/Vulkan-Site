# vkAllocateDescriptorSets(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAllocateDescriptorSets.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAllocateDescriptorSets - Allocate one or more descriptor sets

To allocate descriptor sets from a descriptor pool, call:

// Provided by VK_VERSION_1_0
VkResult vkAllocateDescriptorSets(
    VkDevice                                    device,
    const VkDescriptorSetAllocateInfo*          pAllocateInfo,
    VkDescriptorSet*                            pDescriptorSets);

* 
`device` is the logical device that owns the descriptor pool.

* 
`pAllocateInfo` is a pointer to a [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html)
structure describing parameters of the allocation.

* 
`pDescriptorSets` is a pointer to an array of [VkDescriptorSet](VkDescriptorSet.html)
handles in which the resulting descriptor set objects are returned.

The allocated descriptor sets are returned in `pDescriptorSets`.

When a descriptor set is allocated, the initial state is largely
uninitialized and all descriptors are **undefined**, with the exception that
samplers with a non-null `pImmutableSamplers` are initialized on
allocation.
Descriptors also become **undefined** if the underlying resource or view object
is destroyed.
Descriptor sets containing **undefined** descriptors **can** still be bound and
used, subject to the following conditions:

* 
For descriptor set bindings created with the
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html) bit set, all descriptors
in that binding that are dynamically used **must** have been populated
before the descriptor set is [consumed](../../../../spec/latest/chapters/descriptorsets.html#descriptors-binding).

* 
For descriptor set bindings created without the
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html) bit set, all descriptors
in that binding that are statically used **must** have been populated
before the descriptor set is [consumed](../../../../spec/latest/chapters/descriptorsets.html#descriptors-binding).

* 
Descriptor bindings with descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) **can** be **undefined** when
the descriptor set is [consumed](../../../../spec/latest/chapters/descriptorsets.html#descriptors-binding); though values in
that block will be **undefined**.

* 
Entries that are not used by a pipeline **can** have **undefined**
descriptors.

If a call to `vkAllocateDescriptorSets` would cause the total number of
descriptor sets allocated from the pool to exceed the value of
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`maxSets` used to create
`pAllocateInfo->descriptorPool`, then the allocation **may** fail due to
lack of space in the descriptor pool.
Similarly, the allocation **may** fail due to lack of space if the call to
`vkAllocateDescriptorSets` would cause the number of any given
descriptor type to exceed the sum of all the `descriptorCount` members
of each element of [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`pPoolSizes` with a
`type` equal to that type.

Additionally, the allocation **may** also fail if a call to
`vkAllocateDescriptorSets` would cause the total number of inline
uniform block bindings allocated from the pool to exceed the value of
[VkDescriptorPoolInlineUniformBlockCreateInfo](VkDescriptorPoolInlineUniformBlockCreateInfo.html)::`maxInlineUniformBlockBindings`
used to create the descriptor pool.

If the allocation fails due to no more space in the descriptor pool, and not
because of system or device memory exhaustion, then
[VK_ERROR_OUT_OF_POOL_MEMORY](VkResult.html) **must** be returned.

`vkAllocateDescriptorSets` **can** be used to create multiple descriptor
sets.
If the creation of any of those descriptor sets fails, then the
implementation **must** destroy all successfully created descriptor set objects
from this command, set all entries of the `pDescriptorSets` array to
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) and return the error.

Valid Usage (Implicit)

* 
[](#VUID-vkAllocateDescriptorSets-device-parameter) VUID-vkAllocateDescriptorSets-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAllocateDescriptorSets-pAllocateInfo-parameter) VUID-vkAllocateDescriptorSets-pAllocateInfo-parameter

 `pAllocateInfo` **must** be a valid pointer to a valid [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html) structure

* 
[](#VUID-vkAllocateDescriptorSets-pDescriptorSets-parameter) VUID-vkAllocateDescriptorSets-pDescriptorSets-parameter

 `pDescriptorSets` **must** be a valid pointer to an array of `pAllocateInfo->descriptorSetCount` [VkDescriptorSet](VkDescriptorSet.html) handles

* 
[](#VUID-vkAllocateDescriptorSets-device-queuecount) VUID-vkAllocateDescriptorSets-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkAllocateDescriptorSets-pAllocateInfo::descriptorSetCount-arraylength) VUID-vkAllocateDescriptorSets-pAllocateInfo::descriptorSetCount-arraylength

 `pAllocateInfo->descriptorSetCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FRAGMENTED_POOL](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSet](VkDescriptorSet.html), [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkAllocateDescriptorSets).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
