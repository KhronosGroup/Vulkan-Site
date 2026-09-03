# VkPerformanceStreamMarkerInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceStreamMarkerInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceStreamMarkerInfoINTEL - Structure specifying stream performance markers

The `VkPerformanceStreamMarkerInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceStreamMarkerInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           marker;
} VkPerformanceStreamMarkerInfoINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`marker` is the marker value that will be recorded into the reports
consumed by an external application.

Valid Usage

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-marker-02735) VUID-VkPerformanceStreamMarkerInfoINTEL-marker-02735

The value written by the application into `marker` **must** only used
the valid bits as reported by [vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html) with
the [VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL](VkPerformanceParameterTypeINTEL.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-sType-sType) VUID-VkPerformanceStreamMarkerInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_STREAM_MARKER_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-pNext-pNext) VUID-VkPerformanceStreamMarkerInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkStructureType](VkStructureType.html), [vkCmdSetPerformanceStreamMarkerINTEL](vkCmdSetPerformanceStreamMarkerINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceStreamMarkerInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
