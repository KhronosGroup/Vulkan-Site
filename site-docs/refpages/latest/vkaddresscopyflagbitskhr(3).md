# VkAddressCopyFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAddressCopyFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAddressCopyFlagBitsKHR - Bitmask specifying address copy parameters

Bits which **can** be set in a [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html) mask are:

// Provided by VK_KHR_copy_memory_indirect
typedef enum VkAddressCopyFlagBitsKHR {
    VK_ADDRESS_COPY_DEVICE_LOCAL_BIT_KHR = 0x00000001,
    VK_ADDRESS_COPY_SPARSE_BIT_KHR = 0x00000002,
    VK_ADDRESS_COPY_PROTECTED_BIT_KHR = 0x00000004,
} VkAddressCopyFlagBitsKHR;

* 
[VK_ADDRESS_COPY_DEVICE_LOCAL_BIT_KHR](#) specifies that the address
range is expected to be resident in device local memory.
Specifying this value is optional, but **may** lead to improved performance
if set accurately.

* 
[VK_ADDRESS_COPY_PROTECTED_BIT_KHR](#) specifies that the address range
is allocated from protected memory.

* 
[VK_ADDRESS_COPY_SPARSE_BIT_KHR](#) specifies that the address range
may not be fully bound to physical memory when accessed.

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkAddressCopyFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
