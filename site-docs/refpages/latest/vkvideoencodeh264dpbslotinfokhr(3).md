# VkVideoEncodeH264DpbSlotInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264DpbSlotInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264DpbSlotInfoKHR - Structure specifies H.264 encode DPB picture information

The [VkVideoEncodeH264DpbSlotInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264DpbSlotInfoKHR {
    VkStructureType                           sType;
    const void*                               pNext;
    const StdVideoEncodeH264ReferenceInfo*    pStdReferenceInfo;
} VkVideoEncodeH264DpbSlotInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdReferenceInfo` is a pointer to a
`StdVideoEncodeH264ReferenceInfo` structure specifying
[H.264 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h264-reference-info).

This structure is specified in the `pNext` chain of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot`, if not `NULL`, and
the `pNext` chain of the elements of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots` to specify the
codec-specific reference picture information for an [H.264 encode operation](../../../../spec/latest/chapters/videocoding.html#encode-h264).

Active Reference Picture Information

When this structure is specified in the `pNext` chain of the elements of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots`, one element is added to
the list of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#encode-active-reference-picture-info) used by the video encode operation for each element of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots` as follows:

* 
The image subregion used is determined according to the
[H.264 Encode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#encode-h264-picture-data-access)
section.

* 
The reference picture is associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) index
specified in the `slotIndex` member of the corresponding element of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pReferenceSlots`.

* 
The reference picture is associated with the
[H.264 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h264-reference-info) provided in
`pStdReferenceInfo`.

Reconstructed Picture Information

When this structure is specified in the `pNext` chain of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot`, the information
related to the [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#encode-reconstructed-picture-info)
is defined as follows:

* 
The image subregion used is determined according to the
[H.264 Encode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#encode-h264-picture-data-access)
section.

* 
If [reference picture setup](../../../../spec/latest/chapters/videocoding.html#encode-h264-ref-pic-setup) is requested,
then the reconstructed picture is used to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states)
the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) with the index specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`pSetupReferenceSlot->slotIndex`.

* 
The reconstructed picture is associated with the
[H.264 reference information](../../../../spec/latest/chapters/videocoding.html#encode-h264-reference-info) provided in
`pStdReferenceInfo`.

Std Reference Information

The members of the `StdVideoEncodeH264ReferenceInfo` structure pointed to
by `pStdReferenceInfo` are interpreted as follows:

* 
`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
`flags.used_for_long_term_reference` is used to indicate whether the
picture is marked as “used for long-term reference” as defined in
section 8.2.5.1 of the [ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264);

* 
`primary_pic_type` as defined in section 7.4.2 of the [    ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264);

* 
`long_term_pic_num` and `long_term_frame_idx` as defined in
section 7.4.3 of the [ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264);

* 
`temporal_id` as defined in section G.7.4.1.1 of the [    ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264);

* 
all other members are interpreted as defined in section 8.2 of the
[ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264DpbSlotInfoKHR-sType-sType) VUID-VkVideoEncodeH264DpbSlotInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_DPB_SLOT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH264DpbSlotInfoKHR-pStdReferenceInfo-parameter) VUID-VkVideoEncodeH264DpbSlotInfoKHR-pStdReferenceInfo-parameter

 `pStdReferenceInfo` **must** be a valid pointer to a valid `StdVideoEncodeH264ReferenceInfo` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264DpbSlotInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
