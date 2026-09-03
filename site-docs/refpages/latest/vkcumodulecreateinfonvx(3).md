# VkCuModuleCreateInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCuModuleCreateInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCuModuleCreateInfoNVX - Stub description of VkCuModuleCreateInfoNVX

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
typedef struct VkCuModuleCreateInfoNVX {
    VkStructureType    sType;
    const void*        pNext;
    size_t             dataSize;
    const void*        pData;
} VkCuModuleCreateInfoNVX;

Valid Usage (Implicit)

* 
[](#VUID-VkCuModuleCreateInfoNVX-sType-sType) VUID-VkCuModuleCreateInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CU_MODULE_CREATE_INFO_NVX](VkStructureType.html)

* 
[](#VUID-VkCuModuleCreateInfoNVX-pNext-pNext) VUID-VkCuModuleCreateInfoNVX-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkCuModuleTexturingModeCreateInfoNVX](VkCuModuleTexturingModeCreateInfoNVX.html)

* 
[](#VUID-VkCuModuleCreateInfoNVX-sType-unique) VUID-VkCuModuleCreateInfoNVX-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCuModuleCreateInfoNVX-pData-parameter) VUID-VkCuModuleCreateInfoNVX-pData-parameter

 If `dataSize` is not `0`, `pData` **must** be a valid pointer to an array of `dataSize` bytes

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkStructureType](VkStructureType.html), [vkCreateCuModuleNVX](vkCreateCuModuleNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkCuModuleCreateInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
