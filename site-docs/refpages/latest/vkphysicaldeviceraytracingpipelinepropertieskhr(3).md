# VkPhysicalDeviceRayTracingPipelinePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingPipelinePropertiesKHR - Properties of the physical device for ray tracing

The `VkPhysicalDeviceRayTracingPipelinePropertiesKHR` structure is
defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkPhysicalDeviceRayTracingPipelinePropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderGroupHandleSize;
    uint32_t           maxRayRecursionDepth;
    uint32_t           maxShaderGroupStride;
    uint32_t           shaderGroupBaseAlignment;
    uint32_t           shaderGroupHandleCaptureReplaySize;
    uint32_t           maxRayDispatchInvocationCount;
    uint32_t           shaderGroupHandleAlignment;
    uint32_t           maxRayHitAttributeSize;
} VkPhysicalDeviceRayTracingPipelinePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderGroupHandleSize` is the size in bytes of the shader header.

* 
 `maxRayRecursionDepth` is the
maximum number of levels of ray recursion allowed in a trace command.

* 
 `maxShaderGroupStride` is the
maximum stride in bytes allowed between shader groups in the shader
binding table.

* 
`shaderGroupBaseAlignment` is the **required** alignment in bytes for
the base of the shader binding table.

* 
`shaderGroupHandleCaptureReplaySize` is the number of bytes for the
information required to do capture and replay for shader group handles.

* 
`maxRayDispatchInvocationCount` is the maximum number of ray
generation shader invocations which **may** be produced by a single
[vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html) or [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html) command.

* 
`shaderGroupHandleAlignment` is the **required** alignment in bytes for
each entry in a shader binding table.
The value **must** be a power of two.

* 
`maxRayHitAttributeSize` is the maximum size in bytes for a ray
attribute structure

If the `VkPhysicalDeviceRayTracingPipelinePropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Limits specified by this structure **must** match those specified with the same
name in [VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelinePropertiesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingPipelinePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
