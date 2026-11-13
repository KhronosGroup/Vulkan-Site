# Anatomy of a Synchronization Dependency: Conclusion

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Anatomy_of_a_Dependency/05_conclusion.html

## Table of Contents

- [Summary](#_summary)
- [Summary of Barrier Types](#_summary_of_barrier_types)
- [Summary_of_Barrier_Types](#_summary_of_barrier_types)
- [Final Thoughts](#_final_thoughts)
- [Navigation](#_navigation)

## Content

In this chapter, we have deconstructed the fundamental "handshake" that governs all GPU operations. By distinguishing between execution and memory dependencies, we’ve moved beyond simply "making it work" and towards a precise, performant understanding of how to orchestrate the complex parallelism of modern Vulkan.

To solidify our understanding, let’s summarize the three primary barrier types used in Synchronization 2:

| Barrier Type | Purpose | Key Structure |
| --- | --- | --- |
| **Global Memory Barrier** | Synchronizes all memory accesses across specified pipeline stages. Use this when you need a broad flush that isn’t tied to a specific resource. | `vk::MemoryBarrier2` |
| **Buffer Memory Barrier** | Provides granular synchronization for a specific range of a `vk::Buffer`. Ideal for compute-to-compute or compute-to-vertex dependencies. | `vk::BufferMemoryBarrier2` |
| **Image Memory Barrier** | The most powerful barrier. Handles execution and memory dependencies while also performing mandatory **Image Layout Transitions**. | `vk::ImageMemoryBarrier2` |

Every dependency you define is a contract between two operations. By being surgical with your pipeline stages and access flags, you ensure that the GPU spends its time processing data rather than waiting in unnecessary bubbles. Mastering this dependency is the first step towards building high-performance, asynchronous engine architectures.

Previous: [Refined Pipeline Stages](04_refined_pipeline_stages.html) | Next: [Pipeline Barriers and Transitions](../Pipeline_Barriers_Transitions/01_introduction.html)
