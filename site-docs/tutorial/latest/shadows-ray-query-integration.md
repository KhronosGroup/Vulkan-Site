# Shadows: Ray Query Integration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Lighting_Materials/07_shadows.html

## Table of Contents

- [Understanding Shadows](#_understanding_shadows)
- [The Anatomy of a Shadow](#_the_anatomy_of_a_shadow)
- [The_Anatomy_of_a_Shadow](#_the_anatomy_of_a_shadow)
- [Shadow Mapping vs. Ray Traced Shadows](#_shadow_mapping_vs_ray_traced_shadows)
- [Shadow_Mapping_vs._Ray_Traced_Shadows](#_shadow_mapping_vs_ray_traced_shadows)
- [Ray Tracing Fundamentals](#_ray_tracing_fundamentals)
- [Ray_Tracing_Fundamentals](#_ray_tracing_fundamentals)
- [Requirements and Setup](#_requirements_and_setup)
- [Requirements_and_Setup](#_requirements_and_setup)
- [Building Acceleration Structures](#_building_acceleration_structures)
- [Building_Acceleration_Structures](#_building_acceleration_structures)
- [Implementing Ray Query in Shaders](#_implementing_ray_query_in_shaders)
- [Implementing_Ray_Query_in_Shaders](#_implementing_ray_query_in_shaders)
- [The Visibility Test](#_the_visibility_test)
- [The_Visibility_Test](#_the_visibility_test)
- [Integrating with PBR Lighting](#_integrating_with_pbr_lighting)
- [Integrating_with_PBR_Lighting](#_integrating_with_pbr_lighting)
- [From Hard to Soft Shadows](#_from_hard_to_soft_shadows)
- [From_Hard_to_Soft_Shadows](#_from_hard_to_soft_shadows)
- [Area Light Approximation](#_area_light_approximation)
- [Area_Light_Approximation](#_area_light_approximation)
- [Averaging Multiple Samples](#_averaging_multiple_samples)
- [Averaging_Multiple_Samples](#_averaging_multiple_samples)
- [Challenges and Best Practices](#_challenges_and_best_practices)
- [Challenges_and_Best_Practices](#_challenges_and_best_practices)
- [Summary and Comparison](#_summary_and_comparison)
- [Summary_and_Comparison](#_summary_and_comparison)
- [Next Steps & Further Reading](#_next_steps_further_reading)
- [Next_Steps_&_Further_Reading](#_next_steps_further_reading)

## Content

Shadows are more than just dark patches on the ground; they are fundamental to how we perceive 3D space. They provide critical visual cues about the position, shape, and scale of objects, as well as the nature of the light sources illuminating them. In this section, we’ll move from simple "flat" lighting to a more realistic model by implementing hardware-accelerated shadows using **Vulkan Ray Query**.

In the physical world, shadows occur when an opaque object obstructs the path of light from a source to a surface. To simulate this in computer graphics, we must solve the **visibility problem**: for any given point on a surface, is there an unobstructed line of sight to the light source?

Real-world light sources are rarely infinitesimal points. Because lights have physical size (area lights), shadows often consist of two distinct regions:

* 
**Umbra**: The darkest part of the shadow where the light source is completely occluded.

* 
**Penumbra**: The "soft" edge of the shadow where the light source is only partially occluded.

While our initial implementation focuses on "hard" shadows (where a point is either 100% in shadow or 100% lit), the techniques we use here support advanced **soft shadowing** by sampling the light as an area rather than a point.

For decades, **Shadow Mapping** has been the industry standard. It involves rendering the scene’s depth from the light’s perspective into a texture, then comparing distances during the main render pass. However, shadow mapping comes with significant challenges:

* 
**Resolution & Aliasing**: Shadows can look "blocky" if the shadow map resolution is too low.

* 
**Biasing Issues**: Finding the right "bias" to prevent **shadow acne** (self-shadowing) and **peter-panning** (shadows detaching from objects) is a constant struggle.

* 
**Memory Overhead**: Each light source requires its own depth texture.

**Ray Tracing (Ray Query)** solves these issues by performing precise geometric intersections. Instead of checking a low-resolution texture, we ask the GPU: "Does this ray hit any triangle between point A and point B?" This results in pixel-perfect accuracy and simplifies the handling of multiple light types (point, spot, directional) without managing dozens of depth maps.

To perform ray tracing efficiently, we can’t just loop through every triangle in the scene for every pixel. Instead, we use **Acceleration Structures**.

**Bottom-Level Acceleration Structure (BLAS)**: This stores the raw geometry (vertices and indices) for a single mesh. Think of it as a spatial index for a single object.

**Top-Level Acceleration Structure (TLAS)**: This contains **instances** of BLASs. Each instance has its own transformation matrix, allowing us to place the same mesh multiple times in the world with minimal memory overhead.

Ray Query requires hardware support and specific Vulkan extensions. In our engine, we ensure these are enabled during device creation:

* 
`VK_KHR_acceleration_structure`

* 
`VK_KHR_ray_query`

In our engine, the `Renderer::buildAccelerationStructures` method in `renderer_ray_query.cpp` handles the creation. We build one BLAS for each unique mesh and then a TLAS that references them.

bool Renderer::buildAccelerationStructures(const std::vector &entities)
{
    // 1. Create BLAS for each unique mesh
    for (auto &mesh : uniqueMeshes) {
        buildBlas(mesh); // Compiles mesh data into a GPU-optimized format
    }

    // 2. Create TLAS by instancing BLASs
    std::vector instances;
    for (auto &entity : entities) {
        auto mesh = entity->getComponent();
        auto transform = entity->getComponent();

        vk::AccelerationStructureInstanceKHR instance{};
        instance.transform = toVkTransform(transform->getMatrix());
        instance.accelerationStructureReference = getBufferDeviceAddress(mesh->blas.buffer);
        instance.mask = 0xFF; // Allows filtering objects during ray tests
        instances.push_back(instance);
    }
    buildTlas(instances);

    return true;
}

With the TLAS built and bound to a descriptor set, we can perform visibility tests directly in our PBR fragment shader (`pbr.slang`).

We implement a helper function `traceShadowOccluded`. It initializes a `RayQuery` object, traces a ray, and checks if it hits any geometry before reaching the light.

[[vk::binding(11, 0)]] RaytracingAccelerationStructure tlas;

static const float RASTER_SHADOW_EPS = 0.002;

bool traceShadowOccluded(float3 origin, float3 direction, float tMin, float tMax)
{
    RayDesc ray;
    ray.Origin = origin;
    ray.Direction = direction;
    ray.TMin = tMin;
    ray.TMax = tMax;

    RayQuery q;
    q.TraceRayInline(
        tlas,
        RAY_FLAG_ACCEPT_FIRST_HIT_AND_END_SEARCH, // Optimization: any hit is enough to shadow
        0xFF,
        ray
    );

    while (q.Proceed()) {
        // q.Proceed() steps through potential hits.
        // For simple opaque shadows, we don't need logic here.
    }

    return (q.CommittedStatus() == COMMITTED_TRIANGLE_HIT);
}

In the main lighting loop, we determine the occlusion status before adding a light’s contribution.

// Inside the fragment shader lighting loop
float3 L = normalize(light.position.xyz - input.WorldPos);
float distToLight = length(light.position.xyz - input.WorldPos);

// Important: Move the origin slightly along the normal to prevent the ray
// from immediately hitting the surface it started from.
float3 shadowOrigin = input.WorldPos + N * RASTER_SHADOW_EPS;

bool occluded = traceShadowOccluded(shadowOrigin, L, RASTER_SHADOW_EPS, distToLight);

if (!occluded) {
    // Add diffuse and specular contributions if not in shadow
    directLighting += calculatePBR(L, V, N, ...);
}

Our engine’s Ray Query implementation in `ray_query.slang` goes beyond simple hard shadows by implementing **stochastic soft shadows**. Instead of treating the light as a single point, we treat it as an area light with a defined radius.

We simulate an area light by jittering the light position for each shadow ray. Using a stable random number generator and disk sampling, we pick a random point within the "radius" of the light source.

// Generate a random sample on a disk to simulate light area
float2 diskSample = rqSampleDisk(rngState);
float3 samplePos = lightPos + (T * diskSample.x + B * diskSample.y) * lightRadius;

float3 L = normalize(samplePos - worldPos);
float distToLight = length(samplePos - worldPos);

// Trace a ray toward the sampled point on the light
bool occluded = traceShadowOccluded(shadowOrigin, L, RASTER_SHADOW_EPS, distToLight);

By tracing multiple rays (`shadowSampleCount`) toward different points on the area light and averaging the results, we produce a smooth transition between lit and shadowed regions (the penumbra).

float visibilityAcc = 0.0;
for (int i = 0; i 

**Self-Shadowing (Acne)**: Even with ray tracing, floating-point precision can cause a ray to hit its own starting triangle. Always use a small `EPSILON` offset or a `TMin` value.

**Alpha Masking & Transmissivity**: For foliage or glass, a simple binary hit test isn’t enough. Our engine handles this by:

* 
**Manual Alpha Testing**: In the `while(q.Proceed())` loop, we fetch the material’s texture and discard hits that are transparent.

* 
**Transmissive Bypass**: We can flag certain materials (like glass) as non-occluding for shadow rays so they don’t cast pitch-black shadows.

**Performance**: Ray tracing is expensive. While Ray Query is faster than a full ray tracing pipeline for simple visibility, it still adds cost. For high-performance scenarios, consider:

* 
**Denoising**: If you use multiple rays for soft shadows, you’ll need a denoiser to clean up the grain.

* 
**Culling**: Don’t trace rays for lights that are too far away or behind the surface.

Ray Query provides a powerful and flexible way to implement shadows in a modern engine. While it requires hardware support, it offers significant advantages over traditional shadow mapping:

| Feature | Shadow Mapping | Ray Query |
| --- | --- | --- |
| **Precision** | Limited by texture resolution (aliasing) | Pixel-perfect (geometric intersection) |
| **Complexity** | High (biasing, multi-light management) | Low (direct visibility test) |
| **Memory** | High (depth maps per light) | Low (acceleration structures) |
| **Soft Shadows** | Complex (PCSS, blurring) | Native (area light sampling) |

Shadows are a deep topic. Now that you understand how to implement basic and soft shadows using Ray Query, you can explore more advanced areas:

* 
**PCSS (Percentage Closer Soft Shadows)**: A raster-based technique for variable-penumbra shadows (where shadows get softer as the distance from the occluder increases).

* 
**Ambient Occlusion (RTAO)**: Use ray tracing to calculate how much ambient light reaches a point by tracing rays in a hemisphere around the normal.

* 
**Vulkan Ray Tracing Tutorial**: The [NVIDIA Vulkan Ray Tracing Tutorial](https://nvpro-samples.github.io/vk_raytracing_tutorial_KHR/) is an excellent resource for deep-diving into these extensions.

In the next chapter, we’ll look at how to add a Graphical User Interface (GUI) to control these lighting and shadow parameters in real-time.

[Previous: Vulkan Integration](05_vulkan_integration.html) | [Next: Conclusion](06_conclusion.html)
