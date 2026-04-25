# VkVideoFormatQuantizationMapPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoFormatQuantizationMapPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoFormatQuantizationMapPropertiesKHR - Structure describing quantization map properties

When calling [vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html), the
[VkVideoFormatQuantizationMapPropertiesKHR](#) structure **can** be included
in the `pNext` chain of the [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html) structure
to retrieve video format properties specific to video encode quantization
maps.

The `VkVideoFormatQuantizationMapPropertiesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkVideoFormatQuantizationMapPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         quantizationMapTexelSize;
} VkVideoFormatQuantizationMapPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`quantizationMapTexelSize` indicates the
[quantization map texel size](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size) of
the video format, i.e. the number of pixels corresponding to each
quantization map texel.

The values returned in this structure are only defined if the allowed image
usage flags returned in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageUsageFlags` for this video
format include
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html).

Implementations **may** support multiple quantization map texel sizes for a
particular video format which is indicated by
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) returning multiple entries
with different `quantizationMapTexelSize` values.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoFormatQuantizationMapPropertiesKHR-sType-sType) VUID-VkVideoFormatQuantizationMapPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_FORMAT_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoFormatQuantizationMapPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
