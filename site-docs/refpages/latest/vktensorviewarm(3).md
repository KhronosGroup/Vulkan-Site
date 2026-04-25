# VkTensorViewARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorViewARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorViewARM - Opaque handle to an tensor view object

Tensor objects are not directly accessed by pipelines for reading or writing
tensor data.
Instead, *tensor views* representing the tensor subresources and containing
additional metadata are used for that purpose.
Views **must** be created on tensors of compatible types.

Tensor views are represented by `VkTensorViewARM` handles:

// Provided by VK_ARM_tensors
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkTensorViewARM)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VkDescriptorGetTensorInfoARM](VkDescriptorGetTensorInfoARM.html), [VkTensorViewCaptureDescriptorDataInfoARM](VkTensorViewCaptureDescriptorDataInfoARM.html), [VkWriteDescriptorSetTensorARM](VkWriteDescriptorSetTensorARM.html), [vkCreateTensorViewARM](vkCreateTensorViewARM.html), [vkDestroyTensorViewARM](vkDestroyTensorViewARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorViewARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
