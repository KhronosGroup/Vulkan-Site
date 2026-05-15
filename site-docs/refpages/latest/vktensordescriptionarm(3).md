# VkTensorDescriptionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorDescriptionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorDescriptionARM - Structure describing a tensor

The `VkTensorDescriptionARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorDescriptionARM {
    VkStructureType          sType;
    const void*              pNext;
    VkTensorTilingARM        tiling;
    VkFormat                 format;
    uint32_t                 dimensionCount;
    const int64_t*           pDimensions;
    const int64_t*           pStrides;
    VkTensorUsageFlagsARM    usage;
} VkTensorDescriptionARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tiling` is a [VkTensorTilingARM](VkTensorTilingARM.html) value specifying the tiling of
the tensor

* 
`format` is a one component [VkFormat](VkFormat.html) describing the format and
type of the data elements that will be contained in the tensor.

* 
`dimensionCount` is the number of dimensions for the tensor.

* 
`pDimensions` is a pointer to an array of integers of size
`dimensionCount` providing the number of data elements in each
dimension.

* 
`pStrides` is either `NULL` or is an array of size
`dimensionCount` providing the strides in bytes for the tensor in
each dimension.

* 
`usage` is a bitmask of [VkTensorUsageFlagBitsARM](VkTensorUsageFlagBitsARM.html) specifying
the usage of the tensor.

When describing a tensor created with [VK_TENSOR_TILING_OPTIMAL_ARM](VkTensorTilingARM.html),
`pStrides` must be equal to `NULL`.
When describing a tensor created with [VK_TENSOR_TILING_LINEAR_ARM](VkTensorTilingARM.html),
`pStrides` is either an array of size `dimensionCount` or `NULL`.

