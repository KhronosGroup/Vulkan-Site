# VkCudaFunctionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCudaFunctionNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCudaFunctionNV - Opaque handle to a CUDA function object

CUDA functions are represented by `VkCudaFunctionNV` handles.
Handles to `*global*` functions **may** then be used to issue a kernel launch
(i.e. dispatch) from a commandbuffer.
See [Dispatching Command for CUDA PTX kernel](../../../../spec/latest/chapters/dispatch.html#cudadispatch).

// Provided by VK_NV_cuda_kernel_launch
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCudaFunctionNV)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCudaLaunchInfoNV](VkCudaLaunchInfoNV.html), [vkCreateCudaFunctionNV](vkCreateCudaFunctionNV.html), [vkDestroyCudaFunctionNV](vkDestroyCudaFunctionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCudaFunctionNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
