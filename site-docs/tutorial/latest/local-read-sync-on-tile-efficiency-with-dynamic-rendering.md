# Local Read Sync: On-Tile Efficiency with Dynamic Rendering

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Dynamic_Rendering_Sync/03_local_read_sync.html

## Table of Contents

- [The Best of Both Worlds](#_the_best_of_both_worlds)
- [The_Best_of_Both_Worlds](#_the_best_of_both_worlds)
- [Implementing the Local Read](#_implementing_the_local_read)
- [Implementing_the_Local_Read](#_implementing_the_local_read)
- [Slang Integration](#_slang_integration)
- [Navigation](#_navigation)

## Content

In the legacy render pass system, we used subpasses to perform efficient on-tile read operations. This allowed the GPU to read from a color or depth attachment directly from its on-chip memory (the tile cache), avoiding expensive trips to main memory. This was a critical optimization for mobile and tiled-rendering GPUs.

With the introduction of **Vulkan 1.4**, this same efficiency is now available in **Dynamic Rendering** through the `VK_KHR_dynamic_rendering_local_read` feature. This gives us the simplicity of a "pass-less" world with the performance of a subpass-based world.

The implementation involves two parts: a specialized barrier and a specific rendering setup. When you use a local read, you tell the GPU: "I want to read from an attachment, but I promise the read will only occur at the same pixel (x, y) location as the current write." This allows the hardware to keep the data on-tile.

// 1. Define the Dependency
auto localReadBarrier = vk::ImageMemoryBarrier2{
    .srcStageMask = vk::PipelineStageFlagBits2::eColorAttachmentOutput,
    .srcAccessMask = vk::AccessFlagBits2::eColorAttachmentWrite,
    .dstStageMask = vk::PipelineStageFlagBits2::eFragmentShader,
    .dstAccessMask = vk::AccessFlagBits2::eInputAttachmentRead,
    .oldLayout = vk::ImageLayout::eRenderingLocalRead,
    .newLayout = vk::ImageLayout::eRenderingLocalRead,
    .image = gBufferAttachment.image(),
    .subresourceRange = subresourceRange
};

commandBuffer.pipelineBarrier2(vk::DependencyInfo{.imageMemoryBarrierCount = 1, .pImageMemoryBarriers = &localReadBarrier});

// 2. Perform the Rendering
// You must include the local read information in your RenderingInfo
auto localReadInfo = vk::RenderingInputAttachmentIndexInfo{
    .colorAttachmentCount = 1,
    .pColorAttachmentInputIndices = &colorIndex
};

auto renderingInfo = vk::RenderingInfo{
    .pNext = &localReadInfo,
    // ...
};

commandBuffer.beginRendering(renderingInfo);
// ... record your on-tile reads in your Slang shader ...
commandBuffer.endRendering();

In your Slang shader, you use the standard input attachment syntax. The Slang compiler will correctly target the SPIR-V instructions required for local read access. This ensures that your shader code remains clean and portable across different hardware.

// Slang snippet
[[vk::input_attachment_index(0)]]
InputAttachment gBufferInput;

float4 main(float2 uv : TEXCOORD0) : SV_Target {
    float4 data = gBufferInput.SubpassLoad();
    // ...
}

By mastering local read synchronization, you can build a modern deferred renderer that is every bit as efficient as a legacy subpass-based renderer, but with the flexibility and clarity of modern Vulkan. In the next chapter, we’ll see how these principles apply to the direct CPU-to-GPU data movements in **Host Image Copies**.

Previous: [Subpass Replacement](02_subpass_replacement.html) | Next: [Host Image Copies & Memory Mapped Sync](../Host_Image_Copies_Memory_Sync/01_introduction.html)
