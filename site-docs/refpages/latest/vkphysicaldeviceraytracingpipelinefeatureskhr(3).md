# VkPhysicalDeviceRayTracingPipelineFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingPipelineFeaturesKHR - Structure describing the ray tracing features that can be supported by an implementation

The `VkPhysicalDeviceRayTracingPipelineFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkPhysicalDeviceRayTracingPipelineFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingPipeline;
    VkBool32           rayTracingPipelineShaderGroupHandleCaptureReplay;
    VkBool32           rayTracingPipelineShaderGroupHandleCaptureReplayMixed;
    VkBool32           rayTracingPipelineTraceRaysIndirect;
    VkBool32           rayTraversalPrimitiveCulling;
} VkPhysicalDeviceRayTracingPipelineFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingPipeline` indicates
whether the implementation supports the ray tracing pipeline
functionality.
See [Ray Tracing](../../../../spec/latest/chapters/raytracing.html#ray-tracing).

* 

`rayTracingPipelineShaderGroupHandleCaptureReplay` indicates whether
the implementation supports saving and reusing shader group handles,
e.g. for trace capture and replay.

* 

`rayTracingPipelineShaderGroupHandleCaptureReplayMixed` indicates
whether the implementation supports reuse of shader group handles being
arbitrarily mixed with creation of non-reused shader group handles.
If this is [VK_FALSE](VK_FALSE.html), all reused shader group handles **must** be
specified before any non-reused handles **may** be created.

* 

`rayTracingPipelineTraceRaysIndirect` indicates whether the
implementation supports indirect ray tracing commands, e.g.
[vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html).

* 

`rayTraversalPrimitiveCulling` indicates whether the implementation
supports [primitive culling during ray    traversal](../../../../spec/latest/chapters/raytraversal.html#ray-traversal-culling-primitive).

If the `VkPhysicalDeviceRayTracingPipelineFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRayTracingPipelineFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03575) VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03575

If `rayTracingPipelineShaderGroupHandleCaptureReplayMixed` is
[VK_TRUE](VK_TRUE.html), `rayTracingPipelineShaderGroupHandleCaptureReplay`
**must** also be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
