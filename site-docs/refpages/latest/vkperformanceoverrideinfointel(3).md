# VkPerformanceOverrideInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceOverrideInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceOverrideInfoINTEL - Performance override information

The `VkPerformanceOverrideInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceOverrideInfoINTEL {
    VkStructureType                   sType;
    const void*                       pNext;
    VkPerformanceOverrideTypeINTEL    type;
    VkBool32                          enable;
    uint64_t                          parameter;
} VkPerformanceOverrideInfoINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the particular [VkPerformanceOverrideTypeINTEL](VkPerformanceOverrideTypeINTEL.html) to
set.

* 
`enable` defines whether the override is enabled.

* 
`parameter` is a potential required parameter for the override.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-sType-sType) VUID-VkPerformanceOverrideInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_OVERRIDE_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-pNext-pNext) VUID-VkPerformanceOverrideInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-type-parameter) VUID-VkPerformanceOverrideInfoINTEL-type-parameter

 `type` **must** be a valid [VkPerformanceOverrideTypeINTEL](VkPerformanceOverrideTypeINTEL.html) value

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), `VkBool32`, [VkPerformanceOverrideTypeINTEL](VkPerformanceOverrideTypeINTEL.html), [VkStructureType](VkStructureType.html), [vkCmdSetPerformanceOverrideINTEL](vkCmdSetPerformanceOverrideINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceOverrideInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
