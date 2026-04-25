# VkPhysicalDeviceExternalBufferInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalBufferInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalBufferInfo - Structure specifying buffer creation parameters

The `VkPhysicalDeviceExternalBufferInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalBufferInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkBufferCreateFlags                   flags;
    VkBufferUsageFlags                    usage;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalBufferInfo;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkPhysicalDeviceExternalBufferInfo
typedef VkPhysicalDeviceExternalBufferInfo VkPhysicalDeviceExternalBufferInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html) describing
additional parameters of the buffer, corresponding to
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`flags`.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html) describing the
intended usage of the buffer, corresponding to
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`usage`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the memory handle type that will be used with the memory
associated with the buffer.

Only usage flags representable in [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html) are returned
in this structure’s `usage`.
If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)
structure, all usage flags of the buffer are returned in
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)::`usage`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-None-09499) VUID-VkPhysicalDeviceExternalBufferInfo-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html)
values

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-None-09500) VUID-VkPhysicalDeviceExternalBufferInfo-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-sType-sType) VUID-VkPhysicalDeviceExternalBufferInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-pNext-pNext) VUID-VkPhysicalDeviceExternalBufferInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-sType-unique) VUID-VkPhysicalDeviceExternalBufferInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-flags-parameter) VUID-VkPhysicalDeviceExternalBufferInfo-flags-parameter

 `flags` **must** be a valid combination of [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html) values

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalBufferInfo-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBufferCreateFlags](VkBufferCreateFlags.html), [VkBufferUsageFlags](VkBufferUsageFlags.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html), [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceExternalBufferInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
