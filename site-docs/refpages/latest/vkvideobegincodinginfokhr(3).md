# VkVideoBeginCodingInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoBeginCodingInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoBeginCodingInfoKHR - Structure specifying video coding scope begin information

The [VkVideoBeginCodingInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoBeginCodingInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkVideoBeginCodingFlagsKHR            flags;
    VkVideoSessionKHR                     videoSession;
    VkVideoSessionParametersKHR           videoSessionParameters;
    uint32_t                              referenceSlotCount;
    const VkVideoReferenceSlotInfoKHR*    pReferenceSlots;
} VkVideoBeginCodingInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`videoSession` is the video session object to be bound for the
processing of the video commands.

* 
`videoSessionParameters` is `VK_NULL_HANDLE` or a handle of a
[VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html) object to be used for the processing
of the video commands.
If `VK_NULL_HANDLE`, then no video session parameters object is
bound for the duration of the video coding scope.

* 
`referenceSlotCount` is the number of elements in the
`pReferenceSlots` array.

* 
`pReferenceSlots` is a pointer to an array of
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures specifying the information
used to determine the set of [bound    reference picture resources](../../../../spec/latest/chapters/videocoding.html#bound-reference-picture-resources) for the video coding scope and their
initial association with [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) indices.

Limiting values are defined below that are referenced by the relevant valid
usage statements of this structure.

* 
Let `VkOffset2D codedOffsetGranularity` be the minimum alignment
requirement for the coded offset of video picture resources.
Unless otherwise defined, the value of the `x` and `y` members
of `codedOffsetGranularity` are `0`.

If `videoSession` was created with an [H.264     decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile) with a
[VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html)::`pictureLayout` of
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html),
then `codedOffsetGranularity` is equal to
[VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html)::`fieldOffsetGranularity`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for that
video profile.

Valid Usage

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-07237) VUID-VkVideoBeginCodingInfoKHR-videoSession-07237

`videoSession` **must** have memory bound to all of its memory bindings
returned by [vkGetVideoSessionMemoryRequirementsKHR](vkGetVideoSessionMemoryRequirementsKHR.html) for
`videoSession`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-slotIndex-04856) VUID-VkVideoBeginCodingInfoKHR-slotIndex-04856

Each non-negative [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)::`slotIndex`
specified in the elements of `pReferenceSlots` **must** be less than
the [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxDpbSlots` specified when
`videoSession` was created

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07238) VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07238

Each video picture resource corresponding to any non-`NULL`
`pPictureResource` member specified in the elements of
`pReferenceSlots` **must** be [    unique](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-uniqueness) within `pReferenceSlots`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07240) VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07240

If the `pPictureResource` member of any element of
`pReferenceSlots` is not `NULL`, then the image view specified in
`pPictureResource->imageViewBinding` for that element **must** be
[compatible](../../../../spec/latest/chapters/videocoding.html#video-profile-compatibility) with the video profile
`videoSession` was created with

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07241) VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07241

If the `pPictureResource` member of any element of
`pReferenceSlots` is not `NULL`, then the format of the image view
specified in `pPictureResource->imageViewBinding` for that element
**must** match the
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`referencePictureFormat`
`videoSession` was created with

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07242) VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07242

If the `pPictureResource` member of any element of
`pReferenceSlots` is not `NULL`, then its `codedOffset` member
**must** be an integer multiple of `codedOffsetGranularity`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07243) VUID-VkVideoBeginCodingInfoKHR-pPictureResource-07243

If the `pPictureResource` member of any element of
`pReferenceSlots` is not `NULL`, then its `codedExtent` member
**must** be between `minCodedExtent` and `maxCodedExtent`,
inclusive, `videoSession` was created with

* 
[](#VUID-VkVideoBeginCodingInfoKHR-flags-07244) VUID-VkVideoBeginCodingInfoKHR-flags-07244

If [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_CAPABILITY_SEPARATE_REFERENCE_IMAGES_BIT_KHR](VkVideoCapabilityFlagBitsKHR.html), as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
`videoSession` was created with, then
`pPictureResource->imageViewBinding` of all elements of
`pReferenceSlots` with a non-`NULL` `pPictureResource` member
**must** specify image views created from the same image

* 
[](#VUID-VkVideoBeginCodingInfoKHR-slotIndex-07245) VUID-VkVideoBeginCodingInfoKHR-slotIndex-07245

If `videoSession` was created with a decode operation and the
`slotIndex` member of any element of `pReferenceSlots` is not
negative, then the image view specified in
`pPictureResource->imageViewBinding` for that element **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkVideoBeginCodingInfoKHR-slotIndex-07246) VUID-VkVideoBeginCodingInfoKHR-slotIndex-07246

If `videoSession` was created with an encode operation and the
`slotIndex` member of any element of `pReferenceSlots` is not
negative, then the image view specified in
`pPictureResource->imageViewBinding` for that element **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-07247) VUID-VkVideoBeginCodingInfoKHR-videoSession-07247

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`
, unless the [`videoMaintenance2`](../../../../spec/latest/chapters/features.html#features-videoMaintenance2)
feature is enabled

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-07248) VUID-VkVideoBeginCodingInfoKHR-videoSession-07248

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`
, unless the [`videoMaintenance2`](../../../../spec/latest/chapters/features.html#features-videoMaintenance2)
feature is enabled

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-09261) VUID-VkVideoBeginCodingInfoKHR-videoSession-09261

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`
, unless the [`videoMaintenance2`](../../../../spec/latest/chapters/features.html#features-videoMaintenance2)
feature is enabled

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-07249) VUID-VkVideoBeginCodingInfoKHR-videoSession-07249

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-07250) VUID-VkVideoBeginCodingInfoKHR-videoSession-07250

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-10283) VUID-VkVideoBeginCodingInfoKHR-videoSession-10283

