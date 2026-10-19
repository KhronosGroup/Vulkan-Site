# VkDescriptorSetLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayout - Opaque handle to a descriptor set layout object

A descriptor set layout object is defined by an array of zero or more
descriptor bindings.
Each individual descriptor binding is specified by a descriptor type, a
count (array size) of the number of descriptors in the binding, a set of
shader stages that **can** access the binding, and (if using immutable
samplers) an array of sampler descriptors.

Descriptor set layout objects are represented by `VkDescriptorSetLayout`
handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorSetLayout)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html), [VkDescriptorSetBindingReferenceVALVE](VkDescriptorSetBindingReferenceVALVE.html), [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html), [VkIndirectExecutionSetShaderLayoutInfoEXT](VkIndirectExecutionSetShaderLayoutInfoEXT.html), [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html), [vkCreateDescriptorSetLayout](vkCreateDescriptorSetLayout.html), [vkDestroyDescriptorSetLayout](vkDestroyDescriptorSetLayout.html), [vkGetDescriptorSetLayoutBindingOffsetEXT](vkGetDescriptorSetLayoutBindingOffsetEXT.html), [vkGetDescriptorSetLayoutSizeEXT](vkGetDescriptorSetLayoutSizeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
