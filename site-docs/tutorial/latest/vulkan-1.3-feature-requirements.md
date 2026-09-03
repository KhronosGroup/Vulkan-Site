# Vulkan 1.3 Feature Requirements

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/02_OpenXR_Vulkan_Handshake/04_vulkan_1_3_feature_requirements.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [1. Timeline Semaphores: The Async Heartbeat](#_1_timeline_semaphores_the_async_heartbeat)
- [1._Timeline_Semaphores:_The_Async_Heartbeat](#_1_timeline_semaphores_the_async_heartbeat)
- [2. Synchronization 2: Mastering Queue Ownership](#_2_synchronization_2_mastering_queue_ownership)
- [2._Synchronization_2:_Mastering_Queue_Ownership](#_2_synchronization_2_mastering_queue_ownership)
- [3. Dynamic Rendering: Ultimate Flexibility](#_3_dynamic_rendering_ultimate_flexibility)
- [3._Dynamic_Rendering:_Ultimate_Flexibility](#_3_dynamic_rendering_ultimate_flexibility)
- [Enabling Vulkan 1.3 Features in RAII](#_enabling_vulkan_1_3_features_in_raii)
- [Enabling_Vulkan_1.3_Features_in_RAII](#_enabling_vulkan_1_3_features_in_raii)
- [Advanced: Beyond the OpenXR Mandatory Set](#_advanced_beyond_the_openxr_mandatory_set)
- [Advanced:_Beyond_the_OpenXR_Mandatory_Set](#_advanced_beyond_the_openxr_mandatory_set)
- [Summary of the Handshake](#_summary_of_the_handshake)
- [Summary_of_the_Handshake](#_summary_of_the_handshake)

## Content

The final step in our spatial handshake is ensuring that our `VkDevice` is initialized with the correct set of features. While OpenXR can technically run on older Vulkan versions, the **Vulkan 1.3** specification is the "gold standard" for modern spatial computing. It codifies several previously optional extensions into the core API, providing a guaranteed baseline of high-performance tools.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Enabling modern Vulkan features like Timeline Semaphores and Dynamic Rendering is essential for building a low-latency spatial pipeline that adheres to OpenXR best practices.

In a standard application, we use binary semaphores to sync the GPU. A binary semaphore is like a single-use "go" signal. In XR, where we have complex dependencies between the CPU simulation, the GPU render, and the XR compositor (which might be in a different process), binary semaphores are too rigid.

**Timeline Semaphores** provide a 64-bit monotonically increasing value. Think of them as a "Global Clock" for your GPU work. The XR runtime uses these to signal exactly when a frame is ready for composition and to manage the "Global Clock" of the GPU work, ensuring that reprojection happens at the last possible moment.

* 
**Pacing**: We can signal that "Frame 500 is ready for composition" by simply reaching value `500` on a single timeline.

* 
**Late Latching**: We can tell the GPU to "Wait until value 501 is signaled by the CPU" before starting the final matrix update.

* 
**Cross-Process Synchronization**: Because they can be exported to OS handles, timeline semaphores allow our engine and the XR runtime to stay perfectly in sync without expensive CPU read-backs.

**Synchronization 2** (`VK_KHR_synchronization2`) simplifies synchronization by combining pipeline stages and access masks into a more unified structure. In XR, this is critical for handling **Queue Ownership Transfers**.

Because the XR runtime owns the swapchain images, we must perform a "Release" operation on our queue when we’re done rendering, and the runtime performs an "Acquire" on its side. Using Synchronization 2, the runtime performs these high-performance hand-offs explicitly, ensuring that the engine and compositor never access the same memory simultaneously.

By using `vkCmdBeginRendering` directly on our XR swapchain images, we avoid the heavy overhead and rigid state of legacy `VkRenderPass` objects.

* 
**Asymmetric Views**: Most headsets use "Canted Displays" where the left and right eye frustums are not parallel. This often requires different viewport and scissor settings for each eye.

* 
**Dynamic Resolution**: To maintain a steady 90Hz, the engine might need to drop the resolution of peripheral views instantly.

* 
**Runtime Viewport Management**: The runtime relies on the flexibility of **Dynamic Rendering** to handle varied headset architectures without needing to re-create expensive framebuffer state for every eye.

Vulkan 1.3 simplifies feature enablement. Instead of deep, nested `pNext` chains, we can use the unified `VkPhysicalDeviceVulkan13Features` (and its predecessors) to toggle the core requirements using designated initializers.

// Enabling mandatory features for our spatial pipeline using designated initializers
vk::PhysicalDeviceVulkan12Features features12{
    .timelineSemaphore = VK_TRUE
};

vk::PhysicalDeviceVulkan13Features features13{
    .pNext = &features12,
    .synchronization2 = VK_TRUE,
    .dynamicRendering = VK_TRUE
};

vk::DeviceCreateInfo createInfo{
    .pNext = &features13,
    .queueCreateInfoCount = static_cast(queueCreateInfos.size()),
    .pQueueCreateInfos = queueCreateInfos.data(),
    .enabledExtensionCount = static_cast(deviceExtensions.size()),
    .ppEnabledExtensionNames = deviceExtensions.data()
};

vk::raii::Device device(physicalDevice, createInfo);

While the handshake ensures a baseline, Vulkan 1.3 allows you to enable "Next-Gen" features that the OpenXR specification does not yet mandate:

* 
**Mesh Shading and Ray Tracing**: You can use Vulkan’s feature discovery to enable these powerful pipelines for high-fidelity spatial effects, such as real-time spatial reflections or complex geometry processing, without waiting for the OpenXR standard to catch up.

* 
**Custom Pipeline Caches**: By managing your own **VkPipelineCache**, you can ensure that your spatial shaders load instantly across different headset configurations, bypassing the runtime’s generic shader management.

|  | For more information on Vulkan 1.3 and core features, check out the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

We have now successfully:
1.  Extended our `VulkanContext` to negotiate extensions with OpenXR.
2.  Aligned our `VkPhysicalDevice` selection with the device the OpenXR runtime requires.
3.  Enabled the modern Vulkan 1.3 features required for low-latency spatial rendering.

With the handshake complete, we are ready to tackle the most significant architectural change in an XR engine: moving from engine-owned swapchains to **Runtime-Owned Swapchains**.

[Previous](03_hardware_alignment_luid.html) | [Next](05_incorporating_into_the_engine.html)
