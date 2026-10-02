# vkCreateDescriptorUpdateTemplate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDescriptorUpdateTemplate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDescriptorUpdateTemplate - Create a new descriptor update template

Updating a large `VkDescriptorSet` array **can** be an expensive operation
since an application **must** specify one [VkWriteDescriptorSet](VkWriteDescriptorSet.html) structure
for each descriptor or descriptor array to update, each of which
re-specifies the same state when updating the same descriptor in multiple
descriptor sets.
For cases when an application wishes to update the same set of descriptors
in multiple descriptor sets allocated using the same
`VkDescriptorSetLayout`, [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html) **can** be
used as a replacement for [vkUpdateDescriptorSets](vkUpdateDescriptorSets.html).

`VkDescriptorUpdateTemplate` allows implementations to convert a set of
descriptor update operations on a single descriptor set to an internal
format.
In conjunction with
[vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html) or
[vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html), this **can** be more efficient
compared to calling
[vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html) or
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html).
The descriptors themselves are not specified in the
`VkDescriptorUpdateTemplate`, rather, offsets into an application
provided pointer to host memory are specified, which are combined with a
pointer passed to
[vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html) or
[vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html).
This allows large batches of updates to be executed without having to
convert application data structures into a strictly-defined Vulkan data
structure.

To create a descriptor update template, call:

// Provided by VK_VERSION_1_1
VkResult vkCreateDescriptorUpdateTemplate(
    VkDevice                                    device,
    const VkDescriptorUpdateTemplateCreateInfo* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorUpdateTemplate*                 pDescriptorUpdateTemplate);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkCreateDescriptorUpdateTemplate
VkResult vkCreateDescriptorUpdateTemplateKHR(
    VkDevice                                    device,
    const VkDescriptorUpdateTemplateCreateInfo* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorUpdateTemplate*                 pDescriptorUpdateTemplate);

* 
`device` is the logical device that creates the descriptor update
template.

* 
`pCreateInfo` is a pointer to a
    [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html) structure specifying the set
    of descriptors to update with a single call to
[vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html) or
    [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html).

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pDescriptorUpdateTemplate` is a pointer to a
`VkDescriptorUpdateTemplate` handle in which the resulting
descriptor update template object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-device-parameter) VUID-vkCreateDescriptorUpdateTemplate-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pCreateInfo-parameter) VUID-vkCreateDescriptorUpdateTemplate-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html) structure

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pAllocator-parameter) VUID-vkCreateDescriptorUpdateTemplate-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pDescriptorUpdateTemplate-parameter) VUID-vkCreateDescriptorUpdateTemplate-pDescriptorUpdateTemplate-parameter

 `pDescriptorUpdateTemplate` **must** be a valid pointer to a [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) handle

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-device-queuecount) VUID-vkCreateDescriptorUpdateTemplate-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCreateDescriptorUpdateTemplate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
