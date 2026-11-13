# VkAccessFlagBits3KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccessFlagBits3KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccessFlagBits3KHR - Access flags for VkAccessFlags3KHR

Bits which **can** be set in the `srcAccessMask3` and `dstAccessMask3`
members of [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html), specifying access behavior,
are:

// Provided by VK_KHR_maintenance8
// Flag bits for VkAccessFlagBits3KHR
typedef VkFlags64 VkAccessFlagBits3KHR;
static const VkAccessFlagBits3KHR VK_ACCESS_3_NONE_KHR = 0ULL;

* 
[VK_ACCESS_3_NONE_KHR](#) specifies no additional accesses.

[VK_KHR_maintenance8](VK_KHR_maintenance8.html), [VkAccessFlags3KHR](VkAccessFlags3KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkAccessFlagBits3KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
