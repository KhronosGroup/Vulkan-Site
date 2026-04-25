# vkCmdEncodeVideoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEncodeVideoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEncodeVideoKHR - Launch video encode operations

To launch video encode operations, call:

// Provided by VK_KHR_video_encode_queue
void vkCmdEncodeVideoKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoEncodeInfoKHR*                 pEncodeInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pEncodeInfo` is a pointer to a [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html) structure
specifying the parameters of the video encode operations.

Each call issues one or more video encode operations.
The implicit parameter `opCount` corresponds to the number of video
encode operations issued by the command.
After calling this command, the
[active query index](../../../../spec/latest/chapters/queries.html#queries-operation-active-query-index) of each
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active) query is incremented by `opCount`.

Currently each call to this command results in the issue of a single video
encode operation.

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the `pNext`
chain of `pEncodeInfo` includes a [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure with its `queryPool` member specifying a valid
`VkQueryPool` handle, then this command will execute a query for each
video encode operation issued by it.

Active Reference Picture Information

The list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) used by
a video encode operation is a list of image subregions used as the source of
[reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) data and related parameters, and is
derived from the [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures provided as
the elements of the `pEncodeInfo->pReferenceSlots` array.
For each element of `pEncodeInfo->pReferenceSlots`, one or more elements
are added to the active reference picture list, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#encode-codec-specific-semantics).
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

Information related to the optional [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) used by a video encode operation is derived from the
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure pointed to by
`pEncodeInfo->pSetupReferenceSlot`, if not `NULL`, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#encode-codec-specific-semantics), and consists
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
`pEncodeInfo->pSetupReferenceSlot` is always required, unless the video
session was created with
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` equal to zero.
However, the DPB slot identified by
`pEncodeInfo->pSetupReferenceSlot→slotIndex` is only
[activated](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) with the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) specified in
`pEncodeInfo->pSetupReferenceSlot→pPictureResource` if reference
picture setup is requested according to the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#encode-codec-specific-semantics).

If reconstructed picture information is specified, but reference picture
setup is not requested, according to the codec-specific semantics, the
contents of the [video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources)
corresponding to the reconstructed picture will be **undefined** after the
video encode operation.

|  | Some implementations may always output the reconstructed picture or use it
| --- | --- |
as temporary storage during the video encode operation even when the
reconstructed picture is not marked for future reference. |

Encode Input Picture Information

Information related to the [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture)
used by a video encode operation is derived from
`pEncodeInfo->srcPictureResource` and any codec-specific parameters
provided in the `pEncodeInfo->pNext` chain, as defined by the
[codec-specific semantics](../../../../spec/latest/chapters/videocoding.html#encode-codec-specific-semantics), and consists
of the following:

* 
The image subregion within the image subresource
[referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by the
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) used as the encode
input picture.

* 
The codec-specific picture information related to the encoded picture.

Several limiting values are defined below that are referenced by the
relevant valid usage statements of this command.

* 
Let `uint32_t activeReferencePictureCount` be the size of the list of
active reference pictures used by the video encode operation.
Unless otherwise defined, `activeReferencePictureCount` is set to
the value of `pEncodeInfo->referenceSlotCount`.

* 
Let `VkOffset2D codedOffsetGranularity` be the minimum alignment
requirement for the coded offset of video picture resources.
Unless otherwise defined, the value of the `x` and `y` members
of `codedOffsetGranularity` are `0`.

* 
Let `uint32_t dpbFrameUseCount[]` be an array of size `maxDpbSlots`,
where `maxDpbSlots` is the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` the bound video
session was created with, with each element indicating the number of
times a frame associated with the corresponding DPB slot index is
referred to by the video coding operation.
Let the initial value of each element of the array be `0`.

If `pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then
`dpbFrameUseCount[i]` is incremented by one, where `i` equals
`pEncodeInfo->pSetupReferenceSlot→slotIndex`.

* 
For each element of `pEncodeInfo->pReferenceSlots`,
`dpbFrameUseCount[i]` is incremented by one, where `i` equals the
`slotIndex` member of the corresponding element.

If there is a bound video session parameters object created with
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](VkVideoSessionParametersCreateFlagBitsKHR.html),
then let `VkExtent2D quantizationMapTexelSize` be the
[quantization map texel size](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size) the
bound video session parameters object was created with.

Let `VkExtent2D maxCodingBlockSize` be the maximum codec-specific coding
block size that **may** be used by the video encode operation.

* 
If the bound video session object was created with an
[H.264 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), then let
`maxCodingBlockSize` be equal to the size of an H.264 macroblock,
i.e. `{16,16}`.

* 
If the bound video session object was created with an
[H.265 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile), then let
`maxCodingBlockSize` be equal to the maximum H.265 coding block
size that **may** be used by the video encode operation derived as the
maximum of the CTB sizes corresponding to the
[VkVideoEncodeH265CtbSizeFlagBitsKHR](VkVideoEncodeH265CtbSizeFlagBitsKHR.html) bits set in
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`ctbSizes`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with.

* 
If the bound video session object was created with an
[AV1 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile), then let
`maxCodingBlockSize` be equal to the maximum AV1 superblock size
that **may** be used by the video encode operation derived as the maximum
of the superblock sizes corresponding to the
[VkVideoEncodeAV1SuperblockSizeFlagBitsKHR](VkVideoEncodeAV1SuperblockSizeFlagBitsKHR.html) bits set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`superblockSizes`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with.

* 
Otherwise, `maxCodingBlockSize` is **undefined**.

If `maxCodingBlockSize` is defined, then let `VkExtent2D
minCodingBlockExtent` be the coded extent of the
[encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) expressed in terms of
codec-specific coding blocks, assuming the maximum size of such coding
blocks, as defined by `maxCodingBlockSize`, calculated from the
value of the `codedExtent` member of
`pEncodeInfo->srcPictureResource` as follows:

