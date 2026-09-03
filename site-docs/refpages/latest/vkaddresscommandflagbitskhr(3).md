# VkAddressCommandFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAddressCommandFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAddressCommandFlagBitsKHR - Bitmask specifying address copy parameters

Bits which **can** be set in a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) mask are:

// Provided by VK_KHR_device_address_commands
typedef enum VkAddressCommandFlagBitsKHR {
    VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR = 0x00000001,
    VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR = 0x00000002,
    VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR = 0x00000004,
    VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR = 0x00000008,
  // Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
    VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR = 0x00000010,
  // Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
    VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR = 0x00000020,
} VkAddressCommandFlagBitsKHR;

* 
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](#) specifies that an address
range is allocated from protected memory.

* 
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](#) specifies that an address
range will be fully bound to physical memory when accessed.

* 
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](#) specifies that all
buffers containing any part of an address range were created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage.

* 
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](#) specifies
that whether buffers containing an any part of an address range were
created with [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage or not is
unknown.

* 
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#)
specifies that all buffers containing any part of an address range are
allocated with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage.

* 
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#)
specifies that whether buffers containing an any part of an address
range were created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage or not is
unknown.

If neither [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](#) nor
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](#) are specified,
the address range **must** not be aliased with any buffer allocated with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html).
If neither [VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#)
nor [VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#)
are specified, the address range **must** not be aliased with any buffer
allocated with the [VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html).

|  | Buffers can return overlapping address ranges if they are bound to
| --- | --- |
overlapping ranges of a [VkDeviceMemory](VkDeviceMemory.html) object.
Applications should ensure that if they do this kind of aliasing, that they
consistently either include or do not include
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html)
and [VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)
on aliased buffers when considering these flags. |

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkAddressCommandFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
