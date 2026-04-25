# vkCreateCudaFunctionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateCudaFunctionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateCudaFunctionNV - Creates a new CUDA function object

To create a CUDA function, call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkCreateCudaFunctionNV(
    VkDevice                                    device,
    const VkCudaFunctionCreateInfoNV*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCudaFunctionNV*                           pFunction);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkCudaFunctionCreateInfoNV](VkCudaFunctionCreateInfoNV.html)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pFunction` is a pointer to a [VkCudaFunctionNV](VkCudaFunctionNV.html) handle in which
the resulting CUDA function object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCudaFunctionNV-device-parameter) VUID-vkCreateCudaFunctionNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateCudaFunctionNV-pCreateInfo-parameter) VUID-vkCreateCudaFunctionNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCudaFunctionCreateInfoNV](VkCudaFunctionCreateInfoNV.html) structure

* 
[](#VUID-vkCreateCudaFunctionNV-pAllocator-parameter) VUID-vkCreateCudaFunctionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateCudaFunctionNV-pFunction-parameter) VUID-vkCreateCudaFunctionNV-pFunction-parameter

 `pFunction` **must** be a valid pointer to a [VkCudaFunctionNV](VkCudaFunctionNV.html) handle

* 
[](#VUID-vkCreateCudaFunctionNV-device-queuecount) VUID-vkCreateCudaFunctionNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCudaFunctionCreateInfoNV](VkCudaFunctionCreateInfoNV.html), [VkCudaFunctionNV](VkCudaFunctionNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCreateCudaFunctionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
