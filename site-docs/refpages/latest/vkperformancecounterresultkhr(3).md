# VkPerformanceCounterResultKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceCounterResultKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceCounterResultKHR - Union containing a performance counter result

The `VkPerformanceCounterResultKHR` union is defined as:

// Provided by VK_KHR_performance_query
typedef union VkPerformanceCounterResultKHR {
    int32_t     int32;
    int64_t     int64;
    uint32_t    uint32;
    uint64_t    uint64;
    float       float32;
    double      float64;
} VkPerformanceCounterResultKHR;

* 
`int32` is a 32-bit signed integer value.

* 
`int64` is a 64-bit signed integer value.

* 
`uint32` is a 32-bit unsigned integer value.

* 
`uint64` is a 64-bit unsigned integer value.

* 
`float32` is a 32-bit floating-point value.

* 
`float64` is a 64-bit floating-point value.

Performance query results are returned in an array of
`VkPerformanceCounterResultKHR` unions containing the data associated
with each counter in the query, stored in the same order as the counters
supplied in `pCounterIndices` when creating the performance query.
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)::`storage` specifies how to parse the
counter data.

[VK_KHR_performance_query](VK_KHR_performance_query.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceCounterResultKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
