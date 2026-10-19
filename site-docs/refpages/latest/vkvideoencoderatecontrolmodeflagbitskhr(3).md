# VkVideoEncodeRateControlModeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeRateControlModeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeRateControlModeFlagBitsKHR - Video encode rate control modes

The rate control modes are defined with the following enums:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeRateControlModeFlagBitsKHR {
    VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR = 0,
    VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_RATE_CONTROL_MODE_CBR_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR = 0x00000004,
} VkVideoEncodeRateControlModeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](#) specifies the use of
implementation-specific rate control.

* 
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](#) specifies that
rate control is disabled and the application will specify per-operation
rate control parameters controlling the encoding quality.
In this mode implementations will encode pictures independently of the
output bitrate of prior video encode operations.

When using an [H.264 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile),
implementations will use the QP value specified in
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)::`constantQp` to control
the quality of the encoded picture.

* 
When using an [H.265 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile),
implementations will use the QP value specified in
[VkVideoEncodeH265NaluSliceSegmentInfoKHR](VkVideoEncodeH265NaluSliceSegmentInfoKHR.html)::`constantQp` to
control the quality of the encoded picture.

* 
When using an [AV1 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile),
implementations will use the quantizer index value specified in
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`constantQIndex` to control
the quality of the encoded picture.

[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_CBR_BIT_KHR](#) specifies the use of
constant bitrate (CBR) rate control mode.
In this mode the implementation will attempt to produce the encoded
bitstream at a constant bitrate while conforming to the constraints of
other rate control parameters.

[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR](#) specifies the use of
variable bitrate (VBR) rate control mode.
In this mode the implementation will produce the encoded bitstream at a
variable bitrate according to the constraints of other rate control
parameters.

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html), [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html), [VkVideoEncodeRateControlModeFlagsKHR](VkVideoEncodeRateControlModeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeRateControlModeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
