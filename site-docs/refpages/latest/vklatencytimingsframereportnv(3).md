# VkLatencyTimingsFrameReportNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencyTimingsFrameReportNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencyTimingsFrameReportNV - Structure containing latency data

The [VkLatencyTimingsFrameReportNV](#) structure describes latency data
returned by [vkGetLatencyTimingsNV](vkGetLatencyTimingsNV.html)

// Provided by VK_NV_low_latency2
typedef struct VkLatencyTimingsFrameReportNV {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           presentID;
    uint64_t           inputSampleTimeUs;
    uint64_t           simStartTimeUs;
    uint64_t           simEndTimeUs;
    uint64_t           renderSubmitStartTimeUs;
    uint64_t           renderSubmitEndTimeUs;
    uint64_t           presentStartTimeUs;
    uint64_t           presentEndTimeUs;
    uint64_t           driverStartTimeUs;
    uint64_t           driverEndTimeUs;
    uint64_t           osRenderQueueStartTimeUs;
    uint64_t           osRenderQueueEndTimeUs;
    uint64_t           gpuRenderStartTimeUs;
    uint64_t           gpuRenderEndTimeUs;
} VkLatencyTimingsFrameReportNV;

The members of the [VkLatencyTimingsFrameReportNV](#) structure describe
the following:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is the application provided value that is used to
    associate the timestamp with a `vkQueuePresentKHR` command using
[VkPresentIdKHR](VkPresentIdKHR.html)::`pPresentIds` or
[VkPresentId2KHR](VkPresentId2KHR.html)::`pPresentIds`
    for a given present.

* 
`simStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_SIMULATION_START_NV](VkLatencyMarkerNV.html).

* 
`simEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_SIMULATION_END_NV](VkLatencyMarkerNV.html)

* 
`renderStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_RENDERSUBMIT_START_NV](VkLatencyMarkerNV.html).

* 
`renderEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_RENDERSUBMIT_END_NV](VkLatencyMarkerNV.html).

* 
`presentStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_PRESENT_START_NV](VkLatencyMarkerNV.html).

* 
`presentEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](VkLatencyMarkerNV.html)
enum [VK_LATENCY_MARKER_PRESENT_END_NV](VkLatencyMarkerNV.html).

* 
`driverStartTimeUs` is the timestamp written when the first
`vkQueueSubmit` for the frame is called.

* 
`driverEndTimeUs` is the timestamp written when the final
`vkQueueSubmit` hands off from the Vulkan Driver.

* 
`osRenderQueueStartTimeUs` is the timestamp written when the final
`vkQueueSubmit` hands off from the Vulkan Driver.

* 
`osRenderQueueEndTimeUs` is the timestamp written when the first
submission reaches the GPU.

* 
`gpuRenderStartTimeUs` is the timestamp written when the first
submission reaches the GPU.

* 
`gpuRenderEndTimeUs` is the timestamp written when the final
submission finishes on the GPU for the frame.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencyTimingsFrameReportNV-sType-sType) VUID-VkLatencyTimingsFrameReportNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_TIMINGS_FRAME_REPORT_NV](VkStructureType.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkGetLatencyMarkerInfoNV](VkGetLatencyMarkerInfoNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencyTimingsFrameReportNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
