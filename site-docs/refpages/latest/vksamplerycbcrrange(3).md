# VkSamplerYcbcrRange(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrRange.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrRange - Range of encoded values in a color space

The [VkSamplerYcbcrRange](#) enum describes whether color components are
encoded using the full range of numerical values or whether values are
reserved for headroom and foot room.
[VkSamplerYcbcrRange](#) is defined as:

// Provided by VK_VERSION_1_1
typedef enum VkSamplerYcbcrRange {
    VK_SAMPLER_YCBCR_RANGE_ITU_FULL = 0,
    VK_SAMPLER_YCBCR_RANGE_ITU_NARROW = 1,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_RANGE_ITU_FULL_KHR = VK_SAMPLER_YCBCR_RANGE_ITU_FULL,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_RANGE_ITU_NARROW_KHR = VK_SAMPLER_YCBCR_RANGE_ITU_NARROW,
} VkSamplerYcbcrRange;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrRange
typedef VkSamplerYcbcrRange VkSamplerYcbcrRangeKHR;

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_FULL](#) specifies that the full range of
the encoded values are valid and interpreted according to the ITU “full
range” quantization rules.

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](#) specifies that headroom and foot
room are reserved in the numerical range of encoded values, and the
remaining values are expanded according to the ITU “narrow range”
quantization rules.

The formulae for these conversions is described in the
[Sampler Y′CBCR Range Expansion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion-rangeexpand) section of the [Image Operations](../../../../spec/latest/chapters/textures.html#textures) chapter.

No range modification takes place if `ycbcrModel` is
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](VkSamplerYcbcrModelConversion.html); the `ycbcrRange`
field of [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) is ignored in this case.

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrRange).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
