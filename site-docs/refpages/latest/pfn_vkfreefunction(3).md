# PFN_vkFreeFunction(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkFreeFunction.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkFreeFunction - Application-defined memory free function

The type of `pfnFree` is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkFreeFunction)(
    void*                                       pUserData,
    void*                                       pMemory);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](VkAllocationCallbacks.html)::`pUserData` in the allocator specified
by the application.

* 
`pMemory` is the allocation to be freed.

`pMemory` **may** be `NULL`, which the callback **must** handle safely.
If `pMemory` is non-`NULL`, it **must** be a pointer previously allocated
by `pfnAllocation` or `pfnReallocation`.
The application **should** free this memory.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#PFN_vkFreeFunction).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
