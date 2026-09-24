# Mobile Mastery: Conquering the Thermal Wall

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/19_Platform_Divergence/03_mobile_mastery.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Tile-Based Rendering (TBR)](#_the_concept_tile_based_rendering_tbr)
- [The_Concept:_Tile-Based_Rendering_(TBR)](#_the_concept_tile_based_rendering_tbr)
- [Application SpaceWarp (ASW): Synthetic Frames](#_application_spacewarp_asw_synthetic_frames)
- [Application_SpaceWarp_(ASW):_Synthetic_Frames](#_application_spacewarp_asw_synthetic_frames)
- [Advanced: Tile-Local Deferred Shading and Thread Affinity](#_advanced_tile_local_deferred_shading_and_thread_affinity)
- [Advanced:_Tile-Local_Deferred_Shading_and_Thread_Affinity](#_advanced_tile_local_deferred_shading_and_thread_affinity)
- [Efficient Spatial Sync](#_efficient_spatial_sync)
- [Efficient_Spatial_Sync](#_efficient_spatial_sync)

## Content

Mobile spatial computing is an exercise in extreme efficiency. On standalone headsets, we must run the entire engine, tracking, and display on a power budget of roughly 5–10 watts.

This chapter falls under the category: **What your OpenXR Runtime is Probably Doing**.

Standalone mobile runtimes manage heavy architectural lifting like thermal throttling, direct-to-display scan-out, and synthetic frame generation (SpaceWarp) behind the scenes. You use Vulkan’s tile-based rendering features to align your engine with these runtime behaviors to extract maximum performance.

Most mobile GPUs (like those from Qualcomm, Arm, or Imagination) use a **Tile-Based Rendering** architecture. Instead of rendering the whole screen at once, the GPU splits the screen into tiny tiles (e.g., 16x16 pixels). It processes each tile entirely within high-speed, low-power on-chip memory (**LDS** or **SRAM**) before writing the final result back to main memory.

In mobile spatial computing, **Discarding is Winning**.

// Configuring optimal mobile attachments using designated initializers
vk::RenderingAttachmentInfo depthAttachment{
    .imageView = *depthView,
    .imageLayout = vk::ImageLayout::eDepthStencilAttachmentOptimal,
    .loadOp = vk::AttachmentLoadOp::eClear,
    .storeOp = vk::AttachmentStoreOp::eDontCare, // CRITICAL: Discard depth after use
    .clearValue = vk::ClearValue{.depthStencil = {1.0f, 0}}
};

In Vulkan 1.3, we can use the **Dynamic Rendering Local Read** extension (`VK_KHR_dynamic_rendering_local_read`) to read back color or depth values within the same tile without hitting main VRAM. This is essential for deferred shading, keeping the entire operation on-chip.

To maintain a smooth 90Hz experience on mobile, we often use **Application SpaceWarp**. This allows the engine to render at half-framerate (e.g., 45 FPS) while the XR runtime generates every second frame synthetically.

* 
**How it works**: The engine provides **Motion Vectors** and a depth map to the runtime.

* 
**The Result**: The GPU only performs heavy shading for half the frames, allowing for more complex scenes and higher fidelity.

Vulkan allow us to overcome the mobile "Thermal Wall" beyond standard loops:

* 
**Tile-Local Deferred Shading**: Using Vulkan’s **Input Attachments**, you can perform complex lighting and post-processing entirely within high-speed on-chip memory, avoiding the expensive "Main Memory Tax."

* 
**Real-Time Thread Affinity**: You can use Vulkan’s **Priority Queues** to explicitly request "Real-Time" priority for your engine’s command submission, ensuring spatial rendering is never delayed by background system updates—a level of coordination the standard does not guarantee.

Mobile headsets use **Unified Memory**, where the CPU and GPU share the same physical RAM. While this simplifies zero-copy hand-offs, it also means they compete for **Memory Bandwidth**. Every texture sample and buffer write must be justified.

|  | For more information on mobile optimization and tiling, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#renderpass-load-store-ops), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_desktop_high_end.html) | [Next](04_incorporating_into_the_engine.html)
