# VkImageViewUsage2CreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewUsage2CreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewUsage2CreateInfoKHR - Specify the intended usage of an image view

The set of usages for the created image view **can** be restricted compared to
the parent image’s `usage` flags by adding a
`VkImageViewUsage2CreateInfoKHR` structure to the `pNext` chain of
[VkImageViewCreateInfo](VkImageViewCreateInfo.html).

The `VkImageViewUsage2CreateInfoKHR` structure is defined as:

// Provided by VK_KHR_extended_flags
typedef struct VkImageViewUsage2CreateInfoKHR {
    VkStructureType          sType;
    void*                    pNext;
    VkImageUsageFlags2KHR    usage;
} VkImageViewUsage2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) specifying
allowed usages of the image view.

When this structure is chained to [VkImageViewCreateInfo](VkImageViewCreateInfo.html) the
`usage` field overrides the implicit `usage` parameter inherited
from image creation time and its value is used instead for the purposes of
determining the valid usage conditions of [VkImageViewCreateInfo](VkImageViewCreateInfo.html).

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewUsage2CreateInfoKHR-sType-sType) VUID-VkImageViewUsage2CreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImageViewUsage2CreateInfoKHR-usage-parameter) VUID-VkImageViewUsage2CreateInfoKHR-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) values

* 
[](#VUID-VkImageViewUsage2CreateInfoKHR-usage-requiredbitmask) VUID-VkImageViewUsage2CreateInfoKHR-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewUsage2CreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
