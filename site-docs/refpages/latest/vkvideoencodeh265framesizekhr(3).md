# VkVideoEncodeH265FrameSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265FrameSizeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265FrameSizeKHR - Structure describing frame size values per H.265 picture type

The `VkVideoEncodeH265FrameSizeKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265FrameSizeKHR {
    uint32_t    frameISize;
    uint32_t    framePSize;
    uint32_t    frameBSize;
} VkVideoEncodeH265FrameSizeKHR;

* 
`frameISize` is the size in bytes to be used for
[I frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-i-pic).

* 
`framePSize` is the size in bytes to be used for
[P frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-p-pic).

* 
`frameBSize` is the size in bytes to be used for
[B frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic).

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265RateControlLayerInfoKHR](VkVideoEncodeH265RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265FrameSizeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
