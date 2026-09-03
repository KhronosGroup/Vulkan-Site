# vkDestroyCudaModuleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyCudaModuleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyCudaModuleNV - Destroy a CUDA module

To destroy a CUDA shader module, call:

// Provided by VK_NV_cuda_kernel_launch
void vkDestroyCudaModuleNV(
    VkDevice                                    device,
    VkCudaModuleNV                              module,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader module.

* 
`module` is the handle of the CUDA module to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCudaModuleNV-device-parameter) VUID-vkDestroyCudaModuleNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyCudaModuleNV-module-parameter) VUID-vkDestroyCudaModuleNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](VkCudaModuleNV.html) handle

* 
[](#VUID-vkDestroyCudaModuleNV-pAllocator-parameter) VUID-vkDestroyCudaModuleNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyCudaModuleNV-module-parent) VUID-vkDestroyCudaModuleNV-module-parent

 `module` **must** have been created, allocated, or retrieved from `device`

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCudaModuleNV](VkCudaModuleNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyCudaModuleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