* 
`minCodingBlockExtent.width` = (`codedExtent.width`

`maxCodingBlockSize.width` - 1) / `maxCodingBlockSize.width`

* 
`minCodingBlockExtent.height` = (`codedExtent.height`

`maxCodingBlockSize.height` - 1) / `maxCodingBlockSize.height`

If the bound video session object was created with an
[H.264 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), then:

* 
Let `StdVideoH264PictureType h264PictureType` be the picture type of
the encoded picture set to the value of
`pStdPictureInfo->primary_pic_type` specified in the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pEncodeInfo->pNext` chain.

* 
Let `StdVideoH264PictureType h264L0PictureTypes[]` and
`StdVideoH264PictureType h264L1PictureTypes[]` be the picture types of
the reference pictures in the L0 and L1 reference lists, respectively.
If `pStdPictureInfo->pRefLists` specified in the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pEncodeInfo->pNext` chain is not `NULL`, then for each reference
index specified in the elements of the
`pStdPictureInfo->pRefLists→RefPicList0` and
`pStdPictureInfo->pRefLists→RefPicList1` arrays, if the reference
index is not `STD_VIDEO_H264_NO_REFERENCE_PICTURE`,
`pStdReferenceInfo->primary_pic_type` is added to
`h264L0PictureTypes` or `h264L1PictureTypes`, respectively,
where `pStdReferenceInfo` is the member of the
[VkVideoEncodeH264DpbSlotInfoKHR](VkVideoEncodeH264DpbSlotInfoKHR.html) structure included in the
`pNext` chain of the element of `pEncodeInfo->pReferenceSlots`
for which `slotIndex` equals the reference index in question.

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and the `pNext` chain
of `pEncodeInfo` includes a [VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)
structure, then let `uint32_t intraRefreshH264SliceIndex` be the
[intra refresh index](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-index) specified in
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)::`intraRefreshIndex`.
Otherwise `intraRefreshH264SliceIndex` is not defined.

If the bound video session object was created with an
[H.265 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), then:

* 
Let `StdVideoH265PictureType h265PictureType` be the picture type of
the encoded picture set to the value of `pStdPictureInfo->pic_type`
specified in the [VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure
included in the `pEncodeInfo->pNext` chain.

* 
Let `StdVideoH265PictureType h265L0PictureTypes[]` and
`StdVideoH265PictureType h265L1PictureTypes[]` be the picture types of
the reference pictures in the L0 and L1 reference lists, respectively.
If `pStdPictureInfo->pRefLists` specified in the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pEncodeInfo->pNext` chain is not `NULL`, then for each reference
index specified in the elements of the
`pStdPictureInfo->pRefLists→RefPicList0` and
`pStdPictureInfo->pRefLists→RefPicList1` arrays, if the reference
index is not `STD_VIDEO_H265_NO_REFERENCE_PICTURE`,
`pStdReferenceInfo->pic_type` is added to `h265L0PictureTypes`
or `h265L1PictureTypes`, respectively, where
`pStdReferenceInfo` is the member of the
[VkVideoEncodeH265DpbSlotInfoKHR](VkVideoEncodeH265DpbSlotInfoKHR.html) structure included in the
`pNext` chain of the element of `pEncodeInfo->pReferenceSlots`
for which `slotIndex` equals the reference index in question.

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and the `pNext` chain
of `pEncodeInfo` includes a [VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)
structure, then let `uint32_t intraRefreshH265SliceSegmentIndex` be the
[intra refresh index](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-index) specified in
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)::`intraRefreshIndex`.
Otherwise `intraRefreshH265SliceSegmentIndex` is not defined.

If the bound video session object was created with an
[AV1 encode profile](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile), then:

* 
If the `primaryReferenceCdfOnly` member of the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pEncodeInfo->pNext` chain is set to [VK_TRUE](VK_TRUE.html), then let
`int32_t cdfOnlyReferenceIndex` be the value of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo->primary_ref_frame`.

* 
Otherwise let `int32_t cdfOnlyReferenceIndex` be `-1`.

Valid Usage

* 
[](#VUID-vkCmdEncodeVideoKHR-None-08250) VUID-vkCmdEncodeVideoKHR-None-08250

The bound video session **must** have been created with an encode operation

* 
[](#VUID-vkCmdEncodeVideoKHR-None-07012) VUID-vkCmdEncodeVideoKHR-None-07012

The bound video session **must** not be in [    uninitialized](../../../../spec/latest/chapters/videocoding.html#video-session-uninitialized) state at the time the command is executed on the device

* 
[](#VUID-vkCmdEncodeVideoKHR-None-08318) VUID-vkCmdEncodeVideoKHR-None-08318

If there is a bound video session parameters object, then it **must** have
been created with the currently set [video encode    quality level](../../../../spec/latest/chapters/videocoding.html#encode-quality-level) for the bound video session at the time the command is
executed on the device

* 
[](#VUID-vkCmdEncodeVideoKHR-opCount-07174) VUID-vkCmdEncodeVideoKHR-opCount-07174

For each [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) query, the
[active query index](../../../../spec/latest/chapters/queries.html#queries-operation-active-query-index)
corresponding to the query type of that query plus `opCount` **must**
be less than or equal to the
[last activatable query    index](../../../../spec/latest/chapters/queries.html#queries-operation-last-activatable-query-index) corresponding to the query type of that query plus one

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08360) VUID-vkCmdEncodeVideoKHR-pNext-08360

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pEncodeInfo` includes a
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure with its `queryPool`
member specifying a valid `VkQueryPool` handle, then
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)::queryCount **must** equal `opCount`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08361) VUID-vkCmdEncodeVideoKHR-pNext-08361

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`pNext` chain of `pEncodeInfo` includes a
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure with its `queryPool`
member specifying a valid `VkQueryPool` handle, then all the queries
used by the command, as specified by the [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure, **must** be *unavailable*

* 
[](#VUID-vkCmdEncodeVideoKHR-queryType-08362) VUID-vkCmdEncodeVideoKHR-queryType-08362

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then the
`queryType` used to create the `queryPool` specified in the
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure included in the `pNext`
chain of `pEncodeInfo` **must** be
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html) or
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-queryPool-08363) VUID-vkCmdEncodeVideoKHR-queryPool-08363

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then the
`queryPool` specified in the [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
have been created with a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure included
in the `pNext` chain of [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) identical to the
one specified in [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pVideoProfile`
the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-queryType-08364) VUID-vkCmdEncodeVideoKHR-queryType-08364

If the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), and the
`queryType` used to create the `queryPool` specified in the
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html) structure included in the `pNext`
chain of `pEncodeInfo` is
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created with
a queue family index that supports [result    status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html)::`queryResultStatusSupport`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08201) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08201

`pEncodeInfo->dstBuffer` **must** be [    compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile the bound video session was created
with

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-08202) VUID-vkCmdEncodeVideoKHR-commandBuffer-08202

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pEncodeInfo->dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-08203) VUID-vkCmdEncodeVideoKHR-commandBuffer-08203

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pEncodeInfo->dstBuffer` **must** be a protected buffer

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08204) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08204

`pEncodeInfo->dstBufferOffset` **must** be an integer multiple of
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minBitstreamBufferOffsetAlignment`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08205) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08205

`pEncodeInfo->dstBufferRange` **must** be an integer multiple of
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minBitstreamBufferSizeAlignment`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08206) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08206

