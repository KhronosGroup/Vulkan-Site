# vkCreateCudaModuleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateCudaModuleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateCudaModuleNV - Creates a new CUDA module object

To create a CUDA module, call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkCreateCudaModuleNV(
    VkDevice                                    device,
    const VkCudaModuleCreateInfoNV*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCudaModuleNV*                             pModule);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkCudaModuleCreateInfoNV](VkCudaModuleCreateInfoNV.html)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pModule` is a pointer to a [VkCudaModuleNV](VkCudaModuleNV.html) handle in which the
resulting CUDA module object is returned.

Once a CUDA module has been created, the application **may** create the
function entry point, which **must** refer to one function in the module.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCudaModuleNV-device-parameter) VUID-vkCreateCudaModuleNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateCudaModuleNV-pCreateInfo-parameter) VUID-vkCreateCudaModuleNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCudaModuleCreateInfoNV](VkCudaModuleCreateInfoNV.html) structure

* 
[](#VUID-vkCreateCudaModuleNV-pAllocator-parameter) VUID-vkCreateCudaModuleNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateCudaModuleNV-pModule-parameter) VUID-vkCreateCudaModuleNV-pModule-parameter

 `pModule` **must** be a valid pointer to a [VkCudaModuleNV](VkCudaModuleNV.html) handle

* 
[](#VUID-vkCreateCudaModuleNV-device-queuecount) VUID-vkCreateCudaModuleNV-device-queuecount

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

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCudaModuleCreateInfoNV](VkCudaModuleCreateInfoNV.html), [VkCudaModuleNV](VkCudaModuleNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCreateCudaModuleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
