# VkDispatchIndirect2InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchIndirect2InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchIndirect2InfoKHR - Dispatch indirect info

`VkDispatchIndirect2InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDispatchIndirect2InfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkDispatchIndirect2InfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) containing
dispatch parameters.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13097) VUID-VkDispatchIndirect2InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13098) VUID-VkDispatchIndirect2InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13099) VUID-VkDispatchIndirect2InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-13100) VUID-VkDispatchIndirect2InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13122) VUID-VkDispatchIndirect2InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13123) VUID-VkDispatchIndirect2InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-13101) VUID-VkDispatchIndirect2InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13124) VUID-VkDispatchIndirect2InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13125) VUID-VkDispatchIndirect2InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13107) VUID-VkDispatchIndirect2InfoKHR-addressRange-13107

The buffer from which `addressRange` was queried **must** have been
created with [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-VkDispatchIndirect2InfoKHR-protectedNoFault-13108) VUID-VkDispatchIndirect2InfoKHR-protectedNoFault-13108

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the buffer from which `addressRange` was queried **must** not have been
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressRange-13109) VUID-VkDispatchIndirect2InfoKHR-addressRange-13109

`addressRange.address` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-sType-sType) VUID-VkDispatchIndirect2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPATCH_INDIRECT_2_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDispatchIndirect2InfoKHR-pNext-pNext) VUID-VkDispatchIndirect2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDispatchIndirect2InfoKHR-addressFlags-parameter) VUID-VkDispatchIndirect2InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdDispatchIndirect2KHR](vkCmdDispatchIndirect2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkDispatchIndirect2InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
