# VkConditionalRenderingBeginInfo2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConditionalRenderingBeginInfo2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConditionalRenderingBeginInfo2EXT - Structure specifying conditional rendering begin information

The `VkConditionalRenderingBeginInfo2EXT` structure is defined as:

// Provided by VK_KHR_device_address_commands with VK_EXT_conditional_rendering
typedef struct VkConditionalRenderingBeginInfo2EXT {
    VkStructureType                   sType;
    const void*                       pNext;
    VkDeviceAddressRangeKHR           addressRange;
    VkAddressCommandFlagsKHR          addressFlags;
    VkConditionalRenderingFlagsEXT    flags;
} VkConditionalRenderingBeginInfo2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) containing the
predicate for conditional rendering.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

* 
`flags` is a bitmask of [VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html)
specifying the behavior of conditional rendering.

If the 32-bit value at `addressRange.address` is zero, then the
rendering commands are discarded, otherwise they are executed as normal.
If the value of the predicate in memory changes while conditional rendering
is active, the rendering commands **may** be discarded in an
implementation-dependent way.
Some implementations **may** latch the value of the predicate upon beginning
conditional rendering while others **may** read it before every rendering
command.

Valid Usage

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13097) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13098) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13099) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-13100) VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13122) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13123) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-13101) VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13124) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13125) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13064) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13064

The [VkBuffer](VkBuffer.html) that `addressRange` was queried from **must** have
been created with [VK_BUFFER_USAGE_CONDITIONAL_RENDERING_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13065) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13065

`addressRange.address` **must** be a multiple of 4

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13066) VUID-VkConditionalRenderingBeginInfo2EXT-addressRange-13066

`addressRange.size` **must** be greater than or equal to 4

Valid Usage (Implicit)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-sType-sType) VUID-VkConditionalRenderingBeginInfo2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_2_EXT](VkStructureType.html)

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-pNext-pNext) VUID-VkConditionalRenderingBeginInfo2EXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-parameter) VUID-VkConditionalRenderingBeginInfo2EXT-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkConditionalRenderingBeginInfo2EXT-flags-parameter) VUID-VkConditionalRenderingBeginInfo2EXT-flags-parameter

 `flags` **must** be a valid combination of [VkConditionalRenderingFlagBitsEXT](VkConditionalRenderingFlagBitsEXT.html) values

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdBeginConditionalRendering2EXT](vkCmdBeginConditionalRendering2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkConditionalRenderingBeginInfo2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
