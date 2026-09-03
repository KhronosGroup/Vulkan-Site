# VkBufferCopy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCopy.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCopy - Structure specifying a buffer copy operation

The `VkBufferCopy` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBufferCopy {
    VkDeviceSize    srcOffset;
    VkDeviceSize    dstOffset;
    VkDeviceSize    size;
} VkBufferCopy;

* 
`srcOffset` is the starting offset in bytes from the start of
`srcBuffer`.

* 
`dstOffset` is the starting offset in bytes from the start of
`dstBuffer`.

* 
`size` is the number of bytes to copy.

Valid Usage

* 
[](#VUID-VkBufferCopy-size-01988) VUID-VkBufferCopy-size-01988

The `size` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [vkCmdCopyBuffer](vkCmdCopyBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkBufferCopy).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
