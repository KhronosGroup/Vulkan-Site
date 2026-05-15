# VkPerformanceMarkerInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceMarkerInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceMarkerInfoINTEL - Structure specifying performance markers

The `VkPerformanceMarkerInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceMarkerInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           marker;
} VkPerformanceMarkerInfoINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`marker` is the marker value that will be recorded into the opaque
query results.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceMarkerInfoINTEL-sType-sType) VUID-VkPerformanceMarkerInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_MARKER_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkPerformanceMarkerInfoINTEL-pNext-pNext) VUID-VkPerformanceMarkerInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkStructureType](VkStructureType.html), [vkCmdSetPerformanceMarkerINTEL](vkCmdSetPerformanceMarkerINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceMarkerInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
