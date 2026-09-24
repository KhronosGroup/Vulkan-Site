# VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV - Structure controlling if cluster acceleration structures are allowed

The [VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](#)
structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline with VK_NV_cluster_acceleration_structure
typedef struct VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           allowClusterAccelerationStructure;
} VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allowClusterAccelerationStructure` controls if cluster acceleration
structures are allowed in the ray tracing pipeline.

If no cluster acceleration structures are present in the ray tracing
pipeline, `allowClusterAccelerationStructure` **should** not be used to
prevent traversal penalty on some implementations.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-clusterAccelerationStructure-10576) VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-clusterAccelerationStructure-10576

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-sType-sType) VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CLUSTER_ACCELERATION_STRUCTURE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
