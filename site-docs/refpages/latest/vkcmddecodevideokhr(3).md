# vkCmdDecodeVideoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDecodeVideoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDecodeVideoKHR - Launch a video decode operation

To launch video decode operations, call:

// Provided by VK_KHR_video_decode_queue
void vkCmdDecodeVideoKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoDecodeInfoKHR*                 pDecodeInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pDecodeInfo` is a pointer to a [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html) structure
specifying the parameters of the video decode operations.

Each call issues one or more video decode operations.
The implicit parameter `opCount` corresponds to the number of video
decode operations issued by the command.
After calling this command, the
[active query index](../../../../spec/latest/chapters/queries.html#queries-operation-active-query-index) of each
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active) query is incremented by `opCount`.

Currently each call to this command results in the issue of a single video
decode operation.

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the `pNext`
chain of `pDecodeInfo` includes a [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure with its `queryPool` member specifying a valid
`VkQueryPool` handle, then this command will execute a query for each
video decode operation issued by it.

Active Reference Picture Information

The list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) used by
a video decode operation is a list of image subregions used as the source of
[reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) data and related parameters, and is
derived from the [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures provided as
the elements of the `pDecodeInfo->pReferenceSlots` array.
For each element of `pDecodeInfo->pReferenceSlots`, one or more elements
are added to the active reference picture list, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#decode-codec-specific-semantics).
Each element of this list contains the following information:

* 
The image subregion within the image subresource
[referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by the
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) used as the reference
picture.

* 
The [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index the reference picture is associated
with.

* 
The codec-specific reference information related to the reference
picture.

Reconstructed Picture Information

Information related to the optional [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) used by a video decode operation is derived from the
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure pointed to by
`pDecodeInfo->pSetupReferenceSlot`, if not `NULL`, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#decode-codec-specific-semantics), and consists
of the following:

* 
The image subregion within the image subresource
[referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by the
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) used as the
reconstructed picture.

* 
The [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index to use for picture reconstruction.

* 
The codec-specific reference information related to the reconstructed
picture.

Specifying a valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure in
`pDecodeInfo->pSetupReferenceSlot` is always required, unless the video
session was created with
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` equal to zero.
However, the DPB slot identified by
`pDecodeInfo->pSetupReferenceSlot→slotIndex` is only
[activated](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) with the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) specified in
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` if reference
picture setup is requested according to the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#decode-codec-specific-semantics).

If reconstructed picture information is specified, and
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` refers to a
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) different than that of
the [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture), but reference picture
setup is not requested, the contents of the [video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) corresponding to the reconstructed picture will be
**undefined** after the video decode operation.

|  | Some implementations may always output the reconstructed picture or use it
| --- | --- |
as temporary storage during the video decode operation even when the
reconstructed picture is not marked for future reference. |

Decode Output Picture Information

Information related to the [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture)
used by a video decode operation is derived from
`pDecodeInfo->dstPictureResource` and any codec-specific parameters
provided in the `pDecodeInfo->pNext` chain, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#decode-codec-specific-semantics), and consists
of the following:

* 
The image subregion within the image subresource
[referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by the
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) used as the decode
output picture.

* 
The codec-specific picture information related to the decode output
picture.

Several limiting values are defined below that are referenced by the
relevant valid usage statements of this command.

* 
Let `uint32_t activeReferencePictureCount` be the size of the list of
active reference pictures used by the video decode operation.
Unless otherwise defined, `activeReferencePictureCount` is set to
the value of `pDecodeInfo->referenceSlotCount`.

If the bound video session was created with an [     H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), then let `activeReferencePictureCount` be
the value of `pDecodeInfo->referenceSlotCount` plus the number of
elements of the `pDecodeInfo->pReferenceSlots` array that have a
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure included in their
`pNext` chain with both
`pStdReferenceInfo->flags.top_field_flag` and
`pStdReferenceInfo->flags.bottom_field_flag` set.

