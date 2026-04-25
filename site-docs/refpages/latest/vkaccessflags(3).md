# VkAccessFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccessFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccessFlags - Bitmask of VkAccessFlagBits

|  | This functionality is superseded by [VkAccessFlags2](../../../../spec/latest/chapters/synchronization.html#VkAccessFlags2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkAccessFlags;

`VkAccessFlags` is a bitmask type for setting a mask of zero or more
[VkAccessFlagBits](VkAccessFlagBits.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccessFlagBits](VkAccessFlagBits.html), [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html), `VkFlags`, [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkMemoryBarrier](VkMemoryBarrier.html), [VkSubpassDependency](VkSubpassDependency.html), [VkSubpassDependency2](VkSubpassDependency2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkAccessFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
