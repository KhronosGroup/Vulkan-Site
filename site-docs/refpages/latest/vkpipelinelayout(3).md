# VkPipelineLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineLayout - Opaque handle to a pipeline layout object

Access to descriptor sets from a pipeline is accomplished through a
*pipeline layout*.
Zero or more descriptor set layouts and zero or more push constant ranges
are combined to form a pipeline layout object describing the complete set of
resources that **can** be accessed by a pipeline.
The pipeline layout represents a sequence of descriptor sets with each
having a specific layout.
This sequence of layouts is used to determine the interface between shader
stages and shader resources.
Each pipeline is created using a pipeline layout.

Pipeline layout objects are represented by `VkPipelineLayout` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineLayout)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindDescriptorBufferEmbeddedSamplersInfoEXT](VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html), [VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html), [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html), [VkPushConstantsInfo](VkPushConstantsInfo.html), [VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html), [VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html), [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](vkCmdBindDescriptorBufferEmbeddedSamplersEXT.html), [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), [vkCmdPushConstants](vkCmdPushConstants.html), [vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html), [vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html), [vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html), [vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html), [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), [vkCreatePipelineLayout](vkCreatePipelineLayout.html), [vkDestroyPipelineLayout](vkDestroyPipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPipelineLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
