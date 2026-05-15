# VkDescriptorSet(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSet.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSet - Opaque handle to a descriptor set object

Descriptor sets are allocated from descriptor pool objects, and are
represented by `VkDescriptorSet` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorSet)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html), [VkCopyDescriptorSet](VkCopyDescriptorSet.html), [VkWriteDescriptorSet](VkWriteDescriptorSet.html), [vkAllocateDescriptorSets](vkAllocateDescriptorSets.html), [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), [vkFreeDescriptorSets](vkFreeDescriptorSets.html), [vkGetDescriptorSetHostMappingVALVE](vkGetDescriptorSetHostMappingVALVE.html), [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html), [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSet).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
