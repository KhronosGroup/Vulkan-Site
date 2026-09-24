# VkVideoEncodeH265QualityLevelPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265QualityLevelPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265QualityLevelPropertiesKHR - Structure describing the H.265 encode quality level properties

When calling [vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)
with `pVideoProfile->videoCodecOperation` specified as
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoEncodeH265QualityLevelPropertiesKHR](#) structure **must** be included
in the `pNext` chain of the [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)
structure to retrieve additional video encode quality level properties
specific to H.265 encoding.

The [VkVideoEncodeH265QualityLevelPropertiesKHR](#) structure is defined
as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265QualityLevelPropertiesKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    VkVideoEncodeH265RateControlFlagsKHR    preferredRateControlFlags;
    uint32_t                                preferredGopFrameCount;
    uint32_t                                preferredIdrPeriod;
    uint32_t                                preferredConsecutiveBFrameCount;
    uint32_t                                preferredSubLayerCount;
    VkVideoEncodeH265QpKHR                  preferredConstantQp;
    uint32_t                                preferredMaxL0ReferenceCount;
    uint32_t                                preferredMaxL1ReferenceCount;
} VkVideoEncodeH265QualityLevelPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredRateControlFlags` is a bitmask of
[VkVideoEncodeH265RateControlFlagBitsKHR](VkVideoEncodeH265RateControlFlagBitsKHR.html) values indicating the
preferred flags to use for
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`flags`.

* 
`preferredGopFrameCount` indicates the preferred value to use for
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`gopFrameCount`.

* 
`preferredIdrPeriod` indicates the preferred value to use for
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`idrPeriod`.

* 
`preferredConsecutiveBFrameCount` indicates the preferred value to
use for
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`consecutiveBFrameCount`.

* 
`preferredSubLayerCount` indicates the preferred value to use for
[VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html)::`subLayerCount`.

* 
`preferredConstantQp` indicates the preferred values to use for
[VkVideoEncodeH265NaluSliceSegmentInfoKHR](VkVideoEncodeH265NaluSliceSegmentInfoKHR.html)::`constantQp` for
each picture type when using [rate control    mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).

* 
`preferredMaxL0ReferenceCount` indicates the preferred maximum
number of reference pictures to use in the reference list L0.

* 
`preferredMaxL1ReferenceCount` indicates the preferred maximum
number of reference pictures to use in the reference list L1.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265QualityLevelPropertiesKHR-sType-sType) VUID-VkVideoEncodeH265QualityLevelPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH265QpKHR](VkVideoEncodeH265QpKHR.html), [VkVideoEncodeH265RateControlFlagsKHR](VkVideoEncodeH265RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265QualityLevelPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
