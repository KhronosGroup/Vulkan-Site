# VkSubmitFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubmitFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubmitFlags - Bitmask of VkSubmitFlagBits

// Provided by VK_VERSION_1_3
typedef VkFlags VkSubmitFlags;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSubmitFlags
typedef VkSubmitFlags VkSubmitFlagsKHR;

`VkSubmitFlags` is a bitmask type for setting a mask of zero or more
[VkSubmitFlagBits](VkSubmitFlagBits.html).

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkFlags`, [VkSubmitFlagBits](VkSubmitFlagBits.html), [VkSubmitInfo2](VkSubmitInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkSubmitFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
