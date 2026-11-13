# Incorporating Semantic Occlusion into the Engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/18_Semantic_Occlusion/04_incorporating_into_the_engine.html

## Table of Contents

- [Creating the Occlusion Mask Pass](#_creating_the_occlusion_mask_pass)
- [Creating_the_Occlusion_Mask_Pass](#_creating_the_occlusion_mask_pass)
- [Composition in Slang](#_composition_in_slang)
- [Composition_in_Slang](#_composition_in_slang)
- [Why These Changes?](#_why_these_changes)
- [Why_These_Changes?](#_why_these_changes)

## Content

Integrating **Semantic Occlusion** allows our `simple_game_engine` to realistically blend virtual assets with the physical room. We implement this by adding a masking pass to our `Renderer` and updating our final composition logic in `renderer_rendering.cpp`. **This is currently left as an exercise for the reader to implement.**

In `renderer_rendering.cpp`, we add a step that uses our ML segmentation results to fill the **Stencil Buffer**. This pass must happen after we’ve received the latest ML mask but before we draw our virtual scene geometry.

// renderer_rendering.cpp
void Renderer::executeOcclusionMaskPass(vk::raii::CommandBuffer& cmd, uint32_t frameIndex) {
    if (!xrMode || !occlusionEnabled) return;

    // 1. Prepare to fill the stencil buffer
    // We bind a simple pipeline that reads the ML mask texture
    cmd.bindPipeline(vk::PipelineBindPoint::eGraphics, *occlusionMaskPipeline);

    // 2. Set the stencil reference to 0x1 (meaning "Real World")
    cmd.setStencilReference(vk::StencilFaceFlagBits::eFrontAndBack, 0x1);

    // 3. Draw a full-screen quad. The shader will discard fragments
    // where the ML mask doesn't indicate an occluding object (like a hand).
    cmd.draw(3, 1, 0, 0); // Using a single large triangle for the full screen
}

In our `composite.slang` shader, we use the stencil buffer’s output to decide how to blend the virtual scene with the passthrough camera feed. Alternatively, we can use a dedicated texture if the hardware doesn’t support stencil-based discard.

// composite.slang
[shader("pixel")]
float4 fragmentMain(V2P input) : SV_Target {
    // 1. Sample the virtual scene and the passthrough feed
    float4 virtualColor = virtualScene.Sample(input.uv);
    float4 passthroughColor = passthroughTexture.Sample(input.uv);

    // 2. Sample our refined occlusion mask
    float mask = occlusionMask.Sample(input.uv).r;

    // 3. Perform the Final Blend
    // If mask > 0.5, the real world is occluding. We use a smoothstep
    // to provide a "soft" edge, reducing jitter.
    float blendFactor = smoothstep(0.4, 0.6, mask);

    return lerp(virtualColor, passthroughColor, blendFactor);
}

By moving occlusion from a simple "on/off" switch to a dedicated pass in our `Renderer`, we allow our virtual objects to interact with the real world on a per-pixel basis. A virtual character can now reach "behind" a real-world object. Because our engine uses a modern **Synchronization 2** architecture, we can ensure the ML mask is ready before this pass begins without stalling the entire GPU.

This pixel-wise awareness is what transforms a "Video Overlay" into a "Spatial Experience," where the boundary between virtual and physical becomes indistinguishable to the user’s eye.

[Previous](03_per_pixel_masking.html) | [Next](../19_Platform_Divergence/01_introduction.html)
