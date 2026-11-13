# VkVideoEncodeH265QuantizationMapCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265QuantizationMapCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265QuantizationMapCapabilitiesKHR - Structure describing H.265 encode quantization map capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities of an [H.265 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile), the
`VkVideoEncodeH265QuantizationMapCapabilitiesKHR` structure **can** be
included in the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)
structure to retrieve additional video encode quantization map capabilities
specific to H.265 encode profiles.

The `VkVideoEncodeH265QuantizationMapCapabilitiesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeH265QuantizationMapCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    int32_t            minQpDelta;
    int32_t            maxQpDelta;
} VkVideoEncodeH265QuantizationMapCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minQpDelta` indicates the minimum QP delta value supported for
[H.265 QP delta maps](../../../../spec/latest/chapters/videocoding.html#encode-h265-qp-delta-map).

* 
`maxQpDelta` indicates the maximum QP delta value supported for
[H.265 QP delta maps](../../../../spec/latest/chapters/videocoding.html#encode-h265-qp-delta-map).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265QuantizationMapCapabilitiesKHR-sType-sType) VUID-VkVideoEncodeH265QuantizationMapCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265QuantizationMapCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
