# Fragment Density Control & VRS

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/10_Variable_Rate_Shading/02_fragment_density_control.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Decoupling Rasterization from Shading](#_the_concept_decoupling_rasterization_from_shading)
- [The_Concept:_Decoupling_Rasterization_from_Shading](#_the_concept_decoupling_rasterization_from_shading)
- [Shading Rate Images: The Density Map](#_shading_rate_images_the_density_map)
- [Shading_Rate_Images:_The_Density_Map](#_shading_rate_images_the_density_map)
- [Advanced: Temporal Stability and Async Compute](#_advanced_temporal_stability_and_async_compute)
- [Advanced:_Temporal_Stability_and_Async_Compute](#_advanced_temporal_stability_and_async_compute)
- [Fixed Vignette Shading](#_fixed_vignette_shading)
- [Fixed_Vignette_Shading](#_fixed_vignette_shading)

## Content

Variable Rate Shading (VRS) allows us to reduce shading cost while maintaining geometric sharpness by decoupling the shading rate from the rasterization rate.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While Vulkan provides the powerful VRS extensions required for foveated shading, the OpenXR standard does not yet mandate their use or coordinate the generation of shading rate maps. You use Vulkan to implement these optimizations to push your engine’s performance beyond standard runtime expectations.

In legacy pipelines, reducing shading quality often meant rendering to a lower-resolution buffer and upscaling, which introduced blurring. Modern Vulkan provides a much more elegant solution via **Variable Rate Shading (VRS)**.

**Rasterization**: Determining which pixels are covered by a triangle.

**Shading**: Running a fragment shader to determine the color of those pixels.

With **VRS**, you can run one fragment shader for a **group** of pixels (e.g., a 2x2 or 4x4 block) while still keeping the high-resolution edges and depth data from the rasterizer. This maintains **Geometric Sharpness** while significantly reducing the **ALU** cost of complex lighting.

In a spatial pipeline, we use a **Shading Rate Image**. This is a low-resolution attachment where each "pixel" represents a tile of the screen (e.g., 8x8 or 16x16).

// Configuring the shading rate state using designated initializers
vk::PipelineFragmentShadingRateStateCreateInfoKHR shadingRateState{
    .fragmentSize = {1, 1}, // Default fallback
    .combinerOps = {
        vk::FragmentShadingRateCombinerOpKHR::eReplace, // Use the image's rate
        vk::FragmentShadingRateCombinerOpKHR::eKeep
    }
};

vk::GraphicsPipelineCreateInfo pipelineInfo{
    .pNext = &shadingRateState
};

The runtime checks your hardware’s supported tile sizes and ensures your density map matches these limits. It may even "warp" your density map during reprojection to keep the high-resolution "Sweet Spot" aligned with the lens optics.

Vulkan allows us to push VRS further than the OpenXR standard:

* 
**Temporal Shading Stability**: You can use Vulkan’s **Subgroup Operations** in a compute shader to analyze the previous frame’s depth and motion vectors, generating a refined density map that prevents "shimmering" artifacts in the periphery.

* 
**Async Compute Coordination**: You can use Vulkan to perform heavy compute work that respects the shading rate map of the primary graphics pass, ensuring your volumetric or lighting calculations are optimized alongside your geometry.

Because XR lenses are naturally bluer and more distorted at the edges, we can pre-calculate a "Vignette" map. The center of the lens is set to 1x1, while the outer rings are set to 2x2 or 4x4. Since the user rarely looks at the extreme edges, this is essentially "Free Performance."

|  | For more information on VRS and density maps, consult the official [Vulkan Specification on VRS](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#primsrast-fragment-shading-rate), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_gaze_driven_logic.html)
