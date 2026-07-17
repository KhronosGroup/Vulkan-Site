# VkBindVertexBuffer3InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindVertexBuffer3InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindVertexBuffer3InfoKHR - Bind vertex buffer info

`VkBindVertexBuffer3InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkBindVertexBuffer3InfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkBool32                          setStride;
    VkStridedDeviceAddressRangeKHR    addressRange;
    VkAddressCommandFlagsKHR          addressFlags;
} VkBindVertexBuffer3InfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`setStride` is a `VkBool32` value indicating whether
`addressRange.stride` sets the stride for the buffer.
If `setStride` is [VK_TRUE](VK_TRUE.html), the dynamic stride is set for all
attributes from this buffer.
If `setStride` is [VK_FALSE](VK_FALSE.html), the stride value is not set.

* 
`addressRange` is the [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html) of the
address range to bind.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13097) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13098) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13099) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13100) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13122) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13123) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13101) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13124) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13125) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13074) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13074

If `addressRange.address` is not 0, the buffer from which
`addressRange` was queried **must** have been created with the
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13075) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13075

If `addressRange.size` is 0, `addressRange.address` **must** be 0

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-size-13072) VUID-VkBindVertexBuffer3InfoKHR-size-13072

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled,
`addressRange.size` **must** not be 0

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-setStride-13126) VUID-VkBindVertexBuffer3InfoKHR-setStride-13126

If `setStride` is [VK_TRUE](VK_TRUE.html), `addressRange.stride` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-setStride-13127) VUID-VkBindVertexBuffer3InfoKHR-setStride-13127

If `setStride` is [VK_FALSE](VK_FALSE.html), `addressRange.stride` **must** be
0

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-sType-sType) VUID-VkBindVertexBuffer3InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_VERTEX_BUFFER_3_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-pNext-pNext) VUID-VkBindVertexBuffer3InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-parameter) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), `VkBool32`, [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdBindVertexBuffers3KHR](vkCmdBindVertexBuffers3KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkBindVertexBuffer3InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
