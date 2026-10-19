# Post-Process Warping and Lens Distortion

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/13_Warp_and_Blend/03_post_process_warping.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Physics of the Lens: Why Warp?](#_the_physics_of_the_lens_why_warp)
- [The_Physics_of_the_Lens:_Why_Warp?](#_the_physics_of_the_lens_why_warp)
- [Mathematical Models of Distortion](#_mathematical_models_of_distortion)
- [Mathematical_Models_of_Distortion](#_mathematical_models_of_distortion)
- [Advanced: DLSS and Custom Distortion Kernels](#_advanced_dlss_and_custom_distortion_kernels)
- [Advanced:_DLSS_and_Custom_Distortion_Kernels](#_advanced_dlss_and_custom_distortion_kernels)
- [Chromatic Aberration: The Rainbow Effect](#_chromatic_aberration_the_rainbow_effect)
- [Chromatic_Aberration:_The_Rainbow_Effect](#_chromatic_aberration_the_rainbow_effect)
- [Rendering 1.2x: The Oversampling Tax](#_rendering_1_2x_the_oversampling_tax)
- [Rendering_1.2x:_The_Oversampling_Tax](#_rendering_1_2x_the_oversampling_tax)

## Content

Warping is fundamental to head-mounted displays (HMDs) to counteract the physical **Pin-Cushion Distortion** of the lenses.

This chapter falls under the category: **What your OpenXR Runtime is Probably Doing**.

While we teach the underlying mathematics and Vulkan implementation of lens warping, for most commercial HMDs, these operations are handled internally by the runtime’s compositor. Understanding this process is critical for developing custom hardware or implementing advanced post-warp effects that go beyond the standard runtime pipeline.

VR lenses are designed to take a tiny display and magnify it to cover your entire field of view. This magnification is not uniform, introducing **Pin-Cushion Distortion**.

To counteract this, the engine must apply a **Barrel Distortion** post-process. By "squeezing" the corners in our shader, the lens’s physical stretch pulls them back into their correct rectilinear positions.

While most runtimes apply this distortion implicitly, you can implement your own for custom hardware or advanced effects like **Chromatic Aberration Correction**.

Most lens distortion can be modeled using a radial polynomial (like the **Brown-Conrady** model). This model uses coefficients ($k_1, k_2, k_3$) to shift the $(u, v)$ coordinates based on their distance from the optical center.

// Applying a simple radial distortion model in Slang
float2 ApplyDistortion(float2 uv, float2 k)
{
    float2 center = float2(0.5, 0.5);
    float2 d = uv - center;
    float r2 = dot(d, d);

    // Barrel distortion: shifts pixels towards the center based on distance
    float2 distortedD = d * (1.0 + k.x * r2 + k.y * r2 * r2);

    return center + distortedD;
}

On the C++ side, we use designated initializers to bind our source renders for these post-process passes:

// Binding the source render for post-process warping using designated initializers
vk::DescriptorImageInfo sourceInfo{
    .sampler = *linearSampler,
    .imageView = *sourceView,
    .imageLayout = vk::ImageLayout::eShaderReadOnlyOptimal
};

vk::WriteDescriptorSet write{
    .dstSet = *postProcessSet,
    .dstBinding = 0,
    .descriptorCount = 1,
    .descriptorType = vk::DescriptorType::eSampledImage,
    .pImageInfo = &sourceInfo
};

Vulkan allow us to push the boundaries of HMD post-processing:

* 
**DLSS and Super Resolution**: You can implement your own **Deep Learning Super Sampling** pass before the runtime’s warp. This ensures the compositor receives a high-detail image even from a lower-resolution source, providing visual clarity beyond standard OpenXR pipelines.

* 
**Custom Post-Warp Effects**: Using Vulkan’s **Shader Objects**, you can dynamically inject effects like localized lens flare or optical film grain directly into the final composition pass, bypassing the runtime’s "black box" compositor.

Lenses also refract different wavelengths of light at different angles, creating "color fringing." To fix this, we apply a slightly different warp to each color channel.

float4 color;
// We sample the source image three times with different distortion coefficients
color.r = sourceRender.SampleLevel(s, ApplyDistortion(uv, k_red), 0).r;
color.g = sourceRender.SampleLevel(s, ApplyDistortion(uv, k_green), 0).g;
color.b = sourceRender.SampleLevel(s, ApplyDistortion(uv, k_blue), 0).b;
color.a = 1.0;

Because warping "squeezes" the image, some areas are scaled down while others are scaled up. To prevent blurring in the center of your view, you must render your 3D scene at a **Higher Resolution** than the display (typically 1.2x to 1.4x).

|  | For more information on post-process warping, check out the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#distortion), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_geometric_correction.html) | [Next](04_incorporating_into_the_engine.html)
