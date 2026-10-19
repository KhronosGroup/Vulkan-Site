# VkVideoFormatAV1QuantizationMapPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoFormatAV1QuantizationMapPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoFormatAV1QuantizationMapPropertiesKHR - Structure describing AV1 quantization map properties

When calling [vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html), the
`VkVideoFormatAV1QuantizationMapPropertiesKHR` structure **can** be
included in the `pNext` chain of the [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)
structure to retrieve video format properties specific to video encode
quantization maps used with an [AV1 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile).

The `VkVideoFormatAV1QuantizationMapPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_av1 with VK_KHR_video_encode_quantization_map
typedef struct VkVideoFormatAV1QuantizationMapPropertiesKHR {
    VkStructureType                           sType;
    void*                                     pNext;
    VkVideoEncodeAV1SuperblockSizeFlagsKHR    compatibleSuperblockSizes;
} VkVideoFormatAV1QuantizationMapPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compatibleSuperblockSizes` is a bitmask of
[VkVideoEncodeAV1SuperblockSizeFlagBitsKHR](VkVideoEncodeAV1SuperblockSizeFlagBitsKHR.html) indicating the AV1
superblock sizes that quantization maps using this video format are
compatible with.

|  | The value of `compatibleSuperblockSizes` does not limit the use of the
| --- | --- |
specific quantization map format, but does limit the implementation in being
able to encode pictures with superblock sizes not included in
`compatibleSuperblockSizes` but otherwise supported by the used video
profile, as indicated by
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`superblockSizes`.
In particular, using smaller
[quantization map texel sizes](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size) may
prevent implementations from encoding with larger superblock sizes which may
have a negative impact on the efficiency of the encoder. |

The values returned in this structure are only defined if the allowed image
usage flags returned in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageUsageFlags` for this video
format include
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoFormatAV1QuantizationMapPropertiesKHR-sType-sType) VUID-VkVideoFormatAV1QuantizationMapPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_FORMAT_AV1_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeAV1SuperblockSizeFlagsKHR](VkVideoEncodeAV1SuperblockSizeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoFormatAV1QuantizationMapPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
