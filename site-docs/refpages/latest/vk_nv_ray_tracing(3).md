# VK_NV_ray_tracing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_ray_tracing.html

## Table of Contents

- [Name](#_name)
- [VK_NV_ray_tracing](#VK_NV_ray_tracing)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Sample Code](#_sample_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_ray_tracing - device extension

**Name String**

`VK_NV_ray_tracing`

**Extension Type**

Device extension

**Registered Extension Number**

166

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_1

* 
Interacts with VK_EXT_debug_report

* 
Interacts with VK_KHR_get_memory_requirements2

**SPIR-V Dependencies**

* 
[SPV_NV_ray_tracing](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_ray_tracing.html)

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)
extension

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_ray_tracing] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NV_ray_tracing extension*)

**Last Modified Date**

2018-11-20

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_ray_tracing`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_ray_tracing.txt)

**Contributors**

* 
Eric Werness, NVIDIA

* 
Ashwin Lele, NVIDIA

* 
Robert Stepinski, NVIDIA

* 
Nuno Subtil, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Martin Stich, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Joshua Barczak, Intel

* 
Tobias Hector, AMD

* 
Henrik Rydgard, NVIDIA

* 
Pascal Gautron, NVIDIA

Rasterization has been the dominant method to produce interactive graphics,
but increasing performance of graphics hardware has made ray tracing a
viable option for interactive rendering.
Being able to integrate ray tracing with traditional rasterization makes it
easier for applications to incrementally add ray traced effects to existing
applications or to do hybrid approaches with rasterization for primary
visibility and ray tracing for secondary queries.

To enable ray tracing, this extension adds a few different categories of new
functionality:

* 
Acceleration structure objects and build commands

* 
A new pipeline type with new shader domains

* 
An indirection table to link shader groups with acceleration structure
items

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_ray_tracing`

* 
[VkAccelerationStructureNV](VkAccelerationStructureNV.html)

* 
[vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html)

* 
[vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html)

* 
[vkCmdCopyAccelerationStructureNV](vkCmdCopyAccelerationStructureNV.html)

* 
[vkCmdTraceRaysNV](vkCmdTraceRaysNV.html)

* 
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html)

* 
[vkCompileDeferredNV](vkCompileDeferredNV.html)

* 
[vkCreateAccelerationStructureNV](vkCreateAccelerationStructureNV.html)

* 
[vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html)

* 
[vkDestroyAccelerationStructureNV](vkDestroyAccelerationStructureNV.html)

* 
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)

* 
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html)

* 
[vkGetRayTracingShaderGroupHandlesNV](vkGetRayTracingShaderGroupHandlesKHR.html)

* 
[VkAabbPositionsNV](VkAabbPositionsKHR.html)

* 
[VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html)

* 
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)

* 
[VkAccelerationStructureInstanceNV](VkAccelerationStructureInstanceKHR.html)

* 
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)

* 
[VkBindAccelerationStructureMemoryInfoNV](VkBindAccelerationStructureMemoryInfoNV.html)

* 
[VkGeometryAABBNV](VkGeometryAABBNV.html)

* 
[VkGeometryDataNV](VkGeometryDataNV.html)

* 
[VkGeometryNV](VkGeometryNV.html)

* 
[VkGeometryTrianglesNV](VkGeometryTrianglesNV.html)

* 
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)

* 
[VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html)

* 
[VkTransformMatrixNV](VkTransformMatrixKHR.html)

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetAccelerationStructureNV](VkWriteDescriptorSetAccelerationStructureNV.html)

If [VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html) or [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
[VkMemoryRequirements2KHR](VkMemoryRequirements2.html)

* 
[VkAccelerationStructureMemoryRequirementsTypeNV](VkAccelerationStructureMemoryRequirementsTypeNV.html)

* 
[VkAccelerationStructureTypeNV](VkAccelerationStructureTypeKHR.html)

* 
[VkBuildAccelerationStructureFlagBitsNV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VkCopyAccelerationStructureModeNV](VkCopyAccelerationStructureModeKHR.html)

* 
[VkGeometryFlagBitsNV](VkGeometryFlagBitsKHR.html)

* 
[VkGeometryInstanceFlagBitsNV](VkGeometryInstanceFlagBitsKHR.html)

* 
[VkGeometryTypeNV](VkGeometryTypeKHR.html)

* 
[VkRayTracingShaderGroupTypeNV](VkRayTracingShaderGroupTypeKHR.html)

* 
[VkBuildAccelerationStructureFlagsNV](VkBuildAccelerationStructureFlagsKHR.html)

* 
[VkGeometryFlagsNV](VkGeometryFlagsKHR.html)

* 
[VkGeometryInstanceFlagsNV](VkGeometryInstanceFlagsKHR.html)

* 
`VK_NV_RAY_TRACING_EXTENSION_NAME`

* 
`VK_NV_RAY_TRACING_SPEC_VERSION`

* 
[VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html)

* 
Extending [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html):

[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV](VkAccelerationStructureTypeKHR.html)

* 
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV](VkAccelerationStructureTypeKHR.html)

