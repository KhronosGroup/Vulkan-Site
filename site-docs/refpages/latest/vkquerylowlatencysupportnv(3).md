# VkQueryLowLatencySupportNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryLowLatencySupportNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryLowLatencySupportNV - Structure used for NVIDIA Reflex Support

The `VkQueryLowLatencySupportNV` structure is defined as:

// Provided by VK_NV_low_latency
typedef struct VkQueryLowLatencySupportNV {
    VkStructureType    sType;
    const void*        pNext;
    void*              pQueriedLowLatencyData;
} VkQueryLowLatencySupportNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pQueriedLowLatencyData` is used for NVIDIA Reflex Support.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryLowLatencySupportNV-sType-sType) VUID-VkQueryLowLatencySupportNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_LOW_LATENCY_SUPPORT_NV](VkStructureType.html)

* 
[](#VUID-VkQueryLowLatencySupportNV-pQueriedLowLatencyData-parameter) VUID-VkQueryLowLatencySupportNV-pQueriedLowLatencyData-parameter

 `pQueriedLowLatencyData` **must** be a pointer value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

[VK_NV_low_latency](VK_NV_low_latency.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkQueryLowLatencySupportNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
