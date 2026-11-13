# VK_KHR_video_encode_queue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_queue.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_queue](#VK_KHR_video_encode_queue)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_encode_queue - device extension

**Name String**

`VK_KHR_video_encode_queue`

**Extension Type**

Device extension

**Registered Extension Number**

300

**Revision**

12

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_queue](VK_KHR_video_queue.html)

and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

     or

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_format_feature_flags2

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_queue] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_encode_queue extension*)

**Extension Proposal**

[VK_KHR_video_encode_queue](../../../../features/latest/features/proposals/VK_KHR_video_encode_queue.html)

**Last Modified Date**

2023-12-05

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Damien Kessler, NVIDIA

* 
George Hao, AMD

* 
Jake Beju, AMD

* 
Peter Fang, AMD

* 
Piers Daniell, NVIDIA

* 
Srinath Kumarapuram, NVIDIA

* 
Thomas J. Meier, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Ravi Chaudhary, NVIDIA

* 
Yang Liu, AMD

* 
Daniel Rakos, RasterGrid

* 
Ping Liu, Intel

* 
Aidan Fabius, Lynx

* 
Lynne Iribarren, Independent

This extension builds upon the `[VK_KHR_video_queue](VK_KHR_video_queue.html)` extension by
adding common APIs specific to video encoding and thus enabling
implementations to expose queue families supporting video encode operations.

More specifically, it adds video encode specific capabilities and a new
command buffer command that allows recording video encode operations against
a video session.

This extension is to be used in conjunction with other codec specific video
encode extensions that enable encoding video sequences of specific video
compression standards.

* 
[vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html)

* 
[vkGetEncodedVideoSessionParametersKHR](vkGetEncodedVideoSessionParametersKHR.html)

* 
[vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)

* 
[VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR](VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html)

* 
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

* 
[VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)

* 
[VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html)

* 
[VkVideoEncodeSessionParametersFeedbackInfoKHR](VkVideoEncodeSessionParametersFeedbackInfoKHR.html)

* 
[VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html)

* 
Extending [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)

Extending [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html):

* 
[VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)

Extending [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html), [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoEncodeQualityLevelInfoKHR](VkVideoEncodeQualityLevelInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoEncodeUsageInfoKHR](VkVideoEncodeUsageInfoKHR.html)

* 
[VkVideoEncodeCapabilityFlagBitsKHR](VkVideoEncodeCapabilityFlagBitsKHR.html)

* 
[VkVideoEncodeContentFlagBitsKHR](VkVideoEncodeContentFlagBitsKHR.html)

* 
[VkVideoEncodeFeedbackFlagBitsKHR](VkVideoEncodeFeedbackFlagBitsKHR.html)

* 
[VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html)

* 
[VkVideoEncodeTuningModeKHR](VkVideoEncodeTuningModeKHR.html)

* 
[VkVideoEncodeUsageFlagBitsKHR](VkVideoEncodeUsageFlagBitsKHR.html)

* 
[VkVideoEncodeCapabilityFlagsKHR](VkVideoEncodeCapabilityFlagsKHR.html)

* 
[VkVideoEncodeContentFlagsKHR](VkVideoEncodeContentFlagsKHR.html)

* 
[VkVideoEncodeFeedbackFlagsKHR](VkVideoEncodeFeedbackFlagsKHR.html)

* 
[VkVideoEncodeFlagsKHR](VkVideoEncodeFlagsKHR.html)

* 
[VkVideoEncodeRateControlFlagsKHR](VkVideoEncodeRateControlFlagsKHR.html)

* 
[VkVideoEncodeRateControlModeFlagsKHR](VkVideoEncodeRateControlModeFlagsKHR.html)

* 
[VkVideoEncodeUsageFlagsKHR](VkVideoEncodeUsageFlagsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_QUEUE_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_QUEUE_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkBufferUsageFlagBits.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

Extending [VkQueryResultStatusKHR](VkQueryResultStatusKHR.html):

* 
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](VkQueryResultStatusKHR.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html)

Extending [VkQueueFlagBits](VkQueueFlagBits.html):

* 
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_LAYER_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_FEEDBACK_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_GET_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_USAGE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodingControlFlagBitsKHR](VkVideoCodingControlFlagBitsKHR.html):

* 
[VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html)

* 
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html)

Extending [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html):

* 
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_DPB_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_INPUT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
Revision 1, 2018-07-23 (Ahmed Abdelkhalek)

