# VK_KHR_video_maintenance2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_maintenance2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_maintenance2](#VK_KHR_video_maintenance2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_maintenance2 - device extension

**Name String**

`VK_KHR_video_maintenance2`

**Extension Type**

Device extension

**Registered Extension Number**

587

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_queue](VK_KHR_video_queue.html)

**API Interactions**

* 
Interacts with VK_KHR_video_decode_av1

* 
Interacts with VK_KHR_video_decode_h264

* 
Interacts with VK_KHR_video_decode_h265

* 
Interacts with VK_KHR_video_decode_queue

**Contact**

* 
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_maintenance2] @aqnuep%0A*Here describe the issue or question you have about the VK_KHR_video_maintenance2 extension*)

**Extension Proposal**

[VK_KHR_video_maintenance2](../../../../features/latest/features/proposals/VK_KHR_video_maintenance2.html)

**Last Modified Date**

2024-10-14

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

* 
Aidan Fabius, Lynx

* 
Ping Liu, Intel

* 
Lynne Iribarren, Independent

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

`VK_KHR_video_maintenance2` adds a collection of minor video coding
features, none of which would warrant an entire extension of their own.

The new features are as follows:

* 
Allow video coding control commands (such as video session reset) to be
issued without the need for a bound video session parameters object for
video decode operations that would otherwise require the use of video
session parameters objects.

* 
Allow applications to specify codec-specific parameter sets inline for
each decode operation instead of having to construct video session
parameters objects.

* 
Require support for
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) in all
applicable video encode profiles.

* 
Provide additional guarantees on Video Std parameters that the encoder
implementation will not override.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoMaintenance2FeaturesKHR](VkPhysicalDeviceVideoMaintenance2FeaturesKHR.html)

If [VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html) is supported:

* 
Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

[VkVideoDecodeAV1InlineSessionParametersInfoKHR](VkVideoDecodeAV1InlineSessionParametersInfoKHR.html)

If [VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html) is supported:

* 
Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html)

If [VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html) is supported:

* 
Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html)

* 
`VK_KHR_VIDEO_MAINTENANCE_2_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_MAINTENANCE_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_2_FEATURES_KHR](VkStructureType.html)

If [VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

If [VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

If [VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

If [VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html) is supported:

* 
Extending [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html):

[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
Revision 1, 2024-10-14 (Daniel Rakos)

internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_maintenance2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
