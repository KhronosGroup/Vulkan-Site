# VkDescriptorGetTensorInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorGetTensorInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorGetTensorInfoARM - Structure specifying parameters to get descriptor data for tensor views

The `VkDescriptorGetTensorInfoARM` is defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkDescriptorGetTensorInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkDescriptorGetTensorInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is a [VkTensorViewARM](VkTensorViewARM.html) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899) VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `tensorView` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-sType-sType) VUID-VkDescriptorGetTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_TENSOR_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter) VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter

 If `tensorView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `tensorView` **must** be a valid [VkTensorViewARM](VkTensorViewARM.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkStructureType](VkStructureType.html), [VkTensorViewARM](VkTensorViewARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorGetTensorInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
