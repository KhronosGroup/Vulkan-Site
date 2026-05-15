# VkVideoEncodeUsageInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeUsageInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeUsageInfoKHR - Structure specifying video encode usage information

Additional information about the video encode use case **can** be provided by
adding a `VkVideoEncodeUsageInfoKHR` structure to the `pNext` chain
of [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html).

The `VkVideoEncodeUsageInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeUsageInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    VkVideoEncodeUsageFlagsKHR      videoUsageHints;
    VkVideoEncodeContentFlagsKHR    videoContentHints;
    VkVideoEncodeTuningModeKHR      tuningMode;
} VkVideoEncodeUsageInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoUsageHints` is a bitmask of
[VkVideoEncodeUsageFlagBitsKHR](VkVideoEncodeUsageFlagBitsKHR.html) specifying hints about the intended
use of the video encode profile.

* 
`videoContentHints` is a bitmask of
[VkVideoEncodeContentFlagBitsKHR](VkVideoEncodeContentFlagBitsKHR.html) specifying hints about the content
to be encoded using the video encode profile.

* 
`tuningMode` is a [VkVideoEncodeTuningModeKHR](VkVideoEncodeTuningModeKHR.html) value specifying
the tuning mode to use when encoding with the video profile.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeUsageInfoKHR-sType-sType) VUID-VkVideoEncodeUsageInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_USAGE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeUsageInfoKHR-videoUsageHints-parameter) VUID-VkVideoEncodeUsageInfoKHR-videoUsageHints-parameter

 `videoUsageHints` **must** be a valid combination of [VkVideoEncodeUsageFlagBitsKHR](VkVideoEncodeUsageFlagBitsKHR.html) values

* 
[](#VUID-VkVideoEncodeUsageInfoKHR-videoContentHints-parameter) VUID-VkVideoEncodeUsageInfoKHR-videoContentHints-parameter

 `videoContentHints` **must** be a valid combination of [VkVideoEncodeContentFlagBitsKHR](VkVideoEncodeContentFlagBitsKHR.html) values

* 
[](#VUID-VkVideoEncodeUsageInfoKHR-tuningMode-parameter) VUID-VkVideoEncodeUsageInfoKHR-tuningMode-parameter

 If `tuningMode` is not `0`, `tuningMode` **must** be a valid [VkVideoEncodeTuningModeKHR](VkVideoEncodeTuningModeKHR.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeContentFlagsKHR](VkVideoEncodeContentFlagsKHR.html), [VkVideoEncodeTuningModeKHR](VkVideoEncodeTuningModeKHR.html), [VkVideoEncodeUsageFlagsKHR](VkVideoEncodeUsageFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeUsageInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
