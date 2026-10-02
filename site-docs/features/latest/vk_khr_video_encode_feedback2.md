# VK_KHR_video_encode_feedback2

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_video_encode_feedback2.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [4.1. Collecting per picture partition feedback entries](#_collecting_per_picture_partition_feedback_entries)
- [4.1._Collecting_per_picture_partition_feedback_entries](#_collecting_per_picture_partition_feedback_entries)
- [5. Issues](#_issues)
- [5.1. Should this proposal introduce per picture partition feedback?](#_should_this_proposal_introduce_per_picture_partition_feedback)
- [5.1._Should_this_proposal_introduce_per_picture_partition_feedback?](#_should_this_proposal_introduce_per_picture_partition_feedback)
- [5.2. Should we include a feedback value reporting the number of encoded picture partitions?](#_should_we_include_a_feedback_value_reporting_the_number_of_encoded_picture_partitions)
- [5.2._Should_we_include_a_feedback_value_reporting_the_number_of_encoded_picture_partitions?](#_should_we_include_a_feedback_value_reporting_the_number_of_encoded_picture_partitions)
- [5.3. How are per picture partition feedback results written to the destination memory by commands such as vkGetQueryPoolResults and vkCmdCopyQueryPoolResults?](#_how_are_per_picture_partition_feedback_results_written_to_the_destination_memory_by_commands_such_as_vkgetquerypoolresults_and_vkcmdcopyquerypoolresults)
- [5.3._How_are_per_picture_partition_feedback_results_written_to_the_destination_memory_by_commands_such_as_vkGetQueryPoolResults_and_vkCmdCopyQueryPoolResults?](#_how_are_per_picture_partition_feedback_results_written_to_the_destination_memory_by_commands_such_as_vkgetquerypoolresults_and_vkcmdcopyquerypoolresults)
- [5.4. What happens if the encode feedback query pool was reserved with fewer per picture partition feedback entries than the number of picture partitions the encoded picture has?](#_what_happens_if_the_encode_feedback_query_pool_was_reserved_with_fewer_per_picture_partition_feedback_entries_than_the_number_of_picture_partitions_the_encoded_picture_has)
- [5.4._What_happens_if_the_encode_feedback_query_pool_was_reserved_with_fewer_per_picture_partition_feedback_entries_than_the_number_of_picture_partitions_the_encoded_picture_has?](#_what_happens_if_the_encode_feedback_query_pool_was_reserved_with_fewer_per_picture_partition_feedback_entries_than_the_number_of_picture_partitions_the_encoded_picture_has)
- [5.5. Are some of the whole-picture and per picture partition encode feedback flags mutually exclusive (e.g. bitstream offset and size)?](#_are_some_of_the_whole_picture_and_per_picture_partition_encode_feedback_flags_mutually_exclusive_e_g_bitstream_offset_and_size)
- [5.5._Are_some_of_the_whole-picture_and_per_picture_partition_encode_feedback_flags_mutually_exclusive_(e.g._bitstream_offset_and_size)?](#_are_some_of_the_whole_picture_and_per_picture_partition_encode_feedback_flags_mutually_exclusive_e_g_bitstream_offset_and_size)
- [5.6. Are picture partitions tightly packed, i.e. is the bitstream offset of a picture partition always equal to the sum of the bitstream offset and size of the previous picture partition?](#_are_picture_partitions_tightly_packed_i_e_is_the_bitstream_offset_of_a_picture_partition_always_equal_to_the_sum_of_the_bitstream_offset_and_size_of_the_previous_picture_partition)
- [5.6._Are_picture_partitions_tightly_packed,_i.e._is_the_bitstream_offset_of_a_picture_partition_always_equal_to_the_sum_of_the_bitstream_offset_and_size_of_the_previous_picture_partition?](#_are_picture_partitions_tightly_packed_i_e_is_the_bitstream_offset_of_a_picture_partition_always_equal_to_the_sum_of_the_bitstream_offset_and_size_of_the_previous_picture_partition)
- [5.7. Are the per picture partition bitstream offsets monotonically increasing?](#_are_the_per_picture_partition_bitstream_offsets_monotonically_increasing)
- [5.7._Are_the_per_picture_partition_bitstream_offsets_monotonically_increasing?](#_are_the_per_picture_partition_bitstream_offsets_monotonically_increasing)
- [5.8. Can per picture partition feedback values be captured also when only a single picture partition is encoded?](#_can_per_picture_partition_feedback_values_be_captured_also_when_only_a_single_picture_partition_is_encoded)
- [5.8._Can_per_picture_partition_feedback_values_be_captured_also_when_only_a_single_picture_partition_is_encoded?](#_can_per_picture_partition_feedback_values_be_captured_also_when_only_a_single_picture_partition_is_encoded)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)

[4.1. Collecting per picture partition feedback entries](#_collecting_per_picture_partition_feedback_entries)

[5. Issues](#_issues)

[5.1. Should this proposal introduce per picture partition feedback?](#_should_this_proposal_introduce_per_picture_partition_feedback)
[5.2. Should we include a feedback value reporting the number of encoded picture partitions?](#_should_we_include_a_feedback_value_reporting_the_number_of_encoded_picture_partitions)
[5.3. How are per picture partition feedback results written to the destination memory by commands such as `vkGetQueryPoolResults` and `vkCmdCopyQueryPoolResults`?](#_how_are_per_picture_partition_feedback_results_written_to_the_destination_memory_by_commands_such_as_vkgetquerypoolresults_and_vkcmdcopyquerypoolresults)
[5.4. What happens if the encode feedback query pool was reserved with fewer per picture partition feedback entries than the number of picture partitions the encoded picture has?](#_what_happens_if_the_encode_feedback_query_pool_was_reserved_with_fewer_per_picture_partition_feedback_entries_than_the_number_of_picture_partitions_the_encoded_picture_has)
[5.5. Are some of the whole-picture and per picture partition encode feedback flags mutually exclusive (e.g. bitstream offset and size)?](#_are_some_of_the_whole_picture_and_per_picture_partition_encode_feedback_flags_mutually_exclusive_e_g_bitstream_offset_and_size)
[5.6. Are picture partitions tightly packed, i.e. is the bitstream offset of a picture partition always equal to the sum of the bitstream offset and size of the previous picture partition?](#_are_picture_partitions_tightly_packed_i_e_is_the_bitstream_offset_of_a_picture_partition_always_equal_to_the_sum_of_the_bitstream_offset_and_size_of_the_previous_picture_partition)
[5.7. Are the per picture partition bitstream offsets monotonically increasing?](#_are_the_per_picture_partition_bitstream_offsets_monotonically_increasing)
[5.8. Can per picture partition feedback values be captured also when only a single picture partition is encoded?](#_can_per_picture_partition_feedback_values_be_captured_also_when_only_a_single_picture_partition_is_encoded)

[6. Further Functionality](#_further_functionality)

This document outlines a proposal to enable additional feedback query entries for video encode operations.

The `VK_KHR_video_encode_queue` extension introduced video encode feedback queries (`VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR`). This proposal builds upon that functionality to enable retrieving the following additional statistics and feedback data for video encode operations:

* 
Feedback about the average, minimum, and maximum quantization used across the picture

* 
Feedback about the number of pixels encoded with intra prediction

* 
Feedback about the number of pixels encoded with inter prediction

* 
Feedback about the number of pixels encoded as skipped blocks

* 
Feedback about the number of encoded picture partitions

In addition, this proposal introduces the ability to retrieve statistics about individual picture partitions encoded:

* 
The encode status of the picture partition

* 
The byte offset in the output bitstream corresponding to a picture partition

* 
The bitstream byte size corresponding to a picture partition

The already existing `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` query type provides sufficient infrastructure for the new whole-picture statistics values, but `VK_KHR_video_encode_queue` did not provide any means to include per picture partition feedback:

The following options have been considered in order to enable support for per picture partition feedback:

Add a new mode setting that enables collecting feedback either for the entire picture of for each picture partition separately

Add a new query type that allows capturing per picture partition feedback

Extend the existing video encode feedback query type to allow capturing additional, per picture partition feedback

There are certain video encode feedback values that may only be retrieved for the entire encoded picture, therefore option 1 is not suitable.

Option 2 has the disadvantage that it requires implementations to be able to output feedback to two separate query pools which imposes additional requirements on the implementation that not all implementations can support or can support efficiently.

Option 3 has the drawback that each query slot needs to have sufficient storage to store multiple entries of each result, one for each encoded picture partition. However, as the number of picture partitions within a picture is expected to be relatively small in all cases, this is not expected to be a problem in practice. Therefore, this proposal chose option 3.

The following new structure is introduced that can be included in the `pNext` chain of `VkVideoCapabilitiesKHR` when querying the capabilities of a video encode profile:

typedef struct VkVideoEncodeFeedback2CapabilitiesKHR {
    VkStructureType                           sType;
    void*                                     pNext;
    uint32_t                                  maxPerPartitionFeedbackEntries;
    VkVideoEncodePerPartitionFeedbackFlagsKHR supportedPerPartitionEncodeFeedbackFlags;
} VkVideoEncodeFeedback2CapabilitiesKHR;

`maxPerPartitionFeedbackEntries` indicates the maximum number of entries the application can request for each query slot when creating a query pool of type `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR`. When `maxPerPartitionFeedbackEntries` is zero, it indicates that the implementation does not support per picture partition feedback.

`supportedPerPartitionEncodeFeedbackFlags` indicates the set of supported per picture partition encode feedback flags.

Support for the new video encode feedback values are indicated by the corresponding bits of `VkVideoEncodeCapabilitiesKHR::supportedEncodeFeedbackFlags`.

The following new video encode feedback flags are added by this proposal:

* 
`VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR` requests capturing the average quantization used across the encoded coding blocks (e.g. average QP value for H.264 and H.265 encoding)

* 
`VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR` requests capturing the minimum quantization used across the encoded coding blocks (e.g. minimum QP value for H.264 and H.265 encoding)

* 
`VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR` requests capturing the maximum quantization used across the encoded coding blocks (e.g. maximum QP value for H.264 and H.265 encoding)

* 
`VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR` requests capturing the number of pixels encoded as intra blocks

* 
`VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR` requests capturing the number of pixels encoded as inter blocks

* 
`VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR` requests capturing the number of pixels encoded as skipped blocks

* 
`VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR` requests capturing the number of encoded picture partitions

All implementations are expected to support at least `VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR`, `VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR`, `VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR`, and `VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR`.

Note that counting intra and inter pixels is subject to support for counting skipped pixels and the used video codec.

In case of H.264 and H.265 only inter blocks can be skipped blocks, therefore the inter pixel count always includes the skipped pixel count, regardless of whether skipped pixel count feedback is supported or not.

In case of AV1 both intra and inter blocks can be skipped blocks, thus, depending on how the implementation counts skipped pixels, the captured intra and inter pixel counts may or may not include skipped pixels. While it is recommended for implementations to report skipped pixels as part of the reported inter and intra pixel counts, not all implementations will do so. Therefore this proposal allows for the following behaviors:

* 
If an implementation does not support `VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR` for an AV1 encode profile, then the reported intra and inter pixel counts will always include any skipped pixels.

* 
Otherwise, skipped pixels may or may not be included in the intra and inter pixel counts.

This proposal adds support for the following per picture partition video encode feedback flags:

* 
`VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_STATUS_BIT_KHR` requests capturing the encode status of the encoded picture partitions

* 
`VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BUFFER_OFFSET_BIT_KHR` requests capturing the offsets of bitstream corresponding to the encoded picture partitions relative to `dstBufferOffset`

* 
`VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BYTES_WRITTEN_BIT_KHR` requests capturing the bitstream size corresponding to the encoded picture partitions

Support for per picture partition feedback is optional, but all values will be available on implementations that support it.

In order to enable a `VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR` query pool capturing per picture partition feedback, the following new structure needs to be included in the `pNext` chain of `VkQueryPoolCreateInfo`:

typedef struct VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    uint32_t                                  maxPerPartitionFeedbackEntries;
    VkVideoEncodePerPartitionFeedbackFlagsKHR perPartitionEncodeFeedbackFlags;
} VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR;

`maxPerPartitionFeedbackEntries` specifies the number of per picture partition feedback entries to reserve in each query pool slot.

`perPartitionEncodeFeedbackFlags` specifies the per picture partition feedback values to capture.

// For simplicity, we define here the maximum picture partitions we intend to support
#define MAX_ENCODE_PICTURE_PARTITIONS 16

// Assuming the video profile supports all whole-picture and per picture partition
// encode feedback values, we enable all of them when creating the query pool
// In practice, not all implementations and video profiles will support all of these
VkQueryPool queryPool = VK_NULL_HANDLE;

VkVideoProfileInfoKHR profileInfo = {
    ...
};

VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR perPartitionFeedbackInfo = {
    .sType = VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_CREATE_INFO_KHR,
    .pNext = &profileInfo,
    .maxPerPartitionFeedbackEntries = MAX_ENCODE_PICTURE_PARTITIONS,
    .perPartitionEncodeFeedbackFlags = VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_STATUS_BIT_KHR
                                     | VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR
                                     | VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR
};

VkQueryPoolVideoEncodeFeedbackCreateInfoKHR feedbackInfo = {
    .sType = VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR,
    .pNext = &perPartitionFeedbackInfo,
    .encodeFeedbackFlags = VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR
                         | VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR
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
// Execute encode operation that captures feedback into query pool slot #0
...

// We retrieve the captured feedback values, status, and per picture partition feedback values
struct {
    uint32_t                bitstreamBufferOffset;
    uint32_t                bitstreamBytesWritten;
    VkBool32                hasOverrides;
    int32_t                 averageQuantization;
    int32_t                 minQuantization;
    int32_t                 maxQuantization;
    uint32_t                intraPixels;
    uint32_t                interPixels;
    uint32_t                skippedPixels;
    uint32_t                picturePartitionCount;
    VkQueryResultStatusKHR  status;

    struct {
        VkQueryResultStatusKHR  status;
        uint32_t                bitstreamBufferOffset;
        uint32_t                bitstreamBytesWritten;
    } perPicturePartition[MAX_ENCODE_PICTURE_PARTITIONS];
} results;

vkGetQueryPoolResults(device, queryPool, 0, 1,
                      sizeof(results), &results, sizeof(results),
                      VK_QUERY_RESULT_WITH_STATUS_BIT_KHR);

if (results.status == VK_QUERY_RESULT_STATUS_NOT_READY_KHR /* 0 */) {
    // Query result not ready yet
    ...
} else if (results.status > 0) {
    // Video encode operation was successful, we can use feedback data
    ...
    for (uint32_t picturePartitionIndex = 0;
         picturePartitionIndex 

Yes. There are many applications where the encoded bitstream is expected to be consumed on a per picture partition basis.

As the number of encoded picture partitions is subject to implementation overrides, this proposal introduces a new feedback value to allow the implementations to report the number of encoded picture partitions.

Video encode feedbacks output the results as follows:

* 
Whole-picture feedback values are written for each encode feedback flag enabled in `VkQueryPoolVideoEncodeFeedbackCreateInfoKHR::encodeFeedbackFlags` in the order of the bit indices of the corresponding flags

* 
If `VK_QUERY_RESULT_WITH_AVAILABILITY_BIT` or `VK_QUERY_RESULT_WITH_STATUS_BIT_KHR` is specified, then the query result availability or status is written, respectively.

This is then followed by per picture partition feedback values according to the algorithm below:

* 
For each encoded picture partition:

* 
per picture partition feedback values are written for each per picture partition encode feedback flag enabled in `VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR::perPartitionEncodeFeedbackFlags` in the order of the bit indices of the corresponding flags (including per picture partition status, if requested)

That means per picture partition feedback results are written in an array-of-structures form where each array element at index `i` includes the enabled feedback values for the picture partition index `i`.

One answer to this problem is to remove the `maxPerPartitionFeedbackEntries` capability and query pool creation parameter, and define that implementations always have to reserve sufficient storage for the maximum possible partitions they can encode. This makes everything simpler but may impose worst case storage requirements on the query pools.

Other options, in increasing levels of guarantees, include:

The encoded bitstream may have undefined contents and all feedback results are undefined

All feedback results are undefined

All per picture partition feedback results are undefined

Only the per picture partition feedback results corresponding to picture partitions beyond the reserved storage are lost

Option (4) is preferred because it is the most application-friendly and implementations do not seem to have issues with providing those guarantees. In particular, these guarantees can always be provided if the implementation reserves sufficient storage for the maximum possible partitions they can encode.

This proposal always limits the number of per picture partition feedback results to the `maxPerPartitionFeedbackEntries` query pool creation parameter, therefore there is no way for an application to retrieve any results beyond that.

No. Whole-picture and per picture encode feedback values can be captured from a single encode command using a single query.

No. There are some exceptions. In particular for AV1 the syntax element for `tile_size_minus_1` is not considered to be included in the tile. It may also be possible that some implementations have to include padding units between individual picture partitions albeit no known implementation needs to do that.

Yes.

Yes.

None.
