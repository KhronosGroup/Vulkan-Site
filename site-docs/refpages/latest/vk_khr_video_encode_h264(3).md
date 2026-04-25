# VK_KHR_video_encode_h264(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_h264.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_h264](#VK_KHR_video_encode_h264)
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

VK_KHR_video_encode_h264 - device extension

**Name String**

`VK_KHR_video_encode_h264`

**Extension Type**

Device extension

**Registered Extension Number**

39

**Revision**

14

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_h264] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_encode_h264 extension*)

**Extension Proposal**

[VK_KHR_video_encode_h264](../../../../features/latest/features/proposals/VK_KHR_video_encode_h264.html)

**Last Modified Date**

2023-12-05

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
George Hao, AMD

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
Ravi Chaudhary, NVIDIA

* 
Yang Liu, AMD

* 
Daniel Rakos, RasterGrid

* 
Aidan Fabius, Lynx

* 
Lynne Iribarren, Independent

This extension builds upon the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension
by adding support for encoding elementary video stream sequences compliant
with the H.264/AVC video compression standard.

|  | This extension was promoted to `KHR` from the provisional extension
| --- | --- |
`VK_EXT_video_encode_h264`. |

* 
[VkVideoEncodeH264FrameSizeKHR](VkVideoEncodeH264FrameSizeKHR.html)

* 
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)

* 
[VkVideoEncodeH264QpKHR](VkVideoEncodeH264QpKHR.html)

* 
Extending [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html):

[VkVideoEncodeH264GopRemainingFrameInfoKHR](VkVideoEncodeH264GopRemainingFrameInfoKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)

Extending [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html):

* 
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)

Extending [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html):

* 
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)

Extending [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html):

* 
[VkVideoEncodeH264QualityLevelPropertiesKHR](VkVideoEncodeH264QualityLevelPropertiesKHR.html)

Extending [VkVideoEncodeRateControlLayerInfoKHR](VkVideoEncodeRateControlLayerInfoKHR.html):

* 
[VkVideoEncodeH264RateControlLayerInfoKHR](VkVideoEncodeH264RateControlLayerInfoKHR.html)

Extending [VkVideoEncodeSessionParametersFeedbackInfoKHR](VkVideoEncodeSessionParametersFeedbackInfoKHR.html):

* 
[VkVideoEncodeH264SessionParametersFeedbackInfoKHR](VkVideoEncodeH264SessionParametersFeedbackInfoKHR.html)

Extending [VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html):

* 
[VkVideoEncodeH264SessionParametersGetInfoKHR](VkVideoEncodeH264SessionParametersGetInfoKHR.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoEncodeH264ProfileInfoKHR](VkVideoEncodeH264ProfileInfoKHR.html)

Extending [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html):

* 
[VkVideoEncodeH264DpbSlotInfoKHR](VkVideoEncodeH264DpbSlotInfoKHR.html)

Extending [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html):

* 
[VkVideoEncodeH264SessionCreateInfoKHR](VkVideoEncodeH264SessionCreateInfoKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoEncodeH264SessionParametersCreateInfoKHR](VkVideoEncodeH264SessionParametersCreateInfoKHR.html)

Extending [VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html):

* 
[VkVideoEncodeH264SessionParametersAddInfoKHR](VkVideoEncodeH264SessionParametersAddInfoKHR.html)

* 
[VkVideoEncodeH264CapabilityFlagBitsKHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html)

* 
[VkVideoEncodeH264RateControlFlagBitsKHR](VkVideoEncodeH264RateControlFlagBitsKHR.html)

* 
[VkVideoEncodeH264StdFlagBitsKHR](VkVideoEncodeH264StdFlagBitsKHR.html)

* 
[VkVideoEncodeH264CapabilityFlagsKHR](VkVideoEncodeH264CapabilityFlagsKHR.html)

* 
[VkVideoEncodeH264RateControlFlagsKHR](VkVideoEncodeH264RateControlFlagsKHR.html)

* 
[VkVideoEncodeH264StdFlagsKHR](VkVideoEncodeH264StdFlagsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_H264_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_H264_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_GOP_REMAINING_FRAME_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_NALU_SLICE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PICTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_LAYER_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_FEEDBACK_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_GET_INFO_KHR](VkStructureType.html)

Extending [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html):

* 
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
Revision 0, 2018-7-23 (Ahmed Abdelkhalek)

Initial draft

Revision 0.5, 2020-02-13 (Tony Zlatinski)

* 
General Spec cleanup

* 
Added DPB structures

* 
Change the VCL frame encode structure

* 
Added a common Non-VCL Picture Paramarameters structure

Revision 1, 2021-03-29 (Tony Zlatinski)

