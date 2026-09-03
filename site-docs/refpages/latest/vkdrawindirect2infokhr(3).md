# VkDrawIndirect2InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawIndirect2InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawIndirect2InfoKHR - Draw indirect info

`VkDrawIndirect2InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDrawIndirect2InfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkStridedDeviceAddressRangeKHR    addressRange;
    VkAddressCommandFlagsKHR          addressFlags;
    uint32_t                          drawCount;
} VkDrawIndirect2InfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html)
containing draw parameters.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

* 
`drawCount` is the number of draws to execute, and **can** be zero.

Valid Usage

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13097) VUID-VkDrawIndirect2InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13098) VUID-VkDrawIndirect2InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13099) VUID-VkDrawIndirect2InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressFlags-13100) VUID-VkDrawIndirect2InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13122) VUID-VkDrawIndirect2InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13123) VUID-VkDrawIndirect2InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressFlags-13101) VUID-VkDrawIndirect2InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13124) VUID-VkDrawIndirect2InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13125) VUID-VkDrawIndirect2InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13107) VUID-VkDrawIndirect2InfoKHR-addressRange-13107

The buffer from which `addressRange` was queried **must** have been
created with [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-VkDrawIndirect2InfoKHR-protectedNoFault-13108) VUID-VkDrawIndirect2InfoKHR-protectedNoFault-13108

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the buffer from which `addressRange` was queried **must** not have been
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressRange-13109) VUID-VkDrawIndirect2InfoKHR-addressRange-13109

`addressRange.address` **must** be a multiple of 4

* 
[](#VUID-VkDrawIndirect2InfoKHR-drawCount-02718) VUID-VkDrawIndirect2InfoKHR-drawCount-02718

If the [`multiDrawIndirect`](../../../../spec/latest/chapters/features.html#features-multiDrawIndirect) feature
is not enabled, `drawCount` **must** be `0` or `1`

* 
[](#VUID-VkDrawIndirect2InfoKHR-drawCount-02719) VUID-VkDrawIndirect2InfoKHR-drawCount-02719

`drawCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDrawIndirectCount`

Valid Usage (Implicit)

* 
[](#VUID-VkDrawIndirect2InfoKHR-sType-sType) VUID-VkDrawIndirect2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRAW_INDIRECT_2_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDrawIndirect2InfoKHR-pNext-pNext) VUID-VkDrawIndirect2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDrawIndirect2InfoKHR-addressFlags-parameter) VUID-VkDrawIndirect2InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdDrawIndexedIndirect2KHR](vkCmdDrawIndexedIndirect2KHR.html), [vkCmdDrawIndirect2KHR](vkCmdDrawIndirect2KHR.html), [vkCmdDrawMeshTasksIndirect2EXT](vkCmdDrawMeshTasksIndirect2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawIndirect2InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
