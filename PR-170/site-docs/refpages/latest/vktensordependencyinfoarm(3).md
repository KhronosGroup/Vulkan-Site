# VkTensorDependencyInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorDependencyInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorDependencyInfoARM - Structure specifying tensor dependency information for a synchronization command

The `VkTensorDependencyInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorDependencyInfoARM {
    VkStructureType                    sType;
    const void*                        pNext;
    uint32_t                           tensorMemoryBarrierCount;
    const VkTensorMemoryBarrierARM*    pTensorMemoryBarriers;
} VkTensorDependencyInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorMemoryBarrierCount` is the length of the
`pTensorMemoryBarriers` array.

* 
`pTensorMemoryBarriers` is a pointer to an array of
[VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html) structures defining memory dependencies
between tensors.

Valid Usage (Implicit)

* 
[](#VUID-VkTensorDependencyInfoARM-sType-sType) VUID-VkTensorDependencyInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_DEPENDENCY_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorDependencyInfoARM-pTensorMemoryBarriers-parameter) VUID-VkTensorDependencyInfoARM-pTensorMemoryBarriers-parameter

 `pTensorMemoryBarriers` **must** be a valid pointer to a valid [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](VkDependencyInfo.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkTensorDependencyInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