* 
Spec and API updates

Revision 2, August 1 2021 (Srinath Kumarapuram)

* 
Rename `VkVideoEncodeH264CapabilitiesFlagsEXT` to
`VkVideoEncodeH264CapabilityFlagsEXT` and
`VkVideoEncodeH264CapabilitiesFlagsEXT` to
`VkVideoEncodeH264CapabilityFlagsEXT`, following Vulkan naming
conventions.

Revision 3, 2021-12-08 (Ahmed Abdelkhalek)

* 
Rate control updates

Revision 4, 2022-02-04 (Ahmed Abdelkhalek)

* 
Align VkVideoEncodeH264VclFrameInfoEXT structure to similar one in
VK_EXT_video_encode_h265 extension

Revision 5, 2022-02-10 (Ahmed Abdelkhalek)

* 
Updates to encode capability interface

Revision 6, 2022-03-16 (Ahmed Abdelkhalek)

* 
Relocate Std header version reporting/requesting from this extension to
VK_KHR_video_queue extension.

* 
Remove redundant maxPictureSizeInMbs from
VkVideoEncodeH264SessionCreateInfoEXT.

* 
Remove the now empty VkVideoEncodeH264SessionCreateInfoEXT.

Revision 7, 2022-04-06 (Ahmed Abdelkhalek)

* 
Add capability flag to report support to use B frame in L1 reference
list.

* 
Add capability flag to report support for disabling SPS
direct_8x8_inference_flag.

Revision 8, 2022-07-18 (Daniel Rakos)

* 
Replace `VkVideoEncodeH264RateControlStructureFlagBitsEXT` bit enum
with `VkVideoEncodeH264RateControlStructureEXT` enum

* 
Rename `VkVideoEncodeH264ProfileEXT` to
`VkVideoEncodeH264ProfileInfoEXT`

* 
Rename `VkVideoEncodeH264ReferenceListsEXT` to
`VkVideoEncodeH264ReferenceListsInfoEXT`

* 
Rename `VkVideoEncodeH264EmitPictureParametersEXT` to
`VkVideoEncodeH264EmitPictureParametersInfoEXT`

* 
Rename `VkVideoEncodeH264NaluSliceEXT` to
`VkVideoEncodeH264NaluSliceInfoEXT`

Revision 9, 2022-09-18 (Daniel Rakos)

* 
Rename `spsStdCount`, `pSpsStd`, `ppsStdCount`, and `pPpsStd` to
`stdSPSCount`, `pStdSPSs`, `stdPPSCount`, and `pStdPPSs`, respectively,
in `VkVideoEncodeH264SessionParametersAddInfoEXT`

* 
Rename `maxSpsStdCount` and `maxPpsStdCount` to `maxStdSPSCount` and
`maxStdPPSCount`, respectively, in
`VkVideoEncodeH264SessionParametersCreateInfoEXT`

Revision 10, 2023-03-06 (Daniel Rakos)

* 
Removed `VkVideoEncodeH264EmitPictureParametersInfoEXT`

* 
Changed member types in `VkVideoEncodeH264CapabilitiesEXT` and
`VkVideoEncodeH264ReferenceListsInfoEXT` from `uint8_t` to `uint32_t`

* 
Changed the type of
`VkVideoEncodeH264RateControlInfoEXT::temporalLayerCount` and
`VkVideoEncodeH264RateControlLayerInfoEXT::temporalLayerId` from
`uint8_t` to `uint32_t`

* 
Removed `VkVideoEncodeH264InputModeFlagsEXT` and
`VkVideoEncodeH264OutputModeFlagsEXT` as we only support
frame-in-frame-out mode for now

* 
Rename `pCurrentPictureInfo` in `VkVideoEncodeH264VclFrameInfoEXT` to
`pStdPictureInfo`

* 
Rename `pSliceHeaderStd` in `VkVideoEncodeH264NaluSliceInfoEXT` to
`pStdSliceHeader`

* 
Rename `pReferenceFinalLists` in `VkVideoEncodeH264VclFrameInfoEXT` and
`VkVideoEncodeH264NaluSliceInfoEXT` to `pStdReferenceFinalLists`

* 
Removed the `slotIndex` member of `VkVideoEncodeH264DpbSlotInfoEXT` and
changed it to be chained to `VkVideoReferenceSlotInfoKHR`

* 
Replaced `VkVideoEncodeH264ReferenceListsInfoEXT` with the new Video
Std header structure `StdVideoEncodeH264ReferenceLists` that also
includes data previously part of the now removed
`StdVideoEncodeH264RefMemMgmtCtrlOperations` structure

