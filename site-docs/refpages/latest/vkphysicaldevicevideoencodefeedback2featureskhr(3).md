# VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR - Structure describing additional video encode feedback features that can be supported by an implementation

The `VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_feedback2
typedef struct VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeFeedback2;
} VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeFeedback2` specifies
that the implementation supports
[per picture partition    feedback](../../../../spec/latest/chapters/queries.html#queries-video-encode-per-partition-feedback) and the following additional
[video encode feedback flags](../../../../spec/latest/chapters/queries.html#queries-video-encode-feedback), as
reported in [VkVideoEncodeFeedback2CapabilitiesKHR](VkVideoEncodeFeedback2CapabilitiesKHR.html) and/or
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`supportedEncodeFeedbackFlags`,
respectively:

[VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

* 
[VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html).

|  | Support for `videoEncodeFeedback2` does not indicate that all video
| --- | --- |
encode profiles support per picture partition feedback and the new video
encode feedback flags.
Support for individual video encode profiles is subject to
video-profile-specific capabilities. |

If the `VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_FEEDBACK_2_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_encode_feedback2](VK_KHR_video_encode_feedback2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoEncodeFeedback2FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
