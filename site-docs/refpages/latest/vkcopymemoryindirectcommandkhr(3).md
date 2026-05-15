# VkCopyMemoryIndirectCommandKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryIndirectCommandKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryIndirectCommandKHR - Structure specifying indirect memory region copy operation

The structure describing source and destination memory regions,
`VkCopyMemoryIndirectCommandKHR` is defined as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkCopyMemoryIndirectCommandKHR {
    VkDeviceAddress    srcAddress;
    VkDeviceAddress    dstAddress;
    VkDeviceSize       size;
} VkCopyMemoryIndirectCommandKHR;

// Provided by VK_NV_copy_memory_indirect
// Equivalent to VkCopyMemoryIndirectCommandKHR
typedef VkCopyMemoryIndirectCommandKHR VkCopyMemoryIndirectCommandNV;

* 
`srcAddress` is the starting address of the source device memory to
copy from.

* 
`dstAddress` is the starting address of the destination device
memory to copy to.

* 
`size` is the size of the copy in bytes.

Valid Usage

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-10958) VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-10958

The `srcAddress` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-10959) VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-10959

The `dstAddress` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-size-10960) VUID-VkCopyMemoryIndirectCommandKHR-size-10960

The `size` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-10961) VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-10961

The memory in range [`srcAddress`, `srcAddress` + 
`size` - 1] **must** be within the bounds of the memory allocation
backing `srcAddress`

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-10962) VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-10962

The memory in range [`dstAddress`, `dstAddress` + 
`size` - 1] **must** be within the bounds of the memory allocation
backing `dstAddress`

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-12211) VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-12211

The range of memory defined by `srcAddress` and `size` **must** be
a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-12212) VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-12212

The range of memory defined by `dstAddress` and `size` **must** be
a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-parameter) VUID-VkCopyMemoryIndirectCommandKHR-srcAddress-parameter

 `srcAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-parameter) VUID-VkCopyMemoryIndirectCommandKHR-dstAddress-parameter

 `dstAddress` **must** be a valid `VkDeviceAddress` value

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VK_NV_copy_memory_indirect](VK_NV_copy_memory_indirect.html), `VkDeviceAddress`, `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyMemoryIndirectCommandKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
