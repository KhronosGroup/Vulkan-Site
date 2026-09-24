# VkExternalTensorPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalTensorPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalTensorPropertiesARM - Structure specifying supported external handle capabilities for a tensor

The `VkExternalTensorPropertiesARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkExternalTensorPropertiesARM {
    VkStructureType               sType;
    const void*                   pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalTensorPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](VkExternalMemoryProperties.html)
structure specifying various capabilities of the external handle type
when used with the specified tensor creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalTensorPropertiesARM-sType-sType) VUID-VkExternalTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_TENSOR_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkExternalTensorPropertiesARM-pNext-pNext) VUID-VkExternalTensorPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkExternalTensorPropertiesARM-externalMemoryProperties-parameter) VUID-VkExternalTensorPropertiesARM-externalMemoryProperties-parameter

 `externalMemoryProperties` **must** be a valid [VkExternalMemoryProperties](VkExternalMemoryProperties.html) structure

[VK_ARM_tensors](VK_ARM_tensors.html), [VkExternalMemoryProperties](VkExternalMemoryProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalTensorPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
