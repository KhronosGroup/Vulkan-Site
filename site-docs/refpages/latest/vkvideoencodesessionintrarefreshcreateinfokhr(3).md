# VkVideoEncodeSessionIntraRefreshCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeSessionIntraRefreshCreateInfoKHR - Video encode session intra refresh parameters

The `VkVideoEncodeSessionIntraRefreshCreateInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkVideoEncodeSessionIntraRefreshCreateInfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkVideoEncodeIntraRefreshModeFlagBitsKHR    intraRefreshMode;
} VkVideoEncodeSessionIntraRefreshCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`intraRefreshMode` is a
[VkVideoEncodeIntraRefreshModeFlagBitsKHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html) specifying the used
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeSessionIntraRefreshCreateInfoKHR-sType-sType) VUID-VkVideoEncodeSessionIntraRefreshCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_INTRA_REFRESH_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeSessionIntraRefreshCreateInfoKHR-intraRefreshMode-parameter) VUID-VkVideoEncodeSessionIntraRefreshCreateInfoKHR-intraRefreshMode-parameter

 If `intraRefreshMode` is not `0`, `intraRefreshMode` **must** be a valid [VkVideoEncodeIntraRefreshModeFlagBitsKHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeIntraRefreshModeFlagBitsKHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeSessionIntraRefreshCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
