# VkVideoEncodeH264FrameSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264FrameSizeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264FrameSizeKHR - Structure describing frame size values per H.264 picture type

The `VkVideoEncodeH264FrameSizeKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264FrameSizeKHR {
    uint32_t    frameISize;
    uint32_t    framePSize;
    uint32_t    frameBSize;
} VkVideoEncodeH264FrameSizeKHR;

* 
`frameISize` is the size in bytes to be used for
[I pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-i-pic).

* 
`framePSize` is the size in bytes to be used for
[P pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-p-pic).

* 
`frameBSize` is the size in bytes to be used for
[B pictures](../../../../spec/latest/chapters/videocoding.html#encode-h264-b-pic).

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkVideoEncodeH264RateControlLayerInfoKHR](VkVideoEncodeH264RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264FrameSizeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
