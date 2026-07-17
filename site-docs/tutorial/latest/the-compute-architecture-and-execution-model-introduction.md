# The Compute Architecture and Execution Model: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/02_Compute_Architecture/01_introduction.html

## Table of Contents

- [Overview](#_overview)
- [The Language of Silicon](#_the_language_of_silicon)
- [The_Language_of_Silicon](#_the_language_of_silicon)
- [Hardware Mapping](#_hardware_mapping)
- [Invocations and SIMD](#_invocations_and_simd)
- [Invocations_and_SIMD](#_invocations_and_simd)
- [Performance Metrics](#_performance_metrics)
- [What’s Next?](#_whats_next)

## Content

To write efficient compute kernels, you must look beyond the abstract execution model of "workgroups" and "invocations" and understand how these concepts map to the physical hardware. While Vulkan provides a cross-vendor API, the silicon beneath it from AMD, NVIDIA, and Intel has specific ways of handling your data. The same is true of the **mobile** GPUs from Arm (Mali/Immortalis), Qualcomm (Adreno), and Imagination (PowerVR) that make up the largest installed base of Vulkan devices — their tile-based designs map these same concepts onto very different silicon, which we cover in detail in [Mobile and Embedded Compute](../12_Mobile_and_Embedded_Compute/01_introduction.html).

In this chapter, we will bridge the gap between your shader code and the silicon. We’ll explore how the 3D grid system you define in `vkCmdDispatch` is sliced, diced, and distributed across the GPU’s **Compute Units (CU)** or **Streaming Multiprocessors (SM)**.

Before we dive in, let’s align our vocabulary. Different vendors use different names for the same concepts:

* 
**Workgroups** (Vulkan/OpenCL) are often mapped to **Thread Blocks** (CUDA).

* 
**Invocations** (Vulkan) are simply **Threads**.

* 
**Subgroups** (Vulkan) are called **Wavefronts** (AMD) or **Warps** (NVIDIA). On mobile, Arm calls the equivalent a **warp** as well, while the practical size varies widely (4–128) and must be queried at runtime.

* 
**Compute Units** (AMD) are equivalent to **Streaming Multiprocessors** (NVIDIA), and to **shader cores** on Arm Mali or Qualcomm Adreno.

Understanding these mappings allows you to read hardware-specific documentation and performance guides regardless of which GPU you are targeting — desktop **or** mobile.

When you dispatch a workload, the GPU’s hardware command processor breaks the global grid into individual workgroups. These workgroups are the fundamental unit of scheduling.

A critical rule of the GPU execution model is **workgroup atomicity**: once a workgroup is assigned to a physical compute unit, all its invocations will stay on that unit until the workgroup completes. They cannot be split across multiple units. This locality is what enables **Shared Memory (LDS - Local Data Store)**—since all threads in a workgroup are physically on the same hardware block, they can share a dedicated, ultra-fast cache.

While workgroups are the scheduling unit, the **invocation** is the smallest unit of execution. However, GPUs are **SIMD (Single Instruction, Multiple Data)** machines. They don’t execute invocations one by one; instead, they group them into small bundles (Subgroups).

In these bundles, every invocation executes the exact same instruction at the same time, but on different data. This is incredibly efficient for math, but it introduces a major pitfall: **Branch Divergence**. If your code contains an `if` statement where some threads go left and others go right, the hardware must execute **both** paths, masking out the inactive threads for each.

Throughout this section, we will focus on two key metrics that determine how well you’re utilizing the hardware:

**Occupancy**: This is the "concurrency" metric. It represents how many active workgroups are residing on a compute unit compared to its theoretical maximum. High occupancy helps **hide latency**—if one bundle is waiting for a memory fetch from slow VRAM, the scheduler can instantly switch to another bundle that’s ready to do math.

**Bandwidth Efficiency**: This is the "throughput" metric. Modern GPUs have massive memory bandwidth, but it’s easily wasted by poor data alignment. We’ll see how Vulkan 1.4’s **Scalar Layouts** allow us to pack data tightly, ensuring that the shader actually uses every byte fetched from VRAM.

We’ll start by diving into the 3D grid system and seeing exactly how it maps to physical hardware. From there, we’ll learn how to calculate theoretical occupancy and use engine tools to monitor real-world utilization. Finally, we’ll master the scalar block layouts to maximize your data throughput.

[Previous: Introduction](../introduction.html) | [Next: Workgroups and Invocations](02_workgroups_and_invocations.html)
