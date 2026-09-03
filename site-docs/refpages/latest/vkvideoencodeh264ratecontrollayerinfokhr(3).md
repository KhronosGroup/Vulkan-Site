# VkVideoEncodeH264RateControlLayerInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264RateControlLayerInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264RateControlLayerInfoKHR - Structure describing H.264 per-layer rate control parameters

The `VkVideoEncodeH264RateControlLayerInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264RateControlLayerInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkBool32                         useMinQp;
    VkVideoEncodeH264QpKHR           minQp;
    VkBool32                         useMaxQp;
    VkVideoEncodeH264QpKHR           maxQp;
    VkBool32                         useMaxFrameSize;
    VkVideoEncodeH264FrameSizeKHR    maxFrameSize;
} VkVideoEncodeH264RateControlLayerInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`useMinQp` indicates whether the QP values determined by rate
control will be clamped to the lower bounds on the QP values specified
in `minQp`.

* 
`minQp` specifies the lower bounds on the QP values, for each
picture type, that the implementation’s rate control algorithm will use
when `useMinQp` is [VK_TRUE](VK_TRUE.html).

* 
`useMaxQp` indicates whether the QP values determined by rate
control will be clamped to the upper bounds on the QP values specified
in `maxQp`.

* 
`maxQp` specifies the upper bounds on the QP values, for each
picture type, that the implementation’s rate control algorithm will use
when `useMaxQp` is [VK_TRUE](VK_TRUE.html).

* 
`useMaxFrameSize` indicates whether the implementation’s rate
control algorithm **should** use the values specified in `maxFrameSize`
as the upper bounds on the encoded frame size for each picture type.

* 
`maxFrameSize` specifies the upper bounds on the encoded frame size,
for each picture type, when `useMaxFrameSize` is [VK_TRUE](VK_TRUE.html).

When used, the values in `minQp` and `maxQp` guarantee that the
effective QP values used by the implementation will respect those lower and
upper bounds, respectively.
However, limiting the range of QP values that the implementation is able to
use will also limit the capabilities of the implementation’s rate control
algorithm to comply to other constraints.
In particular, the implementation **may** not be able to comply to the
following:

* 
The average and/or peak [bitrate](../../../../spec/latest/chapters/videocoding.html#encode-bitrate) values to be used for
the encoded bitstream specified in the `averageBitrate` and
`maxBitrate` members of the
[VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html) structure.

* 
The upper bounds on the encoded frame size, for each picture type,
specified in the `maxFrameSize` member of
`VkVideoEncodeH264RateControlLayerInfoKHR`.

|  | In general, applications need to configure rate control parameters
| --- | --- |
appropriately in order to be able to get the desired rate control behavior,
as described in the [Video Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-rate-control)
section. |

When an instance of this structure is included in the `pNext` chain of a
[VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html) structure specified in one of the
elements of the `pLayers` array member of the
[VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure passed to the
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) command,
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), and the bound
video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), it specifies the
H.264-specific rate control parameters of the rate control layer
corresponding to that element of `pLayers`.

Valid Usage

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08286) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08286

If `useMinQp` is [VK_TRUE](VK_TRUE.html), then the `qpI`, `qpP`, and
`qpB` members of `minQp` **must** all be between
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`minQp` and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxQp`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video profile

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMaxQp-08287) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMaxQp-08287

If `useMaxQp` is [VK_TRUE](VK_TRUE.html), then the `qpI`, `qpP`, and
`qpB` members of `maxQp` **must** all be between
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`minQp` and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxQp`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video profile

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08288) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08288

If `useMinQp` is [VK_TRUE](VK_TRUE.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_PER_PICTURE_TYPE_MIN_MAX_QP_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html),
then the `qpI`, `qpP`, and `qpB` members of `minQp`
**must** all specify the same value

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMaxQp-08289) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMaxQp-08289

If `useMaxQp` is [VK_TRUE](VK_TRUE.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_PER_PICTURE_TYPE_MIN_MAX_QP_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html),
then the `qpI`, `qpP`, and `qpB` members of `maxQp`
**must** all specify the same value

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08374) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-useMinQp-08374

If `useMinQp` and `useMaxQp` are both [VK_TRUE](VK_TRUE.html), then the
`qpI`, `qpP`, and `qpB` members of `minQp` **must** all be
less than or equal to the respective members of `maxQp`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-sType-sType) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_LAYER_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-minQp-parameter) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-minQp-parameter

 `minQp` **must** be a valid [VkVideoEncodeH264QpKHR](VkVideoEncodeH264QpKHR.html) structure

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-maxQp-parameter) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-maxQp-parameter

 `maxQp` **must** be a valid [VkVideoEncodeH264QpKHR](VkVideoEncodeH264QpKHR.html) structure

* 
[](#VUID-VkVideoEncodeH264RateControlLayerInfoKHR-maxFrameSize-parameter) VUID-VkVideoEncodeH264RateControlLayerInfoKHR-maxFrameSize-parameter

 `maxFrameSize` **must** be a valid [VkVideoEncodeH264FrameSizeKHR](VkVideoEncodeH264FrameSizeKHR.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkVideoEncodeH264FrameSizeKHR](VkVideoEncodeH264FrameSizeKHR.html), [VkVideoEncodeH264QpKHR](VkVideoEncodeH264QpKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264RateControlLayerInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
