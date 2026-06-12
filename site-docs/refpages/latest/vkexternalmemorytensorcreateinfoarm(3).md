# VkExternalMemoryTensorCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryTensorCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryTensorCreateInfoARM - Specify that a tensor may be backed by external memory

To define a set of external memory handle types that **may** be used as backing
store for a tensor, add a [VkExternalMemoryTensorCreateInfoARM](#)
structure to the `pNext` chain of the [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)
structure.

The `VkExternalMemoryTensorCreateInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkExternalMemoryTensorCreateInfoARM {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryTensorCreateInfoARM;

|  | A `VkExternalMemoryTensorCreateInfoARM` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for a
tensor that will be bound to memory that is either exported or imported. |

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) specifying one or more external
memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryTensorCreateInfoARM-sType-sType) VUID-VkExternalMemoryTensorCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_TENSOR_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkExternalMemoryTensorCreateInfoARM-handleTypes-parameter) VUID-VkExternalMemoryTensorCreateInfoARM-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalMemoryTensorCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
