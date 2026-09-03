# VkVideoDecodeAV1DpbSlotInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1DpbSlotInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1DpbSlotInfoKHR - Structure specifies AV1 DPB information when decoding a frame

The `VkVideoDecodeAV1DpbSlotInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_av1
typedef struct VkVideoDecodeAV1DpbSlotInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    const StdVideoDecodeAV1ReferenceInfo*    pStdReferenceInfo;
} VkVideoDecodeAV1DpbSlotInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdReferenceInfo` is a pointer to a
`StdVideoDecodeAV1ReferenceInfo` structure specifying
[AV1 reference information](../../../../spec/latest/chapters/videocoding.html#decode-av1-reference-info).

This structure is specified in the `pNext` chain of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot`, if not `NULL`, and
the `pNext` chain of the elements of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots` to specify the
codec-specific reference picture information for an [AV1 decode operation](../../../../spec/latest/chapters/videocoding.html#decode-av1).

Active Reference Picture Information

When this structure is specified in the `pNext` chain of the elements of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots`, one element is added to
the list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#decode-active-reference-picture-info) used by the video decode operation for each element of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots` as follows:

* 
The image subregion used is determined according to the
[AV1 Decode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-data-access)
section.

* 
The reference picture is associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index
specified in the `slotIndex` member of the corresponding element of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots`.

* 
The reference picture is associated with the
[AV1 reference information](../../../../spec/latest/chapters/videocoding.html#decode-av1-reference-info) provided in
`pStdReferenceInfo`.

Reconstructed Picture Information

When this structure is specified in the `pNext` chain of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot`, the information
related to the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-reconstructed-picture-info)
is defined as follows:

* 
The image subregion used is determined according to the
[AV1 Decode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-data-access)
section.

* 
If [reference picture setup](../../../../spec/latest/chapters/videocoding.html#decode-av1-ref-pic-setup) is requested,
then the reconstructed picture is used to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states)
the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) with the index specified in
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot->slotIndex`.

* 
The reconstructed picture is associated with the
[AV1 reference information](../../../../spec/latest/chapters/videocoding.html#decode-av1-reference-info) provided in
`pStdReferenceInfo`.

Std Reference Information

The members of the `StdVideoDecodeAV1ReferenceInfo` structure pointed to
by `pStdReferenceInfo` are interpreted as follows:

* 
`flags.reserved` and `reserved1` are used only for padding
purposes and are otherwise ignored;

* 
`flags.disable_frame_end_update_cdf` is interpreted as defined in
section 6.8.2 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`flags.segmentation_enabled` is interpreted as defined in section
6.8.13 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`frame_type` is interpreted as defined in section 6.8.2 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

|  | The `frame_type` member is defined with the type `uint8_t`, but it
| --- | --- |
takes the same values defined in the `StdVideoAV1FrameType` enumeration
type as `StdVideoDecodeAV1PictureInfo`::`frame_type`. |

* 
`RefFrameSignBias` is a bitmask where bit index i corresponds
to `RefFrameSignBias[i]` as defined in section 6.8.2 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`OrderHint` is interpreted as defined in section 6.8.2 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`SavedOrderHints` is interpreted as defined in section 7.20 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

|  | When the AV1 reference information is provided for the reconstructed
| --- | --- |
picture, certain parameters (e.g. `frame_type`) are specified both in the
[AV1 picture information](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-info) and in the AV1 reference
information.
This is necessary because unlike the AV1 picture information, which is only
used for the purposes of the video decode operation in question, the AV1
reference information specified for the reconstructed picture **may** be
associated with the activated DPB slot, meaning that some implementations
**may** maintain it as part of the [reference picture metadata](../../../../spec/latest/chapters/videocoding.html#reference-metadata) corresponding to the video picture resource associated with the
DPB slot.
When the AV1 reference information is provided for an active reference
picture, the specified parameters correspond to the parameters specified
when the DPB slot was activated (set up) with the reference picture, as
usual, in order to communicate these parameters for implementations that do
not maintain any subset of these parameters as part of the DPB slot’s
[reference picture metadata](../../../../spec/latest/chapters/videocoding.html#reference-metadata). |

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1DpbSlotInfoKHR-sType-sType) VUID-VkVideoDecodeAV1DpbSlotInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeAV1DpbSlotInfoKHR-pStdReferenceInfo-parameter) VUID-VkVideoDecodeAV1DpbSlotInfoKHR-pStdReferenceInfo-parameter

 `pStdReferenceInfo` **must** be a valid pointer to a valid `StdVideoDecodeAV1ReferenceInfo` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1DpbSlotInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
