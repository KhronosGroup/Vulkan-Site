# VkVideoEncodeFeedback2CapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeFeedback2CapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeFeedback2CapabilitiesKHR - Structure describing additional video encode feedback capabilities for a video profile

The `VkVideoEncodeFeedback2CapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_feedback2
typedef struct VkVideoEncodeFeedback2CapabilitiesKHR {
    VkStructureType                              sType;
    void*                                        pNext;
    uint32_t                                     maxPerPartitionFeedbackEntries;
    VkVideoEncodePerPartitionFeedbackFlagsKHR    supportedPerPartitionEncodeFeedbackFlags;
} VkVideoEncodeFeedback2CapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxPerPartitionFeedbackEntries` specifies the maximum number of
picture partitions for which the implementation supports capturing per
picture partition video encode feedback values.

* 
`supportedPerPartitionEncodeFeedbackFlags` is a bitmask of
[VkVideoEncodePerPartitionFeedbackFlagBitsKHR](VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html) values specifying the
set of per picture partition video encode feedback values supported by
[video encode feedback queries](../../../../spec/latest/chapters/queries.html#queries-video-encode-feedback).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeFeedback2CapabilitiesKHR-sType-sType) VUID-VkVideoEncodeFeedback2CapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_FEEDBACK_2_CAPABILITIES_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeFeedback2CapabilitiesKHR-supportedPerPartitionEncodeFeedbackFlags-parameter) VUID-VkVideoEncodeFeedback2CapabilitiesKHR-supportedPerPartitionEncodeFeedbackFlags-parameter

 `supportedPerPartitionEncodeFeedbackFlags` **must** be a valid combination of [VkVideoEncodePerPartitionFeedbackFlagBitsKHR](VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html) values

* 
[](#VUID-VkVideoEncodeFeedback2CapabilitiesKHR-supportedPerPartitionEncodeFeedbackFlags-requiredbitmask) VUID-VkVideoEncodeFeedback2CapabilitiesKHR-supportedPerPartitionEncodeFeedbackFlags-requiredbitmask

 `supportedPerPartitionEncodeFeedbackFlags` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_feedback2](VK_KHR_video_encode_feedback2.html), [VkStructureType](VkStructureType.html), [VkVideoEncodePerPartitionFeedbackFlagsKHR](VkVideoEncodePerPartitionFeedbackFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeFeedback2CapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
