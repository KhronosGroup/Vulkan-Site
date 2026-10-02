# Optimizing Projections with Viewport Swizzling

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/11_Canted_Displays/03_viewport_swizzling.html

## Table of Contents

- [The Swizzle Stage: Re-routing the Pipeline](#_the_swizzle_stage_re_routing_the_pipeline)
- [The_Swizzle_Stage:_Re-routing_the_Pipeline](#_the_swizzle_stage_re_routing_the_pipeline)
- [Device Specificity and Portability](#_device_specificity_and_portability)
- [Device_Specificity_and_Portability](#_device_specificity_and_portability)

## Content

In some wide-FOV headsets, the physical display panel may be mounted at an angle that does not align with the standard Cartesian coordinate system. This is where the **VK_NV_viewport_swizzle** extension  becomes invaluable.

To understand viewport swizzling, you must look at the hardware path of a pixel. After the vertex shader finishes, the GPU performs **Perspective Division** and **Viewport Transformation**. Usually, this is fixed: X goes to X, Y goes to Y.

With **Viewport Swizzling**, you can re-route these components **at the hardware level**.

* 
**Why?**: Some headsets use rotated display panels to fit more pixels into a specific FOV.

* 
**Shader Problem**: Flipping X and Y in a shader is easy, but it happens **before** rasterization, which can break depth testing and hardware culling.

* 
**Hardware Solution**: Swizzling happens **after** the shader but **before** the pixel is drawn. It allows the hardware to handle rotated or inverted axes with zero performance penalty.

// Configuring a viewport swizzle for non-standard display layouts
vk::PipelineViewportSwizzleStateCreateInfoNV swizzleState{};
vk::ViewportSwizzleNV leftEyeSwizzle{
    vk::ViewportCoordinateSwizzleNV::ePositiveX,
    vk::ViewportCoordinateSwizzleNV::eNegativeY, // Invert vertical axis for hardware-level flip
    vk::ViewportCoordinateSwizzleNV::ePositiveZ,
    vk::ViewportCoordinateSwizzleNV::ePositiveW
};
swizzleState.pViewportSwizzles = &leftEyeSwizzle;

vk::GraphicsPipelineCreateInfo pipelineInfo{};
pipelineInfo.pNext = &swizzleState;

While viewport swizzling is a powerful tool for low-level hardware optimization, it is important to remember that it is often **vendor-specific** (like the `NV` suffix suggests).

In a modern spatial engine, you should treat swizzling as a "Hardware Driver" feature. Your engine’s core logic should remain rectilinear, but your `VulkanContext` can apply these swizzles based on the headset’s requirements discovered during the handshake. This keeps your game code clean while still hitting the absolute maximum performance on exotic wide-FOV hardware.

In the next chapter, we will look at how to scale these spatial techniques to even larger environments using **CAVE Architecture and Multi-GPU Synchronization**.

[Previous](02_non_parallel_projections.html) | [Next](04_incorporating_into_the_engine.html)
