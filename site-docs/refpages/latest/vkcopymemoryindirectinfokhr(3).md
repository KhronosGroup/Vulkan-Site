# VkCopyMemoryIndirectInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryIndirectInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryIndirectInfoKHR - Parameters describing indirect copy parameters

The [VkCopyMemoryIndirectInfoKHR](#) structure is defined as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkCopyMemoryIndirectInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAddressCopyFlagsKHR             srcCopyFlags;
    VkAddressCopyFlagsKHR             dstCopyFlags;
    uint32_t                          copyCount;
    VkStridedDeviceAddressRangeKHR    copyAddressRange;
} VkCopyMemoryIndirectInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcCopyFlags` is a [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html) value defining the
copy flags for the source address range.

* 
`dstCopyFlags` is a [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html) value defining the
copy flags for the destination address range.

* 
`copyCount` is the number of copies to execute, and **can** be zero.

* 
`copyAddressRange` is a memory region specifying the copy
parameters.
It is laid out as an array of [VkCopyMemoryIndirectCommandKHR](VkCopyMemoryIndirectCommandKHR.html)
structures.

Valid Usage

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-10938) VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-10938

If `srcCopyFlags` contains [VK_ADDRESS_COPY_SPARSE_BIT_KHR](VkAddressCopyFlagBitsKHR.html), the
source memory regions accessed **must** be [bound to    memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-10939) VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-10939

If `dstCopyFlags` contains [VK_ADDRESS_COPY_SPARSE_BIT_KHR](VkAddressCopyFlagBitsKHR.html), the
destination memory regions accessed **must** be [bound to    memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-10940) VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-10940

`srcCopyFlags` **must** not contain
[VK_ADDRESS_COPY_PROTECTED_BIT_KHR](VkAddressCopyFlagBitsKHR.html)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-10941) VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-10941

`dstCopyFlags` **must** not contain
[VK_ADDRESS_COPY_PROTECTED_BIT_KHR](VkAddressCopyFlagBitsKHR.html)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10942) VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10942

`copyAddressRange.address` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10943) VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10943

`copyAddressRange.stride` **must** be a multiple of `4` and **must** be
greater than or equal to sizeof([VkCopyMemoryIndirectCommandKHR](VkCopyMemoryIndirectCommandKHR.html))

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-copyCount-10944) VUID-VkCopyMemoryIndirectInfoKHR-copyCount-10944

`copyCount` **must** be less than or equal to
`copyAddressRange.size` / `copyAddressRange.stride`

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10945) VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-10945

Any of the source or destination memory regions specified in
`copyAddressRange` **must** not overlap with any of the specified
destination memory regions

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-12210) VUID-VkCopyMemoryIndirectInfoKHR-copyAddressRange-12210

`copyAddressRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-sType-sType) VUID-VkCopyMemoryIndirectInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_INDIRECT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-pNext-pNext) VUID-VkCopyMemoryIndirectInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-parameter) VUID-VkCopyMemoryIndirectInfoKHR-srcCopyFlags-parameter

 `srcCopyFlags` **must** be a valid combination of [VkAddressCopyFlagBitsKHR](VkAddressCopyFlagBitsKHR.html) values

* 
[](#VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-parameter) VUID-VkCopyMemoryIndirectInfoKHR-dstCopyFlags-parameter

 `dstCopyFlags` **must** be a valid combination of [VkAddressCopyFlagBitsKHR](VkAddressCopyFlagBitsKHR.html) values

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMemoryIndirectKHR](vkCmdCopyMemoryIndirectKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyMemoryIndirectInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
