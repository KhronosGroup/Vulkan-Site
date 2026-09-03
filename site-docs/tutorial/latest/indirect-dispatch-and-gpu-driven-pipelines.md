# Indirect Dispatch and GPU-Driven Pipelines

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/07_GPU_Driven_Pipelines/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [Moving Beyond Static Dispatches](#_moving_beyond_static_dispatches)
- [Moving_Beyond_Static_Dispatches](#_moving_beyond_static_dispatches)
- [The Autonomous GPU](#_the_autonomous_gpu)
- [The_Autonomous_GPU](#_the_autonomous_gpu)
- [Why This Matters](#_why_this_matters)
- [Why_This_Matters](#_why_this_matters)

## Content

In traditional Vulkan applications, the CPU is the "conductor" of the orchestra. It decides what to draw, how many threads to dispatch, and which resources to bind. The GPU is simply a "performer" that executes the commands the CPU gives it.

However, as scenes become more complex—with millions of dynamic objects and complex physics—the CPU can no longer keep up. The overhead of the CPU calculating which objects are visible and then recording thousands of command buffers becomes the primary bottleneck.

In this chapter, we’ll explore **GPU-Driven Pipelines**, where the GPU takes over the role of the conductor.

A static dispatch (`vkCmdDispatch`) requires the CPU to know exactly how many workgroups to run. If you’re doing something like object culling, the CPU doesn’t know how many objects will pass the cull until the GPU has finished its work.

With **Indirect Dispatch** (`vkCmdDispatchIndirect`), the CPU doesn’t provide the dispatch size. Instead, it provides a **Vulkan Buffer** that contains the dispatch parameters. The GPU itself can then write to this buffer, effectively deciding how much work it needs to do.

GPU-driven pipelines take this even further with features like:

**GPU-Side Command Generation**: Utilizing modern engine features to build entire chains of commands on the GPU, allowing it to "decide" its own execution path.

**Multi-Draw Indirect (MDI)**: A feature allowing a single compute dispatch to generate thousands of draw calls, effectively rendering an entire scene without a single CPU-side loop.

**Variable-Sized Workloads**: Handling everything from particle systems to high-fidelity culling without any CPU-side intervention.

By moving the "decision-making" to the GPU, we **can**

* 
**Eliminate CPU Bottlenecks**: Free up the CPU for AI, game logic, and other tasks.

* 
**Minimize Latency**: Eliminate the round-trip delay between a GPU’s compute analysis and its subsequent rendering.

* 
**Scale to Millions**: Handle scene complexity that would be impossible with traditional CPU-bound pipelines.

In this chapter, we’ll learn how to build these autonomous pipelines, starting with the fundamental building block: **Indirect Dispatch**.

[Previous: Device-Addressable Buffers](../06_Advanced_Data_Structures/04_device_addressable_buffers.html) | [Next: Indirect Dispatch](02_indirect_dispatch.html)
