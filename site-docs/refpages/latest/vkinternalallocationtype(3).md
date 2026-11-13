# VkInternalAllocationType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInternalAllocationType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInternalAllocationType - Allocation type

The `allocationType` parameter to the `pfnInternalAllocation` and
`pfnInternalFree` functions **may** be one of the following values:

// Provided by VK_VERSION_1_0
typedef enum VkInternalAllocationType {
    VK_INTERNAL_ALLOCATION_TYPE_EXECUTABLE = 0,
} VkInternalAllocationType;

* 
[VK_INTERNAL_ALLOCATION_TYPE_EXECUTABLE](#) specifies that the
allocation is intended for execution by the host.

[PFN_vkInternalAllocationNotification](PFN_vkInternalAllocationNotification.html), [PFN_vkInternalFreeNotification](PFN_vkInternalFreeNotification.html), [VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkInternalAllocationType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
