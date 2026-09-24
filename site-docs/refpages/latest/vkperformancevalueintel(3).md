# VkPerformanceValueINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceValueINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceValueINTEL - Container for value and types of parameters that can be queried

The `VkPerformanceValueINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceValueINTEL {
    VkPerformanceValueTypeINTEL    type;
    VkPerformanceValueDataINTEL    data;
} VkPerformanceValueINTEL;

* 
`type` is a [VkPerformanceValueTypeINTEL](VkPerformanceValueTypeINTEL.html) value specifying the
type of the returned data.

* 
`data` is a [VkPerformanceValueDataINTEL](VkPerformanceValueDataINTEL.html) union specifying the
value of the returned data.

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceValueDataINTEL](VkPerformanceValueDataINTEL.html), [VkPerformanceValueTypeINTEL](VkPerformanceValueTypeINTEL.html), [vkGetPerformanceParameterINTEL](vkGetPerformanceParameterINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceValueINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
