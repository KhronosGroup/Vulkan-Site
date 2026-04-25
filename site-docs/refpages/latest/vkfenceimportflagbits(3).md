# VkFenceImportFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceImportFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceImportFlagBits - Bitmask specifying additional parameters of fence payload import

Bits which **can** be set in

* 
[VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html)::`flags`

* 
[VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html)::`flags`

specifying additional parameters of a fence import operation are:

// Provided by VK_VERSION_1_1
typedef enum VkFenceImportFlagBits {
    VK_FENCE_IMPORT_TEMPORARY_BIT = 0x00000001,
  // Provided by VK_KHR_external_fence
    VK_FENCE_IMPORT_TEMPORARY_BIT_KHR = VK_FENCE_IMPORT_TEMPORARY_BIT,
} VkFenceImportFlagBits;

// Provided by VK_KHR_external_fence
// Equivalent to VkFenceImportFlagBits
typedef VkFenceImportFlagBits VkFenceImportFlagBitsKHR;

* 
[VK_FENCE_IMPORT_TEMPORARY_BIT](#) specifies that the fence payload
will be imported only temporarily, as described in
[Importing Fence Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing),
regardless of the permanence of `handleType`.

[VK_KHR_external_fence](VK_KHR_external_fence.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFenceImportFlags](VkFenceImportFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceImportFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
