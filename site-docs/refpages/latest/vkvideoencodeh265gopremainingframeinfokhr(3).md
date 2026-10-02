# VkVideoEncodeH265GopRemainingFrameInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265GopRemainingFrameInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265GopRemainingFrameInfoKHR - Structure specifying H.265 encode rate control GOP remaining frame counts

The `VkVideoEncodeH265GopRemainingFrameInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265GopRemainingFrameInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           useGopRemainingFrames;
    uint32_t           gopRemainingI;
    uint32_t           gopRemainingP;
    uint32_t           gopRemainingB;
} VkVideoEncodeH265GopRemainingFrameInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`useGopRemainingFrames` indicates whether the implementation’s rate
control algorithm **should** use the values specified in
`gopRemainingI`, `gopRemainingP`, and `gopRemainingB`.
If `useGopRemainingFrames` is [VK_FALSE](VK_FALSE.html), then the values of
`gopRemainingI`, `gopRemainingP`, and `gopRemainingB` are
ignored.

* 
`gopRemainingI` specifies the number of [I    frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-i-pic) the implementation’s rate control algorithm **should** assume to
be remaining in the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-h265-gop) prior to executing the video
encode operation.

* 
`gopRemainingP` specifies the number of [P    frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-p-pic) the implementation’s rate control algorithm **should** assume to
be remaining in the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-h265-gop) prior to executing the video
encode operation.

* 
`gopRemainingB` specifies the number of [B    frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic) the implementation’s rate control algorithm **should** assume to
be remaining in the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-h265-gop) prior to executing the video
encode operation.

Setting `useGopRemainingFrames` to [VK_TRUE](VK_TRUE.html) and including this
structure in the `pNext` chain of [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html) is
only mandatory if the
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`requiresGopRemainingFrames`
reported for the used [video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) is [VK_TRUE](VK_TRUE.html).
However, implementations **may** use these remaining frame counts, when
specified, even when it is not required.
In particular, when the application does not use a
[regular GOP structure](../../../../spec/latest/chapters/videocoding.html#encode-h265-regular-gop), these values **may** provide
additional guidance for the implementation’s rate control algorithm.

The [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`prefersGopRemainingFrames`
capability is also used to indicate that the implementation’s rate control
algorithm **may** operate more accurately if the application specifies the
remaining frame counts using this structure.

As with other rate control guidance values, if the effective order and
number of frames encoded by the application are not in line with the
remaining frame counts specified in this structure at any given point, then
the behavior of the implementation’s rate control algorithm **may** deviate
from the one expected by the application.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265GopRemainingFrameInfoKHR-sType-sType) VUID-VkVideoEncodeH265GopRemainingFrameInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_GOP_REMAINING_FRAME_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265GopRemainingFrameInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
