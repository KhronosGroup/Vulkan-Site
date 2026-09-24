# VkCuModuleTexturingModeCreateInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCuModuleTexturingModeCreateInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCuModuleTexturingModeCreateInfoNVX - Stub description of VkCuModuleTexturingModeCreateInfoNVX

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
typedef struct VkCuModuleTexturingModeCreateInfoNVX {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           use64bitTexturing;
} VkCuModuleTexturingModeCreateInfoNVX;

Valid Usage (Implicit)

* 
[](#VUID-VkCuModuleTexturingModeCreateInfoNVX-sType-sType) VUID-VkCuModuleTexturingModeCreateInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CU_MODULE_TEXTURING_MODE_CREATE_INFO_NVX](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCuModuleCreateInfoNVX](VkCuModuleCreateInfoNVX.html)

[VK_NVX_binary_import](VK_NVX_binary_import.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkCuModuleTexturingModeCreateInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
