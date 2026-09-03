# vkGetTensorMemoryRequirementsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetTensorMemoryRequirementsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetTensorMemoryRequirementsARM - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for a tensor resource, call:

// Provided by VK_ARM_tensors
void vkGetTensorMemoryRequirementsARM(
    VkDevice                                    device,
    const VkTensorMemoryRequirementsInfoARM*    pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the tensor.

* 
`pInfo` is a pointer to a [VkTensorMemoryRequirementsInfoARM](VkTensorMemoryRequirementsInfoARM.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the tensor object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-device-parameter) VUID-vkGetTensorMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-pInfo-parameter) VUID-vkGetTensorMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorMemoryRequirementsInfoARM](VkTensorMemoryRequirementsInfoARM.html) structure

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetTensorMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_ARM_tensors](VK_ARM_tensors.html), [VkDevice](VkDevice.html), [VkMemoryRequirements2](VkMemoryRequirements2.html), [VkTensorMemoryRequirementsInfoARM](VkTensorMemoryRequirementsInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetTensorMemoryRequirementsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
