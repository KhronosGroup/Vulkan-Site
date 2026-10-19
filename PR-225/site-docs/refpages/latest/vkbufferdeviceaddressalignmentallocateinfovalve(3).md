# VkBufferDeviceAddressAlignmentAllocateInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferDeviceAddressAlignmentAllocateInfoVALVE - Specify minimum buffer device address alignment

The [VkBufferDeviceAddressAlignmentAllocateInfoVALVE](#) structure is
defined as:

// Provided by VK_VALVE_buffer_device_address_allocation_alignment
typedef struct VkBufferDeviceAddressAlignmentAllocateInfoVALVE {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           alignment;
} VkBufferDeviceAddressAlignmentAllocateInfoVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`alignment` is the minimum alignment that implementation **must**
allocate for any buffer device addresses.

If this struct is not present in a `pNext` chain, `alignment` is
assumed to be 0.
If `alignment` is 0, this alignment request is ignored.

Valid Usage

* 
[](#VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12512) VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12512

If `alignment` is not 0, it **must** be power-of-two

* 
[](#VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12513) VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12513

If `alignment` is not 0,
[`bufferDeviceAddressAllocationAlignment`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressAllocationAlignment)
**must** be enabled

* 
[](#VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12514) VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-alignment-12514

`alignment` **must** be less-than or equal-to
[`maxBufferDeviceAddressAllocationAlignment`](../../../../spec/latest/chapters/limits.html#limits-maxBufferDeviceAddressAllocationAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-sType-sType) VUID-VkBufferDeviceAddressAlignmentAllocateInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_ALIGNMENT_ALLOCATE_INFO_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_VALVE_buffer_device_address_allocation_alignment](VK_VALVE_buffer_device_address_allocation_alignment.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkBufferDeviceAddressAlignmentAllocateInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
