# VkVideoEncodeIntraRefreshInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeIntraRefreshInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeIntraRefreshInfoKHR - Structure specifying video encode intra refresh parameters

The `VkVideoEncodeIntraRefreshInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkVideoEncodeIntraRefreshInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           intraRefreshCycleDuration;
    uint32_t           intraRefreshIndex;
} VkVideoEncodeIntraRefreshInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`intraRefreshCycleDuration` is the used
[intra refresh cycle duration](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-cycle-duration).

* 
`intraRefreshIndex` is the [intra    refresh index](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-index) of the encoded picture.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeIntraRefreshInfoKHR-sType-sType) VUID-VkVideoEncodeIntraRefreshInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeIntraRefreshInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
