# VkVideoEncodeIntraRefreshCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeIntraRefreshCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeIntraRefreshCapabilitiesKHR - Structure describing video encode intra refresh capabilities for a video profile

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`pVideoProfile->videoCodecOperation` specifying an encode operation, the
[VkVideoEncodeIntraRefreshCapabilitiesKHR](#) structure **can** be included in
the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html) structure to
retrieve capabilities specific to video encode intra refresh.

The `VkVideoEncodeIntraRefreshCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkVideoEncodeIntraRefreshCapabilitiesKHR {
    VkStructureType                          sType;
    void*                                    pNext;
    VkVideoEncodeIntraRefreshModeFlagsKHR    intraRefreshModes;
    uint32_t                                 maxIntraRefreshCycleDuration;
    uint32_t                                 maxIntraRefreshActiveReferencePictures;
    VkBool32                                 partitionIndependentIntraRefreshRegions;
    VkBool32                                 nonRectangularIntraRefreshRegions;
} VkVideoEncodeIntraRefreshCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`intraRefreshModes` is a bitmask of
[VkVideoEncodeIntraRefreshModeFlagBitsKHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html) values indicating the set
of supported [intra refresh modes](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes).

* 
`maxIntraRefreshCycleDuration` specifies the maximum supported
[intra refresh cycle duration](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-cycle-duration).

* 
`maxIntraRefreshActiveReferencePictures` is the maximum number of
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) when encoding
pictures with [intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh) enabled.
This capability indicates additional restrictions beyond the maximum
number of [active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures)
supported by the video profile, as reported in
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`maxActiveReferencePictures` and the
maximum requested at video session creation time in
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`maxActiveReferencePictures`.

* 
`partitionIndependentIntraRefreshRegions` specifies whether the
implementation supports intra refresh regions that are independent of
the picture partitioning used during encoding.
If it is [VK_TRUE](VK_TRUE.html), then pictures **can** be encoded with multiple
picture partitions, independent of the used intra refresh mode.
Otherwise, pictures **cannot** be encoded with multiple picture partitions
with any intra refresh mode other than
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html).

|  | This capability is only indicative for [AV1 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile) and does not impose any restrictions on the application as
| --- | --- |
implementations may change the application requested picture partitioning
according to implementation-specific restrictions. |

* 
`nonRectangularIntraRefreshRegions` specifies whether the
implementation supports non-rectangular intra refresh regions.

|  | If this capability is not supported, then using per picture partition intra
| --- | --- |
refresh may impose additional restrictions on the number of picture
partitions a picture can be encoded with. |

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeIntraRefreshCapabilitiesKHR-sType-sType) VUID-VkVideoEncodeIntraRefreshCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkVideoEncodeIntraRefreshModeFlagsKHR](VkVideoEncodeIntraRefreshModeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeIntraRefreshCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
