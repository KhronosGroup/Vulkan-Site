# VkSemaphoreImportFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreImportFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreImportFlagBits - Bitmask specifying additional parameters of semaphore payload import

Bits which **can** be set in

* 
[VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html)::`flags`

* 
[VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html)::`flags`

* 
[VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html)::`flags`

specifying additional parameters of a semaphore import operation are:

// Provided by VK_VERSION_1_1
typedef enum VkSemaphoreImportFlagBits {
    VK_SEMAPHORE_IMPORT_TEMPORARY_BIT = 0x00000001,
  // Provided by VK_KHR_external_semaphore
    VK_SEMAPHORE_IMPORT_TEMPORARY_BIT_KHR = VK_SEMAPHORE_IMPORT_TEMPORARY_BIT,
} VkSemaphoreImportFlagBits;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkSemaphoreImportFlagBits
typedef VkSemaphoreImportFlagBits VkSemaphoreImportFlagBitsKHR;

These bits have the following meanings:

* 
[VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](#) specifies that the semaphore
payload will be imported only temporarily, as described in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing),
regardless of the permanence of `handleType`.

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSemaphoreImportFlags](VkSemaphoreImportFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreImportFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
