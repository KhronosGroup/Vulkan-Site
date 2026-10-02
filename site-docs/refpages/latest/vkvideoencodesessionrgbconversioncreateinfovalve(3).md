# VkVideoEncodeSessionRgbConversionCreateInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeSessionRgbConversionCreateInfoVALVE - Structure specifying video encode RGB conversion parameters for a video session

The `VkVideoEncodeSessionRgbConversionCreateInfoVALVE` structure is
defined as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef struct VkVideoEncodeSessionRgbConversionCreateInfoVALVE {
    VkStructureType                                  sType;
    const void*                                      pNext;
    VkVideoEncodeRgbModelConversionFlagBitsVALVE     rgbModel;
    VkVideoEncodeRgbRangeCompressionFlagBitsVALVE    rgbRange;
    VkVideoEncodeRgbChromaOffsetFlagBitsVALVE        xChromaOffset;
    VkVideoEncodeRgbChromaOffsetFlagBitsVALVE        yChromaOffset;
} VkVideoEncodeSessionRgbConversionCreateInfoVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rgbModel` is the used
[R′G′B′ model conversion](../../../../spec/latest/chapters/videocoding.html#encode-rgb-conversion-model-conversion)
for the R′G′B′ conversion.

* 
`rgbRange` is the used
[R′G′B′ range compression](../../../../spec/latest/chapters/videocoding.html#encode-rgb-conversion-range-compression)
for the R′G′B′ conversion.

* 
`xChromaOffset` describes the output location of downsampled chroma
components in the x dimension for the R′G′B′ conversion.

* 
`yChromaOffset` describes the output location of downsampled chroma
components in the y dimension for the R′G′B′ conversion.

Valid Usage

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbModel-10930) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbModel-10930

`rgbModel` **must** only be a bit set in
[VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)::`rgbModels` as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`VkVideoEncodeRgbConversionCapabilitiesVALVE` in the `pNext`
chain of `VkVideoCapabilitiesKHR` with the given `pVideoProfile`

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbRange-10931) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbRange-10931

`rgbRange` **must** only be a bit set in
[VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)::`rgbRanges` as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`VkVideoEncodeRgbConversionCapabilitiesVALVE` in the `pNext`
chain of `VkVideoCapabilitiesKHR` with the given `pVideoProfile`

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-xChromaOffset-10932) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-xChromaOffset-10932

`xChromaOffset` **must** only be a bit set in
[VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)::`xChromaOffsets`
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`VkVideoEncodeRgbConversionCapabilitiesVALVE` in the `pNext`
chain of `VkVideoCapabilitiesKHR` with the given `pVideoProfile`

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-yChromaOffset-10933) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-yChromaOffset-10933

`yChromaOffset` **must** only be a bit set in
[VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)::`yChromaOffsets`
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`VkVideoEncodeRgbConversionCapabilitiesVALVE` in the `pNext`
chain of `VkVideoCapabilitiesKHR` with the given `pVideoProfile`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-sType-sType) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_RGB_CONVERSION_CREATE_INFO_VALVE](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbModel-parameter) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbModel-parameter

 `rgbModel` **must** be a valid [VkVideoEncodeRgbModelConversionFlagBitsVALVE](VkVideoEncodeRgbModelConversionFlagBitsVALVE.html) value

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbRange-parameter) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-rgbRange-parameter

 `rgbRange` **must** be a valid [VkVideoEncodeRgbRangeCompressionFlagBitsVALVE](VkVideoEncodeRgbRangeCompressionFlagBitsVALVE.html) value

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-xChromaOffset-parameter) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-xChromaOffset-parameter

 `xChromaOffset` **must** be a valid [VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html) value

* 
[](#VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-yChromaOffset-parameter) VUID-VkVideoEncodeSessionRgbConversionCreateInfoVALVE-yChromaOffset-parameter

 `yChromaOffset` **must** be a valid [VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html), [VkVideoEncodeRgbModelConversionFlagBitsVALVE](VkVideoEncodeRgbModelConversionFlagBitsVALVE.html), [VkVideoEncodeRgbRangeCompressionFlagBitsVALVE](VkVideoEncodeRgbRangeCompressionFlagBitsVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeSessionRgbConversionCreateInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
