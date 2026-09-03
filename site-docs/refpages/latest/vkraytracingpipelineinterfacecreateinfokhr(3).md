# VkRayTracingPipelineInterfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingPipelineInterfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingPipelineInterfaceCreateInfoKHR - Structure specifying additional interface information when using libraries

The `VkRayTracingPipelineInterfaceCreateInfoKHR` structure is defined
as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkRayTracingPipelineInterfaceCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxPipelineRayPayloadSize;
    uint32_t           maxPipelineRayHitAttributeSize;
} VkRayTracingPipelineInterfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxPipelineRayPayloadSize` is the maximum payload size in bytes
used by any shader in the pipeline.

* 
`maxPipelineRayHitAttributeSize` is the maximum attribute structure
size in bytes used by any shader in the pipeline.

`maxPipelineRayPayloadSize` is calculated as the maximum size of the
block (in bytes) declared in the `RayPayloadKHR` or
`IncomingRayPayloadKHR` storage classes.
`maxPipelineRayHitAttributeSize` is calculated as the maximum size of
any block (in bytes) declared in the `HitAttributeKHR`
or `HitObjectAttributeEXT`
storage class.
As variables in these storage classes do not have explicit offsets, the size
should be calculated as if each variable has a
[scalar alignment](../../../../spec/latest/chapters/interfaces.html#interfaces-alignment-requirements) equal to the largest
scalar alignment of any of the block’s members.

|  | There is no explicit upper limit for `maxPipelineRayPayloadSize`, but in
| --- | --- |
practice it should be kept as small as possible.
Similar to invocation local memory, it must be allocated for each shader
invocation and for devices which support many simultaneous invocations, this
storage can rapidly be exhausted, resulting in failure. |

Valid Usage

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-maxPipelineRayHitAttributeSize-03605) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-maxPipelineRayHitAttributeSize-03605

`maxPipelineRayHitAttributeSize` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`maxRayHitAttributeSize`

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-sType-sType) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_INTERFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-pNext-pNext) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingPipelineInterfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