`pEncodeInfo->srcPictureResource.imageViewBinding` **must** be
[compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile the
bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08207) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08207

The format of `pEncodeInfo->srcPictureResource.imageViewBinding`
**must** match the [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pictureFormat`
the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08208) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08208

`pEncodeInfo->srcPictureResource.codedOffset` **must** be an integer
multiple of `codedOffsetGranularity`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08209) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08209

`pEncodeInfo->srcPictureResource.codedExtent` **must** be between
`minCodedExtent` and `maxCodedExtent`, inclusive, the bound
video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08210) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08210

`pEncodeInfo->srcPictureResource.imageViewBinding` **must** have been
created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-08211) VUID-vkCmdEncodeVideoKHR-commandBuffer-08211

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pEncodeInfo->srcPictureResource.imageViewBinding` **must** not
have been created from a protected image

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08377) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08377

`pEncodeInfo->pSetupReferenceSlot` **must** not be `NULL` unless the
bound video session was created with
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` equal to zero

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08213) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08213

If `pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pEncodeInfo->pSetupReferenceSlot→slotIndex` **must** be less than the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` specified when the
bound video session was created

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08214) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08214

If `pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pEncodeInfo->pSetupReferenceSlot→pPictureResource→codedOffset`
**must** be an integer multiple of `codedOffsetGranularity`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08215) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08215

If `pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then
`pEncodeInfo->pSetupReferenceSlot→pPictureResource` **must**
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) one of the
[bound reference picture resource](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources)

* 
[](#VUID-vkCmdEncodeVideoKHR-activeReferencePictureCount-08216) VUID-vkCmdEncodeVideoKHR-activeReferencePictureCount-08216

`activeReferencePictureCount` **must** be less than or equal to the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxActiveReferencePictures`
specified when the bound video session was created

* 
[](#VUID-vkCmdEncodeVideoKHR-slotIndex-08217) VUID-vkCmdEncodeVideoKHR-slotIndex-08217

The `slotIndex` member of each element of
`pEncodeInfo->pReferenceSlots` **must** be less than the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` specified when the
bound video session was created

* 
[](#VUID-vkCmdEncodeVideoKHR-codedOffset-08218) VUID-vkCmdEncodeVideoKHR-codedOffset-08218

The `codedOffset` member of the [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)
structure pointed to by the `pPictureResource` member of each
element of `pEncodeInfo->pReferenceSlots` **must** be an integer
multiple of `codedOffsetGranularity`

* 
[](#VUID-vkCmdEncodeVideoKHR-pPictureResource-08219) VUID-vkCmdEncodeVideoKHR-pPictureResource-08219

The `pPictureResource` member of each element of
`pEncodeInfo->pReferenceSlots` **must**
[match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) one of the
[bound reference picture resource](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources)
associated with the DPB slot index specified in the `slotIndex`
member of that element

* 
[](#VUID-vkCmdEncodeVideoKHR-pPictureResource-08220) VUID-vkCmdEncodeVideoKHR-pPictureResource-08220

Each video picture resource corresponding to the `pPictureResource`
member specified in the elements of `pEncodeInfo->pReferenceSlots`
**must** be [unique](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-uniqueness) within
`pEncodeInfo->pReferenceSlots`

* 
[](#VUID-vkCmdEncodeVideoKHR-dpbFrameUseCount-08221) VUID-vkCmdEncodeVideoKHR-dpbFrameUseCount-08221

All elements of `dpbFrameUseCount` **must** be less than or equal to
`1`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10811) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10811

The image subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to
by `pEncodeInfo->srcPictureResource` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](VkImageLayout.html) layout at the time the video
encode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10812) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10812

If `pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then the image
subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to by
`pEncodeInfo->pSetupReferenceSlot→pPictureResource` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html) layout at the time the video
encode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdEncodeVideoKHR-pPictureResource-10813) VUID-vkCmdEncodeVideoKHR-pPictureResource-10813

The image subresource [referred](../../../../spec/latest/chapters/videocoding.html#video-image-subresource-reference) to
by the `pPictureResource` member of each element of
`pEncodeInfo->pReferenceSlots` **must** be in the
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html) layout at the time the video
encode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10306) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10306

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
bound video session **must** have been created with
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10307) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10307

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the bound video
session **must** have been created with
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10308) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10308

