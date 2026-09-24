# vkGetDeviceTensorMemoryRequirementsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceTensorMemoryRequirementsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceTensorMemoryRequirementsARM - Returns the memory requirements for specified tensor creation infos

To determine the memory requirements for a tensor resource without creating
an object, call:

// Provided by VK_ARM_tensors
void vkGetDeviceTensorMemoryRequirementsARM(
    VkDevice                                    device,
    const VkDeviceTensorMemoryRequirementsARM*  pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the tensor.

* 
`pInfo` is a pointer to a [VkDeviceTensorMemoryRequirementsARM](VkDeviceTensorMemoryRequirementsARM.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the tensor object are
returned.

Valid Usage

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-tensors-09831) VUID-vkGetDeviceTensorMemoryRequirementsARM-tensors-09831

The [`tensors`](../../../../spec/latest/chapters/features.html#features-tensors) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-device-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-pInfo-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceTensorMemoryRequirementsARM](VkDeviceTensorMemoryRequirementsARM.html) structure

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_ARM_tensors](VK_ARM_tensors.html), [VkDevice](VkDevice.html), [VkDeviceTensorMemoryRequirementsARM](VkDeviceTensorMemoryRequirementsARM.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetDeviceTensorMemoryRequirementsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
