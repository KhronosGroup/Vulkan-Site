# VkVideoEncodeAV1QualityLevelPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1QualityLevelPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1QualityLevelPropertiesKHR - Structure describing the AV1 encode quality level properties

When calling [vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)
with `pVideoProfile->videoCodecOperation` specified as
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoEncodeAV1QualityLevelPropertiesKHR](#) structure **must** be included
in the `pNext` chain of the [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)
structure to retrieve additional video encode quality level properties
specific to AV1 encoding.

The [VkVideoEncodeAV1QualityLevelPropertiesKHR](#) structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1QualityLevelPropertiesKHR {
    VkStructureType                        sType;
    void*                                  pNext;
    VkVideoEncodeAV1RateControlFlagsKHR    preferredRateControlFlags;
    uint32_t                               preferredGopFrameCount;
    uint32_t                               preferredKeyFramePeriod;
    uint32_t                               preferredConsecutiveBipredictiveFrameCount;
    uint32_t                               preferredTemporalLayerCount;
    VkVideoEncodeAV1QIndexKHR              preferredConstantQIndex;
    uint32_t                               preferredMaxSingleReferenceCount;
    uint32_t                               preferredSingleReferenceNameMask;
    uint32_t                               preferredMaxUnidirectionalCompoundReferenceCount;
    uint32_t                               preferredMaxUnidirectionalCompoundGroup1ReferenceCount;
    uint32_t                               preferredUnidirectionalCompoundReferenceNameMask;
    uint32_t                               preferredMaxBidirectionalCompoundReferenceCount;
    uint32_t                               preferredMaxBidirectionalCompoundGroup1ReferenceCount;
    uint32_t                               preferredMaxBidirectionalCompoundGroup2ReferenceCount;
    uint32_t                               preferredBidirectionalCompoundReferenceNameMask;
} VkVideoEncodeAV1QualityLevelPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredRateControlFlags` is a bitmask of
[VkVideoEncodeAV1RateControlFlagBitsKHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html) values indicating the
preferred flags to use for
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`flags`.

* 
`preferredGopFrameCount` indicates the preferred value to use for
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`gopFrameCount`.

* 
`preferredKeyFramePeriod` indicates the preferred value to use for
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`keyFramePeriod`.

* 
`preferredConsecutiveBipredictiveFrameCount` indicates the preferred
value to use for
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`consecutiveBipredictiveFrameCount`.

* 
`preferredTemporalLayerCount` indicates the preferred value to use
for [VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`temporalLayerCount`.

* 
`preferredConstantQIndex` indicates the preferred value to use for
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`constantQIndex` when using
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes)
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).

* 
`preferredMaxSingleReferenceCount` indicates the preferred maximum
number of reference pictures to use with
[single reference prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

* 
`preferredSingleReferenceNameMask` is a bitmask of preferred
[AV1 reference names](../../../../spec/latest/chapters/videocoding.html#encode-av1-reference-names) when using
[single reference prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

* 
`preferredMaxUnidirectionalCompoundReferenceCount` indicates the
preferred maximum number of reference pictures to use with
[unidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

* 
`preferredMaxUnidirectionalCompoundGroup1ReferenceCount` indicates
the preferred maximum number of reference pictures to use with
[unidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes)
from reference frame group 1, as defined in section 6.10.24 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
`preferredUnidirectionalCompoundReferenceNameMask` is a bitmask of
preferred [AV1 reference names](../../../../spec/latest/chapters/videocoding.html#encode-av1-reference-names) when using
[unidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

* 
`preferredMaxBidirectionalCompoundReferenceCount` indicates the
preferred maximum number of reference pictures to use with
[bidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

* 
`preferredMaxBidirectionalCompoundGroup1ReferenceCount` indicates
the preferred maximum number of reference pictures to use with
[bidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes)
from reference frame group 1, as defined in section 6.10.24 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
`preferredMaxBidirectionalCompoundGroup2ReferenceCount` indicates
the preferred maximum number of reference pictures to use with
[bidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes)
from reference frame group 2, as defined in section 6.10.24 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
`preferredBidirectionalCompoundReferenceNameMask` is a bitmask of
preferred [AV1 reference names](../../../../spec/latest/chapters/videocoding.html#encode-av1-reference-names) when using
[bidirectional compound prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes).

`preferredSingleReferenceNameMask`,
`preferredUnidirectionalCompoundReferenceNameMask`, and
`preferredBidirectionalCompoundReferenceNameMask` are encoded such that
when bit index i is set, it indicates preference for using the
[AV1 reference name](../../../../spec/latest/chapters/videocoding.html#encode-av1-reference-names)
`STD_VIDEO_AV1_REFERENCE_NAME_LAST_FRAME` +  i.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1QualityLevelPropertiesKHR-sType-sType) VUID-VkVideoEncodeAV1QualityLevelPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeAV1QIndexKHR](VkVideoEncodeAV1QIndexKHR.html), [VkVideoEncodeAV1RateControlFlagsKHR](VkVideoEncodeAV1RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1QualityLevelPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
