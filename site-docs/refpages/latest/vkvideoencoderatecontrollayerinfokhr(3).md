# VkVideoEncodeRateControlLayerInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRateControlLayerInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRateControlLayerInfoKHR - Structure to set encode per-layer rate control parameters

The `VkVideoEncodeRateControlLayerInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeRateControlLayerInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           averageBitrate;
    uint64_t           maxBitrate;
    uint32_t           frameRateNumerator;
    uint32_t           frameRateDenominator;
} VkVideoEncodeRateControlLayerInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

* 
`averageBitrate` is the average [bitrate](../../../../spec/latest/chapters/videocoding.html#encode-bitrate) to be
targeted by the implementation’s rate control algorithm.

* 
`maxBitrate` is the peak [bitrate](../../../../spec/latest/chapters/videocoding.html#encode-bitrate) to be targeted
by the implementation’s rate control algorithm.

* 
`frameRateNumerator` is the numerator of the frame rate assumed by
the implementation’s rate control algorithm.

* 
`frameRateDenominator` is the denominator of the frame rate assumed
by the implementation’s rate control algorithm.

|  | The ability of the implementation’s rate control algorithm to be able to
| --- | --- |
match the requested average and/or peak bitrates **may** be limited by the set
of other codec-independent and codec-specific rate control parameters
specified by the application, the input content, as well as the application
conforming to the rate control guidance provided to the implementation, as
described [earlier](../../../../spec/latest/chapters/videocoding.html#encode-rate-control). |

Additional structures providing codec-specific rate control parameters **can**
be included in the `pNext` chain of
`VkVideoEncodeRateControlLayerInfoKHR` depending on the
[video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) the bound video session was created with.
For further details see:

* 
[Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)

* 
[H.264 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-h264-rate-control)

* 
[H.265 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-h265-rate-control)

* 
[AV1 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-av1-rate-control)

Valid Usage

* 
[](#VUID-VkVideoEncodeRateControlLayerInfoKHR-frameRateNumerator-08350) VUID-VkVideoEncodeRateControlLayerInfoKHR-frameRateNumerator-08350

`frameRateNumerator` **must** be greater than zero

* 
[](#VUID-VkVideoEncodeRateControlLayerInfoKHR-frameRateDenominator-08351) VUID-VkVideoEncodeRateControlLayerInfoKHR-frameRateDenominator-08351

`frameRateDenominator` **must** be greater than zero

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeRateControlLayerInfoKHR-sType-sType) VUID-VkVideoEncodeRateControlLayerInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_LAYER_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeRateControlLayerInfoKHR-pNext-pNext) VUID-VkVideoEncodeRateControlLayerInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1RateControlLayerInfoKHR](VkVideoEncodeAV1RateControlLayerInfoKHR.html), [VkVideoEncodeH264RateControlLayerInfoKHR](VkVideoEncodeH264RateControlLayerInfoKHR.html), or [VkVideoEncodeH265RateControlLayerInfoKHR](VkVideoEncodeH265RateControlLayerInfoKHR.html)

* 
[](#VUID-VkVideoEncodeRateControlLayerInfoKHR-sType-unique) VUID-VkVideoEncodeRateControlLayerInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRateControlLayerInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