If the current [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
`pEncodeInfo->flags` **must** not include
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10309) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10309

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the `pNext`
chain of `pEncodeInfo` **must** include a
[VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html) structure with its
`quantizationMap` member specifying a valid `VkImageView` handle

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10310) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10310

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`VkImageView` specified by the `quantizationMap` member of the
[VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html) structure included in the
`pNext` chain **must** be [compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility)
with the video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10311) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10311

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`VkImageView` specified by the `quantizationMap` member of the
[VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10312) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10312

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`VkImageView` specified by the `quantizationMap` member of the
[VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10313) VUID-vkCmdEncodeVideoKHR-pNext-10313

If an instance of the [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)
structure is included in the `pNext` chain of `pEncodeInfo`, its
`quantizationMap` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`commandBuffer` is an unprotected command buffer, and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)::`quantizationMap`
**must** not have been created from a protected image

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10314) VUID-vkCmdEncodeVideoKHR-pNext-10314

If an instance of the [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)
structure is included in the `pNext` chain of `pEncodeInfo` and
its `quantizationMap` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
image subresource range referenced by `quantizationMap` **must** be in
the [VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](VkImageLayout.html) layout at
the time the video encode operation is executed on the device
, unless the [    `unifiedImageLayoutsVideo`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayoutsVideo) feature is enabled, in which case it
**may** be in the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10315) VUID-vkCmdEncodeVideoKHR-pNext-10315

If an instance of the [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)
structure is included in the `pNext` chain of `pEncodeInfo` and
its `quantizationMap` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and there
is a bound video session parameters object, then the bound video session
parameters object **must** have been created with
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](VkVideoSessionParametersCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10316) VUID-vkCmdEncodeVideoKHR-pNext-10316

If an instance of the [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)
structure is included in the `pNext` chain of `pEncodeInfo`, its
`quantizationMap` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and there is a
bound video session parameters object created with
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](VkVideoSessionParametersCreateFlagBitsKHR.html),
then `quantizationMapExtent` **must** equal
⌈`pEncodeInfo->srcPictureResource.codedExtent` /
`quantizationMapTexelSize`⌉

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10837) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10837

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes) the bound video
session was created with **must** not be
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_NONE_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10838) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10838

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then
`pEncodeInfo->activeReferencePictureCount` **must** be less than or
equal to
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`maxIntraRefreshActiveReferencePictures`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10839) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10839

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the `pNext` chain
of `pEncodeInfo` **must** include a
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10840) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10840

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`intraRefreshCycleDuration` member of the
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** not be zero

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10841) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10841

If `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`intraRefreshIndex` member of the
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)::`intraRefreshCycleDuration`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10842) VUID-vkCmdEncodeVideoKHR-pNext-10842

If the `pNext` chain of any element of
`pEncodeInfo->pReferenceSlots` includes a
[VkVideoReferenceIntraRefreshInfoKHR](VkVideoReferenceIntraRefreshInfoKHR.html) structure with a non-zero
`dirtyIntraRefreshRegions` member, then `pEncodeInfo->flags`
**must** include [VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10843) VUID-vkCmdEncodeVideoKHR-pNext-10843

If the `pNext` chain of any element of
`pEncodeInfo->pReferenceSlots` includes a
[VkVideoReferenceIntraRefreshInfoKHR](VkVideoReferenceIntraRefreshInfoKHR.html) structure with a non-zero
`dirtyIntraRefreshRegions` member, then for each such element
`dirtyIntraRefreshRegions` **must** equal
`intraRefreshCycleDuration` minus `intraRefreshIndex` where
`intraRefreshCycleDuration` and `intraRefreshIndex` are the
members of the [VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure included
in the `pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10844) VUID-vkCmdEncodeVideoKHR-pNext-10844

