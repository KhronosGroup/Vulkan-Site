# VkSamplerYcbcrConversionInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrConversionInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrConversionInfo - Structure specifying Y′CBCR conversion to a sampler or image view

To create a sampler with Y′CBCR conversion enabled, add a
[VkSamplerYcbcrConversionInfo](#) structure to the `pNext` chain of the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure.
To create a sampler Y′CBCR conversion, the
[`samplerYcbcrConversion`](../../../../spec/latest/chapters/features.html#features-samplerYcbcrConversion) feature
**must** be enabled.
Conversion **must** be fixed at pipeline creation time, through use of
a combined [embedded sampler and image mapping](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT) if using descriptor heaps, or
a combined image sampler with an immutable sampler in
`VkDescriptorSetLayoutBinding`.

A [VkSamplerYcbcrConversionInfo](#) **must** be provided for samplers to be
used with image views that access [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) if the
format is one of the [formats that require a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)
, or if the image view has an
[external format](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats)
.

The `VkSamplerYcbcrConversionInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSamplerYcbcrConversionInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkSamplerYcbcrConversion    conversion;
} VkSamplerYcbcrConversionInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversionInfo
typedef VkSamplerYcbcrConversionInfo VkSamplerYcbcrConversionInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`conversion` is a [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) handle created with
[vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionInfo-sType-sType) VUID-VkSamplerYcbcrConversionInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO](VkStructureType.html)

* 
[](#VUID-VkSamplerYcbcrConversionInfo-conversion-parameter) VUID-VkSamplerYcbcrConversionInfo-conversion-parameter

 `conversion` **must** be a valid [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrConversionInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
