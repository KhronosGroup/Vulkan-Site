# Multi-Layer Composition

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/09_Quad_Views_Foveated/03_multi_layer_composition.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Layer Stack: Modular Imagery](#_the_layer_stack_modular_imagery)
- [The_Layer_Stack:_Modular_Imagery](#_the_layer_stack_modular_imagery)
- [Masking and Blending](#_masking_and_blending)
- [Masking_and_Blending](#_masking_and_blending)
- [Advanced: Physically-Based Compositing and Alpha Blending](#_advanced_physically_based_compositing_and_alpha_blending)
- [Advanced:_Physically-Based_Compositing_and_Alpha_Blending](#_advanced_physically_based_compositing_and_alpha_blending)
- [Resource Synchronization: Multi-Swapchain Pacing](#_resource_synchronization_multi_swapchain_pacing)
- [Resource_Synchronization:_Multi-Swapchain_Pacing](#_resource_synchronization_multi_swapchain_pacing)

## Content

Rendering a **Quad-View** is only half the battle. Once we have our four views (base eyes and high-detail insets), we need to get them to the **OpenXR Compositor** for the final display. This is where **Multi-Layer Composition** comes in.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Submitting multiple composition layers is a standard process in OpenXR. You must use the runtime’s layer APIs and Vulkan’s synchronization primitives to correctly hand off each projection layer to the compositor.

In OpenXR, you don’t just submit a single image. You submit an array of **Composition Layers**. The compositor performs a final, high-priority pass to stack these images together before they hit the display.

**Base Layer**: Your standard 3D world (indices 0 and 1 of your quad-view).

**Inset Layer**: The high-detail foveal data (indices 2 and 3).

**Overlay Layer**: A flat HUD or menu that stays perfectly sharp.

// 1. Defining Composition Layers in OpenXR using designated initializers
XrCompositionLayerProjection baseLayer{
    .type = XR_TYPE_COMPOSITION_LAYER_PROJECTION,
    .layerFlags = XR_COMPOSITION_LAYER_CORRECT_CHROMATIC_ABERRATION_BIT,
    .space = worldSpace,
    .viewCount = 2,
    .views = baseViewsPtr
};

XrCompositionLayerProjection insetLayer{
    .type = XR_TYPE_COMPOSITION_LAYER_PROJECTION,
    .layerFlags = XR_COMPOSITION_LAYER_CORRECT_CHROMATIC_ABERRATION_BIT,
    .space = worldSpace,
    .viewCount = 2,
    .views = insetViewsPtr
};

// 2. Submitting layers to xrEndFrame
std::vector layers = {
    reinterpret_cast(&baseLayer),
    reinterpret_cast(&insetLayer)
};

XrFrameEndInfo frameEndInfo{
    .type = XR_TYPE_FRAME_END_INFO,
    .displayTime = frameState.predictedDisplayTime,
    .layerCount = static_cast(layers.size()),
    .layers = layers.data()
};
xrEndFrame(session, &frameEndInfo);

The order matters: the last layer in the list is drawn on top.

How does the compositor know where to show the high-detail inset? Each layer specifies a **Projection View**. For quad-views, the inset layer’s views have a smaller FOV but the same camera pose.

The compositor uses the FOV tangents to mathematically "place" the high-detail image over the low-detail one. It then performs a **Soft Edge Blend** to ensure the transition between the 20 PPD and 60 PPD regions is invisible to the user.

Vulkan allows you to perform your own depth-aware layer merging beyond the runtime’s defaults:

* 
**Custom Layer Merging**: While runtimes are often limited to a few layers, you can use Vulkan’s **Subgroup Operations** and **Input Attachments** to merge your own layers into a single consolidated image before hand-off, bypassing runtime restrictions.

* 
**Shared Depth Buffers**: Unless you use specific extensions, the runtime doesn’t know about the depth values of your layers. You can use Vulkan to create a **Shared Depth Buffer** across all composition layers, enabling perfect per-pixel occlusion between your HUD, world, and insets.

From an engine perspective, this means we are now managing **Multiple Swapchains** per frame.

* 
**Pacing**: We must call `xrWaitSwapchainImage` and `xrAcquireSwapchainImage` for **each** swapchain (Base and Inset).

* 
**Vulkan Sync**: Our command buffer recording must ensure all four views are rendered and transitioned before calling `xrReleaseSwapchainImage`.

This multi-layer approach allows each layer to have its own resolution and bit-depth, letting the compositor optimize the final image based on the specific needs of each part of the scene.

|  | For more details, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#composition_layers), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_primary_stereo_with_insets.html) | [Next](04_incorporating_into_the_engine.html)
