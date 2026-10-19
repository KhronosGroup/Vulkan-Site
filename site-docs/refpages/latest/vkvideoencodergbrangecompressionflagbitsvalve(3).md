# VkVideoEncodeRgbRangeCompressionFlagBitsVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRgbRangeCompressionFlagBitsVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRgbRangeCompressionFlagBitsVALVE - Range compression operation to perform for encode rgb conversion

The video encode R′G′B′ range compression to be applied to color
component values of the [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) before
video coding is defined by the `rgbRange` member of the
[VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html) structure.

The [VkVideoEncodeRgbRangeCompressionFlagBitsVALVE](#) enum describes
whether color components are encoded using the full range of numerical
values or whether values are reserved for headroom and foot room:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef enum VkVideoEncodeRgbRangeCompressionFlagBitsVALVE {
    VK_VIDEO_ENCODE_RGB_RANGE_COMPRESSION_FULL_RANGE_BIT_VALVE = 0x00000001,
    VK_VIDEO_ENCODE_RGB_RANGE_COMPRESSION_NARROW_RANGE_BIT_VALVE = 0x00000002,
} VkVideoEncodeRgbRangeCompressionFlagBitsVALVE;

* 
[VK_VIDEO_ENCODE_RGB_RANGE_COMPRESSION_FULL_RANGE_BIT_VALVE](#)
specifies the following transformations are applied:

  

  

|  | These formulae correspond to the “full range” encoding in the
| --- | --- |
“Quantization schemes” chapter of the [Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

Should any future amendments be made to the ITU specifications from which
these equations are derived, the formulae used by Vulkan **may** also be
updated to maintain parity. |

* 
[VK_VIDEO_ENCODE_RGB_RANGE_COMPRESSION_NARROW_RANGE_BIT_VALVE](#)
specifies the following transformations are applied:

  

  

|  | These formulae correspond to the “narrow range” encoding in the
| --- | --- |
“Quantization schemes” chapter of the [Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).

Unlike [sampler Y′CBCR range expansion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion-rangeexpand), no precision guarantees are made for video encode
R′G′B′ range compression. |

* 
*n* is the bit-depth of the components in the bound video session’s
`pictureFormat`.

|  | Video encode R′G′B′ range compression transformations have the inverse
| --- | --- |
definition of the [sampler Y′CBCR range expansion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion-rangeexpand) transformations. |

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), [VkVideoEncodeRgbRangeCompressionFlagsVALVE](VkVideoEncodeRgbRangeCompressionFlagsVALVE.html), [VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRgbRangeCompressionFlagBitsVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
