# PFN_vkVoidFunction(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkVoidFunction.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkVoidFunction - Placeholder function pointer type returned by queries

The definition of [PFN_vkVoidFunction](#) is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkVoidFunction)(void);

This type is returned from command function pointer queries, and **must** be
cast to an actual command function pointer before use.

[PFN_vkGetInstanceProcAddrLUNARG](PFN_vkGetInstanceProcAddrLUNARG.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [vkGetDeviceProcAddr](vkGetDeviceProcAddr.html), [vkGetInstanceProcAddr](vkGetInstanceProcAddr.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#PFN_vkVoidFunction).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
