# VkQueryPoolCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolCreateFlagBits - Bitmask specifying query pool properties

Bits which **can** be set in [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)::`flags`,
specifying options for query pools, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryPoolCreateFlagBits {
  // Provided by VK_KHR_maintenance9
    VK_QUERY_POOL_CREATE_RESET_BIT_KHR = 0x00000001,
} VkQueryPoolCreateFlagBits;

* 
[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](#) specifies that queries in the
query pool are initialized on creation and do not need to be reset
before first use.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueryPoolCreateFlags](VkQueryPoolCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
