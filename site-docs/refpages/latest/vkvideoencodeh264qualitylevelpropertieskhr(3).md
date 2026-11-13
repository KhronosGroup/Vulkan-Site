# VkVideoEncodeH264QualityLevelPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264QualityLevelPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264QualityLevelPropertiesKHR - Structure describing the H.264 encode quality level properties

When calling [vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)
with `pVideoProfile->videoCodecOperation` specified as
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoEncodeH264QualityLevelPropertiesKHR](#) structure **must** be included
in the `pNext` chain of the [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)
structure to retrieve additional video encode quality level properties
specific to H.264 encoding.

The [VkVideoEncodeH264QualityLevelPropertiesKHR](#) structure is defined
as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264QualityLevelPropertiesKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    VkVideoEncodeH264RateControlFlagsKHR    preferredRateControlFlags;
    uint32_t                                preferredGopFrameCount;
    uint32_t                                preferredIdrPeriod;
    uint32_t                                preferredConsecutiveBFrameCount;
    uint32_t                                preferredTemporalLayerCount;
    VkVideoEncodeH264QpKHR                  preferredConstantQp;
    uint32_t                                preferredMaxL0ReferenceCount;
    uint32_t                                preferredMaxL1ReferenceCount;
    VkBool32                                preferredStdEntropyCodingModeFlag;
} VkVideoEncodeH264QualityLevelPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredRateControlFlags` is a bitmask of
[VkVideoEncodeH264RateControlFlagBitsKHR](VkVideoEncodeH264RateControlFlagBitsKHR.html) values indicating the
preferred flags to use for
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`flags`.

* 
`preferredGopFrameCount` indicates the preferred value to use for
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`gopFrameCount`.

* 
`preferredIdrPeriod` indicates the preferred value to use for
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`idrPeriod`.

* 
`preferredConsecutiveBFrameCount` indicates the preferred value to
use for
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`consecutiveBFrameCount`.

* 
`preferredTemporalLayerCount` indicates the preferred value to use
for [VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`temporalLayerCount`.

* 
`preferredConstantQp` indicates the preferred values to use for
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)::`constantQp` for each
picture type when using [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes)
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).

* 
`preferredMaxL0ReferenceCount` indicates the preferred maximum
number of reference pictures to use in the reference list L0.

* 
`preferredMaxL1ReferenceCount` indicates the preferred maximum
number of reference pictures to use in the reference list L1.

* 
`preferredStdEntropyCodingModeFlag` indicates the preferred value to
use for `entropy_coding_mode_flag` in `StdVideoH264PpsFlags`.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264QualityLevelPropertiesKHR-sType-sType) VUID-VkVideoEncodeH264QualityLevelPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkVideoEncodeH264QpKHR](VkVideoEncodeH264QpKHR.html), [VkVideoEncodeH264RateControlFlagsKHR](VkVideoEncodeH264RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264QualityLevelPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
