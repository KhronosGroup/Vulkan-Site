# Ray Traced Synthesis & Microlens Arrays

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/15_Plenoptic_Synthesis/03_ray_traced_synthesis.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [Physical Optics: The Microlens Array (MLA)](#_physical_optics_the_microlens_array_mla)
- [Physical_Optics:_The_Microlens_Array_(MLA)](#_physical_optics_the_microlens_array_mla)
- [Implementing the Virtual Lens in Slang](#_implementing_the_virtual_lens_in_slang)
- [Implementing_the_Virtual_Lens_in_Slang](#_implementing_the_virtual_lens_in_slang)
- [Advanced: Holographic Persistence and MLA Optimization](#_advanced_holographic_persistence_and_mla_optimization)
- [Advanced:_Holographic_Persistence_and_MLA_Optimization](#_advanced_holographic_persistence_and_mla_optimization)
- [Why Ray Trace? Physical Fidelity](#_why_ray_trace_physical_fidelity)
- [Why_Ray_Trace?_Physical_Fidelity](#_why_ray_trace_physical_fidelity)

## Content

For high-fidelity holographic displays, we use **Vulkan Ray Tracing (VRT)** to simulate the exact physical optics of a **Microlens Array (MLA)**.

This chapter falls under the category: **Beyond the OpenXR Standard**.

Standard OpenXR runtimes are built around traditional projection models. You use Vulkan’s Ray Tracing pipelines to simulate complex virtual microlens optics, allowing for vergence-accommodation solutions and sparse lightfield traversal that exceed the capabilities of the standard runtime compositor.

To understand ray-traced synthesis, you must understand how lightfield cameras work. They use a **Microlens Array**—a grid of thousands of tiny lenses placed in front of a sensor. In our ray tracing pipeline, we reverse this process:

**Primary Ray**: We trace a ray from the virtual eye to the screen.

**Microlens Intersection**: We simulate the ray passing through a virtual microlens.

**Refraction**: We calculate how the lens bends the ray based on focal length and curvature.

**LightField Lookup**: The refracted ray now points to a specific 4D plenoptic coordinate.

The runtime provides the focal length, pitch, and curvature parameters of the physical MLA via vendor extensions, and may even provide a pre-built acceleration structure for the lens geometry.

Using the `RaytracingAccelerationStructure` in Vulkan, we can simulate complex lenses that a raster shader cannot. We use designated initializers to configure the ray generation pass:

// Configuring the ray tracing pipeline using designated initializers
vk::RayTracingPipelineCreateInfoKHR pipelineInfo{
    .pNext = &dynamicRenderingInfo, // Link to our dynamic rendering state
    .stageCount = static_cast(stages.size()),
    .pStages = stages.data(),
    .groupCount = static_cast(groups.size()),
    .pGroups = groups.data(),
    .maxPipelineRayRecursionDepth = 1,
    .layout = *pipelineLayout
};

In our Slang RayGen shader, we perform the physical optics simulation:

// RayGen shader in Slang for plenoptic synthesis
[shader("raygeneration")]
void rayGenMain() {
    uint2 pixelID = DispatchRaysIndex().xy;
    float2 uv = float2(pixelID) / float2(DispatchRaysDimensions().xy);

    // 1. Trace a ray through the virtual microlens optics
    RayDesc ray = generateRayThroughLens(uv);

    // 2. Intersect the ray with our 4D LightField "box"
    float4 color = intersectLightField(ray, lightFieldData);

    // 3. Write the final result to the OpenXR swapchain image
    outputImage[pixelID] = color;
}

Vulkan allows you to push synthesis beyond standard view-dependent models:

* 
**Temporal Holographic Persistence**: Using Vulkan’s **Ray Tracing Motion Blur** extensions, you can simulate the persistence of a holographic display by tracing rays across the predicted display window. This ensures moving objects remain sharp and stable.

* 
**Subgroup MLA Intersections**: You can use Vulkan’s **Subgroup Operations** to implement highly efficient ray-circle or ray-hexagon intersection logic, sharing the computational cost of the lens simulation across multiple threads.

Ray tracing allows us to simulate **Vergence-Accommodation Conflict (VAC)** solutions. By adjusting the virtual focal length of our microlens array in real-time, we can change the "Plane of Focus" of the holographic image. This allows the user’s eyes to naturally focus on near or far virtual objects, eliminating eye strain.

Furthermore, ray tracing handles **Non-Uniform LightFields** (like octrees) much more efficiently than nested loops in a fragment shader.

|  | For more information on ray tracing and holographic displays, consult the official [Vulkan Specification on Ray Tracing](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#ray-tracing), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_synthesis_shaders.html) | [Next](04_incorporating_into_the_engine.html)
