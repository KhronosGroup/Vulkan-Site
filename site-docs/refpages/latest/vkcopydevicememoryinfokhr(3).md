# VkCopyDeviceMemoryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyDeviceMemoryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyDeviceMemoryInfoKHR - Structure specifying a buffer copy operation

The `VkCopyDeviceMemoryInfoKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkCopyDeviceMemoryInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        regionCount;
    const VkDeviceMemoryCopyKHR*    pRegions;
} VkCopyDeviceMemoryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`regionCount` is the number of copies to be performed.

* 
`pRegions` is a pointer to an array of [VkDeviceMemoryCopyKHR](VkDeviceMemoryCopyKHR.html)
structures describing individual copy operations between two memory
ranges.

Valid Usage

* 
[](#VUID-VkCopyDeviceMemoryInfoKHR-srcRange-13015) VUID-VkCopyDeviceMemoryInfoKHR-srcRange-13015

The range of memory backing the address range defined by the
`srcRange` member of any element of `pRegions` **must** not overlap
the memory backing the address range defined by the `srcRange` or
`dstRange` of any element of `pRegions`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyDeviceMemoryInfoKHR-sType-sType) VUID-VkCopyDeviceMemoryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyDeviceMemoryInfoKHR-pNext-pNext) VUID-VkCopyDeviceMemoryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyDeviceMemoryInfoKHR-pRegions-parameter) VUID-VkCopyDeviceMemoryInfoKHR-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkDeviceMemoryCopyKHR](VkDeviceMemoryCopyKHR.html) structures

* 
[](#VUID-VkCopyDeviceMemoryInfoKHR-regionCount-arraylength) VUID-VkCopyDeviceMemoryInfoKHR-regionCount-arraylength

 `regionCount` **must** be greater than `0`

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkDeviceMemoryCopyKHR](VkDeviceMemoryCopyKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMemoryKHR](vkCmdCopyMemoryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyDeviceMemoryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