Extending [VkAccessFlagBits](VkAccessFlagBits.html):

* 
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_NV](VkAccessFlagBits.html)

* 
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_NV](VkAccessFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html)

Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html):

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_NV](VkCopyAccelerationStructureModeKHR.html)

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_NV](VkCopyAccelerationStructureModeKHR.html)

Extending [VkDescriptorType](VkDescriptorType.html):

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html)

Extending [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html):

* 
[VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_NV](VkGeometryFlagBitsKHR.html)

* 
[VK_GEOMETRY_OPAQUE_BIT_NV](VkGeometryFlagBitsKHR.html)

Extending [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html):

* 
[VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_NV](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_NV](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_CULL_DISABLE_BIT_NV](VkGeometryInstanceFlagBitsKHR.html)

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_NV](VkGeometryInstanceFlagBitsKHR.html)

Extending [VkGeometryTypeKHR](VkGeometryTypeKHR.html):

* 
[VK_GEOMETRY_TYPE_AABBS_NV](VkGeometryTypeKHR.html)

* 
[VK_GEOMETRY_TYPE_TRIANGLES_NV](VkGeometryTypeKHR.html)

Extending [VkIndexType](VkIndexType.html):

* 
[VK_INDEX_TYPE_NONE_NV](VkIndexType.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV](VkObjectType.html)

Extending [VkPipelineBindPoint](VkPipelineBindPoint.html):

* 
[VK_PIPELINE_BIND_POINT_RAY_TRACING_NV](VkPipelineBindPoint.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_NV](VkPipelineStageFlagBits.html)

* 
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_NV](VkPipelineStageFlagBits.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](VkQueryType.html)

Extending [VkRayTracingShaderGroupTypeKHR](VkRayTracingShaderGroupTypeKHR.html):

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](VkRayTracingShaderGroupTypeKHR.html)

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html)

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html)

Extending [VkShaderStageFlagBits](VkShaderStageFlagBits.html):

* 
[VK_SHADER_STAGE_ANY_HIT_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_CALLABLE_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_INTERSECTION_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_MISS_BIT_NV](VkShaderStageFlagBits.html)

* 
[VK_SHADER_STAGE_RAYGEN_BIT_NV](VkShaderStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_ACCELERATION_STRUCTURE_MEMORY_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GEOMETRY_AABB_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GEOMETRY_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_GEOMETRY_TRIANGLES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_NV](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV_EXT](VkDebugReportObjectTypeEXT.html)

* 
[`LaunchIdNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-launchid)

* 
[`LaunchSizeNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-launchsize)

* 
[`WorldRayOriginNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldrayorigin)

* 
[`WorldRayDirectionNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldraydirection)

* 
[`ObjectRayOriginNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objectrayorigin)

* 
[`ObjectRayDirectionNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objectraydirection)

* 
[`RayTminNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raytmin)

* 
[`RayTmaxNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-raytmax)

* 
[`InstanceCustomIndexNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-instancecustomindex)

* 
[`InstanceId`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-instanceid)

* 
[`ObjectToWorldNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-objecttoworld)

* 
[`WorldToObjectNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-worldtoobject)

* 
[`HitTNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitt)

* 
[`HitKindNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitkind)

* 
[`IncomingRayFlagsNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-incomingrayflags)

* 
(modified)`PrimitiveId`

* 
[`RayTracingNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingNV)

1) Are there issues?

**RESOLVED**: Yes.

Example ray generation GLSL shader

#version 450 core
#extension GL_NV_ray_tracing : require
layout(set = 0, binding = 0, rgba8) uniform image2D image;
layout(set = 0, binding = 1) uniform accelerationStructureNV as;
layout(location = 0) rayPayloadNV float payload;

void main()
{
   vec4 col = vec4(0, 0, 0, 1);

   vec3 origin = vec3(float(gl_LaunchIDNV.x)/float(gl_LaunchSizeNV.x), float(gl_LaunchIDNV.y)/float(gl_LaunchSizeNV.y), 1.0);
   vec3 dir = vec3(0.0, 0.0, -1.0);

   traceNV(as, 0, 0xff, 0, 1, 0, origin, 0.0, dir, 1000.0, 0);

   col.y = payload;

   imageStore(image, ivec2(gl_LaunchIDNV.xy), col);
}

* 
Revision 1, 2018-09-11 (Robert Stepinski, Nuno Subtil, Eric Werness)

Internal revisions

Revision 2, 2018-10-19 (Eric Werness)

* 
rename to VK_NV_ray_tracing, add support for callables.

* 
too many updates to list

Revision 3, 2018-11-20 (Daniel Koch)

* 
update to use InstanceId instead of InstanceIndex as implemented.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_ray_tracing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
