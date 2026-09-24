# VkCuFunctionCreateInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCuFunctionCreateInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCuFunctionCreateInfoNVX - Stub description of VkCuFunctionCreateInfoNVX

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
typedef struct VkCuFunctionCreateInfoNVX {
    VkStructureType    sType;
    const void*        pNext;
    VkCuModuleNVX      module;
    const char*        pName;
} VkCuFunctionCreateInfoNVX;

Valid Usage (Implicit)

* 
[](#VUID-VkCuFunctionCreateInfoNVX-sType-sType) VUID-VkCuFunctionCreateInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CU_FUNCTION_CREATE_INFO_NVX](VkStructureType.html)

* 
[](#VUID-VkCuFunctionCreateInfoNVX-pNext-pNext) VUID-VkCuFunctionCreateInfoNVX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCuFunctionCreateInfoNVX-module-parameter) VUID-VkCuFunctionCreateInfoNVX-module-parameter

 `module` **must** be a valid [VkCuModuleNVX](VkCuModuleNVX.html) handle

* 
[](#VUID-VkCuFunctionCreateInfoNVX-pName-parameter) VUID-VkCuFunctionCreateInfoNVX-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkCuModuleNVX](VkCuModuleNVX.html), [VkStructureType](VkStructureType.html), [vkCreateCuFunctionNVX](vkCreateCuFunctionNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkCuFunctionCreateInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
