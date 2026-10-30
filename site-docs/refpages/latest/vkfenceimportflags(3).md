# VkFenceImportFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceImportFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceImportFlags - Bitmask of VkFenceImportFlagBits

// Provided by VK_VERSION_1_1
typedef VkFlags VkFenceImportFlags;

// Provided by VK_KHR_external_fence
// Equivalent to VkFenceImportFlags
typedef VkFenceImportFlags VkFenceImportFlagsKHR;

`VkFenceImportFlags` is a bitmask type for setting a mask of zero or
more [VkFenceImportFlagBits](VkFenceImportFlagBits.html).

[VK_KHR_external_fence](VK_KHR_external_fence.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFenceImportFlagBits](VkFenceImportFlagBits.html), `VkFlags`, [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html), [VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceImportFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
