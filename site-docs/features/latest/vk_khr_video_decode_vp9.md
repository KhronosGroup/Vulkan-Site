# VK_KHR_video_decode_vp9

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_decode_vp9.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Video Std Headers](#_video_std_headers)
- [3.1._Video_Std_Headers](#_video_std_headers)
- [3.2. VP9 Decode Profiles](#_vp9_decode_profiles)
- [3.2._VP9_Decode_Profiles](#_vp9_decode_profiles)
- [3.3. VP9 Decode Capabilities](#_vp9_decode_capabilities)
- [3.3._VP9_Decode_Capabilities](#_vp9_decode_capabilities)
- [3.4. VP9 Decoding Parameters](#_vp9_decoding_parameters)
- [3.4._VP9_Decoding_Parameters](#_vp9_decoding_parameters)
- [3.5. VP9 Reference Management](#_vp9_reference_management)
- [3.5._VP9_Reference_Management](#_vp9_reference_management)
- [4. Examples](#_examples)
- [4.1. Select queue family with VP9 decode support](#_select_queue_family_with_vp9_decode_support)
- [4.1._Select_queue_family_with_VP9_decode_support](#_select_queue_family_with_vp9_decode_support)
- [4.2. Check support and query the capabilities for an VP9 decode profile](#_check_support_and_query_the_capabilities_for_an_vp9_decode_profile)
- [4.2._Check_support_and_query_the_capabilities_for_an_VP9_decode_profile](#_check_support_and_query_the_capabilities_for_an_vp9_decode_profile)
- [4.3. Record VP9 decode operation (video session without DPB slots)](#_record_vp9_decode_operation_video_session_without_dpb_slots)
- [4.3._Record_VP9_decode_operation_(video_session_without_DPB_slots)](#_record_vp9_decode_operation_video_session_without_dpb_slots)
- [4.4. Record VP9 decode operation without reference picture list](#_record_vp9_decode_operation_without_reference_picture_list)
- [4.4._Record_VP9_decode_operation_without_reference_picture_list](#_record_vp9_decode_operation_without_reference_picture_list)
- [4.5. Record VP9 decode operation with reference picture list](#_record_vp9_decode_operation_with_reference_picture_list)
- [4.5._Record_VP9_decode_operation_with_reference_picture_list](#_record_vp9_decode_operation_with_reference_picture_list)
- [5. Issues](#_issues)
- [5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.1._In_what_form_should_codec-specific_parameters_be_provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
- [5.2. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.2._What_are_the_requirements_for_the_codec-specific_input_parameters_and_bitstream_data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
- [5.3. What type of VP9 parameter sets do we want to store in video session parameters objects?](#_what_type_of_vp9_parameter_sets_do_we_want_to_store_in_video_session_parameters_objects)
- [5.3._What_type_of_VP9_parameter_sets_do_we_want_to_store_in_video_session_parameters_objects?](#_what_type_of_vp9_parameter_sets_do_we_want_to_store_in_video_session_parameters_objects)
- [5.4. What should be the contents of the input bitstream buffer when decoding an VP9 frame?](#_what_should_be_the_contents_of_the_input_bitstream_buffer_when_decoding_an_vp9_frame)
- [5.4._What_should_be_the_contents_of_the_input_bitstream_buffer_when_decoding_an_VP9_frame?](#_what_should_be_the_contents_of_the_input_bitstream_buffer_when_decoding_an_vp9_frame)
- [5.5. Does the application need to specify the offsets of individual tiles?](#_does_the_application_need_to_specify_the_offsets_of_individual_tiles)
- [5.5._Does_the_application_need_to_specify_the_offsets_of_individual_tiles?](#_does_the_application_need_to_specify_the_offsets_of_individual_tiles)
- [5.6. Does the application also need to specify the offset of the frame header?](#_does_the_application_also_need_to_specify_the_offset_of_the_frame_header)
- [5.6._Does_the_application_also_need_to_specify_the_offset_of_the_frame_header?](#_does_the_application_also_need_to_specify_the_offset_of_the_frame_header)
- [5.7. How do VP9 references map to DPB slot indices?](#_how_do_vp9_references_map_to_dpb_slot_indices)
- [5.7._How_do_VP9_references_map_to_DPB_slot_indices?](#_how_do_vp9_references_map_to_dpb_slot_indices)
- [5.8. Does the application has to send frames that have show_existing_frame set for decoding?](#_does_the_application_has_to_send_frames_that_have_show_existing_frame_set_for_decoding)
- [5.8._Does_the_application_has_to_send_frames_that_have_show_existing_frame_set_for_decoding?](#_does_the_application_has_to_send_frames_that_have_show_existing_frame_set_for_decoding)
- [5.9. Are any of the frame_width_minus_1, frame_height_minus_1, render_width_minus_1, and render_height_minus_1 parameters from the frame header redundant with respect to the decoded frame size specified in VkVideoDecodeInfoKHR::dstPictureResource.codedExtent?](#_are_any_of_the_frame_width_minus_1_frame_height_minus_1_render_width_minus_1_and_render_height_minus_1_parameters_from_the_frame_header_redundant_with_respect_to_the_decoded_frame_size_specified_in_vkvideodecodeinfokhrdstpictureresource_codedextent)
- [5.9._Are_any_of_the_frame_width_minus_1,_frame_height_minus_1,_render_width_minus_1,_and_render_height_minus_1_parameters_from_the_frame_header_redundant_with_respect_to_the_decoded_frame_size_specified_in_VkVideoDecodeInfoKHR::dstPictureResource.codedExtent?](#_are_any_of_the_frame_width_minus_1_frame_height_minus_1_render_width_minus_1_and_render_height_minus_1_parameters_from_the_frame_header_redundant_with_respect_to_the_decoded_frame_size_specified_in_vkvideodecodeinfokhrdstpictureresource_codedextent)
- [5.10. What codec-specific parameters need to be specified for the active reference pictures?](#_what_codec_specific_parameters_need_to_be_specified_for_the_active_reference_pictures)
- [5.10._What_codec-specific_parameters_need_to_be_specified_for_the_active_reference_pictures?](#_what_codec_specific_parameters_need_to_be_specified_for_the_active_reference_pictures)
- [5.11. How is reference picture setup requested for VP9 decode operations?](#_how_is_reference_picture_setup_requested_for_vp9_decode_operations)
- [5.11._How_is_reference_picture_setup_requested_for_VP9_decode_operations?](#_how_is_reference_picture_setup_requested_for_vp9_decode_operations)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Video Std Headers](#_video_std_headers)
[3.2. VP9 Decode Profiles](#_vp9_decode_profiles)
[3.3. VP9 Decode Capabilities](#_vp9_decode_capabilities)
[3.4. VP9 Decoding Parameters](#_vp9_decoding_parameters)
[3.5. VP9 Reference Management](#_vp9_reference_management)

[4. Examples](#_examples)

[4.1. Select queue family with VP9 decode support](#_select_queue_family_with_vp9_decode_support)
[4.2. Check support and query the capabilities for an VP9 decode profile](#_check_support_and_query_the_capabilities_for_an_vp9_decode_profile)
[4.3. Record VP9 decode operation (video session without DPB slots)](#_record_vp9_decode_operation_video_session_without_dpb_slots)
[4.4. Record VP9 decode operation without reference picture list](#_record_vp9_decode_operation_without_reference_picture_list)
[4.5. Record VP9 decode operation with reference picture list](#_record_vp9_decode_operation_with_reference_picture_list)

[5. Issues](#_issues)

[5.1. In what form should codec-specific parameters be provided?](#_in_what_form_should_codec_specific_parameters_be_provided)
[5.2. What are the requirements for the codec-specific input parameters and bitstream data?](#_what_are_the_requirements_for_the_codec_specific_input_parameters_and_bitstream_data)
[5.3. What type of VP9 parameter sets do we want to store in video session parameters objects?](#_what_type_of_vp9_parameter_sets_do_we_want_to_store_in_video_session_parameters_objects)
[5.4. What should be the contents of the input bitstream buffer when decoding an VP9 frame?](#_what_should_be_the_contents_of_the_input_bitstream_buffer_when_decoding_an_vp9_frame)
[5.5. Does the application need to specify the offsets of individual tiles?](#_does_the_application_need_to_specify_the_offsets_of_individual_tiles)
[5.6. Does the application also need to specify the offset of the frame header?](#_does_the_application_also_need_to_specify_the_offset_of_the_frame_header)
[5.7. How do VP9 references map to DPB slot indices?](#_how_do_vp9_references_map_to_dpb_slot_indices)
[5.8. Does the application has to send frames that have `show_existing_frame` set for decoding?](#_does_the_application_has_to_send_frames_that_have_show_existing_frame_set_for_decoding)
[5.9. Are any of the `frame_width_minus_1`, `frame_height_minus_1`, `render_width_minus_1`, and `render_height_minus_1` parameters from the frame header redundant with respect to the decoded frame size specified in `VkVideoDecodeInfoKHR::dstPictureResource.codedExtent`?](#_are_any_of_the_frame_width_minus_1_frame_height_minus_1_render_width_minus_1_and_render_height_minus_1_parameters_from_the_frame_header_redundant_with_respect_to_the_decoded_frame_size_specified_in_vkvideodecodeinfokhrdstpictureresource_codedextent)
[5.10. What codec-specific parameters need to be specified for the active reference pictures?](#_what_codec_specific_parameters_need_to_be_specified_for_the_active_reference_pictures)
[5.11. How is reference picture setup requested for VP9 decode operations?](#_how_is_reference_picture_setup_requested_for_vp9_decode_operations)

This document outlines a proposal to enable performing VP9 video decode operations in Vulkan.

The `VK_KHR_video_queue` extension introduces support for video coding operations and the `VK_KHR_video_decode_queue` extension further extends this with APIs specific to video decoding.

The goal of this proposal is to build upon this infrastructure to introduce support for decoding elementary video stream sequences compliant with the VP9 video compression standard.

As the `VK_KHR_video_queue` and `VK_KHR_video_decode_queue` extensions already laid down the architecture for how codec-specific video decode extensions need to be designed, this extension only needs to define the APIs to provide the necessary codec-specific parameters at various points during the use of the codec-independent APIs. In particular:

* 
APIs allowing to specify VP9 information specific to the decoded picture

The following options have been considered to choose the structure of these definitions:

Allow specifying packed codec-specific data to the APIs in the form they appear in bitstreams

Specify codec-specific parameters through custom type definitions that the application can populate after parsing the corresponding data elements in the bitstreams

Option (1) would allow for a simpler API, but it requires implementations to include an appropriate parser for these data elements. As decoding applications typically parse these data elements for other reasons anyway, this proposal choses option (2) to enable the application to provide the needed parameters through custom definitions provided by a video std header dedicated to VP9 video decoding.

The following additional options have been considered to choose the way this video std header is defined:

Include all definitions in this VP9 video decode std header

Add a separate video std header that includes VP9 parameter definitions that can be shared across video decoding and video encoding use cases that the VP9 video decode std header depends on, and only include decode-specific definitions in the VP9 video decode std header

For consistency with existing codec-specific decode extensions, this extension uses option (2) and introduces the following new video std headers:

* 
`vulkan_video_codec_vp9std` - containing common definitions for all VP9 video coding operations

* 
`vulkan_video_codec_vp9std_decode` - containing definitions specific to VP9 video decoding operations

These headers can be included as follows:

#include 
#include 

This extension uses the new `vulkan_video_codec_vp9std_decode` video std header. Implementations must always support at least version 1.0.0 of this video std header.

This extension introduces the new video codec operation `VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR`. This flag can be used to check whether a particular queue family supports decoding VP9 content, as returned in `VkQueueFamilyVideoPropertiesKHR`.

A VP9 decode profile can be defined through a `VkVideoProfileInfoKHR` structure using this new video codec operation and by including the following new codec-specific profile information structure in the `pNext` chain:

typedef struct VkVideoDecodeVP9ProfileInfoKHR {
    VkStructureType           sType;
    const void*               pNext;
    StdVideoVP9Profile        stdProfile;
} VkVideoDecodeVP9ProfileInfoKHR;

`stdProfile` specifies the VP9 profile.

Applications need to include the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command to retrieve the capabilities specific to VP9 video decoding:

typedef struct VkVideoDecodeVP9CapabilitiesKHR {
    VkStructureType         sType;
    void*                   pNext;
    StdVideoVP9Level        maxLevel;
} VkVideoDecodeVP9CapabilitiesKHR;

`maxLevel` indicates the maximum supported VP9 level.

Decode parameters specific to VP9 need to be provided by the application through the `pNext` chain of `VkVideoDecodeInfoKHR`, using the following new structure:

typedef struct VkVideoDecodeVP9PictureInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    const StdVideoDecodeVP9PictureInfo* pStdPictureInfo;
    int32_t                             referenceNameSlotIndices[VK_MAX_VIDEO_VP9_REFERENCES_PER_FRAME_KHR];
    uint32_t                            uncompressedHeaderOffset;
    uint32_t                            compressedHeaderOffset;
    uint32_t                            tilesOffset;
} VkVideoDecodeVP9PictureInfoKHR;

`pStdPictureInfo` points to the codec-specific decode parameters defined in the `vulkan_video_codec_vp9std_decode` video std header (including the VP9 frame header parameters).

The `referenceNameSlotIndices` array provides a mapping from VP9 reference names to the DPB slot indices currently associated with the used reference picture resources. Multiple VP9 reference names may refer to the same DPB slot, while unused VP9 reference names are indicated by specifying a negative DPB slot index in the corresponding element of the array. As this array only provides a mapping for reference pictures used for inter-frame coding, for a given VP9 reference name `frame` (as defined in the enumeration type `StdVideoVP9ReferenceName`) the corresponding DPB slot index is specified in `referenceNameSlotIndices[frame - STD_VIDEO_VP9_REFERENCE_NAME_LAST_FRAME]`. Further details are provided about the VP9 reference management model later, in a dedicated section of this proposal.

`uncompressedHeaderOffset`, `compressedHeaderOffset`, and `tilesOffset` specify the relative offset of the uncompressed frame header, compressed frame header, and frame tile data, respectively, within the video bitstream buffer range used by the video decode operation.

VP9 decode does not need any picture information for reference pictures. Accordingly, there is no `VkVideoDecodeVP9DpbSlotInfoKHR` structure defined to enable specifying those for the active reference pictures and the optional reconstructed picture.

It is the application’s responsibility to specify video bitstream buffer data and codec-specific parameters that are compliant with the rules defined by the VP9 video compression standard. While it is not illegal, from the API usage’s point of view, to specify non-compliant inputs, they may cause the video decode operation to complete unsuccessfully and will cause the output pictures (decode output and reconstructed pictures) to have undefined contents after the execution of the operation.

For more information about how to parse individual VP9 bitstream syntax elements, calculate derived values, and, in general, how to interpret these parameters, please refer to the corresponding sections of the [VP9 Specification](https://storage.googleapis.com/downloads.webmproject.org/docs/vp9/vp9-bitstream-specification-v0.7-20170222-draft.pdf).

The VP9 video compression standard supports each frame to reference up to 3 + 1 reference pictures for sample prediction. The three "real" reference pictures are identified with so called VP9 reference names (`LAST_FRAME`, `GOLDEN_FRAME`, and `ALTREF_FRAME`) identifying different types of forward and backward references. Each VP9 reference name has associated semantics that affect how the reference picture data is used for inter-frame sample prediction. In addition, there is a special VP9 reference name called `INTRA_FRAME` that corresponds to the currently decoded frame used for intra-frame sample prediction.

The VP9 decoder model defines a set of up to 8 reference frames that maintain the reference pictures and associated metadata that can be included in the list of active reference pictures when decoding subsequent frames. The reference frame update process detailed in section 8.10 of the VP9 specifications allows associating multiple reference frame slots with the same reference picture and logically replicating the metadata associated with the activated reference picture across these reference frame slots.

In Vulkan, DPB slot management and association with video picture resources is entirely application-controlled. Accordingly, this proposal provides a direct mapping from VP9 reference names to active DPB slot indices using the `VkVideoDecodeVP9PictureInfoKHR::referenceNameSlotIndices` array, effectively bypassing the reference name to reference frame slot and the reference frame slot to resource mapping. Applications are responsible for determining this mapping based on the codec syntax element `ref_frame_idx`, and the DPB slot (and DPB picture resource) management strategy they choose.

uint32_t queueFamilyIndex;
uint32_t queueFamilyCount;

vkGetPhysicalDeviceQueueFamilyProperties2(physicalDevice, &queueFamilyCount, NULL);

VkQueueFamilyProperties2* props = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyProperties2));
VkQueueFamilyVideoPropertiesKHR* videoProps = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyVideoPropertiesKHR));

for (queueFamilyIndex = 0; queueFamilyIndex 

VkResult result;

VkVideoDecodeVP9ProfileInfoKHR decodeVP9ProfileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PROFILE_INFO_KHR,
    .pNext = NULL,
    .stdProfile = STD_VIDEO_VP9_PROFILE_0
};

VkVideoProfileInfoKHR profileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR,
    .pNext = &decodeVP9ProfileInfo,
    .videoCodecOperation = VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR,
    .chromaSubsampling = VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR,
    .lumaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR,
    .chromaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR
};

VkVideoDecodeVP9CapabilitiesKHR decodeVP9Capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_CAPABILITIES_KHR,
    .pNext = NULL,
};

VkVideoDecodeCapabilitiesKHR decodeCapabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR,
    .pNext = &decodeVP9Capabilities
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

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

StdVideoDecodeVP9PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...

VkVideoDecodeVP9PictureInfoKHR decodeVP9PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .uncompressedHeaderOffset = ... // uncompressed header offset relative to the bitstream buffer range
    .compressedHeaderOffset = ... // compressed header offset relative to the bitstream buffer range
    .tilesOffset = ... // offset of tile data relative to the bitstream buffer range
};

// As no references are used, make sure that no DPB slot indices are associated with
// the VP9 reference names
for (uint32_t i = 0; i 

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoReferenceSlotInfoKHR setupSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
    .pNext = NULL, // VP9 decode does not need any std reference information
    ...
};

StdVideoDecodeVP9PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.refresh_frame_flags != 0) {
    // reconstructed picture will activate DPB slot
} else {
    // reconstructed picture and slot may only be used by implementations as transient resource
}

VkVideoDecodeVP9PictureInfoKHR decodeVP9PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .uncompressedHeaderOffset = ... // uncompressed header offset relative to the bitstream buffer range
    .compressedHeaderOffset = ... // compressed header offset relative to the bitstream buffer range
    .tilesOffset = ... // offset of tile data relative to the bitstream buffer range
};

// As no references are used, make sure that no DPB slot indices are associated with
// the VP9 reference names
for (uint32_t i = 0; i 

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoReferenceSlotInfoKHR referenceSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = NULL, // VP9 decode does not need any std reference information
        ...
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = NULL, // VP9 decode does not need any std reference information
        ...
    },
    ...
};

StdVideoDecodeVP9PictureInfo stdPictureInfo = {};
// parse and populate picture info from frame header data
...
if (stdPictureInfo.refresh_frame_flags != 0) {
    // reconstructed picture will activate DPB slot
} else {
    // reconstructed picture and slot may only be used as transient resource by implementations
}

VkVideoDecodeVP9PictureInfoKHR decodeVP9PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PICTURE_INFO_KHR,
    .pNext = NULL,
    .pStdPictureInfo = &stdPictureInfo,
    .uncompressedHeaderOffset = ... // uncompressed header offset relative to the bitstream buffer range
    .compressedHeaderOffset = ... // compressed header offset relative to the bitstream buffer range
    .tilesOffset = ... // offset of tile data relative to the bitstream buffer range
};

// Initialize VP9 reference name to DPB slot index mapping and add mapping
// corresponding to the active reference picture list
for (uint32_t i = 0; i 

In the form of structures defined by the `vulkan_video_codec_vp9std_decode` and `vulkan_video_codec_vp9std` video std headers.

Applications are responsible to parse frame header data and use the parsed data to populate the structures defined by the video std headers. It is also the application’s responsibility to maintain and manage these data structures, as needed, to be able to provide them as inputs to video decode operations where needed.

It is legal from an API usage perspective for the application to provide any values for the codec-specific input parameters (parameter sets, picture information, etc.) or video bitstream data. However, if the input data does not conform to the requirements of the VP9 video compression standard, then video decode operations may complete unsuccessfully and, in general, the outputs produced by the video decode operation will have undefined contents.

None. VP9 does not define any parameter sets.

An entire VP9 frame, including the uncompressed and compressed headers, and the tile data corresponding to the frame.

No. VP9 does not support decoding individual tiles independently.

Yes, the offset of the uncompressed frame header, the compressed frame header, and a single offset to the start of the tile data corresponding to the frame.

VP9 associates different semantics to the various types of references referred to by a frame (`INTRA_FRAME..ALTREF_FRAME`).

The VP9 `ref_frame_idx` array provides a mapping table from the VP9 reference names `LAST_FRAME..ALTREF_FRAME` to reference frame slot numbers. These numbers are indices used to address various state vectors that each represent a reference frame slot.

While conceptually the reference frame slot model is similar to the Vulkan DPB model, it has certain behaviors that render using it directly as the Vulkan DPB impossible. In particular:

* 
The reference frame update process described in section 8.10 of the VP9 specification allows the video stream to activate multiple reference frame slots with the currently reconstructed picture through setting multiple bits in the `refresh_frame_flags` syntax element, but the Vulkan DPB model does not allow activating multiple DPB slots at once with the same video picture resource

* 
As a result, multiple VP9 reference frame slots can refer to the same reference picture resource at any given time, which is also not allowed in the Vulkan DPB model

Accordingly, the VP9 model cannot be used directly as the Vulkan DPB and, as such, the VP9 reference frame slots are not equivalent with the Vulkan DPB slot indices.

This proposal follows the same model chosen by the `VK_KHR_video_decode_av1` extension as it enables having a direct mapping from VP9 reference names to Vulkan DPB slot indices.

No. Such frames do not contain any actual payload that is relevant to implementations.

Yes. None of those parameters are necessary for decoding, as the `codedExtent` of the decode output picture provides sufficient information to implementations.

None. there is no `VkVideoDecodeVP9DpbSlotInfoKHR` structure defined to enable specifying those for the active reference pictures and the optional reconstructed picture.

As specifying a reconstructed picture DPB slot and resource is always required per the latest revision of the video extensions, additional codec syntax controls whether the DPB slot is activated with the reconstructed picture.

In the case of VP9 decode, reference picture setup depends on the value of `StdVideoDecodeVP9PictureInfo::refresh_frame_flags`. A non-zero `refresh_frame_flags` indicates that the reference frame set needs to be updated such as for each set bit the corresponding reference frame slot is associated with the decoded picture’s information. While VP9 reference frame slot management is outside of the scope of this proposal, and the responsibility of the application, a non-zero `refresh_frame_flags` value inherently also implies the need for reference picture setup and thus the activation of a DPB slot with the reconstructed picture.

Accordingly, for VP9 decode, reference picture setup is requested and the DPB slot specified for the reconstructed picture is activated with the picture if and only if `StdVideoDecodeVP9PictureInfo::refresh_frame_flags` is not zero.
