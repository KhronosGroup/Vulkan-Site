# Ray tracing position fetch

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/ray_tracing_position_fetch/README.html

## Table of Contents

- [Background](#_background)
- [In the application](#_in_the_application)
- [In_the_application](#_in_the_application)
- [In the shader](#_in_the_shader)
- [In_the_shader](#_in_the_shader)
- [GLSL](#_glsl)
- [HLSL](#_hlsl)
- [Additional resources](#_additional_resources)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/ray_tracing_position_fetch). |
| --- | --- |

Accessing per-vertex attributes in a ray tracing shader stage is a common use case, but often requires passing those attributes via some buffer and then doing manual indexing (and unpacking) in the shader. Even if it’s something already stored in the acceleration structure like vertex positions.

Using the `VK_KHR_ray_tracing_position_fetch` extension it’s now possible to directly access vertex positions from an acceleration structure

![Ray tracing position fetch sample](../../../_images/samples/extensions/ray_tracing_position_fetch/images/sample.png)

*Model "PICA PICA - Robot 01" by SEED.EA, acquired from [this url](https://sketchfab.com/3d-models/pica-pica-robot-01-438e3a1589a6411a8e704471930389e1)*

Enabling vertex position fetch in the application is straight-forward:

* 
Enable the `VK_KHR_ray_tracing_position_fetch` device extension

* 
Enable the `rayTracingPositionFetch` feature in the `VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR` struct

* 
Add the `VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR` flag (`VkBuildAccelerationStructureFlagsKHR`) to the build flags  of the bottom level acceleration structure to allow access to the positions from shaders

As part of this extension, `SPV_KHR_ray_tracing_position_fetch` adds new built-ins for accessing vertex positions to the any-hit and closest-hit ray tracing shaders.

// This extension is required for fetching position data in the closest hit shader
#extension GL_EXT_ray_tracing_position_fetch : require

...

// Get the vertex positions of the hit triangle
vec3 pos0 = gl_HitTriangleVertexPositionsEXT[0];
vec3 pos1 = gl_HitTriangleVertexPositionsEXT[1];
vec3 pos2 = gl_HitTriangleVertexPositionsEXT[2];

// For HLSL, we need to use SPIR-V intrinsics for vertex position fetch
#define HitTriangleVertexPositionsKHR 5335
#define RayTracingPositionFetchKHR 5336

[[vk::ext_extension("SPV_KHR_ray_tracing_position_fetch")]]
[[vk::ext_capability(RayTracingPositionFetchKHR)]]
[[vk::ext_builtin_input(HitTriangleVertexPositionsKHR)]]
const static float3 gl_HitTriangleVertexPositions[3];

...

// Get the vertex positions of the hit triangle
float3 pos0 = gl_HitTriangleVertexPositions[0];
float3 pos1 = gl_HitTriangleVertexPositions[1];
float3 pos2 = gl_HitTriangleVertexPositions[2];

* 
[Introducing Vulkan Ray Tracing Position Fetch Extension](https://www.khronos.org/blog/introducing-vulkan-ray-tracing-position-fetch-extension)
