# VK_KHR_video_decode_h265(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_decode_h265.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_decode_h265](#VK_KHR_video_decode_h265)
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

VK_KHR_video_decode_h265 - device extension

**Name String**

`VK_KHR_video_decode_h265`

**Extension Type**

Device extension

**Registered Extension Number**

188

**Revision**

8

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html)

**Contact**

* 
[peter.fang@amd.com](mailto:peter.fang@amd.com)

**Extension Proposal**

[VK_KHR_video_decode_h265](../../../../features/latest/features/proposals/VK_KHR_video_decode_h265.html)

**Last Modified Date**

2023-12-05

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

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
with the H.265/HEVC video compression standard.

|  | This extension was promoted to `KHR` from the provisional extension
| --- | --- |
`VK_EXT_video_decode_h265`. |

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoDecodeH265CapabilitiesKHR](VkVideoDecodeH265CapabilitiesKHR.html)

Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html):

* 
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoDecodeH265ProfileInfoKHR](VkVideoDecodeH265ProfileInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoDecodeH265DpbSlotInfoKHR](VkVideoDecodeH265DpbSlotInfoKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoDecodeH265SessionParametersCreateInfoKHR](VkVideoDecodeH265SessionParametersCreateInfoKHR.html)

Extending [VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html):

* 
[VkVideoDecodeH265SessionParametersAddInfoKHR](VkVideoDecodeH265SessionParametersAddInfoKHR.html)

* 
`VK_KHR_VIDEO_DECODE_H265_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_DECODE_H265_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_ADD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 1, 2018-6-11 (Peter Fang)

Initial draft

Revision 1.6, March 29 2021 (Tony Zlatinski)

* 
Spec and API updates.

Revision 2, 2022-03-16 (Ahmed Abdelkhalek)

* 
Relocate Std header version reporting/requesting from this extension to
VK_KHR_video_queue extension.

* 
Remove the now empty VkVideoDecodeH265SessionCreateInfoEXT.

Revision 3, 2022-03-31 (Ahmed Abdelkhalek)

* 
Use type StdVideoH265Level for VkVideoDecodeH265Capabilities.maxLevel

Revision 4, 2022-08-09 (Daniel Rakos)

* 
Rename `VkVideoDecodeH265ProfileEXT` to
`VkVideoDecodeH265ProfileInfoEXT`

Revision 5, 2022-09-18 (Daniel Rakos)

* 
Rename `vpsStdCount`, `pVpsStd`, `spsStdCount`, `pSpsStd`,
`ppsStdCount`, and `pPpsStd` to `stdVPSCount`, `pStdVPSs`,
`stdSPSCount`, `pStdSPSs`, `stdPPSCount`, and `pStdPPSs`, respectively,
in `VkVideoDecodeH265SessionParametersAddInfoEXT`

* 
Rename `maxVpsStdCount`, `maxSpsStdCount`, and `maxPpsStdCount` to
`maxStdVPSCount`, `maxStdSPSCount` and `maxStdPPSCount`, respectively,
in `VkVideoDecodeH265SessionParametersCreateInfoEXT`

* 
Rename `slicesCount` and `pSlicesDataOffsets` to `sliceCount` and
`pSliceOffsets`, respectively, in `VkVideoDecodeH265PictureInfoEXT`

Revision 6, 2022-11-14 (Daniel Rakos)

* 
Rename `slice` to `sliceSegment` in the APIs for better clarity

Revision 7, 2022-11-14 (Daniel Rakos)

* 
Change extension from `EXT` to `KHR`

* 
Extension is no longer provisional

Revision 8, 2023-12-05 (Daniel Rakos)

* 
Condition reference picture setup based on the value of
`StdVideoDecodeH265PictureInfo::flags.IsReference`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_decode_h265).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
