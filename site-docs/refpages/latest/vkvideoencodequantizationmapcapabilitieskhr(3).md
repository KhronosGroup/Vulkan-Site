# VkVideoEncodeQuantizationMapCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeQuantizationMapCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeQuantizationMapCapabilitiesKHR - Structure describing video encode quantization map capabilities for a video profile

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`pVideoProfile->videoCodecOperation` specifying an encode operation, the
[VkVideoEncodeQuantizationMapCapabilitiesKHR](#) structure **can** be included
in the `pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html) structure to
retrieve capabilities specific to video encode quantization maps.

The `VkVideoEncodeQuantizationMapCapabilitiesKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkVideoEncodeQuantizationMapCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         maxQuantizationMapExtent;
} VkVideoEncodeQuantizationMapCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxQuantizationMapExtent` indicates the maximum supported width and
height of quantization maps.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeQuantizationMapCapabilitiesKHR-sType-sType) VUID-VkVideoEncodeQuantizationMapCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeQuantizationMapCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
