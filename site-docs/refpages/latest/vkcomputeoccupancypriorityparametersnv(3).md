# VkComputeOccupancyPriorityParametersNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComputeOccupancyPriorityParametersNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComputeOccupancyPriorityParametersNV - Structure specifying compute occupancy priority parameters

The `VkComputeOccupancyPriorityParametersNV` structure is defined as:

// Provided by VK_NV_compute_occupancy_priority
typedef struct VkComputeOccupancyPriorityParametersNV {
    VkStructureType    sType;
    const void*        pNext;
    float              occupancyPriority;
    float              occupancyThrottling;
} VkComputeOccupancyPriorityParametersNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`occupancyPriority` is a value specifying the occupancy priority for
subsequent compute workloads, with a valid range of [0.0, 1.0].
A value of 0.0 represents the lowest priority, while a value of 1.0 is
the maximum priority.
Default priority is specified by a value of 0.5.

* 
`occupancyThrottling` is a value specifying the level of occupancy
throttling applied to subsequent workloads, with a valid range of [0.0,
1.0].
A value of 0.0 (the default) means no throttling is applied, allowing
workloads to use the full available compute capacity.
Non-zero values represent increasing levels of throttling, with higher
values resulting in more restrictive occupancy limits.
A value of 1.0 represents the maximum level of throttling supported by
the implementation.

Valid Usage

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-occupancyPriority-12298) VUID-VkComputeOccupancyPriorityParametersNV-occupancyPriority-12298

`occupancyPriority` **must** be between `0` and `1`, inclusive

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-occupancyThrottling-12299) VUID-VkComputeOccupancyPriorityParametersNV-occupancyThrottling-12299

`occupancyThrottling` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-sType-sType) VUID-VkComputeOccupancyPriorityParametersNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_OCCUPANCY_PRIORITY_PARAMETERS_NV](VkStructureType.html)

* 
[](#VUID-VkComputeOccupancyPriorityParametersNV-pNext-pNext) VUID-VkComputeOccupancyPriorityParametersNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_compute_occupancy_priority](VK_NV_compute_occupancy_priority.html), [VkStructureType](VkStructureType.html), [vkCmdSetComputeOccupancyPriorityNV](vkCmdSetComputeOccupancyPriorityNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkComputeOccupancyPriorityParametersNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
