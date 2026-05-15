# VkBufferUsageFlags2CreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferUsageFlags2CreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferUsageFlags2CreateInfo - Extended buffer usage flags

The `VkBufferUsageFlags2CreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkBufferUsageFlags2CreateInfo {
    VkStructureType        sType;
    const void*            pNext;
    VkBufferUsageFlags2    usage;
} VkBufferUsageFlags2CreateInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkBufferUsageFlags2CreateInfo
typedef VkBufferUsageFlags2CreateInfo VkBufferUsageFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html) specifying
allowed usages of the buffer.

If this structure is included in the `pNext` chain of a buffer creation
structure, `usage` is used instead of the corresponding `usage`
value passed in that creation structure, allowing additional usage flags to
be specified.
If this structure is included in the `pNext` chain of a buffer query
structure, the usage flags of the buffer are returned in `usage` of this
structure, and the usage flags representable in `usage` of the buffer
query structure are also returned in that field.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-sType-sType) VUID-VkBufferUsageFlags2CreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-usage-parameter) VUID-VkBufferUsageFlags2CreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html) values

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-usage-requiredbitmask) VUID-VkBufferUsageFlags2CreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

* 
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)

* 
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)

* 
[VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html)

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkBufferUsageFlags2](VkBufferUsageFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferUsageFlags2CreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
