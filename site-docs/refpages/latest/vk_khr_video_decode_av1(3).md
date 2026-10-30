# VK_KHR_video_decode_av1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_decode_av1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_decode_av1](#VK_KHR_video_decode_av1)
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

VK_KHR_video_decode_av1 - device extension

**Name String**

`VK_KHR_video_decode_av1`

**Extension Type**

Device extension

**Registered Extension Number**

513

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)

**Contact**

* 
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_decode_av1] @aqnuep%0A*Here describe the issue or question you have about the VK_KHR_video_decode_av1 extension*)

**Extension Proposal**

[VK_KHR_video_decode_av1](../../../../features/latest/features/proposals/VK_KHR_video_decode_av1.html)

**Last Modified Date**

2024-01-02

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
Charlie Turner, Igalia

* 
Daniel Almeida, Collabora

* 
Nicolas Dufresne, Collabora

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)` extension
by adding support for decoding elementary video stream sequences compliant
with the AV1 video compression standard.

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoDecodeAV1CapabilitiesKHR](VkVideoDecodeAV1CapabilitiesKHR.html)

Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

* 
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoDecodeAV1ProfileInfoKHR](VkVideoDecodeAV1ProfileInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoDecodeAV1DpbSlotInfoKHR](VkVideoDecodeAV1DpbSlotInfoKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoDecodeAV1SessionParametersCreateInfoKHR](VkVideoDecodeAV1SessionParametersCreateInfoKHR.html)

* 
`VK_KHR_VIDEO_DECODE_AV1_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_DECODE_AV1_SPEC_VERSION`

* 
[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 1, 2024-01-02 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_decode_av1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
