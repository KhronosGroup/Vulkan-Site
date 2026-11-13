# VkDescriptorUpdateTemplate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorUpdateTemplate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorUpdateTemplate - Opaque handle to a descriptor update template

A descriptor update template specifies a mapping from descriptor update
information in host memory to descriptors in a descriptor set.
It is designed to avoid passing redundant information to the driver when
frequently updating the same set of descriptors in descriptor sets.

Descriptor update template objects are represented by
`VkDescriptorUpdateTemplate` handles:

// Provided by VK_VERSION_1_1
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorUpdateTemplate)

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplate
typedef VkDescriptorUpdateTemplate VkDescriptorUpdateTemplateKHR;

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html), [vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html), [vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html), [vkDestroyDescriptorUpdateTemplate](vkDestroyDescriptorUpdateTemplate.html), [vkDestroyDescriptorUpdateTemplate](vkDestroyDescriptorUpdateTemplate.html), [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html), [vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorUpdateTemplate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
