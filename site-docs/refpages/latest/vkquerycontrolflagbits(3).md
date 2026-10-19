# VkQueryControlFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryControlFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryControlFlagBits - Bitmask specifying constraints on a query

Bits which **can** be set in [vkCmdBeginQuery](vkCmdBeginQuery.html)::`flags`, specifying
constraints on the types of queries that **can** be performed, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryControlFlagBits {
    VK_QUERY_CONTROL_PRECISE_BIT = 0x00000001,
} VkQueryControlFlagBits;

* 
[VK_QUERY_CONTROL_PRECISE_BIT](#) specifies the precision of
[occlusion queries](../../../../spec/latest/chapters/queries.html#queries-occlusion).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueryControlFlags](VkQueryControlFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryControlFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
