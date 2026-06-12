# VkWriteDescriptorSetTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteDescriptorSetTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteDescriptorSetTensorARM - Structure specifying descriptor tensor info

The `VkWriteDescriptorSetTensorARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkWriteDescriptorSetTensorARM {
    VkStructureType           sType;
    const void*               pNext;
    uint32_t                  tensorViewCount;
    const VkTensorViewARM*    pTensorViews;
} VkWriteDescriptorSetTensorARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorViewCount` is the number of elements in `pTensorViews`.

* 
`pTensorViews` are the tensor views that will be used to update the
descriptor set.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetTensorARM-nullDescriptor-09898) VUID-VkWriteDescriptorSetTensorARM-nullDescriptor-09898

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, each element of `pTensorViews` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetTensorARM-sType-sType) VUID-VkWriteDescriptorSetTensorARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_TENSOR_ARM](VkStructureType.html)

* 
[](#VUID-VkWriteDescriptorSetTensorARM-pTensorViews-parameter) VUID-VkWriteDescriptorSetTensorARM-pTensorViews-parameter

 `pTensorViews` **must** be a valid pointer to an array of `tensorViewCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkTensorViewARM](VkTensorViewARM.html) handles

* 
[](#VUID-VkWriteDescriptorSetTensorARM-tensorViewCount-arraylength) VUID-VkWriteDescriptorSetTensorARM-tensorViewCount-arraylength

 `tensorViewCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorViewARM](VkTensorViewARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkWriteDescriptorSetTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
