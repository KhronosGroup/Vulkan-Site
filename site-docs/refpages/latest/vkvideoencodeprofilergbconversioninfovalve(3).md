# VkVideoEncodeProfileRgbConversionInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeProfileRgbConversionInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeProfileRgbConversionInfoVALVE - Structure describing video encode RGB conversion for a video profile

A video profile supporting video encode R′G′B′ conversion is specified
by an `pVideoProfile->videoCodecOperation` specifying an encode
operation and including a `VkVideoEncodeProfileRgbConversionInfoVALVE`
structure in the `pNext` chain of the [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure and enabling `performEncodeRgbConversion`.

The `VkVideoEncodeProfileRgbConversionInfoVALVE` structure is defined
as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef struct VkVideoEncodeProfileRgbConversionInfoVALVE {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           performEncodeRgbConversion;
} VkVideoEncodeProfileRgbConversionInfoVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`performEncodeRgbConversion` is a boolean value indicating whether
video encode R′G′B′ conversion will be used for the encode
operation.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeProfileRgbConversionInfoVALVE-sType-sType) VUID-VkVideoEncodeProfileRgbConversionInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_PROFILE_RGB_CONVERSION_INFO_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeProfileRgbConversionInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
