# VkTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorARM - Opaque handle to a tensor object

Tensors are similar to [images](../../../../spec/latest/chapters/images.html#images), in that they have
multi-dimensional access as documented in the [Tensor Operations](../../../../spec/latest/chapters/VK_ARM_tensors/tensorops.html#tensors) chapter, but a
tensor’s dimensions are not predefined.
A tensor can have an arbitrary number of dimensions, up to
[`maxTensorDimensionCount`](../../../../spec/latest/chapters/limits.html#limits-maxTensorDimensionCount), with one
index per dimension used to access the tensor.

Tensors **can** be used by binding them to pipelines via descriptor sets, or by
directly specifying them as parameters to certain commands.

Tensors are represented by `VkTensorARM` handles:

// Provided by VK_EXT_descriptor_heap, VK_ARM_tensors
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkTensorARM)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html), [VkCopyTensorInfoARM](VkCopyTensorInfoARM.html), [VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html), [VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html), [VkTensorCaptureDescriptorDataInfoARM](VkTensorCaptureDescriptorDataInfoARM.html), [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html), [VkTensorMemoryRequirementsInfoARM](VkTensorMemoryRequirementsInfoARM.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html), [vkCreateTensorARM](vkCreateTensorARM.html), [vkDestroyTensorARM](vkDestroyTensorARM.html), [vkGetTensorOpaqueCaptureDataARM](vkGetTensorOpaqueCaptureDataARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
