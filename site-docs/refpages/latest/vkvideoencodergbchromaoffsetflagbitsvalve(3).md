# VkVideoEncodeRgbChromaOffsetFlagBitsVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRgbChromaOffsetFlagBitsVALVE - Position of downsampled chroma samples for encode RGB conversion

The model-converted values are chroma subsampled and quantized, according to
the `chromaSubsampling`, `lumaBitDepth` and `chromaBitDepth`
values specified by the bound video session.

The [VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](#) enum defines the
location of downsampled chroma component samples relative to the luma
samples for video encode R′G′B′ conversion, and is defined as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef enum VkVideoEncodeRgbChromaOffsetFlagBitsVALVE {
    VK_VIDEO_ENCODE_RGB_CHROMA_OFFSET_COSITED_EVEN_BIT_VALVE = 0x00000001,
    VK_VIDEO_ENCODE_RGB_CHROMA_OFFSET_MIDPOINT_BIT_VALVE = 0x00000002,
} VkVideoEncodeRgbChromaOffsetFlagBitsVALVE;

* 
[VK_VIDEO_ENCODE_RGB_CHROMA_OFFSET_COSITED_EVEN_BIT_VALVE](#) specifies
that downsampled chroma samples are aligned with luma samples with even
coordinates.

* 
[VK_VIDEO_ENCODE_RGB_CHROMA_OFFSET_MIDPOINT_BIT_VALVE](#) specifies
that downsampled chroma samples are located half way between each even
luma sample and the nearest higher odd luma sample.

The output location of downsampled chroma components are specified by the
`xChromaOffset` and `yChromaOffset` values of the
[VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html) structure:

Chroma subsampling is described in more detail in the
[Chroma Reconstruction](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction) section.

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), [VkVideoEncodeRgbChromaOffsetFlagsVALVE](VkVideoEncodeRgbChromaOffsetFlagsVALVE.html), [VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRgbChromaOffsetFlagBitsVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
