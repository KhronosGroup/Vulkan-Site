# VkBufferCopy2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCopy2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCopy2 - Structure specifying a buffer copy operation

The `VkBufferCopy2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkBufferCopy2 {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       srcOffset;
    VkDeviceSize       dstOffset;
    VkDeviceSize       size;
} VkBufferCopy2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkBufferCopy2
typedef VkBufferCopy2 VkBufferCopy2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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
[](#VUID-VkBufferCopy2-size-01988) VUID-VkBufferCopy2-size-01988

The `size` **must** be greater than `0`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCopy2-sType-sType) VUID-VkBufferCopy2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COPY_2](VkStructureType.html)

* 
[](#VUID-VkBufferCopy2-pNext-pNext) VUID-VkBufferCopy2-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCopyBufferInfo2](VkCopyBufferInfo2.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkBufferCopy2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
