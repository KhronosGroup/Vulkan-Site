# Asynchronous Compute & Execution Overlap: Parallelizing the GPU

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Async_Compute_Overlap/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The "Bubble" Problem](#_the_bubble_problem)
- [The_"Bubble"_Problem](#_the_bubble_problem)
- [Architecting for Overlap](#_architecting_for_overlap)
- [Architecting_for_Overlap](#_architecting_for_overlap)
- [Navigation](#_navigation)

## Content

In many rendering architectures, work is submitted as a linear sequence of events. We draw the shadows, then the geometry, then we run a compute-based post-processing pass. This "serial" approach is easy to understand, but it often leaves significant portions of the GPU hardware idle. Modern GPUs are composed of multiple independent units—graphics pipelines, compute units, and transfer engines—that can, and should, work simultaneously.

**Asynchronous Compute** is the practice of running compute workloads (like physics, occlusion culling, or post-processing) on a dedicated compute queue while the main graphics queue is busy with its own work. When done correctly, this can lead to massive performance gains by effectively filling the "holes" in the GPU’s execution timeline.

The primary enemy of high performance is the **Pipeline Stall**, often called a "bubble." This happens when one part of the GPU has finished its work but cannot start the next task because it’s waiting for a dependency that hasn’t been satisfied. If your barriers are too conservative—for example, if you tell the GPU to wait for "All Commands" to finish before starting a compute pass—you are essentially forcing the hardware into a serial mode, even if the compute work could have started much earlier.

To achieve true execution overlap, we need to move beyond simple "top-of-pipe" to "bottom-of-pipe" dependencies. We need to architect our `vk::DependencyInfo` and our **Timeline Semaphores** to express the exact moment data is ready.

In this chapter, we will explore:

**Maximizing Throughput**: How to identify workloads that are good candidates for overlap and how to structure your submissions to keep the GPU occupancy as high as possible.

**Async Post-Processing**: We’ll implement a common real-world pattern: running compute-based bloom or tonemapping concurrent with the subsequent frame’s shadow or geometry pass.

**Eliminating the Stalls**: We’ll learn how to use hardware profilers and synchronization validation to find those elusive "bubbles" and refine our stage masks to eliminate them.

By the end of this chapter, you’ll be able to move your engine from a serial sequence to a parallel execution model, ensuring that no hardware unit is left sitting idle.

Previous: [Resource Lifetimes](../Frame_in_Flight/03_resource_lifetimes.html) | Next: [Maximizing Throughput](02_maximizing_throughput.html)
