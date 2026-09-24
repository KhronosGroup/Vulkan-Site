# Stereo Viewport & Scissor Management

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/04_Dynamic_Rendering/03_stereo_viewport_scissor.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Architecture of the Eye: Asymmetric Projections](#_the_architecture_of_the_eye_asymmetric_projections)
- [The_Architecture_of_the_Eye:_Asymmetric_Projections](#_the_architecture_of_the_eye_asymmetric_projections)
- [Single-Texture vs. Array-Texture Swapchains](#_single_texture_vs_array_texture_swapchains)
- [Single-Texture_vs._Array-Texture_Swapchains](#_single_texture_vs_array_texture_swapchains)
- [Advanced: Variable Rate Shading and Stencil Masking](#_advanced_variable_rate_shading_and_stencil_masking)
- [Advanced:_Variable_Rate_Shading_and_Stencil_Masking](#_advanced_variable_rate_shading_and_stencil_masking)
- [Optimal View Management: The Pacing Pattern](#_optimal_view_management_the_pacing_pattern)
- [Optimal_View_Management:_The_Pacing_Pattern](#_optimal_view_management_the_pacing_pattern)

## Content

When rendering for XR, we aren’t just drawing to a single screen. We are drawing to multiple **Views**, each with its own perspective and projection. To manage this in a dynamic rendering context, we must master **Viewports** and **Scissors**.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Managing multiple viewports is a standard requirement for spatial views. You must use Vulkan’s dynamic state to align your rendering with the specific optical parameters provided by the runtime for each eye.

To understand why viewport and scissor management is so critical in XR, we must look at the lens optics. Unlike standard displays, XR lenses are often offset, leading to **Asymmetric Projections**.

* 
**Lens Distortion Correction**: The runtime knows the physical curvature of the lenses. It provides a viewport that is typically **larger** than the physical display panel resolution (often 1.4x) to account for the detail lost during the "barrel distortion" warping process.

* 
**Optimal Pixel Density**: The runtime ensures that the "sweet spot" of the lens (the optical center) receives the highest concentration of rendered pixels.

* 
**Frustum Alignment**: The asymmetric FOV values are designed to perfectly align with the physical limits of the headset’s housing, ensuring you don’t waste GPU cycles rendering pixels physically obscured by the device.

// Configure the viewport for a specific eye view using designated initializers
vk::Viewport eyeViewport{
    .x = 0.0f,
    .y = 0.0f,
    .width = static_cast(viewWidth),
    .height = static_cast(viewHeight),
    .minDepth = 0.0f,
    .maxDepth = 1.0f
};

// Configure the scissor to match
vk::Rect2D eyeScissor{
    .offset = {0, 0},
    .extent = {viewWidth, viewHeight}
};

// Dynamic state update in our command buffer
commandBuffer.setViewport(0, eyeViewport);
commandBuffer.setScissor(0, eyeScissor);

The swapchain’s layout isn’t handed to us by the runtime as a surprise — **we** choose it up front via `arraySize` in `XrSwapchainCreateInfo` (see [Runtime-Owned Swapchains](../03_Runtime_Owned_Swapchains/02_external_image_negotiation.html)). In practice that leaves two real options:

* 
**Array Textures** (`arraySize = viewCount`): Both eyes live in one `XrSwapchain` as separate array layers. We keep the viewport at `(0,0)` and select the eye by changing the `imageView` (or `baseArrayLayer`) in our `vk::RenderingAttachmentInfo`. This is what virtually every modern OpenXR runtime expects, and it’s the layout required for **Native Multiview** (`VK_KHR_multiview`), covered in [Native Multiview](../08_Slang_Spatial_Shaders/02_native_multiview.html) — where both eyes render in a single draw call instead of a per-eye loop.

* 
**Single-Texture Atlasing**: An older technique, predating OpenXR, where an application manually composites both eyes side-by-side into one double-wide texture using viewport `x`/`y` offsets. It isn’t something a runtime provides for you, and it’s incompatible with multiview rendering, so it’s a legacy fallback rather than something to design around today.

Because dynamic rendering lets us adjust the attachment and viewport per-draw without touching the pipeline object, moving from a naive per-eye loop to array-texture (and eventually multiview) rendering is a matter of changing which layer we bind, not restructuring the render loop.

Vulkan allows us to go beyond the standard rectangular viewport provided by OpenXR:

* 
**Variable Rate Shading (VRS)**: You can use Vulkan’s VRS to decouple the shading rate from the viewport resolution. This allows you to use a high-resolution viewport to satisfy lens distortion requirements while using a shading rate image to reduce the GPU load in the periphery.

* 
**Non-Rectangular Clipping**: OpenXR scissors are strictly rectangular. By using Vulkan **Stencil Buffers**, you can define "hidden area masks" that match the lens’s visible aperture, ensuring you never render a single pixel that will be obscured by the headset’s housing.

To minimize state transitions and optimize performance, our engine follows a specific pattern for each eye view:

**Acquire the Index**: Get the swapchain index from OpenXR for the current frame.

**Bind the View**: Point the `vk::RenderingAttachmentInfo` to the correct eye layer or atlas region.

**Apply Viewport/Scissor**: Tell the GPU the exact bounds of the current eye’s frustum.

**Issue Draw Calls**: Render the scene using the predicted view and projection matrices.

By treating viewports and scissors as dynamic state, we avoid the heavy "Pipeline Stall" that would occur if we had to switch entire pipeline objects between eyes.

|  | For more information on viewport and scissor state, check out the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#pipelines-dynamic-state), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_rendering_to_spatial_swapchains.html) | [Next](04_incorporating_into_the_engine.html)
