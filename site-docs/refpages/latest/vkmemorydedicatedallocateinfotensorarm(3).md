# VkMemoryDedicatedAllocateInfoTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryDedicatedAllocateInfoTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryDedicatedAllocateInfoTensorARM - Specify a dedicated memory allocation tensor resource

If the `pNext` chain includes a
`VkMemoryDedicatedAllocateInfoTensorARM` structure, then that structure
includes a handle of the sole tensor resource that the memory **can** be bound
to.

The `VkMemoryDedicatedAllocateInfoTensorARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkMemoryDedicatedAllocateInfoTensorARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkMemoryDedicatedAllocateInfoTensorARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is a handle of a tensor which this memory will be bound to.

Valid Usage

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-allocationSize-09710) VUID-VkMemoryDedicatedAllocateInfoTensorARM-allocationSize-09710

`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the tensor

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-09859) VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-09859

If [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with
handle type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html), the
memory being imported **must** also be a dedicated tensor allocation and
`tensor` **must** be identical to the tensor associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-sType-sType) VUID-VkMemoryDedicatedAllocateInfoTensorARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_TENSOR_ARM](VkStructureType.html)

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-parameter) VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryDedicatedAllocateInfoTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
