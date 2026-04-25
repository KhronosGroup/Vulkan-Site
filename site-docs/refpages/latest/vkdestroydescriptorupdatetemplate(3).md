# vkDestroyDescriptorUpdateTemplate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDescriptorUpdateTemplate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDescriptorUpdateTemplate - Destroy a descriptor update template object

To destroy a descriptor update template, call:

// Provided by VK_VERSION_1_1
void vkDestroyDescriptorUpdateTemplate(
    VkDevice                                    device,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkDestroyDescriptorUpdateTemplate
void vkDestroyDescriptorUpdateTemplateKHR(
    VkDevice                                    device,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that has been used to create the
descriptor update template

* 
`descriptorUpdateTemplate` is the descriptor update template to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00356) VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00356

If `VkAllocationCallbacks` were provided when
`descriptorUpdateTemplate` was created, a compatible set of
callbacks **must** be provided here

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00357) VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00357

If no `VkAllocationCallbacks` were provided when
`descriptorUpdateTemplate` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-device-parameter) VUID-vkDestroyDescriptorUpdateTemplate-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parameter) VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parameter

 If `descriptorUpdateTemplate` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) handle

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-pAllocator-parameter) VUID-vkDestroyDescriptorUpdateTemplate-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parent) VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parent

 If `descriptorUpdateTemplate` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorUpdateTemplate` **must** be externally synchronized

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkDestroyDescriptorUpdateTemplate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
