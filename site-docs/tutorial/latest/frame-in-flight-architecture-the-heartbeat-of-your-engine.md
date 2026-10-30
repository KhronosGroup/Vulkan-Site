# Frame-in-Flight Architecture: The Heartbeat of Your Engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Frame_in_Flight/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Synchronization Challenge](#_the_synchronization_challenge)
- [The_Synchronization_Challenge](#_the_synchronization_challenge)
- [The Timeline Advantage](#_the_timeline_advantage)
- [The_Timeline_Advantage](#_the_timeline_advantage)
- [Navigation](#_navigation)

## Content

In the early days of graphics programming, we often thought of rendering as a linear sequence: the CPU records some commands, the GPU executes them, and then the CPU waits for the GPU to finish before starting the next frame. This is simple, but it’s also incredibly slow. While the GPU is rendering, the CPU is sitting idle, and while the CPU is recording the next frame, the GPU is waiting for work.

To achieve high performance, we need to overlap these two processes. This is what we call **Frame-in-Flight Architecture**. We want to have multiple frames being processed simultaneously—for example, the CPU might be recording frame 3, while the GPU is still rendering frame 2, and the display is currently showing frame 1. This concept is introduced in the base tutorial’s [Frames in flight](../../03_Drawing_a_triangle/03_Drawing/03_Frames_in_flight.html) chapter, but here we take it to the next level using timeline semaphores.

Managing multiple concurrent frames is arguably the most complex synchronization challenge in a Vulkan engine. You have to ensure that:

**Data Integrity**: You don’t overwrite a uniform buffer that the GPU is currently reading for a previous frame.

**Resource Lifetimes**: You don’t destroy a texture or a command buffer until you are absolutely certain the GPU has finished using it.

**Forward Progress**: You don’t submit so many frames that you introduce massive input lag or run out of memory.

In the legacy Vulkan 1.0 world, this was handled using a complex array of fences and binary semaphores for each frame in flight. This led to "sync-heavy" code that was difficult to scale and easy to break.

By using **Timeline Semaphores** as our foundation, we can drastically simplify this architecture. Instead of managing a separate fence for every frame, we use a single monotonic counter that represents the "completed frame index."

In this chapter, we are going to rebuild the main engine loop to handle an arbitrary number of frames in flight. We’ll explore how to use the timeline to coordinate between the CPU and GPU, and how to implement a robust resource management system that uses the timeline to determine exactly when it’s safe to destroy or reuse our Vulkan objects.

Let’s begin by looking at how to rebuild the heartbeat of our engine: the main render loop.

Previous: [Wait-Before-Signal Submission](../Timeline_Semaphores/04_wait_before_signal.html) | Next: [Managing Concurrent Frames](02_managing_concurrent_frames.html)
