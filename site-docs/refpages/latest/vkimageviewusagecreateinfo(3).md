# VkImageViewUsageCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewUsageCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewUsageCreateInfo - Specify the intended usage of an image view

The set of usages for the created image view **can** be restricted compared to
the parent image’s `usage` flags by adding a
`VkImageViewUsageCreateInfo` structure to the `pNext` chain of
[VkImageViewCreateInfo](VkImageViewCreateInfo.html).

The `VkImageViewUsageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageViewUsageCreateInfo {
    VkStructureType      sType;
    const void*          pNext;
    VkImageUsageFlags    usage;
} VkImageViewUsageCreateInfo;

// Provided by VK_KHR_maintenance2
// Equivalent to VkImageViewUsageCreateInfo
typedef VkImageViewUsageCreateInfo VkImageViewUsageCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) specifying
allowed usages of the image view.

When this structure is chained to [VkImageViewCreateInfo](VkImageViewCreateInfo.html) the
`usage` field overrides the implicit `usage` parameter inherited
from image creation time and its value is used instead for the purposes of
determining the valid usage conditions of [VkImageViewCreateInfo](VkImageViewCreateInfo.html).

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewUsageCreateInfo-sType-sType) VUID-VkImageViewUsageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkImageViewUsageCreateInfo-usage-parameter) VUID-VkImageViewUsageCreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkImageViewUsageCreateInfo-usage-requiredbitmask) VUID-VkImageViewUsageCreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewUsageCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
