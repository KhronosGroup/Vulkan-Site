# VkTensorExplicitTilingFormatPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorExplicitTilingFormatPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorExplicitTilingFormatPropertiesARM - Structure specifying properties of a format used to describe tensor elements with ARM-specific explicit tiling

The [VkTensorExplicitTilingFormatPropertiesARM](#) structure describes
properties of a [VkFormat](VkFormat.html) when that format is used to describe tensor
elements.
These properties, like those of [VkFormatProperties2](VkFormatProperties2.html), are independent
of any particular tensor.

The [VkTensorExplicitTilingFormatPropertiesARM](#) structure is defined as:

// Provided by VK_ARM_tensor_controls
typedef struct VkTensorExplicitTilingFormatPropertiesARM {
    VkStructureType          sType;
    void*                    pNext;
    VkFormatFeatureFlags2    brick16TilingTensorFeatures;
    VkFormatFeatureFlags2    brick8TilingTensorFeatures;
    VkFormatFeatureFlags2    brick4TilingTensorFeatures;
    VkFormatFeatureFlags2    blockUTilingTensorFeatures;
    VkFormatFeatureFlags2    blockU64kTilingTensorFeatures;
} VkTensorExplicitTilingFormatPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`brick16TilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_BRICK_16_WIDE_ARM](VkTensorTilingARM.html).

* 
`brick8TilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_BRICK_8_WIDE_ARM](VkTensorTilingARM.html).

* 
`brick4TilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_BRICK_4_WIDE_ARM](VkTensorTilingARM.html).

* 
`blockUTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_ARM](VkTensorTilingARM.html).

* 
`blockU64kTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_64K_ARM](VkTensorTilingARM.html).

Valid Usage (Implicit)

* 
[](#VUID-VkTensorExplicitTilingFormatPropertiesARM-sType-sType) VUID-VkTensorExplicitTilingFormatPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_EXPLICIT_TILING_FORMAT_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_ARM_tensor_controls](VK_ARM_tensor_controls.html), [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkTensorExplicitTilingFormatPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
