# VkVideoEncodeH264QuantizationMapCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264QuantizationMapCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264QuantizationMapCapabilitiesKHR - Structure describing H.264 encode quantization map capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities of an [H.264 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), the
`VkVideoEncodeH264QuantizationMapCapabilitiesKHR` structure **can** be
included in the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)
structure to retrieve additional video encode quantization map capabilities
specific to H.264 encode profiles.

The `VkVideoEncodeH264QuantizationMapCapabilitiesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_h264 with VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeH264QuantizationMapCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    int32_t            minQpDelta;
    int32_t            maxQpDelta;
} VkVideoEncodeH264QuantizationMapCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minQpDelta` indicates the minimum QP delta value supported for
[H.264 QP delta maps](../../../../spec/latest/chapters/videocoding.html#encode-h264-qp-delta-map).

* 
`maxQpDelta` indicates the maximum QP delta value supported for
[H.264 QP delta maps](../../../../spec/latest/chapters/videocoding.html#encode-h264-qp-delta-map).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264QuantizationMapCapabilitiesKHR-sType-sType) VUID-VkVideoEncodeH264QuantizationMapCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264QuantizationMapCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
