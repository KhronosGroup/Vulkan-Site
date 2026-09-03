# VkSemaphoreImportFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreImportFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreImportFlags - Bitmask of VkSemaphoreImportFlagBits

// Provided by VK_VERSION_1_1
typedef VkFlags VkSemaphoreImportFlags;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkSemaphoreImportFlags
typedef VkSemaphoreImportFlags VkSemaphoreImportFlagsKHR;

`VkSemaphoreImportFlags` is a bitmask type for setting a mask of zero or
more [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html).

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkFlags`, [VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html), [VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html), [VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html), [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreImportFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