|  | This means that the elements of `pDecodeInfo->pReferenceSlots` that
| --- | --- |
include both a top and bottom field reference are counted as two separate
active reference pictures, as described in the
[active reference picture list construction rules for H.264 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-reference-picture-info). |

Let `VkOffset2D codedOffsetGranularity` be the minimum alignment
requirement for the coded offset of video picture resources.
Unless otherwise defined, the value of the `x` and `y` members
of `codedOffsetGranularity` are `0`.

* 
If the bound video session was created with an [     H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile) with a
[VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html)::`pictureLayout` of
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html),
then `codedOffsetGranularity` is equal to
[VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html)::`fieldOffsetGranularity`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for that
video profile.

Let `uint32_t dpbFrameUseCount[]` be an array of size `maxDpbSlots`,
where `maxDpbSlots` is the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` the bound video
session was created with, with each element indicating the number of
times a frame associated with the corresponding DPB slot index is
referred to by the video coding operation.
Let the initial value of each element of the array be `0`.

* 
If `pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then
`dpbFrameUseCount[i]` is incremented by one, where `i` equals
`pDecodeInfo->pSetupReferenceSlot→slotIndex`.
If the bound video session object was created with an
[H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), then
`dpbFrameUseCount[i]` is decremented by one if either
`pStdReferenceInfo->flags.top_field_flag` or
`pStdReferenceInfo->flags.bottom_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the
`pDecodeInfo->pSetupReferenceSlot→pNext` chain.

* 
For each element of `pDecodeInfo->pReferenceSlots`,
`dpbFrameUseCount[i]` is incremented by one, where `i` equals the
`slotIndex` member of the corresponding element.
If the bound video session object was created with an
[H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), then
`dpbFrameUseCount[i]` is decremented by one if either
`pStdReferenceInfo->flags.top_field_flag` or
`pStdReferenceInfo->flags.bottom_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the `pNext`
chain of the corresponding element of
`pDecodeInfo->pReferenceSlots`.

Let `uint32_t dpbTopFieldUseCount[]` and `uint32_t
dpbBottomFieldUseCount[]` be arrays of size `maxDpbSlots`, where
`maxDpbSlots` is the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` the bound video
session was created with, with each element indicating the number of
times the top field or the bottom field, respectively, associated with
the corresponding DPB slot index is referred to by the video coding
operation.
Let the initial value of each element of the arrays be `0`.

* 
If the bound video session object was created with an
[H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile) and
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then perform the
following:

If `pStdReferenceInfo->flags.top_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the
`pDecodeInfo->pSetupReferenceSlot→pNext` chain, then
`dpbTopFieldUseCount[i]` is incremented by one, where `i` equals
`pDecodeInfo->pSetupReferenceSlot→slotIndex`.

* 
If `pStdReferenceInfo->flags.bottom_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the
`pDecodeInfo->pSetupReferenceSlot→pNext` chain, then
`dpbBottomFieldUseCount[i]` is incremented by one, where `i`
equals `pDecodeInfo->pSetupReferenceSlot→slotIndex`.

If the bound video session object was created with an
[H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), then perform the
following for each element of `pDecodeInfo->pReferenceSlots`:

* 
If `pStdReferenceInfo->flags.top_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the `pNext`
chain of the element, then `dpbTopFieldUseCount[i]` is incremented by
one, where `i` equals the `slotIndex` member of the element.

