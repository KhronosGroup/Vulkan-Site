# VkVideoEncodeInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeInfoKHR - Structure specifying video encode parameters

The `VkVideoEncodeInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkVideoEncodeFlagsKHR                 flags;
    VkBuffer                              dstBuffer;
    VkDeviceSize                          dstBufferOffset;
    VkDeviceSize                          dstBufferRange;
    VkVideoPictureResourceInfoKHR         srcPictureResource;
    const VkVideoReferenceSlotInfoKHR*    pSetupReferenceSlot;
    uint32_t                              referenceSlotCount;
    const VkVideoReferenceSlotInfoKHR*    pReferenceSlots;
    uint32_t                              precedingExternallyEncodedBytes;
} VkVideoEncodeInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

* 
`flags` is a bitmask of [VkVideoEncodeFlagBitsKHR](VkVideoEncodeFlagBitsKHR.html) indicating
video encode command flags.

* 
`dstBuffer` is the destination video bitstream buffer to write the
encoded bitstream to.

* 
`dstBufferOffset` is the starting offset in bytes from the start of
`dstBuffer` to write the encoded bitstream to.

* 
`dstBufferRange` is the maximum bitstream size in bytes that **can** be
written to `dstBuffer`, starting from `dstBufferOffset`.

* 
`srcPictureResource` is the video picture resource to use as the
[encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture).

* 
`pSetupReferenceSlot` is `NULL` or a pointer to a
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure specifying the
[reconstructed picture information](../../../../spec/latest/chapters/videocoding.html#encode-reconstructed-picture-info).

* 
`referenceSlotCount` is the number of elements in the
`pReferenceSlots` array.

* 
`pReferenceSlots` is `NULL` or a pointer to an array of
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures describing the DPB slots
and corresponding [reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) resources to
use in this video encode operation (the set of
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures)).

* 
`precedingExternallyEncodedBytes` is the number of bytes externally
encoded by the application to the video bitstream and is used to update
the internal state of the implementation’s [rate    control](../../../../spec/latest/chapters/videocoding.html#encode-rate-control) algorithm to account for the bitrate budget consumed by these
externally encoded bytes.

Valid Usage

* 
[](#VUID-VkVideoEncodeInfoKHR-dstBuffer-08236) VUID-VkVideoEncodeInfoKHR-dstBuffer-08236

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkVideoEncodeInfoKHR-dstBufferOffset-08237) VUID-VkVideoEncodeInfoKHR-dstBufferOffset-08237

`dstBufferOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-VkVideoEncodeInfoKHR-dstBufferRange-08238) VUID-VkVideoEncodeInfoKHR-dstBufferRange-08238

`dstBufferRange` **must** be less than or equal to the size of
`dstBuffer` minus `dstBufferOffset`

* 
[](#VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-08239) VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-08239

If `pSetupReferenceSlot` is not `NULL`, then its `slotIndex`
member **must** not be negative

* 
[](#VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-08240) VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-08240

If `pSetupReferenceSlot` is not `NULL`, then its
`pPictureResource` **must** not be `NULL`

* 
[](#VUID-VkVideoEncodeInfoKHR-slotIndex-08241) VUID-VkVideoEncodeInfoKHR-slotIndex-08241

The `slotIndex` member of each element of `pReferenceSlots`
**must** not be negative

* 
[](#VUID-VkVideoEncodeInfoKHR-pPictureResource-08242) VUID-VkVideoEncodeInfoKHR-pPictureResource-08242

The `pPictureResource` member of each element of
`pReferenceSlots` **must** not be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeInfoKHR-sType-sType) VUID-VkVideoEncodeInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeInfoKHR-pNext-pNext) VUID-VkVideoEncodeInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html), [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html), [VkVideoEncodeH265PictureInfoKHR](VkVideoEncodeH265PictureInfoKHR.html), [VkVideoEncodeIntraRefreshInfoKHR](VkVideoEncodeIntraRefreshInfoKHR.html), [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html), or [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)

* 
[](#VUID-VkVideoEncodeInfoKHR-sType-unique) VUID-VkVideoEncodeInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoEncodeInfoKHR-flags-parameter) VUID-VkVideoEncodeInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoEncodeFlagBitsKHR](VkVideoEncodeFlagBitsKHR.html) values

* 
[](#VUID-VkVideoEncodeInfoKHR-dstBuffer-parameter) VUID-VkVideoEncodeInfoKHR-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkVideoEncodeInfoKHR-srcPictureResource-parameter) VUID-VkVideoEncodeInfoKHR-srcPictureResource-parameter

 `srcPictureResource` **must** be a valid [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html) structure

* 
[](#VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-parameter) VUID-VkVideoEncodeInfoKHR-pSetupReferenceSlot-parameter

 If `pSetupReferenceSlot` is not `NULL`, `pSetupReferenceSlot` **must** be a valid pointer to a valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structure

* 
[](#VUID-VkVideoEncodeInfoKHR-pReferenceSlots-parameter) VUID-VkVideoEncodeInfoKHR-pReferenceSlots-parameter

 If `referenceSlotCount` is not `0`, `pReferenceSlots` **must** be a valid pointer to an array of `referenceSlotCount` valid [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html) structures

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [VkVideoEncodeFlagsKHR](VkVideoEncodeFlagsKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html), [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html), [vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
