# VkCudaModuleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCudaModuleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCudaModuleNV - Opaque handle to a CUDA module object

CUDA modules **must** contain some kernel code and **must** expose at least one
function entry point.

CUDA modules are represented by `VkCudaModuleNV` handles:

// Provided by VK_NV_cuda_kernel_launch
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCudaModuleNV)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCudaFunctionCreateInfoNV](VkCudaFunctionCreateInfoNV.html), [vkCreateCudaModuleNV](vkCreateCudaModuleNV.html), [vkDestroyCudaModuleNV](vkDestroyCudaModuleNV.html), [vkGetCudaModuleCacheNV](vkGetCudaModuleCacheNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCudaModuleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
