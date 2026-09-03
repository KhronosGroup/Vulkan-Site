# vkDestroyDescriptorSetLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDescriptorSetLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDescriptorSetLayout - Destroy a descriptor set layout object

To destroy a descriptor set layout, call:

// Provided by VK_VERSION_1_0
void vkDestroyDescriptorSetLayout(
    VkDevice                                    device,
    VkDescriptorSetLayout                       descriptorSetLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the descriptor set
layout.

* 
`descriptorSetLayout` is the descriptor set layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00284) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00284

If `VkAllocationCallbacks` were provided when
`descriptorSetLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00285) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00285

If no `VkAllocationCallbacks` were provided when
`descriptorSetLayout` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorSetLayout-device-parameter) VUID-vkDestroyDescriptorSetLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parameter) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parameter

 If `descriptorSetLayout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `descriptorSetLayout` **must** be a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle

* 
[](#VUID-vkDestroyDescriptorSetLayout-pAllocator-parameter) VUID-vkDestroyDescriptorSetLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parent) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parent

 If `descriptorSetLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorSetLayout` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkDestroyDescriptorSetLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
