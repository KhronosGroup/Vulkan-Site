# Threading

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/threading.html

## Table of Contents

- [Command Pools](#_command_pools)
- [Descriptor Pools](#_descriptor_pools)

## Content

One of the big differences between Vulkan and OpenGL is that Vulkan is not limited to a single-threaded state machine system. Before running off to implement threads in an application, it is important to understand how threading works in Vulkan.

The Vulkan Spec [Threading Behavior section](https://docs.vulkan.org/spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior) explains in detail how applications are in charge of managing all *externally synchronized* elements of Vulkan. It is important to realize that multithreading in Vulkan only provides host-side scaling, as anything interacting with the device still needs to be [synchronized correctly](synchronization.html#synchronization)

Vulkan implementations are not supposed to introduce any multi-threading, so if an app wants multi-CPU performance, the app is in charge of managing the threading.

[Command Pools](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#commandbuffers-pools) are a system to allow recording command buffers across multiple threads. A single command pool must be *externally synchronized*; it must not be accessed simultaneously from multiple threads. By using a separate command pool in each host-thread the application can create multiple command buffers in parallel without any costly locks.

The idea is command buffers can be recorded on multiple threads while having a relatively light thread handle the submissions.

![threading_command_buffers.png](_images/threading_command_buffers.png)

Khronos' [sample and tutorial](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance/command_buffer_usage) show in more detail how to record command buffers in parallel.

[Descriptor Pools](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#VkDescriptorPool) are used to allocate, free, reset, and update descriptor sets. By creating multiple descriptor pools, each application host thread is able to manage a descriptor set in each descriptor pool at the same time.
