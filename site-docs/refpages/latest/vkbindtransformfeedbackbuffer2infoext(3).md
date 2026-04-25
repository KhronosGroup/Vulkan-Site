# VkBindTransformFeedbackBuffer2InfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindTransformFeedbackBuffer2InfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindTransformFeedbackBuffer2InfoEXT - Bind transform feedback buffer info

`VkBindTransformFeedbackBuffer2InfoEXT` is defined as:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
typedef struct VkBindTransformFeedbackBuffer2InfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkBindTransformFeedbackBuffer2InfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) of the address
range to use.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13097) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13098) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13099) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13100) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13122) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13123) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13101) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13124) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13125) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-sType-sType) VUID-VkBindTransformFeedbackBuffer2InfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_TRANSFORM_FEEDBACK_BUFFER_2_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-pNext-pNext) VUID-VkBindTransformFeedbackBuffer2InfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-parameter) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdBeginTransformFeedback2EXT](vkCmdBeginTransformFeedback2EXT.html), [vkCmdBindTransformFeedbackBuffers2EXT](vkCmdBindTransformFeedbackBuffers2EXT.html), [vkCmdDrawIndirectByteCount2EXT](vkCmdDrawIndirectByteCount2EXT.html), [vkCmdEndTransformFeedback2EXT](vkCmdEndTransformFeedback2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkBindTransformFeedbackBuffer2InfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
