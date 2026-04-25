# VkProtectedSubmitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkProtectedSubmitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkProtectedSubmitInfo - Structure indicating whether the submission is protected

If the `pNext` chain of [VkSubmitInfo](VkSubmitInfo.html) includes a
`VkProtectedSubmitInfo` structure, then the structure indicates whether
the batch is protected.
The `VkProtectedSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkProtectedSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           protectedSubmit;
} VkProtectedSubmitInfo;

* 
`protectedSubmit` specifies whether the batch is protected.
If `protectedSubmit` is [VK_TRUE](VK_TRUE.html), the batch is protected.
If `protectedSubmit` is [VK_FALSE](VK_FALSE.html), the batch is unprotected.
If the `VkSubmitInfo`::`pNext` chain does not include this
structure, the batch is unprotected.

Valid Usage (Implicit)

* 
[](#VUID-VkProtectedSubmitInfo-sType-sType) VUID-VkProtectedSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PROTECTED_SUBMIT_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

[VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkProtectedSubmitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