Initial draft

Revision 1.1, 10/29/2019 (Tony Zlatinski)

* 
Updated the reserved spec tokens and renamed VkVideoEncoderKHR to
VkVideoSessionKHR

Revision 1.6, Jan 08 2020 (Tony Zlatinski)

* 
API unify with the video_decode_queue spec

Revision 2, March 29 2021 (Tony Zlatinski)

* 
Spec and API updates.

Revision 3, 2021-09-30 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

Revision 4, 2022-02-10 (Ahmed Abdelkhalek)

* 
Updates to encode capability interface

Revision 5, 2022-03-31 (Ahmed Abdelkhalek)

* 
Remove redundant VkVideoEncodeInfoKHR.codedExtent

Revision 6, 2022-07-18 (Daniel Rakos)

* 
Remove `VkVideoEncodeRateControlFlagBitsKHR` and
`VkVideoEncodeFlagBitsKHR` as they contain no defined flags for now

* 
Add `VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR` and
`VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_LAYER_BIT_KHR` to indicate
rate control and rate control layer change requests, respectively, in
video coding control operations

Revision 7, 2022-08-12 (Daniel Rakos)

* 
Add VkVideoEncodeUsageInfoKHR structure and related flags

Revision 8, 2023-03-06 (Daniel Rakos)

* 
Replace `VK_QUERY_TYPE_VIDEO_ENCODE_BITSTREAM_BUFFER_RANGE_KHR` queries
with more generic `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` queries
that can be extended in the future with more feedback values

* 
Rename `dstBitstreamBuffer`, `dstBitstreamBufferOffset`, and
`dstBitstreamBufferMaxRange` in `VkVideoEncodeInfoKHR` to `dstBuffer`,
`dstBufferOffset`, and `dstBufferRange`, respectively, for consistency
with the naming convention in the video decode extensions

* 
Change the type of `rateControlLayerCount` and `qualityLevelCount` in
`VkVideoEncodeCapabilitiesKHR` from `uint8_t` to `uint32_t` and rename
them to `maxRateControlLayers` and `maxQualityLevels`, respectively

* 
Change the type of `averageBitrate` and `maxBitrate` in
`VkVideoEncodeRateControlLayerInfoKHR` from `uint32_t` to `uint64_t`

* 
Fixed the definition of rate control flag bits and added the new
`VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR` constant to indicate
implementation-specific automatic rate control

* 
Change the type of `VkVideoEncodeRateControlInfoKHR::layerCount` from
`uint8_t` to `uint32_t`

* 
Rename `pLayerConfigs` to `pLayers` in
`VkVideoEncodeRateControlInfoKHR`

Revision 9, 2023-03-28 (Daniel Rakos)

* 
Removed `VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_LAYER_BIT_KHR` and
the ability to change the state of individual rate control layers

* 
Added new `VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR`
flag to video encode feedback queries

* 
Added new video session create flag
`VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR`
to opt-in to video session and encoding parameter optimizations

* 
Added the `vkGetEncodedVideoSessionParametersKHR` command to enable
retrieving encoded video session parameter data

* 
Moved `virtualBufferSizeInMs` and `initialVirtualBufferSizeInMs` from
`VkVideoEncodeRateControlLayerInfoKHR` to
`VkVideoEncodeRateControlInfoKHR`

* 
Added `maxBitrate` capability

* 
Renamed `inputImageDataFillAlignment` capability to
`encodeInputPictureGranularity` to better reflect its purpose

* 
Added new `vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR`
command and related structures to enable querying recommended settings
for video encode quality levels

* 
Added `VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR` flag and
`VkVideoEncodeQualityLevelInfoKHR` structure to allow controlling video
encode quality level and removed `qualityLevel` from the encode
operation parameters

Revision 10, 2023-07-19 (Daniel Rakos)

* 
Added `VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR`
query result status code and the related capability flag
`VK_VIDEO_ENCODE_CAPABILITY_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_DETECTION_BIT_KHR`

Revision 11, 2023-09-04 (Daniel Rakos)

* 
Extension is no longer provisional

Revision 12, 2023-12-05 (Daniel Rakos)

* 
Require the specification of a reconstructed picture in all cases,
except when the video session was created with no DPB slots to match
shipping implementations

* 
Make DPB slot activation behavior codec-specific to continue allowing
application control over reference picture setup now that a
reconstructed picture is always mandatory

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_queue).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
