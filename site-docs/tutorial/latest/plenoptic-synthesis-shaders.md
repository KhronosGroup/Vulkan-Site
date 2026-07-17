# Plenoptic Synthesis Shaders

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/15_Plenoptic_Synthesis/02_synthesis_shaders.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Reconstructing the Wavefront](#_the_concept_reconstructing_the_wavefront)
- [The_Concept:_Reconstructing_the_Wavefront](#_the_concept_reconstructing_the_wavefront)
- [Quadrilinear Interpolation: The 16-Sample Lookup](#_quadrilinear_interpolation_the_16_sample_lookup)
- [Quadrilinear_Interpolation:_The_16-Sample_Lookup](#_quadrilinear_interpolation_the_16_sample_lookup)
- [Advanced: Cooperative Ray-Casting and Dynamic Occlusion](#_advanced_cooperative_ray_casting_and_dynamic_occlusion)
- [Advanced:_Cooperative_Ray-Casting_and_Dynamic_Occlusion](#_advanced_cooperative_ray_casting_and_dynamic_occlusion)
- [Performance: Coalescing the Rays](#_performance_coalescing_the_rays)
- [Performance:_Coalescing_the_Rays](#_performance_coalescing_the_rays)

## Content

To turn a 4D lightfield back into a 2D image, we use **Image-Based Rendering (IBR)** to selectively sample the rays that pass through our virtual camera lens.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While OpenXR provides the exact eye poses for each frame, the complex process of reconstructing smooth wavefronts from plenoptic data via 4D quadrilinear interpolation is a Vulkan-driven synthesis technique. You use Vulkan’s high-speed memory access and subgroup operations to implement these advanced spatial effects that go beyond the standard runtime projection model.

To turn a 4D lightfield back into a 2D image, we use **Image-Based Rendering (IBR)**. Instead of drawing triangles, we treat our 4D buffer as a dense "cloud" of light rays and selectively pull the ones that would pass through our virtual camera lens.

**Ray Tracing**: For every pixel, we calculate a ray starting at the eye and passing through that pixel.

**Intersection**: We find where that ray hits the **ST plane** (position) and the **UV plane** (direction) of our lightfield.

**Synthesis**: We look up the color of the ray at those coordinates in our 4D buffer.

The runtime provides the exact `XrView` pose for each frame, which our synthesis shader uses to determine the origin and direction of the rays, ensuring the perspective is perfectly aligned with the headset.

Because our lightfield is stored as a discrete grid, we must interpolate. In 4D, this requires **Quadrilinear Interpolation**, sampling 16 different rays (4 spatial $\times$ 4 directional) for every pixel.

// Quadrilinear interpolation logic in Slang
float4 sampleLightField(float2 st, float2 uv) {
    // 1. Calculate floor and fractional parts for both planes
    uint2 st0 = uint2(floor(st));
    uint2 uv0 = uint2(floor(uv));
    float2 stF = frac(st);
    float2 uvF = frac(uv);

    // 2. Perform ST-plane interpolation at the surrounding UV coordinates
    float4 c00 = lerp(lerp(fetch(st0, uv0), fetch(st0 + uint2(1, 0), uv0), stF.x),
                      lerp(fetch(st0, uint2(0, 1), uv0), fetch(st0 + uint2(1, 1), uv0), stF.x),
                      stF.y);
    // ... repeat for the other 3 UV neighbors ...

    // 3. Perform the final UV-plane interpolation
    return finalColor;
}

On the C++ side, we use designated initializers to bind the lightfield resources for the synthesis pass:

// Binding the lightfield for synthesis using designated initializers
vk::DescriptorBufferInfo lfBufferInfo{
    .buffer = *lightFieldBuffer,
    .offset = 0,
    .range = VK_WHOLE_SIZE
};

vk::WriteDescriptorSet lfWrite{
    .dstSet = *synthesisSet,
    .dstBinding = 0,
    .descriptorCount = 1,
    .descriptorType = vk::DescriptorType::eStorageBuffer,
    .pBufferInfo = &lfBufferInfo
};

Vulkan allow us to optimize synthesis beyond standard view-dependent fetching:

* 
**Cooperative Ray-Casting**: Using Vulkan’s **Subgroup Operations**, you can coordinate ray-casting across neighboring pixels, sharing the cost of the expensive 4D lookups and plane intersections.

* 
**Dynamic Occlusion**: You can use Vulkan’s **Depth-Stencil Testing** to implement dynamic occlusion between your lightfield synthesis and traditional rasterized 3D geometry, ensuring virtual objects can realistically "sink" into the holographic scene.

Because we are doing 16 lookups per pixel, we must be mindful of **SIMT Coalescing**. By using the **4D Tiling** we implemented in Chapter 14, we ensure that these 16 samples are geographically close in physical VRAM. This allows the GPU to satisfy all requests with just one or two cache line fetches, keeping our plenoptic synthesis running at high frame rates.

|  | For more information on image-based rendering and quadrilinear filtering, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#textures-interpolation), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_ray_traced_synthesis.html)
