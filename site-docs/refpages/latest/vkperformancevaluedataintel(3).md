# VkPerformanceValueDataINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceValueDataINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceValueDataINTEL - Values returned for the parameters

The `VkPerformanceValueDataINTEL` union is defined as:

// Provided by VK_INTEL_performance_query
typedef union VkPerformanceValueDataINTEL {
    uint32_t       value32;
    uint64_t       value64;
    float          valueFloat;
    VkBool32       valueBool;
    const char*    valueString;
} VkPerformanceValueDataINTEL;

* 
`value32` represents 32-bit integer data.

* 
`value64` represents 64-bit integer data.

* 
`valueFloat` represents floating-point data.

* 
`valueBool` represents `VkBool32` data.

* 
`valueString` represents a pointer to a null-terminated UTF-8
string.

The correct member of the union is determined by the associated
[VkPerformanceValueTypeINTEL](VkPerformanceValueTypeINTEL.html) value.

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), `VkBool32`, [VkPerformanceValueINTEL](VkPerformanceValueINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceValueDataINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
