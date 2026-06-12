# Shader Execution Reordering (SER) for Ray Tracing

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/ray_tracing_invocation_reorder/README.html

## Table of Contents

- [Overview](#_overview)
- [The Divergence Problem](#_the_divergence_problem)
- [The_Divergence_Problem](#_the_divergence_problem)
- [Control Flow Divergence](#_control_flow_divergence)
- [Control_Flow_Divergence](#_control_flow_divergence)
- [Data Divergence](#_data_divergence)
- [How Shader Execution Reordering Helps](#_how_shader_execution_reordering_helps)
- [How_Shader_Execution_Reordering_Helps](#_how_shader_execution_reordering_helps)
- [Using Coherence Hints](#_using_coherence_hints)
- [Using_Coherence_Hints](#_using_coherence_hints)
- [Hit Objects Without Reordering](#_hit_objects_without_reordering)
- [Hit_Objects_Without_Reordering](#_hit_objects_without_reordering)
- [Best Practices](#_best_practices)
- [When to Use SER](#_when_to_use_ser)
- [When_to_Use_SER](#_when_to_use_ser)
- [Minimizing Live State](#_minimizing_live_state)
- [Minimizing_Live_State](#_minimizing_live_state)
- [Device Support](#_device_support)
- [This Sample](#_this_sample)
- [Key Features](#_key_features)
- [Enabling the Extension](#_enabling_the_extension)
- [Enabling_the_Extension](#_enabling_the_extension)
- [Performance Expectations](#_performance_expectations)
- [Resources](#_resources)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/ray_tracing_invocation_reorder). |
| --- | --- |

**Extensions**: [`VK_EXT_ray_tracing_invocation_reorder`](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VK_EXT_ray_tracing_invocation_reorder.html)

**GLSL Extensions**: [`GL_EXT_shader_invocation_reorder`](https://github.com/KhronosGroup/GLSL/blob/master/extensions/ext/GLSL_EXT_shader_invocation_reorder.txt)

This sample demonstrates **Shader Execution Reordering (SER)**, a powerful optimization technique for ray tracing that reduces performance issues caused by divergence. SER allows you to reorganize shader invocations across the GPU to group similar work together, significantly improving coherency and performance.

The sample shows how to use the `VK_EXT_ray_tracing_invocation_reorder` extension with hit objects and the `reorderThreadEXT()` / `ReorderThread()` functions to achieve performance improvements of 20–50% or more in ray tracing workloads.

|  | glslc in current Vulkan SDKs does not yet support `GL_EXT_shader_invocation_reorder`. For this reason, this sample is authored and built with **Slang** by default. The GLSL source files are provided for reference only and are not compiled by the build system. |
| --- | --- |

|  | Prefer the provided **Slang** shaders for this sample. They compile to SPIR-V using the Slang compiler and expose SER via `HitObject` and `ReorderThread()` intrinsics. (GLSL usage is shown for completeness, but may not compile with glslc until support lands.) |
| --- | --- |

Ray tracing faces two major performance challenges:

GPUs execute shader code in parallel on groups of invocations (subgroups, typically 32 or 64 threads). When invocations in the same subgroup take different code paths—such as invoking different shaders or executing different branches—the GPU must serialize execution, with active invocations waiting for inactive ones to finish.

In ray tracing, this commonly occurs when:

* 
Adjacent rays hit different objects and invoke different closest-hit shaders

* 
Some rays miss while others hit geometry

* 
Rays terminate at different bounce depths

When rays become incoherent, they access scattered memory locations for geometry data, textures, and acceleration structures. This leads to:

* 
Poor cache utilization

* 
Increased memory bandwidth requirements

* 
Stalls waiting for memory subsystems

SER addresses these issues by introducing **hit objects** that separate ray traversal from shader invocation, allowing the GPU to pause execution and reorder invocations:

// Traditional approach: traverse and invoke shaders in one call
traceRayEXT(topLevelAS, rayFlags, cullMask, sbtOffset, sbtStride,
            missIndex, rayOrigin, rayTMin, rayDirection, rayTMax, payloadIndex);

// SER approach: separate traversal from shader invocation
hitObjectEXT hitObj;
hitObjectRecordEmptyEXT(hitObj);

// Step 1: Traverse acceleration structure
hitObjectTraceRayEXT(hitObj, topLevelAS, rayFlags, cullMask,
                     sbtOffset, sbtStride, missIndex,
                     rayOrigin, rayTMin, rayDirection, rayTMax, payloadIndex);

// Step 2: Reorder invocations for better coherency
reorderThreadEXT(hitObj);

// Step 3: Invoke the miss or closest-hit shader
hitObjectExecuteShaderEXT(hitObj, payloadIndex);

The same concepts apply in **Slang** with HLSL-style syntax:

// Traditional approach: traverse and invoke shaders in one call
TraceRay(topLevelAS, RAY_FLAG_NONE, 0xff, 0, 0, 0, ray, payload);

// SER approach: separate traversal from shader invocation
RayDesc ray;
ray.Origin = origin.xyz;
ray.Direction = direction.xyz;
ray.TMin = tmin;
ray.TMax = tmax;

// Step 1: Trace ray and store hit information in hit object
HitObject hitObj = HitObject::TraceRay(topLevelAS, RAY_FLAG_NONE, 0xff,
                                       0, 0, 0, ray, payload);

// Step 2: Reorder invocations for better coherency
ReorderThread(hitObj);

// Step 3: Execute the miss or closest-hit shader
HitObject::Invoke(topLevelAS, hitObj, payload);

By calling `reorderThreadEXT()` (GLSL) or `ReorderThread()` (Slang), the GPU **can**

* 
Group invocations that will execute the same shader

* 
Organize invocations accessing similar data

* 
Reduce overall divergence and improve cache efficiency

For even better performance, you can provide hints to guide the reordering:

// Reorder with a coherence hint
uint hint = 0;
if (hitObjectIsHitEXT(hitObj))
{
    hint = hitObjectGetInstanceIdEXT(hitObj);
}
reorderThreadEXT(hitObj, hint, 8);  // Use 8 bits for the hint

In Slang, the equivalent looks like this:

uint hint = 0;
if (hitObj.IsHit())
{
    hint = hitObj.GetInstanceIndex();
}
ReorderThread(hitObj, hint, 8);

The GPU sorts invocations by:

**Shader ID** (highest priority - which shader will execute)

**Your hint** (middle priority - custom application-specific data)

**Implementation-specific data** (lowest priority)

Good coherence hints include:

* 
Material IDs or flags that affect control flow

* 
Texture binding indices for similar data access

* 
Early-exit conditions (e.g., path length, Russian Roulette)

Even if you don’t need reordering, hit objects provide valuable functionality:

* 
**Shadow/AO rays**: Skip shader invocation entirely with `hitObjectIsHitEXT()` or `hitObjectIsMissEXT()`

* 
**Flexible payloads**: Use different payload types for traversal vs. shader invocation

* 
**Direct hit access**: Query hit information (positions, normals, matrices) at the ray generation level

SER provides the biggest benefits when you have:

* 
**Path tracing** with multiple bounces and material diversity

* 
**Multiple closest-hit shaders** representing different materials

* 
**Secondary, scattered rays** (e.g., rough reflections)

* 
**Stochastic effects** creating natural divergence

SER may not help as much with:

* 
Highly coherent primary rays

* 
Simple shaders with minimal divergence

* 
Single übershaders with minimal branching

When `reorderThreadEXT()` is called, the GPU must save and restore the invocation’s local variables (live state). To maximize performance:

* 
Avoid keeping variables live across the `reorderThreadEXT()` call

* 
Use smaller data types (FP16 instead of FP32 where appropriate)

* 
Pack flags and enums into bit fields

* 
Audit your ray payloads to remove unnecessary fields

The extension has backwards-compatibility built in:

* 
On devices with hardware SER support, `reorderThreadEXT()` actively reorders invocations

* 
On older devices, `reorderThreadEXT()` becomes a no-op, but hit objects still work

* 
Query `VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT` to check support:

VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT serProperties{};
serProperties.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_EXT;

VkPhysicalDeviceProperties2 deviceProperties{};
deviceProperties.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2;
deviceProperties.pNext = &serProperties;

vkGetPhysicalDeviceProperties2(physicalDevice, &deviceProperties);

bool canReorder = (serProperties.rayTracingInvocationReorderReorderingHint ==
                   VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT);

This sample demonstrates SER with an interactive comparison:

* 
**Three material types** that create control flow divergence:

Diffuse ("normal") textured surfaces

* 
Refraction (glass, or smoke) surfaces

* 
Flame/emissive particles

**Toggle SER on/off** to see the performance difference

**Coherence hints** based on instance ID (can be toggled)

**Real-time UI** showing whether the device supports reordering

The scene is intentionally designed to maximize divergence when SER is disabled, showing the benefits of reordering when enabled.

* 
Enable/disable SER dynamically via UI

* 
Toggle coherence hints to see their impact

* 
Compare traditional `traceRayEXT()`/`TraceRay()` vs. hit objects + `reorderThreadEXT()`/`ReorderThread()`

* 
Device capability detection and display

To use SER in your application:

// Enable the extension
add_device_extension(VK_EXT_RAY_TRACING_INVOCATION_REORDER_EXTENSION_NAME);

// Request the feature
REQUEST_REQUIRED_FEATURE(gpu, VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT,
                         rayTracingInvocationReorder);

In Slang shaders:

// Use HitObject + ReorderThread to enable SER
HitObject hitObj = HitObject::TraceRay(topLevelAS, RAY_FLAG_NONE, 0xff, 0, 0, 0, ray, payload);
// Optionally provide a coherence hint (e.g., instance index)
uint hint = hitObj.IsHit() ? hitObj.GetInstanceIndex() : 0;
ReorderThread(hitObj, hint, 8);
HitObject::Invoke(topLevelAS, hitObj, payload);

If you use GLSL, enable the extension explicitly in your shader:

#extension GL_EXT_shader_invocation_reorder : enable

|  | glslc in current public SDKs may not compile GLSL shaders using this extension yet; prefer Slang for now. |
| --- | --- |

Real-world applications have seen:

* 
**11-24%** improvement in path tracing (with live state optimization)

* 
**40-50%** in synthetic benchmarks with high divergence

* 
**30-40%** when combined with other optimizations (e.g., Opacity Micromaps)

The actual gain depends on:

* 
Scene complexity and material diversity

* 
Amount of control flow and data divergence

* 
Quality of coherence hints

* 
Live state size

* 
[VK_EXT_ray_tracing_invocation_reorder specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VK_EXT_ray_tracing_invocation_reorder.html)

* 
[GL_EXT_shader_invocation_reorder specification](https://github.com/KhronosGroup/GLSL/blob/master/extensions/ext/GLSL_EXT_shader_invocation_reorder.txt)

* 
[DirectX Shader Execution Reordering documentation](https://github.com/microsoft/DirectX-Specs/blob/master/d3d/Raytracing.md#shader-execution-reordering)
