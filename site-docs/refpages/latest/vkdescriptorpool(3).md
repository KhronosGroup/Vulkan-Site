# VkDescriptorPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorPool - Opaque handle to a descriptor pool object

A *descriptor pool* maintains a pool of descriptors, from which descriptor
sets are allocated.
Descriptor pools are externally synchronized, meaning that the application
**must** not allocate and/or free descriptor sets from the same pool in
multiple threads simultaneously.

Descriptor pools are represented by `VkDescriptorPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorPool)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html), [vkCreateDescriptorPool](vkCreateDescriptorPool.html), [vkDestroyDescriptorPool](vkDestroyDescriptorPool.html), [vkFreeDescriptorSets](vkFreeDescriptorSets.html), [vkResetDescriptorPool](vkResetDescriptorPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
