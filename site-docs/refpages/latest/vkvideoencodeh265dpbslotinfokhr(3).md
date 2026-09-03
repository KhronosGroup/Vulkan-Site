# VkVideoEncodeH265DpbSlotInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265DpbSlotInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265DpbSlotInfoKHR - Structure specifies H.265 encode DPB picture information

The [VkVideoEncodeH265DpbSlotInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265DpbSlotInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    const StdVideoEncodeH265ReferenceInfo*    pStdReferenceInfo;
} VkVideoEncodeH265DpbSlotInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdReferenceInfo` is a pointer to a
`StdVideoEncodeH265ReferenceInfo` structure specifying
[H.265 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h265-reference-info).

This structure is specified in the `pNext` chain of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot`, if not `NULL`, and
the `pNext` chain of the elements of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots` to specify the
codec-specific reference picture information for an [H.265 encode operation](../../../../spec/latest/chapters/videocoding.html#encode-h265).

Active Reference Picture Information

When this structure is specified in the `pNext` chain of the elements of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots`, one element is added to
the list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#encode-active-reference-picture-info) used by the video encode operation for each element of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots` as follows:

* 
The image subregion used is determined according to the
[H.265 Encode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#encode-h265-picture-data-access)
section.

* 
The reference picture is associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index
specified in the `slotIndex` member of the corresponding element of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots`.

* 
The reference picture is associated with the
[H.265 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h265-reference-info) provided in
`pStdReferenceInfo`.

Reconstructed Picture Information

When this structure is specified in the `pNext` chain of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot`, the information
related to the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#encode-reconstructed-picture-info)
is defined as follows:

* 
The image subregion used is determined according to the
[H.265 Encode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#encode-h265-picture-data-access)
section.

* 
If [reference picture setup](../../../../spec/latest/chapters/videocoding.html#encode-h265-ref-pic-setup) is requested,
then the reconstructed picture is used to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states)
the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) with the index specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot->slotIndex`.

* 
The reconstructed picture is associated with the
[H.265 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h265-reference-info) provided in
`pStdReferenceInfo`.

Std Reference Information

The members of the `StdVideoEncodeH265ReferenceInfo` structure pointed to
by `pStdReferenceInfo` are interpreted as follows:

* 
`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
`flags.used_for_long_term_reference` is used to indicate whether the
picture is marked as “used for long-term reference” as defined in
section 8.3.2 of the [ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
`flags.unused_for_reference` is used to indicate whether the picture
is marked as “unused for reference” as defined in section 8.3.2 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
`pic_type` as defined in section 7.4.3.5 of the [ITU-T    H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
`PicOrderCntVal` as defined in section 8.3.1 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265);

* 
`TemporalId` as defined in section 7.4.2.2 of the [ITU-T    H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265DpbSlotInfoKHR-sType-sType) VUID-VkVideoEncodeH265DpbSlotInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH265DpbSlotInfoKHR-pStdReferenceInfo-parameter) VUID-VkVideoEncodeH265DpbSlotInfoKHR-pStdReferenceInfo-parameter

 `pStdReferenceInfo` **must** be a valid pointer to a valid `StdVideoEncodeH265ReferenceInfo` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265DpbSlotInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
