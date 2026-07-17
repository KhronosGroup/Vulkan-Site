# VkVideoDecodeH265DpbSlotInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH265DpbSlotInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH265DpbSlotInfoKHR - Structure specifies H.265 DPB information when decoding a frame

The `VkVideoDecodeH265DpbSlotInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_h265
typedef struct VkVideoDecodeH265DpbSlotInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    const StdVideoDecodeH265ReferenceInfo*    pStdReferenceInfo;
} VkVideoDecodeH265DpbSlotInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdReferenceInfo` is a pointer to a
`StdVideoDecodeH265ReferenceInfo` structure specifying reference
picture information described in section 8.3 of the [ITU-T    H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).

This structure is specified in the `pNext` chain of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot`, if not `NULL`, and
the `pNext` chain of the elements of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots` to specify the
codec-specific reference picture information for an [H.265 decode operation](../../../../spec/latest/chapters/videocoding.html#decode-h265).

Active Reference Picture Information

When this structure is specified in the `pNext` chain of the elements of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots`, one element is added to
the list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#decode-active-reference-picture-info) used by the video decode operation for each element of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots` as follows:

* 
The image subregion used is determined according to the
[H.265 Decode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#decode-h265-picture-data-access)
section.

* 
The reference picture is associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index
specified in the `slotIndex` member of the corresponding element of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pReferenceSlots`.

* 
The reference picture is associated with the
[H.265 reference information](../../../../spec/latest/chapters/videocoding.html#decode-h265-reference-info) provided in
`pStdReferenceInfo`.

Reconstructed Picture Information

When this structure is specified in the `pNext` chain of
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot`, the information
related to the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-reconstructed-picture-info)
is defined as follows:

* 
The image subregion used is determined according to the
[H.265 Decode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#decode-h265-picture-data-access)
section.

* 
If [reference picture setup](../../../../spec/latest/chapters/videocoding.html#decode-h265-ref-pic-setup) is requested,
then the reconstructed picture is used to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states)
the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) with the index specified in
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot->slotIndex`.

* 
The reconstructed picture is associated with the
[H.265 reference information](../../../../spec/latest/chapters/videocoding.html#decode-h265-reference-info) provided in
`pStdReferenceInfo`.

Std Reference Information

The members of the `StdVideoDecodeH265ReferenceInfo` structure pointed to
by `pStdReferenceInfo` are interpreted as follows:

* 
`flags.used_for_long_term_reference` is used to indicate whether the
picture is marked as “used for long-term reference” as defined in
section 8.3.2 of the [ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
`flags.unused_for_reference` is used to indicate whether the picture
is marked as “unused for reference” as defined in section 8.3.2 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
all other members are interpreted as defined in section 8.3 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH265DpbSlotInfoKHR-sType-sType) VUID-VkVideoDecodeH265DpbSlotInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeH265DpbSlotInfoKHR-pStdReferenceInfo-parameter) VUID-VkVideoDecodeH265DpbSlotInfoKHR-pStdReferenceInfo-parameter

 `pStdReferenceInfo` **must** be a valid pointer to a valid `StdVideoDecodeH265ReferenceInfo` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

[VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH265DpbSlotInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