The formats that **must** be supported for `format` are documented in
[Mandatory tensor format support](../../../../spec/latest/chapters/formats.html#features-formats-mandatory-features-tensor).

Each element in the `pStrides` array describes the offset in bytes
between increments of the given dimension.
For example, `pStrides`[0] describes the offset between element
[x0,x1,x2,x3] and element [x0+1,x1,x2,x3].
The `pStrides` array **can** be used to determine whether a tensor is
*packed* or not.
If `pStrides`[`dimensionCount`-1] is equal to the size of a tensor
element and for each dimension `n` greater than 0 and less than
`dimensionCount`, `pStrides`[n-1] is equal to `pStrides`[n] *
`pDimensions`[n], then the tensor is a packed tensor.
If the [tensorNonPacked](../../../../spec/latest/chapters/features.html#features-tensorNonPacked) feature is not enabled,
the tensor **must** be a packed tensor.

When a tensor is created with [VK_TENSOR_TILING_LINEAR_ARM](VkTensorTilingARM.html) and
`pStrides` equal to `NULL` the tensor strides are calculated by the
vulkan implementation such that the resulting tensor is a packed tensor.

Expressed as an addressing formula, the starting byte of an element in a
4-dimensional, for example, linear tensor has address:

// Assume (x0,x1,x2,x3) are in units of elements.

address(x0,x1,x2,x3) = x0*pStrides[0] + x1*pStrides[1] + x2*pStrides[2] + x3*pStrides[3]

Valid Usage

* 
[](#VUID-VkTensorDescriptionARM-dimensionCount-09733) VUID-VkTensorDescriptionARM-dimensionCount-09733

`dimensionCount` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxTensorDimensionCount`

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-09734) VUID-VkTensorDescriptionARM-pDimensions-09734

For each i where i ≤ dimensionCount-1,
`pDimensions`[i] **must** be greater than `0`

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-09883) VUID-VkTensorDescriptionARM-pDimensions-09883

For each i where i ≤ dimensionCount-1,
`pDimensions`[i] **must** be less than or equal to
[    `VkPhysicalDeviceTensorPropertiesARM`::`maxPerDimensionTensorElements`](../../../../spec/latest/chapters/limits.html#limits-maxPerDimensionTensorElements)

* 
[](#VUID-VkTensorDescriptionARM-format-09735) VUID-VkTensorDescriptionARM-format-09735

`format` **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html) and **must** be a
one-component [VkFormat](VkFormat.html)

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09736) VUID-VkTensorDescriptionARM-pStrides-09736

`pStrides`[`dimensionCount`-1] **must** equal the size in
bytes of a tensor element

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09737) VUID-VkTensorDescriptionARM-pStrides-09737

For each i, `pStrides`[i] **must** be a multiple of the
element size

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09738) VUID-VkTensorDescriptionARM-pStrides-09738

For each i, `pStrides`[i] **must** be greater than `0` and
less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxTensorStride`

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09884) VUID-VkTensorDescriptionARM-pStrides-09884

`pStrides`[0] × `pDimensions`[0] **must** be less than
or equal to [    `VkPhysicalDeviceTensorPropertiesARM`::`maxTensorSize`](../../../../spec/latest/chapters/limits.html#limits-maxTensorSize)

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09739) VUID-VkTensorDescriptionARM-pStrides-09739

For each i greater than 0, `pStrides`[i-1] **must** be
greater than or equal to `pStrides`[i] ×
`pDimensions`[i] so that no two elements of the tensor reference
the same memory address

* 
[](#VUID-VkTensorDescriptionARM-None-09740) VUID-VkTensorDescriptionARM-None-09740

If the [tensorNonPacked](../../../../spec/latest/chapters/features.html#features-tensorNonPacked) feature is not
enabled, then the members of [VkTensorDescriptionARM](#) **must** describe
a packed tensor

* 
[](#VUID-VkTensorDescriptionARM-tiling-09741) VUID-VkTensorDescriptionARM-tiling-09741

If `tiling` is [VK_TENSOR_TILING_OPTIMAL_ARM](VkTensorTilingARM.html) and `usage` is
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](VkTensorUsageFlagBitsARM.html) then the size of the tensor
along its innermost dimension, i.e.
`pDimensions`[`dimensionCount` - 1], **must** be less than or
equal to `4`

* 
[](#VUID-VkTensorDescriptionARM-tiling-09742) VUID-VkTensorDescriptionARM-tiling-09742

If `tiling` is [VK_TENSOR_TILING_LINEAR_ARM](VkTensorTilingARM.html) then
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](VkTensorUsageFlagBitsARM.html) **must** not be set in
`usage`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorDescriptionARM-sType-sType) VUID-VkTensorDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_DESCRIPTION_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorDescriptionARM-tiling-parameter) VUID-VkTensorDescriptionARM-tiling-parameter

 `tiling` **must** be a valid [VkTensorTilingARM](VkTensorTilingARM.html) value

* 
[](#VUID-VkTensorDescriptionARM-format-parameter) VUID-VkTensorDescriptionARM-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-parameter) VUID-VkTensorDescriptionARM-pDimensions-parameter

 `pDimensions` **must** be a valid pointer to an array of `dimensionCount` `int64_t` values

* 
[](#VUID-VkTensorDescriptionARM-pStrides-parameter) VUID-VkTensorDescriptionARM-pStrides-parameter

 If `pStrides` is not `NULL`, `pStrides` **must** be a valid pointer to an array of `dimensionCount` `int64_t` values

* 
[](#VUID-VkTensorDescriptionARM-usage-parameter) VUID-VkTensorDescriptionARM-usage-parameter

 `usage` **must** be a valid combination of [VkTensorUsageFlagBitsARM](VkTensorUsageFlagBitsARM.html) values

* 
[](#VUID-VkTensorDescriptionARM-usage-requiredbitmask) VUID-VkTensorDescriptionARM-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkTensorDescriptionARM-dimensionCount-arraylength) VUID-VkTensorDescriptionARM-dimensionCount-arraylength

 `dimensionCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html)

* 
[VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkFormat](VkFormat.html), [VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html), [VkStructureType](VkStructureType.html), [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html), [VkTensorTilingARM](VkTensorTilingARM.html), [VkTensorUsageFlagsARM](VkTensorUsageFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorDescriptionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
