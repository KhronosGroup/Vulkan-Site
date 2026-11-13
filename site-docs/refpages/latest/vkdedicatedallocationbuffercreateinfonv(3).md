# VkDedicatedAllocationBufferCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDedicatedAllocationBufferCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDedicatedAllocationBufferCreateInfoNV - Specify that a buffer is bound to a dedicated memory resource

If the `pNext` chain includes a
`VkDedicatedAllocationBufferCreateInfoNV` structure, then that structure
includes an enable controlling whether the buffer will have a dedicated
memory allocation bound to it.

The `VkDedicatedAllocationBufferCreateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationBufferCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           dedicatedAllocation;
} VkDedicatedAllocationBufferCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dedicatedAllocation` specifies whether the buffer will have a
dedicated allocation bound to it.

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationBufferCreateInfoNV-sType-sType) VUID-VkDedicatedAllocationBufferCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_BUFFER_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

[VK_NV_dedicated_allocation](VK_NV_dedicated_allocation.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDedicatedAllocationBufferCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