If the `pNext` chain of `pEncodeInfo` includes a
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure, then its
`intraRefreshCycleDuration` member **must** be zero or **must** be between
`2` and
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`maxIntraRefreshCycleDuration`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08225) VUID-vkCmdEncodeVideoKHR-pNext-08225

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pEncodeInfo` **must** include a
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-StdVideoH264SequenceParameterSet-08226) VUID-vkCmdEncodeVideoKHR-StdVideoH264SequenceParameterSet-08226

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH264SequenceParameterSet` entry with
`seq_parameter_set_id` matching
`StdVideoEncodeH264PictureInfo`::`seq_parameter_set_id` that is
provided in the `pStdPictureInfo` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-StdVideoH264PictureParameterSet-08227) VUID-vkCmdEncodeVideoKHR-StdVideoH264PictureParameterSet-08227

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH264PictureParameterSet` entry with
`seq_parameter_set_id` and `pic_parameter_set_id` matching
`StdVideoEncodeH264PictureInfo`::`seq_parameter_set_id` and
`StdVideoEncodeH264PictureInfo`::`pic_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08228) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08228

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoEncodeH264DpbSlotInfoKHR](VkVideoEncodeH264DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08229) VUID-vkCmdEncodeVideoKHR-pNext-08229

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pEncodeInfo->pReferenceSlots` **must**
include a [VkVideoEncodeH264DpbSlotInfoKHR](VkVideoEncodeH264DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08269) VUID-vkCmdEncodeVideoKHR-constantQp-08269

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)::`constantQp` **must** be zero
for each element of the `pNaluSliceEntries` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08270) VUID-vkCmdEncodeVideoKHR-constantQp-08270

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)::`constantQp` **must** be
between [VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`minQp` and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxQp`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, for each element of the
`pNaluSliceEntries` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08271) VUID-vkCmdEncodeVideoKHR-constantQp-08271

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_PER_SLICE_CONSTANT_QP_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then
[VkVideoEncodeH264NaluSliceInfoKHR](VkVideoEncodeH264NaluSliceInfoKHR.html)::`constantQp` **must** have the
same value for each element of the `pNaluSliceEntries` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-naluSliceEntryCount-08302) VUID-vkCmdEncodeVideoKHR-naluSliceEntryCount-08302

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`naluSliceEntryCount` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than or equal to
`minCodingBlockExtent.width` multiplied by
`minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-naluSliceEntryCount-08312) VUID-vkCmdEncodeVideoKHR-naluSliceEntryCount-08312

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_ROW_UNALIGNED_SLICE_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then the
`naluSliceEntryCount` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than or equal to
`minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10845) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10845

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with an
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes) other than
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`partitionIndependentIntraRefreshRegions`
is [VK_FALSE](VK_FALSE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then the `naluSliceEntryCount`
member of the [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included
in the `pNext` chain of `pEncodeInfo` **must** equal `1`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10846) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10846

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
and `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`naluSliceEntryCount` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** equal the
`intraRefreshCycleDuration` member of the
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-intraRefreshH264SliceIndex-10847) VUID-vkCmdEncodeVideoKHR-intraRefreshH264SliceIndex-10847

If `intraRefreshH264SliceIndex` is defined, then
`pNaluSliceEntries`[`intraRefreshH264SliceIndex`].`pStdSliceHeader->slice_type`
**must** be `STD_VIDEO_H264_SLICE_TYPE_I` in the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10848) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10848

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`nonRectangularIntraRefreshRegions`
is [VK_FALSE](VK_FALSE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then the `naluSliceEntryCount`
member of the [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included
in the `pNext` chain of `pEncodeInfo` **must** be less than or
equal to `minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-h264PictureType-10849) VUID-vkCmdEncodeVideoKHR-h264PictureType-10849

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`h264PictureType` is `STD_VIDEO_H264_PICTURE_TYPE_B`, and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html),
then `pEncodeInfo->flags` **must** not include
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10850) VUID-vkCmdEncodeVideoKHR-flags-10850

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_DIFFERENT_SLICE_TYPE_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), then
`pNaluSliceEntries`[i].`pStdSliceHeader->slice_type` **must**
be identical for all elements i of the `pNaluSliceEntries`
member of the [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included
in the `pNext` chain of `pEncodeInfo`
, except for element index i equal to
`intraRefreshH264SliceIndex`, if `intraRefreshH264SliceIndex` is
defined

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08352) VUID-vkCmdEncodeVideoKHR-pNext-08352

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure, and
`pEncodeInfo->referenceSlotCount` is greater than zero, then
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
**must** not be `NULL`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08339) VUID-vkCmdEncodeVideoKHR-pNext-08339

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure, and
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
is not `NULL`, then each element of the `RefPicList0` and
`RefPicList1` array members of the
`StdVideoEncodeH264ReferenceListsInfo` structure pointed to by
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
**must** either be `STD_VIDEO_H264_NO_REFERENCE_PICTURE` or **must** equal
the `slotIndex` member of one of the elements of
`pEncodeInfo->pReferenceSlots`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08353) VUID-vkCmdEncodeVideoKHR-pNext-08353

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure, and
`pEncodeInfo->referenceSlotCount` is greater than zero, then the
`slotIndex` member of each element of
`pEncodeInfo->pReferenceSlots` **must** equal one of the elements of
the `RefPicList0` or `RefPicList1` array members of the
`StdVideoEncodeH264ReferenceListsInfo` structure pointed to by
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`

* 
[](#VUID-vkCmdEncodeVideoKHR-maxPPictureL0ReferenceCount-08340) VUID-vkCmdEncodeVideoKHR-maxPPictureL0ReferenceCount-08340

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxPPictureL0ReferenceCount`
is zero, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with, then
`h264PictureType` and each element of `h264L0PictureTypes` and
`h264L1PictureTypes` **must** not be `STD_VIDEO_H264_PICTURE_TYPE_P`

