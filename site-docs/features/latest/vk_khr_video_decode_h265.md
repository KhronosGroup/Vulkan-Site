# VK_KHR_video_decode_h265

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_decode_h265.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Video Std Headers](#_video_std_headers)
- [3.1._Video_Std_Headers](#_video_std_headers)
- [3.2. H.265 Decode Profiles](#_h_265_decode_profiles)
- [3.2._H.265_Decode_Profiles](#_h_265_decode_profiles)
- [3.3. H.265 Decode Capabilities](#_h_265_decode_capabilities)
- [3.3._H.265_Decode_Capabilities](#_h_265_decode_capabilities)
- [3.4. H.265 Decode Parameter Sets](#_h_265_decode_parameter_sets)
- [3.4._H.265_Decode_Parameter_Sets](#_h_265_decode_parameter_sets)
- [3.5. H.265 Decoding Parameters](#_h_265_decoding_parameters)
- [3.5._H.265_Decoding_Parameters](#_h_265_decoding_parameters)
- [4. Examples](#_examples)
- [4.1. Select queue family with H.265 decode support](#_select_queue_family_with_h_265_decode_support)
- [4.1._Select_queue_family_with_H.265_decode_support](#_select_queue_family_with_h_265_decode_support)
- [4.2. Check support and query the capabilities for an H.265 decode profile](#_check_support_and_query_the_capabilities_for_an_h_265_decode_profile)
- [4.2._Check_support_and_query_the_capabilities_for_an_H.265_decode_profile](#_check_support_and_query_the_capabilities_for_an_h_265_decode_profile)
- [4.3. Create and update H.265 video session parameters objects](#_create_and_update_h_265_video_session_parameters_objects)
- [4.3._Create_and_update_H.265_video_session_parameters_objects](#_create_and_update_h_265_video_session_parameters_objects)
- [4.4. Record H.265 decode operation (video session without DPB slots)](#_record_h_265_decode_operation_video_session_without_dpb_slots)
- [4.4._Record_H.265_decode_operation_(video_session_without_DPB_slots)](#_record_h_265_decode_operation_video_session_without_dpb_slots)
- [4.5. Record H.265 decode operation with optional reference picture setup](#_record_h_265_decode_operation_with_optional_reference_picture_setup)
- [4.5._Record_H.265_decode_operation_with_optional_reference_picture_setup](#_record_h_265_decode_operation_with_optional_reference_picture_setup)
- [4.6. Record H.265 decode operation with reference picture list](#_record_h_265_decode_operation_with_reference_picture_list)
- [4.6._Record_H.265_decode_operation_with_reference_picture_list](#_record_h_265_decode_operation_with_reference_picture_list)
- [5. Issues](#_issues)
- [5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.1._In_what_form_should_codec-specific_parameters_be_provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.2. Why the vulkan_video_codec_h265std video std header does not have a version number?](#_why_the_vulkan_video_codec_h265std_video_std_header_does_not_have_a_version_number)
- [5.2._Why_the_vulkan_video_codec_h265std_video_std_header_does_not_have_a_version_number?](#_why_the_vulkan_video_codec_h265std_video_std_header_does_not_have_a_version_number)
- [5.3. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.3._What_are_the_requirements_for_the_codec-specific_input_parameters_and_bitstream_data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.4. How should PPS entries be identified?](#_how_should_pps_entries_be_identified)
- [5.4._How_should_PPS_entries_be_identified?](#_how_should_pps_entries_be_identified)
- [5.5. Why is there a need for the application to specify the offset of individual slice segments of the decoded pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slice_segments_of_the_decoded_pictures)
- [5.5._Why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slice_segments_of_the_decoded_pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slice_segments_of_the_decoded_pictures)
- [5.6. Is H.265 Multiview content supported?](#_is_h_265_multiview_content_supported)
- [5.6._Is_H.265_Multiview_content_supported?](#_is_h_265_multiview_content_supported)
- [5.7. Is the worst case size of all input structures for H.265 VPS and SPS entries prohibitively large for embedded devices?](#_is_the_worst_case_size_of_all_input_structures_for_h_265_vps_and_sps_entries_prohibitively_large_for_embedded_devices)
- [5.7._Is_the_worst_case_size_of_all_input_structures_for_H.265_VPS_and_SPS_entries_prohibitively_large_for_embedded_devices?](#_is_the_worst_case_size_of_all_input_structures_for_h_265_vps_and_sps_entries_prohibitively_large_for_embedded_devices)
- [5.8. Why are H.265 level indicator values specified differently than the way they are defined in the codec specification?](#_why_are_h_265_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
- [5.8._Why_are_H.265_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification?](#_why_are_h_265_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
- [5.9. How is reference picture setup requested for H.265 decode operations?](#_how_is_reference_picture_setup_requested_for_h_265_decode_operations)
- [5.9._How_is_reference_picture_setup_requested_for_H.265_decode_operations?](#_how_is_reference_picture_setup_requested_for_h_265_decode_operations)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Video Std Headers](#_video_std_headers)
[3.2. H.265 Decode Profiles](#_h_265_decode_profiles)
[3.3. H.265 Decode Capabilities](#_h_265_decode_capabilities)
[3.4. H.265 Decode Parameter Sets](#_h_265_decode_parameter_sets)
[3.5. H.265 Decoding Parameters](#_h_265_decoding_parameters)

[4. Examples](#_examples)

[4.1. Select queue family with H.265 decode support](#_select_queue_family_with_h_265_decode_support)
[4.2. Check support and query the capabilities for an H.265 decode profile](#_check_support_and_query_the_capabilities_for_an_h_265_decode_profile)
[4.3. Create and update H.265 video session parameters objects](#_create_and_update_h_265_video_session_parameters_objects)
[4.4. Record H.265 decode operation (video session without DPB slots)](#_record_h_265_decode_operation_video_session_without_dpb_slots)
[4.5. Record H.265 decode operation with optional reference picture setup](#_record_h_265_decode_operation_with_optional_reference_picture_setup)
[4.6. Record H.265 decode operation with reference picture list](#_record_h_265_decode_operation_with_reference_picture_list)

[5. Issues](#_issues)

[5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
[5.2. Why the `vulkan_video_codec_h265std` video std header does not have a version number?](#_why_the_vulkan_video_codec_h265std_video_std_header_does_not_have_a_version_number)
[5.3. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
[5.4. How should PPS entries be identified?](#_how_should_pps_entries_be_identified)
[5.5. Why is there a need for the application to specify the offset of individual slice segments of the decoded pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slice_segments_of_the_decoded_pictures)
[5.6. Is H.265 Multiview content supported?](#_is_h_265_multiview_content_supported)
[5.7. Is the worst case size of all input structures for H.265 VPS and SPS entries prohibitively large for embedded devices?](#_is_the_worst_case_size_of_all_input_structures_for_h_265_vps_and_sps_entries_prohibitively_large_for_embedded_devices)
[5.8. Why are H.265 level indicator values specified differently than the way they are defined in the codec specification?](#_why_are_h_265_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
[5.9. How is reference picture setup requested for H.265 decode operations?](#_how_is_reference_picture_setup_requested_for_h_265_decode_operations)

[6. Further Functionality](#_further_functionality)

This document outlines a proposal to enable performing H.265/HEVC video decode operations in Vulkan.

The `VK_KHR_video_queue` extension introduces support for video coding operations and the `VK_KHR_video_decode_queue` extension further extends this with APIs specific to video decoding.

The goal of this proposal is to build upon this infrastructure to introduce support for decoding elementary video stream sequences compliant with the H.265/HEVC video compression standard.

As the `VK_KHR_video_queue` and `VK_KHR_video_decode_queue` extensions already laid down the architecture for how codec-specific video decode extensions need to be designed, this extension only needs to define the APIs to provide the necessary codec-specific parameters at various points during the use of the codec-independent APIs. In particular:

* 
APIs allowing to specify H.265 video, sequence, and picture parameter sets (VPS, SPS, PPS) to be stored in video session parameters objects

* 
APIs allowing to specify H.265 information specific to the decoded picture, including references to previously stored VPS, SPS, and PPS entries

* 
APIs allowing to specify H.265 reference picture information specific to the active reference pictures and optional reconstructed picture used in video decode operations

The following options have been considered to choose the structure of these definitions:

Allow specifying packed codec-specific data to the APIs in the form they appear in bitstreams

Specify codec-specific parameters through custom type definitions that the application can populate after parsing the corresponding data elements in the bitstreams

Option (1) would allow for a simpler API, but it requires implementations to include an appropriate parser for these data elements. As decoding applications typically parse these data elements for other reasons anyway, this proposal choses option (2) to enable the application to provide the needed parameters through custom definitions provided by a video std header dedicated to H.265 video decoding.

The following additional options have been considered to choose the way this video std header is defined:

Include all definitions in this H.265 video decode std header

Add a separate video std header that includes H.265 parameter definitions that can be shared across video decoding and video encoding use cases that the H.265 video decode std header depends on, and only include decode-specific definitions in the H.265 video decode std header

Both options are reasonable, however, as the H.265 video decoding and H.265 video encoding functionalities were designed in parallel, this extension uses option (2) and introduces the following new video std headers:

* 
`vulkan_video_codec_h265std` - containing common definitions for all H.265 video coding operations

* 
`vulkan_video_codec_h265std_decode` - containing definitions specific to H.265 video decoding operations

These headers can be included as follows:

#include 
#include 

This extension uses the new `vulkan_video_codec_h265std_decode` video std header. Implementations must always support at least version 1.0.0 of this video std header.

This extension introduces the new video codec operation `VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR`. This flag can be used to check whether a particular queue family supports decoding H.265/HEVC content, as returned in `VkQueueFamilyVideoPropertiesKHR`.

An H.265 decode profile can be defined through a `VkVideoProfileInfoKHR` structure using this new video codec operation and by including the following new codec-specific profile information structure in the `pNext` chain:

typedef struct VkVideoDecodeH265ProfileInfoKHR {
    VkStructureType           sType;
    const void*               pNext;
    StdVideoH265ProfileIdc    stdProfileIdc;
} VkVideoDecodeH265ProfileInfoKHR;

`stdProfileIdc` specifies the H.265 profile indicator.

Applications need to include the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command to retrieve the capabilities specific to H.265 video decoding:

typedef struct VkVideoDecodeH265CapabilitiesKHR {
    VkStructureType         sType;
    void*                   pNext;
    StdVideoH265LevelIdc    maxLevelIdc;
} VkVideoDecodeH265CapabilitiesKHR;

`maxLevelIdc` indicates the maximum supported H.265 level indicator.

The use of video session parameters objects is mandatory when decoding H.265 video streams. Applications need to include the following new structure in the `pNext` chain of `VkVideoSessionParametersCreateInfoKHR` when creating video session parameters objects for H.265 decode use, to specify the parameter set capacity of the created objects:

typedef struct VkVideoDecodeH265SessionParametersCreateInfoKHR {
    VkStructureType                                        sType;
    const void*                                            pNext;
    uint32_t                                               maxStdVPSCount;
    uint32_t                                               maxStdSPSCount;
    uint32_t                                               maxStdPPSCount;
    const VkVideoDecodeH265SessionParametersAddInfoKHR*    pParametersAddInfo;
} VkVideoDecodeH265SessionParametersCreateInfoKHR;

The optional `pParametersAddInfo` member also allows specifying an initial set of parameter sets to add to the created object:

typedef struct VkVideoDecodeH265SessionParametersAddInfoKHR {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   stdVPSCount;
    const StdVideoH265VideoParameterSet*       pStdVPSs;
    uint32_t                                   stdSPSCount;
    const StdVideoH265SequenceParameterSet*    pStdSPSs;
    uint32_t                                   stdPPSCount;
    const StdVideoH265PictureParameterSet*     pStdPPSs;
} VkVideoDecodeH265SessionParametersAddInfoKHR;

This structure can also be included in the `pNext` chain of `VkVideoSessionParametersUpdateInfoKHR` used in video session parameters update operations to add further parameter sets to an object after its creation.

Individual parameter sets are stored using parameter set IDs as their keys, specifically:

* 
H.265 VPS entries are identified using a `vps_video_parameter_set_id` value

* 
H.265 SPS entries are identified using a pair of `sps_video_parameter_set_id` and `sps_seq_parameter_set_id` values

* 
H.265 PPS entries are identified using a triplet of `sps_video_parameter_set_id`, `pps_seq_parameter_set_id`, and `pps_pic_parameter_set_id` values

Please note the inclusion of the VPS ID in the PPS key. This is needed because a PPS is not uniquely identified by its ID and the ID of the parent SPS, as multiple SPS entries may exist with the same ID that have different parent VPS IDs. In order to ensure the uniqueness of keys, all APIs referring to a PPS in this proposal also take the parent VPS ID of the SPS the PPS in question belongs to, to specify the full hierarchy of IDs.

The H.265/HEVC video compression standard always requires a VPS, SPS, and PPS, hence the application has to add an instance of each parameter set to the used parameters object before being able to record video decode operations.

Furthermore, the H.265/HEVC video compression standard also allows modifying existing parameter sets, but as parameters already stored in video session parameters objects cannot be changed in Vulkan, the application has to create new parameters objects in such cases, as described in the proposal for `VK_KHR_video_queue`.

Decode parameters specific to H.265 need to be provided by the application through the `pNext` chain of `VkVideoDecodeInfoKHR`, using the following new structure:

typedef struct VkVideoDecodeH265PictureInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    const StdVideoDecodeH265PictureInfo*    pStdPictureInfo;
    uint32_t                                sliceSegmentCount;
    const uint32_t*                         pSliceSegmentOffsets;
} VkVideoDecodeH265PictureInfoKHR;

`pStdPictureInfo` points to the codec-specific decode parameters defined in the `vulkan_video_codec_h265std_decode` video std header, while the `pSliceSegmentOffsets` array contains the relative offset of individual slice segments of the picture within the video bitstream range used by the video decode operation.

The active VPS, SPS, and PPS (sourced from the bound video session parameters object) are identified by the `sps_video_parameter_set_id`, `pps_seq_parameter_set_id`, and `pps_pic_parameter_set_id` parameters.

Picture information specific to H.265 for the active reference pictures and the optional reconstructed picture need to be provided by the application through the `pNext` chain of corresponding elements of `VkVideoDecodeInfoKHR::pReferenceSlots` and the `pNext` chain of `VkVideoDecodeInfoKHR::pSetupReferenceSlot`, respectively, using the following new structure:

typedef struct VkVideoDecodeH265DpbSlotInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    const StdVideoDecodeH265ReferenceInfo*    pStdReferenceInfo;
} VkVideoDecodeH265DpbSlotInfoKHR;

`pStdReferenceInfo` points to the codec-specific reference picture parameters defined in the `vulkan_video_codec_h265std_decode` video std header.

It is the application’s responsibility to specify video bitstream buffer data and codec-specific parameters that are compliant with the rules defined by the H.265/HEVC video compression standard. While it is not illegal, from the API usage’s point of view, to specify non-compliant inputs, they may cause the video decode operation to complete unsuccessfully and will cause the output pictures (decode output and reconstructed pictures) to have undefined contents after the execution of the operation.

For more information about how to parse individual H.265 bitstream syntax elements, calculate derived values, and, in general, how to interpret these parameters, please refer to the corresponding sections of the [ITU-T H.265 Specification](https://www.itu.int/rec/T-REC-H.265-202108-S/).

uint32_t queueFamilyIndex;
uint32_t queueFamilyCount;

vkGetPhysicalDeviceQueueFamilyProperties2(physicalDevice, &queueFamilyCount, NULL);

VkQueueFamilyProperties2* props = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyProperties2));
VkQueueFamilyVideoPropertiesKHR* videoProps = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyVideoPropertiesKHR));

for (queueFamilyIndex = 0; queueFamilyIndex 

VkResult result;

VkVideoDecodeH265ProfileInfoKHR decodeH265ProfileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PROFILE_INFO_KHR,
    .pNext = NULL,
    .stdProfileIdc = STD_VIDEO_H265_PROFILE_IDC_MAIN
};

VkVideoProfileInfoKHR profileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR,
    .pNext = &decodeH265ProfileInfo,
    .videoCodecOperation = VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR,
    .chromaSubsampling = VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR,
    .lumaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR,
    .chromaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR
};

VkVideoDecodeH265CapabilitiesKHR decodeH265Capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_CAPABILITIES_KHR,
    .pNext = NULL,
};

VkVideoDecodeCapabilitiesKHR decodeCapabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR,
    .pNext = &decodeH265Capabilities
}

VkVideoCapabilitiesKHR capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR,
    .pNext = &decodeCapabilities
};

result = vkGetPhysicalDeviceVideoCapabilitiesKHR(physicalDevice, &profileInfo, &capabilities);

if (result == VK_SUCCESS) {
    // Profile is supported, check additional capabilities
    ...
} else {
    // Profile is not supported, result provides additional information about why
    ...
}

VkVideoSessionParametersKHR videoSessionParams = VK_NULL_HANDLE;

VkVideoDecodeH265SessionParametersCreateInfoKHR decodeH265CreateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = NULL,
    .maxStdVPSCount = ... // VPS capacity
    .maxStdSPSCount = ... // SPS capacity
    .maxStdPPSCount = ... // PPS capacity
    .pParametersAddInfo = ... // parameters to add at creation time or NULL
};

VkVideoSessionParametersCreateInfoKHR createInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = &decodeH265CreateInfo,
    .flags = 0,
    .videoSessionParametersTemplate = ... // template to use or VK_NULL_HANDLE
    .videoSession = videoSession
};

vkCreateVideoSessionParametersKHR(device, &createInfo, NULL, &videoSessionParams);

...

StdVideoH265VideoParameterSet vps = {};
// parse and populate VPS parameters
...

StdVideoH265SequenceParameterSet sps = {};
// parse and populate SPS parameters
...

StdVideoH265PictureParameterSet pps = {};
// parse and populate PPS parameters
...

VkVideoDecodeH265SessionParametersAddInfoKHR decodeH265AddInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_ADD_INFO_KHR,
    .pNext = NULL,
    .stdVPSCount = 1,
    .pStdVPSs = &vps,
    .stdSPSCount = 1,
    .pStdSPSs = &sps,
    .stdPPSCount = 1,
    .pStdPPSs = &pps
};

VkVideoSessionParametersUpdateInfoKHR updateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_UPDATE_INFO_KHR,
    .pNext = &decodeH265AddInfo,
    .updateSequenceCount = 1 // incremented for each subsequent update
};

vkUpdateVideoSessionParametersKHR(device, &videoSessionParams, &updateInfo);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH265PictureInfo stdPictureInfo = {};
// parse and populate picture info from slice segment header data
...

VkVideoDecodeH265PictureInfoKHR decodeH265PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceSegmentCount = ... // number of slice segments
    .pSliceSegmentOffsets = ... // array of slice segment offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH265PictureInfo,
    ...
    // reconstructed picture is not needed if video session was created without DPB slots
    .pSetupReferenceSlot = NULL,
    .referenceSlotCount = 0,
    .pReferenceSlots = NULL
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH265ReferenceInfo stdReferenceInfo = {};
// parse and populate reconstructed reference picture info from slice segment header data
...

VkVideoDecodeH265DpbSlotInfoKHR decodeH265DpbSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR,
    .pNext = NULL,
    .pStdReferenceInfo = &stdReferenceInfo
};

VkVideoReferenceSlotInfoKHR setupSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
    .pNext = &decodeH265DpbSlotInfo
    ...
};

StdVideoDecodeH265PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.flags.IsReference) {
    // reconstructed picture will be used for reference picture setup and DPB slot activation
} else {
    // reconstructed picture and slot may only be used by implementations as transient resource
}

VkVideoDecodeH265PictureInfoKHR decodeH265PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceSegmentCount = ... // number of slice segments
    .pSliceSegmentOffsets = ... // array of slice segment offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH265PictureInfo,
    ...
    .pSetupReferenceSlot = &setupSlotInfo,
    ...
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH265ReferenceInfo stdReferenceInfo[] = {};
// populate reference picture info for each active reference picture
...

VkVideoDecodeH265DpbSlotInfoKHR decodeH265DpbSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR,
        .pNext = NULL,
        .pStdReferenceInfo = &stdReferenceInfo[0]
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR,
        .pNext = NULL,
        .pStdReferenceInfo = &stdReferenceInfo[1]
    },
    ...
};

VkVideoReferenceSlotInfoKHR referenceSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = &decodeH265DpbSlotInfo[0],
        ...
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = &decodeH265DpbSlotInfo[1],
        ...
    },
    ...
};

StdVideoDecodeH265PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.flags.IsReference) {
    // reconstructed picture will be used for reference picture setup and DPB slot activation
} else {
    // reconstructed picture and slot may only be used by implementations as transient resource
}

VkVideoDecodeH265PictureInfoKHR decodeH265PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceSegmentCount = ... // number of slice segments
    .pSliceSegmentOffsets = ... // array of slice segment offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH265PictureInfo,
    ...
    .referenceSlotCount = sizeof(referenceSlotInfo) / sizeof(referenceSlotInfo[0]),
    .pReferenceSlots = &referenceSlotInfo[0]
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

In the form of structures defined by the `vulkan_video_codec_h265std_decode` and `vulkan_video_codec_h265std` video std headers. Applications are responsible to parse parameter sets and slice segment header data and use the parsed data to populate the structures defined by the video std headers. It is also the application’s responsibility to maintain and manage these data structures, as needed, to be able to provide them as inputs to video decode operations where needed.

The `vulkan_video_codec_h265std` video std header was introduced to share common definitions used in both H.265/HEVC video decoding and video encoding, as the two functionalities were designed in parallel. However, as no video coding extension uses this video std header directly, only as a dependency of the video std header specific to the particular video coding operation, no separate versioning scheme was deemed necessary.

It is legal from an API usage perspective for the application to provide any values for the codec-specific input parameters (parameter sets, picture information, etc.) or video bitstream data. However, if the input data does not conform to the requirements of the H.265/HEVC video compression standard, then video decode operations may complete unsuccessfully and, in general, the outputs produced by the video decode operation will have undefined contents.

The H.265 picture parameter set syntax only includes the PPS ID (`pps_pic_parameter_set_id`) and the parent SPS ID (`pps_seq_parameter_set_id`). However, the SPS IDs are not globally unique, as multiple sequence parameter sets can have the same ID as long as they have different parent VPS IDs.

In order to be able to uniquely identify (and thus key) parameter sets, the video std header structures providing the contents of a PPS to store in a video session parameters objects, and the parameters indicating the active PPS to use in a video decode operation both include an additional `sps_video_parameter_set_id` member that is not part of the PPS syntax nor the slice segment header syntax, but enable the implementation to uniquely identify PPS entries stored and referenced in a video session parameters object.

Implementations can take advantage of having access to the offsets of individual slice segments within the video bitstream buffer range provided to the video decode operations, hence this extension requires the application provide these offsets as input.

Not as part of this extension, but future extensions can add support for that.

While the maximum possible size of all input structures for H.265 VPS and SPS entries may be quite large, in practice they are not expected to be all specified as most content will not need them. Nested arrays are usually specified through pointers to arrays in the video std headers which enable applications to only specify the elements required by the content at hand.

It is thus not recommended for applications to statically allocate for the worst case size of H.265 VPS and SPS entries. As these are out-of-band data entries anyway, applications should prefer to dynamically allocate sufficient space if atypical content may require larger input data entries.

For historical reasons, the `StdVideoH265Level` type is defined with ordinal enum constant values, which does not match the decimal encoding used by the H.265/HEVC video compression standard specification. All APIs defined by this extension and the used video std headers accept and report H.265 levels using the enum constants `STD_VIDEO_H265_LEVEL_.`, not the decimal encoding used within raw H.265/HEVC bitstreams.

As specifying a reconstructed picture DPB slot and resource is always required per the latest revision of the video extensions, additional codec syntax controls whether reference picture setup is requested and, in response, the DPB slot is activated with the reconstructed picture.

For H.265 decode, reference picture setup is requested and the DPB slot specified for the reconstructed picture is activated with the picture if and only if the `StdVideoDecodeH265PictureInfo::flags.IsReference` flag is set.

Future extensions can further extend the capabilities provided here, e.g. exposing support to decode H.265 Multiview content.
