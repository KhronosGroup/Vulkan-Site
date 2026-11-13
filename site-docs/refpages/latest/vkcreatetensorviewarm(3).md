# vkCreateTensorViewARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateTensorViewARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateTensorViewARM - Create an tensor view from an existing tensor

To create a tensor view, call:

// Provided by VK_ARM_tensors
VkResult vkCreateTensorViewARM(
    VkDevice                                    device,
    const VkTensorViewCreateInfoARM*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkTensorViewARM*                            pView);

* 
`device` is the logical device that creates the tensor view.

* 
`pCreateInfo` is a pointer to an instance of the
`VkTensorViewCreateInfoARM` structure containing parameters to be
used to create the tensor view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkTensorViewARM](VkTensorViewARM.html) handle in which the
resulting tensor view object is returned.

Some of the tensor creation parameters are inherited by the view.
In particular, other than format, the tensor view creation inherits all
other parameters from the tensor.

The remaining parameters are contained in `pCreateInfo`.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateTensorViewARM-device-parameter) VUID-vkCreateTensorViewARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateTensorViewARM-pCreateInfo-parameter) VUID-vkCreateTensorViewARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html) structure

* 
[](#VUID-vkCreateTensorViewARM-pAllocator-parameter) VUID-vkCreateTensorViewARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateTensorViewARM-pView-parameter) VUID-vkCreateTensorViewARM-pView-parameter

 `pView` **must** be a valid pointer to a [VkTensorViewARM](VkTensorViewARM.html) handle

* 
[](#VUID-vkCreateTensorViewARM-device-queuecount) VUID-vkCreateTensorViewARM-device-queuecount

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

[VK_ARM_tensors](VK_ARM_tensors.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkTensorViewARM](VkTensorViewARM.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateTensorViewARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
