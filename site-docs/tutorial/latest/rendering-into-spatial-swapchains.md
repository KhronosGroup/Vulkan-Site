# Rendering into Spatial Swapchains

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/04_Dynamic_Rendering/02_rendering_to_spatial_swapchains.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [Binding XR Images: The Runtime Handover](#_binding_xr_images_the_runtime_handover)
- [Binding_XR_Images:_The_Runtime_Handover](#_binding_xr_images_the_runtime_handover)
- [Handling XR Pipeline State: The Power of pNext](#_handling_xr_pipeline_state_the_power_of_pnext)
- [Handling_XR_Pipeline_State:_The_Power_of_pNext](#_handling_xr_pipeline_state_the_power_of_pnext)
- [Decoupling the Frame Loop: Separation of Concerns](#_decoupling_the_frame_loop_separation_of_concerns)
- [Decoupling_the_Frame_Loop:_Separation_of_Concerns](#_decoupling_the_frame_loop_separation_of_concerns)

## Content

The dynamic rendering system we’ve built is ideal for spatial computing because it doesn’t care where an image comes from. Whether it’s a standard swapchain or a set of images provided by an XR runtime, the process of beginning a rendering session remains consistent and lightweight.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Rendering directly into runtime-owned swapchains using Vulkan’s dynamic rendering is the recommended approach for modern spatial pipelines. It provides the maximum flexibility for the varied optical requirements of different headsets.

In our previous chapter, we learned how to wrap `XrSwapchainImageVulkanKHR` handles into `vk::raii::Image` and `vk::raii::ImageView`. With dynamic rendering, we provide these image views directly to the `vk::RenderingInfo` structure using designated initializers.

// 1. Define the color attachment using designated initializers
vk::RenderingAttachmentInfo colorAttachment{
    .imageView = *xrImageView, // Our RAII-wrapped view from the XR runtime
    .imageLayout = vk::ImageLayout::eColorAttachmentOptimal,
    .loadOp = vk::AttachmentLoadOp::eClear,
    .storeOp = vk::AttachmentStoreOp::eStore,
    .clearValue = vk::ClearValue{.color = std::array{0.0f, 0.0f, 0.0f, 1.0f}}
};

// 2. Configure the rendering session
vk::RenderingInfo renderingInfo{
    .renderArea = vk::Rect2D{{0, 0}, {xrWidth, xrHeight}},
    .layerCount = 1,
    .colorAttachmentCount = 1,
    .pColorAttachments = &colorAttachment
};

// 3. Begin dynamic rendering session
commandBuffer.beginRendering(renderingInfo);
// ... Recording draw commands ...
commandBuffer.endRendering();

By rendering directly into the runtime’s images, we enable several critical features:
*   **Zero-Copy Handover**: The runtime doesn’t need to copy your pixels. Since you both share the same `VkImage` memory, the compositor simply points its own internal shaders at the memory you just filled.
*   **Format Enforcement**: The runtime ensures efficient warping and blending without expensive format conversions.
*   **Late-Stage Reprojection**: After you call `xrEndFrame`, the runtime uses the GPU’s fixed-function hardware to stretch and skew your image based on the head’s rotation at the very last microsecond.

We use `vk::PipelineRenderingCreateInfo` in the `pNext` chain of our graphics pipeline to ensure compatibility with the XR swapchain’s format.

vk::PipelineRenderingCreateInfo pipelineRenderingInfo{
    .colorAttachmentCount = 1,
    .pColorAttachmentFormats = &xrColorFormat,
    .depthAttachmentFormat = vk::Format::eD32Sfloat
};

vk::GraphicsPipelineCreateInfo pipelineInfo{
    .pNext = &pipelineRenderingInfo,
    // ... rest of pipeline configuration ...
};

For XR, this is particularly powerful because we can quickly swap between different formats or handle advanced features:
*   **Handling MSAA Resolves**: If your engine requires MSAA, you must manage the multisampled buffers and the resolve step yourself. Vulkan’s **Dynamic Rendering** allows you to perform this resolve by attaching both a multisampled transient image and the single-sampled XR swapchain image to the same rendering session.
*   **Managing Depth Testing States**: While the runtime provides the color swapchain, you are responsible for creating and clearing your own depth/stencil buffers. Vulkan allows you to perfectly align these depth resources with the XR swapchain, ensuring stable spatial occlusion.

By using dynamic rendering, we’ve successfully decoupled our engine’s internal rendering logic from the physical output. Our `VulkanContext` remains focused on managing pipeline state and recording commands, while the OpenXR loop manages the "render area" and provides the target images.

This **Separation of Concerns** is what allows our engine to scale seamlessly. Whether we are rendering to a 4K desktop monitor or a dual-eye VR headset, the core command recording logic remains the same. The only thing that changes is **where** the image view points and **how** the projection matrices are calculated.

|  | For more details on dynamic rendering, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#active-renderpass), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_stereo_viewport_scissor.html)
