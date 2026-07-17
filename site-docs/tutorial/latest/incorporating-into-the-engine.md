# Incorporating into the Engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/15_Plenoptic_Synthesis/04_incorporating_into_the_engine.html

## Table of Contents

- [Implementing the Raster Synthesis Path](#_implementing_the_raster_synthesis_path)
- [Implementing_the_Raster_Synthesis_Path](#_implementing_the_raster_synthesis_path)
- [Implementing the Ray Traced Path](#_implementing_the_ray_traced_path)
- [Implementing_the_Ray_Traced_Path](#_implementing_the_ray_traced_path)
- [Sharing Logic via Slang Modules](#_sharing_logic_via_slang_modules)
- [Sharing_Logic_via_Slang_Modules](#_sharing_logic_via_slang_modules)
- [Why These Changes?](#_why_these_changes)
- [Why_These_Changes?](#_why_these_changes)

## Content

Integrating **Plenoptic Synthesis** into our `simple_game_engine` requires a flexible rendering architecture that can switch between traditional rasterization and advanced ray tracing in `renderer_rendering.cpp`. **This is currently left as an exercise for the reader to implement.**

In `renderer_rendering.cpp`, we treat raster synthesis as a full-screen fragment pass. We sample the lightfield buffer using the quadrilinear interpolation logic we built.

// renderer_rendering.cpp
void Renderer::RenderSynthesisRaster(...) {
    // ...
    cmd.bindPipeline(vk::PipelineBindPoint::eGraphics, *rasterSynthesisPipeline);

    // Bind the LightField buffer (using BDA address from push constants)
    cmd.pushConstants(*pipelineLayout,
        vk::ShaderStageFlagBits::eFragment, 0, synthesisPushConstants);

    // Draw full-screen triangle to trigger fragment synthesis
    cmd.draw(3, 1, 0, 0);
}

If the engine detects `VK_KHR_ray_tracing_pipeline` support, we can use the more accurate Ray Traced synthesis path.

// renderer_rendering.cpp
void Renderer::RenderSynthesisRayTraced(...) {
    // ...
    cmd.bindPipeline(vk::PipelineBindPoint::eRayTracingKHR, *rtSynthesisPipeline);

    // Dispatch rays through our virtual microlens array
    // One ray per pixel of the high-res spatial display
    cmd.traceRaysKHR(sbtRayGen, sbtMiss, sbtHit, sbtCallable,
        swapChainExtent.width, swapChainExtent.height, 1);
}

We use Slang to ensure that the core interpolation logic is identical across both the raster and ray traced paths.

// synthesis_utils.slang
// Common logic for both paths
float3 samplePlenopticFunction(uint64_t bufferPtr, float4 ray) {
    // Shared quadrilinear interpolation math
    // ...
}

// fragment_synthesis.slang
[shader("pixel")]
float4 fragmentMain(V2P input) : SV_Target {
    return float4(samplePlenopticFunction(pushConstants.ptr, input.ray), 1.0);
}

// raygen_synthesis.slang
[shader("raygeneration")]
void raygenMain() {
    float4 ray = calculateRayFromMicrolens(DispatchRaysIndex().xy);
    outputImage[DispatchRaysIndex().xy] = samplePlenopticFunction(pushConstants.ptr, ray);
}

By providing dual paths in our `Renderer`, we allow the engine to scale from low-power mobile AR glasses (using the raster path) to high-end holographic workstation displays (using ray traced paths). Because our engine already has a modular `Render` structure and utilizes Slang, sharing the complex 4D interpolation logic between these paths ensures mathematical consistency and visual fidelity.

[Previous](03_ray_traced_synthesis.html) | [Next](../16_Scene_Understanding/01_introduction.html)
