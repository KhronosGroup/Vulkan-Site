# Timeline Semaphores: The Master Clock

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Timeline_Semaphores/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Monotonic World](#_the_monotonic_world)
- [The_Monotonic_World](#_the_monotonic_world)
- [Navigation](#_navigation)

## Content

For years, Vulkan developers have had to juggle two very different synchronization primitives: **Binary Semaphores** and **Fences**. Binary semaphores were used exclusively for GPU-to-GPU synchronization (e.g., waiting for an image to be ready before sampling it), while Fences were used for GPU-to-CPU synchronization (e.g., waiting for a command buffer to finish before reusing its resources).

This split forced us to write two different sets of logic for what is essentially the same problem: "Is the work done yet?" It also led to complex "semaphore chains" that were notoriously difficult to debug.

**Timeline Semaphores**, introduced as an extension and now a core part of Vulkan 1.2+, change everything. They provide a single, unified primitive that can handle both GPU-to-GPU and GPU-to-CPU synchronization using a simple, monotonic `uint64_t` counter.

In a timeline-based system, progress is measured by a value that only ever increases. When you submit a piece of work to the GPU, you tell it: "When you finish this, set the semaphore value to 10." If another piece of work needs that data, you tell it: "Don’t start until the semaphore value is at least 10."

This simple change has profound implications for how we architect our engines:

**Unified Logic**: We no longer care if the "waiter" is the CPU or the GPU. The interface is the same: we wait for a specific value.

**Wait-Before-Signal**: One of the most powerful features of Timeline Semaphores is that you can submit work to the GPU that waits for a value that hasn’t even been reached yet. This allows us to decouple our submission logic from our execution logic.

**Better Debugging**: Because the value is a simple integer, we can easily log it, inspect it in a debugger, or even use it to build a visual profiler of our engine’s progress.

|  | One current limitation to keep in mind: **Window System Integration (WSI)**. As of the current Vulkan specification, swapchain acquire and present operations still require legacy binary semaphores and cannot yet wait on or signal timeline semaphores directly. |
| --- | --- |

In this chapter, we are going to explore how to implement Timeline Semaphores as the "master clock" of our renderer. We’ll start by looking at how to replace our legacy fences and binary semaphores, then we’ll dive into the implementation of the monotonic counter and the highly efficient wait-before-signal submission pattern.

Let’s begin by unifying our synchronization primitives.

Previous: [Global vs. Local Barriers](../Pipeline_Barriers_Transitions/04_global_vs_local_barriers.html) | Next: [Unifying Synchronization](02_unifying_sync.html)
