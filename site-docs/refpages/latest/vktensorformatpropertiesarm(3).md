# VkTensorFormatPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorFormatPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorFormatPropertiesARM - Structure specifying properties of a format used to describe tensor elements

The [VkTensorFormatPropertiesARM](#) structure describes properties of a
[VkFormat](VkFormat.html) when that format is used to describe tensor elements.
These properties, like those of [VkFormatProperties2](VkFormatProperties2.html), are independent
of any particular tensor.

The [VkTensorFormatPropertiesARM](#) structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorFormatPropertiesARM {
    VkStructureType          sType;
    void*                    pNext;
    VkFormatFeatureFlags2    optimalTilingTensorFeatures;
    VkFormatFeatureFlags2    linearTilingTensorFeatures;
} VkTensorFormatPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`linearTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_LINEAR_ARM](VkTensorTilingARM.html).

* 
`optimalTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_OPTIMAL_ARM](VkTensorTilingARM.html).

Valid Usage (Implicit)

* 
[](#VUID-VkTensorFormatPropertiesARM-sType-sType) VUID-VkTensorFormatPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_FORMAT_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkTensorFormatPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
