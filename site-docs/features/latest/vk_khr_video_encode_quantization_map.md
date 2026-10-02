# VK_KHR_video_encode_quantization_map

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_encode_quantization_map.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New Video Profile Capabilities](#_new_video_profile_capabilities)
- [3.1._New_Video_Profile_Capabilities](#_new_video_profile_capabilities)
- [3.2. New Image Usage Flags](#_new_image_usage_flags)
- [3.2._New_Image_Usage_Flags](#_new_image_usage_flags)
- [3.3. New Format Feature Flags](#_new_format_feature_flags)
- [3.3._New_Format_Feature_Flags](#_new_format_feature_flags)
- [3.4. Quantization Map Capabilities](#_quantization_map_capabilities)
- [3.4._Quantization_Map_Capabilities](#_quantization_map_capabilities)
- [3.5. Querying Quantization Map Formats](#_querying_quantization_map_formats)
- [3.5._Querying_Quantization_Map_Formats](#_querying_quantization_map_formats)
- [3.6. Codec-Specific Details](#_codec_specific_details)
- [3.6._Codec-Specific_Details](#_codec_specific_details)
- [3.6.1. H.264 Encode](#_h_264_encode)
- [3.6.1._H.264_Encode](#_h_264_encode)
- [3.6.2. H.265 Encode](#_h_265_encode)
- [3.6.2._H.265_Encode](#_h_265_encode)
- [3.6.3. AV1 Encode](#_av1_encode)
- [3.6.3._AV1_Encode](#_av1_encode)
- [3.7. Using Quantization Maps](#_using_quantization_maps)
- [3.7._Using_Quantization_Maps](#_using_quantization_maps)
- [4. Examples](#_examples)
- [4.1. Enumerate supported quantization map formats for a video profile](#_enumerate_supported_quantization_map_formats_for_a_video_profile)
- [4.1._Enumerate_supported_quantization_map_formats_for_a_video_profile](#_enumerate_supported_quantization_map_formats_for_a_video_profile)
- [4.2. Using quantization maps](#_using_quantization_maps_2)
- [4.2._Using_quantization_maps](#_using_quantization_maps_2)
- [5. Issues](#_issues)
- [5.1. Do we need separate extensions for each video codec?](#_do_we_need_separate_extensions_for_each_video_codec)
- [5.1._Do_we_need_separate_extensions_for_each_video_codec?](#_do_we_need_separate_extensions_for_each_video_codec)
- [5.2. How should quantization maps be provided to the implementation?](#_how_should_quantization_maps_be_provided_to_the_implementation)
- [5.2._How_should_quantization_maps_be_provided_to_the_implementation?](#_how_should_quantization_maps_be_provided_to_the_implementation)
- [5.3. Can all implementations support quantization delta maps, or do some implementations only support absolute quantization maps?](#_can_all_implementations_support_quantization_delta_maps_or_do_some_implementations_only_support_absolute_quantization_maps)
- [5.3._Can_all_implementations_support_quantization_delta_maps,_or_do_some_implementations_only_support_absolute_quantization_maps?](#_can_all_implementations_support_quantization_delta_maps_or_do_some_implementations_only_support_absolute_quantization_maps)
- [5.4. Are quantization parameters clamped to the allowed range before or after applying the quantization map?](#_are_quantization_parameters_clamped_to_the_allowed_range_before_or_after_applying_the_quantization_map)
- [5.4._Are_quantization_parameters_clamped_to_the_allowed_range_before_or_after_applying_the_quantization_map?](#_are_quantization_parameters_clamped_to_the_allowed_range_before_or_after_applying_the_quantization_map)
- [5.5. What is the granularity of quantization maps (i.e. the texel size of the rectangular blocks each quantization control value applies to)?](#_what_is_the_granularity_of_quantization_maps_i_e_the_texel_size_of_the_rectangular_blocks_each_quantization_control_value_applies_to)
- [5.5._What_is_the_granularity_of_quantization_maps_(i.e._the_texel_size_of_the_rectangular_blocks_each_quantization_control_value_applies_to)?](#_what_is_the_granularity_of_quantization_maps_i_e_the_texel_size_of_the_rectangular_blocks_each_quantization_control_value_applies_to)
- [5.6. Should we report the supported quantization map granularities through individual entries as a VkExtent2D or should we use a bitmask where each flag corresponds to a supported block size?](#_should_we_report_the_supported_quantization_map_granularities_through_individual_entries_as_a_vkextent2d_or_should_we_use_a_bitmask_where_each_flag_corresponds_to_a_supported_block_size)
- [5.6._Should_we_report_the_supported_quantization_map_granularities_through_individual_entries_as_a_VkExtent2D_or_should_we_use_a_bitmask_where_each_flag_corresponds_to_a_supported_block_size?](#_should_we_report_the_supported_quantization_map_granularities_through_individual_entries_as_a_vkextent2d_or_should_we_use_a_bitmask_where_each_flag_corresponds_to_a_supported_block_size)
- [5.7. Do we need a capability for the maximum extent of quantization maps?](#_do_we_need_a_capability_for_the_maximum_extent_of_quantization_maps)
- [5.7._Do_we_need_a_capability_for_the_maximum_extent_of_quantization_maps?](#_do_we_need_a_capability_for_the_maximum_extent_of_quantization_maps)
- [5.8. Can subregions of a larger image be used as a quantization map?](#_can_subregions_of_a_larger_image_be_used_as_a_quantization_map)
- [5.8._Can_subregions_of_a_larger_image_be_used_as_a_quantization_map?](#_can_subregions_of_a_larger_image_be_used_as_a_quantization_map)
- [5.9. Should we require an opt-in at video session creation time to use quantization maps?](#_should_we_require_an_opt_in_at_video_session_creation_time_to_use_quantization_maps)
- [5.9._Should_we_require_an_opt-in_at_video_session_creation_time_to_use_quantization_maps?](#_should_we_require_an_opt_in_at_video_session_creation_time_to_use_quantization_maps)
- [5.10. Can applications use quantization maps only on a subset of the pictures encoded within a video stream?](#_can_applications_use_quantization_maps_only_on_a_subset_of_the_pictures_encoded_within_a_video_stream)
- [5.10._Can_applications_use_quantization_maps_only_on_a_subset_of_the_pictures_encoded_within_a_video_stream?](#_can_applications_use_quantization_maps_only_on_a_subset_of_the_pictures_encoded_within_a_video_stream)
- [5.11. Why does this proposal introduce the VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR capability flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h264_capability_mb_qp_diff_wraparound_bit_khr_capability_flag)
- [5.11._Why_does_this_proposal_introduce_the_VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR_capability_flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h264_capability_mb_qp_diff_wraparound_bit_khr_capability_flag)
- [5.12. Why does this proposal introduce the VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR capability flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h265_capability_cu_qp_diff_wraparound_bit_khr_capability_flag)
- [5.12._Why_does_this_proposal_introduce_the_VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR_capability_flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h265_capability_cu_qp_diff_wraparound_bit_khr_capability_flag)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New Video Profile Capabilities](#_new_video_profile_capabilities)
[3.2. New Image Usage Flags](#_new_image_usage_flags)
[3.3. New Format Feature Flags](#_new_format_feature_flags)
[3.4. Quantization Map Capabilities](#_quantization_map_capabilities)
[3.5. Querying Quantization Map Formats](#_querying_quantization_map_formats)
[3.6. Codec-Specific Details](#_codec_specific_details)
[3.7. Using Quantization Maps](#_using_quantization_maps)

[4. Examples](#_examples)

[4.1. Enumerate supported quantization map formats for a video profile](#_enumerate_supported_quantization_map_formats_for_a_video_profile)
[4.2. Using quantization maps](#_using_quantization_maps_2)

[5. Issues](#_issues)

[5.1. Do we need separate extensions for each video codec?](#_do_we_need_separate_extensions_for_each_video_codec)
[5.2. How should quantization maps be provided to the implementation?](#_how_should_quantization_maps_be_provided_to_the_implementation)
[5.3. Can all implementations support quantization delta maps, or do some implementations only support absolute quantization maps?](#_can_all_implementations_support_quantization_delta_maps_or_do_some_implementations_only_support_absolute_quantization_maps)
[5.4. Are quantization parameters clamped to the allowed range before or after applying the quantization map?](#_are_quantization_parameters_clamped_to_the_allowed_range_before_or_after_applying_the_quantization_map)
[5.5. What is the granularity of quantization maps (i.e. the texel size of the rectangular blocks each quantization control value applies to)?](#_what_is_the_granularity_of_quantization_maps_i_e_the_texel_size_of_the_rectangular_blocks_each_quantization_control_value_applies_to)
[5.6. Should we report the supported quantization map granularities through individual entries as a `VkExtent2D` or should we use a bitmask where each flag corresponds to a supported block size?](#_should_we_report_the_supported_quantization_map_granularities_through_individual_entries_as_a_vkextent2d_or_should_we_use_a_bitmask_where_each_flag_corresponds_to_a_supported_block_size)
[5.7. Do we need a capability for the maximum extent of quantization maps?](#_do_we_need_a_capability_for_the_maximum_extent_of_quantization_maps)
[5.8. Can subregions of a larger image be used as a quantization map?](#_can_subregions_of_a_larger_image_be_used_as_a_quantization_map)
[5.9. Should we require an opt-in at video session creation time to use quantization maps?](#_should_we_require_an_opt_in_at_video_session_creation_time_to_use_quantization_maps)
[5.10. Can applications use quantization maps only on a subset of the pictures encoded within a video stream?](#_can_applications_use_quantization_maps_only_on_a_subset_of_the_pictures_encoded_within_a_video_stream)
[5.11. Why does this proposal introduce the `VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR` capability flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h264_capability_mb_qp_diff_wraparound_bit_khr_capability_flag)
[5.12. Why does this proposal introduce the `VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR` capability flag?](#_why_does_this_proposal_introduce_the_vk_video_encode_h265_capability_cu_qp_diff_wraparound_bit_khr_capability_flag)

This document outlines a proposal that enables fine grained control of codec-specific quantization parameters in video encode operations.

Currently, the video encode extensions support the following application control over the codec-specific quantization parameters used by encoder implementations:

Specifying explicit quantization parameters for individual codec-specific picture subregions when rate control is disabled (e.g. in case of H.264 encode, specifying a constant QP value to use for each slice)

Specifying the range of quantization parameters the implementation can use when rate control is enabled (e.g. in case of H.264 encode, specifying minimum and maximum QP values to use for each picture type)

However, it is common for applications to need finer control over the selection of quantization parameters to improve the quality in specific regions of the pictures or to better control the distribution of bitstream budget between high-frequency and low-frequency picture regions.

The following new controls have been considered for inclusion in this proposal:

Enable specifying explicit quantization parameters for individual regions of the encoded picture at a finer granularity when rate control is disabled

Enable specifying quantization adjustment values for individual regions of the encoded picture when rate control is enabled

As there are implementations that support all of these controls, it is desired to enable support for all of them.

The following options have been considered to express the mapping of application-specified quantization adjustment parameters to individual regions of the encoded picture for (1) and (2):

* 
Use a quantization map (2D grid of quantization adjustment parameters) that control the quantization parameters for individual grid-aligned rectangular blocks of the encoded picture (e.g. on a per coding block basis)

* 
Specify a list of (overlapping or non-overlapping) rectangular regions and corresponding quantization adjustment parameters to use

Support for quantization maps is common, but implementations supporting quantization rectangle lists are not. While specifying quantization adjustment parameters for list of rectangles can typically be implemented in terms of quantization maps, this proposal does not include support for them in order to limit the scope of this proposal and to avoid encoders having to implement them through emulation.

When it comes to the form in which quantization adjustment parameters are specified, the following options have been considered:

* 
Specify absolute quantization parameter values (e.g. in case of H.264 encode, specify a map of absolute QP values to use for individual regions)

* 
Specify relative quantization parameter values (e.g. in case of H.264 encode, specify a map of QP delta values to add/subtract from the QP values that would otherwise be used according to the current rate control configuration)

* 
Specify relative "emphasis" values that indirectly control the relative quantization parameter values chosen by the implementation, indicating the "importance" of individual regions

Specifying absolute quantization parameter values only makes sense when rate control is disabled. However, as existing APIs already provide controls to set the absolute value of quantization parameters at various codec-specific granularities, supporting absolute quantization maps seems unnecessary, as the same effect can be achieved by combining existing absolute quantization parameter controls with a quantization delta map (e.g. in case of H.264 encode, per-slice constant QP can be combined with a QP delta map to achieve the same effect as an absolute QP map could provide).

Accordingly, this proposal suggests to introduce the following new controls:

The ability to specify quantization delta maps to directly control the relative quantization parameter values on a per-block basis for all rate control modes (including when rate control is disabled)

The ability to specify "emphasis" maps to indirectly control the relative quantization parameter values on a per-block basis when rate control is enabled

The new capabilities of this proposal are exposed through video encode profile capability flags in `VkVideoEncodeCapabilitiesKHR::flags`:

* 
`VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR` indicates support for quantization delta maps (e.g. in case of H.264 encode, support for QP delta maps)

* 
`VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR` indicates support for emphasis maps

These video encode capability flags can only be exposed for video encode profiles targeting video codecs for which the extension defines the codec-specific behavior.

The following additional H.264 encode profile capability is introduced:

* 
`VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR` indicates support for wraparound during the calculation of the QP values of subsequent macroblocks

If the implementation does not support `VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR` then the maximum QP difference across subsequent macroblocks is limited to the [-(26 + QpBdOffsetY / 2), 25 + QpBdOffsetY / 2] range.

Similarly, the following additional H.265 encode profile capability is introduced:

* 
`VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR` indicates support for wraparound during the calculation of the QP values of subsequent coding units

If the implementation does not support `VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR` then the maximum QP difference across subsequent coding units is limited to the [-(26 + QpBdOffsetY / 2), 25 + QpBdOffsetY / 2] range.

Quantization delta maps and emphasis maps are represented by image objects. Accordingly, this proposal introduces the following new image usage flags:

* 
`VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR` to request quantization delta map usage

* 
`VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR` to request emphasis map usage

Just like in case of other video-specific image usages, support for these flags and their use in combination with other image parameters depends on the used video profile and thus the set of supported image formats and other creation parameters for them can be enumerated using the `vkGetPhysicalDeviceVideoFormatPropertiesKHR` command, as discussed later.

This proposal also introduces a new optimal image layout to use with quantization maps called `VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR`.

To indicate which formats are compatible with the new video encode usage flags, the following new format feature flags are introduced:

* 
`VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR` indicates support for quantization delta map usage

* 
`VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR` indicates support for emphasis map usage

Just like in case of other video-specific format features, the presence of the format flags alone, as returned by the various format queries, is not sufficient to indicate that an image with that format is usable with video encoding using any particular video encode profile. Actual compatibility with a specific video encode profile has to be verified using the `vkGetPhysicalDeviceVideoFormatPropertiesKHR` command, as discussed later.

typedef struct VkVideoEncodeQuantizationMapCapabilitiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkExtent2D            maxQuantizationMapExtent;
} VkVideoEncodeQuantizationMapCapabilitiesKHR;

`maxQuantizationMapExtent` is the maximum extent of quantization map images.

Quantization maps have additional restrictions compared to other Vulkan images: they have to be 2D, single sampled images with no mip levels, and they are limited to the maximum extent indicated by `maxQuantizationMapExtent` as well as any video coding specific format restrictions, as returned by a corresponding call to `vkGetPhysicalDeviceVideoFormatPropertiesKHR`.

As with all other video coding image usage flags, applications can query the list of supported formats for quantization delta maps and emphasis maps by specifying the corresponding image usage flag in the `VkPhysicalDeviceVideoFormatInfoKHR` structure passed to `vkGetPhysicalDeviceVideoFormatPropertiesKHR`.

In addition to the common video format properties returned in `VkVideoFormatPropertiesKHR`, the following additional properties are returned for quantization maps:

typedef struct VkVideoFormatQuantizationMapPropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkExtent2D            quantizationMapTexelSize;
} VkVideoFormatQuantizationMapPropertiesKHR;

`quantizationMapTexelSize` is the size of the block of encode picture texels corresponding to each texel in the quantization map (i.e. the granularity).

Emphasis maps always have single channel unsigned normalized integer format and `VK_FORMAT_R8_UNORM` is always supported, while quantization delta map formats are codec-specific in nature.

This section describes the details for all video codecs supported by this proposal.

In case of H.264 encode profiles, quantization delta maps are expected to contain QP delta values and thus the supported formats will always be single channel integer formats. The final QP value used to encode individual H.264 macroblocks is calculated by applying the QP delta map value corresponding to the macroblock as follows:

* 
If rate control is disabled, the final QP value is the sum of the QP delta map value and the constant QP value specified for the slice in question

* 
If rate control is enabled, the QP value is the sum of the QP delta map value and the QP value determined by rate control, and the final QP value is clamped to the range of QP values allowed based on the profile capabilities and the configured rate control settings

The allowed range of values that can be used in the texels of the QP delta map can be retrieved by including the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling `vkGetPhysicalDeviceVideoCapabilitiesKHR` with an H.264 encode profile:

typedef struct VkVideoEncodeH264QuantizationMapCapabilitiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    int32_t               minQpDelta;
    int32_t               maxQpDelta;
} VkVideoEncodeH264QuantizationMapCapabilitiesKHR;

In case of H.265 encode profiles, quantization delta maps are expected to contain QP delta values and thus the supported formats will always be single channel integer formats. The final QP value used to encode individual H.265 coding blocks is calculated by applying the QP delta map value corresponding to the coding block as follows:

* 
If rate control is disabled, the final QP value is the sum of the QP delta map value and the constant QP value specified for the slice segment in question

* 
If rate control is enabled, the QP value is the sum of the QP delta map value and the QP value determined by rate control, and the final QP value is clamped to the range of QP values allowed based on the profile capabilities and the configured rate control settings

The allowed range of values that can be used in the texels of the QP delta map can be retrieved by including the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling `vkGetPhysicalDeviceVideoCapabilitiesKHR` with an H.265 encode profile:

typedef struct VkVideoEncodeH265QuantizationMapCapabilitiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    int32_t                             minQpDelta;
    int32_t                             maxQpDelta;
} VkVideoEncodeH265QuantizationMapCapabilitiesKHR;

The H.265 video compression standard allows for different CTB sizes. Some implementations support different quantization map texel sizes depending on the effective CTB size, as indicated in the active SPS. Accordingly, this proposal also includes information about the CTB sizes a particular quantization map video format is compatible with. This is returned in the `compatibleCtbSizes` member of the following new structure that can be included in the `pNext` chain of `VkVideoFormatPropertiesKHR` when calling `vkGetPhysicalDeviceVideoFormatPropertiesKHR` with an H.265 encode profile and with `VkPhysicalDeviceVideoFormatInfoKHR::imageUsage` including one of the quantization map usage flags:

typedef struct VkVideoFormatH265QuantizationMapPropertiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    VkVideoEncodeH265CtbSizeFlagsKHR    compatibleCtbSizes;
} VkVideoFormatH265QuantizationMapPropertiesKHR;

On implementations where the quantization map texel size is independent from the used CTB size, `compatibleCtbSizes` is expected to match `VkVideoEncodeH265CapabilitiesKHR::ctbSizes` (assuming quantization maps are supported for all CTB sizes supported by the video profile).

On implementations where the quantization map texel size depends on the used CTB size, separate entries will be returned by `vkGetPhysicalDeviceVideoFormatPropertiesKHR` with different values returned in `compatibleCtbSizes`.

`compatibleCtbSizes` does not limit the application from using any specific quantization map texel size supported by the implementation, but the used quantization map texel size may have an effect on codec-specific parameter overrides that the implementation has to perform as the use of certain quantization map texel sizes may limit the set of H.265 coding block or CTB sizes the implementation can encode with, which may require corresponding overrides in the H.265 SPS and PPS parameters.

In case of AV1 encode profiles, quantization delta maps are expected to contain quantizer index delta values and thus the supported formats will always be single channel integer formats. The final quantizer index value used to encode individual AV1 blocks is calculated by applying the quantizer index delta map value corresponding to the block as follows:

* 
If rate control is disabled, the final quantizer index value is the sum of the quantizer index delta map value and the constant quantizer index value specified for the frame

* 
If rate control is enabled, the quantizer index value is the sum of the quantizer index delta map value and the quantizer index value determined by rate control, and the final quantizer index value is clamped to the range of quantizer index values allowed based on the profile capabilities and the configured rate control settings

The allowed range of values that can be used in the texels of the quantizer index delta map can be retrieved by including the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR` when calling `vkGetPhysicalDeviceVideoCapabilitiesKHR` with an AV1 encode profile:

typedef struct VkVideoEncodeAV1QuantizationMapCapabilitiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    int32_t                             minQIndexDelta;
    int32_t                             maxQIndexDelta;
} VkVideoEncodeAV1QuantizationMapCapabilitiesKHR;

The AV1 video compression standard allows for different superblock sizes. Some implementations support different quantization map texel sizes depending on the effective superblock size, as indicated in the active sequence header. Accordingly, this proposal also includes information about the superblock sizes a particular quantization map video format is compatible with. This is returned in the `compatibleSuperblockSizes` member of the following new structure that can be included in the `pNext` chain of `VkVideoFormatPropertiesKHR` when calling `vkGetPhysicalDeviceVideoFormatPropertiesKHR` with an AV1 encode profile and with `VkPhysicalDeviceVideoFormatInfoKHR::imageUsage` including one of the quantization map usage flags:

typedef struct VkVideoFormatAV1QuantizationMapPropertiesKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    VkVideoEncodeAV1SuperblockSizeFlagsKHR  compatibleSuperblockSizes;
} VkVideoFormatAV1QuantizationMapPropertiesKHR;

On implementations where the quantization map texel size is independent from the used superblock size, `compatibleSuperblockSizes` is expected to match `VkVideoEncodeAV1CapabilitiesKHR::superblockSizes` (assuming quantization maps are supported for all superblock sizes supported by the video profile).

On implementations where the quantization map texel size depends on the used superblock size, separate entries will be returned by `vkGetPhysicalDeviceVideoFormatPropertiesKHR` with different values returned in `compatibleSuperblockSizes`.

`compatibleSuperblockSizes` does not limit the application from using any specific quantization map texel size supported by the implementation, but the used quantization map texel size may have an effect on codec-specific parameter overrides that the implementation has to perform as the use of certain quantization map texel sizes may limit the set of AV1 superblock sizes the implementation can encode with, which may require corresponding overrides in the AV1 sequence header parameters.

Applications have to opt in to using quantization maps in a video session using one of the following new video session creation flags:

* 
`VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR` specifies that the use of quantization delta maps in video encode operations is allowed

* 
`VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR` specifies that the use of emphasis maps in video encode operations is allowed

These flags are mutually exclusive and can only be specified for video sessions created with video encode profiles supporting the corresponding capability flags and may have an impact on the device memory requirements of the video session.

Furthermore, as the use of specific quantization map texel sizes may affect the parameter overrides the implementation has to apply (e.g. overriding the range of used H.265 coding block sizes), applications have to opt in to using a specific quantization map texel size for a video session parameters object using the new `VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR` video session parameters creation flag, and specifying the used quantization map texel size through the following new structure included in the `pNext` chain of `VkVideoSessionParametersCreateInfoKHR`:

typedef struct VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    VkExtent2D            quantizationMapTexelSize;
} VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR;

Applications can reuse the same video session with different quantization map texel sizes, however, they have to create a new video session parameters object specific to each quantization map texel size in order to switch between them across video sequences.

The use of quantization maps in individual video encode commands is requested by specifying one of the following new flags in `VkVideoEncodeInfoKHR::flags`:

* 
`VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR` indicates the use of a quantization delta map in the video encode operations

* 
`VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR` indicates the use of an emphasis map in the video encode operations

When either of these flags is specified, the following new structure included in the `pNext` chain of `VkVideoEncodeInfoKHR` is used to specify the quantization map resource itself:

typedef struct VkVideoEncodeQuantizationMapInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    VkImageView           quantizationMap;
    VkExtent2D            quantizationMapExtent;
} VkVideoEncodeQuantizationMapInfoKHR;

uint32_t formatCount;

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
    .pNext = &profileListInfo,
    .imageUsage = VK_IMAGE_USAGE_VIDEO_ENCODE_{QUANTIZATION_DELTA|EMPHASIS}_MAP_BIT_KHR
};

vkGetPhysicalDeviceVideoFormatPropertiesKHR(physicalDevice, &formatInfo, &formatCount, NULL);

VkVideoFormatPropertiesKHR* formatProps = calloc(formatCount, sizeof(VkVideoFormatPropertiesKHR));
VkVideoFormatQuantizationMapPropertiesKHR* quantizationMapProps = calloc(formatCount, sizeof(VkVideoFormatQuantizationMapPropertiesKHR));

for (uint32_t i = 0; i 

// Create video session with quantization map support
VkVideoSessionKHR videoSession = VK_NULL_HANDLE;
VkVideoSessionCreateInfoKHR videoSessionCreateInfo = { ... };
// Include the corresponding session creation flag
videoSessionCreateInfo.flags |= VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_{QUANTIZATION_DELTA|EMPHASIS}_MAP_BIT_KHR;
vkCreateVideoSessionKHR(device, &videoSessionCreateInfo, NULL, &videoSession);

// Create video session parameters against the used quantization map texel size
VkVideoSessionParametersKHR videoSessionParameters = VK_NULL_HANDLE;
VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR vspQuantizationMapInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = ... // pointer to additional video session parameters create infos
    .quantizationMapTexelSize = ... // one of the supported texel sizes reported by vkGetPhysicalDeviceVideoFormatPropertiesKHR
};
VkVideoSessionParametersCreateInfoKHR videoSessionParametersCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR,
    .pNext = &vspQuantizationMapInfo,
    .flags = VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR | ...
    ...
};
vkCreateVideoSessionParametersKHR(device, &videoSessionParametersCreateInfo, NULL, &videoSessionParameters);

// Create quantization map image and image view
VkImage image = VK_NULL_HANDLE;
VkImageView imageView = VK_NULL_HANDLE;
VkImageCreateInfo imageCreateInfo = { ... };
// Include the corresponding image usage flag
imageCreateInfo.usage |= VK_IMAGE_USAGE_VIDEO_ENCODE_{QUANTIZATION_DELTA|EMPHASIS}_MAP_BIT_KHR;
vkCreateImage(device, &imageCreateInfo, NULL, &image);
...
vkCreateImageView(device, &imageViewCreateInfo, NULL, &imageView);

// Fill quantization map (e.g. with a compute shader, or using the CPU directly or with an intermediate transfer)
...

// Encode frame using quantization map
vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoEncodeQuantizationMapInfoKHR encodeQuantizationMapInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_INFO_KHR,
    .pNext = ... // pointer to codec-specific picture information structure
    .quantizationMap = imageView,
    .quantizationMapExtent = ... // the extent of the quantization map
}

VkVideoEncodeInfoKHR encodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR,
    .pNext = &encodeQuantizationMapInfo,
    .flags = VK_VIDEO_ENCODE_WITH_{QUANTIZATION_DELTA|EMPHASIS}_MAP_BIT_KHR,
    ...
};

vkCmdEncodeVideoKHR(commandBuffer, &encodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

No. While quantization parameter formats and semantics are specific to individual video codecs, the general mechanism is uniform enough to cover support for all video codecs using a single extension. The first revision of this extension covers all currently supported video encode profiles and requires that the new video encode profile capabilities must not be exposed for any video encode profile targeting a codec for which this extension does not specify any specific behavior. This enables future revisions of this extension to introduce support for new video codecs without any backward- or forward-compatibility issues.

The following options were considered:

Provide the quantization maps as a two-dimensional array to encode commands (i.e. as host buffers)

Provide the quantization maps as buffers to encode commands (i.e. as a device resource with transparent representation)

Provide the quantization maps as images to encode commands (i.e. as a device resource with potentially opaque representation)

Options (2) and (3) provide the additional flexibility that the quantization maps can be efficiently device-generated. Considering that it is common to do so through device-side analysis of the encode input picture, option (1) did not seem reasonable.

This proposal chose (3), as the representation, including the format and layout of these maps may be implementation-specific. This still leaves the possibility of transparent representations open, as implementations can choose to expose support for quantization maps in the form of pitch-linear images.

Yes. In order to support quantization delta maps when rate control is disabled, implementations only have to support combining the quantization delta values in the quantization map with the absolute quantization parameters specified for the picture (e.g. the per-slice constant QP value for H.264 encode).

After applying the quantization map.

When rate control is disabled, the sum of the quantization map value and the picture’s quantization value (e.g. the per-slice constant QP value for H.264 encode) is clamped to the supported range of quantization values, as returned in the corresponding codec-specific video profile capabilities.

When rate control is enabled, the sum of the quantization map value and the quantization value determined by rate control is clamped to the supported rate of quantization values, as returned in the corresponding codec-specific video profile capabilities. If the supported range is restricted to a subrange in the rate control configuration, then this value is further clamped to that subrange.

Different implementations have different answers to this question:

* 
Some implementations use fixed size blocks

* 
Some implementations allow the granularity to be selected from a range of different block sizes

* 
Some implementations require the quantization map block size to match codec-specific coding block sizes

Supporting a common block size thus would require implicit conversions of the quantization maps or other potentially expensive operations that may not even be supportable on implementations without appropriate format conversion capabilities.

Accordingly, this granularity cannot be a simple video profile capability, and may even depend on other codec-specific parameters (for example, the codec-specific block size for codecs like H.265 which support multiple CTB sizes).

This proposal reuses the `vkGetPhysicalDeviceVideoFormatPropertiesKHR` query with additional result structures to enable querying the list of quantization map formats and the granularity at which they need to be specified.

Using a bitmask could avoid the need to have to return multiple entries when multiple granularities are supported for a particular input configuration, but would require enumerating all supportable granularities as flags. Instead, this proposal simply reports separate entries for each supported granularity. This also works better with the resolution of the issue above.

Yes. Quantization maps are expected to be much smaller than the encoded picture and some implementations only support limited extents for quantization maps. A new video profile capability indicates the maximum extent supported for quantization maps and they are expected to be as large as the maximum coded extent divided by the smallest supported quantization map texel size.

Yes. This is in line with the general design of the video coding features to allow reusing the same resources across different resolutions. However, the used quantization map subregion is always expected to start at texel offset (0,0) of the corresponding image subresource.

Yes. This may also enable some implementations to reduce the device memory usage of video sessions when there is no need to use quantization maps.

Yes. Implementations do not require quantization maps to be provided for every video encode operation.

Some implementations do not support the macroblock QP wraparound logic in equation 7-37 of the H.264 specification and thus cannot encode QP differences across subsequent macroblocks that are outside of the [-(26 + QpBdOffsetY / 2), 25 + QpBdOffsetY / 2] range. As this limitation has an observable effect when using QP delta maps, the presence of this capability flag is used to indicate that the implementation does not have any limitation on the QP values used across subsequent macroblocks.

Some implementations do not support the coding unit QP wraparound logic in equation 8-283 of the H.265 specification and thus cannot encode QP differences across subsequent coding units that are outside of the [-(26 + QpBdOffsetY / 2), 25 + QpBdOffsetY / 2] range. As this limitation has an observable effect when using QP delta maps, the presence of this capability flag is used to indicate that the implementation does not have any limitation on the QP values used across subsequent coding units.