If `videoSession` was created with the video codec operation
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then
`videoSessionParameters` **must** not be `VK_NULL_HANDLE`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSessionParameters-04857) VUID-VkVideoBeginCodingInfoKHR-videoSessionParameters-04857

If `videoSessionParameters` is not `VK_NULL_HANDLE`, it **must**
have been created with `videoSession` specified in
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)::`videoSession`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoBeginCodingInfoKHR-sType-sType) VUID-VkVideoBeginCodingInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_BEGIN_CODING_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pNext-pNext) VUID-VkVideoBeginCodingInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1GopRemainingFrameInfoKHR](VkVideoEncodeAV1GopRemainingFrameInfoKHR.html), [VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html), [VkVideoEncodeH264GopRemainingFrameInfoKHR](VkVideoEncodeH264GopRemainingFrameInfoKHR.html), [VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html), [VkVideoEncodeH265GopRemainingFrameInfoKHR](VkVideoEncodeH265GopRemainingFrameInfoKHR.html), [VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html), or [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)

* 
[](#VUID-VkVideoBeginCodingInfoKHR-sType-unique) VUID-VkVideoBeginCodingInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoBeginCodingInfoKHR-flags-zerobitmask) VUID-VkVideoBeginCodingInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSession-parameter) VUID-VkVideoBeginCodingInfoKHR-videoSession-parameter

 `videoSession` **must** be a valid [VkVideoSessionKHR](VkVideoSessionKHR.html) handle

* 
[](#VUID-VkVideoBeginCodingInfoKHR-videoSessionParameters-parameter) VUID-VkVideoBeginCodingInfoKHR-videoSessionParameters-parameter

 If `videoSessionParameters` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `videoSessionParameters` **must** be a valid [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html) handle

* 
[](#VUID-VkVideoBeginCodingInfoKHR-pReferenceSlots-parameter) VUID-VkVideoBeginCodingInfoKHR-pReferenceSlots-parameter

 If `referenceSlotCount` is not `0`, `pReferenceSlots` **must** be a valid pointer to an array of `referenceSlotCount` valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures

* 
[](#VUID-VkVideoBeginCodingInfoKHR-commonparent) VUID-VkVideoBeginCodingInfoKHR-commonparent

 Both of `videoSession`, and `videoSessionParameters` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoBeginCodingFlagsKHR](VkVideoBeginCodingFlagsKHR.html), [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html), [VkVideoSessionKHR](VkVideoSessionKHR.html), [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html), [vkCmdBeginVideoCodingKHR](vkCmdBeginVideoCodingKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoBeginCodingInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
