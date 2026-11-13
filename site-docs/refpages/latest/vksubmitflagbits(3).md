# VkSubmitFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubmitFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubmitFlagBits - Bitmask specifying behavior of a submission

Bits which **can** be set in [VkSubmitInfo2](VkSubmitInfo2.html)::`flags`, specifying
submission behavior, are:

// Provided by VK_VERSION_1_3
typedef enum VkSubmitFlagBits {
    VK_SUBMIT_PROTECTED_BIT = 0x00000001,
  // Provided by VK_KHR_synchronization2
    VK_SUBMIT_PROTECTED_BIT_KHR = VK_SUBMIT_PROTECTED_BIT,
} VkSubmitFlagBits;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSubmitFlagBits
typedef VkSubmitFlagBits VkSubmitFlagBitsKHR;

* 
[VK_SUBMIT_PROTECTED_BIT](#) specifies that this batch is a protected
submission.

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkSubmitFlags](VkSubmitFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkSubmitFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
