# VK_KHR_video_encode_feedback2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_feedback2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_feedback2](#VK_KHR_video_encode_feedback2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_encode_feedback2 - device extension

**Name String**

`VK_KHR_video_encode_feedback2`

**Extension Type**

Device extension

**Registered Extension Number**

599

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_feedback2] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_encode_feedback2 extension*)

**Extension Proposal**

[VK_KHR_video_encode_feedback2](../../../../features/latest/features/proposals/VK_KHR_video_encode_feedback2.html)

**Last Modified Date**

2026-02-04

**IP Status**

No known IP claims.

**Contributors**

* 
Sreerenj Balachandran, Amazon

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

* 
Aidan Fabius, Core Avionics & Industrial Inc.

* 
Ping Liu, Intel

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

This extension builds upon the `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR`
queries introduced by the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension and
extends the set of supported video encode feedback values with additional
statistics about the encoded picture, including per picture partition
feedback values.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR](VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR.html)

Extending [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR](VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeFeedback2CapabilitiesKHR](VkVideoEncodeFeedback2CapabilitiesKHR.html)

* 
[VkVideoEncodePerPartitionFeedbackFlagBitsKHR](VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html)

* 
[VkVideoEncodePerPartitionFeedbackFlagsKHR](VkVideoEncodePerPartitionFeedbackFlagsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_FEEDBACK_2_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_FEEDBACK_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_FEEDBACK_2_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_FEEDBACK_2_CAPABILITIES_KHR](VkStructureType.html)

Extending [VkVideoEncodeFeedbackFlagBitsKHR](VkVideoEncodeFeedbackFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
Revision 1, 2026-02-04 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_feedback2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
