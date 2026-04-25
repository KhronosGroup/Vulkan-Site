# VkVideoReferenceSlotInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoReferenceSlotInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoReferenceSlotInfoKHR - Structure specifying information about a reference picture slot

The `VkVideoReferenceSlotInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoReferenceSlotInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    int32_t                                 slotIndex;
    const VkVideoPictureResourceInfoKHR*    pPictureResource;
} VkVideoReferenceSlotInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`slotIndex` is the index of the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) or a negative
integer value.

* 
`pPictureResource` is `NULL` or a pointer to a
[VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure describing the
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) associated with the
DPB slot index specified by `slotIndex`.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoReferenceSlotInfoKHR-sType-sType) VUID-VkVideoReferenceSlotInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoReferenceSlotInfoKHR-pNext-pNext) VUID-VkVideoReferenceSlotInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoDecodeAV1DpbSlotInfoKHR](VkVideoDecodeAV1DpbSlotInfoKHR.html), [VkVideoDecodeH264DpbSlotInfoKHR](VkVideoDecodeH264DpbSlotInfoKHR.html), [VkVideoDecodeH265DpbSlotInfoKHR](VkVideoDecodeH265DpbSlotInfoKHR.html), [VkVideoEncodeAV1DpbSlotInfoKHR](VkVideoEncodeAV1DpbSlotInfoKHR.html), [VkVideoEncodeH264DpbSlotInfoKHR](VkVideoEncodeH264DpbSlotInfoKHR.html), [VkVideoEncodeH265DpbSlotInfoKHR](VkVideoEncodeH265DpbSlotInfoKHR.html), or [VkVideoReferenceIntraRefreshInfoKHR](VkVideoReferenceIntraRefreshInfoKHR.html)

* 
[](#VUID-VkVideoReferenceSlotInfoKHR-sType-unique) VUID-VkVideoReferenceSlotInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoReferenceSlotInfoKHR-pPictureResource-parameter) VUID-VkVideoReferenceSlotInfoKHR-pPictureResource-parameter

 If `pPictureResource` is not `NULL`, `pPictureResource` **must** be a valid pointer to a valid [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html), [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html), [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoReferenceSlotInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
