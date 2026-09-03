# Synchronization 2: Mastering the GPU/CPU Handshake

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [Why a New System?](#_why_a_new_system)
- [Why_a_New_System?](#_why_a_new_system)
- [What You’ll Learn](#_what_youll_learn)
- [What_You’ll_Learn](#_what_youll_learn)
- [Prerequisites](#_prerequisites)
- [A Note on Tooling](#_a_note_on_tooling)
- [A_Note_on_Tooling](#_a_note_on_tooling)
- [Chapters in this series](#_chapters_in_this_series)
- [Chapters_in_this_series](#_chapters_in_this_series)
- [Navigation](#_navigation)

## Content

Welcome to the **Synchronization 2** tutorial series! If you’ve spent any significant time with Vulkan, you’ve likely encountered the "Sync Wall." It’s that moment when your code runs perfectly on your development machine but flickers on another, or when you realize that your high-performance GPU is spending half its time waiting for a single, overly conservative barrier.

Synchronization is arguably the most challenging part of Vulkan, but it’s also the most powerful. It is the language we use to tell the hardware exactly how data flows through the pipeline. In this series, we are going to move beyond the legacy Vulkan 1.0 synchronization systems—those fragmented bitmasks and binary semaphores—and embrace the modern standard: **Synchronization 2** and **Timeline Semaphores**.

Vulkan 1.0 synchronization was a breakthrough in control, but it was/is notoriously difficult to work with or understand. The original pipeline barriers were split across multiple structures, and the stage masks often felt like they were designed for the hardware of a decade ago; because well, it was a decade ago when it was designed.  Vulkan is 10 years old at the time of writing, and modern techniques along with modern hardware have enabled some better ways while maintaining the same level of control.

Synchronization 2, which arrived as an extension and is now a core part of Vulkan 1.3, simplifies this landscape by unifying everything into the `vk::DependencyInfo` structure. It provides a clearer, more intuitive way to define dependencies, using 64-bit masks that can target modern hardware units—like task and mesh shaders—with surgical precision.

When we combine this with **Timeline Semaphores**, we move from a world of "binary" signals (on or off) to a world of monotonic counters. This allows us to treat the entire GPU/CPU execution as a single, unified timeline, drastically simplifying how we manage multiple frames in flight and asynchronous work.

This isn’t just a list of API calls. We are going to build an engine-grade synchronization architecture. Throughout this series, we will:

**Deconstruct the Dependency**: We’ll look under the hood at how GPUs actually handle memory and why an "execution dependency" alone isn’t enough to prevent data corruption.

**Master the New Barrier**: You’ll learn how to use `vk::DependencyInfo` to replace legacy barriers, making your code cleaner and more performant.

**Harness the Timeline**: We’ll implement Timeline Semaphores as the "master clock" of our engine, replacing fences and binary semaphores with a more robust monotonic counter.

**Architect for Concurrency**: We’ll rebuild the main engine loop to handle multiple frames in flight and implement asynchronous compute and transfer operations that overlap with your main graphics work.

**Leverage Modern Vulkan**: We’ll dive into Vulkan 1.4 features, including **Host Image Copies** and tile-local reads in **Dynamic Rendering**, to stay on the cutting edge of the API.

This series is designed as an "Advanced Topic" that builds directly on the foundations established in our main Vulkan tutorial. We assume you are comfortable with:

* 
The basic Vulkan rendering loop (Command Buffers, Pipelines, and Descriptor Sets).

* 
Modern c++ (RAII, smart pointers, and basic templates).

* 
The fundamental concepts of graphics pipelines (Vertex/Fragment stages).

If you’re new to Vulkan, we strongly recommend completing the [main tutorial](../00_Introduction.html) first. For those following along with our engine-building journey, this series perfectly complements the [Building a Simple Engine](../Building_a_Simple_Engine/introduction.html) tutorial by providing the deep-dive synchronization knowledge required for a truly professional-grade renderer.

In this series, we will be using **Slang** for all our shader examples. Slang’s productivity features and its ability to target Vulkan spir-v naturally make it the perfect companion for modern synchronization. We’ll also lean heavily on the **LunarG Synchronization Validation** layer—your best friend when it comes to identifying the "Write-After-Read" (WAR) and "Read-After-Write" (RAW) hazards that can be so hard to track down manually.

Let’s begin by tearing down a dependency to see what it’s really made of.

[The Anatomy of a Dependency](Anatomy_of_a_Dependency/01_introduction.html) - Understanding the core mechanics of how data moves through the pipeline.

[Pipeline Barriers and Image Layout Transitions](Pipeline_Barriers_Transitions/01_introduction.html) - Mastering the new barrier system.

[Timeline Semaphores: The Master Clock](Timeline_Semaphores/01_introduction.html) - Moving to a monotonic world.

[Frame-in-Flight Architecture](Frame_in_Flight/01_introduction.html) - Building the heartbeat of your engine.

[Asynchronous Compute & Execution Overlap](Async_Compute_Overlap/01_introduction.html) - Parallelizing your GPU work.

[Transfer Queues & Asset Streaming Sync](Transfer_Queues_Streaming/01_introduction.html) - Streaming assets without the stutter.

[Synchronization in Dynamic Rendering](Dynamic_Rendering_Sync/01_introduction.html) - Modern sync in a pass-less world.

[Host Image Copies & Memory Mapped Sync](Host_Image_Copies_Memory_Sync/01_introduction.html) - Direct CPU-to-GPU memory management.

[Debugging with Synchronization Validation](Synchronization_Validation/01_introduction.html) - Letting the tools find your hazards.

[Profiling, Batching, and Optimization](Profiling_Optimization/01_introduction.html) - Squeezing out every last millisecond.

Next: [The Anatomy of a Dependency](Anatomy_of_a_Dependency/01_introduction.html)
