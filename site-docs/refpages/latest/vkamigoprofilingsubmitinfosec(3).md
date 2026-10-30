# VkAmigoProfilingSubmitInfoSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAmigoProfilingSubmitInfoSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAmigoProfilingSubmitInfoSEC - Stub description of VkAmigoProfilingSubmitInfoSEC

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_SEC_amigo_profiling
typedef struct VkAmigoProfilingSubmitInfoSEC {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           firstDrawTimestamp;
    uint64_t           swapBufferTimestamp;
} VkAmigoProfilingSubmitInfoSEC;

Valid Usage (Implicit)

* 
[](#VUID-VkAmigoProfilingSubmitInfoSEC-sType-sType) VUID-VkAmigoProfilingSubmitInfoSEC-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_AMIGO_PROFILING_SUBMIT_INFO_SEC](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

[VK_SEC_amigo_profiling](VK_SEC_amigo_profiling.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkAmigoProfilingSubmitInfoSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