* 
If `pStdReferenceInfo->flags.bottom_field_flag` is set in the
[VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure in the `pNext`
chain of the element, then `dpbBottomFieldUseCount[i]` is incremented
by one, where `i` equals the `slotIndex` member of the
element.

Valid Usage

* 
[](#VUID-vkCmdDecodeVideoKHR-None-08249) VUID-vkCmdDecodeVideoKHR-None-08249

The bound video session **must** have been created with a decode operation

* 
[](#VUID-vkCmdDecodeVideoKHR-None-07011) VUID-vkCmdDecodeVideoKHR-None-07011

The bound video session **must** not be in [    uninitialized](../../../../spec/latest/chapters/videocoding.html#video-session-uninitialized) state at the time the command is executed on the device

* 
[](#VUID-vkCmdDecodeVideoKHR-opCount-07134) VUID-vkCmdDecodeVideoKHR-opCount-07134

For each [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) query, the
[active query index](../../../../spec/latest/chapters/queries.html#queries-operation-active-query-index)
corresponding to the query type of that query plus `opCount` **must**
be less than or equal to the
[last activatable query    index](../../../../spec/latest/chapters/queries.html#queries-operation-last-activatable-query-index) corresponding to the query type of that query plus one

* 
[](#VUID-vkCmdDecodeVideoKHR-pNext-08365) VUID-vkCmdDecodeVideoKHR-pNext-08365

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure with its `queryPool`
member specifying a valid `VkQueryPool` handle, then
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)::queryCount **must** equal `opCount`

* 
[](#VUID-vkCmdDecodeVideoKHR-pNext-08366) VUID-vkCmdDecodeVideoKHR-pNext-08366

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure with its `queryPool`
member specifying a valid `VkQueryPool` handle, then all the queries
used by the command, as specified by the [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure, **must** be *unavailable*

* 
[](#VUID-vkCmdDecodeVideoKHR-queryType-08367) VUID-vkCmdDecodeVideoKHR-queryType-08367

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then the
`queryType` used to create the `queryPool` specified in the
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure included in the `pNext`
chain of `pDecodeInfo` **must** be
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)

* 
[](#VUID-vkCmdDecodeVideoKHR-queryPool-08368) VUID-vkCmdDecodeVideoKHR-queryPool-08368

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then the
`queryPool` specified in the [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure included in the `pNext` chain of `pDecodeInfo` **must**
have been created with a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure included
in the `pNext` chain of [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) identical to the
one specified in [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pVideoProfile`
the bound video session was created with

* 
[](#VUID-vkCmdDecodeVideoKHR-queryType-08369) VUID-vkCmdDecodeVideoKHR-queryType-08369

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`queryType` used to create the `queryPool` specified in the
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure included in the `pNext`
chain of `pDecodeInfo` is
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created with
a queue family index that supports [result    status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html)::`queryResultStatusSupport`

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07135) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07135

`pDecodeInfo->srcBuffer` **must** be [    compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile the bound video session was created
with

* 
[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-07136) VUID-vkCmdDecodeVideoKHR-commandBuffer-07136

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pDecodeInfo->srcBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07138) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07138

`pDecodeInfo->srcBufferOffset` **must** be an integer multiple of
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minBitstreamBufferOffsetAlignment`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07139) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07139

`pDecodeInfo->srcBufferRange` **must** be an integer multiple of
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minBitstreamBufferSizeAlignment`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07140) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07140

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL` and
[VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_COINCIDE_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then the video picture
resources specified by `pDecodeInfo->dstPictureResource` and
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` **must** not
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching)

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07141) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07141

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL` and none of the
following is true:

[VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html)::`flags` includes
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_DISTINCT_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoDecodeAV1ProfileInfoKHR](VkVideoDecodeAV1ProfileInfoKHR.html)::`filmGrainSupport` set to
[VK_TRUE](VK_TRUE.html), and [film grain](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) is enabled for
the decoded picture

then the video picture resources specified by
`pDecodeInfo->dstPictureResource` and
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` **must**
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching)

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07142) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07142

`pDecodeInfo->dstPictureResource.imageViewBinding` **must** be
[compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile the
bound video session was created with

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07143) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07143

The format of `pDecodeInfo->dstPictureResource.imageViewBinding`
**must** match the [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pictureFormat`
the bound video session was created with

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07144) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07144

`pDecodeInfo->dstPictureResource.codedOffset` **must** be an integer
multiple of `codedOffsetGranularity`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07145) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07145

`pDecodeInfo->dstPictureResource.codedExtent` **must** be between
`minCodedExtent` and `maxCodedExtent`, inclusive, the bound
video session was created with

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07146) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07146

`pDecodeInfo->dstPictureResource.imageViewBinding` **must** have been
created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) usage
flag set

[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-07147) VUID-vkCmdDecodeVideoKHR-commandBuffer-07147

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pDecodeInfo->dstPictureResource.imageViewBinding` **must** not
have been created from a protected image

[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-07148) VUID-vkCmdDecodeVideoKHR-commandBuffer-07148

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pDecodeInfo->dstPictureResource.imageViewBinding` **must** have
been created from a protected image

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-08376) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-08376

`pDecodeInfo->pSetupReferenceSlot` **must** not be `NULL` unless the
bound video session was created with
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` equal to zero

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07170) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07170

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pDecodeInfo->pSetupReferenceSlot→slotIndex` **must** be less than the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` specified when the
bound video session was created

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07173) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07173

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pDecodeInfo->pSetupReferenceSlot→pPictureResource→codedOffset`
**must** be an integer multiple of `codedOffsetGranularity`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07149) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07149

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` **must**
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) one of the
[bound reference picture resource](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources)

[](#VUID-vkCmdDecodeVideoKHR-activeReferencePictureCount-07150) VUID-vkCmdDecodeVideoKHR-activeReferencePictureCount-07150

`activeReferencePictureCount` **must** be less than or equal to the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxActiveReferencePictures`
specified when the bound video session was created

[](#VUID-vkCmdDecodeVideoKHR-slotIndex-07256) VUID-vkCmdDecodeVideoKHR-slotIndex-07256

The `slotIndex` member of each element of
`pDecodeInfo->pReferenceSlots` **must** be less than the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` specified when the
bound video session was created

[](#VUID-vkCmdDecodeVideoKHR-codedOffset-07257) VUID-vkCmdDecodeVideoKHR-codedOffset-07257

The `codedOffset` member of the [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)
structure pointed to by the `pPictureResource` member of each
element of `pDecodeInfo->pReferenceSlots` **must** be an integer
multiple of `codedOffsetGranularity`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07151) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07151

The `pPictureResource` member of each element of
`pDecodeInfo->pReferenceSlots` **must**
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) one of the
[bound reference picture resource](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources)
associated with the DPB slot index specified in the `slotIndex`
member of that element

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07264) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07264

Each video picture resource corresponding to the `pPictureResource`
member specified in the elements of `pDecodeInfo->pReferenceSlots`
**must** be [unique](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-uniqueness) within
`pDecodeInfo->pReferenceSlots`

[](#VUID-vkCmdDecodeVideoKHR-dpbFrameUseCount-07176) VUID-vkCmdDecodeVideoKHR-dpbFrameUseCount-07176

All elements of `dpbFrameUseCount` **must** be less than or equal to
`1`

[](#VUID-vkCmdDecodeVideoKHR-dpbTopFieldUseCount-07177) VUID-vkCmdDecodeVideoKHR-dpbTopFieldUseCount-07177

All elements of `dpbTopFieldUseCount` **must** be less than or equal to
`1`

[](#VUID-vkCmdDecodeVideoKHR-dpbBottomFieldUseCount-07178) VUID-vkCmdDecodeVideoKHR-dpbBottomFieldUseCount-07178

All elements of `dpbBottomFieldUseCount` **must** be less than or equal
to `1`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10801) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10801

If `pDecodeInfo->pSetupReferenceSlot` is `NULL` or
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` does not
[refer](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to the same image
subresource as `pDecodeInfo->dstPictureResource`, then the image
subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by
`pDecodeInfo->dstPictureResource` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](VkImageLayout.html) layout at the time the video
decode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10802) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10802

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL` and
`pDecodeInfo->pSetupReferenceSlot→pPictureResource`
[refers](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to the same image
subresource as `pDecodeInfo->dstPictureResource`, then the image
subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by
`pDecodeInfo->dstPictureResource` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html) layout at the time the video
decode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10803) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-10803

If `pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then the image
subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html) layout at the time the video
decode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

[](#VUID-vkCmdDecodeVideoKHR-pPictureResource-10804) VUID-vkCmdDecodeVideoKHR-pPictureResource-10804

The image subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to
by the `pPictureResource` member of each element of
`pDecodeInfo->pReferenceSlots` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html) layout at the time the video
decode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

[](#VUID-vkCmdDecodeVideoKHR-pNext-07152) VUID-vkCmdDecodeVideoKHR-pNext-07152

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pDecodeInfo` **must** include a
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-None-07258) VUID-vkCmdDecodeVideoKHR-None-07258

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) but was not created
with [interlaced frame support](../../../../spec/latest/chapters/videocoding.html#decode-h264-interlaced-support), then
the [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-output-picture-info) **must**
represent a frame

[](#VUID-vkCmdDecodeVideoKHR-pSliceOffsets-07153) VUID-vkCmdDecodeVideoKHR-pSliceOffsets-07153

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then all elements of
the `pSliceOffsets` member of the
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-None-10400) VUID-vkCmdDecodeVideoKHR-None-10400

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then there **must** be
a bound video session parameters object if any of the following
conditions are not met:

* 
the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
the `pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure

* 
the `pStdSPS` member of the
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure
included in the `pNext` chain of `pDecodeInfo` is not `NULL`

* 
the `pStdPPS` member of the
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure
included in the `pNext` chain of `pDecodeInfo` is not `NULL`

[](#VUID-vkCmdDecodeVideoKHR-StdVideoH264SequenceParameterSet-07154) VUID-vkCmdDecodeVideoKHR-StdVideoH264SequenceParameterSet-07154

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH264SequenceParameterSet` entry with
`seq_parameter_set_id` matching
`StdVideoDecodeH264PictureInfo`::`seq_parameter_set_id` that is
provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure, and its
`pStdSPS` member is not equal to `NULL`

[](#VUID-vkCmdDecodeVideoKHR-pNext-10401) VUID-vkCmdDecodeVideoKHR-pNext-10401

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure with a
non-`NULL` `pStdSPS` member, then
`pStdSPS->seq_parameter_set_id` **must** equal
`StdVideoDecodeH264PictureInfo`::`seq_parameter_set_id` provided
in the `pStdPictureInfo` member of the
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-StdVideoH264PictureParameterSet-07155) VUID-vkCmdDecodeVideoKHR-StdVideoH264PictureParameterSet-07155

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH264PictureParameterSet` entry with
`seq_parameter_set_id` and `pic_parameter_set_id` matching
`StdVideoDecodeH264PictureInfo`::`seq_parameter_set_id` and
`StdVideoDecodeH264PictureInfo`::`pic_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure, and its
`pStdPPS` member is not equal to `NULL`

[](#VUID-vkCmdDecodeVideoKHR-pNext-10402) VUID-vkCmdDecodeVideoKHR-pNext-10402

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html) structure with a
non-`NULL` `pStdPPS` member, then
`pStdPPS->seq_parameter_set_id` and
`pStdPPS->pic_parameter_set_id` **must** equal
`StdVideoDecodeH264PictureInfo`::`seq_parameter_set_id` and
`StdVideoDecodeH264PictureInfo`::`pic_parameter_set_id`,
respectively, provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07156) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07156

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pDecodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07259) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07259

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) but was not created
with [interlaced frame support](../../../../spec/latest/chapters/videocoding.html#decode-h264-interlaced-support), and
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then the
[reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-reconstructed-picture-info) **must**
represent a frame

[](#VUID-vkCmdDecodeVideoKHR-pNext-07157) VUID-vkCmdDecodeVideoKHR-pNext-07157

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pDecodeInfo->pReferenceSlots` **must**
include a [VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07260) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07260

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) but was not created
with [interlaced frame support](../../../../spec/latest/chapters/videocoding.html#decode-h264-interlaced-support), then
each [active reference    picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-reference-picture-info) corresponding to the elements of
`pDecodeInfo->pReferenceSlots` **must** represent a frame

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07261) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07261

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, and the
[decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-output-picture-info) represents a
frame, then the [reconstructed    picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-reconstructed-picture-info) **must** also represent a frame

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07262) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07262

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, and the
[decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-output-picture-info) represents a
top field, then the
[reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-reconstructed-picture-info) **must**
also represent a top field

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07263) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07263

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, and the
[decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-output-picture-info) represents a
bottom field, then the [    reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-reconstructed-picture-info) **must** also represent a bottom field

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07266) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07266

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and an
[active reference picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-reference-picture-info)
corresponding to any element of `pDecodeInfo->pReferenceSlots`
represents a frame, then the DPB slot index of the bound video session
specified by the `slotIndex` member of that element **must** be
currently associated with a frame picture
[matching](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) the video picture resource
specified by the `pPictureResource` member of the same element at
the time the command is executed on the device

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07267) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07267

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and an
[active reference picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-reference-picture-info)
corresponding to any element of `pDecodeInfo->pReferenceSlots`
represents a top field, then the DPB slot index of the bound video
session specified by the `slotIndex` member of that element **must** be
currently associated with a top field picture
[matching](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) the video picture resource
specified by the `pPictureResource` member of the same element at
the time the command is executed on the device

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07268) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07268

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and an
[active reference picture](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-reference-picture-info)
corresponding to any element of `pDecodeInfo->pReferenceSlots`
represents a bottom field, then the DPB slot index of the bound video
session specified by the `slotIndex` member of that element **must** be
currently associated with a bottom field picture
[matching](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) the video picture resource
specified by the `pPictureResource` member of the same element at
the time the command is executed on the device