* 
[](#VUID-vkCmdEncodeVideoKHR-maxBPictureL0ReferenceCount-08341) VUID-vkCmdEncodeVideoKHR-maxBPictureL0ReferenceCount-08341

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxBPictureL0ReferenceCount`
and [VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxL1ReferenceCount`
are both zero, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then `h264PictureType` and
each element of `h264L0PictureTypes` and `h264L1PictureTypes`
**must** not be `STD_VIDEO_H264_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-08342) VUID-vkCmdEncodeVideoKHR-flags-08342

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_B_FRAME_IN_L0_LIST_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then each element of
`h264L0PictureTypes` **must** not be `STD_VIDEO_H264_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-08343) VUID-vkCmdEncodeVideoKHR-flags-08343

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_B_FRAME_IN_L1_LIST_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then each element of
`h264L1PictureTypes` **must** not be `STD_VIDEO_H264_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08230) VUID-vkCmdEncodeVideoKHR-pNext-08230

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pEncodeInfo` **must** include a
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-StdVideoH265VideoParameterSet-08231) VUID-vkCmdEncodeVideoKHR-StdVideoH265VideoParameterSet-08231

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265VideoParameterSet` entry with
`vps_video_parameter_set_id` matching
`StdVideoEncodeH265PictureInfo`::`sps_video_parameter_set_id`
that is provided in the `pStdPictureInfo` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-StdVideoH265SequenceParameterSet-08232) VUID-vkCmdEncodeVideoKHR-StdVideoH265SequenceParameterSet-08232

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265SequenceParameterSet` entry with
`sps_video_parameter_set_id` and `sps_seq_parameter_set_id`
matching
`StdVideoEncodeH265PictureInfo`::`sps_video_parameter_set_id` and
`StdVideoEncodeH265PictureInfo`::`pps_seq_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-StdVideoH265PictureParameterSet-08233) VUID-vkCmdEncodeVideoKHR-StdVideoH265PictureParameterSet-08233

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the bound video
session parameters object **must** contain a
`StdVideoH265PictureParameterSet` entry with
`sps_video_parameter_set_id`, `pps_seq_parameter_set_id`, and
`pps_pic_parameter_set_id` matching
`StdVideoEncodeH265PictureInfo`::`sps_video_parameter_set_id`,
`StdVideoEncodeH265PictureInfo`::`pps_seq_parameter_set_id`, and
`StdVideoEncodeH265PictureInfo`::`pps_pic_parameter_set_id`,
respectively, that are provided in the `pStdPictureInfo` member of
the [VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08234) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-08234

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoEncodeH265DpbSlotInfoKHR](VkVideoEncodeH265DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08235) VUID-vkCmdEncodeVideoKHR-pNext-08235

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pEncodeInfo->pReferenceSlots` **must**
include a [VkVideoEncodeH265DpbSlotInfoKHR](VkVideoEncodeH265DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08272) VUID-vkCmdEncodeVideoKHR-constantQp-08272

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
[VkVideoEncodeH265NaluSliceSegmentInfoKHR](VkVideoEncodeH265NaluSliceSegmentInfoKHR.html)::`constantQp` **must**
be zero for each element of the `pNaluSliceSegmentEntries` member of
the [VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08273) VUID-vkCmdEncodeVideoKHR-constantQp-08273

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then
[VkVideoEncodeH265NaluSliceSegmentInfoKHR](VkVideoEncodeH265NaluSliceSegmentInfoKHR.html)::`constantQp` **must**
be between [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`minQp` and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxQp`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, for each element of the
`pNaluSliceSegmentEntries` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQp-08274) VUID-vkCmdEncodeVideoKHR-constantQp-08274

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_PER_SLICE_SEGMENT_CONSTANT_QP_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html),
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with, then
[VkVideoEncodeH265NaluSliceSegmentInfoKHR](VkVideoEncodeH265NaluSliceSegmentInfoKHR.html)::`constantQp` **must**
have the same value for each element of the
`pNaluSliceSegmentEntries` member of the
[VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-naluSliceSegmentEntryCount-08307) VUID-vkCmdEncodeVideoKHR-naluSliceSegmentEntryCount-08307

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`naluSliceSegmentEntryCount` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than or equal to
`minCodingBlockExtent.width` multiplied by
`minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-naluSliceSegmentEntryCount-08313) VUID-vkCmdEncodeVideoKHR-naluSliceSegmentEntryCount-08313

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_ROW_UNALIGNED_SLICE_SEGMENT_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html),
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with, then the
`naluSliceSegmentEntryCount` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than or equal to
`minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10851) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10851

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with an
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes) other than
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`partitionIndependentIntraRefreshRegions`
is [VK_FALSE](VK_FALSE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then the
`naluSliceSegmentEntryCount` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** equal `1`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10852) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10852

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
and `pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), then the
`naluSliceSegmentEntryCount` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** equal
[VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html)::`intraRefreshCycleDuration`

* 
[](#VUID-vkCmdEncodeVideoKHR-intraRefreshH265SliceSegmentIndex-10853) VUID-vkCmdEncodeVideoKHR-intraRefreshH265SliceSegmentIndex-10853

If `intraRefreshH265SliceSegmentIndex` is defined, then
`pNaluSliceSegmentEntries`[`intraRefreshH265SliceSegmentIndex`].`pStdSliceSegmentHeader->slice_type`
**must** be `STD_VIDEO_H265_SLICE_TYPE_I` in the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10854) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10854

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
`pEncodeInfo->flags` includes
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html), and
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`nonRectangularIntraRefreshRegions`
is [VK_FALSE](VK_FALSE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then the
`naluSliceSegmentEntryCount` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be less than or equal to
`minCodingBlockExtent.height`

* 
[](#VUID-vkCmdEncodeVideoKHR-h265PictureType-10855) VUID-vkCmdEncodeVideoKHR-h265PictureType-10855

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`h265PictureType` is `STD_VIDEO_H265_PICTURE_TYPE_B`, and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html),
then `pEncodeInfo->flags` **must** not include
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10856) VUID-vkCmdEncodeVideoKHR-flags-10856

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_DIFFERENT_SLICE_SEGMENT_TYPE_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html),
then
`pNaluSliceSegmentEntries`[i].`pStdSliceSegmentHeader->slice_type`
**must** be identical for all elements i of the
`pNaluSliceSegmentEntries` member of the
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`
, except for element index i equal to
`intraRefreshH265SliceSegmentIndex`, if
`intraRefreshH265SliceSegmentIndex` is defined

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08354) VUID-vkCmdEncodeVideoKHR-pNext-08354

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure, and
`pEncodeInfo->referenceSlotCount` is greater than zero, then
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
**must** not be `NULL`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08344) VUID-vkCmdEncodeVideoKHR-pNext-08344

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure, and
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
is not `NULL`, then each element of the `RefPicList0` and
`RefPicList1` array members of the
`StdVideoEncodeH265ReferenceListsInfo` structure pointed to by
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`
**must** either be `STD_VIDEO_H265_NO_REFERENCE_PICTURE` or **must** equal
the `slotIndex` member of one of the elements of
`pEncodeInfo->pReferenceSlots`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-08355) VUID-vkCmdEncodeVideoKHR-pNext-08355

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the `pNext`
chain of `pEncodeInfo` includes a
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html) structure, and
`pEncodeInfo->referenceSlotCount` is greater than zero, then the
`slotIndex` member of each element of
`pEncodeInfo->pReferenceSlots` **must** equal one of the elements of
the `RefPicList0` or `RefPicList1` array members of the
`StdVideoEncodeH265ReferenceListsInfo` structure pointed to by
[VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html)::`pStdPictureInfo->pRefLists`

