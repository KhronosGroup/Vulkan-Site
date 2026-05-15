# VK_KHR_video_encode_queue

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_encode_queue.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Video Encode Queues](#_video_encode_queues)
- [3.1._Video_Encode_Queues](#_video_encode_queues)
- [3.2. Video Encode Profiles](#_video_encode_profiles)
- [3.2._Video_Encode_Profiles](#_video_encode_profiles)
- [3.3. New Pipeline Stage and Access Flags](#_new_pipeline_stage_and_access_flags)
- [3.3._New_Pipeline_Stage_and_Access_Flags](#_new_pipeline_stage_and_access_flags)
- [3.4. New Buffer and Image Usage Flags](#_new_buffer_and_image_usage_flags)
- [3.4._New_Buffer_and_Image_Usage_Flags](#_new_buffer_and_image_usage_flags)
- [3.5. New Format Feature Flags](#_new_format_feature_flags)
- [3.5._New_Format_Feature_Flags](#_new_format_feature_flags)
- [3.6. Basic Operation](#_basic_operation)
- [3.6._Basic_Operation](#_basic_operation)
- [3.7. Encode Input Picture](#_encode_input_picture)
- [3.7._Encode_Input_Picture](#_encode_input_picture)
- [3.8. Reconstructed Picture](#_reconstructed_picture)
- [3.8._Reconstructed_Picture](#_reconstructed_picture)
- [3.9. Reference Pictures](#_reference_pictures)
- [3.9._Reference_Pictures](#_reference_pictures)
- [3.10. Video Encode Parameter Overrides](#_video_encode_parameter_overrides)
- [3.10._Video_Encode_Parameter_Overrides](#_video_encode_parameter_overrides)
- [3.11. Capabilities](#_capabilities)
- [3.12. Video Encode Quality Levels](#_video_encode_quality_levels)
- [3.12._Video_Encode_Quality_Levels](#_video_encode_quality_levels)
- [3.13. Video Encode Feedback Queries](#_video_encode_feedback_queries)
- [3.13._Video_Encode_Feedback_Queries](#_video_encode_feedback_queries)
- [3.14. Video Encode Rate Control](#_video_encode_rate_control)
- [3.14._Video_Encode_Rate_Control](#_video_encode_rate_control)
- [3.15. Usage Summary](#_usage_summary)
- [3.15._Usage_Summary](#_usage_summary)
- [4. Examples](#_examples)
- [4.1. Select queue family with video encode support for a given video codec operation](#_select_queue_family_with_video_encode_support_for_a_given_video_codec_operation)
- [4.1._Select_queue_family_with_video_encode_support_for_a_given_video_codec_operation](#_select_queue_family_with_video_encode_support_for_a_given_video_codec_operation)
- [4.2. Check support and query the capabilities for a video encode profile](#_check_support_and_query_the_capabilities_for_a_video_encode_profile)
- [4.2._Check_support_and_query_the_capabilities_for_a_video_encode_profile](#_check_support_and_query_the_capabilities_for_a_video_encode_profile)
- [4.3. Select encode input and DPB formats supported by the video encode profile](#_select_encode_input_and_dpb_formats_supported_by_the_video_encode_profile)
- [4.3._Select_encode_input_and_DPB_formats_supported_by_the_video_encode_profile](#_select_encode_input_and_dpb_formats_supported_by_the_video_encode_profile)
- [4.4. Create bitstream buffer](#_create_bitstream_buffer)
- [4.4._Create_bitstream_buffer](#_create_bitstream_buffer)
- [4.5. Create encode input image and image view](#_create_encode_input_image_and_image_view)
- [4.5._Create_encode_input_image_and_image_view](#_create_encode_input_image_and_image_view)
- [4.6. Create DPB image and image view](#_create_dpb_image_and_image_view)
- [4.6._Create_DPB_image_and_image_view](#_create_dpb_image_and_image_view)
- [4.7. Create and use video encode feedback query pool with a video session](#_create_and_use_video_encode_feedback_query_pool_with_a_video_session)
- [4.7._Create_and_use_video_encode_feedback_query_pool_with_a_video_session](#_create_and_use_video_encode_feedback_query_pool_with_a_video_session)
- [4.8. Record encode operation (video session without DPB slots)](#_record_encode_operation_video_session_without_dpb_slots)
- [4.8._Record_encode_operation_(video_session_without_DPB_slots)](#_record_encode_operation_video_session_without_dpb_slots)
- [4.9. Record encode operation with reconstructed picture information](#_record_encode_operation_with_reconstructed_picture_information)
- [4.9._Record_encode_operation_with_reconstructed_picture_information](#_record_encode_operation_with_reconstructed_picture_information)
- [4.10. Record encode operation with reference picture list](#_record_encode_operation_with_reference_picture_list)
- [4.10._Record_encode_operation_with_reference_picture_list](#_record_encode_operation_with_reference_picture_list)
- [4.11. Encode codec-specific parameters stored in video session parameters objects](#_encode_codec_specific_parameters_stored_in_video_session_parameters_objects)
- [4.11._Encode_codec-specific_parameters_stored_in_video_session_parameters_objects](#_encode_codec_specific_parameters_stored_in_video_session_parameters_objects)
- [4.12. Change the rate control configuration of a video encode session](#_change_the_rate_control_configuration_of_a_video_encode_session)
- [4.12._Change_the_rate_control_configuration_of_a_video_encode_session](#_change_the_rate_control_configuration_of_a_video_encode_session)
- [4.13. Change the video encode quality level used by a video encode session](#_change_the_video_encode_quality_level_used_by_a_video_encode_session)
- [4.13._Change_the_video_encode_quality_level_used_by_a_video_encode_session](#_change_the_video_encode_quality_level_used_by_a_video_encode_session)
- [4.14. Initialize a video encode session with a specific quality level and corresponding recommended rate control settings](#_initialize_a_video_encode_session_with_a_specific_quality_level_and_corresponding_recommended_rate_control_settings)
- [4.14._Initialize_a_video_encode_session_with_a_specific_quality_level_and_corresponding_recommended_rate_control_settings](#_initialize_a_video_encode_session_with_a_specific_quality_level_and_corresponding_recommended_rate_control_settings)
- [5. Issues](#_issues)
- [5.1. Why is there no VK_PIPELINE_STAGE_VIDEO_ENCODE_BIT_KHR?](#_why_is_there_no_vk_pipeline_stage_video_encode_bit_khr)
- [5.1._Why_is_there_no_VK_PIPELINE_STAGE_VIDEO_ENCODE_BIT_KHR?](#_why_is_there_no_vk_pipeline_stage_video_encode_bit_khr)
- [5.2. How can layered codec-specific encode extensions enable applications to provide the necessary codec-specific picture information, parameter sets, etc. that may be needed to perform the video coding operations?](#_how_can_layered_codec_specific_encode_extensions_enable_applications_to_provide_the_necessary_codec_specific_picture_information_parameter_sets_etc_that_may_be_needed_to_perform_the_video_coding_operations)
- [5.2._How_can_layered_codec-specific_encode_extensions_enable_applications_to_provide_the_necessary_codec-specific_picture_information,_parameter_sets,_etc._that_may_be_needed_to_perform_the_video_coding_operations?](#_how_can_layered_codec_specific_encode_extensions_enable_applications_to_provide_the_necessary_codec_specific_picture_information_parameter_sets_etc_that_may_be_needed_to_perform_the_video_coding_operations)
- [5.3. Can vkCmdVideoEncodeKHR only encode frames? What about field encoding, slice encoding, etc.?](#_can_vkcmdvideoencodekhr_only_encode_frames_what_about_field_encoding_slice_encoding_etc)
- [5.3._Can_vkCmdVideoEncodeKHR_only_encode_frames?_What_about_field_encoding,_slice_encoding,_etc.?](#_can_vkcmdvideoencodekhr_only_encode_frames_what_about_field_encoding_slice_encoding_etc)
- [5.4. What is the effect of the flags provided in VkVideoEncodeUsageInfoKHR::videoUsageHints and VkVideoEncodeUsageInfoKHR::videoContentHints?](#_what_is_the_effect_of_the_flags_provided_in_vkvideoencodeusageinfokhrvideousagehints_and_vkvideoencodeusageinfokhrvideocontenthints)
- [5.4._What_is_the_effect_of_the_flags_provided_in_VkVideoEncodeUsageInfoKHR::videoUsageHints_and_VkVideoEncodeUsageInfoKHR::videoContentHints?](#_what_is_the_effect_of_the_flags_provided_in_vkvideoencodeusageinfokhrvideousagehints_and_vkvideoencodeusageinfokhrvideocontenthints)
- [5.5. What is the effect of the tuning mode provided in VkVideoEncodeUsageInfoKHR::tuningMode?](#_what_is_the_effect_of_the_tuning_mode_provided_in_vkvideoencodeusageinfokhrtuningmode)
- [5.5._What_is_the_effect_of_the_tuning_mode_provided_in_VkVideoEncodeUsageInfoKHR::tuningMode?](#_what_is_the_effect_of_the_tuning_mode_provided_in_vkvideoencodeusageinfokhrtuningmode)
- [5.6. How should we expose video encoding feedback values (e.g. encoded bitstream size)?](#_how_should_we_expose_video_encoding_feedback_values_e_g_encoded_bitstream_size)
- [5.6._How_should_we_expose_video_encoding_feedback_values_(e.g._encoded_bitstream_size)?](#_how_should_we_expose_video_encoding_feedback_values_e_g_encoded_bitstream_size)
- [5.7. Do result status queries need to be used in conjunction with video encode feedback queries?](#_do_result_status_queries_need_to_be_used_in_conjunction_with_video_encode_feedback_queries)
- [5.7._Do_result_status_queries_need_to_be_used_in_conjunction_with_video_encode_feedback_queries?](#_do_result_status_queries_need_to_be_used_in_conjunction_with_video_encode_feedback_queries)
- [5.8. Why is there a need to allow implementations to override codec-specific parameters?](#_why_is_there_a_need_to_allow_implementations_to_override_codec_specific_parameters)
- [5.8._Why_is_there_a_need_to_allow_implementations_to_override_codec-specific_parameters?](#_why_is_there_a_need_to_allow_implementations_to_override_codec_specific_parameters)
- [5.9. Can the application disable all implementation overrides?](#_can_the_application_disable_all_implementation_overrides)
- [5.9._Can_the_application_disable_all_implementation_overrides?](#_can_the_application_disable_all_implementation_overrides)
- [5.10. Can implementations override any codec-specific parameter?](#_can_implementations_override_any_codec_specific_parameter)
- [5.10._Can_implementations_override_any_codec-specific_parameter?](#_can_implementations_override_any_codec_specific_parameter)
- [5.11. Do all implementations have to implement the same rate control algorithms corresponding to the rate control modes defined by this proposal?](#_do_all_implementations_have_to_implement_the_same_rate_control_algorithms_corresponding_to_the_rate_control_modes_defined_by_this_proposal)
- [5.11._Do_all_implementations_have_to_implement_the_same_rate_control_algorithms_corresponding_to_the_rate_control_modes_defined_by_this_proposal?](#_do_all_implementations_have_to_implement_the_same_rate_control_algorithms_corresponding_to_the_rate_control_modes_defined_by_this_proposal)
- [5.12. Do rate control implementations guarantee to respect the average/max bitrates, or frame sizes configured for the video session?](#_do_rate_control_implementations_guarantee_to_respect_the_averagemax_bitrates_or_frame_sizes_configured_for_the_video_session)
- [5.12._Do_rate_control_implementations_guarantee_to_respect_the_average/max_bitrates,_or_frame_sizes_configured_for_the_video_session?](#_do_rate_control_implementations_guarantee_to_respect_the_averagemax_bitrates_or_frame_sizes_configured_for_the_video_session)
- [5.13. Are video session parameters objects dependent on the used video encode quality level?](#_are_video_session_parameters_objects_dependent_on_the_used_video_encode_quality_level)
- [5.13._Are_video_session_parameters_objects_dependent_on_the_used_video_encode_quality_level?](#_are_video_session_parameters_objects_dependent_on_the_used_video_encode_quality_level)
- [5.14. Are video encode quality levels and rate control mutually exclusive?](#_are_video_encode_quality_levels_and_rate_control_mutually_exclusive)
- [5.14._Are_video_encode_quality_levels_and_rate_control_mutually_exclusive?](#_are_video_encode_quality_levels_and_rate_control_mutually_exclusive)
- [5.15. Does specifying VkVideoEncodeRateControlInfoKHR in the pNext chain of the pBeginCodingInfo parameter of vkCmdBeginVideoCodingKHR change the current rate control configuration?](#_does_specifying_vkvideoencoderatecontrolinfokhr_in_the_pnext_chain_of_the_pbegincodinginfo_parameter_of_vkcmdbeginvideocodingkhr_change_the_current_rate_control_configuration)
- [5.15._Does_specifying_VkVideoEncodeRateControlInfoKHR_in_the_pNext_chain_of_the_pBeginCodingInfo_parameter_of_vkCmdBeginVideoCodingKHR_change_the_current_rate_control_configuration?](#_does_specifying_vkvideoencoderatecontrolinfokhr_in_the_pnext_chain_of_the_pbegincodinginfo_parameter_of_vkcmdbeginvideocodingkhr_change_the_current_rate_control_configuration)
- [5.16. When is it mandatory to specify reconstructed picture information in VkVideoEncodeInfoKHR::pSetupReferenceSlot?](#_when_is_it_mandatory_to_specify_reconstructed_picture_information_in_vkvideoencodeinfokhrpsetupreferenceslot)
- [5.16._When_is_it_mandatory_to_specify_reconstructed_picture_information_in_VkVideoEncodeInfoKHR::pSetupReferenceSlot?](#_when_is_it_mandatory_to_specify_reconstructed_picture_information_in_vkvideoencodeinfokhrpsetupreferenceslot)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Video Encode Queues](#_video_encode_queues)
[3.2. Video Encode Profiles](#_video_encode_profiles)
[3.3. New Pipeline Stage and Access Flags](#_new_pipeline_stage_and_access_flags)
[3.4. New Buffer and Image Usage Flags](#_new_buffer_and_image_usage_flags)
[3.5. New Format Feature Flags](#_new_format_feature_flags)
[3.6. Basic Operation](#_basic_operation)
[3.7. Encode Input Picture](#_encode_input_picture)
[3.8. Reconstructed Picture](#_reconstructed_picture)
[3.9. Reference Pictures](#_reference_pictures)
[3.10. Video Encode Parameter Overrides](#_video_encode_parameter_overrides)
[3.11. Capabilities](#_capabilities)
[3.12. Video Encode Quality Levels](#_video_encode_quality_levels)
[3.13. Video Encode Feedback Queries](#_video_encode_feedback_queries)
[3.14. Video Encode Rate Control](#_video_encode_rate_control)
[3.15. Usage Summary](#_usage_summary)

[4. Examples](#_examples)

[4.1. Select queue family with video encode support for a given video codec operation](#_select_queue_family_with_video_encode_support_for_a_given_video_codec_operation)
[4.2. Check support and query the capabilities for a video encode profile](#_check_support_and_query_the_capabilities_for_a_video_encode_profile)
[4.3. Select encode input and DPB formats supported by the video encode profile](#_select_encode_input_and_dpb_formats_supported_by_the_video_encode_profile)
[4.4. Create bitstream buffer](#_create_bitstream_buffer)
[4.5. Create encode input image and image view](#_create_encode_input_image_and_image_view)
[4.6. Create DPB image and image view](#_create_dpb_image_and_image_view)
[4.7. Create and use video encode feedback query pool with a video session](#_create_and_use_video_encode_feedback_query_pool_with_a_video_session)
[4.8. Record encode operation (video session without DPB slots)](#_record_encode_operation_video_session_without_dpb_slots)
[4.9. Record encode operation with reconstructed picture information](#_record_encode_operation_with_reconstructed_picture_information)
[4.10. Record encode operation with reference picture list](#_record_encode_operation_with_reference_picture_list)
[4.11. Encode codec-specific parameters stored in video session parameters objects](#_encode_codec_specific_parameters_stored_in_video_session_parameters_objects)
[4.12. Change the rate control configuration of a video encode session](#_change_the_rate_control_configuration_of_a_video_encode_session)
[4.13. Change the video encode quality level used by a video encode session](#_change_the_video_encode_quality_level_used_by_a_video_encode_session)
[4.14. Initialize a video encode session with a specific quality level and corresponding recommended rate control settings](#_initialize_a_video_encode_session_with_a_specific_quality_level_and_corresponding_recommended_rate_control_settings)

[5. Issues](#_issues)

[5.1. Why is there no `VK_PIPELINE_STAGE_VIDEO_ENCODE_BIT_KHR`?](#_why_is_there_no_vk_pipeline_stage_video_encode_bit_khr)
[5.2. How can layered codec-specific encode extensions enable applications to provide the necessary codec-specific picture information, parameter sets, etc. that may be needed to perform the video coding operations?](#_how_can_layered_codec_specific_encode_extensions_enable_applications_to_provide_the_necessary_codec_specific_picture_information_parameter_sets_etc_that_may_be_needed_to_perform_the_video_coding_operations)
[5.3. Can `vkCmdVideoEncodeKHR` only encode frames? What about field encoding, slice encoding, etc.?](#_can_vkcmdvideoencodekhr_only_encode_frames_what_about_field_encoding_slice_encoding_etc)
[5.4. What is the effect of the flags provided in `VkVideoEncodeUsageInfoKHR::videoUsageHints` and `VkVideoEncodeUsageInfoKHR::videoContentHints`?](#_what_is_the_effect_of_the_flags_provided_in_vkvideoencodeusageinfokhrvideousagehints_and_vkvideoencodeusageinfokhrvideocontenthints)
[5.5. What is the effect of the tuning mode provided in `VkVideoEncodeUsageInfoKHR::tuningMode`?](#_what_is_the_effect_of_the_tuning_mode_provided_in_vkvideoencodeusageinfokhrtuningmode)
[5.6. How should we expose video encoding feedback values (e.g. encoded bitstream size)?](#_how_should_we_expose_video_encoding_feedback_values_e_g_encoded_bitstream_size)
[5.7. Do result status queries need to be used in conjunction with video encode feedback queries?](#_do_result_status_queries_need_to_be_used_in_conjunction_with_video_encode_feedback_queries)
[5.8. Why is there a need to allow implementations to override codec-specific parameters?](#_why_is_there_a_need_to_allow_implementations_to_override_codec_specific_parameters)
[5.9. Can the application disable all implementation overrides?](#_can_the_application_disable_all_implementation_overrides)
[5.10. Can implementations override any codec-specific parameter?](#_can_implementations_override_any_codec_specific_parameter)
[5.11. Do all implementations have to implement the same rate control algorithms corresponding to the rate control modes defined by this proposal?](#_do_all_implementations_have_to_implement_the_same_rate_control_algorithms_corresponding_to_the_rate_control_modes_defined_by_this_proposal)
[5.12. Do rate control implementations guarantee to respect the average/max bitrates, or frame sizes configured for the video session?](#_do_rate_control_implementations_guarantee_to_respect_the_averagemax_bitrates_or_frame_sizes_configured_for_the_video_session)
[5.13. Are video session parameters objects dependent on the used video encode quality level?](#_are_video_session_parameters_objects_dependent_on_the_used_video_encode_quality_level)
[5.14. Are video encode quality levels and rate control mutually exclusive?](#_are_video_encode_quality_levels_and_rate_control_mutually_exclusive)
[5.15. Does specifying `VkVideoEncodeRateControlInfoKHR` in the `pNext` chain of the `pBeginCodingInfo` parameter of `vkCmdBeginVideoCodingKHR` change the current rate control configuration?](#_does_specifying_vkvideoencoderatecontrolinfokhr_in_the_pnext_chain_of_the_pbegincodinginfo_parameter_of_vkcmdbeginvideocodingkhr_change_the_current_rate_control_configuration)
[5.16. When is it mandatory to specify reconstructed picture information in `VkVideoEncodeInfoKHR::pSetupReferenceSlot`?](#_when_is_it_mandatory_to_specify_reconstructed_picture_information_in_vkvideoencodeinfokhrpsetupreferenceslot)

[6. Further Functionality](#_further_functionality)

This document outlines a proposal to enable performing video encode operations in Vulkan.

Integrating video encode operations into Vulkan applications enables a wide set of new usage scenarios including, but not limited to, the following examples:

* 
Recording the output of rendering operations

* 
Efficiently transferring rendering results over network (video conferencing, game streaming, etc.)

It is also not uncommon for Vulkan capable devices to feature dedicated hardware acceleration for video compression.

The goal of this proposal is to enable these use cases, expose the underlying hardware capabilities, and provide tight integration with other functionalities of the Vulkan API.

The following options have been considered:

Rely on external sharing capabilities to interact with existing video encode APIs

Add new dedicated APIs to Vulkan specific to video encoding

Build upon a common set of APIs that enable video coding operations in general

As discussed in the proposal for the `VK_KHR_video_queue` extension, reusing a common, shared infrastructure across all video coding functionalities that leverage existing Vulkan capabilities was preferred, hence this extension follows option 3.

Further sub-options were considered whether a common set of APIs could be used to enable video encoding in general, upon which codec-specific extensions can be built. As the possibility of API reuse is similarly possible within the domain of video encoding as it is for video coding in general, this proposal follows the same principle to extend `VK_KHR_video_queue` with codec-independent video encoding capabilities.

While `VK_KHR_video_queue` already includes support for a more fine grained query to determine the set of supported video codec operations for a given queue family, this extension introduces an explicit queue flag called `VK_QUEUE_VIDEO_ENCODE_BIT_KHR` to indicate support for video encoding.

Applications can use this flag bit to identify video encode capable queue families in general, if needed, before querying more details about the individual video codec operations supported through the use of the `VkQueueFamilyVideoPropertiesKHR` structure. It also indicates support for the set of command buffer commands available on video encode queues, which include the following:

* 
Pipeline barrier and event handling commands used for synchronization

* 
Basic query commands to begin, end, and reset queries

* 
Timestamp write commands

* 
Generic video coding commands

* 
The new video encode command introduced by this extension

For the full list of individual commands supported by video encode queues, and whether any command is supported inside/outside of video coding scopes, refer to the manual page of the corresponding command.

Video encode profiles are defined using a `VkVideoProfileInfoKHR` structure that specifies a `videoCodecOperation` value identifying a video encode operation. This extension does not introduce any video encode operation flags, as that is left to the codec-specific encode extensions.

On the other hand, this extension allows the application to specify usage information specific to video encoding by chaining the following new structure to `VkVideoProfileInfoKHR`:

typedef struct VkVideoEncodeUsageInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkVideoEncodeUsageFlagsKHR    videoUsageHints;
    VkVideoEncodeContentFlagsKHR  videoContentHints;
    VkVideoEncodeTuningModeKHR    tuningMode;
} VkVideoEncodeUsageInfoKHR;

This structure contains two hints specific to the encoding use case and the content to be encoded, respectively, as well as a tuning mode.

The usage hint flags introduced by this extension are as follows:

* 
`VK_VIDEO_ENCODE_USAGE_TRANSCODING_BIT_KHR` should be used in video transcoding use cases

* 
`VK_VIDEO_ENCODE_USAGE_STREAMING_BIT_KHR` should be used when encoding video content streamed over network

* 
`VK_VIDEO_ENCODE_USAGE_RECORDING_BIT_KHR` should be used in real-time recording but offline consumption use cases

* 
`VK_VIDEO_ENCODE_USAGE_CONFERENCING_BIT_KHR` should be used for video conferencing use cases

The content hint flags introduced are as follows:

* 
`VK_VIDEO_ENCODE_CONTENT_CAMERA_BIT_KHR` should be used when encoding images captured using a camera

* 
`VK_VIDEO_ENCODE_CONTENT_DESKTOP_BIT_KHR` should be used when encoding desktop screen captures

* 
`VK_VIDEO_ENCODE_CONTENT_RENDERED_BIT_KHR` should be used when encoding rendered (e.g. game) content

These usage hints do not provide any restrictions or guarantees, so any combination of flags can be used, but they allow the application to better communicate the intended use case scenario so that implementations can make appropriate choices based on it.

Logically, however, it is part of the video profile definition, so capabilities may vary across video encode profiles that only differ in terms of video encode usage hints, and it also affects video profile compatibility between resources and video sessions, so the same `VkVideoEncodeUsageInfoKHR` structure has to be included everywhere where the specific video encode profile is used. The contemporary extension `VK_KHR_video_maintenance1`, however, does allow creating buffer and image resources that are compatible with multiple video profiles when they are created with the `VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR` or `VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR` flags, respectively, introduced by that extension.

Unlike the hints, `tuningMode` is an explicit mode setting parameter that has functional implications and is expected to limit encoding capabilities to fit the usage scenario. The following tuning mode values are introduced by this extension:

* 
`VK_VIDEO_ENCODE_TUNING_MODE_DEFAULT_KHR` is the default tuning mode

* 
`VK_VIDEO_ENCODE_TUNING_MODE_HIGH_QUALITY_KHR` tunes encoding for high quality and will likely impose latency and performance compromises

* 
`VK_VIDEO_ENCODE_TUNING_MODE_LOW_LATENCY_KHR` tunes encoding for low latency and will likely impose quality compromises for better performance

* 
`VK_VIDEO_ENCODE_TUNING_MODE_ULTRA_LOW_LATENCY_KHR` tunes encoding for ultra-low latency with further quality compromises for maximum performance

* 
`VK_VIDEO_ENCODE_TUNING_MODE_LOSSLESS_KHR` tunes encoding to produce lossless output.

In practice, not all codecs and profiles will support every tuning mode. The new query command `vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR`, as described later, may also return different recommended configuration parameters based on the tuning mode specified in the video profile in order to further aid application developers in choosing the most suitable settings for the encoding scenario at hand.

This extension also introduces a new pipeline stage identified by the `VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR` flag to enable synchronizing video encode operations with respect to other Vulkan operations.

In addition, two new access flags are introduced to indicate reads and writes, respectively, performed by the video encode pipeline stage:

* 
`VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR`

* 
`VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR`

As these flags did no longer fit into the legacy 32-bit enums, this extension requires the `VK_KHR_synchronization2` extension and relies on the 64-bit versions of the pipeline stage and access mask flags to handle synchronization specific to video encode operations.

This extension introduces the following new buffer usage flags:

* 
`VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR` is reserved for future use

* 
`VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR` allows using the buffer as a video bitstream buffer in video encode operations

This extension also introduces the following new image usage flags:

* 
`VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR` allows using the image as an encode input picture

* 
`VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR` is reserved for future use

* 
`VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR` allows using the image as an encode DPB picture (reconstructed/reference picture)

Specifying these usage flags alone is not sufficient to create a buffer or image that is compatible with a video session created against any particular video profile. In fact, when specifying any of these usage flags at resource creation time, the application has to include a `VkVideoProfileListInfoKHR` structure in the `pNext` chain of the corresponding create info structure with `VkVideoProfileListInfoKHR::pProfiles` including a video encode profile. The created resources will be compatible only with the included video encode profiles (and a video encode profile, if one is also specified in the list).

To indicate which formats are compatible with video encode usage, the following new format feature flags are introduced:

* 
`VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR` indicates support for encode input picture usage

* 
`VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR` indicates support for encode DPB picture usage

The presence of the format flags alone, as returned by the various format queries, is not sufficient to indicate that an image with that format is usable with video encoding using any particular video encode profile. Actual compatibility with a specific video encode profile has to be verified using the `vkGetPhysicalDeviceVideoFormatPropertiesKHR` command.

Video encode operations can be recorded into command buffers allocated from command pools created against queue families that support the `VK_QUEUE_VIDEO_ENCODE_BIT_KHR` flag.

Recording video encode operations happens through the use of the following new command:

VKAPI_ATTR void VKAPI_CALL vkCmdEncodeVideoKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoEncodeInfoKHR*                 pEncodeInfo);

The common, codec-independent parameters of the video encode operation are provided using the following new structure:

typedef struct VkVideoEncodeInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkVideoEncodeFlagsKHR                 flags;
    VkBuffer                              dstBuffer;
    VkDeviceSize                          dstBufferOffset;
    VkDeviceSize                          dstBufferRange;
    VkVideoPictureResourceInfoKHR         srcPictureResource;
    const VkVideoReferenceSlotInfoKHR*    pSetupReferenceSlot;
    uint32_t                              referenceSlotCount;
    const VkVideoReferenceSlotInfoKHR*    pReferenceSlots;
    uint32_t                              precedingExternallyEncodedBytes;
} VkVideoEncodeInfoKHR;

Executing such a video encode operation results in the compression of a single picture (unless otherwise defined by layered extensions), and, if there is an active `VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR` query, the status of the video encode operation is recorded into the active query slot.

In addition to `VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR` queries, applications can use the new `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` queries to retrieve additional feedback about the encoded picture including the offset and size of the bitstream written to the specified video bitstream buffer range, as discussed later.

If the encode operation requires additional codec-specific parameters, then such parameters are provided in the `pNext` chain of the structure above. Whether such codec-specific information is necessary, and what it may contain is up to the codec-specific extensions.

`dstBuffer`, `dstBufferOffset`, and `dstBufferRange` provide information about the target video bitstream buffer range. The video encode operation writes the compressed picture data to this buffer range.

The application has to create the video bitstream buffer with the new `VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR` usage flag, and must also include the used video session’s video profile in the `VkVideoProfileListInfoKHR` structure specified at buffer creation time.

The data written to the video bitstream buffer range depends on the specific video codec used, as defined by corresponding codec-specific extensions built upon this proposal.

The `srcPictureResource`, `pSetupReferenceSlot`, and `pReferenceSlots` members specify the encode input picture, reconstructed picture, and reference pictures, respectively, used by the video encode operation, as discussed in later sections of this proposal.

The `precedingExternallyEncodedBytes` member specifies the number of bytes externally encoded into the bitstream by the application. This value is used to update the implementation’s rate control algorithm for the rate control layer this encode operation belongs to, by accounting for the bitrate budget consumed by these externally encoded bytes. This parameter is respected by the implementation only if the `VK_VIDEO_ENCODE_CAPABILITY_PRECEDING_EXTERNALLY_ENCODED_BYTES_BIT_KHR` capability is supported.

`srcPictureResource` defines the parameters of the video picture resource to use as the encode input picture. The video encode operation reads the picture data to compress from this video picture resource. As such it is a mandatory parameter of the operation.

The application has to create the image view specified in `srcPictureResource.imageViewBinding` with the new `VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR` usage flag, and must also include the used video session’s video profile in the `VkVideoProfileListInfoKHR` structure specified at image creation time.

The image subresource backing the encode input picture has to be in the new `VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR` layout at the time the video encode operation is executed.

`pSetupReferenceSlot` is an optional parameter specifying the video picture resource and DPB slot index to use for the reconstructed picture. Implementations use the reconstructed picture for one of the following purposes:

When the encoded picture is requested to be set up as a reference, according to the codec-specific semantics, the video encode operation will perform picture reconstruction, output the results to this picture, and activate the reconstructed picture’s DPB slot with the picture in order to enable using the picture as a reference picture in future video encode operations.

When the encoded picture is not requested to be set up as a reference, implementations may use the reconstructed picture’s resource and/or DPB slot for intermediate data required by the encoding process.

Accordingly, `pSetupReferenceSlot` must never be `NULL`, except when the video session was created without any DPB slots.

|  | The original version of this extension only required the specification of the reconstructed picture information (i.e. a non-`NULL` `pSetupReferenceSlot`) when the application intended to set up a reference picture by activating a DPB slot. Consequently, the presence of reconstructed picture information always implied DPB slot activation. This was changed in revision 12 of the extension, and whether DPB slot activation happens is now subject to codec-specific semantics. More details on this change are discussed in the corresponding issue in this proposal document. |
| --- | --- |

In summary, for encoded pictures requested to be set up as reference, this parameter can be used to add new reference pictures to the DPB, and change the association between DPB slot indices and video picture resources. That also implies that the application has to specify a video picture resource in `pSetupReferenceSlot→pPictureResource` that was included in the set of bound reference picture resources specified when the video coding scope was started (in one of the elements of `VkVideoBeginCodingInfoKHR::pReferenceSlots`). No similar requirement exists for the encode input picture specified by `srcPictureResource` which can refer to any video picture resource.

The application has to create the image view specified in `pSetupReferenceSlot→pPictureResource→imageViewBinding` with the new `VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR` usage flag, and must also include the used video session’s video profile in the `VkVideoProfileListInfoKHR` structure specified at image creation time.

The image subresource backing the reconstructed picture has to be in the new `VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR` layout at the time the video encode operation is executed.

If the video profile in use requires additional codec-specific parameters for the reconstructed picture, then such parameters are provided in the `pNext` chain of `pSetupReferenceSlot`. Whether such codec-specific reconstructed picture information is necessary, and what it may contain is up to the codec-specific extensions.

If the video session allows, reference pictures can be specified in the `pReferenceSlots` array to provide predictions of the values of samples of the encoded picture.

Each entry in the `pReferenceSlots` array adds one or more pictures, currently associated with the DPB slot specified in the element’s `slotIndex` member and stored in the video picture resource specified in the element’s `pPictureResource` member, to the list of active reference pictures to use in the video encode operation.

The application has to make sure to specify each video picture resource used as a reference picture in a video encode operation, beforehand, in the set of bound reference picture resources specified when the video coding scope was started (in one of the elements of `VkVideoBeginCodingInfoKHR::pReferenceSlots`).

The application has to create the image view specified in `pPictureResource→imageViewBinding` of the elements of `pReferenceSlots` with the new `VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR` usage flag, and must also include the used video session’s video profile in the `VkVideoProfileListInfoKHR` structure specified at image creation time.

The image subresources backing the reference pictures have to be in the new `VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR` layout at the time the video encode operation is executed.

Typically the number of elements in `pReferenceSlots` equals the number of reference pictures added, but in certain cases (depending on the used video codec and video profile) there may be multiple pictures in the same DPB slot resource.

If the video profile in use requires additional codec-specific parameters for the reference pictures, then such parameters are provided in the `pNext` chain of the elements of `pReferenceSlots`. Whether such codec-specific reference picture information is necessary, and what it may contain is up to the codec-specific extensions.

Encoder implementations usually only support a subset of the available encoding tools defined by the corresponding video compression standards. This may prevent some implementation from being able to respect certain codec-specific parameters, or specific parameter values.

Enumerating exhaustively all of these constraints and potentially defining application-queryable capabilities corresponding to those is not practical, as it would potentially require separate capabilities for almost every single codec-specific parameter, parameter value, and combinations of those, as usually there are complicated interactions between those codec-specific parameters. Instead, this proposal approaches this problem from the other direction.

Instead of defining capabilities for each of these constraints, implementations are allowed to override codec-specific parameter values or combinations thereof, so that the resulting overridden codec-specific parameters now comply to the constraints of the target implementation. This has multiple benefits:

* 
Enables the video encode APIs to be supported on a much wider set of hardware implementations, as the codec-specific extensions layered on top of this extension would not have codec-specific requirements that assume implementations to support certain, potentially not universally available, encoding tools

* 
Enables implementations to expose all of the encoding tools they support for a particular video compression standard, which typically is not possible in other video APIs as, without overrides, implementations may not be able to expose a large set of their encoding tools just because they do not comply to the exact wording of the capabilities defined by that API

* 
Enables writing portable applications without getting lost in myriads of capabilities

Allowing implementations to override codec-specific parameters does not mean, however, that implementations can do any overrides they wish. The base parameter override mechanism is reserved to deal with implementation limitations only. Thus, by default, implementations are expected to override codec-specific parameters only if it is absolutely paramount for the correct functioning of their encoder hardware.

In certain cases, applications may want to allow the implementation to make its own choices about the certain codec-specific parameters that are not driven by implementation constraints, but rather aim to allow the implementation to choose parameters and encoding tools that better fit the usage scenario described by the video profile and other parameters, like the encode quality level, than the one the application specified. This proposal introduces a new video session creation flag called `VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR` that enables the application to opt in to such optimization overrides.

There are certain rules that implementations need to follow in all cases where they may apply codec-specific parameter overrides. In particular:

* 
Certain codec-specific parameters are defined by layered codec-specific extensions to be always respected, and thus cannot be overridden, which is generally expected to be the case for all parameters that may affect the overall behavior of video encoding, or any bitstream elements that are not encoded in any fashion by the implementation, so that applications still have the necessary freedom to encode such auxiliary bitstream elements the way they wish

* 
In a similar vein, implementation overrides cannot affect the compliance of the generated bitstream to the video compression standard

The details of these rules can be found in the specification language of this extension, and any layered extension built upon it.

In general, there are two categories of codec-specific parameters to which implementation overrides may be applied:

Codec-specific parameters stored in video session parameters objects, if any

Codec-specific parameters provided to video encode commands

Both of these codec-specific parameter categories may have an effect on the video bitstream data produced by video encode operations. However, parameters falling into the first category are particularly important as it is common for applications to encode the codec-specific parameters stored in video session parameters on their own.

In order to enable the application to deal with parameter overrides applied to video session parameters, this proposal introduces the following new command:

VKAPI_ATTR VkResult VKAPI_CALL vkGetEncodedVideoSessionParametersKHR(
    VkDevice                                        device,
    const VkVideoEncodeSessionParametersGetInfoKHR* pVideoSessionParametersInfo,
    VkVideoEncodeSessionParametersFeedbackInfoKHR*  pFeedbackInfo,
    size_t*                                         pDataSize,
    void*                                           pData);

The main input to this command is the video session parameters object in question, with layered extensions adding additional chainable structures to provide additional codec-specific input parameters:

typedef struct VkVideoEncodeSessionParametersGetInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkVideoSessionParametersKHR    videoSessionParameters;
} VkVideoEncodeSessionParametersGetInfoKHR;

This command has multiple purposes.

First, by providing a non-`NULL` `pFeedbackInfo` parameter, the application can get feedback about whether the implementation applied any parameter overrides to the video session parameters in question through the following output structure:

typedef struct VkVideoEncodeSessionParametersFeedbackInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasOverrides;
} VkVideoEncodeSessionParametersFeedbackInfoKHR;

The `hasOverrides` member will be set to `VK_TRUE` if implementation overrides were applied, and layered extensions may provide additional chainable output structures that return further (typically codec-specific) information about the applied overrides.

When this feedback indicates that implementation overrides were applied, the application needs to retrieve the encoded video session parameters containing the overrides in order to be able to produce a compliant bitstream. This can be done in the usual fashion by providing a non-`NULL` `pDataSize` parameter to retrieve the size of the encoded parameter data, and then calling the command again with a non-`NULL` `pData` pointer to retrieve the data.

The application can choose to use the `vkGetEncodedVideoSessionParametersKHR` command to encode the video session parameters even if the implementation did not override any of the parameters, but in this case it can also choose to encode the respective bitstream elements on its own.

It is worth calling out though that if the application does not use this command to determine whether video session parameter overrides happened or does not use the encoded parameters retrievable using this command when video session parameter overrides happened, but rather just encodes the respective bitstream elements with its own choice of codec-specific parameters, then it risks the resulting video bitstream to end up being non-compliant with the video compression standard.

Querying capabilities specific to video encoding happens through the query mechanisms introduced by the `VK_KHR_video_queue` extension.

Support for individual video encode operations can be retrieved for each queue family using the `VkQueueFamilyVideoPropertiesKHR` structure, as discussed earlier.

The application can also use the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command to query the capabilities of a specific video encode profile. In case of video encode profiles, the following new structure has to be included in the `pNext` chain of the `VkVideoCapabilitiesKHR` structure used to retrieve the general video encode capabilities:

typedef struct VkVideoEncodeCapabilitiesKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    VkVideoEncodeCapabilityFlagsKHR         flags;
    VkVideoEncodeRateControlModeFlagsKHR    rateControlModes;
    uint32_t                                maxRateControlLayers;
    uint64_t                                maxBitrate;
    uint32_t                                maxQualityLevels;
    VkExtent2D                              encodeInputPictureGranularity;
    VkVideoEncodeFeedbackFlagsKHR           supportedEncodeFeedbackFlags;
} VkVideoEncodeCapabilitiesKHR;

This structure contains a new encode-specific `flags` member that indicates support for various video encode capabilities, like the support for the `precedingExternallyEncodedBytes` parameter discussed before.

The `rateControlModes` and `maxRateControlLayers` members provide information about the supported rate control modes and maximum number of rate control layers that can be used in a video session, as discussed later.

The `maxBitrate` member provides information about the maximum bitrate supported for the video profile.

The `maxQualityLevels` member specifies the number of different video encode quality level values supported by the video encode profile in question which are identified with numbers in the range `0..maxQualityLevels`. The number and implementation effect of the quality levels is expected to vary across video encode profiles, even in video encode profiles using the same video codec operation (e.g. due to the use of different tuning modes), as discussed later.

The `encodeInputPictureGranularity` member indicates the granularity at which data from the encode input picture is used for encoding individual codec-specific coding blocks. If this capability is not `{1,1}`, then it is recommend for applications to initialize the data in the encode input picture at this granularity, as the encoder will use data in such padding texels during the encoding, which may affect the quality and efficiency of the encoding.

The `supportedEncodeFeedbackFlags` member indicates the set of supported encode feedback flags for the `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` queries described later.

The `vkGetPhysicalDeviceVideoFormatPropertiesKHR` command can be used to query the supported image/picture formats for a given set of video profiles, as described in the `VK_KHR_video_queue` extension.

In particular, if the application would like to query the list of format properties supported for encode input pictures, then it should include the new `VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR` usage flag in `VkPhysicalDeviceVideoFormatInfoKHR::imageUsage`.

Similarly, to query the list of format properties supported for encode DPB pictures (reconstructed/reference pictures), then it should include the new `VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR` usage flag in `VkPhysicalDeviceVideoFormatInfoKHR::imageUsage`.

This proposal introduces the concept of video encode quality levels, which can be thought of as encoder presets that control the number and type of implementation-specific encoding tools and algorithms utilized in the encoding process. Implementations can expose support for one or more such video encode quality levels for each video profile. By default, video encode quality level index zero is used, unless otherwise specified.

Generally, using higher video encode quality levels may produce higher quality video streams at the cost of additional processing time. However, as the final quality of an encoded picture depends on the contents of the encode input picture, the contents of the active reference pictures, the codec-specific encode parameters, and the particular implementation-specific tools used corresponding to the individual video encode quality levels, there are no guarantees that using a higher video encode quality level will always produce a higher quality encoded picture for any given set of inputs.

The chosen quality level may also affect the optimization overrides applied by implementations when using the `VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR` flag, and thus codec-specific parameters stored in video session parameters may be affected by the used video encode quality level. As such, video session parameters objects are always created with respect to a specific video encode quality level. The application can choose to create a video session parameters object with a video encode quality level index different than the default quality level of zero by including the following new structure in the `pNext` chain of `VkVideoSessionParametersCreateInfoKHR`:

typedef struct VkVideoEncodeQualityLevelInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           qualityLevel;
} VkVideoEncodeQualityLevelInfoKHR;

Where `qualityLevel` specifies the used video encode quality level.

Video sessions created against a video encode profile allow changing the used video encode quality level dynamically. After creation, the video session is configured with the default quality level of zero, which then can be changed by including the new `VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR` flag in the `flags` member of the `VkVideoCodingControlInfoKHR` structure passed to the `vkCmdControlVideoCodingKHR` command and including an instance of the `VkVideoEncodeQualityLevelInfoKHR` structure in the `VkVideoCodingControlInfoKHR::pNext` chain specifying the new quality level to set for the video session.

If video session parameters objects are used by a particular video encode command, then the video encode quality the parameters object was created with has to match the currently configured quality level for the bound video session.

Implementations may have certain recommendations for encoding parameters and configuration (e.g. for rate control) specific to each supported video encode quality level. These recommendations and other quality level related properties can be queried for a specific video encode profile using the following new command:

VKAPI_ATTR VkResult VKAPI_CALL vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR(
    VkPhysicalDevice                                        physicalDevice,
    const VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR*   pQualityLevelInfo,
    VkVideoEncodeQualityLevelPropertiesKHR*                 pQualityLevelProperties);

The input to the command is a structure that specifies the video encode profile and quality level to query properties for:

typedef struct VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkVideoProfileInfoKHR*    pVideoProfile;
    uint32_t                        qualityLevel;
} VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR;

This proposal allows retrieving the following codec-independent quality level properties:

typedef struct VkVideoEncodeQualityLevelPropertiesKHR {
    VkStructureType                            sType;
    void*                                      pNext;
    VkVideoEncodeRateControlModeFlagBitsKHR    preferredRateControlMode;
    uint32_t                                   preferredRateControlLayerCount;
} VkVideoEncodeQualityLevelPropertiesKHR;

Layered extensions may add additional (typically codec-specific) property structures that can be chained to the base output structure defined above.

The new `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` query type works similarly to pipeline statistics from the perspective of being able to report multiple distinct values about the video encode operations they collect feedback about. When creating a query pool with this type the following new structure specifies the selected feedback values:

typedef struct VkQueryPoolVideoEncodeFeedbackCreateInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    VkVideoEncodeFeedbackFlagsKHR           encodeFeedbackFlags;
} VkQueryPoolVideoEncodeFeedbackCreateInfoKHR;

This extension adds support for the following video encode feedback flags:

* 
`VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR` requests capturing the offset relative to `dstBufferOffset` where the bitstream data corresponding to the video encode operation is written to

* 
`VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR` requests capturing the number of bytes written by the video encode operation to the bitstream buffer

* 
`VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR` requests capturing information about whether the implementation overrode any codec-specific parameters in the generated bitstream data with respect to the parameter values supplied by the application

All implementations are expected to support `VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR` and `VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR`, but `VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR` is optional, as not all implementations may be able to provide feedback about overrides performed on the encoded bitstream data.

The reported offset for `VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR` is currently defined to be always zero until otherwise defined by any layered extension.

A key aspect of video encoding is to control the size of the encoded bitstream. This happens through the application of rate control. Rate control settings consist of codec-independent and codec-specific parameters hence this extension only includes the common parameters.

The following rate control modes are introduced by this extension:

* 
`VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR` for disabling rate control

* 
`VK_VIDEO_ENCODE_RATE_CONTROL_MODE_CBR_BIT_KHR` for constant bitrate (CBR) rate control

* 
`VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR` for variable bitrate (VBR) rate control

In addition, the `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR` constant is used to set rate control configuration to implementation-dependent default settings. This is the initial rate control mode that is set for newly created video sessions which leaves rate control entirely in the implementation’s control.

Certain codecs define a concept typically referred to as *video coding layers*. The semantics of these layers are defined by the corresponding video compression standards. However, some implementations allow certain configuration parameters of rate control to be specified separately for each such video coding layer, thus this proposal introduces the concept of rate control layers which enable the application to explicitly control these parameters on a per layer basis.

When a single rate control layer is configured, it is applied to all encoded pictures. In contrast, when multiple rate control layers are configured, then each rate control layer is applied only to encoded pictures targeting a specific video coding layer.

After a video session is reset using `VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR`, its rate control settings are initialized to implementation-specific defaults. Applications can change these by calling `vkCmdControlVideoCodingKHR` and specifying the `VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR` flag. When this flag is present, the following new structure chained to the `pNext` chain of `VkVideoCodingControlInfoKHR` specifies the rate control configuration:

typedef struct VkVideoEncodeRateControlInfoKHR {
    VkStructureType                                sType;
    const void*                                    pNext;
    VkVideoEncodeRateControlFlagsKHR               flags;
    VkVideoEncodeRateControlModeFlagBitsKHR        rateControlMode;
    uint32_t                                       layerCount;
    const VkVideoEncodeRateControlLayerInfoKHR*    pLayers;
    uint32_t                                       virtualBufferSizeInMs;
    uint32_t                                       initialVirtualBufferSizeInMs;
} VkVideoEncodeRateControlInfoKHR;

`rateControlMode` specifies the rate control mode to set.

`layerCount` specifies the number of rate control layers to use from this point, and `pLayers` specifies the configuration of each layer. Rate control layers can only be specified when rate control is not disabled or is not set to the implementation-specific defaults.

`virtualBufferSizeInMs` and `initialVirtualBufferSizeInMs` specify the size and initial occupancy, respectively, in milliseconds of the leaky bucket model virtual buffer.

The `VkVideoEncodeRateControlLayerInfoKHR` structure is defined as follows:

typedef struct VkVideoEncodeRateControlLayerInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           averageBitrate;
    uint64_t           maxBitrate;
    uint32_t           frameRateNumerator;
    uint32_t           frameRateDenominator;
} VkVideoEncodeRateControlLayerInfoKHR;

`averageBitrate` and `maxBitrate` specify the target and peak bitrate that the rate control layer should use in bits/second. In case of CBR mode the two values have to match.

`frameRateNumerator` and `frameRateDenominator` specify the numerator and denominator of the frame rate used by the video sequence.

The exact behavior of rate control is implementation-specific but it is typically constrained by the video compression standard corresponding to the used video profile. Implementations are expected to implement rate control as follows:

* 
In case of CBR mode the bitrate should stay as close to the specified `averageBitrate` as possible within the virtual buffer window.

* 
In case of VBR mode the bitrate should not exceed the value of `maxBitrate` while also trying to get close to the target bitrate specified by `averageBitrate` within the virtual buffer window.

Codec-specific video encode extensions can include both global and per-layer codec-specific rate control configurations by chaining codec-specific parameters to the `VkVideoEncodeRateControlInfoKHR` and `VkVideoEncodeRateControlLayerInfoKHR` structures, respectively.

Some implementations do not track the current rate control configuration as part of the device state maintained in the video session object, but the current rate control configuration may affect the device commands recorded in response to video encode operations. In order to enable implementations to have access to the current rate control configuration when recording video encoding commands into command buffers, this proposal requires the current rate control configuration to be also specified when calling `vkCmdBeginVideoCodingKHR` by including the `VkVideoEncodeRateControlInfoKHR` structure describing it in the `pNext` chain of the `pBeginCodingInfo` parameter. When this information is not included, it is assumed that the currently expected rate control configuration is the default one, i.e. the implementation-specific rate control mode indicated by `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR`.

It is important to note that specifying the rate control configuration when calling `vkCmdBeginVideoCodingKHR` does not change the current rate control configuration. For that the `vkCmdControlVideoCodingKHR` command must be used with the `VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR` flag, as discussed earlier. The rate control configuration specified to `vkCmdBeginVideoCodingKHR` serves only to make the information about the current rate control state available to implementations during command recording and is expected to always match the effective current rate control state at the time the command is executed on the device.

To summarize the usage of the video encoding features introduced by this extension, let us take a look at a typical usage scenario when using this extension to encode a video stream.

Before the application can start recording command buffers with video encode operations, it has to do the following:

Ensure that the implementation can encode the video content by first querying the video codec operations supported by each queue family using the `vkGetPhysicalDeviceQueueFamilyProperties2` command and the `VkQueueFamilyVideoPropertiesKHR` output structure.

If needed, the application has to also retrieve the `VkQueueFamilyQueryResultStatusPropertiesKHR` output structure for the queue family to check support for `VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR` queries.

Construct the `VkVideoProfileInfoKHR` structure describing the entire video profile, including the video codec operation, chroma subsampling, bit depths, and any other usage or codec-specific parameters.

Ensure that the specific video profile is supported by the implementation using the `vkGetPhysicalDeviceVideoCapabilitiesKHR` command and retrieve the general, encode-specific, and codec-specific capabilities at the same time.

Query the list of supported image/picture format properties supported for the video profile using the `vkGetPhysicalDeviceVideoFormatPropertiesKHR` structure, and select a suitable format for the DPB and encode input pictures.

Create an image corresponding to the encode input picture with the appropriate usage flags and video profile list, as described earlier, and bind suitable device memory to the image. Also create an image view with the appropriate usage flags to use in the video encode operations.

If needed, create one or more images corresponding to the DPB pictures with the appropriate usage flags and video profile list, as described earlier, and bind suitable device memory to them. Also create any image views with the appropriate usage flags to use in the video encode operations.

Create a buffer with the `VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR` usage flag and the video profile list, to use as the destination video bitstream buffer. If the buffer is expected to be consumed using the CPU, consider binding compatible host-visible device memory to the buffer.

If result status or video encode feedback queries are needed and supported (as determined earlier), create a query pool with the corresponding query type and the used video encode profile.

Create the video session using the video encode profile and appropriate parameters within the capabilities supported by the profile, as determined earlier. Bind suitable device memory to each memory binding index of the video session.

If needed, create a video session parameters object for the video session.

Recording video encode operations into command buffers typically consists of the following sequence:

Start a video coding scope with the created video session (and parameters) object using the `vkCmdBeginVideoCodingKHR` command. Make sure to include all video picture resources in `VkVideoBeginCodingInfoKHR::pReferenceSlots` that may be used as reconstructed or reference pictures within the video coding scope, and ensure that the DPB slots specified for each reflect the current DPB slot association for the resource.

If this is the first video coding scope the video session is used in, reset the video session to the initial state by recording a `vkCmdControlVideoCodingKHR` command with the `VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR` flag.

If needed, also update the rate control state or the used video encode quality level for the video session by recording a
`vkCmdControlVideoCodingKHR` command with the `VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR` and/or `VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR` flags (can be done in the same command that resets the video session, if needed).

If needed, start a result status or video coding feedback query using `vkCmdBeginQuery`. Reset the query using `vkCmdResetQueryPool`, beforehand, as needed.

Issue a video encode operation using the `vkCmdEncodeVideoKHR` command with appropriate parameters, as discussed earlier.

If needed, end the started query using `vkCmdEndQuery`.

Record any further control or encode operations into the video coding scope, as needed.

End the video coding scope using the `vkCmdEndVideoCodingKHR` command.

Video profiles that require the use of video session parameters objects may also require the application to encode the stored codec-specific parameters separately into the final bitstream. Applications are expected to encode these parameters according to the following steps:

If the application wants to encode such parameters on its own, when possible, it should first call the `vkGetEncodedVideoSessionParametersKHR` command with a non-NULL `pFeedbackInfo` parameter to retrieve information about whether the implementation applied any overrides to the codec-specific parameters in question.

If the results of the previous step indicate that no implementation overrides were applied, then the application can choose to encode the codec-specific parameters in question on its own and ignore the rest of the steps listed here

Otherwise, the application has to retrieve the encoded codec-specific parameters by calling the `vkGetEncodedVideoSessionParametersKHR` command twice: first, to retrieve the size, second to retrieve the data of the encoded codec-specific parameters in question, as discussed earlier.

VkVideoCodecOperationFlagBitsKHR neededVideoEncodeOp = ...
uint32_t queueFamilyIndex;
uint32_t queueFamilyCount;

vkGetPhysicalDeviceQueueFamilyProperties2(physicalDevice, &queueFamilyCount, NULL);

VkQueueFamilyProperties2* props = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyProperties2));
VkQueueFamilyVideoPropertiesKHR* videoProps = calloc(queueFamilyCount,
    sizeof(VkQueueFamilyVideoPropertiesKHR));

for (queueFamilyIndex = 0; queueFamilyIndex 

VkResult result;

// We also include the optional encode usage information here
VkVideoEncodeUsageInfoKHR profileUsageInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_USAGE_INFO_KHR,
    .pNext = ... // pointer to codec-specific profile structure
    .videoUsageHints = VK_VIDEO_ENCODE_USAGE_DEFAULT_KHR,
    .videoContentHints = VK_VIDEO_ENCODE_CONTENT_DEFAULT_KHR,
    .tuningMode = VK_VIDEO_ENCODE_TUNING_MODE_DEFAULT_KHR
};

VkVideoProfileInfoKHR profileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR,
    .pNext = &profileUsageInfo,
    .videoCodecOperation = ... // used video encode operation
    .chromaSubsampling = VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR,
    .lumaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR,
    .chromaBitDepth = VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR
};

VkVideoEncodeCapabilitiesKHR encodeCapabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_CAPABILITIES_KHR,
    .pNext = ... // pointer to codec-specific capability structure
}

VkVideoCapabilitiesKHR capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR,
    .pNext = &encodeCapabilities
};

result = vkGetPhysicalDeviceVideoCapabilitiesKHR(physicalDevice, &profileInfo, &capabilities);

if (result == VK_SUCCESS) {
    // Profile is supported, check additional capabilities
    ...
} else {
    // Profile is not supported, result provides additional information about why
    ...
}

VkVideoProfileInfoKHR profileInfo = {
    ...
};

VkVideoProfileListInfoKHR profileListInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR,
    .pNext = NULL,
    .profileCount = 1,
    .pProfiles = &profileInfo
};

VkPhysicalDeviceVideoFormatInfoKHR formatInfo = {
    .sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_FORMAT_INFO_KHR,
    .pNext = &profileListInfo
};

VkVideoFormatPropertiesKHR* formatProps = NULL;

// First query encode input formats
formatInfo.imageUsage = VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR;

vkGetPhysicalDeviceVideoFormatPropertiesKHR(physicalDevice, &formatInfo, &formatCount, NULL);
formatProps = calloc(formatCount, sizeof(VkVideoFormatPropertiesKHR));
for (uint32_t i = 0; i 

VkBuffer bitstreamBuffer = VK_NULL_HANDLE;

VkVideoProfileListInfoKHR profileListInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR,
    .pNext = NULL,
    .profileCount = ... // number of video profiles to use the bitstream buffer with
    .pProfiles = ... // pointer to an array of video profile information structure chains
};

VkBufferCreateInfo createInfo = {
    .sType = VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO,
    .pNext = &profileListInfo,
    ...
    .usage = VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR | ... // any other usages that may be needed
    ...
};

vkCreateBuffer(device, &createInfo, NULL, &bitstreamBuffer);

VkImage inputImage = VK_NULL_HANDLE;
VkImageView inputImageView = VK_NULL_HANDLE;

VkVideoProfileListInfoKHR profileListInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR,
    .pNext = NULL,
    .profileCount = ... // number of video profiles to use the encode input image with
    .pProfiles = ... // pointer to an array of video profile information structure chains
};

VkImageCreateInfo imageCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,
    .pNext = &profileListInfo,
    ...
    .usage = VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR | ... // any other usages that may be needed
    ...
};

vkCreateImage(device, &imageCreateInfo, NULL, &inputImage);

VkImageViewUsageCreateInfo imageViewUsageInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO,
    .pNext = NULL,
    .usage = VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR
};

VkImageViewCreateInfo imageViewCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
    .pNext = &imageViewUsageInfo,
    .flags = 0,
    .image = inputImage,
    .viewType = ... // image view type (only 2D or 2D_ARRAY is supported)
    ... // other image view creation parameters
};

vkCreateImageView(device, &imageViewCreateInfo, NULL, &inputImageView);

// NOTE: This example creates a single image and image view that is used to back all DPB pictures
// but, depending on the support of the VK_VIDEO_CAPABILITY_SEPARATE_REFERENCE_IMAGES_BIT_KHR
// capability flag, the application can choose to create separate images for each DPB slot or
// picture

VkImage dpbImage = VK_NULL_HANDLE;
VkImageView dpbImageView = VK_NULL_HANDLE;

VkVideoProfileListInfoKHR profileListInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR,
    .pNext = NULL,
    .profileCount = ... // number of video profiles to use the encode DPB image with
    .pProfiles = ... // pointer to an array of video profile information structure chains
};

VkImageCreateInfo imageCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,
    .pNext = &profileListInfo,
    ...
    .usage = VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR | ... // any other usages that may be needed
    ...
    .arrayLayers = // typically equal to the DPB slot count
};

vkCreateImage(device, &imageCreateInfo, NULL, &dpbImage);

VkImageViewUsageCreateInfo imageViewUsageInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO,
    .pNext = NULL,
    .usage = VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR
};

VkImageViewCreateInfo imageViewCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
    .pNext = &imageViewUsageInfo,
    .flags = 0,
    .image = dpbImage,
    .viewType = ... // image view type (only 2D or 2D_ARRAY is supported)
    ... // other image view creation parameters
};

vkCreateImageView(device, &imageViewCreateInfo, NULL, &dpbImageView);

VkQueryPool queryPool = VK_NULL_HANDLE;

VkVideoProfileInfoKHR profileInfo = {
    ...
};

// We will capture both bitstream offset and bitstream bytes written in the feedback
VkVideoEncodeFeedbackFlags capturedEncodeFeedbackValues =
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR |
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR;

// NOTE: Only the encode feedback values listed above are required to be supported by all
// video encode implementations. So if the application intends to use other encode
// feedback values like VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR, then
// it must first check support for it as indicated by the supportedEncodeFeedbackFlags
// capability for the video encode profile in question.

VkQueryPoolVideoEncodeFeedbackCreateInfoKHR feedbackInfo = {
    .sType = VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR,
    .pNext = &profileInfo,
    .encodeFeedbackFlags = capturedEncodeFeedbackValues
};

VkQueryPoolCreateInfo createInfo = {
    .sType = VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO,
    .pNext = &feedbackInfo,
    .flags = 0,
    .queryType = VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR,
    ...
};

vkCreateQueryPool(device, &createInfo, NULL, &queryPool);

...
vkBeginCommandBuffer(commandBuffer, ...);
...
vkCmdBeginVideoCodingKHR(commandBuffer, ...);
...
vkCmdBeginQuery(commandBuffer, queryPool, 0, 0);
// Issue video encode operation
...
vkCmdEndQuery(commandBuffer, queryPool, 0);
...
vkCmdEndVideoCodingKHR(commandBuffer, ...);
...
vkEndCommandBuffer(commandBuffer);
...

// We retrieve the captured feedback values as well as the status
struct {
    uint32_t                bitstreamBufferOffset;
    uint32_t                bitstreamBytesWritten;
    VkQueryResultStatusKHR  status;
} results;
vkGetQueryPoolResults(device, queryPool, 0, 1,
                      sizeof(results), &results, sizeof(results),
                      VK_QUERY_RESULT_WITH_STATUS_BIT_KHR);

if (results.status == VK_QUERY_RESULT_STATUS_NOT_READY_KHR /* 0 */) {
    // Query result not ready yet
    ...
} else if (results.status > 0) {
    // Video encode operation was successful, we can use bitstream feedback data
    ...
} else if (results.status 

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoPictureResourceInfoKHR encodeInputPictureResource = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR,
    .pNext = NULL,
    .codedOffset = ... // offset within the image subresource (typically { 0, 0 })
    .codedExtent = ... // extent of encoded picture (typically the video frame size)
    .baseArrayLayer = 0,
    .imageViewBinding = inputImageView
};

VkVideoEncodeInfoKHR encodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR,
    .pNext = ... // pointer to codec-specific picture information structure
    .flags = 0,
    .dstBuffer = bitstreamBuffer,
    .dstBufferOffset = ... // offset where the encoded bitstream is written
    .dstBufferRange = ... // maximum size in bytes of the written bitstream data
    .srcPictureResource = encodeInputPictureResource,
    .pSetupReferenceSlot = NULL,
    .referenceSlotCount = 0,
    .pReferenceSlots = NULL,
    .precedingExternallyEncodedBytes = ...
};

vkCmdEncodeVideoKHR(commandBuffer, &encodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

// Bound reference resource list provided has to include reconstructed picture resource
vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoPictureResourceInfoKHR encodeInputPictureResource = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR,
    .pNext = NULL,
    .codedOffset = ... // offset within the image subresource (typically { 0, 0 })
    .codedExtent = ... // extent of encoded picture (typically the video frame size)
    .baseArrayLayer = 0,
    .imageViewBinding = inputImageView
};

VkVideoPictureResourceInfoKHR reconstructedPictureResource = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR,
    .pNext = NULL,
    .codedOffset = ... // offset within the image subresource (typically { 0, 0 })
    .codedExtent = ... // extent of reconstructed picture (typically the video frame size)
    .baseArrayLayer = ... // layer to use for setup picture in DPB
    .imageViewBinding = dpbImageView
};

VkVideoReferenceSlotInfoKHR setupSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
    .pNext = ... // pointer to codec-specific reconstructed picture information structure
    .slotIndex = ... // DPB slot index to use with the reconstructed picture
                     // (optionally activated per the codec-specific semantics)
    .pPictureResource = &reconstructedPictureResource
};

VkVideoEncodeInfoKHR encodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR,
    .pNext = ... // pointer to codec-specific picture information structure
    ...
    .srcPictureResource = encodeInputPictureResource,
    .pSetupReferenceSlot = &setupSlotInfo,
    ...
};

vkCmdEncodeVideoKHR(commandBuffer, &encodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

// Bound reference resource list provided has to include all used reference picture resources
vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoPictureResourceInfoKHR referencePictureResources[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR,
        .pNext = NULL,
        .codedOffset = ... // offset within the image subresource (typically { 0, 0 })
        .codedExtent = ... // extent of reference picture (typically the video frame size)
        .baseArrayLayer = ... // layer of first reference picture resource
        .imageViewBinding = dpbImageView
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR,
        .pNext = NULL,
        .codedOffset = ... // offset within the image subresource (typically { 0, 0 })
        .codedExtent = ... // extent of reference picture (typically the video frame size)
        .baseArrayLayer = ... // layer of second reference picture resource
        .imageViewBinding = dpbImageView
    },
    ...
};
// NOTE: Individual resources do not have to refer to the same image view, e.g. if different
// image views are created for each picture resource, or if the
// VK_VIDEO_CAPABILITY_SEPARATE_REFERENCE_IMAGES_BIT_KHR capability is supported and the
// application created separate images for the reference pictures.

VkVideoReferenceSlotInfoKHR referenceSlotInfo[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = ... // pointer to codec-specific reference picture information structure
        .slotIndex = ... // DPB slot index of the first reference picture
        .pPictureResource = &referencePictureResource[0]
    },
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
        .pNext = ... // pointer to codec-specific reference picture information structure
        .slotIndex = ... // DPB slot index of the second reference picture
        .pPictureResource = &referencePictureResource[1]
    },
    ...
};

VkVideoEncodeInfoKHR encodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR,
    .pNext = ... // pointer to codec-specific picture information structure
    ...
    .referenceSlotCount = sizeof(referenceSlotInfo) / sizeof(referenceSlotInfo[0]),
    .pReferenceSlots = &referenceSlotInfo[0]
};

vkCmdEncodeVideoKHR(commandBuffer, &encodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

VkVideoEncodeSessionParametersGetInfoKHR getInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_GET_INFO_KHR,
    .pNext = ... // pointer to any codec-specific parameters, if needed
    .videoSessionParameters = // video session parameters object to query
};

// VK_TRUE, if application prefers to encode the stored codec-specific parameters
// itself, if possible, VK_FALSE otherwise
VkBool32 preferApplicationParameterEncode = ...;

VkBool32 parametersContainOverrides = VK_FALSE;

if (preferApplicationParameterEncode) {
    VkVideoEncodeSessionParametersFeedbackInfoKHR feedbackInfo = {
        .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_FEEDBACK_INFO_KHR,
        .pNext = ... // pointer to any codec-specific feedback info, if needed
        .hasOverrides = VK_FALSE;
    };

    vkGetEncodedVideoSessionParametersKHR(device, &getInfo, &feedbackInfo, NULL, NULL);

    parametersContainOverrides = feedbackInfo.hasOverrides;
}

if (preferApplicationParameterEncode && !parametersContainOverrides) {
    // Encode codec-specific parameters manually
    ...
} else {
    // Retrieve encoded codec-specific parameters from implementation
    size_t dataSize = 0;
    vkGetEncodedVideoSessionParametersKHR(device, &getInfo, NULL, &dataSize, NULL);

    // Pointer to CPU buffer with at least dataSize number of bytes of storage
    // (allocate it on demand or use an existing pool used for bitstream storage)
    void* data = ...;
    vkGetEncodedVideoSessionParametersKHR(device, &getInfo, NULL, &dataSize, data);
}

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoEncodeRateControlLayerInfoKHR rateControlLayers[] = {
    {
        .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_LAYER_INFO_KHR,
        .pNext = ... // pointer to optional codec-specific rate control layer configuration
        .averageBitrate = 2000000, // 2 Mbps target bitrate
        .maxBitrate = 5000000, // 5 Mbps peak bitrate
        .frameRateNumerator = 30000, // 29.97 fps numerator
        .frameRateDenominator = 1001 // 29.97 fps denominator
    },
    ...
};

VkVideoEncodeRateControlInfoKHR rateControlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_INFO_KHR,
    .pNext = ... // pointer to optional codec-specific rate control configuration
    .flags = 0,
    .rateControlMode = VK_VIDEO_ENCODE_RATE_CONTROL_MODE_VBR_BIT_KHR, // variable bitrate mode
    .layerCount = sizeof(rateControlLayers) / sizeof(rateControlLayers[0]),
    .pLayers = rateControlLayers,
    .virtualBufferSizeInMs = 2000, // virtual buffer size is 2 seconds
    .initialVirtualBufferSizeInMs = 0
};

// Change the rate control configuration for the video session
VkVideoCodingControlInfoKHR controlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR,
    .pNext = &rateControlInfo,
    .flags = VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR
};

vkCmdControlVideoCodingKHR(commandBuffer, &controlInfo);

...

vkCmdEndVideoCodingKHR(commandBuffer, ...);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoEncodeQualityLevelInfoKHR qualityLevelInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR,
    .pNext = NULL,
    .qualityLevel = ... // the new quality level to set
};

VkVideoCodingControlInfoKHR controlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR,
    .pNext = &qualityLevelInfo,
    .flags = VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR
};

vkCmdControlVideoCodingKHR(commandBuffer, &controlInfo);

...

vkCmdEndVideoCodingKHR(commandBuffer, ...);

// Construct the video encode profile with appropriate usage scenario information
// We also include the optional encode usage information here
VkVideoEncodeUsageInfoKHR profileUsageInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_USAGE_INFO_KHR,
    .pNext = ... // pointer to codec-specific profile structure
    .videoUsageHints = ... // usage hints
    .videoContentHints = ... // content hints
    .tuningMode = ... // tuning mode
};

VkVideoProfileInfoKHR profileInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR,
    .pNext = &profileUsageInfo,
    ...
};

// Query the video encode profile capabilities to determine maxQualityLevels
VkVideoEncodeCapabilitiesKHR encodeCapabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_CAPABILITIES_KHR,
    .pNext = ... // pointer to codec-specific capability structure
}

VkVideoCapabilitiesKHR capabilities = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR,
    .pNext = &encodeCapabilities
};

result = vkGetPhysicalDeviceVideoCapabilitiesKHR(physicalDevice, &profileInfo, &capabilities);

// Select a quality level to use between 0 and maxQualityLevels-1
uint32_t selectedQualityLevel = selectQualityLevelFrom(0, encodeCapabilities.maxQualityLevels - 1);

// Query recommended settings for the selected video encode quality level
VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR qualityLevelInfo = {
    .sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR,
    .pNext = NULL,
    .pVideoProfile = &profileInfo,
    .qualityLevel = selectedQualityLevel
};

VkVideoEncodeQualityLevelPropertiesKHR qualityLevelProps = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_PROPERTIES_KHR,
    .pNext = ... // pointer to any codec-specific parameters, if needed
};

result = vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR(physicalDevice, &qualityLevelInfo, &qualityLevelProps);

...

// Video session parameters are always created with respect to the used
// video encode quality level, so create one accordingly
VkVideoEncodeQualityLevelInfoKHR paramsQualityLevelInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR,
    .pNext = ... // pointer to codec-specific parameters creation information
    .qualityLevel = selectedQualityLevel
};

VkVideoSessionParametersCreateInfoKHR paramsCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = &paramsQualityLevelInfo,
    ...
};

VkVideoSessionParametersKHR params = VK_NULL_HANDLE;
result = vkCreateVideoSessionParametersKHR(device, &paramsCreateInfo, NULL, &params);

...

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

// Initialize the video session, set the quality level, and the
// recommended rate control configuration
// NOTE: The application can choose other rate control settings as the
// quality level properties only indicate preference, not a requirement

// Include rate control information
VkVideoEncodeRateControlInfoKHR rateControlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_INFO_KHR,
    .pNext = ... // pointer to optional codec-specific rate control configuration
    .flags = 0,
    .rateControlMode = qualityLevelProps.preferredRateControlMode,
    .layerCount = qualityLevelProps.preferredRateControlLayerCount,
    ...
};

// Include quality level information
VkVideoEncodeQualityLevelInfoKHR qualityLevelInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR,
    .pNext = &rateControlInfo,
    .qualityLevel = selectedQualityLevel
};

// Include all of the RESET, ENCODE_QUALITY_LEVEL, and RATE_CONTROL bits
// because in this example we do an initialization followed by an immediate
// update to the quality level and rate control states
VkVideoCodingControlInfoKHR controlInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR,
    .pNext = &qualityLevelInfo,
    .flags = VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR
           | VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR
           | VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR
};

vkCmdControlVideoCodingKHR(commandBuffer, &controlInfo);

...

vkCmdEndVideoCodingKHR(commandBuffer, ...);

This extension requires the `VK_KHR_synchronization2` extension because the new access flags introduced did not fit in the 32-bit enum `VkAccessFlagBits`. Accordingly, all new pipeline stage and access flags have been added to the corresponding 64-bit enums and no new flags have been added to the legacy 32-bit enums. While the new pipeline stage flag introduced uses bit #27 which would also fit in the legacy `VkPipelineStageFlagBits` enum, there is no real benefit to include it. Instead the bit is marked reserved.

There are multiple points where codec-specific picture information can be provided to a video encode operation. This extension suggests the following convention:

* 
Codec-specific encode parameters are expected to be provided in the `pNext` chain of `VkVideoEncodeInfoKHR`.

* 
Codec-specific reconstructed picture information is expected to be provided in the `pNext` chain of `VkVideoEncodeInfoKHR::pSetupReferenceSlot`.

* 
Codec-specific reference picture information is expected to be provided in the `pNext` chain of the elements of the `VkVideoEncodeInfoKHR::pReferenceSlots` array.

This extension does not define the types of pictures or sub-picture content that can be encoded by a `vkCmdVideoEncodeKHR` command. It is expected that the codec-specific encode extensions built upon this extension define the types of pictures that can be encoded. Furthermore, both codec-specific and codec-independent extensions can expand the set of capabilities introduced here to enable more advanced use cases, as needed.

There are no specific behavioral effects associated with any of the video encode usage and content hints, so the application can specify any combination of these flags. They are included to enable the application to better communicate the intended use case scenario to the implementation.

However, just like any other additional video profile information included in the `pNext` chain of `VkVideoProfileInfoKHR` structures, they are part of the video profile definition, hence whenever matching video profiles have to be provided to an API call, be that queries or resource creation structures, the application must provide identical video encode usage and content hint values. This also applies if the application does not include the `VkVideoEncodeUsageInfoKHR` structure, which is treated equivalently to specifying the structure with `videoUsageHints`, `videoContentHints`, and `tuningMode` equal to `VK_VIDEO_ENCODE_USAGE_DEFAULT_KHR`, `VK_VIDEO_ENCODE_CONTENT_DEFAULT_KHR`, and `VK_VIDEO_ENCODE_TUNING_MODE_DEFAULT_KHR` (or zero), respectively, per the usual conventions of Vulkan.

Unlike the other fields in `VkVideoEncodeUsageInfoKHR`, the tuning mode affects the behavior of video session objects created using them. Different tuning modes may put the hardware in a different mode of operation tuned for the particular use case with significantly different capabilities, as well as quality and performance characteristics.

Through a new query type. We follow the model of pipeline statistics queries to enable adding additional feedback values to the query thus this extension introduces a new `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` query type with the ability to get feedback about the offset and size of the bitstream data produced by video encode operations (amongst other feedback values). We expect that in the future video decode operations will need to support similar feedback values thus a similar query type for video decode operations can be introduced by another extension.

No, in fact only a single query can ever be active within a video coding scope, hence executing a result status query as well as a video encode feedback query for the same video encode operation is not possible. Though it is also not needed, as all query types allow returning a result status, just like availability status. Thus, in practice, result status queries are only needed to be used when no other query type is supported in the particular context, and in case of video encoding applications are expected to only use video encode feedback queries within a video coding scope.

As described in the corresponding section earlier, encoder implementations usually only support a subset of the available encoding tools defined by the corresponding video compression standards and enumerating exhaustively all of these constraints would be impractical and could result in a combinatorial explosion of codec-specific capabilities. Instead, this proposal allows implementations to override any codec-specific parameter values or combinations thereof, so that the resulting parameters comply to the constraints of the target implementation.

Some other video encode APIs do not support implementation overrides, but the drawback of that choice is that implementations may not be able to expose a potentially large set of their encoding tools just because they do not comply to the exact wording of the capabilities defined by these APIs, so this proposal chose to maximize the exposed capabilities instead.

Such minimal and necessary implementation overrides are expected to be applied only when they are absolutely paramount for the correct functioning of the underlying encoder hardware. Additional, optimizing overrides can be, however, explicitly enabled by the application using the `VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR` video session creation flag.

No. Without the ability to override codec-specific parameters, as necessitated by the constraints of the target implementation, the implementation may not be able to guarantee that the generated bitstreams will be compliant with the video compression standard in question.

Accordingly, if the API would allow the application to disable all implementation overrides, that would, for all practical purposes, be equivalent to a flag enabling undefined behavior from the perspective of video compression standard compliance.

For the same reason, if the application chooses to encode codec-specific parameters stored in video session parameters object on its own, regardless of whether the implementation had to apply overrides to those, as reported by `vkGetEncodedVideoSessionParametersKHR`, it risks the final bitstream to be non-compliant.

Applications seeking to only accept bitstreams produced exactly according to the codec-specific parameters they requested can choose to treat the presence of any overrides as an encoding error.

No. First, there are a set of rules that implementations have to comply to when applying any parameter overrides, as defined in detail in the specification. In addition, codec-specific extensions layered on top of this proposal can define their own restrictions about what parameters can implementations override. In practice, it is expected that certain codec-specific parameters that affect the overall behavior of the encoder and that could have an impact on any additional bitstream elements that need to be encoded by the application will never be overridden by the implementation, and thus will be excluded from the set of overridable parameters in the corresponding codec-specific extension.

Over time, it is expected that the set of these guarantees will grow (e.g. by exposing additional capabilities) according to the needs of encoder applications.

No. While the high-level rate control modes (CBR and VBR) defined by this proposal are fairly universal, each rate control mode can be implemented in many different ways while still complying to the fundamental model of the mode itself. In practice, the rate control algorithms employed by implementations significantly differ.

Accordingly, this proposal does not try to describe any specific rate control algorithm for any of the rate control modes introduced, rather it provides a high-level description of the modes and the underlying leaky bucket model used by them.

The only case where the effects of rate control are defined exactly is when rate control is disabled (using `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR`), where implementations must encode the pictures exactly per the application-specified codec-specific quantization parameters.

Unfortunately, implementations cannot provide hard guarantees about always respecting these rate control parameters, as the ability to conform to these is affected by the input content, the encoder tools of the video compression standard or the implementation, including the contents of future pictures, which implementations cannot make predictions about.

However, for all practical purposes, these rate control parameters are expected to be respected when the application chooses them in a way that is in line with the encoded content and the characteristics of the used video compression standard.

Some implementations may support different hardware modes that are enabled in response to the used video encode quality level. This may also have an effect on the constraints related to the available encoding tools and as such may also affect the necessary codec-specific parameter overrides the implementation has to apply. As video session parameters objects are expected to store the already overridden codec-specific parameters typically in an encoded or otherwise optimized format, using a video session parameters object with any video encode quality level would require implementations to also store the original parameters in order to be able to re-encode them according to the needs of the target video encode quality level, which would partially defeat the purpose of video session parameters object.

Instead, this proposal defines video session parameters objects to be created with respect to a specific video encode quality level (when using a video encode profile) and applications have to make sure that they use a compatible video session parameters object in their encode commands according to the current quality level state of the video session.

In practice, this should not have any effect on most encoder applications, as usually they use a single video encode quality level throughout the lifetime of the video session, so the additional complexity resulting from this specialization will only affect advanced applications that may need to operate using different video encode quality levels within a single video stream.

No, they are completely orthogonal, as they control different aspects of the encoder, and they are both always in effect all the time. There is always a currently active video encode quality level and rate control state, which default to quality level zero and implementation-specific rate control state, respectively, when the video encode session is initialized. The used video encode quality level and the rate control settings can be updated subsequently, potentially independently, or together with initialization per the application’s needs. The only relation between video encode quality levels and rate control is that the application can query for each video encode profile and video encode quality level the implementation recommended settings (using `vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR`) that are best suited for the selected quality level and the usage scenario information included in the video encode profile. These include recommendations on the rate control mode to use amongst other codec-independent and codec-specific suggestions. Nonetheless, these are only recommendations and the application can diverge from these if deemed necessary.

No. The rate control information specified to `vkCmdBeginVideoCodingKHR` does not change the state of the video session, it is only expected to specify the current rate control configuration (previously already set through the execution of an appropriate `vkCmdControlVideoCodingKHR` command). This information is needed by some implementations in order to be aware of the current rate control configuration of the video session while recording commands, as some of the rate control state may affect the recorded device commands. When this information is not specified, the implementation will assume that the current rate control mode is set to `VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR`.

The validation layers are expected to detect at command buffer submission time if there is any mismatch between the expected rate control configuration specified to the `vkCmdBeginVideoCodingKHR` command and the actual rate control configuration of the video session at the time the video coding scope is started on the device timeline. If these two sets of state do not match, then the behavior of the implementations is undefined and may result in any sort of misbehavior permitted by the Vulkan specification when valid usage conditions are not met. Accordingly, applications have to make sure to track and specify the expected rate control configuration at the beginning of every video coding scope performing video encode operations in order to attain correct encoder behavior.

In line with the `VK_KHR_video_decode_queue` extension, due to foreseeable implementation limitations that may require the presence of a reconstructed picture resource and/or DPB slot for encoding, revision 12 of this extension changed the requirements on reconstructed picture information as follows:

Specifying reconstructed picture information (i.e. a non-`NULL` `pSetupReferenceSlot`) is made mandatory for all cases except when the video session was created with no DPB slots

Reference picture setup (and, inherently, DPB slot activation) was changed to be subject to codec-specific behavior, meaning that specifying a non-`NULL` `pSetupReferenceSlot` will only trigger reference picture setup if the appropriate codec-specific parameters or semantics indicate so (typically in the form of marking the encoded picture as reference)

As some implementations may use the reconstructed picture resource and/or DPB slot as transient storage during the decoding process, if a non-`NULL` `pSetupReferenceSlot` is specified but no reference picture setup is requested, then the contents of the reconstructed picture resource become undefined and some of the picture references associated with the reconstructed picture’s DPB slot may get invalidated.

This extension is meant to provide only common video encode functionality, thus support for individual video encode profiles using specific video compression standards is left for extensions layered on top of the infrastructure provided here.

Currently the following layered extensions are available:

* 
`VK_KHR_video_encode_h264` - adds support for encoding H.264/AVC video sequences

* 
`VK_KHR_video_encode_h265` - adds support for encoding H.265/HEVC video sequences

* 
`VK_KHR_video_encode_av1` - adds support for encoding AV1 video sequences
