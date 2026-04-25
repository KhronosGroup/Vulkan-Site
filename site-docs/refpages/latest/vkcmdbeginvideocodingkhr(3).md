# vkCmdBeginVideoCodingKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginVideoCodingKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginVideoCodingKHR - Begin video coding scope

To begin a video coding scope, call:

// Provided by VK_KHR_video_queue
void vkCmdBeginVideoCodingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkVideoBeginCodingInfoKHR*            pBeginInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pBeginInfo` is a pointer to a [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)
structure specifying the parameters of the video coding scope, including
the video session and video session parameters object to use.

After beginning a video coding scope, the video session object specified in
`pBeginInfo->videoSession` is *bound* to the command buffer, and the
command buffer is ready to record video coding operations.
Similarly, if `pBeginInfo->videoSessionParameters` is not
`VK_NULL_HANDLE`, it is also *bound* to the command buffer, and video
coding operations **can** refer to the codec-specific parameters stored in it.

This command also establishes the set of *bound reference picture resources*
that **can** be used as [reconstructed pictures](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) or
[reference pictures](../../../../spec/latest/chapters/videocoding.html#reference-picture) within the video coding scope.
Each element of this set consists of a [video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) and the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index associated with it,
if there is one.

The set of bound reference picture resources is immutable within a video
coding scope, however, the DPB slot index associated with any of the bound
reference picture resources **can** change during the video coding scope in
response to video coding operations.

The [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures provided as the elements of
`pBeginInfo->pReferenceSlots` are interpreted by this command as
follows:

* 
If `slotIndex` is non-negative and `pPictureResource` is not
`NULL`, then the [video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources)
defined by the [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure pointed to
by `pPictureResource` is added to the set of bound reference picture
resources and is associated with the DPB slot index specified in
`slotIndex`.

* 
If `slotIndex` is non-negative and `pPictureResource` is `NULL`,
then the DPB slot with index `slotIndex` is [    deactivated](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) by this command.

* 
If `slotIndex` is negative and `pPictureResource` is not `NULL`,
then the [video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) defined by
the [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure pointed to by
`pPictureResource` is added to the set of bound reference picture
resources without an associated DPB slot.
Such a picture resource **can** be subsequently used as a
[reconstructed picture](../../../../spec/latest/chapters/videocoding.html#reconstructed-picture) to associate it with a
DPB slot.

* 
If `slotIndex` is negative and `pPictureResource` is `NULL`,
then the element is ignored.

|  | It is possible for multiple bound reference picture resources to be
| --- | --- |
associated with the same DPB slot index, or for a single bound reference
picture to refer to multiple separate reference pictures.
For example, in case of an [H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile) with
[interlaced frame support](../../../../spec/latest/chapters/videocoding.html#decode-h264-interlaced-support) a single DPB
slot can refer to two separate pictures for the top and bottom fields.
Depending on the picture layout used by the [H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), the following special cases **may** arise:

* 
If the picture layout is
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html),
then the top and bottom field pictures are physically co-located in the
same video picture resource with even scanlines corresponding to the top
field and odd scanlines corresponding to the bottom field, respectively.

* 
If the picture layout is
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html),
then the top and bottom field pictures are stored in separate video
picture resources (in separate subregions of the same image layer, in
separate layers of the same image, or in entirely separate images),
hence two elements of
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)::`pReferenceSlots` **can** contain the
same `slotIndex` but specify different video picture resources in
their `pPictureResource` members. |

All non-negative `slotIndex` values specified in the elements of
`pBeginInfo->pReferenceSlots` **must** identify DPB slots of the video
session that are in the [active state](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) at the time this
command is executed on the device.

|  | The application does not have to specify an entry in
| --- | --- |
`pBeginInfo->pReferenceSlots` corresponding to all active DPB slots of
the video session, but only for those which are intended to be used in the
video coding scope.
This way the application can avoid any potential runtime cost associated
with binding the corresponding picture resources to the command buffer. |

In case of a video encode session, the application is also responsible for
providing information about the current [rate control state](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-state) configured for the video session by including an instance of
the [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure in the `pNext` chain
of `pBeginInfo`.
If no [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) is included, then the presence
of an empty [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure is implied which
indicates that the current [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes)
is [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).
The specified state **must** [match](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-state-matching) the
effective rate control state configured for the video session at the time
the recorded command is executed on the device.

|  | Including an instance of the [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure
| --- | --- |
in the `pNext` chain of `pBeginInfo` does not change the rate
control state configured for the video session, but only specifies the
expected rate control state configured at the time the recorded command is
executed on the device which allows the implementation to have information
about the configured rate control state at command buffer recording time.
In order to change the current rate control state of a video session, the
application has to issue an appropriate [vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html)
command as described in the [Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)
and [Rate Control State](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-state) sections. |

Valid Usage

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-11760) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-11760

The `VkCommandPool` that `commandBuffer` was allocated from
**must** have been created with the same queue family index that
`pBeginInfo->videoSession` was created with

* 
[](#VUID-vkCmdBeginVideoCodingKHR-None-07232) VUID-vkCmdBeginVideoCodingKHR-None-07232

There **must** be no [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) queries

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07233) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07233

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pBeginInfo->videoSession` **must** not have been created with
[VK_VIDEO_SESSION_CREATE_PROTECTED_CONTENT_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07234) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07234

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
then `pBeginInfo->videoSession` **must** have been created with
[VK_VIDEO_SESSION_CREATE_PROTECTED_CONTENT_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07235) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07235

