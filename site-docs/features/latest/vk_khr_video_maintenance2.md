# VK_KHR_video_maintenance2

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_maintenance2.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [2.1. New features](#_new_features)
- [2.1._New_features](#_new_features)
- [2.2. Relaxed requirements on video session parameters objects](#_relaxed_requirements_on_video_session_parameters_objects)
- [2.2._Relaxed_requirements_on_video_session_parameters_objects](#_relaxed_requirements_on_video_session_parameters_objects)
- [2.3. Inline video session parameters](#_inline_video_session_parameters)
- [2.3._Inline_video_session_parameters](#_inline_video_session_parameters)
- [3. Examples](#_examples)
- [3.1. Reset a video decode session that uses video session parameters objects without binding one](#_reset_a_video_decode_session_that_uses_video_session_parameters_objects_without_binding_one)
- [3.1._Reset_a_video_decode_session_that_uses_video_session_parameters_objects_without_binding_one](#_reset_a_video_decode_session_that_uses_video_session_parameters_objects_without_binding_one)
- [3.2. Decode H.264 frame with inline PPS](#_decode_h_264_frame_with_inline_pps)
- [3.2._Decode_H.264_frame_with_inline_PPS](#_decode_h_264_frame_with_inline_pps)
- [4. Issues](#_issues)
- [4.1. Do we want to relax the requirements for a bound video session parameters object for video encode sessions?](#_do_we_want_to_relax_the_requirements_for_a_bound_video_session_parameters_object_for_video_encode_sessions)
- [4.1._Do_we_want_to_relax_the_requirements_for_a_bound_video_session_parameters_object_for_video_encode_sessions?](#_do_we_want_to_relax_the_requirements_for_a_bound_video_session_parameters_object_for_video_encode_sessions)
- [4.2. Do we want to support inline video session parameters in video encode sessions?](#_do_we_want_to_support_inline_video_session_parameters_in_video_encode_sessions)
- [4.2._Do_we_want_to_support_inline_video_session_parameters_in_video_encode_sessions?](#_do_we_want_to_support_inline_video_session_parameters_in_video_encode_sessions)
- [4.3. Which codec-specific parameter set is used if a matching one is available in the bound video session parameters object but the application also specifies one using the new inline parameter specification APIs?](#_which_codec_specific_parameter_set_is_used_if_a_matching_one_is_available_in_the_bound_video_session_parameters_object_but_the_application_also_specifies_one_using_the_new_inline_parameter_specification_apis)
- [4.3._Which_codec-specific_parameter_set_is_used_if_a_matching_one_is_available_in_the_bound_video_session_parameters_object_but_the_application_also_specifies_one_using_the_new_inline_parameter_specification_APIs?](#_which_codec_specific_parameter_set_is_used_if_a_matching_one_is_available_in_the_bound_video_session_parameters_object_but_the_application_also_specifies_one_using_the_new_inline_parameter_specification_apis)
- [4.4. Should we require VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR for all video encode profiles?](#_should_we_require_vk_video_encode_rate_control_mode_disabled_bit_khr_for_all_video_encode_profiles)
- [4.4._Should_we_require_VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR_for_all_video_encode_profiles?](#_should_we_require_vk_video_encode_rate_control_mode_disabled_bit_khr_for_all_video_encode_profiles)
- [5. Further Functionality](#_further_functionality)
- [5._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)

[2.1. New features](#_new_features)
[2.2. Relaxed requirements on video session parameters objects](#_relaxed_requirements_on_video_session_parameters_objects)
[2.3. Inline video session parameters](#_inline_video_session_parameters)

[3. Examples](#_examples)

[3.1. Reset a video decode session that uses video session parameters objects without binding one](#_reset_a_video_decode_session_that_uses_video_session_parameters_objects_without_binding_one)
[3.2. Decode H.264 frame with inline PPS](#_decode_h_264_frame_with_inline_pps)

[4. Issues](#_issues)

[4.1. Do we want to relax the requirements for a bound video session parameters object for video encode sessions?](#_do_we_want_to_relax_the_requirements_for_a_bound_video_session_parameters_object_for_video_encode_sessions)
[4.2. Do we want to support inline video session parameters in video encode sessions?](#_do_we_want_to_support_inline_video_session_parameters_in_video_encode_sessions)
[4.3. Which codec-specific parameter set is used if a matching one is available in the bound video session parameters object but the application also specifies one using the new inline parameter specification APIs?](#_which_codec_specific_parameter_set_is_used_if_a_matching_one_is_available_in_the_bound_video_session_parameters_object_but_the_application_also_specifies_one_using_the_new_inline_parameter_specification_apis)
[4.4. Should we require `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR` for all video encode profiles?](#_should_we_require_vk_video_encode_rate_control_mode_disabled_bit_khr_for_all_video_encode_profiles)

[5. Further Functionality](#_further_functionality)

This proposal details and addresses the issues solved by the `VK_KHR_video_maintenance2` extension.

Over time, a collection of minor features, none of which would warrant an entire extension of their own, requires the creation of a maintenance extension specific to video related functionalities in Vulkan.

The following is a list of issues considered in this proposal:

* 
Relax the requirement of having to specify a video session parameters object when calling `vkCmdBeginVideoCodingKHR` with a video decode session

* 
Allow applications to specify codec-specific parameter sets inline for each decode operation instead of having to construct video session parameters objects (this may simplify the workflow for decoder applications when the parameter sets show low chance of reuse or are received each frame at the potential cost of redundant parameter parsing by the implementation)

* 
Require support for `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR` in all applicable video encode profiles

* 
Provide additional guarantees on Video Std parameters that the encoder implementation will not override

The following features are exposed:

typedef struct VkPhysicalDeviceVideoMaintenance2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoMaintenance2;
} VkPhysicalDeviceVideoMaintenance2FeaturesKHR;

Where the `videoMaintenance2` feature indicates support for all the individual sub-features defined in this proposal.

Before this proposal, the application is required to specify a video session parameters object to bind when beginning a video coding scope with the `vkCmdBeginVideoCodingKHR` command in case the used video codec operation has codec-specific parameter sets that are sourced from these objects. This is unnecessarily restrictive, particularly when considering the new inline video session parameter specification support introduced in this extension.

Accordingly, this proposal relaxes the need for specifying a video session parameters object when calling the `vkCmdBeginVideoCodingKHR` command with a video decode session. This also enables application to record video session reset operations without the need to have to construct a placeholder video session parameters object that would not otherwise be necessary. This proposal does that by moving the valid usage requirements related to the need for a bound video session parameters object from the `vkCmdBeginVideoCodingKHR` command to the `vkCmdDecodeVideoKHR` command when the new `videoMaintenance2` feature is enabled. Those valid usage requirements are then further relaxed when all codec-specific parameter sets are specified inline, when applicable, as described later.

There are certain cases where having to record codec-specific parameter sets into video session parameters objects is unnecessary overhead/complexity for application developers. In particular, having a way to specify these codec-specific parameter sets inline to the actual video coding operations thus may be preferred in one of the following scenarios:

* 
When the codec-specific parameter set is not expected to be reused across multiple video coding commands

* 
When the codec-specific parameter sets change at a very high frequency that their reuse across multiple video coding commands is unlikely

* 
For debugging purposes

This proposal suggests the addition of new APIs that enable the application to opt in to using inline video session parameters in these cases to eliminate frequent updates and the creation of video session parameters objects.

In case of video encode sessions, however, video session parameters objects may also contain additional information beyond just the codec-specific parameter sets such as the used video encode quality level that may have an effect on parameter overrides. More importantly, in case of video encoding, the video session parameters objects are used to construct and encode the final codec-specific parameter sets to include in the bitstream so they are needed for purposes beyond just specifying the parameters as input to the actual picture encoding commands. Accordingly, this proposal only allows inline video session parameters for video decode sessions.

The application can opt in to allow the use of inline video session parameters in video decode sessions using the new `VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR` video session creation flag. This new creation flag can only be used when the `videoMaintenance2` feature is enabled.

When creating a video decode session with this new flag, the application can use one of the newly introduced codec-specific structures to specify the codec-specific parameter set(s) used by the video decode operations issued in response to a `vkCmdDecodeVideoKHR` command by including them in the `pNext` chain of the `pDecodeInfo` parameter of the command.

The proposed API allows mixing and matching codec-specific parameter sets specified inline and sourced from video session parameters objects. This may be useful when the application would like to continue to source sequence level parameters (e.g. H.264 SPS) from video session parameters object but would like to specify other parameter sets inline (e.g. H.264 PPS).

It is important to note that applications should still prefer to store and source all codec-specific parameter sets in/from video session parameters objects, as parsing the parameter sets inline can be expensive and cannot be amortized across multiple decode commands without the use of video session parameters objects.

For H.264 decode sessions created with `VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR`, the following new structure can be included in the `pNext` chain of `VkVideoDecodeInfoKHR` to specify inline video session parameters:

typedef struct VkVideoDecodeH264InlineSessionParametersInfoKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    const StdVideoH264SequenceParameterSet* pStdSPS;
    const StdVideoH264PictureParameterSet*  pStdPPS;
} VkVideoDecodeH264InlineSessionParametersInfoKHR;

When the `pStdSPS` and/or `pStdPPS` members are not `NULL`, the H.264 SPS and/or PPS, respectively, specified through the structures pointed to by them will be used by the video decode operations instead of those parameter sets being sourced from the bound video session parameters object. When both are non-`NULL`, a bound video session parameters object is not even required by the video decode command.

For H.265 decode sessions created with `VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR`, the following new structure can be included in the `pNext` chain of `VkVideoDecodeInfoKHR` to specify inline video session parameters:

typedef struct VkVideoDecodeH265InlineSessionParametersInfoKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    const StdVideoH265VideoParameterSet*    pStdVPS;
    const StdVideoH265SequenceParameterSet* pStdSPS;
    const StdVideoH265PictureParameterSet*  pStdPPS;
} VkVideoDecodeH265InlineSessionParametersInfoKHR;

When the `pStdVPS`, `pStdSPS`, and/or `pStdPPS` members are not `NULL`, the H.265 VPS, SPS, and/or PPS, respectively, specified through the structures pointed to by them will be used by the video decode operations instead of those parameter sets being sourced from the bound video session parameters object. When all three are non-`NULL`, a bound video session parameters object is not even required by the video decode command.

For AV1 decode sessions created with `VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR`, the following new structure can be included in the `pNext` chain of `VkVideoDecodeInfoKHR` to specify inline video session parameters:

typedef struct VkVideoDecodeAV1InlineSessionParametersInfoKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    const StdVideoAV1SequenceHeader*        pStdSequenceHeader;
} VkVideoDecodeAV1InlineSessionParametersInfoKHR;

When the `pStdSequenceHeader` member is not `NULL`, the AV1 sequence header specified through the structure pointed to by it will be used by the video decode operations instead of the AV1 sequence header being sourced from the bound video session parameters object. When `pStdSequenceHeader` is not `NULL`, a bound video session parameters object is not even required by the video decode command.

// Begin video coding scope with given video session but no parameters object
VkVideoBeginCodingInfoKHR beginInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_BEGIN_CODING_INFO_KHR,
    .pNext = NULL,
    .flags = 0,
    .videoSession = videoSession,
    .videoSessionParameters = VK_NULL_HANDLE, // can always be VK_NULL_HANDLE for all codecs if videoMaintenance2 is enabled
    ...
};

vkCmdBeginVideoCodingKHR(commandBuffer, &beginInfo);

// Reset video session before starting to use it for video coding operations
VkVideoCodingControlInfoKHR controlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR,
    .pNext = NULL,
    .flags = VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR
};

vkCmdControlVideoCodingKHR(commandBuffer, &controlInfo);

vkCmdEndVideoCodingKHR(commandBuffer, &endInfo);

// Create a video session with inline session parameters support
VkVideoSessionKHR videoSession = VK_NULL_HANDLE;

VkVideoSessionCreateInfoKHR createInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_CREATE_INFO_KHR,
    .pNext = NULL,
    .flags = VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR,
    ...
};

vkCreateVideoSessionKHR(device, &createInfo, NULL, &videoSession);

...

// Begin video coding scope with video session parameters object but we will only source the SPS from there
VkVideoBeginCodingInfoKHR beginInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_BEGIN_CODING_INFO_KHR,
    .pNext = NULL,
    .flags = 0,
    .videoSession = videoSession,
    .videoSessionParameters = videoSessionParameters,
    ...
};

vkCmdBeginVideoCodingKHR(commandBuffer, &beginInfo);

// We will use an inline PPS
StdVideoH264PictureParameterSet pps = { ... };

VkVideoDecodeH264InlineSessionParametersInfoKHR decodeH264ParamsInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_INFO_KHR,
    .pNext = NULL,
    .pStdSPS = NULL,    // source SPS from the bound video session parameters object
    .pStdPPS = &pps     // use inline PPS
};

VkVideoDecodeH264PictureInfoKHR decodeH264PictureInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR,
    .pNext = &decodeH264ParamsInfo,
    ...
};

VkVideoDecodeInfoKHR decodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR,
    .pNext = &decodeH264PictureInfo,
    ...
};

vkCmdDecodeVideoKHR(commandBuffer, &decodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

Not in this extension. While being able to reset or perform other control operations on video encode sessions without a bound video session parameters object could be useful/convenient, this proposal only relaxes the requirements for video decode sessions.

No. Video session parameters objects created against a video encode session contain additional information that may affect implementation parameter overrides such as the used video encode quality level and are also used to encode the codec-specific parameter sets which would make specifying inline video session parameters in video encode sessions problematic. Inline video session parameters are anyway expected to only be handy in video decoding use cases so this proposal only allows using them in video decode sessions.

The codec-specific parameter sets specified inline are used. This enables the application to override the parameter sets available in the bound video session parameters object for each command.

For all existing video encode profiles. We still want to reserve the right to not require `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR` for any future video encode profile if the mode is not applicable for the video codec.

None.
