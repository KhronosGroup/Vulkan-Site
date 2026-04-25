# VkVideoEncodeRgbModelConversionFlagBitsVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRgbModelConversionFlagBitsVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRgbModelConversionFlagBitsVALVE - Color model conversions for encode RGB conversion

The range-compressed values are converted between color models, according to
the color model conversion specified in the `rgbModel` member of the
[VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html) structure.

[VkVideoEncodeRgbModelConversionFlagBitsVALVE](#) defines the conversion
from the [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture-info)'s color model to
the encode color model.

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef enum VkVideoEncodeRgbModelConversionFlagBitsVALVE {
    VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_RGB_IDENTITY_BIT_VALVE = 0x00000001,
    VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_IDENTITY_BIT_VALVE = 0x00000002,
    VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_709_BIT_VALVE = 0x00000004,
    VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_601_BIT_VALVE = 0x00000008,
    VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_2020_BIT_VALVE = 0x00000010,
} VkVideoEncodeRgbModelConversionFlagBitsVALVE;

* 
[VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_RGB_IDENTITY_BIT_VALVE](#)
specifies the color components are not modified by the color model
conversion since they are assumed to represent the desired color model
for video coding; R′G′B′ range compression is applied to the
components.

* 
[VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_IDENTITY_BIT_VALVE](#)
specifies the color components are not modified by the color model
conversion are assumed to be treated as though in Y′CBCR form; video
encode R′G′B′ range compression and video encode R′G′B′ chroma
subsampling is also ignored.

* 
[VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_709_BIT_VALVE](#) specifies
the color components are transformed from an R′G′B′ representation
to a Y′CBCR representation as described in the “BT.709 Y′CBCR
conversion” section of the [Khronos Data Format    Specification](../../../../spec/latest/chapters/introduction.html#data-format).

* 
[VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_601_BIT_VALVE](#) specifies
the color components are transformed from an R′G′B′ representation
to a Y′CBCR representation as described in the “BT.601 Y′CBCR
conversion” section of the [Khronos Data Format    Specification](../../../../spec/latest/chapters/introduction.html#data-format).

* 
[VK_VIDEO_ENCODE_RGB_MODEL_CONVERSION_YCBCR_2020_BIT_VALVE](#)
specifies the color components are transformed from an R′G′B′
representation to a Y′CBCR representation as described in the “BT.2020
Y′CBCR conversion” section of the [Khronos Data Format    Specification](../../../../spec/latest/chapters/introduction.html#data-format).

|  | Video encode R′G′B′ model conversion transformations have the inverse
| --- | --- |
definition of [sampler Y′CBCR model conversion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion-modelconversion) transformations. |

|  | The video encode R′G′B′ model conversion step does not apply any
| --- | --- |
transfer function, only converting from R′G′B′ to Y′CBCR using the
primaries of the specified `rgbModel` color model. |

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), [VkVideoEncodeRgbModelConversionFlagsVALVE](VkVideoEncodeRgbModelConversionFlagsVALVE.html), [VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRgbModelConversionFlagBitsVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
