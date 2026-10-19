# Geometric Correction & Edge Blending

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/13_Warp_and_Blend/02_geometric_correction.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Reverse Lookup](#_the_concept_reverse_lookup)
- [The_Concept:_Reverse_Lookup](#_the_concept_reverse_lookup)
- [Implementing the Warp Map](#_implementing_the_warp_map)
- [Implementing_the_Warp_Map](#_implementing_the_warp_map)
- [Advanced: Pixel-Perfect Blending and Dynamic Keystoning](#_advanced_pixel_perfect_blending_and_dynamic_keystoning)
- [Advanced:_Pixel-Perfect_Blending_and_Dynamic_Keystoning](#_advanced_pixel_perfect_blending_and_dynamic_keystoning)
- [Luminance Summation and Edge Blending](#_luminance_summation_and_edge_blending)
- [Luminance_Summation_and_Edge_Blending](#_luminance_summation_and_edge_blending)
- [Precision: Bicubic vs Sinc Filtering](#_precision_bicubic_vs_sinc_filtering)
- [Precision:_Bicubic_vs_Sinc_Filtering](#_precision_bicubic_vs_sinc_filtering)

## Content

Geometric correction transforms a rectilinear image into a "warped" one that looks correct when projected onto physical surfaces like curved screens or corners.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While standard HMD runtimes handle warping internally, for custom projector setups or curved display walls, you must implement your own geometric correction. You use Vulkan’s compute shaders and subgroup operations to implement pixel-perfect edge blending and warping that goes beyond the standard HMD-focused OpenXR model.

To understand warping, you must think in reverse. Instead of asking "Where does this source pixel go?", we ask **"For this pixel on my wall, where should I look in my rendered frame?"**

**Rectilinear Source**: A standard 3D render (straight lines, 90-degree corners).

**Physical Destination**: A curved screen or a corner where walls meet.

**The Warp Map**: A Look-Up Table (LUT) that maps every destination pixel to a $(u, v)$ coordinate in the source render.

The runtime maintains a persistent database of "Warp Meshes" and calculates the projective transformations (keystoning) required to "square up" the image for physical surfaces.

The "brain" of this operation is the **Warp Map**, typically a `vk::raii::Image` containing floating-point data. We use a compute shader to perform the reverse lookup:

// Configure the warp map texture binding using designated initializers
vk::DescriptorImageInfo warpMapInfo{
    .sampler = *pointSampler,
    .imageView = *warpMapView,
    .imageLayout = vk::ImageLayout::eShaderReadOnlyOptimal
};

vk::WriteDescriptorSet descriptorWrite{
    .dstSet = *warpDescriptorSet,
    .dstBinding = 0,
    .descriptorCount = 1,
    .descriptorType = vk::DescriptorType::eSampledImage,
    .pImageInfo = &warpMapInfo
};

In Slang, the compute kernel maps destination pixels to source coordinates:

// Compute-based warping kernel in Slang
void main(uint3 dispatchThreadID : SV_DispatchThreadID) {
    // 1. Look up where this wall pixel should sample from the rendered image
    float2 sourceUV = warpMap.Load(int3(dispatchThreadID.xy, 0));

    // 2. Sample and write to the final projector output
    outputTarget[dispatchThreadID.xy] = sourceRender.SampleLevel(linearSampler, sourceUV, 0);
}

Vulkan allows for a level of precision beyond standard calibration:

* 
**Pixel-Perfect Edge Blending**: Using Vulkan’s **Subgroup Operations**, you can implement real-time edge blending with pixel-perfect accuracy. This allows you to eliminate "hot spots" in overlapping projector regions dynamically.

* 
**Dynamic Keystoning**: By using compute shaders and tracked object data from OpenXR, you can implement dynamic keystoning that updates your warp map in real-time if a projector is physically moved during the session.

In a multi-projector setup, the edges overlap. This area will be twice as bright as the rest of the wall. To solve this, we include an alpha channel in our Warp Map that defines a smooth gradient. By multiplying the final color by this alpha, we maintain uniform brightness across the entire wall.

Because warping involves sampling a texture at non-integer coordinates, the quality of your filtering is paramount. While linear filtering is fast, it can lead to "blurring." High-end spatial engines often implement custom **Bicubic** or **Lanczos** filters in the compute shader to preserve sharpness during the coordinate transformation.

|  | For more information on projective geometry and warping, consult the official [Vulkan Specification on Samplers](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#samplers), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_post_process_warping.html)
