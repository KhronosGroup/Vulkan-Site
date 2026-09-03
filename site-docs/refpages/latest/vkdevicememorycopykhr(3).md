# VkDeviceMemoryCopyKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryCopyKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryCopyKHR - Structure specifying a memory range copy operation

The `VkDeviceMemoryCopyKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDeviceMemoryCopyKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     srcRange;
    VkAddressCommandFlagsKHR    srcFlags;
    VkDeviceAddressRangeKHR     dstRange;
    VkAddressCommandFlagsKHR    dstFlags;
} VkDeviceMemoryCopyKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure defining the
source memory to copy from.

* 
`srcFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
copy flags for the source address range.

* 
`dstRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure defining the
destination memory to copy to.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
copy flags for the destination address range.

This structure defines a copy operation where `srcRange.size` bytes will
be copied from `srcRange.address` to `dstRange.address`.

Valid Usage

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13097) VUID-VkDeviceMemoryCopyKHR-srcRange-13097

If the range specified by `srcRange` is not bound completely
to memory when accessed, `srcFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13098) VUID-VkDeviceMemoryCopyKHR-srcRange-13098

If the buffer from which the range specified by `srcRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13099) VUID-VkDeviceMemoryCopyKHR-srcRange-13099

If the buffer from which the range specified by `srcRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcFlags-13100) VUID-VkDeviceMemoryCopyKHR-srcFlags-13100

`srcFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13122) VUID-VkDeviceMemoryCopyKHR-srcRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `srcRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `srcFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13123) VUID-VkDeviceMemoryCopyKHR-srcRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `srcRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `srcFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcFlags-13101) VUID-VkDeviceMemoryCopyKHR-srcFlags-13101

`srcFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13124) VUID-VkDeviceMemoryCopyKHR-srcRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `srcRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`srcFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13125) VUID-VkDeviceMemoryCopyKHR-srcRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `srcRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`srcFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13097) VUID-VkDeviceMemoryCopyKHR-dstRange-13097

If the range specified by `dstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13098) VUID-VkDeviceMemoryCopyKHR-dstRange-13098

If the buffer from which the range specified by `dstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13099) VUID-VkDeviceMemoryCopyKHR-dstRange-13099

If the buffer from which the range specified by `dstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstFlags-13100) VUID-VkDeviceMemoryCopyKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13122) VUID-VkDeviceMemoryCopyKHR-dstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13123) VUID-VkDeviceMemoryCopyKHR-dstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstFlags-13101) VUID-VkDeviceMemoryCopyKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13124) VUID-VkDeviceMemoryCopyKHR-dstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13125) VUID-VkDeviceMemoryCopyKHR-dstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-size-13016) VUID-VkDeviceMemoryCopyKHR-size-13016

The `size` member of `dstRange` **must** be greater than or equal
to the `size` member of `srcRange`

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcRange-13017) VUID-VkDeviceMemoryCopyKHR-srcRange-13017

The buffer from which `srcRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstRange-13018) VUID-VkDeviceMemoryCopyKHR-dstRange-13018

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryCopyKHR-sType-sType) VUID-VkDeviceMemoryCopyKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_COPY_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceMemoryCopyKHR-pNext-pNext) VUID-VkDeviceMemoryCopyKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceMemoryCopyKHR-srcFlags-parameter) VUID-VkDeviceMemoryCopyKHR-srcFlags-parameter

 `srcFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkDeviceMemoryCopyKHR-dstFlags-parameter) VUID-VkDeviceMemoryCopyKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkCopyDeviceMemoryInfoKHR](VkCopyDeviceMemoryInfoKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkDeviceMemoryCopyKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
