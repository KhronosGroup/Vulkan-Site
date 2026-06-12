# vkDestroyCudaFunctionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyCudaFunctionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyCudaFunctionNV - Destroy a CUDA function

To destroy a CUDA function handle, call:

// Provided by VK_NV_cuda_kernel_launch
void vkDestroyCudaFunctionNV(
    VkDevice                                    device,
    VkCudaFunctionNV                            function,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the Function.

* 
`function` is the handle of the CUDA function to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCudaFunctionNV-device-parameter) VUID-vkDestroyCudaFunctionNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyCudaFunctionNV-function-parameter) VUID-vkDestroyCudaFunctionNV-function-parameter

 `function` **must** be a valid [VkCudaFunctionNV](VkCudaFunctionNV.html) handle

* 
[](#VUID-vkDestroyCudaFunctionNV-pAllocator-parameter) VUID-vkDestroyCudaFunctionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyCudaFunctionNV-function-parent) VUID-vkDestroyCudaFunctionNV-function-parent

 `function` **must** have been created, allocated, or retrieved from `device`

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCudaFunctionNV](VkCudaFunctionNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyCudaFunctionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
