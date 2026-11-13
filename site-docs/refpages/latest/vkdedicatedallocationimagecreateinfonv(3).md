# VkDedicatedAllocationImageCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDedicatedAllocationImageCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDedicatedAllocationImageCreateInfoNV - Specify that an image is bound to a dedicated memory resource

If the `pNext` chain includes a
`VkDedicatedAllocationImageCreateInfoNV` structure, then that structure
includes an enable controlling whether the image will have a dedicated
memory allocation bound to it.

The `VkDedicatedAllocationImageCreateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationImageCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           dedicatedAllocation;
} VkDedicatedAllocationImageCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dedicatedAllocation` specifies whether the image will have a
dedicated allocation bound to it.

|  | Using a dedicated allocation for color and depth/stencil attachments or
| --- | --- |
other large images **may** improve performance on some devices. |

Valid Usage

* 
[](#VUID-VkDedicatedAllocationImageCreateInfoNV-dedicatedAllocation-00994) VUID-VkDedicatedAllocationImageCreateInfoNV-dedicatedAllocation-00994

If `dedicatedAllocation` is [VK_TRUE](VK_TRUE.html),
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags` **must** not include
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationImageCreateInfoNV-sType-sType) VUID-VkDedicatedAllocationImageCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_NV_dedicated_allocation](VK_NV_dedicated_allocation.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDedicatedAllocationImageCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
