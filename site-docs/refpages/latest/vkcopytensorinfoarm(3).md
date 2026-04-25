# VkCopyTensorInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyTensorInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyTensorInfoARM - Structure specifying an tensor copy operation

The `VkCopyTensorInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkCopyTensorInfoARM {
    VkStructureType           sType;
    const void*               pNext;
    VkTensorARM               srcTensor;
    VkTensorARM               dstTensor;
    uint32_t                  regionCount;
    const VkTensorCopyARM*    pRegions;
} VkCopyTensorInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is NULL or a pointer to a structure extending this
structure.

* 
`srcTensor` is the source tensor.

* 
`dstTensor` is the destination tensor.

* 
`regionCount` is the number of regions to copy.

* 
`pRegions` is a pointer to an array of [VkTensorCopyARM](VkTensorCopyARM.html)
structures specifying the regions to copy.

Each region in `pRegions` describes a region to be copied from the
source tensor to a corresponding region of the destination tensor.
`srcTensor` and `dstTensor` **can** be the same tensor or alias the
same memory.

The formats of `srcTensor` and `dstTensor` **must** be compatible.
Formats are compatible if they share the same class, as shown in the
[Compatible Formats](../../../../spec/latest/chapters/formats.html#formats-compatibility) table.

`vkCmdCopyTensorARM` allows copying between *size-compatible* internal
formats.

Valid Usage

* 
[](#VUID-VkCopyTensorInfoARM-dimensionCount-09684) VUID-VkCopyTensorInfoARM-dimensionCount-09684

`srcTensor` and `dstTensor` **must** have been created with equal
values for [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`dimensionCount`

* 
[](#VUID-VkCopyTensorInfoARM-pDimensions-09685) VUID-VkCopyTensorInfoARM-pDimensions-09685

For each of the elements of
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`, `srcTensor` and
`dstTensor` **must** be the same size

* 
[](#VUID-VkCopyTensorInfoARM-regionCount-09686) VUID-VkCopyTensorInfoARM-regionCount-09686

`regionCount` must be equal to 1

* 
[](#VUID-VkCopyTensorInfoARM-pRegions-09687) VUID-VkCopyTensorInfoARM-pRegions-09687

Each element of `pRegions` **must** be a [VkTensorCopyARM](VkTensorCopyARM.html)
structure whose `pSrcOffset` is `NULL` or has all its elements equal
to `0`

* 
[](#VUID-VkCopyTensorInfoARM-pRegions-09688) VUID-VkCopyTensorInfoARM-pRegions-09688

Each element of `pRegions` **must** be a [VkTensorCopyARM](VkTensorCopyARM.html)
structure whose `pDstOffset` is `NULL` or has all its elements equal
to `0`

* 
[](#VUID-VkCopyTensorInfoARM-pRegions-09689) VUID-VkCopyTensorInfoARM-pRegions-09689

Each element of `pRegions` **must** be a [VkTensorCopyARM](VkTensorCopyARM.html)
structure whose `pExtent` is `NULL` or equal to the
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions` array specified when
`srcTensor` and `dstTensor` were created

* 
[](#VUID-VkCopyTensorInfoARM-pRegions-09954) VUID-VkCopyTensorInfoARM-pRegions-09954

Each element of `pRegions` **must** be a [VkTensorCopyARM](VkTensorCopyARM.html)
structure whose `dimensionCount`, if it is not equal to 0, is equal
to the largest of the [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`dimensionCount`
of `srcTensor` or `dstTensor`

* 
[](#VUID-VkCopyTensorInfoARM-srcTensor-09690) VUID-VkCopyTensorInfoARM-srcTensor-09690

The [format features](../../../../spec/latest/chapters/resources.html#resources-tensor-view-format-features) of
`srcTensor` **must** contain [VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-VkCopyTensorInfoARM-srcTensor-09691) VUID-VkCopyTensorInfoARM-srcTensor-09691

`srcTensor` **must** have been created with the
[VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM](VkTensorUsageFlagBitsARM.html) usage flag set

* 
[](#VUID-VkCopyTensorInfoARM-dstTensor-09692) VUID-VkCopyTensorInfoARM-dstTensor-09692

The [format features](../../../../spec/latest/chapters/resources.html#resources-tensor-view-format-features) of
`dstTensor` **must** contain [VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-VkCopyTensorInfoARM-dstTensor-09693) VUID-VkCopyTensorInfoARM-dstTensor-09693

`dstTensor` **must** have been created with the
[VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM](VkTensorUsageFlagBitsARM.html) usage flag set

* 
[](#VUID-VkCopyTensorInfoARM-srcTensor-09694) VUID-VkCopyTensorInfoARM-srcTensor-09694

If `srcTensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

* 
[](#VUID-VkCopyTensorInfoARM-dstTensor-09695) VUID-VkCopyTensorInfoARM-dstTensor-09695

If `dstTensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

Valid Usage (Implicit)

* 
[](#VUID-VkCopyTensorInfoARM-sType-sType) VUID-VkCopyTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_TENSOR_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkCopyTensorInfoARM-pNext-pNext) VUID-VkCopyTensorInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyTensorInfoARM-srcTensor-parameter) VUID-VkCopyTensorInfoARM-srcTensor-parameter

 `srcTensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-VkCopyTensorInfoARM-dstTensor-parameter) VUID-VkCopyTensorInfoARM-dstTensor-parameter

 `dstTensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-VkCopyTensorInfoARM-pRegions-parameter) VUID-VkCopyTensorInfoARM-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkTensorCopyARM](VkTensorCopyARM.html) structures

* 
[](#VUID-VkCopyTensorInfoARM-regionCount-arraylength) VUID-VkCopyTensorInfoARM-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-VkCopyTensorInfoARM-commonparent) VUID-VkCopyTensorInfoARM-commonparent

 Both of `dstTensor`, and `srcTensor` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [VkTensorCopyARM](VkTensorCopyARM.html), [vkCmdCopyTensorARM](vkCmdCopyTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyTensorInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
