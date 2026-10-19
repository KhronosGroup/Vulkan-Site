# VkSampler(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSampler.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSampler - Opaque handle to a sampler object

`VkSampler` objects represent the state of an image sampler which is
used by the implementation to read image data and apply filtering and other
transformations for the shader.

Samplers are represented by `VkSampler` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSampler)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorDataEXT](VkDescriptorDataEXT.html), [VkDescriptorImageInfo](VkDescriptorImageInfo.html), [VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html), [VkImageViewHandleInfoNVX](VkImageViewHandleInfoNVX.html), [VkSamplerCaptureDescriptorDataInfoEXT](VkSamplerCaptureDescriptorDataInfoEXT.html), [vkCreateSampler](vkCreateSampler.html), [vkDestroySampler](vkDestroySampler.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSampler).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
