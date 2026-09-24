# VkDedicatedAllocationMemoryAllocateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDedicatedAllocationMemoryAllocateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDedicatedAllocationMemoryAllocateInfoNV - Specify a dedicated memory allocation resource

If the `pNext` chain includes a
`VkDedicatedAllocationMemoryAllocateInfoNV` structure, then that
structure includes a handle of the sole buffer or image resource that the
memory **can** be bound to.

The `VkDedicatedAllocationMemoryAllocateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationMemoryAllocateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkBuffer           buffer;
} VkDedicatedAllocationMemoryAllocateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a handle of an image which this
memory will be bound to.

* 
`buffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a handle of a buffer which this
memory will be bound to.

Valid Usage

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00649) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00649

At least one of `image` and `buffer` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00650) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00650

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the image **must** have been
created with
[VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)::`dedicatedAllocation`
equal to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00651) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00651

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the buffer **must** have been
created with
[VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html)::`dedicatedAllocation`
equal to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00652) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00652

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the image

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00653) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00653

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the buffer

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00654) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00654

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation, the memory
being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00655) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00655

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation, the memory
being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-sType-sType) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_MEMORY_ALLOCATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-parameter) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-parameter

 If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-parameter) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-commonparent) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-commonparent

 Both of `buffer`, and `image` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_NV_dedicated_allocation](VK_NV_dedicated_allocation.html), [VkBuffer](VkBuffer.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkDedicatedAllocationMemoryAllocateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
