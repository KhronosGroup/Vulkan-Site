# VkCudaModuleCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCudaModuleCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCudaModuleCreateInfoNV - Structure specifying the parameters to create a CUDA Module

The `VkCudaModuleCreateInfoNV` structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaModuleCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    size_t             dataSize;
    const void*        pData;
} VkCudaModuleCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` **may** be `NULL` or **may** be a pointer to a structure extending
this structure.

* 
`dataSize` is the length of the `pData` array.

* 
`pData` is a pointer to CUDA code

Valid Usage

* 
[](#VUID-VkCudaModuleCreateInfoNV-dataSize-09413) VUID-VkCudaModuleCreateInfoNV-dataSize-09413

`dataSize` **must** be the total size in bytes of the PTX files or
binary cache passed to `pData`

Valid Usage (Implicit)

* 
[](#VUID-VkCudaModuleCreateInfoNV-sType-sType) VUID-VkCudaModuleCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_MODULE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkCudaModuleCreateInfoNV-pNext-pNext) VUID-VkCudaModuleCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaModuleCreateInfoNV-pData-parameter) VUID-VkCudaModuleCreateInfoNV-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkCudaModuleCreateInfoNV-dataSize-arraylength) VUID-VkCudaModuleCreateInfoNV-dataSize-arraylength

 `dataSize` **must** be greater than `0`

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkStructureType](VkStructureType.html), [vkCreateCudaModuleNV](vkCreateCudaModuleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCudaModuleCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
