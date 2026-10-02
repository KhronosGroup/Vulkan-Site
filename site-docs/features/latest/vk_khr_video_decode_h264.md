# VK_KHR_video_decode_h264

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_decode_h264.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Video Std Headers](#_video_std_headers)
- [3.1._Video_Std_Headers](#_video_std_headers)
- [3.2. H.264 Decode Profiles](#_h_264_decode_profiles)
- [3.2._H.264_Decode_Profiles](#_h_264_decode_profiles)
- [3.3. H.264 Decode Capabilities](#_h_264_decode_capabilities)
- [3.3._H.264_Decode_Capabilities](#_h_264_decode_capabilities)
- [3.4. H.264 Decode Parameter Sets](#_h_264_decode_parameter_sets)
- [3.4._H.264_Decode_Parameter_Sets](#_h_264_decode_parameter_sets)
- [3.5. H.264 Decoding Parameters](#_h_264_decoding_parameters)
- [3.5._H.264_Decoding_Parameters](#_h_264_decoding_parameters)
- [4. Examples](#_examples)
- [4.1. Select queue family with H.264 decode support](#_select_queue_family_with_h_264_decode_support)
- [4.1._Select_queue_family_with_H.264_decode_support](#_select_queue_family_with_h_264_decode_support)
- [4.2. Check support and query the capabilities for an H.264 decode profile](#_check_support_and_query_the_capabilities_for_an_h_264_decode_profile)
- [4.2._Check_support_and_query_the_capabilities_for_an_H.264_decode_profile](#_check_support_and_query_the_capabilities_for_an_h_264_decode_profile)
- [4.3. Create and update H.264 video session parameters objects](#_create_and_update_h_264_video_session_parameters_objects)
- [4.3._Create_and_update_H.264_video_session_parameters_objects](#_create_and_update_h_264_video_session_parameters_objects)
- [4.4. Record H.264 decode operation (video session without DPB slots)](#_record_h_264_decode_operation_video_session_without_dpb_slots)
- [4.4._Record_H.264_decode_operation_(video_session_without_DPB_slots)](#_record_h_264_decode_operation_video_session_without_dpb_slots)
- [4.5. Record H.264 decode operation with optional reference picture setup](#_record_h_264_decode_operation_with_optional_reference_picture_setup)
- [4.5._Record_H.264_decode_operation_with_optional_reference_picture_setup](#_record_h_264_decode_operation_with_optional_reference_picture_setup)
- [4.6. Record H.264 decode operation with reference picture list](#_record_h_264_decode_operation_with_reference_picture_list)
- [4.6._Record_H.264_decode_operation_with_reference_picture_list](#_record_h_264_decode_operation_with_reference_picture_list)
- [5. Issues](#_issues)
- [5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.1._In_what_form_should_codec-specific_parameters_be_provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.2. Why the vulkan_video_codec_h264std video std header does not have a version number?](#_why_the_vulkan_video_codec_h264std_video_std_header_does_not_have_a_version_number)
- [5.2._Why_the_vulkan_video_codec_h264std_video_std_header_does_not_have_a_version_number?](#_why_the_vulkan_video_codec_h264std_video_std_header_does_not_have_a_version_number)
- [5.3. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.3._What_are_the_requirements_for_the_codec-specific_input_parameters_and_bitstream_data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.4. Why is there a need for the application to specify the offset of individual slices of the decoded pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slices_of_the_decoded_pictures)
- [5.4._Why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slices_of_the_decoded_pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slices_of_the_decoded_pictures)
- [5.5. Are interlaced frames supported?](#_are_interlaced_frames_supported)
- [5.5._Are_interlaced_frames_supported?](#_are_interlaced_frames_supported)
- [5.6. How are interlaced frames stored?](#_how_are_interlaced_frames_stored)
- [5.6._How_are_interlaced_frames_stored?](#_how_are_interlaced_frames_stored)
- [5.7. How should DPB images be created in case of interlaced frame support?](#_how_should_dpb_images_be_created_in_case_of_interlaced_frame_support)
- [5.7._How_should_DPB_images_be_created_in_case_of_interlaced_frame_support?](#_how_should_dpb_images_be_created_in_case_of_interlaced_frame_support)
- [5.8. How should both fields of an interlaced frame be specified as part of the active reference picture list?](#_how_should_both_fields_of_an_interlaced_frame_be_specified_as_part_of_the_active_reference_picture_list)
- [5.8._How_should_both_fields_of_an_interlaced_frame_be_specified_as_part_of_the_active_reference_picture_list?](#_how_should_both_fields_of_an_interlaced_frame_be_specified_as_part_of_the_active_reference_picture_list)
- [5.9. Is H.264 Multiview content supported?](#_is_h_264_multiview_content_supported)
- [5.9._Is_H.264_Multiview_content_supported?](#_is_h_264_multiview_content_supported)
- [5.10. Why are H.264 level indicator values specified differently than the way they are defined in the codec specification?](#_why_are_h_264_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
- [5.10._Why_are_H.264_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification?](#_why_are_h_264_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
- [5.11. How is reference picture setup requested for H.264 decode operations?](#_how_is_reference_picture_setup_requested_for_h_264_decode_operations)
- [5.11._How_is_reference_picture_setup_requested_for_H.264_decode_operations?](#_how_is_reference_picture_setup_requested_for_h_264_decode_operations)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Video Std Headers](#_video_std_headers)
[3.2. H.264 Decode Profiles](#_h_264_decode_profiles)
[3.3. H.264 Decode Capabilities](#_h_264_decode_capabilities)
[3.4. H.264 Decode Parameter Sets](#_h_264_decode_parameter_sets)
[3.5. H.264 Decoding Parameters](#_h_264_decoding_parameters)

[4. Examples](#_examples)

[4.1. Select queue family with H.264 decode support](#_select_queue_family_with_h_264_decode_support)
[4.2. Check support and query the capabilities for an H.264 decode profile](#_check_support_and_query_the_capabilities_for_an_h_264_decode_profile)
[4.3. Create and update H.264 video session parameters objects](#_create_and_update_h_264_video_session_parameters_objects)
[4.4. Record H.264 decode operation (video session without DPB slots)](#_record_h_264_decode_operation_video_session_without_dpb_slots)
[4.5. Record H.264 decode operation with optional reference picture setup](#_record_h_264_decode_operation_with_optional_reference_picture_setup)
[4.6. Record H.264 decode operation with reference picture list](#_record_h_264_decode_operation_with_reference_picture_list)

[5. Issues](#_issues)

[5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
[5.2. Why the `vulkan_video_codec_h264std` video std header does not have a version number?](#_why_the_vulkan_video_codec_h264std_video_std_header_does_not_have_a_version_number)
[5.3. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
[5.4. Why is there a need for the application to specify the offset of individual slices of the decoded pictures?](#_why_is_there_a_need_for_the_application_to_specify_the_offset_of_individual_slices_of_the_decoded_pictures)
[5.5. Are interlaced frames supported?](#_are_interlaced_frames_supported)
[5.6. How are interlaced frames stored?](#_how_are_interlaced_frames_stored)
[5.7. How should DPB images be created in case of interlaced frame support?](#_how_should_dpb_images_be_created_in_case_of_interlaced_frame_support)
[5.8. How should both fields of an interlaced frame be specified as part of the active reference picture list?](#_how_should_both_fields_of_an_interlaced_frame_be_specified_as_part_of_the_active_reference_picture_list)
[5.9. Is H.264 Multiview content supported?](#_is_h_264_multiview_content_supported)
[5.10. Why are H.264 level indicator values specified differently than the way they are defined in the codec specification?](#_why_are_h_264_level_indicator_values_specified_differently_than_the_way_they_are_defined_in_the_codec_specification)
[5.11. How is reference picture setup requested for H.264 decode operations?](#_how_is_reference_picture_setup_requested_for_h_264_decode_operations)

[6. Further Functionality](#_further_functionality)

This document outlines a proposal to enable performing H.264/AVC video decode operations in Vulkan.

The `VK_KHR_video_queue` extension introduces support for video coding operations and the `VK_KHR_video_decode_queue` extension further extends this with APIs specific to video decoding.

The goal of this proposal is to build upon this infrastructure to introduce support for decoding elementary video stream sequences compliant with the H.264/AVC video compression standard.

As the `VK_KHR_video_queue` and `VK_KHR_video_decode_queue` extensions already laid down the architecture for how codec-specific video decode extensions need to be designed, this extension only needs to define the APIs to provide the necessary codec-specific parameters at various points during the use of the codec-independent APIs. In particular:

* 
APIs allowing to specify H.264 sequence and picture parameter sets (SPS, PPS) to be stored in video session parameters objects

* 
APIs allowing to specify H.264 information specific to the decoded picture, including references to previously stored SPS and PPS entries

* 
APIs allowing to specify H.264 reference picture information specific to the active reference pictures and optional reconstructed picture used in video decode operations

The following options have been considered to choose the structure of these definitions:

Allow specifying packed codec-specific data to the APIs in the form they appear in bitstreams

Specify codec-specific parameters through custom type definitions that the application can populate after parsing the corresponding data elements in the bitstreams

Option (1) would allow for a simpler API, but it requires implementations to include an appropriate parser for these data elements. As decoding applications typically parse these data elements for other reasons anyway, this proposal choses option (2) to enable the application to provide the needed parameters through custom definitions provided by a video std header dedicated to H.264 video decoding.

The following additional options have been considered to choose the way this video std header is defined:

Include all definitions in this H.264 video decode std header

Add a separate video std header that includes H.264 parameter definitions that can be shared across video decoding and video encoding use cases that the H.264 video decode std header depends on, and only include decode-specific definitions in the H.264 video decode std header

Both options are reasonable, however, as the H.264 video decoding and H.264 video encoding functionalities were designed in parallel, this extension uses option (2) and introduces the following new video std headers:

* 
`vulkan_video_codec_h264std` - containing common definitions for all H.264 video coding operations

* 
`vulkan_video_codec_h264std_decode` - containing definitions specific to H.264 video decoding operations

These headers can be included as follows:

#include 
#include 

This extension uses the new `vulkan_video_codec_h264std_decode` video std header. Implementations must always support at least version 1.0.0 of this video std header.

This extension introduces the new video codec operation `VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR`. This flag can be used to check whether a particular queue family supports decoding H.264/AVC content, as returned in `VkQueueFamilyVideoPropertiesKHR`.

An H.264 decode profile can be defined through a `VkVideoProfileInfoKHR` structure using this new video codec operation and by including the following new codec-specific profile information structure in the `pNext` chain:

typedef struct VkVideoDecodeH264ProfileInfoKHR {
    VkStructureType                              sType;
    const void*                                  pNext;
    StdVideoH264ProfileIdc                       stdProfileIdc;
    VkVideoDecodeH264PictureLayoutFlagBitsKHR    pictureLayout;
} VkVideoDecodeH264ProfileInfoKHR;

`stdProfileIdc` specifies the H.264 profile indicator, while `pictureLayout` provides information about the representation of pictures usable with a video session created with such a video profile, and takes its value from the following new flag bit type:

typedef enum VkVideoDecodeH264PictureLayoutFlagBitsKHR {
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR = 0,
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR = 0x00000001,
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR = 0x00000002,
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_FLAG_BITS_MAX_ENUM_KHR = 0x7FFFFFFF
} VkVideoDecodeH264PictureLayoutFlagBitsKHR;

If `pictureLayout` is zero (`VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR`), then the video profile only allows producing and consuming progressive frames. Otherwise, it also supports interlaced frames, and the individual bits indicate the way individual fields of such interlaced frames are represented within the images backing the video picture resources. In particular:

* 
`VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR` indicates that the top and bottom fields are stored interleaved across the scanlines of the video picture resources, with all lines belonging to the top field being stored at even-numbered lines within the picture resource, and all lines belonging to the bottom field being stored at odd-numbered lines within the picture resource.

* 
`VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR` indicates that the top and bottom fields are stored separately, i.e. all lines belonging to a field are grouped together in a single image subregion. The two fields comprising the frame thus can be stored in separate image subregions of the same image subresource or in separate image subresources.

It is expected that most implementations will at least support the `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR` picture layout, but support for any particular interlaced picture layout is not mandatory. Applications need to verify support for individual H.264 decode profiles specifying particular picture layouts using the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command. The `VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR` error code indicates that the chosen picture layout is not supported by the implementation.

Applications need to include the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command to retrieve the capabilities specific to H.264 video decoding:

typedef struct VkVideoDecodeH264CapabilitiesKHR {
    VkStructureType         sType;
    void*                   pNext;
    StdVideoH264LevelIdc    maxLevelIdc;
    VkOffset2D              fieldOffsetGranularity;
} VkVideoDecodeH264CapabilitiesKHR;

`maxLevelIdc` indicates the maximum supported H.264 level indicator, while `fieldOffsetGranularity` indicates the alignment requirements of the `codedOffset` values specified for video picture resources when using the `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR` picture layout.

The use of video session parameters objects is mandatory when decoding H.264 video streams. Applications need to include the following new structure in the `pNext` chain of `VkVideoSessionParametersCreateInfoKHR` when creating video session parameters objects for H.264 decode use, to specify the parameter set capacity of the created objects:

typedef struct VkVideoDecodeH264SessionParametersCreateInfoKHR {
    VkStructureType                                        sType;
    const void*                                            pNext;
    uint32_t                                               maxStdSPSCount;
    uint32_t                                               maxStdPPSCount;
    const VkVideoDecodeH264SessionParametersAddInfoKHR*    pParametersAddInfo;
} VkVideoDecodeH264SessionParametersCreateInfoKHR;

The optional `pParametersAddInfo` member also allows specifying an initial set of parameter sets to add to the created object:

typedef struct VkVideoDecodeH264SessionParametersAddInfoKHR {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   stdSPSCount;
    const StdVideoH264SequenceParameterSet*    pStdSPSs;
    uint32_t                                   stdPPSCount;
    const StdVideoH264PictureParameterSet*     pStdPPSs;
} VkVideoDecodeH264SessionParametersAddInfoKHR;

This structure can also be included in the `pNext` chain of `VkVideoSessionParametersUpdateInfoKHR` used in video session parameters update operations to add further parameter sets to an object after its creation.

Individual parameter sets are stored using parameter set IDs as their keys, specifically:

* 
H.264 SPS entries are identified using a `seq_parameter_set_id` value

* 
H.264 PPS entries are identified using a pair of `seq_parameter_set_id` and `pic_parameter_set_id` values

The H.264/AVC video compression standard always requires an SPS and PPS, hence the application has to add an instance of each parameter set to the used parameters object before being able to record video decode operations.

Furthermore, the H.264/AVC video compression standard also allows modifying existing parameter sets, but as parameters already stored in video session parameters objects cannot be changed in Vulkan, the application has to create new parameters objects in such cases, as described in the proposal for `VK_KHR_video_queue`.

Decode parameters specific to H.264 need to be provided by the application through the `pNext` chain of `VkVideoDecodeInfoKHR`, using the following new structure:

typedef struct VkVideoDecodeH264PictureInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    const StdVideoDecodeH264PictureInfo*    pStdPictureInfo;
    uint32_t                                sliceCount;
    const uint32_t*                         pSliceOffsets;
} VkVideoDecodeH264PictureInfoKHR;

`pStdPictureInfo` points to the codec-specific decode parameters defined in the `vulkan_video_codec_h264std_decode` video std header, while the `pSliceOffsets` array contains the relative offset of individual slices of the picture within the video bitstream range used by the video decode operation.

Specific flags within the codec-specific decode parameters are used to determine whether the picture to be decoded is a frame or a field, according to the table below:

| **field_pic_flag** | **bottom_field_flag** | **frame / field** |
| --- | --- | --- |
| 0 | *ignored* | frame |
| 1 | 0 | top field |
| 1 | 1 | bottom field |

The active SPS and PPS (sourced from the bound video session parameters object) are identified by the `seq_parameter_set_id` and `pic_parameter_set_id` parameters.

Picture information specific to H.264 for the active reference pictures and the optional reconstructed picture need to be provided by the application through the `pNext` chain of corresponding elements of `VkVideoDecodeInfoKHR::pReferenceSlots` and the `pNext` chain of `VkVideoDecodeInfoKHR::pSetupReferenceSlot`, respectively, using the following new structure:

typedef struct VkVideoDecodeH264DpbSlotInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    const StdVideoDecodeH264ReferenceInfo*    pStdReferenceInfo;
} VkVideoDecodeH264DpbSlotInfoKHR;

`pStdReferenceInfo` points to the codec-specific reference picture parameters defined in the `vulkan_video_codec_h264std_decode` video std header.

Specific flags within the codec-specific reference picture parameters are used to determined whether the picture is a frame or a field, according to the table below:

| **top_field_flag** | **bottom_field_flag** | **frame / field** |
| --- | --- | --- |
| 0 | 0 | frame |
| 1 | 0 | top field |
| 0 | 1 | bottom field |
| 1 | 1 | both fields (for active reference pictures only) |

The ability to specify both fields is specific to the list of active reference pictures provided in `VkVideoDecodeInfo::pReferenceSlots` and is needed to allow the application to use both fields of an interlaced frame when the two fields are stored in the same video picture resource, which happens when using the `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR` picture layout. As a consequence, the value of `VkVideoDecodeInfo::referenceSlotCount` is not always indicative of the total number of active reference pictures used by a video decode operation, as a single element of `pReferenceSlots` may refer to two reference pictures in this case.

It is the application’s responsibility to specify video bitstream buffer data and codec-specific parameters that are compliant with the rules defined by the H.264/AVC video compression standard. While it is not illegal, from the API usage’s point of view, to specify non-compliant inputs, they may cause the video decode operation to complete unsuccessfully and will cause the output pictures (decode output and reconstructed pictures) to have undefined contents after the execution of the operation.

For more information about how to parse individual H.264 bitstream syntax elements, calculate derived values, and, in general, how to interpret these parameters, please refer to the corresponding sections of the [ITU-T H.264 Specification](https://www.itu.int/rec/T-REC-H.264-202108-I/).

uint32_t queueFamilyIndex;
uint32_t queueFamilyCount;

vkGetPhysicalDeviceQueueFamilyProperties2(physicalDevice, &queueFamilyCount, NULL);

VkQueueFamilyProperties2* props = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyProperties2));
VkQueueFamilyVideoPropertiesKHR* videoProps = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyVideoPropertiesKHR));

for (queueFamilyIndex = 0; queueFamilyIndex 

VkResult result;

VkVideoDecodeH264ProfileInfoKHR decodeH264ProfileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PROFILE_INFO_KHR,
    .pNext = NULL,
    .stdProfileIdc = STD_VIDEO_H264_PROFILE_IDC_BASELINE,
    .pictureLayout = VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR
};

VkVideoProfileInfoKHR profileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR,
    .pNext = &decodeH264ProfileInfo,
    .videoCodecOperation = VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR,
    .chromaSubsampling = VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR,
    .lumaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR,
    .chromaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR
};

VkVideoDecodeH264CapabilitiesKHR decodeH264Capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_CAPABILITIES_KHR,
    .pNext = NULL,
};

VkVideoDecodeCapabilitiesKHR decodeCapabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR,
    .pNext = &decodeH264Capabilities
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

VkVideoDecodeH264SessionParametersCreateInfoKHR decodeH264CreateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = NULL,
    .maxStdSPSCount = ... // SPS capacity
    .maxStdPPSCount = ... // PPS capacity
    .pParametersAddInfo = ... // parameters to add at creation time or NULL
};

VkVideoSessionParametersCreateInfoKHR createInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = &decodeH264CreateInfo,
    .flags = 0,
    .videoSessionParametersTemplate = ... // template to use or VK_NULL_HANDLE
    .videoSession = videoSession
};

vkCreateVideoSessionParametersKHR(device, &createInfo, NULL, &videoSessionParams);

...

StdVideoH264SequenceParameterSet sps = {};
// parse and populate SPS parameters
...

StdVideoH264PictureParameterSet pps = {};
// parse and populate PPS parameters
...

VkVideoDecodeH264SessionParametersAddInfoKHR decodeH264AddInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR,
    .pNext = NULL,
    .stdSPSCount = 1,
    .pStdSPSs = &sps,
    .stdPPSCount = 1,
    .pStdPPSs = &pps
};

VkVideoSessionParametersUpdateInfoKHR updateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_UPDATE_INFO_KHR,
    .pNext = &decodeH264AddInfo,
    .updateSequenceCount = 1 // incremented for each subsequent update
};

vkUpdateVideoSessionParametersKHR(device, &videoSessionParams, &updateInfo);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH264PictureInfo stdPictureInfo = {};
// parse and populate picture info from slice header data
...

VkVideoDecodeH264PictureInfoKHR decodeH264PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceCount = ... // number of slices
    .pSliceOffsets = ... // array of slice offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH264PictureInfo,
    ...
    // reconstructed picture is not needed if video session was created without DPB slots
    .pSetupReferenceSlot = NULL,
    .referenceSlotCount = 0,
    .pReferenceSlots = NULL
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH264ReferenceInfo stdReferenceInfo = {};
// parse and populate reconstructed reference picture info from slice header data
...

VkVideoDecodeH264DpbSlotInfoKHR decodeH264DpbSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_DPB_SLOT_INFO_KHR,
    .pNext = NULL,
    .pStdReferenceInfo = &stdReferenceInfo
};

VkVideoReferenceSlotInfoKHR setupSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
    .pNext = &decodeH264DpbSlotInfo
    ...
};

StdVideoDecodeH264PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.flags.is_reference) {
    // reconstructed picture will be used for reference picture setup and DPB slot activation
} else {
    // reconstructed picture and slot may only be used by implementations as transient resource
}

VkVideoDecodeH264PictureInfoKHR decodeH264PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceCount = ... // number of slices
    .pSliceOffsets = ... // array of slice offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH264PictureInfo,
    ...
    .pSetupReferenceSlot = &setupSlotInfo,
    ...
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeH264ReferenceInfo stdReferenceInfo[] = {};
// populate reference picture info for each active reference picture
...

VkVideoDecodeH264DpbSlotInfoKHR decodeH264DpbSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_DPB_SLOT_INFO_KHR,
        .pNext = NULL,
        .pStdReferenceInfo = &stdReferenceInfo[0]
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_DPB_SLOT_INFO_KHR,
        .pNext = NULL,
        .pStdReferenceInfo = &stdReferenceInfo[1]
    },
    ...
};

VkVideoReferenceSlotInfoKHR referenceSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = &decodeH264DpbSlotInfo[0],
        ...
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = &decodeH264DpbSlotInfo[1],
        ...
    },
    ...
};

StdVideoDecodeH264PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.flags.is_reference) {
    // reconstructed picture will be used for reference picture setup and DPB slot activation
} else {
    // reconstructed picture and slot may only be used by implementations as transient resource
}

VkVideoDecodeH264PictureInfoKHR decodeH264PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .sliceCount = ... // number of slices
    .pSliceOffsets = ... // array of slice offsets relative to the bitstream buffer range
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH264PictureInfo,
    ...
    .referenceSlotCount = sizeof(referenceSlotInfo) / sizeof(referenceSlotInfo[0]),
    .pReferenceSlots = &referenceSlotInfo[0]
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

In the form of structures defined by the `vulkan_video_codec_h264std_decode` and `vulkan_video_codec_h264std` video std headers. Applications are responsible to parse parameter sets and slice header data and use the parsed data to populate the structures defined by the video std headers. It is also the application’s responsibility to maintain and manage these data structures, as needed, to be able to provide them as inputs to video decode operations where needed.

The `vulkan_video_codec_h264std` video std header was introduced to share common definitions used in both H.264/AVC video decoding and video encoding, as the two functionalities were designed in parallel. However, as no video coding extension uses this video std header directly, only as a dependency of the video std header specific to the particular video coding operation, no separate versioning scheme was deemed necessary.

It is legal from an API usage perspective for the application to provide any values for the codec-specific input parameters (parameter sets, picture information, etc.) or video bitstream data. However, if the input data does not conform to the requirements of the H.264/AVC video compression standard, then video decode operations may complete unsuccessfully and, in general, the outputs produced by the video decode operation will have undefined contents.

Implementations can take advantage of having access to the offsets of individual slices within the video bitstream buffer range provided to the video decode operations, hence this extension requires the application provide these offsets as input.

Yes, through specifying an interlaced picture layout in the H.264 decode profile.

Video sessions created with an interlaced picture layout can be used to decode field pictures, as well as progressive frame pictures. This also enables support for decoding PAFF and MBAFF content.

Depending on the used picture layout, interlaced frames may be stored *interleaved* by storing both the top and bottom fields in even and odd scanlines of a single video picture resource, respectively, or in *separate planes*. In the latter case the two fields comprising an interlaced frame may be stored in different subregions of a single image array layer, in separate image array layers, or in entirely separate images.

Typically, interlaced frames are stored with one frame in each image array layer, hence the total number of layers across the DPB image(s) usually still matches the DPB slot capacity. The only exception is when the `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR` picture layout is used and the application wants to store individual fields in separate image array layers, in which case the total number of layers across the DPB image(s) may need to be twice as large as the DPB slot capacity.

The way how both fields of an interlaced frame can be included in the list of active reference pictures differs depending on the used picture layout.

If `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR` is used, then both fields of an interlaced frame are stored in the same video picture resource, hence the application has to refer to both fields using a single `VkVideoReferenceSlotInfoKHR` structure with `StdVideoDecodeH264ReferenceInfo` having both `top_field_flag` and `bottom_field_flag` set to `1`.

If `VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR` is used, then each field is stored in a separate video picture resource (even if backed by the same image array layer), hence the application has to refer to each field using a separate `VkVideoReferenceSlotInfoKHR` structure with `StdVideoDecodeH264ReferenceInfo` setting only the field flag corresponding to the field picture in question.

Not as part of this extension, but future extensions can add support for that. While the provisional `VK_EXT_video_decode_h264` this extension was promoted from did include support for H.264 MVC, the corresponding APIs were not considered to be mature enough to be included in this extension.

For historical reasons, the `StdVideoH264Level` type is defined with ordinal enum constant values, which does not match the decimal encoding used by the H.264/AVC video compression standard specification. All APIs defined by this extension and the used video std headers accept and report H.264 levels using the enum constants `STD_VIDEO_H264_LEVEL_.`, not the decimal encoding used within raw H.264/AVC bitstreams.

As specifying a reconstructed picture DPB slot and resource is always required per the latest revision of the video extensions, additional codec syntax controls whether reference picture setup is requested and, in response, the DPB slot is activated with the reconstructed picture.

For H.264 decode, reference picture setup is requested and the DPB slot specified for the reconstructed picture is activated with the picture if and only if the `StdVideoDecodeH264PictureInfo::flags.is_reference` flag is set.

Future extensions can further extend the capabilities provided here, e.g. exposing support to decode H.264 Multiview content.
