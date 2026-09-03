# VkInitializePerformanceApiInfoINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInitializePerformanceApiInfoINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInitializePerformanceApiInfoINTEL - Structure specifying parameters of initialize of the device

The `VkInitializePerformanceApiInfoINTEL` structure is defined as :

// Provided by VK_INTEL_performance_query
typedef struct VkInitializePerformanceApiInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    void*              pUserData;
} VkInitializePerformanceApiInfoINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pUserData` is NULL or a pointer for application data.

Valid Usage (Implicit)

* 
[](#VUID-VkInitializePerformanceApiInfoINTEL-sType-sType) VUID-VkInitializePerformanceApiInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INITIALIZE_PERFORMANCE_API_INFO_INTEL](VkStructureType.html)

* 
[](#VUID-VkInitializePerformanceApiInfoINTEL-pNext-pNext) VUID-VkInitializePerformanceApiInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkStructureType](VkStructureType.html), [vkInitializePerformanceApiINTEL](vkInitializePerformanceApiINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkInitializePerformanceApiInfoINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
