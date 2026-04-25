# VkVideoEncodeRateControlInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRateControlInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRateControlInfoKHR - Structure to set encode stream rate control parameters

The `VkVideoEncodeRateControlInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeRateControlInfoKHR {
    VkStructureType                                sType;
    const void*                                    pNext;
    VkVideoEncodeRateControlFlagsKHR               flags;
    VkVideoEncodeRateControlModeFlagBitsKHR        rateControlMode;
    uint32_t                                       layerCount;
    const VkVideoEncodeRateControlLayerInfoKHR*    pLayers;
    uint32_t                                       virtualBufferSizeInMs;
    uint32_t                                       initialVirtualBufferSizeInMs;
} VkVideoEncodeRateControlInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`rateControlMode` is a [VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html)
value specifying the [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes).

* 
`layerCount` specifies the number of [    rate control layers](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-layers) to use.

* 
`pLayers` is a pointer to an array of `layerCount`
[VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html) structures, each specifying
the rate control configuration of the corresponding rate control layer.

* 
`virtualBufferSizeInMs` is the size in milliseconds of the virtual
buffer used by the implementation’s rate control algorithm for the
[leaky bucket model](../../../../spec/latest/chapters/videocoding.html#encode-leaky-bucket-model), with respect to the
average bitrate of the stream calculated by summing the values of the
`averageBitrate` members of the elements of the `pLayers` array.

* 
`initialVirtualBufferSizeInMs` is the initial occupancy in
milliseconds of the virtual buffer used by the implementation’s rate
control algorithm for the [leaky bucket    model](../../../../spec/latest/chapters/videocoding.html#encode-leaky-bucket-model).

If `layerCount` is zero then the values of `virtualBufferSizeInMs`
and `initialVirtualBufferSizeInMs` are ignored.

This structure **can** be specified in the following places:

* 
In the `pNext` chain of [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html) to specify
the current rate control state expected to be configured when beginning
a [video coding scope](../../../../spec/latest/chapters/videocoding.html#video-coding-scope).

* 
In the `pNext` chain of [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) to change
the rate control configuration of the bound video session.

Including this structure in the `pNext` chain of
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) and including
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html) in
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` enables updating the rate
control configuration of the bound video session.
This replaces the entire rate control configuration of the bound video
session and **may** reset the state of all enabled rate control layers to an
initial state according to the codec-specific rate control semantics defined
in the corresponding sections listed below.

When `layerCount` is greater than one, multiple
[rate control layers](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-layers) are configured, and each
rate control layer is applied to the corresponding video coding layer
identified by the index of the corresponding element of `pLayer`.

* 
If the video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then this index
specifies the H.264 temporal layer ID of the video coding layer the rate
control layer is applied to.

* 
If the video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then this index
specifies the H.265 temporal ID of the video coding layer the rate
control layer is applied to.

* 
If the video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then this index
specifies the AV1 temporal ID of the temporal layer the rate control
layer is applied to.

Additional structures providing codec-specific rate control parameters **can**
be included in the `pNext` chain of `VkVideoCodingControlInfoKHR`
depending on the [video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) the bound video session
was created.
For further details see:

* 
[Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)

* 
[H.264 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-h264-rate-control)

* 
[H.265 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-h265-rate-control)

* 
[AV1 Encode Rate Control](../../../../spec/latest/chapters/videocoding.html#encode-av1-rate-control)

The new rate control configuration takes effect when the corresponding
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) is executed on the device, and only impacts
video encode operations that follow in execution order.

Valid Usage

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08248) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08248

If `rateControlMode` is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
`layerCount` **must** be `0`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08275) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08275

If `rateControlMode` is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_CBR_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
`layerCount` **must** be greater than `0`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08244) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08244

If `rateControlMode` is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then it **must**
specify one of the bits included in
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`rateControlModes`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08245) VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08245

`layerCount` member **must** be less than or equal to
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`maxRateControlLayers`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used
video profile

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-pLayers-08276) VUID-VkVideoEncodeRateControlInfoKHR-pLayers-08276

For each element of `pLayers`, its `averageBitrate` member **must**
be between `1` and [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`maxBitrate`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
used video profile

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-pLayers-08277) VUID-VkVideoEncodeRateControlInfoKHR-pLayers-08277

For each element of `pLayers`, its `maxBitrate` member **must** be
between `1` and [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`maxBitrate`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used
video profile

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08356) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08356

If `rateControlMode` is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_CBR_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then for each
element of `pLayers`, its `averageBitrate` member **must** equal
its `maxBitrate` member

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08278) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-08278

If `rateControlMode` is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then for each
element of `pLayers`, its `averageBitrate` member **must** be less
than or equal to its `maxBitrate` member

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08357) VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08357

If `layerCount` is not zero, then `virtualBufferSizeInMs` **must**
be greater than zero

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08358) VUID-VkVideoEncodeRateControlInfoKHR-layerCount-08358

If `layerCount` is not zero, then `initialVirtualBufferSizeInMs`
**must** be less than or equal to `virtualBufferSizeInMs`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-07022) VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-07022

If the `videoCodecOperation` of the used video profile is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain this structure is included in also includes an instance of the
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html) structure, and
`layerCount` is greater than `1`, then `layerCount` **must** equal
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`temporalLayerCount`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-07025) VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-07025

If the `videoCodecOperation` of the used video profile is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain this structure is included in also includes an instance of the
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html) structure, and
`layerCount` is greater than `1`, then `layerCount` **must** equal
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`subLayerCount`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-10351) VUID-VkVideoEncodeRateControlInfoKHR-videoCodecOperation-10351

If the `videoCodecOperation` of the used video profile is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext` chain
this structure is included in also includes an instance of the
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html) structure, and `layerCount`
is greater than `1`, then `layerCount` **must** equal
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`temporalLayerCount`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-sType-sType) VUID-VkVideoEncodeRateControlInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-flags-zerobitmask) VUID-VkVideoEncodeRateControlInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-parameter) VUID-VkVideoEncodeRateControlInfoKHR-rateControlMode-parameter

 If `rateControlMode` is not `0`, `rateControlMode` **must** be a valid [VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) value

* 
[](#VUID-VkVideoEncodeRateControlInfoKHR-pLayers-parameter) VUID-VkVideoEncodeRateControlInfoKHR-pLayers-parameter

 If `layerCount` is not `0`, `pLayers` **must** be a valid pointer to an array of `layerCount` valid [VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeRateControlFlagsKHR](VkVideoEncodeRateControlFlagsKHR.html), [VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html), [VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRateControlInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
