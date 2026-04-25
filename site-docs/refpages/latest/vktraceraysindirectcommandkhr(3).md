# VkTraceRaysIndirectCommandKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTraceRaysIndirectCommandKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTraceRaysIndirectCommandKHR - Structure specifying the parameters of an indirect ray tracing command

The `VkTraceRaysIndirectCommandKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkTraceRaysIndirectCommandKHR {
    uint32_t    width;
    uint32_t    height;
    uint32_t    depth;
} VkTraceRaysIndirectCommandKHR;

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

The members of `VkTraceRaysIndirectCommandKHR` have the same meaning as
the similarly named parameters of [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html).

Valid Usage

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-width-03638) VUID-VkTraceRaysIndirectCommandKHR-width-03638

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[0]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-height-03639) VUID-VkTraceRaysIndirectCommandKHR-height-03639

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[1]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-depth-03640) VUID-VkTraceRaysIndirectCommandKHR-depth-03640

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[2]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-width-03641) VUID-VkTraceRaysIndirectCommandKHR-width-03641

`width` × `height` × `depth` **must** be less
than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxRayDispatchInvocationCount`

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/raytracing.html#VkTraceRaysIndirectCommandKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
