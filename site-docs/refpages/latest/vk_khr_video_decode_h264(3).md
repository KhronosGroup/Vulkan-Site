# VK_KHR_video_decode_h264(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_decode_h264.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_decode_h264](#VK_KHR_video_decode_h264)
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

VK_KHR_video_decode_h264 - device extension

**Name String**

`VK_KHR_video_decode_h264`

**Extension Type**

Device extension

**Registered Extension Number**

41

**Revision**

9

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)

**Contact**

* 
[peter.fang@amd.com](mailto:peter.fang@amd.com)

**Extension Proposal**

[VK_KHR_video_decode_h264](../../../../features/latest/features/proposals/VK_KHR_video_decode_h264.html)

**Last Modified Date**

2023-12-05

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Chunbo Chen, Intel

* 
HoHin Lau, AMD

* 
Jake Beju, AMD

* 
Peter Fang, AMD

* 
Ping Liu, Intel

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)` extension
by adding support for decoding elementary video stream sequences compliant
with the H.264/AVC video compression standard.

|  | This extension was promoted to `KHR` from the provisional extension
| --- | --- |
`VK_EXT_video_decode_h264`. |

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html)

Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

* 
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoDecodeH264SessionParametersCreateInfoKHR](VkVideoDecodeH264SessionParametersCreateInfoKHR.html)

Extending [VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html):

* 
[VkVideoDecodeH264SessionParametersAddInfoKHR](VkVideoDecodeH264SessionParametersAddInfoKHR.html)

* 
[VkVideoDecodeH264PictureLayoutFlagBitsKHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html)

* 
[VkVideoDecodeH264PictureLayoutFlagsKHR](VkVideoDecodeH264PictureLayoutFlagsKHR.html)

* 
`VK_KHR_VIDEO_DECODE_H264_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_DECODE_H264_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 1, 2018-6-11 (Peter Fang)

Initial draft

Revision 2, March 29 2021 (Tony Zlatinski)

* 
Spec and API Updates

Revision 3, August 1 2021 (Srinath Kumarapuram)

* 
Rename `VkVideoDecodeH264FieldLayoutFlagsEXT` to
`VkVideoDecodeH264PictureLayoutFlagsEXT`,
`VkVideoDecodeH264FieldLayoutFlagBitsEXT` to
`VkVideoDecodeH264PictureLayoutFlagBitsEXT` (along with the names of
enumerants it defines), and `VkVideoDecodeH264ProfileEXT.fieldLayout`
to `VkVideoDecodeH264ProfileEXT.pictureLayout`, following Vulkan naming
conventions.

Revision 4, 2022-03-16 (Ahmed Abdelkhalek)

* 
Relocate Std header version reporting/requesting from this extension to
VK_KHR_video_queue extension.

* 
Remove the now empty VkVideoDecodeH264SessionCreateInfoEXT.

Revision 5, 2022-03-31 (Ahmed Abdelkhalek)

* 
Use type StdVideoH264Level for VkVideoDecodeH264Capabilities.maxLevel

Revision 6, 2022-08-09 (Daniel Rakos)

* 
Rename `VkVideoDecodeH264ProfileEXT` to
`VkVideoDecodeH264ProfileInfoEXT`

* 
Rename `VkVideoDecodeH264MvcEXT` to `VkVideoDecodeH264MvcInfoEXT`

Revision 7, 2022-09-18 (Daniel Rakos)

* 
Change type of `VkVideoDecodeH264ProfileInfoEXT::pictureLayout` to
`VkVideoDecodeH264PictureLayoutFlagBitsEXT`

* 
Remove MVC support and related `VkVideoDecodeH264MvcInfoEXT` structure

* 
Rename `spsStdCount`, `pSpsStd`, `ppsStdCount`, and `pPpsStd` to
`stdSPSCount`, `pStdSPSs`, `stdPPSCount`, and `pStdPPSs`, respectively,
in `VkVideoDecodeH264SessionParametersAddInfoEXT`

* 
Rename `maxSpsStdCount` and `maxPpsStdCount` to `maxStdSPSCount` and
`maxStdPPSCount`, respectively, in
`VkVideoDecodeH264SessionParametersCreateInfoEXT`

* 
Rename `slicesCount` and `pSlicesDataOffsets` to `sliceCount` and
`pSliceOffsets`, respectively, in `VkVideoDecodeH264PictureInfoEXT`

Revision 8, 2022-09-29 (Daniel Rakos)

* 
Change extension from `EXT` to `KHR`

* 
Extension is no longer provisional

Revision 9, 2023-12-05 (Daniel Rakos)

* 
Condition reference picture setup based on the value of
`StdVideoDecodeH264PictureInfo::flags.is_reference`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_decode_h264).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
