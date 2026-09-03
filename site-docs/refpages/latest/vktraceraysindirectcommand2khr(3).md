# VkTraceRaysIndirectCommand2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTraceRaysIndirectCommand2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTraceRaysIndirectCommand2KHR - Structure specifying the parameters of an indirect trace ray command with indirect shader binding tables

The `VkTraceRaysIndirectCommand2KHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_maintenance1 with VK_KHR_ray_tracing_pipeline
typedef struct VkTraceRaysIndirectCommand2KHR {
    VkDeviceAddress    raygenShaderRecordAddress;
    VkDeviceSize       raygenShaderRecordSize;
    VkDeviceAddress    missShaderBindingTableAddress;
    VkDeviceSize       missShaderBindingTableSize;
    VkDeviceSize       missShaderBindingTableStride;
    VkDeviceAddress    hitShaderBindingTableAddress;
    VkDeviceSize       hitShaderBindingTableSize;
    VkDeviceSize       hitShaderBindingTableStride;
    VkDeviceAddress    callableShaderBindingTableAddress;
    VkDeviceSize       callableShaderBindingTableSize;
    VkDeviceSize       callableShaderBindingTableStride;
    uint32_t           width;
    uint32_t           height;
    uint32_t           depth;
} VkTraceRaysIndirectCommand2KHR;

* 
`raygenShaderRecordAddress` is a `VkDeviceAddress` of the ray
generation shader binding table record used by this command.

* 
`raygenShaderRecordSize` is a `VkDeviceSize` number of bytes
corresponding to the ray generation shader binding table record at base
address `raygenShaderRecordAddress`.

* 
`missShaderBindingTableAddress` is a `VkDeviceAddress` of the
first record in the miss shader binding table used by this command.

* 
`missShaderBindingTableSize` is a `VkDeviceSize` number of
bytes corresponding to the total size of the miss shader binding table
at `missShaderBindingTableAddress` that may be accessed by this
command.

* 
`missShaderBindingTableStride` is a `VkDeviceSize` number of
bytes between records of the miss shader binding table.

* 
`hitShaderBindingTableAddress` is a `VkDeviceAddress` of the
first record in the hit shader binding table used by this command.

* 
`hitShaderBindingTableSize` is a `VkDeviceSize` number of
bytes corresponding to the total size of the hit shader binding table at
`hitShaderBindingTableAddress` that may be accessed by this command.

* 
`hitShaderBindingTableStride` is a `VkDeviceSize` number of
bytes between records of the hit shader binding table.

* 
`callableShaderBindingTableAddress` is a `VkDeviceAddress` of
the first record in the callable shader binding table used by this
command.

* 
`callableShaderBindingTableSize` is a `VkDeviceSize` number
of bytes corresponding to the total size of the callable shader binding
table at `callableShaderBindingTableAddress` that may be accessed by
this command.

* 
`callableShaderBindingTableStride` is a `VkDeviceSize` number
of bytes between records of the callable shader binding table.

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

The members of `VkTraceRaysIndirectCommand2KHR` have the same meaning as
the similarly named parameters of [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html).

Indirect shader binding table buffer parameters **must** satisfy the same
memory alignment and binding requirements as their counterparts in
[vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html) and [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html).

Valid Usage

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03681) VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03681

`raygenShaderRecordAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03682) VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03682

`raygenShaderRecordAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03684) VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03684

`missShaderBindingTableAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03685) VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03685

`missShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03686) VUID-VkTraceRaysIndirectCommand2KHR-stride-03686

`missShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04029) VUID-VkTraceRaysIndirectCommand2KHR-stride-04029

`missShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03688) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03688

`hitShaderBindingTableAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03689) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03689

`hitShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03690) VUID-VkTraceRaysIndirectCommand2KHR-stride-03690

`hitShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04035) VUID-VkTraceRaysIndirectCommand2KHR-stride-04035

`hitShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03692) VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03692

`callableShaderBindingTableAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03693) VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03693

`callableShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03694) VUID-VkTraceRaysIndirectCommand2KHR-stride-03694

`callableShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04041) VUID-VkTraceRaysIndirectCommand2KHR-stride-04041

`callableShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03511) VUID-VkTraceRaysIndirectCommand2KHR-flags-03511

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html), the
entries in the table identified by `missShaderBindingTableAddress`
accessed as a result of this command in order to execute a miss shader
**must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03512) VUID-VkTraceRaysIndirectCommand2KHR-flags-03512

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute an any-hit
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03513) VUID-VkTraceRaysIndirectCommand2KHR-flags-03513

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute a closest hit
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03514) VUID-VkTraceRaysIndirectCommand2KHR-flags-03514

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute an intersection
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04735) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04735

Any non-zero hit shader group entries in the table identified by
`hitShaderBindingTableAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html) **must**
have been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04736) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04736

Any non-zero hit shader group entries in the table identified by
`hitShaderBindingTableAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_AABBS_KHR](VkGeometryTypeKHR.html) **must** have
been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-width-03638) VUID-VkTraceRaysIndirectCommand2KHR-width-03638

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[0]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-height-03639) VUID-VkTraceRaysIndirectCommand2KHR-height-03639

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[1]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-depth-03640) VUID-VkTraceRaysIndirectCommand2KHR-depth-03640

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[2]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-width-03641) VUID-VkTraceRaysIndirectCommand2KHR-width-03641

`width` × `height` × `depth` **must** be less
than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxRayDispatchInvocationCount`

Valid Usage (Implicit)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-raygenShaderRecordAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-raygenShaderRecordAddress-parameter

 `raygenShaderRecordAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-missShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-missShaderBindingTableAddress-parameter

 `missShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-hitShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-hitShaderBindingTableAddress-parameter

 `hitShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-callableShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-callableShaderBindingTableAddress-parameter

 `callableShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

[VK_KHR_ray_tracing_maintenance1](VK_KHR_ray_tracing_maintenance1.html), [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), `VkDeviceAddress`, `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/raytracing.html#VkTraceRaysIndirectCommand2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
