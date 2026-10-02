# VkVideoFormatH265QuantizationMapPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoFormatH265QuantizationMapPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoFormatH265QuantizationMapPropertiesKHR - Structure describing H.265 quantization map properties

When calling [vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html), the
`VkVideoFormatH265QuantizationMapPropertiesKHR` structure **can** be
included in the `pNext` chain of the [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)
structure to retrieve video format properties specific to video encode
quantization maps used with an [H.265 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile).

The `VkVideoFormatH265QuantizationMapPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_quantization_map
typedef struct VkVideoFormatH265QuantizationMapPropertiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    VkVideoEncodeH265CtbSizeFlagsKHR    compatibleCtbSizes;
} VkVideoFormatH265QuantizationMapPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compatibleCtbSizes` is a bitmask of
[VkVideoEncodeH265CtbSizeFlagBitsKHR](VkVideoEncodeH265CtbSizeFlagBitsKHR.html) indicating the CTB sizes that
quantization maps using this video format are compatible with.

|  | The value of `compatibleCtbSizes` does not limit the use of the specific
| --- | --- |
quantization map format, but does limit the implementation in being able to
encode pictures with CTB sizes not included in `compatibleCtbSizes` but
otherwise supported by the used video profile, as indicated by
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`ctbSizes`.
In particular, using smaller
[quantization map texel sizes](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size) may
prevent implementations from encoding with larger CTB sizes which may have a
negative impact on the efficiency of the encoder. |

The values returned in this structure are only defined if the allowed image
usage flags returned in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageUsageFlags` for this video
format include
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoFormatH265QuantizationMapPropertiesKHR-sType-sType) VUID-VkVideoFormatH265QuantizationMapPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_FORMAT_H265_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH265CtbSizeFlagsKHR](VkVideoEncodeH265CtbSizeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoFormatH265QuantizationMapPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
