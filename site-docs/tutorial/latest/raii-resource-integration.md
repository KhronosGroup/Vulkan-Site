# RAII Resource Integration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/03_Runtime_Owned_Swapchains/03_raii_resource_integration.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Ownership Contract: "Lent, Not Given"](#_the_ownership_contract_lent_not_given)
- [The_Ownership_Contract:_"Lent,_Not_Given"](#_the_ownership_contract_lent_not_given)
- [Non-Owning Image Wrappers](#_non_owning_image_wrappers)
- [Non-Owning_Image_Wrappers](#_non_owning_image_wrappers)
- [Integrating with Dynamic Rendering](#_integrating_with_dynamic_rendering)
- [Integrating_with_Dynamic_Rendering](#_integrating_with_dynamic_rendering)
- [Advanced: Interoperability with External APIs](#_advanced_interoperability_with_external_apis)
- [Advanced:_Interoperability_with_External_APIs](#_advanced_interoperability_with_external_apis)
- [Handling the Lifetime: Hybrid Destruction](#_handling_the_lifetime_hybrid_destruction)
- [Handling_the_Lifetime:_Hybrid_Destruction](#_handling_the_lifetime_hybrid_destruction)

## Content

Once we have our raw `VkImage` handles from OpenXR, we need to integrate them into our engine’s Resource Acquisition Is Initialization (**RAII**) framework. Our engine uses the `vk::raii` namespace, which provides high-level C++ wrappers that automatically manage the lifetime of Vulkan objects.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Integrating external runtime-owned resources into a modern RAII framework requires careful handling of ownership and destruction contracts. This is a common pattern when interfacing Vulkan with external systems.

When we receive a `VkImage` from OpenXR, we are entering into a legal contract with the XR runtime. The runtime provides the raw image because it doesn’t know your engine’s specific needs—for example, if you are using **Multiview**, you might need an `e2DArray` view, whereas a simple engine might just want a standard `e2D` view.

* 
**We can**: Bind the image as a color attachment, transition its layout, and create our own views.

* 
**We cannot**: Destroy the image, change its allocation flags, or attempt to free its memory.

* 
**Reference Counting**: The runtime keeps an internal reference count for each image, waiting for you to signal completion via the frame lifecycle.

* 
**Memory Residency**: The runtime ensures the memory stays resident on the GPU, handling any necessary OS-level "pinning."

The simplest way to handle this in `vulkan-hpp` is to treat the `VkImage` handles as non-owning `vk::Image` objects and create our own `vk::raii::ImageView` for each one using designated initializers.

// Wrapping the raw handles into our engine's per-frame data using designated initializers
struct XrFrameBuffer {
    vk::Image image; // Non-owning handle
    vk::raii::ImageView imageView = nullptr; // RAII owned by us
};

std::vector framebuffers;
for (const auto& xrImg : xrImages) {
    XrFrameBuffer fb;
    fb.image = vk::Image(xrImg.image);

    vk::ImageViewCreateInfo viewInfo{
        .image = fb.image,
        .viewType = vk::ImageViewType::e2D, // or e2DArray for multiview
        .format = chosenFormat,
        .subresourceRange = {
            .aspectMask = vk::ImageAspectFlagBits::eColor,
            .levelCount = 1,
            .layerCount = 1
        }
    };

    fb.imageView = vk::raii::ImageView(device, viewInfo);
    framebuffers.push_back(std::move(fb));
}

Because we are using **Dynamic Rendering** (introduced in Vulkan 1.3), we don’t need to wrap these images into legacy `VkFramebuffer` objects. Instead, we can directly reference the `vk::raii::ImageView` in our `vk::RenderingAttachmentInfo`.

// Rendering directly to the XR image using Dynamic Rendering and designated initializers
vk::RenderingAttachmentInfo colorAttachment{
    .imageView = *framebuffers[imageIndex].imageView,
    .imageLayout = vk::ImageLayout::eColorAttachmentOptimal,
    .loadOp = vk::AttachmentLoadOp::eClear,
    .storeOp = vk::AttachmentStoreOp::eStore,
    .clearValue = vk::ClearColorValue(0.0f, 0.0f, 0.0f, 1.0f)
};

vk::RenderingInfo renderingInfo{
    .renderArea = renderRect,
    .layerCount = 1,
    .colorAttachmentCount = 1,
    .pColorAttachments = &colorAttachment
};

commandBuffer.beginRendering(renderingInfo);

While OpenXR handles the image handles, Vulkan’s **External Memory** and **Foreign Queue** extensions allow you to go beyond the spatial standard:

* 
**Cross-API Sharing**: You can share these swapchain images with other APIs, such as **CUDA** for high-speed vision processing or a hardware video decoder for 360-degree playback.

* 
**Custom Compositing**: This level of interoperability allows your engine to perform complex, non-spatial processing on the exact same physical memory being used by the XR runtime.

In our engine architecture, we keep these `XrFrameBuffer` objects alive for the duration of the `XrSwapchain’s existence. When the user closes the application or switches environments, we destroy the `XrSwapchain` via `xrDestroySwapchain`.

This leads to a **Hybrid Destruction** flow:
1.  **Manual Destruction**: `xrDestroySwapchain` signals to the runtime that it can reclaim its VRAM.
2.  **RAII Destruction**: Our `XrFrameBuffer` structures go out of scope, causing their `vk::raii::ImageView` members to automatically call `vkDestroyImageView`.
3.  **Safety**: The non-owning `vk::Image` handles disappear without any Vulkan call, fulfilling our contract with the runtime.

|  | For more details, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#swapchain_images), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_external_image_negotiation.html) | [Next](04_memory_ownership_lifecycle.html)
