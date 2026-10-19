# VkPerformanceConfigurationAcquireInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerformanceConfigurationAcquireInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerformanceConfigurationAcquireInfoINTEL - Acquire a configuration to capture performance data

The `VkPerformanceConfigurationAcquireInfoINTEL` structure is defined
as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceConfigurationAcquireInfoINTEL {
    VkStructureType                        sType;
    const void*                            pNext;
    VkPerformanceConfigurationTypeINTEL    type;
} VkPerformanceConfigurationAcquireInfoINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is one of the [VkPerformanceConfigurationTypeINTEL](VkPerformanceConfigurationTypeINTEL.html) type
of performance configuration that will be acquired.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-sType-sType) VUID-VkPerformanceConfigurationAcquireInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_CONFIGURATION_ACQUIRE_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-pNext-pNext) VUID-VkPerformanceConfigurationAcquireInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-type-parameter) VUID-VkPerformanceConfigurationAcquireInfoINTEL-type-parameter

 `type` **must** be a valid [VkPerformanceConfigurationTypeINTEL](VkPerformanceConfigurationTypeINTEL.html) value

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceConfigurationTypeINTEL](VkPerformanceConfigurationTypeINTEL.html), [VkStructureType](VkStructureType.html), [vkAcquirePerformanceConfigurationINTEL](vkAcquirePerformanceConfigurationINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkPerformanceConfigurationAcquireInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
