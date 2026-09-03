# VkVideoReferenceIntraRefreshInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoReferenceIntraRefreshInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoReferenceIntraRefreshInfoKHR - Structure specifying video reference picture intra refresh parameters

The `VkVideoReferenceIntraRefreshInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkVideoReferenceIntraRefreshInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dirtyIntraRefreshRegions;
} VkVideoReferenceIntraRefreshInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dirtyIntraRefreshRegions` is the number of
[dirty intra refresh regions](../../../../spec/latest/chapters/videocoding.html#encode-dirty-intra-refresh-regions) in
the reference picture.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoReferenceIntraRefreshInfoKHR-sType-sType) VUID-VkVideoReferenceIntraRefreshInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_REFERENCE_INTRA_REFRESH_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoReferenceIntraRefreshInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
