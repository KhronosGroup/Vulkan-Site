# VkVideoEncodeH265QpKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265QpKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265QpKHR - Structure describing H.265 QP values per picture type

The `VkVideoEncodeH265QpKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265QpKHR {
    int32_t    qpI;
    int32_t    qpP;
    int32_t    qpB;
} VkVideoEncodeH265QpKHR;

* 
`qpI` is the QP to be used for [I pictures](../../../../spec/latest/chapters/videocoding.html#encode-h265-i-pic).

* 
`qpP` is the QP to be used for [P pictures](../../../../spec/latest/chapters/videocoding.html#encode-h265-p-pic).

* 
`qpB` is the QP to be used for [B pictures](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic).

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265QualityLevelPropertiesKHR](VkVideoEncodeH265QualityLevelPropertiesKHR.html), [VkVideoEncodeH265RateControlLayerInfoKHR](VkVideoEncodeH265RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265QpKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
