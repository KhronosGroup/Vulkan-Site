# VkSetLatencyMarkerInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSetLatencyMarkerInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSetLatencyMarkerInfoNV - Structure specifying the parameters of vkSetLatencyMarkerNV

The `VkSetLatencyMarkerInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkSetLatencyMarkerInfoNV {
    VkStructureType      sType;
    const void*          pNext;
    uint64_t             presentID;
    VkLatencyMarkerNV    marker;
} VkSetLatencyMarkerInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is an application provided value that is used to
    associate the timestamp with a `vkQueuePresentKHR` command using
[VkPresentIdKHR](VkPresentIdKHR.html)::`pPresentIds` or
[VkPresentId2KHR](VkPresentId2KHR.html)::`pPresentIds`
    for a given present.

* 
`marker` is the type of timestamp to be recorded.

Valid Usage (Implicit)

* 
[](#VUID-VkSetLatencyMarkerInfoNV-sType-sType) VUID-VkSetLatencyMarkerInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_LATENCY_MARKER_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkSetLatencyMarkerInfoNV-marker-parameter) VUID-VkSetLatencyMarkerInfoNV-marker-parameter

 `marker` **must** be a valid [VkLatencyMarkerNV](VkLatencyMarkerNV.html) value

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkLatencyMarkerNV](VkLatencyMarkerNV.html), [VkStructureType](VkStructureType.html), [vkSetLatencyMarkerNV](vkSetLatencyMarkerNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSetLatencyMarkerInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
