# Synchronization in Dynamic Rendering: A Pass-less World

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Dynamic_Rendering_Sync/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Explicit Era](#_the_explicit_era)
- [The_Explicit_Era](#_the_explicit_era)
- [What We’ll Explore](#_what_well_explore)
- [What_We’ll_Explore](#_what_well_explore)
- [Navigation](#_navigation)

## Content

For much of its early history, Vulkan synchronization was tied heavily to the concept of **Render Passes** and **Subpasses**. While this was designed to help mobile GPUs optimize on-tile memory usage, it was often confusing for developers and led to overly complex code. The "Subpass Dependency" was the primary way to sync data between different stages of a render pass, but it felt like a legacy structure that didn’t always match the way modern engines work.

With the introduction of **Dynamic Rendering** (introduced in Vulkan 1.3), the API has moved away from these rigid structures. There are no more `VkRenderPass` or `VkFramebuffer` objects to manage. Instead, you simply call `beginRendering` and `endRendering`. This change has made Vulkan much easier to use, but it has also shifted the responsibility for synchronization entirely to us.

In a world without subpass dependencies, every synchronization point must be explicit. If you want to use the output of one draw call as the input for another within the same rendering block, you can no longer rely on the render pass to handle the transition for you. You must use the **Synchronization 2** barriers we learned about in Chapter 3.

This shift is actually a major advantage. It provides far more clarity and control. You know exactly where your transitions are happening because you recorded them yourself. It also makes it much easier to integrate with modern engine architectures where rendering passes are fluid and often determined at runtime.

In this chapter, we’ll dive into how synchronization works in this modern, pass-less landscape. We’ll explore:

**Subpass Replacement**: How to use explicit barriers to coordinate synchronization between rendering attachments, replacing the legacy `VkSubpassDependency` structures.

**Local Read Sync**: We’ll look at one of the most exciting features of **Vulkan 1.4**: `VK_KHR_dynamic_rendering_local_read`. This allows you to perform on-tile operations (like reading from a depth buffer in a fragment shader) with the same performance as legacy subpasses but with the simplicity of dynamic rendering.

By the end of this chapter, you’ll be able to confidently architect a high-performance renderer using the latest Vulkan features, ensuring that your synchronization is as streamlined and efficient as your rendering code.

Previous: [Staging Synchronization](../Transfer_Queues_Streaming/03_staging_sync.html) | Next: [Subpass Replacement](02_subpass_replacement.html)
