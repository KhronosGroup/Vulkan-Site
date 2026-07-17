# VkAccessFlags2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccessFlags2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccessFlags2 - 64-bit mask of access flags

`VkAccessFlags2` is a bitmask type for setting a mask of zero or more
[VkAccessFlagBits2](VkAccessFlagBits2.html):

// Provided by VK_VERSION_1_3
typedef VkFlags64 VkAccessFlags2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkAccessFlags2
typedef VkAccessFlags2 VkAccessFlags2KHR;

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAccessFlagBits2](VkAccessFlagBits2.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), `VkFlags64`, [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkMemoryBarrier2](VkMemoryBarrier2.html), [VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html), [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkAccessFlags2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
