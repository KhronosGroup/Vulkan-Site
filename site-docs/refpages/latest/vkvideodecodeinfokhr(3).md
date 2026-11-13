# VkVideoDecodeInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeInfoKHR - Structure specifying video decode parameters

The `VkVideoDecodeInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_queue
typedef struct VkVideoDecodeInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkVideoDecodeFlagsKHR                 flags;
    VkBuffer                              srcBuffer;
    VkDeviceSize                          srcBufferOffset;
    VkDeviceSize                          srcBufferRange;
    VkVideoPictureResourceInfoKHR         dstPictureResource;
    const VkVideoReferenceSlotInfoKHR*    pSetupReferenceSlot;
    uint32_t                              referenceSlotCount;
    const VkVideoReferenceSlotInfoKHR*    pReferenceSlots;
} VkVideoDecodeInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`srcBuffer` is the source video bitstream buffer to read the encoded
bitstream from.

* 
`srcBufferOffset` is the starting offset in bytes from the start of
`srcBuffer` to read the encoded bitstream from.

* 
`srcBufferRange` is the size in bytes of the encoded bitstream to
decode from `srcBuffer`, starting from `srcBufferOffset`.

* 
`dstPictureResource` is the video picture resource to use as the
[decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture).

* 
`pSetupReferenceSlot` is `NULL` or a pointer to a
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure specifying the
[reconstructed picture information](../../../../spec/latest/chapters/videocoding.html#decode-reconstructed-picture-info).

* 
`referenceSlotCount` is the number of elements in the
`pReferenceSlots` array.

* 
`pReferenceSlots` is `NULL` or a pointer to an array of
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures describing the DPB slots
and corresponding [reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) resources to
use in this video decode operation (the set of
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures)).

Valid Usage

* 
[](#VUID-VkVideoDecodeInfoKHR-srcBuffer-07165) VUID-VkVideoDecodeInfoKHR-srcBuffer-07165

`srcBuffer` **must** have been created with the
[VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkVideoDecodeInfoKHR-srcBufferOffset-07166) VUID-VkVideoDecodeInfoKHR-srcBufferOffset-07166

`srcBufferOffset` **must** be less than the size of `srcBuffer`

* 
[](#VUID-VkVideoDecodeInfoKHR-srcBufferRange-07167) VUID-VkVideoDecodeInfoKHR-srcBufferRange-07167

`srcBufferRange` **must** be less than or equal to the size of
`srcBuffer` minus `srcBufferOffset`

* 
[](#VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-07168) VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-07168

If `pSetupReferenceSlot` is not `NULL`, then its `slotIndex`
member **must** not be negative

* 
[](#VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-07169) VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-07169

If `pSetupReferenceSlot` is not `NULL`, then its
`pPictureResource` **must** not be `NULL`

* 
[](#VUID-VkVideoDecodeInfoKHR-slotIndex-07171) VUID-VkVideoDecodeInfoKHR-slotIndex-07171

The `slotIndex` member of each element of `pReferenceSlots`
**must** not be negative

* 
[](#VUID-VkVideoDecodeInfoKHR-pPictureResource-07172) VUID-VkVideoDecodeInfoKHR-pPictureResource-07172

The `pPictureResource` member of each element of
`pReferenceSlots` **must** not be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeInfoKHR-sType-sType) VUID-VkVideoDecodeInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeInfoKHR-pNext-pNext) VUID-VkVideoDecodeInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoDecodeAV1InlineSessionParametersInfoKHR](VkVideoDecodeAV1InlineSessionParametersInfoKHR.html), [VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html), [VkVideoDecodeH264InlineSessionParametersInfoKHR](VkVideoDecodeH264InlineSessionParametersInfoKHR.html), [VkVideoDecodeH264PictureInfoKHR](VkVideoDecodeH264PictureInfoKHR.html), [VkVideoDecodeH265InlineSessionParametersInfoKHR](VkVideoDecodeH265InlineSessionParametersInfoKHR.html), [VkVideoDecodeH265PictureInfoKHR](VkVideoDecodeH265PictureInfoKHR.html), [VkVideoDecodeVP9PictureInfoKHR](VkVideoDecodeVP9PictureInfoKHR.html), or [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)

* 
[](#VUID-VkVideoDecodeInfoKHR-sType-unique) VUID-VkVideoDecodeInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoDecodeInfoKHR-flags-zerobitmask) VUID-VkVideoDecodeInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkVideoDecodeInfoKHR-srcBuffer-parameter) VUID-VkVideoDecodeInfoKHR-srcBuffer-parameter

 `srcBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkVideoDecodeInfoKHR-dstPictureResource-parameter) VUID-VkVideoDecodeInfoKHR-dstPictureResource-parameter

 `dstPictureResource` **must** be a valid [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure

* 
[](#VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-parameter) VUID-VkVideoDecodeInfoKHR-pSetupReferenceSlot-parameter

 If `pSetupReferenceSlot` is not `NULL`, `pSetupReferenceSlot` **must** be a valid pointer to a valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure

* 
[](#VUID-VkVideoDecodeInfoKHR-pReferenceSlots-parameter) VUID-VkVideoDecodeInfoKHR-pReferenceSlots-parameter

 If `referenceSlotCount` is not `0`, `pReferenceSlots` **must** be a valid pointer to an array of `referenceSlotCount` valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [VkVideoDecodeFlagsKHR](VkVideoDecodeFlagsKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html), [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html), [vkCmdDecodeVideoKHR](vkCmdDecodeVideoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
