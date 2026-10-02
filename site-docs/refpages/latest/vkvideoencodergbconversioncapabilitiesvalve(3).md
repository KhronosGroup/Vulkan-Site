# VkVideoEncodeRgbConversionCapabilitiesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRgbConversionCapabilitiesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRgbConversionCapabilitiesVALVE - Structure describing video encode rgb conversion capabilities for a video profile

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`pVideoProfile->videoCodecOperation` specifying an encode operation, the
[VkVideoEncodeRgbConversionCapabilitiesVALVE](#) structure **can** be included
in the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html) structure to
retrieve capabilities specific to video encode R′G′B′ conversion.

The `VkVideoEncodeRgbConversionCapabilitiesVALVE` structure is defined
as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef struct VkVideoEncodeRgbConversionCapabilitiesVALVE {
    VkStructureType                               sType;
    void*                                         pNext;
    VkVideoEncodeRgbModelConversionFlagsVALVE     rgbModels;
    VkVideoEncodeRgbRangeCompressionFlagsVALVE    rgbRanges;
    VkVideoEncodeRgbChromaOffsetFlagsVALVE        xChromaOffsets;
    VkVideoEncodeRgbChromaOffsetFlagsVALVE        yChromaOffsets;
} VkVideoEncodeRgbConversionCapabilitiesVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rgbModels` is a bitmask of
[VkVideoEncodeRgbModelConversionFlagBitsVALVE](VkVideoEncodeRgbModelConversionFlagBitsVALVE.html) describing supported
[model conversions](../../../../spec/latest/chapters/videocoding.html#encode-rgb-conversion-model-conversion) for video
encode R′G′B′ conversion.

* 
`rgbRanges` is a bitmask of
[VkVideoEncodeRgbRangeCompressionFlagBitsVALVE](VkVideoEncodeRgbRangeCompressionFlagBitsVALVE.html) describing supported
[range compressions](../../../../spec/latest/chapters/videocoding.html#encode-rgb-conversion-range-compression) for video
encode R′G′B′ conversion.

* 
`xChromaOffsets` is a bitmask of
[VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html) describing supported
offsets of the output location of the downsampled chroma component on
the X axis for video encode R′G′B′ conversion.

* 
`yChromaOffsets` is a bitmask of
[VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html) describing supported
offsets of the output location of the downsampled chroma component on
the Y axis for video encode R′G′B′ conversion.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeRgbConversionCapabilitiesVALVE-sType-sType) VUID-VkVideoEncodeRgbConversionCapabilitiesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_RGB_CONVERSION_CAPABILITIES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeRgbChromaOffsetFlagsVALVE](VkVideoEncodeRgbChromaOffsetFlagsVALVE.html), [VkVideoEncodeRgbModelConversionFlagsVALVE](VkVideoEncodeRgbModelConversionFlagsVALVE.html), [VkVideoEncodeRgbRangeCompressionFlagsVALVE](VkVideoEncodeRgbRangeCompressionFlagsVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRgbConversionCapabilitiesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
