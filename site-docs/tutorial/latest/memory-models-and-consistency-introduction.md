# Memory Models and Consistency: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/03_Memory_Models/01_introduction.html

## Table of Contents

- [Overview](#_overview)
- [The Explicit Nature of Vulkan](#_the_explicit_nature_of_vulkan)
- [The_Explicit_Nature_of_Vulkan](#_the_explicit_nature_of_vulkan)
- [The Three Pillars of Memory Management](#_the_three_pillars_of_memory_management)
- [The_Three_Pillars_of_Memory_Management](#_the_three_pillars_of_memory_management)
- [Why This Matters](#_why_this_matters)
- [Why_This_Matters](#_why_this_matters)

## Content

In the previous chapter, we looked at how to keep the GPU busy through high occupancy and tight data layouts. But as you scale your compute dispatches from simple, independent tasks to complex, cooperative algorithms, you’ll quickly encounter a much more challenging problem: **Memory Consistency** (ensuring all parts of the GPU see the same data at the same time).

How do you know that a value written by one invocation is visible to another? What happens when two invocations try to write to the same location at once? How do you share data efficiently between thousands of threads without crashing into a race condition?

On the CPU, cache coherence hardware ensures that once Thread A completes a store, other CPU cores eventually observe the new value. However, CPU thread programming still requires explicit synchronization — without `std::atomic`, mutexes, or memory fences, the compiler and out-of-order CPU cores are free to reorder or defer operations in ways that produce data races.

On the GPU, this is **not** the case. With thousands of threads executing concurrently across multiple compute units, each with its own hierarchical caches (**L1** - Level 1 and **L2** - Level 2, etc.), keeping everyone’s view of memory in sync is an incredibly expensive task. Vulkan’s philosophy is simple: **synchronization is never automatic**. If you want a write to be visible to a read, you must explicitly say so.

In this chapter, we’ll dive deep into the mechanisms Vulkan provides to manage this complexity:

**The Vulkan Memory Model**: Mastering Availability, Visibility, and Domain operations to create a formal **"Happens-Before"** relationship (a strict ordering of operations) between threads.

**Shared Memory (LDS)**: Utilizing a small, ultra-fast, workgroup-local memory for high-speed data exchange and manual caching.

**Memory Consistency**: Using Slang’s `GroupMemoryBarrierWithGroupSync` vs. fine-grained Vulkan 1.4 barriers to minimize pipeline stalls and maximize throughput.

Efficient memory synchronization is the difference between a high-performance simulation and a broken, non-deterministic mess.

* 
**Over-synchronization**: Your kernels will be slow because every thread is constantly waiting for every other thread.

* 
**Under-synchronization**: You’ll get flickering results, "ghost" data, and hard-to-debug crashes that only appear on certain hardware.

We’ll start by looking at the theoretical foundation: the **Vulkan Memory Model**. While it might seem abstract at first, it is the key to writing portable, robust compute code that works on every GPU from a smartphone to a high-end workstation.

[Previous: Scalar Layouts](../02_Compute_Architecture/04_vulkan_1_4_scalar_layouts.html) | [Next: The Vulkan Memory Model](02_vulkan_memory_model.html)
