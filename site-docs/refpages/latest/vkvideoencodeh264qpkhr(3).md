# VkVideoEncodeH264QpKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264QpKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264QpKHR - Structure describing H.264 QP values per picture type

The `VkVideoEncodeH264QpKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264QpKHR {
    int32_t    qpI;
    int32_t    qpP;
    int32_t    qpB;
} VkVideoEncodeH264QpKHR;

* 
`qpI` is the QP to be used for [I pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-i-pic).

* 
`qpP` is the QP to be used for [P pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-p-pic).

* 
`qpB` is the QP to be used for [B pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-b-pic).

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkVideoEncodeH264QualityLevelPropertiesKHR](VkVideoEncodeH264QualityLevelPropertiesKHR.html), [VkVideoEncodeH264RateControlLayerInfoKHR](VkVideoEncodeH264RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264QpKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
