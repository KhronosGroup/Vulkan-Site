# vkCreateTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateTensorARM - Create a new tensor object

To create tensors, call:

// Provided by VK_ARM_tensors
VkResult vkCreateTensorARM(
    VkDevice                                    device,
    const VkTensorCreateInfoARM*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkTensorARM*                                pTensor);

* 
`device` is the logical device that creates the tensor.

* 
`pCreateInfo` is a pointer to a [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)
structure containing parameters to be used to create the tensor.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pTensor` is a pointer to a [VkTensorARM](VkTensorARM.html) handle in which the
resulting tensor object is returned.

Valid Usage

* 
[](#VUID-vkCreateTensorARM-tensors-09832) VUID-vkCreateTensorARM-tensors-09832

The [`tensors`](../../../../spec/latest/chapters/features.html#features-tensors) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateTensorARM-device-parameter) VUID-vkCreateTensorARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateTensorARM-pCreateInfo-parameter) VUID-vkCreateTensorARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html) structure

* 
[](#VUID-vkCreateTensorARM-pAllocator-parameter) VUID-vkCreateTensorARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateTensorARM-pTensor-parameter) VUID-vkCreateTensorARM-pTensor-parameter

 `pTensor` **must** be a valid pointer to a [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-vkCreateTensorARM-device-queuecount) VUID-vkCreateTensorARM-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkTensorARM](VkTensorARM.html), [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
