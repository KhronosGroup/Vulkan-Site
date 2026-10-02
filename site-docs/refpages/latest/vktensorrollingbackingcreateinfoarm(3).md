# VkTensorRollingBackingCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorRollingBackingCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorRollingBackingCreateInfoARM - Structure specifying the parameters of a newly created tensor object with rolling backing

To create a tensor for which only a rolling window is backed by memory, add
a [VkTensorRollingBackingCreateInfoARM](#) structure to the `pNext`
chain of the [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html) structure.

The [VkTensorRollingBackingCreateInfoARM](#) structure is defined as:

// Provided by VK_ARM_tensor_controls
typedef struct VkTensorRollingBackingCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           wraps[VK_MAX_TENSOR_CREATE_INFO_ROLLING_BACKING_WRAP_COUNT_ARM];
} VkTensorRollingBackingCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`wraps` is an array of
[VK_MAX_TENSOR_CREATE_INFO_ROLLING_BACKING_WRAP_COUNT_ARM](VK_MAX_TENSOR_CREATE_INFO_ROLLING_BACKING_WRAP_COUNT_ARM.html) 32-bit
integers specifying the size of the rolling window for the tensor along
each of its dimensions.

Rolling backing common parameters

Valid values for some rolling backing creation parameters are calculated
from others that are a function of tensor creation parameters.
To improve the readability of Valid Usage rules for
[VkTensorRollingBackingCreateInfoARM](#), these latter values are defined
once in this inset.

* 
Let uint32_t `brickOuterSize` define the size of a brick along
its outermost dimension.

If [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`tiling` is
[VK_TENSOR_TILING_BRICK_16_WIDE_ARM](VkTensorTilingARM.html), then
`brickOuterSize` = 16.

* 
If [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`tiling` is
[VK_TENSOR_TILING_BRICK_8_WIDE_ARM](VkTensorTilingARM.html), then `brickOuterSize`
= 8.

* 
If [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`tiling` is
[VK_TENSOR_TILING_BRICK_4_WIDE_ARM](VkTensorTilingARM.html), then `brickOuterSize`
= 4.

* 
Otherwise, `brickOuterSize` = 1.

Let uint32_t `elementSize` define the size of individual
elements of the tensor.

Valid Usage

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-wraps-09835) VUID-VkTensorRollingBackingCreateInfoARM-wraps-09835

For each i where i ,
`wraps`[i] **must** be less than or equal to
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[i]

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-wraps-09836) VUID-VkTensorRollingBackingCreateInfoARM-wraps-09836

For each i where i ,
`wraps`[i] **must** either be equal to
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[i] or **must** be less than
2^16

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-wraps-09837) VUID-VkTensorRollingBackingCreateInfoARM-wraps-09837

For each i where i , if
`wraps`[i] is not equal to
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[i] and one element
`wraps`[j] with j  is not a power of two, then
`wraps`[i] **must** be a power of two

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-wraps-09838) VUID-VkTensorRollingBackingCreateInfoARM-wraps-09838

If [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`dimensionCount` is greater than 1,
then `wraps`[`dimensionCount` - 2] **must** be a multiple of
`brickOuterSize` or **must** be equal to
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[`dimensionCount` -
2]

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-wraps-09839) VUID-VkTensorRollingBackingCreateInfoARM-wraps-09839

If `brickOuterSize` is not equal to 1, then
`wraps`[`dimensionCount` - 1] **must** be a multiple of 64 /
`brickOuterSize` / `elementSize` or be equal to
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[`dimensionCount` -
1]

Valid Usage (Implicit)

* 
[](#VUID-VkTensorRollingBackingCreateInfoARM-sType-sType) VUID-VkTensorRollingBackingCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_ROLLING_BACKING_CREATE_INFO_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

[VK_ARM_tensor_controls](VK_ARM_tensor_controls.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorRollingBackingCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
