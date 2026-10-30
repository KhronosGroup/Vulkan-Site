# VkTensorMemoryRequirementsInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorMemoryRequirementsInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorMemoryRequirementsInfoARM - Structure specifying memory requirements

The `VkTensorMemoryRequirementsInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorMemoryRequirementsInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkTensorMemoryRequirementsInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the tensor to query.

Valid Usage (Implicit)

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-sType-sType) VUID-VkTensorMemoryRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_MEMORY_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-pNext-pNext) VUID-VkTensorMemoryRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-tensor-parameter) VUID-VkTensorMemoryRequirementsInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [vkGetTensorMemoryRequirementsARM](vkGetTensorMemoryRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorMemoryRequirementsInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