[](#VUID-vkCmdDecodeVideoKHR-pNext-07158) VUID-vkCmdDecodeVideoKHR-pNext-07158

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pDecodeInfo` **must** include a
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pSliceSegmentOffsets-07159) VUID-vkCmdDecodeVideoKHR-pSliceSegmentOffsets-07159

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then all elements of
the `pSliceSegmentOffsets` member of the
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-None-10403) VUID-vkCmdDecodeVideoKHR-None-10403

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then there **must** be
a bound video session parameters object if any of the following
conditions are not met:

* 
the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
the `pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure

* 
the `pStdVPS` member of the
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure
included in the `pNext` chain of `pDecodeInfo` is not `NULL`

* 
the `pStdSPS` member of the
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure
included in the `pNext` chain of `pDecodeInfo` is not `NULL`

* 
the `pStdPPS` member of the
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure
included in the `pNext` chain of `pDecodeInfo` is not `NULL`

[](#VUID-vkCmdDecodeVideoKHR-StdVideoH265VideoParameterSet-07160) VUID-vkCmdDecodeVideoKHR-StdVideoH265VideoParameterSet-07160

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265VideoParameterSet` entry with
`vps_video_parameter_set_id` matching
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id`
that is provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure, and its
`pStdVPS` member is not equal to `NULL`

[](#VUID-vkCmdDecodeVideoKHR-pNext-10404) VUID-vkCmdDecodeVideoKHR-pNext-10404

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure with a
non-`NULL` `pStdVPS` member, then
`pStdVPS->vps_video_parameter_set_id` **must** equal
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id`
provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-StdVideoH265SequenceParameterSet-07161) VUID-vkCmdDecodeVideoKHR-StdVideoH265SequenceParameterSet-07161

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265SequenceParameterSet` entry with
`sps_video_parameter_set_id` and `sps_seq_parameter_set_id`
matching
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id` and
`StdVideoDecodeH265PictureInfo`::`pps_seq_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure, and its
`pStdSPS` member is not equal to `NULL`

[](#VUID-vkCmdDecodeVideoKHR-pNext-10405) VUID-vkCmdDecodeVideoKHR-pNext-10405

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure with a
non-`NULL` `pStdSPS` member, then
`pStdSPS->sps_video_parameter_set_id` and
`pStdSPS->sps_seq_parameter_set_id` **must** equal
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id` and
`StdVideoDecodeH265PictureInfo`::`pps_seq_parameter_set_id`,
respectively, provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-StdVideoH265PictureParameterSet-07162) VUID-vkCmdDecodeVideoKHR-StdVideoH265PictureParameterSet-07162

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265PictureParameterSet` entry with
`sps_video_parameter_set_id`, `pps_seq_parameter_set_id`, and
`pps_pic_parameter_set_id` matching
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id`,
`StdVideoDecodeH265PictureInfo`::`pps_seq_parameter_set_id`, and
`StdVideoDecodeH265PictureInfo`::`pps_pic_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure, and its
`pStdPPS` member is not equal to `NULL`

[](#VUID-vkCmdDecodeVideoKHR-pNext-10406) VUID-vkCmdDecodeVideoKHR-pNext-10406

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html) structure with a
non-`NULL` `pStdPPS` member, then
`pStdPPS->sps_video_parameter_set_id`,
`pStdPPS->pps_seq_parameter_set_id`, and
`pStdPPS->pps_pic_parameter_set_id` **must** equal
`StdVideoDecodeH265PictureInfo`::`sps_video_parameter_set_id`,
`StdVideoDecodeH265PictureInfo`::`pps_seq_parameter_set_id`, and
`StdVideoDecodeH265PictureInfo`::`pps_pic_parameter_set_id`,
respectively, provided in the `pStdPictureInfo` member of the
[VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07163) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-07163

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pDecodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoDecodeH265DpbSlotInfoKHR](VkVideoDecodeH265DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pNext-07164) VUID-vkCmdDecodeVideoKHR-pNext-07164

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pDecodeInfo->pReferenceSlots` **must**
include a [VkVideoDecodeH265DpbSlotInfoKHR](VkVideoDecodeH265DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pNext-10805) VUID-vkCmdDecodeVideoKHR-pNext-10805

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pDecodeInfo` **must** include a
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-uncompressedHeaderOffset-10806) VUID-vkCmdDecodeVideoKHR-uncompressedHeaderOffset-10806

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`uncompressedHeaderOffset` member of the
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-compressedHeaderOffset-10807) VUID-vkCmdDecodeVideoKHR-compressedHeaderOffset-10807

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`compressedHeaderOffset` member of the
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-tilesOffset-10808) VUID-vkCmdDecodeVideoKHR-tilesOffset-10808

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`tilesOffset` member of the [VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html)
structure included in the `pNext` chain of `pDecodeInfo` **must**
be less than `pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-referenceNameSlotIndices-10809) VUID-vkCmdDecodeVideoKHR-referenceNameSlotIndices-10809

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then each element of
the `referenceNameSlotIndices` array member of the
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** either be negative or **must**
equal the `slotIndex` member of one of the elements of
`pDecodeInfo->pReferenceSlots`

[](#VUID-vkCmdDecodeVideoKHR-slotIndex-10810) VUID-vkCmdDecodeVideoKHR-slotIndex-10810

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`slotIndex` member of each element of
`pDecodeInfo->pReferenceSlots` **must** equal one of the elements of
the `referenceNameSlotIndices` array member of the
[VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-filmGrainSupport-09248) VUID-vkCmdDecodeVideoKHR-filmGrainSupport-09248

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoDecodeAV1ProfileInfoKHR](VkVideoDecodeAV1ProfileInfoKHR.html)::`filmGrainSupport` set to
[VK_FALSE](VK_FALSE.html), then [film grain](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) **must** not be
enabled for the decoded picture

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-09249) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-09249

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, and
[film grain](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) is enabled for the decoded picture,
then the video picture resources specified by
`pDecodeInfo->dstPictureResource` and
`pDecodeInfo->pSetupReferenceSlot→pPictureResource` **must** not
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching)

[](#VUID-vkCmdDecodeVideoKHR-pNext-09250) VUID-vkCmdDecodeVideoKHR-pNext-09250

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pDecodeInfo` **must** include a
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-frameHeaderOffset-09251) VUID-vkCmdDecodeVideoKHR-frameHeaderOffset-09251

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`frameHeaderOffset` member of the
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-pTileOffsets-09253) VUID-vkCmdDecodeVideoKHR-pTileOffsets-09253

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then all elements of
the `pTileOffsets` member of the
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** be less than
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-pTileOffsets-09252) VUID-vkCmdDecodeVideoKHR-pTileOffsets-09252

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then for each element
i of the `pTileOffsets` and `pTileSizes` members of the
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` the sum of `pTileOffsets`[i]
and `pTileSizes`[i] **must** be less than or equal to
`pDecodeInfo->srcBufferRange`

[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-09254) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-09254

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pDecodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pDecodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoDecodeAV1DpbSlotInfoKHR](VkVideoDecodeAV1DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-pNext-09255) VUID-vkCmdDecodeVideoKHR-pNext-09255

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pDecodeInfo->pReferenceSlots` **must**
include a [VkVideoDecodeAV1DpbSlotInfoKHR](VkVideoDecodeAV1DpbSlotInfoKHR.html) structure

