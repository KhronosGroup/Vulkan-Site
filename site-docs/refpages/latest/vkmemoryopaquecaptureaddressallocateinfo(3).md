# VkMemoryOpaqueCaptureAddressAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryOpaqueCaptureAddressAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryOpaqueCaptureAddressAllocateInfo - Request a specific address for a memory allocation

To request a specific device address for a memory allocation, add a
[VkMemoryOpaqueCaptureAddressAllocateInfo](#) structure to the `pNext`
chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkMemoryOpaqueCaptureAddressAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkMemoryOpaqueCaptureAddressAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           opaqueCaptureAddress;
} VkMemoryOpaqueCaptureAddressAllocateInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkMemoryOpaqueCaptureAddressAllocateInfo
typedef VkMemoryOpaqueCaptureAddressAllocateInfo VkMemoryOpaqueCaptureAddressAllocateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureAddress` is the opaque capture address requested for
the memory allocation.

If `opaqueCaptureAddress` is zero, no specific address is requested.

If `opaqueCaptureAddress` is not zero, it **should** be an address
retrieved from [vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html) on an identically
created memory allocation on the same implementation.

|  | In most cases, it is expected that a non-zero `opaqueAddress` is an
| --- | --- |
address retrieved from [vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html) on an
identically created memory allocation.
If this is not the case, it is likely that
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html) errors will occur.

This is, however, not a strict requirement because trace capture/replay
tools may need to adjust memory allocation parameters for imported memory. |

If this structure is not present, it is as if `opaqueCaptureAddress` is
zero.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryOpaqueCaptureAddressAllocateInfo-sType-sType) VUID-VkMemoryOpaqueCaptureAddressAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryOpaqueCaptureAddressAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
