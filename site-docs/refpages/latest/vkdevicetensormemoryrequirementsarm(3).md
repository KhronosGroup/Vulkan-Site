# VkDeviceTensorMemoryRequirementsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceTensorMemoryRequirementsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceTensorMemoryRequirementsARM - (None)

The `VkDeviceTensorMemoryRequirementsARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkDeviceTensorMemoryRequirementsARM {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkTensorCreateInfoARM*    pCreateInfo;
} VkDeviceTensorMemoryRequirementsARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)
structure containing parameters affecting the creation of the tensor to
query.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-sType-sType) VUID-VkDeviceTensorMemoryRequirementsARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_TENSOR_MEMORY_REQUIREMENTS_ARM](VkStructureType.html)

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-pNext-pNext) VUID-VkDeviceTensorMemoryRequirementsARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-pCreateInfo-parameter) VUID-VkDeviceTensorMemoryRequirementsARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html) structure

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html), [vkGetDeviceTensorMemoryRequirementsARM](vkGetDeviceTensorMemoryRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDeviceTensorMemoryRequirementsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
