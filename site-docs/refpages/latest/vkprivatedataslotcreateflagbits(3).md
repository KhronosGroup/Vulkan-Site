# VkPrivateDataSlotCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPrivateDataSlotCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPrivateDataSlotCreateFlagBits - Bitmask specifying additional parameters of a private data slot

Bits which **can** be set in [VkPrivateDataSlotCreateInfo](VkPrivateDataSlotCreateInfo.html)::`flags`,
specifying additional parameters of a private data slot, are:

// Provided by VK_VERSION_1_3
typedef enum VkPrivateDataSlotCreateFlagBits {
  // Provided by VK_NV_private_data_base_handle
    VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV = 0x00000001,
} VkPrivateDataSlotCreateFlagBits;

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlotCreateFlagBits
typedef VkPrivateDataSlotCreateFlagBits VkPrivateDataSlotCreateFlagBitsEXT;

* 
[VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV](#) specifies
that calling `vkGetPrivateData` with this slot will return the
implementation’s base handle for the object rather than any previously
set private data.
`vkSetPrivateData` **must** not be called with a slot created with this
flag.

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPrivateDataSlotCreateFlags](VkPrivateDataSlotCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#VkPrivateDataSlotCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