If `commandBuffer` is an unprotected command buffer,
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
and the `pPictureResource` member of any element of
`pBeginInfo->pReferenceSlots` is not `NULL`, then
`pPictureResource->imageViewBinding` for that element **must** not
specify an image view created from a protected image

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07236) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-07236

If `commandBuffer` is a protected command buffer
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
and the `pPictureResource` member of any element of
`pBeginInfo->pReferenceSlots` is not `NULL`, then
`pPictureResource->imageViewBinding` for that element **must** specify
an image view created from a protected image

* 
[](#VUID-vkCmdBeginVideoCodingKHR-slotIndex-07239) VUID-vkCmdBeginVideoCodingKHR-slotIndex-07239

If the `slotIndex` member of any element of
`pBeginInfo->pReferenceSlots` is not negative, then it **must** specify
the index of a DPB slot that is in the [active state](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states)
in `pBeginInfo->videoSession` at the time the command is executed on
the device

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pPictureResource-07265) VUID-vkCmdBeginVideoCodingKHR-pPictureResource-07265

Each video picture resource specified by any non-`NULL`
`pPictureResource` member specified in the elements of
`pBeginInfo->pReferenceSlots` for which `slotIndex` is not
negative **must** [match](../../../../spec/latest/chapters/videocoding.html#video-picture-resource-matching) one of the
video picture resources currently associated with the DPB slot index of
`pBeginInfo->videoSession` specified by `slotIndex` at the time
the command is executed on the device

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08253) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08253

If `pBeginInfo->videoSession` was created with a video encode
operation and the `pNext` chain of `pBeginInfo` does not include
an instance of the [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure, then
the [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) configured for
`pBeginInfo->videoSession` at the time the command is executed on
the device **must** be [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08254) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08254

If `pBeginInfo->videoSession` was created with a video encode
operation and the `pNext` chain of `pBeginInfo` includes an
instance of the [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html) structure, then it
**must** [match](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-state-matching) the rate control
state configured for `pBeginInfo->videoSession` at the time the
command is executed on the device

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08255) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08255

If `pBeginInfo->videoSession` was created with the video codec
operation [VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
current [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), and
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`requiresGopRemainingFrames`
is [VK_TRUE](VK_TRUE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
`pBeginInfo->videoSession` was created with, then the `pNext`
chain of `pBeginInfo` **must** include an instance of the
[VkVideoEncodeH264GopRemainingFrameInfoKHR](VkVideoEncodeH264GopRemainingFrameInfoKHR.html) with its
`useGopRemainingFrames` member set to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08256) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-08256

If `pBeginInfo->videoSession` was created with the video codec
operation [VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
current [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), and
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`requiresGopRemainingFrames`
is [VK_TRUE](VK_TRUE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
`pBeginInfo->videoSession` was created with, then the `pNext`
chain of `pBeginInfo` **must** include an instance of the
[VkVideoEncodeH265GopRemainingFrameInfoKHR](VkVideoEncodeH265GopRemainingFrameInfoKHR.html) with its
`useGopRemainingFrames` member set to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-10282) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-10282

If `pBeginInfo->videoSession` was created with the video codec
operation [VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DEFAULT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), and
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`requiresGopRemainingFrames`
is [VK_TRUE](VK_TRUE.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile the
`pBeginInfo->videoSession` was created with, then the `pNext`
chain of `pBeginInfo` **must** include an instance of the
[VkVideoEncodeAV1GopRemainingFrameInfoKHR](VkVideoEncodeAV1GopRemainingFrameInfoKHR.html) with its
`useGopRemainingFrames` member set to [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-parameter) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-parameter) VUID-vkCmdBeginVideoCodingKHR-pBeginInfo-parameter

 `pBeginInfo` **must** be a valid pointer to a valid [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html) structure

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-recording) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginVideoCodingKHR-commandBuffer-cmdpool) VUID-vkCmdBeginVideoCodingKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginVideoCodingKHR-renderpass) VUID-vkCmdBeginVideoCodingKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginVideoCodingKHR-suspended) VUID-vkCmdBeginVideoCodingKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginVideoCodingKHR-videocoding) VUID-vkCmdBeginVideoCodingKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginVideoCodingKHR-bufferlevel) VUID-vkCmdBeginVideoCodingKHR-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdBeginVideoCodingKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
