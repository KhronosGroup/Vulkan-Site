# VkVideoEncodeAV1QuantizationMapCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1QuantizationMapCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1QuantizationMapCapabilitiesKHR - Structure describing AV1 encode quantization map capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities of an [AV1 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile), the
`VkVideoEncodeAV1QuantizationMapCapabilitiesKHR` structure **can** be
included in the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)
structure to retrieve additional video encode quantization map capabilities
specific to AV1 encode profiles.

The `VkVideoEncodeAV1QuantizationMapCapabilitiesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_av1 with VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeAV1QuantizationMapCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    int32_t            minQIndexDelta;
    int32_t            maxQIndexDelta;
} VkVideoEncodeAV1QuantizationMapCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minQIndexDelta` indicates the minimum quantizer index delta value
supported for [AV1 quantizer index delta    maps](../../../../spec/latest/chapters/videocoding.html#encode-av1-qindex-delta-map).

* 
`maxQIndexDelta` indicates the maximum quantizer index delta value
supported for [AV1 quantizer index delta    maps](../../../../spec/latest/chapters/videocoding.html#encode-av1-qindex-delta-map).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1QuantizationMapCapabilitiesKHR-sType-sType) VUID-VkVideoEncodeAV1QuantizationMapCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1QuantizationMapCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
