# VkVideoEncodeQuantizationMapInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeQuantizationMapInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeQuantizationMapInfoKHR - Structure specifying quantization map information to use for video encode operations

The `VkVideoEncodeQuantizationMapInfoKHR` structure **can** be included in
the `pNext` chain of the [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html) structure passed to
the [vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html) command to specify the quantization map used
by the issued video encode operations.

The `VkVideoEncodeQuantizationMapInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeQuantizationMapInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        quantizationMap;
    VkExtent2D         quantizationMapExtent;
} VkVideoEncodeQuantizationMapInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`quantizationMap` specifies the image view to use as the
quantization map.

* 
`quantizationMapExtent` specifies the extent of the image subregion
of `quantizationMap` to use as the quantization map starting at
offset (0,0).

Valid Usage

* 
[](#VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMapExtent-10352) VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMapExtent-10352

`quantizationMapExtent.width` **must** be less than or equal to the
width of `quantizationMap`

* 
[](#VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMapExtent-10353) VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMapExtent-10353

`quantizationMapExtent.height` **must** be less than or equal to the
height of `quantizationMap`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeQuantizationMapInfoKHR-sType-sType) VUID-VkVideoEncodeQuantizationMapInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMap-parameter) VUID-VkVideoEncodeQuantizationMapInfoKHR-quantizationMap-parameter

 If `quantizationMap` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `quantizationMap` **must** be a valid [VkImageView](VkImageView.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkExtent2D](VkExtent2D.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeQuantizationMapInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