[](#VUID-vkCmdDecodeVideoKHR-referenceNameSlotIndices-09262) VUID-vkCmdDecodeVideoKHR-referenceNameSlotIndices-09262

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then each element of
the `referenceNameSlotIndices` array member of the
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo` **must** either be negative or **must**
equal the `slotIndex` member of one of the elements of
`pDecodeInfo->pReferenceSlots`

[](#VUID-vkCmdDecodeVideoKHR-slotIndex-09263) VUID-vkCmdDecodeVideoKHR-slotIndex-09263

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`slotIndex` member of each element of
`pDecodeInfo->pReferenceSlots` **must** equal one of the elements of
the `referenceNameSlotIndices` array member of the
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pDecodeInfo`

[](#VUID-vkCmdDecodeVideoKHR-None-10407) VUID-vkCmdDecodeVideoKHR-None-10407

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then there **must** be a
bound video session parameters object if any of the following conditions
are not met:

* 
the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
the `pNext` chain of `pDecodeInfo` includes a
[VkVideoDecodeAV1InlineSessionParametersInfoKHR](VkVideoDecodeAV1InlineSessionParametersInfoKHR.html) structure

* 
the `pStdSequenceHeader` member of the
[VkVideoDecodeAV1InlineSessionParametersInfoKHR](VkVideoDecodeAV1InlineSessionParametersInfoKHR.html) structure included
in the `pNext` chain of `pDecodeInfo` is not `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-parameter) VUID-vkCmdDecodeVideoKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDecodeVideoKHR-pDecodeInfo-parameter) VUID-vkCmdDecodeVideoKHR-pDecodeInfo-parameter

 `pDecodeInfo` **must** be a valid pointer to a valid [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html) structure

* 
[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-recording) VUID-vkCmdDecodeVideoKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDecodeVideoKHR-commandBuffer-cmdpool) VUID-vkCmdDecodeVideoKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDecodeVideoKHR-renderpass) VUID-vkCmdDecodeVideoKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDecodeVideoKHR-suspended) VUID-vkCmdDecodeVideoKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDecodeVideoKHR-videocoding) VUID-vkCmdDecodeVideoKHR-videocoding

 This command **must** only be called inside of a video coding scope

* 
[](#VUID-vkCmdDecodeVideoKHR-bufferlevel) VUID-vkCmdDecodeVideoKHR-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Inside | VK_QUEUE_VIDEO_DECODE_BIT_KHR | Action |

Conditional Rendering

vkCmdDecodeVideoKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCmdDecodeVideoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
