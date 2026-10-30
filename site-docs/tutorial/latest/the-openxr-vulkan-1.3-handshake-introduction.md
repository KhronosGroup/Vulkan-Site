# The OpenXR-Vulkan 1.3 Handshake: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/02_OpenXR_Vulkan_Handshake/01_introduction.html

## Table of Contents

- [The Concept of the Handshake](#_the_concept_of_the_handshake)
- [The_Concept_of_the_Handshake](#_the_concept_of_the_handshake)
- [Vulkan 1.3 benefits in OpenXR Application](#_vulkan_1_3_benefits_in_openxr_application)
- [Vulkan_1.3_benefits_in_OpenXR_Application](#_vulkan_1_3_benefits_in_openxr_application)

## Content

Before we can render a single pixel to an XR headset, we must first establish a "handshake" between our application, the OpenXR runtime, and the Vulkan graphics driver. This is not as simple as creating a standard Vulkan instance and passing it to a library; it requires a coordinated dance of extension negotiation and hardware verification.

In this chapter, we are going to look at the three pillars of a successful spatial handshake:

**System Integration**: How to extend our engine’s `VulkanContext` to support the mandatory OpenXR extensions, specifically `XR_KHR_vulkan_enable2`.

**Hardware Alignment**: Using the exact `VkPhysicalDevice` handle the OpenXR runtime hands back from `xrGetVulkanGraphicsDevice2KHR` to ensure both OpenXR and Vulkan are talking to the same physical GPU. The runtime enforces this choice, so there is no matching to do—just use the handle it gives you. This is critical for cross-process memory visibility and performance.

**Vulkan 1.3 Requirements**: Activating the modern features—like Timeline Semaphores, Dynamic Rendering, and Synchronization 2—that allow our spatial pipeline to operate with minimal latency.

In a standard desktop application, your engine is the boss. It creates the instance, chooses the device, and owns the swapchain. In OpenXR, the relationship is more of a partnership. The **XR Runtime** (the software that drives the headset, like SteamVR or the Oculus service) needs to know exactly how your Vulkan instance is configured so it can safely inject its own compositor layers into your rendering stream.

If you don’t perform this handshake correctly, you might find that you can’t initialize the XR session, or worse, you’ll experience massive performance drops as the hardware is forced to copy images between different GPU memory contexts.

* 
**Low-latency synchronization** between the CPU simulation and the GPU compositor.

* 
**Single-pass rendering** via multiview.

* 
**Direct-to-display submission** without the overhead of legacy render pass state.

By the end of this chapter, you will have modified your engine’s initialization code to be fully spatial-aware, laying the groundwork for the predictive frame loop and runtime-owned swapchains that follow.

[Previous](../introduction.html) | [Next](02_system_integration.html)
