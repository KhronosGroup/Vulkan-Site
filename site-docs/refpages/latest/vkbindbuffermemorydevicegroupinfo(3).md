# VkBindBufferMemoryDeviceGroupInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindBufferMemoryDeviceGroupInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindBufferMemoryDeviceGroupInfo - Structure specifying device within a group to bind to

The `VkBindBufferMemoryDeviceGroupInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindBufferMemoryDeviceGroupInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndexCount;
    const uint32_t*    pDeviceIndices;
} VkBindBufferMemoryDeviceGroupInfo;

// Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
// Equivalent to VkBindBufferMemoryDeviceGroupInfo
typedef VkBindBufferMemoryDeviceGroupInfo VkBindBufferMemoryDeviceGroupInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

If the `pNext` chain of [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) includes a
`VkBindBufferMemoryDeviceGroupInfo` structure, then that structure
determines how memory is bound to buffers across multiple devices in a
device group.

If `deviceIndexCount` is greater than zero, then on device index i
the buffer is attached to the instance of `memory` on the physical
device with device index `pDeviceIndices`[i].

If `deviceIndexCount` is zero and `memory` comes from a memory heap
with the [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) bit set, then it is as if
`pDeviceIndices` contains consecutive indices from zero to the number of
physical devices in the logical device, minus one.
In other words, by default each physical device attaches to its own instance
of `memory`.

If `deviceIndexCount` is zero and `memory` comes from a memory heap
without the [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) bit set, then it is as
if `pDeviceIndices` contains an array of zeros.
In other words, by default each physical device attaches to instance zero.

Valid Usage

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-deviceIndexCount-01606) VUID-VkBindBufferMemoryDeviceGroupInfo-deviceIndexCount-01606

`deviceIndexCount` **must** either be zero or equal to the number of
physical devices in the logical device

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-01607) VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-01607

All elements of `pDeviceIndices` **must** be valid device indices

Valid Usage (Implicit)

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-sType-sType) VUID-VkBindBufferMemoryDeviceGroupInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO](VkStructureType.html)

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-parameter) VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html)

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html), [VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindBufferMemoryDeviceGroupInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
