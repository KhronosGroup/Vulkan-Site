# VkCuLaunchInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCuLaunchInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCuLaunchInfoNVX - Stub description of VkCuLaunchInfoNVX

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
typedef struct VkCuLaunchInfoNVX {
    VkStructureType        sType;
    const void*            pNext;
    VkCuFunctionNVX        function;
    uint32_t               gridDimX;
    uint32_t               gridDimY;
    uint32_t               gridDimZ;
    uint32_t               blockDimX;
    uint32_t               blockDimY;
    uint32_t               blockDimZ;
    uint32_t               sharedMemBytes;
    size_t                 paramCount;
    const void* const *    pParams;
    size_t                 extraCount;
    const void* const *    pExtras;
} VkCuLaunchInfoNVX;

Valid Usage (Implicit)

* 
[](#VUID-VkCuLaunchInfoNVX-sType-sType) VUID-VkCuLaunchInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CU_LAUNCH_INFO_NVX](VkStructureType.html)

* 
[](#VUID-VkCuLaunchInfoNVX-pNext-pNext) VUID-VkCuLaunchInfoNVX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCuLaunchInfoNVX-function-parameter) VUID-VkCuLaunchInfoNVX-function-parameter

 `function` **must** be a valid [VkCuFunctionNVX](VkCuFunctionNVX.html) handle

* 
[](#VUID-VkCuLaunchInfoNVX-pParams-parameter) VUID-VkCuLaunchInfoNVX-pParams-parameter

 If `paramCount` is not `0`, `pParams` **must** be a valid pointer to an array of `paramCount` bytes

* 
[](#VUID-VkCuLaunchInfoNVX-pExtras-parameter) VUID-VkCuLaunchInfoNVX-pExtras-parameter

 If `extraCount` is not `0`, `pExtras` **must** be a valid pointer to an array of `extraCount` bytes

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkCuFunctionNVX](VkCuFunctionNVX.html), [VkStructureType](VkStructureType.html), [vkCmdCuLaunchKernelNVX](vkCmdCuLaunchKernelNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkCuLaunchInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
