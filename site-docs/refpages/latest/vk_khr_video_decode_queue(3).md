# VK_KHR_video_decode_queue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_decode_queue.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_decode_queue](#VK_KHR_video_decode_queue)
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

VK_KHR_video_decode_queue - device extension

**Name String**

`VK_KHR_video_decode_queue`

**Extension Type**

Device extension

**Registered Extension Number**

25

**Revision**

8

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
[jake.beju@amd.com](mailto:jake.beju@amd.com)

**Extension Proposal**

[VK_KHR_video_decode_queue](../../../../features/latest/features/proposals/VK_KHR_video_decode_queue.html)

**Last Modified Date**

2023-12-05

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Jake Beju, AMD

* 
Olivier Lapicque, NVIDIA

* 
Peter Fang, AMD

* 
Piers Daniell, NVIDIA

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_queue](VK_KHR_video_queue.html)` extension by
adding common APIs specific to video decoding and thus enabling
implementations to expose queue families supporting video decode operations.

More specifically, it adds video decode specific capabilities and a new
command buffer command that allows recording video decode operations against
a video session.

This extension is to be used in conjunction with other codec specific video
decode extensions that enable decoding video sequences of specific video
compression standards.

* 
[vkCmdDecodeVideoKHR](vkCmdDecodeVideoKHR.html)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoDecodeUsageInfoKHR](VkVideoDecodeUsageInfoKHR.html)

* 
[VkVideoDecodeCapabilityFlagBitsKHR](VkVideoDecodeCapabilityFlagBitsKHR.html)

* 
[VkVideoDecodeUsageFlagBitsKHR](VkVideoDecodeUsageFlagBitsKHR.html)

* 
[VkVideoDecodeCapabilityFlagsKHR](VkVideoDecodeCapabilityFlagsKHR.html)

* 
[VkVideoDecodeFlagsKHR](VkVideoDecodeFlagsKHR.html)

* 
[VkVideoDecodeUsageFlagsKHR](VkVideoDecodeUsageFlagsKHR.html)

* 
`VK_KHR_VIDEO_DECODE_QUEUE_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_DECODE_QUEUE_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

Extending [VkQueueFlagBits](VkQueueFlagBits.html):

* 
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_USAGE_INFO_KHR](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_VIDEO_DECODE_DPB_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_VIDEO_DECODE_OUTPUT_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
Revision 1, 2018-6-11 (Peter Fang)

Initial draft

Revision 1.5, Nov 09 2018 (Tony Zlatinski)

* 
API Updates

Revision 1.6, Jan 08 2020 (Tony Zlatinski)

* 
API unify with the video_encode_queue spec

Revision 1.7, March 29 2021 (Tony Zlatinski)

* 
Spec and API updates.

Revision 2, September 30 2021 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

Revision 3, 2022-02-25 (Ahmed Abdelkhalek)

* 
Add VkVideoDecodeCapabilitiesKHR with new flags to report support for
decode DPB and output coinciding in the same image, or in distinct
images.

Revision 4, 2022-03-31 (Ahmed Abdelkhalek)

* 
Remove redundant VkVideoDecodeInfoKHR.coded{Offset|Extent}

Revision 5, 2022-07-18 (Daniel Rakos)

* 
Remove `VkVideoDecodeFlagBitsKHR` as it contains no defined flags for
now

Revision 6, 2022-08-12 (Daniel Rakos)

* 
Add VkVideoDecodeUsageInfoKHR structure and related flags

Revision 7, 2022-09-29 (Daniel Rakos)

* 
Extension is no longer provisional

Revision 8, 2023-12-05 (Daniel Rakos)

* 
Require the specification of a reconstructed picture in all cases,
except when the video session was created with no DPB slots to match
shipping implementations

* 
Make DPB slot activation behavior codec-specific to continue allowing
application control over reference picture setup now that a
reconstructed picture is always mandatory

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_decode_queue).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
