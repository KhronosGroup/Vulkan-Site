# VkSamplerYcbcrModelConversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrModelConversion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrModelConversion - Color model component of a color space

[VkSamplerYcbcrModelConversion](#) defines the conversion from the source
color model to the shader color model.
Possible values are:

// Provided by VK_VERSION_1_1
typedef enum VkSamplerYcbcrModelConversion {
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY = 0,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY = 1,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709 = 2,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601 = 3,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020 = 4,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020,
} VkSamplerYcbcrModelConversion;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrModelConversion
typedef VkSamplerYcbcrModelConversion VkSamplerYcbcrModelConversionKHR;

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](#) specifies that the
input values to the conversion are unmodified.

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY](#) specifies no
model conversion but the inputs are range expanded as for Y′CBCR.

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709](#) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.709 and
described in the “BT.709 Y′CBCR conversion” section of the
[Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601](#) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.601 and
described in the “BT.601 Y′CBCR conversion” section of the
[Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020](#) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.2020 and
described in the “BT.2020 Y′CBCR conversion” section of the
[Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

In the `VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_*` color models, for the
input to the sampler Y′CBCR range expansion and model conversion:

* 
the Y (Y′ luma) component corresponds to the G component of an RGB
image.

* 
the CB (CB or “U” blue color difference) component corresponds to
the B component of an RGB image.

* 
the CR (CR or “V” red color difference) component corresponds to the
R component of an RGB image.

* 
the alpha component, if present, is not modified by color model
conversion.

These rules reflect the mapping of components after the component swizzle
operation (controlled by
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)::`components`).

|  | For example, an “YUVA” 32-bit format comprising four 8-bit components can
| --- | --- |
be implemented as [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html) with a component mapping:

* 
`components.a` = [VK_COMPONENT_SWIZZLE_IDENTITY](VkComponentSwizzle.html)

* 
`components.r` = [VK_COMPONENT_SWIZZLE_B](VkComponentSwizzle.html)

* 
`components.g` = [VK_COMPONENT_SWIZZLE_R](VkComponentSwizzle.html)

* 
`components.b` = [VK_COMPONENT_SWIZZLE_G](VkComponentSwizzle.html) |

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrModelConversion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
