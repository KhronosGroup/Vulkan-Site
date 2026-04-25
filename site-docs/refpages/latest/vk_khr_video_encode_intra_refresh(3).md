# VK_KHR_video_encode_intra_refresh(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_intra_refresh.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_intra_refresh](#VK_KHR_video_encode_intra_refresh)
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

VK_KHR_video_encode_intra_refresh - device extension

**Name String**

`VK_KHR_video_encode_intra_refresh`

**Extension Type**

Device extension

**Registered Extension Number**

553

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

**API Interactions**

* 
Interacts with VK_KHR_video_encode_av1

* 
Interacts with VK_KHR_video_encode_h264

* 
Interacts with VK_KHR_video_encode_h265

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_intra_refresh] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_encode_intra_refresh extension*)

**Extension Proposal**

[VK_KHR_video_encode_intra_refresh](../../../../features/latest/features/proposals/VK_KHR_video_encode_intra_refresh.html)

**Last Modified Date**

2025-03-28

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Ping Liu, Intel

* 
Daniel Rakos, RasterGrid

* 
Lynne Iribarren, Independent

This extension builds upon the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension
by enabling the application to perform intra refresh in video encode
operations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR](VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)

Extending [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html):

* 
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoReferenceIntraRefreshInfoKHR](VkVideoReferenceIntraRefreshInfoKHR.html)

Extending [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html):

* 
[VkVideoEncodeSessionIntraRefreshCreateInfoKHR](VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html)

* 
[VkVideoEncodeIntraRefreshModeFlagBitsKHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html)

* 
[VkVideoEncodeIntraRefreshModeFlagsKHR](VkVideoEncodeIntraRefreshModeFlagsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_INTRA_REFRESH_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_INTRA_REFRESH_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_INTRA_REFRESH_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_INTRA_REFRESH_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_REFERENCE_INTRA_REFRESH_INFO_KHR](VkStructureType.html)

Extending [VkVideoEncodeFlagBitsKHR](VkVideoEncodeFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

If [VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html) is supported:

* 
Extending [VkVideoEncodeAV1CapabilityFlagBitsKHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html):

[VK_VIDEO_ENCODE_AV1_CAPABILITY_COMPOUND_PREDICTION_INTRA_REFRESH_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html)

If [VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html) is supported:

* 
Extending [VkVideoEncodeH264CapabilityFlagBitsKHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html):

[VK_VIDEO_ENCODE_H264_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html)

If [VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html) is supported:

* 
Extending [VkVideoEncodeH265CapabilityFlagBitsKHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html):

[VK_VIDEO_ENCODE_H265_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html)

* 
Revision 1, 2025-03-28 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_intra_refresh).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
