# SIGGRAPH 2025: Hands-on Vulkan Ray Tracing with Dynamic Rendering

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/courses/18_Ray_tracing/00_Overview.html

## Table of Contents

- [Overview](#_overview)
- [Chapters in this series](#_chapters_in_this_series)
- [Chapters_in_this_series](#_chapters_in_this_series)
- [Build and run](#_build_and_run)
- [Build_and_run](#_build_and_run)
- [Navigation](#_navigation)

## Content

Welcome! In this series, we enhance a Vulkan renderer with ray tracing features to implement real-time pixel-perfect shadows (with and without transparency) and a bonus reflection effect. You will work with provided scaffolded code (based on the Vulkan Tutorial) and fill in key shader functions following step-by-step instructions.

Slides available [here](../../_attachments/Vulkan%20Ray%20Tracing%20With%20Dynamic%20Rendering.pdf).

By the end, you’ll learn how to:

* 
Use Vulkan **dynamic rendering** (no pre-defined render passes) and verify it with **RenderDoc**.

* 
Create bottom-level and top-level **Acceleration Structures** (BLAS and TLAS) for ray tracing.

* 
Implement ray query based **shadow rays** (first with all-opaque geometry, then with alpha-test **transparency**).

* 
Debug/inspect the acceleration structures in **Nsight Graphics**.

* 
(Bonus) Implement ray query based **reflections**.

**Prerequisites**:
This series targets intermediate Vulkan programmers. We assume you have completed the basic Vulkan Tutorial (graphics pipeline, descriptor sets, etc.). If not, you can still follow along conceptually. A Windows machine with up-to-date Vulkan SDK (1.4.311), a GPU supporting ray tracing (Vulkan Ray Query), plus RenderDoc and Nsight Graphics is provided.

**Mobile Best-Practice Notes**:

* 
We use `VK_KHR_dynamic_rendering` (core in Vulkan 1.3) instead of traditional render passes. This not only simplifies the API but also, with the `VK_KHR_dynamic_rendering_local_read` extension, enables tile-local storage reads similar to subpasses, a big deal for mobile tile-based GPUs to save bandwidth.

* 
We use Ray Queries (from `VK_KHR_ray_query`) within fragment shaders instead of a separate ray tracing pipeline. On mobile, ray queries are far more widely supported and often (depending on the use case) more efficient than the full ray tracing pipeline. Ray queries integrate nicely into fragment shading, benefiting from on-chip compression and avoiding context switches.

**Provided Code**:
The provided code is a Vulkan renderer that already implements a basic graphics pipeline with dynamic rendering. It is based on the Vulkan Tutorial and it is self-contained in a single C++ source file and a Slang shader file:

* 
[38_ray_tracing.cpp](../../_attachments/38_ray_tracing.cpp)

* 
[38_ray_tracing.slang](../../_attachments/38_ray_tracing.slang)

* 
If you get stuck on shader tasks, you can refer to the provided reference solution: [38_ray_tracing_complete.slang](../../_attachments/38_ray_tracing_complete.slang)

The source code is structured to guide you through the steps, with hints and boilerplate provided. It also sets up all the required extensions and features, including `VK_KHR_acceleration_structure` and `VK_KHR_ray_query`.
You will find sections of code marked with `// TASKxx` which we reference in each chapter.

At the top of the C++ file, note the following variable:

#define LAB_TASK_LEVEL 1

At certain intervals, you will be instructed to update this variable and re-build to verify the effect of key changes, no need to write new code.

* 
[Overview](00_Overview.html)

* 
[Dynamic rendering](01_Dynamic_rendering.html)

* 
[Acceleration structures](02_Acceleration_structures.html)

* 
[Ray query shadows](03_Ray_query_shadows.html)

* 
[TLAS animation](04_TLAS_animation.html)

* 
[Shadow transparency](05_Shadow_transparency.html)

* 
[Reflections](06_Reflections.html)

* 
[Conclusion](07_Conclusion.html)

You can build and run the provided sample either from Visual Studio (set 38_ray_tracing as the start-up project) or via command line:

cmake --build build --target 38_ray_tracing --parallel; start .\build\38_ray_tracing\Debug\38_ray_tracing.exe -wo .\build\38_ray_tracing\

Note that the above hasn’t changed from the base tutorial, and you may continue to build on other platforms as you have for the rest of the tutorial.

* 
Next: [Dynamic rendering](01_Dynamic_rendering.html)
