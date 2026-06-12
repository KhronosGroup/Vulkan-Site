# VkGetLatencyMarkerInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGetLatencyMarkerInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGetLatencyMarkerInfoNV - Structure specifying the parameters of vkGetLatencyTimingsNV

The `VkGetLatencyMarkerInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkGetLatencyMarkerInfoNV {
    VkStructureType                   sType;
    const void*                       pNext;
    uint32_t                          timingCount;
    VkLatencyTimingsFrameReportNV*    pTimings;
} VkGetLatencyMarkerInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is either `NULL` or a pointer to a structure extending this
structure.

* 
`timingCount` is an integer related to the number of previous frames
of latency data available or queried, as described below.

* 
`pTimings` is either `NULL` or a pointer to an array of
[VkLatencyTimingsFrameReportNV](VkLatencyTimingsFrameReportNV.html) structures.

If `pTimings` is `NULL` then the maximum number of queryable frame data
is returned in `timingCount`.
Otherwise, `timingCount` **must** be set by the application to the number
of elements in the `pTimings` array, and on return is overwritten with
the number of values actually written to `pTimings`.
The elements of `pTimings` are arranged in the order they were requested
in, with the oldest data in the first entry.

Valid Usage (Implicit)

* 
[](#VUID-VkGetLatencyMarkerInfoNV-sType-sType) VUID-VkGetLatencyMarkerInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GET_LATENCY_MARKER_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkGetLatencyMarkerInfoNV-pTimings-parameter) VUID-VkGetLatencyMarkerInfoNV-pTimings-parameter

 If `timingCount` is not `0`, and `pTimings` is not `NULL`, `pTimings` **must** be a valid pointer to an array of `timingCount` [VkLatencyTimingsFrameReportNV](VkLatencyTimingsFrameReportNV.html) structures

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkLatencyTimingsFrameReportNV](VkLatencyTimingsFrameReportNV.html), [VkStructureType](VkStructureType.html), [vkGetLatencyTimingsNV](vkGetLatencyTimingsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkGetLatencyMarkerInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
