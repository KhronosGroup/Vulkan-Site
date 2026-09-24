# VkPerformanceValueTypeINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceValueTypeINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceValueTypeINTEL - Type of the parameters that can be queried

Possible values of [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)::`type`, specifying the
type of the data returned in [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)::`data`, are:

* 
[VK_PERFORMANCE_VALUE_TYPE_UINT32_INTEL](#) specifies that unsigned
32-bit integer data is returned in `data.value32`.

* 
[VK_PERFORMANCE_VALUE_TYPE_UINT64_INTEL](#) specifies that unsigned
64-bit integer data is returned in `data.value64`.

* 
[VK_PERFORMANCE_VALUE_TYPE_FLOAT_INTEL](#) specifies that
floating-point data is returned in `data.valueFloat`.

* 
[VK_PERFORMANCE_VALUE_TYPE_BOOL_INTEL](#) specifies that
`VkBool32` data is returned in `data.valueBool`.

* 
[VK_PERFORMANCE_VALUE_TYPE_STRING_INTEL](#) specifies that a pointer to
a null-terminated UTF-8 string is returned in `data.valueString`.
The pointer is valid for the lifetime of the `device` parameter
passed to [vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html).

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceValueTypeINTEL {
    VK_PERFORMANCE_VALUE_TYPE_UINT32_INTEL = 0,
    VK_PERFORMANCE_VALUE_TYPE_UINT64_INTEL = 1,
    VK_PERFORMANCE_VALUE_TYPE_FLOAT_INTEL = 2,
    VK_PERFORMANCE_VALUE_TYPE_BOOL_INTEL = 3,
    VK_PERFORMANCE_VALUE_TYPE_STRING_INTEL = 4,
} VkPerformanceValueTypeINTEL;

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceValueTypeINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
