# VK_KHR_ray_tracing_position_fetch

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_ray_tracing_position_fetch.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New SPIR-V decorations](#_new_spir_v_decorations)
- [3.1._New_SPIR-V_decorations](#_new_spir_v_decorations)
- [3.2. New SPIR-V instructions](#_new_spir_v_instructions)
- [3.2._New_SPIR-V_instructions](#_new_spir_v_instructions)
- [3.3. New Acceleration structure build flag](#_new_acceleration_structure_build_flag)
- [3.3._New_Acceleration_structure_build_flag](#_new_acceleration_structure_build_flag)
- [3.4. GLSL mapping](#_glsl_mapping)
- [3.4._GLSL_mapping](#_glsl_mapping)
- [3.5. HLSL mapping](#_hlsl_mapping)
- [3.5._HLSL_mapping](#_hlsl_mapping)
- [3.5.1. Ray Pipelines](#_ray_pipelines)
- [3.5.1._Ray_Pipelines](#_ray_pipelines)
- [3.5.2. Ray Queries](#_ray_queries)
- [3.5.2._Ray_Queries](#_ray_queries)
- [4. Issues](#_issues)
- [5. Further Functionality](#_further_functionality)
- [5._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New SPIR-V decorations](#_new_spir_v_decorations)
[3.2. New SPIR-V instructions](#_new_spir_v_instructions)
[3.3. New Acceleration structure build flag](#_new_acceleration_structure_build_flag)
[3.4. GLSL mapping](#_glsl_mapping)
[3.5. HLSL mapping](#_hlsl_mapping)

[4. Issues](#_issues)
[5. Further Functionality](#_further_functionality)

This document details the VK_KHR_ray_tracing_position_fetch extension which exposes the ability to fetch vertex positions from an acceleration structure hit when ray tracing.

Acceleration structures used in ray tracing have the position of the geometry provided to them and have to have at least some derived form of the position encoded in them.
Applications frequently need to know the position or derived attribute of the triangle on a hit, so it is desirable to be able to share that information to avoid duplication.
One of the derived attributes that is of particular interest is the normal of the hit.

Options considered:

* 
Expose the normal (potentially compressed) of the triangle at the hit

* 
Expose the positions of the triangle at the hit

Exposing the normal is only beneficial for an implementation that cannot expose the positions encoded in the acceleration structure, which seems to be a rare case.
Exposing the positions of the triangle is more general and the application can easily compute the normal itself.

We choose the latter.

A new SPIR-V extension [SPV_KHR_ray_tracing_position_fetch](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_tracing_position_fetch.html)
adds one ray pipeline shader variable decoration:

* 
`HitTriangleVertexPositionsKHR` which indicates a builtin which contains the vertex position values for a triangle hit in any-hit or closest hit shaders

A new SPIR-V extension [SPV_KHR_ray_tracing_position_fetch](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_tracing_position_fetch.html)
adds one shader instruction:

* 
`OpRayQueryGetIntersectionTriangleVertexPositionsKHR` which returns the vertex position values for a triangle hit when using ray query

* 
`VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR` on an acceleration structure indicates that an application wants to be able to read the data from that acceleration structure

The GLSL functionality is defined in [GLSL_EXT_ray_tracing_position_fetch](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_tracing_position_fetch.txt).

gl_HitVertexTrianglePositionsEXT -> HitTriangleVertexPositionsKHR decorated OpVariable

rayQueryGetIntersectionTriangleVertexPositionsEXT -> OpRayQueryGetIntersectionTriangleVertexPositionsKHR instruction

HLSL does not provide this functionality natively yet.

However, it is possible to use this functionality via
[SPIR-V Intrinsics](https://github.com/microsoft/DirectXShaderCompiler/wiki/GL_EXT_spirv_intrinsics-for-SPIR-V-code-gen).

The SPIR-V values for ray tracing position fetch are obtained from
[SPV_KHR_ray_tracing_position_fetch](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_ray_tracing_position_fetch.html).

In the core HLSL, add the following:

#define BuiltIn 11
#define RayTracingPositionFetchKHR 5336
#define HitTriangleVertexPositionsKHR 5335

[[vk::ext_capability(RayTracingPositionFetchKHR)]]
[[vk::ext_extension("SPV_KHR_ray_tracing_position_fetch")]]

In the function to access the data:

  // Adding access to the vertex positions stored in the acceleration structure.
  [[vk::ext_decorate(BuiltIn, HitTriangleVertexPositionsKHR)]]
  float3 HitTriangleVertexPositions[3];

In the core HLSL, add the following:

#define RayQueryPositionFetchKHR 5391
#define OpRayQueryGetIntersectionTriangleVertexPositionsKHR 5340
#define RayQueryCandidateIntersectionKHR 0
#define RayQueryCommittedIntersectionKHR 1

[[vk::ext_capability(RayQueryPositionFetchKHR)]]
[[vk::ext_extension("SPV_KHR_ray_tracing_position_fetch")]]

[[vk::ext_instruction(OpRayQueryGetIntersectionTriangleVertexPositionsKHR)]]
float3 RayQueryGetIntersectionTriangleVertexPositionsKHR(
  [[vk::ext_reference]] RayQuery query,
  int committed)[3];

Then to use this new instruction:

  RayQuery  q;
  q.TraceRayInline(topLevelAS, RAY_FLAG_NONE, 0xFF, ray);
  q.Proceed();
...

  float3 positions[3] = RayQueryGetIntersectionTriangleVertexPositionsKHR(q, RayQueryCommittedIntersectionKHR);

None.

None.
