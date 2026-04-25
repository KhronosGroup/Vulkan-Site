# VkBindIndexBuffer3InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindIndexBuffer3InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindIndexBuffer3InfoKHR - Index buffer binding info

`VkBindIndexBuffer3InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkBindIndexBuffer3InfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
    VkIndexType                 indexType;
} VkBindIndexBuffer3InfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) of the address
range to bind.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

* 
`indexType` is a [VkIndexType](VkIndexType.html) value specifying the size of the
indices.

Valid Usage

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13097) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13098) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13099) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressFlags-13100) VUID-VkBindIndexBuffer3InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13122) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13123) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressFlags-13101) VUID-VkBindIndexBuffer3InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13124) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13125) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13051) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13051

If `addressRange.address` is not 0, the buffer from which
`addressRange` was queried **must** have been created with
[VK_BUFFER_USAGE_INDEX_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13052) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13052

`addressRange.address` **must** be a multiple of the size of the type
indicated by `indexType`

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-indexType-13053) VUID-VkBindIndexBuffer3InfoKHR-indexType-13053

`indexType` **must** not be [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-indexType-13054) VUID-VkBindIndexBuffer3InfoKHR-indexType-13054

If `indexType` is [VK_INDEX_TYPE_UINT8_KHR](VkIndexType.html), the
[`indexTypeUint8`](../../../../spec/latest/chapters/features.html#features-indexTypeUint8) feature **must** be
enabled

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-None-13055) VUID-VkBindIndexBuffer3InfoKHR-None-13055

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled,
`addressRange.size` **must** be greater than 0

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressRange-13056) VUID-VkBindIndexBuffer3InfoKHR-addressRange-13056

If `addressRange.size` is 0, `addressRange.address` **must** be 0

Valid Usage (Implicit)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-sType-sType) VUID-VkBindIndexBuffer3InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_INDEX_BUFFER_3_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-pNext-pNext) VUID-VkBindIndexBuffer3InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-addressFlags-parameter) VUID-VkBindIndexBuffer3InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkBindIndexBuffer3InfoKHR-indexType-parameter) VUID-VkBindIndexBuffer3InfoKHR-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkIndexType](VkIndexType.html), [VkStructureType](VkStructureType.html), [vkCmdBindIndexBuffer3KHR](vkCmdBindIndexBuffer3KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkBindIndexBuffer3InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
