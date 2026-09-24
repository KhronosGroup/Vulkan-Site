# VkTensorCopyARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorCopyARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorCopyARM - Structure specifying an tensor copy region

The `VkTensorCopyARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorCopyARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dimensionCount;
    const uint64_t*    pSrcOffset;
    const uint64_t*    pDstOffset;
    const uint64_t*    pExtent;
} VkTensorCopyARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dimensionCount` is the number of elements in the `pSrcOffset`,
`pDstOffset` and `pExtent` arrays.

* 
`pSrcOffset` is `NULL` or an array of size `dimensionCount`
providing an offset into the source tensor.
When `pSrcOffset` is `NULL`, the offset into the source tensor is
`0` in all dimensions.

* 
`pDstOffset` is `NULL` or an array of size `dimensionCount`
providing an offset into the destination tensor.
When `pDstOffset` is `NULL`, the offset into the destination tensor
is `0` in all dimensions.

* 
`pExtent` is `NULL` or an array of size `dimensionCount`
providing the number of elements to copy in each dimension.
When `pExtent` is `NULL`, the number of elements to copy is taken as
the total number of elements in each dimension of the source tensor.

Valid Usage

* 
[](#VUID-VkTensorCopyARM-dimensionCount-09955) VUID-VkTensorCopyARM-dimensionCount-09955

`dimensionCount` **must** be greater than 0 if `pSrcOffset`,
`pDstOffset`, or `pExtent` is not `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCopyARM-sType-sType) VUID-VkTensorCopyARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_COPY_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorCopyARM-pNext-pNext) VUID-VkTensorCopyARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorCopyARM-pSrcOffset-parameter) VUID-VkTensorCopyARM-pSrcOffset-parameter

 If `dimensionCount` is not `0`, and `pSrcOffset` is not `NULL`, `pSrcOffset` **must** be a valid pointer to an array of `dimensionCount` `uint64_t` values

* 
[](#VUID-VkTensorCopyARM-pDstOffset-parameter) VUID-VkTensorCopyARM-pDstOffset-parameter

 If `dimensionCount` is not `0`, and `pDstOffset` is not `NULL`, `pDstOffset` **must** be a valid pointer to an array of `dimensionCount` `uint64_t` values

* 
[](#VUID-VkTensorCopyARM-pExtent-parameter) VUID-VkTensorCopyARM-pExtent-parameter

 If `dimensionCount` is not `0`, and `pExtent` is not `NULL`, `pExtent` **must** be a valid pointer to an array of `dimensionCount` `uint64_t` values

[VK_ARM_tensors](VK_ARM_tensors.html), [VkCopyTensorInfoARM](VkCopyTensorInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkTensorCopyARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
