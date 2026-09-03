# VkDrawIndirectCount2InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawIndirectCount2InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawIndirectCount2InfoKHR - Draw indirect count info

`VkDrawIndirectCount2InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDrawIndirectCount2InfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkStridedDeviceAddressRangeKHR    addressRange;
    VkAddressCommandFlagsKHR          addressFlags;
    VkDeviceAddressRangeKHR           countAddressRange;
    VkAddressCommandFlagsKHR          countAddressFlags;
    uint32_t                          maxDrawCount;
} VkDrawIndirectCount2InfoKHR;

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
`countAddressRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) containing
the draw count.

* 
`countAddressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value
defining the flags for the count address range.

* 
`maxDrawCount` specifies the maximum number of draws that will be
executed.
The actual number of executed draw calls is the minimum of the count
specified in `countAddressRange` and `maxDrawCount`.

Valid Usage

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13097) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13098) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13099) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressFlags-13100) VUID-VkDrawIndirectCount2InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13122) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13123) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressFlags-13101) VUID-VkDrawIndirectCount2InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13124) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13125) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13107) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13107

The buffer from which `addressRange` was queried **must** have been
created with [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-protectedNoFault-13108) VUID-VkDrawIndirectCount2InfoKHR-protectedNoFault-13108

If [`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the buffer from which `addressRange` was queried **must** not have been
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressRange-13109) VUID-VkDrawIndirectCount2InfoKHR-addressRange-13109

`addressRange.address` **must** be a multiple of 4

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13097) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13097

If the range specified by `countAddressRange` is not bound completely
to memory when accessed, `countAddressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13098) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13098

If the buffer from which the range specified by `countAddressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`countAddressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13099) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13099

If the buffer from which the range specified by `countAddressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`countAddressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-13100) VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-13100

`countAddressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13122) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `countAddressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `countAddressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13123) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `countAddressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `countAddressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-13101) VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-13101

`countAddressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13124) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `countAddressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`countAddressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13125) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `countAddressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`countAddressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13114) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13114

The buffer from which `countAddressRange` was queried **must** have
been created with [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13115) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13115

`countAddressRange.address` **must** be a multiple of `4`

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13116) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13116

The count stored in `countAddressRange` **must** be less than or equal
to [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxDrawIndirectCount`

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13117) VUID-VkDrawIndirectCount2InfoKHR-countAddressRange-13117

`countAddressRange.size` **must** be greater than or equal to 4

Valid Usage (Implicit)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-sType-sType) VUID-VkDrawIndirectCount2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRAW_INDIRECT_COUNT_2_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-pNext-pNext) VUID-VkDrawIndirectCount2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-addressFlags-parameter) VUID-VkDrawIndirectCount2InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-parameter) VUID-VkDrawIndirectCount2InfoKHR-countAddressFlags-parameter

 `countAddressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdDrawIndexedIndirectCount2KHR](vkCmdDrawIndexedIndirectCount2KHR.html), [vkCmdDrawIndirectCount2KHR](vkCmdDrawIndirectCount2KHR.html), [vkCmdDrawMeshTasksIndirectCount2EXT](vkCmdDrawMeshTasksIndirectCount2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawIndirectCount2InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