* 
Added new capability flag
`VK_VIDEO_ENCODE_H264_CAPABILITY_DIFFERENT_REFERENCE_FINAL_LISTS_BIT_EXT`

Revision 11, 2023-05-22 (Daniel Rakos)

* 
Renamed `VkVideoEncodeH264VclFrameInfoEXT` to
`VkVideoEncodeH264PictureInfoEXT`

* 
Added `VkVideoEncodeH264PictureInfoEXT::generatePrefixNalu` and
`VK_VIDEO_ENCODE_H264_CAPABILITY_GENERATE_PREFIX_NALU_BIT_EXT` to
enable the generation of H.264 prefix NALUs when supported by the
implementation

* 
Removed `VkVideoEncodeH264RateControlLayerInfoEXT::temporalLayerId`

* 
Added `expectDyadicTemporalLayerPattern` capability

* 
Added the `VkVideoEncodeH264SessionParametersGetInfoEXT` structure to
identify the H.264 parameter sets to retrieve encoded parameter data
for, and the `VkVideoEncodeH264SessionParametersFeedbackInfoEXT`
structure to retrieve H.264 parameter set override information when
using the new `vkGetEncodedVideoSessionParametersKHR` command

* 
Added `VkVideoEncodeH264NaluSliceInfoEXT::constantQp` to specify
per-slice constant QP when rate control mode is
`VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR`

* 
Added `VkVideoEncodeH264QualityLevelPropertiesEXT` for retrieving H.264
specific quality level recommendations

* 
Replaced `VkVideoEncodeH264RateControlStructureEXT` enum with the flags
type `VkVideoEncodeH264RateControlFlagsEXT` and bits defined in
`VkVideoEncodeH264RateControlFlagBitsEXT` and added HRD compliance flag

* 
Removed `useInitialRcQp` and `initialRcQp` members of
`VkVideoEncodeH264RateControlLayerInfoEXT`

* 
Added `prefersGopRemainingFrames` and `requiresGopRemainingFrames`, and
the new `VkVideoEncodeH264GopRemainingFrameInfoEXT` structure to allow
specifying remaining frames of each type in the rate control GOP

* 
Added `maxTemporalLayers`, `maxQp`, and `minQp` capabilities

* 
Added `maxLevelIdc` capability and new
`VkVideoEncodeH264SessionCreateInfoEXT` structure to specify upper
bounds on the H.264 level of the produced video bitstream

* 
Moved capability flags specific to codec syntax restrictions from
`VkVideoEncodeH264CapabilityFlagsEXT` to the new
`VkVideoEncodeH264StdFlagsEXT` which is now included as a separate
`stdSyntaxFlags` member in `VkVideoEncodeH264CapabilitiesEXT`

* 
Removed codec syntax override values from
`VkVideoEncodeH264CapabilitiesEXT`

* 
Removed `VkVideoEncodeH264NaluSliceInfoEXT::mbCount` and
`VK_VIDEO_ENCODE_H264_CAPABILITY_SLICE_MB_COUNT_BIT_EXT`

* 
Replaced
`VK_VIDEO_ENCODE_H264_CAPABILITY_MULTIPLE_SLICES_PER_FRAME_BIT_EXT`
with the new `maxSliceCount` capability

* 
Removed capability flag
`VK_VIDEO_ENCODE_H264_CAPABILITY_DIFFERENT_REFERENCE_FINAL_LISTS_BIT_EXT`
and removed `pStdReferenceFinalLists` members from the
`VkVideoEncodeH264PictureInfoEXT` and
`VkVideoEncodeH264NaluSliceInfoEXT` structures as reference lists info
is now included in `pStdPictureInfo`

* 
Added capability flag
`VK_VIDEO_ENCODE_H264_CAPABILITY_B_FRAME_IN_L0_LIST_BIT_EXT`

Revision 12, 2023-07-19 (Daniel Rakos)

* 
Added video std capability flags
`VK_VIDEO_ENCODE_H264_STD_SLICE_QP_DELTA_BIT_EXT` and
`VK_VIDEO_ENCODE_H264_STD_DIFFERENT_SLICE_QP_DELTA_BIT_EXT`

* 
Fixed optionality of the array members of
`VkVideoEncodeH264SessionParametersAddInfoEXT`

* 
Fixed optionality of `VkVideoEncodeH264RateControlInfoEXT::flags`

Revision 13, 2023-09-04 (Daniel Rakos)

* 
Change extension from `EXT` to `KHR`

* 
Extension is no longer provisional

Revision 14, 2023-12-05 (Daniel Rakos)

* 
Condition reference picture setup based on the value of
`StdVideoEncodeH264PictureInfo::flags.is_reference`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_h264).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
