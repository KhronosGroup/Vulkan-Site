# VK_KHR_video_decode_vp9(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_decode_vp9.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_decode_vp9](#VK_KHR_video_decode_vp9)
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

VK_KHR_video_decode_vp9 - device extension

**Name String**

`VK_KHR_video_decode_vp9`

**Extension Type**

Device extension

**Registered Extension Number**

515

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_decode_vp9] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_decode_vp9 extension*)

**Extension Proposal**

[VK_KHR_video_decode_vp9](../../../../features/latest/features/proposals/VK_KHR_video_decode_vp9.html)

**Last Modified Date**

2025-04-11

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

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
Daniel Almeida, Collabora

* 
Nicolas Dufresne, Collabora

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)` extension
by adding support for decoding elementary video stream sequences compliant
with the VP9 video compression standard.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoDecodeVP9FeaturesKHR](VkPhysicalDeviceVideoDecodeVP9FeaturesKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoDecodeVP9CapabilitiesKHR](VkVideoDecodeVP9CapabilitiesKHR.html)

Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

* 
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoDecodeVP9ProfileInfoKHR](VkVideoDecodeVP9ProfileInfoKHR.html)

* 
`VK_KHR_VIDEO_DECODE_VP9_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_DECODE_VP9_SPEC_VERSION`

* 
[VK_MAX_VIDEO_VP9_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_VP9_REFERENCES_PER_FRAME_KHR.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_DECODE_VP9_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PROFILE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 1, 2025-04-11 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_decode_vp9).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
