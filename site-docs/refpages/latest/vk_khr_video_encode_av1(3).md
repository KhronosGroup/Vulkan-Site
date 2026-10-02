# VK_KHR_video_encode_av1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_av1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_av1](#VK_KHR_video_encode_av1)
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

VK_KHR_video_encode_av1 - device extension

**Name String**

`VK_KHR_video_encode_av1`

**Extension Type**

Device extension

**Registered Extension Number**

514

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

**Contact**

* 
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_av1] @aqnuep%0A*Here describe the issue or question you have about the VK_KHR_video_encode_av1 extension*)

**Extension Proposal**

[VK_KHR_video_encode_av1](../../../../features/latest/features/proposals/VK_KHR_video_encode_av1.html)

**Last Modified Date**

2024-09-23

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

* 
Ho Hin Lau, AMD

* 
Lynne Iribarren, Independent

* 
David Airlie, Red Hat, Inc.

* 
Ping Liu, Intel

* 
Srinath Kumarapuram, NVIDIA

* 
Vassili Nikolaev, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Konda Raju, NVIDIA

* 
Charlie Turner, Igalia

* 
Daniel Almeida, Collabora

* 
Nicolas Dufresne, Collabora

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension
by adding support for encoding elementary video stream sequences compliant
with the AV1 video compression standard.

* 
[VkVideoEncodeAV1FrameSizeKHR](VkVideoEncodeAV1FrameSizeKHR.html)

* 
[VkVideoEncodeAV1QIndexKHR](VkVideoEncodeAV1QIndexKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoEncodeAV1FeaturesKHR](VkPhysicalDeviceVideoEncodeAV1FeaturesKHR.html)

Extending [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html):

* 
[VkVideoEncodeAV1GopRemainingFrameInfoKHR](VkVideoEncodeAV1GopRemainingFrameInfoKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)

Extending [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html):

* 
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)

Extending [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html):

* 
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)

Extending [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html):

* 
[VkVideoEncodeAV1QualityLevelPropertiesKHR](VkVideoEncodeAV1QualityLevelPropertiesKHR.html)

Extending [VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html):

* 
[VkVideoEncodeAV1RateControlLayerInfoKHR](VkVideoEncodeAV1RateControlLayerInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoEncodeAV1ProfileInfoKHR](VkVideoEncodeAV1ProfileInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)

Extending [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html):

* 
[VkVideoEncodeAV1SessionCreateInfoKHR](VkVideoEncodeAV1SessionCreateInfoKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoEncodeAV1SessionParametersCreateInfoKHR](VkVideoEncodeAV1SessionParametersCreateInfoKHR.html)

* 
[VkVideoEncodeAV1CapabilityFlagBitsKHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html)

* 
[VkVideoEncodeAV1PredictionModeKHR](VkVideoEncodeAV1PredictionModeKHR.html)

* 
[VkVideoEncodeAV1RateControlFlagBitsKHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html)

* 
[VkVideoEncodeAV1RateControlGroupKHR](VkVideoEncodeAV1RateControlGroupKHR.html)

* 
[VkVideoEncodeAV1StdFlagBitsKHR](VkVideoEncodeAV1StdFlagBitsKHR.html)

* 
[VkVideoEncodeAV1SuperblockSizeFlagBitsKHR](VkVideoEncodeAV1SuperblockSizeFlagBitsKHR.html)

* 
[VkVideoEncodeAV1CapabilityFlagsKHR](VkVideoEncodeAV1CapabilityFlagsKHR.html)

* 
[VkVideoEncodeAV1RateControlFlagsKHR](VkVideoEncodeAV1RateControlFlagsKHR.html)

* 
[VkVideoEncodeAV1StdFlagsKHR](VkVideoEncodeAV1StdFlagsKHR.html)

* 
[VkVideoEncodeAV1SuperblockSizeFlagsKHR](VkVideoEncodeAV1SuperblockSizeFlagsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_AV1_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_AV1_SPEC_VERSION`

* 
[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_AV1_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_GOP_REMAINING_FRAME_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_RATE_CONTROL_LAYER_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_SESSION_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 1, 2024-09-23 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_av1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
