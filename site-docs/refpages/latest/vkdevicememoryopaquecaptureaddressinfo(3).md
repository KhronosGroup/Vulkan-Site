# VkDeviceMemoryOpaqueCaptureAddressInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryOpaqueCaptureAddressInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryOpaqueCaptureAddressInfo - Structure specifying the memory object to query an address for

The `VkDeviceMemoryOpaqueCaptureAddressInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkDeviceMemoryOpaqueCaptureAddressInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkDeviceMemoryOpaqueCaptureAddressInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkDeviceMemoryOpaqueCaptureAddressInfo
typedef VkDeviceMemoryOpaqueCaptureAddressInfo VkDeviceMemoryOpaqueCaptureAddressInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` specifies the memory whose address is being queried.

Valid Usage

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-03336) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-03336

`memory` **must** have been allocated with
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-sType-sType) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-pNext-pNext) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-parameter) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html), [vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html), [vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkDeviceMemoryOpaqueCaptureAddressInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
