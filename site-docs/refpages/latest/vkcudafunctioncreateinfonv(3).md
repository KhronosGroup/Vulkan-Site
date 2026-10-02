# VkCudaFunctionCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCudaFunctionCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCudaFunctionCreateInfoNV - Structure specifying the parameters to create a CUDA Function

The `VkCudaFunctionCreateInfoNV` structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaFunctionCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkCudaModuleNV     module;
    const char*        pName;
} VkCudaFunctionCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`module` is the CUDA [VkCudaModuleNV](VkCudaModuleNV.html) module in which the
function resides.

* 
`pName` is a null-terminated UTF-8 string containing the name of the
shader entry point for this stage.

Valid Usage (Implicit)

* 
[](#VUID-VkCudaFunctionCreateInfoNV-sType-sType) VUID-VkCudaFunctionCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_FUNCTION_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkCudaFunctionCreateInfoNV-pNext-pNext) VUID-VkCudaFunctionCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaFunctionCreateInfoNV-module-parameter) VUID-VkCudaFunctionCreateInfoNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](VkCudaModuleNV.html) handle

* 
[](#VUID-VkCudaFunctionCreateInfoNV-pName-parameter) VUID-VkCudaFunctionCreateInfoNV-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCudaModuleNV](VkCudaModuleNV.html), [VkStructureType](VkStructureType.html), [vkCreateCudaFunctionNV](vkCreateCudaFunctionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCudaFunctionCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
