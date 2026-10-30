# Primary Stereo with Insets

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/09_Quad_Views_Foveated/02_primary_stereo_with_insets.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Pixel Density Problem](#_the_pixel_density_problem)
- [The_Pixel_Density_Problem](#_the_pixel_density_problem)
- [Fixed vs. Dynamic Foveation](#_fixed_vs_dynamic_foveation)
- [Fixed_vs._Dynamic_Foveation](#_fixed_vs_dynamic_foveation)
- [Rendering the Quad-View in Slang](#_rendering_the_quad_view_in_slang)
- [Rendering_the_Quad-View_in_Slang](#_rendering_the_quad_view_in_slang)
- [Advanced: Dynamic Inset Scaling and VRS](#_advanced_dynamic_inset_scaling_and_vrs)
- [Advanced:_Dynamic_Inset_Scaling_and_VRS](#_advanced_dynamic_inset_scaling_and_vrs)

## Content

In a **Quad-View** architecture, each eye sees two overlapping images. The **Primary View** is a wide, lower-resolution image for the periphery, and the **Inset View** is a smaller, high-resolution image centered on the user’s gaze.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Configuring quadruple view configurations for foveated rendering is a standard process in OpenXR for supported hardware. You must use the runtime’s view configuration APIs and Vulkan’s multiview features to correctly target both primary and inset views.

To understand quad-views, consider the hardware limits of modern displays. A typical 4K-per-eye headset spread over a 110-degree FOV provides roughly 20-25 **PPD** (Pixels Per Degree). Human "Retina" resolution is closer to 60 PPD.

Instead of doubling the resolution of the entire display, we use **Foveated Rendering**. We render a high-density "Inset" (60 PPD) where the eye is looking, and a lower-density "Primary" (20 PPD) for the periphery.

The runtime handles the complex fusion of IR eye-tracking sensors and frame timing to align these insets, while automatically "feathering" the edges to prevent a jarring border.

**Fixed Foveation (FFR)**: The high-detail inset is locked to the center of the lens.

**Dynamic Foveation (DFR)**: The high-detail inset moves in real-time based on eye tracking.

// Defining the View Config for Quad-Views (N=4) using designated initializers
// Indices 0,1 are the wide base views; 2,3 are high-detail foveal insets.
XrViewConfigurationView configViews[4] = {
    { .type = XR_TYPE_VIEW_CONFIGURATION_VIEW, .recommendedImageRectWidth = 1920, .recommendedImageRectHeight = 1080 },
    { .type = XR_TYPE_VIEW_CONFIGURATION_VIEW, .recommendedImageRectWidth = 1920, .recommendedImageRectHeight = 1080 },
    { .type = XR_TYPE_VIEW_CONFIGURATION_VIEW, .recommendedImageRectWidth = 1024, .recommendedImageRectHeight = 1024 },
    { .type = XR_TYPE_VIEW_CONFIGURATION_VIEW, .recommendedImageRectWidth = 1024, .recommendedImageRectHeight = 1024 }
};

Our engine manages four distinct view matrices. In Slang, we handle the broadcast to all four layers in a single pass:

// Slang Shader Handling N=4 Views
struct QuadViewData {
    float4x4 viewProjection;
};

StructuredBuffer allViews; // 4 Views total

VertexOutput main(uint viewID : SV_ViewID, float3 pos : POSITION) {
    VertexOutput output;
    // The GPU broadcasts the same geometry to 4 different viewports/layers
    output.position = mul(allViews[viewID].viewProjection, float4(pos, 1.0));
    output.viewID = viewID;
    return output;
}

Vulkan allows you to push foveated rendering further than the OpenXR quad-view standard:

* 
**Fragment Density Maps**: While OpenXR expects fixed swapchain sizes, you can use Vulkan’s **Fragment Density Maps** to "fake" a resized inset. By rendering to a smaller sub-region and using a density map to scale during sampling, you can adjust foveal resolution without swapchain recreation.

* 
**Variable Rate Shading (VRS)**: You can use Vulkan’s VRS to maintain high-resolution geometry for the periphery while reducing the shading cost, ensuring geometric edges remain sharp even when fragment density is low.

|  | For more details on foveated rendering and quad-views, consult the official [XR_VARJO_quad_views Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#XR_VARJO_quad_views), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_multi_layer_composition.html)
