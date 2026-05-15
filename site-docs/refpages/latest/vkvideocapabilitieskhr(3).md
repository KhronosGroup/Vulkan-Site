# VkVideoCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoCapabilitiesKHR - Structure describing general video capabilities for a video profile

The `VkVideoCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoCapabilitiesKHR {
    VkStructureType              sType;
    void*                        pNext;
    VkVideoCapabilityFlagsKHR    flags;
    VkDeviceSize                 minBitstreamBufferOffsetAlignment;
    VkDeviceSize                 minBitstreamBufferSizeAlignment;
    VkExtent2D                   pictureAccessGranularity;
    VkExtent2D                   minCodedExtent;
    VkExtent2D                   maxCodedExtent;
    uint32_t                     maxDpbSlots;
    uint32_t                     maxActiveReferencePictures;
    VkExtensionProperties        stdHeaderVersion;
} VkVideoCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkVideoCapabilityFlagBitsKHR](VkVideoCapabilityFlagBitsKHR.html)
specifying capability flags.

* 
`minBitstreamBufferOffsetAlignment` is the minimum alignment for
bitstream buffer offsets.

* 
`minBitstreamBufferSizeAlignment` is the minimum alignment for
bitstream buffer range sizes.

* 
`pictureAccessGranularity` is the granularity at which image access
to video picture resources happen.

* 
`minCodedExtent` is the minimum width and height of the coded
frames.

* 
`maxCodedExtent` is the maximum width and height of the coded
frames.

* 
`maxDpbSlots` is the maximum number of [DPB slots](../../../../spec/latest/chapters/videocoding.html#dpb-slot)
supported by a single video session.

* 
`maxActiveReferencePictures` is the maximum number of
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) a single video
coding operation **can** use.

* 
 `stdHeaderVersion` is a
[VkExtensionProperties](VkExtensionProperties.html) structure reporting the Video Std header
name and version supported for the video profile.

|  | It is common for video compression standards to allow using all reference
| --- | --- |
pictures associated with active DPB slots as active reference pictures,
hence for video decode profiles the values returned in `maxDpbSlots` and
`maxActiveReferencePictures` are often equal.
Similarly, in case of video decode profiles supporting field pictures the
value of `maxActiveReferencePictures` often equals
`maxDpbSlots` × 2. |

Valid Usage (Implicit)

* 
[](#VUID-VkVideoCapabilitiesKHR-sType-sType) VUID-VkVideoCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoCapabilitiesKHR-pNext-pNext) VUID-VkVideoCapabilitiesKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoDecodeAV1CapabilitiesKHR](VkVideoDecodeAV1CapabilitiesKHR.html), [VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html), [VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html), [VkVideoDecodeH265CapabilitiesKHR](VkVideoDecodeH265CapabilitiesKHR.html), [VkVideoDecodeVP9CapabilitiesKHR](VkVideoDecodeVP9CapabilitiesKHR.html), [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html), [VkVideoEncodeAV1QuantizationMapCapabilitiesKHR](VkVideoEncodeAV1QuantizationMapCapabilitiesKHR.html), [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html), [VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html), [VkVideoEncodeH264QuantizationMapCapabilitiesKHR](VkVideoEncodeH264QuantizationMapCapabilitiesKHR.html), [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html), [VkVideoEncodeH265QuantizationMapCapabilitiesKHR](VkVideoEncodeH265QuantizationMapCapabilitiesKHR.html), [VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html), [VkVideoEncodeQuantizationMapCapabilitiesKHR](VkVideoEncodeQuantizationMapCapabilitiesKHR.html), or [VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)

* 
[](#VUID-VkVideoCapabilitiesKHR-sType-unique) VUID-VkVideoCapabilitiesKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_queue](VK_KHR_video_queue.html), `VkDeviceSize`, [VkExtensionProperties](VkExtensionProperties.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html), [VkVideoCapabilityFlagsKHR](VkVideoCapabilityFlagsKHR.html), [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