* 
[](#VUID-vkCmdEncodeVideoKHR-maxPPictureL0ReferenceCount-08345) VUID-vkCmdEncodeVideoKHR-maxPPictureL0ReferenceCount-08345

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxPPictureL0ReferenceCount`
is zero, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with, then
`h265PictureType` and each element of `h265L0PictureTypes` and
`h265L1PictureTypes` **must** not be `STD_VIDEO_H265_PICTURE_TYPE_P`

* 
[](#VUID-vkCmdEncodeVideoKHR-maxBPictureL0ReferenceCount-08346) VUID-vkCmdEncodeVideoKHR-maxBPictureL0ReferenceCount-08346

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxBPictureL0ReferenceCount`
and [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxL1ReferenceCount`
are both zero, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, then `h265PictureType` and
each element of `h265L0PictureTypes` and `h265L1PictureTypes`
**must** not be `STD_VIDEO_H265_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-08347) VUID-vkCmdEncodeVideoKHR-flags-08347

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L0_LIST_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then each element of
`h265L0PictureTypes` **must** not be `STD_VIDEO_H264_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-08348) VUID-vkCmdEncodeVideoKHR-flags-08348

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L1_LIST_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then each element of
`h265L1PictureTypes` **must** not be `STD_VIDEO_H265_PICTURE_TYPE_B`

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10317) VUID-vkCmdEncodeVideoKHR-pNext-10317

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pEncodeInfo` **must** include a
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10318) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10318

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` **must**
include a [VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-pNext-10319) VUID-vkCmdEncodeVideoKHR-pNext-10319

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of each element of `pEncodeInfo->pReferenceSlots` **must**
include a [VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQIndex-10320) VUID-vkCmdEncodeVideoKHR-constantQIndex-10320

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then the
`constantQIndex` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
be zero

* 
[](#VUID-vkCmdEncodeVideoKHR-constantQIndex-10321) VUID-vkCmdEncodeVideoKHR-constantQIndex-10321

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), then the
`constantQIndex` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
be between [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`minQIndex` and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxQIndex`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10322) VUID-vkCmdEncodeVideoKHR-flags-10322

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo->flags.frame_size_override_flag`
**must** be zero for the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure
included in the `pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10323) VUID-vkCmdEncodeVideoKHR-flags-10323

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then
`pEncodeInfo->srcPictureResource.codedExtent.width` **must** equal
`StdVideoAV1SequenceHeader`::`max_frame_width_minus_1` + 
1 of the [active AV1 sequence    header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header)

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10324) VUID-vkCmdEncodeVideoKHR-flags-10324

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then
`pEncodeInfo->srcPictureResource.codedExtent.height` **must** equal
`StdVideoAV1SequenceHeader`::`max_frame_height_minus_1`
+  1 of the [active AV1 sequence    header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header)

* 
[](#VUID-vkCmdEncodeVideoKHR-flags-10325) VUID-vkCmdEncodeVideoKHR-flags-10325

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_MOTION_VECTOR_SCALING_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with, then for each element
i of `pEncodeInfo->pReferenceSlots`
`pEncodeInfo->pReferenceSlots`[i].`pPictureResource->codedExtent`
**must** match `pEncodeInfo->srcPictureResource.codedExtent`

* 
[](#VUID-vkCmdEncodeVideoKHR-predictionMode-10326) VUID-vkCmdEncodeVideoKHR-predictionMode-10326

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` is
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_INTRA_ONLY_KHR](VkVideoEncodeAV1PredictionModeKHR.html), then
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo->frame_type`
**must** be `STD_VIDEO_AV1_FRAME_TYPE_KEY` or
`STD_VIDEO_AV1_FRAME_TYPE_INTRA_ONLY`

* 
[](#VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10327) VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10327

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pStdPictureInfo->frame_type` for the `pStdPictureInfo` member
of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is
`STD_VIDEO_AV1_FRAME_TYPE_KEY` or
`STD_VIDEO_AV1_FRAME_TYPE_INTRA_ONLY`, then
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`predictionMode` **must** be
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_INTRA_ONLY_KHR](VkVideoEncodeAV1PredictionModeKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-maxSingleReferenceCount-10328) VUID-vkCmdEncodeVideoKHR-maxSingleReferenceCount-10328

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxSingleReferenceCount` is
zero, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for
the video profile the bound video session was created with, then the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
not be [VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_SINGLE_REFERENCE_KHR](VkVideoEncodeAV1PredictionModeKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-predictionMode-10329) VUID-vkCmdEncodeVideoKHR-predictionMode-10329

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` is
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_SINGLE_REFERENCE_KHR](VkVideoEncodeAV1PredictionModeKHR.html), then
there **must** be at least one non-negative element of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`referenceNameSlotIndices`
with element index i that does not equal
`cdfOnlyReferenceIndex` and for which bit index i is set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`singleReferenceNameMask`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-maxUnidirectionalCompoundReferenceCount-10330) VUID-vkCmdEncodeVideoKHR-maxUnidirectionalCompoundReferenceCount-10330

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxUnidirectionalCompoundReferenceCount`
is zero, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with, then the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
not be
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_UNIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-predictionMode-10331) VUID-vkCmdEncodeVideoKHR-predictionMode-10331

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` is
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_UNIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html),
then there **must** be at least two non-negative elements of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`referenceNameSlotIndices`
with element indices i and j where (i,j) ∈
{(0,1),(0,2),(0,3),(4,6)}, such that neither element equals
`cdfOnlyReferenceIndex` and for which bit indices i and
j are set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`unidirectionalCompoundReferenceNameMask`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-maxBidirectionalCompoundReferenceCount-10332) VUID-vkCmdEncodeVideoKHR-maxBidirectionalCompoundReferenceCount-10332

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxBidirectionalCompoundReferenceCount`
is zero, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with, then the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` **must**
not be
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_BIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-predictionMode-10333) VUID-vkCmdEncodeVideoKHR-predictionMode-10333

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` is
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_BIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html),
then there **must** be at least two non-negative elements of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`referenceNameSlotIndices`
with element indices i ∈ {0,1,2,3} and j ∈
{4,5,6}, respectively, such that neither element equals
`cdfOnlyReferenceIndex`, and for which bit indices i and
j are set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`bidirectionalCompoundReferenceNameMask`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-predictionMode-10857) VUID-vkCmdEncodeVideoKHR-predictionMode-10857

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
`predictionMode` member of the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)
structure included in the `pNext` chain of `pEncodeInfo` is
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_UNIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html) or
[VK_VIDEO_ENCODE_AV1_PREDICTION_MODE_BIDIRECTIONAL_COMPOUND_KHR](VkVideoEncodeAV1PredictionModeKHR.html),
and [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
bound video session was created with, does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_COMPOUND_PREDICTION_INTRA_REFRESH_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html),
then `pEncodeInfo->flags` **must** not include
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[](#VUID-vkCmdEncodeVideoKHR-referenceNameSlotIndices-10334) VUID-vkCmdEncodeVideoKHR-referenceNameSlotIndices-10334

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then each element of
the `referenceNameSlotIndices` array member of the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** either be negative or **must**
equal the `slotIndex` member of one of the elements of
`pEncodeInfo->pReferenceSlots`

* 
[](#VUID-vkCmdEncodeVideoKHR-slotIndex-10335) VUID-vkCmdEncodeVideoKHR-slotIndex-10335

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
`slotIndex` member of each element of
`pEncodeInfo->pReferenceSlots` **must** equal one of the elements of
the `referenceNameSlotIndices` array member of the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10336) VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10336

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pExtensionHeader` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pExtensionHeader->temporal_id` **must** be less than
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTemporalLayerCount`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10337) VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10337

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pExtensionHeader` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pExtensionHeader->spatial_id` **must** be less than
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxSpatialLayerCount`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10338) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10338

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, then the
`pExtensionHeader` member of
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)::`pStdReferenceInfo` for the
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` and the
`pExtensionHeader` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** both be `NULL` or not
`NULL`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10339) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10339

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, and the
`pExtensionHeader` member of
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)::`pStdReferenceInfo` for the
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` is not
`NULL`, then `pExtensionHeader->temporal_id` **must** equal
`pStdPictureInfo->pExtensionHeader→temporal_id` in the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10340) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-10340

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html),
`pEncodeInfo->pSetupReferenceSlot` is not `NULL`, and the
`pExtensionHeader` member of
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)::`pStdReferenceInfo` for the
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo->pSetupReferenceSlot` is not
`NULL`, then `pExtensionHeader->spatial_id` **must** equal
`pStdPictureInfo->pExtensionHeader→spatial_id` in the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo`

