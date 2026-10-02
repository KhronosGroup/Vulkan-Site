# Per-Pixel Masking & Stable Compositing

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/18_Semantic_Occlusion/03_per_pixel_masking.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: The Compositing Equation](#_the_concept_the_compositing_equation)
- [The_Concept:_The_Compositing_Equation](#_the_concept_the_compositing_equation)
- [Implementing Stencil-Based Masking](#_implementing_stencil_based_masking)
- [Implementing_Stencil-Based_Masking](#_implementing_stencil_based_masking)
- [Advanced: Physically-Based Compositing and Bloom Masking](#_advanced_physically_based_compositing_and_bloom_masking)
- [Advanced:_Physically-Based_Compositing_and_Bloom_Masking](#_advanced_physically_based_compositing_and_bloom_masking)
- [Temporal Stability: The Edge Jitter Problem](#_temporal_stability_the_edge_jitter_problem)
- [Temporal_Stability:_The_Edge_Jitter_Problem](#_temporal_stability_the_edge_jitter_problem)

## Content

Compositing virtual objects with the real world requires stable per-pixel masking to prevent "haloing" and "jitter" at the occlusion boundaries.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While OpenXR manages basic environment blending, the standard does not manage physically-based light transport or bloom masking. You use Vulkan’s hardware stencil pipeline and compute shaders to implement advanced physically-based compositing and temporal stability that the standard OpenXR compositor does not natively coordinate.

In Augmented Reality (AR), our "background" is the live camera feed (passthrough). To achieve realistic occlusion, we apply a semantic mask as a **Gating Function**.

**Hard Occlusion**: A binary decision (0 or 1). While simple, this leads to aliased edges that shimmer during head movement.

**Soft Occlusion**: A smooth gradient at the boundaries. By "feathering" the mask, we blend virtual and real worlds naturally, hiding imperfections in the ML pass.

The runtime handles the selection of the alpha blending mode and may apply late-stage feathering to the alpha channel you provide to ensure sharpness.

In our Vulkan engine, we use the **Stencil Buffer** to perform high-speed masking. This is more efficient than fragment shader branching, as the hardware can discard pixels early.

// Configuring stencil masking using designated initializers
vk::StencilOpState stencilOp{
    .failOp = vk::StencilOp::eKeep,
    .passOp = vk::StencilOp::eReplace,
    .depthFailOp = vk::StencilOp::eKeep,
    .compareOp = vk::CompareOp::eAlways,
    .compareMask = 0xFF,
    .writeMask = 0xFF,
    .reference = 0x1 // Mark real-world occluders
};

vk::PipelineDepthStencilStateCreateInfo depthStencil{
    .stencilTestEnable = VK_TRUE,
    .front = stencilOp,
    .back = stencilOp
};

We first fill the stencil buffer using the ML segmentation mask, then render the virtual scene where the stencil is NOT 0x1.

Vulkan allows us to push occlusion quality beyond standard alpha blending:

* 
**Physically-Based Compositing**: Using Vulkan’s **Dual Source Blending**, you can perform complex light-transport simulations, calculating how physical light should reflect off virtual surfaces in real-time.

* 
**Optical Bloom Masking**: You can use Vulkan **Compute Shaders** to detect bright physical light sources and apply custom "Bloom Masking" to ensure virtual occlusions feel solid even in high-contrast environments.

Because ML masks are generated frame-by-frame, they can flicker. To fix this, our engine implements **Temporal Reprojection**, taking the mask from the previous frame and re-projecting it using the current head pose (from OpenXR’s predicted display time). This ensures the boundary between reality and virtuality stays steady.

|  | For more information on stencil masking and alpha blending, consult the official [Vulkan Specification on Stencil Operations](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#fragops-stencil), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_ml_driven_segmentation.html) | [Next](04_incorporating_into_the_engine.html)
