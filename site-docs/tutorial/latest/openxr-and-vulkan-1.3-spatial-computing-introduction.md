# OpenXR and Vulkan 1.3 Spatial Computing: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/introduction.html

## Table of Contents

- [Prerequisites](#_prerequisites)
- [The OpenXR Ecosystem: Runtimes and Loaders](#_the_openxr_ecosystem_runtimes_and_loaders)
- [The_OpenXR_Ecosystem:_Runtimes_and_Loaders](#_the_openxr_ecosystem_runtimes_and_loaders)
- [Why OpenXR?](#_why_openxr)
- [The Vulkan 1.3 Advantage](#_the_vulkan_1_3_advantage)
- [The_Vulkan_1.3_Advantage](#_the_vulkan_1_3_advantage)
- [What We Will Build](#_what_we_will_build)
- [What_We_Will_Build](#_what_we_will_build)

## Content

Welcome to the frontiers of spatial computing. In this tutorial series, we are going to bridge the gap between traditional 2D engine architecture and the immersive, low-latency requirements of Virtual Reality (VR), Augmented Reality (AR), and Mixed Reality (MR)—collectively known as XR.

Before beginning this tutorial, you should have a solid foundation in both the Vulkan API and engine architecture. Specifically, we assume you have completed:

**[The Core Vulkan Tutorial](../00_Introduction.html)**: You should be comfortable with the core concepts of Vulkan, including instance creation, physical devices, logical devices, and the basic graphics pipeline.

**[Building a Simple Engine](../Building_a_Simple_Engine/introduction.html)**: This series builds directly upon the code and architectural patterns established in the engine tutorial. We will be using the `Simple Engine` codebase as our starting point.

**Modern C++ and RAII**: We utilize `vulkan-hpp` and RAII (Resource Acquisition Is Initialization) throughout the series. You should be familiar with these patterns to follow the C++ integration sections.

Before we dive into the code, it is important to understand the two core components that make OpenXR work: the **Loader** and the **Runtime**.

**The OpenXR Loader**: This is a small, vendor-neutral library that your application links against. Its primary responsibility is to act as a traffic cop. When your engine starts, the loader looks at the system’s registry or environment variables to find the currently active XR runtime and redirects all your API calls to it.

**The OpenXR Runtime**: This is the heavy lifter provided by the hardware manufacturer (such as Meta, Valve, Microsoft, or the open-source Monado project). The runtime contains the actual implementation of the OpenXR spec, including the drivers for the cameras, displays, and tracking sensors.

To follow this tutorial, you will need to have an OpenXR-compatible environment set up on your development machine. This typically involves installing the SDK and ensuring a runtime is active.

|  | For the most up-to-date installation instructions and to download the necessary headers and loader libraries, we highly recommend visiting the official **[Khronos OpenXR-SDK-Source](https://github.com/KhronosGroup/OpenXR-SDK-Source)** repository and following the **[OpenXR Specification](https://www.khronos.org/registry/OpenXR/specs/1.1/html/xrspec.html)** or the excellent **[OpenXR Tutorial](https://www.openxr-tutorial.com/)** for platform-specific setup guides. |
| --- | --- |

In the early days of XR, developers had to write custom backends for every headset on the market. OpenXR changed all that by providing a cross-platform, high-performance API that allows a single application to run on devices ranging from the Meta Quest to the Valve Index and the Microsoft HoloLens.

But OpenXR isn’t just a wrapper. It is a sophisticated state machine that manages hardware poses, predictive frame timing, and specialized swapchains that are owned by the XR runtime itself. To use it effectively, we have to rethink how our engine handles its main loop, its memory, and its synchronization.

Vulkan 1.3 brings several critical features to the table that are particularly powerful for spatial computing:

* 
**Timeline Semaphores**: Essential for the complex, cross-process synchronization required between your engine and the XR compositor.

* 
**Dynamic Rendering**: Provides a flexible, lightweight rendering path for stereo views, avoiding the rigid state of legacy Render Passes.

* 
**Synchronization 2**: Simplifies the ownership transfers and barriers needed for low-latency late latching.

* 
**Maintenance Extensions**: Providing better control over memory and resource visibility across hardware boundaries.

Throughout this series, we will cover the entire lifecycle of an XR frame:

**The Handshake**: Connecting OpenXR to our Vulkan context using the runtime-enforced physical device and mandatory extensions.

**Resource Management**: Wrapping runtime-owned images into our RAII-based engine abstractions.

**The Predictive Loop**: Mastering frame timing to ensure that what the user sees matches exactly where their head is located at the moment of display.

**Spatial Shaders**: Using Slang to author efficient multiview and foveated rendering shaders.

**Advanced Sensing**: Ingesting environmental meshes and using ML inference to refine spatial data.

By the end of this tutorial, you won’t just have a working XR application; you will have a deep understanding of the architectural patterns required for high-performance spatial computing in the modern Vulkan ecosystem.

Let’s get started with the first step: the OpenXR-Vulkan 1.3 Handshake.

[Next](02_OpenXR_Vulkan_Handshake/01_introduction.html)
