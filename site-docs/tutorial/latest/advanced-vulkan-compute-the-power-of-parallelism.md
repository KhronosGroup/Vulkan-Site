# Advanced Vulkan Compute: The Power of Parallelism

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [Beyond the Basics](#_beyond_the_basics)
- [Beyond_the_Basics](#_beyond_the_basics)
- [What You Will Learn](#_what_you_will_learn)
- [What_You_Will_Learn](#_what_you_will_learn)
- [Prerequisites](#_prerequisites)
- [How to Use This Tutorial](#_how_to_use_this_tutorial)
- [How_to_Use_This_Tutorial](#_how_to_use_this_tutorial)
- [Chapters](#_chapters)

## Content

Welcome to the "Advanced Vulkan Compute" tutorial series! This series is designed for developers who have mastered the basics of Vulkan compute shaders and are looking to push the boundaries of what’s possible with modern GPU hardware.

Vulkan is not just a graphics API; it is a powerful, low-level framework for general-purpose GPU programming (GPGPU). While the initial tutorials covered how to dispatch a simple compute shader, this series dives deep into the architecture, memory models, and advanced features that enable high-performance simulations, complex data structures, and heterogeneous execution.

In a basic compute shader, you might just be multiplying an array of floats. In advanced compute, you are:

* 
**Orchestrating thousands of threads** to work together on a single problem.

* 
**Managing memory consistency** to ensure that data written by one thread is safely read by another.

* 
**Leveraging specialized hardware** like subgroup shuffles and cooperative matrices to bypass slow **VRAM** (Video Random Access Memory).

* 
**Building GPU-resident data structures** like **BVH** (Bounding Volume Hierarchies) and Octrees that never need to touch the CPU.

To do this effectively, you need more than just a passing knowledge of GLSL or Slang; you need to understand the underlying hardware architecture and the Vulkan execution model.

This tutorial series is organized into several key areas:

**Compute Architecture** - Mapping workgroups to Compute Units (CU) and Streaming Multiprocessors (SM), and mastering occupancy.

**Memory Models and Consistency** - Understanding the Vulkan Memory Model, shared memory (**LDS** - Local Data Store), and fine-grained synchronization.

**Subgroup Operations** - Using cross-invocation communication to avoid VRAM round-trips and maximize **SIMD** (Single Instruction, Multiple Data) throughput.

**Heterogeneous Ecosystems** - Running legacy OpenCL C on Vulkan using `clspv` (AOT compiler) and `clvk` (conformant OpenCL 3.0 runtime layered on Vulkan).

**Advanced Data Structures** - Moving complex structures like trees and linked lists entirely to the GPU using 64-bit atomics and **BDA** (Buffer Device Address).

**GPU-Driven Pipelines** - Moving command generation and workload management entirely to the GPU for autonomous execution.

**Asynchronous Orchestration** - Running compute and graphics concurrently using Synchronization 2 and multiple hardware queues.

**Advanced Math & Optimization** - Using Cooperative Matrices for linear algebra and auditing kernels for divergence and throughput.

**Mobile & Embedded Compute** - Running compute on Android and embedded devices, optimizing for power and bandwidth, and going headless beyond the phone.

This series assumes you are comfortable with:

* 
Standard Vulkan initialization (Instance, Device, Queues).

* 
Basic Compute Pipelines and Descriptor Sets.

* 
C++20 and GLSL/Slang shader languages.

* 
The concepts covered in the [Compute Shader](../11_Compute_Shader.html) chapter of the main tutorial.

Each chapter is designed to be self-contained but builds on the concepts of previous ones. We recommend following them in order if you’re new to advanced compute, or jumping to specific sections if you’re looking to solve a particular problem.

Let’s dive into the world of high-performance GPU computing!

* 
[The Compute Architecture and Execution Model](02_Compute_Architecture/01_introduction.html)

* 
[Memory Models and Consistency](03_Memory_Models/01_introduction.html)

* 
[Subgroup Operations: The Hidden Power](04_Subgroup_Operations/01_introduction.html)

* 
[Heterogeneous Ecosystem: OpenCL on Vulkan](05_OpenCL_on_Vulkan/01_introduction.html)

* 
[Advanced Data Structures on the GPU](06_Advanced_Data_Structures/01_introduction.html)

* 
[Indirect Dispatch and GPU-Driven Pipelines](07_GPU_Driven_Pipelines/01_introduction.html)

* 
[Asynchronous Compute Orchestration](08_Asynchronous_Compute/01_introduction.html)

* 
[Cooperative Matrices and Specialized Math](09_Specialized_Math/01_introduction.html)

* 
[Performance Auditing and Optimization](10_Performance_Optimization/01_introduction.html)

* 
[Diagnostics and AI-Assisted Compute Refinement](11_Diagnostics_and_Refinement/01_introduction.html)

* 
[Mobile and Embedded Compute](12_Mobile_and_Embedded_Compute/01_introduction.html)

[Previous: Basic Compute Shaders](../11_Compute_Shader.html) | [Next: Compute Architecture](02_Compute_Architecture/01_introduction.html)