* 
[](#VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10341) VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10341

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pExtensionHeader` member of
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)::`pStdReferenceInfo` for any of
the [VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structures included in the
`pNext` chain of any element of `pEncodeInfo->pReferenceSlots`
is not `NULL`, then `pExtensionHeader->temporal_id` **must** be less
than [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTemporalLayerCount`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10342) VUID-vkCmdEncodeVideoKHR-pExtensionHeader-10342

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pExtensionHeader` member of
[VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html)::`pStdReferenceInfo` for any of
the [VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html) structures included in the
`pNext` chain of any element of `pEncodeInfo->pReferenceSlots`
is not `NULL`, then `pExtensionHeader->spatial_id` **must** be less
than [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxSpatialLayerCount`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10343) VUID-vkCmdEncodeVideoKHR-pTileInfo-10343

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pTileInfo->TileCols` **must** be greater than `0`

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10344) VUID-vkCmdEncodeVideoKHR-pTileInfo-10344

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pTileInfo->TileRows` **must** be greater than `0`

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10345) VUID-vkCmdEncodeVideoKHR-pTileInfo-10345

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pTileInfo->TileCols` **must** be less than or equal to
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTiles.width`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10346) VUID-vkCmdEncodeVideoKHR-pTileInfo-10346

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
`pTileInfo->TileRows` **must** be less than or equal to
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTiles.height`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10347) VUID-vkCmdEncodeVideoKHR-pTileInfo-10347

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
⌈`pEncodeInfo->srcPictureResource.codedExtent.width` /
`pTileInfo->TileCols`⌉ **must** be between
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`minTileSize.width` and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTileSize.width`,
inclusive, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pTileInfo-10348) VUID-vkCmdEncodeVideoKHR-pTileInfo-10348

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pTileInfo` member of
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo` for the
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` is not `NULL`, then
⌈`pEncodeInfo->srcPictureResource.codedExtent.height` /
`pTileInfo->TileRows`⌉ **must** be between
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`minTileSize.height` and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTileSize.height`,
inclusive, as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)
for the video profile the bound video session was created with

* 
[](#VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10349) VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10349

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo->flags.segmentation_enabled`
for the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be zero

* 
[](#VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10350) VUID-vkCmdEncodeVideoKHR-pStdPictureInfo-10350

If the bound video session was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
[VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)::`pStdPictureInfo->pSegmentation`
for the [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html) structure included in the
`pNext` chain of `pEncodeInfo` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-parameter) VUID-vkCmdEncodeVideoKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEncodeVideoKHR-pEncodeInfo-parameter) VUID-vkCmdEncodeVideoKHR-pEncodeInfo-parameter

 `pEncodeInfo` **must** be a valid pointer to a valid [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html) structure

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-recording) VUID-vkCmdEncodeVideoKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEncodeVideoKHR-commandBuffer-cmdpool) VUID-vkCmdEncodeVideoKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEncodeVideoKHR-renderpass) VUID-vkCmdEncodeVideoKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdEncodeVideoKHR-suspended) VUID-vkCmdEncodeVideoKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEncodeVideoKHR-videocoding) VUID-vkCmdEncodeVideoKHR-videocoding

 This command **must** only be called inside of a video coding scope

* 
[](#VUID-vkCmdEncodeVideoKHR-bufferlevel) VUID-vkCmdEncodeVideoKHR-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Inside | VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdEncodeVideoKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCmdEncodeVideoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
