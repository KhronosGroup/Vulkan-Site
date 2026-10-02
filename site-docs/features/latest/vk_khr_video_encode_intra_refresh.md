# VK_KHR_video_encode_intra_refresh

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_encode_intra_refresh.html

## Table of Contents

- [1. Problem statement](#_problem_statement)
- [1._Problem_statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New Video Profile Capabilities](#_new_video_profile_capabilities)
- [3.1._New_Video_Profile_Capabilities](#_new_video_profile_capabilities)
- [3.2. Codec-Specific Details](#_codec_specific_details)
- [3.2._Codec-Specific_Details](#_codec_specific_details)
- [3.2.1. H.264 Encode](#_h_264_encode)
- [3.2.1._H.264_Encode](#_h_264_encode)
- [3.2.2. H.265 Encode](#_h_265_encode)
- [3.2.2._H.265_Encode](#_h_265_encode)
- [3.2.3. AV1 Encode](#_av1_encode)
- [3.2.3._AV1_Encode](#_av1_encode)
- [3.3. Using Intra Refresh](#_using_intra_refresh)
- [3.3._Using_Intra_Refresh](#_using_intra_refresh)
- [4. Examples](#_examples)
- [4.1. Creating a video encode session with intra refresh support](#_creating_a_video_encode_session_with_intra_refresh_support)
- [4.1._Creating_a_video_encode_session_with_intra_refresh_support](#_creating_a_video_encode_session_with_intra_refresh_support)
- [4.2. Encode a typical intra refresh frame referring to the previous intra-refreshed frame](#_encode_a_typical_intra_refresh_frame_referring_to_the_previous_intra_refreshed_frame)
- [4.2._Encode_a_typical_intra_refresh_frame_referring_to_the_previous_intra-refreshed_frame](#_encode_a_typical_intra_refresh_frame_referring_to_the_previous_intra_refreshed_frame)
- [5. Issues](#_issues)
- [5.1. Is intra refresh performed per slice (segment)?](#_is_intra_refresh_performed_per_slice_segment)
- [5.1._Is_intra_refresh_performed_per_slice_(segment)?](#_is_intra_refresh_performed_per_slice_segment)
- [5.2. Are the actual extents of intra refresh regions exposed to the application?](#_are_the_actual_extents_of_intra_refresh_regions_exposed_to_the_application)
- [5.2._Are_the_actual_extents_of_intra_refresh_regions_exposed_to_the_application?](#_are_the_actual_extents_of_intra_refresh_regions_exposed_to_the_application)
- [5.3. Should we require the slice (segment) count to match used the intra refresh cycle duration?](#_should_we_require_the_slice_segment_count_to_match_used_the_intra_refresh_cycle_duration)
- [5.3._Should_we_require_the_slice_(segment)_count_to_match_used_the_intra_refresh_cycle_duration?](#_should_we_require_the_slice_segment_count_to_match_used_the_intra_refresh_cycle_duration)
- [5.4. Should we provide a query for the application to determine the location and extent of intra refresh regions?](#_should_we_provide_a_query_for_the_application_to_determine_the_location_and_extent_of_intra_refresh_regions)
- [5.4._Should_we_provide_a_query_for_the_application_to_determine_the_location_and_extent_of_intra_refresh_regions?](#_should_we_provide_a_query_for_the_application_to_determine_the_location_and_extent_of_intra_refresh_regions)
- [5.5. Can specific intra refresh regions for a given coded extent and intra refresh cycle duration be empty?](#_can_specific_intra_refresh_regions_for_a_given_coded_extent_and_intra_refresh_cycle_duration_be_empty)
- [5.5._Can_specific_intra_refresh_regions_for_a_given_coded_extent_and_intra_refresh_cycle_duration_be_empty?](#_can_specific_intra_refresh_regions_for_a_given_coded_extent_and_intra_refresh_cycle_duration_be_empty)
- [5.6. Should we enforce with valid usage clauses that the intra refresh cycle is completed in exactly intraRefreshCycleDuration number of frames with subsequent intraRefreshIndex values?](#_should_we_enforce_with_valid_usage_clauses_that_the_intra_refresh_cycle_is_completed_in_exactly_intrarefreshcycleduration_number_of_frames_with_subsequent_intrarefreshindex_values)
- [5.6._Should_we_enforce_with_valid_usage_clauses_that_the_intra_refresh_cycle_is_completed_in_exactly_intraRefreshCycleDuration_number_of_frames_with_subsequent_intraRefreshIndex_values?](#_should_we_enforce_with_valid_usage_clauses_that_the_intra_refresh_cycle_is_completed_in_exactly_intrarefreshcycleduration_number_of_frames_with_subsequent_intrarefreshindex_values)
- [5.7. Should we restrict referencing during an intra refresh cycle to the previously encoded frame?](#_should_we_restrict_referencing_during_an_intra_refresh_cycle_to_the_previously_encoded_frame)
- [5.7._Should_we_restrict_referencing_during_an_intra_refresh_cycle_to_the_previously_encoded_frame?](#_should_we_restrict_referencing_during_an_intra_refresh_cycle_to_the_previously_encoded_frame)
- [5.8. Are there any restrictions on the encoded picture types that can be used with intra refresh?](#_are_there_any_restrictions_on_the_encoded_picture_types_that_can_be_used_with_intra_refresh)
- [5.8._Are_there_any_restrictions_on_the_encoded_picture_types_that_can_be_used_with_intra_refresh?](#_are_there_any_restrictions_on_the_encoded_picture_types_that_can_be_used_with_intra_refresh)
- [5.9. Should we allow pictures encoded without intra refresh to have active reference pictures with dirty intra refresh regions?](#_should_we_allow_pictures_encoded_without_intra_refresh_to_have_active_reference_pictures_with_dirty_intra_refresh_regions)
- [5.9._Should_we_allow_pictures_encoded_without_intra_refresh_to_have_active_reference_pictures_with_dirty_intra_refresh_regions?](#_should_we_allow_pictures_encoded_without_intra_refresh_to_have_active_reference_pictures_with_dirty_intra_refresh_regions)

## Content

Table of Contents

[1. Problem statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New Video Profile Capabilities](#_new_video_profile_capabilities)
[3.2. Codec-Specific Details](#_codec_specific_details)
[3.3. Using Intra Refresh](#_using_intra_refresh)

[4. Examples](#_examples)

[4.1. Creating a video encode session with intra refresh support](#_creating_a_video_encode_session_with_intra_refresh_support)
[4.2. Encode a typical intra refresh frame referring to the previous intra-refreshed frame](#_encode_a_typical_intra_refresh_frame_referring_to_the_previous_intra_refreshed_frame)

[5. Issues](#_issues)

[5.1. Is intra refresh performed per slice (segment)?](#_is_intra_refresh_performed_per_slice_segment)
[5.2. Are the actual extents of intra refresh regions exposed to the application?](#_are_the_actual_extents_of_intra_refresh_regions_exposed_to_the_application)
[5.3. Should we require the slice (segment) count to match used the intra refresh cycle duration?](#_should_we_require_the_slice_segment_count_to_match_used_the_intra_refresh_cycle_duration)
[5.4. Should we provide a query for the application to determine the location and extent of intra refresh regions?](#_should_we_provide_a_query_for_the_application_to_determine_the_location_and_extent_of_intra_refresh_regions)
[5.5. Can specific intra refresh regions for a given coded extent and intra refresh cycle duration be empty?](#_can_specific_intra_refresh_regions_for_a_given_coded_extent_and_intra_refresh_cycle_duration_be_empty)
[5.6. Should we enforce with valid usage clauses that the intra refresh cycle is completed in exactly `intraRefreshCycleDuration` number of frames with subsequent `intraRefreshIndex` values?](#_should_we_enforce_with_valid_usage_clauses_that_the_intra_refresh_cycle_is_completed_in_exactly_intrarefreshcycleduration_number_of_frames_with_subsequent_intrarefreshindex_values)
[5.7. Should we restrict referencing during an intra refresh cycle to the previously encoded frame?](#_should_we_restrict_referencing_during_an_intra_refresh_cycle_to_the_previously_encoded_frame)
[5.8. Are there any restrictions on the encoded picture types that can be used with intra refresh?](#_are_there_any_restrictions_on_the_encoded_picture_types_that_can_be_used_with_intra_refresh)
[5.9. Should we allow pictures encoded without intra refresh to have active reference pictures with dirty intra refresh regions?](#_should_we_allow_pictures_encoded_without_intra_refresh_to_have_active_reference_pictures_with_dirty_intra_refresh_regions)

This document outlines a proposal that enables intra refresh in video encode operations.

Inserting intra-only frames (frames that do not depend on reference frames) in the video stream and then not referencing frames before such an intra-only frame in subsequent frames in decoding order enables application to make sure that transmission and/or decoding errors do not propagate across such intra-only frame boundaries. Some video compression standards refer to this technique as "instantaneous decoder refresh".

While this technique solves the problem of error propagation, intra-only frames are usually much larger, in terms of encoded bitstream size, compared to frames that take advantage of inter-frame prediction. This could result in spikes in the bitrate usage which is undesirable for streaming and other use cases that depend on or prefer a more uniform bitrate usage.

Intra refresh is a technique where decoder refresh is done through a series of frames instead of a single frame. This is achieved by refreshing the entire coded extent of the stream one image subregion at a time, while also making sure that other, already refreshed regions of the frame that use inter-frame prediction, do not use any data in dirty (unrefreshed) regions of reference frames for prediction. This enables applications to avoid error propagation across intra refresh cycles without introducing sudden spikes in the bitstream usage as the cost of the refresh is amortized across a series of subsequent frames.

This proposal introduces APIs necessary for reliably implementing intra refresh in video encode sessions.

The following new controls have been considered for inclusion in this proposal:

Enable applications to select the region of a frame that is requested to be intra refreshed (i.e. encoded with intra blocks)

Enable applications to restrict the regions of reference frames that can be used for prediction of already refreshed regions in order to ensure that no error propagation happens across intra refresh cycles as a result of using dirty (unrefreshed) reference data for prediction

The video encode APIs already provide some controls that enable (1). In particular, the H.264 and H.265 encode APIs allow coding individual H.264 slices and H.265 slice segments of a frame, respectively, as I slices. This, however, is not sufficient to reliably implement intra refresh for the following reasons:

* 
It does not solve (2), i.e. it does not enable restricting reference prediction to already refreshed regions

* 
Not all implementations can do per-slice (segment) intra refresh, some implementations split the frame into intra refresh regions in other ways (e.g. coding block columns or rows)

* 
Many implementations can do intra refresh even when the frame is not split into multiple slices or slice segments

This justifies the definition of intra refresh regions to be orthogonal to frame slices or slice segments, at least in the general case. Furthermore, the way the coded extent is split into intra refresh regions varies across implementations, often according to complex implementation-specific and coded extent dependent rules. Accordingly, this proposal does not mandate or define the rules of how an implementation splits the coded extent into intra refresh regions.

Such an abstract definition of intra refresh regions enables both application and implementation portability, and also makes it simpler to provide a solution for (2) that fits the limitations of implementations when it comes to restricting the reference frame regions usable for inter-frame prediction of already refreshed regions.

The following new concepts are introduced:

* 
Intra refresh cycle - a series of frames that use intra refresh to perform decoder refresh of the entire coded extent

* 
Intra refresh cycle duration - the number of frames across which decoder refresh of the entire coded extent completes and, inherently, the number of intra refresh regions the coded extent is split into

* 
Intra refresh index - the ordinal index of the frame participating in the intra refresh cycle (between zero, inclusive, and the intra refresh cycle duration, exclusive)

Intra refresh capabilities can be retrieved by including the following new structure in the `pNext` chain of `VkVideoCapabilitiesKHR`:

typedef struct VkVideoEncodeIntraRefreshCapabilitiesKHR {
    VkStructureType                       sType;
    void*                                 pNext;
    VkVideoEncodeIntraRefreshModeFlagsKHR intraRefreshModes;
    uint32_t                              maxIntraRefreshCycleDuration;
    uint32_t                              maxIntraRefreshActiveReferencePictures;
    VkBool32                              partitionIndependentIntraRefreshRegions;
    VkBool32                              nonRectangularIntraRefreshRegions;
} VkVideoEncodeIntraRefreshCapabilitiesKHR;

`intraRefreshModes` is a bitmask indicating the supported intra refresh modes:

* 
`VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR` indicates support for performing intra refresh per picture partition (e.g. per H.264 slice or per H.265 slice segment), one picture partition at a time

* 
`VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_BASED_BIT_KHR` indicates support for block-based intra refresh, at the granularity of implementation-defined groups of coding blocks

* 
`VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_ROW_BASED_BIT_KHR` indicates support for row-based intra refresh, at the granularity of implementation-defined groups of coding block rows

* 
`VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_COLUMN_BASED_BIT_KHR` indicates support for column-based intra refresh, at the granularity of implementation-defined groups of coding block columns

`maxIntraRefreshCycleDuration` is the maximum intra refresh cycle duration, in terms of number of frames, that the implementation supports.

`maxIntraRefreshActiveReferencePictures` is the maximum number of active reference pictures that can be used when the current picture is encoded with intra refresh or it uses active reference pictures encoded with intra refresh.

`partitionIndependentIntraRefreshRegions` indicates whether the implementation supports intra refresh regions that are independent of the picture partitioning used during encoding. If it is `VK_FALSE`, then pictures cannot be encoded with multiple picture partitions (e.g. H.264 slices or H.265 slice segments) with any intra refresh mode other than `VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR`. If it is `VK_TRUE`, then pictures can be encoded with multiple picture partitions, independent of the used intra refresh mode.

`nonRectangularIntraRefreshRegions` indicates whether the implementation supports non-rectangular intra refresh regions. If it is `VK_FALSE`, then intra refresh regions can only be rectangular which may limit the intra refresh cycle duration to values that allow for the coded extent to be split into rectangular intra refresh regions according to the used intra refresh mode, typically restricting the intra refresh regions to entire coding block rows or columns.

This section describes the codec-specific details related to intra refresh.

This proposal introduces a new H.264 encode capability flag called `VK_VIDEO_ENCODE_H264_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR` indicating support for encoding B pictures with intra refresh.
Encoding B pictures with intra refresh enabled is only supported if this capability flag is reported for the used H.264 encode profile.

When using the `VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR` intra refresh mode, then the used intra refresh duration must always match the number of H.264 slices the frames are encoded with.

When using any of the other intra refresh modes and `partitionIndependentIntraRefreshRegions` is not supported, then pictures can only be encoded with a single H.264 slice.

This proposal introduces a new H.265 encode capability flag called `VK_VIDEO_ENCODE_H265_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR` indicating support for encoding B pictures with intra refresh.
Encoding B pictures with intra refresh enabled is only supported if this capability flag is reported for the used H.265 encode profile.

When using the `VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR` intra refresh mode, then the used intra refresh duration must always match the number of H.265 slice segments the frames are encoded with.

When using any of the other intra refresh modes and `partitionIndependentIntraRefreshRegions` is not supported, then pictures can only be encoded with a single H.265 slice segment.

This proposal introduces a new AV1 encode capability flag called `VK_VIDEO_ENCODE_AV1_CAPABILITY_COMPOUND_PREDICTION_INTRA_REFRESH_BIT_KHR` indicating support for encoding frames using compound prediction modes with intra refresh.
Encoding frames using (uni- or bidirectional) compound prediction mode with intra refresh enabled is only supported if this capability flag is reported for the used AV1 encode profile.

In case of AV1 encode, the partitioning of the encoded picture into AV1 tiles is not entirely controlled by the application. While the application can specify the preferred tile partitioning for the encoded picture, the implementation is allowed to override that partitioning in order to accommodate for implementation limitations.

Accordingly, there are no specific restrictions imposed on the application when using the `VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR` intra refresh mode with an AV1 encode profile supporting it, but using this intra refresh mode may impose further restrictions on the way the implementation can perform the partitioning of the encoded pictures into AV1 tiles.

In a similar vein, the `partitionIndependentIntraRefreshRegions` capability is only indicative for AV1 encode profiles.

Applications have to opt in to using intra refresh in a video session by including the following new structure in the `pNext` chain of `VkVideoSessionCreateInfoKHR`:

typedef struct VkVideoEncodeSessionIntraRefreshCreateInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    VkVideoEncodeIntraRefreshModeFlagBitsKHR  intraRefreshMode;
} VkVideoEncodeSessionIntraRefreshCreateInfoKHR;

`intraRefreshMode` specifies the intra refresh mode to use in the video session.

Applications have to opt in to using intra refresh by specifying the new `VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR` flag in `VkVideoEncodeInfoKHR::flags` and including the following new structure in the `pNext` chain of `VkVideoEncodeInfoKHR`:

typedef struct VkVideoEncodeIntraRefreshInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              intraRefreshCycleDuration;
    uint32_t              intraRefreshIndex;
} VkVideoEncodeIntraRefreshInfoKHR;

`intraRefreshCycleDuration` specifies the used intra refresh cycle duration. During an intra refresh cycle, this value is expected to match across the frames participating in the intra refresh cycle, but can change between subsequent intra refresh cycles.

`intraRefreshIndex` specifies the ordinal index of the encoded frame within the intra refresh cycle and is expected to be between 0 and `intraRefreshCycleDuration`-1. If `VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR` is not specified in `VkVideoEncodeInfoKHR::flags`, then the value of `intraRefreshIndex` is ignored.

In order to restrict reference prediction to already refreshed regions, the application needs to include the following new structure in the `pNext` chain of the corresponding element of `VkVideoEncodeInfoKHR::pReferenceSlots`:

typedef struct VkVideoReferenceIntraRefreshInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              dirtyIntraRefreshRegions;
} VkVideoReferenceIntraRefreshInfoKHR;

`dirtyIntraRefreshRegions` specifies the number of intra refresh regions that are still dirty (not refreshed), with respect to the currently used intra refresh cycle duration. In practice, for a given intra refresh cycle, the `dirtyIntraRefreshRegions` of a reference frame is one less than the difference of the `intraRefreshCycleDuration` and `intraRefreshIndex` used to encode that frame (i.e. `dirtyIntraRefreshRegions = intraRefreshCycleDuration - intraRefreshIndex - 1`). When this structure is not specified, a `dirtyIntraRefreshRegions` value of zero is assumed, as usual.

`dirtyIntraRefreshRegions` can only be non-zero if the current frame is encoded with intra refresh and this proposal only allows using partially dirty references that refer to the previous frame within the intra refresh cycle, i.e. `dirtyIntraRefreshRegions` of any partially dirty references must equal `intraRefreshCycleDuration - intraRefreshIndex` where `intraRefreshIndex` is the index of the current frame within the intra refresh cycle. This, however, does not limit including additional reference frames with zero `dirtyIntraRefreshRegions`.

It is expected that the reference frame was encoded with the same intra refresh cycle duration, otherwise incorrect data may end up being used for sample prediction, as the intra refresh cycle duration and the corresponding intra refresh region splitting is expected to be invariant for the duration of the intra refresh cycle.

The rules for reference prediction for a given intra refresh region `i` of a frame encoded with intra refresh are as follows:

* 
If `i` is less than the `intraRefreshIndex` of the encoded frame, then prediction is not allowed based on any intra refresh region `j` of a reference if `j` is greater than or equal to the difference of `intraRefreshCycleDuration` and `dirtyIntraRefreshRegions` of that reference (clean regions cannot be predicted with a dirty region)

* 
If `i` is greater than the `intraRefreshIndex` of the encoded frame, then prediction is allowed based on any intra refresh region of any reference (dirty regions can be predicted with either clean or dirty region)

VkVideoSessionKHR videoSession = VK_NULL_HANDLE;

VkVideoEncodeSessionIntraRefreshCreateInfoKHR intraRefreshCreateInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_INTRA_REFRESH_CREATE_INFO_KHR,
    .pNext = NULL,
    .intraRefreshMode = ... // one of the supported intra refresh modes
};

VkVideoSessionCreateInfoKHR createInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_SESSION_CREATE_INFO_KHR,
    .pNext = intraRefreshCreateInfo,
    ...
};

vkCreateVideoSessionKHR(device, &createInfo, NULL, &videoSession);

vkCmdBeginVideoCodingKHR(commandBuffer, ...);

VkVideoEncodeIntraRefreshInfoKHR intraRefreshInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PICTURE_INFO_KHR,
    .pNext = ... // pointer to codec-specific picture information structure
    .intraRefreshCycleDuration = ... // used intra refresh cycle duration (fixed for a single cycle)
    .intraRefreshIndex = ... // ordinal index of the frame within the intra refresh cycle
};

VkVideoReferenceIntraRefreshInfoKHR referenceIntraRefreshInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_INTRA_REFRESH_INFO_KHR,
    .pNext = ... // pointer to codec-specific reference picture information structure
    .dirtyIntraRefreshRegions = intraRefreshInfo.intraRefreshCycleDuration - intraRefreshInfo.intraRefreshIndex
};

VkVideoReferenceSlotInfoKHR referenceSlotInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR,
    .pNext = &referenceIntraRefreshInfo,
    ...
};

VkVideoEncodeInfoKHR encodeInfo = {
    .sType = VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR,
    .pNext = &intraRefreshInfo,
    .flags = VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR, // this is an intra refresh frame
    ...
    .referenceSlotCount = 1,
    .pReferenceSlots = &referenceSlotInfo
};

vkCmdEncodeVideoKHR(commandBuffer, &encodeInfo);

vkCmdEndVideoCodingKHR(commandBuffer, ...);

Not necessarily. While certain implementations may (only) support intra refresh on a per slice (segment) basis, this proposal does not require that.

No. There are too many implementation variations when it comes to intra refresh:

* 
Some may support intra refresh per slice (segment)

* 
Some may support intra refresh per coding block column(s) / row(s)

* 
Some may support intra refresh according to other grouping of coding blocks

Yes, at least when the selected intra refresh mode is per slice (segment) intra refresh.

Not in this extension. It is not even clear how such a query could look like, considering that intra refresh regions may not be rectangular on some implementations and may not consist of subsequent coding blocks on other implementations. A general query therefore is difficult to provide.

Yes. This is necessary to account for implementation-specific limitations on how a specific coded extent can be split into intra refresh regions for a particular video codec operation and encoder configuration.

No. While this is the typical use case, this proposal does not restrict applications from attempting to use more complex patterns. Instead, the proposal only defines the rules for intra refresh and reference prediction restriction. However, if the provided controls are used incorrectly, the resulting bitstream may not be resilient to error propagation, as likely intended.

Yes. While some implementations can support unrestricted referencing of pictures with dirty intra refresh regions, such functionality is left to a future extension.

Some implementations are not able to produce H.264 and/or H.265 B picture syntax when intra refresh is used. This applies both to B pictures encoded with intra refresh and to B pictures referencing pictures encoded with intra refresh (i.e. reference pictures having dirty intra refresh regions).
Accordingly, optional H.264 and H.265 encode capability flags are introduced to indicate support for encoding B pictures with intra refresh.
Similar restrictions exist for AV1 encode on some implementations where using compound prediction modes is incompatible with intra refresh, so another optional AV1 encode capability flag is introduced to indicate support for encoding using compound prediction mode with intra refresh.

No. Not all implementations seem to support this and it is not a requirement for typical intra refresh use cases.
