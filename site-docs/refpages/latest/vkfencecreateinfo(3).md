# VkFenceCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceCreateInfo - Structure specifying parameters of a newly created fence

The `VkFenceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkFenceCreateInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkFenceCreateFlags    flags;
} VkFenceCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkFenceCreateFlagBits](VkFenceCreateFlagBits.html) specifying the
initial state and behavior of the fence.

Valid Usage (Implicit)

* 
[](#VUID-VkFenceCreateInfo-sType-sType) VUID-VkFenceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkFenceCreateInfo-pNext-pNext) VUID-VkFenceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportFenceCreateInfo](VkExportFenceCreateInfo.html) or [VkExportFenceWin32HandleInfoKHR](VkExportFenceWin32HandleInfoKHR.html)

* 
[](#VUID-VkFenceCreateInfo-sType-unique) VUID-VkFenceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkFenceCreateInfo-flags-parameter) VUID-VkFenceCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkFenceCreateFlagBits](VkFenceCreateFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFenceCreateFlags](VkFenceCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateFence](vkCreateFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
