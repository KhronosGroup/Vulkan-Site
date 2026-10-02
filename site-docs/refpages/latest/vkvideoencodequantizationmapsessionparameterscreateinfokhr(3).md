# VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR - Structure specifying quantization map texel size for video session parameters

The `VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR`
structure is defined as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkExtent2D         quantizationMapTexelSize;
} VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`quantizationMapTexelSize` specifies the
[quantization map texel size](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size) a
video session parameters object created with
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](VkVideoSessionParametersCreateFlagBitsKHR.html)
is compatible with.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR-sType-sType) VUID-VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
